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

  useExternalScripts(
    props.webvisJS,
    () => setScriptLoaded(true),
    props.onWebvisError
  );

  useEffect(() => {
    if (scriptLoaded) {
      Promise.resolve(webvis.getContext('default_context'))
        .then((ctx: webvis.ContextAPI | undefined) => {
          if (props.onWebvisReady && ctx) {
            props.onWebvisReady(ctx);
          }
        })
        .catch((error) => {
          if (props.onWebvisError) {
            props.onWebvisError(error.message);
          }
        });
    }
  }, [scriptLoaded, props]);

  if (scriptLoaded) {
    return <WebvisViewer />;
  } else {
    return <div></div>;
  }
}
