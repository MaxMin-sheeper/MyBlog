/**
 * DNS解析
 */
const url = require('url');
const querystring = require('querystring');
const dns = require('dns');

const util = require('../utile/utile.js');

/**
 * @param req
 * @param res
 */

exports.parse = function(req, res){
    const query_url = url.parse(req.url);
    const query = querystring.parse(query_url.query);
    dns.resolve4(query['hostname'], function(err, addresses){
       console.log(err,typeof(addresses));
       if(err){
          util.errorHandle(err, 'DNS failed');
          res.writeHead(400);
          res.end();
       } else {
          res.writeHead(200);
          res.end(addresses.toString());
       }
    });
}

module.exports = exports;