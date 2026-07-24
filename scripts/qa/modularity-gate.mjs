#!/usr/bin/env node

import { createHash } from 'node:crypto';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { extname, join, relative, resolve, sep } from 'node:path';

const root = process.cwd();
const baselinePath = resolve(root, 'scripts/qa/modularity-baseline.json');
const failOnFindings = process.argv.includes('--fail-on-findings');
const ignoredSegments = new Set(['.next', 'build', 'coverage', 'dist', 'node_modules']);

/**
 * Loads and parses the modularity baseline configuration.
 * @returns {Object} The parsed baseline configuration.
 * @throws {Error} If the baseline file cannot be read or parsed.
 */
function readBaseline() {
  try {
    return JSON.parse(readFileSync(baselinePath, 'utf8'));
  } catch (error) {
    throw new Error(`Modularity baseline is unreadable at ${baselinePath}: ${error.message}`);
  }
}

/**
 * Converts an absolute path to a path relative to the repository root.
 * @param {string} path - The absolute path to convert.
 * @return {string} The root-relative path with forward slash separators.
 */
function toRelative(path) {
  return relative(root, path).split(sep).join('/');
}

/**
 * Determines whether a path contains a directory segment excluded from scanning.
 * @param {string} path - The path to evaluate.
 * @return {boolean} `true` if any path segment is ignored, `false` otherwise.
 */
function shouldSkip(path) {
  return toRelative(path)
    .split('/')
    .some((segment) => ignoredSegments.has(segment));
}

function* walk(entry, extensions) {
  const absolute = resolve(root, entry);
  if (!existsSync(absolute) || shouldSkip(absolute)) return;

  const stats = statSync(absolute);
  if (stats.isDirectory()) {
    for (const child of readdirSync(absolute).sort((left, right) => left.localeCompare(right))) {
      yield* walk(join(entry, child), extensions);
    }
    return;
  }

  if (stats.isFile() && extensions.has(extname(absolute))) yield absolute;
}

/**
 * Counts the lines in a UTF-8 text file.
 * @param {string} path - The file path.
 * @return {number} The number of lines in the file.
 */
function lineCount(path) {
  return readFileSync(path, 'utf8').split(/\r?\n/).length;
}

/**
 * Determines the line limit for a module based on its most specific path match.
 * @param {string} relativePath - The module path relative to the repository root.
 * @param {string} extension - The module's file extension.
 * @return {number} The matching path-specific limit, or the default limit for the extension.
 */
function moduleLimit(relativePath, extension) {
  const matchingPath = Object.keys(baseline.pathLimits ?? {})
    .map((path) => {
      let normalizedPath = path;
      while (normalizedPath.endsWith('/')) normalizedPath = normalizedPath.slice(0, -1);
      return { path, normalizedPath };
    })
    .filter(
      ({ normalizedPath }) =>
        relativePath === normalizedPath || relativePath.startsWith(`${normalizedPath}/`),
    )
    .sort((left, right) => right.normalizedPath.length - left.normalizedPath.length)[0];
  return matchingPath ? baseline.pathLimits[matchingPath.path] : baseline.limits[extension];
}

/**
 * Computes the SHA-256 digest of a file.
 * @param {string} path - The path to the file.
 * @return {string} The file's SHA-256 digest in hexadecimal format.
 */
function sha256(path) {
  return createHash('sha256').update(readFileSync(path)).digest('hex');
}

const baseline = readBaseline();
const extensions = new Set(Object.keys(baseline.limits));
const generatedPaths = new Set(Object.keys(baseline.generatedArtifacts));
const findings = [];
const ratchets = [];
const resolvedRatchets = [];
let scannedFiles = 0;

for (const scanRoot of baseline.scanRoots) {
  for (const path of walk(scanRoot, extensions)) {
    const relativePath = toRelative(path);
    if (generatedPaths.has(relativePath)) continue;

    scannedFiles += 1;
    const lines = lineCount(path);
    const limit = moduleLimit(relativePath, extname(path));
    const debtCeiling = baseline.debtCeilings[relativePath];

    if (lines <= limit) {
      if (debtCeiling !== undefined) {
        resolvedRatchets.push({ path: relativePath, lines, limit });
        findings.push(
          `${relativePath}: debt is resolved at ${lines} lines; remove its stale baseline ceiling`,
        );
      }
      continue;
    }

    if (debtCeiling === undefined) {
      findings.push(`${relativePath}: ${lines} lines exceeds the ${limit}-line module limit`);
      continue;
    }

    ratchets.push({ path: relativePath, lines, limit, ceiling: debtCeiling });
    if (lines < debtCeiling) {
      findings.push(
        `${relativePath}: debt fell to ${lines} lines; lower its ${debtCeiling}-line baseline ceiling in the same change`,
      );
      continue;
    }
    if (lines > debtCeiling) {
      findings.push(
        `${relativePath}: ${lines} lines exceeds its ${debtCeiling}-line debt ceiling; split ownership instead of raising the ceiling`,
      );
    }
  }
}

for (const [relativePath, expectedNames] of Object.entries(baseline.generatedAbi ?? {})) {
  const path = resolve(root, relativePath);
  if (!existsSync(path)) continue;

  const actualNames = [
    ...new Set(
      [...readFileSync(path, 'utf8').matchAll(/myApp\.([A-Za-z_$][\w$]*)/g)].map(
        (match) => match[1],
      ),
    ),
  ].sort((left, right) => left.localeCompare(right));
  const expected = [...expectedNames].sort((left, right) => left.localeCompare(right));
  if (JSON.stringify(actualNames) !== JSON.stringify(expected)) {
    findings.push(
      `${relativePath}: generated myApp ABI changed; review the compatibility adapter before updating the baseline`,
    );
  }
}

const artifacts = [];
for (const [relativePath, expected] of Object.entries(baseline.generatedArtifacts)) {
  const path = resolve(root, relativePath);
  if (!existsSync(path)) {
    findings.push(`${relativePath}: pinned generated artifact is missing`);
    continue;
  }

  const actualSha256 = sha256(path);
  artifacts.push({ path: relativePath, sha256: actualSha256, source: expected.source });
  if (actualSha256 !== expected.sha256) {
    findings.push(
      `${relativePath}: generated artifact digest changed; rebuild and review the paired engine boundary before updating the baseline`,
    );
  }
}

const report = {
  scannedFiles,
  findings,
  ratchets,
  resolvedRatchets,
  artifacts,
  limits: baseline.limits,
  pathLimits: baseline.pathLimits,
};

console.log(JSON.stringify(report, null, 2));

if (failOnFindings && findings.length > 0) process.exitCode = 1;
