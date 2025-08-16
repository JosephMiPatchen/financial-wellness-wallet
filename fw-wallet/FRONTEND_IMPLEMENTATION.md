# Financial Wellness Wallet - Frontend Implementation Guide

## Core Vision: Emulating the Cash Spending Experience

This document outlines the implementation plan for the Financial Wellness Wallet UI using shadcn/ui components. The application is designed to **emulate the cash spending experience** by creating a strong visual feedback loop that helps users track their discretionary spending throughout the month.

### Key Principles:

1. **Immediate Visual Feedback** - Users should instantly see the impact of their spending on their available funds
2. **Focus on Discretionary Spending** - Special emphasis on daily/unplanned expenses (coffee, snacks, travel) that are harder to track
3. **Tangible Representation** - Make digital spending feel as tangible as handing over physical cash
4. **Daily Awareness** - Encourage users to check their remaining allocations frequently

The UI will create a tight feedback loop between spending actions and remaining budget, making users more conscious of their spending patterns throughout the month.

## Application Structure

The application will consist of three main pages:

1. **Dashboard/Home Page** - Displays wallet balance, budget overview, and spending options
2. **Send Transaction Page** - Modal interface for sending PYUSD with budget allocation selection
3. **Budget Management Page** - Interface for creating and managing budget allocations

## UI Components and Libraries

