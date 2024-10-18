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
  (req, res, next) => {
    // Check if there's an error from Multer
    if (req.fileValidationError) {
      return res.status(400).json({ message: req.fileValidationError });
    }
    console.log("Multer middleware executed:", req.file); // Check if file is received
    next(); // Pass control to the next middleware
  },
  (req, res, next) => {
    logger.info("Multer middleware executed:", req.file);
    console.log("Multer middleware executed:", req.file); // Check if file is received
    next(); // Pass control to the next middleware
  },
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
