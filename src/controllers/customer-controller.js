import { z } from 'zod';
import { makeCreateCustomer } from '../factories/make-create-customer';

const createCustomerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format'),
  phone: z.string().min(1, 'Phone is required'),
});

export default class CustomerController {
  async create(req, res) {
    const createCustomer = makeCreateCustomer()

    try {
      const validatedData = createCustomerSchema.parse(req.body);

      const customer = await createCustomer.execute(validatedData);

      res.status(201).json(customer);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}