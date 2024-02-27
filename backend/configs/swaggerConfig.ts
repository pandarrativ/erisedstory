import swaggerJsdoc from "swagger-jsdoc";
import path from "path";

const options: swaggerJsdoc.Options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "ErisedStory",
      version: "1.0.0",
      description: "API Documentation",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Dev Server",
      },
    ],
  },
  apis: [path.resolve(__dirname, "../routes/*.ts")],
};

export const swaggerSpec = swaggerJsdoc(options);
