const app = require('./app');

const server = app.listen(3000, () => {
    console.log(`Express is listening to port${server.address().port}`)
});