import React, { useState, useEffect } from 'react';
import { BookOpen, Search, ArrowLeft, Eye, Heart, Share } from 'lucide-react';
import { Mood } from '../App';

interface QuranVersesProps {
  selectedMood: Mood | null;
}

interface Verse {
  number: number;
  arabic: string;
  english: string;
}

interface Surah {
  number: number;
  name: string;
  arabicName: string;
  englishName: string;
  verses: number;
  revelation: 'Meccan' | 'Medinan';
  meaning: string;
  description: string;
  verses_data: Verse[];
}

function QuranVerses({ selectedMood }: QuranVersesProps) {
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Sample Surahs data (in a real app, this would come from an API)
  const surahs: Surah[] = [
    {
      number: 1,
      name: 'Al-Fatiha',
      arabicName: 'الفاتحة',
      englishName: 'The Opening',
      verses: 7,
      revelation: 'Meccan',
      meaning: 'The Opening',
      description: 'The opening chapter of the Quran, recited in every prayer.',
      verses_data: [
        {
          number: 1,
          arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
          english: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.'
        },
        {
          number: 2,
          arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
          english: 'All praise is due to Allah, Lord of the worlds.'
        },
        {
          number: 3,
          arabic: 'الرَّحْمَٰنِ الرَّحِيمِ',
          english: 'The Entirely Merciful, the Especially Merciful.'
        },
        {
          number: 4,
          arabic: 'مَالِكِ يَوْمِ الدِّينِ',
          english: 'Sovereign of the Day of Recompense.'
        },
        {
          number: 5,
          arabic: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
          english: 'It is You we worship and You we ask for help.'
        },
        {
          number: 6,
          arabic: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
          english: 'Guide us to the straight path.'
        },
        {
          number: 7,
          arabic: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
          english: 'The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.'
        }
      ]
    },
    {
      number: 2,
      name: 'Al-Baqarah',
      arabicName: 'البقرة',
      englishName: 'The Cow',
      verses: 286,
      revelation: 'Medinan',
      meaning: 'The Cow',
      description: 'The longest chapter in the Quran, containing many fundamental teachings.',
      verses_data: [
        {
          number: 1,
          arabic: 'الم',
          english: 'Alif, Lam, Meem.'
        },
        {
          number: 2,
          arabic: 'ذَٰلِكَ الْكِتَابُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِّلْمُتَّقِينَ',
          english: 'This is the Book about which there is no doubt, a guidance for those conscious of Allah.'
        },
        {
          number: 3,
          arabic: 'الَّذِينَ يُؤْمِنُونَ بِالْغَيْبِ وَيُقِيمُونَ الصَّلَاةَ وَمِمَّا رَزَقْنَاهُمْ يُنفِقُونَ',
          english: 'Who believe in the unseen, establish prayer, and spend out of what We have provided for them.'
        },
        {
          number: 4,
          arabic: 'وَالَّذِينَ يُؤْمِنُونَ بِمَا أُنزِلَ إِلَيْكَ وَمَا أُنزِلَ مِن قَبْلِكَ وَبِالْآخِرَةِ هُمْ يُوقِنُونَ',
          english: 'And who believe in what has been revealed to you, [O Muhammad], and what was revealed before you, and of the Hereafter they are certain [in faith].'
        },
        {
          number: 5,
          arabic: 'أُولَٰئِكَ عَلَىٰ هُدًى مِّن رَّبِّهِمْ ۖ وَأُولَٰئِكَ هُمُ الْمُفْلِحُونَ',
          english: 'Indeed, those who disbelieve - it is all the same for them whether you warn them or do not warn them - they will not believe.'
        },
         {
          number: 6,
          arabic: 'اِنَّ الَّذِيْنَ كَفَرُوْا سَوَآءٌ عَلَيْهِمْ ءَاَنْذَرْتَهُمْ اَمْ لَمْ تُنْذِرْهُمْ لَا يُؤْمِنُوْنَ',
          english: 'Those are upon [right] guidance from their Lord, and it is those who are the successful.'
        },
         ]
    },
    {
      number: 3,
      name: 'Ali \'Imran',
      arabicName: 'آل عمران',
      englishName: 'Family of Imran',
      verses: 200,
      revelation: 'Medinan',
      meaning: 'The Family of Imran',
      description: 'Named after the family of Imran, the father of Mary (mother of Jesus).',
      verses_data: [
        {
          number: 1,
          arabic: 'الم',
          english: 'Alif, Lam, Meem.'
        },
        {
          number: 2,
          arabic: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ',
          english: 'Allah - there is no deity except Him, the Ever-Living, the Sustainer of existence.'
        },
        {
          number: 3,
          arabic: 'نَزَّلَ عَلَيْكَ الْكِتَابَ بِالْحَقِّ مُصَدِّقًا لِّمَا بَيْنَ يَدَيْهِ وَأَنزَلَ التَّوْرَاةَ وَالْإِنجِيلَ',
          english: 'He has sent down upon you, [O Muhammad], the Book in truth, confirming what was before it. And He revealed the Torah and the Gospel.'
        }
      ]
    },
    {
      number: 4,
      name: 'An-Nisa',
      arabicName: 'النساء',
      englishName: 'The Women',
      verses: 176,
      revelation: 'Medinan',
      meaning: 'The Women',
      description: 'Deals with women\'s rights, family law, and social justice.',
      verses_data: [
        {
          number: 1,
          arabic: 'يَا أَيُّهَا النَّاسُ اتَّقُوا رَبَّكُمُ الَّذِي خَلَقَكُم مِّن نَّفْسٍ وَاحِدَةٍ',
          english: 'O mankind, fear your Lord, who created you from one soul.'
        }
      ]
    },
    {
      number: 5,
      name: 'Al-Ma\'idah',
      arabicName: 'المائدة',
      englishName: 'The Table Spread',
      verses: 120,
      revelation: 'Medinan',
      meaning: 'The Table Spread',
      description: 'Contains laws about food, contracts, and interfaith relations.',
      verses_data: [
        {
          number: 1,
          arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا أَوْفُوا بِالْعُقُودِ',
          english: 'O you who have believed, fulfill [all] contracts.'
        }
      ]
    },
    {
      number: 6,
      name: 'Al-An\'am',
      arabicName: 'الأنعام',
      englishName: 'The Cattle',
      verses: 165,
      revelation: 'Meccan',
      meaning: 'The Cattle',
      description: 'Discusses monotheism, prophethood, and the signs of Allah in creation.',
      verses_data: [
        {
          number: 1,
          arabic: 'الْحَمْدُ لِلَّهِ الَّذِي خَلَقَ السَّمَاوَاتِ وَالْأَرْضَ وَجَعَلَ الظُّلُمَاتِ وَالنُّورَ ۖ ثُمَّ الَّذِينَ كَفَرُوا بِرَبِّهِمْ يَعْدِلُونَ',
          english: 'All praise is due to Allah, who created the heavens and the earth and made the darkness and the light. Then those who disbelieve equate [others] with their Lord.'
        },
        {
          number: 2,
          arabic: 'هُوَ الَّذِي خَلَقَكُم مِّن طِينٍ ثُمَّ قَضَىٰ أَجَلًا ۖ وَأَجَلٌ مُّسَمًّى عِندَهُ ۖ ثُمَّ أَنتُمْ تَمْتَرُونَ',
          english: 'It is He who created you from clay and then decreed a term and a specified time [known] to Him; then [still] you are in dispute.'
        },
        {
          number: 3,
          arabic: 'وَهُوَ اللَّهُ فِي السَّمَاوَاتِ وَفِي الْأَرْضِ ۖ يَعْلَمُ سِرَّكُمْ وَجَهْرَكُمْ وَيَعْلَمُ مَا تَكْسِبُونَ',
          english: 'And He is Allah, [the only deity] in the heavens and the earth. He knows your secret and what you make public, and He knows that which you earn.'
        }
      ]
    },
    {
      number: 7,
      name: 'Al-A\'raf',
      arabicName: 'الأعراف',
      englishName: 'The Heights',
      verses: 206,
      revelation: 'Meccan',
      meaning: 'The Heights',
      description: 'Narrates stories of various prophets and their peoples, emphasizing divine guidance.',
      verses_data: [
        {
          number: 1,
          arabic: 'المص',
          english: 'Alif, Lam, Meem, Sad.'
        },
        {
          number: 2,
          arabic: 'كِتَابٌ أُنزِلَ إِلَيْكَ فَلَا يَكُن فِي صَدْرِكَ حَرَجٌ مِّنْهُ لِتُنذِرَ بِهِ وَذِكْرَىٰ لِلْمُؤْمِنِينَ',
          english: '[This is] a Book revealed to you, [O Muhammad] - so let there not be in your breast distress therefrom - that you may warn thereby and as a reminder to the believers.'
        },
        {
          number: 3,
          arabic: 'اتَّبِعُوا مَا أُنزِلَ إِلَيْكُم مِّن رَّبِّكُمْ وَلَا تَتَّبِعُوا مِن دُونِهِ أَوْلِيَاءَ ۗ قَلِيلًا مَّا تَذَكَّرُونَ',
          english: 'Follow, [O mankind], what has been revealed to you from your Lord and do not follow other than Him any allies. Little do you remember.'
        }
      ]
    },
    {
      number: 8,
      name: 'Al-Anfal',
      arabicName: 'الأنفال',
      englishName: 'The Spoils of War',
      verses: 75,
      revelation: 'Medinan',
      meaning: 'The Spoils of War',
      description: 'Discusses the Battle of Badr and principles of warfare and distribution of spoils.',
      verses_data: [
        {
          number: 1,
          arabic: 'يَسْأَلُونَكَ عَنِ الْأَنفَالِ ۖ قُلِ الْأَنفَالُ لِلَّهِ وَالرَّسُولِ ۖ فَاتَّقُوا اللَّهَ وَأَصْلِحُوا ذَاتَ بَيْنِكُمْ ۖ وَأَطِيعُوا اللَّهَ وَرَسُولَهُ إِن كُنتُم مُّؤْمِنِينَ',
          english: 'They ask you, [O Muhammad], about the bounties [of war]. Say, "The [decision concerning] bounties is for Allah and the Messenger." So fear Allah and amend that which is between you and obey Allah and His Messenger, if you should be believers.'
        },
        {
          number: 2,
          arabic: 'إِنَّمَا الْمُؤْمِنُونَ الَّذِينَ إِذَا ذُكِرَ اللَّهُ وَجِلَتْ قُلُوبُهُمْ وَإِذَا تُلِيَتْ عَلَيْهِمْ آيَاتُهُ زَادَتْهُمْ إِيمَانًا وَعَلَىٰ رَبِّهِمْ يَتَوَكَّلُونَ',
          english: 'The believers are only those who, when Allah is mentioned, their hearts become fearful, and when His verses are recited to them, it increases them in faith; and upon their Lord they rely.'
        }
      ]
    },
    {
      number: 9,
      name: 'At-Tawbah',
      arabicName: 'التوبة',
      englishName: 'The Repentance',
      verses: 129,
      revelation: 'Medinan',
      meaning: 'The Repentance',
      description: 'The only Surah without Bismillah, dealing with treaties, warfare, and repentance.',
      verses_data: [
        {
          number: 1,
          arabic: 'بَرَاءَةٌ مِّنَ اللَّهِ وَرَسُولِهِ إِلَى الَّذِينَ عَاهَدتُّم مِّنَ الْمُشْرِكِينَ',
          english: '[This is a declaration of] disassociation, from Allah and His Messenger, to those with whom you had made a treaty among the polytheists.'
        },
        {
          number: 2,
          arabic: 'فَسِيحُوا فِي الْأَرْضِ أَرْبَعَةَ أَشْهُرٍ وَاعْلَمُوا أَنَّكُمْ غَيْرُ مُعْجِزِي اللَّهِ ۙ وَأَنَّ اللَّهَ مُخْزِي الْكَافِرِينَ',
          english: 'So as long as they are upright toward you, be upright toward them. Indeed, Allah loves the righteous [who fear Him].'
        }
      ]
    },
    {
      number: 10,
      name: 'Yunus',
      arabicName: 'يونس',
      englishName: 'Jonah',
      verses: 109,
      revelation: 'Meccan',
      meaning: 'Jonah',
      description: 'Named after Prophet Yunus (Jonah), emphasizing Allah\'s mercy and the consequences of disbelief.',
      verses_data: [
        {
          number: 1,
          arabic: 'الر ۚ تِلْكَ آيَاتُ الْكِتَابِ الْحَكِيمِ',
          english: 'Alif, Lam, Ra. These are the verses of the wise Book.'
        },
        {
          number: 2,
          arabic: 'أَكَانَ لِلنَّاسِ عَجَبًا أَنْ أَوْحَيْنَا إِلَىٰ رَجُلٍ مِّنْهُمْ أَنْ أَنذِرِ النَّاسَ وَبَشِّرِ الَّذِينَ آمَنُوا أَنَّ لَهُمْ قَدَمَ صِدْقٍ عِندَ رَبِّهِمْ ۗ قَالَ الْكَافِرُونَ إِنَّ هَٰذَا لَسَاحِرٌ مُّبِينٌ',
          english: 'Have the people been amazed that We revealed [revelation] to a man from among them, [saying], "Warn mankind and give good tidings to those who believe that they will have a [firm] precedence of honor with their Lord"? [But] the disbelievers say, "Indeed, this is an obvious magician."'
        }
      ]
    },
    {
      number: 11,
      name: 'Hud',
      arabicName: 'هود',
      englishName: 'Hud',
      verses: 123,
      revelation: 'Meccan',
      meaning: 'Hud',
      description: 'Named after Prophet Hud, containing stories of various prophets and their struggles.',
      verses_data: [
        {
          number: 1,
          arabic: 'الر ۚ كِتَابٌ أُحْكِمَتْ آيَاتُهُ ثُمَّ فُصِّلَتْ مِن لَّدُنْ حَكِيمٍ خَبِيرٍ',
          english: 'Alif, Lam, Ra. [This is] a Book whose verses are perfected and then presented in detail from [one who is] Wise and Acquainted.'
        },
        {
          number: 2,
          arabic: 'أَلَّا تَعْبُدُوا إِلَّا اللَّهَ ۚ إِنَّنِي لَكُم مِّنْهُ نَذِيرٌ وَبَشِيرٌ',
          english: '[Saying], "Do not worship except Allah. Indeed, I am to you from Him a warner and a bringer of good tidings."'
        }
      ]
    },
    {
      number: 12,
      name: 'Yusuf',
      arabicName: 'يوسف',
      englishName: 'Joseph',
      verses: 111,
      revelation: 'Meccan',
      meaning: 'Joseph',
      description: 'The complete story of Prophet Yusuf (Joseph), called the most beautiful story in the Quran.',
      verses_data: [
        {
          number: 1,
          arabic: 'الر ۚ تِلْكَ آيَاتُ الْكِتَابِ الْمُبِينِ',
          english: 'Alif, Lam, Ra. These are the verses of the clear Book.'
        },
        {
          number: 2,
          arabic: 'إِنَّا أَنزَلْنَاهُ قُرْآنًا عَرَبِيًّا لَّعَلَّكُمْ تَعْقِلُونَ',
          english: 'Indeed, We have sent it down as an Arabic Quran that you might understand.'
        },
        {
          number: 3,
          arabic: 'نَحْنُ نَقُصُّ عَلَيْكَ أَحْسَنَ الْقَصَصِ بِمَا أَوْحَيْنَا إِلَيْكَ هَٰذَا الْقُرْآنَ وَإِن كُنتَ مِن قَبْلِهِ لَمِنَ الْغَافِلِينَ',
          english: 'We relate to you, [O Muhammad], the best of stories in what We have revealed to you of this Quran although you were, before it, among the unaware.'
        }
      ]
    },
    {
      number: 13,
      name: 'Ar-Ra\'d',
      arabicName: 'الرعد',
      englishName: 'The Thunder',
      verses: 43,
      revelation: 'Medinan',
      meaning: 'The Thunder',
      description: 'Named after thunder, discussing Allah\'s power in nature and the truth of revelation.',
      verses_data: [
        {
          number: 1,
          arabic: 'المر ۚ تِلْكَ آيَاتُ الْكِتَابِ ۗ وَالَّذِي أُنزِلَ إِلَيْكَ مِن رَّبِّكَ الْحَقُّ وَلَٰكِنَّ أَكْثَرَ النَّاسِ لَا يُؤْمِنُونَ',
          english: 'Alif, Lam, Meem, Ra. These are the verses of the Book; and what has been revealed to you from your Lord is the truth, but most of the people do not believe.'
        },
        {
          number: 2,
          arabic: 'اللَّهُ الَّذِي رَفَعَ السَّمَاوَاتِ بِغَيْرِ عَمَدٍ تَرَوْنَهَا ۖ ثُمَّ اسْتَوَىٰ عَلَى الْعَرْشِ ۖ وَسَخَّرَ الشَّمْسَ وَالْقَمَرَ ۖ كُلٌّ يَجْرِي لِأَجَلٍ مُّسَمًّى ۚ يُدَبِّرُ الْأَمْرَ يُفَصِّلُ الْآيَاتِ لَعَلَّكُم بِلِقَاءِ رَبِّكُمْ تُوقِنُونَ',
          english: 'It is Allah who erected the heavens without pillars that you [can] see; then He established Himself above the Throne and subjected the sun and the moon, each running [its course] for a specified term. He arranges [each] matter; He details the signs that you may, of the meeting with your Lord, be certain.'
        }
      ]
    },
    {
      number: 14,
      name: 'Ibrahim',
      arabicName: 'إبراهيم',
      englishName: 'Abraham',
      verses: 52,
      revelation: 'Meccan',
      meaning: 'Abraham',
      description: 'Named after Prophet Ibrahim (Abraham), emphasizing monotheism and gratitude to Allah.',
      verses_data: [
        {
          number: 1,
          arabic: 'الر ۚ كِتَابٌ أَنزَلْنَاهُ إِلَيْكَ لِتُخْرِجَ النَّاسَ مِنَ الظُّلُمَاتِ إِلَى النُّورِ بِإِذْنِ رَبِّهِمْ إِلَىٰ صِرَاطِ الْعَزِيزِ الْحَمِيدِ',
          english: 'Alif, Lam, Ra. [This is] a Book which We have revealed to you, [O Muhammad], that you might bring mankind out of darknesses into the light by permission of their Lord - to the path of the Exalted in Might, the Praiseworthy.'
        },
        {
          number: 2,
          arabic: 'اللَّهِ الَّذِي لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ وَوَيْلٌ لِّلْكَافِرِينَ مِنْ عَذَابٍ شَدِيدٍ',
          english: 'Allah - to whom belongs whatever is in the heavens and whatever is on the earth. And woe to the disbelievers from a severe punishment.'
        }
      ]
    },
    {
      number: 15,
      name: 'Al-Hijr',
      arabicName: 'الحجر',
      englishName: 'The Rocky Tract',
      verses: 99,
      revelation: 'Meccan',
      meaning: 'The Rocky Tract',
      description: 'Named after the rocky tract where the Thamud people lived, discussing various prophetic stories.',
      verses_data: [
        {
          number: 1,
          arabic: 'الر ۚ تِلْكَ آيَاتُ الْكِتَابِ وَقُرْآنٍ مُّبِينٍ',
          english: 'Alif, Lam, Ra. These are the verses of the Book and a clear Quran.'
        },
        {
          number: 2,
          arabic: 'رُّبَمَا يَوَدُّ الَّذِينَ كَفَرُوا لَوْ كَانُوا مُسْلِمِينَ',
          english: 'Perhaps those who disbelieve will wish that they had been Muslims.'
        },
        {
          number: 3,
          arabic: 'ذَرْهُمْ يَأْكُلُوا وَيَتَمَتَّعُوا وَيُلْهِهِمُ الْأَمَلُ ۖ فَسَوْفَ يَعْلَمُونَ',
          english: 'Let them eat and enjoy themselves and be diverted by [false] hope, for they are going to know.'
        }
      ]
    },
    {
      number: 112,
      name: 'Al-Ikhlas',
      arabicName: 'الإخلاص',
      englishName: 'The Sincerity',
      verses: 4,
      revelation: 'Meccan',
      meaning: 'The Purity/Sincerity',
      description: 'A concise statement of Islamic monotheism, equal to one-third of the Quran in reward.',
      verses_data: [
        {
          number: 1,
          arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ',
          english: 'Say, "He is Allah, [who is] One."'
        },
        {
          number: 2,
          arabic: 'اللَّهُ الصَّمَدُ',
          english: 'Allah, the Eternal Refuge.'
        },
        {
          number: 3,
          arabic: 'لَمْ يَلِدْ وَلَمْ يُولَدْ',
          english: 'He neither begets nor is born.'
        },
        {
          number: 4,
          arabic: 'وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ',
          english: 'Nor is there to Him any equivalent.'
        }
      ]
    },
    {
      number: 113,
      name: 'Al-Falaq',
      arabicName: 'الفلق',
      englishName: 'The Daybreak',
      verses: 5,
      revelation: 'Meccan',
      meaning: 'The Dawn/Daybreak',
      description: 'A prayer for protection from various forms of evil.',
      verses_data: [
        {
          number: 1,
          arabic: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ',
          english: 'Say, "I seek refuge in the Lord of daybreak."'
        },
        {
          number: 2,
          arabic: 'مِن شَرِّ مَا خَلَقَ',
          english: 'From the evil of that which He created.'
        },
        {
          number: 3,
          arabic: 'وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ',
          english: 'And from the evil of darkness when it settles.'
        },
        {
          number: 4,
          arabic: 'وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ',
          english: 'And from the evil of the blowers in knots.'
        },
        {
          number: 5,
          arabic: 'وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ',
          english: 'And from the evil of an envier when he envies.'
        }
      ]
    },
    {
      number: 114,
      name: 'An-Nas',
      arabicName: 'الناس',
      englishName: 'Mankind',
      verses: 6,
      revelation: 'Meccan',
      meaning: 'The People/Mankind',
      description: 'The final chapter, seeking protection from evil whispers.',
      verses_data: [
        {
          number: 1,
          arabic: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ',
          english: 'Say, "I seek refuge in the Lord of mankind."'
        },
        {
          number: 2,
          arabic: 'مَلِكِ النَّاسِ',
          english: 'The Sovereign of mankind.'
        },
        {
          number: 3,
          arabic: 'إِلَٰهِ النَّاسِ',
          english: 'The God of mankind.'
        },
        {
          number: 4,
          arabic: 'مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ',
          english: 'From the evil of the retreating whisperer.'
        },
        {
          number: 5,
          arabic: 'الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ',
          english: 'Who whispers [evil] into the breasts of mankind.'
        },
        {
          number: 6,
          arabic: 'مِنَ الْجِنَّةِ وَالنَّاسِ',
          english: 'From among the jinn and mankind.'
        }
      ]
    }
  ];

  const filteredSurahs = surahs.filter(surah =>
    surah.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    surah.englishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    surah.arabicName.includes(searchTerm)
  );

  const openSurah = (surah: Surah) => {
    setIsLoading(true);
    setTimeout(() => {
      setSelectedSurah(surah);
      setIsLoading(false);
    }, 500);
  };

  const closeSurah = () => {
    setSelectedSurah(null);
  };

  if (selectedSurah) {
    return (
      <div className="max-w-5xl mx-auto">
        {/* Surah Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={closeSurah}
              className="flex items-center px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Surahs
            </button>
            <div className="flex items-center space-x-4">
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                selectedSurah.revelation === 'Meccan' 
                  ? 'bg-amber-500/20 text-amber-100' 
                  : 'bg-blue-500/20 text-blue-100'
              }`}>
                {selectedSurah.revelation}
              </div>
              <span className="text-emerald-100">
                {selectedSurah.verses} verses
              </span>
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2">
              Surah {selectedSurah.name}
            </h1>
            <div className="text-5xl font-arabic mb-3" dir="rtl">
              {selectedSurah.arabicName}
            </div>
            <p className="text-xl text-emerald-100 mb-2">
              {selectedSurah.englishName}
            </p>
            <p className="text-emerald-200 max-w-2xl mx-auto">
              {selectedSurah.description}
            </p>
          </div>
        </div>

        {/* Bismillah */}
        {selectedSurah.number !== 1 && selectedSurah.number !== 9 && (
          <div className="bg-emerald-50 dark:bg-emerald-900/20 p-6 text-center border-x border-gray-200 dark:border-gray-600">
            <div className="text-3xl font-arabic text-emerald-800 dark:text-emerald-300 mb-2" dir="rtl">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </div>
            <p className="text-emerald-700 dark:text-emerald-400 italic">
              In the name of Allah, the Entirely Merciful, the Especially Merciful.
            </p>
          </div>
        )}

        {/* Verses */}
        <div className="bg-white dark:bg-gray-800 border-x border-b border-gray-200 dark:border-gray-600 rounded-b-2xl">
          <div className="p-6 space-y-8">
            {selectedSurah.verses_data.map((verse) => (
              <div key={verse.number} className="border-b border-gray-100 dark:border-gray-700 pb-6 last:border-b-0">
                {/* Verse Number */}
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mr-4">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                      {verse.number}
                    </span>
                  </div>
                  <div className="h-px bg-gradient-to-r from-emerald-200 to-transparent flex-1"></div>
                </div>

                {/* Arabic Text */}
                <div className="mb-6 p-6 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10 rounded-xl">
                  <p className="text-3xl leading-relaxed text-gray-800 dark:text-white font-arabic text-right" dir="rtl">
                    {verse.arabic}
                  </p>
                </div>

                {/* English Translation */}
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    {verse.english}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Surah Info Footer */}
        <div className="mt-6 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-300 mb-3">
            About Surah {selectedSurah.name}
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-purple-700 dark:text-purple-400 mb-2">
                <strong>Meaning:</strong> {selectedSurah.meaning}
              </p>
              <p className="text-purple-700 dark:text-purple-400 mb-2">
                <strong>Revelation:</strong> {selectedSurah.revelation}
              </p>
            </div>
            <div>
              <p className="text-purple-700 dark:text-purple-400 mb-2">
                <strong>Number of Verses:</strong> {selectedSurah.verses}
              </p>
              <p className="text-purple-700 dark:text-purple-400">
                <strong>Position:</strong> Chapter {selectedSurah.number} of 114
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
          Holy Quran
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Read the complete Quran with Arabic text and English translations
        </p>

        {/* Search Bar */}
        <div className="max-w-md mx-auto relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search Surahs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Surahs Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSurahs.map((surah) => (
          <button
            key={surah.number}
            onClick={() => openSurah(surah)}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-600 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 text-left group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                  {surah.number}
                </span>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                surah.revelation === 'Meccan' 
                  ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' 
                  : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
              }`}>
                {surah.revelation}
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
              {surah.name}
            </h3>
            
            <div className="text-2xl font-arabic text-emerald-600 dark:text-emerald-400 mb-2" dir="rtl">
              {surah.arabicName}
            </div>

            <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
              {surah.englishName}
            </p>

            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <Eye className="w-4 h-4 mr-1" />
                <span>{surah.verses} verses</span>
              </div>
              <div className="flex items-center group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                <BookOpen className="w-4 h-4 mr-1" />
                <span>Read</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {filteredSurahs.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">
            No Surahs found matching your search.
          </p>
        </div>
      )}

      <div className="mt-12 text-center">
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-gray-800 dark:to-gray-700 p-8 rounded-xl">
          <h3 className="text-2xl font-semibold text-emerald-800 dark:text-emerald-300 mb-4">
            About the Holy Quran
          </h3>
          <p className="text-emerald-700 dark:text-emerald-400 max-w-3xl mx-auto leading-relaxed">
            The Quran is the holy book of Islam, believed by Muslims to be the direct word of Allah as revealed to Prophet Muhammad (PBUH) through the angel Gabriel. It consists of 114 chapters (Surahs) and over 6,000 verses (Ayahs), providing guidance for all aspects of life.
          </p>
          <blockquote className="mt-6 text-lg italic text-emerald-600 dark:text-emerald-400">
            "This is the Book about which there is no doubt, a guidance for those conscious of Allah." - Quran 2:2
          </blockquote>
        </div>
      </div>
    </div>
  );
}

export default QuranVerses;