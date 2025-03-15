import request from "supertest";
import app from "../src/app.js";

describe("Customer Authentication API", () => {
  let token;
  let customerEmail = "johndoe1@example.com";
  let customerPassword = "securepassword123";

  test("should register a new customer", async () => {
    const response = await request(app)
      .post("/api/customers/register")
      .send({
        name: "Test Customer",
        email: customerEmail,
        password: customerPassword,
      });

    console.log("Register Response:", response.body); 

    expect([201, 400]).toContain(response.status);
    if (response.status === 201) {
      expect(response.body).toHaveProperty("message", "Customer registered successfully");
    } else if (response.status === 400) {
      expect(response.body).toHaveProperty("message", "Customer already exists");
    }
  });

  test("should login the customer", async () => {
    const response = await request(app)
      .post("/api/customers/login")
      .send({
        email: customerEmail,
        password: customerPassword,
      });

    console.log("Login Response:", response.body); // Debugging

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
    token = response.body.token;
  });

  test("should fail login with incorrect password", async () => {
    const response = await request(app)
      .post("/api/customers/login")
      .send({
        email: customerEmail,
        password: "WrongPassword123",
      });

    console.log("Invalid Login Response:", response.body); // Debugging

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Invalid email or password"); // ✅ Fixed expected message
  });
});
