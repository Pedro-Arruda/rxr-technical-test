import { Router } from "express";
import DishController from "../controllers/dish-controller.js";

export const dishRoutes = Router();

const dishController = new DishController();

dishRoutes.post("/menu", dishController.create.bind(dishController));
dishRoutes.get("/menu", dishController.list.bind(dishController));
