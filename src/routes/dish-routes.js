import { Router } from "express";
import DishController from "../controllers/dish-controller.js";

export const dishRoutes = Router();

const dishController = new DishController();

/**
 * @swagger
 * /menu:
 *   post:
 *     summary: "Create a new dish"
 *     description: "This endpoint allows you to create a new dish by providing the necessary information."
 *     tags:
 *       - "Dish"
 *     requestBody:
 *       description: "Dish object that needs to be added."
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Spaghetti"
 *               description:
 *                 type: string
 *                 example: "Delicious spaghetti with tomato sauce."
 *               price:
 *                 type: number
 *                 example: 12.99
 *               category:
 *                 type: string
 *                 enum:
 *                   - starter
 *                   - main_course
 *                   - dessert
 *                   - drink
 *                 example: "main_course"
 *     responses:
 *       201:
 *         description: "Dish created successfully"
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
 *                   example: "Spaghetti"
 *                 description:
 *                   type: string
 *                   example: "Delicious spaghetti with tomato sauce."
 *                 price:
 *                   type: number
 *                   example: 12.99
 *                 category:
 *                   type: string
 *                   example: "main_course"
 *       400:
 *         description: "Invalid input"
 */
dishRoutes.post("/menu", dishController.create.bind(dishController));

/**
 * @swagger
 * /menu:
 *   get:
 *     summary: "List all dishes"
 *     description: "This endpoint allows you to retrieve a list of dishes, with optional filters for category and pagination."
 *     tags:
 *       - "Dish"
 *     parameters:
 *       - in: query
 *         name: category
 *         required: false
 *         schema:
 *           type: string
 *           example: "main_course"
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
 *         description: "A list of dishes"
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
 *                   name:
 *                     type: string
 *                     example: "Spaghetti"
 *                   description:
 *                     type: string
 *                     example: "Delicious spaghetti with tomato sauce."
 *                   price:
 *                     type: number
 *                     example: 12.99
 *                   category:
 *                     type: string
 *                     example: "main_course"
 *       500:
 *         description: "Internal server error"
 */
dishRoutes.get("/menu", dishController.list.bind(dishController));
