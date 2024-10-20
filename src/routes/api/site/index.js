import express from "express";
import { register } from "../../../controllers/site/auth.controller.js";
import {
  addRemoveFavorite,
  getAllProducts,
  getSingleProduct,
  giveFeedback,
} from "../../../controllers/site/products.controller.js";
import { getAllBrands } from "../../../controllers/site/brands.controller.js";
import {
  addNewProductToBasket,
  deleteBasket,
  getBasket,
} from "../../../controllers/site/basket.controller.js";
import { checkAuth } from "../../../middlewares/auth.middleware.js";
import { addNewOrder } from "../../../controllers/site/orders.controller.js";

export const SiteRouter = express.Router({
  mergeParams: true,
});

SiteRouter.post("/register", register);

SiteRouter.get("/products", getAllProducts);
SiteRouter.get("/products/:product_id", getSingleProduct);
SiteRouter.put("/products/favorites", checkAuth, addRemoveFavorite);
SiteRouter.post("/products/feedback", checkAuth, giveFeedback);
SiteRouter.get("/categories", getAllBrands);

SiteRouter.get("/basket", checkAuth, getBasket);
SiteRouter.post("/basket", checkAuth, addNewProductToBasket);
SiteRouter.delete("/basket/:basket_id", checkAuth, deleteBasket);

SiteRouter.post("/orders", checkAuth, addNewOrder);
