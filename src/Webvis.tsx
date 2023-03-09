import { useEffect, useState } from 'react';
import useExternalScripts from './hooks/useExternalScripts';
import WebvisViewer from './WebvisViewer';

export interface WebvisProps {
  webvisJS: string;
  onWebvisReady?: (ctx: webvis.ContextAPI) => void;
  onWebvisError?: (errorMessage: string) => void;
}

async function waitForInitWebvis(
  ctx: Promise<webvis.ContextAPI | undefined>
): Promise<webvis.ContextAPI> {
  const context = await ctx;
  if (!context) {
    throw new Error('ContextAPI is undefined');
  }

  await context.waitFor('init');
  const listenerID = context.registerListener(
    [webvis.EventType.VIEWER_CREATED],
    () => {
      context.unregisterListener(listenerID);
    }
  );

  return context;
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
      const ctx = webvis.requestContext('myContext');
      waitForInitWebvis(ctx).then((ctx: webvis.ContextAPI) => {
        if (props.onWebvisReady) {
          props.onWebvisReady(ctx);
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
