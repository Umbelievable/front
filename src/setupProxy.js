const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api/', proxy({
            target: 'http://3.37.87.98:8080/',
            //target: 'http://0.0.0.0:8080/',
            changeOrigin: true,
        })
    );
    
};