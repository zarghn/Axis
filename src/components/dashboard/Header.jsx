import React from "react";

import axisLogo from "../../assets/logo.png";
import { useAuth } from "../../context/AuthContext";

function Header({ searchTerm, setSearchTerm }) {
  const { logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full px-8 py-4 backdrop-blur-md bg-transparent flex items-center justify-between">
      <div className="flex items-center gap-2 cursor-pointer">
        <img
          src={axisLogo}
          alt="AXIS Logo"
          className="h-7 w-auto object-contain"
        />
      </div>

      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-white/80 border border-neutral-200/60 rounded-full py-2 pl-10 pr-4 text-xs text-neutral-700 focus:outline-none focus:ring-1 focus:ring-amber-300 w-64 shadow-sm"
          />

          <svg
            className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Logout */}
        <button
          type="button"
          title="Logout"
          onClick={logout}
          className="w-9 h-9 rounded-full bg-neutral-200/60 hover:bg-neutral-300/80 transition flex items-center justify-center text-neutral-600"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
        </button>

        {/* Notifications */}
        <button
          type="button"
          title="Notifications"
          className="w-9 h-9 rounded-full bg-neutral-200/60 hover:bg-neutral-300/80 transition flex items-center justify-center text-neutral-600"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}

export default Header;
