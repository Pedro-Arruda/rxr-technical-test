import { Router } from "express";
import CustomerController from "../controllers/customer-controller.js";

export const customerRoutes = Router();

const customerController = new CustomerController();

customerRoutes.post("/", customerController.create.bind(customerController));
