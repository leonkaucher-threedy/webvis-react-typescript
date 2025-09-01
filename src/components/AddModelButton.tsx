import { useCallback, useEffect, useState } from "react";
import { useWebvisContext } from "../hooks";
import { useWebvis } from "./WebvisGlobalProvider";

export interface AddModelButtonProps {
	/**
	 * The label of the model to add.
	 */
	label: string;

	/**
	 * The URI to the model to add.
	 */
	modelURI: string;

	/**
	 * Context name to use.
	 * @default 'myContext'
	 */
	contextName?: string;
}

/**
 * Modern button component for adding the specified model once.
 *
 * @param label - The label of the model to add.
 * @param modelURI - The URI to the model to add.
 * @param [contextName='myContext'] - Context name to use. Optional.
 */
export default function AddModelButton({
	label,
	modelURI,
	contextName = "myContext",
}: AddModelButtonProps) {
	const [disabled, setDisabled] = useState<boolean>(true);
	const context = useWebvisContext(contextName);
	const webvis = useWebvis();

	// Check if the model was already added to the context after re-mount
	useEffect(() => {
		if (!context) {
			return;
		}
		setDisabled(context.isNodeType(1, webvis.NodeType.STRUCTURE));
	}, [context, webvis.NodeType.STRUCTURE]);

	const handleButtonClick = useCallback(async () => {
		if (!context) {
			return;
		}

		setDisabled(true);

		context.add({
			dataURI: modelURI,
			initialProperties: {
				[webvis.Property.ENABLED]: true,
			},
		});
	}, [context, modelURI, webvis.Property.ENABLED]);

	return (
		<button
			type="button"
			onClick={handleButtonClick}
			disabled={disabled || !context}
		>
			{`Add ${label}`}
		</button>
	);
}
