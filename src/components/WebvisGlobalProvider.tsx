import type React from "react";
import { createContext, useContext } from "react";
import { useLoadWebvis } from "../hooks/useLoadWebvis";

export interface WebvisGlobalState {
	webvis: typeof window.webvis | undefined;
	isLoaded: boolean;
	error: Error | null;
}

const WebvisContext = createContext<WebvisGlobalState>({
	webvis: undefined,
	isLoaded: false,
	error: null,
});

export interface WebvisGlobalProviderProps {
	children: React.ReactNode;
	url: string;
	fallback?: React.ReactNode;
}

/**
 * A React component that loads webvis from a URL and provides it to child components through context.
 *
 * @example
 * ```tsx
 *
 * function App() {
 *   return (
 *     <WebvisGlobalProvider
 *       url="https://example.com/webvis.js"
 *       fallback={<div>Loading webvis...</div>}
 *     >
 *       <YourWebvisComponent />
 *     </WebvisGlobalProvider>
 *   );
 * }
 * ```
 *
 * @param props - The component props
 * @param props.children - Child components to render when webvis is loaded
 * @param props.url - URL to load webvis from
 * @param props.fallback - Optional content to display while webvis is loading
 * @returns A React component that provides webvis context
 */
export function WebvisGlobalProvider({
	children,
	url,
	fallback,
}: WebvisGlobalProviderProps) {
	const { webvis, isLoaded, error } = useLoadWebvis(url);
	const value = {
		webvis,
		isLoaded,
		error,
	};
	return (
		<WebvisContext.Provider value={value}>
			{isLoaded ? children : fallback}
		</WebvisContext.Provider>
	);
}

WebvisGlobalProvider.displayName = "WebvisGlobalProvider";

/**
 * A custom hook that provides access to the global webvis instance.
 *
 * @example
 * ```tsx
 *
 * function MyComponent() {
 *   const webvis = useWebvis();
 *
 *   // Use webvis APIs
 *   const webvisAbout = webvis.about;
 *
 *   return (
 *     <div>
 *       <h2>Webvis Information</h2>
 *       <pre>{JSON.stringify(webvisAbout, null, 2)}</pre>
 *     </div>
 *   );
 * }
 * ```
 *
 * @returns {typeof window.webvis} The global webvis instance
 * @throws {Error} If used outside of a WebvisGlobalProvider
 */
export function useWebvis(): typeof window.webvis {
	const context = useContext(WebvisContext);
	if (context === undefined) {
		throw new Error("useWebvis must be used within a WebvisGlobalProvider");
	}
	// This is safe because useWebvis is only used in children that are rendered when webvis is loaded
	return context.webvis as typeof window.webvis;
}
