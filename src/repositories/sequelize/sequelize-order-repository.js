import Order from '../../infra/database/models/order.js';
import OrderItem from '../../infra/database/models/order-item.js';
import Dish from '../../infra/database/models/dish.js';

export default class SequelizeOrderRepository {
  async create(orderData) {
    const { customer_id, items } = orderData;

    const totalValue = await this.calculateTotalValue(items);

    const order = await Order.create({
      customer_id,
      total_value: totalValue,
      status: 'pending',
    });

    const orderItems = items.map((item) => ({
      order_id: order.id,
      menu_item_id: item.menu_item_id,
      quantity: item.quantity,
    }));

    await OrderItem.bulkCreate(orderItems);

    return order;
  }

  async findById(id) {
    return Order.findByPk(id, {
      include: [
        {
          model: OrderItem,
          as: 'items',
          include: [
            {
              model: Dish,
              as: 'dish',
            },
          ],
        },
      ],
    });
  }

  async findByCustomer(customerId, page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    return Order.findAndCountAll({
      where: { customer_id: customerId },
      include: [
        {
          model: OrderItem,
          as: 'items',
          include: [
            {
              model: Dish,
              as: 'dish',
            },
          ],
        },
      ],
      limit,
      offset,
    });
  }

  async updateStatus(id, status) {
    const order = await Order.findByPk(id);
    if (!order) {
      throw new Error('Order not found');
    }
    return order.update({ status });
  }

  async delete(id) {
    const order = await Order.findByPk(id);
    if (!order) {
      throw new Error('Order not found');
    }
    return order.destroy();
  }

  async calculateTotalValue(items) {
    let totalValue = 0;
    for (const item of items) {
      const dish = await Dish.findByPk(item.menu_item_id);
      if (!dish) {
        throw new Error(`Dish with ID ${item.menu_item_id} not found`);
      }
      totalValue += dish.price * item.quantity;
    }
    return totalValue;
  }
}