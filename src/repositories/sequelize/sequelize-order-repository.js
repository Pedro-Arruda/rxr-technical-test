import Order from "../../infra/database/models/order.js";
import OrderItem from "../../infra/database/models/order-item.js";
import Dish from "../../infra/database/models/dish.js";

export default class SequelizeOrderRepository {
  async create(orderData) {
    const { customer_id, items } = orderData;

    const totalValue = await this.calculateTotalValue(items);

    const order = await Order.create({
      customerId: customer_id,
      totalValue,
      status: "pending",
    });

    const orderItems = items.map((item) => ({
      orderId: order.dataValues.id,
      dishId: item.menu_item_id,
      quantity: item.quantity,
    }));

    await OrderItem.bulkCreate(orderItems);

    return order;
  }

  async findById(id) {
    const order = await Order.findOne({
      where: { id },
      raw: true,
    });

    if (!order) return null;

    const orderItems = await OrderItem.findAll({
      where: { orderId: id },
      raw: true,
    });

    for (const item of orderItems) {
      item.dish = await Dish.findOne({ where: { id: item.dishId }, raw: true });
    }

    return {
      ...order,
      items: orderItems,
    };
  }

  async findByCustomer(customerId, page = 1, limit = 10) {
    const offset = (page - 1) * limit;

    const orders = await Order.findAll({
      where: { customerId },
      limit,
      offset,
      raw: true,
    });

    if (!orders.length) return { count: 0, rows: [] };

    for (const order of orders) {
      order.items = await OrderItem.findAll({
        where: { orderId: order.id },
        raw: true,
      });

      for (const item of order.items) {
        item.dish = await Dish.findOne({
          where: { id: item.dishId },
          raw: true,
        });
      }
    }

    return { orders };
  }

  async updateStatus(id, status) {
    const order = await Order.findByPk(id);
    if (!order) {
      throw new Error("Order not found");
    }
    return order.update({ status });
  }

  async delete(id) {
    const order = await Order.findByPk(id);
    if (!order) {
      throw new Error("Order not found");
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

  async modifyOrder(orderId, items) {
    const order = await Order.findByPk(orderId);

    await OrderItem.destroy({ where: { orderId } });

    const orderItems = items.map((item) => ({
      orderId,
      dishId: item.menu_item_id,
      quantity: item.quantity,
    }));

    await OrderItem.bulkCreate(orderItems);

    const totalValue = await this.calculateTotalValue(items);
    await order.update({ totalValue });

    return this.findById(orderId);
  }
}
