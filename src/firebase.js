import firebase from "firebase/app";
import "firebase/auth";


export const auth = firebase.initializeApp({
  apiKey: "AIzaSyAoi0xlC4GY3lXmpLGBb6fmT7wQzyM4yu4",
  authDomain: "unichat-tutorial.firebaseapp.com",
  projectId: "unichat-tutorial",
  storageBucket: "unichat-tutorial.appspot.com",
  messagingSenderId: "283624029446",
  appId: "1:283624029446:web:63a4bd5bb2bf43ebf5b287",
  measurementId: "G-SYN075WNGX"
}).auth()