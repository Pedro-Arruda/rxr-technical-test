export default class InMemoryOrderRepository {
    constructor() {
      this.orders = [];
      this.orderItems = [];
    }
  
    async create(orderData) {
      const order = { id: this.orders.length + 1, ...orderData };
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
      const filteredOrders = this.orders.filter((order) => order.customer_id === customerId);
  
      const offset = (page - 1) * limit;
      return {
        count: filteredOrders.length,
        rows: filteredOrders.slice(offset, offset + limit),
      };
    }
  
    async updateStatus(id, status) {
      const order = this.orders.find((order) => order.id === id);
      if (!order) throw new Error('Order not found');
  
      order.status = status;
      return order;
    }
  
    async updateOrderItems(orderId, newItems) {
      this.orderItems = this.orderItems.filter((item) => item.order_id !== orderId);
  
      for (const item of newItems) {
        this.orderItems.push({ ...item, order_id: orderId });
      }
  
      return this.findById(orderId);
    }
  }