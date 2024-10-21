import express, { urlencoded } from "express";
import openapi from "@wesleytodd/openapi";
import loggerMiddleware from "./middleware/logger";
import globalErrorHandler from "./middleware/errors";
import userRouter from "./routes/user";
import postRouter from "./routes/post";
import authRouter from "./routes/auth";
import path from "path";
import cors from "cors";

const app = express();

const oapi = openapi({
  openapi: "3.0.0",
  info: {
    title: "Express Application",
    description: "Generated docs from an Express api",
    version: "1.0.0",
  },
});

// This will serve the generated json document(s)
// (as well as the swagger-ui if configured)

// middleware
app.use(express.json());
app.use(urlencoded({ extended: true }));
// Swagger UI route
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// logger middleware
app.use(loggerMiddleware);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors());

// Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/post", postRouter);
app.use("/api/v1/auth", authRouter);

// swagger
app.use(oapi);
app.use("/docs", oapi.swaggerui());
app.get(
  "/",
  oapi.path({
    responses: {
      200: {
        description: "Successful response",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                hello: { type: "string" },
              },
            },
          },
        },
      },
    },
  }),
  (req, res) => {
    res.json({
      hello: "world",
    });
  },
);
// global error handler ( must be after routes)
app.use(globalErrorHandler);

export default app;
