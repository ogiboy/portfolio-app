/** Describes trusted status messages emitted by the embedded WASM game. */
export type WasmStatusMessage = {
  attempt: string;
  channel: 'hot-wasm';
  status: 'ready' | 'error';
  version: 1;
};

/**
 * Determines whether an unknown value is a valid WASM status message.
 *
 * @param value - The value to validate.
 * @returns `true` if the value matches the WASM status message protocol, `false` otherwise.
 */
export function isWasmStatusMessage(value: unknown): value is WasmStatusMessage {
  if (!value || typeof value !== 'object') return false;

  const candidate = value as Partial<WasmStatusMessage>;
  return (
    candidate.channel === 'hot-wasm' &&
    candidate.version === 1 &&
    (candidate.status === 'ready' || candidate.status === 'error') &&
    typeof candidate.attempt === 'string'
  );
}
