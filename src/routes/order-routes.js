import { Router } from "express";
import OrderController from "../controllers/order-controller.js";

export const orderRoutes = Router();

const orderController = new OrderController();

orderRoutes.post("/order", orderController.create.bind(orderController));
orderRoutes.get("/customer/orders/:customer_id", orderController.listByCustomer.bind(orderController));
orderRoutes.patch("/order/:order_id", orderController.updateStatus.bind(orderController));
orderRoutes.patch("/order/modify/:order_id", orderController.modify.bind(orderController));
