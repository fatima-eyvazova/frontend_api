import mongoose from "mongoose";

const OrderSchema = mongoose.Schema(
  {
    _id: {
      required: true,
      type: String,
    },
    customer: {
      required: true,
      type: {
        userId: { required: true, type: String },
        name: { required: true, type: String },
      },
    },
    status: {
      required: true,
      type: String,
    },
    products: {
      required: true,
      type: [
        {
          productId: { required: true, type: String },
          productCount: { required: true, type: String },
        },
      ],
    },

    method: {
      required: true,
      type: String,
      default: "card",
    },
    organizationId: {
      unique: false,
      required: true,
      type: String,
    },
    total: {
      required: true,
      type: Number,
    },
    completed: {
      type: Date,
      default: null,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
export const Orders = mongoose.model("Orders", OrderSchema);
