import React from "react";
import { NavLink } from "react-router-dom";

function MainPage() {
  return (
    <>
      <h1>Welcome</h1>
      <NavLink to="/geting-started">Begin</NavLink>
    </>
  );
}

export default MainPage;
