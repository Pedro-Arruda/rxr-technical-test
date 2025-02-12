export default (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      total_value: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('pending', 'preparing', 'ready', 'delivered', 'canceled'),
        defaultValue: 'pending',
      },
    }, {
      tableName: 'orders',
      timestamps: false,
    });
  
    Order.associate = (models) => {
      Order.belongsTo(models.Customer, { foreignKey: 'customer_id', as: 'customer' });
      Order.hasMany(models.OrderItem, { foreignKey: 'order_id', as: 'items' });
    };
  
    return Order;
  };