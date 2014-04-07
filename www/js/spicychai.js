var spicy_socket = io.connect("https://spicychai.com");

spicy_socket.on('msg_' + window.location.host, function(data) {
    spicychai_push_msg(data);
});

function spicychai_push_msg(data) {
    toastr.info(data["payload"], data["name"]);
}

function spicychai_send_msg() {
    data = {};
    data["path"] = window.location.host;
    data["msg"] = $("#spicychai_chat_input").val();
    spicy_socket.emit("send_msg", data);
}

function start_spicy_chai() {

    $(document).ready(function() {
        $('head').append("<script type='text/javascript' src='//cdnjs.cloudflare.com/ajax/libs/toastr.js/2.0.1/js/toastr.js'>");
        $('head').append('<link rel="stylesheet" type="text/css" href="//cdnjs.cloudflare.com/ajax/libs/toastr.js/2.0.1/css/toastr.min.css">');
        $("body").append("<div id='spicychai_container'></div>");
        spicychai_inject_div();
    });

}

function spicychai_chat_window() {
    chat_div = "<div id='spicychai_chat_div'>";
    chat_div += "<input type='text' id='spicychai_chat_input' placeholder='Enter your chat message here'/>";
    chat_div += "</div>";
    return chat_div;
}

function spicychai_msg_window() {
    msg_div = "<div id='spicychai_msg_div'></div>";
    return msg_div;
}

function spicychai_inject_div() {
    $("#spicychai_container").append(spicychai_chat_window());
    $("#spicychai_chat_input").bind("keypress", function(e) {
        if(e.keyCode == 13) { 
            spicychai_send_msg();
            spicychai_push_msg($("#spicychai_chat_input").val());
            $("#spicychai_chat_input").val("");
        }
    });
    $("#spicychai_chai_input").focus( function() {
        $("#spicychai_chat_input").val("");
    });

    data = {};
    data["info"] = window.location;
    spicy_socket.emit("announce", data, function(msg) {
        console.log(msg);
    });
}

