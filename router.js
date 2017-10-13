
const url = require('url');
const DNSserver = require('./src/controller/DNSserver.js');
const Staticfiels = require('./src/controller/Staticfiels.js');
const SaveImg = require('./src/controller/Saveimg.js')

exports.getRouter = function (req, res) {
    console.log(url.parse(req.url));
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
          SaveImg.saveimg (req, res);
        break;
        default:
         Staticfiels.loadfiels(req, res, pathname);
    }
}
module.exports = exports;