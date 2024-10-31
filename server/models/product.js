"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Category, { foreignKey: "categoryId" });
      Product.belongsTo(models.User, { foreignKey: "userId" });
      Product.hasMany(models.Comment, {
        foreignKey: "productId",
      });
      Product.hasMany(models.Like, { foreignKey: "productId" });
      // Product.belongsToMany(models.User, {
      //   through: "Likes",
      //   foreignKey: "productId",
      // });
    }
  }
  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Name is Required",
          },
        },
      },
      image: DataTypes.STRING,
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Description is Required",
          },
        },
      },
      fromName: DataTypes.STRING,
      durationOfRelationship: DataTypes.STRING,
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Category ID is Required",
          },
          notEmpty: {
            msg: "Category ID is Required",
          },
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Author ID is Required",
          },
          notEmpty: {
            msg: "Author ID is Required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
