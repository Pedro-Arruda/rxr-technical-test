import UpdateOrderStatusUseCase from '../use-cases/update-order-status';
import OrderRepository from '../repositories/sequelize/sequelize-order-repository';

export function MakeUpdateOrderStatus() {
  const orderRepository = new OrderRepository();
  return new UpdateOrderStatusUseCase(orderRepository);
}