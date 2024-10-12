import express from "express";
import { SiteRouter } from "./site/index.js";
import { Login, profile } from "../../controllers/auth.controller.js";
import { DashboardRouter } from "./dashboard/index.js";
import { checkAuth } from "../../middlewares/auth.middleware.js";

export const ApiRouter = express.Router({
  mergeParams: true,
});

ApiRouter.use("/site", SiteRouter);
ApiRouter.use("/dashboard", checkAuth, DashboardRouter);
ApiRouter.post("/login", Login);
ApiRouter.get("/profile", checkAuth, profile);
