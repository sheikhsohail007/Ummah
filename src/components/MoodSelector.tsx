import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
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
  sunnahReminder?: {
    title: string;
    text: string;
    reference?: string;
  };

  practicalTip?: {
    title: string;
    text: string;
  };
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
    youtubeVideoId: 'A0koepD3yk4',
    videoTitle: 'How to Control Anger in Islam',

    // 🕊 NEW: Daily Sunnah Reminder
    sunnahReminder: {
      title: 'Daily Sunnah Reminder',
      text: 'The Prophet ﷺ never got angry for his own sake — only for Allah’s. When angry, he would perform wudu (ablution), as anger comes from fire, and fire is extinguished with water.',
      reference: 'Abu Dawud 4784'
    },

    // 🧭 NEW: Practical Tip
    practicalTip: {
      title: 'Practical Tip',
      text: 'When anger rises, pause. If you are standing, sit down; if sitting, lie down. Recite “A‘udhu billahi min ash-shaytan ir-rajim” (I seek refuge in Allah from the accursed devil). Stay silent — silence in anger prevents regret.'
    }
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
    youtubeVideoId: 'Zy006WE5oiQ',
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
    youtubeVideoId: '5WAGK8kH3-U?feature=share',
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
    youtubeVideoId: 'r0ovqckrf2Q',
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
    youtubeVideoId: 'OxsBQDHkMcI',
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
    youtubeVideoId: 't0u1fYhYDyU',
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
    youtubeVideoId: 'p2weSp-v1kY',
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
    youtubeVideoId: 'QWgpAlFnb5s?feature=share',
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
    youtubeVideoId: '6vNifPyqlL0',
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
    youtubeVideoId: 'sVfG1SazPs8',
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
    youtubeVideoId: 'Nnd_IM65Ies',
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
    youtubeVideoId: 'cCMTBa3nIK8',
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
    youtubeVideoId: 'wnhuulfcDUg',
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
    youtubeVideoId: 'x5SH22rCjZQ',
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
    youtubeVideoId: 'yL9McAshD7g',
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
    youtubeVideoId: 'Bolw2Z3I6wM?feature=share',
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
    youtubeVideoId: 'm9xcwWBwXkc',
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
    youtubeVideoId: 'oSSzv-rTJGo',
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
    youtubeVideoId: 'x5SH22rCjZQ',
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
    youtubeVideoId: 'avZ3Q6VCU-E',
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
    youtubeVideoId: 'EpE7jr5AnnE',
    videoTitle: 'Finding Companionship in Faith'
  },
  {
    id: 'loved',
    label: 'Loved',
    emoji: '💝',
    color: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300',
    description: 'When you feel love and affection, remember that Allah\'s love for His believers is infinitely greater.',
    verse: 'And whoever relies upon Allah - then He is sufficient for him. Indeed, Allah will accomplish His purpose.',
    verseReference: 'Quran 65:3',
    hadith: 'The Prophet (PBUH) said: "When Allah loves a servant, He calls Gabriel and says: I love so-and-so, therefore love him."',
    hadithReference: 'Sahih Bukhari',
    dua: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
    duaTranslation: 'Our Lord, give us good in this world and good in the next world, and save us from the punishment of the Fire.',
    advice: [
      'Express gratitude to Allah for the love in your heart',
      'Share kindness and love with others as a form of worship',
      'Remember that true love should bring you closer to Allah',
      'Make dua for those you love',
      'Use your loving nature to help and support others'
    ],
    youtubeVideoId: 'SZhJKNIf9lo',
    videoTitle: 'How to Express Love in Islam',

    // 💝 NEW: Daily Sunnah Reminder
    sunnahReminder: {
      title: 'Daily Sunnah Reminder',
      text: 'The Prophet ﷺ showed love through his actions and kindness. He said the believers in their mutual kindness and compassion are like one body; when a limb suffers, the whole body responds with wakefulness and fever.',
      reference: 'Sahih Muslim 2586'
    },

    // 💝 NEW: Practical Tip
    practicalTip: {
      title: 'Practical Tip',
      text: 'When feeling love, channel it positively. Express love through service to others. Recite "Rabbana atina fi\'d-dunya hasanatan" (Our Lord, give us good in this world). Remember that loving for Allah\'s sake is an act of worship.'
    }
},

{
    id: 'nostalgic',
    label: 'Nostalgic',
    emoji: '🌅',
    color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
    description: 'When nostalgia fills your heart, remember that this life is temporary and the real home is with Allah.',
    verse: 'And it is He who created the heavens and earth in truth. And the day He says, "Be," and it is, His word is the truth.',
    verseReference: 'Quran 6:73',
    hadith: 'The Prophet (PBUH) said: "Be in this world as if you were a stranger or a traveler along a path."',
    hadithReference: 'Sahih Bukhari',
    dua: 'رَبَّنَا لاَ تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِن لَّدُنكَ رَحْمَةً',
    duaTranslation: 'Our Lord, let not our hearts deviate after You have guided us and grant us from Yourself mercy.',
    advice: [
      'Use nostalgia as a reminder of Allah\'s blessings',
      'Reflect on how Allah has guided you through different phases',
      'Make dua for forgiveness for past mistakes',
      'Focus on creating good memories in the present',
      'Remember that the best is yet to come in the Hereafter'
    ],
    youtubeVideoId: '2EMjujJz4vs',
    videoTitle: 'Finding Peace in Memories',

    // 🌅 NEW: Daily Sunnah Reminder
    sunnahReminder: {
      title: 'Daily Sunnah Reminder',
      text: 'The Prophet ﷺ would remember Allah in all states. He taught us that this world is temporary, and our real home is with Allah. Use memories to increase gratitude and taqwa.',
      reference: 'Tirmidhi 2377'
    },

    // 🌅 NEW: Practical Tip
    practicalTip: {
      title: 'Practical Tip',
      text: 'When feeling nostalgic, pause and reflect. Thank Allah for past blessings. Recite "Rabbana la tuzigh qulubana" (Our Lord, do not deviate our hearts). Use memories as motivation for righteous deeds.'
    }
},

{
    id: 'optimistic',
    label: 'Optimistic',
    emoji: '🌟',
    color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    description: 'When optimism fills your heart, remember that Allah is the source of all hope and good expectations.',
    verse: 'So verily, with the hardship, there is relief. Verily, with the hardship, there is relief.',
    verseReference: 'Quran 94:5-6',
    hadith: 'The Prophet (PBUH) said: "No fatigue, nor disease, nor sorrow, nor sadness, nor hurt, nor distress befalls a Muslim, not even if it were the prick he receives from a thorn, but that Allah expiates some of his sins for that."',
    hadithReference: 'Sahih Bukhari',
    dua: 'حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ',
    duaTranslation: 'Sufficient for us is Allah, and [He is] the best Disposer of affairs.',
    advice: [
      'Channel your optimism into positive actions',
      'Share hope and encouragement with others',
      'Trust in Allah\'s perfect timing and wisdom',
      'Use your positive energy for worship and good deeds',
      'Remember that ultimate success is with Allah'
    ],
    youtubeVideoId: 'IrJ2vxJhyNg?feature=share',
    videoTitle: 'Finding Hope in Faith',

    // 🌟 NEW: Daily Sunnah Reminder
    sunnahReminder: {
      title: 'Daily Sunnah Reminder',
      text: 'The Prophet ﷺ was always optimistic and encouraged believers to have good expectations of Allah. He said: "I am as My servant thinks I am, so let him think of Me as he wishes."',
      reference: 'Sahih Bukhari'
    },

    // 🌟 NEW: Practical Tip
    practicalTip: {
      title: 'Practical Tip',
      text: 'When feeling optimistic, use this energy for good. Make dua, help others, plan charitable acts. Recite "Hasbuna Allah wa ni\'mal wakeel" (Allah is sufficient for us). Share positivity with others.'
    }
},

