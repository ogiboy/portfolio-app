import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { relative, resolve, sep } from 'node:path';
import { gzipSync } from 'node:zlib';

const root = process.cwd();
const nextDirectory = resolve(root, '.next');
const staticDirectory = resolve(nextDirectory, 'static');
const baselinePath = resolve(root, 'scripts/qa/bundle-budget-baseline.json');
const buildCompletionMarker = resolve(nextDirectory, 'trace-build');
const buildInputPaths = [
  resolve(root, 'src'),
  resolve(root, 'package.json'),
  resolve(root, 'pnpm-lock.yaml'),
  resolve(root, 'next.config.mjs'),
];
const expectedIncreaseBytes = 15 * 1024;
const maxMotionFeatureGzipBytes = 20 * 1024;
const homeRouteArtifacts = [
  { route: '/en', artifact: 'server/app/en.html' },
  { route: '/tr', artifact: 'server/app/tr.html' },
];
const excludedRouteArtifacts = [
  { route: '/en/projects', artifact: 'server/app/en/projects.html' },
  { route: '/tr/projects', artifact: 'server/app/tr/projects.html' },
  {
    route: '/en/labs/retro-game-center',
    artifact: 'server/app/en/labs/retro-game-center.html',
  },
  {
    route: '/tr/labs/retro-game-center',
    artifact: 'server/app/tr/labs/retro-game-center.html',
  },
];
const cinematicRailModule = 'src/components/client/cinematic-work-rail.tsx';
const cinematicRailMarker = 'data-cinematic-rail';
const motionFeatureLoadableKey = 'components/client/cinematic-work-rail.tsx -> ./motion-features';

/**
 * Abort the bundle budget gate with a descriptive error.
 * @param {string} message - The reason the gate failed.
 * @throws {Error} An error containing the bundle budget failure message.
 */
function fail(message) {
  throw new Error(`Bundle budget gate failed: ${message}`);
}

/**
 * Loads and parses a required JSON file.
 * @param {string} path - The file path to read.
 * @param {string} description - A human-readable description of the file.
 * @return {unknown} The parsed JSON value.
 */
function readJson(path, description) {
  if (!existsSync(path)) {
    fail(
      `${description} is missing at ${path}. Run \`pnpm build\` immediately before \`pnpm qa:bundle-budget\`.`,
    );
  }

  try {
    return JSON.parse(readFileSync(path, 'utf8'));
  } catch (error) {
    fail(`${description} at ${path} is unreadable: ${error.message}`);
  }
}

/**
 * Formats a byte count with its byte and kibibyte values.
 * @param {number} bytes - The number of bytes.
 * @returns {string} The formatted byte count.
 */
function formatBytes(bytes) {
  return `${bytes.toLocaleString('en-US')} B (${(bytes / 1024).toFixed(2)} KiB)`;
}

/**
 * Finds the most recently modified file among the configured production build inputs.
 * @returns {{path: string, mtimeMs: number}} The path and modification time of the newest build input.
 * @throws {Error} If a required build input is missing or no files are found.
 */
function newestBuildInput() {
  let newest;

  function visit(path) {
    if (!existsSync(path)) {
      fail(`required build input ${path} is missing. Run \`pnpm build\` after restoring it.`);
    }

    const stats = statSync(path);
    if (stats.isDirectory()) {
      for (const entry of readdirSync(path, { withFileTypes: true }).sort((left, right) =>
        left.name.localeCompare(right.name),
      )) {
        if (entry.isDirectory() || entry.isFile()) visit(resolve(path, entry.name));
      }
      return;
    }

    if (!stats.isFile()) return;
    if (!newest || stats.mtimeMs > newest.mtimeMs) newest = { path, mtimeMs: stats.mtimeMs };
  }

  for (const path of buildInputPaths) visit(path);
  if (!newest) {
    throw new Error('Bundle budget gate failed: no production build inputs were found.');
  }
  return newest;
}

/**
 * Verifies that the production build exists and was created after the latest build input changed.
 * @throws {Error} If the build completion marker is missing or the production build is stale.
 */
