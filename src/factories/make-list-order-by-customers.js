import makeListOrderByCustomerUseCase from '../use-cases/list-order-by-customer';
import CustomerRepository from '../repositories/sequelize/sequelize-customer-repository';
import OrderRepository from '../repositories/sequelize/sequelize-order-repository';

export function makeListOrderByCustomer() {
  const orderRepository = new OrderRepository();
  const customerRepository = new CustomerRepository();

  return new makeListOrderByCustomerUseCase(orderRepository,customerRepository);
}
