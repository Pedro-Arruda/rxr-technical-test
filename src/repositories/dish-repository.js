import Dish from '../infra/database/models/dish';

export default class DishRepository {
  async create(dishData) {
    return Dish.create(dishData);
  }

  async findById(id) {
    return Dish.findByPk(id);
  }

  async findAll(category = null, page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const where = category ? { category } : {};
    return Dish.findAndCountAll({
      where,
      limit,
      offset,
    });
  }

  async update(id, dishData) {
    const dish = await Dish.findByPk(id);
    if (!dish) {
      throw new Error('Dish not found');
    }
    return dish.update(dishData);
  }

  async delete(id) {
    const dish = await Dish.findByPk(id);
    if (!dish) {
      throw new Error('Dish not found');
    }
    return dish.destroy();
  }
}