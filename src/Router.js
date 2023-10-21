import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import AuthPage from "./pages/AuthPage";

function Router({ user, isLoading }) {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<MainPage user={user} isLoading={isLoading} />}
        />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
