// Este archivo va a contener las instrucciones que inicializan el proyecto de Firebase.
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4LK_q9_KbxdZmE8w1GVWGszXrFVj63sQ",
  authDomain: "dv-cwm-2023-2-t.firebaseapp.com",
  projectId: "dv-cwm-2023-2-t",
  storageBucket: "dv-cwm-2023-2-t.appspot.com",
  messagingSenderId: "458056776259",
  appId: "1:458056776259:web:fe7e49b60364a11ca1b2f6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Inicializamos Firestore.
export const db = getFirestore(app);

// Inicializamos Auth.
export const auth = getAuth(app);