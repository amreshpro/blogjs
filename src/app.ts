import express from "express";
import loggerMiddleware from "./middleware/logger";
import { globalErrorHandler } from "./middleware/errors";

const app = express();

// middleware

app.use(express.json())
// app.use((req,res,next)=>globalErrorHandler(req,res,next))

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
