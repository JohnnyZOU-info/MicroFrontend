import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createEventBus, microApp, NoteMicroApp, subscribeTodoEvents } from './MicroApp';
import { IMicroAppProps } from './shell/Shell';
import { createBrowserHistory } from 'history';
import './index.css';

declare global {
    interface Window {
        notesMicroApp: NoteMicroApp;
    }
}
  
const render = (props: IMicroAppProps) => {
    const { containerId, history, host, tokenProvider, eventBus } = props;
    const element = document.getElementById(containerId);
    if (!element) {
        throw new Error(`${containerId} does not exist`);
    }

    microApp.host = host;
    microApp.tokenProvider = tokenProvider;

    const appHistory = history || createBrowserHistory();
    const appEventBus = eventBus || createEventBus();

    ReactDOM.render(
        <App initialHtmlText={microApp.appState.htmlText} />, 
        element
    );

    microApp.history = appHistory;
    microApp.eventBus = appEventBus;
    subscribeTodoEvents();
}

if (typeof microApp.mount === "undefined") {
    microApp.mount = (props: IMicroAppProps) => {
        render(props);
        console.info(`mount notes micro app`);
    };
}

if (typeof microApp.unmount === "undefined") {
    microApp.unmount = (containerId: string) => {
        const element = document.getElementById(containerId);
        if (element) {
            ReactDOM.unmountComponentAtNode(element);
        }

        microApp.tokenProvider = undefined;
        microApp.host = undefined;
        microApp.history = undefined;

        console.info(`unmount notes micro app`);
    };
}

window.notesMicroApp = microApp;
