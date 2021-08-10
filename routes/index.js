import { Router } from "express";
const router = Router();

import auth from "../middleware/auth.js";
import user from "./user.js";
import item from "./item.js";
import level from "./level.js";
import profile from "./profile.js";

router.use("/user", user);
router.use("/user", auth, profile);
router.use("/item", auth, item);
router.use("/level", auth, level);

export default router;
