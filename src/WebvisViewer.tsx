import React, { DOMAttributes } from "react";

type CustomElement<T> = Partial<T & DOMAttributes<T> & { children: any }>;

declare global {
    namespace JSX {
        interface IntrinsicElements {
            ['webvis-viewer']: CustomElement<HTMLDivElement>;
        }
    }
}

export default function WebvisViewer(): JSX.Element {
    return (
        <webvis-viewer>
        </webvis-viewer>
    )
}