import mongoose from "mongoose";
import mongooseI18n from "mongoose-i18n-localize";
import { productType } from "../types";
import { categories } from "../Utils/constants";
import Vendor from "./vendor";
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your product name!"],
    i18n: true,
  },
  description: {
    type: String,
    required: [true, "Please enter your product description!"],
    i18n: true,
  },
  category: {
    type: String,
    required: [true, "Please enter your product category!"],
  },
  tags: {
    type: String,
  },

  originalPrice: {
    type: Number,
    required: [true, "Please enter your product price!"],
  },
  finalPrice: {
    type: Number,
  },
  stock: {
    type: Number,
    required: [true, "Please enter your product stock!"],
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  views: {
    type: Number,
    default: 0,
  },
  isFav: {
    type: Boolean,
    default: false,
  },
  accepted: {
    type: Boolean,
    default: false,
  },
  reviews: [
    {
      user: {
        type: Object,
      },
      rating: {
        type: Number,
      },
      comment: {
        type: String,
      },
      productId: {
        type: String,
      },
      createdAt: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  vendor: { type: String, required: true },
  ratings: {
    type: Number,
    default: 0,
  },
  sold_out: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
productSchema.pre("save", async function (next) {
  if (!this.isModified("category")) {
    return next();
  }
  this.category = categories.find((cat) => cat.id == +this.category)?.name;
  next();
});
productSchema.pre("find", async function (next) {
  this.populate(
    "vendor",
    "name avatar totalReviews rating totalProducts createdAt",
    Vendor
  );
  next();
});
productSchema.plugin(mongooseI18n, {
  locales: ["en", "ar"],
});
const Product = mongoose.model<productType>("Product", productSchema);
export default Product;
