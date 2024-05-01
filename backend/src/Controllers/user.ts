import { NextFunction, Response } from "express";
import { CustomRequest } from "../types";
import { asyncErrorHandler } from "../Utils";

export const getUserData = asyncErrorHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  }
);
export const logOut = asyncErrorHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    res
      .status(201)
      .cookie("jwt", null, {
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
