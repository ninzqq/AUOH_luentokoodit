const express = require('express');
const app = express();
const server = require("http").createServer(app);
const io = require('socket.io')(server);

const PORT = process.env.PORT || 8081;


let connections = [];
let number_of_connections = 0;
let messagelist = [];

const broadcast_message = (message) => {
    for(let id in connections){
        const socket = connections[id];
        socket.emit("server-to-client", message);
    }
};

io.on('connection', (socket) => {
    connections[socket.id] = socket;
    number_of_connections++;

    let iterator = messagelist.values();
    for(let single_message of iterator){
        socket.emit("server-to-client", single_message);
    }

    console.log('Client connected. Number of open connections: ', number_of_connections);

    socket.on('disconnect', (socket) => {
        delete connections[socket.id];
        number_of_connections--;
        console.log('Client disconnected. Number of open connections: ', number_of_connections);
    });

    socket.on("client-to-server", (message) => {
        messagelist.push(message);
        broadcast_message(message);
        console.log(message);
        console.log(messagelist);
    });

});


app.use(express.static("public"));


server.listen(PORT);

