import { useEffect, useRef } from 'react';

/**
 * Hook to load an external script.
 * 
 * @param url - The URL of the JS script to load.
 * @param onLoad - Optional callback if the script has been successfully loaded
 * @param onError - Optional callback if loading the script failed with provided error message.
 */
export default function useExternalScripts(url: string, onLoad?: () => void,
    onError?: (errorMessage: string) => void) {

    // stores the created script tag
    const scriptRef = useRef<HTMLScriptElement | null>(null);

    // effect to create the script tag and store it in the respective script ref variable
    useEffect(() => {
        if (scriptRef.current === null) {
            const scriptTag = document.createElement("script");
            scriptRef.current = scriptTag;

            scriptTag.setAttribute("src", url);
            scriptTag.onload = () => {
                if (onLoad) {
                    onLoad();
                }
            };
            scriptTag.onerror = (event: Event | string, source?: string, lineno?: number, colno?: number, error?: Error) => {
                if (onError) {
                    const errorMessage = error ? error.message : `Could not load script ${url}`;
                    onError(errorMessage);
                }
            }

            const head = document.querySelector("head") as HTMLElement;
            head.appendChild(scriptRef.current);
        }
    }, [onLoad, onError, url]);
};
