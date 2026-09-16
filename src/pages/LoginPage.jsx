import React, { useState } from 'react';
import axisLogo from '../assets/logo.png';




export default function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (username.trim() !== '' && password.trim() !== '') {
      setError('');
      onLogin({ username, rememberMe });
    } else {
      setError("Please enter your username and passwords :)");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-white via-amber-50 to-amber-200 flex flex-col items-center justify-center p-4">
      {/* main card = when user login*/}
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-xl p-8 pt-12 text-center">
        
        {/* icon (profile user )*/}
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-amber-200 rounded-full flex items-center justify-center shadow-md border-4 border-white">
          <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-5">
          {error && (
            <div className="text-red-500 text-xs font-semibold bg-red-50 p-2 rounded-lg">
              {error}
            </div>
          )}

          {/* username input!!!! */}
          <div className="relative flex items-center bg-gray-100 rounded-full px-4 py-3 border border-transparent focus-within:border-amber-300 transition-all">
            <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder-gray-400"
            />
          </div>

          {/* password input!!!!*/}
          <div className="relative flex items-center bg-gray-100 rounded-full px-4 py-3 border border-transparent focus-within:border-amber-300 transition-all">
            <svg className="w-5 h-5 text-gray-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <input
              type="password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder-gray-400"
            />
          </div>

          {/*  Remember me / Forgot Password */}
          <div className="flex items-center justify-between text-xs text-gray-400 px-2">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded text-amber-300 focus:ring-0 cursor-pointer"
              />
              <span>Remember me</span>
            </label>
            <a href="#" className="hover:underline">Forgot Password?</a>
          </div>

          {/* login button :) */}
          <button
            type="submit"
            className="w-full bg-amber-200 hover:bg-amber-300 text-white font-bold py-3 rounded-full transition-colors shadow-sm"
          >
            LOGIN
          </button>
        </form>
      </div>

      {/* logooooooo */}
    <div className="mt-12 flex items-center justify-center">
        <img src={axisLogo} alt="Axis Logo" className="h-8 w-auto object-contain" />
      </div>
    </div>
  );
}