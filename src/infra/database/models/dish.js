import { DataTypes } from "sequelize";
import sequelize from "../config/index.js";

const Dish = sequelize.define(
  "dishes",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    category: {
      type: DataTypes.ENUM("starter", "main_course", "dessert", "drink"),
      allowNull: false,
    },
  },
  {
    tableName: "dishes",
    timestamps: true,
  }
);

export default Dish;
