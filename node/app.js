// instantiate io handler
var express = require("express")
    , app = express()
    , fs = require("fs")

// ssl options
var options = {
  key: fs.readFileSync('/home/ubuntu/spicychai_cert/spicychai.key'),
  cert: fs.readFileSync('/home/ubuntu/spicychai_cert/2b6910ed4a20d0.crt')
};

var https = require("https").createServer(options, app)
    , http = require("http").createServer(app)
    , io = require("socket.io").listen(https)

https.listen(443)
http.listen(80)

// crypto modules
var crypto = require("crypto")
    , shasum = crypto.createHash("sha1");

// define static pages
app.use(express.static("/home/ubuntu/spicychai/www"));

// add cross domain policy xml file
app.get( "/crossdomain.xml", function ( req, res ) {
    var xml = '<?xml version="1.0"?>\n<!DOCTYPE cross-domain-policy SYSTEM' +
            ' "http://www.macromedia.com/xml/dtds/cross-domain-policy.dtd">\n<cross-domain-policy>\n';
    xml += '<allow-access-from domain="*" to-ports="*"/>\n';
    xml += '</cross-domain-policy>\n';

    req.setEncoding('utf8');
    res.writeHead( 200, {'Content-Type': 'text/xml'} );
    res.end( xml );
});

io.set('log level', 1);

// define socket communication
io.sockets.on('connection',function(socket){
   
    socket.on("join", function(data, fn) {
        console.log("joining room:" + data);
        socket.join(data);
        fn({"joined" : data});
    });
 
    socket.on("send_msg", function(data) {
        console.log('broadcasting to:' + data["path"]);
        io.sockets.in(data["path"]).emit("messages", data);
    });
});
