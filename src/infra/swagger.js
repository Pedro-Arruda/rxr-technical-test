import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Restaurant Order Manager - RX Redefined",
      version: "1.0.0",
      description: "API documentation for managing customers, orders and dishes",
      contact: {
        name: "Pedro Arruda",
        email: "dev.pedro.arruda@gmail.com"
      }
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server"
      }
    ]
  },
  apis: ["src/routes/*.js"]
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
};

export default setupSwagger;
