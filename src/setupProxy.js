const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api/', proxy({
            target: 'http://localhost:8080/',
            changeOrigin: true,
        })
    );
    app.use(
        '/rec/', proxy({
            Headers:{'Access-Control-Allow-Origin' : '*'},
            target: 'http://localhost:5000/',
            changeOrigin: true,
        })
    );
};