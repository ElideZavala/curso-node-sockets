const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileUpload');

const { dbConnection } = require('../database/config');

class Server {

     constructor() {
          this.app = express();   // <== create the express app as a property in the same server class
          this.port = process.env.PORT;

          this.paths = {
               auth:       '/api/auth',
               buscar:     '/api/buscar',
               categorias: '/api/categorias',
               productos:  '/api/productos', 
               usuarios:   '/api/usuarios',
               uploads:    '/api/uploads',
          }

          // Connect to database
          this.conectarDB();

          // Middlewares(functions that will add other functions to the server);
          this.middleware();
          
          // Paths of my application
          this.routes();  // <== will trigger the router method
     }

     async conectarDB() {
          await dbConnection();
     }

     middleware() {    // { .use } <== keyword to indicate that it is a middleware

          // CORS
          this.app.use( cors() );

          // Lectura y parseo del body
          this.app.use( express.json() )

          // public directory
          this.app.use( express.static('public') );

          // Manejar Fileupload - Carga de archivos 
          this.app.use( fileUpload({
               useTempFiles : true,
               tempFileDir : '/tmp/',
               createParentPath: true   // <== faltaba por lo que marco error
           }));
     }

     routes() {
          // direction to the routes
          this.app.use( this.paths.auth,  require('../routers/auth'));
          this.app.use( this.paths.buscar,require('../routers/buscar'));
          this.app.use( this.paths.categorias,require('../routers/categorias'));
          this.app.use( this.paths.usuarios,  require('../routers/usuarios'));
          this.app.use( this.paths.productos, require('../routers/productos'));
          this.app.use( this.paths.uploads, require('../routers/uploads'));
     }

     listen() {
          this.app.listen(this.port, () => {
               console.log('Servidor corriendo en puerto', this.port);
          });
     }
}

module.exports = Server;