import React, { useState } from "react";

import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (data) => {
    console.log("user info", data);
    // alert(`wellcome my dear ${data.username}! :)`);
    setIsLoggedIn(true);
  };

  return isLoggedIn ? <DashboardPage /> : <LoginPage onLogin={handleLogin} />;
}
