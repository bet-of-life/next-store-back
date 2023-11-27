import { Router } from "express";
import { ShirtsController } from "../controllers/ShirtsController.js";

import loginRequired from "../middlewars/loginRequired.js";
const shirtRoutes = Router();
const shirtsController = new ShirtsController();

//POST
shirtRoutes.post("/", shirtsController.createShirts);

//GET
shirtRoutes.get("/", shirtsController.findAllShirts);
shirtRoutes.get("/:id", shirtsController.findShirt);

//UPDATE
shirtRoutes.put("/:id", loginRequired, shirtsController.updateShirt);

//DELETE
shirtRoutes.delete("/:id", loginRequired, shirtsController.deleteShirt);

export { shirtRoutes };
