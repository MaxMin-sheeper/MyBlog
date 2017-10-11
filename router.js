
const url = require('url');
const DNSserver = require('./src/controller/DNSserver.js');
const Staticfiels = require('./src/controller/Staticfiels.js');

exports.getRouter = function (req, res) {
    const pathname = url.parse(req.url).pathname;

    switch (pathname) {
        case '/dns':
          DNSserver.parse(req, res);
        break;
        case '':
        case '/':
        case '/index':
          Staticfiels.index(req, res);
        break;
        case '/post/img':
          
        default:
         Staticfiels.loadfiels(req, res, pathname);
    }
}
module.exports = exports;