function assertBuildIsFresh() {
  if (!existsSync(buildCompletionMarker)) {
    fail(
      `completed production build marker is missing at ${buildCompletionMarker}. Run \`pnpm build\` immediately before \`pnpm qa:bundle-budget\`.`,
    );
  }

  const newestInput = newestBuildInput();
  if (newestInput.mtimeMs > statSync(buildCompletionMarker).mtimeMs) {
    fail(
      `production build is stale: ${relative(root, newestInput.path)} changed after .next/trace-build. Run \`pnpm build\` immediately before \`pnpm qa:bundle-budget\`.`,
    );
  }
}

/**
 * Resolves a static asset reference to an existing file within the Next.js static output directory.
 * @param {string} relativePath - The encoded asset path relative to the Next.js output directory.
 * @param {string} description - A description used in failure messages.
 * @returns {{relativePath: string, resolvedAssetPath: string}} The decoded asset path and its resolved filesystem path.
 */
function resolveStaticAsset(relativePath, description) {
  let decodedRelativePath;
  try {
    decodedRelativePath = decodeURIComponent(relativePath);
  } catch {
    fail(`${description} cannot be decoded. Run \`pnpm build\` and retry.`);
  }

  const resolvedAssetPath = resolve(nextDirectory, decodedRelativePath);
  if (!resolvedAssetPath.startsWith(`${staticDirectory}${sep}`)) {
    fail(`${description} resolves outside .next/static.`);
  }
  if (!existsSync(resolvedAssetPath)) {
    fail(
      `stale artifact ${description} resolves to missing ${resolvedAssetPath}. Run \`pnpm build\` and retry.`,
    );
  }

  return { relativePath: decodedRelativePath, resolvedAssetPath };
}

/**
 * Resolves an attributable Next.js static JavaScript asset URL.
 * @param {string} url - The asset URL to resolve.
 * @param {string} artifactPath - The artifact path associated with the URL.
 * @returns {{relativePath: string, resolvedAssetPath: string}|undefined} The resolved asset information, or `undefined` for non-static JavaScript URLs.
 */
function assetPathFromUrl(url, artifactPath) {
  const pathname = new URL(url, 'https://bundle-budget.invalid').pathname;
  if (!pathname.startsWith('/_next/static/') || !pathname.endsWith('.js')) return undefined;

  return resolveStaticAsset(
    pathname.slice('/_next/'.length),
    `asset URL ${url} in ${artifactPath}`,
  );
}

/**
 * Extracts script source URLs from an HTML document.
 * @param {string} html - The HTML content to inspect.
 * @param {string} artifactPath - The artifact path used in parsing error messages.
 * @returns {string[]} The extracted script source URLs.
 */
function scriptSourceUrls(html, artifactPath) {
  const urls = [];
  let cursor = 0;

  while (cursor < html.length) {
    const tagStart = html.indexOf('<script', cursor);
    if (tagStart === -1) break;

    const tagEnd = html.indexOf('>', tagStart);
    if (tagEnd === -1) fail(`${artifactPath} contains an unterminated script tag.`);

    const tag = html.slice(tagStart, tagEnd + 1);
    const srcAttribute = tag.indexOf('src=');
    if (srcAttribute !== -1) {
      const quote = tag[srcAttribute + 'src='.length];
      if (quote !== '"' && quote !== "'") {
        fail(`${artifactPath} contains an unsupported unquoted script source.`);
      }
      const valueStart = srcAttribute + 'src='.length + 1;
      const valueEnd = tag.indexOf(quote, valueStart);
      if (valueEnd === -1) fail(`${artifactPath} contains an unterminated script source.`);
      urls.push(tag.slice(valueStart, valueEnd));
    }

    cursor = tagEnd + 1;
  }

  return urls;
}

/**
 * Reads a route artifact and resolves its initial JavaScript assets.
 * @param {Object} options - Route artifact options.
 * @param {string} options.route - Route represented by the artifact.
 * @param {string} options.artifact - Path to the route artifact relative to `.next`.
 * @returns {{route: string, artifactPath: string, scripts: Map<string, string>}} The route, resolved artifact path, and map of asset paths to resolved files.
 */
function readInitialScripts({ route, artifact }) {
  const artifactPath = resolve(nextDirectory, artifact);
  if (!existsSync(artifactPath)) {
    fail(
      `production route artifact for ${route} is missing at ${artifactPath}. Run \`pnpm build\` and retry.`,
    );
  }

  const html = readFileSync(artifactPath, 'utf8');
  const scripts = new Map();
  for (const url of scriptSourceUrls(html, artifactPath)) {
    const asset = assetPathFromUrl(url, artifactPath);
    if (asset) scripts.set(asset.relativePath, asset.resolvedAssetPath);
  }
  if (scripts.size === 0) {
    fail(
      `${artifactPath} contains no initial /_next/static JavaScript assets. Its build output is unsupported or stale.`,
    );
  }

  return { route, artifactPath, scripts };
}

