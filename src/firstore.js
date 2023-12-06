// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfl2vzTgn9EblRayJrVTMPD02SHDoZF4U",
  authDomain: "newsapp-8c0ef.firebaseapp.com",
  projectId: "newsapp-8c0ef",
  storageBucket: "newsapp-8c0ef.appspot.com",
  messagingSenderId: "628432449079",
  appId: "1:628432449079:web:fa560c3490e4a67edc19b2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);