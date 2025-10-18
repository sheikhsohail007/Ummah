import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Home, ArrowLeft, Compass } from 'lucide-react';

function NotFound() {
  return (
    <>
      <Helmet>
        <title>Page Not Found - Qalam Verse</title>
        <meta name="description" content="The page you're looking for doesn't exist. Return to Islamic Pearls homepage to explore our Islamic content and spiritual guidance." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto">
          <div className="mb-8">
            <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <Compass className="w-12 h-12 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h1 className="text-6xl font-bold text-gray-800 dark:text-white mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
              Page Not Found
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
            </p>
          </div>

          <div className="space-y-4">
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
            >
              <Home className="w-5 h-5 mr-2" />
              Go to Homepage
            </Link>
            
            <div className="text-center">
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Go Back
              </button>
            </div>
          </div>

          <div className="mt-12 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-gray-800 dark:to-gray-700 rounded-xl">
            <h3 className="text-lg font-semibold text-emerald-800 dark:text-emerald-300 mb-2">
              Explore Qalam Verse
            </h3>
            <p className="text-emerald-700 dark:text-emerald-400 text-sm mb-4">
              Discover our comprehensive Islamic content and spiritual guidance
            </p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <Link to="/quran" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                Quran Verses
              </Link>
              <Link to="/prayer-times" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                Prayer Times
              </Link>
              <Link to="/prophet-stories" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                Prophet Stories
              </Link>
              <Link to="/dua" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                Dua & Dhikr
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NotFound;