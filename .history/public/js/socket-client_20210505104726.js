// Toda la configuracion y comunicacion que se va a tener con los web socket con mi servidor

// Referencias del HTML
const lblOnline  = document.querySelector('#lblOnline');      
const lblOffline = document.querySelector('#lblOffline');
const txtMensaje = document.querySelector('#txtMensaje');
const btnEnviar  = document.querySelector('#btnEnviar');

const socket = io();  // el io es lo que viene en "./socket.io/socket.io.js"

// el .on es para esta escuchando un evento 
socket.on('connect', () => {
     console.log('Conectado');

     lblOffline.style.display = 'none';
     lblOnline.style.display = '';
});

socket.on('disconnect', () => {
     console.log('Desconectado del servidor');

     lblOnline.style.display = 'none';
     lblOffline.style.display = '';
});

btnEnviar.addEventListener( 'click', () => {

     const mensaje = txtMensaje.value;
     const payload = {
          mensaje,
          id: '123abc',
          fecha: new Date().getTime()
     }


     // .emit es para emitir un evento
     socket.emit( 'enviar-mensaje', payload );

})

