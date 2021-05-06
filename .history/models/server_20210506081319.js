const express = require('express');
const cors = require('cors');

class Server {

     constructor() {
          this.app    = express();   // <== create the express app as a property in the same server class
          this.port   = process.env.PORT;
          this.server = require('http').createServer(this.app);
          this.io     = require('socket.io')(this.server);  // <== Informacion de tu socket conectado 

          this.paths = {}; 

          // Middlewares(functions that will add other functions to the server);
          this.middleware();
          
          // Paths of my application
          this.routes();  // <== will trigger the router method

          // Sockets
          this.sockets();
     }

     middleware() {    // { .use } <== keyword to indicate that it is a middleware

          // CORS
          this.app.use( cors() );

          // public directory
          this.app.use( express.static('public') );
          
     }

     routes() {
          // direction to the routes
          // this.app.use( this.paths.auth,  require('../routers/auth'));
     }

     sockets() {
          this.io.on("connection", socket => {
               console.log('Cliente Conectado', socket.id );
               // Desconectar al cliente
               socket.on('disconnect', () => {
                    console.log('Cliente desconectado', socket.id);
               });

               socket.on('enviar-mensaje', ( payload ) => {
                    // Lo que recibas mandaras como payload a la emisión ( a todos los clientes conectados )
                    this.io.emit( 'enviar-mensaje', 'Desde el server' )
               });
          })    
     }

     listen() {
          this.server.listen(this.port, () => {
               console.log('Servidor corriendo en puerto', this.port);
          });
     }
}

module.exports = Server;