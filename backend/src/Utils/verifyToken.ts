import jwt from "jsonwebtoken";

const verifyToken = (token: string) =>
  jwt.verify(token, process.env.JWT_SECRET);

export default verifyToken;
