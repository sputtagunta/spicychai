var app = require('http').createServer(handler).listen(80);
var io = require('socket.io').listen(app);

function handler(req,res){
    console.log(req.url);
    res.writeHead(200, {'Content-Type':'text/plain'});
    res.end('Hello Node\n You are really really awesome!');
}

io.sockets.on('connection',function(socket){
    
});
