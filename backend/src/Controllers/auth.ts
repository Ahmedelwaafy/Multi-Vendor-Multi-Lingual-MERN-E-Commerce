import User from "../Models/user";
import {
  asyncErrorHandler,
  customError,
  sendEmail,
  sendCookieTokenResponse,
  signToken,
  verifyToken,
  sendCookieTokenResponseVendor,
} from "../Utils";
import util from "util";
import crypto from "crypto";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { CustomRequest } from "../types";
import path from "path";
import fs from "fs";
import Vendor from "../Models/vendor";

function deleteFile(filePath: string) {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.log(err);
    }
    console.log("File deleted successfully");
  });
}

//! -------User

export const signup = asyncErrorHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { name, email, phone, platform, password, confirmPassword } =
      req.body;
    const fileName = req.file.filename;
    const filePath = `uploads/${fileName}`;
    const fileUrl = path.join(fileName);

    if (!name || !email || !phone || !password || !confirmPassword) {
      deleteFile(filePath);
      const error = new customError(req.t("provide_all_fields"), 400);
      return next(error);
    }
    const userExists = await User.findOne({ email });

    if (userExists) {
      deleteFile(filePath);
      const error = new customError(req.t("user_already_exists"), 400);
      return next(error);
    }

    if (password !== confirmPassword) {
      deleteFile(filePath);
      const error = new customError(req.t("passwords_do_not_match"), 400);
      return next(error);
    }

    /* const myCloud = await cloudinary.v2.uploader.upload(file, {
      folder: "files",
    }); */

    const user = {
      name,
      email,
      phone,
      platform,
      password,
      confirmPassword,
      file: fileUrl,
      /* file: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      }, */
    };

    const activationToken = signToken(user, "5m");

    const activationUrl = `${process.env.FRONTEND_URL}/${req.language}/activate/${activationToken}`;

    try {
      await sendEmail({
        email: user.email,
        subject: req.t("activate_user_mail_subject"),
        message:
          req.t("activate_user_mail_message", {
            name: user.name,
          }) + activationUrl,
      });
      res.status(201).json({
        success: true,
        message: req.t("activate_user_check_mail"),
      });
    } catch (error) {
      return next(
        new customError(req.t("activate_user_send_mail_failed"), 500)
      );
    }
  }
);

export const activateUser = asyncErrorHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { activation_token } = req.body;
    let newUser;

    try {
      newUser = verifyToken(activation_token);
    } catch (err) {
      const error = new customError(req.t("token_invalid_or_expired"), 400);
      return next(error);
    }
    //console.log("newUser", newUser);

    const { name, email, phone, platform, password, confirmPassword, file } =
      newUser as JwtPayload;

    let user = await User.findOne({ email });

    if (user) {
      const error = new customError(req.t("user_already_exists"), 400);
      return next(error);
    }
    user = await User.create({
      name,
      email,
      phone,
      platform,
      password,
      confirmPassword,
      file,
    });
    res.status(201).json({
      success: true,
      message: req.t("account_activated_success_msg"),
    });
  }
);

export const login = asyncErrorHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    console.log(req.language);

    const { email, password } = req.body;
    if (!email || !password) {
      const error = new customError(req.t("login_provide_email_pass"), 400);
      return next(error);
    }
    const user = await User.findOne({ email }).select("+password");
    const isMatch = await user?.comparePassword(password);
    if (!isMatch || !user) {
      const error = new customError(req.t("incorrect_email_pass"), 401);
      return next(error);
    }
    sendCookieTokenResponse(user, 201, res, req, req.t("login_success"));
  }
);

