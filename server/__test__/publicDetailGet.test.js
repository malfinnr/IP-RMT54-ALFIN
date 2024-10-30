const { describe, test, it, expect } = require("@jest/globals");
const app = require("../app");
const request = require("supertest");
const { sequelize } = require("../models");
const { signToken } = require("../helpers/jwt");
const { queryInterface } = sequelize;

let productId;
let product;

beforeAll(async () => {
  try {
    const insertCategories = await queryInterface.bulkInsert(
      "Categories",
      [
        {
          name: "Watch",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {
        returning: true,
      }
    );
    // console.log(insertCategories, "ini Insert Categories");
    let categoryId = insertCategories[0].id;

    const insertProducts = await queryInterface.bulkInsert(
      "Products",
      [
        {
          name: "Watches",
          image: "https://example.com/images/smart-watch.jpg",
          description: "Feature-packed smartwatch with fitness tracking.",
          fromName: "Cha",
          durationOfRelationship: "3 years",
          categoryId: 1,
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {
        returning: true,
      }
    );
    // console.log(insertCategories, "ini Insert Categories");
    product = insertProducts[0];

    // console.log(productId, "kfhasigdyiab");
  } catch (error) {
    console.log(error, "*&*&^&**(");
  }
});

afterAll(async () => {
  try {
    await queryInterface.bulkDelete("Products", null, {
      restartIdentity: true,
      truncate: true,
      cascade: true,
    });
    await queryInterface.bulkDelete("Categories", null, {
      restartIdentity: true,
      truncate: true,
      cascade: true,
    });
  } catch (error) {
    console.log(error, "979udjashd");
  }
});

describe("Testing Detail endpoint get /pub/products/:id", () => {
  it("Berhasil mendapatkan entitas utama sesuai dengan params id yang diberikan", async () => {
    const response = await request(app).get(`/pub/products/${product.id}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("name", product.name);
  });
  it("Gagal mendapatkan entitas utama karena params id yang diberikan tidak ada di database / invalid", async () => {
    const response = await request(app).get("/pub/products/4622222");

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "error not found");
  });
});
