import React from "react";

import LoginPage from "./pages/LoginPage";

import DashboardPage from "./pages/DashboardPage";

import { useAuth } from "./context/AuthContext";

export default function App() {
  const { user } = useAuth();

  const handleLogin = (data) => {
    console.log("user info", data);
    // alert(`wellcome in, dear ${data.username}.`);
  };

  return user ? (
    <DashboardPage />
  ) : (
    <LoginPage onLogin={handleLogin} />
  );
}