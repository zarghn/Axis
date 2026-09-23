import React from "react";
import { useAuth } from "../../context/AuthContext";

function UserProfile() {
  const { user } = useAuth();

  return (
    <div className="w-full flex justify-center md:justify-start">
      <div className="w-full h-52 sm:h-64 md:h-72 rounded-[32px] overflow-hidden shadow-sm bg-[#EFE0C9]">
        <img
          src={user?.image}
          alt={user?.name || "User"}
          className="w-full h-full object-cover object-center"
        />
      </div>
    </div>
  );
}

export default UserProfile;