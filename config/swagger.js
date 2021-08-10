export default {
  swaggerDefinition: {
    info: {
      title: "ScavengerAR API Documentation",
      version: process.env.npm_package_version,
    },
    basePath: "/",
    securityDefinitions: {
      bearerAuth: {
        type: "apiKey",
        name: "Authorization",
        scheme: "bearer",
        in: "header",
      },
    },
  },
  apis: ["./routes/*.js"],
};