{
    id: 'overwhelmed',
    label: 'Overwhelmed',
    emoji: '😰',
    color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
    description: 'When you feel overwhelmed, remember that Allah does not burden a soul beyond its capacity.',
    verse: 'Allah does not charge a soul except [with that within] its capacity.',
    verseReference: 'Quran 2:286',
    hadith: 'The Prophet (PBUH) said: "How wonderful is the case of a believer; there is good for him in everything and this applies only to a believer."',
    hadithReference: 'Sahih Muslim',
    dua: 'اللَّهُمَّ لاَ سَهْلَ إِلاَّ مَا جَعَلْتَهُ سَهْلاً وَأَنْتَ تَجْعَلُ الْحَزْنَ إِذَا شِئْتَ سَهْلاً',
    duaTranslation: 'O Allah, there is nothing easy except what You make easy, and You make the difficult easy if You wish.',
    advice: [
      'Break down your tasks and prioritize',
      'Seek Allah\'s help through prayer and dua',
      'Remember that this feeling is temporary',
      'Take breaks and perform dhikr to calm your mind',
      'Ask for help from others when needed'
    ],
    youtubeVideoId: 'overwhelmed101',
    videoTitle: 'Managing Stress in Islam',

    // 😰 NEW: Daily Sunnah Reminder
    sunnahReminder: {
      title: 'Daily Sunnah Reminder',
      text: 'The Prophet ﷺ faced many challenges but always turned to Allah. He would make dua: "O Allah, there is nothing easy except what You make easy."',
      reference: 'Ibn Hibban'
    },

    // 😰 NEW: Practical Tip
    practicalTip: {
      title: 'Practical Tip',
      text: 'When overwhelmed, pause and breathe. Make wudu, pray two rakats, or recite dhikr. Break tasks into smaller parts. Remember Allah is with you in every difficulty.'
    }
},
{
    id: 'peaceful',
    label: 'Peaceful',
    emoji: '🕊️',
    color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    description: 'When peace fills your heart, remember that true peace comes from remembrance of Allah.',
    verse: 'Those who have believed and whose hearts are assured by the remembrance of Allah. Unquestionably, by the remembrance of Allah hearts are assured.',
    verseReference: 'Quran 13:28',
    hadith: 'The Prophet (PBUH) said: "The example of the one who remembers his Lord in comparison to the one who does not remember his Lord, is like that of the living compared to the dead."',
    hadithReference: 'Sahih Bukhari',
    dua: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ سُبْحَانَ اللَّهِ الْعَظِيمِ',
    duaTranslation: 'Glory is to Allah and praise is to Him, glory is to Allah the Great.',
    advice: [
      'Use this peaceful state for reflection and dhikr',
      'Express gratitude to Allah for this blessing',
      'Share your peaceful energy with others',
      'Engage in quiet worship and meditation',
      'Help others find peace through kind words and actions'
    ],
    youtubeVideoId: 'QwHjbVWEvrY',
    videoTitle: 'Finding Inner Peace in Islam',

    // 🕊️ NEW: Daily Sunnah Reminder
    sunnahReminder: {
      title: 'Daily Sunnah Reminder',
      text: 'The Prophet ﷺ found peace through dhikr and prayer. He said: "O Bilal, call the Adhan so that we may find comfort in prayer." Peace comes from connection with Allah.',
      reference: 'Abu Dawud 4986'
    },

    // 🕊️ NEW: Practical Tip
    practicalTip: {
      title: 'Practical Tip',
      text: 'When feeling peaceful, maximize this blessing. Engage in dhikr, read Quran, make dua for others. Recite "Subhan Allah wa bihamdihi" (Glory to Allah and praise to Him). Use peace to strengthen your relationship with Allah.'
    }
},

{
    id: 'proud',
    label: 'Proud',
    emoji: '👑',
    color: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300',
    description: 'When you feel proud of achievements, remember that all success comes from Allah and practice humility.',
    verse: 'And it is Allah who created you and your deeds.',
    verseReference: 'Quran 37:96',
    hadith: 'The Prophet (PBUH) said: "Whoever humbles himself for Allah, Allah will elevate him."',
    hadithReference: 'Sahih Muslim',
    dua: 'رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ',
    duaTranslation: 'My Lord, enable me to be grateful for Your favor which You have bestowed upon me.',
    advice: [
      'Thank Allah for the success He granted you',
      'Share credit with others who helped you',
      'Use your achievements to help others',
      'Avoid arrogance and maintain humility',
      'Remember that all abilities are gifts from Allah'
    ],
    youtubeVideoId: 'za2YjQ18Gyk?feature=share',
    videoTitle: 'Humility in Success',

    // 👑 NEW: Daily Sunnah Reminder
    sunnahReminder: {
      title: 'Daily Sunnah Reminder',
      text: 'The Prophet ﷺ remained humble despite his great status. When Mecca was conquered, he entered with his head lowered in humility, thanking Allah for the victory.',
      reference: 'Sahih Bukhari'
    },

    // 👑 NEW: Practical Tip
    practicalTip: {
      title: 'Practical Tip',
      text: 'When feeling proud, immediately thank Allah. Prostrate in gratitude (Sajdah Shukr). Help someone less fortunate. Recite "Rabbi awzi\'ni an ashkura ni\'mataka" (My Lord, enable me to be grateful). Remember Allah created your abilities.'
    }
},

{
    id: 'regretful',
    label: 'Regretful',
    emoji: '😔',
    color: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300',
    description: 'When regret weighs on your heart, remember that Allah is the Most Forgiving and loves those who repent.',
    verse: 'Say, "O My servants who have transgressed against themselves [by sinning], do not despair of the mercy of Allah."',
    verseReference: 'Quran 39:53',
    hadith: 'The Prophet (PBUH) said: "All the sons of Adam are sinners, but the best of sinners are those who repent."',
    hadithReference: 'Sunan At-Tirmidhi',
    dua: 'أَسْتَغْفِرُ اللَّهَ الَّذِي لاَ إِلَهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّومُ وَأَتُوبُ إِلَيْهِ',
    duaTranslation: 'I seek forgiveness from Allah, there is no god but He, the Ever-Living, the Self-Subsisting, and I repent to Him.',
    advice: [
      'Turn to Allah in sincere repentance (Tawbah)',
      'Learn from your mistakes without dwelling on them',
      'Make amends with those you may have wronged',
      'Focus on doing good deeds going forward',
      'Trust in Allah\'s infinite mercy and forgiveness'
    ],
    youtubeVideoId: 'wVDaRdkModI',
    videoTitle: 'The Power of Repentance',

    // 😔 NEW: Daily Sunnah Reminder
    sunnahReminder: {
      title: 'Daily Sunnah Reminder',
      text: 'The Prophet ﷺ taught us that regret itself is repentance. He said: "Regret is repentance." Allah loves those who turn to Him in sincere repentance.',
      reference: 'Ibn Majah 4252'
    },

    // 😔 NEW: Practical Tip
    practicalTip: {
      title: 'Practical Tip',
      text: 'When feeling regretful, turn to Allah immediately. Make sincere tawbah, seek forgiveness from those wronged, and resolve to do better. Recite "Astaghfirullah" repeatedly. Remember Allah\'s mercy exceeds His wrath.'
    }
},

