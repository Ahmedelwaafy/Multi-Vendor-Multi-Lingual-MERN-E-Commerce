import { NextFunction, Response } from "express";
import { CustomRequest } from "../types";
import { asyncErrorHandler, customError } from "../Utils";
import Vendor from "../Models/vendor";

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
        //sameSite requires enabling secure option
        //sameSite: "none",
        secure: process.env.NODE_ENV === "production" ? true : false,
      })
      .json({
        success: true,
        message: "Logged out successful!",
      });
  }
);

export const getVendorPublicData = asyncErrorHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const vendor_id = req.params.vendor_id;
    console.log("vendor_id", vendor_id);

    const vendor = await Vendor.findById(vendor_id).select(
      "name email phone description address avatar views rating totalProducts createdAt"
    );
    if (!vendor || !vendor_id) {
      const error = new customError(req.t("wrong_vendor_id"), 404);
      return next(error);
    }
    const localizedVendor = Vendor.schema.methods.toJSONLocalizedOnly(
      vendor,
      req.language
    );

    res.status(200).json({
      success: true,
      vendor: localizedVendor,
    });
  }
);
export const increaseVendorViews = asyncErrorHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { vendor_id } = req.body;
    console.log("vendor_id", vendor_id);

    const vendor = await Vendor.findByIdAndUpdate(vendor_id, {
      $inc: { views: 1 },
    });

    if (!vendor || !vendor_id) {
      const error = new customError(req.t("wrong_vendor_id"), 404);
      return next(error);
    }
    res.status(200).json({
      success: true,
      vendor,
    });
  }
);
