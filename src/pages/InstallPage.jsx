import React from "react";
import { useTranslation } from "react-i18next";
import Install from "../components/Install";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../helpers/FirebaseConfig";
import UserGreeting from "../components/UserGreeting";

function InstallPage({ user, isLoading, logout, profileImage }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) navigate("/auth");
    });
    return () => unsubscribe();
  }, [navigate]);

  return (
    <div>
      <UserGreeting user={user} logout={logout} profileImage={profileImage} />
      <Install user={user} />
    </div>
  );
}

export default InstallPage;
