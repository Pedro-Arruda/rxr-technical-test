import DishRepository from '../repositories/sequelize/sequelize-dish-repository.js';
import OrderRepository from '../repositories/sequelize/sequelize-order-repository.js';
import ModifyOrderUseCase from '../use-cases/modify-order.js';

export function makeModifyOrder() {
  const orderRepository = new OrderRepository();
  const dishRepository = new DishRepository();

  return new ModifyOrderUseCase(orderRepository,dishRepository);
}
