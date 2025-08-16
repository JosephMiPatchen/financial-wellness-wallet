import React from 'react';
import { motion } from 'framer-motion';
import type { BudgetAllocation } from '../../budget';

interface EnvelopeProps {
  allocation: BudgetAllocation;
  onClick?: () => void;
}

/**
 * Envelope component that visually represents a budget allocation
 * Uses a simple envelope metaphor with fill level indicating remaining funds
 */
export const Envelope: React.FC<EnvelopeProps> = ({ allocation, onClick }) => {
  // Calculate percentage remaining
  const percentRemaining = (allocation.remaining / allocation.amount) * 100;
  
  // Determine color based on percentage remaining
  const getColor = () => {
    if (percentRemaining > 50) return 'bg-green-500';
    if (percentRemaining > 20) return 'bg-yellow-500';
    return 'bg-red-500';
  };
  
  return (
    <motion.div 
      className="w-full p-4 mb-3 bg-white rounded-lg shadow-md"
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-medium">{allocation.name}</h3>
        <span className="text-sm font-semibold">
          ${allocation.remaining.toFixed(2)} / ${allocation.amount.toFixed(2)}
        </span>
      </div>
      
      {/* Envelope visual */}
      <div className="relative h-16 w-full bg-gray-100 rounded-md overflow-hidden border border-gray-300">
        {/* Envelope flap */}
        <div className="absolute top-0 left-0 w-full h-4 bg-gray-200 z-10 
                      border-b border-gray-300 rounded-t-md"></div>
        
        {/* Money fill level */}
        <motion.div 
          className={`absolute bottom-0 left-0 w-full ${getColor()} transition-all duration-500`}
          initial={{ height: '0%' }}
          animate={{ height: `${percentRemaining}%` }}
          style={{ maxHeight: '80%' }} // Leave room for the flap
        />
        
        {/* Percentage indicator */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <span className="text-sm font-bold text-gray-800">
            {percentRemaining.toFixed(0)}% left
          </span>
        </div>
      </div>
      
      {/* Type indicator */}
      <div className="mt-2 flex justify-between items-center">
        <span className={`text-xs px-2 py-1 rounded-full ${
          allocation.type === 'EXPENSE' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
        }`}>
          {allocation.type}
        </span>
        
        <span className="text-xs text-gray-500">
          Tap to select
        </span>
      </div>
    </motion.div>
  );
};

export default Envelope;
