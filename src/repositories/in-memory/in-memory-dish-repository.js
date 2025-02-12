export default class InMemoryDishRepository {
    constructor() {
      this.dishes = [];
    }
  
    async create(dishData) {
      const dish = { id: this.dishes.length + 1, ...dishData };
      this.dishes.push(dish);
      return dish;
    }
  
    async findById(id) {
      return this.dishes.find((dish) => dish.id === id);
    }
  
    async findAll(category = null, page = 1, limit = 10) {
      const filteredDishes = category
        ? this.dishes.filter((dish) => dish.category === category)
        : this.dishes;
  
      const offset = (page - 1) * limit;
      return {
        count: filteredDishes.length,
        rows: filteredDishes.slice(offset, offset + limit),
      };
    }
  }