import "./App.css";
import Router from "./Router";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslations from "./locales/en.json";
import ruTranslations from "./locales/ru.json";
import LanguageSwitcher from "./components/LanguageSwitcher";

import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./helpers/FirebaseConfig";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslations,
    },
    ru: {
      translation: ruTranslations,
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
      const storedImage = localStorage.getItem("image");
      if (storedImage) {
        setProfileImage(storedImage);
      }
    });
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("name");
      localStorage.removeItem("email");
      localStorage.removeItem("image");
      setProfileImage(null);
    } catch (err) {
      console.error("Error during logout:", err);
    }
  };

  return (
    <>
      <LanguageSwitcher />
      <Router
        user={user}
        isLoading={isLoading}
        logout={handleLogout}
        profileImage={profileImage}
      />
    </>
  );
}

export default App;
