import { Router } from "express";
import CustomerController from "../controllers/customer-controller.js";

export const customerRoutes = Router();

const customerController = new CustomerController();

/**
 * @swagger
 * /customer:
 *   post:
 *     summary: "Create a new customer"
 *     description: "This endpoint allows you to create a new customer by providing the necessary information."
 *     tags:
 *       - "Customer"
 *     requestBody:
 *       description: "Customer object that needs to be added."
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "johndoe@example.com"
 *               phone:
 *                 type: string
 *                 example: "1234567890"
 *     responses:
 *       201:
 *         description: "Customer created successfully"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "John Doe"
 *                 email:
 *                   type: string
 *                   example: "johndoe@example.com"
 *                 phone:
 *                   type: string
 *                   example: "1234567890"
 *       400:
 *         description: "Invalid input"
 */
customerRoutes.post("/", customerController.create.bind(customerController));
