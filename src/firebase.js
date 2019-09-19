import firebase from "firebase";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

// app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAnJhvorD6mRG26JufztnbvTb-9bzUURa0",
  authDomain: "slack-react-f8d44.firebaseapp.com",
  databaseURL: "https://slack-react-f8d44.firebaseio.com",
  projectId: "slack-react-f8d44",
  storageBucket: "slack-react-f8d44.appspot.com",
  messagingSenderId: "1090489130201",
  appId: "1:1090489130201:web:b6587773997a08edce72c8"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
