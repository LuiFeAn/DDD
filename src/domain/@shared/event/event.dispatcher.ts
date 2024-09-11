import EventHandlerInterface from "./event-handler.interface";
import EventDispatcherInterface from "./event.dispatcher.interface";
import eventInterface from "./event.interface";

interface IEventHandlers {
  [eventName: string]: EventHandlerInterface[];
}

export default class EventDispatcher implements EventDispatcherInterface {
  private eventHandlers: IEventHandlers = {};

  get getEventHandlers(): IEventHandlers {
    return this.eventHandlers;
  }

  register(eventName: string, eventHandler: EventHandlerInterface): void {
    if (!this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = [];
    }

    this.eventHandlers[eventName].push(eventHandler);
  }

  notify(event: eventInterface): void {
    const eventName = event.constructor.name;
    if (this.eventHandlers[eventName]) {
      this.getEventHandlers[eventName].forEach((eventHandler) => {
        eventHandler.handle(event);
      });
    }
  }

  unregisterAll(): void {
    this.eventHandlers = {};
  }

  unregister(eventName: string, eventHandler: EventHandlerInterface): void {
    if (this.eventHandlers[eventName]) {
      const index = this.eventHandlers[eventName].indexOf(eventHandler);
      if (index != -1) {
        this.eventHandlers[eventName].splice(index, 1);
      }
    }
  }
}
