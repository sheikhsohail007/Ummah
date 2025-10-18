import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { CheckCircle, Home, Heart, Star } from "lucide-react";

function ThankYou() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 flex items-center justify-center py-12 px-4 relative overflow-hidden">
      <Helmet>
        <title>Thank You for Your Feedback | Qalam Verse</title>
        <meta
          name="description"
          content="Thank you for sharing your feedback with Qalam Verse. Your input helps us improve our Islamic learning platform."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* Background floating shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-40 h-40 bg-emerald-200 dark:bg-emerald-700 rounded-full blur-3xl opacity-30 top-10 left-10 animate-pulse"></div>
        <div className="absolute w-60 h-60 bg-teal-300 dark:bg-teal-800 rounded-full blur-3xl opacity-20 bottom-10 right-10 animate-[pulse_6s_infinite]"></div>
      </div>

      <div className="max-w-md w-full text-center relative z-10 animate-fade-in">
        {/* Animated Success Icon */}
        <div className="relative mb-8">
          <div className="w-24 h-24 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-200/50 dark:shadow-emerald-800/30 animate-bounce">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>

          {/* Floating Stars */}
          <div className="absolute -top-4 -left-4 animate-spin-slow">
            <Star className="w-6 h-6 text-yellow-400 fill-current" />
          </div>
          <div className="absolute -top-2 -right-6 animate-spin-slow animation-delay-75">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
          </div>
          <div className="absolute -bottom-2 -left-6 animate-spin-slow animation-delay-150">
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
          </div>
        </div>

        {/* Main Card */}
        <div className="backdrop-blur-md bg-white/70 dark:bg-gray-800/60 rounded-2xl shadow-2xl border border-gray-200/40 dark:border-gray-700/40 p-8 transition-transform duration-500 hover:scale-[1.02]">
          <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white mb-3 tracking-tight">
            Thank You for Your Feedback! 🌟
          </h1>

          <p className="text-gray-700 dark:text-gray-300 text-base mb-6 leading-relaxed">
            Your valuable feedback has been received and will help us improve
            Qalam Verse for the entire community.
          </p>

          <div className="flex items-center justify-center mb-6">
            <Heart className="w-5 h-5 text-red-500 mr-2 animate-pulse" />
            <span className="text-emerald-600 dark:text-emerald-400 font-medium">
              JazakAllahu Khairan (May Allah reward you with good)
            </span>
            <Heart className="w-5 h-5 text-red-500 ml-2 animate-pulse" />
          </div>

          {/* Go Home Button */}
          <Link
            to="/"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-medium rounded-xl shadow-md hover:shadow-xl hover:from-emerald-700 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            <Home className="w-5 h-5 mr-2" />
            Go to Home
          </Link>

          {/* Additional Message */}
          <div className="mt-8 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800">
            <p className="text-emerald-800 dark:text-emerald-300 text-sm">
              <strong>What's next?</strong> We'll review your feedback and use
              it to enhance your Islamic learning experience. Feel free to
              explore more sections of Qalam Verse!
            </p>
          </div>
        </div>

        {/* Footer Quote */}
        <div className="mt-8">
          <blockquote className="text-gray-600 dark:text-gray-400 italic text-sm">
            "And whoever does good deeds, whether male or female, while being a
            believer - those will enter Paradise."
          </blockquote>
          <cite className="text-gray-500 dark:text-gray-500 text-xs mt-1 block">
            - Quran 4:124
          </cite>
        </div>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-in-out;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default ThankYou;
