import React from "react";
import { useTranslation } from "react-i18next";

function LoginForm({ onLogin, setLoginEmail, setLoginPassword }) {
  const { t } = useTranslation();

  return (
    <div>
      <input
        placeholder={t("email")}
        onChange={(e) => setLoginEmail(e.target.value)}
      />
      <input
        placeholder={t("password")}
        type="password"
        onChange={(e) => setLoginPassword(e.target.value)}
      />
      <button onClick={onLogin}>{t("signIn")}</button>
    </div>
  );
}

export default LoginForm;
