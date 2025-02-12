import { z } from 'zod';

const orderItemSchema = z.object({
  id: z.number().optional(),
  order_id: z.number().min(1, 'Order ID is required'),
  menu_item_id: z.number().min(1, 'Menu item ID is required'),
  quantity: z.number().min(1, 'Quantity must be greater than zero'),
});

export default class OrderItem {
  constructor({ id, order_id, menu_item_id, quantity }) {

    const result = orderItemSchema.safeParse({ id, order_id, menu_item_id, quantity });

    if (!result.success) {
      throw new Error(JSON.stringify(result.error));
    }

    const validatedData = result.data;
    this.id = validatedData.id;
    this.order_id = validatedData.order_id;
    this.menu_item_id = validatedData.menu_item_id;
    this.quantity = validatedData.quantity;
  }


  updateQuantity(newQuantity) {
    const result = orderItemSchema.pick({ quantity: true }).safeParse({ quantity: newQuantity });

    if (!result.success) {
      throw new Error(JSON.stringify(result.error));
    }

    this.quantity = result.data.quantity;
  }
}