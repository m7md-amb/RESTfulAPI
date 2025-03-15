import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.config.js";

import routes from "./routes/index.js"
import { swaggerServe, swaggerSetup } from "../swagger.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", routes);
app.use('/api-doc', swaggerServe, swaggerSetup);

export default app;