{
    id: 'relaxed',
    label: 'Relaxed',
    emoji: '😌',
    color: 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300',
    description: 'When you feel relaxed and at ease, use this time to connect with Allah and reflect on His blessings.',
    verse: 'And whoever relies upon Allah - then He is sufficient for him. Indeed, Allah will accomplish His purpose.',
    verseReference: 'Quran 65:3',
    hadith: 'The Prophet (PBUH) said: "Take advantage of five before five: your youth before your old age, your health before your sickness."',
    hadithReference: 'Al-Hakim',
    dua: 'اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ',
    duaTranslation: 'O Allah, help me to remember You, thank You, and worship You in the best manner.',
    advice: [
      'Use relaxed moments for dhikr and reflection',
      'Read Quran or Islamic literature',
      'Plan good deeds and acts of worship',
      'Spend quality time with family',
      'Prepare for upcoming challenges with a clear mind'
    ],
    youtubeVideoId: 'hjKpDvAKdaw?feature=share',
    videoTitle: 'Making the Most of Peaceful Moments',

    // 😌 NEW: Daily Sunnah Reminder
    sunnahReminder: {
      title: 'Daily Sunnah Reminder',
      text: 'The Prophet ﷺ valued moments of ease and used them wisely. He taught us to take advantage of health, free time, and peace to worship Allah and prepare for the Hereafter.',
      reference: 'Sahih Bukhari'
    },

    // 😌 NEW: Practical Tip
    practicalTip: {
      title: 'Practical Tip',
      text: 'When relaxed, use this blessing productively. Make extra dhikr, read Quran, plan charitable acts, or strengthen family bonds. Recite "Allahumma a\'inni ala dhikrika" (O Allah, help me remember You). Don\'t waste peaceful moments.'
    }
},

{
    id: 'sad',
    label: 'Sad',
    emoji: '😢',
    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    description: 'When sadness fills your heart, remember that Allah is close to those who call upon Him with sincerity.',
    verse: 'And when My servants ask you concerning Me, indeed I am near. I respond to the invocation of the supplicant when he calls upon Me.',
    verseReference: 'Quran 2:186',
    hadith: 'The Prophet (PBUH) said: "No person suffers any anxiety or grief and says: O Allah, I am Your servant, son of Your servant, son of Your maidservant, my forelock is in Your hand, Your command over me is forever executed and Your decree over me is just."',
    hadithReference: 'Ahmad',
    dua: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ وَرَحْمَتِكَ فَإِنَّهُ لاَ يَمْلِكُهَا إِلاَّ أَنْتَ',
    duaTranslation: 'O Allah, I ask You for Your bounty and mercy, for no one owns them but You.',
    advice: [
      'Pour your heart out to Allah in dua',
      'Read Quran, especially comforting surahs',
      'Remember that sadness is temporary',
      'Seek comfort in Islamic community and friends',
      'Engage in charity to lift your spirits'
    ],
    youtubeVideoId: 'APj0fOzNxFU',
    videoTitle: 'Finding Comfort in Times of Sadness',

    // 😢 NEW: Daily Sunnah Reminder
    sunnahReminder: {
      title: 'Daily Sunnah Reminder',
      text: 'The Prophet ﷺ experienced sadness but always turned to Allah. When his son Ibrahim died, he wept but said: "The heart grieves and the eyes shed tears, but we say only what pleases Allah."',
      reference: 'Sahih Bukhari'
    },

    // 😢 NEW: Practical Tip
    practicalTip: {
      title: 'Practical Tip',
      text: 'When sad, turn to Allah in dua. Read Surah Al-Inshirah for comfort. Engage in dhikr and seek support from family. Remember that after every difficulty comes ease. Help others to heal your own heart.'
    }
},

{
    id: 'scared',
    label: 'Scared',
    emoji: '😨',
    color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
    description: 'When fear grips your heart, remember that Allah is your protector and refuge from all harm.',
    verse: 'And whoever fears Allah - He will make for him a way out. And will provide for him from where he does not expect.',
    verseReference: 'Quran 65:2-3',
    hadith: 'The Prophet (PBUH) said: "Nothing can befall a Muslim of exhaustion, illness, worry, grief, distress, or trouble, not even a thorn that pricks him, except that Allah will expiate his sins thereby."',
    hadithReference: 'Sahih Bukhari',
    dua: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
    duaTranslation: 'I seek refuge in the perfect words of Allah from the evil of what He has created.',
    advice: [
      'Recite protective duas and seek Allah\'s refuge',
      'Remember that Allah is always with you',
      'Face your fears with trust in Allah (Tawakkul)',
      'Seek support from family and Islamic community',
      'Use fear as motivation to return closer to Allah'
    ],
    youtubeVideoId: '42qLuXilER8',
    videoTitle: 'Overcoming Fear Through Faith',

    // 😨 NEW: Daily Sunnah Reminder
    sunnahReminder: {
      title: 'Daily Sunnah Reminder',
      text: 'The Prophet ﷺ taught us protective duas for fear. He would seek refuge in Allah\'s perfect words from all harm. He said: "Whoever recites this will not be harmed by anything."',
      reference: 'Sahih Muslim'
    },

    // 😨 NEW: Practical Tip
    practicalTip: {
      title: 'Practical Tip',
      text: 'When scared, immediately recite "A\'udhu bi kalimat Allah at-tammat min sharri ma khalaq" (I seek refuge in Allah\'s perfect words from the evil of what He created). Perform wudu, pray two rakats, and remember Allah is your protector.'
    }
},
{
    id: 'stressed',
    label: 'Stressed',
    emoji: '😤',
    color: 'bg-red-200 text-red-900 dark:bg-red-800/30 dark:text-red-200',
    description: 'When stress overwhelms you, remember that Allah does not burden a soul beyond its capacity and turn to Him for relief.',
    verse: 'And whoever relies upon Allah - then He is sufficient for him. Indeed, Allah will accomplish His purpose.',
    verseReference: 'Quran 65:3',
    hadith: 'The Prophet (PBUH) said: "Verily, with every difficulty there is relief. Verily, with every difficulty there is relief."',
    hadithReference: 'Sahih Bukhari',
    dua: 'اللَّهُمَّ لاَ سَهْلَ إِلاَّ مَا جَعَلْتَهُ سَهْلاً وَأَنْتَ تَجْعَلُ الْحَزْنَ إِذَا شِئْتَ سَهْلاً',
    duaTranslation: 'O Allah, nothing is easy except what You make easy, and You make the difficult easy if You wish.',
    advice: [
      'Perform dhikr to calm your mind and heart',
      'Take breaks for prayer (Salah) throughout stressful times',
      'Practice deep breathing while reciting "La hawla wa la quwwata illa billah"',
      'Focus on what you can control and leave the rest to Allah',
      'Seek support from family and Islamic community'
    ],
    youtubeVideoId: 'ZqU5h6EQ790',
    videoTitle: 'Islamic Stress Management Techniques',

    // 😤 NEW: Daily Sunnah Reminder
    sunnahReminder: {
      title: 'Daily Sunnah Reminder',
      text: 'The Prophet ﷺ taught us that after every hardship comes ease. When facing stress, he would turn to prayer and dhikr, reminding us that Allah is always there to provide relief.',
      reference: 'Quran 94:5-6'
    },

    // 😤 NEW: Practical Tip
    practicalTip: {
      title: 'Practical Tip',
      text: 'When stressed, pause and perform wudu. The physical act of washing combined with mindful breathing can reduce stress. Then pray two rakats and make sincere dua for Allah\'s help and guidance.'
    }
},

