const {
  describe,
  test,
  it,
  expect,
  beforeAll,
  afterAll,
} = require("@jest/globals");
const app = require("../app");
const request = require("supertest");
const { sequelize } = require("../models");
const { signToken } = require("../helpers/jwt");
const { queryInterface } = sequelize;

let categoryId;
const generateLoad = {
  id: 1,
  email: "alfin@mail.com",
  username: "malfinnr",
};

const accessToken = signToken(generateLoad);
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJCZWF2Iiwicm9sZSI6IkFkbWluIiwiaWF0IjoxNzI5MDkzNDgyfQ.sKsCpy3B3Yr1zF3mRQJApE8W4rTFPSsCcRSc7V1hZ0Y";

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
    categoryId = insertCategories[0].id;
  } catch (error) {
    console.log(error, "*&*&^&**(");
  }
});

afterAll(async () => {
  try {
    await queryInterface.bulkDelete("Categories", null, {
      restartIdentity: true,
      truncate: true,
      cascade: true,
    });
  } catch (error) {
    console.log(error, "979udjashd");
  }
});

describe("Testing endpoint post /products", () => {
  it("berhasil membuat entitas utama", async () => {
    const data = {
      name: "Watches",
      image: "https://example.com/images/smart-watch.jpg",
      description: "Feature-packed smartwatch with fitness tracking.",
      fromName: "Cha",
      durationOfRelationship: "3 years",
      categoryId: 1,
      userId: 1,
    };
    const response = await request(app)
      .post("/products")
      .set("Authorization", `Bearer ${accessToken}`)
      .send(data);
    expect(response.status).toBe(201);
    expect(response.body.name).toBe(data.name);
  });
  it("Gagal menjalankan fitur karena belum login", async () => {
    const data = {
      name: "Watches",
      image: "https://example.com/images/smart-watch.jpg",
      description: "Feature-packed smartwatch with fitness tracking.",
      fromName: "Cha",
      durationOfRelationship: "3 years",
      categoryId: 1,
      userId: 1,
    };
    const response = await request(app).post("/products").send(data);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toContain("Invalid Token");
  });
  it("Gagal menjalankan fitur karena token yang diberikan tidak valid", async () => {
    const data = {
      name: "Watches",
      image: "https://example.com/images/smart-watch.jpg",
      description: "Feature-packed smartwatch with fitness tracking.",
      fromName: "Cha",
      durationOfRelationship: "3 years",
      categoryId: 1,
      userId: 1,
    };
    const response = await request(app)
      .post("/products")
      .set("Authorization", `Bearer invalid_token`)
      .send(data);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message", "Invalid Token");
  });
  it("Gagal ketika request body tidak sesuai (validation required)", async () => {
    const data = {
      name: "Watches",
      description: "Feature-packed smartwatch with fitness tracking.",
      fromName: "Cha",
      categoryId: 1,
      userId: 1,
    };
    const response = await request(app)
      .post("/products")
      .set("Authorization", `Bearer ${accessToken}`)
      .send(data);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });
});
