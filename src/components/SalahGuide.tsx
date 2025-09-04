import React, { useState } from 'react';
import { Globe, Book, Play, ChevronDown, ChevronUp, Star, Heart, Clock, Moon, Sun } from 'lucide-react';

interface Language {
  code: string;
  name: string;
  flag: string;
}

interface PrayerContent {
  description: string;
  method: string[];
  duas: { arabic: string; translation: string; }[];
  surahs: string[];
  tasbih: { arabic: string; translation: string; count: string; }[];
  benefits: string[];
}

interface Prayer {
  id: string;
  nameEn: string;
  nameAr: string;
  nameHi: string;
  nameBn: string;
  category: 'fard' | 'special' | 'sunnah' | 'nafl';
  rakats: string;
  timing: string;
  content: {
    en: PrayerContent;
    ar: PrayerContent;
    hi: PrayerContent;
    bn: PrayerContent;
  };
  videoId: string;
  color: string;
}

function SalahGuide() {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
  const [selectedPrayer, setSelectedPrayer] = useState<Prayer | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const languages: Language[] = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'bn', name: 'বাংলা', flag: '🇧🇩' },
  ];

  const prayers: Prayer[] = [
    // Daily Prayers (Fard Salah)
    {
      id: 'fajr',
      nameEn: 'Fajr',
      nameAr: 'الفجر',
      nameHi: 'फज्र',
      nameBn: 'ফজর',
      category: 'fard',
      rakats: '2 Rakat',
      timing: 'Dawn',
      color: 'from-orange-400 to-red-500',
      videoId: 'dQw4w9WgXcQ',
      content: {
        en: {
          description: 'The dawn prayer, performed before sunrise. It is the first of the five daily obligatory prayers and holds special significance in Islam.',
          method: [
            'Make intention (Niyyah) for Fajr prayer',
            'Perform Takbiratul Ihram (Allahu Akbar)',
            'Recite Surah Al-Fatiha',
            'Recite another Surah (preferably long ones)',
            'Perform Ruku (bowing)',
            'Stand up from Ruku',
            'Perform Sujud (prostration) twice',
            'Sit for Tashahhud',
            'Complete with Tasleem'
          ],
          duas: [
            {
              arabic: 'اللَّهُمَّ بَارِكْ لَنَا فِيمَا رَزَقْتَنَا',
              translation: 'O Allah, bless us in what You have provided us'
            }
          ],
          surahs: ['Al-Fatiha (Required)', 'Al-Kafirun', 'Al-Ikhlas', 'Al-Falaq', 'An-Nas'],
          tasbih: [
            {
              arabic: 'سُبْحَانَ اللَّهِ',
              translation: 'Glory be to Allah',
              count: '33 times'
            },
            {
              arabic: 'الْحَمْدُ لِلَّهِ',
              translation: 'All praise is due to Allah',
              count: '33 times'
            },
            {
              arabic: 'اللَّهُ أَكْبَرُ',
              translation: 'Allah is the Greatest',
              count: '34 times'
            }
          ],
          benefits: [
            'Protection throughout the day',
            'Spiritual purification',
            'Divine blessings and mercy',
            'Increased sustenance',
            'Peace of mind'
          ]
        },
        ar: {
          description: 'صلاة الفجر هي أول الصلوات الخمس المفروضة، تؤدى قبل طلوع الشمس وتحمل أهمية خاصة في الإسلام.',
          method: [
            'النية لصلاة الفجر',
            'تكبيرة الإحرام (الله أكبر)',
            'قراءة سورة الفاتحة',
            'قراءة سورة أخرى (يفضل الطويلة)',
            'الركوع',
            'القيام من الركوع',
            'السجود مرتين',
            'الجلوس للتشهد',
            'الانتهاء بالتسليم'
          ],
          duas: [
            {
              arabic: 'اللَّهُمَّ بَارِكْ لَنَا فِيمَا رَزَقْتَنَا',
              translation: 'اللهم بارك لنا فيما رزقتنا'
            }
          ],
          surahs: ['الفاتحة (مطلوبة)', 'الكافرون', 'الإخلاص', 'الفلق', 'الناس'],
          tasbih: [
            {
              arabic: 'سُبْحَانَ اللَّهِ',
              translation: 'سبحان الله',
              count: '33 مرة'
            },
            {
              arabic: 'الْحَمْدُ لِلَّهِ',
              translation: 'الحمد لله',
              count: '33 مرة'
            },
            {
              arabic: 'اللَّهُ أَكْبَرُ',
              translation: 'الله أكبر',
              count: '34 مرة'
            }
          ],
          benefits: [
            'الحماية طوال اليوم',
            'التطهير الروحي',
            'البركات والرحمة الإلهية',
            'زيادة الرزق',
            'راحة البال'
          ]
        },
        hi: {
          description: 'फज्र की नमाज़ सुबह सूर्योदय से पहले पढ़ी जाने वाली पांच दैनिक अनिवार्य नमाज़ों में से पहली है और इस्लाम में इसका विशेष महत्व है।',
          method: [
            'फज्र नमाज़ की नीयत करें',
            'तकबीरतुल इहराम (अल्लाहु अकबर)',
            'सूरह अल-फातिहा पढ़ें',
            'कोई और सूरह पढ़ें (लंबी सूरह बेहतर)',
            'रुकू करें',
            'रुकू से खड़े हों',
            'दो बार सजदा करें',
            'तशह्हुद के लिए बैठें',
            'सलाम के साथ समाप्त करें'
          ],
          duas: [
            {
              arabic: 'اللَّهُمَّ بَارِكْ لَنَا فِيمَا رَزَقْتَنَا',
              translation: 'हे अल्लाह, जो तूने हमें दिया है उसमें बरकत दे'
            }
          ],
          surahs: ['अल-फातिहा (आवश्यक)', 'अल-काफिरून', 'अल-इखलास', 'अल-फलक', 'अन-नास'],
          tasbih: [
            {
              arabic: 'سُبْحَانَ اللَّهِ',
              translation: 'अल्लाह पाक है',
              count: '33 बार'
            },
            {
              arabic: 'الْحَمْدُ لِلَّهِ',
              translation: 'अल्लाह की हम्द है',
              count: '33 बार'
            },
            {
              arabic: 'اللَّهُ أَكْبَرُ',
              translation: 'अल्लाह सबसे बड़ा है',
              count: '34 बार'
            }
          ],
          benefits: [
            'दिन भर सुरक्षा',
            'आध्यात्मिक शुद्धता',
            'दिव्य आशीर्वाद और दया',
            'रोज़ी में वृद्धि',
            'मन की शांति'
          ]
        },
        bn: {
          description: 'ফজরের নামাজ সূর্যোদয়ের আগে আদায় করা হয় এবং এটি পাঁচ ওয়াক্ত ফরজ নামাজের মধ্যে প্রথম। ইসলামে এর বিশেষ গুরুত্ব রয়েছে।',
          method: [
            'ফজর নামাজের নিয়ত করুন',
            'তাকবীরাতুল ইহরাম (আল্লাহু আকবার)',
            'সূরা আল-ফাতিহা পড়ুন',
            'অন্য একটি সূরা পড়ুন (লম্বা সূরা ভালো)',
            'রুকু করুন',
            'রুকু থেকে দাঁড়ান',
            'দুইবার সিজদা করুন',
            'তাশাহহুদের জন্য বসুন',
            'সালামের মাধ্যমে শেষ করুন'
          ],
          duas: [
            {
              arabic: 'اللَّهُمَّ بَارِكْ لَنَا فِيمَا رَزَقْتَنَا',
              translation: 'হে আল্লাহ, তুমি আমাদের যা দিয়েছ তাতে বরকত দাও'
            }
          ],
          surahs: ['আল-ফাতিহা (আবশ্যক)', 'আল-কাফিরুন', 'আল-ইখলাস', 'আল-ফালাক', 'আন-নাস'],
          tasbih: [
            {
              arabic: 'سُبْحَانَ اللَّهِ',
              translation: 'আল্লাহ পবিত্র',
              count: '৩৩ বার'
            },
            {
              arabic: 'الْحَمْدُ لِلَّهِ',
              translation: 'সমস্ত প্রশংসা আল্লাহর',
              count: '৩৩ বার'
            },
            {
              arabic: 'اللَّهُ أَكْبَرُ',
              translation: 'আল্লাহ সবচেয়ে বড়',
              count: '৩৪ বার'
            }
          ],
          benefits: [
            'সারাদিন সুরক্ষা',
            'আধ্যাত্মিক পবিত্রতা',
            'আল্লাহর রহমত ও বরকত',
            'রিজিক বৃদ্ধি',
            'মানসিক শান্তি'
          ]
        }
      }
    },
    {
      id: 'dhuhr',
      nameEn: 'Dhuhr',
      nameAr: 'الظهر',
      nameHi: 'ज़ुहर',
      nameBn: 'যুহর',
      category: 'fard',
      rakats: '4 Rakat',
      timing: 'Midday',
      color: 'from-blue-400 to-indigo-500',
      videoId: 'dQw4w9WgXcQ',
      content: {
        en: {
          description: 'The midday prayer performed when the sun reaches its zenith. It is the second of the five daily obligatory prayers.',
          method: [
            'Make intention (Niyyah) for Dhuhr prayer',
            'Perform 4 Rakats with proper recitation',
            'First 2 Rakats: Recite Fatiha + another Surah aloud',
            'Last 2 Rakats: Recite only Fatiha silently',
            'Complete with Tashahhud and Tasleem'
          ],
          duas: [
            {
              arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
              translation: 'Our Lord, give us good in this world and good in the next world, and save us from the punishment of the Fire'
            }
          ],
          surahs: ['Al-Fatiha (Required)', 'Al-Baqarah (verses)', 'Al-Imran (verses)', 'An-Nisa (verses)'],
          tasbih: [
            {
              arabic: 'أَسْتَغْفِرُ اللَّهَ',
              translation: 'I seek forgiveness from Allah',
              count: '100 times'
            }
          ],
          benefits: [
            'Midday spiritual renewal',
            'Protection from afternoon trials',
            'Increased focus and productivity',
            'Divine guidance for daily affairs'
          ]
        },
        ar: {
          description: 'صلاة الظهر تؤدى عند زوال الشمس وهي ثاني الصلوات الخمس المفروضة.',
          method: [
            'النية لصلاة الظهر',
            'أداء 4 ركعات مع القراءة الصحيحة',
            'الركعتان الأوليان: قراءة الفاتحة + سورة أخرى جهراً',
            'الركعتان الأخيرتان: قراءة الفاتحة فقط سراً',
            'الانتهاء بالتشهد والتسليم'
          ],
          duas: [
            {
              arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
              translation: 'ربنا آتنا في الدنيا حسنة وفي الآخرة حسنة وقنا عذاب النار'
            }
          ],
          surahs: ['الفاتحة (مطلوبة)', 'البقرة (آيات)', 'آل عمران (آيات)', 'النساء (آيات)'],
          tasbih: [
            {
              arabic: 'أَسْتَغْفِرُ اللَّهَ',
              translation: 'أستغفر الله',
              count: '100 مرة'
            }
          ],
          benefits: [
            'التجديد الروحي في منتصف النهار',
            'الحماية من محن بعد الظهر',
            'زيادة التركيز والإنتاجية',
            'الهداية الإلهية للشؤون اليومية'
          ]
        },
        hi: {
          description: 'ज़ुहर की नमाज़ दोपहर में सूर्य के चरम पर पहुंचने पर पढ़ी जाती है। यह पांच दैनिक अनिवार्य नमाज़ों में से दूसरी है।',
          method: [
            'ज़ुहर नमाज़ की नीयत करें',
            'सही तरीके से 4 रकअत पढ़ें',
            'पहली 2 रकअत: फातिहा + दूसरी सूरह ज़ोर से',
            'आखिरी 2 रकअत: केवल फातिहा चुपचाप',
            'तशह्हुद और सलाम के साथ समाप्त करें'
          ],
          duas: [
            {
              arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
              translation: 'हे हमारे रब, हमें दुनिया में भलाई दे और आखिरत में भी भलाई दे और आग के अज़ाब से बचा'
            }
          ],
          surahs: ['अल-फातिहा (आवश्यक)', 'अल-बकरा (आयतें)', 'आल-इमरान (आयतें)', 'अन-निसा (आयतें)'],
          tasbih: [
            {
              arabic: 'أَسْتَغْفِرُ اللَّهَ',
              translation: 'मैं अल्लाह से माफी मांगता हूं',
              count: '100 बार'
            }
          ],
          benefits: [
            'दोपहर में आध्यात्मिक नवीनीकरण',
            'दोपहर की परीक्षाओं से सुरक्षा',
            'फोकस और उत्पादकता में वृद्धि',
            'दैनिक मामलों के लिए दिव्य मार्गदर्शन'
          ]
        },
        bn: {
          description: 'যুহরের নামাজ দুপুরে সূর্য মধ্য আকাশে পৌঁছানোর সময় আদায় করা হয়। এটি পাঁচ ওয়াক্ত ফরজ নামাজের মধ্যে দ্বিতীয়।',
          method: [
            'যুহর নামাজের নিয়ত করুন',
            'সঠিক নিয়মে ৪ রাকাত পড়ুন',
            'প্রথম ২ রাকাত: ফাতিহা + অন্য সূরা উচ্চস্বরে',
            'শেষ ২ রাকাত: শুধু ফাতিহা নিঃশব্দে',
            'তাশাহহুদ ও সালামের মাধ্যমে শেষ করুন'
          ],
          duas: [
            {
              arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
              translation: 'হে আমাদের রব, আমাদের দুনিয়াতে কল্যাণ দাও এবং আখিরাতেও কল্যাণ দাও এবং জাহান্নামের আজাব থেকে রক্ষা করো'
            }
          ],
          surahs: ['আল-ফাতিহা (আবশ্যক)', 'আল-বাকারা (আয়াত)', 'আল-ইমরান (আয়াত)', 'আন-নিসা (আয়াত)'],
          tasbih: [
            {
              arabic: 'أَسْتَغْفِرُ اللَّهَ',
              translation: 'আমি আল্লাহর কাছে ক্ষমা চাই',
              count: '১০০ বার'
            }
          ],
          benefits: [
            'দুপুরে আধ্যাত্মিক নবায়ন',
            'বিকেলের পরীক্ষা থেকে সুরক্ষা',
            'মনোযোগ ও উৎপাদনশীলতা বৃদ্ধি',
            'দৈনন্দিন বিষয়ে আল্লাহর হেদায়েত'
          ]
        }
      }
    },
    {
      id: 'asr',
      nameEn: 'Asr',
      nameAr: 'العصر',
      nameHi: 'अस्र',
      nameBn: 'আসর',
      category: 'fard',
      rakats: '4 Rakat',
      timing: 'Afternoon',
      color: 'from-amber-400 to-yellow-500',
      videoId: 'dQw4w9WgXcQ',
      content: {
        en: {
          description: 'The afternoon prayer performed when the sun begins to decline. It is the third of the five daily obligatory prayers and holds great importance in Islam.',
          method: [
            'Make intention (Niyyah) for Asr prayer',
            'Perform 4 Rakats with proper recitation',
            'First 2 Rakats: Recite Fatiha + another Surah silently',
            'Last 2 Rakats: Recite only Fatiha silently',
            'Complete with Tashahhud and Tasleem'
          ],
          duas: [
            {
              arabic: 'اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ',
              translation: 'O Allah, help me to remember You, thank You, and worship You in the best manner'
            }
          ],
          surahs: ['Al-Fatiha (Required)', 'Al-Asr', 'Al-Kawthar', 'Al-Maun', 'Quraish'],
          tasbih: [
            {
              arabic: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ',
              translation: 'There is no god but Allah alone, with no partner',
              count: '10 times'
            }
          ],
          benefits: [
            'Protection during afternoon hours',
            'Spiritual strength for remaining day',
            'Increased focus and productivity',
            'Divine guidance for evening activities'
          ]
        },
        ar: {
          description: 'صلاة العصر تؤدى عند ميل الشمس وهي ثالث الصلوات الخمس المفروضة وتحمل أهمية عظيمة في الإسلام.',
          method: [
            'النية لصلاة العصر',
            'أداء 4 ركعات مع القراءة الصحيحة',
            'الركعتان الأوليان: قراءة الفاتحة + سورة أخرى سراً',
            'الركعتان الأخيرتان: قراءة الفاتحة فقط سراً',
            'الانتهاء بالتشهد والتسليم'
          ],
          duas: [
            {
              arabic: 'اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ',
              translation: 'اللهم أعني على ذكرك وشكرك وحسن عبادتك'
            }
          ],
          surahs: ['الفاتحة (مطلوبة)', 'العصر', 'الكوثر', 'الماعون', 'قريش'],
          tasbih: [
            {
              arabic: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ',
              translation: 'لا إله إلا الله وحده لا شريك له',
              count: '10 مرات'
            }
          ],
          benefits: [
            'الحماية خلال ساعات بعد الظهر',
            'القوة الروحية لبقية اليوم',
            'زيادة التركيز والإنتاجية',
            'الهداية الإلهية لأنشطة المساء'
          ]
        },
        hi: {
          description: 'अस्र की नमाज़ दोपहर में सूर्य के ढलने पर पढ़ी जाती है। यह पांच दैनिक अनिवार्य नमाज़ों में से तीसरी है और इस्लाम में इसका बहुत महत्व है।',
          method: [
            'अस्र नमाज़ की नीयत करें',
            'सही तरीके से 4 रकअत पढ़ें',
            'पहली 2 रकअत: फातिहा + दूसरी सूरह चुपचाप',
            'आखिरी 2 रकअत: केवल फातिहा चुपचाप',
            'तशह्हुद और सलाम के साथ समाप्त करें'
          ],
          duas: [
            {
              arabic: 'اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ',
              translation: 'हे अल्लाह, मुझे अपनी याद, शुक्र और बेहतरीन इबादत में मदद कर'
            }
          ],
          surahs: ['अल-फातिहा (आवश्यक)', 'अल-अस्र', 'अल-कौसर', 'अल-माऊन', 'कुरैश'],
          tasbih: [
            {
              arabic: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ',
              translation: 'अल्लाह के सिवा कोई माबूद नहीं, वह अकेला है, उसका कोई साझीदार नहीं',
              count: '10 बार'
            }
          ],
          benefits: [
            'दोपहर के घंटों में सुरक्षा',
            'बाकी दिन के लिए आध्यात्मिक शक्ति',
            'फोकस और उत्पादकता में वृद्धि',
            'शाम की गतिविधियों के लिए दिव्य मार्गदर्शन'
          ]
        },
        bn: {
          description: 'আসরের নামাজ বিকেলে সূর্য ঢলে যাওয়ার সময় আদায় করা হয়। এটি পাঁচ ওয়াক্ত ফরজ নামাজের মধ্যে তৃতীয় এবং ইসলামে এর অত্যন্ত গুরুত্ব রয়েছে।',
          method: [
            'আসর নামাজের নিয়ত করুন',
            'সঠিক নিয়মে ৪ রাকাত পড়ুন',
            'প্রথম ২ রাকাত: ফাতিহা + অন্য সূরা নিঃশব্দে',
            'শেষ ২ রাকাত: শুধু ফাতিহা নিঃশব্দে',
            'তাশাহহুদ ও সালামের মাধ্যমে শেষ করুন'
          ],
          duas: [
            {
              arabic: 'اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ',
              translation: 'হে আল্লাহ, তোমার স্মরণ, কৃতজ্ঞতা এবং উত্তম ইবাদতে আমাকে সাহায্য করো'
            }
          ],
          surahs: ['আল-ফাতিহা (আবশ্যক)', 'আল-আসর', 'আল-কাউসার', 'আল-মাউন', 'কুরাইশ'],
          tasbih: [
            {
              arabic: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ',
              translation: 'আল্লাহ ছাড়া কোনো ইলাহ নেই, তিনি একক, তাঁর কোনো শরিক নেই',
              count: '১০ বার'
            }
          ],
          benefits: [
            'বিকেলের সময় সুরক্ষা',
            'বাকি দিনের জন্য আধ্যাত্মিক শক্তি',
            'মনোযোগ ও উৎপাদনশীলতা বৃদ্ধি',
            'সন্ধ্যার কার্যক্রমের জন্য আল্লাহর হেদায়েত'
          ]
        }
      }
    },
    {
      id: 'maghrib',
      nameEn: 'Maghrib',
      nameAr: 'المغرب',
      nameHi: 'मगरिब',
      nameBn: 'মাগরিব',
      category: 'fard',
      rakats: '3 Rakat',
      timing: 'Sunset',
      color: 'from-orange-500 to-red-600',
      videoId: 'dQw4w9WgXcQ',
      content: {
        en: {
          description: 'The sunset prayer performed immediately after sunset. It is the fourth of the five daily obligatory prayers and marks the transition from day to night.',
          method: [
            'Make intention (Niyyah) for Maghrib prayer',
            'Perform 3 Rakats with proper recitation',
            'First 2 Rakats: Recite Fatiha + another Surah aloud',
            'Third Rakat: Recite only Fatiha aloud',
            'Complete with Tashahhud and Tasleem'
          ],
          duas: [
            {
              arabic: 'اللَّهُمَّ أَعِذْنِي مِنَ النَّارِ',
              translation: 'O Allah, protect me from the Fire'
            }
          ],
          surahs: ['Al-Fatiha (Required)', 'Al-Kafirun', 'Al-Ikhlas', 'Al-Falaq', 'An-Nas'],
          tasbih: [
            {
              arabic: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
              translation: 'There is no god but Allah alone, with no partner. His is the dominion and His is the praise, and He is able to do all things',
              count: '10 times'
            }
          ],
          benefits: [
            'Protection during the night',
            'Forgiveness of daily sins',
            'Peace and tranquility',
            'Preparation for the night ahead'
          ]
        },
        ar: {
          description: 'صلاة المغرب تؤدى فور غروب الشمس وهي رابع الصلوات الخمس المفروضة وتمثل الانتقال من النهار إلى الليل.',
          method: [
            'النية لصلاة المغرب',
            'أداء 3 ركعات مع القراءة الصحيحة',
            'الركعتان الأوليان: قراءة الفاتحة + سورة أخرى جهراً',
            'الركعة الثالثة: قراءة الفاتحة فقط جهراً',
            'الانتهاء بالتشهد والتسليم'
          ],
          duas: [
            {
              arabic: 'اللَّهُمَّ أَعِذْنِي مِنَ النَّارِ',
              translation: 'اللهم أعذني من النار'
            }
          ],
          surahs: ['الفاتحة (مطلوبة)', 'الكافرون', 'الإخلاص', 'الفلق', 'الناس'],
          tasbih: [
            {
              arabic: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
              translation: 'لا إله إلا الله وحده لا شريك له له الملك وله الحمد وهو على كل شيء قدير',
              count: '10 مرات'
            }
          ],
          benefits: [
            'الحماية أثناء الليل',
            'مغفرة ذنوب اليوم',
            'السلام والطمأنينة',
            'الاستعداد لليلة القادمة'
          ]
        },
        hi: {
          description: 'मगरिब की नमाज़ सूर्यास्त के तुरंत बाद पढ़ी जाती है। यह पांच दैनिक अनिवार्य नमाज़ों में से चौथी है और दिन से रात के संक्रमण को दर्शाती है।',
          method: [
            'मगरिब नमाज़ की नीयत करें',
            'सही तरीके से 3 रकअत पढ़ें',
            'पहली 2 रकअत: फातिहा + दूसरी सूरह ज़ोर से',
            'तीसरी रकअत: केवल फातिहा ज़ोर से',
            'तशह्हुद और सलाम के साथ समाप्त करें'
          ],
          duas: [
            {
              arabic: 'اللَّهُمَّ أَعِذْنِي مِنَ النَّارِ',
              translation: 'हे अल्लाह, मुझे आग से बचा'
            }
          ],
          surahs: ['अल-फातिहा (आवश्यक)', 'अल-काफिरून', 'अल-इखलास', 'अल-फलक', 'अन-नास'],
          tasbih: [
            {
              arabic: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
              translation: 'अल्लाह के सिवा कोई माबूद नहीं, वह अकेला है, उसका कोई साझीदार नहीं, उसी की बादशाहत है, उसी की हम्द है, और वह हर चीज़ पर क़ादिर है',
              count: '10 बार'
            }
          ],
          benefits: [
            'रात के दौरान सुरक्षा',
            'दिन के गुनाहों की माफी',
            'शांति और सुकून',
            'आने वाली रात की तैयारी'
          ]
        },
        bn: {
          description: 'মাগরিবের নামাজ সূর্যাস্তের সাথে সাথে আদায় করা হয়। এটি পাঁচ ওয়াক্ত ফরজ নামাজের মধ্যে চতুর্থ এবং দিন থেকে রাতের রূপান্তর নির্দেশ করে।',
          method: [
            'মাগরিব নামাজের নিয়ত করুন',
            'সঠিক নিয়মে ৩ রাকাত পড়ুন',
            'প্রথম ২ রাকাত: ফাতিহা + অন্য সূরা উচ্চস্বরে',
            'তৃতীয় রাকাত: শুধু ফাতিহা উচ্চস্বরে',
            'তাশাহহুদ ও সালামের মাধ্যমে শেষ করুন'
          ],
          duas: [
            {
              arabic: 'اللَّهُمَّ أَعِذْنِي مِنَ النَّارِ',
              translation: 'হে আল্লাহ, আমাকে জাহান্নাম থেকে রক্ষা করো'
            }
          ],
          surahs: ['আল-ফাতিহা (আবশ্যক)', 'আল-কাফিরুন', 'আল-ইখলাস', 'আল-ফালাক', 'আন-নাস'],
          tasbih: [
            {
              arabic: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
              translation: 'আল্লাহ ছাড়া কোনো ইলাহ নেই, তিনি একক, তাঁর কোনো শরিক নেই, তাঁরই রাজত্ব, তাঁরই প্রশংসা, এবং তিনি সবকিছুর উপর ক্ষমতাবান',
              count: '১০ বার'
            }
          ],
          benefits: [
            'রাতের সময় সুরক্ষা',
            'দিনের পাপের ক্ষমা',
            'শান্তি ও প্রশান্তি',
            'আগামী রাতের প্রস্তুতি'
          ]
        }
      }
    },
    {
      id: 'isha',
      nameEn: 'Isha',
      nameAr: 'العشاء',
      nameHi: 'इशा',
      nameBn: 'এশা',
      category: 'fard',
      rakats: '4 Rakat',
      timing: 'Night',
      color: 'from-indigo-500 to-purple-600',
      videoId: 'dQw4w9WgXcQ',
      content: {
        en: {
          description: 'The night prayer performed after the twilight has disappeared. It is the fifth and final of the daily obligatory prayers, completing the cycle of worship.',
          method: [
            'Make intention (Niyyah) for Isha prayer',
            'Perform 4 Rakats with proper recitation',
            'First 2 Rakats: Recite Fatiha + another Surah aloud',
            'Last 2 Rakats: Recite only Fatiha silently',
            'Complete with Tashahhud and Tasleem'
          ],
          duas: [
            {
              arabic: 'اللَّهُمَّ أَجِرْنِي مِنَ النَّارِ',
              translation: 'O Allah, save me from the Fire'
            }
          ],
          surahs: ['Al-Fatiha (Required)', 'Al-Mulk', 'As-Sajdah', 'Al-Waqi\'ah', 'Al-Hashr'],
          tasbih: [
            {
              arabic: 'أَسْتَغْفِرُ اللَّهَ',
              translation: 'I seek forgiveness from Allah',
              count: '100 times'
            }
          ],
          benefits: [
            'Protection throughout the night',
            'Peaceful sleep',
            'Forgiveness of sins',
            'Preparation for the next day'
          ]
        },
        ar: {
          description: 'صلاة العشاء تؤدى بعد اختفاء الشفق وهي خامس وآخر الصلوات اليومية المفروضة، مكملة دورة العبادة.',
          method: [
            'النية لصلاة العشاء',
            'أداء 4 ركعات مع القراءة الصحيحة',
            'الركعتان الأوليان: قراءة الفاتحة + سورة أخرى جهراً',
            'الركعتان الأخيرتان: قراءة الفاتحة فقط سراً',
            'الانتهاء بالتشهد والتسليم'
          ],
          duas: [
            {
              arabic: 'اللَّهُمَّ أَجِرْنِي مِنَ النَّارِ',
              translation: 'اللهم أجرني من النار'
            }
          ],
          surahs: ['الفاتحة (مطلوبة)', 'الملك', 'السجدة', 'الواقعة', 'الحشر'],
          tasbih: [
            {
              arabic: 'أَسْتَغْفِرُ اللَّهَ',
              translation: 'أستغفر الله',
              count: '100 مرة'
            }
          ],
          benefits: [
            'الحماية طوال الليل',
            'النوم الهادئ',
            'مغفرة الذنوب',
            'الاستعداد لليوم التالي'
          ]
        },
        hi: {
          description: 'इशा की नमाज़ शाम की लालिमा गायब होने के बाद पढ़ी जाती है। यह पांच दैनिक अनिवार्य नमाज़ों में से पांचवीं और अंतिम है, जो इबादत के चक्र को पूरा करती है।',
          method: [
            'इशा नमाज़ की नीयत करें',
            'सही तरीके से 4 रकअत पढ़ें',
            'पहली 2 रकअत: फातिहा + दूसरी सूरह ज़ोर से',
            'आखिरी 2 रकअत: केवल फातिहा चुपचाप',
            'तशह्हुद और सलाम के साथ समाप्त करें'
          ],
          duas: [
            {
              arabic: 'اللَّهُمَّ أَجِرْنِي مِنَ النَّارِ',
              translation: 'हे अल्लाह, मुझे आग से बचा'
            }
          ],
          surahs: ['अल-फातिहा (आवश्यक)', 'अल-मुल्क', 'अस-सजदा', 'अल-वाकिया', 'अल-हश्र'],
          tasbih: [
            {
              arabic: 'أَسْتَغْفِرُ اللَّهَ',
              translation: 'मैं अल्लाह से माफी मांगता हूं',
              count: '100 बार'
            }
          ],
          benefits: [
            'रात भर सुरक्षा',
            'शांतिपूर्ण नींद',
            'गुनाहों की माफी',
            'अगले दिन की तैयारी'
          ]
        },
        bn: {
          description: 'এশার নামাজ সন্ধ্যার লালিমা অদৃশ্য হওয়ার পর আদায় করা হয়। এটি পাঁচ ওয়াক্ত ফরজ নামাজের মধ্যে পঞ্চম ও শেষ, যা ইবাদতের চক্র সম্পূর্ণ করে।',
          method: [
            'এশা নামাজের নিয়ত করুন',
            'সঠিক নিয়মে ৪ রাকাত পড়ুন',
            'প্রথম ২ রাকাত: ফাতিহা + অন্য সূরা উচ্চস্বরে',
            'শেষ ২ রাকাত: শুধু ফাতিহা নিঃশব্দে',
            'তাশাহহুদ ও সালামের মাধ্যমে শেষ করুন'
          ],
          duas: [
            {
              arabic: 'اللَّهُمَّ أَجِرْنِي مِنَ النَّارِ',
              translation: 'হে আল্লাহ, আমাকে জাহান্নাম থেকে রক্ষা করো'
            }
          ],
          surahs: ['আল-ফাতিহা (আবশ্যক)', 'আল-মুলক', 'আস-সাজদাহ', 'আল-ওয়াকিয়াহ', 'আল-হাশর'],
          tasbih: [
            {
              arabic: 'أَسْتَغْفِرُ اللَّهَ',
              translation: 'আমি আল্লাহর কাছে ক্ষমা চাই',
              count: '১০০ বার'
            }
          ],
          benefits: [
            'সারারাত সুরক্ষা',
            'শান্তিপূর্ণ ঘুম',
            'পাপের ক্ষমা',
            'পরের দিনের প্রস্তুতি'
          ]
        }
      }
    },
    // Special Event Prayers
    {
      id: 'eid-fitr',
      nameEn: 'Eid ul Fitr',
      nameAr: 'عيد الفطر',
      nameHi: 'ईद उल फ़ित्र',
      nameBn: 'ঈদুল ফিতর',
      category: 'special',
      rakats: '2 Rakat',
      timing: 'After Sunrise',
      color: 'from-green-400 to-emerald-500',
      videoId: 'dQw4w9WgXcQ',
      content: {
        en: {
          description: 'The festival prayer marking the end of Ramadan, the holy month of fasting. It is a celebration of spiritual achievement and community unity.',
          method: [
            'Perform Ghusl (full body purification)',
            'Wear best clothes and apply perfume',
            'Eat dates before going to prayer',
            'Go to prayer ground (Eidgah) or mosque',
            'Listen to Khutbah (sermon) after prayer',
            'Exchange greetings and gifts',
            'Give Zakat ul Fitr before prayer'
          ],
          duas: [
            {
              arabic: 'اللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ لَا إِلَهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ وَلِلَّهِ الْحَمْدُ',
              translation: 'Allah is Greatest, Allah is Greatest, there is no god but Allah, and Allah is Greatest, Allah is Greatest, and to Allah belongs all praise'
            }
          ],
          surahs: ['Al-Fatiha', 'Al-A\'la (The Most High)', 'Al-Ghashiyah (The Overwhelming)'],
          tasbih: [
            {
              arabic: 'اللَّهُ أَكْبَرُ',
              translation: 'Allah is Greatest',
              count: 'Throughout the day'
            }
          ],
          benefits: [
            'Community bonding and unity',
            'Celebration of spiritual achievement',
            'Forgiveness of sins',
            'Joy and happiness',
            'Strengthening family ties'
          ]
        },
        ar: {
          description: 'صلاة عيد الفطر تُؤدى في نهاية شهر رمضان المبارك، وهي احتفال بالإنجاز الروحي ووحدة المجتمع.',
          method: [
            'الاغتسال (التطهر الكامل)',
            'لبس أفضل الثياب ووضع العطر',
            'أكل التمر قبل الذهاب للصلاة',
            'الذهاب إلى المصلى أو المسجد',
            'الاستماع للخطبة بعد الصلاة',
            'تبادل التهاني والهدايا',
            'إخراج زكاة الفطر قبل الصلاة'
          ],
          duas: [
            {
              arabic: 'اللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ لَا إِلَهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ وَلِلَّهِ الْحَمْدُ',
              translation: 'الله أكبر الله أكبر لا إله إلا الله والله أكبر الله أكبر ولله الحمد'
            }
          ],
          surahs: ['الفاتحة', 'الأعلى', 'الغاشية'],
          tasbih: [
            {
              arabic: 'اللَّهُ أَكْبَرُ',
              translation: 'الله أكبر',
              count: 'طوال اليوم'
            }
          ],
          benefits: [
            'الترابط والوحدة المجتمعية',
            'الاحتفال بالإنجاز الروحي',
            'مغفرة الذنوب',
            'الفرح والسعادة',
            'تقوية الروابط الأسرية'
          ]
        },
        hi: {
          description: 'ईद उल फ़ित्र की नमाज़ रमज़ान के पवित्र महीने के अंत में पढ़ी जाती है। यह आध्यात्मिक उपलब्धि और सामुदायिक एकता का उत्सव है।',
          method: [
            'गुस्ल (पूर्ण शरीर की सफाई) करें',
            'सबसे अच्छे कपड़े पहनें और इत्र लगाएं',
            'नमाज़ जाने से पहले खजूर खाएं',
            'ईदगाह या मस्जिद जाएं',
            'नमाज़ के बाद खुत्बा (उपदेश) सुनें',
            'बधाई और उपहारों का आदान-प्रदान करें',
            'नमाज़ से पहले ज़कात उल फ़ित्र दें'
          ],
          duas: [
            {
              arabic: 'اللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ لَا إِلَهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ وَلِلَّهِ الْحَمْدُ',
              translation: 'अल्लाह सबसे बड़ा है, अल्लाह सबसे बड़ा है, अल्लाह के सिवा कोई माबूद नहीं, और अल्लाह सबसे बड़ा है, अल्लाह सबसे बड़ा है, और अल्लाह की सारी तारीफ है'
            }
          ],
          surahs: ['अल-फातिहा', 'अल-आला', 'अल-गाशिया'],
          tasbih: [
            {
              arabic: 'اللَّهُ أَكْبَرُ',
              translation: 'अल्लाह सबसे बड़ा है',
              count: 'पूरे दिन'
            }
          ],
          benefits: [
            'सामुदायिक बंधन और एकता',
            'आध्यात्मिक उपलब्धि का उत्सव',
            'पापों की माफी',
            'खुशी और प्रसन्नता',
            'पारिवारिक संबंधों को मजबूत बनाना'
          ]
        },
        bn: {
          description: 'ঈদুল ফিতরের নামাজ রমজান মাসের শেষে আদায় করা হয়। এটি আধ্যাত্মিক অর্জন এবং সামাজিক ঐক্যের উৎসব।',
          method: [
            'গোসল (সম্পূর্ণ শরীর পবিত্রতা) করুন',
            'সেরা পোশাক পরুন এবং সুগন্ধি ব্যবহার করুন',
            'নামাজে যাওয়ার আগে খেজুর খান',
            'ঈদগাহ বা মসজিদে যান',
            'নামাজের পর খুতবা (উপদেশ) শুনুন',
            'শুভেচ্ছা ও উপহার বিনিময় করুন',
            'নামাজের আগে জাকাতুল ফিতর দিন'
          ],
          duas: [
            {
              arabic: 'اللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ لَا إِلَهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ وَلِلَّهِ الْحَمْدُ',
              translation: 'আল্লাহ সবচেয়ে বড়, আল্লাহ সবচেয়ে বড়, আল্লাহ ছাড়া কোনো ইলাহ নেই, এবং আল্লাহ সবচেয়ে বড়, আল্লাহ সবচেয়ে বড়, এবং সমস্ত প্রশংসা আল্লাহর'
            }
          ],
          surahs: ['আল-ফাতিহা', 'আল-আ\'লা', 'আল-গাশিয়াহ'],
          tasbih: [
            {
              arabic: 'اللَّهُ أَكْبَرُ',
              translation: 'আল্লাহ সবচেয়ে বড়',
              count: 'সারাদিন'
            }
          ],
          benefits: [
            'সামাজিক বন্ধন ও ঐক্য',
            'আধ্যাত্মিক অর্জনের উৎসব',
            'পাপের ক্ষমা',
            'আনন্দ ও খুশি',
            'পারিবারিক বন্ধন দৃঢ়করণ'
          ]
        }
      }
    },
    {
      id: 'eid-adha',
      nameEn: 'Eid ul Adha',
      nameAr: 'عيد الأضحى',
      nameHi: 'ईद उल अज़हा',
      nameBn: 'ঈদুল আযহা',
      category: 'special',
      rakats: '2 Rakat',
      timing: 'After Sunrise',
      color: 'from-red-400 to-pink-500',
      videoId: 'dQw4w9WgXcQ',
      content: {
        en: {
          description: 'The festival of sacrifice commemorating Prophet Ibrahim\'s willingness to sacrifice his son for Allah. It is celebrated during the Hajj pilgrimage season.',
          method: [
            'Perform Ghusl and wear best clothes',
            'Do not eat before prayer (unlike Eid ul Fitr)',
            'Go to prayer ground or mosque early',
            'Perform 2 Rakats with extra Takbirs',
            'Listen to Khutbah after prayer',
            'Perform Qurbani (sacrifice) if able',
            'Distribute meat to poor and needy'
          ],
          duas: [
            {
              arabic: 'اللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ لَا إِلَهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ وَلِلَّهِ الْحَمْدُ',
              translation: 'Allah is Greatest, Allah is Greatest, there is no god but Allah, and Allah is Greatest, Allah is Greatest, and to Allah belongs all praise'
            }
          ],
          surahs: ['Al-Fatiha', 'Al-Kawthar', 'Al-A\'la', 'Al-Ghashiyah'],
          tasbih: [
            {
              arabic: 'اللَّهُ أَكْبَرُ',
              translation: 'Allah is Greatest',
              count: 'Throughout the day'
            }
          ],
          benefits: [
            'Commemoration of Prophet Ibrahim\'s sacrifice',
            'Community unity and celebration',
            'Spiritual purification through sacrifice',
            'Helping the poor and needy',
            'Strengthening bonds of brotherhood'
          ]
        },
        ar: {
          description: 'عيد الأضحى يحتفل بذكرى استعداد النبي إبراهيم للتضحية بابنه لله، ويحتفل به خلال موسم الحج.',
          method: [
            'الاغتسال ولبس أفضل الثياب',
            'عدم الأكل قبل الصلاة (خلافاً لعيد الفطر)',
            'الذهاب مبكراً إلى المصلى أو المسجد',
            'أداء ركعتين مع التكبيرات الإضافية',
            'الاستماع للخطبة بعد الصلاة',
            'أداء القربان إن أمكن',
            'توزيع اللحم على الفقراء والمحتاجين'
          ],
          duas: [
            {
              arabic: 'اللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ لَا إِلَهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ وَلِلَّهِ الْحَمْدُ',
              translation: 'الله أكبر الله أكبر لا إله إلا الله والله أكبر الله أكبر ولله الحمد'
            }
          ],
          surahs: ['الفاتحة', 'الكوثر', 'الأعلى', 'الغاشية'],
          tasbih: [
            {
              arabic: 'اللَّهُ أَكْبَرُ',
              translation: 'الله أكبر',
              count: 'طوال اليوم'
            }
          ],
          benefits: [
            'إحياء ذكرى تضحية النبي إبراهيم',
            'الوحدة والاحتفال المجتمعي',
            'التطهير الروحي من خلال التضحية',
            'مساعدة الفقراء والمحتاجين',
            'تقوية روابط الأخوة'
          ]
        },
        hi: {
          description: 'ईद उल अज़हा हज़रत इब्राहीम अलैहिस्सलाम की अपने बेटे को अल्लाह के लिए कुर्बान करने की तैयारी की याद में मनाई जाती है। यह हज के मौसम में मनाई जाती है।',
          method: [
            'गुस्ल करें और सबसे अच्छे कपड़े पहनें',
            'नमाज़ से पहले न खाएं (ईद उल फ़ित्र के विपरीत)',
            'जल्दी ईदगाह या मस्जिद जाएं',
            'अतिरिक्त तकबीरों के साथ 2 रकअत पढ़ें',
            'नमाज़ के बाद खुत्बा सुनें',
            'यदि सक्षम हों तो कुर्बानी करें',
            'गरीबों और जरूरतमंदों में गोश्त बांटें'
          ],
          duas: [
            {
              arabic: 'اللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ لَا إِلَهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ وَلِلَّهِ الْحَمْدُ',
              translation: 'अल्लाह सबसे बड़ा है, अल्लाह सबसे बड़ा है, अल्लाह के सिवा कोई माबूद नहीं, और अल्लाह सबसे बड़ा है, अल्लाह सबसे बड़ा है, और अल्लाह की सारी तारीफ है'
            }
          ],
          surahs: ['अल-फातिहा', 'अल-कौसर', 'अल-आला', 'अल-गाशिया'],
          tasbih: [
            {
              arabic: 'اللَّهُ أَكْبَرُ',
              translation: 'अल्लाह सबसे बड़ा है',
              count: 'पूरे दिन'
            }
          ],
          benefits: [
            'हज़रत इब्राहीम की कुर्बानी की याद',
            'सामुदायिक एकता और उत्सव',
            'कुर्बानी के माध्यम से आध्यात्मिक शुद्धता',
            'गरीबों और जरूरतमंदों की मदद',
            'भाईचारे के बंधन को मजबूत बनाना'
          ]
        },
        bn: {
          description: 'ঈদুল আযহা হযরত ইব্রাহীম আলাইহিস সালামের তাঁর পুত্রকে আল্লাহর জন্য কুরবানী করার প্রস্তুতির স্মরণে পালিত হয়। এটি হজের মৌসুমে উদযাপিত হয়।',
          method: [
            'গোসল করুন এবং সেরা পোশাক পরুন',
            'নামাজের আগে খাবেন না (ঈদুল ফিতরের বিপরীতে)',
            'তাড়াতাড়ি ঈদগাহ বা মসজিদে যান',
            'অতিরিক্ত তাকবীরসহ ২ রাকাত পড়ুন',
            'নামাজের পর খুতবা শুনুন',
            'সক্ষম হলে কুরবানী করুন',
            'গরিব ও অভাবীদের মধ্যে গোশত বিতরণ করুন'
          ],
          duas: [
            {
              arabic: 'اللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ لَا إِلَهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ وَلِلَّهِ الْحَمْدُ',
              translation: 'আল্লাহ সবচেয়ে বড়, আল্লাহ সবচেয়ে বড়, আল্লাহ ছাড়া কোনো ইলাহ নেই, এবং আল্লাহ সবচেয়ে বড়, আল্লাহ সবচেয়ে বড়, এবং সমস্ত প্রশংসা আল্লাহর'
            }
          ],
          surahs: ['আল-ফাতিহা', 'আল-কাউসার', 'আল-আ\'লা', 'আল-গাশিয়াহ'],
          tasbih: [
            {
              arabic: 'اللَّهُ أَكْبَرُ',
              translation: 'আল্লাহ সবচেয়ে বড়',
              count: 'সারাদিন'
            }
          ],
          benefits: [
            'হযরত ইব্রাহীমের কুরবানীর স্মরণ',
            'সামাজিক ঐক্য ও উৎসব',
            'কুরবানীর মাধ্যমে আধ্যাত্মিক পবিত্রতা',
            'গরিব ও অভাবীদের সাহায্য',
            'ভ্রাতৃত্বের বন্ধন দৃঢ়করণ'
          ]
        }
      }
    },
    {
      id: 'tarawih',
      nameEn: 'Tarawih',
      nameAr: 'التراويح',
      nameHi: 'तरावीह',
      nameBn: 'তারাবীহ',
      category: 'special',
      rakats: '8-20 Rakat',
      timing: 'After Isha in Ramadan',
      color: 'from-purple-400 to-indigo-500',
      videoId: 'dQw4w9WgXcQ',
      content: {
        en: {
          description: 'Special night prayers performed during the month of Ramadan after Isha prayer. It involves recitation of the Quran in a beautiful, melodious manner.',
          method: [
            'Perform after Isha prayer during Ramadan',
            'Pray in sets of 2 Rakats with short breaks',
            'Listen to beautiful Quran recitation',
            'Can be prayed individually or in congregation',
            'Usually 8, 12, or 20 Rakats total',
            'Take short breaks between sets for rest',
            'End with Witr prayer'
          ],
          duas: [
            {
              arabic: 'اللَّهُمَّ اعْتِقْ رَقَبَتِي مِنَ النَّارِ',
              translation: 'O Allah, free my neck from the Fire'
            }
          ],
          surahs: ['Al-Fatiha', 'Long Surahs from Quran', 'Al-Baqarah', 'Al-Imran', 'An-Nisa'],
          tasbih: [
            {
              arabic: 'سُبْحَانَ الْمَلِكِ الْقُدُّوسِ',
              translation: 'Glory be to the King, the Holy',
              count: '3 times after each set'
            }
          ],
          benefits: [
            'Spiritual elevation during Ramadan',
            'Complete Quran recitation over the month',
            'Community bonding and unity',
            'Increased reward and forgiveness',
            'Preparation for Laylat al-Qadr'
          ]
        },
        ar: {
          description: 'صلاة التراويح هي صلاة ليلية خاصة تؤدى خلال شهر رمضان بعد صلاة العشاء، وتتضمن تلاوة القرآن بطريقة جميلة ومؤثرة.',
          method: [
            'تؤدى بعد صلاة العشاء خلال رمضان',
            'الصلاة مثنى مثنى مع استراحات قصيرة',
            'الاستماع لتلاوة القرآن الجميلة',
            'يمكن أداؤها فردياً أو جماعة',
            'عادة 8 أو 12 أو 20 ركعة إجمالاً',
            'أخذ استراحات قصيرة بين المجموعات',
            'الانتهاء بصلاة الوتر'
          ],
          duas: [
            {
              arabic: 'اللَّهُمَّ اعْتِقْ رَقَبَتِي مِنَ النَّارِ',
              translation: 'اللهم اعتق رقبتي من النار'
            }
          ],
          surahs: ['الفاتحة', 'السور الطويلة من القرآن', 'البقرة', 'آل عمران', 'النساء'],
          tasbih: [
            {
              arabic: 'سُبْحَانَ الْمَلِكِ الْقُدُّوسِ',
              translation: 'سبحان الملك القدوس',
              count: '3 مرات بعد كل مجموعة'
            }
          ],
          benefits: [
            'الارتقاء الروحي خلال رمضان',
            'ختم القرآن الكامل خلال الشهر',
            'الترابط والوحدة المجتمعية',
            'زيادة الأجر والمغفرة',
            'الاستعداد لليلة القدر'
          ]
        },
        hi: {
          description: 'तरावीह रमज़ान के महीने में इशा की नमाज़ के बाद पढ़ी जाने वाली विशेष रात्रि नमाज़ है। इसमें कुरआन का सुंदर और मधुर तिलावत होता है।',
          method: [
            'रमज़ान में इशा नमाज़ के बाद पढ़ें',
            '2-2 रकअत के सेट में छोटे ब्रेक के साथ',
            'कुरआन की सुंदर तिलावत सुनें',
            'अकेले या जमाअत में पढ़ सकते हैं',
            'आमतौर पर कुल 8, 12, या 20 रकअत',
            'सेट के बीच आराम के लिए छोटे ब्रेक लें',
            'वित्र नमाज़ के साथ समाप्त करें'
          ],
          duas: [
            {
              arabic: 'اللَّهُمَّ اعْتِقْ رَقَبَتِي مِنَ النَّارِ',
              translation: 'हे अल्लाह, मेरी गर्दन को आग से आज़ाद कर'
            }
          ],
          surahs: ['अल-फातिहा', 'कुरआन की लंबी सूरतें', 'अल-बकरा', 'आल-इमरान', 'अन-निसा'],
          tasbih: [
            {
              arabic: 'سُبْحَانَ الْمَلِكِ الْقُدُّوسِ',
              translation: 'पाक है बादशाह, पवित्र',
              count: 'हर सेट के बाद 3 बार'
            }
          ],
          benefits: [
            'रमज़ान में आध्यात्मिक उन्नति',
            'महीने भर में पूरे कुरआन की तिलावत',
            'सामुदायिक एकता और बंधन',
            'बढ़ा हुआ सवाब और माफी',
            'लैलतुल कद्र की तैयारी'
          ]
        },
        bn: {
          description: 'তারাবীহ রমজান মাসে এশার নামাজের পর আদায় করা বিশেষ রাত্রি নামাজ। এতে কুরআনের সুন্দর ও মধুর তিলাওয়াত হয়।',
          method: [
            'রমজানে এশার নামাজের পর পড়ুন',
            '২-২ রাকাত করে ছোট বিরতি সহ',
            'কুরআনের সুন্দর তিলাওয়াত শুনুন',
            'একা বা জামাতে পড়া যায়',
            'সাধারণত মোট ৮, ১২, বা ২০ রাকাত',
            'সেটের মাঝে বিশ্রামের জন্য ছোট বিরতি নিন',
            'বিতর নামাজ দিয়ে শেষ করুন'
          ],
          duas: [
            {
              arabic: 'اللَّهُمَّ اعْتِقْ رَقَبَتِي مِنَ النَّارِ',
              translation: 'হে আল্লাহ, আমার গর্দানকে জাহান্নাম থেকে মুক্ত করো'
            }
          ],
          surahs: ['আল-ফাতিহা', 'কুরআনের দীর্ঘ সূরা', 'আল-বাকারা', 'আল-ইমরান', 'আন-নিসা'],
          tasbih: [
            {
              arabic: 'سُبْحَانَ الْمَلِكِ الْقُدُّوسِ',
              translation: 'পবিত্র বাদশাহ, পবিত্র',
              count: 'প্রতি সেটের পর ৩ বার'
            }
          ],
          benefits: [
            'রমজানে আধ্যাত্মিক উন্নতি',
            'মাস জুড়ে সম্পূর্ণ কুরআন তিলাওয়াত',
            'সামাজিক ঐক্য ও বন্ধন',
            'বর্ধিত সওয়াব ও ক্ষমা',
            'লাইলাতুল কদরের প্রস্তুতি'
          ]
        }
      }
    },
    {
      id: 'shab-e-barat',
      nameEn: 'Shab-e-Barat',
      nameAr: 'ليلة البراءة',
      nameHi: 'शब-ए-बरात',
      nameBn: 'শবে বরাত',
      category: 'special',
      rakats: 'Variable',
      timing: '15th night of Sha\'ban',
      color: 'from-indigo-400 to-purple-500',
      videoId: 'dQw4w9WgXcQ',
      content: {
        en: {
          description: 'The Night of Forgiveness, observed on the 15th night of Sha\'ban. It is believed to be a night when Allah\'s mercy and forgiveness are abundant.',
          method: [
            'Perform extra prayers throughout the night',
            'Recite Quran extensively',
            'Make sincere dua and istighfar',
            'Visit graves of deceased family members',
            'Give charity to the poor',
            'Seek forgiveness for past sins',
            'Pray for family and community'
          ],
          duas: [
            {
              arabic: 'اللَّهُمَّ اغْفِرْ لِي ذَنْبِي وَخَطَئِي وَجَهْلِي',
              translation: 'O Allah, forgive my sins, my mistakes, and my ignorance'
            }
          ],
          surahs: ['Al-Fatiha', 'Yasin', 'Al-Mulk', 'Al-Waqi\'ah', 'Ad-Dukhan'],
          tasbih: [
            {
              arabic: 'أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ الَّذِي لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ وَأَتُوبُ إِلَيْهِ',
              translation: 'I seek forgiveness from Allah, the Magnificent, there is no god but He, the Ever-Living, the Self-Sustaining, and I turn to Him in repentance',
              count: '100 times'
            }
          ],
          benefits: [
            'Abundant forgiveness from Allah',
            'Spiritual purification',
            'Increased mercy and blessings',
            'Protection from calamities',
            'Preparation for Ramadan'
          ]
        },
        ar: {
          description: 'ليلة البراءة تُحيا في الليلة الخامسة عشرة من شعبان، ويُعتقد أنها ليلة تكثر فيها رحمة الله ومغفرته.',
          method: [
            'أداء صلوات إضافية طوال الليل',
            'تلاوة القرآن بكثرة',
            'الدعاء الصادق والاستغفار',
            'زيارة قبور أفراد العائلة المتوفين',
            'إعطاء الصدقة للفقراء',
            'طلب المغفرة للذنوب الماضية',
            'الدعاء للعائلة والمجتمع'
          ],
          duas: [
            {
              arabic: 'اللَّهُمَّ اغْفِرْ لِي ذَنْبِي وَخَطَئِي وَجَهْلِي',
              translation: 'اللهم اغفر لي ذنبي وخطئي وجهلي'
            }
          ],
          surahs: ['الفاتحة', 'يس', 'الملك', 'الواقعة', 'الدخان'],
          tasbih: [
            {
              arabic: 'أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ الَّذِي لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ وَأَتُوبُ إِلَيْهِ',
              translation: 'أستغفر الله العظيم الذي لا إله إلا هو الحي القيوم وأتوب إليه',
              count: '100 مرة'
            }
          ],
          benefits: [
            'المغفرة الوافرة من الله',
            'التطهير الروحي',
            'زيادة الرحمة والبركات',
            'الحماية من المصائب',
            'الاستعداد لرمضان'
          ]
        },
        hi: {
          description: 'शब-ए-बरात शाबान महीने की 15वीं रात मनाई जाती है। माना जाता है कि यह रात अल्लाह की रहमत और माफी से भरपूर होती है।',
          method: [
            'रात भर अतिरिक्त नमाज़ें पढ़ें',
            'कुरआन की व्यापक तिलावत करें',
            'सच्ची दुआ और इस्तिगफार करें',
            'मृत परिवारजनों की कब्रों पर जाएं',
            'गरीबों को दान दें',
            'पिछले गुनाहों की माफी मांगें',
            'परिवार और समुदाय के लिए दुआ करें'
          ],
          duas: [
            {
              arabic: 'اللَّهُمَّ اغْفِرْ لِي ذَنْبِي وَخَطَئِي وَجَهْلِي',
              translation: 'हे अल्लाह, मेरे गुनाह, गलतियां और अज्ञानता को माफ कर'
            }
          ],
          surahs: ['अल-फातिहा', 'यासीन', 'अल-मुल्क', 'अल-वाकिया', 'अद-दुखान'],
          tasbih: [
            {
              arabic: 'أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ الَّذِي لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ وَأَتُوبُ إِلَيْهِ',
              translation: 'मैं अल्लाह अज़ीम से माफी मांगता हूं जिसके सिवा कोई माबूद नहीं, वह ज़िंदा है, कायम है, और मैं उसकी तरफ तौबा करता हूं',
              count: '100 बार'
            }
          ],
          benefits: [
            'अल्लाह से भरपूर माफी',
            'रूहानी सफाई',
            'बढ़ी हुई रहमत और बरकतें',
            'मुसीबतों से हिफाज़त',
            'रमज़ान की तैयारी'
          ]
        },
        bn: {
          description: 'শবে বরাত শাবান মাসের ১৫তম রাতে পালিত হয়। বিশ্বাস করা হয় যে এই রাতে আল্লাহর রহমত ও ক্ষমা প্রচুর পরিমাণে বর্ষিত হয়।',
          method: [
            'সারারাত অতিরিক্ত নামাজ পড়ুন',
            'ব্যাপকভাবে কুরআন তিলাওয়াত করুন',
            'আন্তরিক দোয়া ও ইস্তিগফার করুন',
            'মৃত পরিবারের সদস্যদের কবর জিয়ারত করুন',
            'গরিবদের দান করুন',
            'অতীতের পাপের জন্য ক্ষমা চান',
            'পরিবার ও সমাজের জন্য দোয়া করুন'
          ],
          duas: [
            {
              arabic: 'اللَّهُمَّ اغْفِرْ لِي ذَنْبِي وَخَطَئِي وَجَهْلِي',
              translation: 'হে আল্লাহ, আমার পাপ, ভুল ও অজ্ঞতা ক্ষমা করো'
            }
          ],
          surahs: ['আল-ফাতিহা', 'ইয়াসীন', 'আল-মুলক', 'আল-ওয়াকিয়াহ', 'আদ-দুখান'],
          tasbih: [
            {
              arabic: 'أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ الَّذِي لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ وَأَتُوبُ إِلَيْهِ',
              translation: 'আমি মহান আল্লাহর কাছে ক্ষমা চাই যিনি ছাড়া কোনো ইলাহ নেই, তিনি চিরঞ্জীব, চিরস্থায়ী, এবং আমি তাঁর কাছে তওবা করি',
              count: '১০০ বার'
            }
          ],
          benefits: [
            'আল্লাহর প্রচুর ক্ষমা',
            'আধ্যাত্মিক পবিত্রতা',
            'বর্ধিত রহমত ও বরকত',
            'বিপদ থেকে সুরক্ষা',
            'রমজানের প্রস্তুতি'
          ]
        }
      }
    },
    {
      id: 'shab-e-qadr',
      nameEn: 'Shab-e-Qadr',
      nameAr: 'ليلة القدر',
      nameHi: 'शब-ए-कद्र',
      nameBn: 'শবে কদর',
      category: 'special',
      rakats: 'Variable',
      timing: 'Last 10 nights of Ramadan',
      color: 'from-yellow-400 to-orange-500',
      videoId: 'dQw4w9WgXcQ',
      content: {
        en: {
          description: 'The Night of Power, better than a thousand months. It occurs in the last 10 nights of Ramadan, particularly on odd nights. This is when the Quran was first revealed.',
          method: [
            'Stay awake during the last 10 nights of Ramadan',
            'Perform extensive prayers and dhikr',
            'Recite Quran abundantly',
            'Make sincere dua for forgiveness',
            'Engage in istighfar continuously',
            'Seek Allah\'s mercy and blessings',
            'Pray for the entire Ummah'
          ],
          duas: [
            {
              arabic: 'اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي',
              translation: 'O Allah, You are Oft-Forgiving and You love forgiveness, so forgive me'
            }
          ],
          surahs: ['Al-Fatiha', 'Al-Qadr', 'Al-Baqarah', 'Al-Imran', 'Yasin'],
          tasbih: [
            {
              arabic: 'لَا إِلَهَ إِلَّا اللَّهُ',
              translation: 'There is no god but Allah',
              count: '1000 times'
            }
          ],
          benefits: [
            'Worship equivalent to 1000+ months',
            'Complete forgiveness of sins',
            'Angels descend with peace',
            'Destiny for the coming year is written',
            'Unlimited spiritual rewards'
          ]
        },
        ar: {
          description: 'ليلة القدر خير من ألف شهر، تحدث في العشر الأواخر من رمضان، خاصة في الليالي الوترية. هذه الليلة نزل فيها القرآن أول مرة.',
          method: [
            'السهر خلال العشر الأواخر من رمضان',
            'أداء صلوات وذكر مكثف',
            'تلاوة القرآن بكثرة',
            'الدعاء الصادق للمغفرة',
            'الاستغفار المستمر',
            'طلب رحمة الله وبركاته',
            'الدعاء للأمة جمعاء'
          ],
          duas: [
            {
              arabic: 'اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي',
              translation: 'اللهم إنك عفو تحب العفو فاعف عني'
            }
          ],
          surahs: ['الفاتحة', 'القدر', 'البقرة', 'آل عمران', 'يس'],
          tasbih: [
            {
              arabic: 'لَا إِلَهَ إِلَّا اللَّهُ',
              translation: 'لا إله إلا الله',
              count: '1000 مرة'
            }
          ],
          benefits: [
            'عبادة تعادل أكثر من 1000 شهر',
            'المغفرة الكاملة للذنوب',
            'نزول الملائكة بالسلام',
            'كتابة القدر للسنة القادمة',
            'أجور روحية لا محدودة'
          ]
        },
        hi: {
          description: 'शब-ए-कद्र हज़ार महीनों से बेहतर रात है। यह रमज़ान के आखिरी 10 रातों में होती है, खासकर ताक रातों में। इसी रात कुरआन का पहला नुज़ूल हुआ था।',
          method: [
            'रमज़ान की आखिरी 10 रातों में जागते रहें',
            'व्यापक नमाज़ें और ज़िक्र करें',
            'कुरआन की भरपूर तिलावत करें',
            'माफी के लिए सच्ची दुआ करें',
            'लगातार इस्तिगफार करें',
            'अल्लाह की रहमत और बरकत मांगें',
            'पूरी उम्मत के लिए दुआ करें'
          ],
          duas: [
            {
              arabic: 'اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي',
              translation: 'हे अल्लाह, तू माफ करने वाला है और माफी को पसंद करता है, तो मुझे माफ कर दे'
            }
          ],
          surahs: ['अल-फातिहा', 'अल-कद्र', 'अल-बकरा', 'आल-इमरान', 'यासीन'],
          tasbih: [
            {
              arabic: 'لَا إِلَهَ إِلَّا اللَّهُ',
              translation: 'अल्लाह के सिवा कोई माबूद नहीं',
              count: '1000 बार'
            }
          ],
          benefits: [
            '1000+ महीनों के बराबर इबादत',
            'गुनाहों की पूरी माफी',
            'फरिश्तों का सलामती के साथ नुज़ूल',
            'आने वाले साल की तकदीर लिखी जाती है',
            'असीमित रूहानी सवाब'
          ]
        },
        bn: {
          description: 'শবে কদর হাজার মাসের চেয়ে উত্তম রাত। এটি রমজানের শেষ ১০ রাতে ঘটে, বিশেষত বেজোড় রাতগুলোতে। এই রাতেই কুরআনের প্রথম অবতরণ হয়েছিল।',
          method: [
            'রমজানের শেষ ১০ রাত জেগে থাকুন',
            'ব্যাপক নামাজ ও জিকির করুন',
            'প্রচুর কুরআন তিলাওয়াত করুন',
            'ক্ষমার জন্য আন্তরিক দোয়া করুন',
            'ক্রমাগত ইস্তিগফার করুন',
            'আল্লাহর রহমত ও বরকত চান',
            'সমগ্র উম্মাহর জন্য দোয়া করুন'
          ],
          duas: [
            {
              arabic: 'اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي',
              translation: 'হে আল্লাহ, তুমি ক্ষমাশীল এবং ক্ষমা পছন্দ করো, তাই আমাকে ক্ষমা করো'
            }
          ],
          surahs: ['আল-ফাতিহা', 'আল-কদর', 'আল-বাকারা', 'আল-ইমরান', 'ইয়াসীন'],
          tasbih: [
            {
              arabic: 'لَا إِلَهَ إِلَّا اللَّهُ',
              translation: 'আল্লাহ ছাড়া কোনো ইলাহ নেই',
              count: '১০০০ বার'
            }
          ],
          benefits: [
            '১০০০+ মাসের সমান ইবাদত',
            'পাপের সম্পূর্ণ ক্ষমা',
            'ফেরেশতাদের শান্তি নিয়ে অবতরণ',
            'আগামী বছরের তকদীর লেখা হয়',
            'অসীম আধ্যাত্মিক সওয়াব'
          ]
        }
      }
    },
    // Sunnah & Nafl Prayers
    {
      id: 'tahajjud',
      nameEn: 'Tahajjud',
      nameAr: 'التهجد',
      nameHi: 'तहज्जुद',
      nameBn: 'তাহাজ্জুদ',
      category: 'sunnah',
      rakats: '2-12 Rakat',
      timing: 'Last third of night',
      color: 'from-purple-400 to-pink-500',
      videoId: 'dQw4w9WgXcQ',
      content: {
        en: {
          description: 'The night vigil prayer performed in the last third of the night. It is one of the most beloved prayers to Allah and brings the servant closest to their Creator.',
          method: [
            'Wake up in the last third of the night',
            'Perform Wudu (ablution)',
            'Start with 2 light Rakats',
            'Pray in sets of 2 Rakats',
            'Make lengthy Dua between sets',
            'Recite long portions of Quran',
            'End with Witr prayer (odd number)',
            'Make sincere Dua and Istighfar'
          ],
          duas: [
            {
              arabic: 'اللَّهُمَّ لَكَ الْحَمْدُ أَنْتَ نُورُ السَّمَاوَاتِ وَالْأَرْضِ',
              translation: 'O Allah, to You belongs all praise. You are the Light of the heavens and the earth'
            }
          ],
          surahs: ['Al-Fatiha', 'Al-Baqarah (long verses)', 'Al-Imran (long verses)', 'Al-Mulk', 'As-Sajdah'],
          tasbih: [
            {
              arabic: 'أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ',
              translation: 'I seek forgiveness from Allah, the Magnificent',
              count: '100 times'
            },
            {
              arabic: 'لَا إِلَهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ',
              translation: 'There is no god but You, Glory be to You, indeed I was among the wrongdoers',
              count: '100 times'
            }
          ],
          benefits: [
            'Closest time to Allah',
            'Sins are forgiven',
            'Duas are accepted',
            'Spiritual purification',
            'Peace and tranquility',
            'Protection from evil',
            'Increased sustenance'
          ]
        },
        ar: {
          description: 'صلاة التهجد تُؤدى في الثلث الأخير من الليل، وهي من أحب الصلوات إلى الله وتقرب العبد إلى خالقه.',
          method: [
            'الاستيقاظ في الثلث الأخير من الليل',
            'الوضوء',
            'البدء بركعتين خفيفتين',
            'الصلاة مثنى مثنى',
            'الدعاء الطويل بين المجموعات',
            'قراءة أجزاء طويلة من القرآن',
            'الانتهاء بصلاة الوتر',
            'الدعاء الصادق والاستغفار'
          ],
          duas: [
            {
              arabic: 'اللَّهُمَّ لَكَ الْحَمْدُ أَنْتَ نُورُ السَّمَاوَاتِ وَالْأَرْضِ',
              translation: 'اللهم لك الحمد أنت نور السماوات والأرض'
            }
          ],
          surahs: ['الفاتحة', 'البقرة (آيات طويلة)', 'آل عمران (آيات طويلة)', 'الملك', 'السجدة'],
          tasbih: [
            {
              arabic: 'أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ',
              translation: 'أستغفر الله العظيم',
              count: '100 مرة'
            },
            {
              arabic: 'لَا إِلَهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ',
              translation: 'لا إله إلا أنت سبحانك إني كنت من الظالمين',
              count: '100 مرة'
            }
          ],
          benefits: [
            'أقرب وقت إلى الله',
            'مغفرة الذنوب',
            'إجابة الدعوات',
            'التطهير الروحي',
            'السلام والطمأنينة',
            'الحماية من الشر',
            'زيادة الرزق'
          ]
        },
        hi: {
          description: 'तहज्जुद की नमाज़ रात के अंतिम तिहाई में पढ़ी जाती है। यह अल्लाह को सबसे प्रिय नमाज़ों में से एक है और बंदे को अपने रब के सबसे करीब ले जाती है।',
          method: [
            'रात के अंतिम तिहाई में जागें',
            'वुज़ू करें',
            '2 हल्की रकअत से शुरुआत करें',
            '2-2 रकअत के सेट में नमाज़ पढ़ें',
            'सेट के बीच लंबी दुआ करें',
            'कुरआन के लंबे हिस्से पढ़ें',
            'वित्र नमाज़ के साथ समाप्त करें',
            'सच्ची दुआ और इस्तिगफार करें'
          ],
          duas: [
            {
              arabic: 'اللَّهُمَّ لَكَ الْحَمْدُ أَنْتَ نُورُ السَّمَاوَاتِ وَالْأَرْضِ',
              translation: 'हे अल्लाह, तेरे लिए सारी हम्द है, तू आसमानों और ज़मीन का नूर है'
            }
          ],
          surahs: ['अल-फातिहा', 'अल-बकरा (लंबी आयतें)', 'आल-इमरान (लंबी आयतें)', 'अल-मुल्क', 'अस-सजदा'],
          tasbih: [
            {
              arabic: 'أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ',
              translation: 'मैं अल्लाह अज़ीम से माफी मांगता हूं',
              count: '100 बार'
            },
            {
              arabic: 'لَا إِلَهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ',
              translation: 'तेरे सिवा कोई माबूद नहीं, तू पाक है, मैं ज़ालिमों में से था',
              count: '100 बार'
            }
          ],
          benefits: [
            'अल्लाह के सबसे करीब का समय',
            'गुनाहों की माफी',
            'दुआओं की कबूलियत',
            'रूहानी सफाई',
            'सुकून और शांति',
            'बुराई से हिफाज़त',
            'रिज़्क में बरकत'
          ]
        },
        bn: {
          description: 'তাহাজ্জুদের নামাজ রাতের শেষ তৃতীয়াংশে আদায় করা হয়। এটি আল্লাহর কাছে সবচেয়ে প্রিয় নামাজগুলোর একটি এবং বান্দাকে তার স্রষ্টার সবচেয়ে কাছে নিয়ে যায়।',
          method: [
            'রাতের শেষ তৃতীয়াংশে জেগে উঠুন',
            'অজু করুন',
            '২ রাকাত হালকা নামাজ দিয়ে শুরু করুন',
            '২-২ রাকাত করে নামাজ পড়ুন',
            'সেটের মাঝে দীর্ঘ দোয়া করুন',
            'কুরআনের দীর্ঘ অংশ পড়ুন',
            'বিতর নামাজ দিয়ে শেষ করুন',
            'আন্তরিক দোয়া ও ইস্তিগফার করুন'
          ],
          duas: [
            {
              arabic: 'اللَّهُمَّ لَكَ الْحَمْدُ أَنْتَ نُورُ السَّمَاوَاتِ وَالْأَرْضِ',
              translation: 'হে আল্লাহ, তোমার জন্যই সমস্ত প্রশংসা, তুমি আসমান ও জমিনের নূর'
            }
          ],
          surahs: ['আল-ফাতিহা', 'আল-বাকারা (দীর্ঘ আয়াত)', 'আল-ইমরান (দীর্ঘ আয়াত)', 'আল-মুলক', 'আস-সাজদাহ'],
          tasbih: [
            {
              arabic: 'أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ',
              translation: 'আমি মহান আল্লাহর কাছে ক্ষমা চাই',
              count: '১০০ বার'
            },
            {
              arabic: 'لَا إِلَهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ',
              translation: 'তুমি ছাড়া কোনো ইলাহ নেই, তুমি পবিত্র, আমি জালিমদের অন্তর্ভুক্ত ছিলাম',
              count: '১০০ বার'
            }
          ],
          benefits: [
            'আল্লাহর সবচেয়ে কাছের সময়',
            'পাপের ক্ষমা',
            'দোয়া কবুল',
            'আধ্যাত্মিক পবিত্রতা',
            'শান্তি ও প্রশান্তি',
            'অনিষ্ট থেকে সুরক্ষা',
            'রিজিক বৃদ্ধি'
          ]
        }
      }
    },
    {
      id: 'istikhara',
      nameEn: 'Istikhara',
      nameAr: 'صلاة الاستخارة',
      nameHi: 'इस्तिखारा',
      nameBn: 'ইস্তিখারা',
      category: 'sunnah',
      rakats: '2 Rakat',
      timing: 'When making decisions',
      color: 'from-purple-500 to-pink-500',
      videoId: 'dQw4w9WgXcQ',
      content: {
        en: {
          description: 'Istikhara is a prayer of guidance performed when making important decisions, seeking Allah\'s guidance to choose what is best.',
          method: [
            'Perform ablution and pray 2 Rakats',
            'Recite Surah Al-Kafirun in first Rakat',
            'Recite Surah Al-Ikhlas in second Rakat',
            'Make Istikhara dua after Salam'
          ],
          duas: [
            {
              arabic: 'اللَّهُمَّ إِنِّي أَسْتَخِيرُكَ بِعِلْمِكَ، وَأَسْتَقْدِرُكَ بِقُدْرَتِكَ، وَأَسْأَلُكَ مِنْ فَضْلِكَ الْعَظِيمِ',
              translation: 'O Allah, I seek Your guidance through Your knowledge, and I seek Your help through Your power, and I ask You from Your great bounty.'
            }
          ],
          surahs: ['Al-Fatiha', 'Al-Kafirun', 'Al-Ikhlas'],
          tasbih: [
            {
              arabic: 'سُبْحَانَ اللَّهِ',
              translation: 'Glory be to Allah',
              count: '33 times'
            },
            {
              arabic: 'الْحَمْدُ لِلَّهِ',
              translation: 'All praise is due to Allah',
              count: '33 times'
            },
            {
              arabic: 'اللَّهُ أَكْبَرُ',
              translation: 'Allah is the Greatest',
              count: '34 times'
            }
          ],
          benefits: [
            'Receiving divine guidance for important decisions',
            'Peace of heart',
            'Blessings in choices made'
          ]
        },
        ar: {
          description: 'صلاة الاستخارة هي صلاة يصليها المسلم عندما يريد أن يختار بين أمرين أو أكثر، يطلب فيها من الله تعالى أن يختار له الخير',
          method: [
            'توضأ وصل ركعتين',
            'اقرأ في الركعة الأولى سورة الكافرون',
            'اقرأ في الركعة الثانية سورة الإخلاص',
            'ادع بدعاء الاستخارة بعد السلام'
          ],
          duas: [
            {
              arabic: 'اللَّهُمَّ إِنِّي أَسْتَخِيرُكَ بِعِلْمِكَ، وَأَسْتَقْدِرُكَ بِقُدْرَتِكَ، وَأَسْأَلُكَ مِنْ فَضْلِكَ الْعَظِيمِ',
              translation: 'اللهم إني أستخيرك بعلمك، وأستقدرك بقدرتك، وأسألك من فضلك العظيم'
            }
          ],
          surahs: ['الفاتحة', 'الكافرون', 'الإخلاص'],
          tasbih: [
            {
              arabic: 'سُبْحَانَ اللَّهِ',
              translation: 'سبحان الله',
              count: '33 مرة'
            },
            {
              arabic: 'الْحَمْدُ لِلَّهِ',
              translation: 'الحمد لله',
              count: '33 مرة'
            },
            {
              arabic: 'اللَّهُ أَكْبَرُ',
              translation: 'الله أكبر',
              count: '34 مرة'
            }
          ],
          benefits: [
            'الحصول على الهداية الإلهية في اتخاذ القرارات المهمة',
            'السكينة في القلب',
            'البركة في الاختيار'
          ]
        },
        hi: {
          description: 'इस्तिखारा एक मार्गदर्शन की नमाज़ है जो महत्वपूर्ण निर्णय लेते समय पढ़ी जाती है, अल्लाह से बेहतर चुनने की दुआ करते हुए।',
          method: [
            'वुज़ू करके 2 रकअत नमाज़ पढ़ें',
            'पहली रकअत में सूरह अल-काफिरून पढ़ें',
            'दूसरी रकअत में सूरह अल-इख़लास पढ़ें',
            'सलाम के बाद इस्तिखारा की दुआ करें'
          ],
          duas: [
            {
              arabic: 'اللَّهُمَّ إِنِّي أَسْتَخِيرُكَ بِعِلْمِكَ، وَأَسْتَقْدِرُكَ بِقُدْرَتِكَ، وَأَسْأَلُكَ مِنْ فَضْلِكَ الْعَظِيمِ',
              translation: 'ऐ अल्लाह! मैं तेरे इल्म से तुझसे भलाई चाहता हूँ, तेरी कुदरत से ताकत माँगता हूँ, और तेरे महान फज़्ल से सवाल करता हूँ।'
            }
          ],
          surahs: ['अल-फातिहा', 'अल-काफिरून', 'अल-इखलास'],
          tasbih: [
            {
              arabic: 'سُبْحَانَ اللَّهِ',
              translation: 'अल्लाह पाक है',
              count: '33 बार'
            },
            {
              arabic: 'الْحَمْدُ لِلَّهِ',
              translation: 'अल्लाह की हम्द है',
              count: '33 बार'
            },
            {
              arabic: 'اللَّهُ أَكْبَرُ',
              translation: 'अल्लाह सबसे बड़ा है',
              count: '34 बार'
            }
          ],
          benefits: [
            'महत्वपूर्ण निर्णयों के लिए दिव्य मार्गदर्शन प्राप्त करना',
            'दिल की शांति',
            'किए गए विकल्पों में बरकत'
          ]
        },
        bn: {
          description: 'ইস্তিখারা হল একটি পথনির্দেশনার নামাজ যা গুরুত্বপূর্ণ সিদ্ধান্ত নেওয়ার সময় পড়া হয়, আল্লাহর কাছে সর্বোত্তম বেছে নেওয়ার জন্য দোয়া করে।',
          method: [
            'অজু করে ২ রাকাত নামাজ পড়ুন',
            'প্রথম রাকাতে সূরা আল-কাফিরুন পড়ুন',
            'দ্বিতীয় রাকাতে সূরা আল-ইখলাস পড়ুন',
            'সালামের পর ইস্তিখারার দোয়া করুন'
          ],
          duas: [
            {
              arabic: 'اللَّهُمَّ إِنِّي أَسْتَخِيرُكَ بِعِلْمِكَ، وَأَسْتَقْدِرُكَ بِقُدْرَتِكَ، وَأَسْأَلُكَ مِنْ فَضْلِكَ الْعَظِيمِ',
              translation: 'হে আল্লাহ! আমি তোমার জ্ঞানের মাধ্যমে তোমার কাছে কল্যাণ চাই, তোমার শক্তির মাধ্যমে সাহায্য চাই, এবং তোমার মহান অনুগ্রহ থেকে প্রার্থনা করি।'
            }
          ],
          surahs: ['আল-ফাতিহা', 'আল-কাফিরুন', 'আল-ইখলাস'],
          tasbih: [
            {
              arabic: 'سُبْحَانَ اللَّهِ',
              translation: 'আল্লাহ পবিত্র',
              count: '৩৩ বার'
            },
            {
              arabic: 'الْحَمْدُ لِلَّهِ',
              translation: 'সমস্ত প্রশংসা আল্লাহর',
              count: '৩৩ বার'
            },
            {
              arabic: 'اللَّهُ أَكْبَرُ',
              translation: 'আল্লাহ সবচেয়ে বড়',
              count: '৩৪ বার'
            }
          ],
          benefits: [
            'গুরুত্বপূর্ণ সিদ্ধান্তের জন্য ইলাহী পথনির্দেশনা পাওয়া',
            'হৃদয়ের শান্তি',
            'গৃহীত পছন্দে বরকত'
          ]
        }
      }
    }
  ];

  const getPrayersByCategory = (category: string) => {
    return prayers.filter(prayer => prayer.category === category);
  };

  const getContent = (prayer: Prayer, field: keyof PrayerContent) => {
    const content = prayer.content[selectedLanguage as keyof typeof prayer.content];
    return content[field];
  };

  const getPrayerName = (prayer: Prayer) => {
    const nameMap = {
      en: prayer.nameEn,
      ar: prayer.nameAr,
      hi: prayer.nameHi,
      bn: prayer.nameBn,
    };
    return nameMap[selectedLanguage as keyof typeof nameMap] || prayer.nameEn;
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  if (selectedPrayer) {
    return (
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className={`bg-gradient-to-r ${selectedPrayer.color} text-white p-6 rounded-t-2xl`}>
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setSelectedPrayer(null)}
              className="flex items-center px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
            >
              ← Back to Prayers
            </button>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm opacity-80">{selectedPrayer.timing}</div>
                <div className="font-medium">{selectedPrayer.rakats}</div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2">
              {getPrayerName(selectedPrayer)}
            </h1>
            <p className="text-lg opacity-90">
              {getContent(selectedPrayer, 'description')}
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-b-2xl shadow-xl border-x border-b border-gray-200 dark:border-gray-600">
          <div className="grid lg:grid-cols-2 gap-8 p-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Prayer Method */}
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border-l-4 border-blue-400">
                <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-4 flex items-center">
                  <Book className="w-5 h-5 mr-2" />
                  Prayer Method
                </h3>
                <ol className="space-y-2">
                  {(getContent(selectedPrayer, 'method') as string[]).map((step, index) => (
                    <li key={index} className="flex items-start">
                      <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">
                        {index + 1}
                      </span>
                      <span className="text-blue-700 dark:text-blue-300">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Duas & Supplications */}
              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl border-l-4 border-green-400">
                <h3 className="font-semibold text-green-800 dark:text-green-300 mb-4 flex items-center">
                  <Heart className="w-5 h-5 mr-2" />
                  Duas & Supplications
                </h3>
                <div className="space-y-4">
                  {(getContent(selectedPrayer, 'duas') as any[]).map((dua, index) => (
                    <div key={index} className="bg-white dark:bg-gray-700 p-4 rounded-lg">
                      <div className="text-2xl font-arabic text-green-800 dark:text-green-300 mb-2 text-right" dir="rtl">
                        {dua.arabic}
                      </div>
                      <p className="text-green-700 dark:text-green-400 italic">
                        {dua.translation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Surahs */}
              <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-xl border-l-4 border-purple-400">
                <h3 className="font-semibold text-purple-800 dark:text-purple-300 mb-4 flex items-center">
                  <Book className="w-5 h-5 mr-2" />
                  Recommended Surahs
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {(getContent(selectedPrayer, 'surahs') as string[]).map((surah, index) => (
                    <div key={index} className="flex items-center p-2 bg-white dark:bg-gray-700 rounded">
                      <Star className="w-4 h-4 text-purple-500 mr-2" />
                      <span className="text-purple-700 dark:text-purple-300">{surah}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Tasbih & Dhikr */}
              <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-xl border-l-4 border-amber-400">
                <h3 className="font-semibold text-amber-800 dark:text-amber-300 mb-4 flex items-center">
                  <Star className="w-5 h-5 mr-2" />
                  Tasbih & Dhikr
                </h3>
                <div className="space-y-4">
                  {(getContent(selectedPrayer, 'tasbih') as any[]).map((tasbih, index) => (
                    <div key={index} className="bg-white dark:bg-gray-700 p-4 rounded-lg">
                      <div className="text-xl font-arabic text-amber-800 dark:text-amber-300 mb-2 text-right" dir="rtl">
                        {tasbih.arabic}
                      </div>
                      <p className="text-amber-700 dark:text-amber-400 italic mb-1">
                        {tasbih.translation}
                      </p>
                      <div className="text-sm text-amber-600 dark:text-amber-500 font-medium">
                        {tasbih.count}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits & Virtues */}
              <div className="bg-rose-50 dark:bg-rose-900/20 p-6 rounded-xl border-l-4 border-rose-400">
                <h3 className="font-semibold text-rose-800 dark:text-rose-300 mb-4 flex items-center">
                  <Heart className="w-5 h-5 mr-2" />
                  Benefits & Virtues
                </h3>
                <ul className="space-y-2">
                  {(getContent(selectedPrayer, 'benefits') as string[]).map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-rose-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-rose-700 dark:text-rose-300">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Video Guide */}
              <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl border border-gray-200 dark:border-gray-600">
                <h3 className="font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                  <Play className="w-5 h-5 mr-2" />
                  Video Guide
                </h3>
                <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Play className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500 text-sm">Video Player</p>
                    <p className="text-xs text-gray-400 mt-1">
                      How to perform {getPrayerName(selectedPrayer)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
          Complete Guide to Islamic Prayers
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Comprehensive guide to all types of Islamic prayers with detailed instructions in multiple languages
        </p>

        {/* Language Selector */}
        <div className="flex justify-center mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-1 border border-gray-200 dark:border-gray-600">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setSelectedLanguage(lang.code)}
                className={`flex items-center px-4 py-2 rounded-md transition-all ${
                  selectedLanguage === lang.code
                    ? 'bg-emerald-500 text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-gray-700'
                }`}
              >
                <Globe className="w-4 h-4 mr-2" />
                <span className="text-lg mr-2">{lang.flag}</span>
                <span className="font-medium">{lang.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Daily Prayers (Fard Salah) */}
      <div className="mb-12">
        <div className="flex items-center mb-6">
          <Sun className="w-6 h-6 text-yellow-500 mr-3" />
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
            Daily Prayers (Fard Salah)
          </h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {getPrayersByCategory('fard').map((prayer) => (
            <button
              key={prayer.id}
              onClick={() => setSelectedPrayer(prayer)}
              className={`p-4 rounded-xl text-white font-semibold transition-all hover:scale-105 hover:shadow-lg bg-gradient-to-br ${prayer.color}`}
            >
              <div className="text-center">
                <div className="text-lg font-bold mb-1">
                  {getPrayerName(prayer)}
                </div>
                <div className="text-sm opacity-90">
                  {prayer.rakats}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Special Event Prayers */}
      <div className="mb-12">
        <div className="flex items-center mb-6">
          <Moon className="w-6 h-6 text-purple-500 mr-3" />
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
            Special Event Prayers
          </h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {getPrayersByCategory('special').map((prayer) => (
            <button
              key={prayer.id}
              onClick={() => setSelectedPrayer(prayer)}
              className={`p-4 rounded-xl text-white font-semibold transition-all hover:scale-105 hover:shadow-lg bg-gradient-to-br ${prayer.color}`}
            >
              <div className="text-center">
                <div className="text-lg font-bold mb-1">
                  {getPrayerName(prayer)}
                </div>
                <div className="text-sm opacity-90">
                  {prayer.rakats}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Sunnah & Nafl Prayers */}
      <div className="mb-12">
        <div className="flex items-center mb-6">
          <Star className="w-6 h-6 text-emerald-500 mr-3" />
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
            Sunnah & Nafl Prayers
          </h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {getPrayersByCategory('sunnah').concat(getPrayersByCategory('nafl')).map((prayer) => (
            <button
              key={prayer.id}
              onClick={() => setSelectedPrayer(prayer)}
              className={`p-4 rounded-xl text-white font-semibold transition-all hover:scale-105 hover:shadow-lg bg-gradient-to-br ${prayer.color}`}
            >
              <div className="text-center">
                <div className="text-lg font-bold mb-1">
                  {getPrayerName(prayer)}
                </div>
                <div className="text-sm opacity-90">
                  {prayer.rakats}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Islamic Quote */}
      <div className="text-center bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-gray-800 dark:to-gray-700 p-8 rounded-xl">
        <blockquote className="text-xl italic text-emerald-800 dark:text-emerald-300 mb-2">
          "And establish prayer and give zakah and bow with those who bow."
        </blockquote>
        <cite className="text-emerald-600 dark:text-emerald-400">- Quran 2:43</cite>
      </div>
    </div>
  );
}

export default SalahGuide;