{
    id: 'surprised',
    label: 'Surprised',
    emoji: '😲',
    color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
    description: 'When life surprises you, whether with joy or challenge, remember that everything happens by Allah\'s will and wisdom.',
    verse: 'And Allah is the best of planners.',
    verseReference: 'Quran 8:30',
    hadith: 'The Prophet (PBUH) said: "How wonderful is the affair of the believer, for his affairs are all good, and this applies to no one but the believer."',
    hadithReference: 'Sahih Muslim',
    dua: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ عَدَدَ خَلْقِهِ وَرِضَا نَفْسِهِ وَزِنَةَ عَرْشِهِ وَمِدَادَ كَلِمَاتِهِ',
    duaTranslation: 'Glory is to Allah and praise is to Him, by the number of His creation, by His pleasure, by the weight of His Throne, and by the ink of His words.',
    advice: [
      'Say "Subhan Allah" when witnessing something amazing',
      'Reflect on Allah\'s power and wisdom in all situations',
      'Use surprise as a reminder of life\'s unpredictability',
      'Thank Allah for both pleasant and challenging surprises',
      'Share your amazement with others to spread awareness of Allah\'s signs'
    ],
    youtubeVideoId: '8SM8b3tQZf4',
    videoTitle: 'Finding Allah in Life\'s Surprises',

    // 😲 NEW: Daily Sunnah Reminder
    sunnahReminder: {
      title: 'Daily Sunnah Reminder',
      text: 'The Prophet ﷺ was always amazed by Allah\'s creation and would say "Subhan Allah" when witnessing something remarkable. He taught us to see Allah\'s signs in everything around us.',
      reference: 'Sahih Muslim'
    },

    // 😲 NEW: Practical Tip
    practicalTip: {
      title: 'Practical Tip',
      text: 'When surprised, pause and say "Subhan Allah" or "Masha Allah". Reflect on how this surprise fits into Allah\'s perfect plan. Use the moment to increase your awareness of Allah\'s presence in your life.'
    }
},

{
    id: 'thankful',
    label: 'Thankful',
    emoji: '🙏',
    color: 'bg-amber-100 text-amber-900 dark:bg-amber-800/30 dark:text-amber-200',
    description: 'When gratitude fills your heart, remember that all blessings come from Allah and expressing thanks increases His bounties upon you.',
    verse: 'And [remember] when your Lord proclaimed, "If you are grateful, I will certainly give you more."',
    verseReference: 'Quran 14:7',
    hadith: 'The Prophet (PBUH) said: "He who does not thank people, does not thank Allah."',
    hadithReference: 'Abu Dawud',
    dua: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
    duaTranslation: 'All praise is due to Allah, Lord of all the worlds.',
    advice: [
      'Express gratitude to Allah through regular dhikr and prayer',
      'Thank people who have helped or blessed you',
      'Keep a gratitude journal noting daily blessings',
      'Use your blessings to help others less fortunate',
      'Remember that gratitude protects existing blessings'
    ],
    youtubeVideoId: 'ALiIb3B5jqU',
    videoTitle: 'The Power of Gratitude in Islam',

    // 🙏 NEW: Daily Sunnah Reminder
    sunnahReminder: {
      title: 'Daily Sunnah Reminder',
      text: 'The Prophet ﷺ was always grateful to Allah and taught us that gratitude increases blessings. He would thank Allah for every small and large blessing throughout the day.',
      reference: 'Quran 14:7'
    },

    // 🙏 NEW: Practical Tip
    practicalTip: {
      title: 'Practical Tip',
      text: 'When feeling thankful, say "Alhamdulillahi rabbil alameen" repeatedly. Make a list of your blessings, perform sajdah shukr (prostration of gratitude), and find ways to help others as a form of showing gratitude to Allah.'
    }
},

{
    id: 'tired',
    label: 'Tired',
    emoji: '😴',
    color: 'bg-indigo-100 text-indigo-900 dark:bg-indigo-800/30 dark:text-indigo-200',
    description: 'When exhaustion weighs upon you, remember that rest is a blessing from Allah and seeking His help renews your strength.',
    verse: 'And We made from water every living thing. Will they not believe?',
    verseReference: 'Quran 21:30',
    hadith: 'The Prophet (PBUH) said: "Take advantage of five before five: your youth before your old age, your health before your sickness."',
    hadithReference: 'Al-Hakim',
    dua: 'اللَّهُمَّ أَعِنِّي وَلاَ تُعِنْ عَلَيَّ وَانْصُرْنِي وَلاَ تَنْصُرْ عَلَيَّ',
    duaTranslation: 'O Allah, help me and do not help others against me, support me and do not support others against me.',
    advice: [
      'Take proper rest as it is a Sunnah and necessity',
      'Make dua for Allah to renew your strength and energy',
      'Prioritize your tasks and delegate when possible',
      'Remember that your body has rights over you',
      'Use moments of rest for quiet dhikr and reflection'
    ],
    youtubeVideoId: 'ifz4ni6Os0E',
    videoTitle: 'Islamic Perspective on Rest and Energy',

    // 😴 NEW: Daily Sunnah Reminder
    sunnahReminder: {
      title: 'Daily Sunnah Reminder',
      text: 'The Prophet ﷺ emphasized balance in life, including proper rest. He said your body has rights over you, and taking rest is not laziness but a necessary part of maintaining health for worship.',
      reference: 'Sahih Bukhari'
    },

    // 😴 NEW: Practical Tip
    practicalTip: {
      title: 'Practical Tip',
      text: 'When tired, don\'t push beyond your limits. Take a power nap if possible (following the Sunnah of Qailulah), make dua for energy, and remember that Allah gives strength to those who ask. Prioritize essential tasks.'
    }
},

