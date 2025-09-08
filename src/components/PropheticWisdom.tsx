import React, { useState } from 'react';
import { Heart, Star, ArrowLeft, BookOpen, Lightbulb, Target, TrendingUp } from 'lucide-react';

interface PropheticWisdom {
  id: string;
  name: string;
  arabicName: string;
  title: string;
  introduction: string;
  keyTeachings: string[];
  hadithReferences: string[];
  practicalTips: string[];
  visualGuide: {
    type: 'journey' | 'lessons' | 'teachings' | 'legacy';
    title: string;
    description: string;
    elements: string[];
  };
  color: string;
}

function PropheticWisdom() {
  const [selectedProphet, setSelectedProphet] = useState<PropheticWisdom | null>(null);
  const [activeTab, setActiveTab] = useState('introduction');

  const propheticWisdom: PropheticWisdom[] = [
    {
      id: 'muhammad',
      name: 'Muhammad',
      arabicName: 'محمد صلى الله عليه وسلم',
      title: 'The Perfect Example for Humanity',
      introduction: `Prophet Muhammad (PBUH) is the final messenger of Allah and the perfect example for all humanity. His life demonstrates the highest standards of character, conduct, and spiritual excellence. Every aspect of his life - from his honesty in business to his compassion with family, from his justice as a leader to his humility in worship - provides guidance for Muslims in all situations.

The Prophet (PBUH) said: "I have been sent to perfect good character." His teachings encompass all aspects of human life: spiritual, social, economic, and political. He showed us how to balance our relationship with Allah, our families, our communities, and ourselves.

His wisdom is not just theoretical but practical, demonstrated through his actions and decisions throughout his 23-year prophetic mission. Following his example (Sunnah) is a source of blessing and guidance for believers until the Day of Judgment.`,
      keyTeachings: [
        'Perfect your character and treat all people with kindness and justice',
        'Balance your spiritual and worldly responsibilities',
        'Seek knowledge from the cradle to the grave',
        'Be honest and trustworthy in all your dealings',
        'Show mercy and compassion to all of Allah\'s creation',
        'Stand for justice even if it goes against your own interests',
        'Practice moderation in all aspects of life',
        'Maintain strong family bonds and fulfill your duties to relatives'
      ],
      hadithReferences: [
        'Sahih Bukhari: "The best of people are those who benefit others"',
        'Sahih Muslim: "None of you believes until he loves for his brother what he loves for himself"',
        'Tirmidhi: "The believer is not one who eats his fill while his neighbor goes hungry"',
        'Abu Dawud: "Whoever does not show mercy to people, Allah will not show mercy to him"',
        'Ibn Majah: "Seek knowledge, even if you have to go to China"'
      ],
      practicalTips: [
        'Start each day by remembering Allah and setting positive intentions',
        'Practice gratitude by counting your blessings regularly',
        'Be the first to greet others with "Assalamu Alaikum"',
        'Help those in need, even if it\'s just with a smile',
        'Keep your promises and be reliable in your commitments',
        'Forgive others quickly and don\'t hold grudges',
        'Spend time in reflection and self-improvement daily',
        'Maintain good relationships with family and neighbors'
      ],
      visualGuide: {
        type: 'legacy',
        title: 'The Eternal Legacy of Prophet Muhammad (PBUH)',
        description: 'The lasting impact of the Prophet\'s teachings on humanity',
        elements: [
          'Perfect Character Model',
          'Complete Life Guidance',
          'Social Justice System',
          'Spiritual Excellence',
          'Universal Brotherhood',
          'Knowledge & Wisdom',
          'Mercy to All Creation',
          'Final Divine Message'
        ]
      },
      color: 'from-emerald-500 to-teal-600'
    },
    {
      id: 'ibrahim',
      name: 'Ibrahim (Abraham)',
      arabicName: 'إبراهيم عليه السلام',
      title: 'The Friend of Allah and Father of Prophets',
      introduction: `Prophet Ibrahim (AS) is known as Khalilullah (Friend of Allah) and is revered as the father of prophets. His life is a testament to unwavering faith, complete submission to Allah, and the courage to stand for truth against all odds.

Ibrahim (AS) demonstrated perfect Tawheed (monotheism) by rejecting all forms of idol worship and dedicating his life entirely to Allah. His willingness to sacrifice his beloved son Ismail (AS) when commanded by Allah shows the highest level of submission and trust.

His teachings emphasize the importance of using reason to find Allah, standing firm for truth even when alone, and showing complete obedience to divine commands. The rituals of Hajj commemorate his legacy, and his prayers for his descendants continue to be answered through the prophets who came from his lineage.`,
      keyTeachings: [
        'Use your intellect and reasoning to recognize Allah\'s existence and oneness',
        'Stand for truth even if you have to stand alone',
        'Complete submission to Allah\'s will is the essence of faith',
        'Reject all forms of false worship and idolatry',
        'Trust in Allah\'s wisdom even when His commands seem difficult',
        'Hospitality and generosity are noble characteristics',
        'Make sincere dua for your family and future generations',
        'Build and maintain places of worship for Allah\'s remembrance'
      ],
      hadithReferences: [
        'Sahih Bukhari: "Ibrahim was neither a Jew nor a Christian, but he was a true Muslim"',
        'Sahih Muslim: "Every child is born upon fitrah (natural state of believing in Allah)"',
        'Tirmidhi: "The most beloved of people to Allah are those who are most beneficial to people"',
        'Abu Dawud: "Allah has made the world green and beautiful and appointed you as His stewards"'
      ],
      practicalTips: [
        'Question and reflect on the purpose of life and your relationship with Allah',
        'Stand up for what is right, even when it\'s unpopular',
        'Practice complete trust in Allah during difficult decisions',
        'Be generous and hospitable to guests and strangers',
        'Make regular dua for your family\'s guidance and well-being',
        'Avoid all forms of shirk (associating partners with Allah)',
        'Build your life around worship and remembrance of Allah',
        'Use your resources to establish good works that benefit others'
      ],
      visualGuide: {
        type: 'journey',
        title: 'Ibrahim\'s Spiritual Journey',
        description: 'The path from questioning to complete submission',
        elements: [
          'Questioning Idol Worship',
          'Discovering Allah through Reason',
          'Confronting His People',
          'Miraculous Salvation from Fire',
          'Migration for Allah\'s Sake',
          'Building the Kaaba',
          'The Ultimate Test of Sacrifice',
          'Legacy of Pure Monotheism'
        ]
      },
      color: 'from-amber-500 to-orange-600'
    },
    {
      id: 'musa',
      name: 'Musa (Moses)',
      arabicName: 'موسى عليه السلام',
      title: 'The Speaker with Allah and Liberator',
      introduction: `Prophet Musa (AS) is known as Kalimullah (the one who spoke with Allah) and is one of the most mentioned prophets in the Quran. His life exemplifies courage in the face of oppression, leadership in times of crisis, and unwavering commitment to justice.

Musa (AS) was chosen by Allah to liberate the Children of Israel from Pharaoh's tyranny and guide them to the Promised Land. Despite his initial hesitation due to his speech impediment, he became one of the most powerful speakers and leaders in history.

His teachings emphasize the importance of standing against oppression, trusting in Allah's power over all earthly authorities, and leading people with patience and wisdom. The Torah (Tawrat) was revealed to him, containing divine guidance for his people.`,
      keyTeachings: [
        'Stand courageously against oppression and injustice',
        'Trust in Allah\'s power over all earthly authorities',
        'Leadership requires patience, wisdom, and reliance on Allah',
        'Never underestimate your abilities when Allah chooses you for a task',
        'Seek Allah\'s help when facing seemingly impossible challenges',
        'Justice and freedom are divine rights that must be protected',
        'Miracles are signs from Allah to guide people to truth',
        'Gratitude to Allah should follow every blessing and victory'
      ],
      hadithReferences: [
        'Sahih Bukhari: "Whoever relieves a believer\'s distress, Allah will relieve his distress"',
        'Sahih Muslim: "Help your brother, whether he is an oppressor or oppressed"',
        'Tirmidhi: "The best jihad is a word of truth spoken before a tyrannical ruler"',
        'Abu Dawud: "Whoever among you sees a wrong action, let him change it with his hand"'
      ],
      practicalTips: [
        'Speak up against injustice even when it\'s difficult or dangerous',
        'Develop your communication skills to effectively convey truth',
        'Seek Allah\'s help and guidance before taking on leadership roles',
        'Be patient with people when guiding them to the right path',
        'Remember Allah\'s favors and express gratitude regularly',
        'Don\'t let personal limitations stop you from doing good',
        'Stand with the oppressed and work for their liberation',
        'Use whatever influence you have to promote justice and truth'
      ],
      visualGuide: {
        type: 'lessons',
        title: 'Key Lessons from Musa\'s Leadership',
        description: 'Essential principles for standing against oppression',
        elements: [
          'Courage Against Tyranny',
          'Divine Support for Justice',
          'Effective Communication',
          'Patient Leadership',
          'Miraculous Interventions',
          'Liberation of the Oppressed',
          'Gratitude in Victory',
          'Continuous Guidance'
        ]
      },
      color: 'from-purple-500 to-indigo-600'
    },
    {
      id: 'isa',
      name: 'Isa (Jesus)',
      arabicName: 'عيسى عليه السلام',
      title: 'The Messiah and Spirit of Allah',
      introduction: `Prophet Isa (AS) was born miraculously to Maryam (Mary) and is known as the Messiah (Al-Masih) and Ruh Allah (Spirit of Allah). His life demonstrates the power of Allah's will and the importance of spiritual purification and compassion.

Isa (AS) performed many miracles by Allah's permission, including healing the sick, giving sight to the blind, and bringing the dead back to life. However, he always emphasized that these were signs from Allah, not proof of his own divinity.

His teachings focus on love, compassion, forgiveness, and devotion to Allah. He called people to worship Allah alone and follow the path of righteousness. His message emphasized spiritual purification and caring for the poor and needy.`,
      keyTeachings: [
        'Worship Allah alone without associating any partners with Him',
        'Show compassion and mercy to all of Allah\'s creation',
        'Forgive others as you would want Allah to forgive you',
        'Care for the poor, sick, and needy in society',
        'Focus on spiritual purification and inner cleanliness',
        'Be humble despite any special abilities or blessings Allah gives you',
        'Miracles are signs from Allah, not reasons for pride or arrogance',
        'Prepare for the afterlife while fulfilling your duties in this world'
      ],
      hadithReferences: [
        'Sahih Bukhari: "Be merciful to others and you will receive mercy"',
        'Sahih Muslim: "Whoever is not merciful to people, Allah will not be merciful to him"',
        'Tirmidhi: "The most beloved of people to Allah are those most beneficial to people"',
        'Abu Dawud: "Whoever relieves a Muslim of distress, Allah will relieve him of distress"'
      ],
      practicalTips: [
        'Practice forgiveness even when others wrong you',
        'Regularly visit and help the sick and elderly',
        'Give charity to those in need without expecting recognition',
        'Focus on purifying your heart from negative emotions',
        'Be humble about your achievements and abilities',
        'Use any talents or skills you have to help others',
        'Spend time in prayer and spiritual reflection',
        'Treat everyone with kindness regardless of their status'
      ],
      visualGuide: {
        type: 'teachings',
        title: 'Core Teachings of Prophet Isa (AS)',
        description: 'Principles of compassion and spiritual excellence',
        elements: [
          'Pure Monotheism',
          'Universal Compassion',
          'Healing & Mercy',
          'Forgiveness',
          'Spiritual Purification',
          'Humility in Blessings',
          'Service to Humanity',
          'Preparation for Afterlife'
        ]
      },
      color: 'from-rose-500 to-pink-600'
    },
    {
      id: 'yusuf',
      name: 'Yusuf (Joseph)',
      arabicName: 'يوسف عليه السلام',
      title: 'The Truthful and Beautiful',
      introduction: `Prophet Yusuf (AS) is known for his exceptional beauty, both physical and spiritual, and his remarkable journey from slavery to leadership. His story, called "the most beautiful of stories" in the Quran, demonstrates patience in trials, forgiveness of those who wrong us, and trust in Allah's perfect timing.

Despite facing betrayal by his brothers, false accusations, and imprisonment, Yusuf (AS) never lost faith in Allah. His ability to interpret dreams and his wisdom in managing Egypt's resources during famine made him a beloved leader.

His teachings emphasize the importance of maintaining moral integrity in all circumstances, forgiving those who harm us, and recognizing that Allah can turn any difficulty into a blessing.`,
      keyTeachings: [
        'Maintain your moral integrity even in the most tempting situations',
        'Forgive those who wrong you and treat them with kindness',
        'Trust that Allah has a perfect plan even when you can\'t see it',
        'Use your talents and abilities to serve others and society',
        'Patience during trials leads to eventual success and honor',
        'Dreams and visions can be sources of divine guidance',
        'Leadership is a responsibility to serve and protect people',
        'Family bonds should be maintained despite past conflicts'
      ],
      hadithReferences: [
        'Sahih Bukhari: "Whoever conceals the faults of others, Allah will conceal his faults"',
        'Sahih Muslim: "The believer is not one who eats his fill while his neighbor is hungry"',
        'Tirmidhi: "The best of people are those who are most beneficial to others"',
        'Abu Dawud: "Whoever forgives and makes reconciliation, his reward is with Allah"'
      ],
      practicalTips: [
        'Stay away from situations that could lead to sin or temptation',
        'Practice forgiveness even when you have the power to take revenge',
        'Use your skills and knowledge to help your community',
        'Be patient during difficult times and trust Allah\'s wisdom',
        'Pay attention to your dreams and seek their proper interpretation',
        'Take leadership responsibilities seriously and serve with justice',
        'Maintain family relationships even after conflicts or disagreements',
        'Plan ahead and prepare for both good times and difficulties'
      ],
      visualGuide: {
        type: 'journey',
        title: 'Yusuf\'s Journey from Trial to Triumph',
        description: 'How patience and integrity lead to success',
        elements: [
          'Childhood Dreams',
          'Betrayal by Brothers',
          'Slavery in Egypt',
          'Temptation & Integrity',
          'False Imprisonment',
          'Dream Interpretation',
          'Rise to Leadership',
          'Family Reconciliation'
        ]
      },
      color: 'from-blue-500 to-cyan-600'
    },
    {
      id: 'sulaiman',
      name: 'Sulaiman (Solomon)',
      arabicName: 'سليمان عليه السلام',
      title: 'The Wise King',
      introduction: `Prophet Sulaiman (AS) was blessed with extraordinary wisdom, wealth, and power. He could communicate with animals and jinn, and his kingdom was the most magnificent in history. Despite these incredible blessings, he remained humble and grateful to Allah.

Sulaiman (AS) is famous for his wise judgments, his magnificent temple, and his just rule over a vast kingdom. He used his power and resources to serve Allah and benefit his people, never letting worldly success corrupt his faith.

His teachings emphasize the importance of wisdom in leadership, gratitude for Allah's blessings, and using power and wealth responsibly. He showed that true success comes from combining worldly achievements with spiritual excellence.`,
      keyTeachings: [
        'True wisdom comes from Allah and should be sought through prayer',
        'Use your blessings and abilities to serve Allah and help others',
        'Power and wealth are tests that require constant gratitude and humility',
        'Justice and fairness should guide all your decisions and judgments',
        'Seek knowledge and understanding in all aspects of life',
        'Build and maintain what benefits society and future generations',
        'Recognize Allah\'s hand in all your successes and achievements',
        'Balance worldly responsibilities with spiritual obligations'
      ],
      hadithReferences: [
        'Sahih Bukhari: "Whoever Allah wants good for, He gives him understanding of religion"',
        'Sahih Muslim: "The world is green and beautiful, and Allah has appointed you as His stewards"',
        'Tirmidhi: "The best of people are those who are most beneficial to others"',
        'Abu Dawud: "Allah loves, when one of you does a job, that he does it with excellence"'
      ],
      practicalTips: [
        'Pray for wisdom and understanding in your decisions',
        'Use your talents and resources to benefit your community',
        'Practice gratitude daily for all the blessings in your life',
        'Make fair and just decisions in your personal and professional life',
        'Continuously seek knowledge and self-improvement',
        'Invest in projects that will benefit future generations',
        'Remember Allah in times of success and prosperity',
        'Balance your worldly pursuits with spiritual growth'
      ],
      visualGuide: {
        type: 'legacy',
        title: 'The Wise Legacy of Prophet Sulaiman (AS)',
        description: 'How to use blessings responsibly and wisely',
        elements: [
          'Divine Wisdom',
          'Just Leadership',
          'Magnificent Buildings',
          'Communication with Creation',
          'Grateful Heart',
          'Balanced Life',
          'Service to People',
          'Spiritual Excellence'
        ]
      },
      color: 'from-yellow-500 to-amber-600'
    }
  ];

  const handleProphetClick = (prophet: PropheticWisdom) => {
    setSelectedProphet(prophet);
    setActiveTab('introduction');
  };

  const closeProphetDetails = () => {
    setSelectedProphet(null);
  };

  const renderVisualGuide = (guide: PropheticWisdom['visualGuide']) => {
    const getIcon = (type: string) => {
      switch (type) {
        case 'journey': return TrendingUp;
        case 'lessons': return Lightbulb;
        case 'teachings': return BookOpen;
        case 'legacy': return Star;
        default: return BookOpen;
      }
    };

    const Icon = getIcon(guide.type);

    return (
      <div>
        <div className="flex items-center mb-6">
          <Icon className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mr-3" />
          <div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
              {guide.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {guide.description}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {guide.elements.map((element, index) => (
            <div key={index} className="flex items-center p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
              <div className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 flex-shrink-0">
                {index + 1}
              </div>
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                {element}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (selectedProphet) {
    return (
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className={`bg-gradient-to-r ${selectedProphet.color} text-white p-6 rounded-t-2xl`}>
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={closeProphetDetails}
              className="flex items-center px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Prophets
            </button>
          </div>

          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2">
              Prophet {selectedProphet.name}
            </h1>
            <div className="text-3xl font-arabic mb-3" dir="rtl">
              {selectedProphet.arabicName}
            </div>
            <p className="text-xl opacity-90">
              {selectedProphet.title}
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white dark:bg-gray-800 border-x border-gray-200 dark:border-gray-600">
          <div className="flex overflow-x-auto">
            {[
              { id: 'introduction', label: 'Introduction', icon: BookOpen },
              { id: 'teachings', label: 'Key Teachings', icon: Star },
              { id: 'references', label: 'Hadith References', icon: BookOpen },
              { id: 'tips', label: 'Practical Tips', icon: Target },
              { id: 'visual', label: 'Visual Guide', icon: Lightbulb }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400'
                }`}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-gray-800 border-x border-b border-gray-200 dark:border-gray-600 rounded-b-2xl">
          <div className="p-8">
            {activeTab === 'introduction' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                  Introduction to Prophet {selectedProphet.name}
                </h3>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                    {selectedProphet.introduction}
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'teachings' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                  Key Teachings from Prophet {selectedProphet.name}
                </h3>
                <div className="space-y-4">
                  {selectedProphet.keyTeachings.map((teaching, index) => (
                    <div key={index} className="flex items-start p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                      <div className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-0.5 flex-shrink-0">
                        {index + 1}
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {teaching}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'references' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                  Hadith References
                </h3>
                <div className="space-y-4">
                  {selectedProphet.hadithReferences.map((reference, index) => (
                    <div key={index} className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border-l-4 border-amber-400">
                      <p className="text-gray-700 dark:text-gray-300">
                        {reference}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'tips' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                  Practical Tips
                </h3>
                <div className="space-y-4">
                  {selectedProphet.practicalTips.map((tip, index) => (
                    <div key={index} className="flex items-start p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-0.5 flex-shrink-0">
                        {index + 1}
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {tip}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'visual' && renderVisualGuide(selectedProphet.visualGuide)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
          Prophetic Wisdom
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-lg max-w-3xl mx-auto">
          Learn from the teachings and wisdom of Allah's messengers. Discover practical guidance for modern life based on prophetic examples.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {propheticWisdom.map((prophet) => (
          <button
            key={prophet.id}
            onClick={() => handleProphetClick(prophet)}
            className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-600 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 overflow-hidden"
          >
            <div className={`h-32 bg-gradient-to-r ${prophet.color} flex items-center justify-center`}>
              <div className="text-center text-white">
                <h3 className="text-xl font-bold mb-1">
                  Prophet {prophet.name}
                </h3>
                <div className="text-lg font-arabic" dir="rtl">
                  {prophet.arabicName}
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                {prophet.title}
              </h4>
              
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-2" />
                  <span>{prophet.keyTeachings.length} Key Teachings</span>
                </div>
                <div className="flex items-center">
                  <Target className="w-4 h-4 mr-2" />
                  <span>{prophet.practicalTips.length} Practical Tips</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                  <Heart className="w-4 h-4 mr-1" />
                  <span className="text-sm font-medium">Learn Wisdom</span>
                </div>
                <div className="text-xs text-gray-500 capitalize">
                  {prophet.visualGuide.type} Guide
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-12 text-center">
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-gray-800 dark:to-gray-700 p-8 rounded-xl">
          <h3 className="text-2xl font-semibold text-emerald-800 dark:text-emerald-300 mb-4">
            Timeless Wisdom for Modern Life
          </h3>
          <p className="text-emerald-700 dark:text-emerald-400 max-w-3xl mx-auto leading-relaxed">
            The teachings of the prophets provide practical guidance for every aspect of life. 
            Their wisdom transcends time and culture, offering solutions to modern challenges through divine guidance.
          </p>
          <blockquote className="mt-6 text-lg italic text-emerald-600 dark:text-emerald-400">
            "Indeed, in the Messenger of Allah you have a good example to follow." - Quran 33:21
          </blockquote>
        </div>
      </div>
    </div>
  );
}

export default PropheticWisdom;