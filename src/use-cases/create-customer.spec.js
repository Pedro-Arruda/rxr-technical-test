import CreateCustomer from './create-customer.js';
import InMemoryCustomerRepository from '../repositories/in-memory/in-memory-customer-repository.js';

describe('CreateCustomer', () => {
  it('should create a new customer', async () => {
    const customerRepository = new InMemoryCustomerRepository();
    const createCustomer = new CreateCustomer(customerRepository);

    const customerData = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '1234567890',
    };

    const customer = await createCustomer.execute(customerData);

    expect(customer).toHaveProperty('id');
    expect(customer.name).toBe('John Doe');
    expect(customer.email).toBe('john@example.com');
    expect(customer.phone).toBe('1234567890');
  });

  it('should throw an error if email already exists', async () => {
    const customerRepository = new InMemoryCustomerRepository();
    const createCustomer = new CreateCustomer(customerRepository);

    const customerData = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '1234567890',
    };

    await createCustomer.execute(customerData);

    await expect(createCustomer.execute(customerData)).rejects.toThrow(
      'Customer with this email already exists'
    );
  });
});