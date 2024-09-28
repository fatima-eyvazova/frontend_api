import mongoose from "mongoose";

const BasketSchema = mongoose.Schema(
  {
    _id: {
      required: true,
      type: String,
    },
    userId: {
      required: true,
      type: String,
    },
    productId: {
      required: true,
      type: String,
    },
    productCount: {
      required: true,
      type: Number,
    },
    organizationId: {
      unique: false,
      required: true,
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
export const Baskets = mongoose.model("Baskets", BasketSchema);
