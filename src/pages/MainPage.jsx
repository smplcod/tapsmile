import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import UserGreeting from "../components/UserGreeting";

function MainPage({ user }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  return (
    <>
      <h1>{t("instantVoting")}</h1>
      <p>{t("thisService")}</p>
      <div>Вы готовы к опросам</div>
      <UserGreeting />
    </>
  );
}

export default MainPage;
