import swaggerUi from "swagger-ui-express";
import express, { urlencoded, type NextFunction } from "express";
import swaggerSpec from "./config/swagger";
import loggerMiddleware from "./middleware/logger";
import globalErrorHandler from "./middleware/errors";
import userRouter from "./routes/user";

const app = express();

// middleware
app.use(express.json());
app.use(urlencoded({ extended: true }));
// Swagger UI route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// logger middleware
app.use(loggerMiddleware);

/**
 * @swagger
 * /:
 *  get:
 *   summary: hello
 *   description: hello description api
 */
app.get("/", (_req, res) => {
  res.send("Hello World!");
});

// Routes
app.use("/api/v1/user", userRouter);

// global error handler ( must be after routes)
app.use(globalErrorHandler);

export default app;
