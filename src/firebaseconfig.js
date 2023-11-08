// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//import { getFirestore } from "firebase/firestore";
import { getFirestore } from 'firebase/firestore/lite'
import { getAuth} from "firebase/auth"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAc3v1n23vdcHFHwzDPjHMO2okD_orP48k",
  authDomain: "react-twitch-2023.firebaseapp.com",
  projectId: "react-twitch-2023",
  storageBucket: "react-twitch-2023.appspot.com",
  messagingSenderId: "726535885261",
  appId: "1:726535885261:web:62a58d68636b14ac553484"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };