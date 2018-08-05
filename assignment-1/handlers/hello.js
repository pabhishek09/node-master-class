module.exports = helloHandler = (requestData, callback) => {
    const method = requestData['method'];
    if (method === 'get') {
        getHello(requestData, callback)
    } else if (method === 'post') {
        postHello(requestData, callback)
    }
}

function getHello(requestData, callback) {
    callback(200, { 
        queryParams: requestData['queryParams'],
        message: 'Hello' 
    })
}

function postHello(requestData, callback) {
    callback(200, {
        queryParams: requestData['queryParams'],
        payload: requestData['payload'],
        message: 'Hello'
    })
}
