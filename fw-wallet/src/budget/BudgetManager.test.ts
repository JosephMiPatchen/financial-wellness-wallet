import { describe, it, expect, beforeEach } from 'vitest';
import { BudgetManager } from './BudgetManager';
import { AllocationTypeEnum } from './types';

describe('BudgetManager', () => {
  let budgetManager: BudgetManager;
  const monthlyIncome = 1000;

  beforeEach(() => {
    // Create a fresh BudgetManager instance before each test
    budgetManager = new BudgetManager(monthlyIncome);
  });

  it('should initialize with the correct monthly income', () => {
    expect(budgetManager.getBudgetSummary().totalIncome).toBe(monthlyIncome);
  });

  it('should throw an error when initialized with negative income', () => {
    expect(() => new BudgetManager(-100)).toThrow('Monthly income must be greater than zero');
  });

  it('should create a budget with valid allocations', () => {
    const allocations = [
      { name: 'Savings', amount: 200, type: AllocationTypeEnum.SAVING },
      { name: 'Rent', amount: 500, type: AllocationTypeEnum.EXPENSE },
      { name: 'Food', amount: 300, type: AllocationTypeEnum.EXPENSE }
    ];

    expect(budgetManager.createBudget(allocations)).toBe(true);
    
    const summary = budgetManager.getBudgetSummary();
    expect(summary.totalAllocated).toBe(1000);
    expect(summary.unallocated).toBe(0);
    expect(summary.allocations.length).toBe(3);
  });

  it('should throw an error when allocations exceed income', () => {
    const allocations = [
      { name: 'Savings', amount: 500, type: AllocationTypeEnum.SAVING },
      { name: 'Rent', amount: 600, type: AllocationTypeEnum.EXPENSE }
    ];

    expect(() => budgetManager.createBudget(allocations)).toThrow('Total allocations exceed monthly income');
  });

  it('should record expenses correctly', () => {
    // Create a budget
    budgetManager.createBudget([
      { name: 'Food', amount: 300, type: AllocationTypeEnum.EXPENSE }
    ]);

    // Record an expense
    const transactionId = budgetManager.recordExpense('Food', 50, 'Groceries');
    expect(transactionId).toBeTruthy();

    // Check remaining amount
    expect(budgetManager.getRemainingAmount('Food')).toBe(250);

    // Check transactions
    const transactions = budgetManager.getCategoryTransactions('Food');
    expect(transactions.length).toBe(1);
    expect(transactions[0].amount).toBe(50);
    expect(transactions[0].description).toBe('Groceries');
  });

  it('should throw an error when expense exceeds remaining amount', () => {
    // Create a budget
    budgetManager.createBudget([
      { name: 'Entertainment', amount: 200, type: AllocationTypeEnum.EXPENSE }
    ]);

    // Record an expense that exceeds the budget
    expect(() => budgetManager.recordExpense('Entertainment', 250, 'Concert tickets'))
      .toThrow('Insufficient funds in "Entertainment"');
  });

  it('should reset the budget correctly', () => {
    // Create a budget
    budgetManager.createBudget([
      { name: 'Food', amount: 300, type: AllocationTypeEnum.EXPENSE }
    ]);

    // Record an expense
    budgetManager.recordExpense('Food', 50, 'Groceries');
    expect(budgetManager.getRemainingAmount('Food')).toBe(250);

    // Reset the budget
    budgetManager.resetBudget();

    // Check that remaining amounts are reset
    expect(budgetManager.getRemainingAmount('Food')).toBe(300);
    
    // Check that transactions are cleared
    expect(budgetManager.getTransactions().length).toBe(0);
  });

  it('should add a new allocation correctly', () => {
    // Create an initial budget
    budgetManager.createBudget([
      { name: 'Rent', amount: 500, type: AllocationTypeEnum.EXPENSE }
    ]);

    // Add a new allocation
    budgetManager.addAllocation({
      name: 'Entertainment',
      amount: 200,
      type: AllocationTypeEnum.EXPENSE
    });

    // Check that the allocation was added
    const summary = budgetManager.getBudgetSummary();
    expect(summary.allocations.length).toBe(2);
    expect(summary.totalAllocated).toBe(700);
    
    const entertainment = summary.allocations.find(a => a.name === 'Entertainment');
    expect(entertainment).toBeTruthy();
    expect(entertainment?.amount).toBe(200);
    expect(entertainment?.remaining).toBe(200);
  });

  it('should update an allocation correctly', () => {
    // Create an initial budget
    budgetManager.createBudget([
      { name: 'Food', amount: 300, type: AllocationTypeEnum.EXPENSE }
    ]);

    // Update the allocation
    budgetManager.updateAllocation('Food', { amount: 400 });

    // Check that the allocation was updated
    const summary = budgetManager.getBudgetSummary();
    const food = summary.allocations.find(a => a.name === 'Food');
    expect(food?.amount).toBe(400);
    expect(food?.remaining).toBe(400);
  });
});
