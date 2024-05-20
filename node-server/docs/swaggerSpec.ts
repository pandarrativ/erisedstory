import swaggerJsdoc from 'swagger-jsdoc';
import path from 'path';

const PORT = process.env.PORT;

const options: swaggerJsdoc.Options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Pandarrativ',
      version: '1.0.0',
      description: 'API Documentation',
    },
    servers: [
      {
        url: `http://localhost:${PORT}/user`,
        description: 'Dev Server',
      },
    ],
  },
  apis: [path.resolve(__dirname, 'apis.yaml')],
};

export const swaggerSpec = swaggerJsdoc(options);