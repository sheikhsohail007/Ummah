import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import LoadingScreen from './components/LoadingScreen';
import Header from './components/Header';
import Home from './components/Home';
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
import NotFound from './components/NotFound';
import IslamicAI from './components/IslamicAI';
import TasbihCounter from './components/TasbihCounter';
import Feedback from './components/Feedback';
import ThankYou from './components/ThankYou';
import AllahNames from './components/AllahNames';

export interface Mood {
  id: string;
  label: string;
  emoji: string;
  color: string;
}

function App() {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

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
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Helmet>
        <title>Qalam Verse - Your Digital Islamic Companion</title>
        <meta name="description" content="Discover the beauty of Islam through prayer times, Quranic verses, prophetic wisdom, Islamic stories, and spiritual guidance. Your comprehensive digital companion for Islamic learning." />
        <meta name="keywords" content="Islam, Quran, Prayer Times, Islamic Stories, Prophet Stories, Dua, Dhikr, Islamic Education, Muslim, Spiritual Guidance" />
        <meta name="author" content="Sheikh Sohail" />
        <meta property="og:title" content="Qalam Verse - Your Digital Islamic Companion" />
        <meta property="og:description" content="Discover the beauty of Islam through prayer times, Quranic verses, prophetic wisdom, and spiritual guidance." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sheikhsohail007.github.io/Ummah/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Qalam Verse - Your Digital Islamic Companion" />
        <meta name="twitter:description" content="Discover the beauty of Islam through prayer times, Quranic verses, prophetic wisdom, and spiritual guidance." />
        <link rel="canonical" href="https://sheikhsohail007.github.io/Ummah/" />
      </Helmet>

      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <main className="container mx-auto px-4 py-8 mt-16">
        <Routes>
          <Route path="/" element={<Home selectedMood={selectedMood} />} />
          <Route path="/mood" element={<MoodSelector selectedMood={selectedMood} onMoodSelect={setSelectedMood} />} />
          <Route path="/prayer-times" element={<PrayerTimes />} />
          <Route path="/salah-guide" element={<SalahGuide />} />
          <Route path="/reflection" element={<DailyReflection selectedMood={selectedMood} />} />
          <Route path="/quran" element={<QuranVerses selectedMood={selectedMood} />} />
          <Route path="/islamic-stories" element={<IslamicStories selectedMood={selectedMood} />} />
          <Route path="/prophet-stories" element={<ProphetStories />} />
          <Route path="/prophetic-wisdom" element={<PropheticWisdom />} />
          <Route path="/dua" element={<DuaAndDhikr />} />
          <Route path="/islamic-ai" element={<IslamicAI />} />
          <Route path="/allah-names" element={<AllahNames />} />
          <Route path="/tasbih" element={<TasbihCounter />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/thankyou" element={<ThankYou />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;