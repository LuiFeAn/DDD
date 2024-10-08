import { Sequelize } from "sequelize-typescript";
import ProductModel from "../db/sequelize/model/product.model";
import Product from "../../domain/product/entity/product";
import ProductRepository from "./product.repository";
import { UniqueConstraintError } from "sequelize";
describe("Product repository tests", () => {
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

    sequileze.addModels([ProductModel]);

    await sequileze.sync();
  });

  afterEach(async () => {
    await sequileze.close();
  });

  it("Should find a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 100);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({
      where: {
        id: "1",
      },
    });

    const foundProduct = await productRepository.find("1");

    expect(productModel.toJSON()).toStrictEqual({
      id: foundProduct.id,
      name: foundProduct.name,
      price: foundProduct.price,
    });
  });

  it("Should throw an error if product already exists", async () => {
    const productRepository = new ProductRepository();
    const product1 = new Product("1", "Product 1", 100);
    const product2 = new Product("1", "Product 2", 200);

    await productRepository.create(product1);

    await expect(productRepository.create(product2)).rejects.toThrow(
      UniqueConstraintError
    );
  });

  it("Should find all products", async () => {
    const productRepository = new ProductRepository();
    const product1 = new Product("1", "Product 1", 100);
    await productRepository.create(product1);

    const product2 = new Product("2", "Product 2", 200);
    await productRepository.create(product2);

    const foundProducts = await productRepository.findAll();

    const products = [product1, product2];

    expect(products).toEqual(foundProducts);
  });

  it("Should be create a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 100);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({
      where: {
        id: "1",
      },
    });

    expect(productModel.toJSON()).toStrictEqual({
      id: "1",
      name: "Product 1",
      price: 100,
    });
  });

  it("Should update a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 100);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({
      where: {
        id: "1",
      },
    });

    expect(productModel.toJSON()).toStrictEqual({
      id: "1",
      name: "Product 1",
      price: 100,
    });

    product.changeName("Product 2");

    product.changePrice(200);

    await productRepository.update(product);

    const productModel2 = await ProductModel.findOne({
      where: {
        id: "1",
      },
    });

    expect(productModel2.toJSON()).toStrictEqual({
      id: "1",
      name: "Product 2",
      price: 200,
    });
  });
});
