import { resolve } from 'node:path';
import {
  assertBuildIsFresh,
  assertCinematicRailIsolated,
  fail,
  formatBytes,
  gzipBytes,
  measureMotionFeatureChunks,
  readInitialScripts,
  readJson,
} from './bundle-budget-artifacts.mjs';

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

assertBuildIsFresh({ root, buildCompletionMarker, buildInputPaths });
const assetDirectories = { nextDirectory, staticDirectory };
const homes = homeRouteArtifacts.map((artifact) => readInitialScripts(artifact, assetDirectories));
const excludedRoutes = excludedRouteArtifacts.map((artifact) =>
  readInitialScripts(artifact, assetDirectories),
);
const currentHomeGzipBytes = Math.max(...homes.map((home) => gzipBytes(home.scripts)));
const budgetGzipBytes = baseline.homeInitialGzipBytes + baseline.maxIncreaseGzipBytes;
if (currentHomeGzipBytes > budgetGzipBytes) {
  fail(
    `home initial JavaScript is ${formatBytes(currentHomeGzipBytes)}, above the ${formatBytes(budgetGzipBytes)} budget (baseline ${formatBytes(baseline.homeInitialGzipBytes)} + ${formatBytes(baseline.maxIncreaseGzipBytes)}).`,
  );
}

const railChunks = assertCinematicRailIsolated(homes[0], excludedRoutes, {
  nextDirectory,
  cinematicRailModule,
  cinematicRailMarker,
});
const motionFeatures = measureMotionFeatureChunks({
  nextDirectory,
  staticDirectory,
  motionFeatureLoadableKey,
  maxMotionFeatureGzipBytes,
});
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
