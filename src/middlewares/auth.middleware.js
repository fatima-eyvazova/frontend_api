import { Users } from "../models/users.model.js";
import { Response } from "../utils/response.utils.js";
import { catcher } from "../utils/catcher.utils.js";
import { verifyToken } from "../utils/JWT.js";

export const checkAuth = catcher(async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  if (authorizationHeader) {
    const token = authorizationHeader.split(" ")[1];
    const { _id } = await verifyToken(token);
    if (!_id) {
      // res.status(401).json(
      //   new Response({
      //     error: "Incorrect token",
      //   })
      // );
      throw new Error("Incorrect token");
    }
    const user = await Users.findOne({ _id });
    if (!user) {
      // res.status(498).json(
      //   new Response({
      //     error: "We coudnt find user with this token",
      //   })
      // );
      throw new Error("We coudnt find user with this token");
    } else {
      req.user = user;

      next();
    }
  } else {
    throw new Error("Authorization header is required");
  }
});
