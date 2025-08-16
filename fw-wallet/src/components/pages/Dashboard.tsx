import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useBudget } from '../../context/BudgetContext';
import BudgetSummary from '../ui/BudgetSummary';
import EnvelopeList from '../ui/EnvelopeList';

interface DashboardProps {
  balance: string | undefined;
  onSendClick: () => void;
}

/**
 * Main dashboard page showing crypto balance and budget envelopes
 * Mobile-optimized with pull-to-refresh and touch-friendly controls
 */
export const Dashboard: React.FC<DashboardProps> = ({ balance, onSendClick }) => {
  const { budgetSummary } = useBudget();
  // Static UI state for the refresh indicator
  // Will be connected to actual refresh functionality in future updates
  const [isRefreshing] = useState(false);
  
  return (
    <div className="pb-safe">
      {/* Pull to refresh indicator */}
      {isRefreshing && (
        <div className="flex justify-center items-center h-10 bg-gray-100">
          <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* Crypto balance card */}
      <div className="bg-white p-4 shadow-md mb-4">
        <h2 className="text-lg text-gray-600 mb-1">Your Balance</h2>
        <div className="flex items-baseline">
          <span className="text-3xl font-bold mr-2">
            {balance || '0.00'}
          </span>
          <span className="text-gray-500">PYUSD</span>
        </div>
      </div>
      
      {/* Budget summary with circular progress */}
      {budgetSummary && <BudgetSummary summary={budgetSummary} />}
      
      {/* Envelope list */}
      {budgetSummary && (
        <EnvelopeList 
          allocations={budgetSummary.allocations} 
          onSelectEnvelope={(allocation) => {
            // Will be used in future implementation for envelope details
            console.log('Selected envelope:', allocation.name);
          }}
        />
      )}
      
      {/* Fixed action button */}
      <motion.div 
        className="fixed bottom-20 right-4 z-10"
        whileTap={{ scale: 0.95 }}
      >
        <button 
          onClick={onSendClick}
          className="bg-blue-600 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center"
          style={{ touchAction: 'manipulation' }}
        >
          <span className="text-2xl">💸</span>
        </button>
      </motion.div>
    </div>
  );
};

export default Dashboard;
