import swaggerJsDoc from "swagger-jsdoc";
import { koaSwagger } from "koa2-swagger-ui";
import path from "path";

export const createSwagger = (PORT: string | number) => {
  const swaggerSpec = swaggerJsDoc({
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Chatbot API",
        version: "1.0.0",
        description: "Chatbot API Documentation",
      },
      servers: [
        {
          url: `http://localhost:${PORT}`,
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
    apis: [path.resolve(__dirname, "./routes/*.ts")],
  });

  return koaSwagger({
    routePrefix: "/docs",
    swaggerOptions: {
      spec: swaggerSpec as Record<string, unknown>,
    },
  });
};
