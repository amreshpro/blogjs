import { NextFunction, Response } from "express";
import createError from "http-errors";
import { AuthRequest, UserRole } from "../../../types";

// Adjusted the type of roles to accept an array of UserRole
export const authorize = (roles: UserRole[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const userRole = req.user?.role; // Use optional chaining to safely access user role

    // Check if userRole is defined and matches the allowed roles
    if (!userRole || !roles.includes(userRole)) {
      return next(
        createError(
          403,
          "Forbidden: You do not have permission to perform this action.",
        ),
      );
    }

    next();
  };
};
