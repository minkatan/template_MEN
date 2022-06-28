const errorHandler = (error, req, res, next) => {
    // if status code are defined use the status code else use 500
    const statusCode = res.statusCode ? res.statusCode : 500
    res.status(statusCode)
    res.json({
        message: error.message,
        stack: process.env.NODE_ENV === 'production' ? null : error.stack,
    })
}

module.exports = {errorHandler}  