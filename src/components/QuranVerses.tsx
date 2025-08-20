import React, { useState, useEffect } from 'react';
import { BookOpen, Heart, Share, Copy, RefreshCw } from 'lucide-react';
import { Mood } from '../App';

interface QuranVersesProps {
  selectedMood: Mood | null;
}

interface QuranVerse {
  id: string;
  arabic: string;
  english: string;
  reference: string;
  theme: string;
  moods: string[];
  revelation: string;
  context: string;
}

function QuranVerses({ selectedMood }: QuranVersesProps) {
  const [currentVerse, setCurrentVerse] = useState<QuranVerse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const verses: QuranVerse[] = [
    {
      id: '1',
      arabic: 'وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ ۚ إِنَّ اللَّهَ بَالِغُ أَمْرِهِ',
      english: 'And whoever relies upon Allah - then He is sufficient for him. Indeed, Allah will accomplish His purpose.',
      reference: 'Quran 65:3',
      theme: 'Trust in Allah',
      moods: ['anxious', 'worried', 'confused', 'uncertain', 'overwhelmed'],
      revelation: 'Medinan',
      context: 'This verse reminds us that Allah is sufficient for all our needs and that He will accomplish His purpose in our lives.'
    },
    {
      id: '2',
      arabic: 'وَلَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ',
      english: 'If you are grateful, I will certainly give you more.',
      reference: 'Quran 14:7',
      theme: 'Gratitude',
      moods: ['grateful', 'happy', 'content', 'joyful', 'thankful'],
      revelation: 'Meccan',
      context: 'Allah promises to increase His blessings upon those who are grateful and acknowledge His gifts.'
    },
    {
      id: '3',
      arabic: 'فَإِنَّ مَعَ الْعُسْرِ يُسْرًا ۝ إِنَّ مَعَ الْعُسْرِ يُسْرًا',
      english: 'So verily, with the hardship, there is relief. Verily, with the hardship, there is relief.',
      reference: 'Quran 94:5-6',
      theme: 'Hope and Relief',
      moods: ['sad', 'depressed', 'hurt', 'disappointed', 'lonely', 'stressed'],
      revelation: 'Meccan',
      context: 'This verse was revealed to comfort Prophet Muhammad (PBUH) and reminds us that every difficulty comes with ease.'
    },
    {
      id: '4',
      arabic: 'أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ',
      english: 'Unquestionably, by the remembrance of Allah hearts are assured.',
      reference: 'Quran 13:28',
      theme: 'Inner Peace',
      moods: ['peaceful', 'anxious', 'stressed', 'worried', 'content', 'relaxed'],
      revelation: 'Meccan',
      context: 'True tranquility and peace of heart come through remembering and connecting with Allah.'
    },
    {
      id: '5',
      arabic: 'وَمَنْ عَمِلَ صَالِحًا مِّن ذَكَرٍ أَوْ أُنثَىٰ وَهُوَ مُؤْمِنٌ فَأُولَٰئِكَ يَدْخُلُونَ الْجَنَّةَ',
      english: 'And whoever does righteous deeds, whether male or female, while being a believer - those will enter Paradise.',
      reference: 'Quran 4:124',
      theme: 'Righteous Action',
      moods: ['motivated', 'inspired', 'determined', 'energetic', 'focused'],
      revelation: 'Medinan',
      context: 'This verse emphasizes that righteous deeds, regardless of gender, when done with faith, lead to Paradise.'
    },
    {
      id: '6',
      arabic: 'وَجَعَلْنَا مِنْهُمْ أَئِمَّةً يَهْدُونَ بِأَمْرِنَا لَمَّا صَبَرُوا',
      english: 'And We made from them leaders guiding by Our command when they were patient.',
      reference: 'Quran 21:73',
      theme: 'Patience and Leadership',
      moods: ['tired', 'overwhelmed', 'frustrated', 'impatient'],
      revelation: 'Meccan',
      context: 'This verse teaches us that patience and perseverance lead to spiritual leadership and guidance.'
    },
    {
      id: '7',
      arabic: 'وَبَشِّرِ الصَّابِرِينَ',
      english: 'And give good tidings to the patient.',
      reference: 'Quran 2:155',
      theme: 'Patience in Trials',
      moods: ['sad', 'hurt', 'disappointed', 'struggling'],
      revelation: 'Medinan',
      context: 'Allah promises good news and rewards for those who remain patient during trials and difficulties.'
    },
    {
      id: '8',
      arabic: 'وَاللَّهُ خَيْرُ الْمَاكِرِينَ',
      english: 'But Allah is the best of planners.',
      reference: 'Quran 8:30',
      theme: 'Divine Planning',
      moods: ['confused', 'uncertain', 'worried', 'anxious'],
      revelation: 'Medinan',
      context: 'No matter what schemes people make, Allah\'s plan is always superior and will prevail.'
    }
  ];

  const getVerseForMood = (mood: Mood | null): QuranVerse => {
    if (!mood) {
      return verses[Math.floor(Math.random() * verses.length)];
    }

    const moodSpecificVerses = verses.filter(verse => 
      verse.moods.includes(mood.id)
    );

    if (moodSpecificVerses.length > 0) {
      return moodSpecificVerses[Math.floor(Math.random() * moodSpecificVerses.length)];
    }

    return verses[Math.floor(Math.random() * verses.length)];
  };

  const loadNewVerse = () => {
    setIsLoading(true);
    setTimeout(() => {
      setCurrentVerse(getVerseForMood(selectedMood));
      setIsLoading(false);
    }, 500);
  };

  const copyVerse = async () => {
    if (!currentVerse) return;
    
    const textToCopy = `"${currentVerse.english}"\n- ${currentVerse.reference}\n\n${currentVerse.arabic}`;
    
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  useEffect(() => {
    loadNewVerse();
  }, [selectedMood]);

  if (!currentVerse) return null;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
          Quran Verses
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Divine guidance from the Holy Quran for daily inspiration
        </p>
        {selectedMood && (
          <div className="mt-4 inline-flex items-center px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 rounded-full text-emerald-800 dark:text-emerald-300">
            <span className="mr-2">{selectedMood.emoji}</span>
            <span className="text-sm font-medium">Verses for when you're feeling {selectedMood.label.toLowerCase()}</span>
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-600">
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <RefreshCw className="w-8 h-8 animate-spin text-emerald-500" />
            <span className="ml-3 text-gray-600 dark:text-gray-300">Loading new verse...</span>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <BookOpen className="w-6 h-6 mr-3" />
                  <div>
                    <h3 className="text-xl font-bold">{currentVerse.reference}</h3>
                    <p className="text-emerald-100 text-sm">{currentVerse.theme} • {currentVerse.revelation}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={copyVerse}
                    className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                    title="Copy verse"
                  >
                    {copied ? (
                      <Heart className="w-5 h-5 text-red-300" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </button>
                  <button
                    onClick={loadNewVerse}
                    className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                    title="New verse"
                  >
                    <RefreshCw className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Arabic Text */}
            <div className="p-8 bg-gradient-to-b from-emerald-50 to-white dark:from-gray-700 dark:to-gray-800">
              <div className="text-center">
                <p className="text-3xl leading-relaxed text-gray-800 dark:text-white font-arabic mb-6" dir="rtl">
                  {currentVerse.arabic}
                </p>
              </div>
            </div>

            {/* English Translation */}
            <div className="p-8">
              <blockquote className="text-xl leading-relaxed text-gray-700 dark:text-gray-300 text-center italic mb-6">
                "{currentVerse.english}"
              </blockquote>
              
              <div className="border-t border-gray-200 dark:border-gray-600 pt-6">
                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Context & Reflection:</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {currentVerse.context}
                  </p>
                </div>
              </div>

              {copied && (
                <div className="mt-4 p-3 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-lg text-center">
                  ✓ Verse copied to clipboard
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Additional Verses Grid */}
      <div className="mt-12">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
          More Verses for Reflection
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {verses.slice(0, 4).map((verse) => (
            <button
              key={verse.id}
              onClick={() => setCurrentVerse(verse)}
              className={`p-4 rounded-lg border-2 transition-all text-left hover:scale-[1.02] ${
                currentVerse?.id === verse.id
                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                  : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-emerald-300'
              }`}
            >
              <div className="flex items-center mb-2">
                <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mr-2" />
                <span className="font-medium text-emerald-800 dark:text-emerald-300 text-sm">
                  {verse.reference}
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                {verse.theme}
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-xs line-clamp-2">
                {verse.english.length > 80 ? verse.english.substring(0, 80) + '...' : verse.english}
              </p>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-600 dark:text-gray-300 italic">
          "This is the Book about which there is no doubt, a guidance for those conscious of Allah." - Quran 2:2
        </p>
      </div>
    </div>
  );
}

export default QuranVerses;