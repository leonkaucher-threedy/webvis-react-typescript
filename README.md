# Webvis + React + TypeScript (Vite) Example

A minimal but complete example that shows how to integrate the Threedy webvis viewer into a React + TypeScript app built with Vite. It demonstrates:

- Loading the webvis script once and exposing it via a React provider (`WebvisGlobalProvider`)
- Using the webvis web component `<webvis-viewer>` inside React with proper TypeScript types
- Working with convenient hooks to access the global `webvis` object, contexts, and viewers
- Adding a model to a context and toggling viewer settings (e.g. topology mode)
- Navigating between routes while keeping the same named context/viewer

Note: This example targets instant3Dhub and webvis 3.11 (see devDependencies: `@types/webvis` ^3.11.0).


## Quick start

Make sure you have node 20.19+ or 22.12+ already installed.

1) Install dependencies
- `npm install`

2) Configure the webvis script URL
- Set the environment variable `VITE_WEBVIS_URL` to the URL of your `webvis.js` served by your instant3Dhub instance. You can use a `.env` file at the project root:
  - `VITE_WEBVIS_URL=https://hubdemo.threedy.io/repo/webvis/webvis.js?next`
- The exact URL depends on your deployment. The value must point to the `webvis.js` entry script provided by your hub. The example repository already contains an `.env` with a demo URL you can replace.

3) Run the app
- `npm run dev`
- Open the Vite dev server URL printed in the terminal (by default http://localhost:3000).

4) Build for production
- `npm run build`
- To deploy under a sub-path, pass a base path at build time:
  - `npm run build -- --base=/my/subpath/`
- See Vite docs for details: https://vite.dev/guide/build.html#public-base-path
- Preview the production build locally:
  - `npm run preview`

## Type definitions from DefinitelyTyped (webvis)

This project uses the TypeScript type definitions published on DefinitelyTyped as `@types/webvis` (see devDependencies). These types expose the global `webvis` namespace so you can reference APIs and enums without importing anything.

- This package was installed initially with `npm i -D @types/webvis@^3.11.0` and is automatically installed in this example.
- Usage (global namespace, no import required):
  - Interfaces: `webvis.ContextAPI`, `webvis.ViewerAPI`
  - Enums/constants: `webvis.RenderMode`, `webvis.Property`, etc.
- How this example uses them:
  - `package.json` declares `@types/webvis` so the TypeScript compiler understands the webvis API used in hooks and components.
  - Code references the global types directly (e.g., `const viewer: webvis.ViewerAPI | undefined`).

Note about JSX element typings:
- The DefinitelyTyped package provides the core webvis API typings but does not declare React JSX intrinsic elements for web components.
- This repo therefore adds a small shim at `src/types/webcomponents.ts` to type the `<webvis-viewer>` custom element for React/TSX.
- If you need additional webvis elements (e.g., `<webvis-full>`), extend typings similarly as described in the “TypeScript support for webvis web components” section below.


## How this example is structured

- Loading webvis
  - The `WebvisGlobalProvider` component uses a small hook (`useLoadWebvis`) that injects a `<script>` tag for the configured `webvis.js` and tracks loading state and errors. Once the script is loaded, the global `window.webvis` is available and provided to children via the `useWebvis()` hook.
  - Important: Once loaded into a window, webvis cannot be unloaded. The URL should stay constant for the app lifetime.

- Global provider and hooks
  - The provider: `WebvisGlobalProvider` loads the `webvis.js` script once and exposes the global `webvis` object. Children render only when webvis is ready (or a fallback is shown while loading).
  - Viewer element on Home: The Home page renders `<webvis-viewer context="myContext" viewer="myViewer">` and attaches the `viewerRef` from `useWebvisViewer()` to it. This ref requests the viewer instance from the element and exposes it as `viewer` (e.g., `viewer.getID()`). The hook also offers `removeViewer()` to remove the viewer from its context if needed.
  - AddModelButton: Uses `useWebvisContext()` to obtain the named context (e.g., `"myContext"`) and `useWebvis()` to access enums/constants. On click, it calls `context.add(...)` with initial properties (e.g., `[webvis.Property.ENABLED] = true`) to load the model once and disables itself when the model is already present.
  - TopologyToggle: Retrieves the same context via `useWebvisContext()` and then waits for the specific viewer using `useWebvisWaitViewer(context, "myViewer")`. With the global constants from `useWebvis()`, it toggles the viewer’s render mode between `webvis.RenderMode.Faces` and `webvis.RenderMode.FacesTopology`.
  - Additionally available (not used directly on the Home page): `useWebvisCreateViewer` lets you create a viewer on a `<canvas>` programmatically (without the web component).

