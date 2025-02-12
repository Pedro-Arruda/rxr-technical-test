import Order from '../entities/order.js';
import OrderRepository from '../repositories/order-repository.js';
import CustomerRepository from '../repositories/customer-repository.js';
import DishRepository from '../repositories/dish-repository.js';

export default class CreateOrder {
  constructor() {
    this.orderRepository = new OrderRepository();
    this.customerRepository = new CustomerRepository();
    this.dishRepository = new DishRepository();
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