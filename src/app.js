import express from 'express';
import {customerRoutes} from './routes/customer-routes.js'
import { dishRoutes } from './routes/dish-routes.js';
import { orderRoutes } from './routes/order-routes.js';
import setupSwagger from './infra/swagger.js';
import sequelize from './infra/database/config/index.js';

export const app = express();

app.use(express.json());

setupSwagger(app);

// const env = process.env.NODE_ENV || 'development';
// const dbConfig = config()[env];

// const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });



app.use('/customer', customerRoutes);
app.use('/', dishRoutes);
app.use('/', orderRoutes);

