import { z } from 'zod';

const dishSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.number().min(0, 'Price must be greater than or equal to zero'),
  category: z.enum(['starter', 'main_course', 'dessert', 'drink'], {
    message: 'Invalid category',
  }),
});

export default class Dish {
  constructor({ id, name, description, price, category }) {
    const result = dishSchema.safeParse({ id, name, description, price, category });

    if (!result.success) {
      throw new Error(JSON.stringify(result.error));
    }

    const validatedData = result.data;
    this.id = validatedData.id;
    this.name = validatedData.name;
    this.description = validatedData.description;
    this.price = validatedData.price;
    this.category = validatedData.category;
  }

  update({ name, description, price, category }) {
    const result = dishSchema.safeParse({ name, description, price, category });

    if (!result.success) {
      throw new Error(JSON.stringify(formatZodError(result.error)));
    }

    this.name = name || this.name;
    this.description = description || this.description;
    this.price = price || this.price;
    this.category = category || this.category;
  }
}