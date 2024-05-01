import jwt from "jsonwebtoken";

const signToken = (data: any, expiry?: number|string) =>
  jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: expiry || process.env.JWT_EXPIRES_IN,
  });
export default signToken;
