export default class UpdateOrderStatus {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute(orderId, newStatus) {
    const order = await this.orderRepository.findById(orderId);
    if (!order) {
      throw new Error('Order not found');
    }

    return this.orderRepository.updateStatus(orderId, newStatus);
  }
}