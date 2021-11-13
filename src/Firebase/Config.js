import app from "firebase/app";
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAN2vAIAyL5xgn7rXBG-IWbxw5U-pnxErg",
  authDomain: "kiwi-udesa.firebaseapp.com",
  projectId: "kiwi-udesa",
  storageBucket: "kiwi-udesa.appspot.com",
  messagingSenderId: "374503087084",
  appId: "1:374503087084:web:1c6e169598476abe7fbec9",
  measurementId: "G-ERJS7D9TPX"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else {
  firebase.app(); // if already initialized, use that one
}


export const auth = firebase.auth();
export const db = app.firestore();
export const storage = app.storage();


