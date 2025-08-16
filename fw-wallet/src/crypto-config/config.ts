import { baseSepolia } from "viem/chains";

/**
 * Simple crypto configuration for ETH on Base Sepolia
 */
/*
export const ethCryptoConfig = {
  token: {
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18,
    // Native ETH doesn't have a contract address, but we'll use null for consistency
    contractAddress: null,
    iconPath: '/eth.svg',
    faucetUrl: 'https://portal.cdp.coinbase.com/products/faucet',
    explorerUrl: 'https://sepolia.basescan.org/tx/',
  },
  network: {
    chainId: baseSepolia.id,
    name: 'Base Sepolia',
    rpcUrl: 'https://sepolia.base.org',
    blockExplorerUrl: 'https://sepolia.basescan.org',
  }
};*/

export const pyUsdCryptoConfig = {
    token: {
      // PYUSD Token Information
      name: 'PayPal USD',
      symbol: 'PYUSD',
      decimals: 6, // PYUSD uses 6 decimals, not 18 like ETH
      
      // Official PYUSD contract address on Ethereum Sepolia
      contractAddress: '0xcac524bca292aaade2df8a05cc58f0a65b1b3bb9',
      
      iconPath: '/pyusd.svg', // You'll need to add PYUSD icon to your public folder
      
      // Google Cloud PYUSD faucet for Ethereum Sepolia
      faucetUrl: 'https://cloud.google.com/application/web3/faucet/ethereum/sepolia/pyusd',
      
      // Ethereum Sepolia block explorer for transactions
      explorerUrl: 'https://sepolia.etherscan.io/tx/',
    },
    network: {
      chainId: 11155111, // Ethereum Sepolia chain ID
      name: 'Ethereum Sepolia',
      rpcUrl: 'https://ethereum-sepolia-rpc.publicnode.com', // or use your preferred RPC
      blockExplorerUrl: 'https://sepolia.etherscan.io',
    }
  };