import { NextFunction, Response } from "express";
import { CustomRequest } from "../types";
import { asyncErrorHandler } from "../Utils";
import path from "path";
import Slider from "../Models/slider";
import Category from "../Models/category";

//! ----- slider controllers -----

export const addSlider = asyncErrorHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    console.log("User body", req.body);

    const fileName = req.file.filename;
    const fileUrl = path.join(fileName);

    const slider = await Slider.create({
      ...req.body,
      img: {
        public_id: "public_id",
        url: `https://sacramento.onrender.com/${fileUrl}`,
      },
    });
    res.status(200).json({
      success: true,
      slider,
      message: req.t("slider_added_successfully", { ns: "success" }),
    });
  }
);
export const getSliders = asyncErrorHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const sliders = await Slider.find();
    const localizedSliders = Slider.schema.methods.toJSONLocalizedOnly(
      sliders,
      req.language
    );
    res.status(200).json({
      success: true,
      sliders: localizedSliders,
    });
  }
);

//! ----- category controller -----

export const addCategory = asyncErrorHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    console.log("User body", req.body);

    const fileName = req.file.filename;
    const fileUrl = path.join(fileName);

    const category = await Category.create({
      ...req.body,
      img: {
        public_id: "public_id",
        url: `https://sacramento.onrender.com/${fileUrl}`,
      },
    });
    res.status(200).json({
      success: true,
      category,
      message: req.t("category_added_successfully", { ns: "success" }),
    });
  }
);

