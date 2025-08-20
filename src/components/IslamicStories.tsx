import  { useState, useEffect } from 'react';
import { Book, Heart, Star, User, Clock, RefreshCw } from 'lucide-react';
import { Mood } from '../App';

interface IslamicStoriesProps {
  selectedMood: Mood | null;
}

interface Story {
  id: string;
  title: string;
  content: string;
  moral: string;
  character: string;
  category: string;
  readTime: string;
  moods: string[];
  tags: string[];
}

function IslamicStories({ selectedMood }: IslamicStoriesProps) {
  const [currentStory, setCurrentStory] = useState<Story | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedStory, setExpandedStory] = useState(false);

  const stories: Story[] = [
    {
      id: '1',
      title: 'The Patient Merchant',
      content: `A wealthy merchant in Baghdad lost everything in a single day - his ships sank, his warehouses burned, and his debtors fled. As he sat in despair, he remembered the words of Prophet Muhammad (PBUH): "No fatigue, nor disease, nor sorrow, nor sadness, nor hurt, nor distress befalls a Muslim, not even if it were the prick he receives from a thorn, but that Allah expiates some of his sins for that."

The merchant realized that his losses were a test from Allah. Instead of despairing, he made dua and asked Allah for guidance. He started small, selling simple goods in the marketplace with honesty and kindness. 

Within a few years, his reputation for integrity attracted customers from far and wide. He became more prosperous than before, but this time he was grateful for every blessing and helped the poor regularly. He often said, "My greatest wealth was lost so I could find my greatest treasure - complete trust in Allah."`,
      moral: 'Tests and trials are opportunities for spiritual growth. When we face difficulties with patience and trust in Allah, we often emerge stronger and more blessed than before.',
      character: 'Abu Yusuf Al-Baghdadi',
      category: 'Patience in Trials',
      readTime: '3 min',
      moods: ['sad', 'disappointed', 'worried', 'anxious', 'overwhelmed'],
      tags: ['patience', 'trust', 'prosperity', 'trials']
    },
    {
      id: '2',
      title: 'The Grateful Shepherd',
      content: `A poor shepherd boy tended his small flock outside Medina. Every morning, he would wake up before Fajr and thank Allah for the beautiful sunrise. Every evening, he would praise Allah for the peaceful sunset. His few sheep were healthy, and he had simple food to eat.

One day, a wealthy man passed by and pitied the shepherd's poverty. "Why do you seem so happy when you have so little?" he asked. The shepherd smiled and replied, "I have everything I need. Allah gives me fresh air to breathe, water to drink, food to eat, and the most beautiful views in creation. I have health, faith, and peace. What more could I want?"

The wealthy man was amazed. He realized that despite all his riches, he was always complaining and never felt satisfied. From that day, he began each morning by counting his blessings instead of his problems. Soon, his anxiety disappeared, and he found the contentment he had been seeking in his wealth.`,
      moral: 'True happiness comes not from having more, but from being grateful for what we already have. Gratitude transforms any situation into a blessing.',
      character: 'Salim the Shepherd',
      category: 'Gratitude',
      readTime: '2 min',
      moods: ['grateful', 'content', 'peaceful', 'happy', 'thankful'],
      tags: ['gratitude', 'contentment', 'simplicity', 'happiness']
    },
    {
      id: '3',
      title: 'The Lost Traveler',
      content: `A young man was traveling to perform Hajj when he became lost in the desert. His water ran out, his camel died, and he was completely alone. As the sun beat down mercilessly, fear and panic began to overwhelm him. He had heard stories of people dying in the desert, and despair crept into his heart.

Then he remembered his grandmother's words: "Whenever you feel lost, make dua and remember that Allah is always with you." He performed wudu with the last drops of his water, found the direction of Mecca, and prayed two rakahs. He poured his heart out to Allah, asking for guidance and expressing complete trust in His mercy.

As he finished his prayer, he noticed footprints in the sand that he hadn't seen before. Following them, he found a caravan that had stopped at a nearby oasis. The travelers welcomed him warmly, shared their food and water, and helped him reach Mecca safely. Years later, he would tell his own children: "I was never truly lost, because Allah was always guiding me."`,
      moral: 'When we feel lost or confused, sincere prayer and trust in Allah\'s guidance will always lead us to the right path. Allah never abandons those who seek Him sincerely.',
      character: 'Ahmad ibn Rashid',
      category: 'Divine Guidance',
      readTime: '3 min',
      moods: ['confused', 'scared', 'lost', 'uncertain', 'anxious'],
      tags: ['guidance', 'prayer', 'trust', 'mercy', 'pilgrimage']
    },
    {
      id: '4',
      title: 'The Inspired Scholar',
      content: `A young woman in Cordoba had a burning desire to become a scholar of Islamic jurisprudence, but she faced many obstacles. Her family thought it was inappropriate, society didn't support women scholars, and she had no formal education. Many people told her to give up her dreams.

But she remembered the hadith: "Seek knowledge from the cradle to the grave." She was determined to follow Allah's command to seek knowledge. She started by learning to read and write from her grandmother. Then she attended public lectures by standing outside the mosque and listening through the windows.

Her dedication impressed a renowned female scholar who agreed to teach her privately. For ten years, she studied day and night, memorizing the Quran and learning hadith. Eventually, she became one of the most respected scholars in Al-Andalus, teaching hundreds of students and writing influential works on Islamic law.

Her story inspired countless other women to pursue knowledge. She would always tell her students: "When you have a righteous goal and work hard with sincere intention, Allah will open paths you never imagined."`,
      moral: 'When we are motivated to do something good and beneficial, we should trust in Allah and work hard towards our goals. He will provide ways we never expected.',
      character: 'Fatimah bint Ahmad al-Qurtubi',
      category: 'Pursuing Knowledge',
      readTime: '3 min',
      moods: ['motivated', 'inspired', 'determined', 'ambitious', 'energetic'],
      tags: ['knowledge', 'determination', 'inspiration', 'education', 'success']
    },
    {
      id: '5',
      title: 'The Wise Judge',
      content: `In the court of Harun al-Rashid, there was a judge known for his wisdom and justice. One day, two men came to him with a dispute over a valuable horse. Each claimed to be the rightful owner, and both had witnesses supporting their claims.

The judge was confused and couldn't determine who was telling the truth. He felt overwhelmed by the responsibility of making the right decision. That night, he prayed Tahajjud and asked Allah for wisdom and guidance in making the correct judgment.

The next morning, he had a brilliant idea. He announced that he would give the horse to whoever could prove their love for the animal. The first man immediately offered to pay extra money to claim the horse. The second man said, "Your Honor, if there's any doubt about ownership, I'd rather the horse go to whoever will treat it better. I just want the animal to be happy and cared for."

The judge immediately knew the true owner. The man who showed genuine concern for the horse's welfare, rather than just claiming ownership, was clearly the rightful owner. The decision was just, and both men accepted it peacefully.`,
      moral: 'When we feel overwhelmed by difficult decisions, sincere prayer and seeking Allah\'s guidance will provide the wisdom we need. True ownership comes with responsibility and care.',
      character: 'Judge Abu Hanifa al-Baghdadi',
      category: 'Seeking Wisdom',
      readTime: '3 min',
      moods: ['confused', 'overwhelmed', 'uncertain', 'indecisive'],
      tags: ['wisdom', 'justice', 'prayer', 'guidance', 'responsibility']
    }
  ];

  const getStoryForMood = (mood: Mood | null): Story => {
    if (!mood) {
      return stories[Math.floor(Math.random() * stories.length)];
    }

    const moodSpecificStories = stories.filter(story => 
      story.moods.includes(mood.id)
    );

    if (moodSpecificStories.length > 0) {
      return moodSpecificStories[Math.floor(Math.random() * moodSpecificStories.length)];
    }

    return stories[Math.floor(Math.random() * stories.length)];
  };

  const loadNewStory = () => {
    setIsLoading(true);
    setExpandedStory(false);
    setTimeout(() => {
      setCurrentStory(getStoryForMood(selectedMood));
      setIsLoading(false);
    }, 500);
  };

  useEffect(() => {
    loadNewStory();
  }, [selectedMood]);

  if (!currentStory) return null;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
          Islamic Stories
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Inspiring tales from our Islamic heritage to strengthen faith and provide guidance
        </p>
        {selectedMood && (
          <div className="mt-4 inline-flex items-center px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 rounded-full text-emerald-800 dark:text-emerald-300">
            <span className="mr-2">{selectedMood.emoji}</span>
            <span className="text-sm font-medium">Stories for when you're feeling {selectedMood.label.toLowerCase()}</span>
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-600">
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <RefreshCw className="w-8 h-8 animate-spin text-emerald-500" />
            <span className="ml-3 text-gray-600 dark:text-gray-300">Loading new story...</span>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Book className="w-6 h-6 mr-3" />
                  <div>
                    <h3 className="text-2xl font-bold">{currentStory.title}</h3>
                    <div className="flex items-center mt-2 space-x-4 text-emerald-100">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        <span className="text-sm">{currentStory.character}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <span className="text-sm">{currentStory.readTime} read</span>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={loadNewStory}
                  className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                  title="New story"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Category Badge */}
            <div className="px-6 py-4 bg-emerald-50 dark:bg-emerald-900/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mr-2" />
                  <span className="text-emerald-800 dark:text-emerald-300 font-medium">
                    {currentStory.category}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentStory.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-xs rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Story Content */}
            <div className="p-6">
              <div className={`prose prose-lg max-w-none transition-all duration-300 ${
                expandedStory ? 'max-h-none' : 'max-h-48 overflow-hidden'
              }`}>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                  {currentStory.content}
                </p>
              </div>
              
              {!expandedStory && (
                <button
                  onClick={() => setExpandedStory(true)}
                  className="mt-4 text-emerald-600 dark:text-emerald-400 font-medium hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors"
                >
                  Read more...
                </button>
              )}

              {expandedStory && (
                <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-lg border-l-4 border-amber-400">
                  <div className="flex items-start">
                    <Heart className="w-5 h-5 text-amber-500 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-amber-800 dark:text-amber-300 mb-2">
                        Moral of the Story:
                      </h4>
                      <p className="text-amber-700 dark:text-amber-400 leading-relaxed">
                        {currentStory.moral}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Story Collection */}
      <div className="mt-12">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
          More Inspiring Stories
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {stories.slice(0, 4).map((story) => (
            <button
              key={story.id}
              onClick={() => {
                setCurrentStory(story);
                setExpandedStory(false);
              }}
              className={`p-4 rounded-lg border-2 transition-all text-left hover:scale-[1.02] ${
                currentStory?.id === story.id
                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                  : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-emerald-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-800 dark:text-white">
                  {story.title}
                </h4>
                <div className="flex items-center text-xs text-gray-500">
                  <Clock className="w-3 h-3 mr-1" />
                  {story.readTime}
                </div>
              </div>
              <p className="text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-2">
                {story.category}
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                {story.content.substring(0, 100)}...
              </p>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-600 dark:text-gray-300 italic">
          "And We made from them leaders guiding by Our command when they were patient and were certain of Our signs." - Quran 32:24
        </p>
      </div>
    </div>
  );
}

export default IslamicStories;