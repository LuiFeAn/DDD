import EventInterface from "../../@shared/event/event.interface";

export default class ProductCreatedEvent implements EventInterface {
  datTimeOcurred: Date;
  eventData: any;

  constructor(eventData: any) {
    this.datTimeOcurred = new Date();
    this.eventData = eventData;
  }
}
