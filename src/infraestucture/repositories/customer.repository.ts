import Adress from "../../domain/customer/value-object/adress";
import Customer from "../../domain/customer/entity/customer";
import CustomerRepositoryInterface from "../../domain/customer/repository/customer-repository.interface";
import CustomerModel from "../db/sequelize/model/customer.model";

export default class CustomerRepository implements CustomerRepositoryInterface {
  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      street: entity.adress.street,
      number: entity.adress.number,
      zipcode: entity.adress.zip,
      city: entity.adress.city,
      active: entity.isActive,
      rewardPoints: entity.rewardPoints,
    });
  }

  async find(id: string): Promise<Customer> {
    let customerModel;
    try {
      customerModel = await CustomerModel.findOne({
        where: {
          id: id,
        },
        rejectOnEmpty: true,
      });
    } catch (err) {
      throw new Error("Customer not found");
    }

    const customer = new Customer(customerModel.id, customerModel.name);
    const adress = new Adress(
      customerModel.street,
      customerModel.number,
      customerModel.zipcode,
      customerModel.city
    );
    customer.changeAdress(adress);
    return customer;
  }

  async findAll(): Promise<Customer[]> {
    const customerModels = await CustomerModel.findAll();
    return customerModels.map((customerModel) => {
      const customer = new Customer(customerModel.id, customerModel.name);
      customer.addRewardPoints(customerModel.rewardPoints);
      const adress = new Adress(
        customerModel.street,
        customerModel.number,
        customerModel.zipcode,
        customerModel.city
      );
      customer.changeAdress(adress);
      if (customerModel.active) {
        customer.activate();
      }
      return customer;
    });
  }

  async update(entity: Customer): Promise<void> {
    await CustomerModel.update(
      {
        id: entity.id,
        name: entity.name,
        street: entity.adress.street,
        number: entity.adress.number,
        zipcode: entity.adress.zip,
        city: entity.adress.city,
        active: entity.isActive,
        rewardPoints: entity.rewardPoints,
      },
      {
        where: {
          id: entity.id,
        },
      }
    );
  }
}
