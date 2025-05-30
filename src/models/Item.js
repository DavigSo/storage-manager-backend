import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    gender: {
      type: String,
      enum: ["MASCULINO", "FEMININO", "UNISEX"],
      default: "UNISEX",
    },
    quantity: { type: Number, default: 0 },
    minimumStock: { type: Number, default: 0 },
    expirationDate: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("Item", ItemSchema);
