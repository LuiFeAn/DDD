import Order from "./order";
import OrderItem from "./order_item";
describe("Order unit tests", () => {
  it("Should throw error when id is empty", () => {
    expect(() => {
      let order = new Order("", "123", []);
    }).toThrow("Id is Required");
  });

  it("Should throw error when customerId is empty", () => {
    expect(() => {
      let order = new Order("123", "", []);
    }).toThrow("CustomerId is Required");
  });

  it("Should calculate total", () => {
    const item = new OrderItem("i1", "Item 1", 100);
    const item2 = new OrderItem("i2", "Item 2", 200);
    let order = new Order("o1", "c1", [item]);

    let total = order.total();

    expect(total).toBe(100);

    const order2 = new Order("o2", "c2", [item, item2]);
    total = order2.total();
    expect(total).toBe(300);
  });

  it("Should throw error when items is zero", () => {
    expect(() => {
      let order = new Order("123", "321", []);
    }).toThrow("Items are Required");
  });
});
