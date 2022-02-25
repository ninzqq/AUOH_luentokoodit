let socket = io();

socket.on("server-to-client", (message) => {
    const messages = document.getElementById("messages");
    messages.innerHTML += message + "<br>";

    console.log(message);
});

socket.on("server-to-client-nbr-connections", (nbr_connections) => {
    const number_of_connections = document.getElementById("number_of_connections");
    number_of_connections.innerHTML = "Users: " + nbr_connections;
});

const send_message = () => {
    const username = document.getElementById("username");
    const message_input = document.getElementById("message_input");
    if (username != "" && message_input != "") {
        socket.emit("client-to-server", username.value, message_input.value);
        message_input.value = "";
    }
};