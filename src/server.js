import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import itemRoutes from "./routes/items.js";
import dotenv from "dotenv";

dotenv.config();
await connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/items", itemRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`🚀 API rodando em http://localhost:${PORT}/api/items`)
);
