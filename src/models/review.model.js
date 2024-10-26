import mongoose from "mongoose";

export const ReviewSchema = mongoose.Schema(
  {
    _id: {
      required: true,
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    productId: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
export const ProductReviews = mongoose.model("Review", ReviewSchema);
