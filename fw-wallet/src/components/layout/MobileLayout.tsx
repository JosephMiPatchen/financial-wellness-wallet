import React from 'react';
import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface MobileLayoutProps {
  children: ReactNode;
  currentTab: 'home' | 'budget' | 'settings';
  onTabChange: (tab: 'home' | 'budget' | 'settings') => void;
}

/**
 * Mobile-optimized layout with bottom navigation
 * Provides consistent layout for all screens with safe area insets
 */
export const MobileLayout: React.FC<MobileLayoutProps> = ({
  children,
  currentTab,
  onTabChange
}) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Main content area */}
      <main className="flex-1 pb-20">
        {children}
      </main>
      
      {/* Bottom navigation - fixed at bottom with safe area inset */}
      <motion.nav 
        className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div className="flex justify-around items-center h-16">
          <TabButton 
            icon="🏠" 
            label="Home" 
            isActive={currentTab === 'home'}
            onClick={() => onTabChange('home')}
          />
          <TabButton 
            icon="💰" 
            label="Budget" 
            isActive={currentTab === 'budget'}
            onClick={() => onTabChange('budget')}
          />
          <TabButton 
            icon="⚙️" 
            label="Settings" 
            isActive={currentTab === 'settings'}
            onClick={() => onTabChange('settings')}
          />
        </div>
      </motion.nav>
    </div>
  );
};

interface TabButtonProps {
  icon: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ icon, label, isActive, onClick }) => {
  return (
    <motion.button
      className={`flex flex-col items-center justify-center w-20 h-full relative ${
        isActive ? 'text-blue-600' : 'text-gray-500'
      }`}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
    >
      <span className="text-xl mb-1">{icon}</span>
      <span className="text-xs">{label}</span>
      
      {isActive && (
        <motion.div
          className="absolute bottom-0 w-10 h-1 bg-blue-600 rounded-t-full"
          layoutId="activeTab"
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      )}
    </motion.button>
  );
};

export default MobileLayout;
