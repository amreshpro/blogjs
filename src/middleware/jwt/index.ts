import { NextFunction, Response } from "express";
import createError from "http-errors";
import jwt from "jsonwebtoken";
import EnvConfig from "../../config/EnvConfig";
import { AuthRequest } from "../../types";

export const authenticateJWT = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw createError(401, "Authorization token is missing or invalid.");
    }

    const token = authHeader.split(" ")[1]; // Extract the token

    // Verify the token
    jwt.verify(token, EnvConfig.JWT_SECRET!, (err: any, user: any) => {
      if (err) {
        throw createError(403, "Invalid or expired token");
      }

      // Attach user to the request object
      req.user = user;
      next(); // Proceed to the next middleware/route
    });
  } catch (error) {
    next(error);
  }
};
