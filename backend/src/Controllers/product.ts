import { NextFunction, Response } from "express";
import { CustomRequest } from "../types";
import { asyncErrorHandler, customError } from "../Utils";
import Product from "../Models/product";

export const addProduct = asyncErrorHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const imageFiles = req?.files as Express.Multer.File[];
    const images = imageFiles?.map((file) => {
      return {
        public_id: "public_id",
        url: `https://sacramento.onrender.com/${file.filename}`,
      };
    });

    const product = await Product.create({
      ...req.body,
      images,
      vendorID: req.vendor._id.toString(),
    });
    res.status(200).json({
      success: true,
      product,
      message: req.t("product_added_successfully", { ns: "success" }),
    });
  }
);
export const getVendorProducts = asyncErrorHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const products = await Product.find({
      vendorID: req.vendor._id.toString(),
    });
    const localizedProducts = Product.schema.methods.toJSONLocalizedOnly(
      products,
      req.language
    );
    res.status(200).json({
      success: true,
      products: localizedProducts,
    });
  }
);
