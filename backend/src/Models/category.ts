import mongoose from "mongoose";
import { categoryType } from "../types";
import mongooseI18n from "mongoose-i18n-localize";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter category name!"],
    i18n: true,
    unique: true,
  },
  img: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
categorySchema.plugin(mongooseI18n, {
  locales: ["en", "ar"],
});
const Category = mongoose.model<categoryType>("Category", categorySchema);
export default Category;
