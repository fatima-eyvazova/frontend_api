import jwt from "jsonwebtoken";
export const createToken = (_id) => {
  const token = jwt.sign({ _id }, process.env.JWT_TOKEN_KEY, {
    expiresIn: "1d",
  });
  return token;
};
export const verifyToken = (token) => {
  let data = jwt.verify(
    token,
    process.env.JWT_TOKEN_KEY,
    async (err, decodedToken) => {
      if (err) {
        return false;
      } else {
        return decodedToken;
      }
    }
  );

  return Promise.all([data]).then((values) => {
    return values[0]; 
  });
};
