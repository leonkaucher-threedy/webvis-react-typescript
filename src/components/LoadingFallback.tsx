import "./LoadingFallback.css";

/**
 * A simple full-screen loading fallback for webvis loading state.
 */
export function LoadingFallback() {
	return (
		<output className="loading-fallback" aria-live="polite">
			<div className="loading-fallback__spinner" aria-hidden="true" />
			<div className="loading-fallback__text">loading webvis</div>
		</output>
	);
}

export default LoadingFallback;
