import { CustomRequest, UserType } from "../types";
import signToken from "./signToken";
import { Response } from "express";

const sendCookieTokenResponse = (
  user: UserType,
  statusCode: number,
  res: Response,
  req: CustomRequest,
  message: string
) => {
  const token = signToken({ id: user._id });
  const options = {
    expires: new Date(
      Date.now() +
        Number(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false,
  };

  user.password = undefined;
  res.status(statusCode).cookie("jwt", token, options).json({
    message,
    data: { user },
  });
};
export default sendCookieTokenResponse;
