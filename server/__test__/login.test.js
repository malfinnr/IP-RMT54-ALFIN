const { describe, test, it, expect } = require("@jest/globals");
const app = require("../app");
const request = require("supertest");

describe("Testing endpoint post /login", () => {
  it("Berhasil login dan mengirimkan accessToken", async () => {
    const response = await request(app)
      .post("/login")
      .send({
        email: "alfin@mail.com",
        password: "123456",
      })
      .expect(200);
    expect(response.body).toHaveProperty("accessToken");
    expect(typeof response.body.accessToken).toBe("string");
    // console.log(response.body.accessToken);
  });
  it("Email tidak diberikan / tidak diinput", async () => {
    const response = await request(app)
      .post("/login")
      .send({
        email: "",
        password: "123456",
      })
      .expect({
        message: "Email is Required",
      })
      .expect(400);
  });
  it("Password tidak diberikan / tidak diinput", async () => {
    const response = await request(app)
      .post("/login")
      .send({
        email: "alfin@mail.com",
        password: "",
      })
      .expect({
        message: "Password is Required",
      })
      .expect(400);
  });
  it("Email diberikan invalid / tidak terdaftar", async () => {
    const response = await request(app)
      .post("/login")
      .send({
        email: "inisusahtau@mail.com",
        password: "123456",
      })
      .expect({
        message: "Invalid Email or Password",
      })
      .expect(400);
  });
  it("Password diberikan salah / tidak match", async () => {
    const response = await request(app)
      .post("/login")
      .send({
        email: "alfin@mail.com",
        password: "elcheshushah",
      })
      .expect({
        message: "Invalid Email or Password",
      })
      .expect(401);
  });
});
