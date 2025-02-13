import express from 'express';
import {customerRoutes} from './routes/customer-routes.js'

export const app = express();

app.use(express.json());
app.use('/customers', customerRoutes);

