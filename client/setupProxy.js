const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(createProxyMiddleware('/api/', // replace with your endpoint
        { target: 'https://louonsapptest.herokuapp.com/louons/api/v1/' } // replace with your target
    ));
}