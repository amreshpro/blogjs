import createError from "http-errors";
import bcrypt from "bcryptjs";
import { Request, Response, NextFunction } from "express";
import { verifyUserFormat } from "../utils/user";
import User from "../model/User";
import { logger } from "../utils/logging";

export default class UserController {
  static async saveUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.body;

      // Validate user format
      const isUserFormatted = verifyUserFormat(user);
      if (!isUserFormatted) {
        throw createError(400, "Invalid user format.");
      }

      // Check if user already exists
      const isAlreadyRegistered = await User.findOne({ email: user.email });
      logger.info(isAlreadyRegistered);
      if (isAlreadyRegistered) {
        throw createError(409, "User already registered.");
      }

      // Hash password
      const hashPassword = await bcrypt.hash(user.password, 10);
      user.password = hashPassword;

      // Create the user
      const newUser = await User.create(user);
      logger.info("User created successfully", newUser);

      return res.status(201).json({
        message: "User successfully saved in our database.",
        user: newUser,
      });
    } catch (error) {
      logger.error("Error while saving user:", error); // Log the error
      next(error); // Pass the error to the next middleware (error handler)
    }
  }

  static async getAllUser(_req: Request, res: Response, next: NextFunction) {
    try {
      const users = await User.find({});
      logger.info(users);
      return res.status(200).json(users || []);
    } catch (error) {
      logger.error("Error while fetching users:", error); // Log the error
      next(error); // Pass the error to the next middleware (error handler)
    }
  }
}
