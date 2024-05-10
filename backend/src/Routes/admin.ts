import express from "express";

import { addCategory, addSlider } from "../Controllers/admin";
import { upload } from "../Utils";
import IsAdmin from "../middleware/IsAdmin";

const router = express.Router().use(IsAdmin);

//! -------addSlider route--------
router.route("/slider").post(upload.single("file"), addSlider);
router.route("/category").post(upload.single("file"), addCategory);

export default router;
