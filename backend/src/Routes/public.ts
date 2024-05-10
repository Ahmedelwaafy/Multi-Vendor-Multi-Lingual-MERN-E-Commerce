import express from "express";
import { getCategories, getHomePage } from "../Controllers/public";

const router = express.Router();

//router.route("/get-vendor/:vendor_id").get(getVendorPublicData);
router.route("/home-page").get(getHomePage);
router.route("/categories").get(getCategories);

export default router;