/**
 * Calculates the combined gzip size of JavaScript assets.
 * @param {Map<string, string>} scriptAssets - Asset paths keyed by their relative paths.
 * @returns {number} The total compressed size in bytes.
 */
function gzipBytes(scriptAssets) {
  return [...scriptAssets.values()].reduce(
    (total, assetPath) => total + gzipSync(readFileSync(assetPath)).byteLength,
    0,
  );
}

/**
 * Reads and parses the home route's client-reference manifest.
 * @returns {object} The manifest containing the `clientModules` entry.
 */
function readHomeClientManifest() {
  const manifestPath = resolve(
    nextDirectory,
    'server/app/[locale]/page_client-reference-manifest.js',
  );
  if (!existsSync(manifestPath)) {
    fail(
      `home client-reference manifest is missing at ${manifestPath}. Run \`pnpm build\` and retry.`,
    );
  }

  const source = readFileSync(manifestPath, 'utf8');
  const assignment = 'globalThis.__RSC_MANIFEST["/[locale]/page"]=';
  const jsonStart = source.indexOf(assignment) + assignment.length;
  const jsonEnd = source.lastIndexOf(';');
  if (jsonStart < assignment.length || jsonEnd <= jsonStart) {
    fail(`home client-reference manifest at ${manifestPath} has an unsupported assignment format.`);
  }

  let manifest;
  try {
    manifest = JSON.parse(source.slice(jsonStart, jsonEnd));
  } catch (error) {
    fail(
      `home client-reference manifest at ${manifestPath} could not be parsed as JSON: ${error.message}`,
    );
  }

  if (!manifest?.clientModules) {
    fail(
      `home client-reference manifest at ${manifestPath} has no clientModules entry. Its build output is unsupported or stale.`,
    );
  }
  return manifest;
}

/**
 * Verifies that cinematic rail chunks are present on the home route and isolated from excluded routes.
 * @param {Object} home - Home route data containing its initial script assets.
 * @param {Object[]} excludedRoutes - Route data that must not include cinematic rail chunks.
 * @returns {string[]} Relative paths of the cinematic rail chunks attributed to the home route.
 */
function assertCinematicRailIsolated(home, excludedRoutes) {
  const manifest = readHomeClientManifest();
  const moduleEntry = Object.entries(manifest.clientModules).find(([modulePath]) =>
    modulePath.replaceAll('\\', '/').endsWith(cinematicRailModule),
  )?.[1];
  if (!moduleEntry?.chunks) {
    fail(
      `could not find ${cinematicRailModule} in the home client-reference manifest. Update this gate when the client boundary changes.`,
    );
  }

  const moduleChunks = new Set(
    moduleEntry.chunks
      .filter(
        (chunk) =>
          typeof chunk === 'string' && chunk.startsWith('static/') && chunk.endsWith('.js'),
      )
      .map((chunk) => decodeURIComponent(chunk)),
  );
  const railChunks = [...home.scripts].filter(
    ([relativePath, assetPath]) =>
      moduleChunks.has(relativePath) &&
      readFileSync(assetPath, 'utf8').includes(cinematicRailMarker),
  );
  if (railChunks.length === 0) {
    fail(
      `could not deterministically attribute an initial cinematic rail chunk from ${cinematicRailModule}. Update the marker or client-manifest mapping before relying on this gate.`,
    );
  }

  for (const excludedRoute of excludedRoutes) {
    const leakedChunks = railChunks
      .map(([relativePath]) => relativePath)
      .filter((relativePath) => excludedRoute.scripts.has(relativePath));
    if (leakedChunks.length > 0) {
      fail(`${excludedRoute.route} pulls cinematic rail chunk(s): ${leakedChunks.join(', ')}.`);
    }
  }

  return railChunks.map(([relativePath]) => relativePath);
}

/**
 * Measures the gzip size of JavaScript chunks attributed to the Motion feature dynamic import.
 * @returns {{chunks: string[], gzipSize: number}} The attributed chunk paths and their combined gzip size in bytes.
 */
