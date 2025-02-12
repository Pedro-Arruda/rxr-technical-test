import { z } from 'zod';

const orderSchema = z.object({
  id: z.number().optional(),
  customer_id: z.number().min(1, 'Customer ID is required'),
  total_value: z.number().min(0, 'Total value must be greater than or equal to zero'),
  status: z.enum(['pending', 'preparing', 'ready', 'delivered', 'canceled'], {
    message: 'Invalid status',
  }),
  items: z.array(
    z.object({
      menu_item_id: z.number().min(1, 'Menu item ID is required'),
      quantity: z.number().min(1, 'Quantity must be greater than zero'),
    })
  ),
});

export default class Order {
  constructor({ id, customer_id, total_value, status, items }) {
    const result = orderSchema.safeParse({ id, customer_id, total_value, status, items });

    if (!result.success) {
      throw new Error(JSON.stringify(result.error));
    }

    const validatedData = result.data;
    this.id = validatedData.id;
    this.customer_id = validatedData.customer_id;
    this.total_value = validatedData.total_value;
    this.status = validatedData.status || 'pending';
    this.items = validatedData.items || [];
  }

  updateStatus(newStatus) {
    const result = orderSchema.pick({ status: true }).safeParse({ status: newStatus });

    if (!result.success) {
      throw new Error(JSON.stringify(result.error));
    }

    this.status = result.data.status;
  }

  addItem(item) {
    const result = orderSchema.pick({ items: true }).safeParse({ items: [item] });

    if (!result.success) {
      throw new Error(JSON.stringify(result.error));
    }

    this.items.push(item);
  }
}