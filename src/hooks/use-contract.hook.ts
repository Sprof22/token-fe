import {
  useWriteContract,
  useReadContract,
  useAccount,
  BaseError,
} from "wagmi";
import { ethers } from "ethers";
import toast from "react-hot-toast";
import contractAbi from "../abi/TokenFactory.json";
import { CONTRACT_ADDRESS } from "../config";

const abi = contractAbi.abi;

interface Token {
  tokenAddress: string;
  name: string;
  symbol: string;
  decimals: number;
  totalSupply: number;
  creator: string;
}

export const useTokenFactory = () => {
  const { isConnected, address } = useAccount();
  const { writeContract, isPending } = useWriteContract();

  // ✅ Get contract owner (for App ownership)
  const { data: contractOwner, refetch: getContractOwner } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi,
    functionName: "owner",
  });

  // ✅ Get all deployed tokens
  const { data: allTokensData, refetch: fetchTokens } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi,
    functionName: "getAllTokens",
  });

  /**
   * ✅ Fetch all tokens
   */
  const fetchAllTokens = async (): Promise<Token[]> => {
    try {
      if (!allTokensData) return [];
      return allTokensData as Token[];
    } catch (error) {
      console.error("Error fetching tokens:", error);
      return [];
    }
  };

  /**
   * ✅ Deploy ERC-20 Token
   * - **User owns token** → Uses user's wallet for signing
   * - **App owns token** → Uses contract's owner
   */
  const createToken = async (
    name: string,
    symbol: string,
    decimals: number,
    totalSupply: number,
    isUserOwner: boolean
  ) => {
    if (!isConnected) {
      toast.error("Please connect your wallet first.");
      return;
    }

    try {
      await writeContract({
        address: CONTRACT_ADDRESS,
        abi,
        functionName: "createToken",
        args: [
          name,
          symbol,
          decimals,
          ethers.parseUnits(totalSupply.toString(), decimals), // Convert to proper units
          isUserOwner ? address : "0x0000000000000000000000000000000000000000", // Use contract owner if app owns
        ],
      });

      toast.success("Token created successfully!");

      // Refresh tokens list
      fetchTokens();
    } catch (err: unknown) {
      console.error("Error:", err);
      if (err instanceof BaseError) {
        toast.error(err.shortMessage || "Token creation failed.");
      }
    }
  };

  return {
    createToken,
    fetchAllTokens,
    getContractOwner,
    contractOwner,
    allTokensData,
    isPending,
  };
};
