import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import UserGreeting from "../components/UserGreeting";
import { signOut } from "firebase/auth";
import { auth } from "../helpers/FirebaseConfig";

function MainPage({ user, isLoading }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(t("logoutError"), err);
    }
  };

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        navigate("/auth");
      }
    }
  }, [user, isLoading, navigate]);

  return (
    <>
      <UserGreeting user={user} logout={handleLogout} />
      <h1>{t("instantVoting")}</h1>
      <p>{t("thisService")}</p>
      <p>{t("youAreReadyToPolls")}</p>
    </>
  );
}

export default MainPage;
