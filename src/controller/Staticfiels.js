/**
 * get static files
 */
const fs = require('fs');
const path = require('path');
const util = require('../utile/utile.js');
/**
 * read Fiels
 * @param req
 * @param res
 * @param pathname
 */

const readStaticFiles = function(req, res, filename){
  fs.readFile(filename, function(err, data){
     if(err){
       util.errorHandle(err, 'filed readFile');
       res.writeHead(404);
       res.end('We Got A Problem: File Not Found');
     } else {
         res.writeHead(200);
         res.end(data);
     }
  })
} 

/**
 * exports function of reading files
 */
exports.loadfiels = function(req, res, pathname){
  const filename = path.join('../../static', pathname);
  readStaticFiles(req, res, filename);
}

module.exports = exports;

/**
 * exports function of getting default page
 */
exports.index = function(req, res){
    const filename = path.join('../../static', 'html/index.html');
    readStaticFiles(req, res, filename);
}