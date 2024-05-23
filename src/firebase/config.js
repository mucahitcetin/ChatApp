import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDTfg0yqTqysR8m-oaFwOEiO3l1I3vuLjg",
  authDomain: "chatapp-3ffe5.firebaseapp.com",
  projectId: "chatapp-3ffe5",
  storageBucket: "chatapp-3ffe5.appspot.com",
  messagingSenderId: "115130851590",
  appId: "1:115130851590:web:e259ff7f428e8d39177e87",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Authentication hizmetini referans al
export const auth = getAuth(app);

//google sağlayıcısının kurlumunu yap
export const provider = new GoogleAuthProvider();

// veritabanı hizemetinin referansını al
export const db = getFirestore(app);
