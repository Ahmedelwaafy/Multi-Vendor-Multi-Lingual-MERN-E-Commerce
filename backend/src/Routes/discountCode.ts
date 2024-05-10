import express from "express";

import {
  addDiscountCode,
  getVendorDiscountCodes,
  deleteVendorDiscountCode,
} from "../Controllers/discountCode";
import { IsVendor } from "../middleware";
import upload from "../Utils/multer";

const PublicRouter = express.Router();

const privateRouter = PublicRouter.use(IsVendor);
privateRouter.route("").post(addDiscountCode).delete(deleteVendorDiscountCode);
privateRouter.route("/vendor").get(getVendorDiscountCodes);

export default PublicRouter;
