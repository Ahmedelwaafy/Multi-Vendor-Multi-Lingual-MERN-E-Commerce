import { NextFunction, Response } from "express";
import { CustomRequest } from "../types";
import { asyncErrorHandler, customError, deleteFile } from "../Utils";
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

export const deleteVendorProduct = asyncErrorHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const product = await Product.findById(req.body.productId);

    //console.log(deletedProduct.vendorID.toString(), req.vendor._id.toString());

    if (!product) {
      return next(
        new customError(req.t("product_not_found", { ns: "error" }), 404)
      );
    } else if (product.vendorID.toString() !== req.vendor._id.toString()) {
      return next(
        new customError(req.t("action_not_allowed", { ns: "error" }), 401)
      );
    }
    const deletedProduct = await Product.findByIdAndDelete(req.body.productId);

    deletedProduct.images.forEach((image) => {
      deleteFile(`uploads/${image.url}`);
    });
    //console.log("deletedProduct", deletedProduct);

    if (!deletedProduct) {
      return next(
        new customError(req.t("delete_product_failed", { ns: "error" }), 500)
      );
    }

    res.status(200).json({
      success: true,
      message: req.t("product_deleted_successfully", { ns: "success" }),
    });
  }
);

export const getAllProducts = asyncErrorHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const products = await Product.find();
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
export const getProductDetails = asyncErrorHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const product = await Product.findById(req.params.productID);
    const localizedProduct = Product.schema.methods.toJSONLocalizedOnly(
      product,
      req.language
    );
    res.status(200).json({
      success: true,
      product: localizedProduct,
    });
  }
);

export const increaseProductViews = asyncErrorHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { productID } = req.body;
    console.log("productID", productID);

    const product = await Product.findByIdAndUpdate(productID, {
      $inc: { views: 1 },
    });

    if (!product || !productID) {
      const error = new customError(
        req.t("wrong_product_id", { ns: "error" }),
        404
      );
      return next(error);
    }
    res.status(200).json({
      success: true,
      product,
    });
  }
);
