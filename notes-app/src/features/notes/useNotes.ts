import * as React from "react";
import { microApp } from "../../MicroApp";
import { sanitizeHtmlContent } from "./HtmlContent";

const setAppState = (htmlText: string) => {
    // Store current state in the memory, we should
    // not need to do this with real application

    microApp.appState = {
        htmlText
    };
}

const useNotes = (initialHtmlText: string) => {
    const [ state, setState ] = React.useState(initialHtmlText);

    const setContent = (newContent: string) => {
        const content = sanitizeHtmlContent(newContent);
        setState(content);
        setAppState(content);
    }

    return {
        content: state,
        setContent
    };
}

export { useNotes };