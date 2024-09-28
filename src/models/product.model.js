import mongoose from "mongoose";

const ProductSchema = mongoose.Schema(
  {
    _id: {
      required: true,
      type: String,
    },

    organizationId: {
      unique: false,
      required: true,
      type: String,
    },

    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    productPrice: {
      type: Number,
      required: true,
    },
    salePrice: {
      type: Number,
      required: false,
    },
    brandId: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    isPublish: {
      type: Boolean,
      default: false,
    },
    isDeal: {
      type: Boolean,
      default: false,
    },
    images: {
      type: [{}],
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
export const Products = mongoose.model("Products", ProductSchema);