{
    id: 'uncertain',
    label: 'Uncertain',
    emoji: '🤷',
    color: 'bg-purple-100 text-purple-900 dark:bg-purple-800/30 dark:text-purple-200',
    description: 'When uncertainty clouds your path, remember that Allah knows what you do not know and trust in His perfect guidance.',
    verse: 'And Allah knows while you know not.',
    verseReference: 'Quran 2:216',
    hadith: 'The Prophet (PBUH) said: "Whoever performs Istikhara will never regret, and whoever consults others will never be sorry."',
    hadithReference: 'At-Tabarani',
    dua: 'اللَّهُمَّ إِنِّي أَسْتَخِيرُكَ بِعِلْمِكَ وَأَسْتَقْدِرُكَ بِقُدْرَتِكَ',
    duaTranslation: 'O Allah, I seek Your guidance through Your knowledge, and I seek Your help through Your power.',
    advice: [
      'Perform Salat al-Istikhara for important decisions',
      'Consult knowledgeable and trustworthy people',
      'Research and gather information before deciding',
      'Trust in Allah\'s wisdom after making your best effort',
      'Remember that uncertainty is part of the test of life'
    ],
    youtubeVideoId: 'D52X4Ak7Z0M',
    videoTitle: 'Making Decisions with Islamic Guidance',

    // 🤷 NEW: Daily Sunnah Reminder
    sunnahReminder: {
      title: 'Daily Sunnah Reminder',
      text: 'The Prophet ﷺ taught us Istikhara prayer for when we face uncertainty. He showed us that seeking Allah\'s guidance in all matters, big and small, leads to the best outcomes.',
      reference: 'Sahih Bukhari'
    },

    // 🤷 NEW: Practical Tip
    practicalTip: {
      title: 'Practical Tip',
      text: 'When uncertain, perform two rakats and recite the Istikhara dua. Consult knowledgeable people, research your options, then make a decision and trust Allah\'s wisdom. Don\'t second-guess yourself afterward.'
    }
},

{
    id: 'worried',
    label: 'Worried',
    emoji: '😟',
    color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
    description: 'When worry consumes your thoughts, remember that Allah is in control of all affairs and His wisdom surpasses our understanding.',
    verse: 'And whoever relies upon Allah - then He is sufficient for him. Indeed, Allah will accomplish His purpose.',
    verseReference: 'Quran 65:3',
    hadith: 'The Prophet (PBUH) said: "Never is a servant struck by worry or grief but let him say: O Allah, I am Your servant, Your decision over me has passed, and Your decree upon me is in justice."',
    hadithReference: 'Sahih Ibn Hibban',
    dua: 'اللَّهُمَّ إِنِّي عَبْدُكَ ابْنُ عَبْدِكَ ابْنُ أَمَتِكَ نَاصِيَتِي بِيَدِكَ مَاضٍ فِيَّ حُكْمُكَ',
    duaTranslation: 'O Allah, I am Your servant, son of Your servant, son of Your maidservant, my forelock is in Your hand, Your decision over me has passed.',
    advice: [
      'Make abundant dhikr to calm your worried mind',
      'Pray two rakats and pour your concerns to Allah',
      'Remember that Allah tests only what you can handle',
      'Focus on what you can control and leave the rest to Allah',
      'Seek comfort in reciting Quran, especially Surah Al-Inshirah'
    ],
    youtubeVideoId: 'XnxNV2SNzbQ',
    videoTitle: 'Overcoming Worry Through Trust in Allah',

    // 😟 NEW: Daily Sunnah Reminder
    sunnahReminder: {
      title: 'Daily Sunnah Reminder',
      text: 'The Prophet ﷺ taught us that when worry strikes, we should turn to Allah completely. He said whoever recites the dua for worry, Allah will replace their anxiety with joy.',
      reference: 'Sahih Ibn Hibban 972'
    },

    // 😟 NEW: Practical Tip
    practicalTip: {
      title: 'Practical Tip',
      text: 'When worried, perform wudu and pray two rakats. Recite the dua for anxiety repeatedly. Write down your worries and make action plans for what you can control. Leave the rest to Allah with complete trust.'
    }
},

{
    id: 'motivated',
    label: 'Motivated',
    emoji: '💪',
    color: 'bg-lime-100 text-lime-800 dark:bg-lime-900/30 dark:text-lime-300',
    description: 'When motivation fills your heart, channel it toward righteous deeds and remember that success comes through Allah\'s blessing and your sincere efforts.',
    verse: 'And that there is nothing for man except what he strives for. And that his striving will soon be seen.',
    verseReference: 'Quran 53:39-40',
    hadith: 'The Prophet (PBUH) said: "Allah loves, when one of you does a job, that he does it with excellence (ihsan)."',
    hadithReference: 'Al-Bayhaqi',
    dua: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
    duaTranslation: 'Our Lord, give us good in this world and good in the next world, and save us from the punishment of the Fire.',
    advice: [
      'Set intentions (niyyah) to please Allah in your endeavors',
      'Work with excellence (ihsan) in everything you do',
      'Balance worldly motivation with spiritual goals',
      'Help others achieve their goals alongside your own',
      'Remember to thank Allah for the strength He has given you'
    ],
    youtubeVideoId: 'WwGXivS_4JY',
    videoTitle: 'Islamic Motivation and Excellence',

    // 💪 NEW: Daily Sunnah Reminder
    sunnahReminder: {
      title: 'Daily Sunnah Reminder',
      text: 'The Prophet ﷺ was the best example of motivation and excellence. He worked diligently and encouraged others to strive for perfection in all their deeds, seeking Allah\'s pleasure.',
      reference: 'Sahih Muslim'
    },

    // 💪 NEW: Practical Tip
    practicalTip: {
      title: 'Practical Tip',
      text: 'When motivated, set clear Islamic goals. Begin with "Bismillah", work with excellence, and end with gratitude. Use this energy for both worldly success and akhirah preparation. Help motivate others too.'
    }
},

{
    id: 'inspired',
    label: 'Inspired',
    emoji: '✨',
    color: 'bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300',
    description: 'When inspiration strikes, recognize it as a blessing from Allah and use it to create positive impact in your life and the lives of others.',
    verse: 'And We made from them leaders guiding by Our command when they were patient and were certain of Our signs.',
    verseReference: 'Quran 32:24',
    hadith: 'The Prophet (PBUH) said: "The believer is not one who eats his fill while his neighbor goes hungry."',
    hadithReference: 'Al-Adab Al-Mufrad',
    dua: 'رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي',
    duaTranslation: 'My Lord, expand for me my breast and ease for me my task.',
    advice: [
      'Use inspiration to benefit the ummah and humanity',
      'Follow the example of Prophet Muhammad (PBUH) and righteous people',
      'Share your inspired ideas with others to multiply the good',
      'Channel creativity into halal and beneficial pursuits',
      'Remember that all good inspiration comes from Allah'
    ],
    youtubeVideoId: 'inspired909',
    videoTitle: 'Finding Inspiration in Islamic Teachings',

    // ✨ NEW: Daily Sunnah Reminder
    sunnahReminder: {
      title: 'Daily Sunnah Reminder',
      text: 'The Prophet ﷺ inspired companions through his character and actions. He said the best of people are those who bring the most benefit to others. Use inspiration to serve Allah\'s creation.',
      reference: 'Al-Mu\'jam al-Awsat'
    },

    // ✨ NEW: Practical Tip
    practicalTip: {
      title: 'Practical Tip',
      text: 'When inspired, act quickly before the feeling fades. Start projects that benefit others. Recite "Rabbi ishrahli sadri" (My Lord, expand my chest). Document your ideas and seek Allah\'s guidance to implement them.'
    }
},

