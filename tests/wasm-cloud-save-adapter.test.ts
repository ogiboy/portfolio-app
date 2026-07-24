import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const root = process.cwd();
const read = (path: string) => readFileSync(resolve(root, path), 'utf8');

const adapter = read('public/wasm/engine/cloud-save-adapter.js');
const diffAdapter = read('public/wasm/engine/cloud-save-diff-adapter.js');
const runtime = read('public/wasm/engine/script.js');
const security = read('public/wasm/engine/runtime-security.js');

describe('WASM cloud save adapter', () => {
  it('keeps the generated-runtime API as thin delegations', () => {
    expect(runtime).toContain('this.cloudSave = new window.HotWasmCloudSaveAdapter(this);');
    expect(runtime).toContain('this.cloudSave.saveStateEvent();');
    expect(runtime).toContain('return this.cloudSave.loadHardDriveDiffs(byteArray);');
    expect(runtime).toContain('return this.cloudSave.saveHardDriveDiffs();');
    expect(runtime).toContain('this.cloudSave.loadCloud();');
    expect(runtime).toContain('return this.cloudSave.loginToServer();');
    expect(runtime).toContain('return this.cloudSave.getSaveStates();');
  });

  it('routes every cloud endpoint through the approved URL helper', () => {
    const cloudSources = `${adapter}\n${diffAdapter}`;

    expect(adapter).toContain('security.resolveApprovedCloudUrl(');
    expect(diffAdapter).toContain("adapter.cloudUrl('SendStaveState'");
    expect(adapter).toMatch(/this\.cloudUrl\('LoadStaveState'/g);
    expect(adapter).toContain("this.cloudUrl('Login'");
    expect(adapter).toContain("this.cloudUrl('GetSaveStates'");
    expect(cloudSources).not.toMatch(/CLOUDSAVEURL\s*\+/);
    expect(cloudSources).not.toMatch(/new URL\([^\n]*CLOUDSAVEURL/);
    expect(runtime).not.toContain('resolveApprovedCloudUrl');
    expect(security).toContain('target.searchParams.set(key, String(value))');
  });

  it('keeps cloud authentication in memory across the extracted transport', () => {
    const cloudSources = `${adapter}\n${diffAdapter}`;

    expect(`${runtime}\n${cloudSources}`).not.toContain('doswasmx-password');
    expect(cloudSources).not.toContain('localStorage');
    expect(runtime).toContain("this.state.password = '';");
  });

  it('rejects unavailable cloud drive diffs with meaningful errors', () => {
    expect(adapter).toContain("reject(new Error('Cloud hard-drive diff response was empty.'));");
    expect(adapter).toContain("new Error('Failed to apply cloud hard-drive diffs.')");
    expect(adapter).not.toMatch(/reject\(\);/);
  });

  it('formats saved diff sizes with the standard US thousands separator', () => {
    expect(diffAdapter).toContain("finalArray.length.toLocaleString('en-US')");
    expect(diffAdapter).not.toContain('replace(/\\B(?=(\\d{3})+(?!\\d))/g');
  });

  it('loads the adapter statically and leaves it Sonar-analyzed', () => {
    const html = read('public/wasm/engine/index.html');
    const localSonar = read('sonar-project.properties');
    const hostedSonar = read('.sonarcloud.properties');

    expect(html.indexOf('cloud-save-adapter.js')).toBeLessThan(
      html.indexOf('cloud-save-diff-adapter.js'),
    );
    expect(html.indexOf('cloud-save-diff-adapter.js')).toBeLessThan(html.indexOf('settings.js'));
    expect(localSonar).not.toContain('public/wasm/engine/cloud-save-adapter.js');
    expect(localSonar).not.toContain('public/wasm/engine/cloud-save-diff-adapter.js');
    expect(hostedSonar).not.toContain('public/wasm/engine/cloud-save-adapter.js');
    expect(hostedSonar).not.toContain('public/wasm/engine/cloud-save-diff-adapter.js');
  });
});
