import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center px-6">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">
        Welcome to Your Blockchain App
      </h1>
      <p className="text-lg text-gray-400 text-center max-w-lg">
        Create and deploy your own ERC-20 Tokens or NFTs seamlessly on the blockchain.
      </p>

      <div className="mt-10 flex flex-col md:flex-row gap-6">
        {/* Create Token Button */}
        <button
          onClick={() => navigate("/tokens")}
          className="w-60 py-4 text-xl font-semibold bg-blue-600 hover:bg-blue-500 transition rounded-lg shadow-lg"
        >
          🚀 Create a Token
        </button>

        {/* Create NFT Button */}
        <button
          onClick={() => navigate("/nfts")}
          className="w-60 py-4 text-xl font-semibold bg-green-600 hover:bg-green-500 transition rounded-lg shadow-lg"
        >
          🎨 Create an NFT
        </button>
      </div>
    </div>
  );
};

export default Home;
