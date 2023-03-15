export type WebvisContextReadyListener = (ctx: webvis.ContextAPI) => void;

const _webVisContextListener: Set<WebvisContextReadyListener> = new Set();

let _webvisContext: webvis.ContextAPI | null = null;

export function registerWebvisContextReadyListener(
  listener: WebvisContextReadyListener
) {
  _webVisContextListener.add(listener);

  if (_webvisContext) {
    listener(_webvisContext);
  }
}

export function unregisterWebvisContextReadyListener(
  listener: WebvisContextReadyListener
) {
  _webVisContextListener.delete(listener);
}

export function setGlobalWebvisContext(ctx: webvis.ContextAPI) {
  if (!ctx) {
    console.error('setGlobalWebvisContext: Setting invalid webvis context');
  }

  _webvisContext = ctx;

  _webVisContextListener.forEach((l) => l(ctx));
}

export function getGlobalWebvisContext(): webvis.ContextAPI {
  if (!_webvisContext) {
    console.error('getGlobalWebvisContext: Webvis Context is not ready yet');
    throw new Error('Webvis Context is not ready yet');
  } else {
    return _webvisContext;
  }
}
