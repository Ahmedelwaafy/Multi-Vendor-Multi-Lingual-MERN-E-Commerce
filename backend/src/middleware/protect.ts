import { Response, NextFunction } from "express";
import { CustomRequest } from "../types";
import { asyncErrorHandler, customError } from "../Utils";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../Models/user";

export default asyncErrorHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const token = req.cookies["jwt"];
    console.log("token", token);

    if (!token) {
      const error = new customError("You are not logged in", 401);
      return next(error);
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const currentUser = await User.findById((decoded as JwtPayload).id);
    if (!currentUser) {
      const error = new customError("The user no longer exists", 401);
      return next(error);
    }
    const isPasswordChanged = await currentUser.changedPasswordAfterLogin(
      (decoded as JwtPayload).iat
    );
    if (isPasswordChanged) {
      const error = new customError("User recently changed password", 401);
      return next(error);
    }

    req.user = currentUser;
    next();
  }
);
