import express from "express";

import {
  addProduct,
  getVendorProducts,
  deleteVendorProduct,
  getAllProducts,
  getProductDetails,
  increaseProductViews,
} from "../Controllers/product";
import { IsVendor } from "../middleware";
import upload from "../Utils/multer";

const PublicRouter = express.Router();

PublicRouter.route("/all").get(getAllProducts);
PublicRouter.route("/:productID").get(getProductDetails);
PublicRouter.route("/increase-views").patch(increaseProductViews);

const privateRouter = PublicRouter.use(IsVendor);
privateRouter
  .route("")
  .post(upload.array("images[]", 5), addProduct);
privateRouter.route("/vendor-products").get(getVendorProducts);
privateRouter.route("").delete(deleteVendorProduct);

export default PublicRouter;
