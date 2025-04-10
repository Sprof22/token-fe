import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-gray-900 text-white shadow-md z-50">
      <div className=" mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-400">
          Token LaunchPad
        </Link>

        {/* Connect Button */}
        <div>
          <ConnectButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
