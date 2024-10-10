import type{ Request, Response, NextFunction } from "express";
import createError from "http-errors";

// Global error handling middleware
export function globalErrorHandler(
  err: any, // `err` can be of any type
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Agar error `http-errors` se bana hua hai, to use handle karo, varna 500 error throw karo
  const statusCode = err.status || 500;
  const message = err.message || "Internal Server Error";

  // Agar development environment hai, to detailed stack trace show karein
  if (process.env.NODE_ENV === "development") {
    return res.status(statusCode).json({
      status: statusCode,
      message,
      stack: err.stack, // Development ke liye stack trace
    });
  }

  // Production ke liye sirf message aur status code bhejo

  res.status(statusCode).json({
    status: statusCode,
    message,
  });
}
