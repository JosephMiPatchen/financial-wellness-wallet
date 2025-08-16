import React, { useState } from 'react';

interface NewAllocationFormProps {
  onAddAllocation: (name: string, amount: number) => void;
}

const NewAllocationForm: React.FC<NewAllocationFormProps> = ({ onAddAllocation }) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  
  const handleSubmit = () => {
    if (!name || !amount) return;
    
    const amountValue = parseFloat(amount);
    if (isNaN(amountValue) || amountValue <= 0) return;
    
    onAddAllocation(name, amountValue);
    setName('');
    setAmount('');
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <h2 className="text-xl font-semibold mb-3">Add New Allocation</h2>
      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Coffee"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
        <div className="relative">
          <span className="absolute left-3 top-2 text-gray-500">$</span>
          <input
            type="number"
            className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-md"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            min="0"
            step="0.01"
          />
        </div>
      </div>
      <button
        className="w-full bg-blue-600 text-white py-3 rounded-md font-medium"
        onClick={handleSubmit}
      >
        Add Allocation
      </button>
    </div>
  );
};

export default NewAllocationForm;
