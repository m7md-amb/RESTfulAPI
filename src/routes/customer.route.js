import express from "express";
import { registerCustomer, loginCustomer } from "../controllers/customer.controller.js";

const router = express.Router();

router.post("/register", registerCustomer);
router.post("/login", loginCustomer);

export default router;
/**
 * @swagger
 * tags:
 *   - name: Customers
 *     description: Customer authentication endpoints
 */

/**
 * @swagger
 * /api/customers/register:
 *   post:
 *     summary: Register a new customer
 *     tags: [Customers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string, example: John Doe }
 *               email: { type: string, format: email, example: johndoe@example.com }
 *               password: { type: string, format: password, example: securepassword123 }
 *     responses:
 *       201: { description: Customer registered successfully }
 *       400: { description: Bad request (e.g., customer already exists) }
 */

/**
 * @swagger
 * /api/customers/login:
 *   post:
 *     summary: Login a customer
 *     tags: [Customers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email: { type: string, format: email, example: johndoe@example.com }
 *               password: { type: string, format: password, example: securepassword123 }
 *     responses:
 *       200: { description: Login successful }
 *       400: { description: Invalid credentials }
 */

