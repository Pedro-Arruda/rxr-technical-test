import UpdateOrderStatusUseCase from '../use-cases/update-order-status.js';
import OrderRepository from '../repositories/sequelize/sequelize-order-repository.js';

export function MakeUpdateOrderStatus() {
  const orderRepository = new OrderRepository();
  return new UpdateOrderStatusUseCase(orderRepository);
}