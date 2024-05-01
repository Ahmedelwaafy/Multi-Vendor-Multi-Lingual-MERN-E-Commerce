import { CustomRequest, VendorType } from "../types";
import signToken from "./signToken";
import { Response } from "express";

const sendCookieTokenResponse = (
  vendor: VendorType,
  statusCode: number,
  res: Response,
  req: CustomRequest,
) => {
  const token = signToken({ id: vendor._id });
  const options = {
    expires: new Date(
      Date.now() +
        Number(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false,
  };

  vendor.password = undefined;
  res
    .status(statusCode)
    .cookie("jwt_vendor", token, options)
    .json({
      message: req.t("success", { ns: "test1" }),
      data: { vendor },
    });
};
export default sendCookieTokenResponse;
