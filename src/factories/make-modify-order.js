import DishRepository from '../repositories/sequelize/sequelize-dish-repository';
import OrderRepository from '../repositories/sequelize/sequelize-order-repository';
import ModifyOrderUseCase from '../use-cases/modify-order';

export function makeModifyOrder() {
  const orderRepository = new OrderRepository();
  const dishRepository = new DishRepository();

  return new ModifyOrderUseCase(orderRepository,dishRepository);
}
