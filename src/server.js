import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import itemsRouter from "./routes/items.js";

dotenv.config();
await connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Health‐check rápido:
app.get("/health", (_req, res) => {
  console.log("💓 /health OK");
  res.json({ status: "up" });
});

// Monta o roteador
app.use("/api/items", itemsRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`🚀 API rodando em http://localhost:${PORT}/api/items`)
);
