import DishRepository from '../repositories/sequelize/sequelize-dish-repository.js';
import CreateDishUseCase from '../use-cases/create-dish.js';

export function makeCreateDish() {
  const dishRepository = new DishRepository();

  return new CreateDishUseCase(dishRepository);
}
