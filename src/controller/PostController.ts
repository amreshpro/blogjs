import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import Post from "../model/Post";
import {
  AuthRequest,
  CreatePostRequest,
  DeletePostRequest,
  UpdatePostRequest,
} from "../types";
import { logger } from "../utils/logging";
import validatePostData from "../utils/validations/posts";

class PostController {
  // Create a new post
  static async createPost(
    req: CreatePostRequest,
    res: Response,
    next: NextFunction,
  ) {
    console.log(req.body);
    console.log(req.file);

    const imageUrl = req.body.imageUrl ?? `/uploads/${req.file?.originalname}`;
    const postData = {
      title: req.body.title,
      content: req.body.content,
      imageUrl: imageUrl,
      user: req.user?.id,
    };

    // Validate post data
    const isValid = validatePostData(postData);
    if (!isValid) {
      return next(createError(400, "Invalid post data"));
    }
    try {
      const newPost = new Post(postData);
      await newPost.save();
      res.status(201).json({
        status: "success",
        message: "Post created successfully",
        post: newPost,
      });
    } catch (error) {
      logger.error("Error creating post: ", error);
      next(createError(500, "Internal Server Error"));
    }
  }

  // Get all posts
  /**
   * @swagger
   * /posts:
   *   get:
   *     summary: Get all blog posts
   *     responses:
   *       200:
   *         description: Success
   *       500:
   *         description: Server Error
   */
  static async getAllPosts(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ) {
    try {
      console.log(req);
      let posts;
      if (req.user) {
        posts = await Post.find({ user: req.user.id });
      } else {
        logger.error("Error fetching posts: ");
        next(createError(500, "Internal Server Error"));
      }
      res.json({
        status: "success",
        posts,
      });
    } catch (error) {
      logger.error("Error fetching posts: ", error);
      next(createError(500, "Internal Server Error"));
    }
  }

  // Get a single post by ID
  static async getPostById(req: Request, res: Response, next: NextFunction) {
    const { postId } = req.params;

    try {
      const post = await Post.findById(postId).populate("user", "name email");
      if (!post) {
        throw createError(404, "Post not found");
      }
      res.json({
        status: "success",
        post,
      });
    } catch (error) {
      logger.error("Error fetching post: ", error);
      next(createError(500, "Internal Server Error"));
    }
  }

  // Update a post
  static async updatePost(
    req: UpdatePostRequest,
    res: Response,
    next: NextFunction,
  ) {
    const { postId } = req.params;
    const postData = req.body;

    try {
      const post = await Post.findById(postId);

      // Check if post exists
      if (!post) {
        throw createError(404, "Post not found");
      }

      if (!req.user) {
        throw createError(401, "Unauthorized");
      }

      // Check if user is admin or owner of the post
      if (
        req.user.role.toLowerCase() === "admin" ||
        post.user.toString() === req.user.id
      ) {
        const updatedPost = await Post.findByIdAndUpdate(postId, postData, {
          new: true,
        });
        res.json({
          status: "success",
          message: "Post updated successfully",
          post: updatedPost,
        });
      } else {
        throw createError(
          403,
          "Forbidden: You do not have permission to edit this post",
        );
      }
    } catch (error) {
      logger.error("Error updating post: ", error);
      next(createError(500, "Internal Server Error"));
    }
  }

  // Delete a post
  static async deletePost(
    req: DeletePostRequest,
    res: Response,
    next: NextFunction,
  ) {
    const { postId } = req.params;

    try {
      const post = await Post.findById(postId);

      // Check if post exists
      if (!post) {
        throw createError(404, "Post not found");
      }
      if (!req.user) {
        throw createError(401, "Unauthorized");
      }

      // Check if user is admin or owner of the post
      if (
        req.user.role.toLowerCase() === "admin" ||
        post.user.toString() === req.user.id
      ) {
        await Post.findByIdAndDelete(postId);
        res.json({
          status: "success",
          message: "Post deleted successfully",
        });
      } else {
        throw createError(
          403,
          "Forbidden: You do not have permission to delete this post",
        );
      }
    } catch (error) {
      logger.error("Error deleting post: ", error);
      next(createError(500, "Internal Server Error"));
    }
  }
}

export default PostController;
