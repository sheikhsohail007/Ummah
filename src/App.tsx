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
        <meta 
          name="description" 
          content="Qalam Verse - Your digital Islamic companion for daily Quranic reflection, prayer times, Islamic stories, and spiritual guidance. Perfect for Muslim daily practice." 
        />
        <link rel="canonical" href="https://www.qalamverse.site/" />
        
        {/* ✅ DEFAULT OPEN GRAPH FOR ALL PAGES */}
        <meta property="og:title" content="Qalam Verse - Digital Islamic Companion" />
        <meta property="og:description" content="Daily Islamic companion for Quran, prayer times, stories and spiritual growth" />
        <meta property="og:url" content="https://www.qalamverse.site/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.qalamverse.site/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:site_name" content="Qalam Verse" />
        
        {/* ✅ DEFAULT TWITTER CARD FOR ALL PAGES */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Qalam Verse - Digital Islamic Companion" />
        <meta name="twitter:description" content="Your comprehensive Islamic platform for Quran, prayer times and spiritual guidance" />
        <meta name="twitter:image" content="https://www.qalamverse.site/og-image.jpg" />
        <meta name="twitter:image:alt" content="Qalam Verse - Digital Islamic Companion" />
        <meta name="twitter:site" content="@qalamverse" />
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