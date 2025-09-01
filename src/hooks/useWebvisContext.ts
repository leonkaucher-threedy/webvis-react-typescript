import { useEffect, useMemo, useState } from "react";
import { useWebvis } from "../components/WebvisGlobalProvider";

/**
 * A custom hook that gets or requests a Webvis context with a specific name.
 *
 * @example
 * ```tsx
 *
 * function MyComponent() {
 *   // Get or request a context with a specific name
 *   const context = useWebvisContext('my-context');
 *
 *   // Use the context when it's available
 *   useEffect(() => {
 *     if (context) {
 *       // Perform operations with the context
 *       context.requestSupportedContentTypes()
 *         .then(types => console.log('Supported content types:', types));
 *     }
 *   }, [context]);
 *
 *   return (
 *     <div>
 *       {context ? 'Context is ready!' : 'Loading context...'}
 *     </div>
 *   );
 * }
 * ```
 *
 * @param from - Optional name of the context to get or request (defaults to 'default_context')
 * @returns {webvis.ContextAPI | undefined} The Webvis context API instance when ready, or undefined
 */
export function useWebvisContext(from?: string) {
	const [webvisContext, setWebvisContext] = useState<
		webvis.ContextAPI | undefined
	>(undefined);
	const webvis = useWebvis();
	const futureContext = useMemo(
		() =>
			webvis.getContext(from) ??
			webvis.requestContext(from ?? "default_context"),
		[from, webvis],
	);
	useEffect(() => {
		if (
			futureContext &&
			"then" in futureContext &&
			typeof futureContext.then === "function"
		) {
			// The context is currently created asynchronously, so we need to wait for it
			futureContext
				.then((ctx: webvis.ContextAPI | undefined) => {
					setWebvisContext(ctx);
				})
				.catch((error: Error) => {
					console.error("Error requesting webvis context:", error);
				});
		} else {
			// The context is already available synchronously
			setWebvisContext(futureContext as webvis.ContextAPI | undefined);
		}
	}, [futureContext, webvis]);
	return webvisContext;
}
