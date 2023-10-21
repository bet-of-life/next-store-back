import { Router } from "express";
import { PostController } from "../controllers/PostController.js";
import loginRequired from "../middlewars/loginRequired.js";
import adminRequired from "../middlewars/adminRequired.js";
const postRoutes = Router();
const postController = new PostController();

//POST
postRoutes.post("/", postController.createPost);

//GET
postRoutes.get("/", loginRequired, postController.findAllPosts);
postRoutes.get("/:id", loginRequired, postController.findPost);

//PUT

postRoutes.put("/:id", loginRequired, postController.updatePost);

//DELETE
postRoutes.delete("/:id", loginRequired, postController.deletePost);

export { postRoutes };
