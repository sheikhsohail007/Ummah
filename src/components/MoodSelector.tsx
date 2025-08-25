import React, { useState } from 'react';
import { Play, BookOpen, Heart, Star, ExternalLink, X } from 'lucide-react';
import { Mood } from '../App';

interface MoodSelectorProps {
  selectedMood: Mood | null;
  onMoodSelect: (mood: Mood) => void;
}

interface DetailedMood extends Mood {
  description: string;
  verse: string;
  verseReference: string;
  hadith: string;
  hadithReference: string;
  dua: string;
  duaTranslation: string;
  advice: string[];
  youtubeVideoId: string;
  videoTitle: string;
}

const detailedMoods: DetailedMood[] = [
  {
    id: 'angry',
    label: 'Angry',
    emoji: '😠',
    color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
    description: 'When anger overwhelms you, remember that controlling it is a sign of strength and wisdom in Islam.',
    verse: 'But whoever forgives and makes reconciliation, his reward is with Allah.',
    verseReference: 'Quran 42:40',
    hadith: 'The Prophet (PBUH) said: "The strong person is not the one who can wrestle someone else down. The strong person is the one who can control himself when he is angry."',
    hadithReference: 'Sahih Bukhari',
    dua: 'أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ',
    duaTranslation: 'I seek refuge in Allah from Satan, the accursed.',
    advice: [
      'Perform wudu (ablution) to cool down your anger',
      'Sit down if you are standing, lie down if you are sitting',
      'Remember Allah and seek His protection from Satan',
      'Think about the consequences of acting in anger',
      'Practice forgiveness as it brings you closer to righteousness'
    ],
    youtubeVideoId: 'dQw4w9WgXcQ',
    videoTitle: 'How to Control Anger in Islam'
  },
  {
    id: 'anxious',
    label: 'Anxious',
    emoji: '😰',
    color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
    description: 'Anxiety is a test from Allah. Trust in His plan and find peace through remembrance and prayer.',
    verse: 'And whoever relies upon Allah - then He is sufficient for him. Indeed, Allah will accomplish His purpose.',
    verseReference: 'Quran 65:3',
    hadith: 'The Prophet (PBUH) said: "If you put your trust completely in Allah, He will arrange for your sustenance in the same way as He provides for the birds."',
    hadithReference: 'Tirmidhi',
    dua: 'حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ',
    duaTranslation: 'Allah is sufficient for us, and He is the best Disposer of affairs.',
    advice: [
      'Increase your dhikr and remembrance of Allah',
      'Perform regular prayers and seek comfort in them',
      'Practice deep breathing while reciting Quranic verses',
      'Trust in Allah\'s wisdom and timing',
      'Seek support from righteous friends and family'
    ],
    youtubeVideoId: 'dQw4w9WgXcQ',
    videoTitle: 'Overcoming Anxiety Through Islamic Teachings'
  },
  {
    id: 'bored',
    label: 'Bored',
    emoji: '😑',
    color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
    description: 'Use moments of boredom as opportunities for spiritual growth and beneficial activities.',
    verse: 'And it is He who created the heavens and earth in truth. And the day He says, "Be," and it is, His word is the truth.',
    verseReference: 'Quran 6:73',
    hadith: 'The Prophet (PBUH) said: "Take advantage of five before five: your youth before your old age, your health before your sickness, your wealth before your poverty, your free time before your busyness, and your life before your death."',
    hadithReference: 'Al-Hakim',
    dua: 'رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي',
    duaTranslation: 'My Lord, expand for me my breast and ease for me my task.',
    advice: [
      'Read and reflect on the Quran',
      'Learn something new about Islam',
      'Help someone in need or do charity',
      'Practice gratitude by counting your blessings',
      'Engage in beneficial hobbies or skills'
    ],
    youtubeVideoId: 'dQw4w9WgXcQ',
    videoTitle: 'Making the Most of Your Free Time in Islam'
  },
  {
    id: 'confident',
    label: 'Confident',
    emoji: '😎',
    color: 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300',
    description: 'True confidence comes from Allah. Use your confidence to do good and help others.',
    verse: 'And whoever relies upon Allah - then He is sufficient for him.',
    verseReference: 'Quran 65:3',
    hadith: 'The Prophet (PBUH) said: "The believer is not one who eats his fill while his neighbor goes hungry."',
    hadithReference: 'Al-Adab Al-Mufrad',
    dua: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
    duaTranslation: 'Our Lord, give us good in this world and good in the next world, and save us from the punishment of the Fire.',
    advice: [
      'Use your confidence to help and inspire others',
      'Remember that all abilities come from Allah',
      'Stay humble and avoid arrogance',
      'Channel your confidence into righteous deeds',
      'Be a positive role model for others'
    ],
    youtubeVideoId: 'dQw4w9WgXcQ',
    videoTitle: 'Building True Confidence Through Faith'
  },
  {
    id: 'confused',
    label: 'Confused',
    emoji: '😕',
    color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    description: 'When confused, turn to Allah for guidance. He is the source of all wisdom and clarity.',
    verse: 'And whoever fears Allah - He will make for him a way out.',
    verseReference: 'Quran 65:2',
    hadith: 'The Prophet (PBUH) said: "If any one of you is concerned about a decision he has to make, then let him pray two rakahs of non-obligatory prayer, then say: O Allah, I seek Your guidance..."',
    hadithReference: 'Sahih Bukhari',
    dua: 'اللَّهُمَّ إِنِّي أَسْتَخِيرُكَ بِعِلْمِكَ وَأَسْتَقْدِرُكَ بِقُدْرَتِكَ',
    duaTranslation: 'O Allah, I seek Your guidance through Your knowledge, and I seek Your help through Your power.',
    advice: [
      'Perform Salat al-Istikharah for guidance',
      'Consult with knowledgeable and trustworthy people',
      'Read Quran and reflect on its guidance',
      'Make sincere dua for clarity',
      'Trust in Allah\'s wisdom and timing'
    ],
    youtubeVideoId: 'dQw4w9WgXcQ',
    videoTitle: 'Finding Guidance When You\'re Confused'
  },
  {
    id: 'content',
    label: 'Content',
    emoji: '😌',
    color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    description: 'Contentment is a blessing from Allah. Use this peace to worship Him and help others.',
    verse: 'Those who have believed and whose hearts are assured by the remembrance of Allah. Unquestionably, by the remembrance of Allah hearts are assured.',
    verseReference: 'Quran 13:28',
    hadith: 'The Prophet (PBUH) said: "Richness is not having many possessions, but richness is being content with oneself."',
    hadithReference: 'Sahih Bukhari',
    dua: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
    duaTranslation: 'All praise is due to Allah, Lord of the worlds.',
    advice: [
      'Express gratitude for Allah\'s blessings',
      'Share your contentment by helping others',
      'Use this peaceful time for extra worship',
      'Reflect on Allah\'s mercy and kindness',
      'Maintain regular dhikr and remembrance'
    ],
    youtubeVideoId: 'dQw4w9WgXcQ',
    videoTitle: 'The Islamic Path to True Contentment'
  },
  {
    id: 'depressed',
    label: 'Depressed',
    emoji: '😞',
    color: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300',
    description: 'Depression is a test. Remember that Allah is always with you and this difficulty will pass.',
    verse: 'So verily, with the hardship, there is relief. Verily, with the hardship, there is relief.',
    verseReference: 'Quran 94:5-6',
    hadith: 'The Prophet (PBUH) said: "No fatigue, nor disease, nor sorrow, nor sadness, nor hurt, nor distress befalls a Muslim, not even if it were the prick he receives from a thorn, but that Allah expiates some of his sins for that."',
    hadithReference: 'Sahih Bukhari',
    dua: 'لَا إِلَهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ',
    duaTranslation: 'There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers.',
    advice: [
      'Seek professional help alongside spiritual support',
      'Maintain regular prayers even if difficult',
      'Connect with supportive Muslim community',
      'Remember that this is temporary and will pass',
      'Engage in dhikr and Quranic recitation'
    ],
    youtubeVideoId: 'dQw4w9WgXcQ',
    videoTitle: 'Finding Hope in Islam During Dark Times'
  },
  {
    id: 'doubtful',
    label: 'Doubtful',
    emoji: '🤔',
    color: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300',
    description: 'Doubt is natural. Seek knowledge and strengthen your faith through learning and reflection.',
    verse: 'And those who strive for Us - We will surely guide them to Our ways.',
    verseReference: 'Quran 29:69',
    hadith: 'The Prophet (PBUH) said: "Seek knowledge from the cradle to the grave."',
    hadithReference: 'Al-Bayhaqi',
    dua: 'رَبِّ زِدْنِي عِلْمًا',
    duaTranslation: 'My Lord, increase me in knowledge.',
    advice: [
      'Study Islamic teachings with qualified scholars',
      'Ask questions and seek authentic knowledge',
      'Read the Quran with reflection and understanding',
      'Connect with knowledgeable Muslims',
      'Be patient with yourself in your spiritual journey'
    ],
    youtubeVideoId: 'dQw4w9WgXcQ',
    videoTitle: 'Dealing with Doubts in Faith'
  },
  {
    id: 'excited',
    label: 'Excited',
    emoji: '🤩',
    color: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300',
    description: 'Channel your excitement into positive actions that please Allah and benefit others.',
    verse: 'And whoever does righteous deeds, whether male or female, while being a believer - those will enter Paradise.',
    verseReference: 'Quran 4:124',
    hadith: 'The Prophet (PBUH) said: "The believer who mixes with people and bears their annoyance with patience will have a greater reward than the believer who does not mix with people."',
    hadithReference: 'Tirmidhi',
    dua: 'اللَّهُمَّ بَارِكْ لَنَا فِيمَا أَعْطَيْتَنَا',
    duaTranslation: 'O Allah, bless us in what You have given us.',
    advice: [
      'Use your energy for beneficial activities',
      'Share your joy with family and friends',
      'Engage in acts of charity and kindness',
      'Thank Allah for the blessings causing your excitement',
      'Channel excitement into worship and good deeds'
    ],
    youtubeVideoId: 'dQw4w9WgXcQ',
    videoTitle: 'Using Positive Energy for Good in Islam'
  },
  {
    id: 'frustrated',
    label: 'Frustrated',
    emoji: '😤',
    color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
    description: 'Frustration is a test of patience. Remember that Allah\'s timing is perfect.',
    verse: 'And give good tidings to the patient, Who, when disaster strikes them, say, "Indeed we belong to Allah, and indeed to Him we will return."',
    verseReference: 'Quran 2:155-156',
    hadith: 'The Prophet (PBUH) said: "How wonderful is the affair of the believer, for his affairs are all good, and this applies to no one but the believer."',
    hadithReference: 'Sahih Muslim',
    dua: 'رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا وَتَوَفَّنَا مُسْلِمِينَ',
    duaTranslation: 'Our Lord, pour upon us patience and let us die as Muslims.',
    advice: [
      'Practice patience and remember Allah\'s wisdom',
      'Take breaks and perform dhikr to calm down',
      'Seek Allah\'s help in overcoming obstacles',
      'Focus on what you can control',
      'Remember that tests lead to spiritual growth'
    ],
    youtubeVideoId: 'dQw4w9WgXcQ',
    videoTitle: 'Patience and Perseverance in Islam'
  },
  {
    id: 'grateful',
    label: 'Grateful',
    emoji: '🙏',
    color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
    description: 'Gratitude increases blessings. Express your thankfulness through worship and helping others.',
    verse: 'And [remember] when your Lord proclaimed, "If you are grateful, I will certainly give you more."',
    verseReference: 'Quran 14:7',
    hadith: 'The Prophet (PBUH) said: "He who does not thank people, does not thank Allah."',
    hadithReference: 'Abu Dawud',
    dua: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَكَفَانَا وَآوَانَا',
    duaTranslation: 'Praise be to Allah who has fed us, given us drink, satisfied our needs and given us shelter.',
    advice: [
      'Keep a daily gratitude journal',
      'Express thanks to people who help you',
      'Give charity as a form of gratitude',
      'Share your blessings with others',
      'Regularly recite Alhamdulillah'
    ],
    youtubeVideoId: 'dQw4w9WgXcQ',
    videoTitle: 'The Power of Gratitude in Islam'
  },
  {
    id: 'greedy',
    label: 'Greedy',
    emoji: '🤑',
    color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    description: 'Greed leads to spiritual poverty. Practice contentment and generosity to purify your heart.',
    verse: 'But whoever is protected from the stinginess of his soul - it is those who will be the successful.',
    verseReference: 'Quran 59:9',
    hadith: 'The Prophet (PBUH) said: "It is not poverty that I fear for you, but rather that the world be spread out for you as it was spread out for those before you, and you compete for it as they competed for it, and it destroys you as it destroyed them."',
    hadithReference: 'Sahih Bukhari',
    dua: 'اللَّهُمَّ أَغْنِنِي بِحَلَالِكَ عَنْ حَرَامِكَ وَبِفَضْلِكَ عَمَّنْ سِوَاكَ',
    duaTranslation: 'O Allah, make me content with what You have made lawful instead of what You have made unlawful, and make me independent of all others besides You.',
    advice: [
      'Practice regular charity to purify wealth',
      'Remember that all wealth belongs to Allah',
      'Focus on spiritual rather than material wealth',
      'Help those less fortunate than yourself',
      'Reflect on the temporary nature of worldly possessions'
    ],
    youtubeVideoId: 'dQw4w9WgXcQ',
    videoTitle: 'Overcoming Greed Through Islamic Values'
  },
  {
    id: 'guilty',
    label: 'Guilty',
    emoji: '😔',
    color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
    description: 'Guilt can lead to repentance. Turn to Allah with sincere tawbah and resolve to do better.',
    verse: 'But whoever repents after his wrongdoing and reforms, indeed, Allah will turn to him in forgiveness.',
    verseReference: 'Quran 5:39',
    hadith: 'The Prophet (PBUH) said: "All the sons of Adam are sinners, but the best of sinners are those who repent."',
    hadithReference: 'Tirmidhi',
    dua: 'أَسْتَغْفِرُ اللَّهَ الَّذِي لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ وَأَتُوبُ إِلَيْهِ',
    duaTranslation: 'I seek forgiveness from Allah, there is no god but He, the Ever-Living, the Self-Sustaining, and I turn to Him in repentance.',
    advice: [
      'Make sincere tawbah (repentance) to Allah',
      'Resolve not to repeat the mistake',
      'Perform good deeds to make amends',
      'Seek forgiveness from those you may have wronged',
      'Remember Allah\'s infinite mercy and forgiveness'
    ],
    youtubeVideoId: 'dQw4w9WgXcQ',
    videoTitle: 'The Beauty of Repentance in Islam'
  },
  {
    id: 'happy',
    label: 'Happy',
    emoji: '😊',
    color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    description: 'Happiness is a blessing from Allah. Share your joy and remember to thank Him.',
    verse: 'Say, "In the bounty of Allah and in His mercy - in that let them rejoice; it is better than what they accumulate."',
    verseReference: 'Quran 10:58',
    hadith: 'The Prophet (PBUH) said: "Whoever is pleased with Allah as his Lord, Islam as his religion, and Muhammad as his Messenger, will taste the sweetness of faith."',
    hadithReference: 'Sahih Muslim',
    dua: 'اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ',
    duaTranslation: 'O Allah, help me to remember You, thank You, and worship You in the best manner.',
    advice: [
      'Thank Allah for the source of your happiness',
      'Share your joy with family and friends',
      'Use your happiness to spread positivity',
      'Engage in extra acts of worship',
      'Help others who may be struggling'
    ],
    youtubeVideoId: 'dQw4w9WgXcQ',
    videoTitle: 'Finding True Happiness in Islam'
  },
  {
    id: 'hopeful',
    label: 'Hopeful',
    emoji: '🤗',
    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    description: 'Hope in Allah\'s mercy is a sign of strong faith. Use this hope to motivate good deeds.',
    verse: 'And whoever hopes for the meeting with his Lord, let him do righteous work and associate none as a partner in the worship of his Lord.',
    verseReference: 'Quran 18:110',
    hadith: 'The Prophet (PBUH) said: "None of you should wish for death because of a calamity befalling him; but if he has to wish for death, he should say: O Allah! Keep me alive as long as life is better for me, and let me die if death is better for me."',
    hadithReference: 'Sahih Bukhari',
    dua: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
    duaTranslation: 'Our Lord, give us good in this world and good in the next world, and save us from the punishment of the Fire.',
    advice: [
      'Channel your hope into positive action',
      'Make dua for your hopes and dreams',
      'Work towards your goals while trusting Allah',
      'Inspire others with your optimism',
      'Remember that Allah\'s mercy is infinite'
    ],
    youtubeVideoId: 'dQw4w9WgXcQ',
    videoTitle: 'The Power of Hope in Islamic Faith'
  },
  {
    id: 'hurt',
    label: 'Hurt',
    emoji: '💔',
    color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
    description: 'Emotional pain is a test. Turn to Allah for healing and find strength in His love.',
    verse: 'And it is He who heals the breasts of the believing people.',
    verseReference: 'Quran 9:14',
    hadith: 'The Prophet (PBUH) said: "The example of a believer is that of a fresh tender plant; from whatever direction the wind comes, it bends it, but when the wind becomes quiet, it becomes straight again."',
    hadithReference: 'Sahih Bukhari',
    dua: 'اللَّهُمَّ رَبَّ النَّاسِ أَذْهِبِ الْبَأْسَ وَاشْفِ أَنْتَ الشَّافِي',
    duaTranslation: 'O Allah, Lord of mankind, remove the hardship and heal, You are the Healer.',
    advice: [
      'Turn to Allah in sincere prayer',
      'Practice forgiveness to heal your heart',
      'Seek comfort in Quranic recitation',
      'Connect with supportive Muslim friends',
      'Remember that Allah is the ultimate healer'
    ],
    youtubeVideoId: 'dQw4w9WgXcQ',
    videoTitle: 'Healing Emotional Pain Through Islam'
  },
  {
    id: 'hypocritical',
    label: 'Hypocritical',
    emoji: '😬',
    color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
    description: 'Recognizing hypocrisy is the first step to sincerity. Strive for authenticity in your faith.',
    verse: 'O you who believe! Why do you say that which you do not do? Most hateful it is with Allah that you say that which you do not do.',
    verseReference: 'Quran 61:2-3',
    hadith: 'The Prophet (PBUH) said: "The signs of a hypocrite are three: when he speaks, he lies; when he promises, he breaks his promise; and when he is entrusted with something, he betrays that trust."',
    hadithReference: 'Sahih Bukhari',
    dua: 'اللَّهُمَّ أَلْهِمْنِي رُشْدِي وَأَعِذْنِي مِنْ شَرِّ نَفْسِي',
    duaTranslation: 'O Allah, inspire me with guidance and protect me from the evil of my soul.',
    advice: [
      'Examine your intentions regularly',
      'Strive to align your actions with your beliefs',
      'Seek Allah\'s help in being sincere',
      'Practice self-accountability',
      'Make sincere tawbah for past inconsistencies'
    ],
    youtubeVideoId: 'dQw4w9WgXcQ',
    videoTitle: 'Achieving Sincerity in Faith'
  },
  {
    id: 'indecisive',
    label: 'Indecisive',
    emoji: '🤷',
    color: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300',
    description: 'When facing difficult decisions, seek Allah\'s guidance through prayer and consultation.',
    verse: 'And those who have responded to their lord and established prayer and who conduct their affairs by mutual consultation.',
    verseReference: 'Quran 42:38',
    hadith: 'The Prophet (PBUH) said: "If any one of you is concerned about a decision he has to make, then let him pray two rakahs of non-obligatory prayer, then say the dua of istikharah."',
    hadithReference: 'Sahih Bukhari',
    dua: 'اللَّهُمَّ إِنِّي أَسْتَخِيرُكَ بِعِلْمِكَ وَأَسْتَقْدِرُكَ بِقُدْرَتِكَ',
    duaTranslation: 'O Allah, I seek Your guidance through Your knowledge, and I seek Your help through Your power.',
    advice: [
      'Perform Salat al-Istikharah for guidance',
      'Consult with wise and trustworthy people',
      'Research and gather information',
      'Make a list of pros and cons',
      'Trust in Allah\'s wisdom after making your decision'
    ],
    youtubeVideoId: 'dQw4w9WgXcQ',
    videoTitle: 'Making Decisions the Islamic Way'
  },
  {
    id: 'jealous',
    label: 'Jealous',
    emoji: '😒',
    color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    description: 'Jealousy can destroy faith and relationships. Focus on gratitude and trust in Allah\'s wisdom.',
    verse: 'And do not wish for that by which Allah has made some of you exceed others.',
    verseReference: 'Quran 4:32',
    hadith: 'The Prophet (PBUH) said: "Beware of jealousy, for jealousy devours good deeds just as fire devours wood."',
    hadithReference: 'Abu Dawud',
    dua: 'اللَّهُمَّ بَارِكْ لَهُمْ فِيمَا أَعْطَيْتَهُمْ وَبَارِكْ لَنَا فِيمَا أَعْطَيْتَنَا',
    duaTranslation: 'O Allah, bless them in what You have given them, and bless us in what You have given us.',
    advice: [
      'Focus on your own blessings and be grateful',
      'Make dua for those you feel jealous of',
      'Remember that Allah\'s distribution is just',
      'Work on improving yourself instead of comparing',
      'Seek Allah\'s protection from the evil of jealousy'
    ],
    youtubeVideoId: 'dQw4w9WgXcQ',
    videoTitle: 'Overcoming Jealousy in Islam'
  },
  {
    id: 'joyful',
    label: 'Joyful',
    emoji: '😄',
    color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    description: 'Joy is a gift from Allah. Use it to spread happiness and engage in acts of worship.',
    verse: 'Say, "In the bounty of Allah and in His mercy - in that let them rejoice; it is better than what they accumulate."',
    verseReference: 'Quran 10:58',
    hadith: 'The Prophet (PBUH) said: "Allah loves, when one of you does a job, that he does it with excellence."',
    hadithReference: 'Al-Bayhaqi',
    dua: 'اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ',
    duaTranslation: 'O Allah, help me to remember You, thank You, and worship You in the best manner.',
    advice: [
      'Share your joy with others',
      'Thank Allah for the source of your happiness',
      'Use your positive energy for good deeds',
      'Spread smiles and kindness',
      'Engage in extra acts of worship'
    ],
    youtubeVideoId: 'dQw4w9WgXcQ',
    videoTitle: 'Spreading Joy the Islamic Way'
  },
  {
    id: 'lazy',
    label: 'Lazy',
    emoji: '😴',
    color: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300',
    description: 'Laziness can hinder spiritual and worldly progress. Seek Allah\'s help to become more productive.',
    verse: 'And that there is nothing for man except what he strives for.',
    verseReference: 'Quran 53:39',
    hadith: 'The Prophet (PBUH) said: "Allah loves, when one of you does a job, that he does it with excellence."',
    hadithReference: 'Al-Bayhaqi',
    dua: 'اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ',
    duaTranslation: 'O Allah, help me to remember You, thank You, and worship You in the best manner.',
    advice: [
      'Start with small, manageable tasks',
      'Make dua for motivation and energy',
      'Remember your responsibilities to Allah and others',
      'Set realistic goals and work towards them',
      'Seek Allah\'s help in overcoming laziness'
    ],
    youtubeVideoId: 'dQw4w9WgXcQ',
    videoTitle: 'Overcoming Laziness Through Islamic Motivation'
  },
  {
    id: 'lonely',
    label: 'Lonely',
    emoji: '😞',
    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    description: 'Remember that Allah is always with you. Connect with the Muslim community and strengthen your relationship with Him.',
    verse: 'And it is He who is in the heaven, God, and in the earth, God.',
    verseReference: 'Quran 43:84',
    hadith: 'The Prophet (PBUH) said: "The believer who mixes with people and bears their annoyance with patience will have a greater reward than the believer who does not mix with people."',
    hadithReference: 'Tirmidhi',
    dua: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ وَرَحْمَتِكَ فَإِنَّهُ لَا يَمْلِكُهَا إِلَّا أَنْتَ',
    duaTranslation: 'O Allah, I ask You for Your favor and mercy, for no one possesses them but You.',
    advice: [
      'Strengthen your connection with Allah through prayer',
      'Join local mosque activities and Islamic gatherings',
      'Reach out to family and friends',
      'Engage in community service',
      'Remember that Allah is always with you'
    ],
    youtubeVideoId: 'dQw4w9WgXcQ',
    videoTitle: 'Finding Companionship in Faith'
  }
];

