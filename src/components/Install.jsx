import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { collection, addDoc } from "@firebase/firestore";
import { db } from "../helpers/FirebaseConfig"; // Импорт из твоего конфига

const Install = () => {
  const [stage, setStage] = useState(0);
  const { t } = useTranslation();

  const createInitialCollections = async () => {
    console.log("Stage 1: Starting to create initial collections");
    setStage(1);

    const userRef = collection(db, "Users");
    await addDoc(userRef, {
      email: "example@example.com",
      totalPoints: 0,
      usedPoints: 0,
      createdPolls: 0,
    })
      .then(() => {
        console.log("Stage 2: Users collection created");
        setStage(2);
      })
      .catch((error) => {
        console.log("Error creating users collection:", error);
      });

    const pollsRef = collection(db, "Polls");
    await addDoc(pollsRef, {
      question: "Example question",
      options: ["Option1", "Option2"],
      votes: { 0: 0, 1: 0 },
      status: "premoderation",
      createdById: "someUserId",
    })
      .then(() => {
        console.log("Stage 3: Polls collection created");
        setStage(3);
      })
      .catch((error) => {
        console.log("Error creating polls collection:", error);
      });

    console.log("Stage 4: Done with all collections");
    setStage(4);
  };

  return (
    <div>
      <h1>{t("instalation")}</h1>
      <p>{stage >= 1 ? t("creatingInitialCollections") : ""}</p>
      <p>{stage >= 2 ? t("creatingInitialCollectionsDone") : ""}</p>
      <p>{stage >= 3 ? t("creatingPolls") : ""}</p>
      <p>{stage >= 4 ? t("creatingPollsDone") : ""}</p>
      {stage === 4 && <NavLink to="/">{t("goToMainpage")}</NavLink>}
      <button onClick={createInitialCollections}>{t("begin")}</button>
    </div>
  );
};

export default Install;
