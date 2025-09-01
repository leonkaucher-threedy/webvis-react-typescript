import { useEffect, useRef, useState } from "react";

/**
 * Interface for the return value of the useLoadWebvis hook
 */
interface UseLoadWebvisResult {
	/** Whether the webvis script has been loaded successfully */
	isLoaded: boolean;
	/** Error object if the script loading failed */
	error: Error | null;
	/** Reference to the global webvis object once loaded */
	webvis: typeof webvis | undefined;
}

/**
 * React hook to dynamically load the webvis script from a URL.
 *
 * This hook creates a script tag and appends it to the document body.
 * It tracks the loading state and provides access to the global webvis object.
 *
 * IMPORTANT: Once loaded, webvis cannot be unloaded from the window.
 * The URL parameter must not change between renders, or an error will be thrown.
 *
 * @param url - The URL of the webvis script to load (must remain constant)
 * @returns An object containing the loading state, any error, and the webvis object
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { isLoaded, error, webvis } = useLoadWebvis('https://example.com/webvis.js');
 *
 *   if (error) return <div>Failed to load webvis: {error.message}</div>;
 *   if (!isLoaded) return <div>Loading webvis...</div>;
 *
 *   return <div>Webvis loaded successfully!</div>;
 * }
 * ```
 */
export function useLoadWebvis(url: string): UseLoadWebvisResult {
	const [isLoaded, setIsLoaded] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);
	const initialUrlRef = useRef<string>(url);
	const scriptRef = useRef<HTMLScriptElement | null>(null);

	// Check if URL has changed from initial value
	if (url !== initialUrlRef.current && initialUrlRef.current !== "") {
		throw new Error(
			"URL cannot be changed after initial render. webvis cannot be unloaded from a window.",
		);
	}

	useEffect(() => {
		// Don't do anything if the URL is empty
		if (!url) {
			setError(new Error("URL is required"));
			return;
		}

		// Check if the script has already been loaded
		if (scriptRef.current) {
			return;
		}

		// Create script element
		const script = document.createElement("script");
		scriptRef.current = script;
		script.src = url;
		script.async = true;

		// Set up event handlers
		const handleLoad = () => {
			setIsLoaded(true);
		};

		const handleError = (e: Event | string) => {
			setError(e instanceof Error ? e : new Error("Failed to load script"));
			// Remove the script tag on error
			document.body.removeChild(script);
		};

		script.addEventListener("load", handleLoad);
		script.addEventListener("error", handleError as EventListener);

		// Append the script to the document
		document.body.appendChild(script);

		// No cleanup function - webvis cannot be unloaded from a window
		// Event listeners will be garbage collected when the script is no longer referenced
	}, [url]); // Include url in dependencies as it's used inside the effect

	// Return the loading state, any error, and the global webvis object
	return {
		isLoaded,
		error,
		webvis: typeof window !== "undefined" ? window.webvis : undefined,
	};
}

export default useLoadWebvis;
