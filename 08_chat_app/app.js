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

const broadcast_n_clients = () => {
    for (let id in connections) {
        const socket = connections[id];
        socket.emit("server-to-client-nbr-connections", number_of_connections);
    }
}

io.on('connection', (socket) => {
    connections[socket.id] = socket;
    number_of_connections++;

    let iterator = messagelist.values();
    for(let single_message of iterator){
        socket.emit("server-to-client", single_message);
    }

    broadcast_n_clients();
    console.log('Client connected. Number of open connections: ', number_of_connections);

    socket.on('disconnect', (socket) => {
        delete connections[socket.id];
        number_of_connections--;
        broadcast_n_clients();
        console.log('Client disconnected. Number of open connections: ', number_of_connections);
    });

    socket.on("client-to-server", (username, message) => {
        messagelist.push(username + ": " + message);
        broadcast_message(username + ": " + message);
        console.log(username + ": " + message);
    });

});


app.use(express.static("public"));


server.listen(PORT);

