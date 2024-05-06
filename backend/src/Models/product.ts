import mongoose from "mongoose";
import mongooseI18n from "mongoose-i18n-localize";
import { productType } from "../types";
import { categories } from "../Utils/constants";
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
  vendorID: { type: String, required: true },
  ratings: {
    type: Number,
  },
  /* vendor: {
    name: {
      type: String,
      required: [true, "Please enter vendor your name!"],
      i18n: true,
    },
    description: {
      type: String,
      i18n: true,
    },
    email: {
      type: String,
      required: [true, "Please enter vendor an email."],
    },
    phone: {
      type: Number,
      required: [true, "Please enter your phone"],
    },
    address: {
      type: String,
      required: true,
    },
    avatar: {
      public_id: {
        type: String,
        //required: true,
      },
      url: {
        type: String,
        //required: true,
      },
    },
    views: {
      type: Number,
    },
    totalReviews: {
      type: Number,
    },
    rating: {
      type: Number,
    },
    totalProducts: {
      type: Number,
    },
    createdAt: {
      type: Date,
    },
  }, */
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
productSchema.plugin(mongooseI18n, {
  locales: ["en", "ar"],
});
const Product = mongoose.model<productType>("Product", productSchema);
export default Product;