function measureMotionFeatureChunks() {
  const manifest = readJson(
    resolve(nextDirectory, 'react-loadable-manifest.json'),
    'React loadable manifest',
  );
  const entry = manifest[motionFeatureLoadableKey];
  if (!Array.isArray(entry?.files)) {
    fail(
      `could not find the ${motionFeatureLoadableKey} dynamic-import entry in .next/react-loadable-manifest.json. Update this gate when the Motion feature boundary changes.`,
    );
  }

  const assets = new Map();
  for (const file of entry.files) {
    if (typeof file !== 'string' || !file.startsWith('static/') || !file.endsWith('.js')) continue;
    const asset = resolveStaticAsset(file, `Motion feature asset ${file}`);
    assets.set(asset.relativePath, asset.resolvedAssetPath);
  }
  if (assets.size === 0) {
    fail(`the ${motionFeatureLoadableKey} dynamic import has no attributable JavaScript chunks.`);
  }

  const gzipSize = gzipBytes(assets);
  if (gzipSize > maxMotionFeatureGzipBytes) {
    fail(
      `Motion feature dynamic import is ${formatBytes(gzipSize)}, above the ${formatBytes(maxMotionFeatureGzipBytes)} gzip budget.`,
    );
  }

  return { chunks: [...assets.keys()], gzipSize };
}

const baseline = readJson(baselinePath, 'bundle budget baseline');
const installedNextVersion = readJson(
  resolve(root, 'node_modules/next/package.json'),
  'installed Next.js package',
).version;
if (baseline.schemaVersion !== 1)
  fail(`baseline schemaVersion must be 1, received ${baseline.schemaVersion}.`);
if (baseline.nextVersion !== installedNextVersion) {
  fail(
    `baseline targets Next.js ${baseline.nextVersion}, but this build uses ${installedNextVersion}. Re-measure and intentionally update ${baselinePath}.`,
  );
}
if (baseline.maxIncreaseGzipBytes !== expectedIncreaseBytes) {
  fail(
    `baseline maxIncreaseGzipBytes must be ${expectedIncreaseBytes} (+15 KiB), received ${baseline.maxIncreaseGzipBytes}.`,
  );
}
if (!Number.isInteger(baseline.homeInitialGzipBytes) || baseline.homeInitialGzipBytes <= 0) {
  fail(
    `baseline homeInitialGzipBytes must be a positive integer, received ${baseline.homeInitialGzipBytes}.`,
  );
}

assertBuildIsFresh();
const homes = homeRouteArtifacts.map(readInitialScripts);
const excludedRoutes = excludedRouteArtifacts.map(readInitialScripts);
const currentHomeGzipBytes = Math.max(...homes.map((home) => gzipBytes(home.scripts)));
const budgetGzipBytes = baseline.homeInitialGzipBytes + baseline.maxIncreaseGzipBytes;
if (currentHomeGzipBytes > budgetGzipBytes) {
  fail(
    `home initial JavaScript is ${formatBytes(currentHomeGzipBytes)}, above the ${formatBytes(budgetGzipBytes)} budget (baseline ${formatBytes(baseline.homeInitialGzipBytes)} + ${formatBytes(baseline.maxIncreaseGzipBytes)}).`,
  );
}

const railChunks = assertCinematicRailIsolated(homes[0], excludedRoutes);
const motionFeatures = measureMotionFeatureChunks();
console.log('Bundle budget gate passed.');
for (const home of homes) {
  console.log(
    `- ${home.route}: ${formatBytes(gzipBytes(home.scripts))} gzip across ${home.scripts.size} initial JS assets`,
  );
}
console.log(
  `- budget: ${formatBytes(budgetGzipBytes)} (baseline ${formatBytes(baseline.homeInitialGzipBytes)} + ${formatBytes(baseline.maxIncreaseGzipBytes)})`,
);
console.log(`- cinematic rail chunk(s): ${railChunks.join(', ')}`);
for (const route of excludedRoutes) console.log(`- ${route.route}: no cinematic rail chunk`);
console.log(
  `- Motion feature dynamic import: ${formatBytes(motionFeatures.gzipSize)} gzip across ${motionFeatures.chunks.length} chunk(s) (limit ${formatBytes(maxMotionFeatureGzipBytes)})`,
);
