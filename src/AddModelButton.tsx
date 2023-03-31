import { useState } from "react";

export interface AddModelButtonProps {
    /**
     * The label of the model to add.
     */
    label: string,

    /**
     * The URI to the model to add.
     */
    modelURI: string,

    /**
     * The context for the webVis API to actually add the model.
     */
    context: webvis.ContextAPI,
}

/**
 * Simple button component for adding the specified model once.
 */
export default function AddModelButton(props: AddModelButtonProps): JSX.Element {
    const [disabled, setDisabled] = useState<boolean>(false);

    const handleButtonClick = async () => {
        setDisabled(true);

        const nodeId = props.context.add(props.modelURI);
        await props.context.setProperty(nodeId, "enabled", true);
    };

    return (
        <button onClick={handleButtonClick} disabled={disabled}>
            {`Add ${props.label}`}
        </button>
    )
}