import DishRepository from '../repositories/sequelize/sequelize-dish-repository';
import CreateDishUseCase from '../use-cases/create-dish';

export function makeCreateDish() {
  const dishRepository = new DishRepository();

  return new CreateDishUseCase(dishRepository);
}
