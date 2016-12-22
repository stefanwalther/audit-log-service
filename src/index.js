const AppServer = require('./app-server');

const config = {
  API_PORT: process.env.API_PORT || 3004
};

const appServer = new AppServer(config);
appServer.start();
