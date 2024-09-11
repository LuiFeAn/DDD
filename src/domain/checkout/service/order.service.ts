
import { v4 } from "uuid";
import Order from "../entity/order";
import Customer from "../../customer/entity/customer";
import OrderItem from "../entity/order_item";

export class OrderService {
  static total(orders: Order[]) {
    return orders.reduce((acc, order) => acc + order.total(), 0);
  }

  static placeOrder(customer: Customer, orderItems: OrderItem[]): Order {
    if (orderItems.length === 0) {
      throw new Error("Order must have at least one item");
    }
    
    const order = new Order(v4(), customer.id, orderItems);
    customer.addRewardPoints(order.total() / 2);
    return order;
  }
}
