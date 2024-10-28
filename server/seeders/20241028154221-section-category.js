"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const categories = require("../categories.json").map((value) => {
      value.createdAt = new Date();
      value.updatedAt = new Date();

      return value;
    });

    await queryInterface.bulkInsert("Categories", categories);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      'TRUNCATE TABLE "Categories" RESTART IDENTITY CASCADE'
    );
  },
};
