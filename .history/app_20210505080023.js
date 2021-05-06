require('dotenv').config();  // <== se require para utilizar el puerto necesario 

const Server = require("./models/server");

const server = new Server();

server.listen();