import React from "react";
import { useTranslation } from "react-i18next";
import Install from "../components/Install";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../helpers/FirebaseConfig";

function InstallPage({ user, isLoading }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Проверка авторизации
  React.useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) navigate("/auth"); // если пользователь не авторизован, перенаправляем на страницу авторизации
    });
  }, [navigate]);

  return <Install />;
}

export default InstallPage;