import React, { useState, useEffect } from 'react';
import { Search, BookOpen, Star, Clock, Heart, ChevronDown, ChevronUp, Filter, Globe, Moon, Sun, Home, Plane, ShoppingCart, Users, Baby, Skull, Leaf } from 'lucide-react';

interface Dua {
  id: string;
  arabic: string;
  transliteration: string;
  translation: {
    english: string;
    hindi: string;
    bengali: string;
  };
  reference: string;
  context: string;
  benefits?: string;
  category: string;
}

interface DuaCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  description: string;
  duas: Dua[];
}

type Language = 'english' | 'hindi' | 'bengali';

function DuaAndDhikr() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedDua, setExpandedDua] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('english');
  const [filteredCategories, setFilteredCategories] = useState<DuaCategory[]>([]);

  const duaCategories: DuaCategory[] = [
    {
      id: 'morning',
      name: 'Morning Dhikr',
      icon: <Sun className="w-6 h-6" />,
      color: 'from-yellow-400 to-orange-500',
      description: 'Start your day with these blessed remembrances',
      duas: [
        {
          id: 'morning-1',
          arabic: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
          transliteration: 'Asbahna wa asbahal-mulku lillahi, walhamdu lillahi, la ilaha illallahu wahdahu la shareeka lahu, lahul-mulku wa lahul-hamdu wa huwa ala kulli shay\'in qadeer',
          translation: {
            english: 'We have reached the morning and at this very time unto Allah belongs all sovereignty. All praise is for Allah. None has the right to be worshipped except Allah, alone, without partner, to Him belongs all sovereignty and praise and He is over all things omnipotent.',
            hindi: 'हमने सुबह का समय पाया है और इस समय सारी बादशाहत अल्लाह की है। सारी तारीफ अल्लाह के लिए है। अल्लाह के सिवा कोई माबूद नहीं, वह अकेला है, उसका कोई साझीदार नहीं, उसी की बादशाहत है और उसी की तारीफ है और वह हर चीज़ पर क़ादिर है।',
            bengali: 'আমরা সকালে পৌঁছেছি এবং এই সময়ে সমস্ত রাজত্ব আল্লাহর। সমস্ত প্রশংসা আল্লাহর জন্য। আল্লাহ ছাড়া কোনো ইলাহ নেই, তিনি একক, তাঁর কোনো শরীক নেই, তাঁরই রাজত্ব এবং তাঁরই প্রশংসা এবং তিনি সব কিছুর উপর ক্ষমতাবান।'
          },
          reference: 'Abu Dawud 4/317',
          context: 'Recite once in the morning',
          benefits: 'Brings protection and blessings for the entire day',
          category: 'morning'
        },
        {
          id: 'morning-2',
          arabic: 'اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ',
          transliteration: 'Allahumma bika asbahna, wa bika amsayna, wa bika nahya, wa bika namootu, wa ilaykan-nushoor',
          translation: {
            english: 'O Allah, by Your leave we have reached the morning and by Your leave we have reached the evening, by Your leave we live and die and unto You is our resurrection.',
            hindi: 'ऐ अल्लाह! तेरी मदद से हमने सुबह की और तेरी मदद से हमने शाम की, तेरी मदद से हम जीते हैं और तेरी मदद से मरते हैं और तेरी ही तरफ हमारा उठना है।',
            bengali: 'হে আল্লাহ! আপনার সাহায্যে আমরা সকালে পৌঁছেছি, আপনার সাহায্যে আমরা সন্ধ্যায় পৌঁছেছি, আপনার সাহায্যে আমরা জীবিত থাকি এবং আপনার সাহায্যে আমরা মৃত্যুবরণ করি এবং আপনার কাছেই আমাদের পুনরুত্থান।'
          },
          reference: 'Tirmidhi 5/466',
          context: 'Recite in the morning',
          benefits: 'Acknowledges complete dependence on Allah',
          category: 'morning'
        }
      ]
    },
    {
      id: 'evening',
      name: 'Evening Dhikr',
      icon: <Moon className="w-6 h-6" />,
      color: 'from-purple-500 to-indigo-600',
      description: 'End your day with peaceful remembrance',
      duas: [
        {
          id: 'evening-1',
          arabic: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
          transliteration: 'Amsayna wa amsal-mulku lillahi, walhamdu lillahi, la ilaha illallahu wahdahu la shareeka lahu, lahul-mulku wa lahul-hamdu wa huwa ala kulli shay\'in qadeer',
          translation: {
            english: 'We have reached the evening and at this very time unto Allah belongs all sovereignty. All praise is for Allah. None has the right to be worshipped except Allah, alone, without partner, to Him belongs all sovereignty and praise and He is over all things omnipotent.',
            hindi: 'हमने शाम का समय पाया है और इस समय सारी बादशाहत अल्लाह की है। सारी तारीफ अल्लाह के लिए है। अल्लाह के सिवा कोई माबूद नहीं, वह अकेला है, उसका कोई साझीदार नहीं, उसी की बादशाहत है और उसी की तारीफ है और वह हर चीज़ पर क़ादिर है।',
            bengali: 'আমরা সন্ধ্যায় পৌঁছেছি এবং এই সময়ে সমস্ত রাজত্ব আল্লাহর। সমস্ত প্রশংসা আল্লাহর জন্য। আল্লাহ ছাড়া কোনো ইলাহ নেই, তিনি একক, তাঁর কোনো শরীক নেই, তাঁরই রাজত্ব এবং তাঁরই প্রশংসা এবং তিনি সব কিছুর উপর ক্ষমতাবান।'
          },
          reference: 'Abu Dawud 4/317',
          context: 'Recite once in the evening',
          benefits: 'Brings protection and peace for the night',
          category: 'evening'
        }
      ]
    },
    {
      id: 'sleep',
      name: 'Before Sleep Dhikr',
      icon: <Moon className="w-6 h-6" />,
      color: 'from-indigo-500 to-purple-600',
      description: 'Peaceful supplications before rest',
      duas: [
        {
          id: 'sleep-1',
          arabic: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',
          transliteration: 'Bismika Allahumma amootu wa ahya',
          translation: {
            english: 'In Your name O Allah, I live and die.',
            hindi: 'ऐ अल्लाह! तेरे नाम से मैं मरता हूँ और जीता हूँ।',
            bengali: 'হে আল্লাহ! আপনার নামে আমি মৃত্যুবরণ করি এবং জীবিত থাকি।'
          },
          reference: 'Sahih Bukhari 11/113',
          context: 'Recite when going to bed',
          benefits: 'Protection during sleep',
          category: 'sleep'
        }
      ]
    },
    {
      id: 'salah-dhikr',
      name: 'Salah Dhikr',
      icon: <BookOpen className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-600',
      description: 'Remembrance during prayer',
      duas: [
        {
          id: 'salah-1',
          arabic: 'سُبْحَانَ رَبِّيَ الْعَظِيمِ',
          transliteration: 'Subhana rabbiyal-azeem',
          translation: {
            english: 'Glory is to my Lord, the Most Great.',
            hindi: 'मेरे रब की पाकी है जो बहुत बड़ा है।',
            bengali: 'আমার রবের পবিত্রতা, যিনি মহান।'
          },
          reference: 'Abu Dawud, Ibn Majah',
          context: 'Recite in Ruku (bowing)',
          benefits: 'Glorifies Allah during prayer',
          category: 'salah-dhikr'
        }
      ]
    },
    {
      id: 'after-salah',
      name: 'After Salah Dhikr',
      icon: <Star className="w-6 h-6" />,
      color: 'from-emerald-500 to-teal-600',
      description: 'Remembrance after completing prayer',
      duas: [
        {
          id: 'after-salah-1',
          arabic: 'أَسْتَغْفِرُ اللَّهَ، أَسْتَغْفِرُ اللَّهَ، أَسْتَغْفِرُ اللَّهَ',
          transliteration: 'Astaghfirullah, Astaghfirullah, Astaghfirullah',
          translation: {
            english: 'I seek forgiveness from Allah (3 times).',
            hindi: 'मैं अल्लाह से माफी मांगता हूँ (3 बार)।',
            bengali: 'আমি আল্লাহর কাছে ক্ষমা চাই (৩ বার)।'
          },
          reference: 'Sahih Muslim 1/414',
          context: 'Recite 3 times after each prayer',
          benefits: 'Seeks forgiveness for shortcomings in prayer',
          category: 'after-salah'
        }
      ]
    },
    {
      id: 'ruqyah',
      name: 'Ruqyah & Illness',
      icon: <Heart className="w-6 h-6" />,
      color: 'from-red-500 to-pink-600',
      description: 'Healing and protection supplications',
      duas: [
        {
          id: 'ruqyah-1',
          arabic: 'أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ',
          transliteration: 'A\'udhu billahi minash-shaytanir-rajeem',
          translation: {
            english: 'I seek refuge in Allah from Satan, the accursed.',
            hindi: 'मैं शैतान मरदूद से अल्लाह की पनाह मांगता हूँ।',
            bengali: 'আমি অভিশপ্ত শয়তান থেকে আল্লাহর আশ্রয় চাই।'
          },
          reference: 'Quran 16:98',
          context: 'For protection from evil',
          benefits: 'Protection from Satan and evil influences',
          category: 'ruqyah'
        }
      ]
    },
    {
      id: 'praises',
      name: 'Praises of Allah',
      icon: <Star className="w-6 h-6" />,
      color: 'from-yellow-500 to-amber-600',
      description: 'Beautiful names and praises of Allah',
      duas: [
        {
          id: 'praises-1',
          arabic: 'سُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ وَلَا إِلَهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَرُ',
          transliteration: 'Subhanallahi walhamdu lillahi wa la ilaha illallahu wallahu akbar',
          translation: {
            english: 'Glory is to Allah, and praise is to Allah, and there is none worthy of worship except Allah, and Allah is the Greatest.',
            hindi: 'अल्लाह पाक है, अल्लाह की तारीफ है, अल्लाह के सिवा कोई माबूद नहीं, और अल्लाह सबसे बड़ा है।',
            bengali: 'আল্লাহ পবিত্র, আল্লাহর প্রশংসা, আল্লাহ ছাড়া কোনো ইলাহ নেই, এবং আল্লাহ সর্বশ্রেষ্ঠ।'
          },
          reference: 'Sahih Muslim',
          context: 'General dhikr for all times',
          benefits: 'Each word is rewarded immensely',
          category: 'praises'
        }
      ]
    },
    {
      id: 'salawat',
      name: 'Salawat',
      icon: <Heart className="w-6 h-6" />,
      color: 'from-pink-500 to-rose-600',
      description: 'Blessings upon Prophet Muhammad (PBUH)',
      duas: [
        {
          id: 'salawat-1',
          arabic: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ',
          transliteration: 'Allahumma salli ala Muhammadin wa ala ali Muhammadin kama sallayta ala Ibraheema wa ala ali Ibraheema innaka hameedun majeed',
          translation: {
            english: 'O Allah, send prayers upon Muhammad and upon the family of Muhammad as You sent prayers upon Ibrahim and upon the family of Ibrahim. Indeed, You are Praiseworthy and Glorious.',
            hindi: 'ऐ अल्लाह! मुहम्मद पर और मुहम्मद की आल पर रहमत भेज जैसे तूने इब्राहीम और इब्राहीम की आल पर रहमत भेजी। बेशक तू तारीफ के लायक़ और बुलंद शान वाला है।',
            bengali: 'হে আল্লাহ! মুহাম্মদ এবং মুহাম্মদের পরিবারের উপর রহমত পাঠান যেমন আপনি ইব্রাহীম এবং ইব্রাহীমের পরিবারের উপর রহমত পাঠিয়েছেন। নিশ্চয়ই আপনি প্রশংসিত ও মহিমান্বিত।'
          },
          reference: 'Sahih Bukhari 6/408',
          context: 'Send blessings upon the Prophet',
          benefits: 'Allah sends 10 blessings for every 1 sent',
          category: 'salawat'
        }
      ]
    },
    {
      id: 'istighfar',
      name: 'Istighfar',
      icon: <Heart className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-600',
      description: 'Seeking forgiveness from Allah',
      duas: [
        {
          id: 'istighfar-1',
          arabic: 'أَسْتَغْفِرُ اللَّهَ الَّذِي لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ وَأَتُوبُ إِلَيْهِ',
          transliteration: 'Astaghfirullahil-ladhi la ilaha illa huwal-hayyul-qayyoomu wa atoobu ilayh',
          translation: {
            english: 'I seek forgiveness from Allah, there is no deity except Him, the Ever-Living, the Self-Sustaining, and I turn to Him in repentance.',
            hindi: 'मैं अल्लाह से माफी मांगता हूँ जिसके सिवा कोई माबूद नहीं, वह जिंदा है, क़ायम रहने वाला है, और मैं उसकी तरफ तौबा करता हूँ।',
            bengali: 'আমি আল্লাহর কাছে ক্ষমা চাই, তিনি ছাড়া কোনো ইলাহ নেই, তিনি চিরজীবী, চিরস্থায়ী, এবং আমি তাঁর কাছে তওবা করি।'
          },
          reference: 'Abu Dawud, Tirmidhi',
          context: 'Master of seeking forgiveness',
          benefits: 'Complete forgiveness and mercy from Allah',
          category: 'istighfar'
        }
      ]
    },
    {
      id: 'all-time',
      name: 'Dhikr for All Time',
      icon: <Clock className="w-6 h-6" />,
      color: 'from-gray-500 to-slate-600',
      description: 'Remembrance for any time of day',
      duas: [
        {
          id: 'all-time-1',
          arabic: 'لَا إِلَهَ إِلَّا اللَّهُ',
          transliteration: 'La ilaha illallah',
          translation: {
            english: 'There is no deity except Allah.',
            hindi: 'अल्लाह के सिवा कोई माबूद नहीं।',
            bengali: 'আল্লাহ ছাড়া কোনো ইলাহ নেই।'
          },
          reference: 'Sahih Bukhari, Muslim',
          context: 'Best dhikr for all times',
          benefits: 'The best of all remembrance',
          category: 'all-time'
        }
      ]
    }
  ];

  const quranicDuas: DuaCategory = {
    id: 'quranic-duas',
    name: 'Quranic Duas',
    icon: <BookOpen className="w-6 h-6" />,
    color: 'from-purple-500 to-violet-600',
    description: 'Beautiful supplications directly from the Holy Quran',
    duas: [
      {
        id: 'quranic-1',
        arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
        transliteration: 'Rabbana atina fi\'d-dunya hasanatan wa fi\'l-akhirati hasanatan wa qina adhab an-nar',
        translation: {
          english: 'Our Lord, give us good in this world and good in the next world, and save us from the punishment of the Fire.',
          hindi: 'ऐ हमारे रब! हमें दुनिया में भलाई दे और आखिरत में भी भलाई दे और हमें आग के अज़ाब से बचा।',
          bengali: 'হে আমাদের রব! আমাদেরকে দুনিয়ায় কল্যাণ দিন এবং আখিরাতেও কল্যাণ দিন এবং আমাদেরকে জাহান্নামের আযাব থেকে রক্ষা করুন।'
        },
        reference: 'Quran 2:201',
        context: 'A comprehensive dua for all good in this life and the hereafter',
        benefits: 'Covers all aspects of worldly and spiritual well-being',
        category: 'quranic-duas'
      },
      {
        id: 'quranic-2',
        arabic: 'رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي وَاحْلُلْ عُقْدَةً مِّن لِّسَانِي يَفْقَهُوا قَوْلِي',
        transliteration: 'Rabbi\'shrah li sadri wa yassir li amri wahlul uqdatan min lisani yafqahu qawli',
        translation: {
          english: 'My Lord, expand for me my breast and ease for me my task and untie the knot from my tongue that they may understand my speech.',
          hindi: 'ऐ मेरे रब! मेरा सीना खोल दे और मेरा काम आसान कर दे और मेरी जुबान की गांठ खोल दे ताकि लोग मेरी बात समझ सकें।',
          bengali: 'হে আমার রব! আমার বক্ষ প্রশস্ত করে দিন এবং আমার কাজ সহজ করে দিন এবং আমার জিহ্বার জড়তা দূর করে দিন যাতে তারা আমার কথা বুঝতে পারে।'
        },
        reference: 'Quran 20:25-28',
        context: 'Dua of Prophet Musa (AS) for confidence and eloquence',
        benefits: 'Helps with confidence, communication, and ease in tasks',
        category: 'quranic-duas'
      }
    ]
  };

  const sunnahDuas: DuaCategory = {
    id: 'sunnah-duas',
    name: 'Sunnah Duas',
    icon: <Star className="w-6 h-6" />,
    color: 'from-amber-500 to-orange-600',
    description: 'Authentic supplications from the Sunnah of Prophet Muhammad (PBUH)',
    duas: [
      {
        id: 'sunnah-1',
        arabic: 'اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ',
        transliteration: 'Allahumma a\'inni ala dhikrika wa shukrika wa husni ibadatik',
        translation: {
          english: 'O Allah, help me to remember You, thank You, and worship You in the best manner.',
          hindi: 'ऐ अल्लाह! मुझे अपनी याद, अपना शुक्र और अपनी बेहतरीन इबादत करने में मदद कर।',
          bengali: 'হে আল্লাহ! আমাকে আপনার স্মরণ, আপনার কৃতজ্ঞতা এবং আপনার সুন্দর ইবাদতে সাহায্য করুন।'
        },
        reference: 'Abu Dawud 1522',
        context: 'A comprehensive dua for spiritual improvement',
        benefits: 'Helps in maintaining consistent worship and gratitude',
        category: 'sunnah-duas'
      }
    ]
  };

  const wakingUpDuas: DuaCategory = {
    id: 'waking-up',
    name: 'Waking Up',
    icon: <Sun className="w-6 h-6" />,
    color: 'from-yellow-400 to-amber-500',
    description: 'Duas to recite upon waking up from sleep',
    duas: [
      {
        id: 'waking-1',
        arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',
        transliteration: 'Alhamdu lillahil-ladhi ahyana ba\'da ma amatana wa ilayhin-nushur',
        translation: {
          english: 'All praise is for Allah who gave us life after having taken it from us and unto Him is the resurrection.',
          hindi: 'सारी तारीफ अल्लाह के लिए है जिसने हमें मौत के बाद जिंदगी दी और उसी की तरफ हमारा उठना है।',
          bengali: 'সমস্ত প্রশংসা আল্লাহর জন্য যিনি আমাদের মৃত্যুর পর জীবন দান করেছেন এবং তাঁর কাছেই আমাদের পুনরুত্থান।'
        },
        reference: 'Sahih Bukhari 6312',
        context: 'First dua to recite upon waking up',
        benefits: 'Starts the day with gratitude and remembrance of Allah',
        category: 'waking-up'
      }
    ]
  };

  const nightmaresDuas: DuaCategory = {
    id: 'nightmares',
    name: 'Nightmares',
    icon: <Moon className="w-6 h-6" />,
    color: 'from-indigo-600 to-purple-700',
    description: 'Protection from bad dreams and nightmares',
    duas: [
      {
        id: 'nightmare-1',
        arabic: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
        transliteration: 'A\'udhu bi kalimatillahit-tammati min sharri ma khalaq',
        translation: {
          english: 'I seek refuge in the perfect words of Allah from the evil of what He has created.',
          hindi: 'मैं अल्लाह के पूर्ण कलिमों की पनाह मांगता हूं उसकी बनाई हुई चीजों की बुराई से।',
          bengali: 'আমি আল্লাহর পূর্ণ বাণীসমূহের আশ্রয় চাই তাঁর সৃষ্ট বস্তুসমূহের অনিষ্ট থেকে।'
        },
        reference: 'Sahih Muslim 2708',
        context: 'Recite when experiencing bad dreams or nightmares',
        benefits: 'Provides protection from evil and bad dreams',
        category: 'nightmares'
      }
    ]
  };

  const clothesDuas: DuaCategory = {
    id: 'clothes',
    name: 'Clothes',
    icon: <Heart className="w-6 h-6" />,
    color: 'from-pink-500 to-rose-600',
    description: 'Duas for wearing and removing clothes',
    duas: [
      {
        id: 'clothes-1',
        arabic: 'الْحَمْدُ لِلَّهِ الَّذِي كَسَانِي هَذَا الثَّوْبَ وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ',
        transliteration: 'Alhamdu lillahil-ladhi kasani hadha\'th-thawba wa razaqanihi min ghayri hawlin minni wa la quwwah',
        translation: {
          english: 'All praise is for Allah who has clothed me with this garment and provided it for me, with no power or might from myself.',
          hindi: 'सारी तारीफ अल्लाह के लिए है जिसने मुझे यह कपड़ा पहनाया और मुझे यह दिया बिना मेरी कोई ताकत और कुव्वत के।',
          bengali: 'সমস্ত প্রশংসা আল্লাহর জন্য যিনি আমাকে এই পোশাক পরিয়েছেন এবং আমার কোনো শক্তি ও সামর্থ্য ছাড়াই তা দান করেছেন।'
        },
        reference: 'Abu Dawud 4023',
        context: 'When wearing new clothes',
        benefits: 'Brings blessings and gratitude for Allah\'s provisions',
        category: 'clothes'
      }
    ]
  };

  const lavatoryWuduDuas: DuaCategory = {
    id: 'lavatory-wudu',
    name: 'Lavatory & Wudu',
    icon: <Heart className="w-6 h-6" />,
    color: 'from-cyan-500 to-blue-600',
    description: 'Duas for entering lavatory and performing wudu',
    duas: [
      {
        id: 'lavatory-1',
        arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ',
        transliteration: 'Allahumma inni a\'udhu bika minal-khubuthi wal-khaba\'ith',
        translation: {
          english: 'O Allah, I seek refuge with You from all evil and evil-doers.',
          hindi: 'ऐ अल्लाह! मैं तुझसे सभी बुराइयों और बुरे जिन्नों से पनाह मांगता हूं।',
          bengali: 'হে আল্লাহ! আমি আপনার কাছে সমস্ত অশুভ ও অশুভ শক্তি থেকে আশ্রয় চাই।'
        },
        reference: 'Sahih Bukhari 142',
        context: 'Before entering the lavatory',
        benefits: 'Protection from evil spirits in unclean places',
        category: 'lavatory-wudu'
      },
      {
        id: 'wudu-1',
        arabic: 'أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ',
        transliteration: 'Ashhadu an la ilaha illallahu wahdahu la sharika lahu wa ashhadu anna Muhammadan \'abduhu wa rasuluh',
        translation: {
          english: 'I bear witness that there is no deity except Allah, alone without partner, and I bear witness that Muhammad is His slave and Messenger.',
          hindi: 'मैं गवाही देता हूं कि अल्लाह के सिवा कोई माबूद नहीं, वह अकेला है, उसका कोई साझीदार नहीं, और मैं गवाही देता हूं कि मुहम्मद उसके बंदे और रसूल हैं।',
          bengali: 'আমি সাক্ষ্য দিচ্ছি যে, আল্লাহ ছাড়া কোনো ইলাহ নেই, তিনি একক, তাঁর কোনো শরীক নেই এবং আমি সাক্ষ্য দিচ্ছি যে মুহাম্মদ তাঁর বান্দা ও রাসূল।'
        },
        reference: 'Sahih Muslim 234',
        context: 'After completing wudu',
        benefits: 'Opens the gates of Paradise',
        category: 'lavatory-wudu'
      }
    ]
  };

  const foodDrinksDuas: DuaCategory = {
    id: 'food-drinks',
    name: 'Food & Drinks',
    icon: <Heart className="w-6 h-6" />,
    color: 'from-green-500 to-teal-600',
    description: 'Duas before and after eating and drinking',
    duas: [
      {
        id: 'food-1',
        arabic: 'بِسْمِ اللَّهِ',
        transliteration: 'Bismillah',
        translation: {
          english: 'In the name of Allah.',
          hindi: 'अल्लाह के नाम से।',
          bengali: 'আল্লাহর নামে।'
        },
        reference: 'Abu Dawud 3767',
        context: 'Before eating or drinking',
        benefits: 'Brings blessings in food and drink',
        category: 'food-drinks'
      },
      {
        id: 'food-2',
        arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ',
        transliteration: 'Alhamdu lillahil-ladhi at\'amana wa saqana wa ja\'alana muslimin',
        translation: {
          english: 'All praise is for Allah who has fed us and given us drink and made us Muslims.',
          hindi: 'सारी तारीफ अल्लाह के लिए है जिसने हमें खाना खिलाया, पानी पिलाया और हमें मुसलमान बनाया।',
          bengali: 'সমস্ত প্রশংসা আল্লাহর জন্য যিনি আমাদের খাওয়ালেন, পান করালেন এবং আমাদের মুসলিম বানালেন।'
        },
        reference: 'Abu Dawud 3850',
        context: 'After finishing eating or drinking',
        benefits: 'Expresses gratitude for Allah\'s sustenance',
        category: 'food-drinks'
      }
    ]
  };

  const homeDuas: DuaCategory = {
    id: 'home',
    name: 'Home',
    icon: <Heart className="w-6 h-6" />,
    color: 'from-orange-500 to-red-600',
    description: 'Duas for entering and leaving home',
    duas: [
      {
        id: 'home-1',
        arabic: 'بِسْمِ اللَّهِ وَلَجْنَا وَبِسْمِ اللَّهِ خَرَجْنَا وَعَلَى اللَّهِ رَبِّنَا تَوَكَّلْنَا',
        transliteration: 'Bismillahi walajna wa bismillahi kharajna wa \'alallahi rabbina tawakkalna',
        translation: {
          english: 'In the name of Allah we enter and in the name of Allah we leave, and upon Allah, our Lord, we place our trust.',
          hindi: 'अल्लाह के नाम से हम दाखिल हुए और अल्लाह के नाम से हम निकले और अपने रब अल्लाह पर हमने भरोसा किया।',
          bengali: 'আল্লাহর নামে আমরা প্রবেশ করলাম এবং আল্লাহর নামে আমরা বের হলাম এবং আমাদের রব আল্লাহর উপর আমরা ভরসা করলাম।'
        },
        reference: 'Abu Dawud 5096',
        context: 'When entering home',
        benefits: 'Brings blessings and protection to the household',
        category: 'home'
      }
    ]
  };

  const adhanMasjidDuas: DuaCategory = {
    id: 'adhan-masjid',
    name: 'Adhan & Masjid',
    icon: <BookOpen className="w-6 h-6" />,
    color: 'from-emerald-600 to-green-700',
    description: 'Duas related to adhan and entering masjid',
    duas: [
      {
        id: 'adhan-1',
        arabic: 'اللَّهُمَّ رَبَّ هَذِهِ الدَّعْوَةِ التَّامَّةِ وَالصَّلَاةِ الْقَائِمَةِ آتِ مُحَمَّدًا الْوَسِيلَةَ وَالْفَضِيلَةَ وَابْعَثْهُ مَقَامًا مَحْمُودًا الَّذِي وَعَدْتَهُ',
        transliteration: 'Allahumma rabba hadhihid-da\'watit-tammati was-salatil-qa\'imati ati Muhammadanil-wasilata wal-fadilata wab\'athhu maqaman mahmudan-alladhi wa\'adtah',
        translation: {
          english: 'O Allah, Lord of this perfect call and established prayer, grant Muhammad the intercession and favor, and raise him to the praised position which You have promised him.',
          hindi: 'ऐ अल्लाह! इस पूर्ण दावत और स्थापित नमाज़ के रब, मुहम्मद को वसीला और फज़ीलत दे और उन्हें उस प्रशंसित स्थान पर पहुंचा जिसका तूने वादा किया है।',
          bengali: 'হে আল্লাহ! এই পূর্ণ আহ্বান ও প্রতিষ্ঠিত সালাতের রব, মুহাম্মদকে ওসীলা ও মর্যাদা দান করুন এবং তাঁকে সেই প্রশংসিত স্থানে পৌঁছে দিন যার ওয়াদা আপনি করেছেন।'
        },
        reference: 'Sahih Bukhari 614',
        context: 'After hearing the adhan',
        benefits: 'Earns the intercession of Prophet Muhammad (PBUH)',
        category: 'adhan-masjid'
      },
      {
        id: 'masjid-1',
        arabic: 'اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ',
        transliteration: 'Allahummaftah li abwaba rahmatik',
        translation: {
          english: 'O Allah, open for me the doors of Your mercy.',
          hindi: 'ऐ अल्लाह! मेरे लिए अपनी रहमत के दरवाज़े खोल दे।',
          bengali: 'হে আল্লাহ! আমার জন্য আপনার রহমতের দরজাসমূহ খুলে দিন।'
        },
        reference: 'Sahih Muslim 713',
        context: 'When entering the masjid',
        benefits: 'Seeks Allah\'s mercy and blessings',
        category: 'adhan-masjid'
      }
    ]
  };

  const istikharahDuas: DuaCategory = {
    id: 'istikhara',
    name: 'Istikhara',
    icon: <Heart className="w-6 h-6" />,
    color: 'from-purple-600 to-indigo-700',
    description: 'Prayer for guidance in making decisions',
    duas: [
      {
        id: 'istikhara-1',
        arabic: 'اللَّهُمَّ إِنِّي أَسْتَخِيرُكَ بِعِلْمِكَ وَأَسْتَقْدِرُكَ بِقُدْرَتِكَ وَأَسْأَلُكَ مِنْ فَضْلِكَ الْعَظِيمِ فَإِنَّكَ تَقْدِرُ وَلَا أَقْدِرُ وَتَعْلَمُ وَلَا أَعْلَمُ وَأَنْتَ عَلَّامُ الْغُيُوبِ',
        transliteration: 'Allahumma inni astakhiruka bi\'ilmika wa astaqdiruka bi qudratika wa as\'aluka min fadlikal-\'azimi fa\'innaka taqdiru wa la aqdiru wa ta\'lamu wa la a\'lamu wa anta \'allamul-ghuyub',
        translation: {
          english: 'O Allah, I seek guidance from Your knowledge, and Power from Your Might and I ask for Your great blessings. You are capable and I am not. You know and I do not and You are the Knower of the unseen.',
          hindi: 'ऐ अल्लाह! मैं तेरे इल्म से भलाई चाहता हूं और तेरी कुदरत से ताकत मांगता हूं और तेरे बड़े फज़ल से सवाल करता हूं। तू कर सकता है और मैं नहीं कर सकता, तू जानता है और मैं नहीं जानता और तू गैब की बातों को जानने वाला है।',
          bengali: 'হে আল্লাহ! আমি আপনার জ্ঞান দ্বারা কল্যাণ কামনা করি, আপনার শক্তি দ্বারা সামর্থ্য প্রার্থনা করি এবং আপনার মহান অনুগ্রহ থেকে প্রার্থনা করি। আপনি সক্ষম আমি অক্ষম, আপনি জানেন আমি জানি না এবং আপনি অদৃশ্যের জ্ঞানী।'
        },
        reference: 'Sahih Bukhari 1166',
        context: 'When seeking guidance for important decisions',
        benefits: 'Helps in making the right choice according to Allah\'s will',
        category: 'istikhara'
      }
    ]
  };

  const gatheringsDuas: DuaCategory = {
    id: 'gatherings',
    name: 'Gatherings',
    icon: <Heart className="w-6 h-6" />,
    color: 'from-teal-500 to-cyan-600',
    description: 'Duas for Islamic gatherings and meetings',
    duas: [
      {
        id: 'gathering-1',
        arabic: 'سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا أَنْتَ أَسْتَغْفِرُكَ وَأَتُوبُ إِلَيْكَ',
        transliteration: 'Subhanaka Allahumma wa bihamdika ashhadu an la ilaha illa anta astaghfiruka wa atubu ilayk',
        translation: {
          english: 'Glory is to You, O Allah, and praise is to You. I bear witness that there is no deity except You. I seek Your forgiveness and turn to You in repentance.',
          hindi: 'ऐ अल्लाह! तू पाक है और तेरी तारीफ है। मैं गवाही देता हूं कि तेरे सिवा कोई माबूद नहीं। मैं तुझसे माफी मांगता हूं और तेरी तरफ तौबा करता हूं।',
          bengali: 'হে আল্লাহ! আপনি পবিত্র এবং আপনার প্রশংসা। আমি সাক্ষ্য দিচ্ছি যে আপনি ছাড়া কোনো ইলাহ নেই। আমি আপনার কাছে ক্ষমা চাই এবং আপনার কাছে তওবা করি।'
        },
        reference: 'Abu Dawud 4859',
        context: 'At the end of gatherings (Kaffarat al-Majlis)',
        benefits: 'Expiates any sins committed during the gathering',
        category: 'gatherings'
      }
    ]
  };

  const languages = [
    { code: 'english' as Language, name: 'English', flag: '🇺🇸' },
    { code: 'hindi' as Language, name: 'हिंदी', flag: '🇮🇳' },
    { code: 'bengali' as Language, name: 'বাংলা', flag: '🇧🇩' }
  ];

  useEffect(() => {
    let filtered = [...duaCategories, quranicDuas, sunnahDuas, wakingUpDuas, nightmaresDuas, clothesDuas, lavatoryWuduDuas, foodDrinksDuas, homeDuas, adhanMasjidDuas, istikharahDuas, gatheringsDuas];
    
    if (searchTerm) {
      filtered = filtered.map(category => ({
        ...category,
        duas: category.duas.filter(dua =>
          dua.arabic.includes(searchTerm) ||
          dua.transliteration.toLowerCase().includes(searchTerm.toLowerCase()) ||
          dua.translation[selectedLanguage].toLowerCase().includes(searchTerm.toLowerCase()) ||
          dua.context.toLowerCase().includes(searchTerm.toLowerCase())
        )
      })).filter(category => category.duas.length > 0);
    }
    
    setFilteredCategories(filtered);
  }, [searchTerm, selectedLanguage]);

  const toggleDuaExpansion = (duaId: string) => {
    setExpandedDua(expandedDua === duaId ? null : duaId);
  };

  const allCategories = [...duaCategories, quranicDuas, sunnahDuas, wakingUpDuas, nightmaresDuas, clothesDuas, lavatoryWuduDuas, foodDrinksDuas, homeDuas, adhanMasjidDuas, istikharahDuas, gatheringsDuas];
  const selectedCategoryData = allCategories.find(cat => cat.id === selectedCategory);

  if (selectedCategory && selectedCategoryData) {
    return (
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className={`bg-gradient-to-r ${selectedCategoryData.color} text-white p-6 rounded-t-2xl`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-3 bg-white/10 rounded-full mr-4">
                {selectedCategoryData.icon}
              </div>
              <div>
                <h2 className="text-3xl font-bold">{selectedCategoryData.name}</h2>
                <p className="text-white/90 mt-2">{selectedCategoryData.description}</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedCategory(null)}
              className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
            >
              ← Back
            </button>
          </div>
        </div>

        {/* Language Selector */}
        <div className="bg-white dark:bg-gray-800 border-x border-gray-200 dark:border-gray-600 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Globe className="w-5 h-5 text-gray-500 mr-2" />
              <span className="text-gray-700 dark:text-gray-300 font-medium">Translation Language:</span>
            </div>
            <div className="flex gap-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setSelectedLanguage(lang.code)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedLanguage === lang.code
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300'
                      : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {lang.flag} {lang.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Duas List */}
        <div className="bg-white dark:bg-gray-800 border-x border-b border-gray-200 dark:border-gray-600 rounded-b-2xl">
          <div className="p-6 space-y-6">
            {selectedCategoryData.duas.map((dua) => (
              <div
                key={dua.id}
                className="border border-gray-200 dark:border-gray-600 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Dua Card Header */}
                <div className="p-6">
                  {/* Arabic Text */}
                  <div className="mb-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-lg">
                    <p className="text-2xl leading-relaxed text-gray-800 dark:text-white font-arabic text-right" dir="rtl">
                      {dua.arabic}
                    </p>
                  </div>

                  {/* Translation */}
                  <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                      {dua.translation[selectedLanguage]}
                    </p>
                  </div>

                  {/* Expand Button */}
                  <button
                    onClick={() => toggleDuaExpansion(dua.id)}
                    className="flex items-center justify-center w-full py-2 text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors"
                  >
                    {expandedDua === dua.id ? (
                      <>
                        <ChevronUp className="w-4 h-4 mr-2" />
                        Show Less
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4 mr-2" />
                        Show Details
                      </>
                    )}
                  </button>
                </div>

                {/* Expanded Details */}
                {expandedDua === dua.id && (
                  <div className="border-t border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/30 p-6 space-y-4">
                    {/* Transliteration */}
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Transliteration:</h4>
                      <p className="text-gray-600 dark:text-gray-400 italic">
                        {dua.transliteration}
                      </p>
                    </div>

                    {/* Reference */}
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Reference:</h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        {dua.reference}
                      </p>
                    </div>

                    {/* Context */}
                    <div>
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-2">When to Recite:</h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        {dua.context}
                      </p>
                    </div>

                    {/* Benefits */}
                    {dua.benefits && (
                      <div>
                        <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Benefits:</h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          {dua.benefits}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
          Dua & Dhikr Collection
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">
          Comprehensive collection of authentic Islamic supplications and remembrance
        </p>

        {/* Search Bar */}
        <div className="max-w-md mx-auto relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search duas and dhikr..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        {/* Language Selector */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <Globe className="w-5 h-5 text-gray-500" />
          <span className="text-gray-700 dark:text-gray-300 mr-2">Language:</span>
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setSelectedLanguage(lang.code)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedLanguage === lang.code
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300'
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {lang.flag} {lang.name}
            </button>
          ))}
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-600 overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
          >
            <div className={`bg-gradient-to-r ${category.color} p-6 text-white`}>
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 bg-white/20 rounded-full">
                  {category.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold text-center mb-2">
                {category.name}
              </h3>
              <p className="text-white/90 text-sm text-center">
                {category.description}
              </p>
            </div>
            <div className="p-4 bg-white dark:bg-gray-800">
              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>{category.duas.length} duas</span>
                <span className="text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-800 dark:group-hover:text-emerald-300">
                  Explore →
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {searchTerm && filteredCategories.length === 0 && (
        <div className="text-center py-12">
          <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">
            No duas found matching your search.
          </p>
        </div>
      )}

      <div className="mt-12 text-center">
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-gray-800 dark:to-gray-700 p-8 rounded-xl">
          <h3 className="text-2xl font-semibold text-emerald-800 dark:text-emerald-300 mb-4">
            About Dua & Dhikr
          </h3>
          <p className="text-emerald-700 dark:text-emerald-400 max-w-3xl mx-auto leading-relaxed">
            Dua (supplication) and Dhikr (remembrance) are essential aspects of Islamic worship. 
            These authentic supplications from the Quran and Sunnah help us maintain a strong 
            connection with Allah throughout our daily lives.
          </p>
          <blockquote className="mt-6 text-lg italic text-emerald-600 dark:text-emerald-400">
            "And remember your Lord much and exalt [Him with praise] in the evening and the morning." - Quran 3:41
          </blockquote>
        </div>
      </div>
    </div>
  );
}

export default DuaAndDhikr;