


const socketController = socket => {

     console.log( ' Cliente conectado', socket.id );
               
     // Desconectar al cliente
     socket.on('disconnect', () => {
          console.log('Cliente desconectado', socket.id);
     });
     // informacion
     socket.on('enviar-mensaje', ( payload, callback) => {

          const id = 12345543543;
          callback( {id, fecha: new Date().getTime()} );
          // Lo que recibas mandaras como payload a la emisión ( a todos los clientes conectados )

          socket.broadcast.emit( 'enviar-mensaje', payload );  // <== Envia el mensaje a todos con .broadcast 
     });
}

module.exports = {
     socketController
}