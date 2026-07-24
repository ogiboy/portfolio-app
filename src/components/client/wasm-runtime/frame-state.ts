export type FrameState = 'idle' | 'booting' | 'ready' | 'error' | 'timeout';

type FrameCopy = {
  bootingBody: string;
  bootingTitle: string;
  errorBody: string;
  errorTitle: string;
  idleBody: string;
  idleTitle: string;
  readyLabel: string;
  timeoutBody: string;
  timeoutTitle: string;
};

export function copyForState(frameState: FrameState, copy: FrameCopy) {
  switch (frameState) {
    case 'booting':
      return { body: copy.bootingBody, title: copy.bootingTitle };
    case 'ready':
      return { body: '', title: copy.readyLabel };
    case 'error':
      return { body: copy.errorBody, title: copy.errorTitle };
    case 'timeout':
      return { body: copy.timeoutBody, title: copy.timeoutTitle };
    default:
      return { body: copy.idleBody, title: copy.idleTitle };
  }
}
