import express, { Request, Response, NextFunction } from "express";
import UserController from "../../controller/UserController";

const userRouter = express.Router();

userRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    await UserController.createUser(req, res, next);
  },
);

// GET request to retrieve all users
userRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
  await UserController.getAllUser(req, res, next);
});

export default userRouter;
