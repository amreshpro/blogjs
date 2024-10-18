import swaggerUi from "swagger-ui-express";
import express, { urlencoded } from "express";
import swaggerSpec from "./config/swagger";
import loggerMiddleware from "./middleware/logger";
import globalErrorHandler from "./middleware/errors";
import userRouter from "./routes/user";
import postRouter from "./routes/post";
import authRouter from "./routes/auth";
import path from "path";
import cors from "cors";

const app = express();

// middleware
app.use(express.json());
app.use(urlencoded({ extended: true }));
// Swagger UI route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// logger middleware
app.use(loggerMiddleware);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors());

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
app.use("/api/v1/post", postRouter);
app.use("/api/v1/auth", authRouter);
// global error handler ( must be after routes)
app.use(globalErrorHandler);

export default app;
