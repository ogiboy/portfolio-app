export type WasmStatusMessage = {
  attempt: string;
  channel: 'hot-wasm';
  status: 'ready' | 'error';
  version: 1;
};

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
