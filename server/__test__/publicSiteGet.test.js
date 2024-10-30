const { describe, test, it, expect } = require("@jest/globals");
const app = require("../app");
const request = require("supertest");
const { sequelize } = require("../models");
const { signToken } = require("../helpers/jwt");
const { queryInterface } = sequelize;

let categoryId;

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
        {
          name: "Glass",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Power Bank",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {
        returning: true,
      }
    );
    // console.log(insertCategories, "ini Insert Categories");
    const categoryIdList = insertCategories.map((value) => {
      return value.id;
    });
    categoryId = categoryIdList[0];

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
        {
          name: "Desk Lamp",
          image: "https://example.com/images/desk-lamp.jpg",
          description: "Adjustable LED desk lamp for better focus.",
          fromName: "Sophie",
          durationOfRelationship: "8 months",
          categoryId: categoryIdList[2],
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Dog Toy Set",
          image: "https://example.com/images/dog-toy-set.jpg",
          description: "Set of chewable toys for dogs.",
          fromName: "Sophie",
          durationOfRelationship: "8 months",
          categoryId: categoryIdList[1],
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Gardening Tools",
          image: "https://example.com/images/gardening-tools.jpg",
          description: "Complete set of gardening tools for plant care.",
          fromName: "Sophie",
          durationOfRelationship: "8 months",
          categoryId: categoryIdList[2],
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Office Organizer",
          image: "https://example.com/images/office-organizer.jpg",
          description: "Stylish organizer for a clutter-free workspace.",
          fromName: "Sophie",
          durationOfRelationship: "8 months",
          categoryId: categoryIdList[0],
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Microwave Oven",
          image: "https://example.com/images/microwave-oven.jpg",
          description: "High-efficiency microwave oven with preset options.",
          fromName: "Anna",
          durationOfRelationship: "4 months",
          categoryId: categoryIdList[2],
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Face Serum",
          image: "https://example.com/images/face-serum.jpg",
          description: "Hydrating face serum for glowing skin.",
          fromName: "Anna",
          durationOfRelationship: "4 months",
          categoryId: categoryIdList[0],
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Dumbbell Set",
          image: "https://example.com/images/dumbbell-set.jpg",
          description: "Adjustable dumbbell set for home workouts.",
          fromName: "Sissy",
          durationOfRelationship: "2 years",
          categoryId: categoryIdList[1],
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Board Game",
          image: "https://example.com/images/board-game.jpg",
          description: "Fun board game for family and friends..",
          fromName: "Sissy",
          durationOfRelationship: "2 years",
          categoryId: categoryIdList[0],
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Car Phone Holder",
          image: "https://example.com/images/car-phone-holder.jpg",
          description: "Hands-free phone holder for car use.",
          fromName: "Sissy",
          durationOfRelationship: "2 years",
          categoryId: categoryIdList[1],
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Massage Roller",
          image: "https://example.com/images/massage-roller.jpg",
          description: "Relaxing massage roller for muscle relief.",
          fromName: "Sissy",
          durationOfRelationship: "2 years",
          categoryId: categoryIdList[2],
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

describe("Testing Main endpoint get /pub/products", () => {
  it("Berhasil mendapatkan entitas utama tanpa menggunakan query filter parameter", async () => {
    const response = await request(app).get("/pub/products");

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(11);
  });
  it("Berhasil mendapatkan entitas utama dengan 1 query filter parameter", async () => {
    const response = await request(app).get(
      `/pub/products?filter[categories]=${categoryId}`
    );

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(4);
  });
  it("Berhasil mendapatkan entitas utama jumlah data yang sesuai ketika memberikan page tertentu", async () => {
    const responsePage1 = await request(app).get("/pub/products?page=1");
    const responsePage2 = await request(app).get("/pub/products?page=2");

    expect(responsePage1.status).toBe(200);
    expect(responsePage1.body.length).toBe(11);

    expect(responsePage2.status).toBe(200);
    expect(responsePage2.body.length).toBe(0);
  });
});
