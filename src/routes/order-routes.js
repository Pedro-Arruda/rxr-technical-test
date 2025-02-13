import { Router } from "express";
import OrderController from "../controllers/order-controller.js";

export const orderRoutes = Router();

const orderController = new OrderController();

/**
 * @swagger
 * /order:
 *   post:
 *     summary: "Create a new order"
 *     description: "This endpoint allows you to create a new order by providing customer ID and menu items."
 *     tags:
 *       - "Order"
 *     requestBody:
 *       description: "Order object that needs to be created."
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customer_id:
 *                 type: integer
 *                 example: 1
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     menu_item_id:
 *                       type: integer
 *                       example: 2
 *                     quantity:
 *                       type: integer
 *                       example: 3
 *     responses:
 *       201:
 *         description: "Order created successfully"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 customer_id:
 *                   type: integer
 *                   example: 1
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       menu_item_id:
 *                         type: integer
 *                         example: 2
 *                       quantity:
 *                         type: integer
 *                         example: 3
 *       400:
 *         description: "Invalid input"
 */
orderRoutes.post("/order", orderController.create.bind(orderController));

/**
 * @swagger
 * /customer/orders/{customer_id}:
 *   get:
 *     summary: "Get all orders for a specific customer"
 *     description: "This endpoint allows you to retrieve a list of orders by a customer's ID."
 *     tags:
 *       - "Order"
 *     parameters:
 *       - in: path
 *         name: customer_id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: "A list of orders for the customer"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   customer_id:
 *                     type: integer
 *                     example: 1
 *                   items:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         menu_item_id:
 *                           type: integer
 *                           example: 2
 *                         quantity:
 *                           type: integer
 *                           example: 3
 *       500:
 *         description: "Internal server error"
 */
orderRoutes.get("/customer/orders/:customer_id", orderController.listByCustomer.bind(orderController));

/**
 * @swagger
 * /order/{order_id}:
 *   patch:
 *     summary: "Update the status of an order"
 *     description: "This endpoint allows you to update the status of an order."
 *     tags:
 *       - "Order"
 *     parameters:
 *       - in: path
 *         name: order_id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       description: "Status update object."
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum:
 *                   - "pending"
 *                   - "preparing"
 *                   - "ready"
 *                   - "delivered"
 *                   - "canceled"
 *                 example: "ready"
 *     responses:
 *       200:
 *         description: "Order status updated successfully"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 status:
 *                   type: string
 *                   example: "ready"
 *       400:
 *         description: "Invalid status"
 */
orderRoutes.patch("/order/:order_id", orderController.updateStatus.bind(orderController));

/**
 * @swagger
 * /order/modify/{order_id}:
 *   patch:
 *     summary: "Modify the items of an order"
 *     description: "This endpoint allows you to modify the items in an existing order."
 *     tags:
 *       - "Order"
 *     parameters:
 *       - in: path
 *         name: order_id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       description: "Updated order items."
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     menu_item_id:
 *                       type: integer
 *                       example: 3
 *                     quantity:
 *                       type: integer
 *                       example: 2
 *     responses:
 *       200:
 *         description: "Order modified successfully"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       menu_item_id:
 *                         type: integer
 *                         example: 3
 *                       quantity:
 *                         type: integer
 *                         example: 2
 *       400:
 *         description: "Invalid input"
 */
orderRoutes.patch("/order/modify/:order_id", orderController.modify.bind(orderController));
