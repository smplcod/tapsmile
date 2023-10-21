import React from "react";

const UserGreeting = ({ user, logout, profileImage }) => {
  return (
    <div>
      Привет,{" "}
      {profileImage && (
        <img
          src={profileImage}
          alt="Avatar"
          style={{
            width: "22px",
            height: "auto",
            verticalAlign: "middle",
            padding: "1px 3px",
          }}
        />
      )}
      {user.email.split("@")[0]}&nbsp;
      <button onClick={logout}>Выйти</button>
    </div>
  );
};

export default UserGreeting;
