import { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../helpers/FirebaseConfig";

function AuthPage() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div className="App">
      <div>
        <h2>My</h2>
        <h3>Registration</h3>
        <input
          placeholder="Email..."
          onChange={(e) => {
            setRegisterEmail(e.target.value);
          }}
        />
        <input
          placeholder="Password..."
          onChange={(e) => {
            setRegisterPassword(e.target.value);
          }}
        />
        <button onClick={register}>Register</button>
      </div>
      <div>
        <h3>Login</h3>
        <input
          placeholder="Email..."
          onChange={(e) => {
            setLoginEmail(e.target.value);
          }}
        />
        <input
          placeholder="Password..."
          onChange={(e) => {
            setLoginPassword(e.target.value);
          }}
        />
        <button onClick={login}>Log-in</button>
      </div>
      Hello,{user.email.split("@")[0]}&nbsp;
      <button onClick={logout}>Sign Out</button>
    </div>
  );
}

export default AuthPage;
