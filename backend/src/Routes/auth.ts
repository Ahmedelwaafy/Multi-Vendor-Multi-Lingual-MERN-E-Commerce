import express from "express";

import {
  signup,
  activateUser,
  login,
  forgetPassword,
  resetPassword,
  signupVendor,
  activateVendor,
  loginVendor,
  forgetPasswordVendor,
  resetPasswordVendor,
} from "../Controllers/auth";
import { upload } from "../Utils";

const router = express.Router();
        //! -------User Auth routes--------
router.route("/signup").post(upload.single("file"), signup);
router.route("/activation").post(activateUser);
router.route("/login").post(login);
router.route("/forget-password").post(forgetPassword);
router.route("/reset-password/:token").patch(resetPassword);


        //! -------Vendor Auth routes--------
router.route("/signup-vendor").post(upload.single("file"), signupVendor);
router.route("/activation-vendor").post(activateVendor);
router.route("/login-vendor").post(loginVendor);
router.route("/forget-password-vendor").post(forgetPasswordVendor);
router.route("/reset-password-vendor/:token").patch(resetPasswordVendor);

export default router;
