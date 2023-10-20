import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAfQ-lj2unMahwPRXgsfYUf6XXWkbaJKZY",
  authDomain: "tapsmile-1.firebaseapp.com",
  projectId: "tapsmile-1",
  storageBucket: "tapsmile-1.appspot.com",
  messagingSenderId: "878844210023",
  appId: "1:878844210023:web:a50faa536bda173208ddc2",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();
