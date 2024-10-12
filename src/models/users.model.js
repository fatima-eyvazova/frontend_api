import mongoose from "mongoose";
import { ProductSchema } from "./product.model.js";

const UserSchema = mongoose.Schema(
  {
    _id: {
      required: true,
      type: String,
      unique: true,
    },
    name: {
      required: true,
      type: String,
    },
    surname: {
      required: true,
      type: String,
    },
    email: {
      unique: true,
      required: true,
      type: String,
    },
    password: {
      minLength: [8, "password must be at least 8 characters"],
      required: true,
      type: String,
    },
    role: {
      required: true,
      type: String,
    },
    organizationId: {
      unique: false,
      required: true,
      type: String,
    },
    basket: {
      type: String,
    },
    favorites: [ProductSchema],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
export const Users = mongoose.model("Users", UserSchema);
