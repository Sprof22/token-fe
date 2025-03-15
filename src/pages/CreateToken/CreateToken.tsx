import React, { useState } from "react";
import { useAccount } from "wagmi";
// import axios from "axios";
import { useTokenFactory } from "../../hooks/use-contract.hook";
import { useTokenEvents } from "../../hooks/useTokenEvents"; // Import event hook

const TokenCreator = () => {
  const { createToken, fetchAllTokens } = useTokenFactory();
  const { address } = useAccount();
  const [form, setForm] = useState({
    name: "",
    symbol: "",
    decimals: 18,
    totalSupply: 1000000,
  });
  // const [loading, setLoading] = useState(false);
  const [isUserOwner, setIsUserOwner] = useState(true); // Toggle for owner selection

  const { loading, error, tokens, refetch } = useTokenEvents();
  console.log(tokens, 'tokens')

  // const API_URL = "http://localhost:3000/blockchain"; // Single API for token creation

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreateToken = async () => {
    // setLoading(true);
    await createToken(
      form.name,
      form.symbol,
      form.decimals,
      form.totalSupply,
      isUserOwner
    );
    // setLoading(false);
    fetchAllTokens();
    refetch()
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-2xl bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">🚀 ERC-20 Token Creator</h1>

        {/* Toggle Ownership */}
        <div className="flex items-center justify-between bg-gray-700 p-4 rounded-lg mb-6">
          <span className="text-sm">Who should own this token?</span>
          <div className="flex items-center space-x-2">
            <span className={`text-sm ${isUserOwner ? "text-blue-400" : "text-gray-400"}`}>
              {isUserOwner ? "You (Wallet)" : "App (Contract Owner)"}
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={isUserOwner} onChange={() => setIsUserOwner(!isUserOwner)} />
              <div className="w-10 h-5 bg-gray-500 peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>

        {/* Input Fields */}
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Token Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="text"
            name="symbol"
            placeholder="Token Symbol"
            value={form.symbol}
            onChange={handleChange}
            className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="number"
            name="decimals"
            placeholder="Decimals"
            value={form.decimals}
            onChange={handleChange}
            min="0"
            max="18"
            className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="number"
            name="totalSupply"
            placeholder="Total Supply"
            value={form.totalSupply}
            onChange={handleChange}
            min="1"
            className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Create Token Button */}
        <button
          onClick={handleCreateToken}
          disabled={loading || !address}
          className={`w-full mt-4 py-3 rounded-md font-bold text-white ${
            loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-500 transition"
          }`}
        >
          {loading ? "Creating Token..." : "Create Token"}
        </button>
      </div>

      {/* Recent Token Events */}
      <div className="w-full max-w-2xl bg-gray-800 p-6 rounded-lg shadow-lg mt-10">
        <h2 className="text-xl font-bold text-center mb-4">📜 Token Creation Events</h2>
        
        {loading && <p className="text-center text-gray-300">Loading events...</p>}
        {error && <p className="text-center text-red-500">{error.message}</p>}

        {tokens?.length > 0 ? (
          <ul className="space-y-3">
            {tokens.map((event: any, index: number) => (
              <li key={index} className="bg-gray-700 p-3 rounded-md">
                <strong>{event.name} ({event.symbol})</strong> -{" "}
                <a
                  href={`https://sepolia.etherscan.io/address/${event.tokenAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 underline"
                >
                  {event.tokenAddress}
                </a>
                <p className="text-sm text-gray-400">
                  Created by: {event.creator} | Supply: {event.totalSupply}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-400">No token events yet.</p>
        )}
      </div>
    </div>
  );
};

export default TokenCreator;
