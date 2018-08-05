module.exports = defaultHandler = (requestData, callback) => {
    callback(404, {message: 'No request handlers found'})
}
