import swaggerJsdoc from "swagger-jsdoc";
import EnvConfig from "./EnvConfig";

// Swagger definition object
const swaggerOptions = {
  definition: {
    openapi: "3.0.0", // Specify the OpenAPI version
    info: {
      title: "Express API Documentation",
      version: "1.0.0",
      description: "API documentation for my Express.js project",
    },
    servers: [
      {
        url: `http://localhost:${EnvConfig.PORT}`, // Replace with your server URL
      },
    ],
  },
  apis: ["./src/routes/*.ts", "./src/models/*.ts", "./src/*.ts"], // Path to your API docs (where your JSDoc comments are)
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec;
