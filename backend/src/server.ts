import mongoose from "mongoose";
import{v2 as cloudinary} from "cloudinary";

process.on("uncaughtException", (error) => {
  console.log(error.message);
  console.log("uncaught Exception Shutting down...");
  process.exit(1);
});

import app from "./app";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})


mongoose
  .connect(process.env.CONN_STR as string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }as mongoose.ConnectOptions)
  .then((conn) => {
    //console.log(conn);
    console.log("DB Connection Successful");
  })
  .catch((error) => {
    console.log("Some error has occurred in db connection", error);
  });

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log("server has started...");
});

process.on("unhandledRejection", (error: any) => {
  console.log(error.message);
  console.log("UNHANDLED REJECTION! Shutting down...");
  server.close(() => {
    process.exit(1);
  });
});
