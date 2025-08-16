import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { ExtendedBudgetAllocation } from '../../budget/extended-types';

interface EditAllocationModalProps {
  allocation: ExtendedBudgetAllocation;
  onSave: (updatedAllocation: ExtendedBudgetAllocation) => void;
  onCancel: () => void;
}

const EditAllocationModal: React.FC<EditAllocationModalProps> = ({ 
  allocation, 
  onSave, 
  onCancel 
}) => {
  const [editedAllocation, setEditedAllocation] = useState<ExtendedBudgetAllocation>({...allocation});
  
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedAllocation({...editedAllocation, name: e.target.value});
  };
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = parseFloat(e.target.value) || 0;
    setEditedAllocation({...editedAllocation, amount});
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg w-full max-w-md p-5"
      >
        <h2 className="text-xl font-semibold mb-4">Edit Allocation</h2>
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            value={editedAllocation.name}
            onChange={handleNameChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-gray-500">$</span>
            <input
              type="number"
              className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md"
              value={editedAllocation.amount}
              onChange={handleAmountChange}
              min="0"
              step="0.01"
            />
          </div>
        </div>
        <div className="flex space-x-3">
          <button
            className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-md font-medium"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="flex-1 bg-blue-600 text-white py-2 rounded-md font-medium"
            onClick={() => onSave(editedAllocation)}
          >
            Save Changes
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default EditAllocationModal;
