#!/usr/bin/env node

import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { extname, join, relative, resolve, sep } from 'node:path';
import ts from 'typescript';

const defaultConfigPath = 'scripts/qa/docstring-coverage.config.json';

/**
 * Converts a path to POSIX-style separators.
 * @param {string} path - The path to convert.
 * @return {string} The path with forward-slash separators.
 */
function toPosix(path) {
  return path.split(sep).join('/');
}

/**
 * Loads and parses the docstring coverage configuration file.
 * @param {string} root - The directory used to resolve the configuration path.
 * @param {string} [configPath=defaultConfigPath] - The configuration file path.
 * @returns {object} The parsed configuration.
 * @throws {Error} If the file cannot be read or its contents are invalid JSON.
 */
function readConfig(root, configPath = defaultConfigPath) {
  const path = resolve(root, configPath);
  try {
    return JSON.parse(readFileSync(path, 'utf8'));
  } catch (error) {
    throw new Error(`Docstring coverage config is unreadable at ${path}: ${error.message}`);
  }
}

/**
 * Determines whether a relative path matches configured exclusion rules.
 * @param {string} relativePath - The path to evaluate.
 * @param {object} config - Configuration containing excluded path segments and paths.
 * @returns {boolean} `true` if the path is excluded, `false` otherwise.
 */
function isExcluded(relativePath, config) {
  const normalizedPath = toPosix(relativePath);
  const segments = normalizedPath.split('/').map((segment) => segment.toLowerCase());
  if (segments.some((segment) => config.excludedPathSegments.includes(segment))) return true;

  return config.excludedPaths.some(
    (excludedPath) =>
      normalizedPath === excludedPath || normalizedPath.startsWith(`${excludedPath}/`),
  );
}

function* walk(root, entry, config) {
  const absolute = resolve(root, entry);
  if (!existsSync(absolute) || isExcluded(entry, config)) return;

  const stats = statSync(absolute);
  if (stats.isDirectory()) {
    for (const child of readdirSync(absolute).sort((left, right) => left.localeCompare(right))) {
      yield* walk(root, join(entry, child), config);
    }
    return;
  }

  if (stats.isFile() && config.extensions.includes(extname(absolute))) yield absolute;
}

/**
 * Discovers configured source files while applying exclusions and removing duplicates.
 * @param {string} root - The directory used to resolve scan roots and explicit file paths.
 * @param {object} config - File discovery settings, including scan roots, scan files, and exclusions.
 * @returns {string[]} Sorted absolute paths of discovered source files.
 */
function findSourceFiles(root, config) {
  const paths = new Set();
  for (const scanRoot of config.scanRoots) {
    for (const path of walk(root, scanRoot, config)) paths.add(resolve(path));
  }

  for (const scanFile of config.scanFiles) {
    const path = resolve(root, scanFile);
    if (existsSync(path) && !isExcluded(scanFile, config)) paths.add(path);
  }

  return [...paths].sort((left, right) => left.localeCompare(right));
}

/**
 * Determines whether a TypeScript declaration is supported for documentation coverage.
 * @param {import('typescript').Declaration} declaration - The declaration to classify.
 * @returns {boolean} `true` for supported class, enum, function, interface, module, type alias, or variable declarations, `false` otherwise.
 */
function isSupportedDeclaration(declaration) {
  return (
    ts.isClassDeclaration(declaration) ||
    ts.isEnumDeclaration(declaration) ||
    ts.isFunctionDeclaration(declaration) ||
    ts.isInterfaceDeclaration(declaration) ||
    ts.isModuleDeclaration(declaration) ||
    ts.isTypeAliasDeclaration(declaration) ||
    ts.isVariableDeclaration(declaration)
  );
}

/**
 * Gets the declaration node used to associate JSDoc with a declaration.
 * @param {import('typescript').Declaration} declaration - The declaration to anchor.
 * @return {import('typescript').Node} The enclosing variable statement for variable declarations, or the original declaration.
 */
function jsDocAnchor(declaration) {
  if (!ts.isVariableDeclaration(declaration)) return declaration;

  const declarationList = declaration.parent;
  return ts.isVariableDeclarationList(declarationList) &&
    ts.isVariableStatement(declarationList.parent)
    ? declarationList.parent
    : declaration;
}

/**
 * Extracts text from a JSDoc comment representation.
 * @param {string|Array<string|{text?: string}>|null|undefined} comment - The comment content to normalize.
 * @return {string} The concatenated comment text.
 */
function commentText(comment) {
  if (typeof comment === 'string') return comment;
  if (!comment) return '';
  return comment.map((part) => (typeof part === 'string' ? part : (part.text ?? ''))).join('');
}

/**
 * Assesses whether a declaration has valid, immediately associated JSDoc prose.
 * @param {ts.Node} declaration - The declaration to assess.
 * @param {ts.SourceFile} sourceFile - The source file containing the declaration.
 * @returns {{description?: string, reason?: string}} The normalized description when documentation is valid, or a reason describing why it is invalid.
 */
