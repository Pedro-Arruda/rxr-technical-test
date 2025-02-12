import OrderRepository from '../repositories/order-repository.js';

export default class UpdateOrderStatus {
  constructor() {
    this.orderRepository = new OrderRepository();
  }

  async execute(orderId, newStatus) {
    const order = await this.orderRepository.findById(orderId);
    if (!order) {
      throw new Error('Order not found');
    }

    return this.orderRepository.updateStatus(orderId, newStatus);
  }
}