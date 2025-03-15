import request from "supertest";
import app from "../src/app.js";

describe("Order API", () => {
  let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3Y2I2Y2U0YWYyNjczMWU2ZTVmZWQ1OCIsImVtYWlsIjoiam9obmRvZUBleGFtcGxlLmNvbSIsImlhdCI6MTc0MTM4NTE4NCwiZXhwIjoxNzQxOTg5OTg0fQ.rb36a15rZ4pFUfyZXP4MlIMjIEcrx6zE2s3WnwRe9HY"; // Replace with a valid token if needed
  let orderId;

  test("should create a new order", async () => {
    const response = await request(app)
      .post("/api/orders")
      .set("Authorization", `Bearer ${token}`)
      .send({ product: "Laptop", amount: 1200.50 });

    console.log("Create Order Response:", response.body);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("_id");
    orderId = response.body._id;
  });

  test("should cancel an order", async () => {
    const response = await request(app)
      .put(`/api/orders/${orderId}/cancel`)
      .set("Authorization", `Bearer ${token}`);

    console.log("Cancel Order Response:", response.body);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("status", "Cancelled");
  });

  test("should submit payment for an order", async () => {
    const response = await request(app)
      .post(`/api/orders/${orderId}/payment`)
      .set("Authorization", `Bearer ${token}`)
      .send({ paymentMethod: "Credit Card", amount: 1200.50 });

    console.log("Payment Response:", response.body);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Payment successful");
    expect(response.body.order).toHaveProperty("status", "Completed");
  });
});
