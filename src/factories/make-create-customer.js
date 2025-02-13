import CreateCustomerUseCase from '../use-cases/create-customer';
import CustomerRepository from '../repositories/sequelize/sequelize-customer-repository';

export function makeCreateCustomer() {
  const customerRepository = new CustomerRepository();
  return new CreateCustomerUseCase(customerRepository);
}