function MoodSelector({ selectedMood, onMoodSelect }: MoodSelectorProps) {
  const [selectedDetailedMood, setSelectedDetailedMood] = useState<DetailedMood | null>(null);

  const handleMoodClick = (mood: DetailedMood) => {
    onMoodSelect(mood);
    setSelectedDetailedMood(mood);
  };

  const closeMoodDetails = () => {
    setSelectedDetailedMood(null);
  };

  if (selectedDetailedMood) {
    return (
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="text-4xl mr-4">{selectedDetailedMood.emoji}</div>
              <div>
                <h2 className="text-3xl font-bold">Feeling {selectedDetailedMood.label}</h2>
                <p className="text-emerald-100 mt-2">{selectedDetailedMood.description}</p>
              </div>
            </div>
            <button
              onClick={closeMoodDetails}
              className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-b-2xl shadow-xl border-x border-b border-gray-200 dark:border-gray-600">
          <div className="grid lg:grid-cols-2 gap-8 p-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Quranic Verse */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-6 rounded-xl border-l-4 border-amber-400">
                <div className="flex items-start">
                  <BookOpen className="w-6 h-6 text-amber-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-amber-800 dark:text-amber-300 mb-3">
                      Quranic Guidance
                    </h3>
                    <blockquote className="text-amber-800 dark:text-amber-300 text-lg italic mb-3">
                      "{selectedDetailedMood.verse}"
                    </blockquote>
                    <cite className="text-amber-600 dark:text-amber-400 font-medium">
                      - {selectedDetailedMood.verseReference}
                    </cite>
                  </div>
                </div>
              </div>

              {/* Hadith */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border-l-4 border-blue-400">
                <div className="flex items-start">
                  <Star className="w-6 h-6 text-blue-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-3">
                      Prophetic Wisdom
                    </h3>
                    <p className="text-blue-700 dark:text-blue-300 italic mb-3">
                      {selectedDetailedMood.hadith}
                    </p>
                    <cite className="text-blue-600 dark:text-blue-400 font-medium">
                      - {selectedDetailedMood.hadithReference}
                    </cite>
                  </div>
                </div>
              </div>

              {/* Dua */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl border-l-4 border-green-400">
                <div className="flex items-start">
                  <Heart className="w-6 h-6 text-green-500 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-green-800 dark:text-green-300 mb-3">
                      Recommended Dua
                    </h3>
                    <div className="text-2xl font-arabic text-green-800 dark:text-green-300 mb-3 text-right" dir="rtl">
                      {selectedDetailedMood.dua}
                    </div>
                    <p className="text-green-700 dark:text-green-400 italic">
                      {selectedDetailedMood.duaTranslation}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Islamic Advice */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-xl border-l-4 border-purple-400">
                <h3 className="font-semibold text-purple-800 dark:text-purple-300 mb-4 flex items-center">
                  <Star className="w-5 h-5 mr-2" />
                  Islamic Advice
                </h3>
                <ul className="space-y-3">
                  {selectedDetailedMood.advice.map((advice, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">
                        {index + 1}
                      </div>
                      <span className="text-purple-700 dark:text-purple-300">
                        {advice}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* YouTube Video */}
              <div className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 p-6 rounded-xl border-l-4 border-red-400">
                <h3 className="font-semibold text-red-800 dark:text-red-300 mb-4 flex items-center">
                  <Play className="w-5 h-5 mr-2" />
                  Recommended Video
                </h3>
                <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg mb-3 flex items-center justify-center">
                  <div className="text-center">
                    <Play className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500 text-sm">Video Player</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {selectedDetailedMood.videoTitle}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-red-700 dark:text-red-300">
                    {selectedDetailedMood.videoTitle}
                  </h4>
                  <button className="flex items-center text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    <span className="text-sm">Watch</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Back Button */}
          <div className="p-6 border-t border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50">
            <button
              onClick={closeMoodDetails}
              className="w-full py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
            >
              Back to Mood Selection
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
          Discover Your Inner Essence
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          Select your current mood to receive personalized Islamic guidance, verses, and spiritual support
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {detailedMoods.map((mood) => (
          <button
            key={mood.id}
            onClick={() => handleMoodClick(mood)}
            className={`p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg ${
              selectedMood?.id === mood.id
                ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 shadow-lg transform scale-105'
                : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-emerald-300'
            }`}
          >
            <div className="text-4xl mb-3">{mood.emoji}</div>
            <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              {mood.label}
            </div>
            <div className={`text-xs px-2 py-1 rounded-full ${mood.color}`}>
              Islamic Guidance
            </div>
          </button>
        ))}
      </div>

      {selectedMood && !selectedDetailedMood && (
        <div className="mt-8 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-xl border border-emerald-200 dark:border-gray-600">
          <div className="flex items-center justify-center mb-4">
            <div className="text-4xl mr-3">{selectedMood.emoji}</div>
            <h3 className="text-2xl font-semibold text-emerald-800 dark:text-emerald-300">
              You're feeling {selectedMood.label}
            </h3>
          </div>
          <p className="text-center text-emerald-700 dark:text-emerald-400 mb-4">
            Click on your mood again to access detailed Islamic guidance including Quranic verses, 
            Hadiths, duas, practical advice, and recommended videos.
          </p>
          <div className="text-center">
            <button
              onClick={() => setSelectedDetailedMood(selectedMood as DetailedMood)}
              className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
            >
              Get Detailed Guidance
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MoodSelector;