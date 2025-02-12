import Dish from '../entities/dish.js';

export default class CreateDish {
  constructor(dishRepository) {
    this.dishRepository = dishRepository;
  }

  async execute(dishData) {
    const dish = new Dish(dishData);

    return this.dishRepository.create(dish);
  }
}