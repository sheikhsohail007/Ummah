import React, { useState } from 'react';
import { Globe, Book, Play, ChevronDown, ChevronUp } from 'lucide-react';

interface Language {
  code: string;
  name: string;
  flag: string;
}

interface SalahStep {
  id: number;
  titleEn: string;
  titleAr: string;
  titleUrdu: string;
  descriptionEn: string;
  descriptionAr: string;
  descriptionUrdu: string;
  duaEn?: string;
  duaAr?: string;
  duaUrdu?: string;
}

function SalahGuide() {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  const languages: Language[] = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'ur', name: 'اردو', flag: '🇵🇰' },
  ];

  const salahSteps: SalahStep[] = [
    {
      id: 1,
      titleEn: "1. Make Intention (Niyyah)",
      titleAr: "١. النية",
      titleUrdu: "١. نیت کریں",
      descriptionEn: "Face the Qibla and make the intention in your heart to pray the specific prayer (Fajr, Dhuhr, etc.) for the sake of Allah.",
      descriptionAr: "اتجه نحو القبلة واجعل النية في قلبك لأداء الصلاة المحددة (الفجر، الظهر، إلخ) لوجه الله.",
      descriptionUrdu: "قبلہ کی طرف رخ کریں اور اللہ کے لیے مخصوص نماز (فجر، ظہر وغیرہ) پڑھنے کی نیت دل میں کریں۔"
    },
    {
      id: 2,
      titleEn: "2. Takbiratul Ihram",
      titleAr: "٢. تكبيرة الإحرام",
      titleUrdu: "٢. تکبیرۃ الاحرام",
      descriptionEn: "Raise both hands to shoulder level and say 'Allahu Akbar' (Allah is the Greatest) to begin the prayer.",
      descriptionAr: "ارفع كلا اليدين إلى مستوى الكتف وقل 'الله أكبر' لبدء الصلاة.",
      descriptionUrdu: "دونوں ہاتھ کندھے کی سطح تک اٹھائیں اور 'اللہ اکبر' کہہ کر نماز شروع کریں۔",
      duaEn: "Allahu Akbar",
      duaAr: "الله أكبر",
      duaUrdu: "اللہ اکبر"
    },
    {
      id: 3,
      titleEn: "3. Recite Surah Al-Fatiha",
      titleAr: "٣. قراءة سورة الفاتحة",
      titleUrdu: "٣. سورہ فاتحہ پڑھیں",
      descriptionEn: "Place your right hand over your left hand on your chest and recite Surah Al-Fatiha, the opening chapter of the Quran.",
      descriptionAr: "ضع يدك اليمنى فوق يدك اليسرى على صدرك واقرأ سورة الفاتحة، الفصل الافتتاحي للقرآن.",
      descriptionUrdu: "دایاں ہاتھ بائیں ہاتھ کے اوپر سینے پر رکھیں اور سورہ فاتحہ، قرآن کا پہلا باب پڑھیں۔",
      duaEn: "In the name of Allah, the Entirely Merciful, the Especially Merciful...",
      duaAr: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ...",
      duaUrdu: "اللہ کے نام سے جو نہایت مہربان، رحم کرنے والا ہے..."
    },
    {
      id: 4,
      titleEn: "4. Bow in Ruku",
      titleAr: "٤. الركوع",
      titleUrdu: "٤. رکوع کریں",
      descriptionEn: "Say 'Allahu Akbar' and bow down, placing your hands on your knees. Your back should be straight and level.",
      descriptionAr: "قل 'الله أكبر' واركع، ضع يديك على ركبتيك. يجب أن يكون ظهرك مستقيماً ومستوياً.",
      descriptionUrdu: "'اللہ اکبر' کہیں اور رکوع کریں، اپنے ہاتھ گھٹنوں پر رکھیں۔ آپ کی کمر سیدھی اور برابر ہونی چاہیے۔",
      duaEn: "Glory be to my Lord, the Most Great",
      duaAr: "سُبْحَانَ رَبِّيَ الْعَظِيمِ",
      duaUrdu: "پاک ہے میرا رب جو بہت بڑا ہے"
    },
    {
      id: 5,
      titleEn: "5. Stand from Ruku",
      titleAr: "٥. القيام من الركوع",
      titleUrdu: "٥. رکوع سے کھڑے ہوں",
      descriptionEn: "Rise to standing position and say the prescribed words of praise.",
      descriptionAr: "قم إلى وضعية الوقوف وقل كلمات الحمد المقررة.",
      descriptionUrdu: "کھڑے ہو جائیں اور مقرر کردہ حمد کے کلمات کہیں۔",
      duaEn: "Allah hears those who praise Him. Our Lord, to You belongs all praise.",
      duaAr: "سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ، رَبَّنَا وَلَكَ الْحَمْدُ",
      duaUrdu: "اللہ نے سنا جس نے اس کی حمد کی، اے ہمارے رب! تیرے ہی لیے تمام تعریف ہے"
    },
    {
      id: 6,
      titleEn: "6. Prostrate in Sujud",
      titleAr: "٦. السجود",
      titleUrdu: "٦. سجدہ کریں",
      descriptionEn: "Say 'Allahu Akbar' and prostrate, touching your forehead, nose, palms, knees, and toes to the ground.",
      descriptionAr: "قل 'الله أكبر' واسجد، لمس جبهتك وأنفك وراحتي يديك وركبتيك وأصابع قدميك بالأرض.",
      descriptionUrdu: "'اللہ اکبر' کہیں اور سجدہ کریں، اپنا پیشانی، ناک، ہتھیلیاں، گھٹنے اور پیروں کی انگلیاں زمین سے لگائیں۔",
      duaEn: "Glory be to my Lord, the Most High",
      duaAr: "سُبْحَانَ رَبِّيَ الْأَعْلَى",
      duaUrdu: "پاک ہے میرا رب جو سب سے اعلیٰ ہے"
    }
  ];

  const getContent = (step: SalahStep, field: 'title' | 'description' | 'dua') => {
    const langMap = {
      en: field === 'title' ? step.titleEn : field === 'description' ? step.descriptionEn : step.duaEn,
      ar: field === 'title' ? step.titleAr : field === 'description' ? step.descriptionAr : step.duaAr,
      ur: field === 'title' ? step.titleUrdu : field === 'description' ? step.descriptionUrdu : step.duaUrdu,
    };
    return langMap[selectedLanguage as keyof typeof langMap] || '';
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
          Correct Your Salah
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Step-by-step guide to performing the prayer correctly with duas and their meanings
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

      {/* Prayer Steps */}
      <div className="space-y-4">
        {salahSteps.map((step) => (
          <div
            key={step.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-600 overflow-hidden"
          >
            <button
              onClick={() => setExpandedStep(expandedStep === step.id ? null : step.id)}
              className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mr-4">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                    {step.id}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {getContent(step, 'title')}
                </h3>
              </div>
              {expandedStep === step.id ? 
                <ChevronUp className="w-5 h-5 text-gray-500" /> : 
                <ChevronDown className="w-5 h-5 text-gray-500" />
              }
            </button>

            {expandedStep === step.id && (
              <div className="px-6 pb-6 border-t border-gray-100 dark:border-gray-700">
                <div className="pt-4">
                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    {getContent(step, 'description')}
                  </p>
                  
                  {getContent(step, 'dua') && (
                    <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg border border-emerald-200 dark:border-emerald-800">
                      <div className="flex items-center mb-2">
                        <Book className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mr-2" />
                        <span className="font-semibold text-emerald-800 dark:text-emerald-300">
                          Dua to Recite:
                        </span>
                      </div>
                      <p className={`text-emerald-700 dark:text-emerald-400 ${
                        selectedLanguage === 'ar' ? 'text-right text-xl' : ''
                      } ${selectedLanguage === 'ur' ? 'text-right' : ''}`}>
                        {getContent(step, 'dua')}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Benefits Section */}
      <div className="mt-12 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-gray-800 dark:to-gray-700 p-8 rounded-xl">
        <h3 className="text-2xl font-semibold text-amber-800 dark:text-amber-300 mb-4 text-center">
          Benefits of Correct Salah
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="flex items-start">
              <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3"></div>
              <p className="text-amber-700 dark:text-amber-400">
                <strong>Spiritual Connection:</strong> Direct communication with Allah (SWT)
              </p>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3"></div>
              <p className="text-amber-700 dark:text-amber-400">
                <strong>Inner Peace:</strong> Calms the mind and brings tranquility
              </p>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3"></div>
              <p className="text-amber-700 dark:text-amber-400">
                <strong>Discipline:</strong> Develops self-control and time management
              </p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-start">
              <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3"></div>
              <p className="text-amber-700 dark:text-amber-400">
                <strong>Forgiveness:</strong> Purifies the soul from sins
              </p>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3"></div>
              <p className="text-amber-700 dark:text-amber-400">
                <strong>Mindfulness:</strong> Increases awareness and presence
              </p>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3"></div>
              <p className="text-amber-700 dark:text-amber-400">
                <strong>Community:</strong> Connects you with Muslims worldwide
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <blockquote className="text-lg italic text-gray-600 dark:text-gray-300">
          "And establish prayer and give zakah and bow with those who bow." - Quran 2:43
        </blockquote>
      </div>
    </div>
  );
}

export default SalahGuide;