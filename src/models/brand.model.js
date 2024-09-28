import mongoose from "mongoose";

const BrandSchema = mongoose.Schema(
  {
    _id: {
      required: true,
      type: String,
    },

    name: {
      required: true,
      type: String,
    },

    image: {
      url: { type: String },
      public_id: { type: String },
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
export const Brands = mongoose.model("Brands", BrandSchema);
