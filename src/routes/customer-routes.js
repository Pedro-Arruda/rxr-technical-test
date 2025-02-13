import CustomerController from "../controllers/customer-controller.js";

export const customerRoutes = async (app) => {
  app.post("/", CustomerController.create);
};
