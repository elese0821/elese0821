import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDAPHWR698XhsLPF-5sGsmGRApYXXP-xCw",
    authDomain: "reactblog-44e0c.firebaseapp.com",
    projectId: "reactblog-44e0c",
    storageBucket: "reactblog-44e0c.appspot.com",
    messagingSenderId: "277258812590",
    appId: "1:277258812590:web:70e69167b2cf3b1067c13f",
    measurementId: "G-P0L1NLR6FH"
};

firebase.initializeApp(firebaseConfig);

export default firebase;