import { Router } from "express";
import { userRoutes } from "./userRoutes.js";
import { tokenRoutes } from "./tokenRoutes.js";
const router = Router();

router.use("/users", userRoutes);

//TOKEN Routes
router.use("/token", tokenRoutes);

export { router };
