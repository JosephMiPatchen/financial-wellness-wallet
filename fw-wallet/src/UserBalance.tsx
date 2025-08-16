import { LoadingSkeleton } from "@coinbase/cdp-react/components/ui/LoadingSkeleton";
import { cryptoConfig } from "./crypto-config";

interface Props {
  balance?: string;
}

/**
 * A component that displays the user's balance.
 *
 * @param {Props} props - The props for the UserBalance component.
 * @param {string} [props.balance] - The user's balance.
 * @returns A component that displays the user's balance.
 */
function UserBalance(props: Props) {
  const { balance } = props;
  return (
    <>
      <h2 className="card-title">Available balance</h2>
      <p className="user-balance flex-col-container flex-grow">
        {balance === undefined && <LoadingSkeleton as="span" className="loading--balance" />}
        {balance !== undefined && (
          <span className="flex-row-container">
            <img src={cryptoConfig.token.iconPath} alt="" className="balance-icon" />
            <span>{balance}</span>
            <span className="sr-only">{cryptoConfig.token.name}</span>
          </span>
        )}
      </p>
      <div className="faucet-link">
        <a
          href={cryptoConfig.token.faucetUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Get {cryptoConfig.token.symbol} from faucet
        </a>
      </div>
    </>
  );
}

export default UserBalance;
