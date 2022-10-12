
import firebase from "firebase/app";
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBkak7R5tl6YyBsS9YsW-Dtoz7fmCLEwck",
  authDomain: "cost-calculator-b4fb9.firebaseapp.com",
  projectId: "cost-calculator-b4fb9",
  storageBucket: "cost-calculator-b4fb9.appspot.com",
  messagingSenderId: "471143000144",
  appId: "1:471143000144:web:68ae965b086115f4964955",
  measurementId: "G-BD4JYCTNS5"
};

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
}

export{firebase}