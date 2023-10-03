/*
Formato para los mensajes privados de chat.
[C] => Collection
[D] => Document

[C] private-chat {
    [D] idAuto {
        users: {
            idUser1: true,
            idUser2: true,
        }

        [C] messages {
            [D] idAuto {
                userId: idUser1,
                message: ...,
                created_at: Timestamp,
            }
            ...
        }
    }
}

Según podemos ver, la idea va a ser tener una collection de "private-chats", donde cada documento represente una conversación privada.
Dentro de ese documento, vamos a guardar los ids de los usuarios como un mapa cuyas claves van a ser los ids, y los valores serán siempre true.
Finalmente, los messages en sí los guardamos como una subcollection.
*/
import { addDoc, collection, doc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

export async function sendPrivateChatMessage({
    sender,
    receiver,
    message,
}) {
    // Vamos a crear un mensaje en la collection.
    // Inicialmente, el documento para este chat no existe, así que lo creamos.
    const document = await addDoc(collection(db, `private-chats`), {
        users: {
            [sender]: true,
            [receiver]: true,
        }
    });

    // Ahora que tenemos el id del documento del chat privado, podemos agregar el mensaje de chat.
    const messagesRef = collection(db, `private-chats/${document.id}/messages`);
    const response = await addDoc(messagesRef, {
        userId: sender,
        message,
        created_at: serverTimestamp(),
    });
    return {
        id: response.id,
    }
}