import express from 'express';

import customer from "./customer.route.js";
import order from "./order.route.js";
import product from "./product.route.js";

const router = express.Router();

const defaultRoutes = [
    { path: "/customers", route: customer },
    { path: "/orders", route: order },
    { path: "/products", route: product },
];

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *       description: Enter your JWT token here
 */

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;
