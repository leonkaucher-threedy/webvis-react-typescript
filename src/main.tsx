import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { LoadingFallback, WebvisGlobalProvider } from "./components";
import "./index.css";

// Get the WebVis URL from environment variables
const webvisUrl = import.meta.env.VITE_WEBVIS_URL;

// Use Vite's BASE_URL so the router works under custom subpaths (e.g., when built with --base=/my/subpath/)
const rawBase = import.meta.env.BASE_URL || "/";
// React Router expects basename without a trailing slash (except for root "/")
const basename =
	rawBase !== "/" && rawBase.endsWith("/") ? rawBase.slice(0, -1) : rawBase;

const rootElement = document.getElementById("root");
if (!rootElement) {
	throw new Error("Root element not found");
}

ReactDOM.createRoot(rootElement).render(
	<React.StrictMode>
		<WebvisGlobalProvider url={webvisUrl} fallback={<LoadingFallback />}>
			<BrowserRouter basename={basename}>
				<App />
			</BrowserRouter>
		</WebvisGlobalProvider>
	</React.StrictMode>,
);
