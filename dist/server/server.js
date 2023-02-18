"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const path = require("path");
const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.get("/", function (req, res) {
    res.render("index");
});
//initialize a simple http server
const server = http.createServer(app);
//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });
wss.on("connection", (ws) => {
    //connection is up, let's add a simple simple event
    ws.on("message", (message) => {
        //log the received message and send it back to the client
        console.log("received: %s", message);
        wss.clients.forEach(function (client) {
            client.send(`${message}`);
        });
    });
});
//start our server
server.listen(8080, () => {
    console.log("Server listening on PORT", 8080);
});
//# sourceMappingURL=server.js.map