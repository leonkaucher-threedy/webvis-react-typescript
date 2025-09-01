import type React from "react";

export interface WebVisViewerElement extends HTMLElement {
	viewer?: string;
	context?: string;
}

interface WebvisIntrinsicElements {
	"webvis-viewer": React.DetailedHTMLProps<
		React.HTMLAttributes<WebVisViewerElement>,
		WebVisViewerElement
	> & {
		viewer?: string;
		context?: string;
	};
}

declare global {
	interface HTMLElementTagNameMap {
		"webvis-viewer": WebVisViewerElement;
	}
	namespace JSX {
		interface IntrinsicElements extends WebvisIntrinsicElements {}
	}
}

declare module "react" {
	namespace JSX {
		interface IntrinsicElements extends WebvisIntrinsicElements {}
	}
}

declare module "react/jsx-runtime" {
	namespace JSX {
		interface IntrinsicElements extends WebvisIntrinsicElements {}
	}
}
