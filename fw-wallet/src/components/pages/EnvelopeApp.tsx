import React, { useState, useCallback, useEffect } from 'react';
import { useEvmAddress } from "@coinbase/cdp-hooks";
import { getTokenBalance, formatBalance } from "../../crypto-config";
import { BudgetProvider, useBudget } from '../../context/BudgetContext';
import type { ExtendedBudgetAllocation } from '../../budget/extended-types';

import MobileLayout from '../layout/MobileLayout';
import Dashboard from '../pages/Dashboard';
import BudgetManagement from '../pages/BudgetManagement';
import Settings from '../pages/Settings';
import TransactionModal from '../ui/TransactionModal';
import Header from '../../Header';

/**
 * Main application component that integrates crypto functionality with budget envelopes
 */
const EnvelopeAppContent: React.FC = () => {
  const { evmAddress } = useEvmAddress();
  const { recordExpense } = useBudget();
  const [balance, setBalance] = useState<bigint | undefined>(undefined);
  const [currentTab, setCurrentTab] = useState<'home' | 'budget' | 'settings'>('home');
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [isTransactionLoading, setIsTransactionLoading] = useState(false);
  // Transaction status tracking - will be used for feedback in future updates
  const [, setTransactionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [, setTransactionError] = useState<string | null>(null);

  // Format balance using our utility function
  const formattedBalance = balance !== undefined ? formatBalance(balance) : undefined;

  // Fetch token balance
  const getBalance = useCallback(async () => {
    if (!evmAddress) return;
    try {
      const balance = await getTokenBalance(evmAddress);
      setBalance(balance);
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  }, [evmAddress]);

  // Refresh balance periodically
  useEffect(() => {
    getBalance();
    const interval = setInterval(getBalance, 5000);
    return () => clearInterval(interval);
  }, [getBalance]);

  // Handle send transaction
  const handleSendTransaction = async (
    amount: string, 
    recipient: string, 
    allocation: ExtendedBudgetAllocation
  ) => {
    if (!evmAddress) return;
    
    setIsTransactionLoading(true);
    setTransactionStatus('idle');
    setTransactionError(null);
    
    try {
      // Create the transaction object
      const amountValue = parseFloat(amount);
      
      // Record the expense in our budget
      recordExpense(allocation.name, amountValue, `Sent ${amount} PYUSD to ${recipient.substring(0, 8)}...`);
      
      // In a real implementation, we would send the actual transaction here
      // For now, we'll just simulate a successful transaction
      setTimeout(() => {
        setIsTransactionLoading(false);
        setTransactionStatus('success');
        setIsTransactionModalOpen(false);
        getBalance();
      }, 2000);
      
    } catch (error) {
      console.error('Transaction error:', error);
      setIsTransactionLoading(false);
      setTransactionStatus('error');
      setTransactionError(error instanceof Error ? error.message : 'Unknown error');
    }
  };

  // Render different content based on current tab
  const renderContent = () => {
    switch (currentTab) {
      case 'home':
        return (
          <Dashboard 
            balance={formattedBalance} 
            onSendClick={() => setIsTransactionModalOpen(true)} 
          />
        );
      case 'budget':
        return <BudgetManagement />;
      case 'settings':
        return <Settings />;
      default:
        return null;
    }
  };

  return (
    <>
      <Header />
      <MobileLayout currentTab={currentTab} onTabChange={setCurrentTab}>
        {renderContent()}
      </MobileLayout>
      
      <TransactionModal 
        isOpen={isTransactionModalOpen}
        onClose={() => setIsTransactionModalOpen(false)}
        onSend={handleSendTransaction}
        isLoading={isTransactionLoading}
      />
    </>
  );
};

/**
 * Wrapper component that provides the BudgetProvider context
 */
const EnvelopeApp: React.FC = () => {
  return (
    <BudgetProvider>
      <EnvelopeAppContent />
    </BudgetProvider>
  );
};

export default EnvelopeApp;
