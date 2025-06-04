// src/pages/Admin.tsx
import React, { useState, useEffect } from "react";
import LoginAdmin from "./LoginAdmin";

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Si hay sesión activa (por ejemplo en sessionStorage), mantenemos login
    const adminSession = sessionStorage.getItem("esAdmin");
    if (adminSession === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return <LoginAdmin onLogin={handleLogin} />;
  }

  return (
    <div className="admin">
      <h1>Logueado como Admin</h1>
      {/* Aquí tu contenido o componentes para admin */}
    </div>
  );
};

export default Admin;
