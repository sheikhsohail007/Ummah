import React, { useState } from 'react';

interface FooterProps {
  setActiveSection: (section: string) => void;
}

const Footer: React.FC<FooterProps> = ({ setActiveSection }) => {
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
                  Islamic Pearls
                </h3>
              </div>
              <p className="text-gray-300 mb-4 leading-relaxed">
                Your comprehensive digital companion for Islamic guidance, prayers, and spiritual growth.
                Discover authentic Islamic teachings, daily prayers, Quranic verses, and Prophetic wisdom
                to strengthen your faith and enhance your spiritual journey.
              </p>
              <div className="flex space-x-4">
                <a href="https://www.instagram.com/sheikh_sohail007" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a href="https://www.instagram.com/honeyesticx" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a href="https://x.com/shiekhsohail678" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a href="https://github.com/sheikhsohail007" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a href="mailto:islamicpearlsofficialwork@gmail.com" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h.749L12 10.855 21.615 3.821h.749c.904 0 1.636.732 1.636 1.636z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-yellow-400">Quick Links</h4>
              <ul className="space-y-2">
                <li><button onClick={() => setActiveSection('salah')} className="text-gray-300 hover:text-white transition-colors text-left">Correct Your Salah</button></li>
                <li><button onClick={() => setActiveSection('prayer-times')} className="text-gray-300 hover:text-white transition-colors text-left">Prayer Times</button></li>
                <li><button onClick={() => setActiveSection('quran')} className="text-gray-300 hover:text-white transition-colors text-left">Quranic Verses</button></li>
                <li><button onClick={() => setActiveSection('reflection')} className="text-gray-300 hover:text-white transition-colors text-left">Daily Reflection</button></li>
                <li><button onClick={() => setActiveSection('stories')} className="text-gray-300 hover:text-white transition-colors text-left">Islamic Stories</button></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-yellow-400">Resources</h4>
              <ul className="space-y-2">
                <li><button onClick={() => setActiveSection('dua-dhikr')} className="text-gray-300 hover:text-white transition-colors text-left">Dua & Dhikr</button></li>
                <li><button onClick={() => setActiveSection('prophet-stories')} className="text-gray-300 hover:text-white transition-colors text-left">Story of Prophets</button></li>
                <li><button onClick={() => setActiveSection('prophetic-wisdom')} className="text-gray-300 hover:text-white transition-colors text-left">Prophetic Wisdom</button></li>
                <li><button onClick={() => setActiveSection('mood')} className="text-gray-300 hover:text-white transition-colors text-left">Mood Selector</button></li>
                <li><button onClick={() => setActiveSection('home')} className="text-gray-300 hover:text-white transition-colors text-left">Home</button></li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-300 text-sm mb-4 md:mb-0">
              © 2025 Islamic Pearls | All rights reserved | created by Sheikh Sohail<br />
              <span className="text-xs">Inspired by <a href="https://www.islamestic.com" target="_blank" className="credit-link">
                <i className="fas fa-external-link-alt"></i>
                Islamestic.com
              </a>
              </span>
            </div>
            <div className="flex space-x-6 text-sm">
              <button
                onClick={() => setShowPrivacy(true)}
                className="text-gray-300 hover:text-yellow-400 transition-colors"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => setShowTerms(true)}
                className="text-gray-300 hover:text-yellow-400 transition-colors"
              >
                Terms of Service
              </button>
              <button
                onClick={() => setShowCookies(true)}
                className="text-gray-300 hover:text-yellow-400 transition-colors"
              >
                Cookie Policy
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Privacy Policy Modal */}
      <PolicyModal
        isOpen={showPrivacy}
        onClose={() => setShowPrivacy(false)}
        title="Privacy Policy"
      >
        <div className="prose max-w-none">
          <p className="text-gray-600 mb-4"><strong>Last updated:</strong> December 2024</p>

          <h3 className="text-xl font-semibold mb-3 text-gray-800">1. Information We Collect</h3>
          <p className="mb-4 text-gray-700">
            Islamic Pearls is committed to protecting your privacy. We collect minimal information necessary to provide our services:
          </p>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li>Usage data to improve our Islamic content and features</li>
            <li>Device information for optimal app performance</li>
            <li>Location data (optional) for accurate prayer times</li>
            <li>Preferences for personalized Islamic content</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 text-gray-800">2. How We Use Your Information</h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li>Provide accurate prayer times based on your location</li>
            <li>Customize Islamic content to your preferences</li>
            <li>Send prayer reminders and Islamic notifications</li>
            <li>Improve our services and develop new Islamic features</li>
            <li>Ensure the security and integrity of our platform</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 text-gray-800">3. Data Protection</h3>
          <p className="mb-4 text-gray-700">
            We implement industry-standard security measures to protect your personal information. Your data is encrypted and stored securely. We never sell your personal information to third parties.
          </p>

          <h3 className="text-xl font-semibold mb-3 text-gray-800">4. Islamic Values</h3>
          <p className="mb-4 text-gray-700">
            Our privacy practices are guided by Islamic principles of trust (Amanah) and respect. We handle your information with the same care and responsibility that Islam teaches us to treat all trusts.
          </p>

          <h3 className="text-xl font-semibold mb-3 text-gray-800">5. Contact Us</h3>
          <p className="text-gray-700">
            If you have any questions about this Privacy Policy, please contact us at privacy@islamicpearls.com
          </p>
        </div>
      </PolicyModal>

      {/* Terms of Service Modal */}
      <PolicyModal
        isOpen={showTerms}
        onClose={() => setShowTerms(false)}
        title="Terms of Service"
      >
        <div className="prose max-w-none">
          <p className="text-gray-600 mb-4"><strong>Last updated:</strong> December 2024</p>

          <h3 className="text-xl font-semibold mb-3 text-gray-800">1. Acceptance of Terms</h3>
          <p className="mb-4 text-gray-700">
            By accessing and using Islamic Pearls, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
          </p>

          <h3 className="text-xl font-semibold mb-3 text-gray-800">2. Islamic Content Accuracy</h3>
          <p className="mb-4 text-gray-700">
            We strive to provide authentic Islamic content based on the Quran and authentic Hadith. However, users are encouraged to verify religious rulings with qualified Islamic scholars for important matters.
          </p>

          <h3 className="text-xl font-semibold mb-3 text-gray-800">3. User Responsibilities</h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li>Use the service in accordance with Islamic principles</li>
            <li>Respect the religious nature of the content</li>
            <li>Not misuse or distribute copyrighted Islamic materials</li>
            <li>Report any inaccuracies in Islamic content</li>
            <li>Maintain respectful behavior in community features</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 text-gray-800">4. Prayer Times Disclaimer</h3>
          <p className="mb-4 text-gray-700">
            Prayer times are calculated based on standard astronomical calculations. Users should verify with local Islamic authorities for the most accurate prayer times in their area.
          </p>

          <h3 className="text-xl font-semibold mb-3 text-gray-800">5. Intellectual Property</h3>
          <p className="mb-4 text-gray-700">
            The Quran and Hadith are divine revelations and prophetic traditions belonging to all Muslims. Our translations, interpretations, and digital presentations are provided for educational purposes.
          </p>

          <h3 className="text-xl font-semibold mb-3 text-gray-800">6. Limitation of Liability</h3>
          <p className="mb-4 text-gray-700">
            Islamic Pearls provides religious content for educational and spiritual purposes. We are not liable for any decisions made based solely on the content provided without proper scholarly consultation.
          </p>

          <h3 className="text-xl font-semibold mb-3 text-gray-800">7. Contact Information</h3>
          <p className="text-gray-700">
            For questions about these Terms of Service, contact us at terms@islamicpearls.com
          </p>
        </div>
      </PolicyModal>

      {/* Cookie Policy Modal */}
      <PolicyModal
        isOpen={showCookies}
        onClose={() => setShowCookies(false)}
        title="Cookie Policy"
      >
        <div className="prose max-w-none">
          <p className="text-gray-600 mb-4"><strong>Last updated:</strong> December 2024</p>

          <h3 className="text-xl font-semibold mb-3 text-gray-800">1. What Are Cookies</h3>
          <p className="mb-4 text-gray-700">
            Cookies are small text files that are stored on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and settings.
          </p>

          <h3 className="text-xl font-semibold mb-3 text-gray-800">2. How We Use Cookies</h3>
          <ul className="list-disc pl-6 mb-4 text-gray-700">
            <li><strong>Essential Cookies:</strong> Required for basic website functionality</li>
            <li><strong>Preference Cookies:</strong> Remember your language and location settings</li>
            <li><strong>Analytics Cookies:</strong> Help us understand how users interact with Islamic content</li>
            <li><strong>Prayer Time Cookies:</strong> Store your location for accurate prayer times</li>
          </ul>

          <h3 className="text-xl font-semibold mb-3 text-gray-800">3. Types of Cookies We Use</h3>
          <div className="mb-4 text-gray-700">
            <p className="font-semibold">Session Cookies:</p>
            <p className="mb-2">Temporary cookies that expire when you close your browser.</p>

            <p className="font-semibold">Persistent Cookies:</p>
            <p className="mb-2">Remain on your device for a set period to remember your preferences.</p>

            <p className="font-semibold">Third-Party Cookies:</p>
            <p>Used by external services like prayer time calculators and Islamic content providers.</p>
          </div>

          <h3 className="text-xl font-semibold mb-3 text-gray-800">4. Managing Cookies</h3>
          <p className="mb-4 text-gray-700">
            You can control and manage cookies through your browser settings. However, disabling certain cookies may affect the functionality of Islamic features like prayer reminders and personalized content.
          </p>

          <h3 className="text-xl font-semibold mb-3 text-gray-800">5. Islamic Perspective</h3>
          <p className="mb-4 text-gray-700">
            We use cookies responsibly and transparently, following Islamic principles of honesty (Sidq) and trustworthiness (Amanah) in our digital practices.
          </p>

          <h3 className="text-xl font-semibold mb-3 text-gray-800">6. Updates to Cookie Policy</h3>
          <p className="mb-4 text-gray-700">
            We may update this Cookie Policy periodically. Users will be notified of significant changes through our website or app notifications.
          </p>

          <h3 className="text-xl font-semibold mb-3 text-gray-800">7. Contact Us</h3>
          <p className="text-gray-700">
            For questions about our Cookie Policy, contact us at cookies@islamicpearls.com
          </p>
        </div>
      </PolicyModal>
    </>
  );
};

export default Footer;