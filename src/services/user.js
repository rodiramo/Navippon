import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

/**
 * 
 * @param {string} id 
 * @returns {{id: string, email: string}}
 */
export async function getUserProfileById(id) {
    const snapshot = await getDoc(doc(db, `/users/${id}`));
    return {
        id,
        email: snapshot.data().email,
    }
}

/**
 * Crea un perfil de usuario.
 * 
 * @param {string} id 
 * @param {{}} data 
 * @returns {Promise}
 */
export async function createUserProfile(id, data) {
    // Firestore organiza sus documentos y collections con un formato de URL que podemos utilizar para definir lo que quiero referenciar.
    const userRef = doc(db, `/users/${id}`);
    return setDoc(userRef, data);
}