export const forgetPassword = asyncErrorHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      const error = new customError("There is no user with that email", 404);
      return next(error);
    }
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });
    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/users/reset-password/${resetToken}`;
    try {
      await sendEmail({
        email: user.email,
        subject: "Your password reset token (valid for 10 min)",
        message: resetUrl,
      });

      res.status(200).json({
        status: "success",
        message: "Token sent to email",
      });
    } catch (error) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });
      return next(new customError("failed to send the reset token", 500));
    }
  }
);

export const resetPassword = asyncErrorHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      const error = new customError("Token is invalid or has expired", 400);
      return next(error);
    }
    user.password = req.body.password;
    user.confirmPassword = req.body.confirmPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    //user.passwordChangedAt = Date.now() ;
    await user.save();
    sendCookieTokenResponse(
      user,
      201,
      res,
      req,
      "Password Updated Successfully"
    );
  }
);

//! -------Vendor

export const signupVendor = asyncErrorHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const {
      name,
      email,
      phone,
      platform,
      password,
      confirmPassword,
      address,
      zipCode,
    } = req.body;
    console.log("phone", phone);

    const fileName = req?.file?.filename;
    const filePath = `uploads/${fileName}`;
    const fileUrl = path?.join(fileName);

    if (
      !name ||
      !email ||
      !phone ||
      !password ||
      !confirmPassword ||
      !address ||
      !zipCode
    ) {
      deleteFile(filePath);
      const error = new customError("Please provide all fields", 400);
      return next(error);
    }
    const vendorExists = await Vendor.findOne({ email });

    if (vendorExists) {
      deleteFile(filePath);
      const error = new customError("Vendor already exists", 400);
      return next(error);
    }

    if (password !== confirmPassword) {
      deleteFile(filePath);
      const error = new customError("Passwords do not match", 400);
      return next(error);
    }

    /* const myCloud = await cloudinary.v2.uploader.upload(file, {
      folder: "files",
    }); */

    const vendor = {
      name,
      email,
      phone,
      platform,
      password,
      confirmPassword,
      address,
      zipCode,
      avatar: {
        public_id: "",
        url: `https://sacramento.onrender.com/${fileUrl}`,
      },
      /* file: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      }, */
    };

    const activationToken = signToken(vendor, "5m");

    const activationUrl = `${process.env.FRONTEND_URL}/${req.language}/seller/activate/${activationToken}`;

    try {
      await sendEmail({
        email: vendor.email,
        subject: req.t("activate_vendor_mail_subject"),
        message:
          req.t("activate_vendor_mail_message", {
            name: req.language === "ar" ? vendor?.name?.ar : vendor?.name?.en,
          }) + activationUrl,
      });
      res.status(201).json({
        success: true,
        message: `please check your email to activate your seller account!`,
      });
    } catch (error) {
      return next(new customError("failed to send the activation link", 500));
    }
  }
);

export const activateVendor = asyncErrorHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { activation_token } = req.body;
    let newVendor;

    try {
      newVendor = verifyToken(activation_token);
    } catch (err) {
      const error = new customError("token is Invalid or has expired", 400);
      return next(error);
    }
    //console.log("newVendor", newVendor);

    const {
      name,
      email,
      phone,
      platform,
      password,
      confirmPassword,
      avatar,
      address,
      zipCode,
    } = newVendor as JwtPayload;

    let vendor = await Vendor.findOne({ email });

    if (vendor) {
      const error = new customError("Vendor already exists try to login!", 400);
      return next(error);
    }
    vendor = await Vendor.create({
      name,
      email,
      phone,
      platform,
      password,
      confirmPassword,
      avatar,
      address,
      zipCode,
    });
    res.status(201).json({
      success: true,
      message: `Your account has been activated successfully.`,
    });
  }
);

export const loginVendor = asyncErrorHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if (!email || !password) {
      const error = new customError("Please provide email and password", 400);
      return next(error);
    }
    const vendor = await Vendor.findOne({ email }).select("+password");
    const isMatch = await vendor?.comparePassword(password);
    if (!isMatch || !vendor) {
      const error = new customError("Incorrect email or password", 401);
      return next(error);
    }
    sendCookieTokenResponseVendor(
      vendor,
      201,
      res,
      req,
      req.t("login_success")
    );
  }
);

export const forgetPasswordVendor = asyncErrorHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const vendor = await Vendor.findOne({ email: req.body.email });
    if (!vendor) {
      const error = new customError("There is no vendor with that email", 404);
      return next(error);
    }
    const resetToken = vendor.createPasswordResetToken();
    await vendor.save({ validateBeforeSave: false });
    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/vendors/reset-password/${resetToken}`;
    try {
      await sendEmail({
        email: vendor.email,
        subject: "Your password reset token (valid for 10 min)",
        message: resetUrl,
      });

      res.status(200).json({
        status: "success",
        message: "Token sent to email",
      });
    } catch (error) {
      vendor.passwordResetToken = undefined;
      vendor.passwordResetExpires = undefined;
      await vendor.save({ validateBeforeSave: false });
      return next(new customError("failed to send the reset token", 500));
    }
  }
);

export const resetPasswordVendor = asyncErrorHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const vendor = await Vendor.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!vendor) {
      const error = new customError("Token is invalid or has expired", 400);
      return next(error);
    }
    vendor.password = req.body.password;
    vendor.confirmPassword = req.body.confirmPassword;
    vendor.passwordResetToken = undefined;
    vendor.passwordResetExpires = undefined;
    //vendor.passwordChangedAt = Date.now() ;
    await vendor.save();
    sendCookieTokenResponseVendor(
      vendor,
      201,
      res,
      req,
      "Password Updated Successfully"
    );
  }
);
