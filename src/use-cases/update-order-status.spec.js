import UpdateOrderStatus from "./update-order-status.js";
import InMemoryOrderRepository from "../repositories/in-memory/in-memory-order-repository.js";
import InMemoryDishRepository from "../repositories/in-memory/in-memory-dish-repository.js";

describe("UpdateOrderStatus", () => {
  it("should update the status of an order", async () => {
    const dishRepository = new InMemoryDishRepository();
    const orderRepository = new InMemoryOrderRepository(dishRepository);
    const updateOrderStatus = new UpdateOrderStatus(orderRepository);

    const order = await orderRepository.create({
      customer_id: 1,
      items: [{ menu_item_id: 1, quantity: 2 }],
    });

    const updatedOrder = await updateOrderStatus.execute(order.id, "preparing");

    expect(updatedOrder.status).toBe("preparing");
  });

  it("should throw an error if order does not exist", async () => {
    const orderRepository = new InMemoryOrderRepository();
    const updateOrderStatus = new UpdateOrderStatus(orderRepository);

    await expect(updateOrderStatus.execute(999, "preparing")).rejects.toThrow(
      "Order not found"
    );
  });
});
