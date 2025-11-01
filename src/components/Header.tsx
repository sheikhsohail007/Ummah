import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, Menu, X, ChevronDown } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (value: boolean) => void;
}

function Header({
  darkMode,
  setDarkMode,
  mobileMenuOpen,
  setMobileMenuOpen
}: HeaderProps) {
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Primary navigation (most important)
  const primaryNavigation = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/salah-guide', label: 'Correct Salah', icon: '🕌' },
    { path: '/prayer-times', label: 'Prayer Times', icon: '⏰' },
    { path: '/quran', label: 'Quran', icon: '📖' },
    { path: '/mood', label: 'Mood Selector', icon: '😊' },
    { path: '/islamic-ai', label: 'Islamic AI', icon: '🤖' }
  ];

  // Secondary navigation (dropdown menu)
  const secondaryNavigation = [
    { path: '/reflection', label: 'Daily Reflection', icon: '💭' },
    { path: '/islamic-stories', label: 'Islamic Stories', icon: '📚' },
    { path: '/prophet-stories', label: 'Prophet Stories', icon: '👥' },
    { path: '/prophetic-wisdom', label: 'Prophetic Wisdom', icon: '💎' },
    { path: '/dua', label: 'Dua & Dhikr', icon: '🤲' },
    { path: '/allah-names', label: '99 Names of Allah', icon: '🕋' },
    { path: '/tasbih', label: 'Tasbih Counter', icon: '📿' }


  ];

  return (
    <header className="bg-white dark:bg-gray-800 shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-emerald-800 dark:text-emerald-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex-shrink-0"
          >
            ☪ Qalam Verse
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {/* Primary Navigation */}
            {primaryNavigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${location.pathname === item.path
                  ? 'bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-300'
                  : 'text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
              >
                <span className="text-xs">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}

            {/* More Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <span>More</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                  {secondaryNavigation.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setDropdownOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${location.pathname === item.path
                        ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20'
                        : 'text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400'
                        }`}
                    >
                      <span>{item.icon}</span>
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Right Section - Dark Mode + Mobile Menu */}
          <div className="flex items-center space-x-2">
            {/* Dark Mode Toggle - Now more prominent */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 border border-gray-200 dark:border-gray-600"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 border border-gray-200 dark:border-gray-600"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <nav className="py-4 max-h-[calc(100vh-120px)] overflow-y-auto">
              {/* All items in mobile */}
              <div className="space-y-1">
                {[...primaryNavigation, ...secondaryNavigation].map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${location.pathname === item.path
                      ? 'bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-300'
                      : 'text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        )}
      </div>

      {/* Backdrop for dropdown */}
      {dropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setDropdownOpen(false)}
        />
      )}
    </header>
  );
}

export default Header;
