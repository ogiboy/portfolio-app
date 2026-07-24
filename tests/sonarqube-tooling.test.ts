import { execFileSync, spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { parseDocument } from 'yaml';

const root = process.cwd();
const readProjectFile = (path: string) => readFileSync(join(root, path), 'utf8');

function parseYamlFile<T>(path: string) {
  const document = parseDocument(readProjectFile(path), { uniqueKeys: true });
  if (document.errors.length > 0) {
    throw new Error(document.errors.map((error) => error.message).join('\n'));
  }
  return document.toJS() as T;
}

function parsePropertiesText(source: string) {
  const properties: Record<string, string> = {};

  for (const rawLine of source.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#') || line.startsWith('!')) continue;

    const entry = /^([^:=\s]+)\s*[:=]\s*(.*)$/.exec(line);
    if (!entry) throw new Error(`Invalid properties entry: ${line}`);

    const [, key, value] = entry;
    if (Object.hasOwn(properties, key)) throw new Error(`Duplicate properties key: ${key}`);
    properties[key] = value;
  }

  return properties;
}

const scripts = [
  'scripts/sonarqube/start-local.sh',
  'scripts/sonarqube/status-local.sh',
  'scripts/sonarqube/stop-local.sh',
  'scripts/sonarqube/run_sonar_scan.sh',
  'scripts/qa/run_sonar_scan.sh',
];

describe('local SonarQube tooling', () => {
  it('uses the shared, pinned Community Build and PostgreSQL 17 volumes', () => {
    const compose = parseYamlFile<{
      services: {
        db: { image: string; container_name: string };
        sonarqube: { image: string; environment: Record<string, string>; ports: string[] };
      };
      volumes: Record<string, { name: string }>;
    }>('scripts/sonarqube/docker-compose.sonarqube.yml');

    expect(compose.services.db).toMatchObject({
      image: 'postgres:17-alpine',
      container_name: 'sonarqube-db',
    });
    expect(compose.services.sonarqube.image).toBe(
      'sonarqube:community-26.7.0.124771@sha256:160bd2f6a3485bd09b655ef22dd63c02bd1fa7ba82aa5d9973fd010b8bcca0b3',
    );
    expect(compose.services.sonarqube.ports).toEqual(['127.0.0.1:9000:9000']);
    expect(compose.volumes).toEqual({
      sonarqube_data: { name: 'sonarqube_data' },
      sonarqube_extensions: { name: 'sonarqube_extensions' },
      sonarqube_logs: { name: 'sonarqube_logs' },
      sonarqube_postgres: { name: 'sonarqube_postgres' },
    });

    const composeText = readProjectFile('scripts/sonarqube/docker-compose.sonarqube.yml');
    expect(composeText).not.toContain('uykuluk');
    expect(composeText).not.toContain('agentic-trader');
    expect(composeText).toContain('SONAR_AUTH_JWTBASE64HS256SECRET');
    const jwtDefault = compose.services.sonarqube.environment.SONAR_AUTH_JWTBASE64HS256SECRET;
    const jwtFallback = jwtDefault.match(/:-([^}]+)}/)?.[1];
    expect(jwtFallback).toBeDefined();
    expect(Buffer.from(jwtFallback!, 'base64').byteLength).toBeGreaterThanOrEqual(32);
  });

  it('keeps lifecycle scripts strict, validated, bounded, and non-destructive', () => {
    for (const script of scripts) {
      execFileSync('bash', ['-n', script], { cwd: root, stdio: 'pipe' });
    }

    const start = readProjectFile('scripts/sonarqube/start-local.sh');
    const status = readProjectFile('scripts/sonarqube/status-local.sh');
    const stop = readProjectFile('scripts/sonarqube/stop-local.sh');

    expect(start).toContain('set -Eeuo pipefail');
    expect(start).toContain('config --quiet');
    expect(start).toContain('require_command curl');
    expect(start).toContain('START_TIMEOUT_SECONDS');
    expect(start).toContain('/api/system/status');
    expect(status).toContain('Docker is required');
    expect(status).toContain('curl is required');
    expect(stop).toContain('config --quiet');
    expect(stop).toContain('volumes were retained');
    expect(stop).not.toContain('status-local.sh');

    for (const script of [start, status, stop]) {
      expect(script).not.toMatch(/\bdocker\s+(?:system\s+prune|volume\s+rm|rm)\b/);
      expect(script).not.toMatch(/\bdown\s+.*(?:-v|--volumes)\b/);
      expect(script).not.toMatch(/\brm\s+-rf\b/);
    }

    for (const script of [
      'scripts/sonarqube/start-local.sh',
      'scripts/sonarqube/status-local.sh',
    ]) {
      const result = spawnSync('bash', [script], {
        cwd: root,
        encoding: 'utf8',
        env: { ...process.env, SONAR_HOST_URL: 'https://sonarcloud.io' },
      });

      expect(result.status).toBe(1);
      expect(result.stderr).toContain(
        'This script is local-only and requires SONAR_HOST_URL=http://localhost:9000.',
      );
    }
  });

  it('protects tokens, requires LCOV, and scans only the local server', () => {
    const scan = readProjectFile('scripts/qa/run_sonar_scan.sh');

    expect(scan).toContain('coverage/lcov.info');
    expect(scan).toContain('pnpm');
    expect(scan).toContain('test:coverage');
    expect(scan).toContain('SONAR_SKIP_COVERAGE');
    expect(scan).toContain('LCOV coverage is required');
    expect(scan).toContain('security find-generic-password');
    expect(scan).toContain('codex-sonarqube-token');
    expect(scan).toContain('SONAR_TOKEN_REDACT');
    expect(scan).toContain('exec sonar-scanner-npm');
    expect(scan).toContain('-Dproject.settings=sonar-project.properties');
    expect(scan).toContain('/api/system/status');
    expect(scan).toContain('.ai/qa/artifacts/sonar');
    expect(scan).toContain('This script is local-only');
    expect(scan).not.toContain('sonarcloud.io');
    expect(scan).not.toMatch(/exec sonar(?:\s|$)/);
    expect(scan).not.toMatch(/(?:echo|printf)[^\n]*\$\{?SONAR_TOKEN(?:\}|\s|"|$)/);
  });

  it('keeps local analysis scoped to authored code and the honest Vitest coverage boundary', () => {
    const sonar = parsePropertiesText(readProjectFile('sonar-project.properties'));
    const cloud = parsePropertiesText(readProjectFile('.sonarcloud.properties'));

    expect(sonar).toMatchObject({
      'sonar.projectKey': 'portfolio-app',
      'sonar.projectName': 'portfolio-app',
      'sonar.javascript.lcov.reportPaths': 'coverage/lcov.info',
      'sonar.typescript.tsconfigPaths': 'tsconfig.json',
      'sonar.cpd.exclusions': expect.stringContaining('src/content/site.ts'),
      'sonar.qualitygate.wait': 'true',
      'sonar.qualitygate.timeout': '300',
    });
    expect(cloud).toMatchObject({
      'sonar.projectKey': 'ogiboy_portfolio-app',
      'sonar.organization': 'ogiboy',
      'sonar.projectName': 'portfolio-app',
      'sonar.javascript.lcov.reportPaths': 'coverage/lcov.info',
      'sonar.typescript.tsconfigPaths': 'tsconfig.json',
      'sonar.qualitygate.wait': 'true',
      'sonar.qualitygate.timeout': '300',
    });
    expect(sonar['sonar.sources']).toContain('src,scripts,.github/workflows');
    expect(sonar['sonar.sources']).toContain('public/wasm/engine');
    expect(sonar['sonar.exclusions']).toContain('public/wasm/engine/main.js');
    expect(sonar['sonar.exclusions']).toContain('**/*.png');
    expect(sonar['sonar.exclusions']).toContain('public/wasm/roms/**');
    expect(sonar['sonar.coverage.exclusions']).toContain('src/app/**');
    expect(sonar['sonar.coverage.exclusions']).toContain('src/components/site/site-header.tsx');
    expect(sonar['sonar.coverage.exclusions']).toContain('scripts/sonarqube/**');
    expect(sonar['sonar.coverage.exclusions']).not.toContain('scripts/**');
    expect(Object.values(sonar).join('\n')).not.toMatch(/uykuluk|agentic.trader/i);

    for (const key of [
      'sonar.projectName',
      'sonar.projectDescription',
      'sonar.sourceEncoding',
      'sonar.sources',
      'sonar.tests',
      'sonar.javascript.lcov.reportPaths',
      'sonar.typescript.tsconfigPaths',
      'sonar.exclusions',
      'sonar.coverage.exclusions',
      'sonar.cpd.exclusions',
      'sonar.qualitygate.wait',
      'sonar.qualitygate.timeout',
    ]) {
      expect(cloud[key], `${key} must match local analysis`).toBe(sonar[key]);
    }
  });

  it('runs LCOV-backed CI analysis against SonarQube Cloud without a duplicate gate action', () => {
    const workflow = parseYamlFile<{
      jobs: {
        analyze: {
          steps: Array<{
            if?: string;
            name?: string;
            uses?: string;
            run?: string;
            with?: Record<string, unknown>;
            env?: Record<string, string>;
          }>;
        };
      };
    }>('.github/workflows/sonar.yml');
    const { steps } = workflow.jobs.analyze;
    const checkout = steps.find((step) => step.name === 'Checkout full history');
    const coverage = steps.find((step) => step.name === 'Generate LCOV coverage');
    const scan = steps.find((step) => step.name === 'Analyze with SonarQube Cloud');
    const trustGuard = steps.find(
      (step) => step.name === 'Block analysis without trusted PR credentials',
    );
    const tokenGuard = steps.find((step) => step.name === 'Require SonarQube Cloud token');

    expect(trustGuard).toMatchObject({
      if: expect.stringContaining("github.actor == 'dependabot[bot]'"),
      run: expect.stringContaining('exit 1'),
    });
    expect(trustGuard?.if).toContain(
      'github.event.pull_request.head.repo.full_name != github.repository',
    );
    expect(tokenGuard).toMatchObject({
      env: { SONAR_TOKEN: '${{ secrets.SONAR_TOKEN }}' },
      run: expect.stringContaining('Missing SONAR_TOKEN'),
    });
    expect(checkout).toMatchObject({ with: { 'fetch-depth': 0 } });
    expect(coverage).toMatchObject({ run: 'pnpm test:coverage' });
    expect(scan).toMatchObject({
      uses: 'SonarSource/sonarqube-scan-action@22918119ff8e1ca75a623e15c8296b6ea4fbe28f',
      with: { args: '-Dproject.settings=.sonarcloud.properties' },
      env: { SONAR_TOKEN: '${{ secrets.SONAR_TOKEN }}' },
    });

    const workflowSource = readProjectFile('.github/workflows/sonar.yml');
    expect(workflowSource).not.toContain('SONAR_HOST_URL');
    expect(workflowSource).not.toContain('sonarqube-quality-gate-action');
    expect(readProjectFile('.sonarcloud.properties')).toContain(
      'Automatic Analysis must remain disabled',
    );
  });
});
