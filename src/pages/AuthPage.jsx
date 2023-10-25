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
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import GoogleButton from "../components/GoogleButton";
import "../components/GoogleButton.class.css";

const firebaseErrorCodes = {
  "auth/invalid-email": "invalidEmail",
  "auth/user-disabled": "userDisabled",
  "auth/user-not-found": "userNotFound",
  "auth/wrong-password": "wrongPassword",
  "auth/email-already-in-use": "emailAlreadyInUse",
  "auth/operation-not-allowed": "operationNotAllowed",
  "auth/weak-password": "weakPassword",
};

function getTranslationKeyForFirebaseError(errorCode) {
  return firebaseErrorCodes[errorCode] || "unknownError";
}

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
      setError(t(getTranslationKeyForFirebaseError(err.code)));
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      navigate("/");
    } catch (err) {
      setError(t(getTranslationKeyForFirebaseError(err.code)));
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
      setError(t(getTranslationKeyForFirebaseError(err.code)));
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
          <LoginForm
            onLogin={handleLogin}
            setLoginEmail={setLoginEmail}
            setLoginPassword={setLoginPassword}
          />
          {t("or")}
          <RegisterForm
            onRegister={handleRegister}
            setRegisterEmail={setRegisterEmail}
            setRegisterPassword={setRegisterPassword}
          />
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
