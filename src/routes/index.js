import express from "express";
import { adminLogin, adminRegister } from "../controllers/auth.controller.js";
import { ApiRouter } from "./api/index.js";
import { keyChecker } from "../middlewares/keyChecker.middleware.js";

export const MainRouter = express.Router({
  mergeParams: true,
});

MainRouter.get("/", (req, res, next) => {
  res.render("index");
});

MainRouter.get("/register", (req, res, next) => {
  res.render("register");
});
MainRouter.post("/auth/register", adminRegister);

MainRouter.post("/auth/login", adminLogin);
MainRouter.get("/login", (req, res, next) => {
  res.render("login");
});

MainRouter.use("/api/:organizationKey", keyChecker, ApiRouter);
