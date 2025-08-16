# Budget Management Module

## Overview
The Budget Management module provides functionality for creating and managing a zero-based budget system (every dollar has a purpose). Users can allocate their monthly income to different categories and track their spending against these allocations in real-time.

## Features
- Create a monthly budget based on after-tax income
- Allocate funds to different categories (savings, investments, expenses)
- Track spending against budget allocations
- Reset budget at the beginning of each month
- Deduct expenses from specific budget categories

## Core Components

### BudgetManager
The main class responsible for creating and managing budgets. It handles:
- Budget creation based on monthly income
- Allocation of funds to different categories
- Tracking spending against allocations
- Budget reset functionality

### BudgetAllocation
Represents a single budget category with:
- Category name
- Allocated amount
- Remaining amount
- Type (saving/investing or spending)

## Usage Example

```typescript
// Initialize budget manager with monthly income
const budgetManager = new BudgetManager(1000);

// Create budget with allocations
budgetManager.createBudget([
  { name: "Investing/Saving", amount: 250, type: "SAVING" },
  { name: "Rent", amount: 500, type: "EXPENSE" },
  { name: "Daily Spending", amount: 250, type: "EXPENSE" }
]);

// Record an expense
budgetManager.recordExpense("Daily Spending", 5, "Starbucks coffee");

// Check remaining budget in a category
const dailySpendingRemaining = budgetManager.getRemainingAmount("Daily Spending");
// Returns 245

// Reset budget for new month
budgetManager.resetBudget();
```

## Integration
This module serves as the backend logic for the Financial Wellness Wallet React application. It can be integrated with UI components to provide a complete budgeting experience.
