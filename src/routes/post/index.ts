import express, { Request, Response, NextFunction } from "express";
import PostController from "../../controller/PostController";
import { uploadImage } from "../../utils/multer";
import { authorize } from "../../middleware/auth/roles";
import {
  CreatePostRequest,
  UpdatePostRequest,
  DeletePostRequest,
} from "../../types"; // Ensure the path is correct
import createError from "http-errors";

const postRouter = express.Router();

// Create Post
postRouter.post(
  "/",
  uploadImage,
  async (req: CreatePostRequest, res: Response, next: NextFunction) => {
    try {
      await PostController.createPost(req, res, next);
    } catch (error) {
      next(createError(500, "Internal Server Error"));
    }
  },
);

// Get All Posts
postRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await PostController.getAllPosts(req, res, next);
  } catch (error) {
    next(createError(500, "Internal Server Error"));
  }
});

// Get Post by ID
postRouter.get(
  "/:postId",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await PostController.getPostById(req, res, next);
    } catch (error) {
      next(createError(500, "Internal Server Error"));
    }
  },
);

// Update Post (protected route)
postRouter.put(
  "/:postId",
  uploadImage,
  authorize(["admin", "user"]),
  async (req: UpdatePostRequest, res: Response, next: NextFunction) => {
    try {
      await PostController.updatePost(req, res, next);
    } catch (error) {
      next(createError(500, "Internal Server Error"));
    }
  },
);

// Delete Post (protected route)
postRouter.delete(
  "/:postId",
  authorize(["admin", "user"]),
  async (req: DeletePostRequest, res: Response, next: NextFunction) => {
    try {
      await PostController.deletePost(req, res, next);
    } catch (error) {
      next(createError(500, "Internal Server Error"));
    }
  },
);

export default postRouter;
