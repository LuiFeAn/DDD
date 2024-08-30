import Product from "../entity/product";

export default class ProductService {
  static increasePrice(prodcts: Product[], percentage: number): Product [] {
    prodcts.forEach((product) => {
      product.changePrice(product.price * percentage / 100 + product.price);
    });
    return prodcts;
  }
}
