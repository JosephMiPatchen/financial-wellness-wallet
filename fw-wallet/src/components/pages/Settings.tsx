import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useBudget } from '../../context/BudgetContext';
import type { ExtendedBudgetSummary } from '../../budget/extended-types';

interface SettingsProps {
  // Props if needed
}

export const Settings: React.FC<SettingsProps> = () => {
  const { budgetSummary, resetBudget } = useBudget();
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  
  // Handle budget reset
  const handleResetBudget = () => {
    resetBudget();
    setShowResetConfirm(false);
  };
  
  return (
    <div className="pb-safe px-4 pt-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold mb-2">Settings</h1>
        <p className="text-gray-600">Customize your budget experience</p>
      </motion.div>
      
      {/* Budget Settings */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <h2 className="text-xl font-semibold mb-3">Budget Settings</h2>
        
        <div className="mb-4">
          <p className="text-gray-700 mb-2">Budget Period</p>
          <p className="text-sm text-gray-500">
            Your budget resets on the 1st of each month
          </p>
        </div>
        
        <div className="mb-4">
          <p className="text-gray-700 mb-2">Total Budget</p>
          <p className="font-medium">
            ${budgetSummary?.totalAmount.toFixed(2) || '0.00'}
          </p>
        </div>
        
        <button
          className="w-full bg-red-100 text-red-700 py-2 rounded-md font-medium mb-2"
          onClick={() => setShowResetConfirm(true)}
        >
          Reset Budget
        </button>
        <p className="text-xs text-gray-500 text-center">
          This will clear all spending data but keep your allocations
        </p>
      </div>
      
      {/* App Settings */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <h2 className="text-xl font-semibold mb-3">App Settings</h2>
        
        <div className="flex justify-between items-center py-3 border-b border-gray-100">
          <div>
            <p className="font-medium">Notifications</p>
            <p className="text-sm text-gray-500">Get alerts for daily spending limits</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer" 
              checked={notificationEnabled}
              onChange={() => setNotificationEnabled(!notificationEnabled)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        
        <div className="flex justify-between items-center py-3">
          <div>
            <p className="font-medium">Dark Mode</p>
            <p className="text-sm text-gray-500">Switch to dark theme</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer" 
              checked={darkModeEnabled}
              onChange={() => setDarkModeEnabled(!darkModeEnabled)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
      
      {/* App Info */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <h2 className="text-xl font-semibold mb-3">About</h2>
        <p className="text-gray-700 mb-1">Financial Wellness Wallet</p>
        <p className="text-sm text-gray-500 mb-3">Version 1.0.0</p>
        <p className="text-xs text-gray-400">
          A digital cash envelope system for better budget management
        </p>
      </div>
      
      {/* Reset confirmation modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg w-full max-w-md p-5"
          >
            <h2 className="text-xl font-semibold mb-2">Reset Budget?</h2>
            <p className="text-gray-600 mb-4">
              This will clear all spending data but keep your allocations. This action cannot be undone.
            </p>
            <div className="flex space-x-3">
              <button
                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-md font-medium"
                onClick={() => setShowResetConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="flex-1 bg-red-600 text-white py-2 rounded-md font-medium"
                onClick={handleResetBudget}
              >
                Reset Budget
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Settings;
