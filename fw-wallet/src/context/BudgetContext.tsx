import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { BudgetManager, AllocationTypeEnum } from '../budget';
import type { BudgetAllocationInput } from '../budget';
import { extendBudgetSummary } from '../budget/extended-types';
import type { ExtendedBudgetSummary } from '../budget/extended-types';

// Default monthly income (can be adjusted by user later)
const DEFAULT_MONTHLY_INCOME = 5000;

// Default budget allocations for testing
const DEFAULT_ALLOCATIONS: BudgetAllocationInput[] = [
  { name: 'Rent', amount: 1500, type: AllocationTypeEnum.EXPENSE },
  { name: 'Groceries', amount: 500, type: AllocationTypeEnum.EXPENSE },
  { name: 'Coffee', amount: 100, type: AllocationTypeEnum.EXPENSE },
  { name: 'Entertainment', amount: 200, type: AllocationTypeEnum.EXPENSE },
  { name: 'Savings', amount: 1000, type: AllocationTypeEnum.SAVING },
];

interface BudgetContextType {
  budgetManager: BudgetManager;
  budgetSummary: ExtendedBudgetSummary | null;
  refreshBudget: () => void;
  recordExpense: (categoryName: string, amount: number, description: string) => string;
  updateBudget: (updatedBudget: ExtendedBudgetSummary) => void;
  resetBudget: () => void;
}

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export const useBudget = () => {
  const context = useContext(BudgetContext);
  if (!context) {
    throw new Error('useBudget must be used within a BudgetProvider');
  }
  return context;
};

interface BudgetProviderProps {
  children: ReactNode;
}

export const BudgetProvider: React.FC<BudgetProviderProps> = ({ children }) => {
  const [budgetManager] = useState(() => {
    // Initialize budget manager with default income
    const manager = new BudgetManager(DEFAULT_MONTHLY_INCOME);
    
    try {
      // Create default budget allocations
      manager.createBudget(DEFAULT_ALLOCATIONS);
    } catch (error) {
      console.error('Error creating default budget:', error);
    }
    
    return manager;
  });
  
  const [budgetSummary, setBudgetSummary] = useState<ExtendedBudgetSummary | null>(null);
  
  // Refresh budget summary
  const refreshBudget = () => {
    try {
      const summary = budgetManager.getBudgetSummary();
      // Convert to extended budget summary with UI properties
      const extendedSummary = extendBudgetSummary(summary);
      setBudgetSummary(extendedSummary);
    } catch (error) {
      console.error('Error getting budget summary:', error);
    }
  };
  
  // Record an expense and refresh budget
  const recordExpense = (categoryName: string, amount: number, description: string): string => {
    try {
      const transactionId = budgetManager.recordExpense(categoryName, amount, description);
      refreshBudget();
      return transactionId;
    } catch (error) {
      console.error('Error recording expense:', error);
      throw error;
    }
  };
  
  // Update budget with new allocations
  const updateBudget = (updatedBudget: ExtendedBudgetSummary) => {
    try {
      // In a real implementation, we would update the budget in the BudgetManager
      // For now, we'll just update the state
      setBudgetSummary(updatedBudget);
    } catch (error) {
      console.error('Error updating budget:', error);
    }
  };
  
  // Reset budget spending (keep allocations but reset spent amounts)
  const resetBudget = () => {
    try {
      if (budgetSummary) {
        // Simply refresh the budget to reset it
        // In a real implementation, we would call a method on the BudgetManager
        refreshBudget();
      }
    } catch (error) {
      console.error('Error resetting budget:', error);
    }
  };
  
  // Initialize budget summary on mount
  useEffect(() => {
    refreshBudget();
  }, []);
  
  return (
    <BudgetContext.Provider value={{ 
      budgetManager, 
      budgetSummary, 
      refreshBudget, 
      recordExpense,
      updateBudget,
      resetBudget
    }}>
      {children}
    </BudgetContext.Provider>
  );
};
