import ListDishes from './list-dishes.js';
import InMemoryDishRepository from '../repositories/in-memory/in-memory-dish-repository.js';

describe('ListDishes', () => {
  it('should list all dishes', async () => {
    const dishRepository = new InMemoryDishRepository();
    const listDishes = new ListDishes(dishRepository);

    const dish1 = { name: 'Pizza', description: 'Delicious pizza', price: 25.99, category: 'main_course' };
    const dish2 = { name: 'Salad', description: 'Fresh salad', price: 10.99, category: 'starter' };

    await dishRepository.create(dish1);
    await dishRepository.create(dish2);

    const result = await listDishes.execute();

    expect(result.count).toBe(2);
    expect(result.rows).toHaveLength(2);
  });

  it('should filter dishes by category', async () => {
    const dishRepository = new InMemoryDishRepository();
    const listDishes = new ListDishes(dishRepository);

    const dish1 = { name: 'Pizza', description: 'Delicious pizza', price: 25.99, category: 'main_course' };
    const dish2 = { name: 'Salad', description: 'Fresh salad', price: 10.99, category: 'starter' };

    await dishRepository.create(dish1);
    await dishRepository.create(dish2);

    const result = await listDishes.execute('starter');

    expect(result.count).toBe(1);
    expect(result.rows[0].name).toBe('Salad');
  });
});