import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import cors from "cors";
import { db } from "./db.config.js";
import { cloudinaryConfig } from "./cloudinary.config.js";

export const appCofig = (fileName) => {
  dotenv.config();
     cloudinaryConfig();
  const port = process.env.PORT || 3000;
  const expressApp = express();
  const __filename = fileURLToPath(fileName);
  const __dirname = path.dirname(__filename);
  expressApp.set("view engine", "hbs");
  expressApp.set("views", path.join(__dirname + "/src", "views"));
  expressApp.use(express.static(__dirname + "/src/public"));
  expressApp.use(express.urlencoded({ extended: true }));
  expressApp.use(express.json({ limit: "10mb" }));
  expressApp.use(cors());
  expressApp.listen(port, () => {
    console.log(`app is running in http://localhost:${port} port`);
    db();
  });
  return expressApp;
};