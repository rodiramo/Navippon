// Este servicio va a ofrecer las funciones para manejar la data del chat.
import { db } from "./firebase";
import { addDoc, collection, orderBy, onSnapshot, query, serverTimestamp } from "firebase/firestore";

const refChat = collection(db, 'chat');

export function chatSaveMessage(data) {
    /*
    Para grabar, usamos la función addDoc(), que crea un nuevo
    documento con un id autogenerado.
    Recibe como primer argumento la referencia a la collection,
    y como segundo el objeto que queremos grabar.
    Retorna una promesa que se resuelve cuando la grabación se
    completó.
    */
    // Agregamos en los datos que se guarde la fecha y hora del servidor, usando la función serverTimestamp de Firestore.
    return addDoc(refChat, {
        ...data, 
        created_at: serverTimestamp(),
    });
}

export function chatSubscribeToMessages(callback) {
    /**** Leyendo de Firestore ****/
    /*
    Con getDocs nosotros podíamos leer el contenido completo de una
    collection, pero solo una vez.
    ¿Qué pasa si queremos poder obtener updates en tiempo real de los 
    datos de la collection? Es decir, si queremos que se nos informe 
    cada vez que algo cambie.
    Es bastante simple, tenemos que hacer 2 cambios.
    El primero, es la función. En vez de usar getDocs() vamos a usar
    otra función que se llama onSnapshot().
    Lo segundo, es que esta función no retorna una promesa, sino que
    necesita que le pasemos como segundo parámetro un callback con lo
    que queremos que haga cada vez que lleguen nuevos datos.
    */
    
    // Vamos a escuchar los mensajes para transformarlos en un array de objetos que contengan solamente la data del mensaje de chat.
    // Una vez creado ese array, se lo vamos a pasar a la función del callback que recibimos como argumento.

    /*
    Vamos a traer los mensajes ordenados por la fecha de creación que tenemos en el campo "created_at".
    Cuando queremos aplicar algún tipo de filtro al a consulta, ya sea condicionar qué resultados traemos, su orden o limitar cuántos traer, tenemos que armar un "query" con la función "query()".
    Esta función recibe al menos 2 parámetros:
    1. La referencia a alguna collection. Que es en la que queremos consultar.
    2. Una (o más) de las funciones que configuran la consulta. Por ejemplo, orderBy(), where() o limit().

    Esa consulta la vamos a poder usar en cualquiera de las funciones que esperan recibir una referencia de una collection para traer datos, como onSnapshot.
    */
    const q = query(refChat, orderBy('created_at'));
    return onSnapshot(q, snapshot => {
        // console.log(snapshot.docs);
        const messages = snapshot.docs.map(doc => {
            return {
                userId: doc.data().userId,
                user: doc.data().user,
                message: doc.data().message,
                created_at: doc.data().created_at.toDate(),
            }
        });
        // console.log("Mensajes transformados: ", messages);
        callback(messages);
    });
}