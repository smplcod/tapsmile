import React from "react";
import { useTranslation } from "react-i18next";

function RegisterForm({ onRegister, setRegisterEmail, setRegisterPassword }) {
  const { t } = useTranslation();

  return (
    <div>
      <input
        placeholder={t("email")}
        onChange={(e) => setRegisterEmail(e.target.value)}
      />
      <input
        placeholder={t("password")}
        type="password"
        onChange={(e) => setRegisterPassword(e.target.value)}
      />
      <button onClick={onRegister}>{t("signUp")}</button>
    </div>
  );
}

export default RegisterForm;
