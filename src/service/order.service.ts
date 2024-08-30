import Order from "../entity/order";

export class OrderService {
  static total(orderItems: Order[]) {
    return orderItems.reduce((acc, orderItem) => acc + orderItem.total(), 0);
  }
}
