import { Router } from "express";
import PostController from "../../controller/PostController";
import { authenticateJWT } from "../../middleware/jwt";
import { authorize } from "../../middleware/auth/roles";
import { UserRole } from "../../types";
import { uploadImage } from "../../utils/multer";
import { logger } from "../../utils/logging";

const postRouter = Router();

postRouter.post(
  "/",
  authenticateJWT,
  authorize([UserRole.User, UserRole.Admin]),

  uploadImage.single("image"),

  PostController.createPost,
);
postRouter.get(
  "/",
  authenticateJWT,
  authorize([UserRole.User, UserRole.Admin]),
  PostController.getAllPosts,
);
postRouter.get(
  "/:postId",
  authenticateJWT,
  authorize([UserRole.User, UserRole.Admin]),
  PostController.getPostById,
);
postRouter.put(
  "/:postId",
  authenticateJWT,
  authorize([UserRole.User, UserRole.Admin]),
  PostController.updatePost,
);
postRouter.delete(
  "/:postId",
  authenticateJWT,
  authorize([UserRole.User, UserRole.Admin]),
  PostController.deletePost,
);

export default postRouter;
