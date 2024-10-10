import { logger } from "../../utils/logging";
import type { NextFunction, Request } from "express";

export default function loggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  logger.info(`${req.method} ${req.path}`);
  next();
}
