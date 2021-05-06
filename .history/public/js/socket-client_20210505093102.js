// Toda la configuracion y comunicacion que se va a tener con los web socket con mi servidor

// Referencias del HTML
const lblOnline  = document.querySelector('#lblOnline');      
const lblOffline = document.querySelector('#lblOffline');

const socket = io();  // el io es lo que viene en "./socket.io/socket.io.js"

// el .on es para esta escuchando un evento 
socket.on('connect', () => {
     console.log('Conectado');
});

socket.on('disconnect', () => {
     console.log('Desconectado del servidor');
});
