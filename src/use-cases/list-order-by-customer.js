import OrderRepository from '../repositories/order-repository.js';
import CustomerRepository from '../repositories/customer-repository.js';

export default class ListOrdersByCustomer {
  constructor() {
    this.orderRepository = new OrderRepository();
    this.customerRepository = new CustomerRepository();
  }

  async execute(customerId, page = 1, limit = 10) {
    const customer = await this.customerRepository.findById(customerId);
    if (!customer) {
      throw new Error('Customer not found');
    }

    return this.orderRepository.findByCustomer(customerId, page, limit);
  }
}