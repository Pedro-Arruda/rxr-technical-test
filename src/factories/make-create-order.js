import CustomerRepository from '../repositories/sequelize/sequelize-customer-repository';
import DishRepository from '../repositories/sequelize/sequelize-dish-repository';
import OrderRepository from '../repositories/sequelize/sequelize-order-repository';
import CreateOrderUseCase from '../use-cases/create-order';

export function makeCreateOrder() {
  const orderRepository = new OrderRepository();
  const customerRepository = new CustomerRepository();
  const dishRepository = new DishRepository();

  return new CreateOrderUseCase(dishRepository,orderRepository, customerRepository);
}
