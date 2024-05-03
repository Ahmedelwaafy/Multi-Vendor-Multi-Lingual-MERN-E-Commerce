import { NextFunction, Response } from "express";
import { asyncErrorHandler, customError } from "../Utils";
import { CustomRequest } from "../types";
import Vendor from "../Models/vendor";

export const getVendorPublicData = asyncErrorHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const vendor_id = req.params.vendor_id;
    console.log("vendor_id", vendor_id);

    const vendor = await Vendor.findById(vendor_id).select(
      "name email phone description address avatar views createdAt"
    );
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
