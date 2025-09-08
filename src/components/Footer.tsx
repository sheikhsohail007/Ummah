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
      <footer className="bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-white py-12">
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
                <a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-yellow-400 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-yellow-400">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Daily Prayers</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Quranic Verses</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Hadith Collection</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Islamic Calendar</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Prayer Times</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-yellow-400">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Dua & Dhikr</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Islamic Articles</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Prayer Guide</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Islamic Names</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Community</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-300 text-sm mb-4 md:mb-0">
              © 2024 Islamic Pearls. All rights reserved. Made with ❤️ for the Muslim Ummah.
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