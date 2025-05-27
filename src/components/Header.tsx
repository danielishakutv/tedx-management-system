
import React from 'react';
import { Moon, Sun, LogOut, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { demoCredentials } from '@/services/ticketService';

interface HeaderProps {
  onLogout: () => void;
}

const Header = ({ onLogout }: HeaderProps) => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
            <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex-shrink-0">
              <span className="text-white font-bold text-xs sm:text-sm">TEDx</span>
            </div>
            <div className="min-w-0">
              <h1 className="text-sm sm:text-xl font-bold text-gray-900 dark:text-white truncate">
                <span className="hidden sm:inline">TEDxYola Registration Desk</span>
                <span className="sm:hidden">TEDxYola</span>
              </h1>
            </div>
          </div>

          {/* User Info and Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
            {/* Officer Name - Hidden on mobile */}
            <div className="hidden md:block">
              <p className="text-xs text-gray-600 dark:text-gray-300">
                Welcome back,
              </p>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {demoCredentials.name}
              </p>
            </div>

            {/* Officer Name - Mobile version */}
            <div className="md:hidden">
              <p className="text-xs font-medium text-gray-900 dark:text-white">
                {demoCredentials.name.split(' ')[0]}
              </p>
            </div>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="w-8 h-8 sm:w-9 sm:h-9 p-0"
            >
              {theme === 'dark' ? (
                <Sun className="h-3 w-3 sm:h-4 sm:w-4" />
              ) : (
                <Moon className="h-3 w-3 sm:h-4 sm:w-4" />
              )}
            </Button>

            {/* Logout Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onLogout}
              className="flex items-center space-x-1 sm:space-x-2 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 h-8 sm:h-9 px-2 sm:px-3"
            >
              <LogOut className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline text-xs sm:text-sm">Sign Out</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
