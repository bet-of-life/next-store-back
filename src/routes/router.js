import { Router } from "express";
import { userRoutes } from "./userRoutes.js";
import { postRoutes } from "./postRoutes.js";
import { commentRoutes } from "./commentRoutes.js";
import { tokenRoutes } from "./tokenRoutes.js";
const router = Router();

router.use("/users", userRoutes);
router.use("/post", postRoutes);
router.use("/comment", commentRoutes);

//TOKEN Routes
router.use("/token", tokenRoutes);

export { router };
