import express from "express";
import { customerRoutes } from "./routes/customer-routes.js";
import { dishRoutes } from "./routes/dish-routes.js";
import { orderRoutes } from "./routes/order-routes.js";
import setupSwagger from "./infra/swagger.js";

export const app = express();

app.use(express.json());

setupSwagger(app);

app.use("/customer", customerRoutes);
app.use("/", dishRoutes);
app.use("/", orderRoutes);
