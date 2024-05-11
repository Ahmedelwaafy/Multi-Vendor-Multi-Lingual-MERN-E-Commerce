import express from "express";
import {
  getBestSelling,
  getCategories,
  getHomePage,
  getNavbar,
  getFooter,
  subscribeToNewsletter,
} from "../Controllers/public";

const router = express.Router();

//router.route("/get-vendor/:vendor_id").get(getVendorPublicData);
router.route("/home-page").get(getHomePage);
router.route("/navbar").get(getNavbar);
router.route("/Footer").get(getFooter);
router.route("/subscribe-to-newsletter").post(subscribeToNewsletter);
router.route("/categories").get(getCategories);
router.route("/best-selling").get(getBestSelling);

export default router;
