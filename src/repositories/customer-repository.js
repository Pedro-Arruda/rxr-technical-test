import Customer from '../infra/database/models/customer';

export default class CustomerRepository {
  async create(customerData) {
    return Customer.create(customerData);
  }

  async findById(id) {
    return Customer.findByPk(id);
  }

  async findByEmail(email) {
    return Customer.findOne({ where: { email } });
  }

  async update(id, customerData) {
    const customer = await Customer.findByPk(id);
    if (!customer) {
      throw new Error('Customer not found');
    }
    return customer.update(customerData);
  }

  async delete(id) {
    const customer = await Customer.findByPk(id);
    if (!customer) {
      throw new Error('Customer not found');
    }
    return customer.destroy();
  }

  async findAll(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    return Customer.findAndCountAll({
      limit,
      offset,
    });
  }
}