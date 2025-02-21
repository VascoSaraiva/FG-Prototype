const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config/config');

let server;

mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
    console.log('Connected to MongoDB')
    server = app.listen(config.port, () => {
        console.log(`App listening on port ${config.port}`)
    })
})

const exitHandler = () => {
    if (server) {
      server.close(() => {
        console.log('Server closed');
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  };
  
  const unexpectedErrorHandler = (error) => {
    console.log(error);
    exitHandler();
  };
  
  process.on('uncaughtException', unexpectedErrorHandler);
  process.on('unhandledRejection', unexpectedErrorHandler);
