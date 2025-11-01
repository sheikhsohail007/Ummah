import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Home, ArrowLeft, Compass, Search, Sparkles, Heart, BookOpen, Users, MessageCircle, Star } from 'lucide-react';

function NotFound() {
  const [isVisible, setIsVisible] = useState(false);

  // ✅ Simple animation trigger
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const quickLinks = [
    { 
      title: 'Quran Verses', 
      path: '/quran', 
      icon: BookOpen,
      description: 'Sacred verses with translations'
    },
    { 
      title: 'Prayer Guide', 
      path: '/salah-guide', 
      icon: Users, // Changed from Mosque to Users
      description: 'Complete Salah guidance'
    },
    { 
      title: 'Prophet Stories', 
      path: '/prophet-stories', 
      icon: Star,
      description: 'Inspiring Islamic stories'
    },
    { 
      title: 'Islamic AI', 
      path: '/islamic-ai', 
      icon: MessageCircle,
      description: 'AI-powered guidance'
    },
  ];

  return (
    <>
      <Helmet>
        <title>Page Not Found - Qalam Verse</title>
        <meta name="description" content="The page you're looking for doesn't exist. Return to Islamic Pearls homepage to explore our Islamic content and spiritual guidance." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* Background */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-emerald-900/20"></div>
        
        {/* Simple floating elements */}
        <div className="absolute top-10 left-10 w-2 h-2 bg-emerald-400/30 rounded-full animate-bounce"></div>
        <div className="absolute top-32 right-20 w-3 h-3 bg-teal-400/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 left-1/4 w-1.5 h-1.5 bg-blue-400/40 rounded-full animate-ping"></div>
      </div>

      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Main 404 Section */}
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Icon */}
            <div className="relative mb-8">
              <div className="w-32 h-32 bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 backdrop-blur-xl rounded-3xl flex items-center justify-center mx-auto shadow-2xl border border-white/30 dark:border-gray-700/30">
                <Compass className="w-16 h-16 text-emerald-600 dark:text-emerald-400 animate-spin" style={{ animationDuration: '8s' }} />
              </div>
            </div>

            {/* 404 Text */}
            <div className="mb-6">
              <h1 className="text-8xl md:text-9xl font-black bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 bg-clip-text text-transparent leading-none tracking-tight mb-4">
                404
              </h1>
              <div className="h-1 w-24 bg-gradient-to-r from-emerald-500 to-teal-600 mx-auto rounded-full mb-6"></div>
            </div>

            {/* Title */}
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4 tracking-tight">
              Oops! Page Lost in Space
            </h2>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              The page you're searching for seems to have wandered off. Don't worry, we'll guide you back to your 
              <span className="text-emerald-600 font-semibold"> spiritual journey</span> ✨
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link
                to="/"
                className="group px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 flex items-center gap-3"
              >
                <Home className="w-5 h-5" />
                <span>Return Home</span>
                <Sparkles className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              
              <button
                onClick={() => window.history.back()}
                className="group px-6 py-4 border-2 border-emerald-500/30 hover:border-emerald-500 text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 rounded-2xl font-semibold transition-all duration-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 flex items-center gap-3"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                <span>Go Back</span>
              </button>
            </div>
          </div>

          {/* Quick Access Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {quickLinks.map((link, index) => {
              const IconComponent = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`group transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: `${(index + 1) * 200}ms` }}
                >
                  <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-2xl p-6 border border-white/30 dark:border-gray-700/30 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2">
                    
                    {/* Icon */}
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    
                    {/* Content */}
                    <h3 className="font-semibold text-gray-800 dark:text-white mb-2 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                      {link.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {link.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Bottom Message */}
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '1000ms' }}>
            <div className="bg-gradient-to-r from-amber-50/80 to-orange-50/80 dark:from-amber-900/20 dark:to-orange-900/20 backdrop-blur-xl border border-amber-200/50 dark:border-amber-800/50 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Heart className="w-5 h-5 text-red-500 animate-pulse" />
                <h4 className="font-semibold text-amber-800 dark:text-amber-300">
                  Qalam Verse - Your Islamic Companion
                </h4>
                <Sparkles className="w-4 h-4 text-amber-600" />
              </div>
              <p className="text-amber-700 dark:text-amber-400 text-sm leading-relaxed">
                Discover comprehensive Islamic content, spiritual guidance, and authentic knowledge 
                <br className="hidden sm:block" />
                designed to enrich your faith journey
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NotFound;
