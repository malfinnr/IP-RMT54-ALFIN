"use strict";

const { hashPassword } = require("../helpers/bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", [
      {
        fullName: "Muhammad Alfin",
        userName: "malfinnr",
        email: "alfin@mail.com",
        password: hashPassword("123456"),
        gender: "male",
        dateOfBirth: new Date(2000, 0, 1),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullName: "Malaikha Resha",
        userName: "malaikha",
        email: "malaikha@mail.com",
        password: hashPassword("123456"),
        gender: "female",
        dateOfBirth: new Date(2001, 0, 1),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      'TRUNCATE TABLE "Users" RESTART IDENTITY CASCADE'
    );
  },
};
