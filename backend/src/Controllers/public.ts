import { NextFunction, Response } from "express";
import { asyncErrorHandler, customError } from "../Utils";
import { CustomRequest } from "../types";
import Vendor from "../Models/vendor";
import Slider from "../Models/slider";
import Product from "../Models/product";
import Event from "../Models/event";
import Category from "../Models/category";
import { PipelineStage } from "mongoose";

//! ----- homePage controller -----

export const getHomePage = asyncErrorHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const sliders = await Slider.find();
    const localizedSliders = Slider.schema.methods.toJSONLocalizedOnly(
      sliders,
      req.language
    );
    const bestDeals = await Product.find({
      ratings: { $gt: 3 },
    }).limit(7);

    const localizedBestDeals = Product.schema.methods.toJSONLocalizedOnly(
      bestDeals,
      req.language
    );
    const newArrivals = await Product.find().sort({ createdAt: -1 }).limit(5);
    const localizedNewArrivals = Product.schema.methods.toJSONLocalizedOnly(
      newArrivals,
      req.language
    );
    const featuredProducts = await Product.find()
      .sort({ sold_out: -1 })
      .limit(9);
    const localizedFeaturedProducts =
      Product.schema.methods.toJSONLocalizedOnly(
        featuredProducts,
        req.language
      );

    const event = await Event.find().sort({ createdAt: -1 }).limit(1);
    const localizedEvent = Event.schema.methods.toJSONLocalizedOnly(
      event,
      req.language
    );
    res.status(200).json({
      success: true,
      data: {
        sliders: localizedSliders,
        bestDeals: localizedBestDeals,
        newArrivals: localizedNewArrivals,
        event: localizedEvent?.[0],
        featuredProducts: localizedFeaturedProducts,
      },
    });
  }
);
//! ----- bestSelling controller -----

export const getBestSelling = asyncErrorHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const bestSelling = await Product.find().sort({ sold_out: -1 });

    const localizedBestSelling = Product.schema.methods.toJSONLocalizedOnly(
      bestSelling,
      req.language
    );
    res.status(200).json({
      success: true,
      data: {
        data: localizedBestSelling,
      },
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
//! ----- Navbar controller -----

export const getNavbar = asyncErrorHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const categories = await Category.find();
    const localizedCategories = Category.schema.methods.toJSONLocalizedOnly(
      categories,
      req.language
    );
    res.status(200).json({
      success: true,
      data: { categories: localizedCategories },
    });
  }
);
//! ----- footer controller -----

export const getFooter = asyncErrorHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const categories = await Category.find();
    const localizedCategories = Category.schema.methods.toJSONLocalizedOnly(
      categories,
      req.language
    );
    res.status(200).json({
      success: true,
      data: { categories: localizedCategories },
    });
  }
);
