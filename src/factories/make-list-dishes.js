import DishRepository from '../repositories/sequelize/sequelize-dish-repository';
import ListDishUseCase from '../use-cases/list-dishes';

export function makeListDish() {
  const dishRepository = new DishRepository();

  return new ListDishUseCase(dishRepository);
}
