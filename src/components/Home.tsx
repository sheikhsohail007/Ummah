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
      id: 'tasbih',
      label: 'Tasbih Counter',
      icon: <Clock className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
      description: 'Get accurate prayer times for your location with notifications and reminders',
      path: '/tasbih'
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
        <title>Qalam Verse – Quran Reflection, Salah Guide, Tasbih Counter, Islamic AI & Daily Islamic Tools</title>
        <meta
          name="description"
          content="Qalam Verse: Your Islamic companion offering Quran reflections, simple Salah guide, digital Tasbih counter, Islamic AI assistant"
        />
        <meta name="keywords" content="Qalamverse, digital Islamic companion, Quranic reflection, Islamic stories, prayer times app, 99 Names of Allah, daily duas, Islamic guidance,  quran reflection today, quran meaning easy explanation, simple quran tafsir for beginners, daily quran inspiration app, salah step by step with pictures, simple salah guide for beginner, easy namaz guide, digital tasbih counter free online, online dhikr counter, dhikr counter for mobile, islamic ai question answer free, ask islamic ai anything, quran based ai answers, dua based on mood, quran verses for emotions, islamic dua for anxiety, short islamic moral stories, prophet stories simplified, asma ul husna benefits, daily dua for muslims, morning and evening adhkar, muslim daily spiritual habits, Qalamverse.site,islamic mood dua, quranic reflection for anxiety, quran verses for sleep peace, quranic wisdom for daily life, short quran verses with meaning, quran for emotional healing, quranic guidance for sadness, quran verses with simple explanation, digital tasbih counter online free, digital dhikr counter for phone, count dhikr on mobile, online tasbih without download, virtual tasbih for computer, islamic dhikr tracker app, easy tasbih counter web, islamic questions answered instantly, ask islamic questions online free, islamic guide chatbot, islamic advice assistant, muslim query helper, islamic fatwa assistant, islamic learning chatbot free, salah steps for beginners pdf, how to pray for new muslims, step by step salah guide, wudu and salah tutorial, common mistakes in salah, salah learning for kids, namaz step by step visual, islamic content based on mood, quran verses for my mood today, islamic guidance when feeling sad, islamic guidance when feeling happy, islamic guidance when feeling angry, islamic guidance when feeling stressed, islamic guidance when feeling depression, islamic advice for happiness,quranic healing for stress, islamic motivation when depressed, dua for emotional peace, asma ul husna for specific needs, allah names for healing sickness, 99 names of allah benefits daily, asma ul husna with real life benefits, allah names for protection and safety, memorize allah names easily, asma ul husna for rizq increase, short duas for daily life, powerful dhikr for morning evening, duas for specific problems, islamic protection duas, dhikr for heart peace, quick duas before sleep, dua collection for students, islamic mental health companion, digital islamic wellness guide, muslim spiritual therapy online, islamic emotional first aid, quranic psychological support, islamic self-care routine,digital imam for guidance" />
        <link rel="canonical" href="https://www.qalamverse.site/" />

        {/* JSON-LD structured data for Website & Organization to improve SERP presence */}
        <script type="application/ld+json">{`{
"@context": "https://schema.org",
"@type": "WebSite",
"name": "Qalam Verse",
"url": "https://www.qalamverse.site/",
"potentialAction": {
"@type": "SearchAction",
"target": "https://www.qalamverse.site/#/search?q={search_term_string}",
"query-input": "required name=search_term_string"
}
}`}</script>


        <script type="application/ld+json">{`{
"@context": "https://schema.org",
"@type": "Organization",
"name": "Qalam Verse",
"url": "https://www.qalamverse.site/",
"logo": "https://www.qalamverse.site/logo.png"
}`}</script>

        {/* ✅ COMPLETE OPEN GRAPH FOR HOME PAGE */}
        <meta property="og:title" content="Qalamverse" />
        <meta property="og:description" content="Your daily companion for Quranic reflection, prayer times and Islamic stories" />
        <meta property="og:url" content="https://www.qalamverse.site/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.qalamverse.site/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:site_name" content="Qalam Verse" />

        {/* ✅ COMPLETE TWITTER CARD FOR HOME PAGE */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Qalamverse" />
        <meta name="twitter:description" content="Daily Islamic companion for Quran, prayer times, stories and spiritual growth" />
        <meta name="twitter:image" content="https://www.qalamverse.site/og-image.jpg" />
        <meta name="twitter:image:alt" content="Qalamverse" />
        <meta name="twitter:site" content="@qalamverses" />
      </Helmet>

      <div className="space-y-8">
        <div className="text-center py-16 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl">
          <h1 className="text-5xl font-bold text-emerald-800 dark:text-emerald-300 mb-4">
            Qalam Verse
          </h1>
          <p className="text-xl text-emerald-600 dark:text-emerald-400 max-w-2xl mx-auto mb-4">
            Your Digital Islamic Companion
          </p>
          <p className="text-lg text-emerald-500 dark:text-emerald-300 max-w-3xl mx-auto">
            Discover comprehensive Islamic guidance with Quranic reflection, accurate prayer times,
            inspiring stories, and AI-powered spiritual assistance.
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