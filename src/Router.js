import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import AuthPage from "./pages/AuthPage";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/geting-started" element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
