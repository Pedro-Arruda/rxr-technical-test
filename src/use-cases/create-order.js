import Order from '../entities/order.js';

export default class CreateOrder {
  constructor(dishRepository, orderRepository, customerRepository) {
    this.dishRepository = dishRepository;
    this.orderRepository = orderRepository;
    this.customerRepository = customerRepository;
  }

  async execute(orderData) {
    const { customer_id, items } = orderData;

    const customer = await this.customerRepository.findById(customer_id);
    
    if (!customer) {
      throw new Error('Customer not found');
    }

    for (const item of items) {
      const dish = await this.dishRepository.findById(item.menu_item_id);
      if (!dish) {
        throw new Error(`Dish with ID ${item.menu_item_id} not found`);
      }
    }

    const order = new Order(orderData);

    return this.orderRepository.create(order);
  }
}