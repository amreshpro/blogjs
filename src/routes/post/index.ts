import { Router } from "express";
import PostController from "../../controller/PostController";
import { authenticateJWT } from "../../middleware/jwt";

const postRouter = Router();

postRouter.post("/", authenticateJWT, PostController.createPost);
postRouter.get("/", authenticateJWT, PostController.getAllPosts);
postRouter.get("/:postId", authenticateJWT, PostController.getPostById);
postRouter.put("/:postId", authenticateJWT, PostController.updatePost);
postRouter.delete("/:postId", authenticateJWT, PostController.deletePost);

export default postRouter;
