import CreateDish from './create-dish.js';
import InMemoryDishRepository from '../repositories/in-memory/in-memory-dish-repository.js';

describe('CreateDish', () => {
  it('should create a new dish', async () => {
    const dishRepository = new InMemoryDishRepository();
    const createDish = new CreateDish(dishRepository);

    const dishData = {
      name: 'Pizza',
      description: 'Delicious pizza',
      price: 25.99,
      category: 'main_course',
    };

    const dish = await createDish.execute(dishData);

    expect(dish).toHaveProperty('id');
    expect(dish.name).toBe('Pizza');
    expect(dish.description).toBe('Delicious pizza');
    expect(dish.price).toBe(25.99);
    expect(dish.category).toBe('main_course');
  });
});