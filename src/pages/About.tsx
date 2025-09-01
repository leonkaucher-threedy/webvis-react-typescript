import type React from "react";

function CodeSpan({ children }: { children: React.ReactNode }) {
	return (
		<code
			style={{
				padding: "0 4px",
				margin: "0 2px",
				borderRadius: 6,
				backgroundColor: "rgba(255, 255, 255, 0.10)",
				border: "1px solid rgba(255, 255, 255, 0.18)",
				whiteSpace: "nowrap",
			}}
		>
			{children}
		</code>
	);
}

export default function About() {
	return (
		<div className="about-page">
			<h1>About this app</h1>

			<h2>How webvis is initialized</h2>
			<p className="about">
				The <CodeSpan>WebvisGlobalProvider</CodeSpan> is responsible for loading
				the webvis library once and making it available to the rest of the
				application. Internally, it uses a small loader hook (
				<CodeSpan>useLoadWebvis</CodeSpan>) to inject the webvis script from the
				provided URL, and keeps track of three things: the loaded webvis
				instance, whether loading has finished, and any error that occurred.
				While the script is loading, the provider renders its fallback; once
				loaded, it renders its children with a React context value that exposes
				the global webvis object. Components below the provider can then access
				webvis APIs through convenient hooks.
			</p>

			<p className="about">
				Read more about webvis initialization and lifecycle in the official
				guide:
				<a
					href="https://docs.threedy.io/latest/tutorials/dev_tutorials/tutorials/initialization.html#webvis-initialization"
					target="_blank"
					rel="noreferrer noopener"
					style={{ marginLeft: 6 }}
				>
					Webvis initialization and lifecycle
				</a>
				.
			</p>

			<h2>Components and how they use webvis</h2>
			<h3>Home route</h3>
			<p className="about">
				The Home page renders a <CodeSpan>&lt;webvis-viewer&gt;</CodeSpan>{" "}
				element and wires it up using
				<CodeSpan>useWebvisViewer()</CodeSpan>. The hook returns a{" "}
				<CodeSpan>viewerRef</CodeSpan> callback that is assigned to the viewer
				element. When the element mounts, the hook requests the viewer instance
				from webvis and exposes it as
				<CodeSpan>viewer</CodeSpan>, allowing components to read information
				like <CodeSpan>viewer.getID()</CodeSpan>.
			</p>

			<h3>AddModelButton</h3>
			<p className="about">
				This button uses <CodeSpan>useWebvisContext()</CodeSpan> to obtain the
				named context and <CodeSpan>useWebvis()</CodeSpan> for enums/constants.
				On first mount it checks whether the model is already present and
				disables itself accordingly. When clicked, it calls{" "}
				<CodeSpan>context.add(...)</CodeSpan> and sets{" "}
				<CodeSpan>[webvis.Property.ENABLED] = true</CodeSpan> in
				initialProperties to load the model exactly once, demonstrating how
				components perform context operations.
			</p>

			<h3>TopologyToggle</h3>
			<p className="about">
				The toggle retrieves the same context via{" "}
				<CodeSpan>useWebvisContext()</CodeSpan> and then waits for a specific
				viewer instance using{" "}
				<CodeSpan>useWebvisWaitViewer(context, viewerId)</CodeSpan>. With the
				global webvis constants from <CodeSpan>useWebvis()</CodeSpan>, it flips
				the viewer’s render mode between{" "}
				<CodeSpan>webvis.RenderMode.Faces</CodeSpan> and
				<CodeSpan>webvis.RenderMode.Topology</CodeSpan>. This illustrates how a
				component can react to user input and apply settings to a ready viewer
				through the hook APIs.
			</p>

			<h2>Routing and viewer lifecycle</h2>
			<p className="about">
				When you navigate between the Home and About pages, the webvis{" "}
				<CodeSpan>&lt;webvis-viewer&gt;</CodeSpan> element is removed from the
				DOM. Even though the element unmounts, named webvis viewers are cached,
				so when you come back to a page that declares the same context (
				<CodeSpan>"myContext"</CodeSpan>) and viewer (
				<CodeSpan>"myViewer"</CodeSpan>), it reattaches to the existing instance
				without losing state (settings, camera, etc.). This allows seamless
				navigation without leaks or resets; if you need to start fresh, use a
				different name or explicitly dispose in your app logic.
			</p>
		</div>
	);
}
