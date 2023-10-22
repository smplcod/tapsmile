import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth, signInWithGoogle } from "../helpers/FirebaseConfig";

import UserGreeting from "../components/UserGreeting";

import "../components/GoogleButton.class.css";
import GoogleButton from "../components/GoogleButton";

function AuthPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    const storedImage = localStorage.getItem("image");
    if (storedImage) {
      setProfileImage(storedImage);
    }
  }, [user]);

  const register = async () => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("image");
    setProfileImage(null);
  };

  return (
    <div className="App">
      {!isLoading ? (
        !user ? (
          <>
            <div>
              <input
                placeholder={t("email")}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
              <input
                placeholder={t("password")}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
              <button onClick={login}>{t("signIn")}</button>
            </div>
            {t("or")}
            <div>
              <input
                placeholder={t("email")}
                onChange={(e) => setRegisterEmail(e.target.value)}
              />
              <input
                placeholder={t("password")}
                onChange={(e) => setRegisterPassword(e.target.value)}
              />
              <button onClick={register}>{t("signUp")}</button>
            </div>
            {t("or")}
            <div>
              <GoogleButton
                signInWithGoogle={signInWithGoogle}
                navigate={navigate}
              />
            </div>
          </>
        ) : (
          <UserGreeting
            user={user}
            logout={logout}
            profileImage={profileImage}
          />
        )
      ) : (
        <>Loading...</>
      )}
    </div>
  );
}

export default AuthPage;
