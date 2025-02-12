import ListOrdersByCustomer from './list-order-by-customer.js';
import InMemoryOrderRepository from '../repositories/in-memory/in-memory-order-repository.js';
import InMemoryCustomerRepository from '../repositories/in-memory/in-memory-customer-repository.js';

describe('ListOrdersByCustomer', () => {
  it('should list orders by customer', async () => {
    const customerRepository = new InMemoryCustomerRepository();
    const orderRepository = new InMemoryOrderRepository();
    const listOrdersByCustomer = new ListOrdersByCustomer(orderRepository, customerRepository);

    const customer = await customerRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      phone: '1234567890',
    });

    const order1 = await orderRepository.create({
      customer_id: customer.id,
      items: [{ menu_item_id: 1, quantity: 2 }],
    });

    const order2 = await orderRepository.create({
      customer_id: customer.id,
      items: [{ menu_item_id: 2, quantity: 1 }],
    });

    const result = await listOrdersByCustomer.execute(customer.id);

    expect(result.count).toBe(2);
    expect(result.rows).toHaveLength(2);
    expect(result.rows[0].id).toBe(order1.id);
    expect(result.rows[1].id).toBe(order2.id);
  });

  it('should throw an error if customer does not exist', async () => {
    const customerRepository = new InMemoryCustomerRepository();
    const orderRepository = new InMemoryOrderRepository();
    const listOrdersByCustomer = new ListOrdersByCustomer(orderRepository, customerRepository);

    await expect(listOrdersByCustomer.execute(999)).rejects.toThrow('Customer not found');
  });
});