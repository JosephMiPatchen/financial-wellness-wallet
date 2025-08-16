import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useBudget } from '../../context/BudgetContext';
import { AllocationTypeEnum } from '../../budget';
import type { ExtendedBudgetAllocation, ExtendedBudgetSummary } from '../../budget/extended-types';
import AllocationList from '../ui/AllocationList';
import NewAllocationForm from '../ui/NewAllocationForm';
import EditAllocationModal from '../ui/EditAllocationModal';

interface BudgetManagementProps {
  // Props if needed
}

// Utility function to generate random colors for new allocations
export const getRandomColor = () => {
  const colors = ['#4CAF50', '#2196F3', '#FFC107', '#9C27B0', '#FF5722', '#607D8B'];
  return colors[Math.floor(Math.random() * colors.length)];
};

export const BudgetManagement: React.FC<BudgetManagementProps> = () => {
  const { budgetSummary, updateBudget } = useBudget();
  const [isEditing, setIsEditing] = useState(false);
  const [editingAllocation, setEditingAllocation] = useState<ExtendedBudgetAllocation | null>(null);
  
  // Handle editing an existing allocation
  const handleEditAllocation = (allocation: ExtendedBudgetAllocation) => {
    setEditingAllocation(allocation);
    setIsEditing(true);
  };
  
  // Handle saving edited allocation
  const handleSaveEdit = (updatedAllocation: ExtendedBudgetAllocation) => {
    if (!budgetSummary) return;
    
    const updatedAllocations = budgetSummary.allocations.map(a => 
      a.id === updatedAllocation.id ? updatedAllocation : a
    );
    
    updateBudget({
      ...budgetSummary,
      allocations: updatedAllocations
    } as ExtendedBudgetSummary);
    
    setIsEditing(false);
    setEditingAllocation(null);
  };
  
  // Handle adding a new allocation
  const handleAddAllocation = (name: string, amount: number) => {
    if (!name || amount <= 0 || !budgetSummary) return;
    
    const newAllocation: ExtendedBudgetAllocation = {
      id: `allocation-${Date.now()}`,
      name,
      amount,
      type: AllocationTypeEnum.EXPENSE, // Default to expense type
      remaining: amount, // Initially, remaining is the full amount
      spent: 0,
      color: getRandomColor()
    };
    
    updateBudget({
      ...budgetSummary,
      allocations: [...budgetSummary.allocations, newAllocation]
    } as ExtendedBudgetSummary);
  };
  
  return (
    <div className="pb-safe px-4 pt-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold mb-2">Budget Management</h1>
        <p className="text-gray-600">Manage your budget allocations</p>
      </motion.div>
      
      {/* Current allocations */}
      <AllocationList 
        allocations={budgetSummary?.allocations || []} 
        onEditAllocation={handleEditAllocation}
      />
      
      {/* Add new allocation */}
      <NewAllocationForm onAddAllocation={handleAddAllocation} />
      
      {/* Edit allocation modal */}
      {isEditing && editingAllocation && (
        <EditAllocationModal
          allocation={editingAllocation}
          onSave={handleSaveEdit}
          onCancel={() => {
            setIsEditing(false);
            setEditingAllocation(null);
          }}
        />
      )}
    </div>
  );
};

export default BudgetManagement;
