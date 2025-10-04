import React, { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X, Clock, Heart, BookOpen, Compass, MessageCircle, Smile } from 'lucide-react';
import { Bot } from 'lucide-react';
import LoadingScreen from './components/LoadingScreen';
import Header from './components/Header';
import MoodSelector from './components/MoodSelector';
import PrayerTimes from './components/PrayerTimes';
import SalahGuide from './components/SalahGuide';
import DailyReflection from './components/DailyReflection';
import QuranVerses from './components/QuranVerses';
import IslamicStories from './components/IslamicStories';
import DuaAndDhikr from './components/DuaAndDhikr';
import Footer from './components/Footer';
import ProphetStories from './components/ProphetStories';
import PropheticWisdom from './components/PropheticWisdom';
import IslamicAI from './components/IslamicAI.tsx';


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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 seconds loading time

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  const navigationItems = [
    { id: 'home', label: 'Home', icon: <Compass className="w-5 h-5" /> },
    { id: 'salah', label: 'Correct Your Salah', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'prayer-times', label: 'Prayer Times', icon: <Clock className="w-5 h-5" /> },
    { id: 'reflection', label: 'Daily Reflection', icon: <Heart className="w-5 h-5" /> },
    { id: 'quran', label: 'Quran Verses', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'stories', label: 'Islamic Stories', icon: <MessageCircle className="w-5 h-5" /> },
    { id: 'prophet-stories', label: 'Story of Prophets', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'prophetic-wisdom', label: 'Prophetic Wisdom', icon: <Heart className="w-5 h-5" /> },
    { id: 'mood', label: 'Mood Selector', icon: <Smile className="w-5 h-5" /> },
    { id: 'dua-dhikr', label: 'Dua & Dhikr', icon: <Heart className="w-5 h-5" /> },
    { id: 'islamic-ai', label: 'Islamic AI', icon: <Bot className="w-5 h-5" /> },

  ];

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
      case 'prophet-stories':
        return <ProphetStories />;
      case 'prophetic-wisdom':
        return <PropheticWisdom />;
      case 'mood':
        return <MoodSelector selectedMood={selectedMood} onMoodSelect={setSelectedMood} />;
      case 'dua-dhikr':
        return <DuaAndDhikr />;
     case 'islamic-ai':
  return <IslamicAI onBack={() => setActiveSection('home')} />;


      default:
        return (
          <div className="space-y-8">
            <div className="text-center py-16 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl">
              <h1 className="text-5xl font-bold text-emerald-800 dark:text-emerald-300 mb-4">
                Faith Lines
              </h1>
              <p className="text-xl text-emerald-600 dark:text-emerald-400 max-w-2xl mx-auto">
                Discover the beauty of Islam through prayer, reflection, and spiritual guidance
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {navigationItems.slice(1, -2).map((item) => (
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

            <button
              onClick={() => setActiveSection('islamic-ai')}
              className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-left group hover:scale-105"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 bg-emerald-100 dark:bg-emerald-900 rounded-lg group-hover:bg-emerald-200 dark:group-hover:bg-emerald-800 transition-colors">
                  <Bot className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                Islamic AI
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Ask your personal Islamic questions and get guidance in a humble and polite tone.
              </p>
            </button>


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

  const getFeatureDescription = (id: string) => {
    const descriptions = {
      'salah': 'Learn the correct way to perform prayers with step-by-step guidance in multiple languages',
      'prayer-times': 'Get accurate prayer times for your location with notifications and reminders',
      'reflection': 'Daily spiritual reflections and motivational content tailored to your mood',
      'quran': 'Beautiful verses from the Holy Quran for daily guidance and inspiration',
      'stories': 'Inspiring stories from prophets and believers to strengthen your faith',
      'prophet-stories': 'Discover the complete stories of 20 Prophets with lessons and Quranic references',
      'prophetic-wisdom': 'Learn from the teachings and wisdom of 20 Prophets with practical guidance',
      'mood': 'Select how you\'re feeling today to receive personalized spiritual content',
      'islamic-ai': 'Ask your personal Islamic questions and get humble, polite guidance'

    };
    return descriptions[id as keyof typeof descriptions] || '';
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

      <Footer
        setActiveSection={setActiveSection}
      />
    </div>
  );
}

export default App;