import { Router } from "express";
import { CommentController } from "../controllers/CommentController.js";
import loginRequired from "../middlewars/loginRequired.js";
import adminRequired from "../middlewars/adminRequired.js";
const commentRoutes = Router();
const commentController = new CommentController();

//POST
commentRoutes.post("/", commentController.createComment);

//GET
commentRoutes.get("/", loginRequired, commentController.findAllComments);
commentRoutes.get("/:id", loginRequired, commentController.findComment);

//PUT
commentRoutes.put("/:id", loginRequired, commentController.updateComment);

//DELETE
commentRoutes.delete("/:id", loginRequired, commentController.deleteComment);

export { commentRoutes };
