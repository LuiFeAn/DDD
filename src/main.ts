import Adress from "./entity/adress";
import Customer from "./entity/customer";
import Order from "./entity/order";
import OrderItem from "./entity/order_item";

let customer = new Customer("123", "Luis Fernando");
const adress = new Adress("Rua Três", 2, "1234-5678", "Belém-PA");
customer.Adress = adress;
customer.activate();

const item1 = new OrderItem("1", "Item 1", 10);
const item2 = new OrderItem("2", "Item 2", 15);
const order = new Order("1", "123", [item1, item2]);
