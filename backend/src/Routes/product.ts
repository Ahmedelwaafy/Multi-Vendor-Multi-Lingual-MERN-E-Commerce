import express from "express";

import {
  addProduct,
  getVendorProducts,
  deleteVendorProduct,
} from "../Controllers/product";
import { IsVendor } from "../middleware";
import upload from "../Utils/multer";

const PublicRouter = express.Router();

/* PublicRouter.route("/get-vendor-public/:vendor_id").get(getVendorPublicData);
PublicRouter.route("/increase-views").patch(increaseVendorViews); */

const privateRouter = PublicRouter.use(IsVendor);
privateRouter
  .route("")
  .post(upload.array("images[]", 5), addProduct);
privateRouter.route("/vendor-products").get(getVendorProducts);
privateRouter.route("").delete(deleteVendorProduct);

export default PublicRouter;
