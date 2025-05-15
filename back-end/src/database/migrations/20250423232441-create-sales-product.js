"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("sales_products", {
      saleId: {
        type: Sequelize.INTEGER,
        field: "sale_id",
        primaryKey: true,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: {
          model: "sales",
          key: "id",
        },
      },
      productId: {
        type: Sequelize.INTEGER,
        field: "product_id",
        primaryKey: true,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: {
          model: "products",
          key: "id",
        },
      },
      quantity: {
        type: Sequelize.INTEGER,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable("sales_products");
  },
};
