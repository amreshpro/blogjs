import express, { Request, Response, NextFunction } from "express";
import PostController from "../../controller/PostController";
import { uploadImage } from "../../utils/multer";

const postRouter = express.Router();

postRouter.post(
  "/",
  uploadImage.single("image"),
  async (req: Request, res: Response, next: NextFunction) => {
    await PostController.createPost(req, res, next);
  },
);

export default postRouter;
