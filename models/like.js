"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    static associate(models) {
      Like.belongsTo(models.Product, { foreignKey: "productId" });
      Like.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  Like.init(
    {},
    {
      sequelize,
      modelName: "Like",
    }
  );
  return Like;
};
