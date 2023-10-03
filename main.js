// Manejo de las rutas de importación con Vite/npm
// Cuando usamos un ecosistema de paquetes de npm, y herraminetas que lo
// soporten (como Vite), tenemos que tener cuidado en cómo escribimos las
// rutas.
// Por defecto, todo lo que se busca en las rutas son paquetes de npm que
// existan en la carpeta node_modules. SALVO que sean rutas absolutas, o
// rutas relativas que empiecen con "./" o "../".
// Es decir, si yo escribo un import:
//  import {db} from './src/services/firebase.js';
// Vite/JS sabe que es un archivo local de mi proyecto, que tiene que buscar
// a partir de esa ruta relativa.
// Si en cambio, el import fuese (noten que falta el ./ delante):
//  import {db} from 'src/services/firebase.js';
// Entonces Vite/JS van a buscar un paquete de npm llamado "src" en la carpeta
// node_modules, que tenga la subcarpeta services con el archivo firebase.js.
// import { chatSaveMessage, chatSubscribeToMessages } from "./src/services/chat.js";

// /**** Manejando el form ****/
// const chatForm = document.getElementById('chat-form');
// const user = document.getElementById('user');
// const message = document.getElementById('message');

// chatForm.addEventListener('submit', function(ev) {
//     ev.preventDefault();

//     const data = {
//         user: user.value,
//         message: message.value
//     }

//     chatSaveMessage(data)
//         .then(() => {
//             // user.value = "";
//             message.value = "";
//         });
// });

// const salida = document.getElementById('salida');

// chatSubscribeToMessages(messages => {
//     // messages queremos que sea un array de objetos que tengan el formato:
//     /*
//     {
//         user: '',
//         message: '',
//     }
//     */
//     salida.innerHTML = messages.map(message => `<div>
//       <div><b>Usuario:</b> ${message.user}</div>
//       <div><b>Mensaje:</b> ${message.message}</div>
//     </div>`).join('');
// });

import "./src/main.css";
// Versión con Vue
import { createApp } from "vue";
import App from "./src/App.vue";
import router from "./src/router/router";

const app = createApp(App);

app.use(router);

app.mount('#app');