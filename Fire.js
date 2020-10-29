import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyCmpXOe8AJK0Q7x2tS5MjpLGOaZMtwH2qE",
  authDomain: "shineb-8c0de.firebaseapp.com",
  databaseURL: "https://shineb-8c0de.firebaseio.com",
  projectId: "shineb-8c0de",
  storageBucket: "shineb-8c0de.appspot.com",
  messagingSenderId: "570996260223",
  appId: "1:570996260223:web:60dfd92996a896f5ef6e4a",
  measurementId: "G-FD1WRHXSKB",
};

class Fire {
  constructor() {
    firebase.initializeApp(firebaseConfig);
  }

  addPost = async ({ text }) => {
    return new Promise((res, rej) => {
      this.firestore
        .collection("posts")
        .add({
          text,
          uid: this.uid,
          timestamp: this.timestamp,
        })
        .then((ref) => {
          res(ref);
        })
        .catch((error) => {
          rej(error);
        });
    });
  };

  //function for new user sign up
  createUser = async (user) => {
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password);
      let db = this.firestore.collection("users").doc(this.uid);
      db.set({
        name: user.name,
        email: user.email,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  //function for signing out
  signOutUser = () => {
    firebase.auth().signOut();
  };

  get firestore() {
    return firebase.firestore();
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  get timestamp() {
    return Date.now();
  }
}

Fire.shared = new Fire();
export default Fire;
