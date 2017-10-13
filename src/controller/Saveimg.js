const querystring = require('querystring');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const utile = require('../utile/utile.js');


const hash = crypto.createHmac('sha256', 'maxmin');
/**
 * opetion to get
 */
function getHandle(req, res) {
    res.writeHead(200, { 'content': 'text/html' });
    res.end(
        '<form action="/upload" enctype="multipart/form-data" method="post">' +
        '<input type="file" name="upload" multiple="multiple" />' +
        '<input type="submit" value="Upload" />' +
        '</form>'
    );
}

/**
 * option to generate randomString
 */
function randomImgString(filename){
    let outString = new Date().toTimeString();
    outString += filename.substring(0, filename.indexOf('.'));
    outString = hash.update(outString)
                    .digest('hex').substring(0, 15);
    return outString;
}

/**
 * option to post
 */
function postHandle(req, res) {
    req.setEncoding('binary');
    let body = '';
    let filename = '';

    req.on('data', function (chunk) {
        body += chunk;
    });

    req.on('end', function () {
        const boundary = req.headers['content-type'].split(';')[1].replace('boundary=', '');
        console.log(boundary);
        const file = querystring.parse(body, '\r\n', ':');
        if (file['Content-Type'].indexOf('image') !== -1) {
            const fileAr = file['Content-Disposition'].split('; ')[2].replace('filename=', '').split('.');
            let filename = fileAr[0];
            const imageState = fileAr[1].substring(0, fileAr[1].length-1);
            const entireData = body.toString();

            const contentType = file['Content-Type'].substring(1);
            const upperBound = entireData.indexOf(contentType) + contentType.length;
            const tarStr = entireData.substring(upperBound).trim();
            const boundaryIndex = tarStr.length - boundary.length - 4;
            const binaryData = tarStr.substring(0, boundaryIndex);

            //重新设置文件名称
            filename = randomImgString(filename);

                fs.writeFile(path.join(__dirname, `../../img/${filename}.${imageState}`), binaryData, { encoding: 'binary' }, (err) => {
                    if (err) {
                        utile.errorHandle(err, 'failed write file');
                    } else {
                        res.writeHead(200, {
                            'Content-Type': 'application/json'
                        });
                        const data = JSON.stringify({
                            'url':`http://127.0.0.1:3000/${filename}.${imageState}`
                        })
                        console.log(data);
                        res.write(data);
                        res.end();
                    }
                });
        }
    })
}

exports.saveimg = function (req, res) {
    if (req.method.toLowerCase() === 'get') {
        getHandle(req, res);
    } else if (req.method.toLowerCase() === 'post') {
        postHandle(req, res);
    }
}

module.exports = exports;