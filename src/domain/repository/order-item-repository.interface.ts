import { OrderItem } from "sequelize";
import RepositoryInterface from "./repository-interface";

export default interface OrderRepositoryInterface
  extends RepositoryInterface<OrderItem> {}
