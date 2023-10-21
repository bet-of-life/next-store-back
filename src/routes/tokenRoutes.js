import { Router } from "express";
import { TokenController } from "../controllers/tokenController/TokenController.js";

const tokenRoutes = Router();
const tokenController = new TokenController();

//POST
tokenRoutes.post("/", tokenController.handle);

export { tokenRoutes };
