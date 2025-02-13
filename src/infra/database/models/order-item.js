import sequelize from "../config/index.js";
import { DataTypes } from "sequelize";

const OrderItem = sequelize.define(
  "OrderItem",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dishId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "orderItems",
    timestamps: true,
  }
);

OrderItem.associate = (models) => {
  OrderItem.belongsTo(models.Order, {
    foreignKey: "orderId",
    as: "orderItems",
  });
  OrderItem.belongsTo(models.Dish, { foreignKey: "dishId", as: "dish" });
};

export default OrderItem;
