import express from "express";

import { getUserData, logOut } from "../Controllers/user";
import { protect } from "../middleware";

const router = express.Router();

router.route("/get-user").get(protect, getUserData);
router.route("/log-out").post(protect, logOut);

export default router;
