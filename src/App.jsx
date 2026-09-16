import React from 'react';
import LoginPage from './pages/LoginPage';

export default function App() {
  const handleLogin = (data) => {
    console.log("user info", data);
    alert(`wellcome my dear ${data.username}! :)`);
  };

  return <LoginPage onLogin={handleLogin} />;
}