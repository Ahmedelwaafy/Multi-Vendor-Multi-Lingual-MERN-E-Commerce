import express from "express";

import {
  addEvent,
  getVendorEvents,
  deleteVendorEvent,
} from "../Controllers/event";
import { IsVendor } from "../middleware";
import upload from "../Utils/multer";

const PublicRouter = express.Router();

/* PublicRouter.route("/get-vendor-public/:vendor_id").get(getVendorPublicData);
PublicRouter.route("/increase-views").patch(increaseVendorViews); */

const privateRouter = PublicRouter.use(IsVendor);
privateRouter
  .route("")
  .post(upload.array("images[]", 5), addEvent).delete(deleteVendorEvent);
privateRouter.route("/vendor-events").get(getVendorEvents);

export default PublicRouter;
