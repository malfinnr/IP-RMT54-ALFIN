"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Product, { foreignKey: "userId" });
      User.hasMany(models.Comment, { foreignKey: "userId" });
      User.hasMany(models.Like, { foreignKey: "userId" });
      // User.belongsToMany(models.Product, {
      //   through: "Likes",
      //   foreignKey: "userId",
      // });
    }
  }
  User.init(
    {
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Full Name is Required",
          },
        },
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Username is Required",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: "Email is Not Valid",
          },
          notEmpty: {
            msg: "Email is Required",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [5, 255],
            msg: "Password must be at least 5 words",
          },
          notEmpty: {
            msg: "Password is Required",
          },
        },
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dateOfBirth: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate((user) => {
    const hash = hashPassword(user.password);
    user.password = hash;
  });

  return User;
};
