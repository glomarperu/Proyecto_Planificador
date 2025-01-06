import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA6g1dO1Tv4VNCvY_gY5pYdddYA2t4HQ9Y",
  authDomain: "proyectoplan-26acc.firebaseapp.com",
  projectId: "proyectoplan-26acc",
  storageBucket: "proyectoplan-26acc.firebasestorage.app",
  messagingSenderId: "962720671484",
  appId: "1:962720671484:web:ed5c9a476a3c7fde785979",
};
// Inicializa Firebase solo si no hay instancias activas
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const db = firestore();


/// Probando conexión a git