import { NextFunction, Response } from "express";
import { asyncErrorHandler, customError } from "../Utils";
import { CustomRequest } from "../types";
import Vendor from "../Models/vendor";
import Slider from "../Models/slider";
import Product from "../Models/product";
import Category from "../Models/category";

//! ----- homePage controller -----

export const getHomePage = asyncErrorHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const sliders = await Slider.find();
    const localizedSliders = Slider.schema.methods.toJSONLocalizedOnly(
      sliders,
      req.language
    );
    const products = await Product.find();
    const localizedProducts = Product.schema.methods.toJSONLocalizedOnly(
      products,
      req.language
    );
    res.status(200).json({
      success: true,
      sliders: localizedSliders,
      bestDeals: localizedProducts,
      newArrivals: localizedProducts,
      event: localizedProducts,
      featuredProducts: localizedProducts,
    });
  }
);
//! ----- Category controller -----

export const getCategories = asyncErrorHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const categories = await Category.find();
    const localizedCategories = Category.schema.methods.toJSONLocalizedOnly(
      categories,
      req.language
    );
    res.status(200).json({
      success: true,
      categories: localizedCategories,
    });
  }
);
