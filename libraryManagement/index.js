import dotenv from "dotenv";
import serverless from "serverless-http";
import app from "../app.js";
import { connectDB } from "../config/db.js";

dotenv.config();

let isConnected = false;

const appHandler = async (req, res) => {
  if (!isConnected) {
    try {
      await connectDB(process.env.MONGO_URI);
      isConnected = true;
      console.log("MongoDB connected");
    } catch (err) {
      console.error("MongoDB connection failed:", err);
      return res.status(500).json({ error: "Database connection failed" });
    }
  }
  return app(req, res);
};

export const handler = serverless(appHandler);

