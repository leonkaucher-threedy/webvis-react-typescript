import React, { useEffect, useState } from 'react';
import useExternalScripts from './hooks/useExternalScripts';
import WebvisViewer from './WebvisViewer';

export interface WebvisProps {
  webvisJS: string;
  onWebvisReady?: (ctx: webvis.ContextAPI) => void;
  onWebvisError?: (errorMessage: string) => void;
}

function waitForInitWebvis(ctx: webvis.ContextAPI): Promise<webvis.ContextAPI> {
  const promise = new Promise<webvis.ContextAPI>((resolve) => {
    ctx.waitFor('init').then(() => {
      const listenerID = ctx.registerListener(
        [webvis.EventType.VIEWER_CREATED],
        () => {
          ctx.unregisterListener(listenerID);
          resolve(ctx);
        }
      );
    });
  });

  return promise;
}

export default function Webvis(props: WebvisProps): JSX.Element {
  const [scriptLoaded, setScriptLoaded] = useState<boolean>(false);

  useExternalScripts(
    props.webvisJS,
    () => setScriptLoaded(true),
    props.onWebvisError
  );

  useEffect(() => {
    if (scriptLoaded) {
      const ctx = webvis.getContext('default_context');
      if (ctx !== undefined) {
        waitForInitWebvis(ctx).then((ctx: webvis.ContextAPI) => {
          if (props.onWebvisReady) {
            props.onWebvisReady(ctx);
          }
        });
      }
    }
  }, [scriptLoaded, props]);

  if (scriptLoaded) {
    return <WebvisViewer />;
  } else {
    return <div></div>;
  }
}
