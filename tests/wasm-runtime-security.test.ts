import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { runInNewContext } from 'node:vm';
import { describe, expect, it } from 'vitest';

const runtimeSecurity = readFileSync(
  resolve(process.cwd(), 'public/wasm/engine/runtime-security.js'),
  'utf8',
);

type SecurityHelpers = {
  secureRandomInteger: (maxExclusive: number) => number;
};

function loadSecurityHarness(randomValues: number[]) {
  let randomCalls = 0;
  const frameWindow: {
    crypto: {
      getRandomValues: (values: Uint32Array) => Uint32Array;
    };
    HotWasmSecurity?: SecurityHelpers;
  } = {
    crypto: {
      getRandomValues(values: Uint32Array) {
        values[0] = randomValues[Math.min(randomCalls, randomValues.length - 1)];
        randomCalls += 1;
        return values;
      },
    },
  };

  runInNewContext(runtimeSecurity, {
    Uint32Array,
    window: frameWindow,
  });

  if (!frameWindow.HotWasmSecurity) {
    throw new Error('Runtime security helpers were not registered.');
  }

  return {
    helpers: frameWindow.HotWasmSecurity,
    randomCalls: () => randomCalls,
  };
}

describe('HotWasmSecurity secureRandomInteger', () => {
  it('rejects the modulo-biased tail before mapping a bounded integer', () => {
    const { helpers, randomCalls } = loadSecurityHarness([0xffffffff, 0xfffffffe]);

    expect(helpers.secureRandomInteger(0xffffffff)).toBe(0xfffffffe);
    expect(randomCalls()).toBe(2);
  });

  it('accepts Uint32 range boundaries and rejects invalid bounds before consuming entropy', () => {
    const { helpers, randomCalls } = loadSecurityHarness([0xffffffff]);

    expect(helpers.secureRandomInteger(0x100000000)).toBe(0xffffffff);
    expect(helpers.secureRandomInteger(1)).toBe(0);
    expect(randomCalls()).toBe(2);

    for (const invalidBound of [0, -1, 1.5, Number.NaN, 0x100000001]) {
      expect(() => helpers.secureRandomInteger(invalidBound)).toThrow(
        'Random integer bound is not approved.',
      );
    }
    expect(randomCalls()).toBe(2);
  });
});
