
require('dotenv').config();
const mongoose = require('mongoose');
require('./models/Registration');
console.log('starting connectin')
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
mongoose.connection
    .on('connected', () => {
        console.log(`Mongoose connection open on ${process.env.DATABASE}`);
    })
    .on('error', (err) => {
        console.log(`Connection error: ${err.message}`)
    });


require('./models/Registration');
const app = require('./app');
const server = app.listen(3000, () => {
    console.log(`Express is listening to port${server.address().port}`)
});