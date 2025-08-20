import React from 'react';
import { Mood } from '../App';

interface MoodSelectorProps {
  selectedMood: Mood | null;
  onMoodSelect: (mood: Mood) => void;
}

const moods: Mood[] = [
  { id: 'happy', label: 'Happy', emoji: '😊', color: 'bg-yellow-100 text-yellow-800' },
  { id: 'peaceful', label: 'Peaceful', emoji: '😌', color: 'bg-green-100 text-green-800' },
  { id: 'grateful', label: 'Grateful', emoji: '🙏', color: 'bg-purple-100 text-purple-800' },
  { id: 'confused', label: 'Confused', emoji: '😕', color: 'bg-orange-100 text-orange-800' },
  { id: 'sad', label: 'Sad', emoji: '😢', color: 'bg-blue-100 text-blue-800' },
  { id: 'anxious', label: 'Anxious', emoji: '😰', color: 'bg-red-100 text-red-800' },
  { id: 'hopeful', label: 'Hopeful', emoji: '🤗', color: 'bg-teal-100 text-teal-800' },
  { id: 'tired', label: 'Tired', emoji: '😴', color: 'bg-gray-100 text-gray-800' },
  { id: 'motivated', label: 'Motivated', emoji: '💪', color: 'bg-indigo-100 text-indigo-800' },
  { id: 'lonely', label: 'Lonely', emoji: '😞', color: 'bg-pink-100 text-pink-800' },
  { id: 'stressed', label: 'Stressed', emoji: '😫', color: 'bg-red-100 text-red-800' },
  { id: 'content', label: 'Content', emoji: '😊', color: 'bg-emerald-100 text-emerald-800' },
  { id: 'worried', label: 'Worried', emoji: '😟', color: 'bg-amber-100 text-amber-800' },
  { id: 'excited', label: 'Excited', emoji: '🤩', color: 'bg-rose-100 text-rose-800' },
  { id: 'overwhelmed', label: 'Overwhelmed', emoji: '😵', color: 'bg-gray-100 text-gray-800' },
  { id: 'inspired', label: 'Inspired', emoji: '✨', color: 'bg-violet-100 text-violet-800' },
];

function MoodSelector({ selectedMood, onMoodSelect }: MoodSelectorProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
          How are you feeling today?
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Select your current mood to receive personalized spiritual guidance, verses, and reflections
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
        {moods.map((mood) => (
          <button
            key={mood.id}
            onClick={() => onMoodSelect(mood)}
            className={`p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
              selectedMood?.id === mood.id
                ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 shadow-lg'
                : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-emerald-300'
            }`}
          >
            <div className="text-3xl mb-2">{mood.emoji}</div>
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {mood.label}
            </div>
          </button>
        ))}
      </div>

      {selectedMood && (
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-xl border border-emerald-200 dark:border-gray-600">
          <div className="flex items-center justify-center mb-4">
            <div className="text-4xl mr-3">{selectedMood.emoji}</div>
            <h3 className="text-2xl font-semibold text-emerald-800 dark:text-emerald-300">
              You're feeling {selectedMood.label}
            </h3>
          </div>
          <p className="text-center text-emerald-700 dark:text-emerald-400">
            Your mood selection will now influence the reflections, verses, and stories shown throughout the app. 
            Navigate to other sections to see personalized content based on how you're feeling.
          </p>
          <div className="mt-4 text-center">
            <p className="text-sm text-emerald-600 dark:text-emerald-400 italic">
              "And it is He who created the heavens and earth in truth. And the day He says, 'Be,' and it is, His word is the truth." - Quran 6:73
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default MoodSelector;