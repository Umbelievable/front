const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api/', proxy({
            target: 'http://54.180.2.178:8080/',
            changeOrigin: true,
        })
    );
    app.use(
        '/rec/', proxy({
            Headers:{'Access-Control-Allow-Origin' : '*'},
            target: 'http://0.0.0.0:5000/',
            changeOrigin: true,
        })
    );
};