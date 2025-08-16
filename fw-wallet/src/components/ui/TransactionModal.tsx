import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBudget } from '../../context/BudgetContext';
import type { BudgetAllocation } from '../../budget';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (amount: string, recipient: string, allocation: BudgetAllocation) => void;
  isLoading?: boolean;
}

/**
 * Bottom sheet transaction modal with envelope selection
 * Mobile-optimized with large touch targets and keyboard-friendly inputs
 */
export const TransactionModal: React.FC<TransactionModalProps> = ({
  isOpen,
  onClose,
  onSend,
  isLoading = false
}) => {
  const { budgetSummary } = useBudget();
  const [amount, setAmount] = useState('1.00');
  const [recipient, setRecipient] = useState('0x16520479fd477d5A2E5481b56cFC0E79E156159E');
  const [selectedAllocation, setSelectedAllocation] = useState<BudgetAllocation | null>(null);
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedAllocation) {
      onSend(amount, recipient, selectedAllocation);
    }
  };
  
  // Animation variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };
  
  const modalVariants = {
    hidden: { y: '100%' },
    visible: { y: 0, transition: { type: 'spring', damping: 25, stiffness: 300 } as any }
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
          />
          
          {/* Bottom sheet modal */}
          <motion.div
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-xl z-50 pb-safe"
            style={{ maxHeight: '90vh', overflowY: 'auto' }}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {/* Handle for dragging */}
            <div className="w-full flex justify-center pt-2 pb-4">
              <div className="w-10 h-1 bg-gray-300 rounded-full"></div>
            </div>
            
            <div className="px-4 pb-6">
              <h2 className="text-xl font-bold mb-4">Send PYUSD</h2>
              
              <form onSubmit={handleSubmit}>
                {/* Amount input */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amount (PYUSD)
                  </label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full h-12 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0.00"
                    step="0.01"
                    min="0.01"
                    required
                  />
                </div>
                
                {/* Recipient address input */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Recipient Address
                  </label>
                  <input
                    type="text"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="w-full h-12 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0x..."
                    required
                  />
                </div>
                
                {/* Envelope selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Envelope
                  </label>
                  
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {budgetSummary?.allocations.map((allocation) => (
                      <div
                        key={allocation.name}
                        className={`p-3 border rounded-lg flex items-center cursor-pointer ${
                          selectedAllocation?.name === allocation.name
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-300'
                        }`}
                        onClick={() => setSelectedAllocation(allocation)}
                      >
                        <div className="w-8 h-8 bg-gray-200 rounded-md mr-3 flex-shrink-0">
                          <div 
                            className="bg-green-500 h-full rounded-md"
                            style={{ 
                              width: '100%', 
                              height: `${(allocation.remaining / allocation.amount) * 100}%`,
                              maxHeight: '80%',
                              marginTop: '20%'
                            }}
                          ></div>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{allocation.name}</p>
                          <p className="text-sm text-gray-500">
                            ${allocation.remaining.toFixed(2)} remaining
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {!selectedAllocation && (
                    <p className="text-red-500 text-sm mt-1">
                      Please select an envelope
                    </p>
                  )}
                </div>
                
                {/* Notice about gas fees */}
                <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    You'll need ETH on Ethereum Sepolia to pay for gas fees when sending PYUSD.
                  </p>
                </div>
                
                {/* Action buttons */}
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 h-12 border border-gray-300 rounded-lg font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!selectedAllocation || isLoading}
                    className={`flex-1 h-12 rounded-lg font-medium text-white ${
                      !selectedAllocation || isLoading
                        ? 'bg-blue-300'
                        : 'bg-blue-600'
                    }`}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Sending...
                      </div>
                    ) : (
                      'Send'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default TransactionModal;