{
    id: 'embarrassed',
    label: 'Embarrassed',
    emoji: '😳',
    color: 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300',
    description: 'When embarrassment overwhelms you, remember that Allah sees your heart\'s intentions and that humility before Allah is more important than people\'s opinions.',
    verse: 'And whoever fears Allah - He will make for him a way out.',
    verseReference: 'Quran 65:2',
    hadith: 'The Prophet (PBUH) said: "Modesty (haya) brings nothing but good."',
    hadithReference: 'Sahih Bukhari',
    dua: 'رَبِّ اغْفِرْ لِي ذَنْبِي وَخَطَئِي وَجَهْلِي',
    duaTranslation: 'My Lord, forgive me my sin, my mistakes, and my ignorance.',
    advice: [
      'Use embarrassment as a means to develop humility',
      'Remember that everyone makes mistakes and faces awkward moments',
      'Focus on pleasing Allah rather than impressing people',
      'Learn from the situation to avoid similar mistakes',
      'Make sincere dua for Allah to ease your discomfort'
    ],
    youtubeVideoId: 'WtoHUGJbvlY?feature=share',
    videoTitle: 'Dealing with Shame and Embarrassment in Islam',

    // 😳 NEW: Daily Sunnah Reminder
    sunnahReminder: {
      title: 'Daily Sunnah Reminder',
      text: 'The Prophet ﷺ taught us that true shame should be before Allah, not people. He said modesty is part of faith, and a believer should have appropriate shame that leads to righteousness.',
      reference: 'Sahih Muslim'
    },

    // 😳 NEW: Practical Tip
    practicalTip: {
      title: 'Practical Tip',
      text: 'When embarrassed, seek Allah\'s forgiveness and protection. Remember that people\'s opinions are temporary, but Allah\'s mercy is eternal. Use this feeling to develop better character and avoid future mistakes.'
    }
},

{
    id: 'disappointed',
    label: 'Disappointed',
    emoji: '😞',
    color: 'bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-300',
    description: 'When disappointment weighs heavy on your heart, trust that Allah\'s plan is perfect and what seems like a setback may be protection or redirection.',
    verse: 'But perhaps you hate a thing and it is good for you; and perhaps you love a thing and it is bad for you. And Allah knows, while you know not.',
    verseReference: 'Quran 2:216',
    hadith: 'The Prophet (PBUH) said: "How wonderful is the affair of the believer, for his affairs are all good, and this applies to no one but the believer."',
    hadithReference: 'Sahih Muslim',
    dua: 'حَسْبِيَ اللَّهُ لا إِلَهَ إِلا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ',
    duaTranslation: 'Sufficient for me is Allah; there is no deity except Him. On Him I have relied, and He is the Lord of the Great Throne.',
    advice: [
      'Trust in Allah\'s wisdom even when you cannot see it',
      'Use disappointment as an opportunity to grow in patience',
      'Reflect on past disappointments that led to better outcomes',
      'Turn to Allah in prayer and seek comfort in His presence',
      'Remember that every difficulty contains hidden blessings'
    ],
    youtubeVideoId: 'YAKZ2jhG7T8',
    videoTitle: 'Finding Hope After Disappointment',

    // 😞 NEW: Daily Sunnah Reminder
    sunnahReminder: {
      title: 'Daily Sunnah Reminder',
      text: 'The Prophet ﷺ faced many disappointments but always trusted Allah\'s plan. After the Treaty of Hudaybiyyah, what seemed like disappointment became a great victory for Islam.',
      reference: 'Sahih Bukhari'
    },

    // 😞 NEW: Practical Tip
    practicalTip: {
      title: 'Practical Tip',
      text: 'When disappointed, pause and say "Hasbiya Allah" (Allah is sufficient for me). Reflect on Allah\'s past blessings. Make istikhara for future decisions and trust that Allah\'s timing is perfect.'
    }
},

{
    id: 'curious',
    label: 'Curious',
    emoji: '🤔',
    color: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300',
    description: 'When curiosity drives you to seek knowledge, remember that seeking beneficial knowledge is an act of worship that brings you closer to Allah.',
    verse: 'And say: "My Lord, increase me in knowledge."',
    verseReference: 'Quran 20:114',
    hadith: 'The Prophet (PBUH) said: "Whoever travels a path in search of knowledge, Allah will make easy for him a path to Paradise."',
    hadithReference: 'Sahih Muslim',
    dua: 'رَبِّ زِدْنِي عِلْماً',
    duaTranslation: 'My Lord, increase me in knowledge.',
    advice: [
      'Seek knowledge that brings you closer to Allah',
      'Ask questions about your faith to strengthen your understanding',
      'Balance religious and worldly knowledge appropriately',
      'Share beneficial knowledge with others',
      'Use curiosity to explore Allah\'s creation and His signs'
    ],
    youtubeVideoId: '8mUIS2vyT-Q',
    videoTitle: 'The Islamic Pursuit of Knowledge',

    // 🤔 NEW: Daily Sunnah Reminder
    sunnahReminder: {
      title: 'Daily Sunnah Reminder',
      text: 'The Prophet ﷺ encouraged seeking knowledge from cradle to grave. He said seeking knowledge is obligatory upon every Muslim, and that scholars are the inheritors of the Prophets.',
      reference: 'Abu Dawud'
    },

    // 🤔 NEW: Practical Tip
    practicalTip: {
      title: 'Practical Tip',
      text: 'When curious, channel it toward beneficial learning. Start with Islamic knowledge, then explore halal fields of study. Ask scholars authentic questions. Recite "Rabbi zidni ilman" (My Lord, increase me in knowledge) before learning.'
    }
},
{
    id: 'creative',
    label: 'Creative',
    emoji: '🎨',
    color: 'bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-900/30 dark:text-fuchsia-300',
    description: 'When creativity flows through you, remember that Allah is the ultimate Creator and use your gifts to benefit humanity.',
    verse: 'And Allah is the best of creators.',
    verseReference: 'Quran 23:14',
    hadith: 'The Prophet (PBUH) said: "Allah loves, when one of you does a job, that he does it with excellence (ihsan)."',
    hadithReference: 'Al-Bayhaqi',
    dua: 'رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي وَاحْلُلْ عُقْدَةً مِنْ لِسَانِي',
    duaTranslation: 'My Lord, expand for me my breast and ease for me my task and untie the knot from my tongue.',
    advice: [
      'Use creativity to serve Allah and benefit others',
      'Ensure your creative work aligns with Islamic values',
      'Share your talents to inspire and educate people',
      'Remember that all abilities are gifts from Allah',
      'Create art, literature, or solutions that reflect Islamic beauty'
    ],
    youtubeVideoId: '73t-v_0HL8M',
    videoTitle: 'Creativity and Innovation in Islam',

    // 🎨 NEW: Daily Sunnah Reminder
    sunnahReminder: {
      title: 'Daily Sunnah Reminder',
      text: 'The Prophet ﷺ appreciated beauty and creativity in all forms. He said Allah is beautiful and loves beauty. Islamic civilization flourished through creative expression in art, architecture, and sciences.',
      reference: 'Sahih Muslim'
    },

    // 🎨 NEW: Practical Tip
    practicalTip: {
      title: 'Practical Tip',
      text: 'When feeling creative, start with "Bismillah" and make intention to create something beneficial. Use your talents for dawah, education, or helping others. Remember that creativity is amanah (trust) from Allah.'
    }
},

