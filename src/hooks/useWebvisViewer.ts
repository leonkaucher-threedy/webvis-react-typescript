import { useCallback, useEffect, useMemo, useState } from "react";

/**
 * Interface for the return value of the useWebvisViewer hook
 */
export interface WebvisViewerHook {
	/** The initialized viewer API instance or undefined */
	viewer: webvis.ViewerAPI | undefined;
	/** A callback reference function to assign to the viewer HTML element */
	viewerRef: (element: HTMLElement | null) => void;
	/** A function to remove the viewer from its context if initialized */
	removeViewer: () => void;
}

/**
 * Type for the return value of the useWebvisWaitViewer hook
 */
export type WebvisWaitViewerHook = webvis.ViewerAPI | undefined;

/**
 * Interface for the return value of the useWebvisCreateViewer hook
 */
export interface WebvisCreateViewerHook {
	/** The initialized viewer API instance or undefined */
	viewer: webvis.ViewerAPI | undefined;
	/** A callback reference function to assign to the canvas HTML element */
	viewerRef: (element: HTMLCanvasElement | null) => void;
}

/**
 * A custom hook that waits for a viewer with a specific ID to be ready in a given context.
 *
 * @example
 * ```tsx
 *
 * function MyComponent() {
 *   const context = useWebvisContext();
 *   const viewer = useWebvisWaitViewer(context, "shared_viewer");
 *
 *   return (
 *     <div>
 *       {viewer ? "Viewer is ready!" : "Waiting for viewer..."}
 *     </div>
 *   );
 * }
 * ```
 *
 * @param context - The Webvis context API instance
 * @param id - The ID of the viewer to wait for (defaults to 'default_viewer')
 * @returns {WebvisWaitViewerHook} The viewer API instance when ready, or undefined
 */
export function useWebvisWaitViewer(
	context: webvis.ContextAPI | undefined,
	id?: string,
): WebvisWaitViewerHook {
	const [viewer, setViewer] = useState<webvis.ViewerAPI | undefined>(undefined);
	const viewerId = id ?? "default_viewer";
	useEffect(() => {
		const potentialViewer = context?.getViewer(viewerId);
		if (
			potentialViewer &&
			potentialViewer?.getState() === 3000 /* webvis.ViewerState.READY */
		) {
			// If the viewer is already available, set it immediately
			setViewer(potentialViewer);
		} else if (context) {
			// If the context is available but the viewer is not, wait for the viewer to be created
			const listenerId = context.registerListener(
				[109 /* VIEWER_STATE_CHANGED */],
				(event: webvis.ViewerStateChangedEvent) => {
					if (
						event.state === 3000 /* webvis.ViewerState.READY */ &&
						event.viewer?.getID() === (id ?? "default_viewer")
					) {
						setViewer(event.viewer);
						context.unregisterListener(listenerId);
					}
				},
			);

			// Clean up the listener when the component unmounts or context changes
			return () => {
				context.unregisterListener(listenerId);
			};
		}
	}, [context, viewerId, id]);
	return viewer;
}

/**
 * A custom hook to manage a Webvis viewer component. This hook returns the viewer instance,
 * a reference callback for binding the viewer HTML element, and a function to remove the viewer.
 *
 * @example
 * ```tsx
 *
 * function MyWebvisComponent() {
 *   const { viewer, viewerRef } = useWebvisViewer();
 *
 *   useEffect(() => {
 *     if (viewer) {
 *       // Perform any setup or configuration with the viewer
 *       console.log('Webvis viewer initialized:', viewer);
 *     }
 *   }, [viewer]);
 *
 *   // Use the viewerRef with a webvis-viewer element
 *   return (
 *     <div>
 *       <webvis-viewer ref={viewerRef} />
 *     </div>
 *   );
 * }
 * ```
 *
 * @returns {WebvisViewerHook} An object containing the viewer, viewerRef, and removeViewer function
 */
export function useWebvisViewer(): WebvisViewerHook {
	const [initViewer, setInitViewer] = useState<
		{ context: webvis.ContextAPI; viewerId: string } | undefined
	>(undefined);
	const callbackRef = useCallback((element: HTMLElement | null): void => {
		(async () => {
			await customElements.whenDefined("webvis-viewer");
			if (
				element &&
				element instanceof HTMLElement &&
				"requestViewer" in element
			) {
				const viewer = await (
					element.requestViewer as () => Promise<webvis.ViewerAPI>
				)();
				const context = viewer.getContext();
				setInitViewer({ context: context, viewerId: viewer.getID() });
			}
		})();
	}, []);
	const viewer = useWebvisWaitViewer(initViewer?.context, initViewer?.viewerId);
	const removeViewer = useMemo(
		() => () => {
			if (viewer) {
				// the viewer itself runs code on disconnect, so we need a timeout to make sure React has put it out of the DOM
				setTimeout(() => {
					viewer.getContext().removeViewer(viewer);
				}, 0);
			}
		},
		[viewer],
	);

	return { viewer, viewerRef: callbackRef, removeViewer };
}

/**
 * A custom hook that creates a Webvis viewer on a canvas element.
 *
 * @example
 * ```tsx
 *
 * function MyCanvasViewer() {
 *   const context = useWebvisContext();
 *   const { viewer, viewerRef } = useWebvisCreateViewer(context, "canvas_viewer");
 *
 *   useEffect(() => {
 *     if (viewer) {
 *       // Add a model when viewer is ready
 *       viewer.getContext().add({
 *         dataURI: "urn:x-i3d:examples:model"
 *       });
 *     }
 *   }, [viewer]);
 *
 *   return <canvas ref={viewerRef} style={{ width: '100%', height: '300px' }} />;
 * }
 * ```
 *
 * @param context - The Webvis context API instance
 * @param viewerId - The ID to assign to the created viewer (defaults to 'default_viewer')
 * @param settings - Optional settings for the viewer
 * @returns {WebvisCreateViewerHook} Object containing the viewer and viewerRef callback
 */
export function useWebvisCreateViewer(
	context: webvis.ContextAPI | undefined,
	viewerId?: string,
	settings?: {
		[key in webvis.ViewerSettingStrings]?: unknown;
	},
): WebvisCreateViewerHook {
	const [viewer, setViewer] = useState<webvis.ViewerAPI | undefined>(undefined);
	const viewerIdMemo = useMemo(() => viewerId ?? "default_viewer", [viewerId]);
	const [canvasElement, setCanvasElement] = useState<HTMLCanvasElement | null>(
		null,
	);
	// biome-ignore lint: settings is only memoized once
	const initialSettings = useMemo(() => settings ?? {}, []);

	const callbackRef = useCallback((element: HTMLCanvasElement | null) => {
		if (element && element instanceof HTMLCanvasElement) {
			setCanvasElement(element);
		}
	}, []);

	useEffect(() => {
		if (context && canvasElement) {
			// Create the viewer on the canvas element
			const listenerId = context.registerListener(
				[109 /* VIEWER_STATE_CHANGED */],
				(event: webvis.ViewerStateChangedEvent) => {
					if (
						event.state === 3000 /* webvis.ViewerState.READY */ &&
						event.viewer?.getID() === viewerIdMemo
					) {
						setViewer(event.viewer);
						context.unregisterListener(listenerId);
					}
				},
			);
			context.createViewer(viewerIdMemo, canvasElement, initialSettings);
			return () => {
				// Cleanup: unregister the listener when the component unmounts
				context.unregisterListener(listenerId);
			};
		}
	}, [context, canvasElement, viewerIdMemo, initialSettings]);

	return { viewer, viewerRef: callbackRef };
}
