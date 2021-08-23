import  firebase  from 'firebase/app';
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAHSfUpTgrfOmfQ3J-GCo3iEV4pJR9xjow",
  authDomain: "react-app-cursos-5e9b9.firebaseapp.com",
  projectId: "react-app-cursos-5e9b9",
  storageBucket: "react-app-cursos-5e9b9.appspot.com",
  messagingSenderId: "1054921263710",
  appId: "1:1054921263710:web:db8be0cbb0dcc7e0c6c2cf",
};

 firebase.initializeApp(firebaseConfig);

 //Base de datos
const db = firebase.firestore();

//La autenticacion con google
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

export {
    db,
    googleAuthProvider,
    firebase
}