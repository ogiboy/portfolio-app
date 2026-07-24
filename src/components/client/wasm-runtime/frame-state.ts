/** Represents each visible lifecycle state for the embedded game frame. */
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

/**
 * Selects localized status copy for the specified game frame lifecycle state.
 *
 * @param frameState - The current lifecycle state of the game frame
 * @param copy - Localized text for each lifecycle state
 * @returns An object containing the corresponding `title` and `body`; ready state uses an empty body
 */
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
