import express, { Request, Response, NextFunction } from "express";
import UserController from "../../controller/UserController";

const userRouter = express.Router();

// POST request to save a new user
userRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    await UserController.saveUser(req, res, next);
  },
);

// GET request to retrieve all users
userRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
  await UserController.getAllUser(req, res, next);
});

export default userRouter;
