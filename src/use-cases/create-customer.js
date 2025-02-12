import Customer from '../entities/customer.js';

export default class CreateCustomer {
  constructor(customerRepository) {
    this.customerRepository = customerRepository;
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