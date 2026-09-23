import React, { useState } from "react";
import axisLogo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext";

export default function LoginPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const { setUser, userInfo } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username.trim() !== "" && password.trim() !== "") {
      setError("");

      if (username === userInfo.name && password === userInfo.password) {
        setUser(userInfo);
        onLogin?.({ username, rememberMe });
      } else {
        setError("Username or password is incorrect :( ");
      }
    } else {
      setError("Please enter your username and passwords !");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#FFFDF0] via-[#FFF8D6] to-[#FFE885] flex flex-col items-center justify-center p-4">
      {/* Login Card */}
      <div className="relative w-full max-w-sm bg-white rounded-[40px] p-8 pt-12 shadow-xl flex flex-col items-center">
        {/* Profile Badge Icon */}
        <div className="absolute -top-10 w-20 h-20 bg-[#FFE885] rounded-full flex items-center justify-center shadow-md border-4 border-white">
          <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 mt-2">
          {error && (
            <div className="text-red-500 text-xs font-semibold bg-red-50 p-2.5 rounded-xl text-center border border-red-100">
              {error}
            </div>
          )}

          {/* Username Input */}
          <div className="flex items-center bg-[#F2F2F2] rounded-full px-4 py-3">
            <svg className="w-5 h-5 text-neutral-400 mr-2.5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-transparent text-sm w-full focus:outline-none text-neutral-800 placeholder-neutral-400 font-sans"
            />
          </div>

          {/* Password Input */}
          <div className="flex items-center bg-[#F2F2F2] rounded-full px-4 py-3">
            <svg className="w-5 h-5 text-neutral-400 mr-2.5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
            </svg>
            <input
              type="password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent text-sm w-full focus:outline-none text-neutral-800 placeholder-neutral-400 font-sans"
            />
          </div>

          {/* Options Row */}
          <div className="flex items-center justify-between text-xs text-neutral-400 px-1 my-0.5">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded text-[#FFE885] focus:ring-0 cursor-pointer"
              />
              <span>Remember me</span>
            </label>
            <a href="#" className="hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-[#FFE885] hover:bg-[#fedb56] text-white font-bold py-3 rounded-full transition-colors shadow-sm uppercase tracking-wider text-sm mt-1"
          >
            LOGIN
          </button>
        </form>
      </div>

      {/* Axis Logo */}
      <div className="mt-10 flex items-center justify-center">
        {axisLogo ? (
          <img src={axisLogo} alt="Axis Logo" className="h-7 w-auto object-contain" />
        ) : (
          <div className="flex items-center gap-2 font-bold text-xl tracking-wider text-neutral-800">
            <span className="font-extrabold text-2xl">A</span>
            <span className="border-r border-neutral-800 h-5 mx-0.5"></span>
            <span className="tracking-widest">AXIS</span>
          </div>
        )}
      </div>
    </div>
  );
}