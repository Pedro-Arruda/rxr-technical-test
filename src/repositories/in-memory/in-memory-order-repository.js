export default class InMemoryOrderRepository {
  constructor(dishRepository) {
    this.orders = [];
    this.orderItems = [];
    this.dishRepository = dishRepository;
  }

  async create(orderData) {
    const order = {
      id: this.orders.length + 1,
      status: orderData.status ?? "pending",
      ...orderData,
    };
    this.orders.push(order);

    for (const item of orderData.items) {
      this.orderItems.push({ ...item, order_id: order.id });
    }

    return order;
  }

  async findById(id) {
    const order = this.orders.find((order) => order.id === id);
    if (!order) return null;

    const items = this.orderItems.filter((item) => item.order_id === id);
    return { ...order, items };
  }

  async findByCustomer(customerId, page = 1, limit = 10) {
    const filteredOrders = this.orders.filter(
      (order) => order.customer_id === customerId
    );

    const offset = (page - 1) * limit;
    return {
      count: filteredOrders.length,
      rows: filteredOrders.slice(offset, offset + limit),
    };
  }

  async updateStatus(id, status) {
    const order = this.orders.find((order) => order.id === id);
    if (!order) throw new Error("Order not found");

    order.status = status;
    return order;
  }

  async updateOrderItems(orderId, newItems) {
    this.orderItems = this.orderItems.filter(
      (item) => item.order_id !== orderId
    );

    for (const item of newItems) {
      this.orderItems.push({ ...item, order_id: orderId });
    }

    return this.findById(orderId);
  }

  async modifyOrder(orderId, items) {
    const order = this.orders.find((order) => order.id === orderId);
    if (!order) throw new Error("Order not found");

    this.orderItems = this.orderItems.filter(
      (item) => item.order_id !== orderId
    );

    const orderItems = items.map((item) => ({
      order_id: orderId,
      dishId: item.menu_item_id,
      quantity: item.quantity,
    }));
    this.orderItems.push(...orderItems);

    const totalValue = await this.calculateTotalValue(items);
    order.totalValue = totalValue;

    return this.findById(orderId);
  }

  async calculateTotalValue(items) {
    let totalValue = 0;
    for (const item of items) {
      const dish = await this.dishRepository.findById(item.menu_item_id);
      if (!dish) {
        throw new Error(`Dish with ID ${item.menu_item_id} not found`);
      }
      totalValue += dish.price * item.quantity;
    }
    return totalValue;
  }
}
