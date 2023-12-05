import * as firebase from "firebase";
import "firebase/firestore";

let config = {
  apiKey: "AIzaSyBUnHhskIJVBINSKyMcBs-jBhs5A7q7oSA",
  authDomain: "bookswap-a4092.firebaseapp.com",
  projectId: "bookswap-a4092",
  storageBucket: "bookswap-a4092.appspot.com",
  messagingSenderId: "22837477981",
  appId: "1:22837477981:web:a341e85c1747d3374903b4",
  measurementId: "G-QMJ1R518Z3"
};

firebase.initializeApp(config);

export default firebase.firestore();
