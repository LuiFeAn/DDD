import Adress from "../value-object/adress";
import Customer from "./customer";
describe("Customer unit tests", () => {
  it("Should throw error when id is empty", () => {
    expect(() => {
      new Customer("", "Luis");
    }).toThrow("Id is required");
  });

  it("Should throw error when name is empty", () => {
    expect(() => {
      new Customer("Luis", "");
    }).toThrow("Name is required");
  });

  it("Should change name", () => {
    //Arrange
    let customer = new Customer("123", "Luis");

    //Act
    customer.changeName("Luis Fernando");

    //Assert
    expect(customer.name).toBe("Luis Fernando");
  });

  it("Should throw error when adress is undefined when you activate a customer", () => {
    expect(() => {
      let customer = new Customer("123", "Luis");
      customer.activate();
    }).toThrow("Adress is mandatory to activate customer");
  });

  it("Should activate customer", () => {
    //Arrange
    let customer = new Customer("123", "Luis");
    const adress = new Adress("Rua Três", 2, "1234-5678", "Belém-PA");
    customer.Adress = adress;

    //Act
    customer.activate();

    //Assert
    expect(customer.isActive).toBe(true);
  });

  it("Should add reward points", () => {
    const customer = new Customer("1", "Customer 1");

    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);

    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(10);

    expect(customer.rewardPoints).toBe(20);
  });
});
