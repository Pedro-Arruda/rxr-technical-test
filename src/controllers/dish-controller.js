import { z } from 'zod';
import {makeCreateDish} from '../factories/make-create-dish.js'
import {makeListDish} from '../factories/make-list-dishes.js'

const createDishSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.number().min(0, 'Price must be greater than or equal to zero'),
  category: z.enum(['starter', 'main_course', 'dessert', 'drink'], {
    message: 'Invalid category',
  }),
});

export default class DishController {
  constructor(createDish, listDishes) {
    this.createDish = createDish;
    this.listDishes = listDishes;
  }

  async create(req, res) {
    try {
      const validatedData = createDishSchema.parse(req.body);

      const createDish = makeCreateDish();

      const dish = await createDish.execute(validatedData);

      res.status(201).json(dish);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async list(req, res) {
    try {
      const category = req.query.category || null;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      const listDishes = makeListDish();

      const result = await listDishes.execute(category, page, limit);

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}