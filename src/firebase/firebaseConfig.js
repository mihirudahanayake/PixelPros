// firebase/firebaseConfig.js
import { initializeApp }                     from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getAuth, GoogleAuthProvider }       from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAnv7knR-tyH4m3lLN7mNQydrPHe5qJuQE",
  authDomain: "forwebapp-4c1ea.firebaseapp.com",
  projectId: "forwebapp-4c1ea",
  storageBucket: "forwebapp-4c1ea.firebasestorage.app",
  messagingSenderId: "569123464992",
  appId: "1:569123464992:web:43fc8522557ba078c39945",
  measurementId: "G-NDB4KKVYJD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Auth
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { db, collection, getDocs, auth, googleProvider };
export const provider = new GoogleAuthProvider();
