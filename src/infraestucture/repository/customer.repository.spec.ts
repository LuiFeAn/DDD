import { Sequelize } from "sequelize-typescript";
import CustomerRepository from "./customer.repository";
import Customer from "../../domain/entity/customer";
import Adress from "../../domain/entity/adress";
import CustomerModel from "../db/sequelize/model/customer.model";
import { UniqueConstraintError } from "sequelize";
describe("Customer repository tests", () => {
  let sequileze: Sequelize;

  beforeEach(async () => {
    sequileze = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: {
        force: true,
      },
    });

    sequileze.addModels([CustomerModel]);

    await sequileze.sync();
  });

  afterEach(async () => {
    await sequileze.close();
  });

  it("Should find a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const adress = new Adress("Street 1", 1, "Zipcode 1", "City 1");
    customer.Adress = adress;
    await customerRepository.create(customer);

    const customerResult = await customerRepository.find(customer.id);

    expect(customer).toStrictEqual(customerResult);
  });

  it("Should throw an error when customer not found", async () => {
    const customerRepository = new CustomerRepository();

    expect(async () => {
      await customerRepository.find("123345");
    }).rejects.toThrow("Customer not found");
  });

  it("Should throw an error if customer already exists", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const adress = new Adress("Street 1", 1, "Zipcode 1", "City 1");
    customer.Adress = adress;
    await customerRepository.create(customer);

    const customer2 = new Customer("123", "Customer 2");
    const adress2 = new Adress("Street 1", 1, "Zipcode 2", "City 2");
    customer2.Adress = adress2;

    expect(async () => {
      await customerRepository.create(customer2);
    }).rejects.toThrow(UniqueConstraintError);
  });

  it("Should find all customers", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const adress = new Adress("Street 1", 1, "Zipcode 1", "City 1");
    customer.Adress = adress;

    const customer2 = new Customer("1234", "Customer 2");
    const adress2 = new Adress("Street 1", 1, "Zipcode 2", "City 2");
    customer2.Adress = adress2;

    customer.addRewardPoints(2);

    customer2.addRewardPoints(5);

    await customerRepository.create(customer);

    await customerRepository.create(customer2);

    const customers = await customerRepository.findAll();

    expect(customers).toHaveLength(2);
    expect(customers).toContainEqual(customer);
    expect(customers).toContainEqual(customer2);
  });

  it("Should update a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const adress = new Adress("Street 1", 1, "Zipcode 1", "City 1");
    customer.Adress = adress;
    await customerRepository.create(customer);

    customer.changeName("Customer 2");
    await customerRepository.update(customer);
    const customerModel = await CustomerModel.findOne({
      where: {
        id: "123",
      },
    });

    expect(customerModel.toJSON()).toStrictEqual({
      id: customer.id,
      name: customer.name,
      active: customer.isActive,
      rewardPoints: customer.rewardPoints,
      street: adress.street,
      number: adress.number,
      zipcode: adress.zip,
      city: adress.city,
    });
  });

  it("Should create a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const adress = new Adress("Street 1", 1, "ZipCode 1", "City 1");
    customer.Adress = adress;
    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({
      where: {
        id: "123",
      },
    });

    expect(customerModel.toJSON()).toStrictEqual({
      id: customer.id,
      name: customer.name,
      active: customer.isActive,
      rewardPoints: customer.rewardPoints,
      street: adress.street,
      number: adress.number,
      zipcode: adress.zip,
      city: adress.city,
    });
  });
});
