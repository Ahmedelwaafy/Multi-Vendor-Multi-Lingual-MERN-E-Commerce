import { NextFunction, Response } from "express";
import { CustomRequest } from "../types";
import { asyncErrorHandler } from "../Utils";

export const getVendorData = asyncErrorHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    res.status(200).json({
      success: true,
      vendor: req.vendor,
    });
  }
);
export const logOutVendor = asyncErrorHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    res
      .status(201)
      .cookie("jwt_vendor", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        sameSite: "none",
        secure: process.env.NODE_ENV === "production" ? true : false,
      })
      .json({
        success: true,
        message: "Logged out successful!",
      });
  }
);
