"use strict";
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      name: DataTypes.STRING(100),
      price: DataTypes.DECIMAL(4, 2),
      urlImage: DataTypes.STRING(200),
      sellerId: {
        type: DataTypes.INTEGER,
        field: "seller_id",
        allowNull: false,
      },
    },
    {
      tableName: "products",
      timestamps: false,
      underscored: true,
    },
  );

  Product.associate = (models) => {
    Product.belongsTo(models.User, {
      foreignKey: "sellerId",
      as: "seller",
    });
  };

  return Product;
};
