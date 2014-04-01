var https = require('https');
var fs = require('fs');

var options = {
  key: fs.readFileSync('/home/ubuntu/spicychai_cert/spicychai.key'),
  cert: fs.readFileSync('/home/ubuntu/spicychai_cert/2b6910ed4a20d0.crt')
};

var app = https.createServer(options, handler).listen(9090);
var io = require('socket.io').listen(app);

io.set('log level', 1);

function handler(req,res){
    console.log(req.url);
    res.writeHead(200, {'Content-Type':'text/plain'});
    res.end('');
}

io.sockets.on('connection',function(socket){
    console.log(socket.id);
    socket.on("send_msg", function(data) {
        console.log("received msg: " + data);
        socket.broadcast.emit("msg_" + data["path"], data["msg"]);
    });
});

