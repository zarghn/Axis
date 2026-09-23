import profileImage from "../assets/images/user_zar.png";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const userInfo = {
  name: "Zahra",
  password: "1234",
  image: profileImage,
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");

    return savedUser ? JSON.parse(savedUser) : null;
  });
  function logout() {
    setUser(null);
    localStorage.removeItem("user");
  }
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser, userInfo, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
