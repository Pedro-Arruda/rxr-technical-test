import DishRepository from '../repositories/sequelize/sequelize-dish-repository.js';
import ListDishUseCase from '../use-cases/list-dishes.js';

export function makeListDish() {
  const dishRepository = new DishRepository();

  return new ListDishUseCase(dishRepository);
}
