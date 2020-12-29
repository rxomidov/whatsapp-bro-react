// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDvrZv4tvaSbYHNDxp6Lmtgo80S3RaHzrQ",
    authDomain: "what-s-app-clone-react.firebaseapp.com",
    projectId: "what-s-app-clone-react",
    storageBucket: "what-s-app-clone-react.appspot.com",
    messagingSenderId: "528140632951",
    appId: "1:528140632951:web:4467f4d0bf31224dcdd772",
    measurementId: "G-3XHMMTKLMJ"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider};
export default db;