const pkg = require('read-pkg-up').sync().pkg;

const swaggerConfig = {
  swaggerDefinition: {
    info: {
      title: pkg.name,
      version: pkg.version,
      description: pkg.description
    },
    basePath: '/',
    produces: [
      'application/json'
    ]
  },
  // Todo: make this dynamic
  apis: [
    './src/config/swagger-definitions.js',
    './src/modules/api-docs/api-docs.routes.js',
    './src/modules/health-check/health-check.routes.js',
    './src/modules/user/log.routes.js'
  ]
};

module.exports = swaggerConfig;
