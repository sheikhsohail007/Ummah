import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Clock, Heart, BookOpen, Compass, MessageCircle, Smile } from 'lucide-react';
import { Mood } from '../App';

interface HomeProps {
  selectedMood: Mood | null;
}

function Home({ selectedMood }: HomeProps) {
  const navigationItems = [
    { 
      id: 'salah-guide', 
      label: 'Correct Your Salah', 
      icon: <BookOpen className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
      description: 'Learn the correct way to perform prayers with step-by-step guidance in multiple languages',
      path: '/salah-guide'
    },
    { 
      id: 'prayer-times', 
      label: 'Prayer Times', 
      icon: <Clock className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
      description: 'Get accurate prayer times for your location with notifications and reminders',
      path: '/prayer-times'
    },
    { 
      id: 'reflection', 
      label: 'Daily Reflection', 
      icon: <Heart className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
      description: 'Daily spiritual reflections and motivational content tailored to your mood',
      path: '/reflection'
    },
    { 
      id: 'quran', 
      label: 'Quran Verses', 
      icon: <BookOpen className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
      description: 'Beautiful verses from the Holy Quran for daily guidance and inspiration',
      path: '/quran'
    },
    { 
      id: 'islamic-stories', 
      label: 'Islamic Stories', 
      icon: <MessageCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
      description: 'Inspiring stories from prophets and believers to strengthen your faith',
      path: '/islamic-stories'
    },
    { 
      id: 'prophet-stories', 
      label: 'Story of Prophets', 
      icon: <BookOpen className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
      description: 'Discover the complete stories of 31 Prophets with lessons and Quranic references',
      path: '/prophet-stories'
    },
    { 
      id: 'prophetic-wisdom', 
      label: 'Prophetic Wisdom', 
      icon: <Heart className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
      description: 'Learn from the teachings and wisdom of 31 Prophets with practical guidance',
      path: '/prophetic-wisdom'
    },
    { 
      id: 'mood', 
      label: 'Mood Selector', 
      icon: <Smile className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
      description: 'Select how you\'re feeling today to receive personalized spiritual content',
      path: '/mood'
    },
    { 
      id: 'dua', 
      label: 'Dua & Dhikr', 
      icon: <Heart className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
      description: 'Essential Islamic supplications and remembrance for daily spiritual practice',
      path: '/dua'
    },
    { 
      id: 'islamic-ai', 
      label: 'Islamic AI', 
      icon: <MessageCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
      description: 'Get instant Islamic guidance with AI-powered chatbot for Quran, Hadith, and spiritual questions',
      path: '/islamic-ai'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Qalam Verse</title>
        <meta name="description" content="Welcome to Islamic Pearls - Your comprehensive digital companion for Islamic guidance, prayers, and spiritual growth. Explore Quranic verses, prophetic wisdom, prayer times, and more." />
        <meta name="keywords" content="Islamic Pearls, Islam, Quran, Prayer Times, Islamic Stories, Prophet Stories, Dua, Dhikr, Islamic Education, Muslim, Spiritual Guidance, Home" />
        <link rel="canonical" href="https://www.qalamverse.site/" />
      </Helmet>

      <div className="space-y-8">
        <div className="text-center py-16 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl">
          <h1 className="text-5xl font-bold text-emerald-800 dark:text-emerald-300 mb-4">
            Qalam Verse
          </h1>
          <p className="text-xl text-emerald-600 dark:text-emerald-400 max-w-2xl mx-auto">
            Discover the beauty of Islam through prayer, reflection, and spiritual guidance
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {navigationItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-left group hover:scale-105 block"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 bg-emerald-100 dark:bg-emerald-900 rounded-lg group-hover:bg-emerald-200 dark:group-hover:bg-emerald-800 transition-colors">
                  {item.icon}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                {item.label}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {item.description}
              </p>
            </Link>
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
    </>
  );
}

export default Home;