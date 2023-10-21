import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

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

const provider = new GoogleAuthProvider();

export const signInWithGoogle = (navigate) => {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result);
      const name = result.user.displayName;
      const email = result.user.email;
      const image = result.user.photoURL;

      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("image", image);

      navigate("/");
    })
    .catch((error) => {
      console.log(error);
    });
};
