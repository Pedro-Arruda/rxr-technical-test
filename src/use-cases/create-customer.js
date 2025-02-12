import Customer from '../entities/customer.js';
import CustomerRepository from '../repositories/customer-repository.js';

export default class CreateCustomer {
  constructor() {
    this.customerRepository = new CustomerRepository();
  }

  async execute(customerData) {
    const customer = new Customer(customerData);

    const existingCustomer = await this.customerRepository.findByEmail(customer.email);
    
    if (existingCustomer) {
      throw new Error('Customer with this email already exists');
    }

    return this.customerRepository.create(customer);
  }
}