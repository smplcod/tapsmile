import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import AuthPage from "./pages/AuthPage";
import InstallPage from "./pages/InstallPage";

function Router({ user, isLoading, logout, profileImage }) {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<MainPage user={user} isLoading={isLoading} />}
        />
        <Route
          path="/auth"
          element={
            <AuthPage
              user={user}
              isLoading={isLoading}
              logout={logout}
              profileImage={profileImage}
            />
          }
        />
        <Route
          path="/install"
          element={
            <InstallPage
              user={user}
              isLoading={isLoading}
              logout={logout}
              profileImage={profileImage}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
