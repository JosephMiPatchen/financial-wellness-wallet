import React from 'react';
import { motion } from 'framer-motion';
import type { ExtendedBudgetAllocation } from '../../budget/extended-types';

interface AllocationListProps {
  allocations: ExtendedBudgetAllocation[];
  onEditAllocation: (allocation: ExtendedBudgetAllocation) => void;
}

const AllocationList: React.FC<AllocationListProps> = ({ allocations, onEditAllocation }) => {
  if (allocations.length === 0) {
    return (
      <div className="mb-8 text-center py-8 bg-gray-50 rounded-lg">
        <p className="text-gray-500">No allocations yet. Add one below!</p>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Current Allocations</h2>
      {allocations.map(allocation => (
        <motion.div 
          key={allocation.id}
          className="bg-white rounded-lg shadow-md p-4 mb-3 flex justify-between items-center"
          whileTap={{ scale: 0.98 }}
        >
          <div>
            <div className="flex items-center">
              <div 
                className="w-4 h-4 rounded-full mr-2" 
                style={{ backgroundColor: allocation.color }}
              />
              <h3 className="font-medium">{allocation.name}</h3>
            </div>
            <p className="text-gray-600 text-sm">
              ${allocation.spent.toFixed(2)} spent of ${allocation.amount.toFixed(2)}
            </p>
          </div>
          <button 
            className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
            onClick={() => onEditAllocation(allocation)}
          >
            Edit
          </button>
        </motion.div>
      ))}
    </div>
  );
};

export default AllocationList;
