// Import the functions you need from the SDKs you need
import { initializeApp,getApps,getApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9Wb0ZiF7DTgT3wJqoPW18G3zl8s4kvx0",
  authDomain: "kota-86fca.firebaseapp.com",
  projectId: "kota-86fca",
  storageBucket: "kota-86fca.appspot.com",
  messagingSenderId: "74660477101",
  appId: "1:74660477101:web:5d575a99324c855288ee24"
};


// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth();
const db = getFirestore(app);

export {auth,db}

export default firebaseConfig;