const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

// Swagger options
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Task Manager API",
            version: "1.0.0",
            description: "A simple Task Manager API with authentication and role-based access"
        },
        servers: [
            {
                url: "http://localhost:5000/api", // Base URL for all endpoints
                description: "Local server"
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        },
        security: [
            {
                bearerAuth: []
            }
        ]
    },
    // Use glob pattern to include all JS files in routes folder
    apis: [path.join(__dirname, "../routes/*.js")]
};

const swaggerSpec = swaggerJsdoc(options);

function setupSwagger(app) {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log("Swagger docs available at http://localhost:5000/api-docs");
}

module.exports = setupSwagger;