import express from "express";

import { getUserData, logOut } from "../Controllers/user";
import { IsUser } from "../middleware";

const router = express.Router();

router.route("/get-user").get(IsUser, getUserData);
router.route("/log-out").post(IsUser, logOut);

export default router;
