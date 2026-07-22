import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const expectedMajors = { tsc: 7, tsc6: 6 };

function readCompilerVersion(command) {
  const result = spawnSync(command, ['--version'], {
    encoding: 'utf8',
    shell: process.platform === 'win32',
  });

  if (result.status !== 0) {
    const detail = result.stderr?.trim() || result.error?.message || 'unknown error';
    throw new Error(`Unable to run ${command}: ${detail}`);
  }

  return result.stdout.trim();
}

function assertCompilerMajor(command, output) {
  const match = /^Version (?<major>\d+)\.\d+\.\d+(?:-.+)?$/.exec(output);
  const actualMajor = Number(match?.groups?.major);
  const expectedMajor = expectedMajors[command];

  if (actualMajor !== expectedMajor) {
    throw new Error(`${command} must use TypeScript ${expectedMajor}, received ${output}`);
  }
}

for (const command of Object.keys(expectedMajors)) {
  const output = readCompilerVersion(command);
  assertCompilerMajor(command, output);
  console.log(`${command}: ${output}`);
}

const apiVersion = require('typescript').version;
if (!apiVersion.startsWith('6.')) {
  throw new Error(`The TypeScript JavaScript API must remain on major 6, received ${apiVersion}`);
}

console.log(`typescript API: Version ${apiVersion}`);
console.log('TypeScript dual-toolchain check passed.');
