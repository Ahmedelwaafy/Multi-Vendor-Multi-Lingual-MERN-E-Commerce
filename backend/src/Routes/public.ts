import express from "express";

import { getVendorPublicData } from "../Controllers/public";

const router = express.Router();

router.route("/get-vendor/:vendor_id").get(getVendorPublicData);


export default router;
