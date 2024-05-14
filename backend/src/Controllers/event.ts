import { NextFunction, Response } from "express";
import { CustomRequest } from "../types";
import { asyncErrorHandler, customError, deleteFile } from "../Utils";
import Event from "../Models/event";

export const addEvent = asyncErrorHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const imageFiles = req?.files as Express.Multer.File[];
    const images = imageFiles?.map((file) => {
      return {
        public_id: "public_id",
        url: `https://sacramento.onrender.com/${file.filename}`,
      };
    });

    const event = await Event.create({
      ...req.body,
      images,
      vendorID: req.vendor._id.toString(),
    });
    res.status(200).json({
      success: true,
      event,
      message: req.t("event_added_successfully", { ns: "success" }),
    });
  }
);
export const getVendorEvents = asyncErrorHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const events = await Event.find({
      vendorID: req.vendor._id.toString(),
    });
    const localizedEvents = Event.schema.methods.toJSONLocalizedOnly(
      events,
      req.language
    );
    res.status(200).json({
      success: true,
      events: localizedEvents,
    });
  }
);
export const deleteVendorEvent = asyncErrorHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const event = await Event.findById(req.body.eventId);

    //console.log(deletedEvent.vendorID.toString(), req.vendor._id.toString());

    if (!event) {
      return next(
        new customError(req.t("event_not_found", { ns: "error" }), 404)
      );
    } else if (event.vendorID.toString() !== req.vendor._id.toString()) {
      return next(
        new customError(req.t("action_not_allowed", { ns: "error" }), 401)
      );
    }
    const deletedEvent = await Event.findByIdAndDelete(req.body.eventId);

    event.images.forEach((image) => {
      deleteFile(`uploads/${image.url}`);
    });
    //console.log("deletedEvent", deletedEvent);

    if (!deletedEvent) {
      return next(
        new customError(req.t("delete_event_failed", { ns: "error" }), 500)
      );
    }

    res.status(200).json({
      success: true,
      message: req.t("event_deleted_successfully", { ns: "success" }),
    });
  }
);
export const deleteExpiredEvent = asyncErrorHandler(
  async (req: CustomRequest, res: Response, next: NextFunction) => {
    const event = await Event.findById(req.body.eventId);

    //console.log(deletedEvent.vendorID.toString(), req.vendor._id.toString());
//TODO: check if event is expired
    if (!event) {
      return next(
        new customError(req.t("event_not_found", { ns: "error" }), 404)
      );
    }
    const deletedEvent = await Event.findByIdAndDelete(req.body.eventId);

    event.images.forEach((image) => {
      deleteFile(`uploads/${image.url}`);
    });
    //console.log("deletedEvent", deletedEvent);

    if (!deletedEvent) {
      return next(
        new customError(req.t("delete_event_failed", { ns: "error" }), 500)
      );
    }

    res.status(200).json({
      success: true,
      message: req.t("event_deleted_successfully", { ns: "success" }),
    });
  }
);
