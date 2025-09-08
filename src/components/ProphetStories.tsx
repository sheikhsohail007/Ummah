import React, { useState } from 'react';
import { BookOpen, Play, Star, ArrowLeft, Clock, User, Globe } from 'lucide-react';

interface ProphetStory {
  id: string;
  name: string;
  arabicName: string;
  title: string;
  period: string;
  location: string;
  story: string;
  keyLessons: string[];
  quranicReferences: string[];
  importantEvents: string[];
  videoId: string;
  videoTitle: string;
  color: string;
}

function ProphetStories() {
  const [selectedProphet, setSelectedProphet] = useState<ProphetStory | null>(null);
  const [activeTab, setActiveTab] = useState('story');

  const prophetStories: ProphetStory[] = [
    {
      id: 'adam',
      name: 'Adam',
      arabicName: 'آدم عليه السلام',
      title: 'The First Human and Prophet',
      period: 'Beginning of Humanity',
      location: 'Paradise, then Earth',
      story: `Prophet Adam (AS) was the first human being created by Allah from clay. He was given knowledge of all things and was honored by Allah when He commanded the angels to prostrate to him. Adam (AS) lived in Paradise with his wife Hawwa (Eve), but after eating from the forbidden tree due to Satan's deception, they were sent to Earth. This marked the beginning of human life on Earth and the start of the test of this worldly life.

Adam (AS) was not only the first human but also the first Prophet. After realizing his mistake, he repented sincerely to Allah, and Allah accepted his repentance. This teaches us that no matter how grave our sins, sincere repentance (Tawbah) can lead to Allah's forgiveness.

Adam (AS) and Hawwa were then tasked with populating the Earth and worshipping Allah. They were given guidance on how to live righteously and were warned about Satan's enmity. Adam (AS) lived for 930 years according to Islamic tradition, during which he taught his children about Allah and the right way of living.`,
      keyLessons: [
        'The importance of sincere repentance (Tawbah) when we make mistakes',
        'Satan is our clear enemy and will try to mislead us',
        'Knowledge is a great blessing from Allah that distinguishes humans',
        'Every human being has the potential for both good and evil',
        'Allah is Most Forgiving and accepts sincere repentance'
      ],
      quranicReferences: [
        'Quran 2:30-39 - The creation of Adam and the incident in Paradise',
        'Quran 7:19-25 - The story of Adam and Hawwa in Paradise',
        'Quran 20:115-123 - Adam\'s covenant with Allah and his mistake',
        'Quran 2:37 - Adam\'s repentance and Allah\'s acceptance'
      ],
      importantEvents: [
        'Creation from clay and receiving the soul from Allah',
        'Angels prostrating to Adam except Iblis (Satan)',
        'Living in Paradise with Hawwa',
        'The test of the forbidden tree',
        'Sincere repentance and Allah\'s forgiveness',
        'Descent to Earth and beginning of human civilization'
      ],
      videoId: 'dQw4w9WgXcQ',
      videoTitle: 'The Story of Prophet Adam (AS) - First Human and Prophet',
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 'nuh',
      name: 'Nuh (Noah)',
      arabicName: 'نوح عليه السلام',
      title: 'The Patient Caller to Allah',
      period: '950 years of preaching',
      location: 'Ancient Mesopotamia',
      story: `Prophet Nuh (AS) was sent to a people who had fallen into idol worship and corruption. For 950 years, he patiently called his people to worship Allah alone and abandon their false gods. Despite facing mockery, rejection, and persecution, Nuh (AS) never gave up on his mission.

He used various approaches - calling them privately and publicly, during day and night, with gentleness and firmness. He reminded them of Allah's blessings, warned them of punishment, and promised them forgiveness if they repented. However, only a few believed in his message.

When Allah informed Nuh (AS) that no more people would believe, He commanded him to build an ark. The people mocked him for building a ship on dry land, but Nuh (AS) continued with faith in Allah's command. When the great flood came, it destroyed all the disbelievers, while Nuh (AS) and the believers were saved in the ark along with pairs of every animal species.`,
      keyLessons: [
        'Patience and persistence in calling people to the truth',
        'Never give up on doing good, even when facing rejection',
        'Allah\'s help comes to those who remain steadfast',
        'The importance of following Allah\'s commands even when they seem strange',
        'Divine justice will eventually prevail'
      ],
      quranicReferences: [
        'Quran 71:1-28 - Nuh\'s call to his people',
        'Quran 11:25-49 - The story of the flood',
        'Quran 23:23-30 - Nuh\'s preaching and the ark',
        'Quran 54:9-17 - The flood as a sign for mankind'
      ],
      importantEvents: [
        '950 years of patient preaching to his people',
        'Various methods of calling people to Allah',
        'Building the ark by Allah\'s command',
        'The great flood that destroyed the disbelievers',
        'Salvation of believers and animal species',
        'New beginning for humanity after the flood'
      ],
      videoId: 'dQw4w9WgXcQ',
      videoTitle: 'Prophet Nuh (AS) - The Great Flood and Divine Justice',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      id: 'ibrahim',
      name: 'Ibrahim (Abraham)',
      arabicName: 'إبراهيم عليه السلام',
      title: 'The Friend of Allah (Khalilullah)',
      period: 'Around 2000 BCE',
      location: 'Mesopotamia, Palestine, Mecca',
      story: `Prophet Ibrahim (AS) is known as Khalilullah (Friend of Allah) and is the father of prophets. Born in a society that worshipped idols, Ibrahim (AS) questioned these practices from a young age. Through reflection and divine guidance, he realized that Allah alone deserved worship.

When he destroyed the idols in his father's shop, the people became furious and decided to burn him alive. However, Allah commanded the fire to be cool and safe for Ibrahim (AS), demonstrating His power and protection of His faithful servant.

Ibrahim (AS) was tested in many ways - leaving his homeland, the command to sacrifice his son Ismail (AS), and establishing the foundations of the Kaaba in Mecca. In every test, he showed complete submission to Allah's will. His legacy continues through his sons Ismail and Ishaq (Isaac), from whom came many prophets including Muhammad (PBUH) and Isa (Jesus).`,
      keyLessons: [
        'Use reason and reflection to find the truth about Allah',
        'Stand firm for truth even when facing opposition',
        'Complete trust and submission to Allah\'s commands',
        'The importance of sincere worship and rejecting false gods',
        'Allah protects those who are sincere to Him'
      ],
      quranicReferences: [
        'Quran 21:51-70 - Ibrahim\'s opposition to idol worship',
        'Quran 37:99-113 - The sacrifice of Ismail',
        'Quran 2:124-129 - Ibrahim and the building of Kaaba',
        'Quran 6:74-83 - Ibrahim\'s search for the true God'
      ],
      importantEvents: [
        'Questioning and rejecting idol worship in his youth',
        'Destroying the idols and facing persecution',
        'Miraculous salvation from the fire',
        'Migration to different lands by Allah\'s command',
        'The test of sacrificing his son Ismail',
        'Building the Kaaba with Ismail in Mecca'
      ],
      videoId: 'dQw4w9WgXcQ',
      videoTitle: 'Prophet Ibrahim (AS) - The Friend of Allah and Father of Prophets',
      color: 'from-amber-500 to-orange-600'
    },
    {
      id: 'musa',
      name: 'Musa (Moses)',
      arabicName: 'موسى عليه السلام',
      title: 'The Speaker with Allah (Kalimullah)',
      period: 'Around 1300 BCE',
      location: 'Egypt, Sinai Peninsula',
      story: `Prophet Musa (AS) was born during a time when Pharaoh was oppressing the Children of Israel. By Allah's plan, he was raised in Pharaoh's own palace. After accidentally killing an Egyptian who was oppressing an Israelite, Musa (AS) fled to Madyan where he married and lived as a shepherd.

Allah called Musa (AS) to prophethood at Mount Sinai, giving him miraculous signs including the staff that turned into a serpent and the hand that glowed white. He was commanded to go to Pharaoh and demand the release of the Children of Israel.

Despite witnessing clear miracles, Pharaoh refused to believe and continued his oppression. Allah sent various plagues upon Egypt, but Pharaoh's heart remained hardened. Finally, Musa (AS) led the Israelites out of Egypt. When Pharaoh pursued them, Allah parted the Red Sea for the believers and drowned Pharaoh and his army.`,
      keyLessons: [
        'Allah can use anyone for His purpose, regardless of their background',
        'Courage is needed to stand against oppression and injustice',
        'Miracles are signs from Allah to guide people to truth',
        'Arrogance and pride can blind people to the truth',
        'Allah always provides a way out for the oppressed'
      ],
      quranicReferences: [
        'Quran 28:1-43 - Musa\'s early life and call to prophethood',
        'Quran 7:103-162 - Confrontation with Pharaoh and the miracles',
        'Quran 20:9-98 - The story of Musa and the burning bush',
        'Quran 26:10-68 - Musa\'s mission to Pharaoh'
      ],
      importantEvents: [
        'Birth during Pharaoh\'s oppression of Israelites',
        'Being raised in Pharaoh\'s palace',
        'The incident that led to his flight to Madyan',
        'The call to prophethood at Mount Sinai',
        'Confronting Pharaoh with miraculous signs',
        'Leading the Exodus and the parting of the Red Sea'
      ],
      videoId: 'dQw4w9WgXcQ',
      videoTitle: 'Prophet Musa (AS) - The Exodus and Liberation from Oppression',
      color: 'from-purple-500 to-indigo-600'
    },
    {
      id: 'isa',
      name: 'Isa (Jesus)',
      arabicName: 'عيسى عليه السلام',
      title: 'The Messiah and Word of Allah',
      period: 'Around 0-33 CE',
      location: 'Palestine',
      story: `Prophet Isa (AS) was born miraculously to Maryam (Mary) without a father, by Allah's command. From his cradle, he spoke defending his mother's honor and declaring his prophethood. He was given the Gospel (Injeel) and performed many miracles by Allah's permission - healing the blind and lepers, bringing the dead back to life, and creating birds from clay.

Isa (AS) called the Children of Israel to worship Allah alone and follow the true teachings. However, many rejected his message, and some even plotted to kill him. When they attempted to crucify him, Allah saved Isa (AS) by raising him to the heavens, and made it appear to them that they had succeeded.

According to Islamic belief, Isa (AS) will return before the Day of Judgment to establish justice on Earth, defeat the false messiah (Dajjal), and unite humanity under the worship of Allah alone.`,
      keyLessons: [
        'Allah\'s power is absolute - He can create without normal means',
        'Miracles are signs from Allah, not proof of divinity',
        'True followers should worship Allah alone, not His messengers',
        'Patience is needed when facing rejection and persecution',
        'Allah protects His sincere servants from harm'
      ],
      quranicReferences: [
        'Quran 3:45-51 - The birth and mission of Isa',
        'Quran 5:110-120 - Isa\'s miracles and his people\'s response',
        'Quran 4:157-158 - The truth about the crucifixion',
        'Quran 19:16-34 - The story of Maryam and Isa\'s birth'
      ],
      importantEvents: [
        'Miraculous birth to Maryam without a father',
        'Speaking from the cradle to defend his mother',
        'Receiving the Gospel and beginning his mission',
        'Performing miracles by Allah\'s permission',
        'Facing rejection and persecution from his people',
        'Being raised to heaven by Allah before crucifixion'
      ],
      videoId: 'dQw4w9WgXcQ',
      videoTitle: 'Prophet Isa (AS) - The Messiah and His Miraculous Life',
      color: 'from-rose-500 to-pink-600'
    },
    {
      id: 'muhammad',
      name: 'Muhammad',
      arabicName: 'محمد صلى الله عليه وسلم',
      title: 'The Final Messenger (Khatam an-Nabiyyin)',
      period: '570-632 CE',
      location: 'Arabian Peninsula',
      story: `Prophet Muhammad (PBUH) was born in Mecca in 570 CE. Known for his honesty and trustworthiness even before his prophethood, he was called "Al-Amin" (The Trustworthy). At age 40, while meditating in the cave of Hira, he received the first revelation from Allah through Angel Jibril (Gabriel).

His mission was to call humanity back to the worship of Allah alone and to perfect moral character. Despite facing severe persecution in Mecca, he and his followers remained steadfast. The migration (Hijra) to Medina marked a turning point, where the first Islamic state was established.

In just 23 years, the message of Islam spread throughout the Arabian Peninsula. The Prophet (PBUH) not only delivered Allah's final message but also demonstrated it through his perfect character and conduct. He is the final messenger, and his message is for all of humanity until the Day of Judgment.`,
      keyLessons: [
        'Perfect character and conduct are essential for a believer',
        'Patience and perseverance in the face of opposition',
        'The importance of community building and social justice',
        'Islam is a complete way of life, not just personal worship',
        'The message of Islam is universal and for all humanity'
      ],
      quranicReferences: [
        'Quran 96:1-5 - The first revelation',
        'Quran 33:40 - Muhammad as the final messenger',
        'Quran 68:4 - His excellent character',
        'Quran 21:107 - A mercy to all worlds'
      ],
      importantEvents: [
        'Birth in Mecca and early life as Al-Amin',
        'First revelation in the cave of Hira',
        'Beginning of the prophetic mission',
        'Persecution in Mecca and steadfastness of early Muslims',
        'The Hijra (migration) to Medina',
        'Establishment of the Islamic state and spread of Islam'
      ],
      videoId: 'dQw4w9WgXcQ',
      videoTitle: 'Prophet Muhammad (PBUH) - The Final Messenger and Perfect Example',
      color: 'from-emerald-500 to-teal-600'
    }
  ];

  const handleProphetClick = (prophet: ProphetStory) => {
    setSelectedProphet(prophet);
    setActiveTab('story');
  };

  const closeProphetDetails = () => {
    setSelectedProphet(null);
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
            <div className="text-right">
              <div className="text-sm opacity-90">{selectedProphet.period}</div>
              <div className="text-sm opacity-90 flex items-center">
                <Globe className="w-4 h-4 mr-1" />
                {selectedProphet.location}
              </div>
            </div>
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
              { id: 'story', label: 'Prophet\'s Story', icon: BookOpen },
              { id: 'lessons', label: 'Key Lessons', icon: Star },
              { id: 'references', label: 'Quranic References', icon: BookOpen },
              { id: 'events', label: 'Important Events', icon: Clock },
              { id: 'video', label: 'Watch & Learn', icon: Play }
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
            {activeTab === 'story' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                  The Story of Prophet {selectedProphet.name}
                </h3>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                    {selectedProphet.story}
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'lessons' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                  Key Lessons from Prophet {selectedProphet.name}
                </h3>
                <div className="space-y-4">
                  {selectedProphet.keyLessons.map((lesson, index) => (
                    <div key={index} className="flex items-start p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                      <div className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-0.5 flex-shrink-0">
                        {index + 1}
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {lesson}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'references' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                  Quranic References
                </h3>
                <div className="space-y-4">
                  {selectedProphet.quranicReferences.map((reference, index) => (
                    <div key={index} className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border-l-4 border-amber-400">
                      <p className="text-gray-700 dark:text-gray-300">
                        {reference}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'events' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                  Important Events
                </h3>
                <div className="space-y-4">
                  {selectedProphet.importantEvents.map((event, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-4 h-4 bg-blue-500 rounded-full mr-4 mt-2 flex-shrink-0"></div>
                      <div className="flex-1">
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          {event}
                        </p>
                        {index < selectedProphet.importantEvents.length - 1 && (
                          <div className="w-px h-6 bg-blue-200 dark:bg-blue-800 ml-2 mt-2"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'video' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                  Watch & Learn
                </h3>
                <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg mb-4 flex items-center justify-center">
                  <div className="text-center">
                    <Play className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">Video Player</p>
                    <p className="text-gray-400 text-sm mt-2">
                      {selectedProphet.videoTitle}
                    </p>
                  </div>
                </div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {selectedProphet.videoTitle}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  Learn more about Prophet {selectedProphet.name} through this comprehensive video guide.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
          Stories of the Prophets
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-lg max-w-3xl mx-auto">
          Discover the inspiring stories of Allah's messengers, their struggles, victories, and the timeless lessons they teach us
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {prophetStories.map((prophet) => (
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
              <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                {prophet.title}
              </h4>
              
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{prophet.period}</span>
                </div>
                <div className="flex items-center">
                  <Globe className="w-4 h-4 mr-2" />
                  <span>{prophet.location}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                  <BookOpen className="w-4 h-4 mr-1" />
                  <span className="text-sm font-medium">Read Story</span>
                </div>
                <div className="text-xs text-gray-500">
                  {prophet.keyLessons.length} lessons
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-12 text-center">
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-gray-800 dark:to-gray-700 p-8 rounded-xl">
          <h3 className="text-2xl font-semibold text-emerald-800 dark:text-emerald-300 mb-4">
            Learn from the Best Examples
          </h3>
          <p className="text-emerald-700 dark:text-emerald-400 max-w-3xl mx-auto leading-relaxed">
            The stories of the prophets are not just historical accounts, but timeless lessons for humanity. 
            Each prophet faced unique challenges and demonstrated unwavering faith, patience, and dedication to Allah's message.
          </p>
          <blockquote className="mt-6 text-lg italic text-emerald-600 dark:text-emerald-400">
            "Indeed, in their stories there is a lesson for those of understanding." - Quran 12:111
          </blockquote>
        </div>
      </div>
    </div>
  );
}

export default ProphetStories;