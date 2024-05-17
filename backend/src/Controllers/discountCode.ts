import { NextFunction, Response } from "express";
import { CustomRequest } from "../types";
import { asyncErrorHandler, customError, deleteFile } from "../Utils";
import DiscountCode from "../Models/discountCode";
import Product from "../Models/product";

export const addDiscountCode = asyncErrorHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    console.log("req.body", req.body);

    const isDiscountCodeExists = await DiscountCode.findOne({
      name: req.body.name,
    });

    if (isDiscountCodeExists) {
      const error = new customError(
        req.t("Coupon_already_exists", { ns: "error" }),
        400
      );
      return next(error);
    }
    const product = await Product.findById(req.body.ProductID);

    const discountCode = await DiscountCode.create({
      ...req.body,
      ProductName: product.name,
      vendor: req.vendor._id.toString(),
    });
    res.status(200).json({
      success: true,
      discountCode,
      message: req.t("discountCode_added_successfully", { ns: "success" }),
    });
  }
);
export const getVendorDiscountCodes = asyncErrorHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const discountCodes = await DiscountCode.find({
      vendor: req.vendor._id.toString(),
    });
    const localizedDiscountCodes =
      DiscountCode.schema.methods.toJSONLocalizedOnly(
        discountCodes,
        req.language
      );
    res.status(200).json({
      success: true,
      discountCodes: localizedDiscountCodes,
    });
  }
);
export const deleteVendorDiscountCode = asyncErrorHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const discountCode = await DiscountCode.findById(req.body.discountCodeId);

    //console.log(deletedDiscountCode.vendor.toString(), req.vendor._id.toString());

    if (!discountCode) {
      return next(
        new customError(req.t("discountCode_not_found", { ns: "error" }), 404)
      );
    } else if (discountCode.vendor.toString() !== req.vendor._id.toString()) {
      return next(
        new customError(req.t("action_not_allowed", { ns: "error" }), 401)
      );
    }
    const deletedDiscountCode = await DiscountCode.findByIdAndDelete(
      req.body.discountCodeId
    );

    if (!deletedDiscountCode) {
      return next(
        new customError(
          req.t("delete_discountCode_failed", { ns: "error" }),
          500
        )
      );
    }

    res.status(200).json({
      success: true,
      message: req.t("discountCode_deleted_successfully", { ns: "success" }),
    });
  }
);
