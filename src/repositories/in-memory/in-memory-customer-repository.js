export default class InMemoryCustomerRepository {
    constructor() {
      this.customers = [];
    }
  
    async create(customerData) {
      const customer = { id: this.customers.length + 1, ...customerData };
      this.customers.push(customer);
      return customer;
    }
  
    async findById(id) {
      return this.customers.find((customer) => customer.id === id);
    }
  
    async findByEmail(email) {
      return this.customers.find((customer) => customer.email === email);
    }
  
    async findAll(page = 1, limit = 10) {
      const offset = (page - 1) * limit;
      return {
        count: this.customers.length,
        rows: this.customers.slice(offset, offset + limit),
      };
    }
  }