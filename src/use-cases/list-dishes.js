export default class ListDishes {
  constructor(dishRepository) {
    this.dishRepository = dishRepository;
  }

  async execute(category = null, page = 1, limit = 10) {
    return this.dishRepository.findAll(category, page, limit);
  }
}