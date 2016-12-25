const AppServer = require('./app-server');

const config = {
  PORT: process.env.PORT || 3004
};

const appServer = new AppServer(config);
appServer.start();
