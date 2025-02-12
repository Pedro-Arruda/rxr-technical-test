export default class ListOrdersByCustomer {
  constructor(orderRepository, customerRepository) {
    this.orderRepository = orderRepository;
    this.customerRepository = customerRepository  
  }

  async execute(customerId, page = 1, limit = 10) {
    const customer = await this.customerRepository.findById(customerId);
    if (!customer) {
      throw new Error('Customer not found');
    }

    return this.orderRepository.findByCustomer(customerId, page, limit);
  }
}