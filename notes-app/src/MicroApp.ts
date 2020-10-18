import { DomainEvent, EventBus, IDomainEvent, IEventHandler, IEventSubscription, MiddlewareNext } from "./shell/Events";
import { getTodoAppHost } from "./shell/Host";
import { IMicroApp } from "./shell/Shell";

const middlewareFn = (e: IDomainEvent<{}>, next: MiddlewareNext<{}>) => {
    console.log(new DomainEvent(e.channel, e.payload).toJSON());
    next(e);
}

export const createEventBus = () => {
    const eventBus = new EventBus([middlewareFn]);
    return eventBus;
}

export interface NoteMicroApp extends IMicroApp  {
    // Store current state in the memory, we should
    // not need to do this with real application
    appState: {
        htmlText: string
    },
    eventHandlers: IEventHandler[]
}

export const microApp: NoteMicroApp = {
    appState: { htmlText: `<p>Need some notes?</p>` },
    eventHandlers: [],
};

const getAppEventChannel = () =>  microApp.host || window.location.origin;
  
export const publishEvent = <T>(payload: T) : void => {
    const eventBus = microApp.eventBus;
    if (eventBus) {
        eventBus.publish(new DomainEvent<T>(getAppEventChannel(), payload));
    }
}

interface ISubscription {
    unsubscribe: () => void;
}

const subscribeEvent = (subscription: IEventSubscription) : ISubscription => {
    const eventBus = microApp.eventBus;
    if (!eventBus) {
        return {
            unsubscribe:  () => {}
        };
    }

    const handler = eventBus.subscribe(subscription);
    const handlers = microApp.eventHandlers;
    microApp.eventHandlers = [ ...handlers, handler ];
    return {
        unsubscribe: () => {
            microApp.eventHandlers = [...microApp.eventHandlers.filter(x => x.index !==  handler.index)]
        }
    };
}

type TodoEventType = "@TODO/UDPATE" | "@TODO/ADD";

type TodoStatus = "Pending" | "Done";

interface ITodoEvents {
    id: string,
    name: string,
    status: TodoStatus,
    type: TodoEventType     
}

const todoEventHandler = (event: any) : void => {
    const message = event as IDomainEvent<ITodoEvents>;
    const payload = message.payload;
    if (payload.type === "@TODO/UDPATE" && payload.status === "Done") {
        const { htmlText } = microApp.appState;
        microApp.appState = {
            htmlText: htmlText + `<strong>${payload.name}<string>`
        }
    }
}

let subscription : ISubscription | undefined = undefined;

export const subscribeTodoEvents = () => {
    if (!subscription) {
        const todoHost = getTodoAppHost();
        console.log(`notes-app ${todoHost}`);
        subscription = subscribeEvent({
            channel: todoHost,
            callback: todoEventHandler
        });
    }
}

