import { DOMAttributes } from 'react';

type CustomElement<T> = Partial<T & DOMAttributes<T> & { children: any }>;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['webvis-viewer']: CustomElement<HTMLDivElement> & { context?: string };
    }
  }
}

/**
 * Wrapper for the webVis viewer component.
 */
export default function WebvisViewer(): JSX.Element {
  return <webvis-viewer context='myContext'></webvis-viewer>;
}
