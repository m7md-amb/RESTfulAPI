import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'This is the API documentation for the Order System',
    },
    servers: [
      {
        url:'http://localhost:5000',
        description: 'Development Server',
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

let spec;
try {
  spec = swaggerJSDoc(options);
} catch (error) {
  console.error('Error generating Swagger spec:', error.message);
  spec = {}; // Ensure spec is always defined
}

export const swaggerServe = swaggerUi.serve;
export const swaggerSetup = (req, res, next) => {
  if (!spec || Object.keys(spec).length === 0) {
    return res.status(500).json({ message: 'Swagger documentation failed to load' });
  }
  return swaggerUi.setup(spec)(req, res, next);
};
