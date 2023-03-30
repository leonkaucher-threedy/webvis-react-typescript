import { useEffect, useState } from 'react';
import useExternalScripts from './hooks/useExternalScripts';
import WebvisViewer from './WebvisViewer';

export interface WebvisProps {
    /**
     * The URL to the webvis JS library that is provided by your instant3Dhub installation.
     * E.g.: https://hubdemo.threedy.io/repo/webvis/webvis.js
     */
    webvisJS: string;

    /**
     * Optional callback that is triggered as soon as webvis has been loaded.
     * 
     * @param ctx - The context to the initialized webVis.
     */
    onWebvisReady?: (ctx: webvis.ContextAPI) => void;

    /**
     * Optional callback if initializing webvis failed.
     * 
     * @param errorMessage - Message that describes why initializing webvis failed.
     */
    onWebvisError?: (errorMessage: string) => void;
}

/**
 * The central webvis react component that contains the webvis viewer component.
 */
export default function Webvis(props: WebvisProps): JSX.Element {
  const {onWebvisReady} = props;
  const [scriptLoaded, setScriptLoaded] = useState<boolean>(false);
  const [context, setContext] = useState<webvis.ContextAPI | undefined>(undefined);

  useExternalScripts(props.webvisJS, () => setScriptLoaded(true), props.onWebvisError);

  // hook to trigger webvis ready callback
  useEffect(() => {
    (async () => {
      if (scriptLoaded && !context) {
        const ctx: webvis.ContextAPI | undefined = webvis.getContext('myContext') ?? (await webvis.requestContext('myContext'));
        setContext(ctx);
        if (onWebvisReady && ctx !== undefined) {
          onWebvisReady(ctx);
        }
      }
    })();
  }, [scriptLoaded, onWebvisReady, setContext]);

  if (scriptLoaded && context) {
    return <WebvisViewer />;
  } else {
    return <div></div>;
  }
}
