import { Response, NextFunction } from "express";
import { CustomRequest } from "../types";
import { customError } from "../Utils";

export default (...roles: string[]) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      const error = new customError(
        "You do not have permission to perform this action",
        403
      );
      return next(error);
    }
    next();
  };
};
