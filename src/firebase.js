import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyDxfrl2Y7oY3J6DYsq8MmjMVZB1MiZXu2M",
    authDomain: "webprosjekt-2019.firebaseapp.com",
    databaseURL: "https://webprosjekt-2019.firebaseio.com",
    projectId: "webprosjekt-2019",
    storageBucket: "webprosjekt-2019.appspot.com",
    messagingSenderId: "410602402733",
    appId: "1:410602402733:web:a34a1257631c024f"
};
firebase.initializeApp(firebaseConfig);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;