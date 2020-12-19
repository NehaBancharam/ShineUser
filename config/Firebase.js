import firebase from "firebase";
import firestore from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCmpXOe8AJK0Q7x2tS5MjpLGOaZMtwH2qE",
  authDomain: "shineb-8c0de.firebaseapp.com",
  databaseURL: "https://shineb-8c0de.firebaseio.com",
  projectId: "shineb-8c0de",
  storageBucket: "shineb-8c0de.appspot.com",
  messagingSenderId: "570996260223",
  appId: "1:570996260223:web:60dfd92996a896f5ef6e4a",
  measurementId: "G-FD1WRHXSKB",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
