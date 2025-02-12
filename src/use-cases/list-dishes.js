import DishRepository from '../repositories/dish-repository';

export default class ListDishes {
  constructor() {
    this.dishRepository = new DishRepository();
  }

  async execute(category = null, page = 1, limit = 10) {
    return this.dishRepository.findAll(category, page, limit);
  }
}