import CustomerRepository from '../repositories/sequelize/sequelize-customer-repository.js';
import DishRepository from '../repositories/sequelize/sequelize-dish-repository.js';
import OrderRepository from '../repositories/sequelize/sequelize-order-repository.js';
import CreateOrderUseCase from '../use-cases/create-order.js';

export function makeCreateOrder() {
  const orderRepository = new OrderRepository();
  const customerRepository = new CustomerRepository();
  const dishRepository = new DishRepository();

  return new CreateOrderUseCase(dishRepository,orderRepository, customerRepository);
}
