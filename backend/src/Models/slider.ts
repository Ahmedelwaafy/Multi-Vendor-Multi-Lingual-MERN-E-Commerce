import mongoose from "mongoose";
import { sliderType } from "../types";
import mongooseI18n from "mongoose-i18n-localize";

const sliderSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter title!"],
    i18n: true,
  },
  subTitle: {
    type: String,
    required: [true, "Please enter sub title!"],
    i18n: true,
  },
  link: {
    type: String,
    required: [true, "Please enter link!"],
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
sliderSchema.plugin(mongooseI18n, {
  locales: ["en", "ar"],
});
const Slider = mongoose.model<sliderType>("Slider", sliderSchema);
export default Slider;
