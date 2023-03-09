import { useEffect, useRef } from 'react';

export default function useExternalScripts(url: string, onLoad?: () => void,
    onError?: (errorMessage: string) => void) {
    const triggeredLoading = useRef<boolean>(false);
    const scriptRef = useRef<HTMLScriptElement | null>(null);

    useEffect(() => {
        const head = document.querySelector("head") as HTMLElement;

        if (scriptRef.current === null) {
            scriptRef.current = document.createElement("script");
            head.appendChild(scriptRef.current);
        }
    }, []);

    useEffect(() => {
        if (scriptRef.current) {
            scriptRef.current.setAttribute("src", url);
        }
    }, [url, scriptRef]);

    useEffect(() => {
        if (scriptRef.current && !triggeredLoading.current) {
            triggeredLoading.current = true;

            const handleScriptLoaded = () => {
                if (onLoad) {
                    onLoad();
                }
            };

            const handleScriptError = (event: Event | string, source?: string, lineno?: number, colno?: number, error?: Error) => {
                if (onError) {
                    let errorMessage = 'Webvis konnte nicht geladen werden!!!';

                    if(error) {
                        errorMessage = error.message;
                    }

                    onError(errorMessage);
                }
            };

            scriptRef.current.onload = handleScriptLoaded;
            scriptRef.current.onerror = handleScriptError;
        }
    }, [onLoad, scriptRef, triggeredLoading, onError]);
};
