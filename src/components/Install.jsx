import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { collection, addDoc, getDocs } from "@firebase/firestore";
import { db } from "../helpers/FirebaseConfig";

const Install = () => {
  const [stage, setStage] = useState(0);
  const { t } = useTranslation();

  const userRef = collection(db, "Users");
  const pollsRef = collection(db, "Polls");

  const checkCollectionsExistence = async () => {
    const usersSnap = await getDocs(userRef);
    const pollsSnap = await getDocs(pollsRef);
    return usersSnap.docs.length > 0 && pollsSnap.docs.length > 0;
  };

  const createInitialCollections = async () => {
    const collectionsExist = await checkCollectionsExistence();
    if (collectionsExist) {
      setStage(-1);
      return;
    }

    setStage(1);
    try {
      await addDoc(userRef, {
        email: "example@example.com",
        totalPoints: 0,
        usedPoints: 0,
        createdPolls: 0,
      });
      setStage(2);

      setStage(3);
      await addDoc(pollsRef, {
        question: "Example question",
        options: ["Option1", "Option2"],
        votes: { 0: 0, 1: 0 },
        status: "premoderation",
        createdById: "someUserId",
      });
      setStage(4);

      setStage(5);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h1>{t("installation")}</h1>
      {stage === 0 && (
        <button onClick={createInitialCollections}>{t("begin")}</button>
      )}
      {stage >= 1 && <p>{t("creatingInitialCollections")}</p>}
      {stage >= 2 && <p>{t("creatingInitialCollectionsDone")}</p>}
      {stage >= 3 && <p>{t("creatingPolls")}</p>}
      {stage >= 4 && <p>{t("creatingPollsDone")}</p>}
      {stage === -1 && <p>{t("collectionsAlreadyExist")}</p>}
      {(stage >= 5 || stage === -1) && (
        <NavLink to="/">{t("goToMainpage")}</NavLink>
      )}
    </div>
  );
};

export default Install;
