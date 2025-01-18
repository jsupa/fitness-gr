import swaggerJsdoc from 'swagger-jsdoc'

const swaggerOptions = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.router.ts'],
}

const swaggerDocs = swaggerJsdoc(swaggerOptions)

export default swaggerDocs