{
    id: 'calm',
    label: 'Calm',
    emoji: '😌',
    color: 'bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300',
    description: 'When calmness envelops your soul, recognize it as a gift from Allah and use this serenity for worship and reflection.',
    verse: 'It is He who sent down tranquillity into the hearts of the believers.',
    verseReference: 'Quran 48:4',
    hadith: 'The Prophet (PBUH) said: "Gentleness adorns everything and its absence leaves everything defective."',
    hadithReference: 'Sahih Muslim',
    dua: 'اللَّهُمَّ أَنْزِلْ عَلَيْنَا سَكِينَةً مِنْ عِنْدِكَ',
    duaTranslation: 'O Allah, send down upon us tranquility from You.',
    advice: [
      'Use calm moments for deep reflection and dhikr',
      'Practice mindful breathing while remembering Allah',
      'Share your peaceful energy with agitated people around you',
      'Engage in quiet acts of worship like reading Quran',
      'Thank Allah for the blessing of inner peace'
    ],
    youtubeVideoId: 'calm919',
    videoTitle: 'Finding Serenity Through Islamic Practice',

    // 😌 NEW: Daily Sunnah Reminder
    sunnahReminder: {
      title: 'Daily Sunnah Reminder',
      text: 'The Prophet ﷺ was known for his calmness and composure. Even in difficult situations, he maintained tranquility and taught us that gentleness in all matters brings barakah.',
      reference: 'Sahih Muslim 2594'
    },

    // 😌 NEW: Practical Tip
    practicalTip: {
      title: 'Practical Tip',
      text: 'When calm, maximize this blessing through dhikr, meditation on Quranic verses, or helping others find peace. Use this state to make important duas and connect deeply with Allah.'
    }
},

{
    id: 'energetic',
    label: 'Energetic',
    emoji: '⚡',
    color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
    description: 'When energy surges through you, channel it toward righteous deeds and remember that strength comes from Allah.',
    verse: 'And prepare against them whatever you are able of power.',
    verseReference: 'Quran 8:60',
    hadith: 'The Prophet (PBUH) said: "A strong believer is better and more beloved to Allah than a weak believer."',
    hadithReference: 'Sahih Muslim',
    dua: 'اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ',
    duaTranslation: 'O Allah, help me to remember You, to thank You, and to worship You in the best manner.',
    advice: [
      'Use high energy for extra prayers and worship',
      'Engage in physical exercise as a form of gratitude to Allah',
      'Channel energy into helping family and community',
      'Pursue beneficial learning and skill development',
      'Remember that vitality is a trust from Allah to be used wisely'
    ],
    youtubeVideoId: 'bcglgTOpSxU',
    videoTitle: 'Using Energy for Islamic Excellence',

    // ⚡ NEW: Daily Sunnah Reminder
    sunnahReminder: {
      title: 'Daily Sunnah Reminder',
      text: 'The Prophet ﷺ valued physical and spiritual strength. He encouraged companions to maintain their health and use their energy for worship, jihad, and serving others.',
      reference: 'Sahih Muslim 2664'
    },

    // ⚡ NEW: Practical Tip
    practicalTip: {
      title: 'Practical Tip',
      text: 'When energetic, prioritize extra worship, exercise, helping others, or learning. Begin activities with "Bismillah" and remember Allah gave you this strength for righteous purposes.'
    }
},

{
    id: 'focused',
    label: 'Focused',
    emoji: '🎯',
    color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
    description: 'When focus sharpens your mind, use this clarity to excel in worship and worldly matters that please Allah.',
    verse: 'So when you have finished [your duties], then stand up [for worship]. And to your Lord direct [your] longing.',
    verseReference: 'Quran 94:7-8',
    hadith: 'The Prophet (PBUH) said: "When one of you prays, he is conversing with his Lord, so let him pay attention to how he converses with Him."',
    hadithReference: 'Sahih Bukhari',
    dua: 'رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي',
    duaTranslation: 'My Lord, expand for me my breast and ease for me my task.',
    advice: [
      'Use focused state for deep, concentrated prayer',
      'Study Quran or Islamic knowledge with full attention',
      'Complete important tasks with excellence and mindfulness',
      'Avoid distractions that take you away from remembering Allah',
      'Practice presence of mind during all daily activities'
    ],
    youtubeVideoId: 'focused121',
    videoTitle: 'Islamic Focus and Concentration',

    // 🎯 NEW: Daily Sunnah Reminder
    sunnahReminder: {
      title: 'Daily Sunnah Reminder',
      text: 'The Prophet ﷺ emphasized concentration in prayer and all activities. He taught us to be present with Allah in worship and mindful in our daily tasks.',
      reference: 'Sahih Bukhari'
    },

    // 🎯 NEW: Practical Tip
    practicalTip: {
      title: 'Practical Tip',
      text: 'When focused, tackle your most important tasks first. Use this clarity for deep prayer, Quran study, or solving problems. Minimize distractions and maintain awareness of Allah throughout.'
    }
},

{
    id: 'determined',
    label: 'Determined',
    emoji: '💯',
    color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
    description: 'When determination fills your heart, remember that perseverance in righteous deeds is beloved to Allah.',
    verse: 'And give good tidings to the patient, Who, when disaster strikes them, say, "Indeed we belong to Allah, and indeed to Him we will return."',
    verseReference: 'Quran 2:155-156',
    hadith: 'The Prophet (PBUH) said: "The deeds most loved by Allah are those done regularly, even if they are small."',
    hadithReference: 'Sahih Bukhari',
    dua: 'رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا وَثَبِّتْ أَقْدَامَنَا وَانصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ',
    duaTranslation: 'Our Lord, pour upon us patience and plant firmly our feet and give us victory over the disbelieving people.',
    advice: [
      'Channel determination toward consistent worship and good deeds',
      'Persist in seeking knowledge and self-improvement',
      'Never give up on making dua for important matters',
      'Use determination to break bad habits and build good ones',
      'Remember that Allah helps those who strive in His path'
    ],
    youtubeVideoId: 'determined222',
    videoTitle: 'Islamic Perseverance and Determination',

    // 💯 NEW: Daily Sunnah Reminder
    sunnahReminder: {
      title: 'Daily Sunnah Reminder',
      text: 'The Prophet ﷺ showed incredible determination in spreading Islam despite facing numerous obstacles. He taught us that consistent small deeds are better than sporadic large ones.',
      reference: 'Sahih Bukhari 6464'
    },

    // 💯 NEW: Practical Tip
    practicalTip: {
      title: 'Practical Tip',
      text: 'When determined, set clear Islamic goals and work toward them consistently. Break big tasks into smaller steps, make dua for success, and trust in Allah\'s help while taking action.'
    }
},

