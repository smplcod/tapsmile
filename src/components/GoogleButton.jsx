import React from "react";
import { useTranslation } from "react-i18next";

function GoogleButton({ signInWithGoogle, navigate }) {
  const { t } = useTranslation();

  return (
    <button
      type="button"
      className="login-with-google-btn"
      onClick={() => signInWithGoogle(navigate)}
    >
      {t("signInWithGoogle")}
    </button>
  );
}

export default GoogleButton;
