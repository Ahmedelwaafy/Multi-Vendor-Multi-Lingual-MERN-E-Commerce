import mongoose from "mongoose";
import { discountCodeType } from "../types";
import mongooseI18n from "mongoose-i18n-localize";

const discountCodeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your coupoun code name!"],
    unique: true,
  },
  value: {
    type: Number,
    required: true,
  },
  maxUsage: {
    type: Number,
    required: true,
  },
  usageCount: {
    type: Number,
    default: 0,
  },
  minPrice: {
    type: Number,
  },
  maxPrice: {
    type: Number,
  },
  vendorID: {
    type: String,
    required: true,
  },
  ProductID: {
    type: String,
    required: true,
  },
  ProductName: {
    type: String,
    i18n: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
discountCodeSchema.plugin(mongooseI18n, {
  locales: ["en", "ar"],
});
const DiscountCode = mongoose.model<discountCodeType>(
  "DiscountCode",
  discountCodeSchema
);
export default DiscountCode;
