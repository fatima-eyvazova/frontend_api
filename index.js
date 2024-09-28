import serverless from "serverless-http";
import { appCofig } from "./src/config/app.config.js";
import { MainRouter } from "./src/routes/index.js";

const app = appCofig(import.meta.url);

app.use("/", MainRouter);
app.get("/test", (req, res, next) => {
  console.log(req);
  res.send("sala");
});

export const handler = serverless(app);
