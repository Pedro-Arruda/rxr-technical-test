import CreateCustomerUseCase from '../use-cases/create-customer.js';
import CustomerRepository from '../repositories/sequelize/sequelize-customer-repository.js';

export function makeCreateCustomer() {
  const customerRepository = new CustomerRepository();
  return new CreateCustomerUseCase(customerRepository);
}
