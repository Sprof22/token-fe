import { useTokenFactoryAuth } from "../hooks/useAuth.hook";

const AuthComponent = () => {
  const { createToken, getUserTokens, isLoading } = useTokenFactoryAuth();

  return (
    <div className="p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Token Factory</h2>

      <div className="flex flex-col items-center space-y-4">
        <button
          onClick={() =>
            createToken("ExampleToken", "EXT", 18, 1000000, true)
          }
          disabled={isLoading}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-all ${
            isLoading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-500"
          }`}
        >
          {isLoading ? "Deploying Token..." : "Deploy Token (User-Owned)"}
        </button>

        <button
          onClick={() =>
            createToken("AppToken", "APT", 18, 500000, false)
          }
          disabled={isLoading}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-all ${
            isLoading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-500"
          }`}
        >
          {isLoading ? "Deploying Token..." : "Deploy Token (App-Owned)"}
        </button>

        <button
          onClick={getUserTokens}
          className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-500 rounded-lg text-white font-medium"
        >
          Fetch My Tokens
        </button>
      </div>
    </div>
  );
};

export default AuthComponent;
