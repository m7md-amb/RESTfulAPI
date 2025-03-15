import express from "express";
import { cancelOrder, createOrder, submitPayment } from "../controllers/order.controller.js";
import { authMiddleware } from "../middlewares/accessControl.middleware.js";

const router = express.Router();
router.use(authMiddleware);

router.post("/", createOrder);
router.put("/:id/cancel", cancelOrder);
router.post("/:id/payment", submitPayment);

export default router;

/**
 * @swagger
 * tags:
 *   - name: Orders
 *     description: Order management endpoints
 *
 * security:
 *   - bearerAuth: []
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product: { type: string, example: "Laptop" }
 *               amount: { type: number, example: 1200.50 }
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id: { type: string, example: "60b6c0f7f9e7b00015a7c3b2" }
 *                 customerId: { type: string, example: "authenticated-user-id" }
 *                 product: { type: string, example: "Laptop" }
 *                 amount: { type: number, example: 1200.50 }
 *                 status: { type: string, example: "Pending" }
 *       400: { description: Bad request }
 */

/**
 * @swagger
 * /api/orders/{id}/cancel:
 *   put:
 *     summary: Cancel an order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *         example: "60b6c0f7f9e7b00015a7c3b2"
 *     responses:
 *       200:
 *         description: Order canceled successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id: { type: string, example: "60b6c0f7f9e7b00015a7c3b2" }
 *                 status: { type: string, example: "Cancelled" }
 *       404: { description: Order not found or unauthorized }
 */

/**
 * @swagger
 * /api/orders/{id}/payment:
 *   post:
 *     summary: Submit payment for an order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *         example: "60b6c0f7f9e7b00015a7c3b2"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               paymentMethod: { type: string, example: "Credit Card" }
 *               amount: { type: number, example: 1200.50 }
 *     responses:
 *       200:
 *         description: Payment successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string, example: "Payment successful" }
 *                 order:
 *                   type: object
 *                   properties:
 *                     _id: { type: string, example: "60b6c0f7f9e7b00015a7c3b2" }
 *                     status: { type: string, example: "Completed" }
 *       400: { description: Invalid payment details }
 *       404: { description: Order not found or unauthorized }
 */
