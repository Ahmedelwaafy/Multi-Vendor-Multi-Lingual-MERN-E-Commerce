import { Response, NextFunction } from "express";
import { CustomRequest } from "../types";
import { asyncErrorHandler, customError } from "../Utils";
import jwt, { JwtPayload } from "jsonwebtoken";
import Vendor from "../Models/vendor";

export default asyncErrorHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const token = req.cookies["jwt_vendor"];
    console.log("token", token);

    if (!token) {
      const error = new customError("You are not logged in", 401);
      return next(error);
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const currentVendor = await Vendor.findById((decoded as JwtPayload).id);
    if (!currentVendor) {
      const error = new customError("The vendor no longer exists", 401);
      return next(error);
    }
    const isPasswordChanged = await currentVendor.changedPasswordAfterLogin(
      (decoded as JwtPayload).iat
    );
    if (isPasswordChanged) {
      const error = new customError("Vendor recently changed password", 401);
      return next(error);
    }
    const localizedVendor = Vendor.schema.methods.toJSONLocalizedOnly(
      currentVendor,
      req.language
    );
    //vendor data is already localized
    //req.localizedVendor = localizedVendor;
    //vendor data is not localized (en + ar)
    //console.log("test", localizedVendor);

    req.vendor = localizedVendor;
    next();
  }
);
