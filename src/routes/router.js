import { Router } from "express";
import { userRoutes } from "./userRoutes.js";
import { tokenRoutes } from "./tokenRoutes.js";
import { shirtRoutes } from "./shirtsRoutes.js";
const router = Router();

router.use("/users", userRoutes);
router.use("/shirts", shirtRoutes);


//TOKEN Routes
router.use("/token", tokenRoutes);

export { router };
