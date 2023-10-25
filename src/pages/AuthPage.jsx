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
  const [error, setError] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });

    const storedImage = localStorage.getItem("image");
    if (storedImage) {
      setProfileImage(storedImage);
    }
  }, [user]);

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      navigate("/");
    } catch (err) {
      setError(t("errorRegistration") + err.message);
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      navigate("/");
    } catch (err) {
      setError(t("errorLogin") + err.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("name");
      localStorage.removeItem("email");
      localStorage.removeItem("image");
      setProfileImage(null);
    } catch (err) {
      setError(t("errorLogout") + err.message);
    }
  };

  return (
    <div className="App">
      {isLoading ? (
        <>Loading...</>
      ) : user ? (
        <UserGreeting
          user={user}
          logout={handleLogout}
          profileImage={profileImage}
        />
      ) : (
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
            <button onClick={handleLogin}>{t("signIn")}</button>
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
            <button onClick={handleRegister}>{t("signUp")}</button>
          </div>
          {t("or")}
          <div>
            <GoogleButton signInWithGoogle={() => signInWithGoogle(navigate)} />
          </div>
        </>
      )}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}

export default AuthPage;
