import React, { useEffect, useState } from 'react';
import useExternalScripts from './hooks/useExternalScripts';
import WebvisViewer from './WebvisViewer';

export interface WebvisProps {
  webvisJS: string;
  onWebvisReady?: (ctx: webvis.ContextAPI) => void;
  onWebvisError?: (errorMessage: string) => void;
}

export default function Webvis(props: WebvisProps): JSX.Element {
  const [scriptLoaded, setScriptLoaded] = useState<boolean>(false);
  const [contextReady, setContextReady] = useState<boolean>(false);

  useExternalScripts(
    props.webvisJS,
    () => setScriptLoaded(true),
    props.onWebvisError
  );

  useEffect(() => {
    (async () => {
      if (scriptLoaded) {
        const ctx =
          webvis.getContext('myContext') ??
          (await webvis.requestContext('myContext'));
        setContextReady(true);
        if (props.onWebvisReady && ctx !== undefined) {
          props.onWebvisReady(ctx);
        }
      }
    })();
  }, [scriptLoaded, props.onWebvisReady]);

  if (scriptLoaded && contextReady) {
    return <WebvisViewer />;
  } else {
    return <div></div>;
  }
}
