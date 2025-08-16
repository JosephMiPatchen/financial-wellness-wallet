import { createPublicClient, formatUnits, http } from "viem";
import { baseSepolia } from "viem/chains";
import { cryptoConfig } from "./config";

/**
 * Create a client for the Base Sepolia network
 */
export const createNetworkClient = () => {
  return createPublicClient({
    chain: baseSepolia,
    transport: http(cryptoConfig.network.rpcUrl),
  });
};

/**
 * Get the token balance for the given address
 */
export const getTokenBalance = async (address: string): Promise<bigint> => {
  const client = createNetworkClient();
  return await client.getBalance({ address });
};

/**
 * Format a token balance for display
 */
export const formatBalance = (balance: bigint): string => {
  return formatUnits(balance, cryptoConfig.token.decimals);
};

/**
 * Format a transaction URL for display
 */
export const formatTransaction = (txHash: string): string => {
  return `${cryptoConfig.token.explorerUrl}${txHash}`;
};

/**
 * Get the crypto configuration
 */
export const getConfig = () => {
  return cryptoConfig;
};

// Export the config directly
export { cryptoConfig };
