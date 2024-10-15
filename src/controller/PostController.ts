import createError from "http-errors";
import Post from "../model/Post";
import { NextFunction, Request, Response } from "express";
import validatePostData from "../utils/validations/posts";
import { logger } from "../utils/logging";

export default class PostController {
  // Create a new post
  static async createPost(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, content } = req.body;

      // Check if file is uploaded
      if (!req.file) {
        throw createError(400, "Image is required");
      }

      // Validate post data (excluding imageUrl, as that's uploaded)
      const post = {
        title,
        content,
        imageUrl: req.file.path,
        user: req.user._id,
      };
      const isPostVerified = validatePostData(post);

      if (!isPostVerified) {
        throw createError(400, "Invalid post data.");
      }

      // Create the new post with the uploaded image URL
      const newPost = new Post({
        title,
        content,
        imageUrl: req.file.path, // Save the image URL from multer
        user: req.user._id, // Assuming you have user information in the request
      });

      await newPost.save();
      logger.info("Post Created Successfully");
      return res.status(201).json({
        message: "Post successfully saved in our database.",
        post: newPost,
      });
    } catch (error) {
      logger.error("Error while saving post:", error); // Log the error
      next(error);
    }
  }
}