function assessDocumentation(declaration, sourceFile) {
  const anchor = jsDocAnchor(declaration);
  const docs = ts.getJSDocCommentsAndTags(anchor).filter(ts.isJSDoc);
  const doc = docs.at(-1);
  if (!doc) return { reason: 'missing JSDoc' };

  const between = sourceFile.text.slice(doc.end, anchor.getStart(sourceFile));
  if (!/^\s*$/.test(between)) return { reason: 'JSDoc is not immediately associated' };

  const prose = commentText(doc.comment).replace(/\s+/g, ' ').trim();
  if (!prose) return { reason: 'tag-only JSDoc' };
  if (/\b(?:TODO|TBD|FIXME)\b/i.test(prose)) return { reason: 'placeholder JSDoc' };

  const words = prose.match(/[\p{L}\p{N}][\p{L}\p{N}'’-]*/gu) ?? [];
  if (prose.replace(/\s/g, '').length < 24 || words.length < 4) {
    return { reason: 'JSDoc prose is too short' };
  }

  return { description: prose, reason: undefined };
}

/**
 * Collects supported declarations exported by a source file.
 * @param {ts.SourceFile} sourceFile - The source file whose exports are inspected.
 * @param {ts.TypeChecker} checker - The TypeScript checker used to resolve exported symbols.
 * @return {{ declaration: ts.Declaration, names: Set<string> }[]} Exported declaration records ordered by source position.
 */
function exportedDeclarations(sourceFile, checker) {
  const moduleSymbol = checker.getSymbolAtLocation(sourceFile);
  if (!moduleSymbol) return [];

  const exports = checker.getExportsOfModule(moduleSymbol);
  const byDeclaration = new Map();
  for (const exportedSymbol of exports) {
    const symbol =
      (exportedSymbol.flags & ts.SymbolFlags.Alias) !== 0 // NOSONAR: TypeScript flags are bitmasks.
        ? checker.getAliasedSymbol(exportedSymbol)
        : exportedSymbol;

    for (const declaration of symbol.declarations ?? []) {
      if (declaration.getSourceFile() !== sourceFile || !isSupportedDeclaration(declaration))
        continue;

      const record = byDeclaration.get(declaration) ?? { declaration, names: new Set() };
      record.names.add(exportedSymbol.getName());
      byDeclaration.set(declaration, record);
    }
  }

  return [...byDeclaration.values()].sort(
    (left, right) => left.declaration.getStart(sourceFile) - right.declaration.getStart(sourceFile),
  );
}

/**
 * Computes JSDoc coverage metrics for supported declarations exported from configured source files.
 * @param {{root?: string, config?: object}} [options] - The scan root and optional coverage configuration.
 * @returns {{minimumCoverage: number, minimumExports: number, coverage: number, documentedExports: number, totalExports: number, scannedFiles: string[], findings: Array<{path: string, line: number, name: string, reason: string}>}} The coverage report and documentation findings.
 */
export function collectDocstringCoverage({ root = process.cwd(), config: suppliedConfig } = {}) {
  const config = suppliedConfig ?? readConfig(root);
  const sourcePaths = findSourceFiles(root, config);
  const program = ts.createProgram({
    rootNames: sourcePaths,
    options: { noLib: true, noResolve: true, target: ts.ScriptTarget.ESNext },
  });
  const checker = program.getTypeChecker();
  const declarations = [];

  for (const path of sourcePaths) {
    const sourceFile = program.getSourceFile(path);
    if (!sourceFile) continue;

    for (const record of exportedDeclarations(sourceFile, checker)) {
      const relativePath = toPosix(relative(root, path));
      const documentation = assessDocumentation(record.declaration, sourceFile);
      declarations.push({
        path: relativePath,
        line:
          sourceFile.getLineAndCharacterOfPosition(record.declaration.getStart(sourceFile)).line +
          1,
        name: [...record.names].sort((left, right) => left.localeCompare(right)).join(', '),
        ...documentation,
      });
    }
  }

  const duplicateDescriptions = new Set();
  const descriptions = new Map();
  for (const declaration of declarations) {
    if (!declaration.description) continue;
    const normalized = declaration.description.replace(/\s+/g, ' ').trim().toLocaleLowerCase('en');
    const matches = descriptions.get(normalized) ?? [];
    matches.push(declaration);
    descriptions.set(normalized, matches);
  }
  for (const matches of descriptions.values()) {
    if (matches.length > 1)
      matches.forEach((declaration) => duplicateDescriptions.add(declaration));
  }

  const findings = [];
  for (const declaration of declarations) {
    const reason = duplicateDescriptions.has(declaration)
      ? 'duplicate JSDoc description'
      : declaration.reason;
    if (reason) {
      findings.push({
        path: declaration.path,
        line: declaration.line,
        name: declaration.name,
        reason,
      });
    }
  }
  const documentedExports = declarations.length - findings.length;
  const coverage =
    declarations.length === 0 ? 100 : (documentedExports / declarations.length) * 100;

  return {
    minimumCoverage: config.minimumCoverage,
    minimumExports: config.minimumExports ?? 0,
    coverage: Number(coverage.toFixed(2)),
    documentedExports,
    totalExports: declarations.length,
    scannedFiles: sourcePaths.map((path) => toPosix(relative(root, path))),
    findings,
  };
}

/**
 * Generates and prints the documentation coverage report, optionally enforcing configured thresholds.
 */
function main() {
  const report = collectDocstringCoverage();
  console.log(JSON.stringify(report, null, 2));
  if (
    process.argv.includes('--enforce-threshold') &&
    (report.coverage < report.minimumCoverage || report.totalExports < report.minimumExports)
  ) {
    process.exitCode = 1;
  }
}

if (
  process.argv[1] &&
  resolve(process.argv[1]) === resolve(import.meta.filename ?? import.meta.url.slice(7))
) {
  main();
}
