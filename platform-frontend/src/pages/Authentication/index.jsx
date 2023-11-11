import React, { useState } from "react";
import Login from "../../componenets/authenticationForms/Login";
import Register from "../../componenets/authenticationForms/Register";
import "./style.css";

const Authentication = () => {
  const [login, setLogin] = useState(true);

  return (
    <div className="create-page-container">
      {login ? (
        <Login onToggle={() => setLogin(false)} />
      ) : (
        <Register onToggle={() => setLogin(true)} />
      )}
    </div>
  );
};

export default Authentication;
