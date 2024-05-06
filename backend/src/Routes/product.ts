import express from "express";

import { addProduct, getVendorProducts } from "../Controllers/product";
import { IsVendor } from "../middleware";
import upload from "../Utils/multer";

const PublicRouter = express.Router();

/* PublicRouter.route("/get-vendor-public/:vendor_id").get(getVendorPublicData);
PublicRouter.route("/increase-views").patch(increaseVendorViews); */

const privateRouter = PublicRouter.use(IsVendor);
privateRouter
  .route("/add-product")
  .post(upload.array("images[]", 5), addProduct);
privateRouter.route("/get-vendor-products").get(getVendorProducts);

export default PublicRouter;
