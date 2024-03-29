import * as React from 'react';
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import App from './App';
import { IMicroAppProps } from './shell/Shell';
import { createEventBus, microApp, TodoMicroApp } from './MicroApp';

declare global {
  interface Window {
      todoMicroApp: TodoMicroApp;
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
        <App initialItems={microApp.appState.items} />, 
        element
    );

    microApp.history = appHistory;
    microApp.eventBus = appEventBus;
}

if (typeof microApp.mount === "undefined") {
    microApp.mount = (props: IMicroAppProps) => {
        render(props);
        console.info(`mount todo micro app`);
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

        console.info(`unmount todo micro app`);
    };
}

window.todoMicroApp = microApp;