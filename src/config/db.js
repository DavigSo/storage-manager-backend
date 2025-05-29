import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✔ MongoDB conectado");
  } catch (err) {
    console.error("✖ Erro conectando ao MongoDB:", err);
    process.exit(1);
  }
}
