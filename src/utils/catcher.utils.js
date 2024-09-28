import { Response } from "./response.utils.js";

export const catcher = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((error) => {
      console.log(error)
      res.status(400).json(new Response({ error: error.message }));
    });
  };
};