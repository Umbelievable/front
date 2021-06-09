const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api/', proxy({
            target: 'http://3.37.87.98:8080/',
            changeOrigin: true,
        })
    );
    app.use(
        '/rec/', proxy({
            Headers:{'Access-Control-Allow-Origin' : '*'},
            target: 'http://3.37.87.98:5000/',
            changeOrigin: true,
        })
    );
};