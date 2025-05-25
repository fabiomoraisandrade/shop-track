"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: "users",
    },
  );

  User.associate = (models) => {
    User.hasMany(models.Sale, { foreignKey: "userId", as: "purchases" });
    User.hasMany(models.Sale, { foreignKey: "sellerId", as: "sales" });
    User.hasMany(models.Product, { foreignKey: "sellerId", as: "products" });
  };

  return User;
};
