import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import UserGreeting from "../components/UserGreeting";

function MainPage({ user, isLoading }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        navigate("/auth");
      }
    }
  }, [user, isLoading, navigate]);

  return (
    <>
      {/* <h1>{t("instantVoting")}</h1>
      <p>{t("thisService")}</p>
      <p>{t("youAreReadyToPolls")}</p> */}
    </>
  );
}

export default MainPage;
