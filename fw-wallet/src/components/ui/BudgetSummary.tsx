import React from 'react';
import { motion } from 'framer-motion';
import type { BudgetSummary as BudgetSummaryType } from '../../budget';

interface BudgetSummaryProps {
  summary: BudgetSummaryType;
}

/**
 * Displays a summary of the budget with circular progress indicator
 * Optimized for mobile viewing with large, clear typography
 */
export const BudgetSummary: React.FC<BudgetSummaryProps> = ({ summary }) => {
  // Calculate percentage of total budget remaining
  const percentRemaining = (summary.totalRemaining / summary.totalAllocated) * 100;
  
  // Calculate the circle's stroke-dasharray and stroke-dashoffset
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (percentRemaining / 100) * circumference;
  
  return (
    <div className="w-full px-4 py-6">
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex flex-col items-center">
          {/* Circular progress indicator */}
          <div className="relative w-32 h-32 mb-4">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle 
                cx="50" 
                cy="50" 
                r={radius} 
                fill="none" 
                stroke="#e6e6e6" 
                strokeWidth="10"
              />
              
              {/* Progress circle */}
              <motion.circle 
                cx="50" 
                cy="50" 
                r={radius} 
                fill="none" 
                stroke={percentRemaining > 50 ? "#10b981" : percentRemaining > 20 ? "#f59e0b" : "#ef4444"} 
                strokeWidth="10"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: dashOffset }}
                transition={{ duration: 1, ease: "easeOut" }}
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
              />
              
              {/* Percentage text */}
              <text 
                x="50" 
                y="50" 
                textAnchor="middle" 
                dominantBaseline="middle" 
                className="text-2xl font-bold"
                fill="#333"
              >
                {percentRemaining.toFixed(0)}%
              </text>
              
              <text 
                x="50" 
                y="65" 
                textAnchor="middle" 
                dominantBaseline="middle" 
                className="text-xs"
                fill="#666"
              >
                remaining
              </text>
            </svg>
          </div>
          
          {/* Budget amounts */}
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold">${summary.totalRemaining.toFixed(2)}</h2>
            <p className="text-gray-500 text-sm">of ${summary.totalAllocated.toFixed(2)} allocated</p>
          </div>
          
          {/* Additional budget info */}
          <div className="w-full grid grid-cols-2 gap-4 text-center">
            <div className="bg-gray-50 p-3 rounded-md">
              <p className="text-gray-500 text-xs">Total Income</p>
              <p className="font-semibold">${summary.totalIncome.toFixed(2)}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-md">
              <p className="text-gray-500 text-xs">Unallocated</p>
              <p className="font-semibold">${summary.unallocated.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetSummary;
