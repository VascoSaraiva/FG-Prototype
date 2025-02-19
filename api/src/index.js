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