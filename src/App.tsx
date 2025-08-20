import React, { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X, Clock, Heart, BookOpen, Compass, MessageCircle, Smile } from 'lucide-react';
import Header from './components/Header';
import MoodSelector from './components/MoodSelector';
import PrayerTimes from './components/PrayerTimes';
import SalahGuide from './components/SalahGuide';
import DailyReflection from './components/DailyReflection';
import QuranVerses from './components/QuranVerses';
import IslamicStories from './components/IslamicStories';

export interface Mood {
  id: string;
  label: string;
  emoji: string;
  color: string;
}

function App() {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const navigationItems = [
    { id: 'home', label: 'Home', icon: <Compass className="w-5 h-5" /> },
    { id: 'salah', label: 'Correct Your Salah', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'prayer-times', label: 'Prayer Times', icon: <Clock className="w-5 h-5" /> },
    { id: 'reflection', label: 'Daily Reflection', icon: <Heart className="w-5 h-5" /> },
    { id: 'quran', label: 'Quran Verses', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'stories', label: 'Islamic Stories', icon: <MessageCircle className="w-5 h-5" /> },
    { id: 'mood', label: 'Mood Selector', icon: <Smile className="w-5 h-5" /> },
  ];

  const getFeatureDescription = (id: string) => {
    const descriptions: Record<string, string> = {
      'salah': 'Learn the correct way to perform prayers with step-by-step guidance in multiple languages',
      'prayer-times': 'Get accurate prayer times for your location with notifications and reminders',
      'reflection': 'Daily spiritual reflections and motivational content tailored to your mood',
      'quran': 'Beautiful verses from the Holy Quran for daily guidance and inspiration',
      'stories': 'Inspiring stories from prophets and believers to strengthen your faith',
      'mood': 'Select how you\'re feeling today to receive personalized spiritual content',
    };
    return descriptions[id] || '';
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'salah':
        return <SalahGuide />;
      case 'prayer-times':
        return <PrayerTimes />;
      case 'reflection':
        return <DailyReflection selectedMood={selectedMood} />;
      case 'quran':
        return <QuranVerses selectedMood={selectedMood} />;
      case 'stories':
        return <IslamicStories selectedMood={selectedMood} />;
      case 'mood':
        return <MoodSelector selectedMood={selectedMood} onMoodSelect={setSelectedMood} />;
      default:
        return (
          <div className="space-y-8">
            <div className="text-center py-16 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl">
              <h1 className="text-5xl font-bold text-emerald-800 dark:text-emerald-300 mb-4">
                Islamic Pearls
              </h1>
              <p className="text-xl text-emerald-600 dark:text-emerald-400 max-w-2xl mx-auto">
                Discover the beauty of Islam through prayer, reflection, and spiritual guidance
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {navigationItems.slice(1).map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-left group hover:scale-105"
                >
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-emerald-100 dark:bg-emerald-900 rounded-lg group-hover:bg-emerald-200 dark:group-hover:bg-emerald-800 transition-colors">
                      {React.cloneElement(item.icon, { className: "w-6 h-6 text-emerald-600 dark:text-emerald-400" })}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                    {item.label}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {getFeatureDescription(item.id)}
                  </p>
                </button>
              ))}
            </div>

            {selectedMood && (
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-xl border-l-4 border-amber-400">
                <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-300 mb-2">
                  Current Mood: {selectedMood.emoji} {selectedMood.label}
                </h3>
                <p className="text-amber-700 dark:text-amber-400">
                  Your selected mood will influence the content shown in reflections, verses, and stories.
                </p>
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        navigationItems={navigationItems}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <main className="container mx-auto px-4 py-8 mt-16">
        {renderContent()}
      </main>

       <footer className="luxury-footer">
        <div className="footer-container">
          {/* Top Section */}
          <div className="footer-top">
            <div className="footer-brand">
              <div className="brand-icon">
                <i className="fas fa-star-and-crescent"></i>
              </div>
              <h3>Islamic Pearls</h3>
              <p>Discover wisdom, find peace, embrace faith</p>
            </div>

            <div className="footer-links">
              <div className="link-group">
                <h4>Explore</h4>
                <ul>
                  <li><button onClick={() => setActiveSection('home')}>Home</button></li>
                  <li><button onClick={() => setActiveSection('mood')}>What's Your Mood</button></li>
                  <li><button onClick={() => setActiveSection('stories')}>Prophet Stories</button></li>
                  <li><button onClick={() => setActiveSection('quran')}>Quran Verses</button></li>
                </ul>
              </div>

              <div className="link-group">
                <h4>Resources</h4>
                <ul>
                  <li><button onClick={() => setActiveSection('quran')}>Daily Ayah</button></li>
                  <li><button onClick={() => setActiveSection('reflection')}>Guidance</button></li>
                  <li><button onClick={() => setActiveSection('stories')}>Wisdom</button></li>
                  <li><button onClick={() => setActiveSection('reflection')}>Reflection</button></li>
                </ul>
              </div>
            </div>

            <div className="social-section">
              <h4>Connect With Us</h4>
              <ul className="animated-social-links">
                <li className="icon-content">
                  <a data-social="instagram" aria-label="Instagram"
                      href="https://instagram.com/sheikh_sohail007" target="_blank" rel="noopener noreferrer">
                    <div className="filled"></div>
                    <svg xmlSpace="preserve" viewBox="0 0 16 16" className="bi bi-instagram"
                        fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                      <path fill="currentColor"
                          d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334">
                      </path>
                    </svg>
                  </a>
                  <div className="tooltip">Instagram</div>
                </li>

                <li className="icon-content">
                  <a data-social="instagram" aria-label="Instagram" href="https://instagram.com/honeyesticx"
                      target="_blank" rel="noopener noreferrer">
                    <div className="filled"></div>
                    <svg xmlSpace="preserve" viewBox="0 0 16 16" className="bi bi-instagram"
                        fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                      <path fill="currentColor"
                          d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334">
                      </path>
                    </svg>
                  </a>
                  <div className="tooltip">Instagram</div>
                </li>

                <li className="icon-content">
                  <a data-social="twitter" aria-label="Twitter" href="https://twitter.com/shiekhsohail678"
                      target="_blank" rel="noopener noreferrer">
                    <div className="filled"></div>
                    <svg xmlSpace="preserve" viewBox="0 0 16 16" className="bi bi-twitter" fill="currentColor"
                        height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                      <path fill="currentColor"
                          d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334q.002-.211-.006-.422A6.7 6.7 0 0 0 16 3.542a6.7 6.7 0 0 1-1.889.518 3.3 3.3 0 0 0 1.447-1.817 6.5 6.5 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.32 9.32 0 0 1-6.767-3.429 3.29 3.29 0 0 0 1.018 4.382A3.3 3.3 0 0 1 .64 6.575v.045a3.29 3.29 0 0 0 2.632 3.218 3.2 3.2 0 0 1-.865.115 3 3 0 0 1-.614-.057 3.28 3.28 0 0 0 3.067 2.277A6.6 6.6 0 0 1 .78 13.58a6 6 0 0 1-.78-.045A9.34 9.34 0 0 0 5.026 15">
                      </path>
                    </svg>
                  </a>
                  <div className="tooltip">Twitter</div>
                </li>

                <li className="icon-content">
                  <a data-social="github" aria-label="GitHub" href="https://github.com/sheikhsohail007"
                      target="_blank" rel="noopener noreferrer">
                    <div className="filled"></div>
                    <svg xmlSpace="preserve" viewBox="0 0 16 16" className="bi bi-github" fill="currentColor"
                        height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                      <path fill="currentColor"
                          d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8">
                      </path>
                    </svg>
                  </a>
                  <div className="tooltip">GitHub</div>
                </li>
              </ul>

              <div className="newsletter">
                <h5>Stay Updated</h5>
                <div className="newsletter-form">
                  <input type="email" placeholder="Enter your email" className="newsletter-input" />
                  <button className="newsletter-btn">
                    <i className="fas fa-paper-plane"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="footer-divider">
            <div className="ornamental-line">
              <div className="line"></div>
              <i className="fas fa-star"></i>
              <div className="line"></div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="footer-bottom">
            <div className="copyright">
              <p>&copy; 2025 Islamic Pearls | All rights reserved | created by Sheikh</p>
              <p className="inspiration">
                Inspired by <a href="https://www.islamestic.com" target="_blank" rel="noopener noreferrer" className="credit-link">
                  <i className="fas fa-external-link-alt"></i>
                  Islamestic.com
                </a>
              </p>
            </div>

            <div className="footer-meta">
              <div className="legal-links">
                <a href="#privacy">Privacy Policy</a>
                <span className="separator">•</span>
                <a href="#terms">Terms of Service</a>
                <span className="separator">•</span>
                <a href="#cookies">Cookie Policy</a>
              </div>

              <div className="developer-credit">
                <p>
                  Developed with <i className="fas fa-heart" style={{color: '#ff6b9d'}}></i>
                  for the Muslim Ummah
                </p>
              </div>
            </div>
          </div>

          {/* Back to Top Button */}
          <button className="back-to-top" id="backToTop" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <i className="fas fa-arrow-up"></i>
          </button>
        </div>
      </footer>
    </div>
  );
}

export default App;