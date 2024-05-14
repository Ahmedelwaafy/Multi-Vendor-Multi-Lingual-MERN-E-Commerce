import { NextFunction, Response } from "express";
import { asyncErrorHandler, customError } from "../Utils";
import { CustomRequest } from "../types";
import Vendor from "../Models/vendor";
import Slider from "../Models/slider";
import Product from "../Models/product";
import Event from "../Models/event";
import Category from "../Models/category";
import Subscriber from "../Models/subscriber";

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
    const vendors = await Vendor.find().select("name avatar").limit(6);
    const localizedVendors = Vendor.schema.methods.toJSONLocalizedOnly(
      vendors,
      req.language
    );
    res.status(200).json({
      success: true,
      data: { categories: localizedCategories, brands: localizedVendors },
      title: req.t("footer.topBanner.title", { ns: "static" }),
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
    const currentYear = new Date().getFullYear();

    res.status(200).json({
      success: true,
      data: {
        categories: localizedCategories,
        topBanner: {
          title: req.t("footer.topBanner.title", { ns: "static" }),
          subTitle: req.t("footer.topBanner.subTitle", { ns: "static" }),
        },
        about: req.t("footer.about", { ns: "static" }),
        copyright: req.t("footer.copyright", {
          ns: "static",
          year: currentYear,
          website_name: "Sacramento",
        }),
      },
    });
  }
);

//! ----- footer controller -----

export const subscribeToNewsletter = asyncErrorHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const subscriberExists = await Subscriber.findOne({
      email: req.body.email,
    });

    if (subscriberExists) {
      const error = new customError(req.t("subscriber_already_exists"), 400);
      return next(error);
    }

    const subscriber = await Subscriber.create({ ...req.body });

    res.status(200).json({
      success: true,
      message: req.t("added_to_newsletter", { ns: "success" }),
    });
  }
);
