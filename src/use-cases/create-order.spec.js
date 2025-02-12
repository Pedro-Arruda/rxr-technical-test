import CreateOrder from './create-order.js';
import InMemoryOrderRepository from '../repositories/in-memory/in-memory-order-repository.js';
import InMemoryCustomerRepository from '../repositories/in-memory/in-memory-customer-repository.js';
import InMemoryDishRepository from '../repositories/in-memory/in-memory-dish-repository.js';

describe('CreateOrder', () => {
    it('should create a new order', async () => {
        const dishRepository = new InMemoryDishRepository();
        const orderRepository = new InMemoryOrderRepository();
        const customerRepository = new InMemoryCustomerRepository();
    
        await dishRepository.create({ id: 1, name: 'Pizza', price: 10.99, description: 'Pizza 1',
            category: "main_course" });
    
        await customerRepository.create({ id: 1, name: 'John Doe', email: 'john@example.com' });
    
        const createOrder = new CreateOrder(dishRepository, orderRepository, customerRepository);
    
        const orderData = {
          customer_id: 1,
          items: [{ menu_item_id: 1, quantity: 2 }],
          total_value: 10.99 * 2,
          status: 'pending',
        };
    
        const order = await createOrder.execute(orderData);
    
        expect(order).toBeDefined();
        expect(order.items).toHaveLength(1);
        expect(order.items[0].menu_item_id).toBe(1);
      });
  
    it('should throw an error if customer does not exist', async () => {
      const customerRepository = new InMemoryCustomerRepository();
      const dishRepository = new InMemoryDishRepository();
      const orderRepository = new InMemoryOrderRepository();
      const createOrder = new CreateOrder(orderRepository, customerRepository, dishRepository);
  
      const orderData = {
        customer_id: 999, 
        items: [{ menu_item_id: 1, quantity: 2 }],
      };
  
      await expect(createOrder.execute(orderData)).rejects.toThrow('Customer not found');
    });
  
    it('should throw an error if dish does not exist', async () => {
        const customerRepository = new InMemoryCustomerRepository();
        const dishRepository = new InMemoryDishRepository();
        const orderRepository = new InMemoryOrderRepository();
        const createOrder = new CreateOrder(dishRepository, orderRepository, customerRepository);
    
        const customer = await customerRepository.create({ name: 'John Doe', email: 'john@example.com' });

        const orderData = {
            customer_id: customer.id, 
            items: [{ menu_item_id: 999, quantity: 2 }],
            total_value: 10.99 * 2,
            status: 'pending',
        };
    
        await expect(createOrder.execute(orderData)).rejects.toThrow('Dish with ID 999 not found');
    });
  });