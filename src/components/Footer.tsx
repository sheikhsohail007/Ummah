import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showCookies, setShowCookies] = useState(false);

  const PolicyModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode
  }> = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-4xl max-h-[80vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <footer className="bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-lg">🕌</span>
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  Qalam Verse
                </h3>
              </div>
              <p className="text-gray-300 mb-4 leading-relaxed">
                Your comprehensive digital companion for Islamic guidance, prayers, and spiritual growth.
                Discover authentic Islamic teachings, daily prayers, Quranic verses, and Prophetic wisdom
                to strengthen your faith and enhance your spiritual journey.
              </p>
              <div className="flex space-x-4">
                <a href="https://www.instagram.com/qalamverse.official" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a href="https://x.com/qalamverses" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a href="https://facebook.com/profile.php?id=61582556711955" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a href="mailto:qalamversehelp@gmail.com" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h.749L12 10.855 21.615 3.821h.749c.904 0 1.636.732 1.636 1.636z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <div className="border-b border-gray-700 pb-2">
                <h4 className="text-lg font-semibold text-yellow-400 flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" />
                  </svg>
                  <span>Quick Links</span>
                </h4>
              </div>
              <ul className="space-y-3">
                <li>
                  <Link to="/salah-guide" className="group flex items-center space-x-3 text-gray-300 hover:text-yellow-400 transition-all duration-200 hover:translate-x-1">
                    <div className="p-2 rounded-lg bg-gray-800 group-hover:bg-yellow-400/10 transition-colors">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6,2C6,2 12,2 12,8C12,10 12.4,10.5 12.8,11.2C13.2,11.9 13.9,12.4 15,13C15.9,12.4 16.6,11.9 17,11.2C17.4,10.5 18,10 18,8C18,2 24,2 24,2V22H18V16C16.9,16.7 15.4,17.4 12,16C8.6,17.4 7.1,16.7 6,16V22H0V2H6Z" />
                      </svg>
                    </div>
                    <span className="font-medium">Correct Your Salah</span>
                  </Link>
                </li>
                <li>
                  <Link to="/prayer-times" className="group flex items-center space-x-3 text-gray-300 hover:text-yellow-400 transition-all duration-200 hover:translate-x-1">
                    <div className="p-2 rounded-lg bg-gray-800 group-hover:bg-yellow-400/10 transition-colors">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16.2,16.2L11,13V7H12.5V12.2L17,14.9L16.2,16.2Z" />
                      </svg>
                    </div>
                    <span className="font-medium">Prayer Times</span>
                  </Link>
                </li>
                <li>
                  <Link to="/quran" className="group flex items-center space-x-3 text-gray-300 hover:text-yellow-400 transition-all duration-200 hover:translate-x-1">
                    <div className="p-2 rounded-lg bg-gray-800 group-hover:bg-yellow-400/10 transition-colors">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19,2L14,6.5V17.5L19,13V2M6.5,5C4.55,5 2.45,5.4 1,6.5V21.16C1,21.41 1.25,21.66 1.5,21.66C1.6,21.66 1.65,21.59 1.75,21.59C3.1,20.94 5.05,20.68 6.5,20.68C8.45,20.68 10.55,21.1 12,22C13.35,21.15 15.8,20.68 17.5,20.68C18.95,20.68 20.9,20.94 22.25,21.59C22.35,21.66 22.4,21.66 22.5,21.66C22.75,21.66 23,21.41 23,21.16V6.5C22.4,6.05 21.75,5.75 21,5.5V19C19.9,18.65 18.7,18.5 17.5,18.5C15.8,18.5 13.35,18.9 12,19.5V8C10.55,7.1 8.45,6.68 6.5,6.68C5.05,6.68 3.1,6.94 1.75,7.59V20.16C3.1,19.94 5.05,19.68 6.5,19.68C8.45,19.68 10.55,20.1 12,21C13.35,20.15 15.8,19.68 17.5,19.68C18.7,19.68 19.9,19.83 21,20.18V6.5C20.55,6.2 20.05,5.95 19.5,5.75V2H19Z" />
                      </svg>
                    </div>
                    <span className="font-medium">Quranic Verses</span>
                  </Link>
                </li>
                <li>
                  <Link to="/reflection" className="group flex items-center space-x-3 text-gray-300 hover:text-yellow-400 transition-all duration-200 hover:translate-x-1">
                    <div className="p-2 rounded-lg bg-gray-800 group-hover:bg-yellow-400/10 transition-colors">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12,3C17.5,3 22,6.58 22,11C22,15.42 17.5,19 12,19C10.76,19 9.57,18.82 8.47,18.5C5.55,21 2,21 2,21C4.33,18.67 4.7,17.1 4.75,16.5C3.05,15.07 2,13.13 2,11C2,6.58 6.5,3 12,3Z" />
                      </svg>
                    </div>
                    <span className="font-medium">Daily Reflection</span>
                  </Link>
                </li>
                <li>
                  <Link to="/islamic-stories" className="group flex items-center space-x-3 text-gray-300 hover:text-yellow-400 transition-all duration-200 hover:translate-x-1">
                    <div className="p-2 rounded-lg bg-gray-800 group-hover:bg-yellow-400/10 transition-colors">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V4A2,2 0 0,0 18,2M18,20H6V4H18V20M7,9H17V10.5H7V9M7,12H17V13.5H7V12M7,15H17V16.5H7V15Z" />
                      </svg>
                    </div>
                    <span className="font-medium">Islamic Stories</span>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div className="space-y-4">
              <div className="border-b border-gray-700 pb-2">
                <h4 className="text-lg font-semibold text-yellow-400 flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,2A2,2 0 0,1 14,4V8A2,2 0 0,1 12,10A2,2 0 0,1 10,8V4A2,2 0 0,1 12,2M21,6V8H20V19A2,2 0 0,1 18,21H6A2,2 0 0,1 4,19V8H3V6H21M16,10V12H8V10H16Z" />
                  </svg>
                  <span>Resources</span>
                </h4>
              </div>
              <ul className="space-y-3">
                <li>
                  <Link to="/dua" className="group flex items-center space-x-3 text-gray-300 hover:text-yellow-400 transition-all duration-200 hover:translate-x-1">
                    <div className="p-2 rounded-lg bg-gray-800 group-hover:bg-yellow-400/10 transition-colors">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M5,17L9.5,12L5,7H7L12,12L7,17H5M11,17L15.5,12L11,7H13L18,12L13,17H11Z" />
                      </svg>
                    </div>
                    <span className="font-medium">Dua & Dhikr</span>
                  </Link>
                </li>
                <li>
                  <Link to="/prophet-stories" className="group flex items-center space-x-3 text-gray-300 hover:text-yellow-400 transition-all duration-200 hover:translate-x-1">
                    <div className="p-2 rounded-lg bg-gray-800 group-hover:bg-yellow-400/10 transition-colors">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z" />
                      </svg>
                    </div>
                    <span className="font-medium">Story of Prophets</span>
                  </Link>
                </li>
                <li>
                  <Link to="/prophetic-wisdom" className="group flex items-center space-x-3 text-gray-300 hover:text-yellow-400 transition-all duration-200 hover:translate-x-1">
                    <div className="p-2 rounded-lg bg-gray-800 group-hover:bg-yellow-400/10 transition-colors">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
                      </svg>
                    </div>
                    <span className="font-medium">Prophetic Wisdom</span>
                  </Link>
                </li>
                <li>
                  <Link to="/mood" className="group flex items-center space-x-3 text-gray-300 hover:text-yellow-400 transition-all duration-200 hover:translate-x-1">
                    <div className="p-2 rounded-lg bg-gray-800 group-hover:bg-yellow-400/10 transition-colors">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12,2C13.1,2 14,2.9 14,4C14,5.1 13.1,6 12,6C10.9,6 10,5.1 10,4C10,2.9 10.9,2 12,2M21,9V7L15,1L13.5,2.5L16.17,5.17L10.58,10.76C10.22,11.12 10,11.6 10,12.07C10,12.55 10.22,13.04 10.59,13.41L11.93,14.75C12.65,15.47 13.81,15.47 14.53,14.75L16.5,12.78L17.5,13.78V9H21M12.07,13.59C11.6,13.59 11.11,13.37 10.75,13.01L9.41,11.67C8.69,10.95 8.69,9.79 9.41,9.07L14.07,4.41C14.44,4.04 14.44,3.44 14.07,3.07C13.7,2.7 13.1,2.7 12.73,3.07L8.07,7.73C6.61,9.19 6.61,11.61 8.07,13.07C8.68,13.68 9.5,14 10.34,14H12.07V13.59Z" />
                      </svg>
                    </div>
                    <span className="font-medium">Mood Selector</span>
                  </Link>
                </li>
                <li>
                  <Link to="/islamic-ai" className="group flex items-center space-x-3 text-gray-300 hover:text-yellow-400 transition-all duration-200 hover:translate-x-1">
                    <div className="p-2 rounded-lg bg-gray-800 group-hover:bg-yellow-400/10 transition-colors">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11,2V22C5.9,21.5 2,17.2 2,12C2,6.8 5.9,2.5 11,2M13,2V22C18.1,21.5 22,17.2 22,12C22,6.8 18.1,2.5 13,2M16,8V10H8V8H16M16,11V13H8V11H16M16,14V16H8V14H16Z" />
                      </svg>
                    </div>
                    <span className="font-medium">Islamic AI</span>
                  </Link>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-300 text-sm mb-4 md:mb-0 space-y-2">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div className="flex items-center space-x-4">
                  <span>© 2025 Qalam Verse</span>
                  <span className="text-gray-500">•</span>
                  <span>All rights reserved</span>
                </div>
                <div className="text-xs text-gray-400">
                  Built with Faith, for the Ummah ✨
                </div>
              </div>
              <div className="text-xs text-gray-400 flex flex-col md:flex-row gap-1 md:gap-4">
                <span>Developed by Sheikh Sohail</span>
                <span className="hidden md:inline">•</span>
                <span>Design by Huma Qureshi</span>
              </div>
            </div>

            <div className="bg-gray-800/30 rounded-lg p-3">
              <div className="flex flex-wrap justify-center lg:justify-end gap-4 text-sm">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setShowPrivacy(true)}
                    className="group flex items-center space-x-1.5 text-gray-300 hover:text-yellow-400 
                   transition-all duration-200 hover:translate-y-[-1px]"
                  >
                    <div className="p-1 rounded-md bg-gray-700/50 group-hover:bg-yellow-400/10 transition-colors">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11H16.2V16H7.8V11H9.2V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.4,8.7 10.4,10V11H13.6V10C13.6,8.7 12.8,8.2 12,8.2Z" />
                      </svg>
                    </div>
                    <span className="font-medium">Privacy</span>
                  </button>

                  <div className="w-px h-4 bg-gray-600"></div>

                  <button
                    onClick={() => setShowTerms(true)}
                    className="group flex items-center space-x-1.5 text-gray-300 hover:text-yellow-400 
                   transition-all duration-200 hover:translate-y-[-1px]"
                  >
                    <div className="p-1 rounded-md bg-gray-700/50 group-hover:bg-yellow-400/10 transition-colors">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                      </svg>
                    </div>
                    <span className="font-medium">Terms</span>
                  </button>

                  <div className="w-px h-4 bg-gray-600"></div>

                  <button
                    onClick={() => setShowCookies(true)}
                    className="group flex items-center space-x-1.5 text-gray-300 hover:text-yellow-400 
                   transition-all duration-200 hover:translate-y-[-1px]"
                  >
                    <div className="p-1 rounded-md bg-gray-700/50 group-hover:bg-yellow-400/10 transition-colors">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12,3A9,9 0 0,0 3,12A9,9 0 0,0 12,21A9,9 0 0,0 21,12C21,11.5 20.96,11 20.87,10.5C20.6,10.62 20.31,10.68 20,10.68C19.68,10.68 19.38,10.62 19.11,10.5C19.04,11 19,11.5 19,12A7,7 0 0,1 12,19A7,7 0 0,1 5,12A7,7 0 0,1 12,5C12.5,5 13,5.04 13.5,5.11C13.62,4.84 13.68,4.55 13.68,4.24C13.68,3.92 13.62,3.63 13.5,3.36C13,3.13 12.5,3 12,3M20,3V5H22V7H20V9H18V7H16V5H18V3H20M10,6V8H8V10H10V12H12V10H14V8H12V6H10Z" />
                      </svg>
                    </div>
                    <span className="font-medium">Cookies</span>
                  </button>

                  <div className="w-px h-4 bg-gray-600"></div>

                  <Link
                    to="/feedback"
                    className="group flex items-center space-x-1.5 text-gray-300 hover:text-yellow-400 
                   transition-all duration-200 hover:translate-y-[-1px]"
                  >
                    <div className="p-1 rounded-md bg-gray-700/50 group-hover:bg-yellow-400/10 transition-colors">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 13.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1-4.5h-2V6h2v5z" />
                      </svg>
                    </div>
                    <span className="font-medium">Feedback</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Enhanced Privacy Policy Modal */}
      <PolicyModal
        isOpen={showPrivacy}
        onClose={() => setShowPrivacy(false)}
        title="Privacy Policy"
      >
        <div className="prose max-w-none">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg mb-6">
            <p className="text-gray-800 mb-2"><strong>Effective Date:</strong> January 1, 2025</p>
            <p className="text-gray-600 text-sm">Last Updated: October 30, 2025</p>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Our Commitment to Your Privacy</h3>
            <p className="mb-4 text-gray-700 leading-relaxed">
              At Qalam Verse, protecting your privacy is one of our highest priorities. This Privacy Policy explains how we collect, use, protect, and share information about you when you use our Islamic educational platform. We are committed to transparency and giving you control over your personal information, guided by Islamic principles of trust (Amanah) and integrity.
            </p>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions about this Privacy Policy or our privacy practices, please don't hesitate to contact us at <strong>qalamversehelp@gmail.com</strong>.
            </p>
          </div>

          <h3 className="text-xl font-semibold mb-3 text-gray-800">1. Information We Collect</h3>
          <div className="mb-6">
            <h4 className="text-lg font-medium mb-2 text-gray-700">Personal Information</h4>
            <p className="mb-3 text-gray-700">We collect information you provide directly to us, such as:</p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
              <li><strong>Account Information:</strong> Name, email address, and password when you create an account</li>
              <li><strong>Profile Data:</strong> Prayer preferences, location for prayer times, and Islamic learning goals</li>
              <li><strong>Communication Data:</strong> Messages you send us, feedback, and support requests</li>
              <li><strong>User Content:</strong> Notes, bookmarks, and personal reflections you choose to save</li>
            </ul>

            <h4 className="text-lg font-medium mb-2 text-gray-700">Automatically Collected Information</h4>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
              <li><strong>Device Information:</strong> Device type, operating system, browser type, and unique device identifiers</li>
              <li><strong>Usage Data:</strong> Pages visited, time spent on features, interaction patterns, and app performance data</li>
              <li><strong>Location Data:</strong> Approximate location (with your consent) for accurate prayer times and Qibla direction</li>
              <li><strong>Log Files:</strong> IP addresses, access times, referring URLs, and error logs for security and performance</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold mb-3 text-gray-800">2. How We Use Your Information</h3>
          <div className="mb-6">
            <p className="mb-3 text-gray-700">We use the information we collect to:</p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
              <li><strong>Provide Islamic Services:</strong> Deliver accurate prayer times, Quranic verses, Islamic stories, and educational content</li>
              <li><strong>Personalize Experience:</strong> Customize content recommendations based on your interests and spiritual goals</li>
              <li><strong>Send Notifications:</strong> Prayer reminders, daily reflections, and important Islamic dates (with your consent)</li>
              <li><strong>Improve Our Platform:</strong> Analyze usage patterns to enhance features and develop new Islamic tools</li>
              <li><strong>Ensure Security:</strong> Protect against fraud, abuse, and unauthorized access to your account</li>
              <li><strong>Communication:</strong> Respond to your inquiries, provide customer support, and send service-related updates</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold mb-3 text-gray-800">3. Information Sharing and Disclosure</h3>
          <div className="mb-6">
            <p className="mb-3 text-gray-700"><strong>We never sell your personal information.</strong> We may share your information only in these limited circumstances:</p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
              <li><strong>Service Providers:</strong> Trusted third parties who help us operate our platform (hosting, analytics, customer support)</li>
              <li><strong>Legal Requirements:</strong> When required by law, court orders, or to protect rights and safety</li>
              <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets (with continued privacy protection)</li>
              <li><strong>With Your Consent:</strong> Any other sharing will only occur with your explicit permission</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold mb-3 text-gray-800">4. Data Security and Protection</h3>
          <div className="mb-6">
            <p className="mb-3 text-gray-700">We implement comprehensive security measures to protect your information:</p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
              <li><strong>Encryption:</strong> Data transmission and storage using industry-standard SSL/TLS encryption</li>
              <li><strong>Access Controls:</strong> Limited access to personal information on a need-to-know basis</li>
              <li><strong>Regular Audits:</strong> Ongoing security assessments and vulnerability testing</li>
              <li><strong>Secure Infrastructure:</strong> Hosted on reputable, secure cloud platforms with backup systems</li>
            </ul>
            <p className="text-gray-700">However, no internet transmission is 100% secure. We cannot guarantee absolute security but continuously work to protect your information.</p>
          </div>

          <h3 className="text-xl font-semibold mb-3 text-gray-800">5. Your Privacy Rights and Choices</h3>
          <div className="mb-6">
            <p className="mb-3 text-gray-700">You have the following rights regarding your personal information:</p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
              <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
              <li><strong>Correction:</strong> Update or correct inaccurate personal information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal requirements)</li>
              <li><strong>Data Portability:</strong> Request a copy of your data in a structured, machine-readable format</li>
              <li><strong>Opt-out:</strong> Unsubscribe from marketing communications at any time</li>
              <li><strong>Location Services:</strong> Disable location sharing through your device settings</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold mb-3 text-gray-800">6. Children's Privacy</h3>
          <div className="mb-6">
            <p className="text-gray-700 leading-relaxed">
              Qalam Verse is designed for users of all ages, including children learning about Islam with parental guidance. We do not knowingly collect personal information from children under 13 without parental consent. If we become aware that we have collected personal information from a child under 13 without parental consent, we will take steps to delete such information. Parents who believe their child has provided personal information to us can contact us at <strong>qalamversehelp@gmail.com</strong>.
            </p>
          </div>

          <h3 className="text-xl font-semibold mb-3 text-gray-800">7. International Data Transfers</h3>
          <div className="mb-6">
            <p className="text-gray-700 leading-relaxed">
              Your information may be transferred to and processed in countries other than your country of residence. These countries may have different data protection laws. When we transfer your information internationally, we ensure appropriate safeguards are in place to protect your personal information in accordance with applicable privacy laws.
            </p>
          </div>

          <h3 className="text-xl font-semibold mb-3 text-gray-800">8. Updates to This Privacy Policy</h3>
          <div className="mb-6">
            <p className="text-gray-700 leading-relaxed">
              We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of material changes by email (if you have provided one) or through a prominent notice on our platform. Your continued use of Qalam Verse after such notification constitutes acceptance of the updated Privacy Policy.
            </p>
          </div>

          <h3 className="text-xl font-semibold mb-3 text-gray-800">9. Islamic Values in Privacy</h3>
          <div className="mb-6">
            <p className="text-gray-700 leading-relaxed">
              Our privacy practices are guided by Islamic principles of Amanah (trustworthiness), Sidq (honesty), and respect for individual dignity. We handle your personal information with the same care and responsibility that Islam teaches us to treat all trusts. We are committed to being transparent, fair, and respectful in all our data practices.
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">10. Contact Information</h3>
            <p className="text-gray-700 mb-2">
              If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us:
            </p>
            <ul className="text-gray-700 space-y-1">
              <li><strong>Email:</strong> qalamversehelp@gmail.com</li>
              <li><strong>Subject Line:</strong> Privacy Policy Inquiry</li>
              <li><strong>Response Time:</strong> We aim to respond within 48 hours</li>
            </ul>
          </div>
        </div>
      </PolicyModal>

      {/* Enhanced Terms of Service Modal */}
      <PolicyModal
        isOpen={showTerms}
        onClose={() => setShowTerms(false)}
        title="Terms of Service"
      >
        <div className="prose max-w-none">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg mb-6">
            <p className="text-gray-800 mb-2"><strong>Effective Date:</strong> January 1, 2025</p>
            <p className="text-gray-600 text-sm">Last Updated: October 30, 2025</p>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Welcome to Qalam Verse</h3>
            <p className="text-gray-700 leading-relaxed">
              These Terms of Service ("Terms") govern your use of Qalam Verse, an Islamic educational platform designed to strengthen your faith and enhance your spiritual journey. By accessing or using our services, you agree to be bound by these Terms. Please read them carefully.
            </p>
          </div>

          <h3 className="text-xl font-semibold mb-3 text-gray-800">1. Acceptance of Terms</h3>
          <div className="mb-6">
            <p className="mb-4 text-gray-700">
              By accessing, downloading, or using Qalam Verse in any way, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy. If you do not agree with any part of these Terms, please do not use our service.
            </p>
            <p className="text-gray-700">
              These Terms apply to all users, including visitors, registered users, and premium subscribers.
            </p>
          </div>

          <h3 className="text-xl font-semibold mb-3 text-gray-800">2. Description of Service</h3>
          <div className="mb-6">
            <p className="mb-3 text-gray-700">Qalam Verse provides:</p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
              <li>Accurate prayer times and Qibla direction based on your location</li>
              <li>Quranic verses with translations and interpretations</li>
              <li>Islamic stories, daily reflections, and spiritual guidance</li>
              <li>Educational content about Islamic practices and teachings</li>
              <li>Dua and Dhikr collections for various occasions</li>
              <li>Community features for Islamic discussions and learning</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold mb-3 text-gray-800">3. Islamic Content and Accuracy</h3>
          <div className="mb-6">
            <p className="mb-4 text-gray-700">
              We strive to provide authentic Islamic content based on the Holy Quran and authentic Hadith literature. Our content is reviewed by qualified Islamic scholars whenever possible. However, users should note:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
              <li>Content is provided for educational and informational purposes</li>
              <li>For important religious rulings, consult qualified local Islamic scholars</li>
              <li>Different Islamic schools of thought may have varying interpretations</li>
              <li>We welcome corrections and suggestions to improve accuracy</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold mb-3 text-gray-800">4. User Accounts and Responsibilities</h3>
          <div className="mb-6">
            <p className="mb-3 text-gray-700">When creating an account, you agree to:</p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Use the service in accordance with Islamic principles and ethics</li>
              <li>Respect other users and maintain a respectful community environment</li>
              <li>Not share content that is offensive, inappropriate, or against Islamic values</li>
              <li>Report any technical issues or content inaccuracies you encounter</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold mb-3 text-gray-800">5. Prayer Times and Religious Information</h3>
          <div className="mb-6">
            <p className="mb-4 text-gray-700">
              <strong>Important Disclaimer:</strong> Prayer times are calculated using standard astronomical calculations and established Islamic methodologies. However, local factors may affect actual prayer times:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
              <li>Local Islamic authorities may have specific guidelines for your area</li>
              <li>Weather conditions and geographical factors may influence visibility</li>
              <li>We recommend verifying with local mosques for community prayer times</li>
              <li>Personal responsibility remains with each user for fulfilling religious obligations</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold mb-3 text-gray-800">6. Intellectual Property Rights</h3>
          <div className="mb-6">
            <p className="mb-3 text-gray-700">Understanding of religious content ownership:</p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
              <li>The Holy Quran and Prophetic traditions belong to all Muslims as divine guidance</li>
              <li>Our translations, interpretations, and digital presentations are provided for educational purposes</li>
              <li>Original content created by Qalam Verse (articles, graphics, features) is protected by copyright</li>
              <li>Users may share religious content for educational purposes with proper attribution</li>
              <li>Commercial use of our proprietary content requires explicit permission</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold mb-3 text-gray-800">7. Community Guidelines</h3>
          <div className="mb-6">
            <p className="mb-3 text-gray-700">To maintain a respectful Islamic learning environment:</p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
              <li>Engage in discussions with wisdom (Hikmah) and good character (Akhlaq)</li>
              <li>Respect different opinions within the bounds of authentic Islamic teachings</li>
              <li>Avoid controversial topics that may lead to division among Muslims</li>
              <li>Report inappropriate content or behavior to our moderation team</li>
              <li>Help create a welcoming environment for Muslims at all levels of knowledge</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold mb-3 text-gray-800">8. Limitation of Liability</h3>
          <div className="mb-6">
            <p className="text-gray-700 leading-relaxed">
              Qalam Verse provides religious and educational content for informational purposes. We are not liable for any decisions made based solely on the content provided without proper scholarly consultation. Users are responsible for their own religious practices and should seek guidance from qualified Islamic scholars for important matters. We do not guarantee uninterrupted service or error-free content, though we continuously strive for excellence.
            </p>
          </div>

          <h3 className="text-xl font-semibold mb-3 text-gray-800">9. Service Availability and Modifications</h3>
          <div className="mb-6">
            <p className="text-gray-700 leading-relaxed">
              We aim to provide continuous service but may need to temporarily suspend access for maintenance, updates, or improvements. We reserve the right to modify, update, or discontinue features with reasonable notice. Premium features may require subscription fees, which will be clearly communicated before purchase.
            </p>
          </div>

          <h3 className="text-xl font-semibold mb-3 text-gray-800">10. Termination</h3>
          <div className="mb-6">
            <p className="text-gray-700 leading-relaxed">
              You may terminate your account at any time. We may suspend or terminate accounts that violate these Terms or engage in behavior inconsistent with Islamic values and community standards. Upon termination, your access to premium features will cease, but basic religious information will remain available.
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">11. Contact Information</h3>
            <p className="text-gray-700 mb-2">
              For questions about these Terms of Service or to report issues:
            </p>
            <ul className="text-gray-700 space-y-1">
              <li><strong>Email:</strong> qalamversehelp@gmail.com</li>
              <li><strong>Subject Line:</strong> Terms of Service Inquiry</li>
              <li><strong>Islamic Guidance:</strong> For religious questions, we can connect you with qualified scholars</li>
            </ul>
          </div>
        </div>
      </PolicyModal>

      {/* Enhanced Cookie Policy Modal */}
      <PolicyModal
        isOpen={showCookies}
        onClose={() => setShowCookies(false)}
        title="Cookie Policy"
      >
        <div className="prose max-w-none">
          <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg mb-6">
            <p className="text-gray-800 mb-2"><strong>Effective Date:</strong> January 1, 2025</p>
            <p className="text-gray-600 text-sm">Last Updated: October 30, 2025</p>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Understanding Cookies</h3>
            <p className="text-gray-700 leading-relaxed">
              This Cookie Policy explains how Qalam Verse uses cookies and similar technologies to enhance your Islamic learning experience. We believe in transparency about how we collect and use data, following Islamic principles of honesty (Sidq) and trustworthiness (Amanah).
            </p>
          </div>

          <h3 className="text-xl font-semibold mb-3 text-gray-800">1. What Are Cookies?</h3>
          <div className="mb-6">
            <p className="mb-4 text-gray-700">
              Cookies are small text files stored on your device when you visit our website or use our app. They help us remember your preferences and provide you with a personalized Islamic learning experience.
            </p>
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-gray-700 text-sm">
                <strong>Think of cookies like bookmarks:</strong> They help us remember where you left off in your Islamic studies, your preferred prayer calculation method, and your favorite content topics.
              </p>
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-3 text-gray-800">2. Types of Cookies We Use</h3>
          <div className="mb-6">
            <div className="space-y-4">
              <div className="border-l-4 border-green-400 pl-4">
                <h4 className="text-lg font-medium mb-2 text-gray-700">Essential Cookies</h4>
                <p className="text-gray-600 text-sm mb-2">These are necessary for the website to function properly and cannot be disabled.</p>
                <ul className="text-gray-700 text-sm space-y-1">
                  <li>• User authentication and security</li>
                  <li>• Basic website functionality</li>
                  <li>• Language and region settings</li>
                  <li>• Shopping cart functionality (for donations)</li>
                </ul>
              </div>

              <div className="border-l-4 border-blue-400 pl-4">
                <h4 className="text-lg font-medium mb-2 text-gray-700">Preference Cookies</h4>
                <p className="text-gray-600 text-sm mb-2">These remember your choices to provide a personalized experience.</p>
                <ul className="text-gray-700 text-sm space-y-1">
                  <li>• Prayer time calculation preferences</li>
                  <li>• Preferred language for Islamic content</li>
                  <li>• Audio settings for Quranic recitation</li>
                  <li>• Theme and display preferences</li>
                  <li>• Location settings for prayer times and Qibla direction</li>
                </ul>
              </div>

              <div className="border-l-4 border-purple-400 pl-4">
                <h4 className="text-lg font-medium mb-2 text-gray-700">Analytics Cookies</h4>
                <p className="text-gray-600 text-sm mb-2">These help us understand how users interact with Islamic content.</p>
                <ul className="text-gray-700 text-sm space-y-1">
                  <li>• Most popular Quranic verses and Islamic stories</li>
                  <li>• Feature usage patterns to improve user experience</li>
                  <li>• Performance metrics to ensure fast loading</li>
                  <li>• Error tracking to fix technical issues quickly</li>
                </ul>
              </div>

              <div className="border-l-4 border-orange-400 pl-4">
                <h4 className="text-lg font-medium mb-2 text-gray-700">Functional Cookies</h4>
                <p className="text-gray-600 text-sm mb-2">These enable enhanced functionality and personalization.</p>
                <ul className="text-gray-700 text-sm space-y-1">
                  <li>• Personalized Islamic content recommendations</li>
                  <li>• Social media sharing capabilities</li>
                  <li>• Remember prayer notification preferences</li>
                  <li>• Save progress in Islamic learning modules</li>
                </ul>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-3 text-gray-800">3. How We Use Cookies for Islamic Features</h3>
          <div className="mb-6">
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
              <li><strong>Prayer Times:</strong> Remember your location and calculation method preferences</li>
              <li><strong>Quranic Study:</strong> Track your reading progress and favorite verses</li>
              <li><strong>Islamic Calendar:</strong> Display relevant Islamic dates and events for your region</li>
              <li><strong>Daily Reflections:</strong> Personalize content based on your spiritual interests</li>
              <li><strong>Learning Path:</strong> Remember your progress in Islamic educational content</li>
              <li><strong>Community Features:</strong> Maintain your participation in Islamic discussions</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold mb-3 text-gray-800">4. Third-Party Cookies</h3>
          <div className="mb-6">
            <p className="mb-3 text-gray-700">We may use carefully selected third-party services that place cookies on your device:</p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
              <li><strong>Prayer Time Services:</strong> Accurate calculation of Islamic prayer times</li>
              <li><strong>Islamic Content Providers:</strong> Authentic Quranic texts and translations</li>
              <li><strong>Analytics Services:</strong> Understanding user engagement with Islamic content</li>
              <li><strong>Security Services:</strong> Protection against malicious activity</li>
            </ul>
            <p className="text-gray-700">
              These services are chosen based on their commitment to privacy and their value in enhancing your Islamic learning experience.
            </p>
          </div>

          <h3 className="text-xl font-semibold mb-3 text-gray-800">5. Managing Your Cookie Preferences</h3>
          <div className="mb-6">
            <p className="mb-4 text-gray-700">You have full control over cookies. Here are your options:</p>

            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <h4 className="text-lg font-medium mb-2 text-gray-700">Browser Settings</h4>
              <ul className="text-gray-700 text-sm space-y-1">
                <li>• <strong>Chrome:</strong> Settings {' > '} Privacy and Security {' > '} Cookies and other site data</li>
                <li>• <strong>Firefox:</strong> Settings {' > '} Privacy &amp; Security {' > '} Cookies and Site Data</li>
                <li>• <strong>Safari:</strong> Preferences {' > '} Privacy {' > '} Manage Website Data</li>
                <li>• <strong>Edge:</strong> Settings {' > '} Cookies and site permissions</li>
              </ul>

            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="text-lg font-medium mb-2 text-gray-700">⚠️ Important Note</h4>
              <p className="text-gray-700 text-sm">
                Disabling certain cookies may affect the functionality of Islamic features like prayer reminders, personalized content recommendations, and your saved progress in Islamic studies.
              </p>
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-3 text-gray-800">6. Cookie Retention Periods</h3>
          <div className="mb-6">
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-1">
              <li><strong>Session Cookies:</strong> Deleted when you close your browser</li>
              <li><strong>Persistent Cookies:</strong> Remain for up to 2 years, or until you delete them</li>
              <li><strong>Prayer Time Cookies:</strong> Updated daily for accuracy</li>
              <li><strong>Preference Cookies:</strong> Stored until you change your settings</li>
            </ul>
          </div>

          <h3 className="text-xl font-semibold mb-3 text-gray-800">7. Islamic Principles and Cookie Use</h3>
          <div className="mb-6">
            <p className="text-gray-700 leading-relaxed">
              Our use of cookies is guided by Islamic values of transparency, honesty, and respect for user privacy. We only collect information that genuinely improves your Islamic learning experience and we are always honest about how we use your data. We view the trust you place in us as an Amanah (trust) that we must handle responsibly.
            </p>
          </div>

          <h3 className="text-xl font-semibold mb-3 text-gray-800">8. Updates to Cookie Policy</h3>
          <div className="mb-6">
            <p className="text-gray-700 leading-relaxed">
              We may update this Cookie Policy to reflect changes in our practices or legal requirements. We will notify you of significant changes through our website or app. Your continued use of Qalam Verse constitutes acceptance of the updated policy.
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">9. Questions About Cookies</h3>
            <p className="text-gray-700 mb-2">
              If you have questions about our Cookie Policy or need help managing your cookie preferences:
            </p>
            <ul className="text-gray-700 space-y-1">
              <li><strong>Email:</strong> qalamversehelp@gmail.com</li>
              <li><strong>Subject Line:</strong> Cookie Policy Question</li>
              <li><strong>Technical Support:</strong> We're here to help you customize your Islamic learning experience</li>
            </ul>
          </div>
        </div>
      </PolicyModal>
    </>
  );
};

export default Footer;
