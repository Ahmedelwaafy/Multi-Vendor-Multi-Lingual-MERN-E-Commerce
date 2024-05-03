import express from "express";

import { getVendorData, logOutVendor } from "../Controllers/vendor";
import { protectVendor } from "../middleware";

const router = express.Router();

router.route("/get-vendor").get(protectVendor, getVendorData);

router.route("/log-out").post(protectVendor, logOutVendor);

export default router;