- **Component Library**: [shadcn/ui](https://ui.shadcn.com/)
- **Charts**: [Recharts](https://recharts.org/) for budget visualization
- **Animations**: [Framer Motion](https://www.framer.com/motion/) for transaction feedback animations

## Page Implementations

### 1. Dashboard/Home Page

This is the main signed-in screen that users will see after authentication.

#### Components:
- **Header**
  - App logo and title
  - User account info/avatar
  - Navigation menu

- **Balance Card**
  - Current PYUSD balance
  - ETH balance (for gas fees)
  - Quick refresh button

- **Budget Summary Card**
  - Total remaining to spend this month
  - Monthly reset date indicator
  - Visual progress bar of overall budget usage

- **Allocation List**
  - List of budget allocations with emphasis on discretionary spending categories
  - Visual cash envelope representation for each category
  - Daily spending limits clearly displayed (e.g., "$10/day left for Coffee")
  - Dynamic progress bars showing spent vs. remaining with color coding
  - Prominent display of remaining amounts with large, cash-like typography
  - Visual warnings when approaching allocation limits
  - Spending trends (today vs. average day) to encourage daily awareness

- **Action Buttons**
  - "Send Crypto" button - Opens transaction modal
  - "Tap to Pay" button (non-functional in initial implementation)
  - "Manage Budget" button - Navigate to budget management page

#### Implementation Notes:
- Use shadcn/ui `Card`, `Progress`, and `Button` components
- Implement responsive design for mobile and desktop views
- Add subtle animations for progress bars and balance updates

### 2. Send Transaction Modal

This modal appears when users click "Send Crypto" and guides them through the transaction process.

#### Components:
- **Transaction Form**
  - Recipient address field (with address book integration in future)
  - Amount input with PYUSD denomination
  - Dropdown to select budget allocation category
  - Warning if transaction would exceed allocation budget

- **Confirmation Section**
  - Transaction summary
  - Gas fee estimate
  - "Send Transaction" button
  - "Cancel" button

- **Transaction Animation**
  - Realistic cash-counting animation when sending funds
  - Visual representation of money physically leaving the selected allocation
  - Immediate and dramatic progress bar update animation
  - Daily spending impact visualization (e.g., "This reduces your daily coffee budget by $2")
  - Optional haptic feedback for mobile users to enhance the physical sensation
  - Sound effects mimicking cash register or wallet opening (toggleable)

#### Implementation Notes:
- Use shadcn/ui `Dialog`, `Form`, `Select`, and `Input` components
- Implement form validation for address and amount
- Create smooth transitions between form steps
- Add clear error handling for transaction failures

### 3. Budget Management Page

This page allows users to create and modify their budget allocations.

#### Components:
- **Budget Setup Form**
  - Monthly income/available funds input
  - Budget period selection (e.g., starts on 1st of month)
  - Allocation creation interface:
    - Name input
    - Amount input
    - Type selection (expense, saving, etc.)
  - "Add Another Allocation" button
  - Summary of allocations and remaining unallocated funds

- **Existing Budget Display** (if budget exists)
  - List of current allocations with edit/delete options
  - Reset budget button (with confirmation)
  - Budget history/performance (future enhancement)

#### Implementation Notes:
- Use shadcn/ui `Form`, `Card`, `Table`, and `Dialog` components
- Implement drag-and-drop reordering of allocations (future enhancement)
- Add validation to prevent over-allocation of funds
- Include confirmation dialogs for destructive actions

## Transaction Flow and Cash Experience

The transaction flow is designed to provide strong visual and emotional feedback that emulates the experience of physically spending cash:

1. User selects "Send Crypto" from dashboard
2. Transaction modal opens with a visual representation of their cash envelopes
3. User enters recipient address, amount, and selects allocation category
4. System shows real-time impact on daily spending limits ("This will reduce your daily coffee budget by $2")
5. User confirms transaction with a deliberate sliding gesture (mimicking pulling cash from wallet)
6. While transaction is processing:
   - Show animated cash counting animation
   - Display physical envelope emptying
7. On successful transaction:
   - Show dramatic success animation with cash movement
   - Display updated allocation with animated progress bar change
   - Show immediate impact on daily spending limits
   - Provide haptic feedback (on mobile) to enhance physical sensation
8. Return to dashboard with visibly updated balances and allocation progress
9. Show spending summary and remaining daily limits

### Cash Experience Animation Details:
- Use realistic cash/coin animations that physically move from one place to another
- Implement envelope-style visualizations that open and close
- Add sound effects that mimic physical cash handling (optional/toggleable)
- Create dramatic before/after visualizations of remaining funds
- Show daily impact calculations prominently ("$8/day left for the rest of the month")

## Data Management

### Budget Cycle Management:
- Budget will reset on a user-defined day each month (default: 1st)
- System will track spending within each budget period
- Historical data will be maintained for future reporting features

### Transaction Categorization:
- Each transaction must be assigned to a budget allocation
- Transactions will reduce the available amount in that allocation
- System will warn users when approaching allocation limits

## Implementation Phases

### Phase 1: Core UI Structure
- Set up shadcn/ui components
- Implement basic page layouts
- Create navigation between pages

### Phase 2: Budget Management
- Implement budget creation form
- Build allocation management interface
- Create budget summary visualizations

### Phase 3: Transaction Integration
- Connect transaction functionality to UI
- Implement allocation selection in transaction flow
- Create transaction success/failure handling

### Phase 4: Animations and Feedback
- Add progress bar animations
- Implement transaction feedback animations
- Enhance overall UI with subtle motion

### Phase 5: Refinement and Testing
- Optimize for mobile experience
- Add error handling and edge cases
- Perform usability testing

## Technical Considerations

### State Management:
- Use React Context for global state (wallet connection, balances)
- Implement local state for form handling
- Consider using a lightweight state management library if complexity increases

### Responsive Design:
- Mobile-first approach
- Breakpoints for tablet and desktop
- Touch-friendly controls for mobile users

### Accessibility:
- Ensure all components meet WCAG standards
- Implement keyboard navigation
- Add appropriate ARIA labels

## Next Steps

1. Set up shadcn/ui in the project
2. Create basic page layouts and navigation
3. Implement the Dashboard/Home page components
4. Build the transaction modal with allocation selection
5. Create the budget management interface

# Implementation Plan (Step-by-Step Commits)

This section outlines the specific implementation steps, each representing a single commit. Each step builds on the previous one and can be tested independently before moving to the next step.

## Step 1: Set Up Project Dependencies and Configuration

**Commit Message:** "Setup shadcn/ui and project dependencies"

- Install required dependencies (shadcn/ui components, Recharts, Framer Motion)
- Set up Tailwind CSS configuration
- Create basic component structure folders
- Add shadcn/ui theme configuration

**Testing:** Verify all dependencies install correctly and the project builds without errors.

## Step 2: Create Basic Layout Components

**Commit Message:** "Add layout components and navigation structure"

- Create `Layout.tsx` component with header and content areas
- Implement basic navigation between pages
- Add placeholder pages for Dashboard, Budget Management
- Set up routing structure

**Testing:** Verify navigation between placeholder pages works correctly.

## Step 3: Implement Wallet Balance Display

**Commit Message:** "Add wallet balance display components"

- Create `BalanceCard.tsx` component to display PYUSD balance
- Add ETH balance display for gas fees
- Implement refresh functionality
- Connect to existing wallet functionality

**Testing:** Verify balance displays correctly and refresh works.

## Step 4: Create Budget Summary Component

**Commit Message:** "Implement budget summary component"

- Create `BudgetSummary.tsx` component
- Add total remaining budget display
- Implement overall budget progress bar
- Connect to budget manager

**Testing:** Verify budget summary displays correctly with test data.

## Step 5: Build Cash Envelope Allocation Component

**Commit Message:** "Add cash envelope allocation system with daily limits"

- Create `CashEnvelopes.tsx` component with envelope-style UI
- Implement individual allocation items with cash-like visual representation
- Add daily spending limit calculations and displays
- Implement color coding and visual warnings for low balances
- Add spending trend indicators (today vs. average day)
- Connect to budget manager for allocation data

**Testing:** Verify allocations display correctly with daily limits and cash-like visuals.

## Step 6: Implement Action Buttons

**Commit Message:** "Add action buttons for transactions and budget management"

- Create action button components for Send, Tap to Pay, and Manage Budget
- Implement navigation to appropriate pages/modals
- Style buttons according to importance

**Testing:** Verify buttons appear correctly and navigation works.

## Step 7: Create Transaction Modal Structure

**Commit Message:** "Implement transaction modal structure"

- Create `TransactionModal.tsx` component
- Add form structure for transaction details
- Implement basic modal open/close functionality
- Connect modal trigger to Send button

**Testing:** Verify modal opens and closes correctly.

## Step 8: Build Transaction Form

**Commit Message:** "Add transaction form with allocation selection"

- Implement form fields for recipient address and amount
- Create allocation selection dropdown
- Add validation for form fields
- Implement form state management

**Testing:** Verify form validation works and fields capture data correctly.

## Step 9: Connect Transaction Functionality

**Commit Message:** "Connect transaction form to blockchain functionality"

- Link form submission to transaction sending
- Add loading state during transaction
- Implement error handling for failed transactions
- Connect allocation selection to budget manager

**Testing:** Verify transactions can be sent and allocations are updated.

## Step 10: Add Cash-Like Transaction Experience

**Commit Message:** "Implement cash-like transaction experience and feedback"

- Create realistic cash counting animation for transactions
- Add envelope opening/emptying visual metaphor
- Implement dramatic before/after allocation comparisons
- Add daily spending impact calculations and displays
- Implement optional sound effects and haptic feedback
- Create emotional response triggers (celebration for saving, warning for overspending)

**Testing:** Verify the cash experience feels tangible and provides strong feedback on spending impact.

## Step 11: Create Budget Management Form

**Commit Message:** "Add budget creation and management form"

- Create `BudgetForm.tsx` component
- Implement fields for income and allocation creation
- Add validation for budget totals
- Connect to budget manager

**Testing:** Verify budget can be created and validated correctly.

## Step 12: Implement Budget Editing

**Commit Message:** "Add budget editing and reset functionality"

- Create interface for editing existing allocations
- Add budget reset functionality
- Implement confirmation dialogs for destructive actions
- Connect to budget manager

**Testing:** Verify budget can be edited and reset correctly.

## Step 13: Enhance Mobile Responsiveness

**Commit Message:** "Improve mobile responsiveness across all components"

- Adjust layouts for small screens
- Implement touch-friendly controls
- Test and fix any mobile-specific issues
- Enhance navigation for mobile devices

**Testing:** Verify all components display and function correctly on mobile devices.

## Step 14: Add Final Polish and Refinements

**Commit Message:** "Add final UI polish and refinements"

- Implement consistent styling across all components
- Add subtle animations and transitions
- Fix any remaining UI/UX issues
- Conduct final testing across all features

**Testing:** Verify the entire application works smoothly with a consistent look and feel.

## Step 15: Documentation and Code Cleanup

**Commit Message:** "Add documentation and clean up code"

- Document components and their usage
- Clean up any unused code or components
- Optimize performance where needed
- Prepare for future enhancements

**Testing:** Verify documentation is complete and code is clean and optimized.
