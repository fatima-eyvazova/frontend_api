import express from "express";
import { register } from "../../../controllers/dashboard/auth.controller.js";
import {
  addNewBrand,
  deleteBrand,
  getAllBrands,
  updateBrand,
} from "../../../controllers/dashboard/brands.controller.js";
import {
  addNewProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "../../../controllers/dashboard/products.controller.js";
import { deleteUser, getAllUsers } from "../../../controllers/dashboard/users.controller.js";
import { protectedRoute } from "../../../middlewares/protectedRoute.middleware.js";
import {
  getOrders,
  updateOrder,
} from "../../../controllers/dashboard/orders.controller.js";

export const DashboardRouter = express.Router({
  mergeParams: true,
});
DashboardRouter.post("/register", register);
//Brands
DashboardRouter.post("/brands", addNewBrand);
DashboardRouter.get("/brands", getAllBrands);
DashboardRouter.put("/brands/:brand_id", updateBrand);
DashboardRouter.delete("/brands/:brand_id", deleteBrand);
//Products
DashboardRouter.post("/products", addNewProduct);
DashboardRouter.get("/products", getAllProducts);
DashboardRouter.put("/products/:product_id", updateProduct);
DashboardRouter.delete("/products/:product_id", deleteProduct);
//Users
DashboardRouter.get("/users", protectedRoute(["superadmin"]), getAllUsers);
DashboardRouter.delete(
  "/users/:user_id",
  protectedRoute(["superadmin"]),
  deleteUser
);

DashboardRouter.get("/orders", getOrders);
DashboardRouter.put("/orders/:orderId", updateOrder);
