import makeListOrderByCustomerUseCase from '../use-cases/list-order-by-customer.js';
import CustomerRepository from '../repositories/sequelize/sequelize-customer-repository.js';
import OrderRepository from '../repositories/sequelize/sequelize-order-repository.js';

export function makeListOrderByCustomer() {
  const orderRepository = new OrderRepository();
  const customerRepository = new CustomerRepository();

  return new makeListOrderByCustomerUseCase(orderRepository,customerRepository);
}
