/*
Acá va a estar toda la funcionalidad relativa a la autenticación en la aplicación.

Esto va a incluir una función para poder recibir los
datos del estado de autenticación, incluyendo 
notificaciones de cuándo esos datos cambien.

Para lograrlo, vamos a primero guardar en una variable
interna los datos de la autenticación.
A continuación, vamos a implementar el patrón "Observer"
para proveer la interfaz para recibir los datos de la
autenticación.
El patrón de diseño "Observer" se utiliza en los casos
donde existe un elemento (ej: un objeto), que se conoce 
como "subject" (sujeto, en español) que contiene 
información que puede cambiar con el tiempo. Y también
hay otros elementos (ej: otros objetos), conocidos como 
"observers", que están interesados en saber el valor de 
ese subject.
Este patrón se puede implementar con clases, o con
funciones que reciben un callback. Esto último es lo
que solemos hacer en JS.
La implementación requiere que el subject lleve un 
control de quiénes son los observers que están 
interesados en él.
Dicho de otra forma, los observers deben notificarle
inicialmente al subject que quieren ser a su vez
notificados del valor, y sus cambios, del subject.
Este proceso de pedir ser notificado de los cambios
de un subject se le suele llamar "suscripción" 
(subscribe) o "escuchar" (listen).
*/
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { auth } from "./firebase"
import { createUserProfile } from "./user";

let userData = {
    id: null,
    email: null,
}
let observers = [];

// Verificamos si hay datos en localStorage sobre el estado de autenticación.
if(localStorage.getItem('userData')) {
    userData = JSON.parse(localStorage.getItem('userData'));
}

onAuthStateChanged(auth, user => {
    if(user) {
        userData = {
            id: user.uid,
            email: user.email,
        }
    } else {
        userData = {
            id: null,
            email: null,
        }
    }
    // Actualizamos localStorage.
    localStorage.setItem('userData', JSON.stringify(userData));
    notifyAll();
});

/**
 * Crea una cuenta de usuario.
 * 
 * @param {{email: string, password: string}} user
 * @returns {Promise}
 */
export async function register({email, password}) {
    try {
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);

        // Creamos el perfil del usuario en Firestore.
        createUserProfile(userCredentials.user.uid, {
            email
        });

        return {...userData};
    } catch (error) {
        return {
            code: error.code,
            message: error.message
        }
    }
}

/**
 * Inicia sesión en el proyecto.
 * 
 * @param {{email: string, password: string}} user
 * @returns {Promise}
 */
export function login({email, password}) {
// export function login(user) {
//     const {email, password} = user;
    // const email = user.email;
    // const password = user.password;

    return signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            // userData = {
            //     id: userCredentials.user.uid,
            //     email: userCredentials.user.email,
            // }
            // Como modificamos el contenido de userData, pedimos notificar a todos los observers.
            // notifyAll();
            // console.log("[auth.js login] Autenticación exitosa: ", userData);
            return userData;
        })
        .catch(error => {
            const output = {
                message: error.message,
                code: error.code,
            }
            console.error("[auth.js login] Error al autenticar: ", output);
            return output;
        });
}

/**
 * 
 * @returns {Promise}
 */
export function logout() {
    // userData = {
    //     id: null,
    //     email: null,
    // }
    // notifyAll();
    return signOut(auth);
}

/**
 * Agrega el observer para ser notificado de los datos.
 * 
 * @param {({id: string, email: string}) => void} callback 
 * @returns {() => void} Función para cancelar la suscripción.
 */
export function subscribeToAuth(callback) {
    // Agregamos el nuevo observer/callback al stack de
    // observers.
    observers.push(callback);

    // Además, vamos a pasarle inmediatamente los datos
    // actuales del objeto.
    notify(callback);

    // Retornamos la función para cancelar la suscripción, que filtra el callback que acabamos de agregar del array.
    return () => {
        observers = observers.filter(obs => obs !== callback)
    };
}

function notify(callback) {
    callback({
        ...userData,
    });
}

function notifyAll() {
    observers.forEach(callback => notify(callback));
}