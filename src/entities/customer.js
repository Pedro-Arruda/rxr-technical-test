import { z } from 'zod';

const customerSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format'),
  phone: z.string().min(1, 'Phone is required'),
});

export default class Customer {
  constructor({ id, name, email, phone }) {
    const result = customerSchema.safeParse({ id, name, email, phone });

    if (!result.success) {
      throw new Error(JSON.stringify(result.error));
    }

    const validatedData = result.data;
    this.id = validatedData.id;
    this.name = validatedData.name;
    this.email = validatedData.email;
    this.phone = validatedData.phone;
  }

  update({ name, email, phone }) {
    this.name = name || this.name;
    this.email = email || this.email;
    this.phone = phone || this.phone;
  }
}