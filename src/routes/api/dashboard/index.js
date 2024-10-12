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
import {
  deleteUser,
  getAllUsers,
} from "../../../controllers/dashboard/users.controller.js";
import { protectedRoute } from "../../../middlewares/protectedRoute.middleware.js";
import {
  getOrders,
  updateOrder,
} from "../../../controllers/dashboard/orders.controller.js";
import { updateStoreInfoController } from "../../../controllers/dashboard/storeInfo.controller.js";

export const DashboardRouter = express.Router({
  mergeParams: true,
});
DashboardRouter.post("/register", register);
//Category
DashboardRouter.post("/categories", addNewBrand);
DashboardRouter.get("/categories", getAllBrands);
DashboardRouter.put("/categories/:category_id", updateBrand);
DashboardRouter.delete("/categories/:category_id", deleteBrand);
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

DashboardRouter.put("/site-info", updateStoreInfoController);
