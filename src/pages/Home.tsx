import { AddModelButton, TopologyToggle } from "../components";
import { useWebvisViewer } from "../hooks";

export default function Home() {
	const { viewer, viewerRef } = useWebvisViewer();
	return (
		<>
			<h1>Demo example: How to integrate webvis with React/Typescript </h1>
			<div className="viewer">
				<webvis-viewer
					ref={viewerRef}
					context={"myContext"}
					viewer={"myViewer"}
				></webvis-viewer>

				<div className="overlay-button">
					<AddModelButton label="Engine" modelURI="urn:x-i3d:examples:x3d:v8" />
					<div style={{ marginTop: 8 }}>
						<TopologyToggle />
					</div>
				</div>
			</div>
			<p>Loaded webvis viewer with id: {viewer?.getID()}</p>
		</>
	);
}
