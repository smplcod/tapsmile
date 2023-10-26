import React from "react";
import { useTranslation } from "react-i18next";

const UserGreeting = ({ user, logout, profileImage }) => {
  const { t } = useTranslation();

  if (!user) return null;

  const isAdmin = user.email === process.env.REACT_APP_ADMIN_EMAIL;

  return (
    <div>
      {t("hello")}{" "}
      {profileImage && (
        <img
          src={profileImage}
          alt="Avatar"
          style={{
            width: "22px",
            height: "auto",
            verticalAlign: "middle",
            padding: "1px 3px",
          }}
        />
      )}
      {user.email.split("@")[0]}
      {isAdmin && ` ${t("admin")}`} &nbsp;
      <button onClick={logout}>{t("logOut")}</button>
    </div>
  );
};

export default UserGreeting;
