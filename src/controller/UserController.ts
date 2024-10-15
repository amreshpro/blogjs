import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import User from "../model/User";
import { logger } from "../utils/logging";
import validateUserData from "../utils/validations/user";

export default class UserController {
  static async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.body;

      // Validate user format
      const isUserVerified = validateUserData(user);
      if (!isUserVerified) {
        throw createError(400, "Invalid user credentials");
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
      newUser.save();
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
