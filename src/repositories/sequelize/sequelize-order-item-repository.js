import OrderItem from '../../infra/database/models/order-item.js'; 

export default class SequelizeOrderItemRepository {
  async create(orderItemData) {
    return OrderItem.create(orderItemData);
  }

  async findById(id) {
    return OrderItem.findByPk(id);
  }

  async update(id, orderItemData) {
    const orderItem = await OrderItem.findByPk(id);
    if (!orderItem) {
      throw new Error('OrderItem not found');
    }
    return orderItem.update(orderItemData);
  }

  async delete(id) {
    const orderItem = await OrderItem.findByPk(id);
    if (!orderItem) {
      throw new Error('OrderItem not found');
    }
    return orderItem.destroy();
  }

  async findByOrder(orderId) {
    return OrderItem.findAll({
      where: { order_id: orderId },
    });
  }
}