import { useEvmAddress } from "@coinbase/cdp-hooks";
import {
  SendTransactionButton,
  type SendTransactionButtonProps,
} from "@coinbase/cdp-react/components/SendTransactionButton";
import { Button } from "@coinbase/cdp-react/components/ui/Button";
import { LoadingSkeleton } from "@coinbase/cdp-react/components/ui/LoadingSkeleton";
import { useMemo, useState } from "react";
import { cryptoConfig, formatTransaction, createERC20TransferTransaction } from "./crypto-config";

interface Props {
  balance?: string;
  onSuccess?: () => void;
}

/**
 * This component demonstrates how to send an EVM transaction using the CDP hooks.
 *
 * @param {Props} props - The props for the Transaction component.
 * @param {string} [props.balance] - The user's balance.
 * @param {() => void} [props.onSuccess] - A function to call when the transaction is successful.
 * @returns A component that displays a transaction form and a transaction hash.
 */
function Transaction(props: Props) {
  const { balance, onSuccess } = props;
  const { evmAddress } = useEvmAddress();
  const [transactionHash, setTransactionHash] = useState("");
  const [error, setError] = useState("");

  const hasBalance = useMemo(() => {
    return balance && balance !== "0";
  }, [balance]);

  // Hardcoded destination address
  const destinationAddress = '0x16520479fd477d5A2E5481b56cFC0E79E156159E';
  
  const transaction = useMemo<SendTransactionButtonProps["transaction"]>(() => {
    // For PYUSD, we need to send a much smaller amount due to decimals (6 vs 18)
    // 1000000 = 1 PYUSD (with 6 decimals)
    const amount = cryptoConfig.token.symbol === 'PYUSD' ? 1000000n : 1000000000000n;
    
    // Use our helper function to create the appropriate transaction with hardcoded destination
    return createERC20TransferTransaction(destinationAddress, amount);
  }, []);

  const handleTransactionError: SendTransactionButtonProps["onError"] = error => {
    setTransactionHash("");
    setError(error.message);
  };

  const handleTransactionSuccess: SendTransactionButtonProps["onSuccess"] = hash => {
    setTransactionHash(hash);
    setError("");
    onSuccess?.();
  };

  const handleReset = () => {
    setTransactionHash("");
    setError("");
  };

  return (
    <>
      {balance === undefined && (
        <>
          <h2 className="card-title">Send a transaction</h2>
          <LoadingSkeleton className="loading--text" />
          <LoadingSkeleton className="loading--btn" />
        </>
      )}
      {balance !== undefined && (
        <>
          {!transactionHash && error && (
            <>
              <h2 className="card-title">Oops</h2>
              <p>{error}</p>
              <Button className="tx-button" onClick={handleReset} variant="secondary">
                Reset and try again
              </Button>
            </>
          )}
          {!transactionHash && !error && (
            <>
              <h2 className="card-title">Send a transaction</h2>
              {hasBalance && evmAddress && (
                <>
                  <p>Send {cryptoConfig.token.symbol === 'PYUSD' ? '1' : '0.000001'} {cryptoConfig.token.symbol} to <code>{destinationAddress.slice(0, 6)}...{destinationAddress.slice(-4)}</code> on {cryptoConfig.network.name}</p>
                  
                  {cryptoConfig.token.contractAddress && (
                    <p className="gas-notice">
                      <small>Note: You need ETH on {cryptoConfig.network.name} to pay for gas fees when sending {cryptoConfig.token.symbol}.</small>
                    </p>
                  )}
                  
                  <div className="transaction-button-container">
                    <SendTransactionButton
                      account={evmAddress}
                      network={cryptoConfig.network.name === 'Ethereum Sepolia' ? 'ethereum-sepolia' : 'base-sepolia'}
                      transaction={transaction}
                      onError={handleTransactionError}
                      onSuccess={handleTransactionSuccess}
                    />
                  </div>
                </>
              )}
              {!hasBalance && (
                <>
                  <p>You need ETH to send a transaction, but you have none.</p>
                  <p>
                    Get some from{" "}
                    <a
                      href={cryptoConfig.token.faucetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {cryptoConfig.network.name} Faucet
                    </a>
                  </p>
                </>
              )}
            </>
          )}
          {transactionHash && (
            <>
              <h2 className="card-title">Transaction sent</h2>
              <p>
                Transaction hash:{" "}
                <a
                  href={formatTransaction(transactionHash)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transaction-hash-link"
                >
                  {transactionHash.slice(0, 6)}...{transactionHash.slice(-4)}
                </a>
              </p>
              <Button variant="secondary" className="tx-button" onClick={handleReset}>
                Send another transaction
              </Button>
            </>
          )}
        </>
      )}
    </>
  );
}

export default Transaction;
