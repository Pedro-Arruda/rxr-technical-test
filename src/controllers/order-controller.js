import { z } from "zod";
import { makeCreateOrder } from "../factories/make-create-order.js";
import { makeListOrderByCustomer } from "../factories/make-list-order-by-customers.js";
import { MakeUpdateOrderStatus } from "../factories/make-update-status-order.js";
import { makeModifyOrder } from "../factories/make-modify-order.js";

const createOrderSchema = z.object({
  customer_id: z.number().min(1, "Customer ID is required"),
  items: z.array(
    z.object({
      menu_item_id: z.number().min(1, "Menu item ID is required"),
      quantity: z.number().min(1, "Quantity must be greater than zero"),
    })
  ),
});

const updateOrderStatusSchema = z.object({
  status: z.enum(["pending", "preparing", "ready", "delivered", "canceled"], {
    message: "Invalid status",
  }),
});

const modifyOrderSchema = z.object({
  items: z.array(
    z.object({
      menu_item_id: z.number().min(1, "Menu item ID is required"),
      quantity: z.number().min(1, "Quantity must be greater than zero"),
    })
  ),
});

export default class OrderController {
  async create(req, res) {
    try {
      const validatedData = createOrderSchema.parse(req.body);
      const createOrder = makeCreateOrder();

      const order = await createOrder.execute(validatedData);

      res.status(201).json(order);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async listByCustomer(req, res) {
    try {
      const listOrdersByCustomer = makeListOrderByCustomer();
      const customerId = parseInt(req.params.customer_id);
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      const result = await listOrdersByCustomer.execute(
        customerId,
        page,
        limit
      );

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateStatus(req, res) {
    try {
      const updateOrderStatus = MakeUpdateOrderStatus();
      const orderId = parseInt(req.params.order_id);

      const validatedData = updateOrderStatusSchema.parse(req.body);

      const order = await updateOrderStatus.execute(
        orderId,
        validatedData.status
      );

      res.status(200).json(order);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async modify(req, res) {
    try {
      const orderId = parseInt(req.params.order_id);

      const validatedData = modifyOrderSchema.parse(req.body);

      const modifyOrder = makeModifyOrder();

      const order = await modifyOrder.execute(orderId, validatedData.items);

      res.status(200).json(order);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}
