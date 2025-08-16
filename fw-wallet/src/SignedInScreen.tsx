import { useEvmAddress, useIsSignedIn } from "@coinbase/cdp-hooks";
import { useCallback, useEffect, useState } from "react";

import Header from "./Header";
import Transaction from "./Transaction";
import UserBalance from "./UserBalance";
import { getTokenBalance, formatBalance } from "./crypto-config";

/**
 * The Signed In screen
 */
function SignedInScreen() {
  const { isSignedIn } = useIsSignedIn();
  const { evmAddress } = useEvmAddress();
  const [balance, setBalance] = useState<bigint | undefined>(undefined);

  // Format balance using our utility function
  const formattedBalance = balance !== undefined ? formatBalance(balance) : undefined;

  const getBalance = useCallback(async () => {
    if (!evmAddress) return;
    // Use our getTokenBalance utility function
    const balance = await getTokenBalance(evmAddress);
    setBalance(balance);
  }, [evmAddress]);

  useEffect(() => {
    getBalance();
    const interval = setInterval(getBalance, 500);
    return () => clearInterval(interval);
  }, [getBalance]);

  return (
    <>
      <Header />
      <main className="main flex-col-container flex-grow">
        <div className="main-inner flex-col-container">
          <div className="card card--user-balance">
            <UserBalance balance={formattedBalance} />
          </div>
          <div className="card card--transaction">
            {isSignedIn && evmAddress && (
              <Transaction balance={formattedBalance} onSuccess={getBalance} />
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default SignedInScreen;
