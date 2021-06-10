const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api/', proxy({
            //target: 'http://3.37.87.98:8080/',
            target: 'http://127.0.0.1:8080/',
            changeOrigin: true,
        })
    );
    
};