import React, { useState } from "react";
import i18n from "i18next";

function LanguageSwitcher() {
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  const switchLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setCurrentLanguage(lng); // Здесь обновляем стейт
  };

  return (
    <div style={{ position: "fixed", top: "0", right: "0", zIndex: 1000 }}>
      <button
        onClick={() => switchLanguage("en")}
        style={{ fontWeight: currentLanguage === "en" ? "bold" : "normal" }}
      >
        <span role="img" aria-label="US Flag">
          🇺🇸
        </span>{" "}
        EN
      </button>
      <button
        onClick={() => switchLanguage("ru")}
        style={{ fontWeight: currentLanguage === "ru" ? "bold" : "normal" }}
      >
        <span role="img" aria-label="Russian Flag">
          🇷🇺
        </span>{" "}
        RU
      </button>
    </div>
  );
}

export default LanguageSwitcher;
