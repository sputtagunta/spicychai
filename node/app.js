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

app.use(express.static("/home/ubuntu/spicychai/www"));

io.sockets.on('connection',function(socket){
    console.log(socket.id);
    socket.on("send_msg", function(data) {
        console.log("received msg: " + data);
        socket.broadcast.emit("msg_" + data["path"], data["msg"]);
    });
});
