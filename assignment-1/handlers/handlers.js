const helloHandler = require('./hello');
const defaultHandler = require('./defaultHandler');

const handlers = {
    hello: helloHandler,
    default: defaultHandler
};

module.exports = handlers;
