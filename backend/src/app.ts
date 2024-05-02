import express, { Request, Response } from "express";
//import morgan from "morgan";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import path from "path";
import { authRouter, userRouter, vendorRouter } from "./Routes";
import customError from "./Utils/CustomError";
import { globalErrorHandler } from "./middleware";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
import sanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import hpp from "hpp";
import { whitelist } from "validator";
import middleware from "i18next-http-middleware";
import i18next from "./i18n";

let app = express();
app.use(
  middleware.handle(i18next, {
    ignoreRoutes: ["/foo"],
    removeLngFromUrl: false,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
/* 
let limiter = rateLimit({
  max: 200,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use(helmet());
//app.use("/api", limiter);
app.use(express.json({ limit: "10kb" }));
app.use(sanitize());
app.use(xss());
app.use(hpp({ whitelist: ["duration"] }));
 */
/* if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} */
app.use(express.static("./public"));
app.use("/", express.static("uploads"));
app.use(express.static(path.join(__dirname, "../../frontend/dist")));


app.use((req: any, res: Response, next) => {
  req.requestedAt = new Date().toISOString();
  next();
});

app.get("/api/test", (req: any, res: any) => {
  res.send("hello world");
});

//! Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/vendor", vendorRouter);

app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});

/* app.all("*", (req, res, next) => {
  //!using the global error handler middleware and the custom error class

  const err = new customError(`route ${req.originalUrl} not found`, 404);
  next(err);
}); */


//global error handler

app.use(globalErrorHandler);

export default app;
