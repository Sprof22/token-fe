import { useState } from "react";
import {
  useAccount,
  useWriteContract,
  useReadContract,
  BaseError,
} from "wagmi";
import toast from "react-hot-toast";
import { ethers } from "ethers";
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

export const useTokenFactoryAuth = () => {
  const { isConnected, address } = useAccount();
  const { writeContract } = useWriteContract();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // ✅ Get contract owner (App-Owned Token handling)
  const { data: contractOwner, refetch: fetchContractOwner } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi,
    functionName: "owner",
  });

  // ✅ Fetch all tokens deployed by this user
  const { data: userTokens, refetch: fetchUserTokens } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi,
    functionName: "getAllTokens",
  });

  /**
   * ✅ Fetch tokens created by the current user
   */
  const getUserTokens = async (): Promise<Token[]> => {
    try {
      if (!userTokens) return [];
      return (userTokens as Token[]).filter((token) => token.creator.toLowerCase() === address?.toLowerCase());
    } catch (error) {
      console.error("Error fetching user tokens:", error);
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

    setIsLoading(true);

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

      // Refresh user tokens
      fetchUserTokens();
    } catch (err: unknown) {
      console.error("Error:", err);
      if (err instanceof BaseError) {
        toast.error(err.shortMessage || "Token creation failed.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    contractOwner,
    fetchContractOwner,
    getUserTokens,
    createToken,
  };
};
