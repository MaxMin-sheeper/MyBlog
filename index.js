
const indexConfig = require('./config').indexConfig;
const router = require('./router');

const http = require('http');


http.createServer(function(req, res){
   
   router.getRouter(req, res);

}).listen(indexConfig.port);

console.log("-----------------------------------------------");
console.log("Listen at");
console.log("http:\/\/localhost:" + indexConfig.port);
console.log("-----------------------------------------------");