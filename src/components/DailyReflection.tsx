import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Heart, RefreshCw, Calendar, Star, BookOpen, Clock, User, Quote } from 'lucide-react';
import { Mood } from '../App';

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
  hadith?: string;
  hadithReference?: string;
  practicalTips: string[];
  reflection: string;
  tags: string[];
  readTime: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  relatedTopics: string[];
}

function DailyReflection({ selectedMood }: DailyReflectionProps) {
  const [currentReflection, setCurrentReflection] = useState<Reflection | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const reflections: Reflection[] = [
    {
      id: '1',
      title: 'Finding Peace in Confusion',
      content: 'When life seems overwhelming and unclear, remember that Allah (SWT) has a perfect plan for you. Confusion often arises when we try to control outcomes that are beyond our reach. The beauty of Islam lies in teaching us to surrender our worries to Allah while taking the necessary steps forward. Sometimes the fog of confusion is lifted through sincere prayer, patient reflection, and unwavering trust in His infinite wisdom. Take time today to make dua, seek guidance through istikharah, and remember that every challenge is an opportunity for spiritual growth.',
      author: 'Sheikh Abdullah Al-Mahmud',
      category: 'Spiritual Clarity',
      moods: ['confused', 'overwhelmed', 'uncertain', 'worried'],
      verse: 'And whoever relies upon Allah - then He is sufficient for him. Indeed, Allah will accomplish His purpose.',
      verseReference: 'Quran 65:3',
      hadith: 'The Prophet (PBUH) said: "How wonderful is the affair of the believer, for his affairs are all good, and this applies to no one but the believer. If something good happens to him, he is thankful for it and that is good for him. If something bad happens to him, he bears it with patience and that is good for him."',
      hadithReference: 'Sahih Muslim',
      practicalTips: [
        'Perform Salat al-Istikharah (Prayer for Guidance) when facing difficult decisions',
        'Make a list of your concerns and address them one by one through prayer and action',
        'Seek counsel from knowledgeable and trustworthy people in your community',
        'Read Surah Al-Fatiha with contemplation, focusing on "Guide us to the straight path"',
        'Practice dhikr (remembrance of Allah) especially "Hasbunallahu wa ni\'mal wakeel"'
      ],
      reflection: 'Confusion is not a sign of weakness; it\'s a human condition that brings us closer to Allah. When we acknowledge our limitations and seek His guidance, we open our hearts to divine wisdom that surpasses our understanding.',
      tags: ['guidance', 'trust', 'patience', 'prayer', 'wisdom'],
      readTime: '5 min',
      difficulty: 'Beginner',
      relatedTopics: ['Prayer for Guidance', 'Trust in Allah', 'Dealing with Uncertainty']
    },
    {
      id: '2',
      title: 'Gratitude: The Key to Contentment',
      content: 'When happiness fills your heart, remember to thank Allah (SWT) for His countless blessings. Gratitude is not just a feeling but a conscious practice that transforms our perspective on life. The Prophet (PBUH) taught us that gratitude increases blessings, while ingratitude leads to their decrease. Joy is a gift from the Almighty, and acknowledging this makes our happiness even more meaningful and lasting. True gratitude goes beyond saying "Alhamdulillah" - it involves recognizing Allah\'s hand in every blessing, big and small, and using our blessings to serve others and draw closer to Him.',
      author: 'Dr. Aisha Rahman',
      category: 'Spiritual Gratitude',
      moods: ['happy', 'grateful', 'joyful', 'content', 'thankful'],
      verse: 'And [remember] when your Lord proclaimed, "If you are grateful, I will certainly give you more."',
      verseReference: 'Quran 14:7',
      hadith: 'The Prophet (PBUH) said: "He who does not thank people, does not thank Allah."',
      hadithReference: 'Abu Dawud and Tirmidhi',
      practicalTips: [
        'Keep a daily gratitude journal, writing down 3 things you\'re thankful for each day',
        'Begin each prayer by reflecting on Allah\'s blessings before making requests',
        'Express gratitude to people who have helped you - parents, teachers, friends',
        'Give charity (sadaqah) as a practical expression of gratitude for your blessings',
        'Recite "Alhamdulillahi rabbil alameen" with deep contemplation of its meaning'
      ],
      reflection: 'Gratitude is the foundation of a content heart. When we truly appreciate what we have, we realize that Allah has already given us more than we deserve, and this realization brings profound peace and satisfaction.',
      tags: ['gratitude', 'contentment', 'blessings', 'charity', 'mindfulness'],
      readTime: '4 min',
      difficulty: 'Beginner',
      relatedTopics: ['Daily Dhikr', 'Charity and Giving', 'Mindful Living']
    },
    {
      id: '3',
      title: 'Strength Through Sadness',
      content: 'Sadness is part of the human experience, and it can bring us closer to Allah in ways that happiness sometimes cannot. In our moments of sorrow, we turn to Him with sincere hearts, stripped of pretense and pride. The Prophet (PBUH) himself experienced deep sadness - the loss of loved ones, rejection by his people, and the weight of his mission. Yet he taught us that every difficulty is followed by ease, and this too shall pass. Sadness teaches us empathy, humility, and dependence on Allah. It reminds us that this world is temporary and that our true home is with Allah. When we embrace sadness as a teacher rather than an enemy, we find that it purifies our hearts and strengthens our faith.',
      author: 'Imam Yusuf Al-Qaradawi',
      category: 'Emotional Healing',
      moods: ['sad', 'hurt', 'lonely', 'disappointed', 'grieving'],
      verse: 'So verily, with the hardship, there is relief. Verily, with the hardship, there is relief.',
      verseReference: 'Quran 94:5-6',
      hadith: 'The Prophet (PBUH) said: "No fatigue, nor disease, nor sorrow, nor sadness, nor hurt, nor distress befalls a Muslim, not even if it were the prick he receives from a thorn, but that Allah expiates some of his sins for that."',
      hadithReference: 'Sahih Bukhari',
      practicalTips: [
        'Allow yourself to feel sadness without guilt - it\'s a natural human emotion',
        'Turn to Allah in sincere dua during your lowest moments',
        'Read the stories of prophets who faced great trials and remained steadfast',
        'Seek comfort in the company of righteous friends and family',
        'Engage in acts of worship that bring you peace - prayer, Quran recitation, dhikr'
      ],
      reflection: 'Sadness is not a punishment but a purification. It washes away our sins, softens our hearts, and reminds us of our need for Allah. Through sadness, we learn compassion for others who suffer.',
      tags: ['patience', 'healing', 'trials', 'purification', 'empathy'],
      readTime: '6 min',
      difficulty: 'Intermediate',
      relatedTopics: ['Dealing with Loss', 'Patience in Trials', 'Emotional Wellness']
    },
    {
      id: '4',
      title: 'Transforming Anxiety into Trust',
      content: 'Anxiety often stems from fear of the unknown and our desire to control outcomes that are beyond our reach. Islam teaches us that our sustenance, our health, our relationships, our future - everything is in Allah\'s hands. When we truly internalize this fundamental truth, anxiety begins to transform into peaceful surrender. The Arabic word "tawakkul" encompasses this beautiful concept of relying on Allah after taking necessary action. It\'s not passive resignation but active trust. We plan, we work, we strive, but we leave the results to Allah. This doesn\'t mean we become careless or lazy; rather, we do our best and trust Allah with the rest. When anxiety creeps in, remember that Allah knows what\'s best for you better than you know yourself.',
      author: 'Dr. Yasmin Mogahed',
      category: 'Mental Peace',
      moods: ['anxious', 'worried', 'stressed', 'scared', 'overwhelmed'],
      verse: 'And it is He who created the heavens and earth in truth. And the day He says, "Be," and it is, His word is the truth.',
      verseReference: 'Quran 6:73',
      hadith: 'The Prophet (PBUH) said: "If you put your trust completely in Allah, He will arrange for your sustenance in the same way as He provides for the birds. They go out in the morning with their stomachs empty and return filled in the evening."',
      hadithReference: 'Tirmidhi',
      practicalTips: [
        'Practice deep breathing while reciting "La hawla wa la quwwata illa billah"',
        'Make a plan for your concerns, then make dua and leave the results to Allah',
        'Recite Ayat al-Kursi when feeling anxious - it brings peace and protection',
        'Remember that Allah tests those He loves to purify and elevate them',
        'Engage in regular dhikr, especially "Hasbunallahu wa ni\'mal wakeel"'
      ],
      reflection: 'Anxiety is often a sign that we\'re trying to carry burdens that belong to Allah. When we surrender our worries to Him and trust in His plan, we find a peace that surpasses all understanding.',
      tags: ['trust', 'surrender', 'peace', 'tawakkul', 'faith'],
      readTime: '5 min',
      difficulty: 'Intermediate',
      relatedTopics: ['Trust in Allah', 'Managing Stress', 'Dhikr and Remembrance']
    },
    {
      id: '5',
      title: 'Channeling Motivation for Good',
      content: 'When you feel motivated and energized, recognize this as a blessing and gift from Allah (SWT). This drive you feel is not coincidental - it\'s divine inspiration pushing you toward righteousness and beneficial action. The key is to channel this energy wisely toward deeds that will benefit you in this life and the next. Motivation without direction can lead to wasted effort, but motivation guided by Islamic principles becomes a powerful force for positive change. Use this energy to help others, improve yourself spiritually and intellectually, strengthen your relationship with your Creator, and contribute positively to your community. Remember that every good deed done with sincere intention becomes an act of worship.',
      author: 'Sheikh Omar Suleiman',
      category: 'Productive Action',
      moods: ['motivated', 'inspired', 'excited', 'energetic', 'determined'],
      verse: 'And whoever does righteous deeds, whether male or female, while being a believer - those will enter Paradise.',
      verseReference: 'Quran 4:124',
      hadith: 'The Prophet (PBUH) said: "The believer who mixes with people and bears their annoyance with patience will have a greater reward than the believer who does not mix with people and does not put up with their annoyance."',
      hadithReference: 'Tirmidhi',
      practicalTips: [
        'Set specific, measurable goals that align with Islamic values',
        'Use your energy to help family members, neighbors, or community members in need',
        'Dedicate time to learning - study Quran, hadith, or beneficial worldly knowledge',
        'Start or join a charitable project that addresses real community needs',
        'Use your motivation to establish or improve good habits like regular prayer, dhikr, or exercise'
      ],
      reflection: 'Motivation is a trust from Allah. When we use our energy and enthusiasm for righteous purposes, we multiply our rewards and create lasting positive impact in the world.',
      tags: ['action', 'purpose', 'charity', 'community', 'righteousness'],
      readTime: '4 min',
      difficulty: 'Beginner',
      relatedTopics: ['Community Service', 'Personal Development', 'Righteous Deeds']
    },
    {
      id: '6',
      title: 'Rest as an Act of Worship',
      content: 'Being tired is not a weakness or failure; it\'s a reminder of our human limitations and our constant need for Allah\'s strength and mercy. In our productivity-obsessed world, we often feel guilty for needing rest, but Islam teaches us that caring for our bodies and minds is actually a religious obligation. The Prophet (PBUH) emphasized moderation in all things, including worship and work. He said, "Your body has a right over you." Taking proper rest allows us to worship Allah more effectively, serve others better, and maintain the physical and mental health that Allah has entrusted to us. Rest becomes an act of worship when we approach it with gratitude and the intention of preparing ourselves to serve Allah better.',
      author: 'Dr. Ingrid Mattson',
      category: 'Self-Care & Balance',
      moods: ['tired', 'overwhelmed', 'exhausted', 'burned out'],
      verse: 'And We made from them leaders guiding by Our command when they were patient.',
      verseReference: 'Quran 21:73',
      hadith: 'The Prophet (PBUH) said: "Take on only as much as you can do of good deeds, for the best of deeds is that which is done consistently, even if it is small."',
      hadithReference: 'Sahih Bukhari',
      practicalTips: [
        'Establish a consistent sleep schedule that allows for adequate rest',
        'Take short breaks during the day for dhikr and reflection',
        'Practice saying "Alhamdulillah" when you wake up, grateful for rest and renewal',
        'Use rest time for light dhikr or listening to Quran recitation',
        'Remember that taking care of your health is preparing you to serve Allah better'
      ],
      reflection: 'Rest is not laziness when it\'s taken with the right intention. It\'s preparation for worship, service, and fulfilling our responsibilities as Muslims in this world.',
      tags: ['balance', 'health', 'moderation', 'self-care', 'gratitude'],
      readTime: '4 min',
      difficulty: 'Beginner',
      relatedTopics: ['Work-Life Balance', 'Physical Health', 'Sustainable Worship']
    },
    {
      id: '7',
      title: 'The Worship of Contentment',
      content: 'True peace and contentment come not from having everything go our way, but from accepting Allah\'s decree with grace and wisdom. Contentment (rida) is one of the highest spiritual stations in Islam. It means being pleased with Allah\'s choices for us, even when they don\'t align with our desires. This doesn\'t mean we become passive or stop striving for improvement; rather, we work hard while maintaining inner peace about the outcomes. The contented heart finds Allah\'s wisdom in every situation - in blessings and trials, in ease and difficulty, in gain and loss. This state of contentment is itself a form of worship, as it demonstrates complete trust in Allah\'s perfect knowledge and infinite mercy.',
      author: 'Imam Al-Ghazali (adapted)',
      category: 'Spiritual Contentment',
      moods: ['peaceful', 'content', 'relaxed', 'satisfied'],
      verse: 'Those who have believed and whose hearts are assured by the remembrance of Allah. Unquestionably, by the remembrance of Allah hearts are assured.',
      verseReference: 'Quran 13:28',
      hadith: 'The Prophet (PBUH) said: "Richness is not having many possessions, but richness is being content with oneself."',
      hadithReference: 'Sahih Bukhari',
      practicalTips: [
        'Practice saying "Alhamdulillahi rabbil alameen" in all circumstances',
        'Reflect on the wisdom behind Allah\'s choices for you, even in difficult times',
        'Regularly engage in dhikr, especially "Radeetu billahi rabban, wa bil Islami deenan, wa bi Muhammadin rasoolan"',
        'Spend time in nature, contemplating Allah\'s creation and perfect design',
        'Read about the lives of the righteous predecessors who found contentment in simple living'
      ],
      reflection: 'Contentment is the treasure that never depletes. When we find satisfaction in Allah\'s choices for us, we discover a wealth that no external circumstance can take away.',
      tags: ['contentment', 'acceptance', 'peace', 'wisdom', 'trust'],
      readTime: '5 min',
      difficulty: 'Advanced',
      relatedTopics: ['Spiritual Contentment', 'Accepting Allah\'s Decree', 'Inner Peace']
    },
    {
      id: '8',
      title: 'The Mercy in Every Breath',
      content: 'Every breath we take is an unasked favor from Allah, yet how often do we acknowledge this continuous mercy? The Arabic word "Rahman" (The Most Merciful) comes from the root that means "womb" - signifying the nurturing, encompassing nature of Allah\'s mercy that surrounds us like a mother\'s womb surrounds her child. This mercy is not conditional on our perfection; it flows to the righteous and the sinner alike. Recognizing Allah\'s mercy in the smallest details of our existence - from the beating of our heart to the changing of seasons - transforms our relationship with both gratitude and humility. When we truly understand that we are swimming in an ocean of divine mercy, our hearts soften toward others and our complaints dissolve into praise.',
      author: 'Ibn Qayyim Al-Jawziyyah (adapted)',
      category: 'Divine Mercy',
      moods: ['grateful', 'humble', 'peaceful', 'contemplative'],
      verse: 'And it is He who sends down rain from heaven, and We produce thereby the vegetation of every kind.',
      verseReference: 'Quran 6:99',
      hadith: 'The Prophet (PBUH) said: "Allah has one hundred parts of mercy, of which He sent down only one between the jinn, mankind, the animals and the insects."',
      hadithReference: 'Sahih Bukhari',
      practicalTips: [
        'Begin each day by consciously acknowledging three mercies you received while sleeping (protection, rest, waking up healthy)',
        'Practice the dhikr "Ar-Rahman" (The Most Merciful) 100 times daily while reflecting on His endless mercy',
        'When you see rain, remember it as a sign of Allah\'s mercy and make dua for forgiveness',
        'Before eating, pause to recognize the mercy in having sustenance when millions go hungry',
        'End disagreements by remembering that both you and the other person are recipients of Allah\'s mercy'
      ],
      reflection: 'Mercy recognized becomes mercy multiplied. The more we see Allah\'s mercy in our lives, the more merciful we become toward His creation.',
      tags: ['mercy', 'gratitude', 'awareness', 'compassion', 'divine attributes'],
      readTime: '5 min',
      difficulty: 'Beginner',
      relatedTopics: ['Divine Attributes', 'Gratitude Practice', 'Mindful Living']
    },

    {
      id: '9',
      title: 'The Purification of the Heart',
      content: 'The heart in Islamic tradition is not merely an organ that pumps blood, but the spiritual center of our being - the seat of faith, intention, and consciousness. A pure heart (qalb saleem) is one that is free from the spiritual diseases of pride, envy, hatred, and doubt. It is a heart that beats in harmony with divine guidance, finding peace in remembrance of Allah and unrest in His disobedience. The purification of the heart is a lifelong journey that requires constant vigilance, sincere repentance, and regular spiritual maintenance. Just as we clean our physical bodies daily, our hearts need daily cleansing through dhikr, reflection, seeking forgiveness, and avoiding sins. A purified heart becomes a mirror that reflects divine light, guiding us toward truth and away from falsehood in every decision we make.',
      author: 'Imam Al-Ghazali (adapted)',
      category: 'Spiritual Purification',
      moods: ['reflective', 'determined', 'hopeful', 'serious'],
      verse: 'The Day when there will not benefit [anyone] wealth or children. But only one who comes to Allah with a sound heart.',
      verseReference: 'Quran 26:88-89',
      hadith: 'The Prophet (PBUH) said: "Truly in the body there is a morsel of flesh which, if it be whole, all the body is whole and which, if it be diseased, all of it is diseased. Truly it is the heart."',
      hadithReference: 'Sahih Bukhari & Muslim',
      practicalTips: [
        'Perform regular spiritual self-audits by asking: "What diseases might be in my heart today?" (pride, envy, anger, etc.)',
        'Recite "Astaghfirullah" 100 times daily as spiritual detox for your heart',
        'Avoid looking at, listening to, or engaging with content that hardens the heart',
        'Spend 10 minutes in silent dhikr daily, focusing on "La hawla wa la quwwata illa billah"',
        'Make sincere tawbah (repentance) before sleeping, asking Allah to purify your heart from any spiritual ailments'
      ],
      reflection: 'A clean heart is a compass that always points toward Allah. Every act of purification brings us closer to our true nature and divine purpose.',
      tags: ['purification', 'heart', 'spirituality', 'tawbah', 'self-improvement'],
      readTime: '6 min',
      difficulty: 'Intermediate',
      relatedTopics: ['Spiritual Development', 'Tawbah and Forgiveness', 'Inner Purification']
    },

    {
      id: '10',
      title: 'The Beauty of Consistent Small Acts',
      content: 'In our achievement-oriented world, we often overlook the profound power of small, consistent actions. The Prophet (PBUH) emphasized that the most beloved deeds to Allah are those done consistently, even if they are small. A daily dhikr of 10 minutes is more valuable than an hour of remembrance done sporadically. Consistency (istiqamah) builds spiritual momentum - each small act becomes a foundation for the next, creating an upward spiral of righteousness. This principle applies not just to worship, but to character development, relationships, and personal growth. The drop that falls consistently will eventually fill the ocean. Small acts of kindness, brief moments of reflection, gentle words spoken daily - these create lasting transformation in ways that dramatic gestures cannot. Consistency is the bridge between intention and transformation.',
      author: 'Based on Prophetic Guidance',
      category: 'Consistent Practice',
      moods: ['motivated', 'determined', 'practical', 'encouraged'],
      verse: 'So whoever does an atom\'s weight of good will see it.',
      verseReference: 'Quran 99:7',
      hadith: 'The Prophet (PBUH) said: "The most beloved of deeds to Allah are those that are most consistent, even if they are few."',
      hadithReference: 'Sahih Bukhari & Muslim',
      practicalTips: [
        'Choose one small Islamic practice (like saying "SubhanAllah" 10 times after each prayer) and commit to it for 40 days',
        'Track your consistency in a simple chart - seeing your streak motivates continuation',
        'Start with 2-minute practices rather than ambitious hour-long commitments',
        'Link new small habits to existing ones (e.g., make istighfar every time you open your phone)',
        'Celebrate small wins - acknowledge when you complete a week of consistent practice'
      ],
      reflection: 'Excellence is not an act but a habit. The tree that bears the sweetest fruit grows slowly but surely, rooted in daily nourishment.',
      tags: ['consistency', 'habits', 'gradual improvement', 'perseverance', 'discipline'],
      readTime: '4 min',
      difficulty: 'Beginner',
      relatedTopics: ['Building Islamic Habits', 'Spiritual Consistency', 'Personal Development']
    },

    {
      id: '11',
      title: 'The Wisdom in Divine Timing',
      content: 'Allah\'s timing is perfect, even when our human understanding cannot comprehend its wisdom. What appears as delay might be divine preparation; what seems like closure might be divine protection. The concept of "Qadar" teaches us that every moment unfolds according to divine wisdom that encompasses past, present, and future in ways our limited perception cannot grasp. Sometimes we are not given what we want when we want it because we are not ready to handle it properly, or because something better awaits us at the appointed time. Learning to trust divine timing requires releasing our attachment to our own timeline and embracing the peace that comes from knowing that the One who created time itself knows exactly when each blessing, test, or opportunity should arrive in our lives. This trust transforms anxiety into anticipation and disappointment into curious wonder about what wisdom lies beneath the surface.',
      author: 'Ibn Taymiyyah (adapted)',
      category: 'Divine Decree',
      moods: ['patient', 'trusting', 'peaceful', 'philosophical'],
      verse: 'And Allah is the best of planners.',
      verseReference: 'Quran 8:30',
      hadith: 'The Prophet (PBUH) said: "How wonderful is the affair of the believer, for all his affairs are good, and this applies to no one except the believer."',
      hadithReference: 'Sahih Muslim',
      practicalTips: [
        'When facing delays, repeat "HasbunAllahu wa ni\'mal wakeel" (Allah is sufficient for us and He is the best disposer of affairs)',
        'Keep a "divine timing journal" - note instances where delays led to better outcomes',
        'Practice saying "Tawakkaltu \'alAllah" (I trust in Allah) before important decisions or when feeling anxious about timing',
        'Make du\'a asking Allah to grant you what is best for you at the best time for you',
        'Study the seerah to see how Allah\'s timing worked perfectly in the Prophet\'s life, even through apparent setbacks'
      ],
      reflection: 'Divine timing is divine mercy. What feels like a detour to us is often the most direct path in Allah\'s perfect plan.',
      tags: ['timing', 'qadar', 'patience', 'trust', 'divine wisdom'],
      readTime: '5 min',
      difficulty: 'Advanced',
      relatedTopics: ['Trusting Allah\'s Decree', 'Patience in Trials', 'Divine Wisdom']
    },
    {
      id: '8',
      title: 'The Morning Intention: A Day of Worship',
      content: 'Before the day\'s rush begins, we must set our spiritual compass with clear intention (niyyah). The Prophet (PBUH) taught us that all deeds are judged by their intentions, making this the foundation of a meaningful Islamic life. By sincerely dedicating your day\'s work, studies, relationships, and even rest to seeking Allah\'s pleasure, you transform every mundane task into an act of worship. This simple mental shift fills your entire day with barakah (divine blessing) and purpose. When you drive to work with the intention of earning halal sustenance for your family, that commute becomes worship. When you study with the intention of gaining knowledge to serve Allah\'s creation, that effort earns divine reward. The beauty of proper intention is that it doesn\'t require you to change your schedule - it transforms the spiritual value of everything you already do.',
      author: 'Based on Prophetic Guidance',
      category: 'Daily Intention',
      moods: ['motivated', 'purposeful', 'focused', 'spiritual'],
      verse: 'And I did not create the jinn and mankind except to worship Me.',
      verseReference: 'Quran 51:56',
      hadith: 'The Prophet (PBUH) said: "The most beloved deeds to Allah are the most consistent, even if they are small."',
      hadithReference: 'Sahih Al-Bukhari',
      practicalTips: [
        'Upon waking, say the morning dua and verbally state: "O Allah, I intend to make this day for Your pleasure"',
        'Before starting any specific task, make a quick silent intention (e.g., "I am doing this to provide halal sustenance for my family")',
        'Renew your intention throughout the day when you feel distracted or weary',
        'Write down 3 major activities of your day and set a clear Islamic intention for each',
        'End your day by reflecting on which activities you performed with proper intention and which you forgot'
      ],
      reflection: 'Your entire life can be a continuous act of worship. The one who sleeps with the intention to gain strength to worship Allah is rewarded, just as the one who is praying.',
      tags: ['intention', 'niyyah', 'productivity', 'worship', 'focus', 'sincerity'],
      readTime: '4 min',
      difficulty: 'Beginner',
      relatedTopics: ['Islamic Productivity', 'Daily Worship', 'Spiritual Mindfulness']
    },

    {
      id: '9',
      title: 'The Anchor of Gratitude',
      content: 'In our relentless pursuit of what we lack, we often overlook the immense blessings already present in our lives. Gratitude (Shukr) in Islam is not merely a feeling of appreciation - it is a comprehensive act of worship that involves the heart, tongue, and limbs. True gratitude recognizes Allah as the source of every blessing, expresses this recognition through praise and dhikr, and demonstrates it through righteous action and sharing with others. A grateful heart becomes a magnet for more blessings, as Allah promises to increase His favors upon those who are thankful. Moreover, gratitude serves as a powerful antidote to the spiritual diseases of envy, dissatisfaction, and anxiety. When we truly internalize that every breath, every meal, every moment of safety is a direct gift from our Creator, our entire perspective on life transforms from scarcity to abundance.',
      author: 'Based on Quranic Teaching',
      category: 'Spiritual Gratitude',
      moods: ['grateful', 'content', 'joyful', 'mindful'],
      verse: 'And [remember] when your Lord proclaimed, "If you are grateful, I will surely increase you [in favor]..."',
      verseReference: 'Quran 14:7',
      hadith: 'The Prophet (PBUH) said: "Whoever is not grateful to the people, he is not grateful to Allah."',
      hadithReference: 'Sunan At-Tirmidhi',
      practicalTips: [
        'Every morning, verbally name three specific blessings you are grateful for (e.g., your sight, a comfortable bed, clean water)',
        'Send a message to thank one person daily for something big or small they have done for you',
        'When difficulty arises, consciously find one thing within it to be grateful for (e.g., a delayed train allows time for dhikr)',
        'Keep a gratitude journal where you write down 5 blessings before sleeping each night',
        'Replace complaints with "Alhamdulillah" - train your tongue to default to praise rather than criticism'
      ],
      reflection: 'Gratitude is recognizing that the Giver is more important than the gift. A grateful soul finds divine mercy even in life\'s difficulties, knowing that Allah\'s wisdom encompasses all.',
      tags: ['gratitude', 'shukr', 'mindfulness', 'contentment', 'blessings'],
      readTime: '4 min',
      difficulty: 'Beginner',
      relatedTopics: ['Contentment Practice', 'Divine Blessings', 'Positive Mindset']
    },

    {
      id: '10',
      title: 'The Patience of the Tongue',
      content: 'The tongue, though small in size, wields enormous power in determining our spiritual destiny. How many lifelong regrets stem from words spoken in a moment of anger, frustration, or carelessness? Patience (Sabr) with our speech represents one of the most challenging yet rewarding forms of self-restraint in Islam. Every harsh word restrained, every piece of gossip avoided, every complaint transformed into dhikr becomes a mighty act of jihad (struggle) against our lower desires. The patient tongue is the guardian of the heart\'s purity and the protector of relationships. When we master our speech, we demonstrate mastery over our emotions, reactions, and impulses. This form of patience requires constant vigilance, as the tongue can destroy in seconds what took years to build. Yet for those who persevere, the reward is immense - preserved friendships, protected honor, and elevated rank with Allah.',
      author: 'Imam An-Nawawi (adapted)',
      category: 'Speech Control',
      moods: ['patient', 'self-controlled', 'wise', 'reflective'],
      verse: 'And the servants of the Most Merciful are those who walk upon the earth easily, and when the ignorant address them [harshly], they say [words of] peace.',
      verseReference: 'Quran 25:63',
      hadith: 'The Prophet (PBUH) said: "Whoever believes in Allah and the Last Day, let him speak good or remain silent."',
      hadithReference: 'Sahih Al-Bukhari & Muslim',
      practicalTips: [
        'Practice the "3-second rule": Before speaking, especially when upset, pause and ask: Is it true? Is it kind? Is it necessary?',
        'When feeling anger rising, immediately make wudu (ablution) - water extinguishes the fire of shaytan',
        'Replace every complaint with "Alhamdulillah" or seek refuge in Allah from Satan by saying "A\'udhu billahi min ash-shaytani\'r-rajeem"',
        'Set a daily goal to avoid saying anything negative about any person for the entire day',
        'When someone speaks harshly to you, respond with "Barakallahu feek" (May Allah bless you) and walk away if necessary'
      ],
      reflection: 'A moment of patience in a moment of anger saves a thousand moments of regret. Your silence is not weakness; it is strength that protects your heart and preserves your good deeds.',
      tags: ['patience', 'sabr', 'speech', 'anger management', 'self-restraint', 'character'],
      readTime: '5 min',
      difficulty: 'Intermediate',
      relatedTopics: ['Character Development', 'Anger Management', 'Social Ethics']
    },

    {
      id: '11',
      title: 'Trust in the Divine Plan',
      content: 'True peace emerges not when everything goes according to our plans, but when we align our hearts with Allah\'s perfect decree. Tawakkul (trust in Allah) represents the pinnacle of spiritual maturity - it means putting forth your absolute best effort while maintaining complete serenity about the outcome. This concept transcends passive resignation; it embodies active trust combined with diligent work. When we truly understand that Allah is Ar-Rahman (The Most Merciful), Al-Hakeem (The All-Wise), and Al-Khabeer (The All-Aware), we realize that His choices for us are always ultimately for our benefit, even when our limited understanding cannot perceive the wisdom. Tawakkul transforms anxiety into anticipation, disappointment into curious wonder about divine wisdom, and fear into confident reliance on Allah\'s perfect timing and infinite mercy.',
      author: 'Ibn Rajab Al-Hanbali (adapted)',
      category: 'Divine Trust',
      moods: ['trusting', 'peaceful', 'surrendered', 'confident'],
      verse: '...And whoever relies upon Allah - then He is sufficient for him. Indeed, Allah will accomplish His purpose.',
      verseReference: 'Quran 65:3',
      hadith: 'The Prophet (PBUH) said: "How wonderful is the affair of the believer, for all his affairs are good. If something good happens to him, he is thankful, and that is good for him. If something bad happens to him, he bears it with patience, and that is good for him."',
      hadithReference: 'Sahih Muslim',
      practicalTips: [
        'After making du\'a for any need, conclude with: "...and make the outcome of my affair good for me in this life and the next"',
        'When faced with unexpected results, say "Qadarullah wa ma sha\'a fa\'al" (This is Allah\'s decree and what He willed, He did)',
        'Do your absolute best in any endeavor, then consciously release attachment to the outcome',
        'Recite "Hasbunallahu wa ni\'mal wakeel" (Allah is sufficient for us and He is the best disposer of affairs) during times of uncertainty',
        'Study the seerah to see how Allah\'s perfect timing worked in the Prophet\'s life, even through apparent setbacks'
      ],
      reflection: 'Tawakkul is the ship that carries you safely through storms of uncertainty. Allah\'s delays are not denials; His "no" to one thing is often His "yes" to something immeasurably better.',
      tags: ['tawakkul', 'trust', 'surrender', 'peace', 'divine decree', 'qadar'],
      readTime: '5 min',
      difficulty: 'Advanced',
      relatedTopics: ['Trusting Allah\'s Decree', 'Spiritual Surrender', 'Divine Wisdom']
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
    setExpandedSection(null);
    setTimeout(() => {
      setCurrentReflection(getReflectionForMood(selectedMood));
      setIsLoading(false);
    }, 500);
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  useEffect(() => {
    loadNewReflection();
  }, [selectedMood]);

  if (!currentReflection) return null;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30';
      case 'Intermediate': return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30';
      case 'Advanced': return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30';
      default: return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/30';
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <Helmet>
        <title>Daily Islamic Reflection - Spiritual Guidance & Wisdom | Qalam Verse</title>
        <meta name="description" content="Find daily Islamic reflections, spiritual insights, and practical guidance. Discover Quranic verses, Hadith wisdom, and Islamic teachings for personal growth and faith strengthening." />
        <meta name="keywords" content="Islamic Reflection, Daily Islamic Wisdom, Spiritual Guidance, Islamic Teachings, Quran Reflection, Hadith Wisdom, Islamic Personal Development, daily reminder, daily journal about islam, daily Islamic reflection quotes, Islamic daily reminders, daily Quran lessons, Islamic motivational quotes for today" />
        <link rel="canonical" href="https://www.qalamverse.site/#/reflection" />
      </Helmet>

      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
          Daily Reflection
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Deep spiritual insights and practical guidance for your Islamic journey
        </p>
        {selectedMood && (
          <div className="inline-flex items-center px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-full text-emerald-800 dark:text-emerald-300">
            <span className="mr-2">{selectedMood.emoji}</span>
            <span className="text-sm font-medium">Tailored for when you're feeling {selectedMood.label.toLowerCase()}</span>
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-600">
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <RefreshCw className="w-8 h-8 animate-spin text-emerald-500" />
            <span className="ml-3 text-gray-600 dark:text-gray-300">Loading new reflection...</span>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="p-3 bg-white/10 rounded-full mr-4">
                    <Heart className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">
                      {currentReflection.title}
                    </h3>
                    <p className="text-emerald-100 font-medium">
                      {currentReflection.category}
                    </p>
                  </div>
                </div>
                <button
                  onClick={loadNewReflection}
                  className="flex items-center px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  New Reflection
                </button>
              </div>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-emerald-100">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  <span>{currentReflection.author}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{currentReflection.readTime}</span>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(currentReflection.difficulty)}`}>
                  {currentReflection.difficulty}
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="px-6 py-4 bg-emerald-50 dark:bg-emerald-900/20 border-b border-gray-200 dark:border-gray-600">
              <div className="flex flex-wrap gap-2">
                {currentReflection.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-sm rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Main Content */}
            <div className="p-6">
              <div className="prose prose-lg max-w-none mb-6">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                  {currentReflection.content}
                </p>
              </div>

              {/* Expandable Sections */}
              <div className="space-y-4">
                {/* Quranic Verse */}
                {currentReflection.verse && (
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-6 rounded-xl border-l-4 border-amber-400">
                    <div className="flex items-start">
                      <BookOpen className="w-5 h-5 text-amber-500 mt-1 mr-3 flex-shrink-0" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-amber-800 dark:text-amber-300 mb-2">
                          Quranic Guidance:
                        </h4>
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

                {/* Hadith */}
                {currentReflection.hadith && (
                  <button
                    onClick={() => toggleSection('hadith')}
                    className="w-full text-left bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Quote className="w-5 h-5 text-blue-500 mr-3" />
                        <h4 className="font-semibold text-blue-800 dark:text-blue-300">
                          Prophetic Wisdom
                        </h4>
                      </div>
                      <div className="text-blue-500">
                        {expandedSection === 'hadith' ? '−' : '+'}
                      </div>
                    </div>
                    {expandedSection === 'hadith' && (
                      <div className="mt-4 pt-4 border-t border-blue-200 dark:border-blue-700">
                        <p className="text-blue-700 dark:text-blue-300 italic mb-2">
                          {currentReflection.hadith}
                        </p>
                        <cite className="text-blue-600 dark:text-blue-400 text-sm">
                          - {currentReflection.hadithReference}
                        </cite>
                      </div>
                    )}
                  </button>
                )}

                {/* Practical Tips */}
                <button
                  onClick={() => toggleSection('tips')}
                  className="w-full text-left bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border border-green-200 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-green-500 mr-3" />
                      <h4 className="font-semibold text-green-800 dark:text-green-300">
                        Practical Tips ({currentReflection.practicalTips.length})
                      </h4>
                    </div>
                    <div className="text-green-500">
                      {expandedSection === 'tips' ? '−' : '+'}
                    </div>
                  </div>
                  {expandedSection === 'tips' && (
                    <div className="mt-4 pt-4 border-t border-green-200 dark:border-green-700">
                      <ul className="space-y-3">
                        {currentReflection.practicalTips.map((tip, index) => (
                          <li key={index} className="flex items-start">
                            <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">
                              {index + 1}
                            </div>
                            <span className="text-green-700 dark:text-green-300">
                              {tip}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </button>

                {/* Personal Reflection */}
                <button
                  onClick={() => toggleSection('reflection')}
                  className="w-full text-left bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl border border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Heart className="w-5 h-5 text-purple-500 mr-3" />
                      <h4 className="font-semibold text-purple-800 dark:text-purple-300">
                        Deep Reflection
                      </h4>
                    </div>
                    <div className="text-purple-500">
                      {expandedSection === 'reflection' ? '−' : '+'}
                    </div>
                  </div>
                  {expandedSection === 'reflection' && (
                    <div className="mt-4 pt-4 border-t border-purple-200 dark:border-purple-700">
                      <p className="text-purple-700 dark:text-purple-300 italic">
                        {currentReflection.reflection}
                      </p>
                    </div>
                  )}
                </button>

                {/* Related Topics */}
                {currentReflection.relatedTopics.length > 0 && (
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl">
                    <h4 className="font-semibold text-gray-800 dark:text-white mb-3">
                      Related Topics:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {currentReflection.relatedTopics.map((topic) => (
                        <span
                          key={topic}
                          className="px-3 py-1 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-sm rounded-full"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50">
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
              <div className="text-gray-500 text-sm">
                Reflection #{currentReflection.id}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Additional Reflections Preview */}
      <div className="mt-12">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
          More Reflections to Explore
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reflections.slice(0, 6).map((reflection) => (
            <button
              key={reflection.id}
              onClick={() => {
                setCurrentReflection(reflection);
                setExpandedSection(null);
              }}
              className={`p-4 rounded-lg border-2 transition-all text-left hover:scale-[1.02] ${currentReflection?.id === reflection.id
                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                  : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-emerald-300'
                }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-800 dark:text-white text-sm">
                  {reflection.title}
                </h4>
                <div className="flex items-center text-xs text-gray-500">
                  <Clock className="w-3 h-3 mr-1" />
                  {reflection.readTime}
                </div>
              </div>
              <p className="text-emerald-600 dark:text-emerald-400 text-xs font-medium mb-2">
                {reflection.category}
              </p>
              <div className="flex items-center justify-between">
                <div className={`px-2 py-1 rounded text-xs ${getDifficultyColor(reflection.difficulty)}`}>
                  {reflection.difficulty}
                </div>
                <div className="text-xs text-gray-500">
                  {reflection.practicalTips.length} tips
                </div>
              </div>
            </button>
          ))}
        </div>
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