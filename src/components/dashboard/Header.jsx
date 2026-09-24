import React from "react";

import axisLogo from "../../assets/logo.png";
import { useAuth } from "../../context/AuthContext";
import logoutIcon from "../../assets/Icons/logout.png";
import notifIcon from "../../assets/Icons/notif.png";

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
        {/* SEARCH / NOT IN RESPANSIVE */}
        <div className="relative hidden md:block">
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

        {/* LOGOUT */}
        <button
          type="button"
          title="Logout"
          onClick={logout}
          className="w-9 h-9 rounded-full bg-white/80 hover:bg-white transition flex items-center justify-center shadow-sm"
        >
          <img
            src={logoutIcon}
            alt="Logout"
            className="w-4 h-4"
          />
        </button>

        {/* NOTIFICATION (FAKE BUTTON UPDATE LATER ! ) */}
        <button
          type="button"
          title="Notifications"
          className="w-9 h-9 rounded-full bg-white/80 hover:bg-white transition flex items-center justify-center shadow-sm"
        >
          <img
            src={notifIcon}
            alt="Notifications"
            className="w-4 h-4"
          />
        </button>
      </div>
    </header>
  );
}

export default Header;