import sequelize from "../config/index.js";
import { DataTypes } from "sequelize";
import Customer from "./customer.js";
import OrderItem from "./order-item.js";

const Order = sequelize.define(
  "orders",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalValue: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(
        "pending",
        "preparing",
        "ready",
        "delivered",
        "canceled"
      ),
      defaultValue: "pending",
    },
  },
  {
    tableName: "orders",
    timestamps: true,
  }
);

Order.associate = (models) => {
  Order.belongsTo(models.Customer, {
    foreignKey: "customerId",
    as: "customer",
  });
  Order.hasMany(models.OrderItem, { foreignKey: "orderId", as: "orderItems" });
};

export default Order;
