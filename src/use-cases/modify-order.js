export default class ModifyOrder {
  constructor(orderRepository, dishRepository) {
    this.orderRepository = orderRepository;
    this.dishRepository = dishRepository  
  }

  async execute(orderId, newItems) {
    const order = await this.orderRepository.findById(orderId);
    if (!order) {
      throw new Error('Order not found');
    }

    if (order.status !== 'pending' && order.status !== 'preparing') {
      throw new Error('Order cannot be modified');
    }

    for (const item of newItems) {
      const dish = await this.dishRepository.findById(item.menu_item_id);
      if (!dish) {
        throw new Error(`Dish with ID ${item.menu_item_id} not found`);
      }
    }

    return this.orderRepository.updateOrderItems(orderId, newItems);
  }
}