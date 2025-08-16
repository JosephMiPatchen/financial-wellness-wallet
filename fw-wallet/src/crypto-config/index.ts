import { createPublicClient, formatUnits, http, parseAbi } from "viem";
import { baseSepolia, sepolia } from "viem/chains";
import { pyUsdCryptoConfig as cryptoConfig} from "./config";

/**
 * Create a client for the network specified in the config
 */
export const createNetworkClient = () => {
  // Use the appropriate chain based on the network name
  const chain = cryptoConfig.network.name === 'Ethereum Sepolia' ? sepolia : baseSepolia;
  
  return createPublicClient({
    chain,
    transport: http(cryptoConfig.network.rpcUrl),
  });
};

// Minimal ERC20 ABI for balanceOf function
const erc20Abi = parseAbi([
  'function balanceOf(address owner) view returns (uint256)'
]);

/**
 * Helper function to ensure an address has the correct 0x prefix and type
 */
function toHexAddress(address: string | null): `0x${string}` | null {
  if (!address) return null;
  
  const prefixedAddress = address.startsWith('0x') ? address : `0x${address}`;
  return prefixedAddress as `0x${string}`;
}

/**
 * Get the token balance for the given address
 */
export const getTokenBalance = async (address: string): Promise<bigint> => {
  const client = createNetworkClient();
  
  // If the token has a contract address, it's an ERC20 token
  if (cryptoConfig.token.contractAddress) {
    // Get properly formatted contract address
    const contractAddress = toHexAddress(cryptoConfig.token.contractAddress);
    
    if (!contractAddress) {
      throw new Error('Invalid contract address');
    }
    
    // Call the balanceOf function on the ERC20 contract
    return await client.readContract({
      address: contractAddress,
      abi: erc20Abi,
      functionName: 'balanceOf',
      args: [address]
    });
  }
  
  // For native tokens like ETH, use getBalance
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
