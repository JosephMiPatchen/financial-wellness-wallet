import { baseSepolia } from "viem/chains";

/**
 * Simple crypto configuration for ETH on Base Sepolia
 */
export const cryptoConfig = {
  token: {
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18,
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
};
