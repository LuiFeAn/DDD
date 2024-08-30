import Product from "./product";
describe("Order unit tests", () => {
  it("Should throw error when id is empty", () => {
    expect(() => {
      new Product("", "Product 1", 100);
    }).toThrow("Id is Required");
  });

  it("Should throw error when name is empty", () => {
    expect(() => {
      new Product("123", "", 100);
    }).toThrow("Name is Required");
  });

  it("Should throw error when price is empty", () => {
    expect(() => {
      new Product("123", "Produto 1", -1);
    }).toThrow("Price is Required");
  });

  it("Should change name", () => {
    const product = new Product("123", "Produto 1", 100);
    product.changeName("Product 2");
    expect(product.name).toBe("Product 2");
  });

  it("Should change price", () => {
    const product = new Product("123", "Produto 1", 100);
    product.changePrice(200);
    expect(product.price).toBe(200);
  });
});
