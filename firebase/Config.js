

import '@firebase/auth';
import '@firebase/firestore';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyC9b9T_w26iB8-oA3whXRo6hJrAawcHuSs",
    authDomain: "expoauthen.firebaseapp.com",
    projectId: "expoauthen",
    storageBucket: "expoauthen.appspot.com",
    messagingSenderId: "922567719257",
    appId: "1:922567719257:web:ab669eacd79926ecb47448",
    measurementId: "G-7HG67HNV31"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };
