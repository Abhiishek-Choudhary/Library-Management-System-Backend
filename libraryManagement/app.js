import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

import { errorHandler } from "./middlwares/error.middleware.js";

import authRoutes from "./routes/auth.routes.js";
import bookRoutes from "./routes/book.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import issueRoutes from "./routes/issue.routes.js";

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const limiter = rateLimit({ windowMs: 60 * 1000, max: 100 });
app.use(limiter);

//routes
app.use("/auth", authRoutes);
app.use("/books", bookRoutes);
app.use("/cart", cartRoutes);
app.use("/issue", issueRoutes);

app.get("/", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

app.use(errorHandler);

export default app;

