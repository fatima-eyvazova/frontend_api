import mongoose from "mongoose";

const StoreSchema = mongoose.Schema(
  {
    _id: {
      required: true,
      type: String,
      unique: true,
    },
    name: {
      required: true,
      type: String,
      default: "Fayzelia 🛍️",
    },
    // logo: {
    //   required: true,
    //   type: String,
    // },
    shippingOptions: {
      required: false,
      type: [String],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
export const StoreInfo = mongoose.model("StoreInfo", StoreSchema);
