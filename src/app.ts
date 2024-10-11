import swaggerUi from "swagger-ui-express";
import express, { urlencoded, type NextFunction } from "express";
import swaggerSpec from "./config/swagger";

const app = express();

// middleware

app.use(express.json());
app.use(urlencoded({ extended: true }));
// app.use((req,res,next)=>globalErrorHandler(req,res,next))

// Swagger UI route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /:
 * get:
 * summary: hello
 * description: hello description api
 */
app.get("/", (_req, res) => {
  res.send("Hello World!");
});

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Retrieve a list of users
 *     description: Retrieve a list of users from the system.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: John Doe
 */
app.get("/users", (_req, res) => {
  const users = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Doe" },
  ];
  res.json(users); // Directly sending response, no need to return Response
});

export default app;
