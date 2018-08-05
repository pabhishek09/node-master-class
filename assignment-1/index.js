const http = require('http');
const { StringDecoder } = require('string_decoder');
const url = require('url');
const config = require('./config');
const handlers = require('./handlers/handlers');

const server = http.createServer((request, response) => {
    // Parse the URL
    const parsedUrl = url.parse(request.url, true);
    // Get the path
    const path = parsedUrl.pathname;
    // Trim the path
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    // Get method request
    const method = request.method.toLowerCase();
    // Get Query Params
    const queryParams = parsedUrl.query;
    // Get headers
    const headers = request.headers;
    // Handle response events and construct request payload
    const decoder = new StringDecoder('utf-8');
    let payload = '';
    request.on('data', (data) => {
        payload += decoder.write(data);
    })
    request.on('end', () => {
        payload += decoder.end();
        const requestData = {
            path: trimmedPath,
            method: method,
            headers: headers,
            queryParams: queryParams,
            payload: payload
        };
        const isHandlerDefined = typeof(handlers[trimmedPath]) === 'function';
        const requestHandler = isHandlerDefined ? handlers[trimmedPath] : handlers.default;
        requestHandler(requestData, (statusCode, payload) => {
            let responseStatusCode;
            let responsePayload;
            if (isHandlerDefined) {
                responseStatusCode = (typeof(statusCode) === 'number') ? statusCode : 200;
                responsePayload = (typeof(payload) === 'object') ? payload : {};
            } else {
                responseStatusCode = 404;
                responsePayload = '';
            }
            response.setHeader('content-type', 'application/json');
            response.writeHead(responseStatusCode);
            response.end(JSON.stringify(responsePayload));
        })
    })
})



server.listen(config.port, () => {
    console.log(`${config.env} server is listening on port ${config.port}`);
})
