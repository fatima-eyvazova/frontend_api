import { catcher } from "../utils/catcher.utils.js";

export const protectedRoute = (roles) => {
  return catcher(async (req, res, next) => {
    const { role } = req.user;
    if (!roles || roles.includes(role)) {
      next();
    } else {
      res.status(403).json(
        new Response({
          error: "Access denied",
        })
      );
    }
  });
};