{
    id: 'annoyed',
    label: 'Annoyed',
    emoji: '😤',
    color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    description: 'When annoyance arises, remember that patience in small trials is a sign of strong faith and brings great reward.',
    verse: 'And give good tidings to the patient.',
    verseReference: 'Quran 2:155',
    hadith: 'The Prophet (PBUH) said: "Whoever controls his anger at the time when he has the power to act upon it, Allah will call him in front of all creatures on the Day of Judgment."',
    hadithReference: 'Abu Dawud',
    dua: 'أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ',
    duaTranslation: 'I seek refuge in Allah from Satan, the accursed.',
    advice: [
      'Take deep breaths and remember Allah before reacting',
      'Consider if this annoyance will matter in a year',
      'Practice forgiveness and overlook small faults in others',
      'Use annoyance as a test of your patience and character',
      'Make dua for the person or situation causing annoyance'
    ],
    youtubeVideoId: 'annoyed323',
    videoTitle: 'Dealing with Annoyance the Islamic Way',

    // 😤 NEW: Daily Sunnah Reminder
    sunnahReminder: {
      title: 'Daily Sunnah Reminder',
      text: 'The Prophet ﷺ rarely showed annoyance and taught us to control our reactions to minor irritations. He said the believer is not one who curses, uses foul language, or is ill-mannered.',
      reference: 'At-Tirmidhi'
    },

    // 😤 NEW: Practical Tip
    practicalTip: {
      title: 'Practical Tip',
      text: 'When annoyed, pause and seek refuge in Allah from Shaytan. Count to ten, perform wudu if possible, and respond with kindness. Remember that controlling annoyance builds strong character.'
    }
},
{
    id: 'blessed',
    label: 'Blessed',
    emoji: '🌟',
    color: 'bg-yellow-100 text-yellow-900 dark:bg-yellow-800/30 dark:text-yellow-200',
    description: 'When you feel blessed by Allah\'s countless bounties, remember that gratitude increases His blessings and brings you closer to Him.',
    verse: 'And [remember] when your Lord proclaimed, "If you are grateful, I will certainly give you more; but if you deny, indeed, My punishment is severe."',
    verseReference: 'Quran 14:7',
    hadith: 'The Prophet (PBUH) said: "Look at those who are beneath you and do not look at those who are above you, for it is more suitable that you should not consider as less the blessing of Allah."',
    hadithReference: 'Sahih Muslim',
    dua: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ الرَّحْمَنِ الرَّحِيمِ',
    duaTranslation: 'All praise is due to Allah, Lord of all the worlds, the Entirely Merciful, the Especially Merciful.',
    advice: [
      'Count your blessings daily and thank Allah for each one',
      'Use your blessings to help those less fortunate',
      'Share your gratitude with others to inspire thankfulness',
      'Remember that every blessing is a test and responsibility',
      'Perform sajdah shukr (prostration of gratitude) regularly'
    ],
    youtubeVideoId: 'MGVX8rpa3gc',
    videoTitle: 'Recognizing and Being Grateful for Allah\'s Blessings',

    // 🌟 NEW: Daily Sunnah Reminder
    sunnahReminder: {
      title: 'Daily Sunnah Reminder',
      text: 'The Prophet ﷺ lived a life of constant gratitude despite having little worldly possessions. He taught us that the one who is not grateful for little will not be grateful for much.',
      reference: 'At-Tirmidhi'
    },

    // 🌟 NEW: Practical Tip
    practicalTip: {
      title: 'Practical Tip',
      text: 'When feeling blessed, immediately say "Alhamdulillahi rabbil alameen" and perform sajdah shukr. Write down three specific blessings you\'re grateful for and find ways to use these blessings to serve others.'
    }
},

{
    id: 'spiritual',
    label: 'Spiritual',
    emoji: '🕌',
    color: 'bg-purple-100 text-purple-900 dark:bg-purple-800/30 dark:text-purple-200',
    description: 'When spiritual consciousness awakens in your heart, embrace this sacred connection with Allah and let it guide your actions and thoughts.',
    verse: 'And those who have believed and whose hearts are assured by the remembrance of Allah. Unquestionably, by the remembrance of Allah hearts are assured.',
    verseReference: 'Quran 13:28',
    hadith: 'The Prophet (PBUH) said: "The example of the one who remembers his Lord in comparison to the one who does not remember his Lord, is like that of the living compared to the dead."',
    hadithReference: 'Sahih Bukhari',
    dua: 'لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
    duaTranslation: 'There is no god but Allah alone, with no partner. His is the dominion and His is the praise, and He is able to do all things.',
    advice: [
      'Increase dhikr and remembrance of Allah throughout the day',
      'Engage in regular night prayers (Tahajjud) for deeper connection',
      'Read and contemplate the Quran with presence of heart',
      'Seek knowledge about Allah\'s names and attributes',
      'Spend time in nature reflecting on Allah\'s creation'
    ],
    youtubeVideoId: 'spiritual525',
    videoTitle: 'Deepening Your Spiritual Connection with Allah',

    // 🕌 NEW: Daily Sunnah Reminder
    sunnahReminder: {
      title: 'Daily Sunnah Reminder',
      text: 'The Prophet ﷺ maintained constant awareness of Allah in all his states. He said: "I know Allah better than you do," showing the highest level of spiritual consciousness and connection.',
      reference: 'Sahih Bukhari'
    },

    // 🕌 NEW: Practical Tip
    practicalTip: {
      title: 'Practical Tip',
      text: 'When feeling spiritual, maximize this sacred state through extra dhikr, longer prayers, Quran recitation, and seeking forgiveness. Use this connection to make sincere dua and strengthen your relationship with Allah.'
    }
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

                {/* YouTube Video Player */}
                {selectedDetailedMood?.youtubeVideoId ? (
                  <div className="aspect-video rounded-lg overflow-hidden mb-3 border border-red-200 dark:border-red-700 shadow">
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${selectedDetailedMood.youtubeVideoId}`}
                      title={selectedDetailedMood.videoTitle}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                ) : (
                  <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg mb-3 flex items-center justify-center">
                    <div className="text-center">
                      <Play className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500 text-sm">Video Player</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-red-700 dark:text-red-300">
                    {selectedDetailedMood.videoTitle}
                  </h4>
                  {selectedDetailedMood?.youtubeVideoId && (
                    <a
                      href={`https://www.youtube.com/watch?v=${selectedDetailedMood.youtubeVideoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4 mr-1" />
                      <span className="text-sm">Watch</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Sunnah Reminder (dynamic) */}
              {selectedDetailedMood.sunnahReminder && (
                <div className="bg-gradient-to-r from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-800/20 p-6 rounded-xl border-l-4 border-green-400 mt-6">
                  <h3 className="font-semibold text-green-800 dark:text-green-300 mb-3 flex items-center">
                    🕊 {selectedDetailedMood.sunnahReminder.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    {selectedDetailedMood.sunnahReminder.text}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">— {selectedDetailedMood.sunnahReminder.reference}</p>
                </div>
              )}

              {/* Practical Tip (dynamic) */}
              {selectedDetailedMood.practicalTip && (
                <div className="bg-gradient-to-r from-yellow-50 to-amber-100 dark:from-yellow-900/20 dark:to-amber-800/20 p-6 rounded-xl border-l-4 border-yellow-400 mt-4">
                  <h3 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-3 flex items-center">
                    🧭 {selectedDetailedMood.practicalTip.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    {selectedDetailedMood.practicalTip.text}
                  </p>
                </div>
              )}


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
      <Helmet>
        <title>Islamic Mood Selector - Personalized Spiritual Guidance | Qalam Verse</title>
        <meta name="description" content="Select your current mood to receive personalized Islamic guidance, Quranic verses, Hadith wisdom, and spiritual support tailored to your emotional state and spiritual needs." />
        <meta name="keywords" content="Islamic Mood Selector, Personalized Islamic Guidance, Emotional Support Islam, Islamic Psychology, Spiritual Mood, Islamic Counseling, Faith-based Guidance" />
        <link rel="canonical" href="https://sheikhsohail007.github.io/Ummah/#/mood" />
      </Helmet>

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
            className={`p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg ${selectedMood?.id === mood.id
              ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 shadow-lg transform scale-105'
              : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-emerald-300'
              }`}
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center mb-3 mx-auto">
              <div className="w-6 h-6 bg-white rounded-full opacity-80"></div>
            </div>
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
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center mr-3">
              <div className="w-6 h-6 bg-white rounded-full opacity-80"></div>
            </div>
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