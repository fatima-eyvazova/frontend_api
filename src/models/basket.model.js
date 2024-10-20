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
    products: {
      type: [
        {
          productId: {
            required: true,
            type: String,
          },
          productCount: {
            required: true,
            type: Number,
          },
        },
      ],
      required: true,
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
