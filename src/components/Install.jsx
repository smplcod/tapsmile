import React, { useState, useCallback } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { collection, addDoc, getDocs } from "@firebase/firestore";
import { db } from "../helpers/FirebaseConfig";

const PLAN = {
  INITIAL: 0,
  USERS_CREATING: 1,
  USERS_DONE: 2,
  POLLS_CREATING: 3,
  POLLS_DONE: 4,
  REFERRALS_CREATING: 5,
  REFERRALS_DONE: 6,
  COMPLETED: 7,
  ALREADY_EXISTS: -1,
};

const Install = () => {
  const [FACT, setFACT] = useState({
    stage: PLAN.INITIAL,
    error: null,
  });

  const { t } = useTranslation();

  const userRef = collection(db, "Users");
  const pollsRef = collection(db, "Polls");
  const referralsRef = collection(db, "Referrals");

  const checkCollectionsExistence = async () => {
    const usersSnap = await getDocs(userRef);
    const pollsSnap = await getDocs(pollsRef);
    const referralsSnap = await getDocs(referralsRef);
    return (
      usersSnap.docs.length > 0 &&
      pollsSnap.docs.length > 0 &&
      referralsSnap.docs.length > 0
    );
  };

  const createInitialCollections = useCallback(async () => {
    const collectionsExist = await checkCollectionsExistence();
    if (collectionsExist) {
      setFACT({ stage: PLAN.ALREADY_EXISTS, error: null });
      return;
    }

    try {
      setFACT({ stage: PLAN.USERS_CREATING, error: null });
      await addDoc(userRef, {
        email: "example@example.com",
        totalPoints: 0,
        usedPoints: 0,
        createdPolls: 0,
      });
      setFACT({ stage: PLAN.USERS_DONE, error: null });

      setFACT({ stage: PLAN.POLLS_CREATING, error: null });
      await addDoc(pollsRef, {
        question: "Example question",
        options: ["Option1", "Option2"],
        votes: { 0: 0, 1: 0 },
        status: "premoderation",
        createdById: "someUserId",
      });
      setFACT({ stage: PLAN.POLLS_DONE, error: null });

      setFACT({ stage: PLAN.REFERRALS_CREATING, error: null });
      await addDoc(referralsRef, {
        code: "example-code",
        createdBy: "exampleUserId",
        usersJoined: [],
      });
      setFACT({ stage: PLAN.REFERRALS_DONE, error: null });

      setFACT({ stage: PLAN.COMPLETED, error: null });
    } catch (error) {
      setFACT({ stage: FACT.stage, error: error.message });
    }
  }, [userRef, pollsRef, referralsRef]);

  return (
    <div>
      <h1>{t("installation")}</h1>
      {FACT.stage === PLAN.INITIAL && (
        <button onClick={createInitialCollections}>{t("begin")}</button>
      )}
      {FACT.stage >= PLAN.USERS_CREATING && (
        <p>{t("creatingInitialCollections")}</p>
      )}
      {FACT.stage >= PLAN.USERS_DONE && (
        <p>{t("creatingInitialCollectionsDone")}</p>
      )}
      {FACT.stage >= PLAN.POLLS_CREATING && <p>{t("creatingPolls")}</p>}
      {FACT.stage >= PLAN.POLLS_DONE && <p>{t("creatingPollsDone")}</p>}
      {FACT.stage >= PLAN.REFERRALS_CREATING && <p>{t("creatingReferrals")}</p>}
      {FACT.stage >= PLAN.REFERRALS_DONE && <p>{t("creatingReferralsDone")}</p>}
      {FACT.stage >= PLAN.COMPLETED && <p>{t("instalationCompleted")}</p>}
      {FACT.stage === PLAN.ALREADY_EXISTS && (
        <p>{t("collectionsAlreadyExist")}</p>
      )}
      {(FACT.stage === PLAN.COMPLETED ||
        FACT.stage === PLAN.ALREADY_EXISTS) && (
        <NavLink to="/">{t("goToMainpage")}</NavLink>
      )}
      {FACT.error && <p>{FACT.error}</p>}
    </div>
  );
};

export default Install;
