import { useCallback, useEffect, useState } from "react";
import { useWebvisContext, useWebvisWaitViewer } from "../hooks";
import { useWebvis } from "./WebvisGlobalProvider";

export interface TopologyToggleProps {
	/**
	 * The ID of the viewer to control.
	 * @default 'myViewer'
	 */
	viewerId?: string;
	/**
	 * Label for the toggle button.
	 * @default 'Topology'
	 */
	label?: string;
	/**
	 * Context name to use.
	 * @default 'myContext'
	 */
	contextName?: string;
}

/**
 * A toggle button that targets a specific viewer by ID and toggles the 'Topology' render mode
 * using the viewer instance retrieved via useWebvisWaitViewer.
 *
 * @param [viewerId='myViewer'] - The ID of the viewer to control. Optional.
 * @param [label='Topology'] - Label for the toggle button. Optional.
 * @param [contextName='myContext'] - Context name to use. Optional.
 */
export default function TopologyToggle({
	viewerId = "myViewer",
	label = "Topology",
	contextName = "myContext",
}: TopologyToggleProps) {
	const context = useWebvisContext(contextName);
	const viewer = useWebvisWaitViewer(context, viewerId);
	const webvis = useWebvis();

	const [isOn, setIsOn] = useState<boolean>(false);

	const handleToggle = useCallback(() => {
		if (!viewer) {
			console.warn("Viewer not available yet");
			return;
		}
		setIsOn((prev) => !prev);

		viewer.changeSetting(
			webvis.ViewerSettingStrings.RENDER_MODE,
			isOn ? webvis.RenderMode.Faces : webvis.RenderMode.Topology,
		);
	}, [
		viewer,
		isOn,
		webvis.ViewerSettingStrings.RENDER_MODE,
		webvis.RenderMode.Faces,
		webvis.RenderMode.Topology,
	]);

	// Read the current render mode to set the toggle state
	useEffect(() => {
		if (!viewer) {
			return;
		}
		setIsOn(
			viewer.readSetting(webvis.ViewerSettingStrings.RENDER_MODE) ===
				webvis.RenderMode.Topology,
		);
	}, [
		viewer,
		webvis.ViewerSettingStrings.RENDER_MODE,
		webvis.RenderMode.Topology,
	]);

	return (
		<button
			type="button"
			className={`toggle ${isOn ? "toggle--on" : ""}`}
			role="switch"
			aria-checked={isOn}
			aria-label={label}
			title={label}
			onClick={handleToggle}
			disabled={!viewer}
		>
			<span className="toggle__track">
				<span className="toggle__thumb" />
			</span>
			<span className="toggle__text">{label}</span>
		</button>
	);
}
