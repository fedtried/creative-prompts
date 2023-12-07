import { initializeApp } from "firebase/app";
import 'firebase/firestore'
import { getFirestore} from "firebase/firestore";
import 'firebase/auth'
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "creative-prompts-5875f.firebaseapp.com",
  projectId: "creative-prompts-5875f",
  storageBucket: "creative-prompts-5875f.appspot.com",
  messagingSenderId: "148654642563",
  appId: "1:148654642563:web:6b8e354d0a6f14c13152b6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const auth = getAuth(app)