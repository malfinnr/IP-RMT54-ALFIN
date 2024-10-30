const { describe, test, it, expect } = require("@jest/globals");
const app = require("../app");
const request = require("supertest");
const { sequelize } = require("../models");
const { signToken } = require("../helpers/jwt");
const { queryInterface } = sequelize;

const generateLoad = {
  id: 1,
  email: "alfin@mail.com",
  username: "malfinnr",
};

const accessToken = signToken(generateLoad);

let productId;

let productName = "";

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
    productId = insertProducts[0].id;
    productName = insertProducts[0].name;

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

describe("Testing Endpoint delete /products/id", () => {
  it("Berhasil menghapus data entitas utama berdasarkan params id yang diberikan", async () => {
    const response = await request(app)
      .delete(`/products/${productId}`)
      .set("Authorization", `Bearer ${accessToken}`);

    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty(
      "message",
      `${productName} success to delete`
    );
  });
  it("Gagal menjalankan fitur karena belum login", async () => {
    const response = await request(app).delete(`/products/${productId}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid Token");
  });
  it("Gagal menjalankan fitur karena token yang diberikan tidak valid", async () => {
    const invalidToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJCZWF2Iiwicm9sZSI6IkFkbWluIiwiaWF0IjoxNzI5MDkzNDgyfQ.sKsCpy3B3Yr1zF3mRQJApE8W4rTFPSsCcRSc7V1hZ0";

    const response = await request(app)
      .delete(`/products/${productId}`)
      .set("Authorization", `Bearer ${invalidToken}`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid Token");
  });
  it("Gagal karena id entity yang dikirim tidak terdapat di database", async () => {
    const nonProductId = 14145;

    const response = await request(app)
      .delete(`/products/${nonProductId}`)
      .set("Authorization", `Bearer ${accessToken}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Product Not Found");
  });
});
