import mongoose from "mongoose";
import mongooseI18n from "mongoose-i18n-localize";
import { eventType } from "../types";
import { categories } from "../Utils/constants";
const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your event name!"],
    i18n: true,
  },
  description: {
    type: String,
    required: [true, "Please enter your event description!"],
    i18n: true,
  },
  category: {
    type: String,
    required: [true, "Please enter your event category!"],
  },
  tags: {
    type: String,
  },
  originalPrice: {
    type: Number,
    required: [true, "Please enter your event price!"],
  },
  finalPrice: {
    type: Number,
    required: [true, "Please enter your final event price!"],
  },
  stock: {
    type: Number,
    required: [true, "Please enter your event stock!"],
  },
  views: {
    type: Number,
    default: 0,
  },
  isFav: {
    type: Boolean,
    default: false,
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
  vendorID: { type: String, required: true },

  sold_out: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    default: "Running",
  },
});
eventSchema.pre("save", async function (next) {
  if (!this.isModified("category")) {
    return next();
  }
  this.category = categories.find((cat) => cat.id == +this.category)?.name;
  next();
});
eventSchema.plugin(mongooseI18n, {
  locales: ["en", "ar"],
});
const Event = mongoose.model<eventType>("Event", eventSchema);
export default Event;
