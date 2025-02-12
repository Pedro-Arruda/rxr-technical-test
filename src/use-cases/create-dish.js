import Dish from '../entities/dish.js';
import DishRepository from '../repositories/dish-repository.js';

export default class CreateDish {
  constructor() {
    this.dishRepository = new DishRepository();
  }

  async execute(dishData) {
    const dish = new Dish(dishData);

    return this.dishRepository.create(dish);
  }
}