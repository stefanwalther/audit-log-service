const routesConfig = require('./../routes-config');

module.exports = {
  configure: app => {
    // Todo: refactor
    app.use(routesConfig);
  }
};
