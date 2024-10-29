"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const categories = require("../products.json").map((value) => {
      value.createdAt = new Date();
      value.updatedAt = new Date();

      return value;
    });

    await queryInterface.bulkInsert("Products", categories);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      'TRUNCATE TABLE "Products" RESTART IDENTITY CASCADE'
    );
  },
};
