import { useEffect, useRef, useState } from 'react';
import useExternalScripts from './hooks/useExternalScripts';

export interface WebvisProps {
  /**
   * The URL to the webvis JS library that is provided by your instant3Dhub installation.
   * E.g.: https://hubdemo.threedy.io/repo/webvis/webvis.js
   */
  webvisJS: string;

  /**
   * The name of the webvis context.
   * If two webvis viewer have the same context, they also show the same content as the share a 
   * common state.
   */
  contextName: string;

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
  const { webvisJS, contextName, onWebvisReady, onWebvisError } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<webvis.ContextAPI | undefined>(undefined);
  const [viewer, setViewer] = useState<webvis.ViewerAPI | undefined>(undefined);
  const [scriptLoaded, setScriptLoaded] = useState<boolean>(false);

  // hook to load the webvis script
  useExternalScripts(webvisJS, () => setScriptLoaded(true), onWebvisError);

  // hook to create the webvis context
  useEffect(() => {
    if (!scriptLoaded || context) {
      return;
    }

    console.log('Request webvis context...');

    webvis.requestContext(contextName).then(ctx => {
      if (ctx) {
        setContext(ctx);
      } else {
        console.error(`Failed to get webvis context ${contextName}`);

        if (onWebvisError) {
          onWebvisError(`Failed to get webvis context ${contextName}`);
        }
      }
    });
  }, [scriptLoaded, context, contextName, onWebvisError]);

  // hook to create webvis viewer
  useEffect(() => {
    if (!context || viewer) {
      return;
    }

    console.log('Create webvis viewer...');

    setViewer(context.createViewer("myFirstViewer", canvasRef.current as HTMLCanvasElement));

    if(onWebvisReady) {
      onWebvisReady(context);
    }
  }, [context, viewer, onWebvisReady]);

  return <canvas style={{width: '100%', height: '100%'}} ref={canvasRef} />;
}
