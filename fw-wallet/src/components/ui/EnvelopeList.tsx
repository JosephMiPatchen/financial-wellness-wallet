import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { BudgetAllocation } from '../../budget';
import Envelope from './Envelope';

interface EnvelopeListProps {
  allocations: BudgetAllocation[];
  onSelectEnvelope?: (allocation: BudgetAllocation) => void;
}

/**
 * Displays a list of budget allocations as visual envelopes
 * Optimized for mobile with full-width touch targets
 */
export const EnvelopeList: React.FC<EnvelopeListProps> = ({ 
  allocations, 
  onSelectEnvelope 
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  
  // Handle envelope selection
  const handleSelect = (allocation: BudgetAllocation, index: number) => {
    setSelectedIndex(index);
    if (onSelectEnvelope) {
      onSelectEnvelope(allocation);
    }
  };
  
  // Animation variants for list items
  const listVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  return (
    <div className="w-full px-4">
      <h2 className="text-xl font-bold mb-4">Your Budget Envelopes</h2>
      
      {allocations.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No budget allocations found. Create some to get started!
        </div>
      ) : (
        <motion.div
          className="space-y-3"
          variants={listVariants}
          initial="hidden"
          animate="show"
        >
          {allocations.map((allocation, index) => (
            <motion.div 
              key={allocation.name}
              variants={itemVariants}
              className={`${selectedIndex === index ? 'ring-2 ring-blue-500 rounded-lg' : ''}`}
            >
              <Envelope 
                allocation={allocation}
                onClick={() => handleSelect(allocation, index)}
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default EnvelopeList;
