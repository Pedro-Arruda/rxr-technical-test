import ModifyOrder from "./modify-order.js";
import InMemoryOrderRepository from "../repositories/in-memory/in-memory-order-repository.js";
import InMemoryDishRepository from "../repositories/in-memory/in-memory-dish-repository.js";

describe("ModifyOrder", () => {
  it("should modify an order", async () => {
    const dishRepository = new InMemoryDishRepository();
    const orderRepository = new InMemoryOrderRepository(dishRepository);
    const modifyOrder = new ModifyOrder(orderRepository, dishRepository);

    const dish1 = await dishRepository.create({
      name: "Pizza",
      description: "Delicious pizza",
      price: 25.99,
      category: "main_course",
    });

    const dish2 = await dishRepository.create({
      name: "Salad",
      description: "Fresh salad",
      price: 10.99,
      category: "starter",
    });

    const order = await orderRepository.create({
      customer_id: 1,
      items: [{ menu_item_id: dish1.id, quantity: 2 }],
    });

    const newItems = [{ menu_item_id: dish2.id, quantity: 1 }];
    const updatedOrder = await modifyOrder.execute(order.id, newItems);
    console.log(updatedOrder);

    expect(updatedOrder.items).toHaveLength(1);
    expect(updatedOrder.items[0].dishId).toBe(dish2.id);
  });

  it("should throw an error if order cannot be modified", async () => {
    const orderRepository = new InMemoryOrderRepository();
    const dishRepository = new InMemoryDishRepository();
    const modifyOrder = new ModifyOrder(orderRepository, dishRepository);

    await dishRepository.create({ id: 1, price: 10 });

    const order = await orderRepository.create({
      customer_id: 1,
      items: [{ menu_item_id: 1, quantity: 2 }],
      status: "ready",
    });

    await expect(modifyOrder.execute(order.id, [])).rejects.toThrow(
      "Order cannot be modified"
    );
  });
});