- Routes and lifecycle
  - The Home page renders a `<webvis-viewer>` with `context="myContext"` and `viewer="myViewer"` and uses `useWebvisViewer` to access its instance.
  - The About page explains the moving parts. When navigating away and back, the same named context/viewer reattach without losing state.


## Configuring the webvis URL

- Variable: `VITE_WEBVIS_URL`
  - Points to the `webvis.js` served by your instant3Dhub instance.
  - Example (public demo hub):
    - `VITE_WEBVIS_URL=https://hubdemo.threedy.io/repo/webvis/webvis.js?next`
  - You can set it via `.env`, environment, or CI/CD secrets. In code, the provider reads it using `import.meta.env.VITE_WEBVIS_URL`.


## Where the provider is used

Wrap your app near the root, e.g.:

```tsx
import { WebvisGlobalProvider } from "./src/components/WebvisGlobalProvider";
const url = import.meta.env.VITE_WEBVIS_URL;

<WebvisGlobalProvider url={url} fallback={<div>Loading webvis…</div>}>
  <App />
</WebvisGlobalProvider>
```


## TypeScript support for webvis web components

React/TS doesn’t know custom elements by default. This project adds a type definition for `<webvis-viewer>` in `src/types/webcomponents.ts` by extending the `JSX.IntrinsicElements`:

- Declares an interface `WebVisViewerElement` extends `HTMLElement`
- Extends `JSX.IntrinsicElements` with `'webvis-viewer'` so you can write `<webvis-viewer … />` in TSX without errors
- Updates `HTMLElementTagNameMap` so element refs are correctly typed

Adding more webvis elements
- Follow the same pattern to add elements like `<webvis-full>`. Create a small `.d.ts` or `.ts` file that defines the element interface, extends `JSX.IntrinsicElements` and `HTMLElementTagNameMap`, and (depending on your JSX runtime) augments the appropriate `react/jsx-runtime` and `react` modules. See the existing `src/types/webcomponents.ts` for a working example.


## API reference (used/available building blocks)

- `WebvisGlobalProvider`
  - Props
    - `url: string` (required) — The `webvis.js` URL to load
    - `fallback?: React.ReactNode` — Rendered while the script is loading
  - Behavior
    - Loads the script once; provides webvis to descendants

- `useWebvis`
  - Signature: `() => typeof window.webvis`
  - Returns the global `webvis` object from context (throws if used outside the provider)

- `useWebvisContext`
  - Signature: `(from?: string) => webvis.ContextAPI | undefined`
  - Gets or requests a named context; returns `undefined` until ready (it resolves asynchronously in current webvis versions)

- `useWebvisViewer`
  - Signature: `() => { viewer: webvis.ViewerAPI | undefined; viewerRef: (el: HTMLElement | null) => void; removeViewer: () => void }`
  - Attach `viewerRef` to a `<webvis-viewer>`. Once `READY`, `viewer` is set. `removeViewer` removes it from its context.

- `useWebvisWaitViewer`
  - Signature: `(context: webvis.ContextAPI | undefined, id?: string) => webvis.ViewerAPI | undefined`
  - Waits until the viewer with the given id in the context reaches `READY`.

- `useWebvisCreateViewer` (additional option)
  - Signature: `(context: webvis.ContextAPI | undefined, viewerId?: string, settings?: Record<webvis.ViewerSettingStrings, unknown>) => { viewer: webvis.ViewerAPI | undefined; viewerRef: (el: HTMLCanvasElement | null) => void }`
  - Lets you create a viewer on a canvas element without using the `<webvis-viewer>` custom element.

## License

This example is provided under the terms of the MIT License. See the [LICENSE](./LICENSE) file.

## Support / issues

For any report please [contact us](mailto:github-threedy@threedy.io).
