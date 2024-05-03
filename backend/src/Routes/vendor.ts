import express from "express";

import {
  getVendorData,
  logOutVendor,
  getVendorPublicData,
  increaseVendorViews,
} from "../Controllers/vendor";
import { protectVendor } from "../middleware";

const PublicRouter = express.Router();

PublicRouter.route("/get-vendor-public/:vendor_id").get(getVendorPublicData);
PublicRouter.route("/increase-views").patch(increaseVendorViews);

const privateRouter = PublicRouter.use(protectVendor);

privateRouter.route("/get-vendor").get(getVendorData);

privateRouter.route("/log-out").post(logOutVendor);

export default PublicRouter;
