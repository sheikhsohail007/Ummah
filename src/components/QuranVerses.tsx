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
  bengali?: string; // ✅ yeh line add karo
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
          arabic: "الم",
          english: "Alif, Lam, Meem.",
         bengali: "আলিফ, লাম, মীম",

        },
        {
          number: 2,
          arabic: "ذَٰلِكَ الْكِتَابُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِّلْمُتَّقِينَ",
          english: "This is the Book about which there is no doubt, a guidance for those conscious of Allah.",
          bengali: "ঐ গ্রন্থ, এতে কোনো সন্দেহ নেই, মুত্তকীদের জন্য পথপ্রদর্শক --"
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
          english: 'Those are upon [right] guidance from their Lord, and it is those who are the successful.'
        },
        {
          number: 6,
          arabic: "إِنَّ الَّذِينَ كَفَرُوا سَوَاءٌ عَلَيْهِمْ أَأَنْذَرْتَهُمْ أَمْ لَمْ تُنْذِرْهُمْ لَا يُؤْمِنُونَ",
          english: "Indeed, those who disbelieve - it is all the same for them whether you warn them or do not warn them - they will not believe."
        },
        {
          number: 7,
          arabic: "خَتَمَ اللَّهُ عَلَى قُلُوبِهِمْ وَعَلَى سَمْعِهِمْ وَعَلَى أَبْصَارِهِمْ غِشَاوَةٌ وَلَهُمْ عَذَابٌ عَظِيمٌ",
          english: "Allah has set a seal upon their hearts and upon their hearing, and over their vision is a veil. And for them is a great punishment."
        },
        {
          number: 8,
          arabic: "وَمِنَ النَّاسِ مَنْ يَقُولُ آمَنَّا بِاللَّهِ وَبِالْيَوْمِ الْآخِرِ وَمَا هُمْ بِمُؤْمِنِينَ",
          english: "And of the people are some who say, 'We believe in Allah and the Last Day,' but they are not believers."
        },
        {
          number: 9,
          arabic: "يُخَادِعُونَ اللَّهَ وَالَّذِينَ آمَنُوا وَمَا يَخْدَعُونَ إِلَّا أَنْفُسَهُمْ وَمَا يَشْعُرُونَ",
          english: "They [think to] deceive Allah and those who believe, but they deceive not except themselves and perceive [it] not."
        },
        {
          number: 10,
          arabic: "فِي قُلُوبِهِمْ مَرَضٌ فَزَادَهُمُ اللَّهُ مَرَضًا وَلَهُمْ عَذَابٌ أَلِيمٌ بِمَا كَانُوا يَكْذِبُونَ",
          english: "In their hearts is disease, so Allah has increased their disease; and for them is a painful punishment because they [habitually] used to lie."
        },
        {
          number: 11,
          arabic: "وَإِذَا قِيلَ لَهُمْ لَا تُفْسِدُوا فِي الْأَرْضِ قَالُوا إِنَّمَا نَحْنُ مُصْلِحُونَ",
          english: "And when it is said to them, 'Do not cause corruption on the earth,' they say, 'We are but reformers.'"
        },
        {
          number: 12,
          arabic: "أَلَا إِنَّهُمْ هُمُ الْمُفْسِدُونَ وَلَكِنْ لَا يَشْعُرُونَ",
          english: "Unquestionably, it is they who are the corrupters, but they perceive [it] not."
        },
        {
          number: 13,
          arabic: "وَإِذَا قِيلَ لَهُمْ آمِنُوا كَمَا آمَنَ النَّاسُ قَالُوا أَنُؤْمِنُ كَمَا آمَنَ السُّفَهَاءُ أَلَا إِنَّهُمْ هُمُ السُّفَهَاءُ وَلَكِنْ لَا يَعْلَمُونَ",
          english: "And when it is said to them, 'Believe as the people have believed,' they say, 'Should we believe as the foolish have believed?' Unquestionably, it is they who are the foolish, but they know [it] not."
        },
        {
          number: 14,
          arabic: "وَإِذَا لَقُوا الَّذِينَ آمَنُوا قَالُوا آمَنَّا وَإِذَا خَلَوْا إِلَى شَيَاطِينِهِمْ قَالُوا إِنَّا مَعَكُمْ إِنَّمَا نَحْنُ مُسْتَهْزِئُونَ",
          english: "And when they meet those who believe, they say, 'We believe'; but when they are alone with their evil ones, they say, 'Indeed, we are with you; we were only mockers.'"
        },
        {
          number: 15,
          arabic: "اللَّهُ يَسْتَهْزِئُ بِهِمْ وَيَمُدُّهُمْ فِي طُغْيَانِهِمْ يَعْمَهُونَ",
          english: "[But] Allah mocks them and prolongs them in their transgression [while] they wander blindly."
        },
        {
          number: 16,
          arabic: "أُولَئِكَ الَّذِينَ اشْتَرَوُا الضَّلَالَةَ بِالْهُدَى فَمَا رَبِحَتْ تِجَارَتُهُمْ وَمَا كَانُوا مُهْتَدِينَ",
          english: "Those are the ones who have purchased error [in exchange] for guidance, so their transaction has brought no profit, nor were they guided."
        },
        {
          number: 17,
          arabic: "مَثَلُهُمْ كَمَثَلِ الَّذِي اسْتَوْقَدَ نَارًا فَلَمَّا أَضَاءَتْ مَا حَوْلَهُ ذَهَبَ اللَّهُ بِنُورِهِمْ وَتَرَكَهُمْ فِي ظُلُمَاتٍ لَا يُبْصِرُونَ",
          english: "Their example is that of one who kindled a fire, but when it illuminated what was around him, Allah took away their light and left them in darkness [so] they could not see."
        },
        {
          number: 18,
          arabic: "صُمٌّ بُكْمٌ عُمْيٌ فَهُمْ لَا يَرْجِعُونَ",
          english: "Deaf, dumb and blind - so they will not return [to the right path]."
        },
        {
          number: 19,
          arabic: "أَوْ كَصَيِّبٍ مِنَ السَّمَاءِ فِيهِ ظُلُمَاتٌ وَرَعْدٌ وَبَرْقٌ يَجْعَلُونَ أَصَابِعَهُمْ فِي آذَانِهِمْ مِنَ الصَّوَاعِقِ حَذَرَ الْمَوْتِ وَاللَّهُ مُحِيطٌ بِالْكَافِرِينَ",
          english: "Or [it is] like a rainstorm from the sky within which is darkness, thunder and lightning. They put their fingers in their ears against the thunderclaps in dread of death. But Allah is encompassing of the disbelievers."
        },
        {
          number: 20,
          arabic: "يَكَادُ الْبَرْقُ يَخْطَفُ أَبْصَارَهُمْ كُلَّمَا أَضَاءَ لَهُمْ مَشَوْا فِيهِ وَإِذَا أَظْلَمَ عَلَيْهِمْ قَامُوا وَلَوْ شَاءَ اللَّهُ لَذَهَبَ بِسَمْعِهِمْ وَأَبْصَارِهِمْ إِنَّ اللَّهَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
          english: "The lightning almost snatches away their sight. Every time it lights [the way] for them, they walk therein; but when darkness comes over them, they stand [still]. And if Allah had willed, He could have taken away their hearing and their sight. Indeed, Allah is over all things competent."
        },
        {
          number: 21,
          arabic: "يَا أَيُّهَا النَّاسُ اعْبُدُوا رَبَّكُمُ الَّذِي خَلَقَكُمْ وَالَّذِينَ مِنْ قَبْلِكُمْ لَعَلَّكُمْ تَتَّقُونَ",
          english: "O mankind, worship your Lord, who created you and those before you, that you may become righteous."
        },
        {
          number: 22,
          arabic: "الَّذِي جَعَلَ لَكُمُ الْأَرْضَ فِرَاشًا وَالسَّمَاءَ بِنَاءً وَأَنْزَلَ مِنَ السَّمَاءِ مَاءً فَأَخْرَجَ بِهِ مِنَ الثَّمَرَاتِ رِزْقًا لَكُمْ فَلَا تَجْعَلُوا لِلَّهِ أَنْدَادًا وَأَنْتُمْ تَعْلَمُونَ",
          english: "[He] who made for you the earth a bed [spread out] and the sky a ceiling and sent down from the sky, rain and brought forth thereby fruits as provision for you. So do not attribute to Allah equals while you know [that there is nothing similar to Him]."
        },
        {
          number: 23,
          arabic: "وَإِنْ كُنْتُمْ فِي رَيْبٍ مِمَّا نَزَّلْنَا عَلَى عَبْدِنَا فَأْتُوا بِسُورَةٍ مِنْ مِثْلِهِ وَادْعُوا شُهَدَاءَكُمْ مِنْ دُونِ اللَّهِ إِنْ كُنْتُمْ صَادِقِينَ",
          english: "And if you are in doubt about what We have sent down upon Our Servant [Muhammad], then produce a surah the like thereof and call upon your witnesses other than Allah, if you should be truthful."
        },
        {
          number: 24,
          arabic: "فَإِنْ لَمْ تَفْعَلُوا وَلَنْ تَفْعَلُوا فَاتَّقُوا النَّارَ الَّتِي وَقُودُهَا النَّاسُ وَالْحِجَارَةُ أُعِدَّتْ لِلْكَافِرِينَ",
          english: "But if you do not - and you will never be able to - then fear the Fire, whose fuel is men and stones, prepared for the disbelievers."
        },
        {
          number: 25,
          arabic: "وَبَشِّرِ الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ أَنَّ لَهُمْ جَنَّاتٍ تَجْرِي مِنْ تَحْتِهَا الْأَنْهَارُ كُلَّمَا رُزِقُوا مِنْهَا مِنْ ثَمَرَةٍ رِزْقًا قَالُوا هَذَا الَّذِي رُزِقْنَا مِنْ قَبْلُ وَأُتُوا بِهِ مُتَشَابِهًا وَلَهُمْ فِيهَا أَزْوَاجٌ مُطَهَّرَةٌ وَهُمْ فِيهَا خَالِدُونَ",
          english: "And give good tidings to those who believe and do righteous deeds that they will have gardens [in Paradise] beneath which rivers flow. Whenever they are provided with a provision of fruit therefrom, they will say, 'This is what we were provided with before.' And it is given to them in likeness. And they will have therein purified spouses, and they will abide therein eternally."
        },
        {
          number: 26,
          arabic: "إِنَّ اللَّهَ لَا يَسْتَحْيِي أَنْ يَضْرِبَ مَثَلًا مَا بَعُوضَةً فَمَا فَوْقَهَا فَأَمَّا الَّذِينَ آمَنُوا فَيَعْلَمُونَ أَنَّهُ الْحَقُّ مِنْ رَبِّهِمْ وَأَمَّا الَّذِينَ كَفَرُوا فَيَقُولُونَ مَاذَا أَرَادَ اللَّهُ بِهَذَا مَثَلًا يُضِلُّ بِهِ كَثِيرًا وَيَهْدِي بِهِ كَثِيرًا وَمَا يُضِلُّ بِهِ إِلَّا الْفَاسِقِينَ",
          english: "Indeed, Allah is not timid to present an example - that of a mosquito or what is smaller than it. And those who have believed know that it is the truth from their Lord. But those who disbelieve say, 'What did Allah intend by this as an example?' He misleads many thereby and guides many thereby. And He misleads not except the defiantly disobedient."
        },
        {
          number: 27,
          arabic: "الَّذِينَ يَنْقُضُونَ عَهْدَ اللَّهِ مِنْ بَعْدِ مِيثَاقِهِ وَيَقْطَعُونَ مَا أَمَرَ اللَّهُ بِهِ أَنْ يُوصَلَ وَيُفْسِدُونَ فِي الْأَرْضِ أُولَئِكَ هُمُ الْخَاسِرُونَ",
          english: "Who break the covenant of Allah after contracting it and sever that which Allah has ordered to be joined and cause corruption on earth. It is those who are the losers."
        },
        {
          number: 28,
          arabic: "كَيْفَ تَكْفُرُونَ بِاللَّهِ وَكُنْتُمْ أَمْوَاتًا فَأَحْيَاكُمْ ثُمَّ يُمِيتُكُمْ ثُمَّ يُحْيِيكُمْ ثُمَّ إِلَيْهِ تُرْجَعُونَ",
          english: "How can you disbelieve in Allah when you were lifeless and He brought you to life; then He will cause you to die, then He will bring you [back] to life, and then to Him you will be returned."
        },
        {
          number: 29,
          arabic: "هُوَ الَّذِي خَلَقَ لَكُمْ مَا فِي الْأَرْضِ جَمِيعًا ثُمَّ اسْتَوَى إِلَى السَّمَاءِ فَسَوَّاهُنَّ سَبْعَ سَمَاوَاتٍ وَهُوَ بِكُلِّ شَيْءٍ عَلِيمٌ",
          english: "It is He who created for you all of that which is on the earth. Then He directed Himself to the heaven, [His being above all creation], and made them seven heavens, and He is Knowing of all things."
        },
        {
          number: 30,
          arabic: "وَإِذْ قَالَ رَبُّكَ لِلْمَلَائِكَةِ إِنِّي جَاعِلٌ فِي الْأَرْضِ خَلِيفَةً قَالُوا أَتَجْعَلُ فِيهَا مَنْ يُفْسِدُ فِيهَا وَيَسْفِكُ الدِّمَاءَ وَنَحْنُ نُسَبِّحُ بِحَمْدِكَ وَنُقَدِّسُ لَكَ قَالَ إِنِّي أَعْلَمُ مَا لَا تَعْلَمُونَ",
          english: "And [mention, O Muhammad], when your Lord said to the angels, 'Indeed, I will make upon the earth a successive authority.' They said, 'Will You place upon it one who causes corruption therein and sheds blood, while we declare Your praise and sanctify You?' Allah said, 'Indeed, I know that which you do not know.'"
        },
        {
          number: 31,
          arabic: "وَعَلَّمَ آدَمَ الْأَسْمَاءَ كُلَّهَا ثُمَّ عَرَضَهُمْ عَلَى الْمَلَائِكَةِ فَقَالَ أَنْبِئُونِي بِأَسْمَاءِ هَؤُلَاءِ إِنْ كُنْتُمْ صَادِقِينَ",
          english: "And He taught Adam the names - all of them. Then He showed them to the angels and said, 'Inform Me of the names of these, if you are truthful.'"
        },
        {
          number: 32,
          arabic: "قَالُوا سُبْحَانَكَ لَا عِلْمَ لَنَا إِلَّا مَا عَلَّمْتَنَا إِنَّكَ أَنْتَ الْعَلِيمُ الْحَكِيمُ",
          english: "They said, 'Exalted are You; we have no knowledge except what You have taught us. Indeed, it is You who is the Knowing, the Wise.'"
        },
        {
          number: 33,
          arabic: "قَالَ يَا آدَمُ أَنْبِئْهُمْ بِأَسْمَائِهِمْ فَلَمَّا أَنْبَأَهُمْ بِأَسْمَائِهِمْ قَالَ أَلَمْ أَقُلْ لَكُمْ إِنِّي أَعْلَمُ غَيْبَ السَّمَاوَاتِ وَالْأَرْضِ وَأَعْلَمُ مَا تُبْدُونَ وَمَا كُنْتُمْ تَكْتُمُونَ",
          english: "He said, 'O Adam, inform them of their names.' And when he had informed them of their names, He said, 'Did I not tell you that I know the unseen [aspects] of the heavens and the earth? And I know what you reveal and what you have concealed.'"
        },
        {
          number: 34,
          arabic: "وَإِذْ قُلْنَا لِلْمَلَائِكَةِ اسْجُدُوا لِآدَمَ فَسَجَدُوا إِلَّا إِبْلِيسَ أَبَى وَاسْتَكْبَرَ وَكَانَ مِنَ الْكَافِرِينَ",
          english: "And [mention] when We said to the angels, 'Prostrate before Adam'; so they prostrated, except for Iblees. He refused and was arrogant and became of the disbelievers."
        },
        {
          number: 35,
          arabic: "وَقُلْنَا يَا آدَمُ اسْكُنْ أَنْتَ وَزَوْجُكَ الْجَنَّةَ وَكُلَا مِنْهَا رَغَدًا حَيْثُ شِئْتُمَا وَلَا تَقْرَبَا هَذِهِ الشَّجَرَةَ فَتَكُونَا مِنَ الظَّالِمِينَ",
          english: "And We said, 'O Adam, dwell, you and your wife, in Paradise and eat therefrom in [ease and] abundance from wherever you will. But do not approach this tree, lest you be among the wrongdoers.'"
        },
        {
          number: 36,
          arabic: "فَأَزَلَّهُمَا الشَّيْطَانُ عَنْهَا فَأَخْرَجَهُمَا مِمَّا كَانَا فِيهِ وَقُلْنَا اهْبِطُوا بَعْضُكُمْ لِبَعْضٍ عَدُوٌّ وَلَكُمْ فِي الْأَرْضِ مُسْتَقَرٌّ وَمَتَاعٌ إِلَى حِينٍ",
          english: "But Satan caused them to slip out of it and removed them from that [condition] in which they had been. And We said, 'Go down, [all of you], as enemies to one another, and you will have upon the earth a place of settlement and provision for a time.'"
        },
        {
          number: 37,
          arabic: "فَتَلَقَّى آدَمُ مِنْ رَبِّهِ كَلِمَاتٍ فَتَابَ عَلَيْهِ إِنَّهُ هُوَ التَّوَّابُ الرَّحِيمُ",
          english: "Then Adam received from his Lord [some] words, and He accepted his repentance. Indeed, it is He who is the Accepting of repentance, the Merciful."
        },
        {
          number: 38,
          arabic: "قُلْنَا اهْبِطُوا مِنْهَا جَمِيعًا فَإِمَّا يَأْتِيَنَّكُمْ مِنِّي هُدًى فَمَنْ تَبِعَ هُدَايَ فَلَا خَوْفٌ عَلَيْهِمْ وَلَا هُمْ يَحْزَنُونَ",
          english: "We said, 'Go down from it, all of you. And when guidance comes to you from Me, whoever follows My guidance - there will be no fear concerning them, nor will they grieve.'"
        },
        {
          number: 39,
          arabic: "وَالَّذِينَ كَفَرُوا وَكَذَّبُوا بِآيَاتِنَا أُولَئِكَ أَصْحَابُ النَّارِ هُمْ فِيهَا خَالِدُونَ",
          english: "And those who disbelieve and deny Our signs - those will be companions of the Fire; they will abide therein eternally."
        },
        {
          number: 40,
          arabic: "يَا بَنِي إِسْرَائِيلَ اذْكُرُوا نِعْمَتِيَ الَّتِي أَنْعَمْتُ عَلَيْكُمْ وَأَوْفُوا بِعَهْدِي أُوفِ بِعَهْدِكُمْ وَإِيَّايَ فَارْهَبُونِ",
          english: "O Children of Israel, remember My favor which I have bestowed upon you and fulfill My covenant [upon you] that I will fulfill your covenant [from Me], and be afraid of [only] Me."
        },
        {
          number: 41,
          arabic: "وَآمِنُوا بِمَا أَنْزَلْتُ مُصَدِّقًا لِمَا مَعَكُمْ وَلَا تَكُونُوا أَوَّلَ كَافِرٍ بِهِ وَلَا تَشْتَرُوا بِآيَاتِي ثَمَنًا قَلِيلًا وَإِيَّايَ فَاتَّقُونِ",
          english: "And believe in what I have sent down confirming that which is [already] with you, and be not the first to disbelieve in it. And do not exchange My signs for a small price, and fear [only] Me."
        },
        {
          number: 42,
          arabic: "وَلَا تَلْبِسُوا الْحَقَّ بِالْبَاطِلِ وَتَكْتُمُوا الْحَقَّ وَأَنْتُمْ تَعْلَمُونَ",
          english: "And do not mix the truth with falsehood or conceal the truth while you know [it]."
        },
        {
          number: 43,
          arabic: "وَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ وَارْكَعُوا مَعَ الرَّاكِعِينَ",
          english: "And establish prayer and give zakah and bow with those who bow [in worship and obedience]."
        },
        {
          number: 44,
          arabic: "أَتَأْمُرُونَ النَّاسَ بِالْبِرِّ وَتَنْسَوْنَ أَنْفُسَكُمْ وَأَنْتُمْ تَتْلُونَ الْكِتَابَ أَفَلَا تَعْقِلُونَ",
          english: "Do you order righteousness of the people and forget yourselves while you recite the Scripture? Then will you not reason?"
        },
        {
          number: 45,
          arabic: "وَاسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ وَإِنَّهَا لَكَبِيرَةٌ إِلَّا عَلَى الْخَاشِعِينَ",
          english: "And seek help through patience and prayer, and indeed, it is difficult except for the humbly submissive [to Allah]."
        },
        {
          number: 46,
          arabic: "الَّذِينَ يَظُنُّونَ أَنَّهُمْ مُلَاقُو رَبِّهِمْ وَأَنَّهُمْ إِلَيْهِ رَاجِعُونَ",
          english: "Who are certain that they will meet their Lord and that they will return to Him."
        },
        {
          number: 47,
          arabic: "يَا بَنِي إِسْرَائِيلَ اذْكُرُوا نِعْمَتِيَ الَّتِي أَنْعَمْتُ عَلَيْكُمْ وَأَنِّي فَضَّلْتُكُمْ عَلَى الْعَالَمِينَ",
          english: "O Children of Israel, remember My favor that I have bestowed upon you and that I preferred you over the worlds."
        },
        {
          number: 48,
          arabic: "وَاتَّقُوا يَوْمًا لَا تَجْزِي نَفْسٌ عَنْ نَفْسٍ شَيْئًا وَلَا يُقْبَلُ مِنْهَا شَفَاعَةٌ وَلَا يُؤْخَذُ مِنْهَا عَدْلٌ وَلَا هُمْ يُنْصَرُونَ",
          english: "And fear a Day when no soul will suffice for another soul at all, nor will intercession be accepted from it, nor will compensation be taken from it, nor will they be aided."
        },
        {
          number: 49,
          arabic: "وَإِذْ نَجَّيْنَاكُمْ مِنْ آلِ فِرْعَوْنَ يَسُومُونَكُمْ سُوءَ الْعَذَابِ يُذَبِّحُونَ أَبْنَاءَكُمْ وَيَسْتَحْيُونَ نِسَاءَكُمْ وَفِي ذَلِكُمْ بَلَاءٌ مِنْ رَبِّكُمْ عَظِيمٌ",
          english: "And [recall] when We saved your forefathers from the people of Pharaoh, who afflicted you with the worst torment, slaughtering your [newborn] sons and keeping your females alive. And in that was a great trial from your Lord."
        },
        {
          number: 50,
          arabic: "وَإِذْ فَرَقْنَا بِكُمُ الْبَحْرَ فَأَنْجَيْنَاكُمْ وَأَغْرَقْنَا آلَ فِرْعَوْنَ وَأَنْتُمْ تَنْظُرُونَ",
          english: "And [recall] when We parted the sea for you and saved you and drowned the people of Pharaoh while you were looking on."
        },
        {
          number: 51,
          arabic: "وَإِذْ وَاعَدْنَا مُوسَى أَرْبَعِينَ لَيْلَةً ثُمَّ اتَّخَذْتُمُ الْعِجْلَ مِنْ بَعْدِهِ وَأَنْتُمْ ظَالِمُونَ",
          english: "And [recall] when We made an appointment with Moses for forty nights. Then you took [for worship] the calf after him, while you were wrongdoers."
        },
        {
          number: 52,
          arabic: "ثُمَّ عَفَوْنَا عَنْكُمْ مِنْ بَعْدِ ذَلِكَ لَعَلَّكُمْ تَشْكُرُونَ",
          english: "Then We forgave you after that so perhaps you would be grateful."
        },
        {
          number: 53,
          arabic: "وَإِذْ آتَيْنَا مُوسَى الْكِتَابَ وَالْفُرْقَانَ لَعَلَّكُمْ تَهْتَدُونَ",
          english: "And [recall] when We gave Moses the Scripture and criterion that perhaps you would be guided."
        },
        {
          number: 54,
          arabic: "وَإِذْ قَالَ مُوسَى لِقَوْمِهِ يَا قَوْمِ إِنَّكُمْ ظَلَمْتُمْ أَنْفُسَكُمْ بِاتِّخَاذِكُمُ الْعِجْلَ فَتُوبُوا إِلَى بَارِئِكُمْ فَاقْتُلُوا أَنْفُسَكُمْ ذَلِكُمْ خَيْرٌ لَكُمْ عِنْدَ بَارِئِكُمْ فَتَابَ عَلَيْكُمْ إِنَّهُ هُوَ التَّوَّابُ الرَّحِيمُ",
          english: "And [recall] when Moses said to his people, 'O my people, indeed you have wronged yourselves by your taking of the calf [for worship]. So repent to your Creator and kill yourselves. That is best for [all of] you in the sight of your Creator.' Then He accepted your repentance; indeed, He is the Accepting of repentance, the Merciful."
        },
        {
          number: 55,
          arabic: "وَإِذْ قُلْتُمْ يَا مُوسَى لَنْ نُؤْمِنَ لَكَ حَتَّى نَرَى اللَّهَ جَهْرَةً فَأَخَذَتْكُمُ الصَّاعِقَةُ وَأَنْتُمْ تَنْظُرُونَ",
          english: "And [recall] when you said, 'O Moses, we will never believe you until we see Allah outright'; so the thunderbolt took you while you were looking on."
        },
        {
          number: 56,
          arabic: "ثُمَّ بَعَثْنَاكُمْ مِنْ بَعْدِ مَوْتِكُمْ لَعَلَّكُمْ تَشْكُرُونَ",
          english: "Then We revived you after your death that perhaps you would be grateful."
        },
        {
          number: 57,
          arabic: "وَظَلَّلْنَا عَلَيْكُمُ الْغَمَامَ وَأَنْزَلْنَا عَلَيْكُمُ الْمَنَّ وَالسَّلْوَى كُلُوا مِنْ طَيِّبَاتِ مَا رَزَقْنَاكُمْ وَمَا ظَلَمُونَا وَلَكِنْ كَانُوا أَنْفُسَهُمْ يَظْلِمُونَ",
          english: "And We shaded you with clouds and sent down to you manna and quails, [saying], 'Eat from the good things with which We have provided you.' And they wronged Us not - but they were [only] wronging themselves."
        },
        {
          number: 58,
          arabic: "وَإِذْ قُلْنَا ادْخُلُوا هَذِهِ الْقَرْيَةَ فَكُلُوا مِنْهَا حَيْثُ شِئْتُمْ رَغَدًا وَادْخُلُوا الْبَابَ سُجَّدًا وَقُولُوا حِطَّةٌ نَغْفِرْ لَكُمْ خَطَايَاكُمْ وَسَنَزِيدُ الْمُحْسِنِينَ",
          english: "And [recall] when We said, 'Enter this city and eat from it wherever you will in [ease and] abundance, and enter the gate bowing humbly and say, 'Relieve us of our burdens.' We will [then] forgive your sins for you, and We will increase the doers of good [in goodness and reward].'"
        },
        {
          number: 59,
          arabic: "فَبَدَّلَ الَّذِينَ ظَلَمُوا قَوْلًا غَيْرَ الَّذِي قِيلَ لَهُمْ فَأَنْزَلْنَا عَلَى الَّذِينَ ظَلَمُوا رِجْزًا مِنَ السَّمَاءِ بِمَا كَانُوا يَفْسُقُونَ",
          english: "But those who wronged changed [those words] to a statement other than that which had been said to them, so We sent down upon those who wronged a punishment from the sky because they were defiantly disobeying."
        },
        {
          number: 60,
          arabic: "وَإِذِ اسْتَسْقَى مُوسَى لِقَوْمِهِ فَقُلْنَا اضْرِبْ بِعَصَاكَ الْحَجَرَ فَانْفَجَرَتْ مِنْهُ اثْنَتَا عَشْرَةَ عَيْنًا قَدْ عَلِمَ كُلُّ أُنَاسٍ مَشْرَبَهُمْ كُلُوا وَاشْرَبُوا مِنْ رِزْقِ اللَّهِ وَلَا تَعْثَوْا فِي الْأَرْضِ مُفْسِدِينَ",
          english: "And [recall] when Moses prayed for water for his people, so We said, 'Strike with your staff the stone.' And there gushed forth from it twelve springs, and every people knew its watering place. 'Eat and drink from the provision of Allah, and do not commit abuse on the earth, spreading corruption.'"
        },
        {
          number: 61,
          arabic: "وَإِذْ قُلْتُمْ يَا مُوسَى لَنْ نَصْبِرَ عَلَى طَعَامٍ وَاحِدٍ فَادْعُ لَنَا رَبَّكَ يُخْرِجْ لَنَا مِمَّا تُنْبِتُ الْأَرْضُ مِنْ بَقْلِهَا وَقِثَّائِهَا وَفُومِهَا وَعَدَسِهَا وَبَصَلِهَا قَالَ أَتَسْتَبْدِلُونَ الَّذِي هُوَ أَدْنَى بِالَّذِي هُوَ خَيْرٌ اهْبِطُوا مِصْرًا فَإِنَّ لَكُمْ مَا سَأَلْتُمْ وَضُرِبَتْ عَلَيْهِمُ الذِّلَّةُ وَالْمَسْكَنَةُ وَبَاءُوا بِغَضَبٍ مِنَ اللَّهِ ذَلِكَ بِأَنَّهُمْ كَانُوا يَكْفُرُونَ بِآيَاتِ اللَّهِ وَيَقْتُلُونَ النَّبِيِّينَ بِغَيْرِ الْحَقِّ ذَلِكَ بِمَا عَصَوْا وَكَانُوا يَعْتَدُونَ",
          english: "And recall when you said, “O Moses, we cannot endure one kind of food, so call to your Lord to produce for us of what the earth grows: of its herbs, and its cucumbers, and its garlic, and its lentils, and its onions.” He said, “Would you substitute worse for better? Go down to Egypt, where you will have what you asked for.” They were struck with humiliation and poverty, and incurred wrath from God. That was because they rejected God's revelations and wrongfully killed the prophets. That was because they disobeyed and transgressed. "

        },
        {
          number: 62,
          arabic: "إِنَّ الَّذِينَ آمَنُوا وَالَّذِينَ هَادُوا وَالنَّصَارَى وَالصَّابِئِينَ مَنْ آمَنَ بِاللَّهِ وَالْيَوْمِ الْآخِرِ وَعَمِلَ صَالِحًا فَلَهُمْ أَجْرُهُمْ عِنْدَ رَبِّهِمْ وَلَا خَوْفٌ عَلَيْهِمْ وَلَا هُمْ يَحْزَنُونَ",
          english: "Indeed, those who believed and those who were Jews or Christians or Sabeans [before Prophet Muhammad] - those [among them] who believed in Allah and the Last Day and did righteousness - will have their reward with their Lord, and no fear will there be concerning them, nor will they grieve."
        },
        {
          number: 63,
          arabic: "وَإِذْ أَخَذْنَا مِيثَاقَكُمْ وَرَفَعْنَا فَوْقَكُمُ الطُّورَ خُذُوا مَا آتَيْنَاكُمْ بِقُوَّةٍ وَاذْكُرُوا مَا فِيهِ لَعَلَّكُمْ تَتَّقُونَ",
          english: "And [recall] when We took your covenant and raised over you the mount, [saying], 'Take what We have given you with determination and remember what is in it that perhaps you may become righteous.'"
        },
        {
          number: 64,
          arabic: "ثُمَّ تَوَلَّيْتُمْ مِنْ بَعْدِ ذَلِكَ فَلَوْلَا فَضْلُ اللَّهِ عَلَيْكُمْ وَرَحْمَتُهُ لَكُنْتُمْ مِنَ الْخَاسِرِينَ",
          english: "Then you turned away after that. And if not for the favor of Allah upon you and His mercy, you would have been among the losers."
        },
        {
          number: 65,
          arabic: "وَلَقَدْ عَلِمْتُمُ الَّذِينَ اعْتَدَوْا مِنْكُمْ فِي السَّبْتِ فَقُلْنَا لَهُمْ كُونُوا قِرَدَةً خَاسِئِينَ",
          english: "And you had already known about those who transgressed among you concerning the sabbath, and We said to them, 'Be apes, despised.'"
        },
        {
          number: 66,
          arabic: "فَجَعَلْنَاهَا نَكَالًا لِمَا بَيْنَ يَدَيْهَا وَمَا خَلْفَهَا وَمَوْعِظَةً لِلْمُتَّقِينَ",
          english: "And We made it a deterrent punishment for those who were present and those who succeeded [them] and a lesson for those who fear Allah."
        },
        {
          number: 67,
          arabic: "وَإِذْ قَالَ مُوسَى لِقَوْمِهِ إِنَّ اللَّهَ يَأْمُرُكُمْ أَنْ تَذْبَحُوا بَقَرَةً قَالُوا أَتَتَّخِذُنَا هُزُوًا قَالَ أَعُوذُ بِاللَّهِ أَنْ أَكُونَ مِنَ الْجَاهِلِينَ",
          english: "And [recall] when Moses said to his people, 'Indeed, Allah commands you to slaughter a cow.' They said, 'Do you take us in ridicule?' He said, 'I seek refuge in Allah from being among the ignorant.'"
        },
        {
          number: 68,
          arabic: "قَالُوا ادْعُ لَنَا رَبَّكَ يُبَيِّنْ لَنَا مَا هِيَ قَالَ إِنَّهُ يَقُولُ إِنَّهَا بَقَرَةٌ لَا فَارِضٌ وَلَا بِكْرٌ عَوَانٌ بَيْنَ ذَلِكَ فَافْعَلُوا مَا تُؤْمَرُونَ",
          english: "They said, 'Call upon your Lord to make clear to us what it is.' [Moses] said, '[Allah] says, 'It is a cow which is neither old nor virgin, but median between that,' so do what you are commanded.'"
        },
        {
          number: 69,
          arabic: "قَالُوا ادْعُ لَنَا رَبَّكَ يُبَيِّنْ لَنَا مَا لَوْنُهَا قَالَ إِنَّهُ يَقُولُ إِنَّهَا بَقَرَةٌ صَفْرَاءُ فَاقِعٌ لَوْنُهَا تَسُرُّ النَّاظِرِينَ",
          english: "They said, 'Call upon your Lord to show us what is her color.' He said, 'He says, 'It is a yellow cow, bright in color - pleasing to the observers.'"
        },
        {
          number: 70,
          arabic: "قَالُوا ادْعُ لَنَا رَبَّكَ يُبَيِّنْ لَنَا مَا هِيَ إِنَّ الْبَقَرَ تَشَابَهَ عَلَيْنَا وَإِنَّا إِنْ شَاءَ اللَّهُ لَمُهْتَدُونَ",
          english: "They said, 'Call upon your Lord to make clear to us what it is. Indeed, [all] cows look alike to us. And indeed we, if Allah wills, will be guided.'"
        },
        {
          number: 71,
          arabic: "قَالَ إِنَّهُ يَقُولُ إِنَّهَا بَقَرَةٌ لَا ذَلُولٌ تُثِيرُ الْأَرْضَ وَلَا تَسْقِي الْحَرْثَ مُسَلَّمَةٌ لَا شِيَةَ فِيهَا قَالُوا الْآنَ جِئْتَ بِالْحَقِّ فَذَبَحُوهَا وَمَا كَادُوا يَفْعَلُونَ",
          english: "He said, 'He says, 'It is a cow neither trained to plow the earth nor to irrigate the field, one free from fault with no spot upon her.'' They said, 'Now you have come with the truth.' So they slaughtered her, but they could hardly do it."
        },
        {
          number: 72,
          arabic: "وَإِذْ قَتَلْتُمْ نَفْسًا فَادَّارَأْتُمْ فِيهَا وَاللَّهُ مُخْرِجٌ مَا كُنْتُمْ تَكْتُمُونَ",
          english: "And [recall] when you slew a man and disputed over it, but Allah was to bring out that which you were concealing."
        },
        {
          number: 73,
          arabic: "فَقُلْنَا اضْرِبُوهُ بِبَعْضِهَا كَذَلِكَ يُحْيِي اللَّهُ الْمَوْتَى وَيُرِيكُمْ آيَاتِهِ لَعَلَّكُمْ تَعْقِلُونَ",
          english: "So, We said, 'Strike the slain man with part of it.' Thus does Allah bring the dead to life, and He shows you His signs that you might reason."
        },
        {
          number: 74,
          arabic: "ثُمَّ قَسَتْ قُلُوبُكُمْ مِنْ بَعْدِ ذَلِكَ فَهِيَ كَالْحِجَارَةِ أَوْ أَشَدُّ قَسْوَةً وَإِنَّ مِنَ الْحِجَارَةِ لَمَا يَتَفَجَّرُ مِنْهُ الْأَنْهَارُ وَإِنَّ مِنْهَا لَمَا يَشَّقَّقُ فَيَخْرُجُ مِنْهُ الْمَاءُ وَإِنَّ مِنْهَا لَمَا يَهْبِطُ مِنْ خَشْيَةِ اللَّهِ وَمَا اللَّهُ بِغَافِلٍ عَمَّا تَعْمَلُونَ",
          english: "Then your hearts became hardened after that, being like stones or even harder. For indeed, there are stones from which rivers burst forth, and there are some of them that split open and water comes out, and there are some of them that fall down for fear of Allah. And Allah is not unaware of what you do."
        },
        {
          number: 75,
          arabic: "أَفَتَطْمَعُونَ أَنْ يُؤْمِنُوا لَكُمْ وَقَدْ كَانَ فَرِيقٌ مِنْهُمْ يَسْمَعُونَ كَلَامَ اللَّهِ ثُمَّ يُحَرِّفُونَهُ مِنْ بَعْدِ مَا عَقَلُوهُ وَهُمْ يَعْلَمُونَ",
          english: "Do you covet [the hope, O believers], that they would believe for you while a party of them used to hear the words of Allah and then distort the Torah after they had understood it while they were knowing?"
        },
        {
          number: 76,
          arabic: "وَإِذَا لَقُوا الَّذِينَ آمَنُوا قَالُوا آمَنَّا وَإِذَا خَلَا بَعْضُهُمْ إِلَى بَعْضٍ قَالُوا أَتُحَدِّثُونَهُمْ بِمَا فَتَحَ اللَّهُ عَلَيْكُمْ لِيُحَاجُّوكُمْ بِهِ عِنْدَ رَبِّكُمْ أَفَلَا تَعْقِلُونَ",
          english: "And when they meet those who believe, they say, 'We have believed'; but when they are alone with one another, they say, 'Do you talk to them about what Allah has revealed to you so they can argue with you about it before your Lord?' Then will you not reason?"
        },
        {
          number: 77,
          arabic: "أَوَلَا يَعْلَمُونَ أَنَّ اللَّهَ يَعْلَمُ مَا يُسِرُّونَ وَمَا يُعْلِنُونَ",
          english: "But do they not know that Allah knows what they conceal and what they declare?"
        },
        {
          number: 78,
          arabic: "وَمِنْهُمْ أُمِّيُّونَ لَا يَعْلَمُونَ الْكِتَابَ إِلَّا أَمَانِيَّ وَإِنْ هُمْ إِلَّا يَظُنُّونَ",
          english: "And among them are unlettered ones who do not know the Scripture except in wishful thinking, but they are only assuming."
        },
        {
          number: 79,
          arabic: "فَوَيْلٌ لِلَّذِينَ يَكْتُبُونَ الْكِتَابَ بِأَيْدِيهِمْ ثُمَّ يَقُولُونَ هَذَا مِنْ عِنْدِ اللَّهِ لِيَشْتَرُوا بِهِ ثَمَنًا قَلِيلًا فَوَيْلٌ لَهُمْ مِمَّا كَتَبَتْ أَيْدِيهِمْ وَوَيْلٌ لَهُمْ مِمَّا يَكْسِبُونَ",
          english: "So woe to those who write the 'scripture' with their own hands, then say, 'This is from Allah,' in order to exchange it for a small price. Woe to them for what their hands have written and woe to them for what they earn."
        },
        {
          number: 80,
          arabic: "وَقَالُوا لَنْ تَمَسَّنَا النَّارُ إِلَّا أَيَّامًا مَعْدُودَةً قُلْ أَتَّخَذْتُمْ عِنْدَ اللَّهِ عَهْدًا فَلَنْ يُخْلِفَ اللَّهُ عَهْدَهُ أَمْ تَقُولُونَ عَلَى اللَّهِ مَا لَا تَعْلَمُونَ",
          english: "And they say, 'Never will the Fire touch us, except for a few days.' Say, 'Have you taken a covenant with Allah? For Allah will never break His covenant. Or do you say about Allah that which you do not know?'"
        },
        {
          number: 82,
          arabic: "وَالَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ أُولَئِكَ أَصْحَابُ الْجَنَّةِ هُمْ فِيهَا خَالِدُونَ",
          english: "And those who believe and do righteous deeds - those are the companions of Paradise; they will abide therein eternally."
        },
        {
          number: 83,
          arabic: "وَإِذْ أَخَذْنَا مِيثَاقَ بَنِي إِسْرَائِيلَ لَا تَعْبُدُونَ إِلَّا اللَّهَ وَبِالْوَالِدَيْنِ إِحْسَانًا وَذِي الْقُرْبَى وَالْيَتَامَى وَالْمَسَاكِينِ وَقُولُوا لِلنَّاسِ حُسْنًا وَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ ثُمَّ تَوَلَّيْتُمْ إِلَّا قَلِيلًا مِنْكُمْ وَأَنْتُمْ مُعْرِضُونَ",
          english: "And [recall] when We took the covenant from the Children of Israel, [enjoining upon them], 'Do not worship except Allah; and to parents do good and to relatives, orphans, and the needy. And speak to people good [words] and establish prayer and give zakah.' Then you turned away, except a few of you, and you were refusing."
        },
        {
          number: 84,
          arabic: "وَإِذْ أَخَذْنَا مِيثَاقَكُمْ لَا تَسْفِكُونَ دِمَاءَكُمْ وَلَا تُخْرِجُونَ أَنْفُسَكُمْ مِنْ دِيَارِكُمْ ثُمَّ أَقْرَرْتُمْ وَأَنْتُمْ تَشْهَدُونَ",
          english: "And [recall] when We took your covenant, [saying], 'Do not shed each other's blood or evict one another from your homes.' Then you acknowledged [this] while you were witnessing."
        },
        {
          number: 85,
          arabic: "ثُمَّ أَنْتُمْ هَؤُلَاءِ تَقْتُلُونَ أَنْفُسَكُمْ وَتُخْرِجُونَ فَرِيقًا مِنْكُمْ مِنْ دِيَارِهِمْ تَظَاهَرُونَ عَلَيْهِمْ بِالْإِثْمِ وَالْعُدْوَانِ وَإِنْ يَأْتُوكُمْ أُسَارَى تُفَادُوهُمْ وَهُوَ مُحَرَّمٌ عَلَيْكُمْ إِخْرَاجُهُمْ أَفَتُؤْمِنُونَ بِبَعْضِ الْكِتَابِ وَتَكْفُرُونَ بِبَعْضٍ فَمَا جَزَاءُ مَنْ يَفْعَلُ ذَلِكَ مِنْكُمْ إِلَّا خِزْيٌ فِي الْحَيَاةِ الدُّنْيَا وَيَوْمَ الْقِيَامَةِ يُرَدُّونَ إِلَى أَشَدِّ الْعَذَابِ وَمَا اللَّهُ بِغَافِلٍ عَمَّا تَعْمَلُونَ",
          english: "Then, you are those [same ones who are] killing one another and evicting a party of your people from their homes, cooperating against them in sin and aggression. And if they come to you as captives, you ransom them, although their eviction was forbidden to you. So do you believe in part of the Scripture and disbelieve in part? Then what is the recompense for those who do that among you except disgrace in worldly life; and on the Day of Resurrection they will be sent back to the severest of punishment. And Allah is not unaware of what you do."
        },
        {
          number: 86,
          arabic: "أُولَئِكَ الَّذِينَ اشْتَرَوُا الْحَيَاةَ الدُّنْيَا بِالْآخِرَةِ فَلَا يُخَفَّفُ عَنْهُمُ الْعَذَابُ وَلَا هُمْ يُنْصَرُونَ",
          english: "Those are the ones who have bought the life of this world [in exchange] for the Hereafter, so the punishment will not be lightened for them, nor will they be aided."
        },
        {
          number: 87,
          arabic: "وَلَقَدْ آتَيْنَا مُوسَى الْكِتَابَ وَقَفَّيْنَا مِنْ بَعْدِهِ بِالرُّسُلِ وَآتَيْنَا عِيسَى ابْنَ مَرْيَمَ الْبَيِّنَاتِ وَأَيَّدْنَاهُ بِرُوحِ الْقُدُسِ أَفَكُلَّمَا جَاءَكُمْ رَسُولٌ بِمَا لَا تَهْوَى أَنْفُسُكُمُ اسْتَكْبَرْتُمْ فَفَرِيقًا كَذَّبْتُمْ وَفَرِيقًا تَقْتُلُونَ",
          english: "And We did certainly give Moses the Torah and followed up after him with messengers. And We gave Jesus, the son of Mary, clear proofs and supported him with the Pure Spirit. But is it [not] that every time a messenger came to you, [O Children of Israel], with what your souls did not desire, you were arrogant? And a party [of messengers] you denied and another party you killed."
        },
        {
          number: 88,
          arabic: "وَقَالُوا قُلُوبُنَا غُلْفٌ بَلْ لَعَنَهُمُ اللَّهُ بِكُفْرِهِمْ فَقَلِيلًا مَا يُؤْمِنُونَ",
          english: "And they said, 'Our hearts are wrapped.' But, [in fact], Allah has cursed them for their disbelief, so little is it that they believe."
        },
        {
          number: 89,
          arabic: "وَلَمَّا جَاءَهُمْ كِتَابٌ مِنْ عِنْدِ اللَّهِ مُصَدِّقٌ لِمَا مَعَهُمْ وَكَانُوا مِنْ قَبْلُ يَسْتَفْتِحُونَ عَلَى الَّذِينَ كَفَرُوا فَلَمَّا جَاءَهُمْ مَا عَرَفُوا كَفَرُوا بِهِ فَلَعْنَةُ اللَّهِ عَلَى الْكَافِرِينَ",
          english: "And when there came to them a Book from Allah confirming that which was with them - although before they used to pray for victory against those who disbelieved - but [then] when there came to them that which they recognized, they disbelieved in it; so the curse of Allah will be upon the disbelievers."
        },
        {
          number: 90,
          arabic: "بِئْسَمَا اشْتَرَوْا بِهِ أَنْفُسَهُمْ أَنْ يَكْفُرُوا بِمَا أَنْزَلَ اللَّهُ بَغْيًا أَنْ يُنَزِّلَ اللَّهُ مِنْ فَضْلِهِ عَلَى مَنْ يَشَاءُ مِنْ عِبَادِهِ فَبَاءُوا بِغَضَبٍ عَلَى غَضَبٍ وَلِلْكَافِرِينَ عَذَابٌ مُهِينٌ",
          english: "How wretched is that for which they sold themselves - that they would disbelieve in what Allah has revealed through [their] outrage that Allah would send down His favor upon whom He wills from among His servants. So they returned having [earned] wrath upon wrath. And for the disbelievers is a humiliating punishment."
        },
        {
          number: 91,
          arabic: "وَإِذَا قِيلَ لَهُمْ آمِنُوا بِمَا أَنْزَلَ اللَّهُ قَالُوا نُؤْمِنُ بِمَا أُنْزِلَ عَلَيْنَا وَيَكْفُرُونَ بِمَا وَرَاءَهُ وَهُوَ الْحَقُّ مُصَدِّقًا لِمَا مَعَهُمْ قُلْ فَلِمَ تَقْتُلُونَ أَنْبِيَاءَ اللَّهِ مِنْ قَبْلُ إِنْ كُنْتُمْ مُؤْمِنِينَ",
          english: "And when it is said to them, 'Believe in what Allah has revealed,' they say, 'We believe [only] in what was revealed to us.' And they disbelieve in what came after it, while it is the truth confirming that which is with them. Say, 'Then why did you kill the prophets of Allah before, if you are [indeed] believers?'"
        },
        {
          number: 92,
          arabic: "وَلَقَدْ جَاءَكُمْ مُوسَى بِالْبَيِّنَاتِ ثُمَّ اتَّخَذْتُمُ الْعِجْلَ مِنْ بَعْدِهِ وَأَنْتُمْ ظَالِمُونَ",
          english: "And Moses had certainly brought you clear proofs. Then you took the calf [in worship] after that, while you were wrongdoers."
        },
        {
          number: 93,
          arabic: "وَإِذْ أَخَذْنَا مِيثَاقَكُمْ وَرَفَعْنَا فَوْقَكُمُ الطُّورَ خُذُوا مَا آتَيْنَاكُمْ بِقُوَّةٍ وَاسْمَعُوا قَالُوا سَمِعْنَا وَعَصَيْنَا وَأُشْرِبُوا فِي قُلُوبِهِمُ الْعِجْلَ بِكُفْرِهِمْ قُلْ بِئْسَمَا يَأْمُرُكُمْ بِهِ إِيمَانُكُمْ إِنْ كُنْتُمْ مُؤْمِنِينَ",
          english: "And [recall] when We took your covenant and raised over you the mount, [saying], 'Take what We have given you with determination and listen.' They said [instead], 'We hear and disobey.' And their hearts absorbed [the worship of] the calf because of their disbelief. Say, 'How wretched is that which your faith enjoins upon you, if you should be believers.'"
        },
        {
          number: 94,
          arabic: "قُلْ إِنْ كَانَتْ لَكُمُ الدَّارُ الْآخِرَةُ عِنْدَ اللَّهِ خَالِصَةً مِنْ دُونِ النَّاسِ فَتَمَنَّوُا الْمَوْتَ إِنْ كُنْتُمْ صَادِقِينَ",
          english: "Say, [O Muhammad], 'If the home of the Hereafter with Allah is for you alone and not the [other] people, then wish for death, if you should be truthful.'"
        },
        {
          number: 95,
          arabic: "وَلَنْ يَتَمَنَّوْهُ أَبَدًا بِمَا قَدَّمَتْ أَيْدِيهِمْ وَاللَّهُ عَلِيمٌ بِالظَّالِمِينَ",
          english: "But they will never wish for it, ever, because of what their hands have put forth. And Allah is Knowing of the wrongdoers."
        },
        {
          number: 96,
          arabic: "وَلَتَجِدَنَّهُمْ أَحْرَصَ النَّاسِ عَلَى حَيَاةٍ وَمِنَ الَّذِينَ أَشْرَكُوا يَوَدُّ أَحَدُهُمْ لَوْ يُعَمَّرُ أَلْفَ سَنَةٍ وَمَا هُوَ بِمُزَحْزِحِهِ مِنَ الْعَذَابِ أَنْ يُعَمَّرَ وَاللَّهُ بَصِيرٌ بِمَا يَعْمَلُونَ",
          english: "And you will surely find them the most greedy of people for life - [even] more than those who associate others with Allah. One of them wishes that he could be granted life a thousand years, but it would not remove him in the least from the [coming] punishment that he should be granted life. And Allah is Seeing of what they do."
        },
        {
          number: 97,
          arabic: "قُلْ مَنْ كَانَ عَدُوًّا لِجِبْرِيلَ فَإِنَّهُ نَزَّلَهُ عَلَى قَلْبِكَ بِإِذْنِ اللَّهِ مُصَدِّقًا لِمَا بَيْنَ يَدَيْهِ وَهُدًى وَبُشْرَى لِلْمُؤْمِنِينَ",
          english: "Say, 'Whoever is an enemy to Gabriel - it is [none but] he who has brought the Qur'an down upon your heart, [O Muhammad], by permission of Allah, confirming that which was before it and as guidance and good tidings for the believers.'"
        },
        {
          number: 98,
          arabic: "مَنْ كَانَ عَدُوًّا لِلَّهِ وَمَلَائِكَتِهِ وَرُسُلِهِ وَجِبْرِيلَ وَمِيكَالَ فَإِنَّ اللَّهَ عَدُوٌّ لِلْكَافِرِينَ",
          english: "Whoever is an enemy to Allah and His angels and His messengers and Gabriel and Michael - then indeed, Allah is an enemy to the disbelievers."
        },
        {
          number: 99,
          arabic: "وَلَقَدْ أَنْزَلْنَا إِلَيْكَ آيَاتٍ بَيِّنَاتٍ وَمَا يَكْفُرُ بِهَا إِلَّا الْفَاسِقُونَ",
          english: "And We have certainly revealed to you verses [which are] clear proofs, and no one would deny them except the defiantly disobedient."
        },
        {
          number: 100,
          arabic: "أَوَكُلَّمَا عَاهَدُوا عَهْدًا نَبَذَهُ فَرِيقٌ مِنْهُمْ بَلْ أَكْثَرُهُمْ لَا يُؤْمِنُونَ",
          english: "Is it not [true] that every time they took a covenant a party of them threw it away? But, [in fact], most of them do not believe."
        },
        {
          number: 101,
          arabic: "وَلَمَّا جَاءَهُمْ رَسُولٌ مِنْ عِنْدِ اللَّهِ مُصَدِّقٌ لِمَا مَعَهُمْ نَبَذَ فَرِيقٌ مِنَ الَّذِينَ أُوتُوا الْكِتَابَ كِتَابَ اللَّهِ وَرَاءَ ظُهُورِهِمْ كَأَنَّهُمْ لَا يَعْلَمُونَ",
          english: "And when a messenger from Allah came to them confirming that which was with them, a party of those who had been given the Scripture threw the Scripture of Allah behind their backs as if they did not know [what it contained]."
        },
        {
          number: 102,
          arabic: "وَاتَّبَعُوا مَا تَتْلُو الشَّيَاطِينُ عَلَى مُلْكِ سُلَيْمَانَ وَمَا كَفَرَ سُلَيْمَانُ وَلَكِنَّ الشَّيَاطِينَ كَفَرُوا يُعَلِّمُونَ النَّاسَ السِّحْرَ وَمَا أُنْزِلَ عَلَى الْمَلَكَيْنِ بِبَابِلَ هَارُوتَ وَمَارُوتَ وَمَا يُعَلِّمَانِ مِنْ أَحَدٍ حَتَّى يَقُولَا إِنَّمَا نَحْنُ فِتْنَةٌ فَلَا تَكْفُرْ فَيَتَعَلَّمُونَ مِنْهُمَا مَا يُفَرِّقُونَ بِهِ بَيْنَ الْمَرْءِ وَزَوْجِهِ وَمَا هُمْ بِضَارِّينَ بِهِ مِنْ أَحَدٍ إِلَّا بِإِذْنِ اللَّهِ وَيَتَعَلَّمُونَ مَا يَضُرُّهُمْ وَلَا يَنْفَعُهُمْ وَلَقَدْ عَلِمُوا لَمَنِ اشْتَرَاهُ مَا لَهُ فِي الْآخِرَةِ مِنْ خَلَاقٍ وَلَبِئْسَ مَا شَرَوْا بِهِ أَنْفُسَهُمْ لَوْ كَانُوا يَعْلَمُونَ",
          english: "And they followed [instead] what the devils had recited during the reign of Solomon. It was not Solomon who disbelieved, but the devils disbelieved, teaching people magic and that which was revealed to the two angels at Babylon, Harut and Marut. But the two angels do not teach anyone unless they say, 'We are a trial, so do not disbelieve [by practicing magic].' And [yet] they learn from them that by which they cause separation between a man and his wife. But they do not harm anyone through it except by permission of Allah. And they learn what harms them and does not benefit them. But they certainly knew that whoever purchased it would not have in the Hereafter any share. And wretched is that for which they sold themselves, if they only knew."
        },
        {
          number: 103,
          arabic: "وَلَوْ أَنَّهُمْ آمَنُوا وَاتَّقَوْا لَمَثُوبَةٌ مِنْ عِنْدِ اللَّهِ خَيْرٌ لَوْ كَانُوا يَعْلَمُونَ",
          english: "And if they had believed and feared Allah, then the reward from Allah would have been [far] better, if they only knew."
        },
        {
          number: 104,
          arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا لَا تَقُولُوا رَاعِنَا وَقُولُوا انْظُرْنَا وَاسْمَعُوا وَلِلْكَافِرِينَ عَذَابٌ أَلِيمٌ",
          english: "O you who have believed, say not [to Allah's Messenger], 'Ra'ina' but say, 'Unthurna' and listen. And for the disbelievers is a painful punishment."
        },
        {
          number: 105,
          arabic: "مَا يَوَدُّ الَّذِينَ كَفَرُوا مِنْ أَهْلِ الْكِتَابِ وَلَا الْمُشْرِكِينَ أَنْ يُنَزَّلَ عَلَيْكُمْ مِنْ خَيْرٍ مِنْ رَبِّكُمْ وَاللَّهُ يَخْتَصُّ بِرَحْمَتِهِ مَنْ يَشَاءُ وَاللَّهُ ذُو الْفَضْلِ الْعَظِيمِ",
          english: "Neither those who disbelieve from the People of the Scripture nor the polytheists wish that any good should be sent down to you from your Lord. But Allah selects for His mercy whom He wills, and Allah is the possessor of great bounty."
        },
        {
          number: 106,
          arabic: "مَا نَنْسَخْ مِنْ آيَةٍ أَوْ نُنْسِهَا نَأْتِ بِخَيْرٍ مِنْهَا أَوْ مِثْلِهَا أَلَمْ تَعْلَمْ أَنَّ اللَّهَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
          english: "We do not abrogate a verse or cause it to be forgotten except that We bring forth [one] better than it or similar to it. Do you not know that Allah is over all things competent?"
        },
        {
          number: 107,
          arabic: "أَلَمْ تَعْلَمْ أَنَّ اللَّهَ لَهُ مُلْكُ السَّمَاوَاتِ وَالْأَرْضِ وَمَا لَكُمْ مِنْ دُونِ اللَّهِ مِنْ وَلِيٍّ وَلَا نَصِيرٍ",
          english: "Do you not know that to Allah belongs the dominion of the heavens and the earth and [that] you have not besides Allah any protector or any helper?"
        },
        {
          number: 108,
          arabic: "أَمْ تُرِيدُونَ أَنْ تَسْأَلُوا رَسُولَكُمْ كَمَا سُئِلَ مُوسَى مِنْ قَبْلُ وَمَنْ يَتَبَدَّلِ الْكُفْرَ بِالْإِيمَانِ فَقَدْ ضَلَّ سَوَاءَ السَّبِيلِ",
          english: "Or do you intend to ask your Messenger as Moses was asked before? And whoever exchanges faith for disbelief has certainly strayed from the soundness of the way."
        },
        {
          number: 109,
          arabic: "وَدَّ كَثِيرٌ مِنْ أَهْلِ الْكِتَابِ لَوْ يَرُدُّونَكُمْ مِنْ بَعْدِ إِيمَانِكُمْ كُفَّارًا حَسَدًا مِنْ عِنْدِ أَنْفُسِهِمْ مِنْ بَعْدِ مَا تَبَيَّنَ لَهُمُ الْحَقُّ فَاعْفُوا وَاصْفَحُوا حَتَّى يَأْتِيَ اللَّهُ بِأَمْرِهِ إِنَّ اللَّهَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
          english: "Many of the People of the Scripture wish they could turn you back to disbelief after you have believed, out of envy from themselves [even] after the truth has become clear to them. So pardon and overlook until Allah delivers His command. Indeed, Allah is over all things competent."
        },
        {
          number: 110,
          arabic: "وَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ وَمَا تُقَدِّمُوا لِأَنْفُسِكُمْ مِنْ خَيْرٍ تَجِدُوهُ عِنْدَ اللَّهِ إِنَّ اللَّهَ بِمَا تَعْمَلُونَ بَصِيرٌ",
          english: "And establish prayer and give zakah, and whatever good you put forward for yourselves - you will find it with Allah. Indeed, Allah of what you do, is Seeing."
        },
        {
          number: 111,
          arabic: "وَقَالُوا لَنْ يَدْخُلَ الْجَنَّةَ إِلَّا مَنْ كَانَ هُودًا أَوْ نَصَارَى تِلْكَ أَمَانِيُّهُمْ قُلْ هَاتُوا بُرْهَانَكُمْ إِنْ كُنْتُمْ صَادِقِينَ",
          english: "And they say, 'None will enter Paradise except one who is a Jew or a Christian.' That is [merely] their wishful thinking, Say, 'Produce your proof, if you should be truthful.'"
        },
        {
          number: 112,
          arabic: "بَلَى مَنْ أَسْلَمَ وَجْهَهُ لِلَّهِ وَهُوَ مُحْسِنٌ فَلَهُ أَجْرُهُ عِنْدَ رَبِّهِ وَلَا خَوْفٌ عَلَيْهِمْ وَلَا هُمْ يَحْزَنُونَ",
          english: "Yes [on the contrary], whoever submits his face in Islam to Allah while being a doer of good will have his reward with his Lord. And no fear will there be concerning them, nor will they grieve."
        },
        {
          number: 113,
          arabic: "وَقَالَتِ الْيَهُودُ لَيْسَتِ النَّصَارَى عَلَى شَيْءٍ وَقَالَتِ النَّصَارَى لَيْسَتِ الْيَهُودُ عَلَى شَيْءٍ وَهُمْ يَتْلُونَ الْكِتَابَ كَذَلِكَ قَالَ الَّذِينَ لَا يَعْلَمُونَ مِثْلَ قَوْلِهِمْ فَاللَّهُ يَحْكُمُ بَيْنَهُمْ يَوْمَ الْقِيَامَةِ فِيمَا كَانُوا فِيهِ يَخْتَلِفُونَ",
          english: "The Jews say 'The Christians have nothing [true] to stand on,' and the Christians say, 'The Jews have nothing to stand on,' although they [both] recite the Scripture. Thus the same do those speak who know not. But Allah will judge between them on the Day of Resurrection concerning that over which they used to differ."
        },
        {
          number: 114,
          arabic: "وَمَنْ أَظْلَمُ مِمَّنْ مَنَعَ مَسَاجِدَ اللَّهِ أَنْ يُذْكَرَ فِيهَا اسْمُهُ وَسَعَى فِي خَرَابِهَا أُولَئِكَ مَا كَانَ لَهُمْ أَنْ يَدْخُلُوهَا إِلَّا خَائِفِينَ لَهُمْ فِي الدُّنْيَا خِزْيٌ وَلَهُمْ فِي الْآخِرَةِ عَذَابٌ عَظِيمٌ",
          english: "And who are more unjust than those who prevent the name of Allah from being mentioned in His mosques and strive toward their destruction. It is not for them to enter them except in fear. For them in this world is disgrace, and they will have in the Hereafter a great punishment."
        },
        {
          number: 115,
          arabic: "وَلِلَّهِ الْمَشْرِقُ وَالْمَغْرِبُ فَأَيْنَمَا تُوَلُّوا فَثَمَّ وَجْهُ اللَّهِ إِنَّ اللَّهَ وَاسِعٌ عَلِيمٌ",
          english: "And to Allah belongs the east and the west. So wherever you [might] turn, there is the face of Allah. Indeed, Allah is all-Encompassing and Knowing."
        },
        {
          number: 116,
          arabic: "وَقَالُوا اتَّخَذَ اللَّهُ وَلَدًا سُبْحَانَهُ بَلْ لَهُ مَا فِي السَّمَاوَاتِ وَالْأَرْضِ كُلٌّ لَهُ قَانِتُونَ",
          english: "They say, 'Allah has taken a son.' Exalted is He! Rather, to Him belongs whatever is in the heavens and the earth. All are devoutly obedient to Him."
        },
        {
          number: 117,
          arabic: "بَدِيعُ السَّمَاوَاتِ وَالْأَرْضِ وَإِذَا قَضَى أَمْرًا فَإِنَّمَا يَقُولُ لَهُ كُنْ فَيَكُونُ",
          english: "[He is] Originator of the heavens and the earth. When He decrees a matter, He only says to it, 'Be,' and it is."
        },
        {
          number: 118,
          arabic: "وَقَالَ الَّذِينَ لَا يَعْلَمُونَ لَوْلَا يُكَلِّمُنَا اللَّهُ أَوْ تَأْتِينَا آيَةٌ كَذَلِكَ قَالَ الَّذِينَ مِنْ قَبْلِهِمْ مِثْلَ قَوْلِهِمْ تَشَابَهَتْ قُلُوبُهُمْ قَدْ بَيَّنَّا الْآيَاتِ لِقَوْمٍ يُوقِنُونَ",
          english: "Those who do not know say, 'Why does Allah not speak to us or there come to us a sign?' Thus spoke those before them like their words. Their hearts resemble each other. We have shown clearly the signs to a people who are certain [in faith]."
        },
        {
          number: 119,
          arabic: "إِنَّا أَرْسَلْنَاكَ بِالْحَقِّ بَشِيرًا وَنَذِيرًا وَلَا تُسْأَلُ عَنْ أَصْحَابِ الْجَحِيمِ",
          english: "Indeed, We have sent you, [O Muhammad], with the truth as a bringer of good tidings and a warner, and you will not be asked about the companions of Hellfire."
        },
        {
          number: 120,
          arabic: "وَلَنْ تَرْضَى عَنْكَ الْيَهُودُ وَلَا النَّصَارَى حَتَّى تَتَّبِعَ مِلَّتَهُمْ قُلْ إِنَّ هُدَى اللَّهِ هُوَ الْهُدَى وَلَئِنِ اتَّبَعْتَ أَهْوَاءَهُمْ بَعْدَ الَّذِي جَاءَكَ مِنَ الْعِلْمِ مَا لَكَ مِنَ اللَّهِ مِنْ وَلِيٍّ وَلَا نَصِيرٍ",
          english: "And never will the Jews or the Christians approve of you until you follow their religion. Say, 'Indeed, the guidance of Allah is the [only] guidance.' If you were to follow their desires after what has come to you of knowledge, you would have against Allah no protector or helper."
        },
        {
          number: 121,
          arabic: "الَّذِينَ آتَيْنَاهُمُ الْكِتَابَ يَتْلُونَهُ حَقَّ تِلَاوَتِهِ أُولَئِكَ يُؤْمِنُونَ بِهِ وَمَنْ يَكْفُرْ بِهِ فَأُولَئِكَ هُمُ الْخَاسِرُونَ",
          english: "Those to whom We have given the Scripture recite it with its true recital. They [are the ones who] believe in it. And whoever disbelieves in it - it is they who are the losers."
        },
        {
          number: 122,
          arabic: "يَا بَنِي إِسْرَائِيلَ اذْكُرُوا نِعْمَتِيَ الَّتِي أَنْعَمْتُ عَلَيْكُمْ وَأَنِّي فَضَّلْتُكُمْ عَلَى الْعَالَمِينَ",
          english: "O Children of Israel, remember My favor that I have bestowed upon you and that I preferred you over the worlds."
        },
        {
          number: 123,
          arabic: "وَاتَّقُوا يَوْمًا لَا تَجْزِي نَفْسٌ عَنْ نَفْسٍ شَيْئًا وَلَا يُقْبَلُ مِنْهَا عَدْلٌ وَلَا تَنْفَعُهَا شَفَاعَةٌ وَلَا هُمْ يُنْصَرُونَ",
          english: "And fear a Day when no soul will suffice for another soul at all, nor will compensation be accepted from it, nor will intercession benefit it, nor will they be aided."
        },
        {
          number: 124,
          arabic: "وَإِذِ ابْتَلَى إِبْرَاهِيمَ رَبُّهُ بِكَلِمَاتٍ فَأَتَمَّهُنَّ قَالَ إِنِّي جَاعِلُكَ لِلنَّاسِ إِمَامًا قَالَ وَمِنْ ذُرِّيَّتِي قَالَ لَا يَنَالُ عَهْدِي الظَّالِمِينَ",
          english: "And [mention, O Muhammad], when Abraham was tried by his Lord with commands and he fulfilled them. [Allah] said, 'Indeed, I will make you a leader for the people.' [Abraham] said, 'And of my descendants?' [Allah] said, 'My covenant does not include the wrongdoers.'"
        },
        {
          number: 125,
          arabic: "وَإِذْ جَعَلْنَا الْبَيْتَ مَثَابَةً لِلنَّاسِ وَأَمْنًا وَاتَّخِذُوا مِنْ مَقَامِ إِبْرَاهِيمَ مُصَلًّى وَعَهِدْنَا إِلَى إِبْرَاهِيمَ وَإِسْمَاعِيلَ أَنْ طَهِّرَا بَيْتِيَ لِلطَّائِفِينَ وَالْعَاكِفِينَ وَالرُّكَّعِ السُّجُودِ",
          english: "And [mention] when We made the House a place of return for the people and [a place of] security. And take, [O believers], from the standing place of Abraham a place of prayer. And We charged Abraham and Ishmael, [saying], 'Purify My House for those who perform Tawaf and those who are staying [there] for worship and those who bow and prostrate [in prayer].'"
        },
        {
          number: 126,
          arabic: "وَإِذْ قَالَ إِبْرَاهِيمُ رَبِّ اجْعَلْ هَذَا بَلَدًا آمِنًا وَارْزُقْ أَهْلَهُ مِنَ الثَّمَرَاتِ مَنْ آمَنَ مِنْهُمْ بِاللَّهِ وَالْيَوْمِ الْآخِرِ قَالَ وَمَنْ كَفَرَ فَأُمَتِّعُهُ قَلِيلًا ثُمَّ أَضْطَرُّهُ إِلَى عَذَابِ النَّارِ وَبِئْسَ الْمَصِيرُ",
          english: "And [mention] when Abraham said, 'My Lord, make this a secure city and provide its people with fruits - whoever of them believes in Allah and the Last Day.' [Allah] said. 'And whoever disbelieves - I will grant him enjoyment for a little; then I will force him to the punishment of the Fire, and wretched is the destination.'"
        },
        {
          number: 127,
          arabic: "وَإِذْ يَرْفَعُ إِبْرَاهِيمُ الْقَوَاعِدَ مِنَ الْبَيْتِ وَإِسْمَاعِيلُ رَبَّنَا تَقَبَّلْ مِنَّا إِنَّكَ أَنْتَ السَّمِيعُ الْعَلِيمُ",
          english: "And [mention] when Abraham was raising the foundations of the House and [with him] Ishmael, [saying], 'Our Lord, accept [this] from us. Indeed You are the Hearing, the Knowing.'"
        },
        {
          number: 128,
          arabic: "رَبَّنَا وَاجْعَلْنَا مُسْلِمَيْنِ لَكَ وَمِنْ ذُرِّيَّتِنَا أُمَّةً مُسْلِمَةً لَكَ وَأَرِنَا مَنَاسِكَنَا وَتُبْ عَلَيْنَا إِنَّكَ أَنْتَ التَّوَّابُ الرَّحِيمُ",
          english: "Our Lord, and make us Muslims [in submission] to You and from our descendants a Muslim nation [in submission] to You. And show us our rites and accept our repentance. Indeed, You are the Accepting of repentance, the Merciful."
        },
        {
          number: 129,
          arabic: "رَبَّنَا وَابْعَثْ فِيهِمْ رَسُولًا مِنْهُمْ يَتْلُو عَلَيْهِمْ آيَاتِكَ وَيُعَلِّمُهُمُ الْكِتَابَ وَالْحِكْمَةَ وَيُزَكِّيهِمْ إِنَّكَ أَنْتَ الْعَزِيزُ الْحَكِيمُ",
          english: "Our Lord, and send among them a messenger from themselves who will recite to them Your verses and teach them the Book and wisdom and purify them. Indeed, You are the Exalted in Might, the Wise."
        },
        {
          number: 130,
          arabic: "وَمَنْ يَرْغَبُ عَنْ مِلَّةِ إِبْرَاهِيمَ إِلَّا مَنْ سَفِهَ نَفْسَهُ وَلَقَدِ اصْطَفَيْنَاهُ فِي الدُّنْيَا وَإِنَّهُ فِي الْآخِرَةِ لَمِنَ الصَّالِحِينَ",
          english: "And who would be averse to the religion of Abraham except one who makes a fool of himself. And We had chosen him in this world, and indeed he, in the Hereafter, will be among the righteous."
        },
        {
          number: 131,
          arabic: "إِذْ قَالَ لَهُ رَبُّهُ أَسْلِمْ قَالَ أَسْلَمْتُ لِرَبِّ الْعَالَمِينَ",
          english: "When his Lord said to him, 'Submit', he said 'I have submitted [in Islam] to the Lord of the worlds.'"
        },
        {
          number: 132,
          arabic: "وَوَصَّى بِهَا إِبْرَاهِيمُ بَنِيهِ وَيَعْقُوبُ يَا بَنِيَّ إِنَّ اللَّهَ اصْطَفَى لَكُمُ الدِّينَ فَلَا تَمُوتُنَّ إِلَّا وَأَنْتُمْ مُسْلِمُونَ",
          english: "And Abraham instructed his sons [to do the same] and [so did] Jacob, [saying], 'O my sons, indeed Allah has chosen for you this religion, so do not die except while you are Muslims.'"
        },
        {
          number: 133,
          arabic: "أَمْ كُنْتُمْ شُهَدَاءَ إِذْ حَضَرَ يَعْقُوبَ الْمَوْتُ إِذْ قَالَ لِبَنِيهِ مَا تَعْبُدُونَ مِنْ بَعْدِي قَالُوا نَعْبُدُ إِلَهَكَ وَإِلَهَ آبَائِكَ إِبْرَاهِيمَ وَإِسْمَاعِيلَ وَإِسْحَاقَ إِلَهًا وَاحِدًا وَنَحْنُ لَهُ مُسْلِمُونَ",
          english: "Or were you witnesses when death approached Jacob, when he said to his sons, 'What will you worship after me?' They said, 'We will worship your God and the God of your fathers, Abraham and Ishmael and Isaac - one God. And we are Muslims [in submission] to Him.'"
        },
        {
          number: 134,
          arabic: "تِلْكَ أُمَّةٌ قَدْ خَلَتْ لَهَا مَا كَسَبَتْ وَلَكُمْ مَا كَسَبْتُمْ وَلَا تُسْأَلُونَ عَمَّا كَانُوا يَعْمَلُونَ",
          english: "That was a nation which has passed on. It will have [the consequence of] what it earned, and you will have what you have earned. And you will not be asked about what they used to do."
        },
        {
          number: 135,
          arabic: "وَقَالُوا كُونُوا هُودًا أَوْ نَصَارَى تَهْتَدُوا قُلْ بَلْ مِلَّةَ إِبْرَاهِيمَ حَنِيفًا وَمَا كَانَ مِنَ الْمُشْرِكِينَ",
          english: "They say, 'Be Jews or Christians [so] you will be guided.' Say, 'Rather, [we follow] the religion of Abraham, inclining toward truth, and he was not of the polytheists.'"
        },
        {
          number: 136,
          arabic: "قُولُوا آمَنَّا بِاللَّهِ وَمَا أُنْزِلَ إِلَيْنَا وَمَا أُنْزِلَ إِلَى إِبْرَاهِيمَ وَإِسْمَاعِيلَ وَإِسْحَاقَ وَيَعْقُوبَ وَالْأَسْبَاطِ وَمَا أُوتِيَ مُوسَى وَعِيسَى وَمَا أُوتِيَ النَّبِيُّونَ مِنْ رَبِّهِمْ لَا نُفَرِّقُ بَيْنَ أَحَدٍ مِنْهُمْ وَنَحْنُ لَهُ مُسْلِمُونَ",
          english: "Say, [O believers], 'We have believed in Allah and what has been revealed to us and what has been revealed to Abraham and Ishmael and Isaac and Jacob and the Descendants and what was given to Moses and Jesus and what was given to the prophets from their Lord. We make no distinction between any of them, and we are Muslims [in submission] to Him.'"
        },
        {
          number: 137,
          arabic: "فَإِنْ آمَنُوا بِمِثْلِ مَا آمَنْتُمْ بِهِ فَقَدِ اهْتَدَوْا وَإِنْ تَوَلَّوْا فَإِنَّمَا هُمْ فِي شِقَاقٍ فَسَيَكْفِيكَهُمُ اللَّهُ وَهُوَ السَّمِيعُ الْعَلِيمُ",
          english: "So if they believe in the same as you believe in, then they have been [rightly] guided; but if they turn away, they are only in dissension, and Allah will be sufficient for you against them. And He is the Hearing, the Knowing."
        },
        {
          number: 138,
          arabic: "صِبْغَةَ اللَّهِ وَمَنْ أَحْسَنُ مِنَ اللَّهِ صِبْغَةً وَنَحْنُ لَهُ عَابِدُونَ",
          english: "[We take our] color from Allah. And who is better than Allah in coloring? And we are worshippers of Him."
        },
        {
          number: 139,
          arabic: "قُلْ أَتُحَاجُّونَنَا فِي اللَّهِ وَهُوَ رَبُّنَا وَرَبُّكُمْ وَلَنَا أَعْمَالُنَا وَلَكُمْ أَعْمَالُكُمْ وَنَحْنُ لَهُ مُخْلِصُونَ",
          english: "Say, 'Do you argue with us about Allah while He is our Lord and your Lord? For us are our deeds, and for you are your deeds. And we are sincere [in deed and intention] to Him.'"
        },
        {
          number: 140,
          arabic: "أَمْ تَقُولُونَ إِنَّ إِبْرَاهِيمَ وَإِسْمَاعِيلَ وَإِسْحَاقَ وَيَعْقُوبَ وَالْأَسْبَاطَ كَانُوا هُودًا أَوْ نَصَارَى قُلْ أَأَنْتُمْ أَعْلَمُ أَمِ اللَّهُ وَمَنْ أَظْلَمُ مِمَّنْ كَتَمَ شَهَادَةً عِنْدَهُ مِنَ اللَّهِ وَمَا اللَّهُ بِغَافِلٍ عَمَّا تَعْمَلُونَ",
          english: "Or do you say that Abraham and Ishmael and Isaac and Jacob and the Descendants were Jews or Christians? Say, 'Are you more knowing or is Allah?' And who is more unjust than one who conceals a testimony he has from Allah? And Allah is not unaware of what you do."
        },
        {
          number: 141,
          arabic: "تِلْكَ أُمَّةٌ قَدْ خَلَتْ لَهَا مَا كَسَبَتْ وَلَكُمْ مَا كَسَبْتُمْ وَلَا تُسْأَلُونَ عَمَّا كَانُوا يَعْمَلُونَ",
          english: "That was a nation which has passed on. It will have [the consequence of] what it earned, and you will have what you have earned. And you will not be asked about what they used to do."
        },
        {
          number: 142,
          arabic: "سَيَقُولُ السُّفَهَاءُ مِنَ النَّاسِ مَا وَلَّاهُمْ عَنْ قِبْلَتِهِمُ الَّتِي كَانُوا عَلَيْهَا قُلْ لِلَّهِ الْمَشْرِقُ وَالْمَغْرِبُ يَهْدِي مَنْ يَشَاءُ إِلَى صِرَاطٍ مُسْتَقِيمٍ",
          english: "The foolish among the people will say, 'What has turned them away from their qiblah, which they used to face?' Say, 'To Allah belongs the east and the west. He guides whom He wills to a straight path.'"
        },
        {
          number: 143,
          arabic: "وَكَذَلِكَ جَعَلْنَاكُمْ أُمَّةً وَسَطًا لِتَكُونُوا شُهَدَاءَ عَلَى النَّاسِ وَيَكُونَ الرَّسُولُ عَلَيْكُمْ شَهِيدًا وَمَا جَعَلْنَا الْقِبْلَةَ الَّتِي كُنْتَ عَلَيْهَا إِلَّا لِنَعْلَمَ مَنْ يَتَّبِعُ الرَّسُولَ مِمَّنْ يَنْقَلِبُ عَلَى عَقِبَيْهِ وَإِنْ كَانَتْ لَكَبِيرَةً إِلَّا عَلَى الَّذِينَ هَدَى اللَّهُ وَمَا كَانَ اللَّهُ لِيُضِيعَ إِيمَانَكُمْ إِنَّ اللَّهَ بِالنَّاسِ لَرَءُوفٌ رَحِيمٌ",
          english: "And thus we have made you a just community that you will be witnesses over the people and the Messenger will be a witness over you. And We did not make the qiblah which you used to face except that We might make evident who would follow the Messenger from who would turn back on his heels. And indeed, it is difficult except for those whom Allah has guided. And never would Allah have caused you to lose your faith. Indeed Allah is, to the people, Kind and Merciful."
        },
        {
          number: 144,
          arabic: "قَدْ نَرَى تَقَلُّبَ وَجْهِكَ فِي السَّمَاءِ فَلَنُوَلِّيَنَّكَ قِبْلَةً تَرْضَاهَا فَوَلِّ وَجْهَكَ شَطْرَ الْمَسْجِدِ الْحَرَامِ وَحَيْثُ مَا كُنْتُمْ فَوَلُّوا وُجُوهَكُمْ شَطْرَهُ وَإِنَّ الَّذِينَ أُوتُوا الْكِتَابَ لَيَعْلَمُونَ أَنَّهُ الْحَقُّ مِنْ رَبِّهِمْ وَمَا اللَّهُ بِغَافِلٍ عَمَّا يَعْمَلُونَ",
          english: "We have certainly seen the turning of your face, [O Muhammad], toward the heaven, and We will surely turn you to a qiblah with which you will be pleased. So turn your face toward al-Masjid al-Haram. And wherever you [believers] are, turn your faces toward it [in prayer]. Indeed, those who have been given the Scripture well know that it is the truth from their Lord. And Allah is not unaware of what they do."
        },
        {
          number: 145,
          arabic: "وَلَئِنْ أَتَيْتَ الَّذِينَ أُوتُوا الْكِتَابَ بِكُلِّ آيَةٍ مَا تَبِعُوا قِبْلَتَكَ وَمَا أَنْتَ بِتَابِعٍ قِبْلَتَهُمْ وَمَا بَعْضُهُمْ بِتَابِعٍ قِبْلَةَ بَعْضٍ وَلَئِنِ اتَّبَعْتَ أَهْوَاءَهُمْ مِنْ بَعْدِ مَا جَاءَكَ مِنَ الْعِلْمِ إِنَّكَ إِذًا لَمِنَ الظَّالِمِينَ",
          english: "And if you brought to those who were given the Scripture every sign, they would not follow your qiblah. Nor will you be a follower of their qiblah. Nor would they be followers of one another's qiblah. So if you were to follow their desires after what has come to you of knowledge, indeed, you would then be among the wrongdoers."
        },
        {
          number: 146,
          arabic: "الَّذِينَ آتَيْنَاهُمُ الْكِتَابَ يَعْرِفُونَهُ كَمَا يَعْرِفُونَ أَبْنَاءَهُمْ وَإِنَّ فَرِيقًا مِنْهُمْ لَيَكْتُمُونَ الْحَقَّ وَهُمْ يَعْلَمُونَ",
          english: "Those to whom We gave the Scripture know him as they know their own sons. But indeed, a party of them conceal the truth while they know [it]."
        },
        {
          number: 147,
          arabic: "الْحَقُّ مِنْ رَبِّكَ فَلَا تَكُونَنَّ مِنَ الْمُمْتَرِينَ",
          english: "The truth is from your Lord, so never be among the doubters."
        },
        {
          number: 148,
          arabic: "وَلِكُلٍّ وِجْهَةٌ هُوَ مُوَلِّيهَا فَاسْتَبِقُوا الْخَيْرَاتِ أَيْنَ مَا تَكُونُوا يَأْتِ بِكُمُ اللَّهُ جَمِيعًا إِنَّ اللَّهَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
          english: "For each [religious following] is a direction toward which it faces. So race to [all that is] good. Wherever you may be, Allah will bring you forth [for judgement] all together. Indeed, Allah is over all things competent."
        },
        {
          number: 149,
          arabic: "وَمِنْ حَيْثُ خَرَجْتَ فَوَلِّ وَجْهَكَ شَطْرَ الْمَسْجِدِ الْحَرَامِ وَإِنَّهُ لَلْحَقُّ مِنْ رَبِّكَ وَمَا اللَّهُ بِغَافِلٍ عَمَّا تَعْمَلُونَ",
          english: "So from wherever you go out [for prayer], turn your face toward al-Masjid al-Haram. And indeed, it is the truth from your Lord. And Allah is not unaware of what you do."
        },
        {
          number: 150,
          arabic: "وَمِنْ حَيْثُ خَرَجْتَ فَوَلِّ وَجْهَكَ شَطْرَ الْمَسْجِدِ الْحَرَامِ وَحَيْثُ مَا كُنْتُمْ فَوَلُّوا وُجُوهَكُمْ شَطْرَهُ لِئَلَّا يَكُونَ لِلنَّاسِ عَلَيْكُمْ حُجَّةٌ إِلَّا الَّذِينَ ظَلَمُوا مِنْهُمْ فَلَا تَخْشَوْهُمْ وَاخْشَوْنِي وَلِأُتِمَّ نِعْمَتِي عَلَيْكُمْ وَلَعَلَّكُمْ تَهْتَدُونَ",
          english: "So from wherever you go out [for prayer], turn your face toward al-Masjid al-Haram. And wherever you [believers] may be, turn your faces toward it in order that the people will not have any argument against you, except for those of them who commit wrong; so fear them not but fear Me. And [it is] so I may complete My favor upon you and that you may be guided."
        },
        {
          number: 151,
          arabic: "كَمَا أَرْسَلْنَا فِيكُمْ رَسُولًا مِنْكُمْ يَتْلُو عَلَيْكُمْ آيَاتِنَا وَيُزَكِّيكُمْ وَيُعَلِّمُكُمُ الْكِتَابَ وَالْحِكْمَةَ وَيُعَلِّمُكُمْ مَا لَمْ تَكُونُوا تَعْلَمُونَ",
          english: "Just as We have sent among you a messenger from yourselves reciting to you Our verses and purifying you and teaching you the Book and wisdom and teaching you that which you did not know."
        },
        {
          number: 152,
          arabic: "فَاذْكُرُونِي أَذْكُرْكُمْ وَاشْكُرُوا لِي وَلَا تَكْفُرُونِ",
          english: "So remember Me; I will remember you. And be grateful to Me and do not deny Me."
        },
        {
          number: 153,
          arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا اسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ إِنَّ اللَّهَ مَعَ الصَّابِرِينَ",
          english: "O you who have believed, seek help through patience and prayer. Indeed, Allah is with the patient."
        },
        {
          number: 154,
          arabic: "وَلَا تَقُولُوا لِمَنْ يُقْتَلُ فِي سَبِيلِ اللَّهِ أَمْوَاتٌ بَلْ أَحْيَاءٌ وَلَكِنْ لَا تَشْعُرُونَ",
          english: "And do not say about those who are killed in the way of Allah, 'They are dead.' Rather, they are alive, but you perceive [it] not."
        },
        {
          number: 155,
          arabic: "وَلَنَبْلُوَنَّكُمْ بِشَيْءٍ مِنَ الْخَوْفِ وَالْجُوعِ وَنَقْصٍ مِنَ الْأَمْوَالِ وَالْأَنْفُسِ وَالثَّمَرَاتِ وَبَشِّرِ الصَّابِرِينَ",
          english: "And We will surely test you with something of fear and hunger and a loss of wealth and lives and fruits, but give good tidings to the patient."
        },
        {
          number: 156,
          arabic: "الَّذِينَ إِذَا أَصَابَتْهُمْ مُصِيبَةٌ قَالُوا إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ",
          english: "Who, when disaster strikes them, say, 'Indeed we belong to Allah, and indeed to Him we will return.'"
        },
        {
          number: 157,
          arabic: "أُولَئِكَ عَلَيْهِمْ صَلَوَاتٌ مِنْ رَبِّهِمْ وَرَحْمَةٌ وَأُولَئِكَ هُمُ الْمُهْتَدُونَ",
          english: "Those are the ones upon whom are blessings from their Lord and mercy. And it is those who are the [rightly] guided."
        },
        {
          number: 158,
          arabic: "إِنَّ الصَّفَا وَالْمَرْوَةَ مِنْ شَعَائِرِ اللَّهِ فَمَنْ حَجَّ الْبَيْتَ أَوِ اعْتَمَرَ فَلَا جُنَاحَ عَلَيْهِ أَنْ يَطَّوَّفَ بِهِمَا وَمَنْ تَطَوَّعَ خَيْرًا فَإِنَّ اللَّهَ شَاكِرٌ عَلِيمٌ",
          english: "Indeed, as-Safa and al-Marwah are among the symbols of Allah. So whoever makes Hajj to the House or performs 'umrah - there is no blame upon him for walking between them. And whoever volunteers good - then indeed, Allah is appreciative and Knowing."
        },
        {
          number: 159,
          arabic: "إِنَّ الَّذِينَ يَكْتُمُونَ مَا أَنْزَلْنَا مِنَ الْبَيِّنَاتِ وَالْهُدَى مِنْ بَعْدِ مَا بَيَّنَّاهُ لِلنَّاسِ فِي الْكِتَابِ أُولَئِكَ يَلْعَنُهُمُ اللَّهُ وَيَلْعَنُهُمُ اللَّاعِنُونَ",
          english: "Indeed, those who conceal what We sent down of clear proofs and guidance after We made it clear for the people in the Scripture - those are cursed by Allah and cursed by those who curse."
        },
        {
          number: 160,
          arabic: "إِلَّا الَّذِينَ تَابُوا وَأَصْلَحُوا وَبَيَّنُوا فَأُولَئِكَ أَتُوبُ عَلَيْهِمْ وَأَنَا التَّوَّابُ الرَّحِيمُ",
          english: "Except for those who repent and correct themselves and make evident [what they concealed]. Those - I will accept their repentance, and I am the Accepting of repentance, the Merciful."
        },
        {
          number: 161,
          arabic: "إِنَّ الَّذِينَ كَفَرُوا وَمَاتُوا وَهُمْ كُفَّارٌ أُولَئِكَ عَلَيْهِمْ لَعْنَةُ اللَّهِ وَالْمَلَائِكَةِ وَالنَّاسِ أَجْمَعِينَ",
          english: "Indeed, those who disbelieve and die while they are disbelievers - upon them will be the curse of Allah and of the angels and the people, all together."
        },
        {
          number: 162,
          arabic: "خَالِدِينَ فِيهَا لَا يُخَفَّفُ عَنْهُمُ الْعَذَابُ وَلَا هُمْ يُنْظَرُونَ",
          english: "Abiding eternally therein. The punishment will not be lightened for them, nor will they be reprieved."
        },
        {
          number: 163,
          arabic: "وَإِلَهُكُمْ إِلَهٌ وَاحِدٌ لَا إِلَهَ إِلَّا هُوَ الرَّحْمَنُ الرَّحِيمُ",
          english: "And your god is one God. There is no deity [worthy of worship] except Him, the Entirely Merciful, the Especially Merciful."
        },
        {
          number: 164,
          arabic: "إِنَّ فِي خَلْقِ السَّمَاوَاتِ وَالْأَرْضِ وَاخْتِلَافِ اللَّيْلِ وَالنَّهَارِ وَالْفُلْكِ الَّتِي تَجْرِي فِي الْبَحْرِ بِمَا يَنْفَعُ النَّاسَ وَمَا أَنْزَلَ اللَّهُ مِنَ السَّمَاءِ مِنْ مَاءٍ فَأَحْيَا بِهِ الْأَرْضَ بَعْدَ مَوْتِهَا وَبَثَّ فِيهَا مِنْ كُلِّ دَابَّةٍ وَتَصْرِيفِ الرِّيَاحِ وَالسَّحَابِ الْمُسَخَّرِ بَيْنَ السَّمَاءِ وَالْأَرْضِ لَآيَاتٍ لِقَوْمٍ يَعْقِلُونَ",
          english: "Indeed, in the creation of the heavens and earth, and the alternation of the night and the day, and the [great] ships which sail through the sea with that which benefits people, and what Allah has sent down from the heavens of rain, giving life thereby to the earth after its lifelessness and dispersing therein every [kind of] moving creature, and [His] directing of the winds and the clouds controlled between the heaven and the earth are signs for a people who use reason."
        },
        {
          number: 165,
          arabic: "وَمِنَ النَّاسِ مَنْ يَتَّخِذُ مِنْ دُونِ اللَّهِ أَنْدَادًا يُحِبُّونَهُمْ كَحُبِّ اللَّهِ وَالَّذِينَ آمَنُوا أَشَدُّ حُبًّا لِلَّهِ وَلَوْ يَرَى الَّذِينَ ظَلَمُوا إِذْ يَرَوْنَ الْعَذَابَ أَنَّ الْقُوَّةَ لِلَّهِ جَمِيعًا وَأَنَّ اللَّهَ شَدِيدُ الْعَذَابِ",
          english: "And [yet], among the people are those who take other than Allah as equals [to Him]. They love them as they [should] love Allah. But those who believe are stronger in love for Allah. And if only they who have wronged would consider [that] when they see the punishment, [they will be certain] that all power belongs to Allah and that Allah is severe in punishment."
        },
        {
          number: 166,
          arabic: "إِذْ تَبَرَّأَ الَّذِينَ اتُّبِعُوا مِنَ الَّذِينَ اتَّبَعُوا وَرَأَوُا الْعَذَابَ وَتَقَطَّعَتْ بِهِمُ الْأَسْبَابُ",
          english: "[And they should consider that] when those who have been followed disassociate themselves from those who followed [them], and they [all] see the punishment, and cut off from them are the ties [of relationship]."
        },
        {
          number: 167,
          arabic: "وَقَالَ الَّذِينَ اتَّبَعُوا لَوْ أَنَّ لَنَا كَرَّةً فَنَتَبَرَّأَ مِنْهُمْ كَمَا تَبَرَّءُوا مِنَّا كَذَلِكَ يُرِيهِمُ اللَّهُ أَعْمَالَهُمْ حَسَرَاتٍ عَلَيْهِمْ وَمَا هُمْ بِخَارِجِينَ مِنَ النَّارِ",
          english: "Those who followed will say, 'If only we had another turn [at worldly life] so we could disassociate ourselves from them as they have disassociated themselves from us.' Thus will Allah show them their deeds as regrets upon them. And they are never to emerge from the Fire."
        },
        {
          number: 168,
          arabic: "يَا أَيُّهَا النَّاسُ كُلُوا مِمَّا فِي الْأَرْضِ حَلَالًا طَيِّبًا وَلَا تَتَّبِعُوا خُطُوَاتِ الشَّيْطَانِ إِنَّهُ لَكُمْ عَدُوٌّ مُبِينٌ",
          english: "O mankind, eat from whatever is on earth [that is] lawful and good and do not follow the footsteps of Satan. Indeed, he is to you a clear enemy."
        },
        {
          number: 169,
          arabic: "إِنَّمَا يَأْمُرُكُمْ بِالسُّوءِ وَالْفَحْشَاءِ وَأَنْ تَقُولُوا عَلَى اللَّهِ مَا لَا تَعْلَمُونَ",
          english: "He only orders you to evil and immorality and to say about Allah what you do not know."
        },
        {
          number: 170,
          arabic: "وَإِذَا قِيلَ لَهُمُ اتَّبِعُوا مَا أَنْزَلَ اللَّهُ قَالُوا بَلْ نَتَّبِعُ مَا أَلْفَيْنَا عَلَيْهِ آبَاءَنَا أَوَلَوْ كَانَ آبَاؤُهُمْ لَا يَعْقِلُونَ شَيْئًا وَلَا يَهْتَدُونَ",
          english: "And when it is said to them, 'Follow what Allah has revealed,' they say, 'Rather, we will follow that which we found our fathers doing.' Even though their fathers understood nothing, nor were they guided?"
        },
        {
          number: 171,
          arabic: "وَمَثَلُ الَّذِينَ كَفَرُوا كَمَثَلِ الَّذِي يَنْعِقُ بِمَا لَا يَسْمَعُ إِلَّا دُعَاءً وَنِدَاءً صُمٌّ بُكْمٌ عُمْيٌ فَهُمْ لَا يَعْقِلُونَ",
          english: "The parable of those who disbelieve is that of someone who calls upon someone who hears nothing except screaming and yelling. Deaf, dumb, and blind—they do not understand."
        },
        {
          number: 172,
          arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا كُلُوا مِنْ طَيِّبَاتِ مَا رَزَقْنَاكُمْ وَاشْكُرُوا لِلَّهِ إِنْ كُنْتُمْ إِيَّاهُ تَعْبُدُونَ",
          english: "O you who believe! Eat of the good things We have provided for you, and give thanks to God, if it is Him that you serve."
        },
        {
          number: 173,
          arabic: "إِنَّمَا حَرَّمَ عَلَيْكُمُ الْمَيْتَةَ وَالدَّمَ وَلَحْمَ الْخِنْزِيرِ وَمَا أُهِلَّ بِهِ لِغَيْرِ اللَّهِ فَمَنِ اضْطُرَّ غَيْرَ بَاغٍ وَلَا عَادٍ فَلَا إِثْمَ عَلَيْهِ إِنَّ اللَّهَ غَفُورٌ رَحِيمٌ",
          english: "He has forbidden you carrion, and blood, and the flesh of swine, and what was dedicated to other than God. But if anyone is compelled, without desiring or exceeding, he commits no sin. God is Forgiving and Merciful."
        },
        {
          number: 174,
          arabic: "إِنَّ الَّذِينَ يَكْتُمُونَ مَا أَنْزَلَ اللَّهُ مِنَ الْكِتَابِ وَيَشْتَرُونَ بِهِ ثَمَنًا قَلِيلًا أُولَئِكَ مَا يَأْكُلُونَ فِي بُطُونِهِمْ إِلَّا النَّارَ وَلَا يُكَلِّمُهُمُ اللَّهُ يَوْمَ الْقِيَامَةِ وَلَا يُزَكِّيهِمْ وَلَهُمْ عَذَابٌ أَلِيمٌ",
          english: "Those who conceal what God revealed in the Book, and exchange it for a small price—those swallow nothing but fire into their bellies. And God will not speak to them on the Day of Resurrection, nor will He purify them, and they will have a painful punishment."
        },
        {
          number: 175,
          arabic: "أُولَئِكَ الَّذِينَ اشْتَرَوُا الضَّلَالَةَ بِالْهُدَى وَالْعَذَابَ بِالْمَغْفِرَةِ فَمَا أَصْبَرَهُمْ عَلَى النَّارِ",
          english: "It is they who exchange guidance for error, and forgiveness for punishment. But why do they insist on the Fire?"
        },
        {
          number: 176,
          arabic: "ذَلِكَ بِأَنَّ اللَّهَ نَزَّلَ الْكِتَابَ بِالْحَقِّ وَإِنَّ الَّذِينَ اخْتَلَفُوا فِي الْكِتَابِ لَفِي شِقَاقٍ بَعِيدٍ",
          english: "That is because God has revealed the Book in truth; and those who differ about the Book are in deep discord."
        },
        {
          number: 177,
          arabic: "لَيْسَ الْبِرَّ أَنْ تُوَلُّوا وُجُوهَكُمْ قِبَلَ الْمَشْرِقِ وَالْمَغْرِبِ وَلَكِنَّ الْبِرَّ مَنْ آمَنَ بِاللَّهِ وَالْيَوْمِ الْآخِرِ وَالْمَلَائِكَةِ وَالْكِتَابِ وَالنَّبِيِّينَ وَآتَى الْمَالَ عَلَى حُبِّهِ ذَوِي الْقُرْبَى وَالْيَتَامَى وَالْمَسَاكِينَ وَابْنَ السَّبِيلِ وَالسَّائِلِينَ وَفِي الرِّقَابِ وَأَقَامَ الصَّلَاةَ وَآتَى الزَّكَاةَ وَالْمُوفُونَ بِعَهْدِهِمْ إِذَا عَاهَدُوا وَالصَّابِرِينَ فِي الْبَأْسَاءِ وَالضَّرَّاءِ وَحِينَ الْبَأْسِ أُولَئِكَ الَّذِينَ صَدَقُوا وَأُولَئِكَ هُمُ الْمُتَّقُونَ",
          english: "Righteousness does not consist of turning your faces towards the East and the West. But righteous is he who believes in God, and the Last Day, and the angels, and the Scripture, and the prophets. Who gives money, though dear, to near relatives, and orphans, and the needy, and the homeless, and the beggars, and for the freeing of slaves; those who perform the prayers, and pay the obligatory charity, and fulfill their promise when they promise, and patiently persevere in the face of persecution, hardship, and in the time of conflict. These are the sincere; these are the pious."
        },
        {
          number: 178,
          arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا كُتِبَ عَلَيْكُمُ الْقِصَاصُ فِي الْقَتْلَى الْحُرُّ بِالْحُرِّ وَالْعَبْدُ بِالْعَبْدِ وَالْأُنْثَى بِالْأُنْثَى فَمَنْ عُفِيَ لَهُ مِنْ أَخِيهِ شَيْءٌ فَاتِّبَاعٌ بِالْمَعْرُوفِ وَأَدَاءٌ إِلَيْهِ بِإِحْسَانٍ ذَلِكَ تَخْفِيفٌ مِنْ رَبِّكُمْ وَرَحْمَةٌ فَمَنِ اعْتَدَى بَعْدَ ذَلِكَ فَلَهُ عَذَابٌ أَلِيمٌ",
          english: "O you who believe! Retaliation for the murdered is ordained upon you: the free for the free, the slave for the slave, the female for the female. But if he is forgiven by his kin, then grant any reasonable demand, and pay with good will. This is a concession from your Lord, and a mercy. But whoever commits aggression after that, a painful torment awaits him."
        },
        {
          number: 179,
          arabic: "وَلَكُمْ فِي الْقِصَاصِ حَيَاةٌ يَا أُولِي الْأَلْبَابِ لَعَلَّكُمْ تَتَّقُونَ",
          english: "There is life for you in retaliation, O people of understanding, so that you may refrain."
        },
        {
          number: 180,
          arabic: "كُتِبَ عَلَيْكُمْ إِذَا حَضَرَ أَحَدَكُمُ الْمَوْتُ إِنْ تَرَكَ خَيْرًا الْوَصِيَّةُ لِلْوَالِدَيْنِ وَالْأَقْرَبِينَ بِالْمَعْرُوفِ حَقًّا عَلَى الْمُتَّقِينَ",
          english: "It is decreed for you: when death approaches one of you, and he leaves wealth, to make a testament in favor of the parents and the relatives, fairly and correctly—a duty upon the righteous."
        },
        {
          number: 181,
          arabic: "فَمَنْ بَدَّلَهُ بَعْدَمَا سَمِعَهُ فَإِنَّمَا إِثْمُهُ عَلَى الَّذِينَ يُبَدِّلُونَهُ إِنَّ اللَّهَ سَمِيعٌ عَلِيمٌ",
          english: "But whoever changes it after he has heard it, the guilt is upon those who change it. God is All-Hearing, All-Knowing."
        },
        {
          number: 182,
          arabic: "فَمَنْ خَافَ مِنْ مُوصٍ جَنَفًا أَوْ إِثْمًا فَأَصْلَحَ بَيْنَهُمْ فَلَا إِثْمَ عَلَيْهِ إِنَّ اللَّهَ غَفُورٌ رَحِيمٌ",
          english: "Should someone suspect bias or injustice on the part of a testator, and then reconciles between them, he commits no sin. God is Forgiving and Merciful."
        },
        {
          number: 183,
          arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا كُتِبَ عَلَيْكُمُ الصِّيَامُ كَمَا كُتِبَ عَلَى الَّذِينَ مِنْ قَبْلِكُمْ لَعَلَّكُمْ تَتَّقُونَ",
          english: "O you who believe! Fasting is prescribed for you, as it was prescribed for those before you, that you may become righteous."
        },
        {
          number: 184,
          arabic: "أَيَّامًا مَعْدُودَاتٍ فَمَنْ كَانَ مِنْكُمْ مَرِيضًا أَوْ عَلَى سَفَرٍ فَعِدَّةٌ مِنْ أَيَّامٍ أُخَرَ وَعَلَى الَّذِينَ يُطِيقُونَهُ فِدْيَةٌ طَعَامُ مِسْكِينٍ فَمَنْ تَطَوَّعَ خَيْرًا فَهُوَ خَيْرٌ لَهُ وَأَنْ تَصُومُوا خَيْرٌ لَكُمْ إِنْ كُنْتُمْ تَعْلَمُونَ",
          english: "For a specified number of days. But whoever among you is sick, or on a journey, then a number of other days. For those who are able: a ransom of feeding a needy person. But whoever volunteers goodness, it is better for him. But to fast is best for you, if you only knew."
        },
        {
          number: 185,
          arabic: "شَهْرُ رَمَضَانَ الَّذِي أُنْزِلَ فِيهِ الْقُرْآنُ هُدًى لِلنَّاسِ وَبَيِّنَاتٍ مِنَ الْهُدَى وَالْفُرْقَانِ فَمَنْ شَهِدَ مِنْكُمُ الشَّهْرَ فَلْيَصُمْهُ وَمَنْ كَانَ مَرِيضًا أَوْ عَلَى سَفَرٍ فَعِدَّةٌ مِنْ أَيَّامٍ أُخَرَ يُرِيدُ اللَّهُ بِكُمُ الْيُسْرَ وَلَا يُرِيدُ بِكُمُ الْعُسْرَ وَلِتُكْمِلُوا الْعِدَّةَ وَلِتُكَبِّرُوا اللَّهَ عَلَى مَا هَدَاكُمْ وَلَعَلَّكُمْ تَشْكُرُونَ",
          english: "Ramadan is the month in which the Quran was revealed. Guidance for humanity, and clear portents of guidance, and the Criterion. Whoever of you witnesses the month, shall fast it. But whoever is sick, or on a journey, then a number of other days. God desires ease for you, and does not desire hardship for you, that you may complete the number, and celebrate God for having guided you, so that you may be thankful."
        },
        {
          number: 186,
          arabic: "وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ أُجِيبُ دَعْوَةَ الدَّاعِ إِذَا دَعَانِ فَلْيَسْتَجِيبُوا لِي وَلْيُؤْمِنُوا بِي لَعَلَّهُمْ يَرْشُدُونَ",
          english: "And when My servants ask you about Me, I Am near; I answer the call of the caller when he calls on Me. So let them answer Me, and have faith in Me, that they may be rightly guided."
        },
        {
          number: 187,
          arabic: "أُحِلَّ لَكُمْ لَيْلَةَ الصِّيَامِ الرَّفَثُ إِلَى نِسَائِكُمْ هُنَّ لِبَاسٌ لَكُمْ وَأَنْتُمْ لِبَاسٌ لَهُنَّ عَلِمَ اللَّهُ أَنَّكُمْ كُنْتُمْ تَخْتَانُونَ أَنْفُسَكُمْ فَتَابَ عَلَيْكُمْ وَعَفَا عَنْكُمْ فَالْآنَ بَاشِرُوهُنَّ وَابْتَغُوا مَا كَتَبَ اللَّهُ لَكُمْ وَكُلُوا وَاشْرَبُوا حَتَّى يَتَبَيَّنَ لَكُمُ الْخَيْطُ الْأَبْيَضُ مِنَ الْخَيْطِ الْأَسْوَدِ مِنَ الْفَجْرِ ثُمَّ أَتِمُّوا الصِّيَامَ إِلَى اللَّيْلِ وَلَا تُبَاشِرُوهُنَّ وَأَنْتُمْ عَاكِفُونَ فِي الْمَسَاجِدِ تِلْكَ حُدُودُ اللَّهِ فَلَا تَقْرَبُوهَا كَذَلِكَ يُبَيِّنُ اللَّهُ آيَاتِهِ لِلنَّاسِ لَعَلَّهُمْ يَتَّقُونَ",
          english: "Permitted for you is intercourse with your wives on the night of the fast. They are a garment for you, and you are a garment for them. God knows that you used to betray yourselves, but He turned to you and pardoned you. So approach them now, and seek what God has ordained for you, and eat and drink until the white streak of dawn can be distinguished from the black streak. Then complete the fast until nightfall. But do not approach them while you are in retreat at the mosques. These are the limits of God, so do not come near them. God thus clarifies His revelations to the people, that they may attain piety."
        },
        {
          number: 188,
          arabic: "وَلَا تَأْكُلُوا أَمْوَالَكُمْ بَيْنَكُمْ بِالْبَاطِلِ وَتُدْلُوا بِهَا إِلَى الْحُكَّامِ لِتَأْكُلُوا فَرِيقًا مِنْ أَمْوَالِ النَّاسِ بِالْإِثْمِ وَأَنْتُمْ تَعْلَمُونَ",
          english: "And do not consume one another's wealth by unjust means, nor offer it as bribes to the officials in order to consume part of other people's wealth illicitly, while you know."
        },
        {
          number: 189,
          arabic: "يَسْأَلُونَكَ عَنِ الْأَهِلَّةِ قُلْ هِيَ مَوَاقِيتُ لِلنَّاسِ وَالْحَجِّ وَلَيْسَ الْبِرُّ بِأَنْ تَأْتُوا الْبُيُوتَ مِنْ ظُهُورِهَا وَلَكِنَّ الْبِرَّ مَنِ اتَّقَى وَأْتُوا الْبُيُوتَ مِنْ أَبْوَابِهَا وَاتَّقُوا اللَّهَ لَعَلَّكُمْ تُفْلِحُونَ",
          english: "They ask you about the crescents. Say, 'They are timetables for people, and for the Hajj.' It is not virtuous that you approach homes from their backs, but virtue is to be pious. So approach homes from their doors, and observe God, that you may succeed."
        },
        {
          number: 190,
          arabic: "وَقَاتِلُوا فِي سَبِيلِ اللَّهِ الَّذِينَ يُقَاتِلُونَكُمْ وَلَا تَعْتَدُوا إِنَّ اللَّهَ لَا يُحِبُّ الْمُعْتَدِينَ",
          english: "And fight in the cause of God those who fight you, but do not commit aggression; God does not love the aggressors."
        },
        {
          number: 191,
          arabic: "وَاقْتُلُوهُمْ حَيْثُ ثَقِفْتُمُوهُمْ وَأَخْرِجُوهُمْ مِنْ حَيْثُ أَخْرَجُوكُمْ وَالْفِتْنَةُ أَشَدُّ مِنَ الْقَتْلِ وَلَا تُقَاتِلُوهُمْ عِنْدَ الْمَسْجِدِ الْحَرَامِ حَتَّى يُقَاتِلُوكُمْ فِيهِ فَإِنْ قَاتَلُوكُمْ فَاقْتُلُوهُمْ كَذَلِكَ جَزَاءُ الْكَافِرِينَ",
          english: "And kill them wherever you overtake them, and expel them from where they had expelled you. Oppression is more serious than murder. But do not fight them at the Sacred Mosque, unless they fight you there. If they fight you, then kill them. Such is the retribution of the disbelievers."
        },
        {
          number: 192,
          arabic: "فَإِنِ انْتَهَوْا فَإِنَّ اللَّهَ غَفُورٌ رَحِيمٌ",
          english: "But if they cease, then God is Forgiving and Merciful."
        },
        {
          number: 193,
          arabic: "وَقَاتِلُوهُمْ حَتَّى لَا تَكُونَ فِتْنَةٌ وَيَكُونَ الدِّينُ لِلَّهِ فَإِنِ انْتَهَوْا فَلَا عُدْوَانَ إِلَّا عَلَى الظَّالِمِينَ",
          english: "And fight them until there is no oppression, and worship becomes devoted to God alone. But if they cease, then let there be no hostility except against the oppressors."
        },
        {
          number: 194,
          arabic: "الشَّهْرُ الْحَرَامُ بِالشَّهْرِ الْحَرَامِ وَالْحُرُمَاتُ قِصَاصٌ فَمَنِ اعْتَدَى عَلَيْكُمْ فَاعْتَدُوا عَلَيْهِ بِمِثْلِ مَا اعْتَدَى عَلَيْكُمْ وَاتَّقُوا اللَّهَ وَاعْلَمُوا أَنَّ اللَّهَ مَعَ الْمُتَّقِينَ",
          english: "The sacred month for the sacred month; and sacrilege calls for retaliation. Whoever commits aggression against you, retaliate against him in the same measure as he has committed against you. And be conscious of God, and know that God is with the righteous."
        },
        {
          number: 195,
          arabic: "وَأَنْفِقُوا فِي سَبِيلِ اللَّهِ وَلَا تُلْقُوا بِأَيْدِيكُمْ إِلَى التَّهْلُكَةِ وَأَحْسِنُوا إِنَّ اللَّهَ يُحِبُّ الْمُحْسِنِينَ",
          english: "And spend in the cause of God, and do not throw yourselves with your own hands into ruin, and be charitable. God loves the charitable."
        },
        {
          number: 196,
          arabic: "وَأَتِمُّوا الْحَجَّ وَالْعُمْرَةَ لِلَّهِ فَإِنْ أُحْصِرْتُمْ فَمَا اسْتَيْسَرَ مِنَ الْهَدْيِ وَلَا تَحْلِقُوا رُءُوسَكُمْ حَتَّى يَبْلُغَ الْهَدْيُ مَحِلَّهُ فَمَنْ كَانَ مِنْكُمْ مَرِيضًا أَوْ بِهِ أَذًى مِنْ رَأْسِهِ فَفِدْيَةٌ مِنْ صِيَامٍ أَوْ صَدَقَةٍ أَوْ نُسُكٍ فَإِذَا أَمِنْتُمْ فَمَنْ تَمَتَّعَ بِالْعُمْرَةِ إِلَى الْحَجِّ فَمَا اسْتَيْسَرَ مِنَ الْهَدْيِ فَمَنْ لَمْ يَجِدْ فَصِيَامُ ثَلَاثَةِ أَيَّامٍ فِي الْحَجِّ وَسَبْعَةٍ إِذَا رَجَعْتُمْ تِلْكَ عَشَرَةٌ كَامِلَةٌ ذَلِكَ لِمَنْ لَمْ يَكُنْ أَهْلُهُ حَاضِرِي الْمَسْجِدِ الْحَرَامِ وَاتَّقُوا اللَّهَ وَاعْلَمُوا أَنَّ اللَّهَ شَدِيدُ الْعِقَابِ",
          english: "And carry out the Hajj and the Umrah for God. But if you are prevented, then whatever is feasible of offerings. And do not shave your heads until the offering has reached its destination. Whoever of you is sick, or has an injury of the head, then redemption of fasting, or charity, or worship. When you are secure: whoever continues the Umrah until the Hajj, then whatever is feasible of offering. But if he lacks the means, then fasting for three days during the Hajj and seven when you have returned, making ten in all. This is for he whose household is not present at the Sacred Mosque. And remain conscious of God, and know that God is stern in retribution."
        },
        {
          number: 197,
          arabic: "الْحَجُّ أَشْهُرٌ مَعْلُومَاتٌ فَمَنْ فَرَضَ فِيهِنَّ الْحَجَّ فَلَا رَفَثَ وَلَا فُسُوقَ وَلَا جِدَالَ فِي الْحَجِّ وَمَا تَفْعَلُوا مِنْ خَيْرٍ يَعْلَمْهُ اللَّهُ وَتَزَوَّدُوا فَإِنَّ خَيْرَ الزَّادِ التَّقْوَى وَاتَّقُونِ يَا أُولِي الْأَلْبَابِ",
          english: "The Hajj is during specific months. Whoever decides to perform the Hajj—there shall be no sexual relations, nor misconduct, nor quarrelling during the Hajj. And whatever good you do, God knows it. And take provisions, but the best provision is righteousness. And be mindful of Me, O people of understanding."
        },
        {
          number: 198,
          arabic: "لَيْسَ عَلَيْكُمْ جُنَاحٌ أَنْ تَبْتَغُوا فَضْلًا مِنْ رَبِّكُمْ فَإِذَا أَفَضْتُمْ مِنْ عَرَفَاتٍ فَاذْكُرُوا اللَّهَ عِنْدَ الْمَشْعَرِ الْحَرَامِ وَاذْكُرُوهُ كَمَا هَدَاكُمْ وَإِنْ كُنْتُمْ مِنْ قَبْلِهِ لَمِنَ الضَّالِّينَ",
          english: "You commit no error by seeking bounty from your Lord. When you disperse from Arafat, remember God at the Sacred Landmark. And remember Him as He has guided you. Although, before that, you were of those astray."
        },
        {
          number: 199,
          arabic: "ثُمَّ أَفِيضُوا مِنْ حَيْثُ أَفَاضَ النَّاسُ وَاسْتَغْفِرُوا اللَّهَ إِنَّ اللَّهَ غَفُورٌ رَحِيمٌ",
          english: "Then disperse from where the people disperse, and ask God for forgiveness. God is Most Forgiving, Most Merciful."
        },
        {
          number: 200,
          arabic: "فَإِذَا قَضَيْتُمْ مَنَاسِكَكُمْ فَاذْكُرُوا اللَّهَ كَذِكْرِكُمْ آبَاءَكُمْ أَوْ أَشَدَّ ذِكْرًا فَمِنَ النَّاسِ مَنْ يَقُولُ رَبَّنَا آتِنَا فِي الدُّنْيَا وَمَا لَهُ فِي الْآخِرَةِ مِنْ خَلَاقٍ",
          english: "When you have completed your rites, remember God as you remember your parents, or even more. Among the people is he who says, 'Our Lord, give us in this world,' yet he has no share in the Hereafter."
        },
        {
          number: 201,
          arabic: "وَمِنْهُمْ مَنْ يَقُولُ رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
          english: "And among them is he who says, 'Our Lord, give us goodness in this world, and goodness in the Hereafter, and protect us from the torment of the Fire.'"
        },
        {
          number: 202,
          arabic: "أُولَئِكَ لَهُمْ نَصِيبٌ مِمَّا كَسَبُوا وَاللَّهُ سَرِيعُ الْحِسَابِ",
          english: "These will have a share of what they have earned. God is swift in reckoning."
        },
        {
          number: 203,
          arabic: "وَاذْكُرُوا اللَّهَ فِي أَيَّامٍ مَعْدُودَاتٍ فَمَنْ تَعَجَّلَ فِي يَوْمَيْنِ فَلَا إِثْمَ عَلَيْهِ وَمَنْ تَأَخَّرَ فَلَا إِثْمَ عَلَيْهِ لِمَنِ اتَّقَى وَاتَّقُوا اللَّهَ وَاعْلَمُوا أَنَّكُمْ إِلَيْهِ تُحْشَرُونَ",
          english: "And remember God during the designated days. But whoever hurries on in two days commits no wrong, and whoever stays on commits no wrong—provided he maintains righteousness. And obey God, and know that to Him you will be gathered."
        },
        {
          number: 204,
          arabic: "وَمِنَ النَّاسِ مَنْ يُعْجِبُكَ قَوْلُهُ فِي الْحَيَاةِ الدُّنْيَا وَيُشْهِدُ اللَّهَ عَلَى مَا فِي قَلْبِهِ وَهُوَ أَلَدُّ الْخِصَامِ",
          english: "Among the people is he whose speech about the worldly life impresses you, and he calls God to witness what is in his heart, while he is the most hostile of adversaries."
        },
        {
          number: 205,
          arabic: "وَإِذَا تَوَلَّى سَعَى فِي الْأَرْضِ لِيُفْسِدَ فِيهَا وَيُهْلِكَ الْحَرْثَ وَالنَّسْلَ وَاللَّهُ لَا يُحِبُّ الْفَسَادَ",
          english: "When he gains power, he strives to spread corruption on earth, destroying properties and lives. God does not like corruption."
        },
        {
          number: 206,
          arabic: "وَإِذَا قِيلَ لَهُ اتَّقِ اللَّهَ أَخَذَتْهُ الْعِزَّةُ بِالْإِثْمِ فَحَسْبُهُ جَهَنَّمُ وَلَبِئْسَ الْمِهَادُ",
          english: "And when he is told, 'Beware of God,' his pride leads him to more sin. Hell is enough for him—a dreadful abode."
        },
        {
          number: 207,
          arabic: "وَمِنَ النَّاسِ مَنْ يَشْرِي نَفْسَهُ ابْتِغَاءَ مَرْضَاتِ اللَّهِ وَاللَّهُ رَءُوفٌ بِالْعِبَادِ",
          english: "And among the people is he who sells himself seeking God's approval. God is kind towards the servants."
        },
        {
          number: 208,
          arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا ادْخُلُوا فِي السِّلْمِ كَافَّةً وَلَا تَتَّبِعُوا خُطُوَاتِ الشَّيْطَانِ إِنَّهُ لَكُمْ عَدُوٌّ مُبِينٌ",
          english: "O you who believe! Enter into submission, wholeheartedly, and do not follow the footsteps of Satan; he is to you an outright enemy."
        },
        {
          number: 209,
          arabic: "فَإِنْ زَلَلْتُمْ مِنْ بَعْدِ مَا جَاءَتْكُمُ الْبَيِّنَاتُ فَاعْلَمُوا أَنَّ اللَّهَ عَزِيزٌ حَكِيمٌ",
          english: "But if you slip after the proofs have come to you, know that God is Powerful and Wise."
        },
        {
          number: 210,
          arabic: "هَلْ يَنْظُرُونَ إِلَّا أَنْ يَأْتِيَهُمُ اللَّهُ فِي ظُلَلٍ مِنَ الْغَمَامِ وَالْمَلَائِكَةُ وَقُضِيَ الْأَمْرُ وَإِلَى اللَّهِ تُرْجَعُ الْأُمُورُ",
          english: "Are they waiting for God Himself to come to them in the shadows of the clouds, together with the angels, and thus the matter is settled? All things are returned to God."
        },
        {
          number: 211,
          arabic: "سَلْ بَنِي إِسْرَائِيلَ كَمْ آتَيْنَاهُمْ مِنْ آيَةٍ بَيِّنَةٍ وَمَنْ يُبَدِّلْ نِعْمَةَ اللَّهِ مِنْ بَعْدِ مَا جَاءَتْهُ فَإِنَّ اللَّهَ شَدِيدُ الْعِقَابِ",
          english: "Ask the Children of Israel how many clear signs We have given them. Whoever alters the blessing of God after it has come to him—God is severe in retribution."
        },
        {
          number: 212,
          arabic: "زُيِّنَ لِلَّذِينَ كَفَرُوا الْحَيَاةُ الدُّنْيَا وَيَسْخَرُونَ مِنَ الَّذِينَ آمَنُوا وَالَّذِينَ اتَّقَوْا فَوْقَهُمْ يَوْمَ الْقِيَامَةِ وَاللَّهُ يَرْزُقُ مَنْ يَشَاءُ بِغَيْرِ حِسَابٍ",
          english: "Beautified is the life of this world for those who disbelieve, and they ridicule those who believe. But the righteous will be above them on the Day of Resurrection. God provides to whomever He wills without measure."
        },
        {
          number: 213,
          arabic: "كَانَ النَّاسُ أُمَّةً وَاحِدَةً فَبَعَثَ اللَّهُ النَّبِيِّينَ مُبَشِّرِينَ وَمُنْذِرِينَ وَأَنْزَلَ مَعَهُمُ الْكِتَابَ بِالْحَقِّ لِيَحْكُمَ بَيْنَ النَّاسِ فِيمَا اخْتَلَفُوا فِيهِ وَمَا اخْتَلَفَ فِيهِ إِلَّا الَّذِينَ أُوتُوهُ مِنْ بَعْدِ مَا جَاءَتْهُمُ الْبَيِّنَاتُ بَغْيًا بَيْنَهُمْ فَهَدَى اللَّهُ الَّذِينَ آمَنُوا لِمَا اخْتَلَفُوا فِيهِ مِنَ الْحَقِّ بِإِذْنِهِ وَاللَّهُ يَهْدِي مَنْ يَشَاءُ إِلَى صِرَاطٍ مُسْتَقِيمٍ",
          english: "Humanity used to be one community; then God sent the prophets, bringing good news and giving warnings. And He sent down with them the Scripture, with the truth, to judge between people regarding their differences. But none differed over it except those who were given it—after the proofs had come to them—out of mutual envy between them. Then God guided those who believed to the truth they had disputed, in accordance with His will. God guides whom He wills to a straight path."
        },
        {
          number: 214,
          arabic: "أَمْ حَسِبْتُمْ أَنْ تَدْخُلُوا الْجَنَّةَ وَلَمَّا يَأْتِكُمْ مَثَلُ الَّذِينَ خَلَوْا مِنْ قَبْلِكُمْ مَسَّتْهُمُ الْبَأْسَاءُ وَالضَّرَّاءُ وَزُلْزِلُوا حَتَّى يَقُولَ الرَّسُولُ وَالَّذِينَ آمَنُوا مَعَهُ مَتَى نَصْرُ اللَّهِ أَلَا إِنَّ نَصْرَ اللَّهِ قَرِيبٌ",
          english: "Or do you expect to enter Paradise before the example of those who came before you had reached you? Adversity and hardship had afflicted them, and they were so shaken up, that the Messenger and those who believed with him said, 'When is God's victory?' Indeed, God's victory is near."
        },
        {
          number: 215,
          arabic: "يَسْأَلُونَكَ مَاذَا يُنْفِقُونَ قُلْ مَا أَنْفَقْتُمْ مِنْ خَيْرٍ فَلِلْوَالِدَيْنِ وَالْأَقْرَبِينَ وَالْيَتَامَى وَالْمَسَاكِينِ وَابْنِ السَّبِيلِ وَمَا تَفْعَلُوا مِنْ خَيْرٍ فَإِنَّ اللَّهَ بِهِ عَلِيمٌ",
          english: "They ask you what they should give. Say, 'Whatever charity you give is for the parents, and the relatives, and the orphans, and the poor, and the wayfarer. Whatever good you do, God is aware of it.'"
        },
        {
          number: 216,
          arabic: "كُتِبَ عَلَيْكُمُ الْقِتَالُ وَهُوَ كُرْهٌ لَكُمْ وَعَسَى أَنْ تَكْرَهُوا شَيْئًا وَهُوَ خَيْرٌ لَكُمْ وَعَسَى أَنْ تُحِبُّوا شَيْئًا وَهُوَ شَرٌّ لَكُمْ وَاللَّهُ يَعْلَمُ وَأَنْتُمْ لَا تَعْلَمُونَ",
          english: "Fighting is ordained for you, even though you dislike it. But it may be that you dislike something while it is good for you, and it may be that you like something while it is bad for you. God knows, and you do not know."
        },
        {
          number: 217,
          arabic: "يَسْأَلُونَكَ عَنِ الشَّهْرِ الْحَرَامِ قِتَالٍ فِيهِ قُلْ قِتَالٌ فِيهِ كَبِيرٌ وَصَدٌّ عَنْ سَبِيلِ اللَّهِ وَكُفْرٌ بِهِ وَالْمَسْجِدِ الْحَرَامِ وَإِخْرَاجُ أَهْلِهِ مِنْهُ أَكْبَرُ عِنْدَ اللَّهِ وَالْفِتْنَةُ أَكْبَرُ مِنَ الْقَتْلِ وَلَا يَزَالُونَ يُقَاتِلُونَكُمْ حَتَّى يَرُدُّوكُمْ عَنْ دِينِكُمْ إِنِ اسْتَطَاعُوا وَمَنْ يَرْتَدِدْ مِنْكُمْ عَنْ دِينِهِ فَيَمُتْ وَهُوَ كَافِرٌ فَأُولَئِكَ حَبِطَتْ أَعْمَالُهُمْ فِي الدُّنْيَا وَالْآخِرَةِ وَأُولَئِكَ أَصْحَابُ النَّارِ هُمْ فِيهَا خَالِدُونَ",
          english: "They ask you about fighting during the Holy Month. Say, 'Fighting during it is deplorable; but to bar others from God's path, and to disbelieve in Him, and to prevent access to the Holy Mosque, and to expel its people from it, are more deplorable with God. And persecution is more serious than killing. They will not cease to fight you until they turn you back from your religion, if they can. Whoever among you turns back from his religion, and dies a disbeliever—those are they whose works will come to nothing, in this life, and in the Hereafter. Those are the inmates of the Fire, abiding in it forever.'"
        },
        {
          number: 218,
          arabic: "إِنَّ الَّذِينَ آمَنُوا وَالَّذِينَ هَاجَرُوا وَجَاهَدُوا فِي سَبِيلِ اللَّهِ أُولَئِكَ يَرْجُونَ رَحْمَتَ اللَّهِ وَاللَّهُ غَفُورٌ رَحِيمٌ",
          english: "Those who believed, and those who migrated and fought for the sake of God—those look forward to God's mercy. God is Forgiving and Merciful."
        },
        {
          number: 219,
          arabic: "يَسْأَلُونَكَ عَنِ الْخَمْرِ وَالْمَيْسِرِ قُلْ فِيهِمَا إِثْمٌ كَبِيرٌ وَمَنَافِعُ لِلنَّاسِ وَإِثْمُهُمَا أَكْبَرُ مِنْ نَفْعِهِمَا وَيَسْأَلُونَكَ مَاذَا يُنْفِقُونَ قُلِ الْعَفْوَ كَذَلِكَ يُبَيِّنُ اللَّهُ لَكُمُ الْآيَاتِ لَعَلَّكُمْ تَتَفَكَّرُونَ",
          english: "They ask you about intoxicants and gambling. Say, 'There is gross sin in them, and some benefits for people, but their sinfulness outweighs their benefit.' And they ask you about what they should give: say, 'The surplus.' Thus God explains the revelations to you, so that you may think."
        },
        {
          number: 220,
          arabic: "فِي الدُّنْيَا وَالْآخِرَةِ وَيَسْأَلُونَكَ عَنِ الْيَتَامَى قُلْ إِصْلَاحٌ لَهُمْ خَيْرٌ وَإِنْ تُخَالِطُوهُمْ فَإِخْوَانُكُمْ وَاللَّهُ يَعْلَمُ الْمُفْسِدَ مِنَ الْمُصْلِحِ وَلَوْ شَاءَ اللَّهُ لَأَعْنَتَكُمْ إِنَّ اللَّهَ عَزِيزٌ حَكِيمٌ",
          english: "About this world and the next. And they ask you about orphans. Say, 'Improvement for them is best. And if you intermix with them, then they are your brethren.' God knows the dishonest from the honest. Had God willed, He could have overburdened you. God is Mighty and Wise."
        },
        {
          number: 221,
          arabic: "وَلَا تَنْكِحُوا الْمُشْرِكَاتِ حَتَّى يُؤْمِنَّ وَلَأَمَةٌ مُؤْمِنَةٌ خَيْرٌ مِنْ مُشْرِكَةٍ وَلَوْ أَعْجَبَتْكُمْ وَلَا تُنْكِحُوا الْمُشْرِكِينَ حَتَّى يُؤْمِنُوا وَلَعَبْدٌ مُؤْمِنٌ خَيْرٌ مِنْ مُشْرِكٍ وَلَوْ أَعْجَبَكُمْ أُولَئِكَ يَدْعُونَ إِلَى النَّارِ وَاللَّهُ يَدْعُو إِلَى الْجَنَّةِ وَالْمَغْفِرَةِ بِإِذْنِهِ وَيُبَيِّنُ آيَاتِهِ لِلنَّاسِ لَعَلَّهُمْ يَتَذَكَّرُونَ",
          english: "Do not marry idolatresses, unless they have believed. A believing maid is better than an idolatress, even if you like her. And do not marry idolaters, unless they have believed. A believing servant is better than an idolater, even if you like him. These call to the Fire, but God calls to the Garden and to forgiveness, by His leave. He makes clear His communications to the people, that they may be mindful."
        },
        {
          number: 222,
          arabic: "وَيَسْأَلُونَكَ عَنِ الْمَحِيضِ قُلْ هُوَ أَذًى فَاعْتَزِلُوا النِّسَاءَ فِي الْمَحِيضِ وَلَا تَقْرَبُوهُنَّ حَتَّى يَطْهُرْنَ فَإِذَا تَطَهَّرْنَ فَأْتُوهُنَّ مِنْ حَيْثُ أَمَرَكُمُ اللَّهُ إِنَّ اللَّهَ يُحِبُّ التَّوَّابِينَ وَيُحِبُّ الْمُتَطَهِّرِينَ",
          english: "And they ask you about menstruation: say, 'It is harmful, so keep away from women during menstruation. And do not approach them until they have become pure. Once they have become pure, approach them in the way God has directed you.' God loves the repentant, and He loves those who keep clean."
        },
        {
          number: 223,
          arabic: "نِسَاؤُكُمْ حَرْثٌ لَكُمْ فَأْتُوا حَرْثَكُمْ أَنَّى شِئْتُمْ وَقَدِّمُوا لِأَنْفُسِكُمْ وَاتَّقُوا اللَّهَ وَاعْلَمُوا أَنَّكُمْ مُلَاقُوهُ وَبَشِّرِ الْمُؤْمِنِينَ",
          english: "Your women are cultivation for you; so approach your cultivation whenever you like, and send ahead for yourselves. And fear God, and know that you will meet Him. And give good news to the believers."
        },
        {
          number: 224,
          arabic: "وَلَا تَجْعَلُوا اللَّهَ عُرْضَةً لِأَيْمَانِكُمْ أَنْ تَبَرُّوا وَتَتَّقُوا وَتُصْلِحُوا بَيْنَ النَّاسِ وَاللَّهُ سَمِيعٌ عَلِيمٌ",
          english: "And do not allow your oaths in God's name to hinder you from virtue, and righteousness, and making peace between people. God is Listener and Knower."
        },
        {
          number: 225,
          arabic: "لَا يُؤَاخِذُكُمُ اللَّهُ بِاللَّغْوِ فِي أَيْمَانِكُمْ وَلَكِنْ يُؤَاخِذُكُمْ بِمَا كَسَبَتْ قُلُوبُكُمْ وَاللَّهُ غَفُورٌ حَلِيمٌ",
          english: "God does not hold you responsible for your unintentional oaths, but He holds you responsible for your intentions. God is Forgiving and Forbearing."
        },
        {
          number: 226,
          arabic: "لِلَّذِينَ يُؤْلُونَ مِنْ نِسَائِهِمْ تَرَبُّصُ أَرْبَعَةِ أَشْهُرٍ فَإِنْ فَاءُوا فَإِنَّ اللَّهَ غَفُورٌ رَحِيمٌ",
          english: "Those who vow abstinence from their wives must wait for four months. But if they reconcile—God is Forgiving and Merciful."
        },
        {
          number: 227,
          arabic: "وَإِنْ عَزَمُوا الطَّلَاقَ فَإِنَّ اللَّهَ سَمِيعٌ عَلِيمٌ",
          english: "And if they resolve to divorce—God is Hearing and Knowing."
        },
        {
          number: 228,
          arabic: "وَالْمُطَلَّقَاتُ يَتَرَبَّصْنَ بِأَنْفُسِهِنَّ ثَلَاثَةَ قُرُوءٍ وَلَا يَحِلُّ لَهُنَّ أَنْ يَكْتُمْنَ مَا خَلَقَ اللَّهُ فِي أَرْحَامِهِنَّ إِنْ كُنَّ يُؤْمِنَّ بِاللَّهِ وَالْيَوْمِ الْآخِرِ وَبُعُولَتُهُنَّ أَحَقُّ بِرَدِّهِنَّ فِي ذَلِكَ إِنْ أَرَادُوا إِصْلَاحًا وَلَهُنَّ مِثْلُ الَّذِي عَلَيْهِنَّ بِالْمَعْرُوفِ وَلِلرِّجَالِ عَلَيْهِنَّ دَرَجَةٌ وَاللَّهُ عَزِيزٌ حَكِيمٌ",
          english: "Divorced women shall wait by themselves for three periods. And it is not lawful for them to conceal what God has created in their wombs, if they believe in God and the Last Day. Meanwhile, their husbands have the better right to take them back, if they desire reconciliation. And women have rights similar to their obligations, according to what is fair. But men have a degree over them. God is Mighty and Wise."
        },
        {
          number: 229,
          arabic: "الطَّلَاقُ مَرَّتَانِ فَإِمْسَاكٌ بِمَعْرُوفٍ أَوْ تَسْرِيحٌ بِإِحْسَانٍ وَلَا يَحِلُّ لَكُمْ أَنْ تَأْخُذُوا مِمَّا آتَيْتُمُوهُنَّ شَيْئًا إِلَّا أَنْ يَخَافَا أَلَّا يُقِيمَا حُدُودَ اللَّهِ فَإِنْ خِفْتُمْ أَلَّا يُقِيمَا حُدُودَ اللَّهِ فَلَا جُنَاحَ عَلَيْهِمَا فِيمَا افْتَدَتْ بِهِ تِلْكَ حُدُودُ اللَّهِ فَلَا تَعْتَدُوهَا وَمَنْ يَتَعَدَّ حُدُودَ اللَّهِ فَأُولَئِكَ هُمُ الظَّالِمُونَ",
          english: "Divorce is allowed twice. Then, either honorable retention, or setting free kindly. It is not lawful for you to take back anything you have given them, unless they fear that they cannot maintain God's limits. If you fear that they cannot maintain God's limits, then there is no blame on them if she sacrifices something for her release. These are God's limits, so do not transgress them. Those who transgress God's limits are the unjust."
        },
        {
          number: 230,
          arabic: "فَإِنْ طَلَّقَهَا فَلَا تَحِلُّ لَهُ مِنْ بَعْدُ حَتَّى تَنْكِحَ زَوْجًا غَيْرَهُ فَإِنْ طَلَّقَهَا فَلَا جُنَاحَ عَلَيْهِمَا أَنْ يَتَرَاجَعَا إِنْ ظَنَّا أَنْ يُقِيمَا حُدُودَ اللَّهِ وَتِلْكَ حُدُودُ اللَّهِ يُبَيِّنُهَا لِقَوْمٍ يَعْلَمُونَ",
          english: "If he divorces her, she shall not be lawful for him again until she has married another husband. If the latter divorces her, then there is no blame on them for reuniting, provided they think they can maintain God's limits. These are God's limits; He makes them clear to people who know."
        },
        {
          number: 231,
          arabic: "وَإِذَا طَلَّقْتُمُ النِّسَاءَ فَبَلَغْنَ أَجَلَهُنَّ فَأَمْسِكُوهُنَّ بِمَعْرُوفٍ أَوْ سَرِّحُوهُنَّ بِمَعْرُوفٍ وَلَا تُمْسِكُوهُنَّ ضِرَارًا لِتَعْتَدُوا وَمَنْ يَفْعَلْ ذَلِكَ فَقَدْ ظَلَمَ نَفْسَهُ وَلَا تَتَّخِذُوا آيَاتِ اللَّهِ هُزُوًا وَاذْكُرُوا نِعْمَتَ اللَّهِ عَلَيْكُمْ وَمَا أَنْزَلَ عَلَيْكُمْ مِنَ الْكِتَابِ وَالْحِكْمَةِ يَعِظُكُمْ بِهِ وَاتَّقُوا اللَّهَ وَاعْلَمُوا أَنَّ اللَّهَ بِكُلِّ شَيْءٍ عَلِيمٌ",
          english: "When you divorce women, and they have reached their term, either retain them amicably, or release them amicably. But do not retain them to hurt them and commit aggression. Whoever does that has wronged himself. And do not take God's revelations for a joke. And remember God's favor to you, and that He revealed to you the Scripture and Wisdom to teach you. And fear God, and know that God is aware of everything."
        },
        {
          number: 232,
          arabic: "وَإِذَا طَلَّقْتُمُ النِّسَاءَ فَبَلَغْنَ أَجَلَهُنَّ فَلَا تَعْضُلُوهُنَّ أَنْ يَنْكِحْنَ أَزْوَاجَهُنَّ إِذَا تَرَاضَوْا بَيْنَهُمْ بِالْمَعْرُوفِ ذَلِكَ يُوعَظُ بِهِ مَنْ كَانَ مِنْكُمْ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الْآخِرِ ذَلِكُمْ أَزْكَى لَكُمْ وَأَطْهَرُ وَاللَّهُ يَعْلَمُ وَأَنْتُمْ لَا تَعْلَمُونَ",
          english: "When you divorce women, and they have reached their term, do not prevent them from marrying their husbands, provided they agree on fair terms. Thereby is advised whoever among you believes in God and the Last Day. That is better and more decent for you. God knows, and you do not know."
        },
        {
          number: 233,
          arabic: "وَالْوَالِدَاتُ يُرْضِعْنَ أَوْلَادَهُنَّ حَوْلَيْنِ كَامِلَيْنِ لِمَنْ أَرَادَ أَنْ يُتِمَّ الرَّضَاعَةَ وَعَلَى الْمَوْلُودِ لَهُ رِزْقُهُنَّ وَكِسْوَتُهُنَّ بِالْمَعْرُوفِ لَا تُكَلَّفُ نَفْسٌ إِلَّا وُسْعَهَا لَا تُضَارَّ وَالِدَةٌ بِوَلَدِهَا وَلَا مَوْلُودٌ لَهُ بِوَلَدِهِ وَعَلَى الْوَارِثِ مِثْلُ ذَلِكَ فَإِنْ أَرَادَا فِصَالًا عَنْ تَرَاضٍ مِنْهُمَا وَتَشَاوُرٍ فَلَا جُنَاحَ عَلَيْهِمَا وَإِنْ أَرَدْتُمْ أَنْ تَسْتَرْضِعُوا أَوْلَادَكُمْ فَلَا جُنَاحَ عَلَيْكُمْ إِذَا سَلَّمْتُمْ مَا آتَيْتُمْ بِالْمَعْرُوفِ وَاتَّقُوا اللَّهَ وَاعْلَمُوا أَنَّ اللَّهَ بِمَا تَعْمَلُونَ بَصِيرٌ",
          english: "Mothers may nurse their infants for two whole years, for those who desire to complete the nursing-period. It is the duty of the father to provide for them and clothe them in a proper manner. No soul shall be burdened beyond its capacity. No mother shall be harmed on account of her child, and no father shall be harmed on account of his child. The same duty rests upon the heir. If the couple desire weaning, by mutual consent and consultation, they commit no error by doing so. You commit no error by hiring nursing-mothers, as long as you pay them fairly. And be wary of God, and know that God is Seeing of what you do."
        },
        {
          number: 234,
          arabic: "وَالَّذِينَ يُتَوَفَّوْنَ مِنْكُمْ وَيَذَرُونَ أَزْوَاجًا يَتَرَبَّصْنَ بِأَنْفُسِهِنَّ أَرْبَعَةَ أَشْهُرٍ وَعَشْرًا فَإِذَا بَلَغْنَ أَجَلَهُنَّ فَلَا جُنَاحَ عَلَيْكُمْ فِيمَا فَعَلْنَ فِي أَنْفُسِهِنَّ بِالْمَعْرُوفِ وَاللَّهُ بِمَا تَعْمَلُونَ خَبِيرٌ",
          english: "As for those among you who die and leave widows behind, their widows shall wait by themselves for four months and ten days. When they have reached their term, there is no blame on you regarding what they might honorably do with themselves. God is fully acquainted with what you do."
        },
        {
          number: 235,
          arabic: "وَلَا جُنَاحَ عَلَيْكُمْ فِيمَا عَرَّضْتُمْ بِهِ مِنْ خِطْبَةِ النِّسَاءِ أَوْ أَكْنَنْتُمْ فِي أَنْفُسِكُمْ عَلِمَ اللَّهُ أَنَّكُمْ سَتَذْكُرُونَهُنَّ وَلَكِنْ لَا تُوَاعِدُوهُنَّ سِرًّا إِلَّا أَنْ تَقُولُوا قَوْلًا مَعْرُوفًا وَلَا تَعْزِمُوا عُقْدَةَ النِّكَاحِ حَتَّى يَبْلُغَ الْكِتَابُ أَجَلَهُ وَاعْلَمُوا أَنَّ اللَّهَ يَعْلَمُ مَا فِي أَنْفُسِكُمْ فَاحْذَرُوهُ وَاعْلَمُوا أَنَّ اللَّهَ غَفُورٌ حَلِيمٌ",
          english: "You commit no error by announcing your engagement to women, or by keeping it to yourselves. God knows that you will be thinking about them. But do not meet them secretly, unless you have something proper to say. And do not confirm the marriage tie until the writing is fulfilled. And know that God knows what is in your souls, so beware of Him. And know that God is Forgiving and Forbearing."
        },
        {
          number: 236,
          arabic: "لَا جُنَاحَ عَلَيْكُمْ إِنْ طَلَّقْتُمُ النِّسَاءَ مَا لَمْ تَمَسُّوهُنَّ أَوْ تَفْرِضُوا لَهُنَّ فَرِيضَةً وَمَتِّعُوهُنَّ عَلَى الْمُوسِعِ قَدَرُهُ وَعَلَى الْمُقْتِرِ قَدَرُهُ مَتَاعًا بِالْمَعْرُوفِ حَقًّا عَلَى الْمُحْسِنِينَ",
          english: "You commit no error by divorcing women before having touched them, or before having set the dowry for them. And compensate them—the wealthy according to his means, and the poor according to his means—with a fair compensation, a duty upon the doers of good."
        },
        {
          number: 237,
          arabic: "وَإِنْ طَلَّقْتُمُوهُنَّ مِنْ قَبْلِ أَنْ تَمَسُّوهُنَّ وَقَدْ فَرَضْتُمْ لَهُنَّ فَرِيضَةً فَنِصْفُ مَا فَرَضْتُمْ إِلَّا أَنْ يَعْفُونَ أَوْ يَعْفُوَ الَّذِي بِيَدِهِ عُقْدَةُ النِّكَاحِ وَأَنْ تَعْفُوا أَقْرَبُ لِلتَّقْوَى وَلَا تَنْسَوُا الْفَضْلَ بَيْنَكُمْ إِنَّ اللَّهَ بِمَا تَعْمَلُونَ بَصِيرٌ",
          english: "If you divorce them before you have touched them, but after you had set the dowry for them, give them half of what you specified—unless they forego the right, or the one in whose hand is the marriage contract foregoes it. But to forego is nearer to piety. And do not forget generosity between one another. God is seeing of everything you do."
        },
        {
          number: 238,
          arabic: "حَافِظُوا عَلَى الصَّلَوَاتِ وَالصَّلَاةِ الْوُسْطَى وَقُومُوا لِلَّهِ قَانِتِينَ",
          english: "Guard your prayers, and the middle prayer, and stand before God in devotion."
        },
        {
          number: 239,
          arabic: "فَإِنْ خِفْتُمْ فَرِجَالًا أَوْ رُكْبَانًا فَإِذَا أَمِنْتُمْ فَاذْكُرُوا اللَّهَ كَمَا عَلَّمَكُمْ مَا لَمْ تَكُونُوا تَعْلَمُونَ",
          english: "But if you are in fear, then on foot, or riding. And when you are safe, remember God, as He taught you what you did not know."
        },
        {
          number: 240,
          arabic: "وَالَّذِينَ يُتَوَفَّوْنَ مِنْكُمْ وَيَذَرُونَ أَزْوَاجًا وَصِيَّةً لِأَزْوَاجِهِمْ مَتَاعًا إِلَى الْحَوْلِ غَيْرَ إِخْرَاجٍ فَإِنْ خَرَجْنَ فَلَا جُنَاحَ عَلَيْكُمْ فِي مَا فَعَلْنَ فِي أَنْفُسِهِنَّ مِنْ مَعْرُوفٍ وَاللَّهُ عَزِيزٌ حَكِيمٌ",
          english: "Those of you who die and leave wives behind—a will shall provide their wives with support for a year, provided they do not leave. If they leave, you are not to blame for what they do with themselves, provided it is reasonable. God is Mighty and Wise."
        },
        {
          number: 241,
          arabic: "وَلِلْمُطَلَّقَاتِ مَتَاعٌ بِالْمَعْرُوفِ حَقًّا عَلَى الْمُتَّقِينَ",
          english: "And divorced women shall be provided for, equitably—a duty upon the righteous."
        },
        {
          number: 242,
          arabic: "كَذَلِكَ يُبَيِّنُ اللَّهُ لَكُمْ آيَاتِهِ لَعَلَّكُمْ تَعْقِلُونَ",
          english: "God thus explains His revelations to you, so that you may understand."
        },
        {
          number: 243,
          arabic: "أَلَمْ تَرَ إِلَى الَّذِينَ خَرَجُوا مِنْ دِيَارِهِمْ وَهُمْ أُلُوفٌ حَذَرَ الْمَوْتِ فَقَالَ لَهُمُ اللَّهُ مُوتُوا ثُمَّ أَحْيَاهُمْ إِنَّ اللَّهَ لَذُو فَضْلٍ عَلَى النَّاسِ وَلَكِنَّ أَكْثَرَ النَّاسِ لَا يَشْكُرُونَ",
          english: "Have you not considered those who fled their homes, by the thousands, fearful of death? God said to them, 'Die.' Then He revived them. God is Gracious towards the people, but most people are not appreciative."
        },
        {
          number: 244,
          arabic: "وَقَاتِلُوا فِي سَبِيلِ اللَّهِ وَاعْلَمُوا أَنَّ اللَّهَ سَمِيعٌ عَلِيمٌ",
          english: "Fight in the cause of God, and know that God is Hearing and Knowing."
        },
        {
          number: 245,
          arabic: "مَنْ ذَا الَّذِي يُقْرِضُ اللَّهَ قَرْضًا حَسَنًا فَيُضَاعِفَهُ لَهُ أَضْعَافًا كَثِيرَةً وَاللَّهُ يَقْبِضُ وَيَبْسُطُ وَإِلَيْهِ تُرْجَعُونَ",
          english: "Who is he who will offer God a generous loan, so He will multiply it for him manifold? God receives and amplifies, and to Him you will be returned."
        },
        {
          number: 246,
          arabic: "أَلَمْ تَرَ إِلَى الْمَلَإِ مِنْ بَنِي إِسْرَائِيلَ مِنْ بَعْدِ مُوسَى إِذْ قَالُوا لِنَبِيٍّ لَهُمُ ابْعَثْ لَنَا مَلِكًا نُقَاتِلْ فِي سَبِيلِ اللَّهِ قَالَ هَلْ عَسَيْتُمْ إِنْ كُتِبَ عَلَيْكُمُ الْقِتَالُ أَلَّا تُقَاتِلُوا قَالُوا وَمَا لَنَا أَلَّا نُقَاتِلَ فِي سَبِيلِ اللَّهِ وَقَدْ أُخْرِجْنَا مِنْ دِيَارِنَا وَأَبْنَائِنَا فَلَمَّا كُتِبَ عَلَيْهِمُ الْقِتَالُ تَوَلَّوْا إِلَّا قَلِيلًا مِنْهُمْ وَاللَّهُ عَلِيمٌ بِالظَّالِمِينَ",
          english: "Have you not considered the notables of the Children of Israel after Moses? When they said to a prophet of theirs, 'Appoint a king for us, and we will fight in the cause of God.' He said, 'Is it possible that, if fighting was ordained for you, you would not fight?' They said, 'Why would we not fight in the cause of God, when we were driven out of our homes, along with our children?' But when fighting was ordained for them, they turned away, except for a few of them. But God is aware of the wrongdoers."
        },
        {
          number: 247,
          arabic: "وَقَالَ لَهُمْ نَبِيُّهُمْ إِنَّ اللَّهَ قَدْ بَعَثَ لَكُمْ طَالُوتَ مَلِكًا قَالُوا أَنَّى يَكُونُ لَهُ الْمُلْكُ عَلَيْنَا وَنَحْنُ أَحَقُّ بِالْمُلْكِ مِنْهُ وَلَمْ يُؤْتَ سَعَةً مِنَ الْمَالِ قَالَ إِنَّ اللَّهَ اصْطَفَاهُ عَلَيْكُمْ وَزَادَهُ بَسْطَةً فِي الْعِلْمِ وَالْجِسْمِ وَاللَّهُ يُؤْتِي مُلْكَهُ مَنْ يَشَاءُ وَاللَّهُ وَاسِعٌ عَلِيمٌ",
          english: "Their prophet said to them, 'God has appointed Saul to be your king.' They said, 'How can he have authority over us, when we are more worthy of authority than he, and he was not given plenty of wealth?' He said, 'God has chosen him over you, and has increased him in knowledge and stature.' God bestows His sovereignty upon whomever He wills. God is Embracing and Knowing."
        },
        {
          number: 248,
          arabic: "وَقَالَ لَهُمْ نَبِيُّهُمْ إِنَّ آيَةَ مُلْكِهِ أَنْ يَأْتِيَكُمُ التَّابُوتُ فِيهِ سَكِينَةٌ مِنْ رَبِّكُمْ وَبَقِيَّةٌ مِمَّا تَرَكَ آلُ مُوسَى وَآلُ هَارُونَ تَحْمِلُهُ الْمَلَائِكَةُ إِنَّ فِي ذَلِكَ لَآيَةً لَكُمْ إِنْ كُنْتُمْ مُؤْمِنِينَ",
          english: "And their prophet said to them, 'The proof of his kingship is that the Ark will be restored to you, bringing tranquility from your Lord, and relics left by the family of Moses and the family of Aaron. It will be carried by the angels. In that is a sign for you, if you are believers.'"
        },
        {
          number: 249,
          arabic: "فَلَمَّا فَصَلَ طَالُوتُ بِالْجُنُودِ قَالَ إِنَّ اللَّهَ مُبْتَلِيكُمْ بِنَهَرٍ فَمَنْ شَرِبَ مِنْهُ فَلَيْسَ مِنِّي وَمَنْ لَمْ يَطْعَمْهُ فَإِنَّهُ مِنِّي إِلَّا مَنِ اغْتَرَفَ غُرْفَةً بِيَدِهِ فَشَرِبُوا مِنْهُ إِلَّا قَلِيلًا مِنْهُمْ فَلَمَّا جَاوَزَهُ هُوَ وَالَّذِينَ آمَنُوا مَعَهُ قَالُوا لَا طَاقَةَ لَنَا الْيَوْمَ بِجَالُوتَ وَجُنُودِهِ قَالَ الَّذِينَ يَظُنُّونَ أَنَّهُمْ مُلَاقُو اللَّهِ كَمْ مِنْ فِئَةٍ قَلِيلَةٍ غَلَبَتْ فِئَةً كَثِيرَةً بِإِذْنِ اللَّهِ وَاللَّهُ مَعَ الصَّابِرِينَ",
          english: "When Saul set out with the troops, he said, 'God will be testing you with a river. Whoever drinks from it does not belong with me. But whoever does not drink from it, does belong with me, except for whoever scoops up a little with his hand.' But they drank from it, except for a few of them. Then, when he crossed it, he and those who believed with him, they said, 'We have no strength to face Goliath and his troops today.' But those who knew that they would meet God said, 'How many a small group has defeated a large group by God's will. God is with the steadfast.'"
        },
        {
          number: 250,
          arabic: "وَلَمَّا بَرَزُوا لِجَالُوتَ وَجُنُودِهِ قَالُوا رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا وَثَبِّتْ أَقْدَامَنَا وَانْصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ",
          english: "And when they confronted Goliath and his troops, they said, 'Our Lord, pour down patience on us, and strengthen our foothold, and support us against the faithless people.'"
        },
        {
          number: 251,
          arabic: "فَهَزَمُوهُمْ بِإِذْنِ اللَّهِ وَقَتَلَ دَاوُودُ جَالُوتَ وَآتَاهُ اللَّهُ الْمُلْكَ وَالْحِكْمَةَ وَعَلَّمَهُ مِمَّا يَشَاءُ وَلَوْلَا دَفْعُ اللَّهِ النَّاسَ بَعْضَهُمْ بِبَعْضٍ لَفَسَدَتِ الْأَرْضُ وَلَكِنَّ اللَّهَ ذُو فَضْلٍ عَلَى الْعَالَمِينَ",
          english: "And they defeated them by God's leave, and David killed Goliath, and God gave him sovereignty and wisdom, and taught him as He willed. Were it not for God restraining the people, some by means of others, the earth would have gone to ruin. But God is gracious towards mankind."
        },
        {
          number: 252,
          arabic: "تِلْكَ آيَاتُ اللَّهِ نَتْلُوهَا عَلَيْكَ بِالْحَقِّ وَإِنَّكَ لَمِنَ الْمُرْسَلِينَ",
          english: "These are God's revelations, which We recite to you in truth. You are one of the messengers."
        },
        {
          number: 253,
          arabic: "تِلْكَ الرُّسُلُ فَضَّلْنَا بَعْضَهُمْ عَلَى بَعْضٍ مِنْهُمْ مَنْ كَلَّمَ اللَّهُ وَرَفَعَ بَعْضَهُمْ دَرَجَاتٍ وَآتَيْنَا عِيسَى ابْنَ مَرْيَمَ الْبَيِّنَاتِ وَأَيَّدْنَاهُ بِرُوحِ الْقُدُسِ وَلَوْ شَاءَ اللَّهُ مَا اقْتَتَلَ الَّذِينَ مِنْ بَعْدِهِمْ مِنْ بَعْدِ مَا جَاءَتْهُمُ الْبَيِّنَاتُ وَلَكِنِ اخْتَلَفُوا فَمِنْهُمْ مَنْ آمَنَ وَمِنْهُمْ مَنْ كَفَرَ وَلَوْ شَاءَ اللَّهُ مَا اقْتَتَلُوا وَلَكِنَّ اللَّهَ يَفْعَلُ مَا يُرِيدُ",
          english: "These messengers: We gave some advantage over others. To some of them God spoke directly, and some He raised in rank. We gave Jesus son of Mary the clear miracles, and We strengthened him with the Holy Spirit. Had God willed, those who succeeded them would not have fought one another, after the clear signs had come to them; but they disputed; some of them believed, and some of them disbelieved. Had God willed, they would not have fought one another; but God does whatever He desires."
        },
        {
          number: 254,
          arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا أَنْفِقُوا مِمَّا رَزَقْنَاكُمْ مِنْ قَبْلِ أَنْ يَأْتِيَ يَوْمٌ لَا بَيْعٌ فِيهِ وَلَا خُلَّةٌ وَلَا شَفَاعَةٌ وَالْكَافِرُونَ هُمُ الظَّالِمُونَ",
          english: "O you who believe! Spend from what We have given you, before a Day comes in which there is neither trading, nor friendship, nor intercession. The disbelievers are the wrongdoers."
        },
        {
          number: 255,
          arabic: "اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ وَلَا يَئُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيمُ",
          english: "God! There is no god except He, the Living, the Everlasting. Neither slumber overtakes Him, nor sleep. To Him belongs everything in the heavens and everything on earth. Who is he that can intercede with Him except with His permission? He knows what is before them, and what is behind them; and they cannot grasp any of His knowledge, except as He wills. His Throne extends over the heavens and the earth, and their preservation does not burden Him. He is the Most High, the Great."
        },
        {
          number: 256,
          arabic: "لَا إِكْرَاهَ فِي الدِّينِ قَدْ تَبَيَّنَ الرُّشْدُ مِنَ الْغَيِّ فَمَنْ يَكْفُرْ بِالطَّاغُوتِ وَيُؤْمِنْ بِاللَّهِ فَقَدِ اسْتَمْسَكَ بِالْعُرْوَةِ الْوُثْقَى لَا انْفِصَامَ لَهَا وَاللَّهُ سَمِيعٌ عَلِيمٌ",
          english: "There shall be no compulsion in religion; the right way has become distinct from the wrong way. Whoever renounces evil and believes in God has grasped the most trustworthy handle; which does not break. God is Hearing and Knowing."
        },
        {
          number: 257,
          arabic: "اللَّهُ وَلِيُّ الَّذِينَ آمَنُوا يُخْرِجُهُمْ مِنَ الظُّلُمَاتِ إِلَى النُّورِ وَالَّذِينَ كَفَرُوا أَوْلِيَاؤُهُمُ الطَّاغُوتُ يُخْرِجُونَهُمْ مِنَ النُّورِ إِلَى الظُّلُمَاتِ أُولَئِكَ أَصْحَابُ النَّارِ هُمْ فِيهَا خَالِدُونَ",
          english: "God is the Lord of those who believe; He brings them out of darkness and into light. As for those who disbelieve, their lords are the evil ones; they bring them out of light and into darkness—these are the inmates of the Fire, in which they will abide forever."
        },
        {
          number: 258,
          arabic: "أَلَمْ تَرَ إِلَى الَّذِي حَاجَّ إِبْرَاهِيمَ فِي رَبِّهِ أَنْ آتَاهُ اللَّهُ الْمُلْكَ إِذْ قَالَ إِبْرَاهِيمُ رَبِّيَ الَّذِي يُحْيِي وَيُمِيتُ قَالَ أَنَا أُحْيِي وَأُمِيتُ قَالَ إِبْرَاهِيمُ فَإِنَّ اللَّهَ يَأْتِي بِالشَّمْسِ مِنَ الْمَشْرِقِ فَأْتِ بِهَا مِنَ الْمَغْرِبِ فَبُهِتَ الَّذِي كَفَرَ وَاللَّهُ لَا يَهْدِي الْقَوْمَ الظَّالِمِينَ",
          english: "Have you not considered him who argued with Abraham about his Lord, because God had given him sovereignty? Abraham said, 'My Lord is He who gives life and causes death.' He said, 'I give life and cause death.' Abraham said, 'God brings the sun from the East, so bring it from the West,' so the blasphemer was confounded. God does not guide the wrongdoing people."
        },
        {
          number: 259,
          arabic: "أَوْ كَالَّذِي مَرَّ عَلَى قَرْيَةٍ وَهِيَ خَاوِيَةٌ عَلَى عُرُوشِهَا قَالَ أَنَّى يُحْيِي هَذِهِ اللَّهُ بَعْدَ مَوْتِهَا فَأَمَاتَهُ اللَّهُ مِائَةَ عَامٍ ثُمَّ بَعَثَهُ قَالَ كَمْ لَبِثْتَ قَالَ لَبِثْتُ يَوْمًا أَوْ بَعْضَ يَوْمٍ قَالَ بَلْ لَبِثْتَ مِائَةَ عَامٍ فَانْظُرْ إِلَى طَعَامِكَ وَشَرَابِكَ لَمْ يَتَسَنَّهْ وَانْظُرْ إِلَى حِمَارِكَ وَلِنَجْعَلَكَ آيَةً لِلنَّاسِ وَانْظُرْ إِلَى الْعِظَامِ كَيْفَ نُنْشِزُهَا ثُمَّ نَكْسُوهَا لَحْمًا فَلَمَّا تَبَيَّنَ لَهُ قَالَ أَعْلَمُ أَنَّ اللَّهَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
          english: "Or like him who passed by a town collapsed on its foundations. He said, 'How can God revive this after its demise?' Thereupon God caused him to die for a hundred years, and then resurrected him. He said, 'For how long have you tarried?' He said, 'I have tarried for a day, or part of a day.' He said, 'No. You have tarried for a hundred years. Now look at your food and your drink—it has not spoiled—and look at your donkey. We will make you a wonder for mankind. And look at the bones, how We arrange them, and then clothe them with flesh.' So when it became clear to him, he said, 'I know that God has power over all things.'"
        },
        {
          number: 260,
          arabic: "وَإِذْ قَالَ إِبْرَاهِيمُ رَبِّ أَرِنِي كَيْفَ تُحْيِي الْمَوْتَى قَالَ أَوَلَمْ تُؤْمِنْ قَالَ بَلَى وَلَكِنْ لِيَطْمَئِنَّ قَلْبِي قَالَ فَخُذْ أَرْبَعَةً مِنَ الطَّيْرِ فَصُرْهُنَّ إِلَيْكَ ثُمَّ اجْعَلْ عَلَى كُلِّ جَبَلٍ مِنْهُنَّ جُزْءًا ثُمَّ ادْعُهُنَّ يَأْتِينَكَ سَعْيًا وَاعْلَمْ أَنَّ اللَّهَ عَزِيزٌ حَكِيمٌ",
          english: "And when Abraham said, 'My Lord, show me how You give life to the dead.' He said, 'Have you not believed?' He said, 'Yes, but to put my heart at ease.' He said, 'Take four birds, and incline them to yourself, then place a part on each hill, then call to them; and they will come rushing to you. And know that God is Powerful and Wise.'"
        },
        {
          number: 261,
          arabic: "مَثَلُ الَّذِينَ يُنْفِقُونَ أَمْوَالَهُمْ فِي سَبِيلِ اللَّهِ كَمَثَلِ حَبَّةٍ أَنْبَتَتْ سَبْعَ سَنَابِلَ فِي كُلِّ سُنْبُلَةٍ مِائَةُ حَبَّةٍ وَاللَّهُ يُضَاعِفُ لِمَنْ يَشَاءُ وَاللَّهُ وَاسِعٌ عَلِيمٌ",
          english: "The parable of those who spend their wealth in God's way is that of a grain that produces seven spikes; in each spike is a hundred grains. God multiplies for whom He wills. God is Bounteous and Knowing."
        },
        {
          number: 262,
          arabic: "الَّذِينَ يُنْفِقُونَ أَمْوَالَهُمْ فِي سَبِيلِ اللَّهِ ثُمَّ لَا يُتْبِعُونَ مَا أَنْفَقُوا مَنًّا وَلَا أَذًى لَهُمْ أَجْرُهُمْ عِنْدَ رَبِّهِمْ وَلَا خَوْفٌ عَلَيْهِمْ وَلَا هُمْ يَحْزَنُونَ",
          english: "Those who spend their wealth in the way of God, and then do not follow up what they spent with reminders of their generosity or with insults, will have their reward with their Lord—they have nothing to fear, nor shall they grieve."
        },
        {
          number: 263,
          arabic: "قَوْلٌ مَعْرُوفٌ وَمَغْفِرَةٌ خَيْرٌ مِنْ صَدَقَةٍ يَتْبَعُهَا أَذًى وَاللَّهُ غَنِيٌّ حَلِيمٌ",
          english: "Kind words and forgiveness are better than charity followed by insults. God is Rich and Clement."
        },
        {
          number: 264,
          arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا لَا تُبْطِلُوا صَدَقَاتِكُمْ بِالْمَنِّ وَالْأَذَى كَالَّذِي يُنْفِقُ مَالَهُ رِئَاءَ النَّاسِ وَلَا يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الْآخِرِ فَمَثَلُهُ كَمَثَلِ صَفْوَانٍ عَلَيْهِ تُرَابٌ فَأَصَابَهُ وَابِلٌ فَتَرَكَهُ صَلْدًا لَا يَقْدِرُونَ عَلَى شَيْءٍ مِمَّا كَسَبُوا وَاللَّهُ لَا يَهْدِي الْقَوْمَ الْكَافِرِينَ",
          english: "O you who believe! Do not nullify your charitable deeds with reminders and hurtful words, like him who spends his wealth to be seen by the people, and does not believe in God and the Last Day. His likeness is that of a smooth rock covered with soil: a downpour strikes it, and leaves it bare—they gain nothing from their efforts. God does not guide the disbelieving people."
        },
        {
          number: 265,
          arabic: "وَمَثَلُ الَّذِينَ يُنْفِقُونَ أَمْوَالَهُمُ ابْتِغَاءَ مَرْضَاتِ اللَّهِ وَتَثْبِيتًا مِنْ أَنْفُسِهِمْ كَمَثَلِ جَنَّةٍ بِرَبْوَةٍ أَصَابَهَا وَابِلٌ فَآتَتْ أُكُلَهَا ضِعْفَيْنِ فَإِنْ لَمْ يُصِبْهَا وَابِلٌ فَطَلٌّ وَاللَّهُ بِمَا تَعْمَلُونَ بَصِيرٌ",
          english: "And the parable of those who spend their wealth seeking God's approval, and to strengthen their souls, is that of a garden on a hillside. If heavy rain falls on it, its produce is doubled; and if no heavy rain falls, then dew is enough. God is seeing of everything you do."
        },
        {
          number: 266,
          arabic: "أَيَوَدُّ أَحَدُكُمْ أَنْ تَكُونَ لَهُ جَنَّةٌ مِنْ نَخِيلٍ وَأَعْنَابٍ تَجْرِي مِنْ تَحْتِهَا الْأَنْهَارُ لَهُ فِيهَا مِنْ كُلِّ الثَّمَرَاتِ وَأَصَابَهُ الْكِبَرُ وَلَهُ ذُرِّيَّةٌ ضُعَفَاءُ فَأَصَابَهَا إِعْصَارٌ فِيهِ نَارٌ فَاحْتَرَقَتْ كَذَلِكَ يُبَيِّنُ اللَّهُ لَكُمُ الْآيَاتِ لَعَلَّكُمْ تَتَفَكَّرُونَ",
          english: "Would anyone of you like to have a garden of palms and vines, under which rivers flow—with all kinds of fruit in it for him, and old age has stricken him, and he has weak children—then a tornado with fire batters it, and it burns down? Thus God makes clear the signs for you, so that you may reflect."
        },
        {
          number: 267,
          arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا أَنْفِقُوا مِنْ طَيِّبَاتِ مَا كَسَبْتُمْ وَمِمَّا أَخْرَجْنَا لَكُمْ مِنَ الْأَرْضِ وَلَا تَيَمَّمُوا الْخَبِيثَ مِنْهُ تُنْفِقُونَ وَلَسْتُمْ بِآخِذِيهِ إِلَّا أَنْ تُغْمِضُوا فِيهِ وَاعْلَمُوا أَنَّ اللَّهَ غَنِيٌّ حَمِيدٌ",
          english: "O you who believe! Give of the good things you have earned, and from what We have produced for you from the earth. And do not pick the inferior things to give away, when you yourselves would not accept it except with eyes closed. And know that God is Sufficient and Praiseworthy."
        },
        {
          number: 268,
          arabic: "الشَّيْطَانُ يَعِدُكُمُ الْفَقْرَ وَيَأْمُرُكُمْ بِالْفَحْشَاءِ وَاللَّهُ يَعِدُكُمْ مَغْفِرَةً مِنْهُ وَفَضْلًا وَاللَّهُ وَاسِعٌ عَلِيمٌ",
          english: "Satan promises you poverty, and urges you to immorality; but God promises you forgiveness from Himself, and grace. God is Embracing and Knowing."
        },
        {
          number: 269,
          arabic: "يُؤْتِي الْحِكْمَةَ مَنْ يَشَاءُ وَمَنْ يُؤْتَ الْحِكْمَةَ فَقَدْ أُوتِيَ خَيْرًا كَثِيرًا وَمَا يَذَّكَّرُ إِلَّا أُولُو الْأَلْبَابِ",
          english: "He gives wisdom to whomever He wills. Whoever is given wisdom has been given much good. But none pays heed except those with insight."
        },
        {
          number: 270,
          arabic: "وَمَا أَنْفَقْتُمْ مِنْ نَفَقَةٍ أَوْ نَذَرْتُمْ مِنْ نَذْرٍ فَإِنَّ اللَّهَ يَعْلَمُهُ وَمَا لِلظَّالِمِينَ مِنْ أَنْصَارٍ",
          english: "Whatever charity you give, or a pledge you fulfill, God knows it. The wrongdoers have no helpers."
        },
        {
          number: 271,
          arabic: "إِنْ تُبْدُوا الصَّدَقَاتِ فَنِعِمَّا هِيَ وَإِنْ تُخْفُوهَا وَتُؤْتُوهَا الْفُقَرَاءَ فَهُوَ خَيْرٌ لَكُمْ وَيُكَفِّرُ عَنْكُمْ مِنْ سَيِّئَاتِكُمْ وَاللَّهُ بِمَا تَعْمَلُونَ خَبِيرٌ",
          english: "If you give charity openly, that is good. But if you keep it secret, and give it to the needy in private, that is better for you. It will atone for some of your misdeeds. God is cognizant of what you do."
        },
        {
          number: 272,
          arabic: "لَيْسَ عَلَيْكَ هُدَاهُمْ وَلَكِنَّ اللَّهَ يَهْدِي مَنْ يَشَاءُ وَمَا تُنْفِقُوا مِنْ خَيْرٍ فَلِأَنْفُسِكُمْ وَمَا تُنْفِقُونَ إِلَّا ابْتِغَاءَ وَجْهِ اللَّهِ وَمَا تُنْفِقُوا مِنْ خَيْرٍ يُوَفَّ إِلَيْكُمْ وَأَنْتُمْ لَا تُظْلَمُونَ",
          english: "Their guidance is not your responsibility, but God guides whom He wills. Any charity you give is for your own good. Any charity you give shall be for the sake of God. Any charity you give will be repaid to you in full, and you will not be wronged."
        },
        {
          number: 273,
          arabic: "لِلْفُقَرَاءِ الَّذِينَ أُحْصِرُوا فِي سَبِيلِ اللَّهِ لَا يَسْتَطِيعُونَ ضَرْبًا فِي الْأَرْضِ يَحْسَبُهُمُ الْجَاهِلُ أَغْنِيَاءَ مِنَ التَّعَفُّفِ تَعْرِفُهُمْ بِسِيمَاهُمْ لَا يَسْأَلُونَ النَّاسَ إِلْحَافًا وَمَا تُنْفِقُوا مِنْ خَيْرٍ فَإِنَّ اللَّهَ بِهِ عَلِيمٌ",
          english: "It is for the poor; those who are restrained in the way of God, and unable to travel in the land. The unaware would think them rich, due to their dignity. You will recognize them by their features. They do not ask from people insistently. Whatever charity you give, God is aware of it."
        },
        {
          number: 274,
          arabic: "الَّذِينَ يُنْفِقُونَ أَمْوَالَهُمْ بِاللَّيْلِ وَالنَّهَارِ سِرًّا وَعَلَانِيَةً فَلَهُمْ أَجْرُهُمْ عِنْدَ رَبِّهِمْ وَلَا خَوْفٌ عَلَيْهِمْ وَلَا هُمْ يَحْزَنُونَ",
          english: "Those who spend their wealth by night and day, privately and publicly, will receive their reward from their Lord. They have nothing to fear, nor shall they grieve."
        },
        {
          number: 275,
          arabic: "الَّذِينَ يَأْكُلُونَ الرِّبَا لَا يَقُومُونَ إِلَّا كَمَا يَقُومُ الَّذِي يَتَخَبَّطُهُ الشَّيْطَانُ مِنَ الْمَسِّ ذَلِكَ بِأَنَّهُمْ قَالُوا إِنَّمَا الْبَيْعُ مِثْلُ الرِّبَا وَأَحَلَّ اللَّهُ الْبَيْعَ وَحَرَّمَ الرِّبَا فَمَنْ جَاءَهُ مَوْعِظَةٌ مِنْ رَبِّهِ فَانْتَهَى فَلَهُ مَا سَلَفَ وَأَمْرُهُ إِلَى اللَّهِ وَمَنْ عَادَ فَأُولَئِكَ أَصْحَابُ النَّارِ هُمْ فِيهَا خَالِدُونَ",
          english: "Those who swallow usury will not rise, except as someone driven mad by Satan's touch. That is because they say, 'Commerce is like usury.' But God has permitted commerce, and has forbidden usury. Whoever, on receiving advice from his Lord, refrains, may keep his past earnings, and his case rests with God. But whoever resumes—these are the dwellers of the Fire, wherein they will abide forever."
        },
        {
          number: 276,
          arabic: "يَمْحَقُ اللَّهُ الرِّبَا وَيُرْبِي الصَّدَقَاتِ وَاللَّهُ لَا يُحِبُّ كُلَّ كَفَّارٍ أَثِيمٍ",
          english: "God condemns usury, and He blesses charities. God does not love any sinful ingrate."
        },
        {
          number: 277,
          arabic: "إِنَّ الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَأَقَامُوا الصَّلَاةَ وَآتَوُا الزَّكَاةَ لَهُمْ أَجْرُهُمْ عِنْدَ رَبِّهِمْ وَلَا خَوْفٌ عَلَيْهِمْ وَلَا هُمْ يَحْزَنُونَ",
          english: "Those who believe, and do good deeds, and pray regularly, and give charity—they will have their reward with their Lord; they will have no fear, nor shall they grieve."
        },
        {
          number: 278,
          arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا اتَّقُوا اللَّهَ وَذَرُوا مَا بَقِيَ مِنَ الرِّبَا إِنْ كُنْتُمْ مُؤْمِنِينَ",
          english: "O you who believe! Fear God, and forgo what remains of usury, if you are believers."
        },
        {
          number: 279,
          arabic: "فَإِنْ لَمْ تَفْعَلُوا فَأْذَنُوا بِحَرْبٍ مِنَ اللَّهِ وَرَسُولِهِ وَإِنْ تُبْتُمْ فَلَكُمْ رُءُوسُ أَمْوَالِكُمْ لَا تَظْلِمُونَ وَلَا تُظْلَمُونَ",
          english: "If you do not, then take notice of a war by God and His Messenger. But if you repent, you may keep your capital, neither wronging, nor being wronged."
        },
        {
          number: 280,
          arabic: "وَإِنْ كَانَ ذُو عُسْرَةٍ فَنَظِرَةٌ إِلَى مَيْسَرَةٍ وَأَنْ تَصَدَّقُوا خَيْرٌ لَكُمْ إِنْ كُنْتُمْ تَعْلَمُونَ",
          english: "But if he is in hardship, then deferment until a time of ease. But to remit it as charity is better for you, if you only knew."
        },
        {
          number: 281,
          arabic: "وَاتَّقُوا يَوْمًا تُرْجَعُونَ فِيهِ إِلَى اللَّهِ ثُمَّ تُوَفَّى كُلُّ نَفْسٍ مَا كَسَبَتْ وَهُمْ لَا يُظْلَمُونَ",
          english: "And guard yourselves against a Day when you will be returned to God; then each soul will be rewarded fully for what it has earned, and they will not be wronged."
        },
        {
          number: 282,
          arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا إِذَا تَدَايَنْتُمْ بِدَيْنٍ إِلَى أَجَلٍ مُسَمًّى فَاكْتُبُوهُ وَلْيَكْتُبْ بَيْنَكُمْ كَاتِبٌ بِالْعَدْلِ وَلَا يَأْبَ كَاتِبٌ أَنْ يَكْتُبَ كَمَا عَلَّمَهُ اللَّهُ فَلْيَكْتُبْ وَلْيُمْلِلِ الَّذِي عَلَيْهِ الْحَقُّ وَلْيَتَّقِ اللَّهَ رَبَّهُ وَلَا يَبْخَسْ مِنْهُ شَيْئًا فَإِنْ كَانَ الَّذِي عَلَيْهِ الْحَقُّ سَفِيهًا أَوْ ضَعِيفًا أَوْ لَا يَسْتَطِيعُ أَنْ يُمِلَّ هُوَ فَلْيُمْلِلْ وَلِيُّهُ بِالْعَدْلِ وَاسْتَشْهِدُوا شَهِيدَيْنِ مِنْ رِجَالِكُمْ فَإِنْ لَمْ يَكُونَا رَجُلَيْنِ فَرَجُلٌ وَامْرَأَتَانِ مِمَّنْ تَرْضَوْنَ مِنَ الشُّهَدَاءِ أَنْ تَضِلَّ إِحْدَاهُمَا فَتُذَكِّرَ إِحْدَاهُمَا الْأُخْرَى وَلَا يَأْبَ الشُّهَدَاءُ إِذَا مَا دُعُوا وَلَا تَسْأَمُوا أَنْ تَكْتُبُوهُ صَغِيرًا أَوْ كَبِيرًا إِلَى أَجَلِهِ ذَلِكُمْ أَقْسَطُ عِنْدَ اللَّهِ وَأَقْوَمُ لِلشَّهَادَةِ وَأَدْنَى أَلَّا تَرْتَابُوا إِلَّا أَنْ تَكُونَ تِجَارَةً حَاضِرَةً تُدِيرُونَهَا بَيْنَكُمْ فَلَيْسَ عَلَيْكُمْ جُنَاحٌ أَلَّا تَكْتُبُوهَا وَأَشْهِدُوا إِذَا تَبَايَعْتُمْ وَلَا يُضَارَّ كَاتِبٌ وَلَا شَهِيدٌ وَإِنْ تَفْعَلُوا فَإِنَّهُ فُسُوقٌ بِكُمْ وَاتَّقُوا اللَّهَ وَيُعَلِّمُكُمُ اللَّهُ وَاللَّهُ بِكُلِّ شَيْءٍ عَلِيمٌ",
          english: "O you who believe! When you incur debt among yourselves for a certain period of time, write it down. And have a scribe write in your presence, in all fairness. And let no scribe refuse to write, as God has taught him. So let him write, and let the debtor dictate. And let him fear God, his Lord, and diminish nothing from it. But if the debtor is mentally deficient, or weak, or unable to dictate, then let his guardian dictate with honesty. And call to witness two men from among you. If two men are not available, then one man and two women whose testimony is acceptable to all—if one of them fails to remember, the other would remind her. Witnesses must not refuse when called upon. And do not think it too trivial to write down, whether small or large, including the time of repayment. That is more equitable with God, and stronger as evidence, and more likely to prevent doubt—except in the case of a spot transaction between you—then there is no blame on you if you do not write it down. And let there be witnesses whenever you conclude a contract, and let no harm be done to either scribe or witness. If you do that, it is corruption on your part. And fear God. God teaches you. God is aware of everything."
        },
        {
          number: 283,
          arabic: "وَإِنْ كُنْتُمْ عَلَى سَفَرٍ وَلَمْ تَجِدُوا كَاتِبًا فَرِهَانٌ مَقْبُوضَةٌ فَإِنْ أَمِنَ بَعْضُكُمْ بَعْضًا فَلْيُؤَدِّ الَّذِي اؤْتُمِنَ أَمَانَتَهُ وَلْيَتَّقِ اللَّهَ رَبَّهُ وَلَا تَكْتُمُوا الشَّهَادَةَ وَمَنْ يَكْتُمْهَا فَإِنَّهُ آثِمٌ قَلْبُهُ وَاللَّهُ بِمَا تَعْمَلُونَ عَلِيمٌ",
          english: "If you are on a journey, and cannot find a scribe, then a security deposit should be handed over. But if you trust one another, let the trustee fulfill his trust, and let him fear God, his Lord. And do not conceal testimony. Whoever conceals it is sinner at heart. God is aware of what you do."
        },
        {
          number: 284,
          arabic: "لِلَّهِ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ وَإِنْ تُبْدُوا مَا فِي أَنْفُسِكُمْ أَوْ تُخْفُوهُ يُحَاسِبْكُمْ بِهِ اللَّهُ فَيَغْفِرُ لِمَنْ يَشَاءُ وَيُعَذِّبُ مَنْ يَشَاءُ وَاللَّهُ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
          english: "To God belongs everything in the heavens and the earth. Whether you reveal what is within your selves, or conceal it, God will call you to account for it. He forgives whom He wills, and He punishes whom He wills. God is Able to do all things."
        },
        {
          number: 285,
          arabic: "آمَنَ الرَّسُولُ بِمَا أُنْزِلَ إِلَيْهِ مِنْ رَبِّهِ وَالْمُؤْمِنُونَ كُلٌّ آمَنَ بِاللَّهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ لَا نُفَرِّقُ بَيْنَ أَحَدٍ مِنْ رُسُلِهِ وَقَالُوا سَمِعْنَا وَأَطَعْنَا غُفْرَانَكَ رَبَّنَا وَإِلَيْكَ الْمَصِيرُ",
          english: "The Messenger has believed in what was revealed to him from his Lord, as did the believers. They all have believed in God, and His angels, and His scriptures, and His messengers: 'We make no distinction between any of His messengers.' And they say, 'We hear and we obey. Your forgiveness, our Lord. To you is the destiny.'"
        },
        {
          number: 286,
          arabic: "لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا لَهَا مَا كَسَبَتْ وَعَلَيْهَا مَا اكْتَسَبَتْ رَبَّنَا لَا تُؤَاخِذْنَا إِنْ نَسِينَا أَوْ أَخْطَأْنَا رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَا إِصْرًا كَمَا حَمَلْتَهُ عَلَى الَّذِينَ مِنْ قَبْلِنَا رَبَّنَا وَلَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهِ وَاعْفُ عَنَّا وَاغْفِرْ لَنَا وَارْحَمْنَا أَنْتَ مَوْلَانَا فَانْصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ",
          english: "God does not burden any soul beyond its capacity. To its credit is what it earns, and against it is what it commits. 'Our Lord, do not condemn us if we forget or make a mistake. Our Lord, do not burden us as You have burdened those before us. Our Lord, do not burden us with more than we have strength to bear; and pardon us, and forgive us, and have mercy on us. You are our Lord and Master, so help us against the disbelieving people.'"
        }

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
      number: 16,
      name: 'An-Nahl',
      arabicName: 'النحل',
      englishName: 'The Bee',
      verses: 128,
      revelation: 'Meccan',
      meaning: 'The Bee',
      description: 'Named after the bee, this Surah discusses Allah\'s countless blessings in nature and the importance of gratitude.',
      verses_data: [
        {
          number: 1,
          arabic: 'أَتَىٰ أَمْرُ اللَّهِ فَلَا تَسْتَعْجِلُوهُ ۚ سُبْحَانَهُ وَتَعَالَىٰ عَمَّا يُشْرِكُونَ',
          english: 'The command of Allah is coming, so do not be impatient for it. Exalted is He and high above what they associate with Him.'
        },
        {
          number: 2,
          arabic: 'يُنَزِّلُ الْمَلَائِكَةَ بِالرُّوحِ مِنْ أَمْرِهِ عَلَىٰ مَن يَشَاءُ مِنْ عِبَادِهِ أَنْ أَنذِرُوا أَنَّهُ لَا إِلَٰهَ إِلَّا أَنَا فَاتَّقُونِ',
          english: 'He sends down the angels, with the inspiration of His command, upon whom He wills of His servants, [telling them], "Warn that there is no deity except Me; so fear Me."'
        },
        {
          number: 68,
          arabic: 'وَأَوْحَىٰ رَبُّكَ إِلَى النَّحْلِ أَنِ اتَّخِذِي مِنَ الْجِبَالِ بُيُوتًا وَمِنَ الشَّجَرِ وَمِمَّا يَعْرِشُونَ',
          english: 'And your Lord inspired to the bee, "Take for yourself among the hills and among the trees and in that which they construct."'
        }
      ]
    },
    {
      number: 17,
      name: 'Al-Isra',
      arabicName: 'الإسراء',
      englishName: 'The Night Journey',
      verses: 111,
      revelation: 'Meccan',
      meaning: 'The Night Journey',
      description: 'Named after the Prophet\'s miraculous night journey from Mecca to Jerusalem, containing moral and spiritual guidance.',
      verses_data: [
        {
          number: 1,
          arabic: 'سُبْحَانَ الَّذِي أَسْرَىٰ بِعَبْدِهِ لَيْلًا مِّنَ الْمَسْجِدِ الْحَرَامِ إِلَى الْمَسْجِدِ الْأَقْصَى الَّذِي بَارَكْنَا حَوْلَهُ لِنُرِيَهُ مِنْ آيَاتِنَا ۚ إِنَّهُ هُوَ السَّمِيعُ الْبَصِيرُ',
          english: 'Exalted is He who took His Servant by night from al-Masjid al-Haram to al-Masjid al- Aqsa, whose surroundings We have blessed, to show him of Our signs. Indeed, He is the Hearing, the Seeing.'
        },
        {
          number: 23,
          arabic: 'وَقَضَىٰ رَبُّكَ أَلَّا تَعْبُدُوا إِلَّا إِيَّاهُ وَبِالْوَالِدَيْنِ إِحْسَانًا ۚ إِمَّا يَبْلُغَنَّ عِندَكَ الْكِبَرَ أَحَدُهُمَا أَوْ كِلَاهُمَا فَلَا تَقُل لَّهُمَا أُفٍّ وَلَا تَنْهَرْهُمَا وَقُل لَّهُمَا قَوْلًا كَرِيمًا',
          english: 'And your Lord has decreed that you not worship except Him, and to parents, good treatment. Whether one or both of them reach old age [while] with you, say not to them [so much as], "uff," and do not repel them but speak to them a noble word.'
        }
      ]
    },
    {
      number: 18,
      name: 'Al-Kahf',
      arabicName: 'الكهف',
      englishName: 'The Cave',
      verses: 110,
      revelation: 'Meccan',
      meaning: 'The Cave',
      description: 'Contains the story of the People of the Cave, Dhul-Qarnayn, and other parables about faith and divine protection.',
      verses_data: [
        {
          number: 1,
          arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَنزَلَ عَلَىٰ عَبْدِهِ الْكِتَابَ وَلَمْ يَجْعَل لَّهُ عِوَجًا',
          english: 'All praise is due to Allah, who has sent down upon His Servant the Book and has not made therein any deviance.'
        },
        {
          number: 10,
          arabic: 'إِذْ أَوَى الْفِتْيَةُ إِلَى الْكَهْفِ فَقَالُوا رَبَّنَا آتِنَا مِن لَّدُنكَ رَحْمَةً وَهَيِّئْ لَنَا مِنْ أَمْرِنَا رَشَدًا',
          english: 'When the youths retreated to the cave and said, "Our Lord, grant us from Yourself mercy and prepare for us from our affair right guidance."'
        }
      ]
    },
    {
      number: 19,
      name: 'Maryam',
      arabicName: 'مريم',
      englishName: 'Mary',
      verses: 98,
      revelation: 'Meccan',
      meaning: 'Mary',
      description: 'Named after Mary, the mother of Jesus, containing stories of various prophets and their devotion to Allah.',
      verses_data: [
        {
          number: 1,
          arabic: 'كهيعص',
          english: 'Kaf, Ha, Ya, Ayn, Sad.'
        },
        {
          number: 16,
          arabic: 'وَاذْكُرْ فِي الْكِتَابِ مَرْيَمَ إِذِ انتَبَذَتْ مِنْ أَهْلِهَا مَكَانًا شَرْقِيًّا',
          english: 'And mention, [O Muhammad], in the Book [the story of] Mary, when she withdrew from her family to a place toward the east.'
        }
      ]
    },
    {
      number: 20,
      name: 'Ta-Ha',
      arabicName: 'طه',
      englishName: 'Ta-Ha',
      verses: 135,
      revelation: 'Meccan',
      meaning: 'Ta-Ha',
      description: 'Named after the mysterious letters Ta-Ha, containing the detailed story of Prophet Moses and Pharaoh.',
      verses_data: [
        {
          number: 1,
          arabic: 'طه',
          english: 'Ta, Ha.'
        },
        {
          number: 2,
          arabic: 'مَا أَنزَلْنَا عَلَيْكَ الْقُرْآنَ لِتَشْقَىٰ',
          english: 'We have not sent down to you the Qur\'an that you be distressed.'
        }
      ]
    },
    {
      number: 21,
      name: 'Al-Anbiya',
      arabicName: 'الأنبياء',
      englishName: 'The Prophets',
      verses: 112,
      revelation: 'Meccan',
      meaning: 'The Prophets',
      description: 'Contains stories of various prophets and emphasizes the unity of their message of monotheism.',
      verses_data: [
        {
          number: 1,
          arabic: 'اقْتَرَبَ لِلنَّاسِ حِسَابُهُمْ وَهُمْ فِي غَفْلَةٍ مُّعْرِضُونَ',
          english: 'Their account has approached for the people, while they are in heedlessness turning away.'
        },
        {
          number: 25,
          arabic: 'وَمَا أَرْسَلْنَا مِن قَبْلِكَ مِن رَّسُولٍ إِلَّا نُوحِي إِلَيْهِ أَنَّهُ لَا إِلَٰهَ إِلَّا أَنَا فَاعْبُدُونِ',
          english: 'And We sent not before you any messenger except that We revealed to him that, "There is no deity except Me, so worship Me."'
        }
      ]
    },
    {
      number: 22,
      name: 'Al-Hajj',
      arabicName: 'الحج',
      englishName: 'The Pilgrimage',
      verses: 78,
      revelation: 'Medinan',
      meaning: 'The Pilgrimage',
      description: 'Contains detailed guidance about the Hajj pilgrimage and its spiritual significance.',
      verses_data: [
        {
          number: 1,
          arabic: 'يَا أَيُّهَا النَّاسُ اتَّقُوا رَبَّكُمْ ۚ إِنَّ زَلْزَلَةَ السَّاعَةِ شَيْءٌ عَظِيمٌ',
          english: 'O mankind, fear your Lord. Indeed, the convulsion of the [final] Hour is a terrible thing.'
        },
        {
          number: 27,
          arabic: 'وَأَذِّن فِي النَّاسِ بِالْحَجِّ يَأْتُوكَ رِجَالًا وَعَلَىٰ كُلِّ ضَامِرٍ يَأْتِينَ مِن كُلِّ فَجٍّ عَمِيقٍ',
          english: 'And proclaim to the people the Hajj [pilgrimage]; they will come to you on foot and on every lean camel; they will come from every distant pass.'
        }
      ]
    },
    {
      number: 23,
      name: 'Al-Mu\'minun',
      arabicName: 'المؤمنون',
      englishName: 'The Believers',
      verses: 118,
      revelation: 'Meccan',
      meaning: 'The Believers',
      description: 'Describes the characteristics of true believers and their ultimate success in the Hereafter.',
      verses_data: [
        {
          number: 1,
          arabic: 'قَدْ أَفْلَحَ الْمُؤْمِنُونَ',
          english: 'Certainly will the believers have succeeded:'
        },
        {
          number: 2,
          arabic: 'الَّذِينَ هُمْ فِي صَلَاتِهِمْ خَاشِعُونَ',
          english: 'They who are during their prayer humbly submissive'
        }
      ]
    },
    {
      number: 24,
      name: 'An-Nur',
      arabicName: 'النور',
      englishName: 'The Light',
      verses: 64,
      revelation: 'Medinan',
      meaning: 'The Light',
      description: 'Contains important social and moral guidance, including the famous Light Verse.',
      verses_data: [
        {
          number: 35,
          arabic: 'اللَّهُ نُورُ السَّمَاوَاتِ وَالْأَرْضِ ۚ مَثَلُ نُورِهِ كَمِشْكَاةٍ فِيهَا مِصْبَاحٌ ۖ الْمِصْبَاحُ فِي زُجَاجَةٍ ۖ الزُّجَاجَةُ كَأَنَّهَا كَوْكَبٌ دُرِّيٌّ يُوقَدُ مِن شَجَرَةٍ مُّبَارَكَةٍ زَيْتُونَةٍ لَّا شَرْقِيَّةٍ وَلَا غَرْبِيَّةٍ يَكَادُ زَيْتُهَا يُضِيءُ وَلَوْ لَمْ تَمْسَسْهُ نَارٌ ۚ نُّورٌ عَلَىٰ نُورٍ ۗ يَهْدِي اللَّهُ لِنُورِهِ مَن يَشَاءُ',
          english: 'Allah is the light of the heavens and the earth. The example of His light is like a niche within which is a lamp, the lamp is within glass, the glass as if it were a brilliant star lit from [the oil of] a blessed olive tree, neither of the east nor of the west, whose oil would almost glow even if untouched by fire. Light upon light. Allah guides to His light whom He wills.'
        }
      ]
    },
    {
      number: 25,
      name: 'Al-Furqan',
      arabicName: 'الفرقان',
      englishName: 'The Criterion',
      verses: 77,
      revelation: 'Meccan',
      meaning: 'The Criterion',
      description: 'Named after the Quran as the criterion between right and wrong, containing stories of previous prophets.',
      verses_data: [
        {
          number: 1,
          arabic: 'تَبَارَكَ الَّذِي نَزَّلَ الْفُرْقَانَ عَلَىٰ عَبْدِهِ لِيَكُونَ لِلْعَالَمِينَ نَذِيرًا',
          english: 'Blessed is He who sent down the Criterion upon His Servant that he may be to the worlds a warner.'
        }
      ]
    },
    {
      number: 26,
      name: 'Ash-Shu\'ara',
      arabicName: 'الشعراء',
      englishName: 'The Poets',
      verses: 227,
      revelation: 'Meccan',
      meaning: 'The Poets',
      description: 'Contains stories of various prophets and their struggles with their peoples, ending with guidance about poetry.',
      verses_data: [
        {
          number: 1,
          arabic: 'طسم',
          english: 'Ta, Seen, Meem.'
        },
        {
          number: 2,
          arabic: 'تِلْكَ آيَاتُ الْكِتَابِ الْمُبِينِ',
          english: 'These are the verses of the clear Book.'
        }
      ]
    },
    {
      number: 27,
      name: 'An-Naml',
      arabicName: 'النمل',
      englishName: 'The Ants',
      verses: 93,
      revelation: 'Meccan',
      meaning: 'The Ants',
      description: 'Named after the story of Prophet Solomon and the ants, containing stories of various prophets.',
      verses_data: [
        {
          number: 1,
          arabic: 'طس ۚ تِلْكَ آيَاتُ الْقُرْآنِ وَكِتَابٍ مُّبِينٍ',
          english: 'Ta, Seen. These are the verses of the Qur\'an and a clear Book.'
        },
        {
          number: 18,
          arabic: 'حَتَّىٰ إِذَا أَتَوْا عَلَىٰ وَادِ النَّمْلِ قَالَتْ نَمْلَةٌ يَا أَيُّهَا النَّمْلُ ادْخُلُوا مَسَاكِنَكُمْ لَا يَحْطِمَنَّكُمْ سُلَيْمَانُ وَجُنُودُهُ وَهُمْ لَا يَشْعُرُونَ',
          english: 'Until, when they came upon the valley of the ants, an ant said, "O ants, enter your dwellings that you not be crushed by Solomon and his soldiers while they perceive not."'
        }
      ]
    },
    {
      number: 28,
      name: 'Al-Qasas',
      arabicName: 'القصص',
      englishName: 'The Stories',
      verses: 88,
      revelation: 'Meccan',
      meaning: 'The Stories',
      description: 'Contains detailed stories, particularly the story of Prophet Moses from his birth to his prophethood.',
      verses_data: [
        {
          number: 1,
          arabic: 'طسم',
          english: 'Ta, Seen, Meem.'
        },
        {
          number: 2,
          arabic: 'تِلْكَ آيَاتُ الْكِتَابِ الْمُبِينِ',
          english: 'These are the verses of the clear Book.'
        }
      ]
    },
    {
      number: 29,
      name: 'Al-Ankabut',
      arabicName: 'العنكبوت',
      englishName: 'The Spider',
      verses: 69,
      revelation: 'Meccan',
      meaning: 'The Spider',
      description: 'Named after the parable of the spider\'s web, discussing trials, faith, and the weakness of false gods.',
      verses_data: [
        {
          number: 1,
          arabic: 'الم',
          english: 'Alif, Lam, Meem.'
        },
        {
          number: 2,
          arabic: 'أَحَسِبَ النَّاسُ أَن يُتْرَكُوا أَن يَقُولُوا آمَنَّا وَهُمْ لَا يُفْتَنُونَ',
          english: 'Do the people think that they will be left to say, "We believe" and they will not be tried?'
        }
      ]
    },
    {
      number: 30,
      name: 'Ar-Rum',
      arabicName: 'الروم',
      englishName: 'The Romans',
      verses: 60,
      revelation: 'Meccan',
      meaning: 'The Romans',
      description: 'Named after the Romans, containing prophecy about their victory and signs of Allah in creation.',
      verses_data: [
        {
          number: 1,
          arabic: 'الم',
          english: 'Alif, Lam, Meem.'
        },
        {
          number: 2,
          arabic: 'غُلِبَتِ الرُّومُ',
          english: 'The Byzantines have been defeated'
        },
        {
          number: 3,
          arabic: 'فِي أَدْنَى الْأَرْضِ وَهُم مِّن بَعْدِ غَلَبِهِمْ سَيَغْلِبُونَ',
          english: 'In the nearest land. But they, after their defeat, will overcome.'
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
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${selectedSurah.revelation === 'Meccan'
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
                  {verse.bengali && (
                    <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                      {verse.bengali}
                    </p>
                  )}
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
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${surah.revelation === 'Meccan'
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