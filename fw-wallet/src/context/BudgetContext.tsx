import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { BudgetManager, AllocationTypeEnum } from '../budget';
import type { BudgetSummary, BudgetAllocationInput } from '../budget';

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
  budgetSummary: BudgetSummary | null;
  refreshBudget: () => void;
  recordExpense: (categoryName: string, amount: number, description: string) => string;
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
  
  const [budgetSummary, setBudgetSummary] = useState<BudgetSummary | null>(null);
  
  // Refresh budget summary
  const refreshBudget = () => {
    try {
      const summary = budgetManager.getBudgetSummary();
      setBudgetSummary(summary);
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
  
  // Initialize budget summary on mount
  useEffect(() => {
    refreshBudget();
  }, []);
  
  return (
    <BudgetContext.Provider value={{ budgetManager, budgetSummary, refreshBudget, recordExpense }}>
      {children}
    </BudgetContext.Provider>
  );
};
