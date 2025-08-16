/**
 * Budget Management Module
 * 
 * This module provides functionality for creating and managing a zero-based budget system
 * where every dollar of income is allocated to a specific purpose.
 */

export { BudgetManager } from './BudgetManager';
export { AllocationTypeEnum } from './types';
export type { 
  BudgetAllocation,
  BudgetAllocationInput,
  BudgetSummary,
  ExpenseTransaction
} from './types';
