import mongoose from "mongoose";
import { subscriberType } from "../types";
import validator from "validator";

const subscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter an email."],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please enter a valid email."],
  },
  platform: {
    type: String,
    enum: ["mobile", "website"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Subscriber = mongoose.model<subscriberType>("Subscriber", subscriberSchema);
export default Subscriber;
