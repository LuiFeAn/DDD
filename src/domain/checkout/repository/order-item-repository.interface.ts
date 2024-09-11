import { OrderItem } from "sequelize";
import RepositoryInterface from "../../@shared/repository/repository-interface";

export default interface OrderRepositoryInterface
  extends RepositoryInterface<OrderItem> {}
