import  { useState, useEffect } from 'react';
import { Heart, RefreshCw, Calendar, Star } from 'lucide-react';
import type { Mood } from '../App';

interface DailyReflectionProps {
  selectedMood: Mood | null;
}

interface Reflection {
  id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  moods: string[];
  verse?: string;
  verseReference?: string;
}

function DailyReflection({ selectedMood }: DailyReflectionProps) {
  const [currentReflection, setCurrentReflection] = useState<Reflection | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const reflections: Reflection[] = [
    {
      id: '1',
      title: 'Finding Peace in Confusion',
      content: 'When life seems overwhelming and unclear, remember that Allah (SWT) has a plan for you. Sometimes the fog of confusion is lifted through prayer, patience, and trust in His wisdom. Take time today to make dua and seek guidance.',
      author: 'Daily Wisdom',
      category: 'Spiritual Growth',
      moods: ['confused', 'overwhelmed', 'uncertain'],
      verse: 'And whoever relies upon Allah - then He is sufficient for him. Indeed, Allah will accomplish His purpose.',
      verseReference: 'Quran 65:3'
    },
    {
      id: '2',
      title: 'Gratitude in Times of Joy',
      content: 'When happiness fills your heart, remember to thank Allah (SWT) for His countless blessings. Joy is a gift from the Almighty, and acknowledging this makes our happiness even more meaningful and lasting.',
      author: 'Daily Wisdom',
      category: 'Gratitude',
      moods: ['happy', 'grateful', 'joyful', 'content'],
      verse: 'And [remember] when your Lord proclaimed, "If you are grateful, I will certainly give you more."',
      verseReference: 'Quran 14:7'
    },
    {
      id: '3',
      title: 'Strength Through Sadness',
      content: 'Sadness is part of the human experience, and it can bring us closer to Allah. In our moments of sorrow, we turn to Him with sincere hearts. Remember that every difficulty is followed by ease, and this too shall pass.',
      author: 'Daily Wisdom',
      category: 'Comfort',
      moods: ['sad', 'hurt', 'lonely', 'disappointed'],
      verse: 'So verily, with the hardship, there is relief. Verily, with the hardship, there is relief.',
      verseReference: 'Quran 94:5-6'
    },
    {
      id: '4',
      title: 'Transforming Anxiety into Trust',
      content: 'Anxiety often stems from fear of the unknown. Islam teaches us that our sustenance, our health, our relationships - everything is in Allah\'s hands. When we truly internalize this, anxiety transforms into peaceful surrender.',
      author: 'Daily Wisdom',
      category: 'Peace',
      moods: ['anxious', 'worried', 'stressed', 'scared'],
      verse: 'And it is He who created the heavens and earth in truth. And the day He says, "Be," and it is, His word is the truth.',
      verseReference: 'Quran 6:73'
    },
    {
      id: '5',
      title: 'Finding Purpose in Motivation',
      content: 'When you feel motivated and energized, channel that energy towards good deeds. This drive you feel is a blessing from Allah. Use it to help others, improve yourself, and strengthen your relationship with your Creator.',
      author: 'Daily Wisdom',
      category: 'Action',
      moods: ['motivated', 'inspired', 'excited', 'energetic', 'determined'],
      verse: 'And whoever does righteous deeds, whether male or female, while being a believer - those will enter Paradise.',
      verseReference: 'Quran 4:124'
    },
    {
      id: '6',
      title: 'Rest and Renewal',
      content: 'Being tired is not a weakness; it\'s a reminder of our human limitations and need for Allah\'s strength. Take rest as a form of worship, knowing that caring for your body and mind is a trust from Allah.',
      author: 'Daily Wisdom',
      category: 'Self-care',
      moods: ['tired', 'overwhelmed', 'lazy'],
      verse: 'And We made from them leaders guiding by Our command when they were patient.',
      verseReference: 'Quran 21:73'
    },
    {
      id: '7',
      title: 'Peaceful Contentment',
      content: 'True peace comes not from having everything go our way, but from accepting Allah\'s decree with grace. In contentment, we find a special kind of worship - the worship of a grateful, trusting heart.',
      author: 'Daily Wisdom',
      category: 'Contentment',
      moods: ['peaceful', 'content', 'relaxed'],
      verse: 'Those who have believed and whose hearts are assured by the remembrance of Allah. Unquestionably, by the remembrance of Allah hearts are assured.',
      verseReference: 'Quran 13:28'
    }
  ];

  const getReflectionForMood = (mood: Mood | null): Reflection => {
    if (!mood) {
      return reflections[Math.floor(Math.random() * reflections.length)];
    }

    const moodSpecificReflections = reflections.filter(reflection => 
      reflection.moods.includes(mood.id)
    );

    if (moodSpecificReflections.length > 0) {
      return moodSpecificReflections[Math.floor(Math.random() * moodSpecificReflections.length)];
    }

    return reflections[Math.floor(Math.random() * reflections.length)];
  };

  const loadNewReflection = () => {
    setIsLoading(true);
    setTimeout(() => {
      setCurrentReflection(getReflectionForMood(selectedMood));
      setIsLoading(false);
    }, 500);
  };

  useEffect(() => {
    loadNewReflection();
  }, [selectedMood]);

  if (!currentReflection) return null;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
          Daily Reflection
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Spiritual insights and motivation for your journey
        </p>
        {selectedMood && (
          <div className="mt-4 inline-flex items-center px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 rounded-full text-emerald-800 dark:text-emerald-300">
            <span className="mr-2">{selectedMood.emoji}</span>
            <span className="text-sm font-medium">Tailored for when you're feeling {selectedMood.label.toLowerCase()}</span>
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-600">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <RefreshCw className="w-8 h-8 animate-spin text-emerald-500" />
            <span className="ml-3 text-gray-600 dark:text-gray-300">Loading new reflection...</span>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-full mr-4">
                  <Heart className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                    {currentReflection.title}
                  </h3>
                  <p className="text-emerald-600 dark:text-emerald-400 font-medium">
                    {currentReflection.category}
                  </p>
                </div>
              </div>
              <button
                onClick={loadNewReflection}
                className="flex items-center px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-lg hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition-colors"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                New Reflection
              </button>
            </div>

            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                {currentReflection.content}
              </p>
            </div>

            {currentReflection.verse && (
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-6 rounded-xl border-l-4 border-amber-400">
                <div className="flex items-start">
                  <Star className="w-5 h-5 text-amber-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <blockquote className="text-amber-800 dark:text-amber-300 text-lg italic mb-2">
                      "{currentReflection.verse}"
                    </blockquote>
                    <cite className="text-amber-600 dark:text-amber-400 font-medium">
                      - {currentReflection.verseReference}
                    </cite>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-600 mt-8">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 text-gray-500 mr-2" />
                <span className="text-gray-500 text-sm">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
              <span className="text-gray-500 text-sm">
                by {currentReflection.author}
              </span>
            </div>
          </>
        )}
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-600 dark:text-gray-300 italic">
          "And remember when your Lord proclaimed, 'If you are grateful, I will certainly give you more.'" - Quran 14:7
        </p>
      </div>
    </div>
  );
}

export default DailyReflection;