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
  bengali?: string;
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
        },
        {
          number: 4,
          arabic: "مِنْ قَبْلُ هُدًى لِلنَّاسِ وَأَنْزَلَ الْفُرْقَانَ إِنَّ الَّذِينَ كَفَرُوا بِآيَاتِ اللَّهِ لَهُمْ عَذَابٌ شَدِيدٌ وَاللَّهُ عَزِيزٌ ذُو انْتِقَامٍ",
          english: "Aforetime, as guidance for mankind; and He sent down the Criterion. Those who have rejected God's signs will have a severe punishment. God is Mighty, Able to take revenge."
        },
        {
          number: 5,
          arabic: "إِنَّ اللَّهَ لَا يَخْفَى عَلَيْهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ",
          english: "Nothing is hidden from God, on earth or in the heaven."
        },
        {
          number: 6,
          arabic: "هُوَ الَّذِي يُصَوِّرُكُمْ فِي الْأَرْحَامِ كَيْفَ يَشَاءُ لَا إِلَهَ إِلَّا هُوَ الْعَزِيزُ الْحَكِيمُ",
          english: "It is He who forms you in the wombs as He wills. There is no god except He, the Almighty, the Wise."
        },
        {
          number: 7,
          arabic: "هُوَ الَّذِي أَنْزَلَ عَلَيْكَ الْكِتَابَ مِنْهُ آيَاتٌ مُحْكَمَاتٌ هُنَّ أُمُّ الْكِتَابِ وَأُخَرُ مُتَشَابِهَاتٌ فَأَمَّا الَّذِينَ فِي قُلُوبِهِمْ زَيْغٌ فَيَتَّبِعُونَ مَا تَشَابَهَ مِنْهُ ابْتِغَاءَ الْفِتْنَةِ وَابْتِغَاءَ تَأْوِيلِهِ وَمَا يَعْلَمُ تَأْوِيلَهُ إِلَّا اللَّهُ وَالرَّاسِخُونَ فِي الْعِلْمِ يَقُولُونَ آمَنَّا بِهِ كُلٌّ مِنْ عِنْدِ رَبِّنَا وَمَا يَذَّكَّرُ إِلَّا أُولُو الْأَلْبَابِ",
          english: "It is He who revealed to you the Book. Some of its verses are definitive; they are the foundation of the Book, and others are unspecific. As for those in whose hearts is deviation, they follow the unspecific part, seeking descent, and seeking to derive an interpretation. But none knows its interpretation except God and those firmly rooted in knowledge say, 'We believe in it; all is from our Lord.' But none recollects except those with understanding."
        },
        {
          number: 8,
          arabic: "رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِنْ لَدُنْكَ رَحْمَةً إِنَّكَ أَنْتَ الْوَهَّابُ",
          english: "'Our Lord, do not cause our hearts to swerve after You have guided us, and bestow on us mercy from Your presence; You are the Giver.'"
        },
        {
          number: 9,
          arabic: "رَبَّنَا إِنَّكَ جَامِعُ النَّاسِ لِيَوْمٍ لَا رَيْبَ فِيهِ إِنَّ اللَّهَ لَا يُخْلِفُ الْمِيعَادَ",
          english: "'Our Lord, You will gather the people for a Day in which there is no doubt.' God will never break His promise."
        },
        {
          number: 10,
          arabic: "إِنَّ الَّذِينَ كَفَرُوا لَنْ تُغْنِيَ عَنْهُمْ أَمْوَالُهُمْ وَلَا أَوْلَادُهُمْ مِنَ اللَّهِ شَيْئًا وَأُولَئِكَ هُمْ وَقُودُ النَّارِ",
          english: "As for those who disbelieve, neither their wealth nor their children will avail them anything against God. These will be fuel for the Fire."
        },
        {
          number: 11,
          arabic: "كَدَأْبِ آلِ فِرْعَوْنَ وَالَّذِينَ مِنْ قَبْلِهِمْ كَذَّبُوا بِآيَاتِنَا فَأَخَذَهُمُ اللَّهُ بِذُنُوبِهِمْ وَاللَّهُ شَدِيدُ الْعِقَابِ",
          english: "Like the behavior of Pharaoh's people and those before them. They rejected Our signs, so God seized them for their sins. God is Strict in retribution."
        },
        {
          number: 12,
          arabic: "قُلْ لِلَّذِينَ كَفَرُوا سَتُغْلَبُونَ وَتُحْشَرُونَ إِلَى جَهَنَّمَ وَبِئْسَ الْمِهَادُ",
          english: "Say to those who disbelieve, 'You will be defeated, and rounded up into Hell—an awful resting-place.'"
        },
        {
          number: 13,
          arabic: "قَدْ كَانَ لَكُمْ آيَةٌ فِي فِئَتَيْنِ الْتَقَتَا فِئَةٌ تُقَاتِلُ فِي سَبِيلِ اللَّهِ وَأُخْرَى كَافِرَةٌ يَرَوْنَهُمْ مِثْلَيْهِمْ رَأْيَ الْعَيْنِ وَاللَّهُ يُؤَيِّدُ بِنَصْرِهِ مَنْ يَشَاءُ إِنَّ فِي ذَلِكَ لَعِبْرَةً لِأُولِي الْأَبْصَارِ",
          english: "There was a sign for you in the two parties that met. One party fighting in the way of God, and the other was disbelieving. They saw them with their own eyes twice their number. But God supports with His help whomever He wills. In that is a lesson for those with insight."
        },
        {
          number: 14,
          arabic: "زُيِّنَ لِلنَّاسِ حُبُّ الشَّهَوَاتِ مِنَ النِّسَاءِ وَالْبَنِينَ وَالْقَنَاطِيرِ الْمُقَنْطَرَةِ مِنَ الذَّهَبِ وَالْفِضَّةِ وَالْخَيْلِ الْمُسَوَّمَةِ وَالْأَنْعَامِ وَالْحَرْثِ ذَلِكَ مَتَاعُ الْحَيَاةِ الدُّنْيَا وَاللَّهُ عِنْدَهُ حُسْنُ الْمَآبِ",
          english: "Adorned for the people is the love of desires, such as women, and children, and piles upon piles of gold and silver, and branded horses, and livestock, and fields. These are the conveniences of the worldly life, but with God lies the finest resort."
        },
        {
          number: 15,
          arabic: "قُلْ أَؤُنَبِّئُكُمْ بِخَيْرٍ مِنْ ذَلِكُمْ لِلَّذِينَ اتَّقَوْا عِنْدَ رَبِّهِمْ جَنَّاتٌ تَجْرِي مِنْ تَحْتِهَا الْأَنْهَارُ خَالِدِينَ فِيهَا وَأَزْوَاجٌ مُطَهَّرَةٌ وَرِضْوَانٌ مِنَ اللَّهِ وَاللَّهُ بَصِيرٌ بِالْعِبَادِ",
          english: "Say, 'Shall I inform you of something better than that? For those who are righteous, with their Lord are Gardens beneath which rivers flow, where they will remain forever, and purified spouses, and acceptance from God.' God is Observant of the servants."
        },
        {
          number: 16,
          arabic: "الَّذِينَ يَقُولُونَ رَبَّنَا إِنَّنَا آمَنَّا فَاغْفِرْ لَنَا ذُنُوبَنَا وَقِنَا عَذَابَ النَّارِ",
          english: "Those who say, 'Our Lord, we have believed, so forgive us our sins, and save us from the suffering of the Fire.'"
        },
        {
          number: 17,
          arabic: "الصَّابِرِينَ وَالصَّادِقِينَ وَالْقَانِتِينَ وَالْمُنْفِقِينَ وَالْمُسْتَغْفِرِينَ بِالْأَسْحَارِ",
          english: "The patient, and the truthful, and the reverent, and the charitable, and the seekers of forgiveness at dawn."
        },
        {
          number: 18,
          arabic: "شَهِدَ اللَّهُ أَنَّهُ لَا إِلَهَ إِلَّا هُوَ وَالْمَلَائِكَةُ وَأُولُو الْعِلْمِ قَائِمًا بِالْقِسْطِ لَا إِلَهَ إِلَّا هُوَ الْعَزِيزُ الْحَكِيمُ",
          english: "God bears witness that there is no god but He, as do the angels, and those endowed with knowledge—upholding justice. There is no god but He, the Mighty, the Wise."
        },
        {
          number: 19,
          arabic: "إِنَّ الدِّينَ عِنْدَ اللَّهِ الْإِسْلَامُ وَمَا اخْتَلَفَ الَّذِينَ أُوتُوا الْكِتَابَ إِلَّا مِنْ بَعْدِ مَا جَاءَهُمُ الْعِلْمُ بَغْيًا بَيْنَهُمْ وَمَنْ يَكْفُرْ بِآيَاتِ اللَّهِ فَإِنَّ اللَّهَ سَرِيعُ الْحِسَابِ",
          english: "Religion with God is Islam. Those to whom the Scripture was given differed only after knowledge came to them, out of envy among themselves. Whoever rejects the signs of God—God is quick to take account."
        },
        {
          number: 20,
          arabic: "فَإِنْ حَاجُّوكَ فَقُلْ أَسْلَمْتُ وَجْهِيَ لِلَّهِ وَمَنِ اتَّبَعَنِ وَقُلْ لِلَّذِينَ أُوتُوا الْكِتَابَ وَالْأُمِّيِّينَ أَأَسْلَمْتُمْ فَإِنْ أَسْلَمُوا فَقَدِ اهْتَدَوْا وَإِنْ تَوَلَّوْا فَإِنَّمَا عَلَيْكَ الْبَلَاغُ وَاللَّهُ بَصِيرٌ بِالْعِبَادِ",
          english: "If they argue with you, say, 'I have surrendered myself to God, and those who follow me.' And say to those who were given the Scripture, and to the unlearned, 'Have you surrendered?' If they have surrendered, then they are guided; but if they turn away, then your duty is to convey. God is Seeing of the servants."
        },
        {
          number: 21,
          arabic: "إِنَّ الَّذِينَ يَكْفُرُونَ بِآيَاتِ اللَّهِ وَيَقْتُلُونَ النَّبِيِّينَ بِغَيْرِ حَقٍّ وَيَقْتُلُونَ الَّذِينَ يَأْمُرُونَ بِالْقِسْطِ مِنَ النَّاسِ فَبَشِّرْهُمْ بِعَذَابٍ أَلِيمٍ",
          english: "As for those who defy God's revelations, and kill the prophets unjustly, and kill those who advocate justice among the people—promise them a painful retribution."
        },
        {
          number: 22,
          arabic: "أُولَئِكَ الَّذِينَ حَبِطَتْ أَعْمَالُهُمْ فِي الدُّنْيَا وَالْآخِرَةِ وَمَا لَهُمْ مِنْ نَاصِرِينَ",
          english: "They are those whose deeds will come to nothing, in this world and in the Hereafter; and they will have no saviors."
        },
        {
          number: 23,
          arabic: "أَلَمْ تَرَ إِلَى الَّذِينَ أُوتُوا نَصِيبًا مِنَ الْكِتَابِ يُدْعَوْنَ إِلَى كِتَابِ اللَّهِ لِيَحْكُمَ بَيْنَهُمْ ثُمَّ يَتَوَلَّى فَرِيقٌ مِنْهُمْ وَهُمْ مُعْرِضُونَ",
          english: "Have you not considered those who were given a share of the Scripture, as they were called to the Scripture of God to arbitrate between them; then some of them turned back, and declined?"
        },
        {
          number: 24,
          arabic: "ذَلِكَ بِأَنَّهُمْ قَالُوا لَنْ تَمَسَّنَا النَّارُ إِلَّا أَيَّامًا مَعْدُودَاتٍ وَغَرَّهُمْ فِي دِينِهِمْ مَا كَانُوا يَفْتَرُونَ",
          english: "That is because they said, 'The Fire will not touch us except for a limited number of days.' They have been misled in their religion by the lies they fabricated."
        },
        {
          number: 25,
          arabic: "فَكَيْفَ إِذَا جَمَعْنَاهُمْ لِيَوْمٍ لَا رَيْبَ فِيهِ وَوُفِّيَتْ كُلُّ نَفْسٍ مَا كَسَبَتْ وَهُمْ لَا يُظْلَمُونَ",
          english: "How about when We gather them for a Day in which there is no doubt, and each soul will be paid in full for what it has earned, and they will not be wronged?"
        },
        {
          number: 26,
          arabic: "قُلِ اللَّهُمَّ مَالِكَ الْمُلْكِ تُؤْتِي الْمُلْكَ مَنْ تَشَاءُ وَتَنْزِعُ الْمُلْكَ مِمَّنْ تَشَاءُ وَتُعِزُّ مَنْ تَشَاءُ وَتُذِلُّ مَنْ تَشَاءُ بِيَدِكَ الْخَيْرُ إِنَّكَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
          english: "Say, 'O God, Owner of Sovereignty. You grant sovereignty to whom You will, and You strip sovereignty from whom you will. You honor whom you will, and You humiliate whom you will. In Your hand is all goodness. You are Capable of all things.'"
        },
        {
          number: 27,
          arabic: "تُولِجُ اللَّيْلَ فِي النَّهَارِ وَتُولِجُ النَّهَارَ فِي اللَّيْلِ وَتُخْرِجُ الْحَيَّ مِنَ الْمَيِّتِ وَتُخْرِجُ الْمَيِّتَ مِنَ الْحَيِّ وَتَرْزُقُ مَنْ تَشَاءُ بِغَيْرِ حِسَابٍ",
          english: "'You merge the night into the day, and You merge the day into the night; and you bring the living out of the dead, and You bring the dead out of the living; and You provide for whom you will without measure.'"
        },
        {
          number: 28,
          arabic: "لَا يَتَّخِذِ الْمُؤْمِنُونَ الْكَافِرِينَ أَوْلِيَاءَ مِنْ دُونِ الْمُؤْمِنِينَ وَمَنْ يَفْعَلْ ذَلِكَ فَلَيْسَ مِنَ اللَّهِ فِي شَيْءٍ إِلَّا أَنْ تَتَّقُوا مِنْهُمْ تُقَاةً وَيُحَذِّرُكُمُ اللَّهُ نَفْسَهُ وَإِلَى اللَّهِ الْمَصِيرُ",
          english: "Believers are not to take disbelievers for friends instead of believers. Whoever does that has nothing to do with God, unless it is to protect your own selves against them. God warns you to beware of Him. To God is the destiny."
        },
        {
          number: 29,
          arabic: "قُلْ إِنْ تُخْفُوا مَا فِي صُدُورِكُمْ أَوْ تُبْدُوهُ يَعْلَمْهُ اللَّهُ وَيَعْلَمُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ وَاللَّهُ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
          english: "Say, 'Whether you conceal what is in your hearts, or disclose it, God knows it.' He knows everything in the heavens and the earth. God is Powerful over everything."
        },
        {
          number: 30,
          arabic: "يَوْمَ تَجِدُ كُلُّ نَفْسٍ مَا عَمِلَتْ مِنْ خَيْرٍ مُحْضَرًا وَمَا عَمِلَتْ مِنْ سُوءٍ تَوَدُّ لَوْ أَنَّ بَيْنَهَا وَبَيْنَهُ أَمَدًا بَعِيدًا وَيُحَذِّرُكُمُ اللَّهُ نَفْسَهُ وَاللَّهُ رَءُوفٌ بِالْعِبَادِ",
          english: "On the Day when every soul finds all the good it has done presented. And as for the evil it has done, it will wish there were a great distance between them. God cautions you of Himself. God is Kind towards the servants."
        },
        {
          number: 31,
          arabic: "قُلْ إِنْ كُنْتُمْ تُحِبُّونَ اللَّهَ فَاتَّبِعُونِي يُحْبِبْكُمُ اللَّهُ وَيَغْفِرْ لَكُمْ ذُنُوبَكُمْ وَاللَّهُ غَفُورٌ رَحِيمٌ",
          english: "Say, 'If you love God, then follow me, and God will love you, and will forgive you your sins.' God is Forgiving and Merciful."
        },
        {
          number: 32,
          arabic: "قُلْ أَطِيعُوا اللَّهَ وَالرَّسُولَ فَإِنْ تَوَلَّوْا فَإِنَّ اللَّهَ لَا يُحِبُّ الْكَافِرِينَ",
          english: "Say, 'Obey God and the Messenger.' But if they turn away—God does not love the faithless."
        },
        {
          number: 33,
          arabic: "إِنَّ اللَّهَ اصْطَفَى آدَمَ وَنُوحًا وَآلَ إِبْرَاهِيمَ وَآلَ عِمْرَانَ عَلَى الْعَالَمِينَ",
          english: "God chose Adam, and Noah, and the family of Abraham, and the family of Imran, over all mankind."
        },
        {
          number: 34,
          arabic: "ذُرِّيَّةً بَعْضُهَا مِنْ بَعْضٍ وَاللَّهُ سَمِيعٌ عَلِيمٌ",
          english: "Offspring one of the other. God is Hearer and Knower."
        },
        {
          number: 35,
          arabic: "إِذْ قَالَتِ امْرَأَتُ عِمْرَانَ رَبِّ إِنِّي نَذَرْتُ لَكَ مَا فِي بَطْنِي مُحَرَّرًا فَتَقَبَّلْ مِنِّي إِنَّكَ أَنْتَ السَّمِيعُ الْعَلِيمُ",
          english: "The wife of Imran said, 'My Lord, I have vowed to You what is in my womb, dedicated, so accept from me; You are the Hearer and Knower.'"
        },
        {
          number: 36,
          arabic: "فَلَمَّا وَضَعَتْهَا قَالَتْ رَبِّ إِنِّي وَضَعْتُهَا أُنْثَى وَاللَّهُ أَعْلَمُ بِمَا وَضَعَتْ وَلَيْسَ الذَّكَرُ كَالْأُنْثَى وَإِنِّي سَمَّيْتُهَا مَرْيَمَ وَإِنِّي أُعِيذُهَا بِكَ وَذُرِّيَّتَهَا مِنَ الشَّيْطَانِ الرَّجِيمِ",
          english: "And when she delivered her, she said, 'My Lord, I have delivered a female,' and God was well aware of what she has delivered, 'and the male is not like the female, and I have named her Mary, and have commended her and her descendants to Your protection, from Satan the outcast.'"
        },
        {
          number: 37,
          arabic: "فَتَقَبَّلَهَا رَبُّهَا بِقَبُولٍ حَسَنٍ وَأَنْبَتَهَا نَبَاتًا حَسَنًا وَكَفَّلَهَا زَكَرِيَّا كُلَّمَا دَخَلَ عَلَيْهَا زَكَرِيَّا الْمِحْرَابَ وَجَدَ عِنْدَهَا رِزْقًا قَالَ يَا مَرْيَمُ أَنَّى لَكِ هَذَا قَالَتْ هُوَ مِنْ عِنْدِ اللَّهِ إِنَّ اللَّهَ يَرْزُقُ مَنْ يَشَاءُ بِغَيْرِ حِسَابٍ",
          english: "Her Lord accepted her with a gracious reception, and brought her a beautiful upbringing, and entrusted her to the care of Zechariah. Whenever Zechariah entered upon her in the sanctuary, he found her with provision. He said, 'O Mary, where did you get this from?' She said, 'It is from God; God provides to whom He wills without reckoning.'"
        },
        {
          number: 38,
          arabic: "هُنَالِكَ دَعَا زَكَرِيَّا رَبَّهُ قَالَ رَبِّ هَبْ لِي مِنْ لَدُنْكَ ذُرِّيَّةً طَيِّبَةً إِنَّكَ سَمِيعُ الدُّعَاءِ",
          english: "Thereupon Zechariah prayed to his Lord; he said, 'My Lord, bestow on me good offspring from Your presence; You are the Hearer of Prayers.'"
        },
        {
          number: 39,
          arabic: "فَنَادَتْهُ الْمَلَائِكَةُ وَهُوَ قَائِمٌ يُصَلِّي فِي الْمِحْرَابِ أَنَّ اللَّهَ يُبَشِّرُكَ بِيَحْيَى مُصَدِّقًا بِكَلِمَةٍ مِنَ اللَّهِ وَسَيِّدًا وَحَصُورًا وَنَبِيًّا مِنَ الصَّالِحِينَ",
          english: "Then the angels called out to him, as he stood praying in the sanctuary: 'God gives you good news of John; confirming a Word from God, and honorable, and moral, and a prophet; one of the upright.'"
        },
        {
          number: 40,
          arabic: "قَالَ رَبِّ أَنَّى يَكُونُ لِي غُلَامٌ وَقَدْ بَلَغَنِيَ الْكِبَرُ وَامْرَأَتِي عَاقِرٌ قَالَ كَذَلِكَ اللَّهُ يَفْعَلُ مَا يَشَاءُ",
          english: "He said, 'My Lord, how will I have a son, when old age has overtaken me, and my wife is barren?' He said, 'Even so, God does whatever He wills.'"
        },
        {
          number: 41,
          arabic: "قَالَ رَبِّ اجْعَلْ لِي آيَةً قَالَ آيَتُكَ أَلَّا تُكَلِّمَ النَّاسَ ثَلَاثَةَ أَيَّامٍ إِلَّا رَمْزًا وَاذْكُرْ رَبَّكَ كَثِيرًا وَسَبِّحْ بِالْعَشِيِّ وَالْإِبْكَارِ",
          english: "He said, 'My Lord, give me a sign.' He said, 'Your sign is that you shall not speak to the people for three days, except by gestures. And remember your Lord much, and praise in the evening and the morning.'"
        },
        {
          number: 42,
          arabic: "وَإِذْ قَالَتِ الْمَلَائِكَةُ يَا مَرْيَمُ إِنَّ اللَّهَ اصْطَفَاكِ وَطَهَّرَكِ وَاصْطَفَاكِ عَلَى نِسَاءِ الْعَالَمِينَ",
          english: "The angels said, 'O Mary, God has chosen you, and has purified you. He has chosen you over all the women of the world.'"
        },
        {
          number: 43,
          arabic: "يَا مَرْيَمُ اقْنُتِي لِرَبِّكِ وَاسْجُدِي وَارْكَعِي مَعَ الرَّاكِعِينَ",
          english: "'O Mary, be devoted to your Lord, and bow down, and kneel with those who kneel.'"
        },
        {
          number: 44,
          arabic: "ذَلِكَ مِنْ أَنْبَاءِ الْغَيْبِ نُوحِيهِ إِلَيْكَ وَمَا كُنْتَ لَدَيْهِمْ إِذْ يُلْقُونَ أَقْلَامَهُمْ أَيُّهُمْ يَكْفُلُ مَرْيَمَ وَمَا كُنْتَ لَدَيْهِمْ إِذْ يَخْتَصِمُونَ",
          english: "These are accounts from the Unseen, which We reveal to you. You were not with them when they cast their lots as to which of them would take charge of Mary; nor were you with them as they quarreled."
        },
        {
          number: 45,
          arabic: "إِذْ قَالَتِ الْمَلَائِكَةُ يَا مَرْيَمُ إِنَّ اللَّهَ يُبَشِّرُكِ بِكَلِمَةٍ مِنْهُ اسْمُهُ الْمَسِيحُ عِيسَى ابْنُ مَرْيَمَ وَجِيهًا فِي الدُّنْيَا وَالْآخِرَةِ وَمِنَ الْمُقَرَّبِينَ",
          english: "The Angels said, 'O Mary, God gives you good news of a Word from Him. His name is the Messiah, Jesus, son of Mary, well-esteemed in this world and the next, and one of the nearest.'"
        },
        {
          number: 46,
          arabic: "وَيُكَلِّمُ النَّاسَ فِي الْمَهْدِ وَكَهْلًا وَمِنَ الصَّالِحِينَ",
          english: "He will speak to the people from the crib, and in adulthood, and will be one of the righteous."
        },
        {
          number: 47,
          arabic: "قَالَتْ رَبِّ أَنَّى يَكُونُ لِي وَلَدٌ وَلَمْ يَمْسَسْنِي بَشَرٌ قَالَ كَذَلِكِ اللَّهُ يَخْلُقُ مَا يَشَاءُ إِذَا قَضَى أَمْرًا فَإِنَّمَا يَقُولُ لَهُ كُنْ فَيَكُونُ",
          english: "She said, 'My Lord, how can I have a child, when no man has touched me?' He said, 'It will be so. God creates whatever He wills. To have anything done, He only says to it, \"Be,\" and it is.'"
        },
        {
          number: 48,
          arabic: "وَيُعَلِّمُهُ الْكِتَابَ وَالْحِكْمَةَ وَالتَّوْرَاةَ وَالْإِنْجِيلَ",
          english: "And He will teach him the Scripture and wisdom, and the Torah and the Gospel."
        },
        {
          number: 49,
          arabic: "وَرَسُولًا إِلَى بَنِي إِسْرَائِيلَ أَنِّي قَدْ جِئْتُكُمْ بِآيَةٍ مِنْ رَبِّكُمْ أَنِّي أَخْلُقُ لَكُمْ مِنَ الطِّينِ كَهَيْئَةِ الطَّيْرِ فَأَنْفُخُ فِيهِ فَيَكُونُ طَيْرًا بِإِذْنِ اللَّهِ وَأُبْرِئُ الْأَكْمَهَ وَالْأَبْرَصَ وَأُحْيِي الْمَوْتَى بِإِذْنِ اللَّهِ وَأُنَبِّئُكُمْ بِمَا تَأْكُلُونَ وَمَا تَدَّخِرُونَ فِي بُيُوتِكُمْ إِنَّ فِي ذَلِكَ لَآيَةً لَكُمْ إِنْ كُنْتُمْ مُؤْمِنِينَ",
          english: "A messenger to the Children of Israel: 'I have come to you with a sign from your Lord. I make for you out of clay the figure of a bird; then I breathe into it, and it becomes a bird by God's leave. And I heal the blind and the leprous, and I revive the dead, by God's leave. And I inform you concerning what you eat, and what you store in your homes. In that is a sign for you, if you are believers.'"
        },
        {
          number: 50,
          arabic: "وَمُصَدِّقًا لِمَا بَيْنَ يَدَيَّ مِنَ التَّوْرَاةِ وَلِأُحِلَّ لَكُمْ بَعْضَ الَّذِي حُرِّمَ عَلَيْكُمْ وَجِئْتُكُمْ بِآيَةٍ مِنْ رَبِّكُمْ فَاتَّقُوا اللَّهَ وَأَطِيعُونِ",
          english: "'And verifying what lies before me of the Torah, and to make lawful for you some of what was forbidden to you. I have come to you with a sign from your Lord; so fear God, and obey me.'"
        },
        {
          number: 51,
          arabic: "إِنَّ اللَّهَ رَبِّي وَرَبُّكُمْ فَاعْبُدُوهُ هَذَا صِرَاطٌ مُسْتَقِيمٌ",
          english: "'God is my Lord and your Lord, so worship Him. That is a straight path.'"
        },
        {
          number: 52,
          arabic: "فَلَمَّا أَحَسَّ عِيسَى مِنْهُمُ الْكُفْرَ قَالَ مَنْ أَنْصَارِي إِلَى اللَّهِ قَالَ الْحَوَارِيُّونَ نَحْنُ أَنْصَارُ اللَّهِ آمَنَّا بِاللَّهِ وَاشْهَدْ بِأَنَّا مُسْلِمُونَ",
          english: "When Jesus sensed disbelief on their part, he said, 'Who are my allies towards God?' The disciples said, 'We are God's allies; we have believed in God, and bear witness that we submit.'"
        },
        {
          number: 53,
          arabic: "رَبَّنَا آمَنَّا بِمَا أَنْزَلْتَ وَاتَّبَعْنَا الرَّسُولَ فَاكْتُبْنَا مَعَ الشَّاهِدِينَ",
          english: "'Our Lord, we have believed in what You have revealed, and we have followed the Messenger, so count us among the witnesses.'"
        },
        {
          number: 54,
          arabic: "وَمَكَرُوا وَمَكَرَ اللَّهُ وَاللَّهُ خَيْرُ الْمَاكِرِينَ",
          english: "They planned, and God planned; but God is the Best of planners."
        },
        {
          number: 55,
          arabic: "إِذْ قَالَ اللَّهُ يَا عِيسَى إِنِّي مُتَوَفِّيكَ وَرَافِعُكَ إِلَيَّ وَمُطَهِّرُكَ مِنَ الَّذِينَ كَفَرُوا وَجَاعِلُ الَّذِينَ اتَّبَعُوكَ فَوْقَ الَّذِينَ كَفَرُوا إِلَى يَوْمِ الْقِيَامَةِ ثُمَّ إِلَيَّ مَرْجِعُكُمْ فَأَحْكُمُ بَيْنَكُمْ فِيمَا كُنْتُمْ فِيهِ تَخْتَلِفُونَ",
          english: "God said, 'O Jesus, I am terminating your life, and raising you to Me, and clearing you of those who disbelieve. And I will make those who follow you superior to those who disbelieve, until the Day of Resurrection. Then to Me is your return; then I will judge between you regarding what you were disputing.'"
        },
        {
          number: 56,
          arabic: "فَأَمَّا الَّذِينَ كَفَرُوا فَأُعَذِّبُهُمْ عَذَابًا شَدِيدًا فِي الدُّنْيَا وَالْآخِرَةِ وَمَا لَهُمْ مِنْ نَاصِرِينَ",
          english: "As for those who disbelieve, I will punish them with a severe punishment, in this world and the next, and they will have no helpers."
        },
        {
          number: 57,
          arabic: "وَأَمَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ فَيُوَفِّيهِمْ أُجُورَهُمْ وَاللَّهُ لَا يُحِبُّ الظَّالِمِينَ",
          english: "And as for those who believe and do good works, He will give them their rewards in full. God does not love the unjust."
        },
        {
          number: 58,
          arabic: "ذَلِكَ نَتْلُوهُ عَلَيْكَ مِنَ الْآيَاتِ وَالذِّكْرِ الْحَكِيمِ",
          english: "This is what We recite to you of the Verses and the Wise Reminder."
        },
        {
          number: 59,
          arabic: "إِنَّ مَثَلَ عِيسَى عِنْدَ اللَّهِ كَمَثَلِ آدَمَ خَلَقَهُ مِنْ تُرَابٍ ثُمَّ قَالَ لَهُ كُنْ فَيَكُونُ",
          english: "The likeness of Jesus in God's sight is that of Adam: He created him from dust, then said to him, 'Be,' and he was."
        },
        {
          number: 60,
          arabic: "الْحَقُّ مِنْ رَبِّكَ فَلَا تَكُنْ مِنَ الْمُمْتَرِينَ",
          english: "The truth is from your Lord, so do not be of those who doubt."
        },
        {
          number: 61,
          arabic: "فَمَنْ حَاجَّكَ فِيهِ مِنْ بَعْدِ مَا جَاءَكَ مِنَ الْعِلْمِ فَقُلْ تَعَالَوْا نَدْعُ أَبْنَاءَنَا وَأَبْنَاءَكُمْ وَنِسَاءَنَا وَنِسَاءَكُمْ وَأَنْفُسَنَا وَأَنْفُسَكُمْ ثُمَّ نَبْتَهِلْ فَنَجْعَلْ لَعْنَتَ اللَّهِ عَلَى الْكَاذِبِينَ",
          english: "And if anyone disputes with you about him, after the knowledge that has come to you, say, 'Come, let us call our children and your children, and our women and your women, and ourselves and yourselves, and let us invoke God's curse on the liars.'"
        },
        {
          number: 62,
          arabic: "إِنَّ هَذَا لَهُوَ الْقَصَصُ الْحَقُّ وَمَا مِنْ إِلَهٍ إِلَّا اللَّهُ وَإِنَّ اللَّهَ لَهُوَ الْعَزِيزُ الْحَكِيمُ",
          english: "This is the narrative of truth: there is no god but God. God is the Mighty, the Wise."
        },
        {
          number: 63,
          arabic: "فَإِنْ تَوَلَّوْا فَإِنَّ اللَّهَ عَلِيمٌ بِالْمُفْسِدِينَ",
          english: "But if they turn away—God knows the corrupt."
        },
        {
          number: 64,
          arabic: "قُلْ يَا أَهْلَ الْكِتَابِ تَعَالَوْا إِلَى كَلِمَةٍ سَوَاءٍ بَيْنَنَا وَبَيْنَكُمْ أَلَّا نَعْبُدَ إِلَّا اللَّهَ وَلَا نُشْرِكَ بِهِ شَيْئًا وَلَا يَتَّخِذَ بَعْضُنَا بَعْضًا أَرْبَابًا مِنْ دُونِ اللَّهِ فَإِنْ تَوَلَّوْا فَقُولُوا اشْهَدُوا بِأَنَّا مُسْلِمُونَ",
          english: "Say, 'O People of the Book, come to terms common between us and you: that we worship none but God, and that we associate nothing with Him, and that none of us takes others as lords besides God.' And if they turn away, say, 'Bear witness that we have submitted.'"
        },
        {
          number: 65,
          arabic: "يَا أَهْلَ الْكِتَابِ لِمَ تُحَاجُّونَ فِي إِبْرَاهِيمَ وَمَا أُنْزِلَتِ التَّوْرَاةُ وَالْإِنْجِيلُ إِلَّا مِنْ بَعْدِهِ أَفَلَا تَعْقِلُونَ",
          english: "O People of the Book! Why do you argue about Abraham, when the Torah and the Gospel were not revealed until after him? Will you not reason?"
        },
        {
          number: 66,
          arabic: "هَا أَنْتُمْ هَؤُلَاءِ حَاجَجْتُمْ فِيمَا لَكُمْ بِهِ عِلْمٌ فَلِمَ تُحَاجُّونَ فِيمَا لَيْسَ لَكُمْ بِهِ عِلْمٌ وَاللَّهُ يَعْلَمُ وَأَنْتُمْ لَا تَعْلَمُونَ",
          english: "Here you are—you argue about things you know, but why do you argue about things you do not know? God knows, and you do not know."
        },
        {
          number: 67,
          arabic: "مَا كَانَ إِبْرَاهِيمُ يَهُودِيًّا وَلَا نَصْرَانِيًّا وَلَكِنْ كَانَ حَنِيفًا مُسْلِمًا وَمَا كَانَ مِنَ الْمُشْرِكِينَ",
          english: "Abraham was neither a Jew nor a Christian, but he was a Monotheist, a Muslim. And he was not of the Polytheists."
        },
        {
          number: 68,
          arabic: "إِنَّ أَوْلَى النَّاسِ بِإِبْرَاهِيمَ لَلَّذِينَ اتَّبَعُوهُ وَهَذَا النَّبِيُّ وَالَّذِينَ آمَنُوا وَاللَّهُ وَلِيُّ الْمُؤْمِنِينَ",
          english: "The people most deserving of Abraham are those who followed him, and this prophet, and those who believe. God is the Guardian of the believers."
        },
        {
          number: 69,
          arabic: "وَدَّتْ طَائِفَةٌ مِنْ أَهْلِ الْكِتَابِ لَوْ يُضِلُّونَكُمْ وَمَا يُضِلُّونَ إِلَّا أَنْفُسَهُمْ وَمَا يَشْعُرُونَ",
          english: "A party of the People of the Book would love to lead you astray, but they only lead themselves astray, and they do not realize it."
        },
        {
          number: 70,
          arabic: "يَا أَهْلَ الْكِتَابِ لِمَ تَكْفُرُونَ بِآيَاتِ اللَّهِ وَأَنْتُمْ تَشْهَدُونَ",
          english: "O People of the Book! Why do you reject the revelations of God, even as you witness?"
        },
        {
          number: 71,
          arabic: "يَا أَهْلَ الْكِتَابِ لِمَ تَلْبِسُونَ الْحَقَّ بِالْبَاطِلِ وَتَكْتُمُونَ الْحَقَّ وَأَنْتُمْ تَعْلَمُونَ",
          english: "O People of the Book! Why do you confound the truth with falsehood, and knowingly conceal the truth?"
        },
        {
          number: 72,
          arabic: "وَقَالَتْ طَائِفَةٌ مِنْ أَهْلِ الْكِتَابِ آمِنُوا بِالَّذِي أُنْزِلَ عَلَى الَّذِينَ آمَنُوا وَجْهَ النَّهَارِ وَاكْفُرُوا آخِرَهُ لَعَلَّهُمْ يَرْجِعُونَ",
          english: "Some of the People of the Book say, 'Believe in what was revealed to the believers at the beginning of the day, and reject it at its end, so that they may return.'"
        },
        {
          number: 73,
          arabic: "وَلَا تُؤْمِنُوا إِلَّا لِمَنْ تَبِعَ دِينَكُمْ قُلْ إِنَّ الْهُدَى هُدَى اللَّهِ أَنْ يُؤْتَى أَحَدٌ مِثْلَ مَا أُوتِيتُمْ أَوْ يُحَاجُّوكُمْ عِنْدَ رَبِّكُمْ قُلْ إِنَّ الْفَضْلَ بِيَدِ اللَّهِ يُؤْتِيهِ مَنْ يَشَاءُ وَاللَّهُ وَاسِعٌ عَلِيمٌ",
          english: "And trust none except those who follow your religion.' Say, 'Guidance is God's guidance. If someone is given the like of what you were given, or they argue with you before your Lord, say, \"All grace is in God's hand; He gives it to whomever He wills.\" God is Bounteous and Knowing.'"
        },
        {
          number: 74,
          arabic: "يَخْتَصُّ بِرَحْمَتِهِ مَنْ يَشَاءُ وَاللَّهُ ذُو الْفَضْلِ الْعَظِيمِ",
          english: "He specifies His mercy for whomever He wills. God is Possessor of Sublime Grace."
        },
        {
          number: 75,
          arabic: "وَمِنْ أَهْلِ الْكِتَابِ مَنْ إِنْ تَأْمَنْهُ بِقِنْطَارٍ يُؤَدِّهِ إِلَيْكَ وَمِنْهُمْ مَنْ إِنْ تَأْمَنْهُ بِدِينَارٍ لَا يُؤَدِّهِ إِلَيْكَ إِلَّا مَا دُمْتَ عَلَيْهِ قَائِمًا ذَلِكَ بِأَنَّهُمْ قَالُوا لَيْسَ عَلَيْنَا فِي الْأُمِّيِّينَ سَبِيلٌ وَيَقُولُونَ عَلَى اللَّهِ الْكَذِبَ وَهُمْ يَعْلَمُونَ",
          english: "Among the People of the Book is he, who, if you entrust him with a heap of gold, he will give it back to you. And among them is he, who, if you entrust him with a single coin, he will not give it back to you, unless you keep after him. That is because they say, 'We are under no obligation towards the gentiles.' They tell lies about God, and they know it."
        },
        {
          number: 76,
          arabic: "بَلَى مَنْ أَوْفَى بِعَهْدِهِ وَاتَّقَى فَإِنَّ اللَّهَ يُحِبُّ الْمُتَّقِينَ",
          english: "Indeed, whoever fulfills his commitments and maintains piety—God loves the pious."
        },
        {
          number: 77,
          arabic: "إِنَّ الَّذِينَ يَشْتَرُونَ بِعَهْدِ اللَّهِ وَأَيْمَانِهِمْ ثَمَنًا قَلِيلًا أُولَئِكَ لَا خَلَاقَ لَهُمْ فِي الْآخِرَةِ وَلَا يُكَلِّمُهُمُ اللَّهُ وَلَا يَنْظُرُ إِلَيْهِمْ يَوْمَ الْقِيَامَةِ وَلَا يُزَكِّيهِمْ وَلَهُمْ عَذَابٌ أَلِيمٌ",
          english: "Those who exchange the covenant of God, and their vows, for a small price, will have no share in the Hereafter, and God will not speak to them, nor will He look at them on the Day of Resurrection, nor will He purify them. They will have a painful punishment."
        },
        {
          number: 78,
          arabic: "وَإِنَّ مِنْهُمْ لَفَرِيقًا يَلْوُونَ أَلْسِنَتَهُمْ بِالْكِتَابِ لِتَحْسَبُوهُ مِنَ الْكِتَابِ وَمَا هُوَ مِنَ الْكِتَابِ وَيَقُولُونَ هُوَ مِنْ عِنْدِ اللَّهِ وَمَا هُوَ مِنْ عِنْدِ اللَّهِ وَيَقُولُونَ عَلَى اللَّهِ الْكَذِبَ وَهُمْ يَعْلَمُونَ",
          english: "And among them are those who twist the Scripture with their tongues, that you may think it from the Scripture, when it is not from the Scripture. And they say, 'It is from God,' when it is not from God. They tell lies and attribute them to God, knowingly."
        },
        {
          number: 79,
          arabic: "مَا كَانَ لِبَشَرٍ أَنْ يُؤْتِيَهُ اللَّهُ الْكِتَابَ وَالْحُكْمَ وَالنُّبُوَّةَ ثُمَّ يَقُولَ لِلنَّاسِ كُونُوا عِبَادًا لِي مِنْ دُونِ اللَّهِ وَلَكِنْ كُونُوا رَبَّانِيِّينَ بِمَا كُنْتُمْ تُعَلِّمُونَ الْكِتَابَ وَبِمَا كُنْتُمْ تَدْرُسُونَ",
          english: "No person to whom God has given the Scripture, and wisdom, and prophethood would ever say to the people, 'Be my worshipers rather than God's.' Rather, 'Be people of the Lord, according to the Scripture you teach, and the teachings you learn.'"
        },
        {
          number: 80,
          arabic: "وَلَا يَأْمُرَكُمْ أَنْ تَتَّخِذُوا الْمَلَائِكَةَ وَالنَّبِيِّينَ أَرْبَابًا أَيَأْمُرُكُمْ بِالْكُفْرِ بَعْدَ إِذْ أَنْتُمْ مُسْلِمُونَ",
          english: "Nor would he command you to take the angels and the prophets as lords. Would he command you to infidelity after you have submitted?"
        },
        {
          number: 81,
          arabic: "وَإِذْ أَخَذَ اللَّهُ مِيثَاقَ النَّبِيِّينَ لَمَا آتَيْتُكُمْ مِنْ كِتَابٍ وَحِكْمَةٍ ثُمَّ جَاءَكُمْ رَسُولٌ مُصَدِّقٌ لِمَا مَعَكُمْ لَتُؤْمِنُنَّ بِهِ وَلَتَنْصُرُنَّهُ قَالَ أَأَقْرَرْتُمْ وَأَخَذْتُمْ عَلَى ذَلِكُمْ إِصْرِي قَالُوا أَقْرَرْنَا قَالَ فَاشْهَدُوا وَأَنَا مَعَكُمْ مِنَ الشَّاهِدِينَ",
          english: "God received the covenant of the prophets, 'Inasmuch as I have given you of scripture and wisdom; should a messenger come to you verifying what you have, you shall believe in him, and support him.' He said, 'Do you affirm My covenant and take it upon yourselves?' They said, 'We affirm it.' He said, 'Then bear witness, and I am with you among the witnesses.'"
        },
        {
          number: 82,
          arabic: "فَمَنْ تَوَلَّى بَعْدَ ذَلِكَ فَأُولَئِكَ هُمُ الْفَاسِقُونَ",
          english: "Whoever turns away after that—these are the deceitful."
        },
        {
          number: 83,
          arabic: "أَفَغَيْرَ دِينِ اللَّهِ يَبْغُونَ وَلَهُ أَسْلَمَ مَنْ فِي السَّمَاوَاتِ وَالْأَرْضِ طَوْعًا وَكَرْهًا وَإِلَيْهِ يُرْجَعُونَ",
          english: "Do they desire other than the religion of God, when to Him has submitted everything in the heavens and the earth, willingly or unwillingly, and to Him they will be returned?"
        },
        {
          number: 84,
          arabic: "قُلْ آمَنَّا بِاللَّهِ وَمَا أُنْزِلَ عَلَيْنَا وَمَا أُنْزِلَ عَلَى إِبْرَاهِيمَ وَإِسْمَاعِيلَ وَإِسْحَاقَ وَيَعْقُوبَ وَالْأَسْبَاطِ وَمَا أُوتِيَ مُوسَى وَعِيسَى وَالنَّبِيُّونَ مِنْ رَبِّهِمْ لَا نُفَرِّقُ بَيْنَ أَحَدٍ مِنْهُمْ وَنَحْنُ لَهُ مُسْلِمُونَ",
          english: "Say, 'We believe in God, and in what was revealed to us; and in what was revealed to Abraham, and Ishmael, and Isaac, and Jacob, and the Patriarchs; and in what was given to Moses, and Jesus, and the prophets from their Lord. We make no distinction between any of them, and to Him we submit.'"
        },
        {
          number: 85,
          arabic: "وَمَنْ يَبْتَغِ غَيْرَ الْإِسْلَامِ دِينًا فَلَنْ يُقْبَلَ مِنْهُ وَهُوَ فِي الْآخِرَةِ مِنَ الْخَاسِرِينَ",
          english: "Whoever seeks other than Islam as a religion, it will not be accepted from him, and in the Hereafter he will be among the losers."
        },
        {
          number: 86,
          arabic: "كَيْفَ يَهْدِي اللَّهُ قَوْمًا كَفَرُوا بَعْدَ إِيمَانِهِمْ وَشَهِدُوا أَنَّ الرَّسُولَ حَقٌّ وَجَاءَهُمُ الْبَيِّنَاتُ وَاللَّهُ لَا يَهْدِي الْقَوْمَ الظَّالِمِينَ",
          english: "How will God guide a people who disbelieved after having believed, and had witnessed that the Messenger is true, and the clear proofs had come to them? God does not guide the unjust people."
        },
        {
          number: 87,
          arabic: "أُولَئِكَ جَزَاؤُهُمْ أَنَّ عَلَيْهِمْ لَعْنَةَ اللَّهِ وَالْمَلَائِكَةِ وَالنَّاسِ أَجْمَعِينَ",
          english: "Those—their penalty is that upon them falls the curse of God, and of the angels, and of all mankind."
        },
        {
          number: 88,
          arabic: "خَالِدِينَ فِيهَا لَا يُخَفَّفُ عَنْهُمُ الْعَذَابُ وَلَا هُمْ يُنْظَرُونَ",
          english: "Remaining in it eternally, without their punishment being eased from them, and without being reprieved."
        },
        {
          number: 89,
          arabic: "إِلَّا الَّذِينَ تَابُوا مِنْ بَعْدِ ذَلِكَ وَأَصْلَحُوا فَإِنَّ اللَّهَ غَفُورٌ رَحِيمٌ",
          english: "Except those who repent afterwards, and reform; for God is Forgiving and Merciful."
        },
        {
          number: 90,
          arabic: "إِنَّ الَّذِينَ كَفَرُوا بَعْدَ إِيمَانِهِمْ ثُمَّ ازْدَادُوا كُفْرًا لَنْ تُقْبَلَ تَوْبَتُهُمْ وَأُولَئِكَ هُمُ الضَّالُّونَ",
          english: "As for those who disbelieve after having believed, then plunge deeper into disbelief, their repentance will not be accepted; these are the lost."
        },
        {
          number: 91,
          arabic: "إِنَّ الَّذِينَ كَفَرُوا وَمَاتُوا وَهُمْ كُفَّارٌ فَلَنْ يُقْبَلَ مِنْ أَحَدِهِمْ مِلْءُ الْأَرْضِ ذَهَبًا وَلَوِ افْتَدَى بِهِ أُولَئِكَ لَهُمْ عَذَابٌ أَلِيمٌ وَمَا لَهُمْ مِنْ نَاصِرِينَ",
          english: "As for those who disbelieve and die disbelievers, even the earth full of gold would not be accepted from any of them, were he to offer it for ransom. These will have a painful torment, and will have no saviors."
        },
        {
          number: 92,
          arabic: "لَنْ تَنَالُوا الْبِرَّ حَتَّى تُنْفِقُوا مِمَّا تُحِبُّونَ وَمَا تُنْفِقُوا مِنْ شَيْءٍ فَإِنَّ اللَّهَ بِهِ عَلِيمٌ",
          english: "You will not attain virtuous conduct until you give of what you cherish. Whatever you give away, God is aware of it."
        },
        {
          number: 93,
          arabic: "كُلُّ الطَّعَامِ كَانَ حِلًّا لِبَنِي إِسْرَائِيلَ إِلَّا مَا حَرَّمَ إِسْرَائِيلُ عَلَى نَفْسِهِ مِنْ قَبْلِ أَنْ تُنَزَّلَ التَّوْرَاةُ قُلْ فَأْتُوا بِالتَّوْرَاةُ فَاتْلُوهَا إِنْ كُنْتُمْ صَادِقِينَ",
          english: "All food was permissible to the Children of Israel, except what Israel forbade for itself before the Torah was revealed. Say, 'Bring the Torah, and read it, if you are truthful.'"
        },
        {
          number: 94,
          arabic: "فَمَنِ افْتَرَى عَلَى اللَّهِ الْكَذِبَ مِنْ بَعْدِ ذَلِكَ فَأُولَئِكَ هُمُ الظَّالِمُونَ",
          english: "Whoever forges lies about God after that—these are the unjust."
        },
        {
          number: 95,
          arabic: "قُلْ صَدَقَ اللَّهُ فَاتَّبِعُوا مِلَّةَ إِبْرَاهِيمَ حَنِيفًا وَمَا كَانَ مِنَ الْمُشْرِكِينَ",
          english: "Say, 'God has spoken the truth, so follow the religion of Abraham the Monotheist; he was not a Pagan.'"
        },
        {
          number: 96,
          arabic: "إِنَّ أَوَّلَ بَيْتٍ وُضِعَ لِلنَّاسِ لَلَّذِي بِبَكَّةَ مُبَارَكًا وَهُدًى لِلْعَالَمِينَ",
          english: "The first house established for mankind is the one at Bekka; blessed, and guidance for all people."
        },
        {
          number: 97,
          arabic: "فِيهِ آيَاتٌ بَيِّنَاتٌ مَقَامُ إِبْرَاهِيمَ وَمَنْ دَخَلَهُ كَانَ آمِنًا وَلِلَّهِ عَلَى النَّاسِ حِجُّ الْبَيْتِ مَنِ اسْتَطَاعَ إِلَيْهِ سَبِيلًا وَمَنْ كَفَرَ فَإِنَّ اللَّهَ غَنِيٌّ عَنِ الْعَالَمِينَ",
          english: "In it are evident signs; the Station of Abraham. Whoever enters it attains security. Pilgrimage to the House is a duty to God for all who can make the journey. But as for those who refuse—God is Independent of the worlds."
        },
        {
          number: 98,
          arabic: "قُلْ يَا أَهْلَ الْكِتَابِ لِمَ تَكْفُرُونَ بِآيَاتِ اللَّهِ وَاللَّهُ شَهِيدٌ عَلَى مَا تَعْمَلُونَ",
          english: "Say, 'O People of the Scripture, why do you reject the Revelations of God, when God witnesses what you do?'"
        },
        {
          number: 99,
          arabic: "قُلْ يَا أَهْلَ الْكِتَابِ لِمَ تَصُدُّونَ عَنْ سَبِيلِ اللَّهِ مَنْ آمَنَ تَبْغُونَهَا عِوَجًا وَأَنْتُمْ شُهَدَاءُ وَمَا اللَّهُ بِغَافِلٍ عَمَّا تَعْمَلُونَ",
          english: "Say, 'O People of the Scripture, why do you hinder from God's path those who believe, seeking to distort it, even though you are witnesses? God is not unaware of what you do.'"
        },
        {
          number: 100,
          arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا إِنْ تُطِيعُوا فَرِيقًا مِنَ الَّذِينَ أُوتُوا الْكِتَابَ يَرُدُّوكُمْ بَعْدَ إِيمَانِكُمْ كَافِرِينَ",
          english: "O you who believe! If you obey a party of those who were given the Scripture, they will turn you, after your belief, into disbelievers."
        },
        {
          number: 101,
          arabic: "وَكَيْفَ تَكْفُرُونَ وَأَنْتُمْ تُتْلَى عَلَيْكُمْ آيَاتُ اللَّهِ وَفِيكُمْ رَسُولُهُ وَمَنْ يَعْتَصِمْ بِاللَّهِ فَقَدْ هُدِيَ إِلَى صِرَاطٍ مُسْتَقِيمٍ",
          english: "And how could you disbelieve, when God's revelations are being recited to you, and among you is His Messenger? Whoever cleaves to God has been guided to a straight path."
        },
        {
          number: 102,
          arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا اتَّقُوا اللَّهَ حَقَّ تُقَاتِهِ وَلَا تَمُوتُنَّ إِلَّا وَأَنْتُمْ مُسْلِمُونَ",
          english: "O you who believe! Revere God with due reverence, and do not die except as Muslims."
        },
        {
          number: 103,
          arabic: "وَاعْتَصِمُوا بِحَبْلِ اللَّهِ جَمِيعًا وَلَا تَفَرَّقُوا وَاذْكُرُوا نِعْمَتَ اللَّهِ عَلَيْكُمْ إِذْ كُنْتُمْ أَعْدَاءً فَأَلَّفَ بَيْنَ قُلُوبِكُمْ فَأَصْبَحْتُمْ بِنِعْمَتِهِ إِخْوَانًا وَكُنْتُمْ عَلَى شَفَا حُفْرَةٍ مِنَ النَّارِ فَأَنْقَذَكُمْ مِنْهَا كَذَلِكَ يُبَيِّنُ اللَّهُ لَكُمْ آيَاتِهِ لَعَلَّكُمْ تَهْتَدُونَ",
          english: "And hold fast to the rope of God, altogether, and do not become divided. And remember God's blessings upon you; how you were enemies, and He reconciled your hearts, and by His grace you became brethren. And you were on the brink of a pit of fire, and He saved you from it. God thus clarifies His revelations for you, so that you may be guided."
        },
        {
          number: 104,
          arabic: "وَلْتَكُنْ مِنْكُمْ أُمَّةٌ يَدْعُونَ إِلَى الْخَيْرِ وَيَأْمُرُونَ بِالْمَعْرُوفِ وَيَنْهَوْنَ عَنِ الْمُنْكَرِ وَأُولَئِكَ هُمُ الْمُفْلِحُونَ",
          english: "And let there be among you a community calling to virtue, and advocating righteousness, and deterring from evil. These are the successful."
        },
        {
          number: 105,
          arabic: "وَلَا تَكُونُوا كَالَّذِينَ تَفَرَّقُوا وَاخْتَلَفُوا مِنْ بَعْدِ مَا جَاءَهُمُ الْبَيِّنَاتُ وَأُولَئِكَ لَهُمْ عَذَابٌ عَظِيمٌ",
          english: "And do not be like those who separated and disputed after the clear proofs came to them; for them is a great punishment."
        },
        {
          number: 106,
          arabic: "يَوْمَ تَبْيَضُّ وُجُوهٌ وَتَسْوَدُّ وُجُوهٌ فَأَمَّا الَّذِينَ اسْوَدَّتْ وُجُوهُهُمْ أَكَفَرْتُمْ بَعْدَ إِيمَانِكُمْ فَذُوقُوا الْعَذَابَ بِمَا كُنْتُمْ تَكْفُرُونَ",
          english: "On the Day when some faces will be whitened, and some faces will be blackened. As for those whose faces are blackened: 'Did you disbelieve after your belief?' Then taste the punishment for having disbelieved."
        },
        {
          number: 107,
          arabic: "وَأَمَّا الَّذِينَ ابْيَضَّتْ وُجُوهُهُمْ فَفِي رَحْمَةِ اللَّهِ هُمْ فِيهَا خَالِدُونَ",
          english: "But as for those whose faces are whitened: they are in God's mercy, remaining in it forever."
        },
        {
          number: 108,
          arabic: "تِلْكَ آيَاتُ اللَّهِ نَتْلُوهَا عَلَيْكَ بِالْحَقِّ وَمَا اللَّهُ يُرِيدُ ظُلْمًا لِلْعَالَمِينَ",
          english: "These are the revelations of God. We recite them to you in truth. God desires no injustice for mankind."
        },
        {
          number: 109,
          arabic: "وَلِلَّهِ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ وَإِلَى اللَّهِ تُرْجَعُ الْأُمُورُ",
          english: "To God belongs everything in the heavens and everything on earth, and to God all events are referred."
        },
        {
          number: 110,
          arabic: "كُنْتُمْ خَيْرَ أُمَّةٍ أُخْرِجَتْ لِلنَّاسِ تَأْمُرُونَ بِالْمَعْرُوفِ وَتَنْهَوْنَ عَنِ الْمُنْكَرِ وَتُؤْمِنُونَ بِاللَّهِ وَلَوْ آمَنَ أَهْلُ الْكِتَابِ لَكَانَ خَيْرًا لَهُمْ مِنْهُمُ الْمُؤْمِنُونَ وَأَكْثَرُهُمُ الْفَاسِقُونَ",
          english: "You are the best community that ever emerged for humanity: you advocate what is moral, and forbid what is immoral, and believe in God. Had the People of the Scripture believed, it would have been better for them. Among them are the believers, but most of them are sinners."
        },
        {
          number: 111,
          arabic: "لَنْ يَضُرُّوكُمْ إِلَّا أَذًى وَإِنْ يُقَاتِلُوكُمْ يُوَلُّوكُمُ الْأَدْبَارَ ثُمَّ لَا يُنْصَرُونَ",
          english: "They will do you no harm, beyond insulting you. And if they fight you, they will turn around and flee, then they will not be helped."
        },
        {
          number: 112,
          arabic: "ضُرِبَتْ عَلَيْهِمُ الذِّلَّةُ أَيْنَ مَا ثُقِفُوا إِلَّا بِحَبْلٍ مِنَ اللَّهِ وَحَبْلٍ مِنَ النَّاسِ وَبَاءُوا بِغَضَبٍ مِنَ اللَّهِ وَضُرِبَتْ عَلَيْهِمُ الْمَسْكَنَةُ ذَلِكَ بِأَنَّهُمْ كَانُوا يَكْفُرُونَ بِآيَاتِ اللَّهِ وَيَقْتُلُونَ الْأَنْبِيَاءَ بِغَيْرِ حَقٍّ ذَلِكَ بِمَا عَصَوْا وَكَانُوا يَعْتَدُونَ",
          english: "They shall be humiliated wherever they are encountered, except through a rope from God, and a rope from the people; and they incurred wrath from God, and were stricken with misery. That is because they rejected God's revelations, and killed the prophets unjustly. That is because they rebelled and committed aggression."
        },
        {
          number: 113,
          arabic: "لَيْسُوا سَوَاءً مِنْ أَهْلِ الْكِتَابِ أُمَّةٌ قَائِمَةٌ يَتْلُونَ آيَاتِ اللَّهِ آنَاءَ اللَّيْلِ وَهُمْ يَسْجُدُونَ",
          english: "They are not alike. Among the People of the Scripture is a community that is upright; they recite God's revelations throughout the night, and they prostrate themselves."
        },
        {
          number: 114,
          arabic: "يُؤْمِنُونَ بِاللَّهِ وَالْيَوْمِ الْآخِرِ وَيَأْمُرُونَ بِالْمَعْرُوفِ وَيَنْهَوْنَ عَنِ الْمُنْكَرِ وَيُسَارِعُونَ فِي الْخَيْرَاتِ وَأُولَئِكَ مِنَ الصَّالِحِينَ",
          english: "They believe in God and the Last Day, and advocate righteousness and forbid evil, and are quick to do good deeds. These are among the righteous."
        },
        {
          number: 115,
          arabic: "وَمَا يَفْعَلُوا مِنْ خَيْرٍ فَلَنْ يُكْفَرُوهُ وَاللَّهُ عَلِيمٌ بِالْمُتَّقِينَ",
          english: "Whatever good they do, they will not be denied it. God knows the righteous."
        },
        {
          number: 116,
          arabic: "إِنَّ الَّذِينَ كَفَرُوا لَنْ تُغْنِيَ عَنْهُمْ أَمْوَالُهُمْ وَلَا أَوْلَادُهُمْ مِنَ اللَّهِ شَيْئًا وَأُولَئِكَ أَصْحَابُ النَّارِ هُمْ فِيهَا خَالِدُونَ",
          english: "As for those who disbelieve, neither their possessions nor their children will avail them anything against God. These are the inhabitants of the Fire, abiding therein forever."
        },
        {
          number: 117,
          arabic: "مَثَلُ مَا يُنْفِقُونَ فِي هَذِهِ الْحَيَاةِ الدُّنْيَا كَمَثَلِ رِيحٍ فِيهَا صِرٌّ أَصَابَتْ حَرْثَ قَوْمٍ ظَلَمُوا أَنْفُسَهُمْ فَأَهْلَكَتْهُ وَمَا ظَلَمَهُمُ اللَّهُ وَلَكِنْ أَنْفُسَهُمْ يَظْلِمُونَ",
          english: "The parable of what they spend in this worldly life is that of a frosty wind that strikes the harvest of a people who have wronged their souls, and destroys it. God did not wrong them, but they wronged their own selves."
        },
        {
          number: 118,
          arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا لَا تَتَّخِذُوا بِطَانَةً مِنْ دُونِكُمْ لَا يَأْلُونَكُمْ خَبَالًا وَدُّوا مَا عَنِتُّمْ قَدْ بَدَتِ الْبَغْضَاءُ مِنْ أَفْوَاهِهِمْ وَمَا تُخْفِي صُدُورُهُمْ أَكْبَرُ قَدْ بَيَّنَّا لَكُمُ الْآيَاتِ إِنْ كُنْتُمْ تَعْقِلُونَ",
          english: "O you who believe! Do not befriend outsiders who never cease to wish you harm. They love to see you suffer. Hatred has already appeared from their mouths, but what their hearts conceal is worse. We have made the messages clear for you, if you understand."
        },
        {
          number: 119,
          arabic: "هَا أَنْتُمْ أُولَاءِ تُحِبُّونَهُمْ وَلَا يُحِبُّونَكُمْ وَتُؤْمِنُونَ بِالْكِتَابِ كُلِّهِ وَإِذَا لَقُوكُمْ قَالُوا آمَنَّا وَإِذَا خَلَوْا عَضُّوا عَلَيْكُمُ الْأَنَامِلَ مِنَ الْغَيْظِ قُلْ مُوتُوا بِغَيْظِكُمْ إِنَّ اللَّهَ عَلِيمٌ بِذَاتِ الصُّدُورِ",
          english: "There you are, you love them, but they do not love you, and you believe in the entire scripture. And when they meet you, they say, 'We believe;' but when they are alone, they bite their fingers in rage at you. Say, 'Die in your rage; God knows what is within the hearts.'"
        },
        {
          number: 120,
          arabic: "إِنْ تَمْسَسْكُمْ حَسَنَةٌ تَسُؤْهُمْ وَإِنْ تُصِبْكُمْ سَيِّئَةٌ يَفْرَحُوا بِهَا وَإِنْ تَصْبِرُوا وَتَتَّقُوا لَا يَضُرُّكُمْ كَيْدُهُمْ شَيْئًا إِنَّ اللَّهَ بِمَا يَعْمَلُونَ مُحِيطٌ",
          english: "If something good happens to you, it upsets them; but if something bad befalls you, they rejoice at it. But if you persevere and maintain righteousness, their schemes will not harm you at all. God comprehends what they do."
        },
        {
          number: 121,
          arabic: "وَإِذْ غَدَوْتَ مِنْ أَهْلِكَ تُبَوِّئُ الْمُؤْمِنِينَ مَقَاعِدَ لِلْقِتَالِ وَاللَّهُ سَمِيعٌ عَلِيمٌ",
          english: "Remember when you left your home in the morning, to assign battle-positions for the believers. God is Hearing and Knowing."
        },
        {
          number: 122,
          arabic: "إِذْ هَمَّتْ طَائِفَتَانِ مِنْكُمْ أَنْ تَفْشَلَا وَاللَّهُ وَلِيُّهُمَا وَعَلَى اللَّهِ فَلْيَتَوَكَّلِ الْمُؤْمِنُونَ",
          english: "When two groups among you almost faltered, but God was their Protector. So in God let the believers put their trust."
        },
        {
          number: 123,
          arabic: "وَلَقَدْ نَصَرَكُمُ اللَّهُ بِبَدْرٍ وَأَنْتُمْ أَذِلَّةٌ فَاتَّقُوا اللَّهَ لَعَلَّكُمْ تَشْكُرُونَ",
          english: "God had given you victory at Badr, when you were weak. So fear God, that you may be thankful."
        },
        {
          number: 124,
          arabic: "إِذْ تَقُولُ لِلْمُؤْمِنِينَ أَلَنْ يَكْفِيَكُمْ أَنْ يُمِدَّكُمْ رَبُّكُمْ بِثَلَاثَةِ آلَافٍ مِنَ الْمَلَائِكَةِ مُنْزَلِينَ",
          english: "When you said to the believers, 'Is it not enough for you that your Lord has reinforced you with three thousand angels, sent down?'"
        },
        {
          number: 125,
          arabic: "بَلَى إِنْ تَصْبِرُوا وَتَتَّقُوا وَيَأْتُوكُمْ مِنْ فَوْرِهِمْ هَذَا يُمْدِدْكُمْ رَبُّكُمْ بِخَمْسَةِ آلَافٍ مِنَ الْمَلَائِكَةِ مُسَوِّمِينَ",
          english: "It is; but if you persevere and remain cautious, and they attack you suddenly, your Lord will reinforce you with five thousand angels, well trained."
        },
        {
          number: 126,
          arabic: "وَمَا جَعَلَهُ اللَّهُ إِلَّا بُشْرَى لَكُمْ وَلِتَطْمَئِنَّ قُلُوبُكُمْ بِهِ وَمَا النَّصْرُ إِلَّا مِنْ عِنْدِ اللَّهِ الْعَزِيزِ الْحَكِيمِ",
          english: "God made it but a message of hope for you, and to reassure your hearts thereby. Victory comes only from God the Almighty, the Wise."
        },
        {
          number: 127,
          arabic: "لِيَقْطَعَ طَرَفًا مِنَ الَّذِينَ كَفَرُوا أَوْ يَكْبِتَهُمْ فَيَنْقَلِبُوا خَائِبِينَ",
          english: "He thus cuts off a section of those who disbelieved, or subdues them, so they retreat disappointed."
        },
        {
          number: 128,
          arabic: "لَيْسَ لَكَ مِنَ الْأَمْرِ شَيْءٌ أَوْ يَتُوبَ عَلَيْهِمْ أَوْ يُعَذِّبَهُمْ فَإِنَّهُمْ ظَالِمُونَ",
          english: "It is no concern of yours whether He redeems them or punishes them. They are wrongdoers."
        },
        {
          number: 129,
          arabic: "وَلِلَّهِ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ يَغْفِرُ لِمَنْ يَشَاءُ وَيُعَذِّبُ مَنْ يَشَاءُ وَاللَّهُ غَفُورٌ رَحِيمٌ",
          english: "To God belongs everything in the heavens and the earth. He forgives whom He wills, and He punishes whom He wills. God is Most Forgiving, Most Merciful."
        },
        {
          number: 130,
          arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا لَا تَأْكُلُوا الرِّبَا أَضْعَافًا مُضَاعَفَةً وَاتَّقُوا اللَّهَ لَعَلَّكُمْ تُفْلِحُونَ",
          english: "O you who believe! Do not feed on usury, compounded over and over, and fear God, so that you may prosper."
        },
        {
          number: 131,
          arabic: "وَاتَّقُوا النَّارَ الَّتِي أُعِدَّتْ لِلْكَافِرِينَ",
          english: "And guard yourselves against the Fire that is prepared for the disbelievers."
        },
        {
          number: 132,
          arabic: "وَأَطِيعُوا اللَّهَ وَالرَّسُولَ لَعَلَّكُمْ تُرْحَمُونَ",
          english: "And obey God and the Messenger, that you may obtain mercy."
        },
        {
          number: 133,
          arabic: "وَسَارِعُوا إِلَى مَغْفِرَةٍ مِنْ رَبِّكُمْ وَجَنَّةٍ عَرْضُهَا السَّمَاوَاتُ وَالْأَرْضُ أُعِدَّتْ لِلْمُتَّقِينَ",
          english: "And race towards forgiveness from your Lord, and a Garden as wide as the heavens and the earth, prepared for the righteous."
        },
        {
          number: 134,
          arabic: "الَّذِينَ يُنْفِقُونَ فِي السَّرَّاءِ وَالضَّرَّاءِ وَالْكَاظِمِينَ الْغَيْظَ وَالْعَافِينَ عَنِ النَّاسِ وَاللَّهُ يُحِبُّ الْمُحْسِنِينَ",
          english: "Those who give in prosperity and adversity, and those who restrain anger, and those who forgive people. God loves the doers of good."
        },
        {
          number: 135,
          arabic: "وَالَّذِينَ إِذَا فَعَلُوا فَاحِشَةً أَوْ ظَلَمُوا أَنْفُسَهُمْ ذَكَرُوا اللَّهَ فَاسْتَغْفَرُوا لِذُنُوبِهِمْ وَمَنْ يَغْفِرُ الذُّنُوبَ إِلَّا اللَّهُ وَلَمْ يُصِرُّوا عَلَى مَا فَعَلُوا وَهُمْ يَعْلَمُونَ",
          english: "And those who, when they commit an indecency or wrong themselves, remember God and ask forgiveness for their sins—and who forgives sins except God? And they do not persist in their wrongdoing while they know."
        },
        {
          number: 136,
          arabic: "أُولَئِكَ جَزَاؤُهُمْ مَغْفِرَةٌ مِنْ رَبِّهِمْ وَجَنَّاتٌ تَجْرِي مِنْ تَحْتِهَا الْأَنْهَارُ خَالِدِينَ فِيهَا وَنِعْمَ أَجْرُ الْعَامِلِينَ",
          english: "Those—their reward is forgiveness from their Lord, and gardens beneath which rivers flow, abiding therein forever. How excellent is the reward of the workers."
        },
        {
          number: 137,
          arabic: "قَدْ خَلَتْ مِنْ قَبْلِكُمْ سُنَنٌ فَسِيرُوا فِي الْأَرْضِ فَانْظُرُوا كَيْفَ كَانَ عَاقِبَةُ الْمُكَذِّبِينَ",
          english: "Many societies have passed away before you. So travel the earth and note the fate of the deniers."
        },
        {
          number: 138,
          arabic: "هَذَا بَيَانٌ لِلنَّاسِ وَهُدًى وَمَوْعِظَةٌ لِلْمُتَّقِينَ",
          english: "This is a proclamation to humanity, and guidance, and advice for the righteous."
        },
        {
          number: 139,
          arabic: "وَلَا تَهِنُوا وَلَا تَحْزَنُوا وَأَنْتُمُ الْأَعْلَوْنَ إِنْ كُنْتُمْ مُؤْمِنِينَ",
          english: "And do not waver, nor feel remorse. You are the superior ones, if you are believers."
        },
        {
          number: 140,
          arabic: "إِنْ يَمْسَسْكُمْ قَرْحٌ فَقَدْ مَسَّ الْقَوْمَ قَرْحٌ مِثْلُهُ وَتِلْكَ الْأَيَّامُ نُدَاوِلُهَا بَيْنَ النَّاسِ وَلِيَعْلَمَ اللَّهُ الَّذِينَ آمَنُوا وَيَتَّخِذَ مِنْكُمْ شُهَدَاءَ وَاللَّهُ لَا يُحِبُّ الظَّالِمِينَ",
          english: "If a wound afflicts you, a similar wound has afflicted the others. Such days We alternate between the people, that God may know those who believe, and take martyrs from among you. God does not love the evildoers."
        },
        {
          number: 141,
          arabic: "وَلِيُمَحِّصَ اللَّهُ الَّذِينَ آمَنُوا وَيَمْحَقَ الْكَافِرِينَ",
          english: "So that God may prove those who believe, and eliminate the disbelievers."
        },
        {
          number: 142,
          arabic: "أَمْ حَسِبْتُمْ أَنْ تَدْخُلُوا الْجَنَّةَ وَلَمَّا يَعْلَمِ اللَّهُ الَّذِينَ جَاهَدُوا مِنْكُمْ وَيَعْلَمَ الصَّابِرِينَ",
          english: "Or do you expect to enter Paradise, before God has distinguished those among you who strive, and before He has distinguished the steadfast?"
        },
        {
          number: 143,
          arabic: "وَلَقَدْ كُنْتُمْ تَمَنَّوْنَ الْمَوْتَ مِنْ قَبْلِ أَنْ تَلْقَوْهُ فَقَدْ رَأَيْتُمُوهُ وَأَنْتُمْ تَنْظُرُونَ",
          english: "You used to wish for death before you have faced it. Now you have seen it before your own eyes."
        },
        {
          number: 144,
          arabic: "وَمَا مُحَمَّدٌ إِلَّا رَسُولٌ قَدْ خَلَتْ مِنْ قَبْلِهِ الرُّسُلُ أَفَإِنْ مَاتَ أَوْ قُتِلَ انْقَلَبْتُمْ عَلَى أَعْقَابِكُمْ وَمَنْ يَنْقَلِبْ عَلَى عَقِبَيْهِ فَلَنْ يَضُرَّ اللَّهَ شَيْئًا وَسَيَجْزِي اللَّهُ الشَّاكِرِينَ",
          english: "Muhammad is no more than a messenger. Messengers have passed on before him. If he dies or gets killed, will you turn on your heels? He who turns on his heels will not harm God in any way. And God will reward the appreciative."
        },
        {
          number: 145,
          arabic: "وَمَا كَانَ لِنَفْسٍ أَنْ تَمُوتَ إِلَّا بِإِذْنِ اللَّهِ كِتَابًا مُؤَجَّلًا وَمَنْ يُرِدْ ثَوَابَ الدُّنْيَا نُؤْتِهِ مِنْهَا وَمَنْ يُرِدْ ثَوَابَ الْآخِرَةِ نُؤْتِهِ مِنْهَا وَسَنَجْزِي الشَّاكِرِينَ",
          english: "No soul can die except by God's leave, at a predetermined time. Whoever desires the reward of the world, We will give him some of it; and whoever desires the reward of the Hereafter, We will give him some of it; and We will reward the appreciative."
        },
        {
          number: 146,
          arabic: "وَكَأَيِّنْ مِنْ نَبِيٍّ قَاتَلَ مَعَهُ رِبِّيُّونَ كَثِيرٌ فَمَا وَهَنُوا لِمَا أَصَابَهُمْ فِي سَبِيلِ اللَّهِ وَمَا ضَعُفُوا وَمَا اسْتَكَانُوا وَاللَّهُ يُحِبُّ الصَّابِرِينَ",
          english: "How many a prophet fought alongside him numerous godly people? They did not waver for what afflicted them in the cause of God, nor did they weaken, nor did they give in. God loves those who endure."
        },
        {
          number: 147,
          arabic: "وَمَا كَانَ قَوْلَهُمْ إِلَّا أَنْ قَالُوا رَبَّنَا اغْفِرْ لَنَا ذُنُوبَنَا وَإِسْرَافَنَا فِي أَمْرِنَا وَثَبِّتْ أَقْدَامَنَا وَانْصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ",
          english: "Their only words were, 'Our Lord, forgive us our offences, and our excesses in our conduct, and strengthen our foothold, and help us against the disbelieving people.'"
        },
        {
          number: 148,
          arabic: "فَآتَاهُمُ اللَّهُ ثَوَابَ الدُّنْيَا وَحُسْنَ ثَوَابِ الْآخِرَةِ وَاللَّهُ يُحِبُّ الْمُحْسِنِينَ",
          english: "So God gave them the reward of this world, and the excellent reward of the Hereafter. God loves the doers of good."
        },
        {
          number: 149,
          arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا إِنْ تُطِيعُوا الَّذِينَ كَفَرُوا يَرُدُّوكُمْ عَلَى أَعْقَابِكُمْ فَتَنْقَلِبُوا خَاسِرِينَ",
          english: "O you who believe! If you obey those who disbelieve, they will turn you back on your heels, and you end up losers."
        },
        {
          number: 150,
          arabic: "بَلِ اللَّهُ مَوْلَاكُمْ وَهُوَ خَيْرُ النَّاصِرِينَ",
          english: "God is your Master, and He is the Best of Helpers."
        },
        {
          number: 151,
          arabic: "سَنُلْقِي فِي قُلُوبِ الَّذِينَ كَفَرُوا الرُّعْبَ بِمَا أَشْرَكُوا بِاللَّهِ مَا لَمْ يُنَزِّلْ بِهِ سُلْطَانًا وَمَأْوَاهُمُ النَّارُ وَبِئْسَ مَثْوَى الظَّالِمِينَ",
          english: "We will throw terror into the hearts of those who disbelieve, because they attribute to God partners for which He revealed no sanction. Their lodging is the Fire. Miserable is the lodging of the evildoers."
        },
        {
          number: 152,
          arabic: "وَلَقَدْ صَدَقَكُمُ اللَّهُ وَعْدَهُ إِذْ تَحُسُّونَهُمْ بِإِذْنِهِ حَتَّى إِذَا فَشِلْتُمْ وَتَنَازَعْتُمْ فِي الْأَمْرِ وَعَصَيْتُمْ مِنْ بَعْدِ مَا أَرَاكُمْ مَا تُحِبُّونَ مِنْكُمْ مَنْ يُرِيدُ الدُّنْيَا وَمِنْكُمْ مَنْ يُرِيدُ الْآخِرَةَ ثُمَّ صَرَفَكُمْ عَنْهُمْ لِيَبْتَلِيَكُمْ وَلَقَدْ عَفَا عَنْكُمْ وَاللَّهُ ذُو فَضْلٍ عَلَى الْمُؤْمِنِينَ",
          english: "God has fulfilled His promise to you, and you defeated them by His leave; until when you faltered, and disputed the command, and disobeyed after He had shown you what you like. Some of you want this world, and some of you want the next. Then He turned you away from them, to test you; but He pardoned you. God is Gracious towards the believers."
        },
        {
          number: 153,
          arabic: "إِذْ تُصْعِدُونَ وَلَا تَلْوُونَ عَلَى أَحَدٍ وَالرَّسُولُ يَدْعُوكُمْ فِي أُخْرَاكُمْ فَأَثَابَكُمْ غَمًّا بِغَمٍّ لِكَيْلَا تَحْزَنُوا عَلَى مَا فَاتَكُمْ وَلَا مَا أَصَابَكُمْ وَاللَّهُ خَبِيرٌ بِمَا تَعْمَلُونَ",
          english: "Remember when you fled, not caring for anyone, even though the Messenger was calling you from your rear. Then He repaid you with sorrow upon sorrow, so that you would not grieve over what you missed, or for what afflicted you. God is Informed of what you do."
        },
        {
          number: 154,
          arabic: "ثُمَّ أَنْزَلَ عَلَيْكُمْ مِنْ بَعْدِ الْغَمِّ أَمَنَةً نُعَاسًا يَغْشَى طَائِفَةً مِنْكُمْ وَطَائِفَةٌ قَدْ أَهَمَّتْهُمْ أَنْفُسُهُمْ يَظُنُّونَ بِاللَّهِ غَيْرَ الْحَقِّ ظَنَّ الْجَاهِلِيَّةِ يَقُولُونَ هَلْ لَنَا مِنَ الْأَمْرِ مِنْ شَيْءٍ قُلْ إِنَّ الْأَمْرَ كُلَّهُ لِلَّهِ يُخْفُونَ فِي أَنْفُسِهِمْ مَا لَا يُبْدُونَ لَكَ يَقُولُونَ لَوْ كَانَ لَنَا مِنَ الْأَمْرِ شَيْءٌ مَا قُتِلْنَا هَاهُنَا قُلْ لَوْ كُنْتُمْ فِي بُيُوتِكُمْ لَبَرَزَ الَّذِينَ كُتِبَ عَلَيْهِمُ الْقَتْلُ إِلَى مَضَاجِعِهِمْ وَلِيَبْتَلِيَ اللَّهُ مَا فِي صُدُورِكُمْ وَلِيُمَحِّصَ مَا فِي قُلُوبِكُمْ وَاللَّهُ عَلِيمٌ بِذَاتِ الصُّدُورِ",
          english: "Then after the setback, He sent down security upon you. Slumber overcame some of you, while others cared only for themselves, thinking of God thoughts that were untrue—thoughts of ignorance—saying, 'Is anything up to us?' Say, 'Everything is up to God.' They conceal within themselves what they do not reveal to you. And they say, 'If it was up to us, none of us would have been killed here.' Say, 'Even if you Had stayed in your homes, those destined to be killed would have marched into their death beds.' God thus tests what is in your minds, and purifies what is in your hearts. God knows what the hearts contain."
        },
        {
          number: 155,
          arabic: "إِنَّ الَّذِينَ تَوَلَّوْا مِنْكُمْ يَوْمَ الْتَقَى الْجَمْعَانِ إِنَّمَا اسْتَزَلَّهُمُ الشَّيْطَانُ بِبَعْضِ مَا كَسَبُوا وَلَقَدْ عَفَا اللَّهُ عَنْهُمْ إِنَّ اللَّهَ غَفُورٌ حَلِيمٌ",
          english: "Those of you who turned back on the day when the two armies clashed—it was Satan who caused them to backslide, on account of some of what they have earned. But God has forgiven them. God is Forgiving and Prudent."
        },
        {
          number: 156,
          arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا لَا تَكُونُوا كَالَّذِينَ كَفَرُوا وَقَالُوا لِإِخْوَانِهِمْ إِذَا ضَرَبُوا فِي الْأَرْضِ أَوْ كَانُوا غُزًّى لَوْ كَانُوا عِنْدَنَا مَا مَاتُوا وَمَا قُتِلُوا لِيَجْعَلَ اللَّهُ ذَلِكَ حَسْرَةً فِي قُلُوبِهِمْ وَاللَّهُ يُحْيِي وَيُمِيتُ وَاللَّهُ بِمَا تَعْمَلُونَ بَصِيرٌ",
          english: "O you who believe! Do not be like those who disbelieved, and said of their brethren who marched in the land, or went on the offensive, 'Had they stayed with us, they would not have died or been killed.' So that God may make it a cause of regret in their hearts. God gives life and causes death. God is Seeing of what you do."
        },
        {
          number: 157,
          arabic: "وَلَئِنْ قُتِلْتُمْ فِي سَبِيلِ اللَّهِ أَوْ مُتُّمْ لَمَغْفِرَةٌ مِنَ اللَّهِ وَرَحْمَةٌ خَيْرٌ مِمَّا يَجْمَعُونَ",
          english: "If you are killed in the cause of God, or die—forgiveness and mercy from God are better than what they hoard."
        },
        {
          number: 158,
          arabic: "وَلَئِنْ مُتُّمْ أَوْ قُتِلْتُمْ لَإِلَى اللَّهِ تُحْشَرُونَ",
          english: "If you die, or are killed—to God you will be gathered up."
        },
        {
          number: 159,
          arabic: "فَبِمَا رَحْمَةٍ مِنَ اللَّهِ لِنْتَ لَهُمْ وَلَوْ كُنْتَ فَظًّا غَلِيظَ الْقَلْبِ لَانْفَضُّوا مِنْ حَوْلِكَ فَاعْفُ عَنْهُمْ وَاسْتَغْفِرْ لَهُمْ وَشَاوِرْهُمْ فِي الْأَمْرِ فَإِذَا عَزَمْتَ فَتَوَكَّلْ عَلَى اللَّهِ إِنَّ اللَّهَ يُحِبُّ الْمُتَوَكِّلِينَ",
          english: "It is by of grace from God that you were gentle with them. Had you been harsh, hardhearted, they would have dispersed from around you. So pardon them, and ask forgiveness for them, and consult them in the conduct of affairs. And when you make a decision, put your trust in God; God loves the trusting."
        },
        {
          number: 160,
          arabic: "إِنْ يَنْصُرْكُمُ اللَّهُ فَلَا غَالِبَ لَكُمْ وَإِنْ يَخْذُلْكُمْ فَمَنْ ذَا الَّذِي يَنْصُرُكُمْ مِنْ بَعْدِهِ وَعَلَى اللَّهِ فَلْيَتَوَكَّلِ الْمُؤْمِنُونَ",
          english: "If God supports you, there is none who can overcome you. But if He fails you, who is there to help you after Him? So in God let the believers put their trust."
        },
        {
          number: 161,
          arabic: "وَمَا كَانَ لِنَبِيٍّ أَنْ يَغُلَّ وَمَنْ يَغْلُلْ يَأْتِ بِمَا غَلَّ يَوْمَ الْقِيَامَةِ ثُمَّ تُوَفَّى كُلُّ نَفْسٍ مَا كَسَبَتْ وَهُمْ لَا يُظْلَمُونَ",
          english: "It is not for a prophet to act dishonestly. Whoever acts dishonestly will bring his dishonesty on the Day of Resurrection. Then every soul will be paid in full for what it has earned, and they will not be wronged."
        },
        {
          number: 162,
          arabic: "أَفَمَنِ اتَّبَعَ رِضْوَانَ اللَّهِ كَمَنْ بَاءَ بِسَخَطٍ مِنَ اللَّهِ وَمَأْوَاهُ جَهَنَّمُ وَبِئْسَ الْمَصِيرُ",
          english: "Is someone who pursues God's approval the same as someone who incurs God's wrath and his refuge is Hell—the miserable destination?"
        },
        {
          number: 163,
          arabic: "هُمْ دَرَجَاتٌ عِنْدَ اللَّهِ وَاللَّهُ بَصِيرٌ بِمَا يَعْمَلُونَ",
          english: "They have different ranks with God, and God is Seeing of what they do."
        },
        {
          number: 164,
          arabic: "لَقَدْ مَنَّ اللَّهُ عَلَى الْمُؤْمِنِينَ إِذْ بَعَثَ فِيهِمْ رَسُولًا مِنْ أَنْفُسِهِمْ يَتْلُو عَلَيْهِمْ آيَاتِهِ وَيُزَكِّيهِمْ وَيُعَلِّمُهُمُ الْكِتَابَ وَالْحِكْمَةَ وَإِنْ كَانُوا مِنْ قَبْلُ لَفِي ضَلَالٍ مُبِينٍ",
          english: "God has blessed the believers, as He raised up among them a messenger from among themselves, who recites to them His revelations, and purifies them, and teaches them the Scripture and wisdom; although before that they were in evident error."
        },
        {
          number: 165,
          arabic: "أَوَلَمَّا أَصَابَتْكُمْ مُصِيبَةٌ قَدْ أَصَبْتُمْ مِثْلَيْهَا قُلْتُمْ أَنَّى هَذَا قُلْ هُوَ مِنْ عِنْدِ أَنْفُسِكُمْ إِنَّ اللَّهَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
          english: "And when a calamity befell you, even after you had inflicted twice as much, you said, 'How is this?' Say, 'It is from your own selves.' God is Able to do all things."
        },
        {
          number: 166,
          arabic: "وَمَا أَصَابَكُمْ يَوْمَ الْتَقَى الْجَمْعَانِ فَبِإِذْنِ اللَّهِ وَلِيَعْلَمَ الْمُؤْمِنِينَ",
          english: "What befell you on the day the two armies clashed was with God's permission; that He may know the believers."
        },
        {
          number: 167,
          arabic: "وَلِيَعْلَمَ الَّذِينَ نَافَقُوا وَقِيلَ لَهُمْ تَعَالَوْا قَاتِلُوا فِي سَبِيلِ اللَّهِ أَوِ ادْفَعُوا قَالُوا لَوْ نَعْلَمُ قِتَالًا لَاتَّبَعْنَاكُمْ هُمْ لِلْكُفْرِ يَوْمَئِذٍ أَقْرَبُ مِنْهُمْ لِلْإِيمَانِ يَقُولُونَ بِأَفْوَاهِهِمْ مَا لَيْسَ فِي قُلُوبِهِمْ وَاللَّهُ أَعْلَمُ بِمَا يَكْتُمُونَ",
          english: "And that He may know the hypocrites. And it was said to them, 'Come, fight in the cause of God, or contribute.' They said, 'If we knew how to fight, we would have followed you.' On that day they were closer to infidelity than they were to faith. They say with their mouths what is not in their hearts; but God knows what they hide."
        },
        {
          number: 168,
          arabic: "الَّذِينَ قَالُوا لِإِخْوَانِهِمْ وَقَعَدُوا لَوْ أَطَاعُونَا مَا قُتِلُوا قُلْ فَادْرَءُوا عَنْ أَنْفُسِكُمُ الْمَوْتَ إِنْ كُنْتُمْ صَادِقِينَ",
          english: "Those who said of their brethren, as they stayed behind, 'Had they obeyed us, they would not have been killed.' Say, 'Then avert death from yourselves, if you are truthful.'"
        },
        {
          number: 169,
          arabic: "وَلَا تَحْسَبَنَّ الَّذِينَ قُتِلُوا فِي سَبِيلِ اللَّهِ أَمْوَاتًا بَلْ أَحْيَاءٌ عِنْدَ رَبِّهِمْ يُرْزَقُونَ",
          english: "Do not consider those killed in the cause of God as dead. In fact, they are alive, at their Lord, well provided for."
        },
        {
          number: 170,
          arabic: "فَرِحِينَ بِمَا آتَاهُمُ اللَّهُ مِنْ فَضْلِهِ وَيَسْتَبْشِرُونَ بِالَّذِينَ لَمْ يَلْحَقُوا بِهِمْ مِنْ خَلْفِهِمْ أَلَّا خَوْفٌ عَلَيْهِمْ وَلَا هُمْ يَحْزَنُونَ",
          english: "Delighting in what God has given them out of His grace, and happy for those who have not yet joined them; that they have nothing to fear, nor will they grieve."
        },
        {
          number: 171,
          arabic: "يَسْتَبْشِرُونَ بِنِعْمَةٍ مِنَ اللَّهِ وَفَضْلٍ وَأَنَّ اللَّهَ لَا يُضِيعُ أَجْرَ الْمُؤْمِنِينَ",
          english: "They rejoice in grace from God, and bounty, and that God will not waste the reward of the faithful."
        },
        {
          number: 172,
          arabic: "الَّذِينَ اسْتَجَابُوا لِلَّهِ وَالرَّسُولِ مِنْ بَعْدِ مَا أَصَابَهُمُ الْقَرْحُ لِلَّذِينَ أَحْسَنُوا مِنْهُمْ وَاتَّقَوْا أَجْرٌ عَظِيمٌ",
          english: "Those who responded to God and the Messenger, despite the persecution they had suffered. For the virtuous and the pious among them is a great reward."
        },
        {
          number: 173,
          arabic: "الَّذِينَ قَالَ لَهُمُ النَّاسُ إِنَّ النَّاسَ قَدْ جَمَعُوا لَكُمْ فَاخْشَوْهُمْ فَزَادَهُمْ إِيمَانًا وَقَالُوا حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ",
          english: "Those to whom the people have said, 'The people have mobilized against you, so fear them.' But this only increased them in faith, and they said, 'God is enough for us; He is the Excellent Protector.'"
        },
        {
          number: 174,
          arabic: "فَانْقَلَبُوا بِنِعْمَةٍ مِنَ اللَّهِ وَفَضْلٍ لَمْ يَمْسَسْهُمْ سُوءٌ وَاتَّبَعُوا رِضْوَانَ اللَّهِ وَاللَّهُ ذُو فَضْلٍ عَظِيمٍ",
          english: "So they came back with grace from God, and bounty, and no harm having touched them. They pursued what pleases God. God possesses immense grace."
        },
        {
          number: 175,
          arabic: "إِنَّمَا ذَلِكُمُ الشَّيْطَانُ يُخَوِّفُ أَوْلِيَاءَهُ فَلَا تَخَافُوهُمْ وَخَافُونِ إِنْ كُنْتُمْ مُؤْمِنِينَ",
          english: "That is only Satan frightening his partisans; so do not fear them, but fear Me, if you are believers."
        },
        {
          number: 176,
          arabic: "وَلَا يَحْزُنْكَ الَّذِينَ يُسَارِعُونَ فِي الْكُفْرِ إِنَّهُمْ لَنْ يَضُرُّوا اللَّهَ شَيْئًا يُرِيدُ اللَّهُ أَلَّا يَجْعَلَ لَهُمْ حَظًّا فِي الْآخِرَةِ وَلَهُمْ عَذَابٌ عَظِيمٌ",
          english: "And do not be saddened by those who rush into disbelief. They will not harm God in the least. God desires to give them no share in the Hereafter. A terrible torment awaits them."
        },
        {
          number: 177,
          arabic: "إِنَّ الَّذِينَ اشْتَرَوُا الْكُفْرَ بِالْإِيمَانِ لَنْ يَضُرُّوا اللَّهَ شَيْئًا وَلَهُمْ عَذَابٌ أَلِيمٌ",
          english: "Those who exchange blasphemy for faith will not harm God in the least. A painful torment awaits them."
        },
        {
          number: 178,
          arabic: "وَلَا يَحْسَبَنَّ الَّذِينَ كَفَرُوا أَنَّمَا نُمْلِي لَهُمْ خَيْرٌ لِأَنْفُسِهِمْ إِنَّمَا نُمْلِي لَهُمْ لِيَزْدَادُوا إِثْمًا وَلَهُمْ عَذَابٌ مُهِينٌ",
          english: "Those who disbelieve should not assume that We respite them for their own good. In fact, We only respite them so that they may increase in sinfulness. A humiliating torment awaits them."
        },
        {
          number: 179,
          arabic: "مَا كَانَ اللَّهُ لِيَذَرَ الْمُؤْمِنِينَ عَلَى مَا أَنْتُمْ عَلَيْهِ حَتَّى يَمِيزَ الْخَبِيثَ مِنَ الطَّيِّبِ وَمَا كَانَ اللَّهُ لِيُطْلِعَكُمْ عَلَى الْغَيْبِ وَلَكِنَّ اللَّهَ يَجْتَبِي مِنْ رُسُلِهِ مَنْ يَشَاءُ فَآمِنُوا بِاللَّهِ وَرُسُلِهِ وَإِنْ تُؤْمِنُوا وَتَتَّقُوا فَلَكُمْ أَجْرٌ عَظِيمٌ",
          english: "God will not leave the believers as you are, without distinguishing the wicked from the sincere. Nor will God inform you of the future, but God elects from among His messengers whom He wills. So believe in God and His messengers. If you believe and practice piety, you will have a splendid reward."
        },
        {
          number: 180,
          arabic: "وَلَا يَحْسَبَنَّ الَّذِينَ يَبْخَلُونَ بِمَا آتَاهُمُ اللَّهُ مِنْ فَضْلِهِ هُوَ خَيْرًا لَهُمْ بَلْ هُوَ شَرٌّ لَهُمْ سَيُطَوَّقُونَ مَا بَخِلُوا بِهِ يَوْمَ الْقِيَامَةِ وَلِلَّهِ مِيرَاثُ السَّمَاوَاتِ وَالْأَرْضِ وَاللَّهُ بِمَا تَعْمَلُونَ خَبِيرٌ",
          english: "Those who withhold what God has given them of his bounty should not assume that is good for them. In fact, it is bad for them. They will be encircled by their hoardings on the Day of Resurrection. To God belongs the inheritance of the heavens and the earth, and God is well acquainted with what you do."
        },
        {
          number: 181,
          arabic: "لَقَدْ سَمِعَ اللَّهُ قَوْلَ الَّذِينَ قَالُوا إِنَّ اللَّهَ فَقِيرٌ وَنَحْنُ أَغْنِيَاءُ سَنَكْتُبُ مَا قَالُوا وَقَتْلَهُمُ الْأَنْبِيَاءَ بِغَيْرِ حَقٍّ وَنَقُولُ ذُوقُوا عَذَابَ الْحَرِيقِ",
          english: "God has heard the statement of those who said, 'God is poor, and we are rich.' We will write down what they said, and their wrongful killing of the prophets; and We will say, 'Taste the torment of the burning.'"
        },
        {
          number: 182,
          arabic: "ذَلِكَ بِمَا قَدَّمَتْ أَيْدِيكُمْ وَأَنَّ اللَّهَ لَيْسَ بِظَلَّامٍ لِلْعَبِيدِ",
          english: "'This is on account of what your hands have forwarded, and because God is not unjust towards the creatures.'"
        },
        {
          number: 183,
          arabic: "الَّذِينَ قَالُوا إِنَّ اللَّهَ عَهِدَ إِلَيْنَا أَلَّا نُؤْمِنَ لِرَسُولٍ حَتَّى يَأْتِيَنَا بِقُرْبَانٍ تَأْكُلُهُ النَّارُ قُلْ قَدْ جَاءَكُمْ رُسُلٌ مِنْ قَبْلِي بِالْبَيِّنَاتِ وَبِالَّذِي قُلْتُمْ فَلِمَ قَتَلْتُمُوهُمْ إِنْ كُنْتُمْ صَادِقِينَ",
          english: "Those who said, 'God has made a covenant with us, that we shall not believe in any messenger unless he brings us an offering to be consumed by fire.' Say, 'Messengers have come to you before me with proofs, and with what you asked for; so why did you assassinate them, if you are truthful?'"
        },
        {
          number: 184,
          arabic: "فَإِنْ كَذَّبُوكَ فَقَدْ كُذِّبَ رُسُلٌ مِنْ قَبْلِكَ جَاءُوا بِالْبَيِّنَاتِ وَالزُّبُرِ وَالْكِتَابِ الْمُنِيرِ",
          english: "If they accuse you of lying, messengers before you were accused of lying. They came with the proofs, and the Psalms, and the Illuminating Scripture."
        },
        {
          number: 185,
          arabic: "كُلُّ نَفْسٍ ذَائِقَةُ الْمَوْتِ وَإِنَّمَا تُوَفَّوْنَ أُجُورَكُمْ يَوْمَ الْقِيَامَةِ فَمَنْ زُحْزِحَ عَنِ النَّارِ وَأُدْخِلَ الْجَنَّةَ فَقَدْ فَازَ وَمَا الْحَيَاةُ الدُّنْيَا إِلَّا مَتَاعُ الْغُرُورِ",
          english: "Every soul will have a taste of death, and you will receive your recompense on the Day of Resurrection. Whoever is swayed from the Fire, and admitted to Paradise, has won. The life of this world is merely enjoyment of delusion."
        },
        {
          number: 186,
          arabic: "لَتُبْلَوُنَّ فِي أَمْوَالِكُمْ وَأَنْفُسِكُمْ وَلَتَسْمَعُنَّ مِنَ الَّذِينَ أُوتُوا الْكِتَابَ مِنْ قَبْلِكُمْ وَمِنَ الَّذِينَ أَشْرَكُوا أَذًى كَثِيرًا وَإِنْ تَصْبِرُوا وَتَتَّقُوا فَإِنَّ ذَلِكَ مِنْ عَزْمِ الْأُمُورِ",
          english: "You will be tested through your possessions and your persons; and you will hear from those who received the Scripture before you, and from the idol worshipers, much abuse. But if you persevere and lead a righteous life—that indeed is a mark of great determination."
        },
        {
          number: 187,
          arabic: "وَإِذْ أَخَذَ اللَّهُ مِيثَاقَ الَّذِينَ أُوتُوا الْكِتَابَ لَتُبَيِّنُنَّهُ لِلنَّاسِ وَلَا تَكْتُمُونَهُ فَنَبَذُوهُ وَرَاءَ ظُهُورِهِمْ وَاشْتَرَوْا بِهِ ثَمَنًا قَلِيلًا فَبِئْسَ مَا يَشْتَرُونَ",
          english: "God received a pledge from those who were given the Scripture: 'You shall proclaim it to the people, and not conceal it.' But they disregarded it behind their backs, and exchanged it for a small price. What a miserable exchange they made."
        },
        {
          number: 188,
          arabic: "لَا تَحْسَبَنَّ الَّذِينَ يَفْرَحُونَ بِمَا أَتَوْا وَيُحِبُّونَ أَنْ يُحْمَدُوا بِمَا لَمْ يَفْعَلُوا فَلَا تَحْسَبَنَّهُمْ بِمَفَازَةٍ مِنَ الْعَذَابِ وَلَهُمْ عَذَابٌ أَلِيمٌ",
          english: "Do not think that those who rejoice in what they have done, and love to be praised for what they have not done—do not think they can evade the punishment. They will have a painful punishment."
        },
        {
          number: 189,
          arabic: "وَلِلَّهِ مُلْكُ السَّمَاوَاتِ وَالْأَرْضِ وَاللَّهُ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
          english: "To God belongs the sovereignty of the heavens and the earth. God has power over all things."
        },
        {
          number: 190,
          arabic: "إِنَّ فِي خَلْقِ السَّمَاوَاتِ وَالْأَرْضِ وَاخْتِلَافِ اللَّيْلِ وَالنَّهَارِ لَآيَاتٍ لِأُولِي الْأَلْبَابِ",
          english: "In the creation of the heavens and the earth, and in the alternation of night and day, are signs for people of understanding."
        },
        {
          number: 191,
          arabic: "الَّذِينَ يَذْكُرُونَ اللَّهَ قِيَامًا وَقُعُودًا وَعَلَى جُنُوبِهِمْ وَيَتَفَكَّرُونَ فِي خَلْقِ السَّمَاوَاتِ وَالْأَرْضِ رَبَّنَا مَا خَلَقْتَ هَذَا بَاطِلًا سُبْحَانَكَ فَقِنَا عَذَابَ النَّارِ",
          english: "Those who remember God while standing, and sitting, and on their sides; and they reflect upon the creation of the heavens and the earth: 'Our Lord, You did not create this in vain, glory to You, so protect us from the punishment of the Fire.'"
        },
        {
          number: 192,
          arabic: "رَبَّنَا إِنَّكَ مَنْ تُدْخِلِ النَّارَ فَقَدْ أَخْزَيْتَهُ وَمَا لِلظَّالِمِينَ مِنْ أَنْصَارٍ",
          english: "'Our Lord, whomever You commit to the Fire, You have disgraced. The wrongdoers will have no helpers.'"
        },
        {
          number: 193,
          arabic: "رَبَّنَا إِنَّنَا سَمِعْنَا مُنَادِيًا يُنَادِي لِلْإِيمَانِ أَنْ آمِنُوا بِرَبِّكُمْ فَآمَنَّا رَبَّنَا فَاغْفِرْ لَنَا ذُنُوبَنَا وَكَفِّرْ عَنَّا سَيِّئَاتِنَا وَتَوَفَّنَا مَعَ الْأَبْرَارِ",
          english: "'Our Lord, we have heard a caller calling to the faith: \"Believe in your Lord,\" and we have believed. Our Lord! Forgive us our sins, and remit our misdeeds, and make us die in the company of the virtuous.'"
        },
        {
          number: 194,
          arabic: "رَبَّنَا وَآتِنَا مَا وَعَدْتَنَا عَلَى رُسُلِكَ وَلَا تُخْزِنَا يَوْمَ الْقِيَامَةِ إِنَّكَ لَا تُخْلِفُ الْمِيعَادَ",
          english: "'Our Lord, and give us what You have promised us through Your messengers, and do not disgrace us on the Day of Resurrection. Surely You never break a promise.'"
        },
        {
          number: 195,
          arabic: "فَاسْتَجَابَ لَهُمْ رَبُّهُمْ أَنِّي لَا أُضِيعُ عَمَلَ عَامِلٍ مِنْكُمْ مِنْ ذَكَرٍ أَوْ أُنْثَى بَعْضُكُمْ مِنْ بَعْضٍ فَالَّذِينَ هَاجَرُوا وَأُخْرِجُوا مِنْ دِيَارِهِمْ وَأُوذُوا فِي سَبِيلِي وَقَاتَلُوا وَقُتِلُوا لَأُكَفِّرَنَّ عَنْهُمْ سَيِّئَاتِهِمْ وَلَأُدْخِلَنَّهُمْ جَنَّاتٍ تَجْرِي مِنْ تَحْتِهَا الْأَنْهَارُ ثَوَابًا مِنْ عِنْدِ اللَّهِ وَاللَّهُ عِنْدَهُ حُسْنُ الثَّوَابِ",
          english: "And so their Lord answered them: 'I will not waste the work of any worker among you, whether male or female. You are one of another. For those who emigrated, and were expelled from their homes, and were persecuted because of Me, and fought and were killed—I will remit for them their sins, and will admit them into gardens beneath which rivers flow—a reward from God. With God is the ultimate reward.'"
        },
        {
          number: 196,
          arabic: "لَا يَغُرَّنَّكَ تَقَلُّبُ الَّذِينَ كَفَرُوا فِي الْبِلَادِ",
          english: "Do not be impressed by the disbelievers' movements in the land."
        },
        {
          number: 197,
          arabic: "مَتَاعٌ قَلِيلٌ ثُمَّ مَأْوَاهُمْ جَهَنَّمُ وَبِئْسَ الْمِهَادُ",
          english: "A brief enjoyment, then their abode is Hell. What a miserable resort."
        },
        {
          number: 198,
          arabic: "لَكِنِ الَّذِينَ اتَّقَوْا رَبَّهُمْ لَهُمْ جَنَّاتٌ تَجْرِي مِنْ تَحْتِهَا الْأَنْهَارُ خَالِدِينَ فِيهَا نُزُلًا مِنْ عِنْدِ اللَّهِ وَمَا عِنْدَ اللَّهِ خَيْرٌ لِلْأَبْرَارِ",
          english: "As for those who feared their Lord: for them will be gardens beneath which rivers flow, wherein they will abide forever—hospitality from God. What God possesses is best for the just."
        },
        {
          number: 199,
          arabic: "وَإِنَّ مِنْ أَهْلِ الْكِتَابِ لَمَنْ يُؤْمِنُ بِاللَّهِ وَمَا أُنْزِلَ إِلَيْكُمْ وَمَا أُنْزِلَ إِلَيْهِمْ خَاشِعِينَ لِلَّهِ لَا يَشْتَرُونَ بِآيَاتِ اللَّهِ ثَمَنًا قَلِيلًا أُولَئِكَ لَهُمْ أَجْرُهُمْ عِنْدَ رَبِّهِمْ إِنَّ اللَّهَ سَرِيعُ الْحِسَابِ",
          english: "Among the People of the Scripture are those who believe in God, and in what was revealed to you, and in what was revealed to them. They are humble before God, and they do not sell God's revelations for a cheap price. These will have their reward with their Lord. God is swift in reckoning."
        },
        {
          number: 200,
          arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا اصْبِرُوا وَصَابِرُوا وَرَابِطُوا وَاتَّقُوا اللَّهَ لَعَلَّكُمْ تُفْلِحُونَ",
          english: "O you who believe! Be patient, and advocate patience, and be united, and revere God, so that you may thrive."
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
          arabic: 'يَا أَيُّهَا النَّاسُ اتَّقُوا رَبَّكُمُ الَّذِي خَلَقَكُمْ مِنْ نَفْسٍ وَاحِدَةٍ وَخَلَقَ مِنْهَا زَوْجَهَا وَبَثَّ مِنْهُمَا رِجَالًا كَثِيرًا وَنِسَاءً وَاتَّقُوا اللَّهَ الَّذِي تَسَاءَلُونَ بِهِ وَالْأَرْحَامَ إِنَّ اللَّهَ كَانَ عَلَيْكُمْ رَقِيبًا',
          english: 'O people! Fear your Lord, who created you from a single soul, and created from it its mate, and propagated from them many men and women. And revere God whom you ask about, and the parents. Surely, God is Watchful over you.',
        },
        {
          number: 2,
          arabic: "وَآتُوا الْيَتَامَى أَمْوَالَهُمْ وَلَا تَتَبَدَّلُوا الْخَبِيثَ بِالطَّيِّبِ وَلَا تَأْكُلُوا أَمْوَالَهُمْ إِلَى أَمْوَالِكُمْ إِنَّهُ كَانَ حُوبًا كَبِيرًا",
          english: "And give orphans their properties, and do not substitute the bad for the good. And do not consume their properties by combining them with yours, for that would be a serious sin."
        },
        {
          number: 3,
          arabic: "وَإِنْ خِفْتُمْ أَلَّا تُقْسِطُوا فِي الْيَتَامَى فَانْكِحُوا مَا طَابَ لَكُمْ مِنَ النِّسَاءِ مَثْنَى وَثُلَاثَ وَرُبَاعَ فَإِنْ خِفْتُمْ أَلَّا تَعْدِلُوا فَوَاحِدَةً أَوْ مَا مَلَكَتْ أَيْمَانُكُمْ ذَلِكَ أَدْنَى أَلَّا تَعُولُوا",
          english: "If you fear you cannot act fairly towards the orphans—then marry the women you like—two, or three, or four. But if you fear you will not be fair, then one, or what you already have. That makes it more likely that you avoid bias."
        },
        {
          number: 4,
          arabic: "وَآتُوا النِّسَاءَ صَدُقَاتِهِنَّ نِحْلَةً فَإِنْ طِبْنَ لَكُمْ عَنْ شَيْءٍ مِنْهُ نَفْسًا فَكُلُوهُ هَنِيئًا مَرِيئًا",
          english: "Give women their dowries graciously. But if they willingly forego some of it, then consume it with enjoyment and pleasure."
        },
        {
          number: 5,
          arabic: "وَلَا تُؤْتُوا السُّفَهَاءَ أَمْوَالَكُمُ الَّتِي جَعَلَ اللَّهُ لَكُمْ قِيَامًا وَارْزُقُوهُمْ فِيهَا وَاكْسُوهُمْ وَقُولُوا لَهُمْ قَوْلًا مَعْرُوفًا",
          english: "Do not give the immature your money which God has assigned to you for support. But provide for them from it, and clothe them, and speak to them with kind words."
        },
        {
          number: 6,
          arabic: "وَابْتَلُوا الْيَتَامَى حَتَّى إِذَا بَلَغُوا النِّكَاحَ فَإِنْ آنَسْتُمْ مِنْهُمْ رُشْدًا فَادْفَعُوا إِلَيْهِمْ أَمْوَالَهُمْ وَلَا تَأْكُلُوهَا إِسْرَافًا وَبِدَارًا أَنْ يَكْبَرُوا وَمَنْ كَانَ غَنِيًّا فَلْيَسْتَعْفِفْ وَمَنْ كَانَ فَقِيرًا فَلْيَأْكُلْ بِالْمَعْرُوفِ فَإِذَا دَفَعْتُمْ إِلَيْهِمْ أَمْوَالَهُمْ فَأَشْهِدُوا عَلَيْهِمْ وَكَفَى بِاللَّهِ حَسِيبًا",
          english: "Test the orphans until they reach the age of marriage. If you find them to be mature enough, hand over their properties to them. And do not consume it extravagantly or hastily before they grow up. The rich shall not charge any wage, but the poor may charge fairly. When you hand over their properties to them, have it witnessed for them. God suffices as a Reckoner."
        },
        {
          number: 7,
          arabic: "لِلرِّجَالِ نَصِيبٌ مِمَّا تَرَكَ الْوَالِدَانِ وَالْأَقْرَبُونَ وَلِلنِّسَاءِ نَصِيبٌ مِمَّا تَرَكَ الْوَالِدَانِ وَالْأَقْرَبُونَ مِمَّا قَلَّ مِنْهُ أَوْ كَثُرَ نَصِيبًا مَفْرُوضًا",
          english: "Men receive a share of what their parents and relatives leave, and women receive a share of what their parents and relatives leave; be it little or much—a legal share."
        },
        {
          number: 8,
          arabic: "وَإِذَا حَضَرَ الْقِسْمَةَ أُولُو الْقُرْبَى وَالْيَتَامَى وَالْمَسَاكِينُ فَارْزُقُوهُمْ مِنْهُ وَقُولُوا لَهُمْ قَوْلًا مَعْرُوفًا",
          english: "If the distribution is attended by the relatives, and the orphans, and the needy, give them something out of it, and speak to them kindly."
        },
        {
          number: 9,
          arabic: "وَلْيَخْشَ الَّذِينَ لَوْ تَرَكُوا مِنْ خَلْفِهِمْ ذُرِّيَّةً ضِعَافًا خَافُوا عَلَيْهِمْ فَلْيَتَّقُوا اللَّهَ وَلْيَقُولُوا قَوْلًا سَدِيدًا",
          english: "Those who are concerned about the fate of their weak children, in case they leave them behind, should fear God, and speak appropriate words."
        },
        {
          number: 10,
          arabic: "إِنَّ الَّذِينَ يَأْكُلُونَ أَمْوَالَ الْيَتَامَى ظُلْمًا إِنَّمَا يَأْكُلُونَ فِي بُطُونِهِمْ نَارًا وَسَيَصْلَوْنَ سَعِيرًا",
          english: "Those who consume the wealth of orphans illicitly consume only fire into their bellies; and they will roast in a Blaze."
        },
        {
          number: 11,
          arabic: "يُوصِيكُمُ اللَّهُ فِي أَوْلَادِكُمْ لِلذَّكَرِ مِثْلُ حَظِّ الْأُنْثَيَيْنِ فَإِنْ كُنَّ نِسَاءً فَوْقَ اثْنَتَيْنِ فَلَهُنَّ ثُلُثَا مَا تَرَكَ وَإِنْ كَانَتْ وَاحِدَةً فَلَهَا النِّصْفُ وَلِأَبَوَيْهِ لِكُلِّ وَاحِدٍ مِنْهُمَا السُّدُسُ مِمَّا تَرَكَ إِنْ كَانَ لَهُ وَلَدٌ فَإِنْ لَمْ يَكُنْ لَهُ وَلَدٌ وَوَرِثَهُ أَبَوَاهُ فَلِأُمِّهِ الثُّلُثُ فَإِنْ كَانَ لَهُ إِخْوَةٌ فَلِأُمِّهِ السُّدُسُ مِنْ بَعْدِ وَصِيَّةٍ يُوصِي بِهَا أَوْ دَيْنٍ آبَاؤُكُمْ وَأَبْنَاؤُكُمْ لَا تَدْرُونَ أَيُّهُمْ أَقْرَبُ لَكُمْ نَفْعًا فَرِيضَةً مِنَ اللَّهِ إِنَّ اللَّهَ كَانَ عَلِيمًا حَكِيمًا",
          english: "God instructs you regarding your children: The male receives the equivalent of the share of two females. If they are daughters, more than two, they get two-thirds of what he leaves. If there is only one, she gets one-half. As for the parents, each gets one-sixth of what he leaves, if he had children. If he had no children, and his parents inherit from him, his mother gets one-third. If he has siblings, his mother gets one-sixth. After fulfilling any bequest and paying off debts. Your parents and your children—you do not know which are closer to you in welfare. This is God's Law. God is Knowing and Judicious."
        },
        {
          number: 12,
          arabic: "وَلَكُمْ نِصْفُ مَا تَرَكَ أَزْوَاجُكُمْ إِنْ لَمْ يَكُنْ لَهُنَّ وَلَدٌ فَإِنْ كَانَ لَهُنَّ وَلَدٌ فَلَكُمُ الرُّبُعُ مِمَّا تَرَكْنَ مِنْ بَعْدِ وَصِيَّةٍ يُوصِينَ بِهَا أَوْ دَيْنٍ وَلَهُنَّ الرُّبُعُ مِمَّا تَرَكْتُمْ إِنْ لَمْ يَكُنْ لَكُمْ وَلَدٌ فَإِنْ كَانَ لَكُمْ وَلَدٌ فَلَهُنَّ الثُّمُنُ مِمَّا تَرَكْتُمْ مِنْ بَعْدِ وَصِيَّةٍ تُوصُونَ بِهَا أَوْ دَيْنٍ وَإِنْ كَانَ رَجُلٌ يُورَثُ كَلَالَةً أَوِ امْرَأَةٌ وَلَهُ أَخٌ أَوْ أُخْتٌ فَلِكُلِّ وَاحِدٍ مِنْهُمَا السُّدُسُ فَإِنْ كَانُوا أَكْثَرَ مِنْ ذَلِكَ فَهُمْ شُرَكَاءُ فِي الثُّلُثِ مِنْ بَعْدِ وَصِيَّةٍ يُوصَى بِهَا أَوْ دَيْنٍ غَيْرَ مُضَارٍّ وَصِيَّةً مِنَ اللَّهِ وَاللَّهُ عَلِيمٌ حَلِيمٌ",
          english: "You get one-half of what your wives leave behind, if they had no children. If they had children, you get one-fourth of what they leave. After fulfilling any bequest and paying off debts. They get one-fourth of what you leave behind, if you have no children. If you have children, they get one-eighth of what you leave. After fulfilling any bequest and paying off debts, without any prejudice. This is a will from God. God is Knowing and Clement."
        },
        {
          number: 13,
          arabic: "تِلْكَ حُدُودُ اللَّهِ وَمَنْ يُطِعِ اللَّهَ وَرَسُولَهُ يُدْخِلْهُ جَنَّاتٍ تَجْرِي مِنْ تَحْتِهَا الْأَنْهَارُ خَالِدِينَ فِيهَا وَذَلِكَ الْفَوْزُ الْعَظِيمُ",
          english: "These are the bounds set by God. Whoever obeys God and His Messenger, He will admit him into Gardens beneath which rivers flow, to abide therein forever. That is the great attainment."
        },
        {
          number: 14,
          arabic: "وَمَنْ يَعْصِ اللَّهَ وَرَسُولَهُ وَيَتَعَدَّ حُدُودَهُ يُدْخِلْهُ نَارًا خَالِدًا فِيهَا وَلَهُ عَذَابٌ مُهِينٌ",
          english: "But whoever disobeys God and His Messenger, and oversteps His bounds, He will admit him into a Fire, wherein he abides forever, and he will have a shameful punishment."
        },
        {
          number: 15,
          arabic: "وَاللَّاتِي يَأْتِينَ الْفَاحِشَةَ مِنْ نِسَائِكُمْ فَاسْتَشْهِدُوا عَلَيْهِنَّ أَرْبَعَةً مِنْكُمْ فَإِنْ شَهِدُوا فَأَمْسِكُوهُنَّ فِي الْبُيُوتِ حَتَّى يَتَوَفَّاهُنَّ الْمَوْتُ أَوْ يَجْعَلَ اللَّهُ لَهُنَّ سَبِيلًا",
          english: "Those of your women who commit lewdness, you must have four witnesses against them, from among you. If they testify, confine them to the homes until death claims them, or God makes a way for them."
        },
        {
          number: 16,
          arabic: "وَاللَّذَانِ يَأْتِيَانِهَا مِنْكُمْ فَآذُوهُمَا فَإِنْ تَابَا وَأَصْلَحَا فَأَعْرِضُوا عَنْهُمَا إِنَّ اللَّهَ كَانَ تَوَّابًا رَحِيمًا",
          english: "If two men among you commit it, punish them both. But if they repent and reform, leave them alone. God is Redeemer, Full of Mercy."
        },
        {
          number: 17,
          arabic: "إِنَّمَا التَّوْبَةُ عَلَى اللَّهِ لِلَّذِينَ يَعْمَلُونَ السُّوءَ بِجَهَالَةٍ ثُمَّ يَتُوبُونَ مِنْ قَرِيبٍ فَأُولَئِكَ يَتُوبُ اللَّهُ عَلَيْهِمْ وَكَانَ اللَّهُ عَلِيمًا حَكِيمًا",
          english: "Repentance is available from God for those who commit evil out of ignorance, and then repent soon after. These—God will relent towards them. God is Knowing and Wise."
        },
        {
          number: 18,
          arabic: "وَلَيْسَتِ التَّوْبَةُ لِلَّذِينَ يَعْمَلُونَ السَّيِّئَاتِ حَتَّى إِذَا حَضَرَ أَحَدَهُمُ الْمَوْتُ قَالَ إِنِّي تُبْتُ الْآنَ وَلَا الَّذِينَ يَمُوتُونَ وَهُمْ كُفَّارٌ أُولَئِكَ أَعْتَدْنَا لَهُمْ عَذَابًا أَلِيمًا",
          english: "But repentance is not available for those who commit evils, until when death approaches one of them, he says, 'Now I repent,' nor for those who die as disbelievers. These—We have prepared for them a painful torment."
        },
        {
          number: 19,
          arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا لَا يَحِلُّ لَكُمْ أَنْ تَرِثُوا النِّسَاءَ كَرْهًا وَلَا تَعْضُلُوهُنَّ لِتَذْهَبُوا بِبَعْضِ مَا آتَيْتُمُوهُنَّ إِلَّا أَنْ يَأْتِينَ بِفَاحِشَةٍ مُبَيِّنَةٍ وَعَاشِرُوهُنَّ بِالْمَعْرُوفِ فَإِنْ كَرِهْتُمُوهُنَّ فَعَسَى أَنْ تَكْرَهُوا شَيْئًا وَيَجْعَلَ اللَّهُ فِيهِ خَيْرًا كَثِيرًا",
          english: "O you who believe! It is not permitted for you to inherit women against their will. And do not coerce them in order to take away some of what you had given them, unless they commit a proven adultery. And live with them in kindness. If you dislike them, it may be that you dislike something in which God has placed much good."
        },
        {
          number: 20,
          arabic: "وَإِنْ أَرَدْتُمُ اسْتِبْدَالَ زَوْجٍ مَكَانَ زَوْجٍ وَآتَيْتُمْ إِحْدَاهُنَّ قِنْطَارًا فَلَا تَأْخُذُوا مِنْهُ شَيْئًا أَتَأْخُذُونَهُ بُهْتَانًا وَإِثْمًا مُبِينًا",
          english: "If you wish to replace one wife with another, and you have given one of them a fortune, take nothing back from it. Would you take it back fraudulently and sinfully?"
        },
        {
          number: 21,
          arabic: "وَكَيْفَ تَأْخُذُونَهُ وَقَدْ أَفْضَى بَعْضُكُمْ إِلَى بَعْضٍ وَأَخَذْنَ مِنْكُمْ مِيثَاقًا غَلِيظًا",
          english: "And how can you take it back, when you have been intimate with one another, and they have received from you a solid commitment?"
        },
        {
          number: 22,
          arabic: "وَلَا تَنْكِحُوا مَا نَكَحَ آبَاؤُكُمْ مِنَ النِّسَاءِ إِلَّا مَا قَدْ سَلَفَ إِنَّهُ كَانَ فَاحِشَةً وَمَقْتًا وَسَاءَ سَبِيلًا",
          english: "Do not marry women whom your fathers married, except what is already past. That is improper, indecent, and a bad custom."
        },
        {
          number: 23,
          arabic: "حُرِّمَتْ عَلَيْكُمْ أُمَّهَاتُكُمْ وَبَنَاتُكُمْ وَأَخَوَاتُكُمْ وَعَمَّاتُكُمْ وَخَالَاتُكُمْ وَبَنَاتُ الْأَخِ وَبَنَاتُ الْأُخْتِ وَأُمَّهَاتُكُمُ اللَّاتِي أَرْضَعْنَكُمْ وَأَخَوَاتُكُمْ مِنَ الرَّضَاعَةِ وَأُمَّهَاتُ نِسَائِكُمْ وَرَبَائِبُكُمُ اللَّاتِي فِي حُجُورِكُمْ مِنْ نِسَائِكُمُ اللَّاتِي دَخَلْتُمْ بِهِنَّ فَإِنْ لَمْ تَكُونُوا دَخَلْتُمْ بِهِنَّ فَلَا جُنَاحَ عَلَيْكُمْ وَحَلَائِلُ أَبْنَائِكُمُ الَّذِينَ مِنْ أَصْلَابِكُمْ وَأَنْ تَجْمَعُوا بَيْنَ الْأُخْتَيْنِ إِلَّا مَا قَدْ سَلَفَ إِنَّ اللَّهَ كَانَ غَفُورًا رَحِيمًا",
          english: "Forbidden for you are your mothers, your daughters, your sisters, your paternal aunts, your maternal aunts, your brother's daughters, your sister's daughters, your foster-mothers who nursed you, your sisters through nursing, your wives' mothers, and your stepdaughters in your guardianship—born of wives you have gone into—but if you have not gone into them, there is no blame on you. And the wives of your genetic sons, and marrying two sisters simultaneously. Except what is past. God is Oft-Forgiving, Most Merciful."
        },
        {
          number: 24,
          arabic: "وَالْمُحْصَنَاتُ مِنَ النِّسَاءِ إِلَّا مَا مَلَكَتْ أَيْمَانُكُمْ كِتَابَ اللَّهِ عَلَيْكُمْ وَأُحِلَّ لَكُمْ مَا وَرَاءَ ذَلِكُمْ أَنْ تَبْتَغُوا بِأَمْوَالِكُمْ مُحْصِنِينَ غَيْرَ مُسَافِحِينَ فَمَا اسْتَمْتَعْتُمْ بِهِ مِنْهُنَّ فَآتُوهُنَّ أُجُورَهُنَّ فَرِيضَةً وَلَا جُنَاحَ عَلَيْكُمْ فِيمَا تَرَاضَيْتُمْ بِهِ مِنْ بَعْدِ الْفَرِيضَةِ إِنَّ اللَّهَ كَانَ عَلِيمًا حَكِيمًا",
          english: "And all married women, except those you rightfully possess. This is God's decree, binding upon you. Permitted for you are those that lie outside these limits, provided you seek them in legal marriage, with gifts from your property, seeking wedlock, not prostitution. If you wish to enjoy them, then give them their dowry—a legal obligation. You commit no error by agreeing to any change to the dowry. God is All-Knowing, Most Wise."
        },
        {
          number: 25,
          arabic: "وَمَنْ لَمْ يَسْتَطِعْ مِنْكُمْ طَوْلًا أَنْ يَنْكِحَ الْمُحْصَنَاتِ الْمُؤْمِنَاتِ فَمِنْ مَا مَلَكَتْ أَيْمَانُكُمْ مِنْ فَتَيَاتِكُمُ الْمُؤْمِنَاتِ وَاللَّهُ أَعْلَمُ بِإِيمَانِكُمْ بَعْضُكُمْ مِنْ بَعْضٍ فَانْكِحُوهُنَّ بِإِذْنِ أَهْلِهِنَّ وَآتُوهُنَّ أُجُورَهُنَّ بِالْمَعْرُوفِ مُحْصَنَاتٍ غَيْرَ مُسَافِحَاتٍ وَلَا مُتَّخِذَاتِ أَخْدَانٍ فَإِذَا أُحْصِنَّ فَإِنْ أَتَيْنَ بِفَاحِشَةٍ فَعَلَيْهِنَّ نِصْفُ مَا عَلَى الْمُحْصَنَاتِ مِنَ الْعَذَابِ ذَلِكَ لِمَنْ خَشِيَ الْعَنَتَ مِنْكُمْ وَأَنْ تَصْبِرُوا خَيْرٌ لَكُمْ وَاللَّهُ غَفُورٌ رَحِيمٌ",
          english: "If any of you lack the means to marry free believing women, he may marry one of the believing maids under your control. God is well aware of your faith. You are from one another. Marry them with the permission of their guardians, and give them their recompense fairly—to be protected—neither committing adultery, nor taking secret lovers. When they are married, if they commit adultery, their punishment shall be half that of free women. That is for those among you who fear falling into decadence. But to practice self-restraint is better for you. God is Most Forgiving, Most Merciful."
        },
        {
          number: 26,
          arabic: "يُرِيدُ اللَّهُ لِيُبَيِّنَ لَكُمْ وَيَهْدِيَكُمْ سُنَنَ الَّذِينَ مِنْ قَبْلِكُمْ وَيَتُوبَ عَلَيْكُمْ وَاللَّهُ عَلِيمٌ حَكِيمٌ",
          english: "God intends to make things clear to you, and to guide you in the ways of those before you, and to redeem you. God is Most Knowing, Most Wise."
        },
        {
          number: 27,
          arabic: "وَاللَّهُ يُرِيدُ أَنْ يَتُوبَ عَلَيْكُمْ وَيُرِيدُ الَّذِينَ يَتَّبِعُونَ الشَّهَوَاتِ أَنْ تَمِيلُوا مَيْلًا عَظِيمًا",
          english: "God intends to redeem you, but those who follow their desires want you to turn away utterly."
        },
        {
          number: 28,
          arabic: "يُرِيدُ اللَّهُ أَنْ يُخَفِّفَ عَنْكُمْ وَخُلِقَ الْإِنْسَانُ ضَعِيفًا",
          english: "God intends to lighten your burden, for the human being was created weak."
        },
        {
          number: 29,
          arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا لَا تَأْكُلُوا أَمْوَالَكُمْ بَيْنَكُمْ بِالْبَاطِلِ إِلَّا أَنْ تَكُونَ تِجَارَةً عَنْ تَرَاضٍ مِنْكُمْ وَلَا تَقْتُلُوا أَنْفُسَكُمْ إِنَّ اللَّهَ كَانَ بِكُمْ رَحِيمًا",
          english: "O you who believe! Do not consume each other's wealth illicitly, but trade by mutual consent. And do not kill yourselves, for God is Merciful towards you."
        },
        {
          number: 30,
          arabic: "وَمَنْ يَفْعَلْ ذَلِكَ عُدْوَانًا وَظُلْمًا فَسَوْفَ نُصْلِيهِ نَارًا وَكَانَ ذَلِكَ عَلَى اللَّهِ يَسِيرًا",
          english: "Whoever does that, out of hostility and wrongdoing, We will cast him into a Fire. And that would be easy for God."
        },
        {
          number: 31,
          arabic: "إِنْ تَجْتَنِبُوا كَبَائِرَ مَا تُنْهَوْنَ عَنْهُ نُكَفِّرْ عَنْكُمْ سَيِّئَاتِكُمْ وَنُدْخِلْكُمْ مُدْخَلًا كَرِيمًا",
          english: "If you avoid the worst of what you are forbidden, We will remit your sins, and admit you by a Gate of Honor."
        },
        {
          number: 32,
          arabic: "وَلَا تَتَمَنَّوْا مَا فَضَّلَ اللَّهُ بِهِ بَعْضَكُمْ عَلَى بَعْضٍ لِلرِّجَالِ نَصِيبٌ مِمَّا اكْتَسَبُوا وَلِلنِّسَاءِ نَصِيبٌ مِمَّا اكْتَسَبْنَ وَاسْأَلُوا اللَّهَ مِنْ فَضْلِهِ إِنَّ اللَّهَ كَانَ بِكُلِّ شَيْءٍ عَلِيمًا",
          english: "Do not covet what God has given to some of you in preference to others. For men is a share of what they have earned, and for women is a share of what they have earned. And ask God of his bounty. God has knowledge of everything."
        },
        {
          number: 33,
          arabic: "وَلِكُلٍّ جَعَلْنَا مَوَالِيَ مِمَّا تَرَكَ الْوَالِدَانِ وَالْأَقْرَبُونَ وَالَّذِينَ عَقَدَتْ أَيْمَانُكُمْ فَآتُوهُمْ نَصِيبَهُمْ إِنَّ اللَّهَ كَانَ عَلَى كُلِّ شَيْءٍ شَهِيدًا",
          english: "To everyone We have assigned beneficiaries in what is left by parents and relatives. Those with whom you have made an agreement, give them their share. God is Witness over all things."
        },
        {
          number: 34,
          arabic: "الرِّجَالُ قَوَّامُونَ عَلَى النِّسَاءِ بِمَا فَضَّلَ اللَّهُ بَعْضَهُمْ عَلَى بَعْضٍ وَبِمَا أَنْفَقُوا مِنْ أَمْوَالِهِمْ فَالصَّالِحَاتُ قَانِتَاتٌ حَافِظَاتٌ لِلْغَيْبِ بِمَا حَفِظَ اللَّهُ وَاللَّاتِي تَخَافُونَ نُشُوزَهُنَّ فَعِظُوهُنَّ وَاهْجُرُوهُنَّ فِي الْمَضَاجِعِ وَاضْرِبُوهُنَّ فَإِنْ أَطَعْنَكُمْ فَلَا تَبْغُوا عَلَيْهِنَّ سَبِيلًا إِنَّ اللَّهَ كَانَ عَلِيًّا كَبِيرًا",
          english: "Men are the protectors and maintainers of women, as God has given some of them an advantage over others, and because they spend out of their wealth. The good women are obedient, guarding what God would have them guard. As for those from whom you fear disloyalty, admonish them, and abandon them in their beds, then strike them. But if they obey you, seek no way against them. God is Sublime, Great."
        },
        {
          number: 35,
          arabic: "وَإِنْ خِفْتُمْ شِقَاقَ بَيْنِهِمَا فَابْعَثُوا حَكَمًا مِنْ أَهْلِهِ وَحَكَمًا مِنْ أَهْلِهَا إِنْ يُرِيدَا إِصْلَاحًا يُوَفِّقِ اللَّهُ بَيْنَهُمَا إِنَّ اللَّهَ كَانَ عَلِيمًا خَبِيرًا",
          english: "If you fear a breach between the two, appoint an arbiter from his family and an arbiter from her family. If they wish to reconcile, God will bring them together. God is Knowledgeable, Expert."
        },
        {
          number: 36,
          arabic: "وَاعْبُدُوا اللَّهَ وَلَا تُشْرِكُوا بِهِ شَيْئًا وَبِالْوَالِدَيْنِ إِحْسَانًا وَبِذِي الْقُرْبَى وَالْيَتَامَى وَالْمَسَاكِينِ وَالْجَارِ ذِي الْقُرْبَى وَالْجَارِ الْجُنُبِ وَالصَّاحِبِ بِالْجَنْبِ وَابْنِ السَّبِيلِ وَمَا مَلَكَتْ أَيْمَانُكُمْ إِنَّ اللَّهَ لَا يُحِبُّ مَنْ كَانَ مُخْتَالًا فَخُورًا",
          english: "Worship God, and ascribe no partners to Him, and be good to the parents, and the relatives, and the orphans, and the poor, and the neighbor next door, and the distant neighbor, and the close associate, and the traveler, and your servants. God does not love the arrogant showoff."
        },
        {
          number: 37,
          arabic: "الَّذِينَ يَبْخَلُونَ وَيَأْمُرُونَ النَّاسَ بِالْبُخْلِ وَيَكْتُمُونَ مَا آتَاهُمُ اللَّهُ مِنْ فَضْلِهِ وَأَعْتَدْنَا لِلْكَافِرِينَ عَذَابًا مُهِينًا",
          english: "Those who are stingy, and exhort people to stinginess, and conceal what God has given them from His bounty. We have prepared for the disbelievers a disgraceful punishment."
        },
        {
          number: 38,
          arabic: "وَالَّذِينَ يُنْفِقُونَ أَمْوَالَهُمْ رِئَاءَ النَّاسِ وَلَا يُؤْمِنُونَ بِاللَّهِ وَلَا بِالْيَوْمِ الْآخِرِ وَمَنْ يَكُنِ الشَّيْطَانُ لَهُ قَرِينًا فَسَاءَ قَرِينًا",
          english: "And those who spend their money to be seen by people, and believe neither in God nor in the Last Day. Whoever has Satan as a companion—what an evil companion."
        },
        {
          number: 39,
          arabic: "وَمَاذَا عَلَيْهِمْ لَوْ آمَنُوا بِاللَّهِ وَالْيَوْمِ الْآخِرِ وَأَنْفَقُوا مِمَّا رَزَقَهُمُ اللَّهُ وَكَانَ اللَّهُ بِهِمْ عَلِيمًا",
          english: "What would they have lost, had they believed in God and the Last Day, and gave out of what God has provided for them? God knows them very well."
        },
        {
          number: 40,
          arabic: "إِنَّ اللَّهَ لَا يَظْلِمُ مِثْقَالَ ذَرَّةٍ وَإِنْ تَكُ حَسَنَةً يُضَاعِفْهَا وَيُؤْتِ مِنْ لَدُنْهُ أَجْرًا عَظِيمًا",
          english: "God does not commit an atom's weight of injustice; and if there is a good deed, He doubles it, and gives from His Presence a sublime compensation."
        },
        {
          number: 41,
          arabic: "فَكَيْفَ إِذَا جِئْنَا مِنْ كُلِّ أُمَّةٍ بِشَهِيدٍ وَجِئْنَا بِكَ عَلَى هَؤُلَاءِ شَهِيدًا",
          english: "Then how will it be, when We bring a witness from every community, and We bring you as a witness against these?"
        },
        {
          number: 42,
          arabic: "يَوْمَئِذٍ يَوَدُّ الَّذِينَ كَفَرُوا وَعَصَوُا الرَّسُولَ لَوْ تُسَوَّى بِهِمُ الْأَرْضُ وَلَا يَكْتُمُونَ اللَّهَ حَدِيثًا",
          english: "On that Day, those who disbelieved and disobeyed the Messenger will wish that the earth were leveled over them. They will conceal nothing from God."
        },
        {
          number: 43,
          arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا لَا تَقْرَبُوا الصَّلَاةَ وَأَنْتُمْ سُكَارَى حَتَّى تَعْلَمُوا مَا تَقُولُونَ وَلَا جُنُبًا إِلَّا عَابِرِي سَبِيلٍ حَتَّى تَغْتَسِلُوا وَإِنْ كُنْتُمْ مَرْضَى أَوْ عَلَى سَفَرٍ أَوْ جَاءَ أَحَدٌ مِنْكُمْ مِنَ الْغَائِطِ أَوْ لَامَسْتُمُ النِّسَاءَ فَلَمْ تَجِدُوا مَاءً فَتَيَمَّمُوا صَعِيدًا طَيِّبًا فَامْسَحُوا بِوُجُوهِكُمْ وَأَيْدِيكُمْ إِنَّ اللَّهَ كَانَ عَفُوًّا غَفُورًا",
          english: "O you who believe! Do not approach the prayer while you are drunk, so that you know what you say; nor after sexual orgasm—unless you are travelling—until you have bathed. If you are sick, or traveling, or one of you comes from the toilet, or you have had intercourse with women, and cannot find water, find clean sand and wipe your faces and your hands with it. God is Pardoning and Forgiving."
        },
        {
          number: 44,
          arabic: "أَلَمْ تَرَ إِلَى الَّذِينَ أُوتُوا نَصِيبًا مِنَ الْكِتَابِ يَشْتَرُونَ الضَّلَالَةَ وَيُرِيدُونَ أَنْ تَضِلُّوا السَّبِيلَ",
          english: "Have you not considered those who were given a share of the Book? They buy error, and wish you would lose the way."
        },
        {
          number: 45,
          arabic: "وَاللَّهُ أَعْلَمُ بِأَعْدَائِكُمْ وَكَفَى بِاللَّهِ وَلِيًّا وَكَفَى بِاللَّهِ نَصِيرًا",
          english: "But God knows your enemies best. God is sufficient as a Protector, and God is sufficient as a Supporter."
        },
        {
          number: 46,
          arabic: "مِنَ الَّذِينَ هَادُوا يُحَرِّفُونَ الْكَلِمَ عَنْ مَوَاضِعِهِ وَيَقُولُونَ سَمِعْنَا وَعَصَيْنَا وَاسْمَعْ غَيْرَ مُسْمَعٍ وَرَاعِنَا لَيًّا بِأَلْسِنَتِهِمْ وَطَعْنًا فِي الدِّينِ وَلَوْ أَنَّهُمْ قَالُوا سَمِعْنَا وَأَطَعْنَا وَاسْمَعْ وَانْظُرْنَا لَكَانَ خَيْرًا لَهُمْ وَأَقْوَمَ وَلَكِنْ لَعَنَهُمُ اللَّهُ بِكُفْرِهِمْ فَلَا يُؤْمِنُونَ إِلَّا قَلِيلًا",
          english: "Among the Jews are some who take words out of context, and say, 'We hear and we disobey', and 'Hear without listening', and 'Observe us,' twisting with their tongues and slandering the religion. Had they said, 'We hear and we obey', and 'Listen', and 'Give us your attention,' it would have been better for them, and more upright. But God has cursed them for their disbelief; they do not believe except a little."
        },
        {
          number: 47,
          arabic: "يَا أَيُّهَا الَّذِينَ أُوتُوا الْكِتَابَ آمِنُوا بِمَا نَزَّلْنَا مُصَدِّقًا لِمَا مَعَكُمْ مِنْ قَبْلِ أَنْ نَطْمِسَ وُجُوهًا فَنَرُدَّهَا عَلَى أَدْبَارِهَا أَوْ نَلْعَنَهُمْ كَمَا لَعَنَّا أَصْحَابَ السَّبْتِ وَكَانَ أَمْرُ اللَّهِ مَفْعُولًا",
          english: "O you who were given the Book! Believe in what We sent down, confirming what you have, before We obliterate faces and turn them inside out, or curse them as We cursed the Sabbath-breakers. The command of God is always done."
        },
        {
          number: 48,
          arabic: "إِنَّ اللَّهَ لَا يَغْفِرُ أَنْ يُشْرَكَ بِهِ وَيَغْفِرُ مَا دُونَ ذَلِكَ لِمَنْ يَشَاءُ وَمَنْ يُشْرِكْ بِاللَّهِ فَقَدِ افْتَرَى إِثْمًا عَظِيمًا",
          english: "God does not forgive association with Him, but He forgives anything less than that to whomever He wills. Whoever associates anything with God has devised a monstrous sin."
        },
        {
          number: 49,
          arabic: "أَلَمْ تَرَ إِلَى الَّذِينَ يُزَكُّونَ أَنْفُسَهُمْ بَلِ اللَّهُ يُزَكِّي مَنْ يَشَاءُ وَلَا يُظْلَمُونَ فَتِيلًا",
          english: "Have you not considered those who claim purity for themselves? Rather, God purifies whom He wills, and they will not be wronged a whit."
        },
        {
          number: 50,
          arabic: "انْظُرْ كَيْفَ يَفْتَرُونَ عَلَى اللَّهِ الْكَذِبَ وَكَفَى بِهِ إِثْمًا مُبِينًا",
          english: "See how they devise lies against God. That alone is an outright sin."
        },
        {
          number: 51,
          arabic: "أَلَمْ تَرَ إِلَى الَّذِينَ أُوتُوا نَصِيبًا مِنَ الْكِتَابِ يُؤْمِنُونَ بِالْجِبْتِ وَالطَّاغُوتِ وَيَقُولُونَ لِلَّذِينَ كَفَرُوا هَؤُلَاءِ أَهْدَى مِنَ الَّذِينَ آمَنُوا سَبِيلًا",
          english: "Have you not considered those who were given a share of the Book? They believe in superstition and evil powers, and say of those who disbelieve, 'These are better guided on the way than the believers.'"
        },
        {
          number: 52,
          arabic: "أُولَئِكَ الَّذِينَ لَعَنَهُمُ اللَّهُ وَمَنْ يَلْعَنِ اللَّهُ فَلَنْ تَجِدَ لَهُ نَصِيرًا",
          english: "Those are they whom God has cursed. Whomever God curses, you will find no savior for him."
        },
        {
          number: 53,
          arabic: "أَمْ لَهُمْ نَصِيبٌ مِنَ الْمُلْكِ فَإِذًا لَا يُؤْتُونَ النَّاسَ نَقِيرًا",
          english: "Or do they own a share of the kingdom? Then they would not give people a speck."
        },
        {
          number: 54,
          arabic: "أَمْ يَحْسُدُونَ النَّاسَ عَلَى مَا آتَاهُمُ اللَّهُ مِنْ فَضْلِهِ فَقَدْ آتَيْنَا آلَ إِبْرَاهِيمَ الْكِتَابَ وَالْحِكْمَةَ وَآتَيْنَاهُمْ مُلْكًا عَظِيمًا",
          english: "Or do they envy the people for what God has given them of His grace? We have given the family of Abraham the Book and wisdom, and We have given them a great kingdom."
        },
        {
          number: 55,
          arabic: "فَمِنْهُمْ مَنْ آمَنَ بِهِ وَمِنْهُمْ مَنْ صَدَّ عَنْهُ وَكَفَى بِجَهَنَّمَ سَعِيرًا",
          english: "Among them are those who believed in it, and among them are those who held back from it. Hell is a sufficient Inferno."
        },
        {
          number: 56,
          arabic: "إِنَّ الَّذِينَ كَفَرُوا بِآيَاتِنَا سَوْفَ نُصْلِيهِمْ نَارًا كُلَّمَا نَضِجَتْ جُلُودُهُمْ بَدَّلْنَاهُمْ جُلُودًا غَيْرَهَا لِيَذُوقُوا الْعَذَابَ إِنَّ اللَّهَ كَانَ عَزِيزًا حَكِيمًا",
          english: "Those who reject Our revelations—We will scorch them in a Fire. Every time their skins are cooked, We will replace them with other skins, so they will experience the suffering. God is Most Powerful, Most Wise."
        },
        {
          number: 57,
          arabic: "وَالَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ سَنُدْخِلُهُمْ جَنَّاتٍ تَجْرِي مِنْ تَحْتِهَا الْأَنْهَارُ خَالِدِينَ فِيهَا أَبَدًا لَهُمْ فِيهَا أَزْوَاجٌ مُطَهَّرَةٌ وَنُدْخِلُهُمْ ظِلًّا ظَلِيلًا",
          english: "As for those who believe and do good deeds, We will admit them into Gardens beneath which rivers flow, abiding therein forever. They will have purified spouses therein, and We will admit them into a shady shade."
        },
        {
          number: 58,
          arabic: "إِنَّ اللَّهَ يَأْمُرُكُمْ أَنْ تُؤَدُّوا الْأَمَانَاتِ إِلَى أَهْلِهَا وَإِذَا حَكَمْتُمْ بَيْنَ النَّاسِ أَنْ تَحْكُمُوا بِالْعَدْلِ إِنَّ اللَّهَ نِعِمَّا يَعِظُكُمْ بِهِ إِنَّ اللَّهَ كَانَ سَمِيعًا بَصِيرًا",
          english: "God instructs you to give back things entrusted to you to their owners. And when you judge between people, judge with justice. God's instructions to you are excellent. God is All-Hearing, All-Seeing."
        },
        {
          number: 59,
          arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا أَطِيعُوا اللَّهَ وَأَطِيعُوا الرَّسُولَ وَأُولِي الْأَمْرِ مِنْكُمْ فَإِنْ تَنَازَعْتُمْ فِي شَيْءٍ فَرُدُّوهُ إِلَى اللَّهِ وَالرَّسُولِ إِنْ كُنْتُمْ تُؤْمِنُونَ بِاللَّهِ وَالْيَوْمِ الْآخِرِ ذَلِكَ خَيْرٌ وَأَحْسَنُ تَأْوِيلًا",
          english: "O you who believe! Obey God and obey the Messenger and those in authority among you. And if you dispute over anything, refer it to God and the Messenger, if you believe in God and the Last Day. That is best, and a most excellent determination."
        },
        {
          number: 60,
          arabic: "أَلَمْ تَرَ إِلَى الَّذِينَ يَزْعُمُونَ أَنَّهُمْ آمَنُوا بِمَا أُنْزِلَ إِلَيْكَ وَمَا أُنْزِلَ مِنْ قَبْلِكَ يُرِيدُونَ أَنْ يَتَحَاكَمُوا إِلَى الطَّاغُوتِ وَقَدْ أُمِرُوا أَنْ يَكْفُرُوا بِهِ وَيُرِيدُ الشَّيْطَانُ أَنْ يُضِلَّهُمْ ضَلَالًا بَعِيدًا",
          english: "Have you not observed those who claim that they believe in what was revealed to you, and in what was revealed before you, yet they seek Satanic sources for legislation, in spite of being commanded to reject them? Satan means to mislead them far away."
        },
        {
          number: 61,
          arabic: "وَإِذَا قِيلَ لَهُمْ تَعَالَوْا إِلَى مَا أَنْزَلَ اللَّهُ وَإِلَى الرَّسُولِ رَأَيْتَ الْمُنَافِقِينَ يَصُدُّونَ عَنْكَ صُدُودًا",
          english: "And when it is said to them, 'Come to what God has revealed, and to the Messenger,' you see the hypocrites shunning you completely."
        },
        {
          number: 62,
          arabic: "فَكَيْفَ إِذَا أَصَابَتْهُمْ مُصِيبَةٌ بِمَا قَدَّمَتْ أَيْدِيهِمْ ثُمَّ جَاءُوكَ يَحْلِفُونَ بِاللَّهِ إِنْ أَرَدْنَا إِلَّا إِحْسَانًا وَتَوْفِيقًا",
          english: "How about when a disaster strikes them because what their hands have put forward, and then they come to you swearing by God: 'We only intended goodwill and reconciliation'?"
        },
        {
          number: 63,
          arabic: "أُولَئِكَ الَّذِينَ يَعْلَمُ اللَّهُ مَا فِي قُلُوبِهِمْ فَأَعْرِضْ عَنْهُمْ وَعِظْهُمْ وَقُلْ لَهُمْ فِي أَنْفُسِهِمْ قَوْلًا بَلِيغًا",
          english: "They are those whom God knows what is in their hearts. So ignore them, and admonish them, and say to them concerning themselves penetrating words."
        },
        {
          number: 64,
          arabic: "وَمَا أَرْسَلْنَا مِنْ رَسُولٍ إِلَّا لِيُطَاعَ بِإِذْنِ اللَّهِ وَلَوْ أَنَّهُمْ إِذْ ظَلَمُوا أَنْفُسَهُمْ جَاءُوكَ فَاسْتَغْفَرُوا اللَّهَ وَاسْتَغْفَرَ لَهُمُ الرَّسُولُ لَوَجَدُوا اللَّهَ تَوَّابًا رَحِيمًا",
          english: "We did not send any messenger except to be obeyed by God's leave. Had they, when they wronged themselves, come to you, and prayed for God's forgiveness, and the Messenger had prayed for their forgiveness, they would have found God Relenting and Merciful."
        },
        {
          number: 65,
          arabic: "فَلَا وَرَبِّكَ لَا يُؤْمِنُونَ حَتَّى يُحَكِّمُوكَ فِيمَا شَجَرَ بَيْنَهُمْ ثُمَّ لَا يَجِدُوا فِي أَنْفُسِهِمْ حَرَجًا مِمَّا قَضَيْتَ وَيُسَلِّمُوا تَسْلِيمًا",
          english: "But no, by your Lord, they will not believe until they call you to arbitrate in their disputes, and then find within themselves no resentment regarding your decisions, and submit themselves completely."
        },
        {
          number: 66,
          arabic: "وَلَوْ أَنَّا كَتَبْنَا عَلَيْهِمْ أَنِ اقْتُلُوا أَنْفُسَكُمْ أَوِ اخْرُجُوا مِنْ دِيَارِكُمْ مَا فَعَلُوهُ إِلَّا قَلِيلٌ مِنْهُمْ وَلَوْ أَنَّهُمْ فَعَلُوا مَا يُوعَظُونَ بِهِ لَكَانَ خَيْرًا لَهُمْ وَأَشَدَّ تَثْبِيتًا",
          english: "Had We decreed for them: 'Kill yourselves,' or 'Leave your homes,' they would not have done it, except for a few of them. But had they done what they were instructed to do, it would have been better for them, and a firmer confirmation."
        },
        {
          number: 67,
          arabic: "وَإِذًا لَآتَيْنَاهُمْ مِنْ لَدُنَّا أَجْرًا عَظِيمًا",
          english: "And We would have given them from Our presence a rich compensation."
        },
        {
          number: 68,
          arabic: "وَلَهَدَيْنَاهُمْ صِرَاطًا مُسْتَقِيمًا",
          english: "And We would have guided them on a straight path."
        },
        {
          number: 69,
          arabic: "وَمَنْ يُطِعِ اللَّهَ وَالرَّسُولَ فَأُولَئِكَ مَعَ الَّذِينَ أَنْعَمَ اللَّهُ عَلَيْهِمْ مِنَ النَّبِيِّينَ وَالصِّدِّيقِينَ وَالشُّهَدَاءِ وَالصَّالِحِينَ وَحَسُنَ أُولَئِكَ رَفِيقًا",
          english: "Whoever obeys God and the Messenger—these are with those whom God has blessed—among the prophets, and the sincere, and the martyrs, and the upright. Excellent are those as companions."
        },
        {
          number: 70,
          arabic: "ذَلِكَ الْفَضْلُ مِنَ اللَّهِ وَكَفَى بِاللَّهِ عَلِيمًا",
          english: "That is the grace from God. God suffices as Knower."
        },
        {
          number: 71,
          arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا خُذُوا حِذْرَكُمْ فَانْفِرُوا ثُبَاتٍ أَوِ انْفِرُوا جَمِيعًا",
          english: "O you who believe! Take your precautions, and mobilize in groups, or mobilize altogether."
        },
        {
          number: 72,
          arabic: "وَإِنَّ مِنْكُمْ لَمَنْ لَيُبَطِّئَنَّ فَإِنْ أَصَابَتْكُمْ مُصِيبَةٌ قَالَ قَدْ أَنْعَمَ اللَّهُ عَلَيَّ إِذْ لَمْ أَكُنْ مَعَهُمْ شَهِيدًا",
          english: "Among you is he who lags behind. Then, when a calamity befalls you, he says, 'God has favored me, that I was not martyred with them.'"
        },
        {
          number: 73,
          arabic: "وَلَئِنْ أَصَابَكُمْ فَضْلٌ مِنَ اللَّهِ لَيَقُولَنَّ كَأَنْ لَمْ تَكُنْ بَيْنَكُمْ وَبَيْنَهُ مَوَدَّةٌ يَا لَيْتَنِي كُنْتُ مَعَهُمْ فَأَفُوزَ فَوْزًا عَظِيمًا",
          english: "But when some bounty from God comes to you, he says—as if no affection existed between you and him—'If only I had been with them, I would have achieved a great victory.'"
        },
        {
          number: 74,
          arabic: "فَلْيُقَاتِلْ فِي سَبِيلِ اللَّهِ الَّذِينَ يَشْرُونَ الْحَيَاةَ الدُّنْيَا بِالْآخِرَةِ وَمَنْ يُقَاتِلْ فِي سَبِيلِ اللَّهِ فَيُقْتَلْ أَوْ يَغْلِبْ فَسَوْفَ نُؤْتِيهِ أَجْرًا عَظِيمًا",
          english: "Let those who sell the life of this world for the Hereafter fight in the cause of God. Whoever fights in the cause of God, and then is killed, or achieves victory, We will grant him a great compensation."
        },
        {
          number: 75,
          arabic: "وَمَا لَكُمْ لَا تُقَاتِلُونَ فِي سَبِيلِ اللَّهِ وَالْمُسْتَضْعَفِينَ مِنَ الرِّجَالِ وَالنِّسَاءِ وَالْوِلْدَانِ الَّذِينَ يَقُولُونَ رَبَّنَا أَخْرِجْنَا مِنْ هَذِهِ الْقَرْيَةِ الظَّالِمِ أَهْلُهَا وَاجْعَلْ لَنَا مِنْ لَدُنْكَ وَلِيًّا وَاجْعَلْ لَنَا مِنْ لَدُنْكَ نَصِيرًا",
          english: "And why would you not fight in the cause of God, and the helpless men, and women, and children, cry out, 'Our Lord, deliver us from this town whose people are oppressive, and appoint for us from Your Presence a Protector, and appoint for us from Your Presence a Victor.'"
        },
        {
          number: 76,
          arabic: "الَّذِينَ آمَنُوا يُقَاتِلُونَ فِي سَبِيلِ اللَّهِ وَالَّذِينَ كَفَرُوا يُقَاتِلُونَ فِي سَبِيلِ الطَّاغُوتِ فَقَاتِلُوا أَوْلِيَاءَ الشَّيْطَانِ إِنَّ كَيْدَ الشَّيْطَانِ كَانَ ضَعِيفًا",
          english: "Those who believe fight in the cause of God, while those who disbelieve fight in the cause of Evil. So fight the allies of the Devil. Surely the strategy of the Devil is weak."
        },
        {
          number: 77,
          arabic: "أَلَمْ تَرَ إِلَى الَّذِينَ قِيلَ لَهُمْ كُفُّوا أَيْدِيَكُمْ وَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ فَلَمَّا كُتِبَ عَلَيْهِمُ الْقِتَالُ إِذَا فَرِيقٌ مِنْهُمْ يَخْشَوْنَ النَّاسَ كَخَشْيَةِ اللَّهِ أَوْ أَشَدَّ خَشْيَةً وَقَالُوا رَبَّنَا لِمَ كَتَبْتَ عَلَيْنَا الْقِتَالَ لَوْلَا أَخَّرْتَنَا إِلَى أَجَلٍ قَرِيبٍ قُلْ مَتَاعُ الدُّنْيَا قَلِيلٌ وَالْآخِرَةُ خَيْرٌ لِمَنِ اتَّقَى وَلَا تُظْلَمُونَ فَتِيلًا",
          english: "Have you not considered those who were told, 'Restrain your hands, and perform your prayers, and spend in regular charity'? But when fighting was ordained for them, a faction of them feared the people as God is ought to be feared, or even more. And they said, 'Our Lord, why did You ordain fighting for us? If only You would postpone it for us for a short while.' Say, 'The enjoyments of this life are brief, but the Hereafter is better for the righteous, and you will not be wronged one bit.'"
        },
        {
          number: 78,
          arabic: "أَيْنَمَا تَكُونُوا يُدْرِكْكُمُ الْمَوْتُ وَلَوْ كُنْتُمْ فِي بُرُوجٍ مُشَيَّدَةٍ وَإِنْ تُصِبْهُمْ حَسَنَةٌ يَقُولُوا هَذِهِ مِنْ عِنْدِ اللَّهِ وَإِنْ تُصِبْهُمْ سَيِّئَةٌ يَقُولُوا هَذِهِ مِنْ عِنْدِكَ قُلْ كُلٌّ مِنْ عِنْدِ اللَّهِ فَمَالِ هَؤُلَاءِ الْقَوْمِ لَا يَكَادُونَ يَفْقَهُونَ حَدِيثًا",
          english: "Wherever you may be, death will catch up with you, even if you were in fortified towers. When a good fortune comes their way, they say, 'This is from God.' But when a misfortune befalls them, they say, 'This is from you.' Say, 'All is from God.' So what is the matter with these people, that they hardly understand a thing?"
        },
        {
          number: 79,
          arabic: "مَا أَصَابَكَ مِنْ حَسَنَةٍ فَمِنَ اللَّهِ وَمَا أَصَابَكَ مِنْ سَيِّئَةٍ فَمِنْ نَفْسِكَ وَأَرْسَلْنَاكَ لِلنَّاسِ رَسُولًا وَكَفَى بِاللَّهِ شَهِيدًا",
          english: "Whatever good happens to you is from God, and whatever bad happens to you is from your own self. We sent you to humanity as a messenger, and God is Witness enough."
        },
        {
          number: 80,
          arabic: "مَنْ يُطِعِ الرَّسُولَ فَقَدْ أَطَاعَ اللَّهَ وَمَنْ تَوَلَّى فَمَا أَرْسَلْنَاكَ عَلَيْهِمْ حَفِيظًا",
          english: "Whoever obeys the Messenger is obeying God. And whoever turns away—We did not send you as a watcher over them."
        },
        {
          number: 81,
          arabic: "وَيَقُولُونَ طَاعَةٌ فَإِذَا بَرَزُوا مِنْ عِنْدِكَ بَيَّتَ طَائِفَةٌ مِنْهُمْ غَيْرَ الَّذِي تَقُولُ وَاللَّهُ يَكْتُبُ مَا يُبَيِّتُونَ فَأَعْرِضْ عَنْهُمْ وَتَوَكَّلْ عَلَى اللَّهِ وَكَفَى بِاللَّهِ وَكِيلًا",
          english: "They profess obedience, but when they leave your presence, some of them conspire something contrary to what you said. But God writes down what they conspire. So avoid them, and put your trust in God. God is Guardian enough."
        },
        {
          number: 82,
          arabic: "أَفَلَا يَتَدَبَّرُونَ الْقُرْآنَ وَلَوْ كَانَ مِنْ عِنْدِ غَيْرِ اللَّهِ لَوَجَدُوا فِيهِ اخْتِلَافًا كَثِيرًا",
          english: "Do they not ponder the Quran? Had it been from any other than God, they would have found in it much discrepancy."
        },
        {
          number: 83,
          arabic: "وَإِذَا جَاءَهُمْ أَمْرٌ مِنَ الْأَمْنِ أَوِ الْخَوْفِ أَذَاعُوا بِهِ وَلَوْ رَدُّوهُ إِلَى الرَّسُولِ وَإِلَى أُولِي الْأَمْرِ مِنْهُمْ لَعَلِمَهُ الَّذِينَ يَسْتَنْبِطُونَهُ مِنْهُمْ وَلَوْلَا فَضْلُ اللَّهِ عَلَيْكُمْ وَرَحْمَتُهُ لَاتَّبَعْتُمُ الشَّيْطَانَ إِلَّا قَلِيلًا",
          english: "When some news of security or alarm comes their way, they broadcast it. But had they referred it to the Messenger, and to those in authority among them, those who can draw conclusions from it would have comprehended it. Were it not for God's blessing and mercy upon you, you would have followed the Devil, except for a few."
        },
        {
          number: 84,
          arabic: "فَقَاتِلْ فِي سَبِيلِ اللَّهِ لَا تُكَلَّفُ إِلَّا نَفْسَكَ وَحَرِّضِ الْمُؤْمِنِينَ عَسَى اللَّهُ أَنْ يَكُفَّ بَأْسَ الَّذِينَ كَفَرُوا وَاللَّهُ أَشَدُّ بَأْسًا وَأَشَدُّ تَنْكِيلًا",
          english: "So fight in the cause of God; you are responsible only for yourself. And rouse the believers. Perhaps God will restrain the might of those who disbelieve. God is Stronger in Might, and More Punishing."
        },
        {
          number: 85,
          arabic: "مَنْ يَشْفَعْ شَفَاعَةً حَسَنَةً يَكُنْ لَهُ نَصِيبٌ مِنْهَا وَمَنْ يَشْفَعْ شَفَاعَةً سَيِّئَةً يَكُنْ لَهُ كِفْلٌ مِنْهَا وَكَانَ اللَّهُ عَلَى كُلِّ شَيْءٍ مُقِيتًا",
          english: "Whoever intercedes for a good cause has a share in it, and whoever intercedes for an evil cause shares in its burdens. God keeps watch over everything."
        },
        {
          number: 86,
          arabic: "وَإِذَا حُيِّيتُمْ بِتَحِيَّةٍ فَحَيُّوا بِأَحْسَنَ مِنْهَا أَوْ رُدُّوهَا إِنَّ اللَّهَ كَانَ عَلَى كُلِّ شَيْءٍ حَسِيبًا",
          english: "When you are greeted with a greeting, respond with a better greeting, or return it. God keeps count of everything."
        },
        {
          number: 87,
          arabic: "اللَّهُ لَا إِلَهَ إِلَّا هُوَ لَيَجْمَعَنَّكُمْ إِلَى يَوْمِ الْقِيَامَةِ لَا رَيْبَ فِيهِ وَمَنْ أَصْدَقُ مِنَ اللَّهِ حَدِيثًا",
          english: "God—there is no god except He. He will gather you to the Day of Resurrection, in which there is no doubt. And who speaks more truly than God?"
        },
        {
          number: 88,
          arabic: "فَمَا لَكُمْ فِي الْمُنَافِقِينَ فِئَتَيْنِ وَاللَّهُ أَرْكَسَهُمْ بِمَا كَسَبُوا أَتُرِيدُونَ أَنْ تَهْدُوا مَنْ أَضَلَّ اللَّهُ وَمَنْ يُضْلِلِ اللَّهُ فَلَنْ تَجِدَ لَهُ سَبِيلًا",
          english: "What is the matter with you, divided into two factions regarding the hypocrites, when God Himself has overwhelmed them on account of what they did? Do you want to guide those whom God has led astray? Whomever God leads astray—you will never find for him a way."
        },
        {
          number: 89,
          arabic: "وَدُّوا لَوْ تَكْفُرُونَ كَمَا كَفَرُوا فَتَكُونُونَ سَوَاءً فَلَا تَتَّخِذُوا مِنْهُمْ أَوْلِيَاءَ حَتَّى يُهَاجِرُوا فِي سَبِيلِ اللَّهِ فَإِنْ تَوَلَّوْا فَخُذُوهُمْ وَاقْتُلُوهُمْ حَيْثُ وَجَدْتُمُوهُمْ وَلَا تَتَّخِذُوا مِنْهُمْ وَلِيًّا وَلَا نَصِيرًا",
          english: "They would love to see you disbelieve, just as they disbelieve, so you would become equal. So do not befriend any of them, unless they emigrate in the way of God. If they turn away, seize them and execute them wherever you may find them; and do not take from among them allies or supporters."
        },
        {
          number: 90,
          arabic: "إِلَّا الَّذِينَ يَصِلُونَ إِلَى قَوْمٍ بَيْنَكُمْ وَبَيْنَهُمْ مِيثَاقٌ أَوْ جَاءُوكُمْ حَصِرَتْ صُدُورُهُمْ أَنْ يُقَاتِلُوكُمْ أَوْ يُقَاتِلُوا قَوْمَهُمْ وَلَوْ شَاءَ اللَّهُ لَسَلَّطَهُمْ عَلَيْكُمْ فَلَقَاتَلُوكُمْ فَإِنِ اعْتَزَلُوكُمْ فَلَمْ يُقَاتِلُوكُمْ وَأَلْقَوْا إِلَيْكُمُ السَّلَمَ فَمَا جَعَلَ اللَّهُ لَكُمْ عَلَيْهِمْ سَبِيلًا",
          english: "Except those who join people with whom you have a treaty, or those who come to you reluctant to fight you or fight their own people. Had God willed, He would have given them power over you, and they would have fought you. If they withdraw from you, and do not fight you, and offer you peace, then God assigns no excuse for you against them."
        },
        {
          number: 91,
          arabic: "سَتَجِدُونَ آخَرِينَ يُرِيدُونَ أَنْ يَأْمَنُوكُمْ وَيَأْمَنُوا قَوْمَهُمْ كُلَّ مَا رُدُّوا إِلَى الْفِتْنَةِ أُرْكِسُوا فِيهَا فَإِنْ لَمْ يَعْتَزِلُوكُمْ وَيُلْقُوا إِلَيْكُمُ السَّلَمَ وَيَكُفُّوا أَيْدِيَهُمْ فَخُذُوهُمْ وَاقْتُلُوهُمْ حَيْثُ ثَقِفْتُمُوهُمْ وَأُولَئِكُمْ جَعَلْنَا لَكُمْ عَلَيْهِمْ سُلْطَانًا مُبِينًا",
          english: "You will find others who want security from you, and security from their own people. But whenever they are tempted into civil discord, they plunge into it. So if they do not withdraw from you, nor offer you peace, nor restrain their hands, seize them and execute them wherever you find them. Against these, We have given you clear authorization."
        },
        {
          number: 92,
          arabic: "وَمَا كَانَ لِمُؤْمِنٍ أَنْ يَقْتُلَ مُؤْمِنًا إِلَّا خَطَأً وَمَنْ قَتَلَ مُؤْمِنًا خَطَأً فَتَحْرِيرُ رَقَبَةٍ مُؤْمِنَةٍ وَدِيَةٌ مُسَلَّمَةٌ إِلَى أَهْلِهِ إِلَّا أَنْ يَصَّدَّقُوا فَإِنْ كَانَ مِنْ قَوْمٍ عَدُوٍّ لَكُمْ وَهُوَ مُؤْمِنٌ فَتَحْرِيرُ رَقَبَةٍ مُؤْمِنَةٍ وَإِنْ كَانَ مِنْ قَوْمٍ بَيْنَكُمْ وَبَيْنَهُمْ مِيثَاقٌ فَدِيَةٌ مُسَلَّمَةٌ إِلَى أَهْلِهِ وَتَحْرِيرُ رَقَبَةٍ مُؤْمِنَةٍ فَمَنْ لَمْ يَجِدْ فَصِيَامُ شَهْرَيْنِ مُتَتَابِعَيْنِ تَوْبَةً مِنَ اللَّهِ وَكَانَ اللَّهُ عَلِيمًا حَكِيمًا",
          english: "Never should a believer kill another believer, unless by error. Anyone who kills a believer by error must set free a believing slave, and pay compensation to the victim's family, unless they remit it as charity. If the victim belonged to a people who are hostile to you, but is a believer, then the compensation is to free a believing slave. If he belonged to a people with whom you have a treaty, then compensation should be handed over to his family, and a believing slave set free. Anyone who lacks the means must fast for two consecutive months, by way of repentance to God. God is All-Knowing, Most Wise."
        },
        {
          number: 93,
          arabic: "وَمَنْ يَقْتُلْ مُؤْمِنًا مُتَعَمِّدًا فَجَزَاؤُهُ جَهَنَّمُ خَالِدًا فِيهَا وَغَضِبَ اللَّهُ عَلَيْهِ وَلَعَنَهُ وَأَعَدَّ لَهُ عَذَابًا عَظِيمًا",
          english: "Whoever kills a believer deliberately, the penalty for him is Hell, where he will remain forever. And God will be angry with him, and will curse him, and will prepare for him a terrible punishment."
        },
        {
          number: 94,
          arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا إِذَا ضَرَبْتُمْ فِي سَبِيلِ اللَّهِ فَتَبَيَّنُوا وَلَا تَقُولُوا لِمَنْ أَلْقَى إِلَيْكُمُ السَّلَامَ لَسْتَ مُؤْمِنًا تَبْتَغُونَ عَرَضَ الْحَيَاةِ الدُّنْيَا فَعِنْدَ اللَّهِ مَغَانِمُ كَثِيرَةٌ كَذَلِكَ كُنْتُمْ مِنْ قَبْلُ فَمَنَّ اللَّهُ عَلَيْكُمْ فَتَبَيَّنُوا إِنَّ اللَّهَ كَانَ بِمَا تَعْمَلُونَ خَبِيرًا",
          english: "O you who believe! When you journey in the way of God, investigate, and do not say to him who offers you peace, 'You are not a believer,' aspiring for the goods of this world. With God are abundant riches. You yourselves were like this before, and God bestowed favor on you; so investigate. God is well aware of what you do."
        },
        {
          number: 95,
          arabic: "لَا يَسْتَوِي الْقَاعِدُونَ مِنَ الْمُؤْمِنِينَ غَيْرُ أُولِي الضَّرَرِ وَالْمُجَاهِدُونَ فِي سَبِيلِ اللَّهِ بِأَمْوَالِهِمْ وَأَنْفُسِهِمْ فَضَّلَ اللَّهُ الْمُجَاهِدِينَ بِأَمْوَالِهِمْ وَأَنْفُسِهِمْ عَلَى الْقَاعِدِينَ دَرَجَةً وَكُلًّا وَعَدَ اللَّهُ الْحُسْنَى وَفَضَّلَ اللَّهُ الْمُجَاهِدِينَ عَلَى الْقَاعِدِينَ أَجْرًا عَظِيمًا",
          english: "Not equal are the inactive among the believers—except the disabled—and the strivers in the cause of God with their possessions and their persons. God prefers the strivers with their possessions and their persons above the inactive, by a degree. But God has promised goodness to both. Yet God favors the strivers, over the inactive, with a great reward."
        },
        {
          number: 96,
          arabic: "دَرَجَاتٍ مِنْهُ وَمَغْفِرَةً وَرَحْمَةً وَكَانَ اللَّهُ غَفُورًا رَحِيمًا",
          english: "Degrees from Him, and forgiveness, and mercy. God is Forgiving and Merciful."
        },
        {
          number: 97,
          arabic: "إِنَّ الَّذِينَ تَوَفَّاهُمُ الْمَلَائِكَةُ ظَالِمِي أَنْفُسِهِمْ قَالُوا فِيمَ كُنْتُمْ قَالُوا كُنَّا مُسْتَضْعَفِينَ فِي الْأَرْضِ قَالُوا أَلَمْ تَكُنْ أَرْضُ اللَّهِ وَاسِعَةً فَتُهَاجِرُوا فِيهَا فَأُولَئِكَ مَأْوَاهُمْ جَهَنَّمُ وَسَاءَتْ مَصِيرًا",
          english: "While the angels are removing the souls of those who have wronged themselves, they will say, 'What was the matter with you?' They will say, 'We were oppressed in the land.' They will say, 'Was God's earth not vast enough for you to emigrate in it?' These—their refuge is Hell. What a wretched retreat!"
        },
        {
          number: 98,
          arabic: "إِلَّا الْمُسْتَضْعَفِينَ مِنَ الرِّجَالِ وَالنِّسَاءِ وَالْوِلْدَانِ لَا يَسْتَطِيعُونَ حِيلَةً وَلَا يَهْتَدُونَ سَبِيلًا",
          english: "Except for the weak among men, and women, and children who have no means to act, and no means to find a way out."
        },
        {
          number: 99,
          arabic: "فَأُولَئِكَ عَسَى اللَّهُ أَنْ يَعْفُوَ عَنْهُمْ وَكَانَ اللَّهُ عَفُوًّا غَفُورًا",
          english: "These—God may well pardon them. God is Pardoning and Forgiving."
        },
        {
          number: 100,
          arabic: "وَمَنْ يُهَاجِرْ فِي سَبِيلِ اللَّهِ يَجِدْ فِي الْأَرْضِ مُرَاغَمًا كَثِيرًا وَسَعَةً وَمَنْ يَخْرُجْ مِنْ بَيْتِهِ مُهَاجِرًا إِلَى اللَّهِ وَرَسُولِهِ ثُمَّ يُدْرِكْهُ الْمَوْتُ فَقَدْ وَقَعَ أَجْرُهُ عَلَى اللَّهِ وَكَانَ اللَّهُ غَفُورًا رَحِيمًا",
          english: "Anyone who emigrates for the sake of God will find on earth many places of refuge, and plentitude. Anyone who leaves his home, emigrating to God and His Messenger, and then is overtaken by death, his compensation falls on God. God is Forgiver, Most Merciful."
        },
        {
          number: 101,
          arabic: "وَإِذَا ضَرَبْتُمْ فِي الْأَرْضِ فَلَيْسَ عَلَيْكُمْ جُنَاحٌ أَنْ تَقْصُرُوا مِنَ الصَّلَاةِ إِنْ خِفْتُمْ أَنْ يَفْتِنَكُمُ الَّذِينَ كَفَرُوا إِنَّ الْكَافِرِينَ كَانُوا لَكُمْ عَدُوًّا مُبِينًا",
          english: "When you travel in the land, there is no blame on you for shortening the prayers, if you fear that the disbelievers may harm you. The disbelievers are your manifest enemies."
        },
        {
          number: 102,
          arabic: "وَإِذَا كُنْتَ فِيهِمْ فَأَقَمْتَ لَهُمُ الصَّلَاةَ فَلْتَقُمْ طَائِفَةٌ مِنْهُمْ مَعَكَ وَلْيَأْخُذُوا أَسْلِحَتَهُمْ فَإِذَا سَجَدُوا فَلْيَكُونُوا مِنْ وَرَائِكُمْ وَلْتَأْتِ طَائِفَةٌ أُخْرَى لَمْ يُصَلُّوا فَلْيُصَلُّوا مَعَكَ وَلْيَأْخُذُوا حِذْرَهُمْ وَأَسْلِحَتَهُمْ وَدَّ الَّذِينَ كَفَرُوا لَوْ تَغْفُلُونَ عَنْ أَسْلِحَتِكُمْ وَأَمْتِعَتِكُمْ فَيَمِيلُونَ عَلَيْكُمْ مَيْلَةً وَاحِدَةً وَلَا جُنَاحَ عَلَيْكُمْ إِنْ كَانَ بِكُمْ أَذًى مِنْ مَطَرٍ أَوْ كُنْتُمْ مَرْضَى أَنْ تَضَعُوا أَسْلِحَتَكُمْ وَخُذُوا حِذْرَكُمْ إِنَّ اللَّهَ أَعَدَّ لِلْكَافِرِينَ عَذَابًا مُهِينًا",
          english: "When you are among them, and you stand to lead them in prayer, let a group of them stand with you, and let them hold their weapons. Then, when they have done their prostrations, let them withdraw to the rear, and let another group, that have not prayed yet, come forward and pray with you; and let them take their precautions and their weapons. Those who disbelieve would like you to neglect your weapons and your equipment, so they can attack you in a single assault. You commit no error, if you are hampered by rain or are sick, by putting down your weapons; but take precautions. Indeed, God has prepared for the disbelievers a demeaning punishment."
        },
        {
          number: 103,
          arabic: "فَإِذَا قَضَيْتُمُ الصَّلَاةَ فَاذْكُرُوا اللَّهَ قِيَامًا وَقُعُودًا وَعَلَى جُنُوبِكُمْ فَإِذَا اطْمَأْنَنْتُمْ فَأَقِيمُوا الصَّلَاةَ إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَوْقُوتًا",
          english: "When you have completed the prayer, remember God, standing, or sitting, or on your sides. And when you feel secure, perform the prayer. The prayer is obligatory for believers at specific times."
        },
        {
          number: 104,
          arabic: "وَلَا تَهِنُوا فِي ابْتِغَاءِ الْقَوْمِ إِنْ تَكُونُوا تَأْلَمُونَ فَإِنَّهُمْ يَأْلَمُونَ كَمَا تَأْلَمُونَ وَتَرْجُونَ مِنَ اللَّهِ مَا لَا يَرْجُونَ وَكَانَ اللَّهُ عَلِيمًا حَكِيمًا",
          english: "And do not falter in the pursuit of the enemy. If you are aching, they are aching as you are aching, but you expect from God what they cannot expect. God is Knowledgeable and Wise."
        },
        {
          number: 105,
          arabic: "إِنَّا أَنْزَلْنَا إِلَيْكَ الْكِتَابَ بِالْحَقِّ لِتَحْكُمَ بَيْنَ النَّاسِ بِمَا أَرَاكَ اللَّهُ وَلَا تَكُنْ لِلْخَائِنِينَ خَصِيمًا",
          english: "We have revealed to you the Scripture, with the truth, so that you judge between people in accordance with what God has shown you. And do not be an advocate for the traitors."
        },
        {
          number: 106,
          arabic: "وَاسْتَغْفِرِ اللَّهَ إِنَّ اللَّهَ كَانَ غَفُورًا رَحِيمًا",
          english: "And ask God for forgiveness. God is Forgiver and Merciful."
        },
        {
          number: 107,
          arabic: "وَلَا تُجَادِلْ عَنِ الَّذِينَ يَخْتَانُونَ أَنْفُسَهُمْ إِنَّ اللَّهَ لَا يُحِبُّ مَنْ كَانَ خَوَّانًا أَثِيمًا",
          english: "And do not argue on behalf of those who deceive themselves. God does not love the deceitful sinner."
        },
        {
          number: 108,
          arabic: "يَسْتَخْفُونَ مِنَ النَّاسِ وَلَا يَسْتَخْفُونَ مِنَ اللَّهِ وَهُوَ مَعَهُمْ إِذْ يُبَيِّتُونَ مَا لَا يَرْضَى مِنَ الْقَوْلِ وَكَانَ اللَّهُ بِمَا يَعْمَلُونَ مُحِيطًا",
          english: "They hide from the people, but they cannot hide from God. He is with them, as they plot by night with words He does not approve. God comprehends what they do."
        },
        {
          number: 109,
          arabic: "هَا أَنْتُمْ هَؤُلَاءِ جَادَلْتُمْ عَنْهُمْ فِي الْحَيَاةِ الدُّنْيَا فَمَنْ يُجَادِلُ اللَّهَ عَنْهُمْ يَوْمَ الْقِيَامَةِ أَمْ مَنْ يَكُونُ عَلَيْهِمْ وَكِيلًا",
          english: "There you are, arguing on their behalf in the present life, but who will argue with God on their behalf on the Day of Resurrection? Or who will be their representative?"
        },
        {
          number: 110,
          arabic: "وَمَنْ يَعْمَلْ سُوءًا أَوْ يَظْلِمْ نَفْسَهُ ثُمَّ يَسْتَغْفِرِ اللَّهَ يَجِدِ اللَّهَ غَفُورًا رَحِيمًا",
          english: "Whoever commits evil, or wrongs his soul, then implores God for forgiveness, will find God Forgiving and Merciful."
        },
        {
          number: 111,
          arabic: "وَمَنْ يَكْسِبْ إِثْمًا فَإِنَّمَا يَكْسِبُهُ عَلَى نَفْسِهِ وَكَانَ اللَّهُ عَلِيمًا حَكِيمًا",
          english: "And Whoever earns a sin, earns it against himself. God is Aware and Wise."
        },
        {
          number: 112,
          arabic: "وَمَنْ يَكْسِبْ خَطِيئَةً أَوْ إِثْمًا ثُمَّ يَرْمِ بِهِ بَرِيئًا فَقَدِ احْتَمَلَ بُهْتَانًا وَإِثْمًا مُبِينًا",
          english: "And whoever commits a mistake, or a sin, and then blames it on an innocent person, has taken a slander and a clear sin."
        },
        {
          number: 113,
          arabic: "وَلَوْلَا فَضْلُ اللَّهِ عَلَيْكَ وَرَحْمَتُهُ لَهَمَّتْ طَائِفَةٌ مِنْهُمْ أَنْ يُضِلُّوكَ وَمَا يُضِلُّونَ إِلَّا أَنْفُسَهُمْ وَمَا يَضُرُّونَكَ مِنْ شَيْءٍ وَأَنْزَلَ اللَّهُ عَلَيْكَ الْكِتَابَ وَالْحِكْمَةَ وَعَلَّمَكَ مَا لَمْ تَكُنْ تَعْلَمُ وَكَانَ فَضْلُ اللَّهِ عَلَيْكَ عَظِيمًا",
          english: "Were it not for God's grace towards you, and His mercy, a faction of them would have managed to mislead you. But they only mislead themselves, and they cannot harm you in any way. God has revealed to you the Scripture and wisdom, and has taught you what you did not know. God's goodness towards you is great."
        },
        {
          number: 114,
          arabic: "لَا خَيْرَ فِي كَثِيرٍ مِنْ نَجْوَاهُمْ إِلَّا مَنْ أَمَرَ بِصَدَقَةٍ أَوْ مَعْرُوفٍ أَوْ إِصْلَاحٍ بَيْنَ النَّاسِ وَمَنْ يَفْعَلْ ذَلِكَ ابْتِغَاءَ مَرْضَاتِ اللَّهِ فَسَوْفَ نُؤْتِيهِ أَجْرًا عَظِيمًا",
          english: "There is no good in much of their private counsels, except for him who advocates charity, or kindness, or reconciliation between people. Whoever does that, seeking God's approval, We will give him a great compensation."
        },
        {
          number: 115,
          arabic: "وَمَنْ يُشَاقِقِ الرَّسُولَ مِنْ بَعْدِ مَا تَبَيَّنَ لَهُ الْهُدَى وَيَتَّبِعْ غَيْرَ سَبِيلِ الْمُؤْمِنِينَ نُوَلِّهِ مَا تَوَلَّى وَنُصْلِهِ جَهَنَّمَ وَسَاءَتْ مَصِيرًا",
          english: "Whoever makes a breach with the Messenger, after the guidance has become clear to him, and follows other than the path of the believers, We will direct him in the direction he has chosen, and commit him to Hell—what a terrible destination!"
        },
        {
          number: 116,
          arabic: "إِنَّ اللَّهَ لَا يَغْفِرُ أَنْ يُشْرَكَ بِهِ وَيَغْفِرُ مَا دُونَ ذَلِكَ لِمَنْ يَشَاءُ وَمَنْ يُشْرِكْ بِاللَّهِ فَقَدْ ضَلَّ ضَلَالًا بَعِيدًا",
          english: "God will not forgive that partners be associated with Him; but will forgive anything less than that, to whomever He wills. Anyone who ascribes partners to God has strayed into far error."
        },
        {
          number: 117,
          arabic: "إِنْ يَدْعُونَ مِنْ دُونِهِ إِلَّا إِنَاثًا وَإِنْ يَدْعُونَ إِلَّا شَيْطَانًا مَرِيدًا",
          english: "They invoke in His stead only females. In fact, they invoke none but a rebellious devil."
        },
        {
          number: 118,
          arabic: "لَعَنَهُ اللَّهُ وَقَالَ لَأَتَّخِذَنَّ مِنْ عِبَادِكَ نَصِيبًا مَفْرُوضًا",
          english: "God has cursed him. And he said, 'I will take to myself my due share of Your servants.'"
        },
        {
          number: 119,
          arabic: "وَلَأُضِلَّنَّهُمْ وَلَأُمَنِّيَنَّهُمْ وَلَآمُرَنَّهُمْ فَلَيُبَتِّكُنَّ آذَانَ الْأَنْعَامِ وَلَآمُرَنَّهُمْ فَلَيُغَيِّرُنَّ خَلْقَ اللَّهِ وَمَنْ يَتَّخِذِ الشَّيْطَانَ وَلِيًّا مِنْ دُونِ اللَّهِ فَقَدْ خَسِرَ خُسْرَانًا مُبِينًا",
          english: "'And I will mislead them, and I will entice them, and I will prompt them to slit the ears of cattle, and I will prompt them to alter the creation of God.' Whoever takes Satan as a lord, instead of God, has surely suffered a profound loss."
        },
        {
          number: 120,
          arabic: "يَعِدُهُمْ وَيُمَنِّيهِمْ وَمَا يَعِدُهُمُ الشَّيْطَانُ إِلَّا غُرُورًا",
          english: "He promises them, and he raises their expectations, but Satan promises them nothing but delusions."
        },
        {
          number: 121,
          arabic: "أُولَئِكَ مَأْوَاهُمْ جَهَنَّمُ وَلَا يَجِدُونَ عَنْهَا مَحِيصًا",
          english: "These—their place is Hell, and they will find no escape from it."
        },
        {
          number: 122,
          arabic: "وَالَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ سَنُدْخِلُهُمْ جَنَّاتٍ تَجْرِي مِنْ تَحْتِهَا الْأَنْهَارُ خَالِدِينَ فِيهَا أَبَدًا وَعْدَ اللَّهِ حَقًّا وَمَنْ أَصْدَقُ مِنَ اللَّهِ قِيلًا",
          english: "But as for those who believe and do righteous deeds, We will admit them into gardens beneath which rivers flow, where they will abide forever. The promise of God is true—and who is more truthful in speech than God?"
        },
        {
          number: 123,
          arabic: "لَيْسَ بِأَمَانِيِّكُمْ وَلَا أَمَانِيِّ أَهْلِ الْكِتَابِ مَنْ يَعْمَلْ سُوءًا يُجْزَ بِهِ وَلَا يَجِدْ لَهُ مِنْ دُونِ اللَّهِ وَلِيًّا وَلَا نَصِيرًا",
          english: "It is not in accordance with your wishes, nor in accordance with the wishes of the People of the Scripture. Whoever works evil will pay for it, and will not find for himself, besides God, any protector or savior."
        },
        {
          number: 124,
          arabic: "وَمَنْ يَعْمَلْ مِنَ الصَّالِحَاتِ مِنْ ذَكَرٍ أَوْ أُنْثَى وَهُوَ مُؤْمِنٌ فَأُولَئِكَ يَدْخُلُونَ الْجَنَّةَ وَلَا يُظْلَمُونَ نَقِيرًا",
          english: "But whoever works righteousness, whether male or female, and is a believer—those will enter Paradise, and will not be wronged a whit."
        },
        {
          number: 125,
          arabic: "وَمَنْ أَحْسَنُ دِينًا مِمَّنْ أَسْلَمَ وَجْهَهُ لِلَّهِ وَهُوَ مُحْسِنٌ وَاتَّبَعَ مِلَّةَ إِبْرَاهِيمَ حَنِيفًا وَاتَّخَذَ اللَّهُ إِبْرَاهِيمَ خَلِيلًا",
          english: "And who is better in religion than he who submits himself wholly to God, and is a doer of good, and follows the faith of Abraham the Monotheist? God has chosen Abraham for a friend."
        },
        {
          number: 126,
          arabic: "وَلِلَّهِ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ وَكَانَ اللَّهُ بِكُلِّ شَيْءٍ مُحِيطًا",
          english: "To God belongs what is in the heavens and what is on earth, and God encompasses everything."
        },
        {
          number: 127,
          arabic: "وَيَسْتَفْتُونَكَ فِي النِّسَاءِ قُلِ اللَّهُ يُفْتِيكُمْ فِيهِنَّ وَمَا يُتْلَى عَلَيْكُمْ فِي الْكِتَابِ فِي يَتَامَى النِّسَاءِ اللَّاتِي لَا تُؤْتُونَهُنَّ مَا كُتِبَ لَهُنَّ وَتَرْغَبُونَ أَنْ تَنْكِحُوهُنَّ وَالْمُسْتَضْعَفِينَ مِنَ الْوِلْدَانِ وَأَنْ تَقُومُوا لِلْيَتَامَى بِالْقِسْطِ وَمَا تَفْعَلُوا مِنْ خَيْرٍ فَإِنَّ اللَّهَ كَانَ بِهِ عَلِيمًا",
          english: "They ask you for a ruling about women. Say, 'God gives you a ruling about them, and so does what is stated to you in the Book about widowed women from whom you withhold what is decreed for them, yet you desire to marry them, and about helpless children: that you should treat the orphans fairly.' Whatever good you do, God knows it."
        },
        {
          number: 128,
          arabic: "وَإِنِ امْرَأَةٌ خَافَتْ مِنْ بَعْلِهَا نُشُوزًا أَوْ إِعْرَاضًا فَلَا جُنَاحَ عَلَيْهِمَا أَنْ يُصْلِحَا بَيْنَهُمَا صُلْحًا وَالصُّلْحُ خَيْرٌ وَأُحْضِرَتِ الْأَنْفُسُ الشُّحَّ وَإِنْ تُحْسِنُوا وَتَتَّقُوا فَإِنَّ اللَّهَ كَانَ بِمَا تَعْمَلُونَ خَبِيرًا",
          english: "If a woman fears maltreatment or desertion from her husband, there is no fault in them if they reconcile their differences, for reconciliation is best. Souls are prone to avarice; yet if you do what is good, and practice piety—God is Cognizant of what you do."
        },
        {
          number: 129,
          arabic: "وَلَنْ تَسْتَطِيعُوا أَنْ تَعْدِلُوا بَيْنَ النِّسَاءِ وَلَوْ حَرَصْتُمْ فَلَا تَمِيلُوا كُلَّ الْمَيْلِ فَتَذَرُوهَا كَالْمُعَلَّقَةِ وَإِنْ تُصْلِحُوا وَتَتَّقُوا فَإِنَّ اللَّهَ كَانَ غَفُورًا رَحِيمًا",
          english: "You will not be able to treat women with equal fairness, no matter how much you desire it. But do not be so biased as to leave another suspended. If you make amends, and act righteously—God is Forgiving and Merciful."
        },
        {
          number: 130,
          arabic: "وَإِنْ يَتَفَرَّقَا يُغْنِ اللَّهُ كُلًّا مِنْ سَعَتِهِ وَكَانَ اللَّهُ وَاسِعًا حَكِيمًا",
          english: "And if they separate, God will enrich each from His abundance. God is Bounteous and Wise."
        },
        {
          number: 131,
          arabic: "وَلِلَّهِ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ وَلَقَدْ وَصَّيْنَا الَّذِينَ أُوتُوا الْكِتَابَ مِنْ قَبْلِكُمْ وَإِيَّاكُمْ أَنِ اتَّقُوا اللَّهَ وَإِنْ تَكْفُرُوا فَإِنَّ لِلَّهِ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ وَكَانَ اللَّهُ غَنِيًّا حَمِيدًا",
          english: "To God belongs everything in the heavens and everything on earth. We have instructed those who were given the Book before you, and you, to be conscious of God. But if you refuse—to God belongs everything in the heavens and everything on earth. God is in no need, Praiseworthy."
        },
        {
          number: 132,
          arabic: "وَلِلَّهِ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ وَكَفَى بِاللَّهِ وَكِيلًا",
          english: "To God belongs everything in the heavens and everything on earth. God suffices as Manager."
        },
        {
          number: 133,
          arabic: "إِنْ يَشَأْ يُذْهِبْكُمْ أَيُّهَا النَّاسُ وَيَأْتِ بِآخَرِينَ وَكَانَ اللَّهُ عَلَى ذَلِكَ قَدِيرًا",
          english: "If He wills, He can do away with you, O people, and bring others. God is Able to do that."
        },
        {
          number: 134,
          arabic: "مَنْ كَانَ يُرِيدُ ثَوَابَ الدُّنْيَا فَعِنْدَ اللَّهِ ثَوَابُ الدُّنْيَا وَالْآخِرَةِ وَكَانَ اللَّهُ سَمِيعًا بَصِيرًا",
          english: "Whoever desires the reward of this world—with God is the reward of this world and the next. God is All-Hearing, All-Seeing."
        },
        {
          number: 135,
          arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا كُونُوا قَوَّامِينَ بِالْقِسْطِ شُهَدَاءَ لِلَّهِ وَلَوْ عَلَى أَنْفُسِكُمْ أَوِ الْوَالِدَيْنِ وَالْأَقْرَبِينَ إِنْ يَكُنْ غَنِيًّا أَوْ فَقِيرًا فَاللَّهُ أَوْلَى بِهِمَا فَلَا تَتَّبِعُوا الْهَوَى أَنْ تَعْدِلُوا وَإِنْ تَلْوُوا أَوْ تُعْرِضُوا فَإِنَّ اللَّهَ كَانَ بِمَا تَعْمَلُونَ خَبِيرًا",
          english: "O you who believe! Stand firmly for justice, as witnesses to God, even if against yourselves, or your parents, or your relatives. Whether one is rich or poor, God takes care of both. So do not follow your desires, lest you swerve. If you deviate, or turn away—then God is Aware of what you do."
        },
        {
          number: 136,
          arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا آمِنُوا بِاللَّهِ وَرَسُولِهِ وَالْكِتَابِ الَّذِي نَزَّلَ عَلَى رَسُولِهِ وَالْكِتَابِ الَّذِي أَنْزَلَ مِنْ قَبْلُ وَمَنْ يَكْفُرْ بِاللَّهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ وَالْيَوْمِ الْآخِرِ فَقَدْ ضَلَّ ضَلَالًا بَعِيدًا",
          english: "O you who believe! Believe in God and His messenger, and the Book He sent down to His messenger, and the Book He sent down before. Whoever rejects God, His angels, His Books, His messengers, and the Last Day, has strayed far in error."
        },
        {
          number: 137,
          arabic: "إِنَّ الَّذِينَ آمَنُوا ثُمَّ كَفَرُوا ثُمَّ آمَنُوا ثُمَّ كَفَرُوا ثُمَّ ازْدَادُوا كُفْرًا لَمْ يَكُنِ اللَّهُ لِيَغْفِرَ لَهُمْ وَلَا لِيَهْدِيَهُمْ سَبِيلًا",
          english: "Those who believe, then disbelieve, then believe, then disbelieve, then increase in disbelief, God will not forgive them, nor will He guide them to a way."
        },
        {
          number: 138,
          arabic: "بَشِّرِ الْمُنَافِقِينَ بِأَنَّ لَهُمْ عَذَابًا أَلِيمًا",
          english: "Inform the hypocrites that they will have a painful punishment."
        },
        {
          number: 139,
          arabic: "الَّذِينَ يَتَّخِذُونَ الْكَافِرِينَ أَوْلِيَاءَ مِنْ دُونِ الْمُؤْمِنِينَ أَيَبْتَغُونَ عِنْدَهُمُ الْعِزَّةَ فَإِنَّ الْعِزَّةَ لِلَّهِ جَمِيعًا",
          english: "Those who ally themselves with the disbelievers instead of the believers. Do they seek glory in them? All glory belongs to God."
        },
        {
          number: 140,
          arabic: "وَقَدْ نَزَّلَ عَلَيْكُمْ فِي الْكِتَابِ أَنْ إِذَا سَمِعْتُمْ آيَاتِ اللَّهِ يُكْفَرُ بِهَا وَيُسْتَهْزَأُ بِهَا فَلَا تَقْعُدُوا مَعَهُمْ حَتَّى يَخُوضُوا فِي حَدِيثٍ غَيْرِهِ إِنَّكُمْ إِذًا مِثْلُهُمْ إِنَّ اللَّهَ جَامِعُ الْمُنَافِقِينَ وَالْكَافِرِينَ فِي جَهَنَّمَ جَمِيعًا",
          english: "He has revealed to you in the Book that when you hear God's revelations being rejected, or ridiculed, do not sit with them until they engage in some other subject. Otherwise, you would be like them. God will gather the hypocrites and the disbelievers, into Hell, altogether."
        },
        {
          number: 141,
          arabic: "الَّذِينَ يَتَرَبَّصُونَ بِكُمْ فَإِنْ كَانَ لَكُمْ فَتْحٌ مِنَ اللَّهِ قَالُوا أَلَمْ نَكُنْ مَعَكُمْ وَإِنْ كَانَ لِلْكَافِرِينَ نَصِيبٌ قَالُوا أَلَمْ نَسْتَحْوِذْ عَلَيْكُمْ وَنَمْنَعْكُمْ مِنَ الْمُؤْمِنِينَ فَاللَّهُ يَحْكُمُ بَيْنَكُمْ يَوْمَ الْقِيَامَةِ وَلَنْ يَجْعَلَ اللَّهُ لِلْكَافِرِينَ عَلَى الْمُؤْمِنِينَ سَبِيلًا",
          english: "Those who lie in wait for you: if you attain victory from God, they say, 'Were we not with you?' But if the disbelievers get a turn, they say, 'Did we not side with you, and defend you from the believers?' God will judge between you on the Day of Resurrection; and God will give the disbelievers no means of overcoming the believers."
        },
        {
          number: 142,
          arabic: "إِنَّ الْمُنَافِقِينَ يُخَادِعُونَ اللَّهَ وَهُوَ خَادِعُهُمْ وَإِذَا قَامُوا إِلَى الصَّلَاةِ قَامُوا كُسَالَى يُرَاءُونَ النَّاسَ وَلَا يَذْكُرُونَ اللَّهَ إِلَّا قَلِيلًا",
          english: "The hypocrites try to deceive God, but He is deceiving them. And when they stand for prayer, they stand lazily, showing off in front of people, and remembering God only a little."
        },
        {
          number: 143,
          arabic: "مُذَبْذَبِينَ بَيْنَ ذَلِكَ لَا إِلَى هَؤُلَاءِ وَلَا إِلَى هَؤُلَاءِ وَمَنْ يُضْلِلِ اللَّهُ فَلَنْ تَجِدَ لَهُ سَبِيلًا",
          english: "Wavering in between, neither with these, nor with those. Whomever God sends astray, you will never find for him a way."
        },
        {
          number: 144,
          arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا لَا تَتَّخِذُوا الْكَافِرِينَ أَوْلِيَاءَ مِنْ دُونِ الْمُؤْمِنِينَ أَتُرِيدُونَ أَنْ تَجْعَلُوا لِلَّهِ عَلَيْكُمْ سُلْطَانًا مُبِينًا",
          english: "O you who believe! Do not befriend disbelievers rather than believers. Do you want to give God a clear case against you?"
        },
        {
          number: 145,
          arabic: "إِنَّ الْمُنَافِقِينَ فِي الدَّرْكِ الْأَسْفَلِ مِنَ النَّارِ وَلَنْ تَجِدَ لَهُمْ نَصِيرًا",
          english: "The hypocrites will be in the lowest level of the Fire, and you will find no helper for them."
        },
        {
          number: 146,
          arabic: "إِلَّا الَّذِينَ تَابُوا وَأَصْلَحُوا وَاعْتَصَمُوا بِاللَّهِ وَأَخْلَصُوا دِينَهُمْ لِلَّهِ فَأُولَئِكَ مَعَ الْمُؤْمِنِينَ وَسَوْفَ يُؤْتِ اللَّهُ الْمُؤْمِنِينَ أَجْرًا عَظِيمًا",
          english: "Except those who repent, and reform, and hold fast to God, and dedicate their religion to God alone. These are with the believers; and God will give the believers a great reward."
        },
        {
          number: 147,
          arabic: "مَا يَفْعَلُ اللَّهُ بِعَذَابِكُمْ إِنْ شَكَرْتُمْ وَآمَنْتُمْ وَكَانَ اللَّهُ شَاكِرًا عَلِيمًا",
          english: "What would God accomplish by your punishment, if you have given thanks, and have believed? God is Appreciative and Cognizant."
        },
        {
          number: 148,
          arabic: "لَا يُحِبُّ اللَّهُ الْجَهْرَ بِالسُّوءِ مِنَ الْقَوْلِ إِلَّا مَنْ ظُلِمَ وَكَانَ اللَّهُ سَمِيعًا عَلِيمًا",
          english: "God does not like the public uttering of bad language, unless someone was wronged. God is Hearing and Knowing."
        },
        {
          number: 149,
          arabic: "إِنْ تُبْدُوا خَيْرًا أَوْ تُخْفُوهُ أَوْ تَعْفُوا عَنْ سُوءٍ فَإِنَّ اللَّهَ كَانَ عَفُوًّا قَدِيرًا",
          english: "If you let a good deed be shown, or conceal it, or pardon an offense—God is Pardoning and Capable."
        },
        {
          number: 150,
          arabic: "إِنَّ الَّذِينَ يَكْفُرُونَ بِاللَّهِ وَرُسُلِهِ وَيُرِيدُونَ أَنْ يُفَرِّقُوا بَيْنَ اللَّهِ وَرُسُلِهِ وَيَقُولُونَ نُؤْمِنُ بِبَعْضٍ وَنَكْفُرُ بِبَعْضٍ وَيُرِيدُونَ أَنْ يَتَّخِذُوا بَيْنَ ذَلِكَ سَبِيلًا",
          english: "Those who disbelieve in God and His messengers, and want to separate between God and His messengers, and say, 'We believe in some, and reject some,' and wish to take a path in between."
        },
        {
          number: 151,
          arabic: "أُولَئِكَ هُمُ الْكَافِرُونَ حَقًّا وَأَعْتَدْنَا لِلْكَافِرِينَ عَذَابًا مُهِينًا",
          english: "These are the unbelievers, truly. We have prepared for the unbelievers a shameful punishment."
        },
        {
          number: 152,
          arabic: "وَالَّذِينَ آمَنُوا بِاللَّهِ وَرُسُلِهِ وَلَمْ يُفَرِّقُوا بَيْنَ أَحَدٍ مِنْهُمْ أُولَئِكَ سَوْفَ يُؤْتِيهِمْ أُجُورَهُمْ وَكَانَ اللَّهُ غَفُورًا رَحِيمًا",
          english: "As for those who believe in God and His messengers, and make no distinction between any of them—He will give them their rewards. God is Forgiver and Merciful."
        },
        {
          number: 153,
          arabic: "يَسْأَلُكَ أَهْلُ الْكِتَابِ أَنْ تُنَزِّلَ عَلَيْهِمْ كِتَابًا مِنَ السَّمَاءِ فَقَدْ سَأَلُوا مُوسَى أَكْبَرَ مِنْ ذَلِكَ فَقَالُوا أَرِنَا اللَّهَ جَهْرَةً فَأَخَذَتْهُمُ الصَّاعِقَةُ بِظُلْمِهِمْ ثُمَّ اتَّخَذُوا الْعِجْلَ مِنْ بَعْدِ مَا جَاءَتْهُمُ الْبَيِّنَاتُ فَعَفَوْنَا عَنْ ذَلِكَ وَآتَيْنَا مُوسَى سُلْطَانًا مُبِينًا",
          english: "The People of the Scripture challenge you to bring down to them a book from the sky. They had asked Moses for something even greater. They said, 'Show us God plainly.' The thunderbolt struck them for their wickedness. Then they took the calf for worship, even after the clear proofs had come to them. Yet We pardoned that, and We gave Moses a clear authority."
        },
        {
          number: 154,
          arabic: "وَرَفَعْنَا فَوْقَهُمُ الطُّورَ بِمِيثَاقِهِمْ وَقُلْنَا لَهُمُ ادْخُلُوا الْبَابَ سُجَّدًا وَقُلْنَا لَهُمْ لَا تَعْدُوا فِي السَّبْتِ وَأَخَذْنَا مِنْهُمْ مِيثَاقًا غَلِيظًا",
          english: "And We raised the Mount above them in accordance with their covenant, and We said to them, 'Enter the gate humbly', and We said to them, 'Do not violate the Sabbath', and We received from them a solemn pledge."
        },
        {
          number: 155,
          arabic: "فَبِمَا نَقْضِهِمْ مِيثَاقَهُمْ وَكُفْرِهِمْ بِآيَاتِ اللَّهِ وَقَتْلِهِمُ الْأَنْبِيَاءَ بِغَيْرِ حَقٍّ وَقَوْلِهِمْ قُلُوبُنَا غُلْفٌ بَلْ طَبَعَ اللَّهُ عَلَيْهَا بِكُفْرِهِمْ فَلَا يُؤْمِنُونَ إِلَّا قَلِيلًا",
          english: "But for their violation of their covenant, and their denial of God's revelations, and their killing of the prophets unjustly, and their saying, 'Our minds are closed.' In fact, God has sealed them for their disbelief, so they do not believe, except for a few."
        },
        {
          number: 156,
          arabic: "وَبِكُفْرِهِمْ وَقَوْلِهِمْ عَلَى مَرْيَمَ بُهْتَانًا عَظِيمًا",
          english: "And for their faithlessness, and their saying against Mary a monstrous slander."
        },
        {
          number: 157,
          arabic: "وَقَوْلِهِمْ إِنَّا قَتَلْنَا الْمَسِيحَ عِيسَى ابْنَ مَرْيَمَ رَسُولَ اللَّهِ وَمَا قَتَلُوهُ وَمَا صَلَبُوهُ وَلَكِنْ شُبِّهَ لَهُمْ وَإِنَّ الَّذِينَ اخْتَلَفُوا فِيهِ لَفِي شَكٍّ مِنْهُ مَا لَهُمْ بِهِ مِنْ عِلْمٍ إِلَّا اتِّبَاعَ الظَّنِّ وَمَا قَتَلُوهُ يَقِينًا",
          english: "And for their saying, 'We have killed the Messiah, Jesus, the son of Mary, the Messenger of God.' In fact, they did not kill him, nor did they crucify him, but it appeared to them as if they did. Indeed, those who differ about him are in doubt about it. They have no knowledge of it, except the following of assumptions. Certainly, they did not kill him."
        },
        {
          number: 158,
          arabic: "بَلْ رَفَعَهُ اللَّهُ إِلَيْهِ وَكَانَ اللَّهُ عَزِيزًا حَكِيمًا",
          english: "Rather, God raised him up to Himself. God is Mighty and Wise."
        },
        {
          number: 159,
          arabic: "وَإِنْ مِنْ أَهْلِ الْكِتَابِ إِلَّا لَيُؤْمِنَنَّ بِهِ قَبْلَ مَوْتِهِ وَيَوْمَ الْقِيَامَةِ يَكُونُ عَلَيْهِمْ شَهِيدًا",
          english: "There is none from the People of the Scripture but will believe in him before his death, and on the Day of Resurrection he will be a witness against them."
        },
        {
          number: 160,
          arabic: "فَبِظُلْمٍ مِنَ الَّذِينَ هَادُوا حَرَّمْنَا عَلَيْهِمْ طَيِّبَاتٍ أُحِلَّتْ لَهُمْ وَبِصَدِّهِمْ عَنْ سَبِيلِ اللَّهِ كَثِيرًا",
          english: "Due to wrongdoing on the part of the Jews, We forbade them good things that used to be lawful for them; and for deterring many from God's path."
        },
        {
          number: 161,
          arabic: "وَأَخْذِهِمُ الرِّبَا وَقَدْ نُهُوا عَنْهُ وَأَكْلِهِمْ أَمْوَالَ النَّاسِ بِالْبَاطِلِ وَأَعْتَدْنَا لِلْكَافِرِينَ مِنْهُمْ عَذَابًا أَلِيمًا",
          english: "And for their taking usury, although they were forbidden it; and for their consuming people's wealth dishonestly. We have prepared for the faithless among them a painful torment."
        },
        {
          number: 162,
          arabic: "لَكِنِ الرَّاسِخُونَ فِي الْعِلْمِ مِنْهُمْ وَالْمُؤْمِنُونَ يُؤْمِنُونَ بِمَا أُنْزِلَ إِلَيْكَ وَمَا أُنْزِلَ مِنْ قَبْلِكَ وَالْمُقِيمِينَ الصَّلَاةَ وَالْمُؤْتُونَ الزَّكَاةَ وَالْمُؤْمِنُونَ بِاللَّهِ وَالْيَوْمِ الْآخِرِ أُولَئِكَ سَنُؤْتِيهِمْ أَجْرًا عَظِيمًا",
          english: "But those among them firmly rooted in knowledge, and the believers, believe in what was revealed to you, and in what was revealed before you; and the observers of prayers, and the givers of charity, and the believers in God and the Last Day—upon these We will bestow an immense reward."
        },
        {
          number: 163,
          arabic: "إِنَّا أَوْحَيْنَا إِلَيْكَ كَمَا أَوْحَيْنَا إِلَى نُوحٍ وَالنَّبِيِّينَ مِنْ بَعْدِهِ وَأَوْحَيْنَا إِلَى إِبْرَاهِيمَ وَإِسْمَاعِيلَ وَإِسْحَاقَ وَيَعْقُوبَ وَالْأَسْبَاطِ وَعِيسَى وَأَيُّوبَ وَيُونُسَ وَهَارُونَ وَسُلَيْمَانَ وَآتَيْنَا دَاوُودَ زَبُورًا",
          english: "We have inspired you, as We had inspired Noah and the prophets after him. And We inspired Abraham, and Ishmael, and Isaac, and Jacob, and the Patriarchs, and Jesus, and Job, and Jonah, and Aaron, and Solomon. And We gave David the Psalms."
        },
        {
          number: 164,
          arabic: "وَرُسُلًا قَدْ قَصَصْنَاهُمْ عَلَيْكَ مِنْ قَبْلُ وَرُسُلًا لَمْ نَقْصُصْهُمْ عَلَيْكَ وَكَلَّمَ اللَّهُ مُوسَى تَكْلِيمًا",
          english: "Some messengers We have already told you about, while some messengers We have not told you about. And God spoke to Moses directly."
        },
        {
          number: 165,
          arabic: "رُسُلًا مُبَشِّرِينَ وَمُنْذِرِينَ لِئَلَّا يَكُونَ لِلنَّاسِ عَلَى اللَّهِ حُجَّةٌ بَعْدَ الرُّسُلِ وَكَانَ اللَّهُ عَزِيزًا حَكِيمًا",
          english: "Messengers delivering good news, and bringing warnings; so that people may have no excuse before God after the coming of the messengers. God is Powerful and Wise."
        },
        {
          number: 166,
          arabic: "لَكِنِ اللَّهُ يَشْهَدُ بِمَا أَنْزَلَ إِلَيْكَ أَنْزَلَهُ بِعِلْمِهِ وَالْمَلَائِكَةُ يَشْهَدُونَ وَكَفَى بِاللَّهِ شَهِيدًا",
          english: "But God bears witness to what He revealed to you. He revealed it with His knowledge. And the angels bear witness. Though God is a sufficient witness."
        },
        {
          number: 167,
          arabic: "إِنَّ الَّذِينَ كَفَرُوا وَصَدُّوا عَنْ سَبِيلِ اللَّهِ قَدْ ضَلُّوا ضَلَالًا بَعِيدًا",
          english: "Those who disbelieve and repel from God's path have gone far astray."
        },
        {
          number: 168,
          arabic: "إِنَّ الَّذِينَ كَفَرُوا وَظَلَمُوا لَمْ يَكُنِ اللَّهُ لِيَغْفِرَ لَهُمْ وَلَا لِيَهْدِيَهُمْ طَرِيقًا",
          english: "Those who disbelieve and transgress; God is not about to forgive them, nor will He guide them to any path."
        },
        {
          number: 169,
          arabic: "إِلَّا طَرِيقَ جَهَنَّمَ خَالِدِينَ فِيهَا أَبَدًا وَكَانَ ذَلِكَ عَلَى اللَّهِ يَسِيرًا",
          english: "Except to the path of Hell, where they will dwell forever. And that is easy for God."
        },
        {
          number: 170,
          arabic: "يَا أَيُّهَا النَّاسُ قَدْ جَاءَكُمُ الرَّسُولُ بِالْحَقِّ مِنْ رَبِّكُمْ فَآمِنُوا خَيْرًا لَكُمْ وَإِنْ تَكْفُرُوا فَإِنَّ لِلَّهِ مَا فِي السَّمَاوَاتِ وَالْأَرْضِ وَكَانَ اللَّهُ عَلِيمًا حَكِيمًا",
          english: "O people! The Messenger has come to you with the truth from your Lord, so believe—that is best for you. But if you disbelieve, to God belongs everything in the heavens and the earth. God is Omniscient and Wise."
        },
        {
          number: 171,
          arabic: "يَا أَهْلَ الْكِتَابِ لَا تَغْلُوا فِي دِينِكُمْ وَلَا تَقُولُوا عَلَى اللَّهِ إِلَّا الْحَقَّ إِنَّمَا الْمَسِيحُ عِيسَى ابْنُ مَرْيَمَ رَسُولُ اللَّهِ وَكَلِمَتُهُ أَلْقَاهَا إِلَى مَرْيَمَ وَرُوحٌ مِنْهُ فَآمِنُوا بِاللَّهِ وَرُسُلِهِ وَلَا تَقُولُوا ثَلَاثَةٌ انْتَهُوا خَيْرًا لَكُمْ إِنَّمَا اللَّهُ إِلَهٌ وَاحِدٌ سُبْحَانَهُ أَنْ يَكُونَ لَهُ وَلَدٌ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ وَكَفَى بِاللَّهِ وَكِيلًا",
          english: "O People of the Scripture! Do not exaggerate in your religion, and do not say about God except the truth. The Messiah, Jesus, the son of Mary, is the Messenger of God, and His Word that He conveyed to Mary, and a Spirit from Him. So believe in God and His messengers, and do not say, 'Three.' Refrain—it is better for you. God is only one God. Glory be to Him—that He should have a son. To Him belongs everything in the heavens and the earth, and God is a sufficient Protector."
        },
        {
          number: 172,
          arabic: "لَنْ يَسْتَنْكِفَ الْمَسِيحُ أَنْ يَكُونَ عَبْدًا لِلَّهِ وَلَا الْمَلَائِكَةُ الْمُقَرَّبُونَ وَمَنْ يَسْتَنْكِفْ عَنْ عِبَادَتِهِ وَيَسْتَكْبِرْ فَسَيَحْشُرُهُمْ إِلَيْهِ جَمِيعًا",
          english: "The Messiah does not disdain to be a servant of God, nor do the favored angels. Whoever disdains His worship, and is too arrogant—He will round them up to Himself altogether."
        },
        {
          number: 173,
          arabic: "فَأَمَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ فَيُوَفِّيهِمْ أُجُورَهُمْ وَيَزِيدُهُمْ مِنْ فَضْلِهِ وَأَمَّا الَّذِينَ اسْتَنْكَفُوا وَاسْتَكْبَرُوا فَيُعَذِّبُهُمْ عَذَابًا أَلِيمًا وَلَا يَجِدُونَ لَهُمْ مِنْ دُونِ اللَّهِ وَلِيًّا وَلَا نَصِيرًا",
          english: "But as for those who believe and do good works, He will pay them their wages in full, and will increase His grace for them. But as for those who disdain and are too proud, He will punish them with an agonizing punishment. And they will find for themselves, apart from God, no lord and no savior."
        },
        {
          number: 174,
          arabic: "يَا أَيُّهَا النَّاسُ قَدْ جَاءَكُمْ بُرْهَانٌ مِنْ رَبِّكُمْ وَأَنْزَلْنَا إِلَيْكُمْ نُورًا مُبِينًا",
          english: "O people! A proof has come to you from your Lord, and We sent down to you a clear light."
        },
        {
          number: 175,
          arabic: "فَأَمَّا الَّذِينَ آمَنُوا بِاللَّهِ وَاعْتَصَمُوا بِهِ فَسَيُدْخِلُهُمْ فِي رَحْمَةٍ مِنْهُ وَفَضْلٍ وَيَهْدِيهِمْ إِلَيْهِ صِرَاطًا مُسْتَقِيمًا",
          english: "As for those who believe in God, and hold fast to Him, He will admit them into mercy and grace from Him, and will guide them to Himself in a straight path."
        },
        {
          number: 176,
          arabic: "يَسْتَفْتُونَكَ قُلِ اللَّهُ يُفْتِيكُمْ فِي الْكَلَالَةِ إِنِ امْرُؤٌ هَلَكَ لَيْسَ لَهُ وَلَدٌ وَلَهُ أُخْتٌ فَلَهَا نِصْفُ مَا تَرَكَ وَهُوَ يَرِثُهَا إِنْ لَمْ يَكُنْ لَهَا وَلَدٌ فَإِنْ كَانَتَا اثْنَتَيْنِ فَلَهُمَا الثُّلُثَانِ مِمَّا تَرَكَ وَإِنْ كَانُوا إِخْوَةً رِجَالًا وَنِسَاءً فَلِلذَّكَرِ مِثْلُ حَظِّ الْأُنْثَيَيْنِ يُبَيِّنُ اللَّهُ لَكُمْ أَنْ تَضِلُّوا وَاللَّهُ بِكُلِّ شَيْءٍ عَلِيمٌ",
          english: "They ask you for a ruling. Say, 'God gives you a ruling concerning the person who has neither parents nor children.' If a man dies, and leaves no children, and he had a sister, she receives one-half of what he leaves. And he inherits from her if she leaves no children. But if there are two sisters, they receive two-thirds of what he leaves. If the siblings are men and women, the male receives the share of two females.' God makes things clear for you, lest you err. God is Aware of everything."
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
          arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا أَوْفُوا بِالْعُقُودِ أُحِلَّتْ لَكُمْ بَهِيمَةُ الْأَنْعَامِ إِلَّا مَا يُتْلَى عَلَيْكُمْ غَيْرَ مُحِلِّي الصَّيْدِ وَأَنْتُمْ حُرُمٌ إِنَّ اللَّهَ يَحْكُمُ مَا يُرِيدُ',
          english: 'O you who believe! Fulfill your commitments. Livestock animals are permitted for you, except those specified to you; but not wild game while you are in pilgrim sanctity. God decrees whatever He wills.'
        },
        {
          number: 2,
          arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا لَا تُحِلُّوا شَعَائِرَ اللَّهِ وَلَا الشَّهْرَ الْحَرَامَ وَلَا الْهَدْيَ وَلَا الْقَلَائِدَ وَلَا آمِّينَ الْبَيْتَ الْحَرَامَ يَبْتَغُونَ فَضْلًا مِنْ رَبِّهِمْ وَرِضْوَانًا وَإِذَا حَلَلْتُمْ فَاصْطَادُوا وَلَا يَجْرِمَنَّكُمْ شَنَآنُ قَوْمٍ أَنْ صَدُّوكُمْ عَنِ الْمَسْجِدِ الْحَرَامِ أَنْ تَعْتَدُوا وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَى وَلَا تَعَاوَنُوا عَلَى الْإِثْمِ وَالْعُدْوَانِ وَاتَّقُوا اللَّهَ إِنَّ اللَّهَ شَدِيدُ الْعِقَابِ",
          english: "O you who believe! Do not violate God's sacraments, nor the Sacred Month, nor the offerings, nor the garlanded, nor those heading for the Sacred House seeking blessings from their Lord and approval. When you have left the pilgrim sanctity, you may hunt. And let not the hatred of people who barred you from the Sacred Mosque incite you to aggression. And cooperate with one another in virtuous conduct and conscience, and do not cooperate with one another in sin and hostility. And fear God. God is severe in punishment."
        },
        {
          number: 3,
          arabic: "حُرِّمَتْ عَلَيْكُمُ الْمَيْتَةُ وَالدَّمُ وَلَحْمُ الْخِنْزِيرِ وَمَا أُهِلَّ لِغَيْرِ اللَّهِ بِهِ وَالْمُنْخَنِقَةُ وَالْمَوْقُوذَةُ وَالْمُتَرَدِّيَةُ وَالنَّطِيحَةُ وَمَا أَكَلَ السَّبُعُ إِلَّا مَا ذَكَّيْتُمْ وَمَا ذُبِحَ عَلَى النُّصُبِ وَأَنْ تَسْتَقْسِمُوا بِالْأَزْلَامِ ذَلِكُمْ فِسْقٌ الْيَوْمَ يَئِسَ الَّذِينَ كَفَرُوا مِنْ دِينِكُمْ فَلَا تَخْشَوْهُمْ وَاخْشَوْنِ الْيَوْمَ أَكْمَلْتُ لَكُمْ دِينَكُمْ وَأَتْمَمْتُ عَلَيْكُمْ نِعْمَتِي وَرَضِيتُ لَكُمُ الْإِسْلَامَ دِينًا فَمَنِ اضْطُرَّ فِي مَخْمَصَةٍ غَيْرَ مُتَجَانِفٍ لِإِثْمٍ فَإِنَّ اللَّهَ غَفُورٌ رَحِيمٌ",
          english: "Prohibited for you are carrion, blood, the flesh of swine, and animals dedicated to other than God; also the flesh of animals strangled, killed violently, killed by a fall, gored to death, mangled by wild animals—except what you rescue, and animals sacrificed on altars; and the practice of drawing lots. For it is immoral. Today, those who disbelieve have despaired of your religion, so do not fear them, but fear Me. Today I have perfected your religion for you, and have completed My favor upon you, and have approved Islam as a religion for you. But whoever is compelled by hunger, with no intent of wrongdoing—God is Forgiving and Merciful."
        },
        {
          number: 4,
          arabic: "يَسْأَلُونَكَ مَاذَا أُحِلَّ لَهُمْ قُلْ أُحِلَّ لَكُمُ الطَّيِّبَاتُ وَمَا عَلَّمْتُمْ مِنَ الْجَوَارِحِ مُكَلِّبِينَ تُعَلِّمُونَهُنَّ مِمَّا عَلَّمَكُمُ اللَّهُ فَكُلُوا مِمَّا أَمْسَكْنَ عَلَيْكُمْ وَاذْكُرُوا اسْمَ اللَّهِ عَلَيْهِ وَاتَّقُوا اللَّهَ إِنَّ اللَّهَ سَرِيعُ الْحِسَابِ",
          english: "They ask you what is permitted for them. Say, 'Permitted for you are all good things, including what trained dogs and falcons catch for you.' You train them according to what God has taught you. So eat from what they catch for you, and pronounce God's name over it. And fear God. God is Swift in reckoning."
        },
        {
          number: 5,
          arabic: "الْيَوْمَ أُحِلَّ لَكُمُ الطَّيِّبَاتُ وَطَعَامُ الَّذِينَ أُوتُوا الْكِتَابَ حِلٌّ لَكُمْ وَطَعَامُكُمْ حِلٌّ لَهُمْ وَالْمُحْصَنَاتُ مِنَ الْمُؤْمِنَاتِ وَالْمُحْصَنَاتُ مِنَ الَّذِينَ أُوتُوا الْكِتَابَ مِنْ قَبْلِكُمْ إِذَا آتَيْتُمُوهُنَّ أُجُورَهُنَّ مُحْصِنِينَ غَيْرَ مُسَافِحِينَ وَلَا مُتَّخِذِي أَخْدَانٍ وَمَنْ يَكْفُرْ بِالْإِيمَانِ فَقَدْ حَبِطَ عَمَلُهُ وَهُوَ فِي الْآخِرَةِ مِنَ الْخَاسِرِينَ",
          english: "Today all good things are made lawful for you. And the food of those given the Scripture is lawful for you, and your food is lawful for them. So are chaste believing women, and chaste women from the people who were given the Scripture before you, provided you give them their dowries, and take them in marriage, not in adultery, nor as mistresses. But whoever rejects faith, his work will be in vain, and in the Hereafter he will be among the losers."
        },
        {
          number: 6,
          arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا إِذَا قُمْتُمْ إِلَى الصَّلَاةِ فَاغْسِلُوا وُجُوهَكُمْ وَأَيْدِيَكُمْ إِلَى الْمَرَافِقِ وَامْسَحُوا بِرُءُوسِكُمْ وَأَرْجُلَكُمْ إِلَى الْكَعْبَيْنِ وَإِنْ كُنْتُمْ جُنُبًا فَاطَّهَّرُوا وَإِنْ كُنْتُمْ مَرْضَى أَوْ عَلَى سَفَرٍ أَوْ جَاءَ أَحَدٌ مِنْكُمْ مِنَ الْغَائِطِ أَوْ لَامَسْتُمُ النِّسَاءَ فَلَمْ تَجِدُوا مَاءً فَتَيَمَّمُوا صَعِيدًا طَيِّبًا فَامْسَحُوا بِوُجُوهِكُمْ وَأَيْدِيكُمْ مِنْهُ مَا يُرِيدُ اللَّهُ لِيَجْعَلَ عَلَيْكُمْ مِنْ حَرَجٍ وَلَكِنْ يُرِيدُ لِيُطَهِّرَكُمْ وَلِيُتِمَّ نِعْمَتَهُ عَلَيْكُمْ لَعَلَّكُمْ تَشْكُرُونَ",
          english: "O you who believe! When you rise to pray, wash your faces and your hands and arms to the elbows, and wipe your heads, and your feet to the ankles. If you had intercourse, then purify yourselves. If you are ill, or travelling, or one of you returns from the toilet, or you had contact with women, and could not find water, then use some clean sand and wipe your faces and hands with it. God does not intend to burden you, but He intends to purify you, and to complete His blessing upon you, that you may be thankful."
        },
        {
          number: 7,
          arabic: "وَاذْكُرُوا نِعْمَةَ اللَّهِ عَلَيْكُمْ وَمِيثَاقَهُ الَّذِي وَاثَقَكُمْ بِهِ إِذْ قُلْتُمْ سَمِعْنَا وَأَطَعْنَا وَاتَّقُوا اللَّهَ إِنَّ اللَّهَ عَلِيمٌ بِذَاتِ الصُّدُورِ",
          english: "And Remember God's blessings upon you, and His covenant which He covenanted with you; when you said, 'We hear and we obey.' And remain conscious of God, for God knows what the hearts contain."
        },
        {
          number: 8,
          arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا كُونُوا قَوَّامِينَ لِلَّهِ شُهَدَاءَ بِالْقِسْطِ وَلَا يَجْرِمَنَّكُمْ شَنَآنُ قَوْمٍ عَلَى أَلَّا تَعْدِلُوا اعْدِلُوا هُوَ أَقْرَبُ لِلتَّقْوَى وَاتَّقُوا اللَّهَ إِنَّ اللَّهَ خَبِيرٌ بِمَا تَعْمَلُونَ",
          english: "O you who believe! Be upright to God, witnessing with justice; and let not the hatred of a certain people prevent you from acting justly. Adhere to justice, for that is nearer to piety; and fear God. God is informed of what you do."
        },
        {
          number: 9,
          arabic: "وَعَدَ اللَّهُ الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ لَهُمْ مَغْفِرَةٌ وَأَجْرٌ عَظِيمٌ",
          english: "God has promised those who believe and work righteousness: they will have forgiveness and a great reward."
        },
        {
          number: 10,
          arabic: "وَالَّذِينَ كَفَرُوا وَكَذَّبُوا بِآيَاتِنَا أُولَئِكَ أَصْحَابُ الْجَحِيمِ",
          english: "As for those who disbelieve and reject Our revelations—these are the inmates of Hell."
        },
        {
          number: 11,
          arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا اذْكُرُوا نِعْمَتَ اللَّهِ عَلَيْكُمْ إِذْ هَمَّ قَوْمٌ أَنْ يَبْسُطُوا إِلَيْكُمْ أَيْدِيَهُمْ فَكَفَّ أَيْدِيَهُمْ عَنْكُمْ وَاتَّقُوا اللَّهَ وَعَلَى اللَّهِ فَلْيَتَوَكَّلِ الْمُؤْمِنُونَ",
          english: "O you who believe! Remember God's blessings upon you; when certain people intended to extend their hands against you, and He restrained their hands from you. So reverence God, and in God let the believers put their trust."
        },
        {
          number: 12,
          arabic: "وَلَقَدْ أَخَذَ اللَّهُ مِيثَاقَ بَنِي إِسْرَائِيلَ وَبَعَثْنَا مِنْهُمُ اثْنَيْ عَشَرَ نَقِيبًا وَقَالَ اللَّهُ إِنِّي مَعَكُمْ لَئِنْ أَقَمْتُمُ الصَّلَاةَ وَآتَيْتُمُ الزَّكَاةَ وَآمَنْتُمْ بِرُسُلِي وَعَزَّرْتُمُوهُمْ وَأَقْرَضْتُمُ اللَّهَ قَرْضًا حَسَنًا لَأُكَفِّرَنَّ عَنْكُمْ سَيِّئَاتِكُمْ وَلَأُدْخِلَنَّكُمْ جَنَّاتٍ تَجْرِي مِنْ تَحْتِهَا الْأَنْهَارُ فَمَنْ كَفَرَ بَعْدَ ذَلِكَ مِنْكُمْ فَقَدْ ضَلَّ سَوَاءَ السَّبِيلِ",
          english: "God received a pledge from the Children of Israel, and We raised among them twelve chiefs. God said, 'I am with you; if you perform the prayer, and pay the alms, and believe in My messengers and support them, and lend God a loan of righteousness; I will remit your sins, and admit you into Gardens beneath which rivers flow. But whoever among you disbelieves afterwards has strayed from the right way.'"
        },
        {
          number: 13,
          arabic: "فَبِمَا نَقْضِهِمْ مِيثَاقَهُمْ لَعَنَّاهُمْ وَجَعَلْنَا قُلُوبَهُمْ قَاسِيَةً يُحَرِّفُونَ الْكَلِمَ عَنْ مَوَاضِعِهِ وَنَسُوا حَظًّا مِمَّا ذُكِّرُوا بِهِ وَلَا تَزَالُ تَطَّلِعُ عَلَى خَائِنَةٍ مِنْهُمْ إِلَّا قَلِيلًا مِنْهُمْ فَاعْفُ عَنْهُمْ وَاصْفَحْ إِنَّ اللَّهَ يُحِبُّ الْمُحْسِنِينَ",
          english: "Because of their breaking their pledge, We cursed them, and made their hearts hard. They twist the words out of their context, and they disregarded some of what they were reminded of. You will always witness deceit from them, except for a few of them. But pardon them, and overlook. God loves the doers of good."
        },
        {
          number: 14,
          arabic: "وَمِنَ الَّذِينَ قَالُوا إِنَّا نَصَارَى أَخَذْنَا مِيثَاقَهُمْ فَنَسُوا حَظًّا مِمَّا ذُكِّرُوا بِهِ فَأَغْرَيْنَا بَيْنَهُمُ الْعَدَاوَةَ وَالْبَغْضَاءَ إِلَى يَوْمِ الْقِيَامَةِ وَسَوْفَ يُنَبِّئُهُمُ اللَّهُ بِمَا كَانُوا يَصْنَعُونَ",
          english: "And from those who say, 'We are Christians,' We received their pledge, but they neglected some of what they were reminded of. So We provoked enmity and hatred among them until the Day of Resurrection; God will then inform them of what they used to craft."
        },
        {
          number: 15,
          arabic: "يَا أَهْلَ الْكِتَابِ قَدْ جَاءَكُمْ رَسُولُنَا يُبَيِّنُ لَكُمْ كَثِيرًا مِمَّا كُنْتُمْ تُخْفُونَ مِنَ الْكِتَابِ وَيَعْفُو عَنْ كَثِيرٍ قَدْ جَاءَكُمْ مِنَ اللَّهِ نُورٌ وَكِتَابٌ مُبِينٌ",
          english: "O People of the Book! Our Messenger has come to you, clarifying for you much of what you kept hidden of the Book, and overlooking much. A light from God has come to you, and a clear Book."
        },
        {
          number: 16,
          arabic: "يَهْدِي بِهِ اللَّهُ مَنِ اتَّبَعَ رِضْوَانَهُ سُبُلَ السَّلَامِ وَيُخْرِجُهُمْ مِنَ الظُّلُمَاتِ إِلَى النُّورِ بِإِذْنِهِ وَيَهْدِيهِمْ إِلَى صِرَاطٍ مُسْتَقِيمٍ",
          english: "God guides with it whoever follows His approval to the ways of peace, and He brings them out of darkness into light, by His permission, and He guides them in a straight path."
        },
        {
          number: 17,
          arabic: "لَقَدْ كَفَرَ الَّذِينَ قَالُوا إِنَّ اللَّهَ هُوَ الْمَسِيحُ ابْنُ مَرْيَمَ قُلْ فَمَنْ يَمْلِكُ مِنَ اللَّهِ شَيْئًا إِنْ أَرَادَ أَنْ يُهْلِكَ الْمَسِيحَ ابْنَ مَرْيَمَ وَأُمَّهُ وَمَنْ فِي الْأَرْضِ جَمِيعًا وَلِلَّهِ مُلْكُ السَّمَاوَاتِ وَالْأَرْضِ وَمَا بَيْنَهُمَا يَخْلُقُ مَا يَشَاءُ وَاللَّهُ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
          english: "They disbelieve those who say, 'God is the Christ, the son of Mary.' Say, 'Who can prevent God, if He willed, from annihilating the Christ son of Mary, and his mother, and everyone on earth?' To God belongs the sovereignty of the heavens and the earth and what is between them. He creates whatever He wills, and God has power over everything."
        },
        {
          number: 18,
          arabic: "وَقَالَتِ الْيَهُودُ وَالنَّصَارَى نَحْنُ أَبْنَاءُ اللَّهِ وَأَحِبَّاؤُهُ قُلْ فَلِمَ يُعَذِّبُكُمْ بِذُنُوبِكُمْ بَلْ أَنْتُمْ بَشَرٌ مِمَّنْ خَلَقَ يَغْفِرُ لِمَنْ يَشَاءُ وَيُعَذِّبُ مَنْ يَشَاءُ وَلِلَّهِ مُلْكُ السَّمَاوَاتِ وَالْأَرْضِ وَمَا بَيْنَهُمَا وَإِلَيْهِ الْمَصِيرُ",
          english: "The Jews and the Christians say, 'We are the children of God, and His beloved.' Say, 'Why then does He punish you for your sins?' In fact, you are humans from among those He created. He forgives whom He wills, and He punishes whom He wills. To God belongs the dominion of the heavens and the earth and what lies between them, and to Him is the return."
        },
        {
          number: 19,
          arabic: "يَا أَهْلَ الْكِتَابِ قَدْ جَاءَكُمْ رَسُولُنَا يُبَيِّنُ لَكُمْ عَلَى فَتْرَةٍ مِنَ الرُّسُلِ أَنْ تَقُولُوا مَا جَاءَنَا مِنْ بَشِيرٍ وَلَا نَذِيرٍ فَقَدْ جَاءَكُمْ بَشِيرٌ وَنَذِيرٌ وَاللَّهُ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
          english: "O People of the Book! Our Messenger has come to you, making things clear to you—after a cessation of messengers—so that you cannot say, 'No preacher has come to us, and no warner.' In fact, a preacher has come to you, and a warner; and God is Capable of everything."
        },
        {
          number: 20,
          arabic: "وَإِذْ قَالَ مُوسَى لِقَوْمِهِ يَا قَوْمِ اذْكُرُوا نِعْمَةَ اللَّهِ عَلَيْكُمْ إِذْ جَعَلَ فِيكُمْ أَنْبِيَاءَ وَجَعَلَكُمْ مُلُوكًا وَآتَاكُمْ مَا لَمْ يُؤْتِ أَحَدًا مِنَ الْعَالَمِينَ",
          english: "When Moses said to his people, 'O my people, remember God's blessings upon you, when He placed prophets among you, and made you kings, and gave you what He never gave any other people.'"
        },
        {
          number: 21,
          arabic: "يَا قَوْمِ ادْخُلُوا الْأَرْضَ الْمُقَدَّسَةَ الَّتِي كَتَبَ اللَّهُ لَكُمْ وَلَا تَرْتَدُّوا عَلَى أَدْبَارِكُمْ فَتَنْقَلِبُوا خَاسِرِينَ",
          english: "'O my people, enter the Holy Land which God has assigned for you, and do not turn back, lest you return as losers.'"
        },
        {
          number: 22,
          arabic: "قَالُوا يَا مُوسَى إِنَّ فِيهَا قَوْمًا جَبَّارِينَ وَإِنَّا لَنْ نَدْخُلَهَا حَتَّى يَخْرُجُوا مِنْهَا فَإِنْ يَخْرُجُوا مِنْهَا فَإِنَّا دَاخِلُونَ",
          english: "They said, 'O Moses, there are tyrannical people in it; we will not enter it until they leave it. If they leave it, we will be entering.'"
        },
        {
          number: 23,
          arabic: "قَالَ رَجُلَانِ مِنَ الَّذِينَ يَخَافُونَ أَنْعَمَ اللَّهُ عَلَيْهِمَا ادْخُلُوا عَلَيْهِمُ الْبَابَ فَإِذَا دَخَلْتُمُوهُ فَإِنَّكُمْ غَالِبُونَ وَعَلَى اللَّهِ فَتَوَكَّلُوا إِنْ كُنْتُمْ مُؤْمِنِينَ",
          english: "Two men of those who feared, but whom God had blessed, said, 'Go at them by the gate; and when you have entered it, you will prevail. And put your trust in God, if you are believers.'"
        },
        {
          number: 24,
          arabic: "قَالُوا يَا مُوسَى إِنَّا لَنْ نَدْخُلَهَا أَبَدًا مَا دَامُوا فِيهَا فَاذْهَبْ أَنْتَ وَرَبُّكَ فَقَاتِلَا إِنَّا هَاهُنَا قَاعِدُونَ",
          english: "They said, 'O Moses, we will not enter it, ever, as long as they are in it. So go ahead, you and your Lord, and fight. We are staying right here.'"
        },
        {
          number: 25,
          arabic: "قَالَ رَبِّ إِنِّي لَا أَمْلِكُ إِلَّا نَفْسِي وَأَخِي فَافْرُقْ بَيْنَنَا وَبَيْنَ الْقَوْمِ الْفَاسِقِينَ",
          english: "He said, 'My Lord! I have control only over myself and my brother, so separate between us and between the wicked people.'"
        },
        {
          number: 26,
          arabic: "قَالَ فَإِنَّهَا مُحَرَّمَةٌ عَلَيْهِمْ أَرْبَعِينَ سَنَةً يَتِيهُونَ فِي الْأَرْضِ فَلَا تَأْسَ عَلَى الْقَوْمِ الْفَاسِقِينَ",
          english: "He said, 'It is forbidden for them for forty years. They will wander aimlessly in the land. So do not grieve over the defiant people.'"
        },
        {
          number: 27,
          arabic: "وَاتْلُ عَلَيْهِمْ نَبَأَ ابْنَيْ آدَمَ بِالْحَقِّ إِذْ قَرَّبَا قُرْبَانًا فَتُقُبِّلَ مِنْ أَحَدِهِمَا وَلَمْ يُتَقَبَّلْ مِنَ الْآخَرِ قَالَ لَأَقْتُلَنَّكَ قَالَ إِنَّمَا يَتَقَبَّلُ اللَّهُ مِنَ الْمُتَّقِينَ",
          english: "And relate to them the true story of Adam's two sons: when they offered an offering, and it was accepted from one of them, but it was not accepted from the other. He Said, 'I will kill you.' He Said, 'God accepts only from the righteous.'"
        },
        {
          number: 28,
          arabic: "لَئِنْ بَسَطْتَ إِلَيَّ يَدَكَ لِتَقْتُلَنِي مَا أَنَا بِبَاسِطٍ يَدِيَ إِلَيْكَ لِأَقْتُلَكَ إِنِّي أَخَافُ اللَّهَ رَبَّ الْعَالَمِينَ",
          english: "'If you extend your hand to kill me, I will not extend my hand to kill you; for I fear God, Lord of the Worlds.'"
        },
        {
          number: 29,
          arabic: "إِنِّي أُرِيدُ أَنْ تَبُوءَ بِإِثْمِي وَإِثْمِكَ فَتَكُونَ مِنْ أَصْحَابِ النَّارِ وَذَلِكَ جَزَاءُ الظَّالِمِينَ",
          english: "'I would rather you bear my sin and your sin, and you become among the inmates of the Fire. Such is the reward for the evildoers.'"
        },
        {
          number: 30,
          arabic: "فَطَوَّعَتْ لَهُ نَفْسُهُ قَتْلَ أَخِيهِ فَقَتَلَهُ فَأَصْبَحَ مِنَ الْخَاسِرِينَ",
          english: "Then His soul prompted him to kill his brother, so he killed him, and became one of the losers."
        },
        {
          number: 31,
          arabic: "فَبَعَثَ اللَّهُ غُرَابًا يَبْحَثُ فِي الْأَرْضِ لِيُرِيَهُ كَيْفَ يُوَارِي سَوْءَةَ أَخِيهِ قَالَ يَا وَيْلَتَا أَعَجَزْتُ أَنْ أَكُونَ مِثْلَ هَذَا الْغُرَابِ فَأُوَارِيَ سَوْءَةَ أَخِي فَأَصْبَحَ مِنَ النَّادِمِينَ",
          english: "Then God sent a raven digging the ground, to show him how to cover his brother's corpse. He said, 'Woe to me! I was unable to be like this raven, and bury my brother's corpse.' So he became full of regrets."
        },
        {
          number: 32,
          arabic: "مِنْ أَجْلِ ذَلِكَ كَتَبْنَا عَلَى بَنِي إِسْرَائِيلَ أَنَّهُ مَنْ قَتَلَ نَفْسًا بِغَيْرِ نَفْسٍ أَوْ فَسَادٍ فِي الْأَرْضِ فَكَأَنَّمَا قَتَلَ النَّاسَ جَمِيعًا وَمَنْ أَحْيَاهَا فَكَأَنَّمَا أَحْيَا النَّاسَ جَمِيعًا وَلَقَدْ جَاءَتْهُمْ رُسُلُنَا بِالْبَيِّنَاتِ ثُمَّ إِنَّ كَثِيرًا مِنْهُمْ بَعْدَ ذَلِكَ فِي الْأَرْضِ لَمُسْرِفُونَ",
          english: "Because of that We ordained for the Children of Israel: that whoever kills a person—unless it is for murder or corruption on earth—it is as if he killed the whole of mankind; and whoever saves it, it is as if he saved the whole of mankind. Our messengers came to them with clarifications, but even after that, many of them continue to commit excesses in the land."
        },
        {
          number: 33,
          arabic: "إِنَّمَا جَزَاءُ الَّذِينَ يُحَارِبُونَ اللَّهَ وَرَسُولَهُ وَيَسْعَوْنَ فِي الْأَرْضِ فَسَادًا أَنْ يُقَتَّلُوا أَوْ يُصَلَّبُوا أَوْ تُقَطَّعَ أَيْدِيهِمْ وَأَرْجُلُهُمْ مِنْ خِلَافٍ أَوْ يُنْفَوْا مِنَ الْأَرْضِ ذَلِكَ لَهُمْ خِزْيٌ فِي الدُّنْيَا وَلَهُمْ فِي الْآخِرَةِ عَذَابٌ عَظِيمٌ",
          english: "The punishment for those who fight God and His Messenger, and strive to spread corruption on earth, is that they be killed, or crucified, or have their hands and feet cut off on opposite sides, or be banished from the land. That is to disgrace them in this life; and in the Hereafter they will have a terrible punishment."
        },
        {
          number: 34,
          arabic: "إِلَّا الَّذِينَ تَابُوا مِنْ قَبْلِ أَنْ تَقْدِرُوا عَلَيْهِمْ فَاعْلَمُوا أَنَّ اللَّهَ غَفُورٌ رَحِيمٌ",
          english: "Except for those who repent before you apprehend them. So know that God is Forgiving and Merciful."
        },
        {
          number: 35,
          arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا اتَّقُوا اللَّهَ وَابْتَغُوا إِلَيْهِ الْوَسِيلَةَ وَجَاهِدُوا فِي سَبِيلِهِ لَعَلَّكُمْ تُفْلِحُونَ",
          english: "O you who believe! Be conscious of God, and seek the means of approach to Him, and strive in His cause, so that you may succeed."
        },
        {
          number: 36,
          arabic: "إِنَّ الَّذِينَ كَفَرُوا لَوْ أَنَّ لَهُمْ مَا فِي الْأَرْضِ جَمِيعًا وَمِثْلَهُ مَعَهُ لِيَفْتَدُوا بِهِ مِنْ عَذَابِ يَوْمِ الْقِيَامَةِ مَا تُقُبِّلَ مِنْهُمْ وَلَهُمْ عَذَابٌ أَلِيمٌ",
          english: "As for those who disbelieve, even if they owned everything on earth, and the like of it with it, and they offered it to ransom themselves from the torment of the Day of Resurrection, it will not be accepted from them. For them is a painful punishment."
        },
        {
          number: 37,
          arabic: "يُرِيدُونَ أَنْ يَخْرُجُوا مِنَ النَّارِ وَمَا هُمْ بِخَارِجِينَ مِنْهَا وَلَهُمْ عَذَابٌ مُقِيمٌ",
          english: "They will want to leave the Fire, but they will not leave it. For them is a lasting punishment."
        },
        {
          number: 38,
          arabic: "وَالسَّارِقُ وَالسَّارِقَةُ فَاقْطَعُوا أَيْدِيَهُمَا جَزَاءً بِمَا كَسَبَا نَكَالًا مِنَ اللَّهِ وَاللَّهُ عَزِيزٌ حَكِيمٌ",
          english: "As for the thief, whether male or female, cut their hands as a penalty for what they have reaped—a deterrent from God. God is Mighty and Wise."
        },
        {
          number: 39,
          arabic: "فَمَنْ تَابَ مِنْ بَعْدِ ظُلْمِهِ وَأَصْلَحَ فَإِنَّ اللَّهَ يَتُوبُ عَلَيْهِ إِنَّ اللَّهَ غَفُورٌ رَحِيمٌ",
          english: "But whoever repents after his crime, and reforms, God will accept his repentance. God is Forgiving and Merciful."
        },
        {
          number: 40,
          arabic: "أَلَمْ تَعْلَمْ أَنَّ اللَّهَ لَهُ مُلْكُ السَّمَاوَاتِ وَالْأَرْضِ يُعَذِّبُ مَنْ يَشَاءُ وَيَغْفِرُ لِمَنْ يَشَاءُ وَاللَّهُ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
          english: "Do you not know that to God belongs the kingdom of the heavens and the earth? He punishes whom He wills, and He forgives whom He wills. And God is Capable of everything."
        },
        {
          number: 41,
          arabic: "يَا أَيُّهَا الرَّسُولُ لَا يَحْزُنْكَ الَّذِينَ يُسَارِعُونَ فِي الْكُفْرِ مِنَ الَّذِينَ قَالُوا آمَنَّا بِأَفْوَاهِهِمْ وَلَمْ تُؤْمِنْ قُلُوبُهُمْ وَمِنَ الَّذِينَ هَادُوا سَمَّاعُونَ لِلْكَذِبِ سَمَّاعُونَ لِقَوْمٍ آخَرِينَ لَمْ يَأْتُوكَ يُحَرِّفُونَ الْكَلِمَ مِنْ بَعْدِ مَوَاضِعِهِ يَقُولُونَ إِنْ أُوتِيتُمْ هَذَا فَخُذُوهُ وَإِنْ لَمْ تُؤْتَوْهُ فَاحْذَرُوا وَمَنْ يُرِدِ اللَّهُ فِتْنَتَهُ فَلَنْ تَمْلِكَ لَهُ مِنَ اللَّهِ شَيْئًا أُولَئِكَ الَّذِينَ لَمْ يُرِدِ اللَّهُ أَنْ يُطَهِّرَ قُلُوبَهُمْ لَهُمْ فِي الدُّنْيَا خِزْيٌ وَلَهُمْ فِي الْآخِرَةِ عَذَابٌ عَظِيمٌ",
          english: "O Messenger! Do not let those who are quick to disbelief grieve you—from among those who say with their mouths, 'We believe,' but their hearts do not believe; and from among the Jews—listeners to lies, listeners to other people who did not come to you. They distort words from their places, and they say, 'If you are given this, accept it; but if you are not given it, beware.' Whomever God has willed to divert, you have nothing for him from God. Those are they whose hearts God does not intend to purify. For them is disgrace in this world, and for them is a great punishment in the Hereafter."
        },
        {
          number: 42,
          arabic: "سَمَّاعُونَ لِلْكَذِبِ أَكَّالُونَ لِلسُّحْتِ فَإِنْ جَاءُوكَ فَاحْكُمْ بَيْنَهُمْ أَوْ أَعْرِضْ عَنْهُمْ وَإِنْ تُعْرِضْ عَنْهُمْ فَلَنْ يَضُرُّوكَ شَيْئًا وَإِنْ حَكَمْتَ فَاحْكُمْ بَيْنَهُمْ بِالْقِسْطِ إِنَّ اللَّهَ يُحِبُّ الْمُقْسِطِينَ",
          english: "Listeners to falsehoods, eaters of illicit earnings. If they come to you, judge between them, or turn away from them. If you turn away from them, they will not harm you in the least. But if you judge, judge between them equitably. God loves the equitable."
        },
        {
          number: 43,
          arabic: "وَكَيْفَ يُحَكِّمُونَكَ وَعِنْدَهُمُ التَّوْرَاةُ فِيهَا حُكْمُ اللَّهِ ثُمَّ يَتَوَلَّوْنَ مِنْ بَعْدِ ذَلِكَ وَمَا أُولَئِكَ بِالْمُؤْمِنِينَ",
          english: "But why do they come to you for judgment, when they have the Torah, in which is God's Law? Yet they turn away after that. These are not believers."
        },
        {
          number: 44,
          arabic: "إِنَّا أَنْزَلْنَا التَّوْرَاةَ فِيهَا هُدًى وَنُورٌ يَحْكُمُ بِهَا النَّبِيُّونَ الَّذِينَ أَسْلَمُوا لِلَّذِينَ هَادُوا وَالرَّبَّانِيُّونَ وَالْأَحْبَارُ بِمَا اسْتُحْفِظُوا مِنْ كِتَابِ اللَّهِ وَكَانُوا عَلَيْهِ شُهَدَاءَ فَلَا تَخْشَوُا النَّاسَ وَاخْشَوْنِ وَلَا تَشْتَرُوا بِآيَاتِي ثَمَنًا قَلِيلًا وَمَنْ لَمْ يَحْكُمْ بِمَا أَنْزَلَ اللَّهُ فَأُولَئِكَ هُمُ الْكَافِرُونَ",
          english: "We have revealed the Torah, wherein is guidance and light. The submissive prophets ruled the Jews according to it, so did the rabbis and the scholars, as they were required to protect God's Book, and were witnesses to it. So do not fear people, but fear Me. And do not sell My revelations for a cheap price. Those who do not rule according to what God revealed are the unbelievers."
        },
        {
          number: 45,
          arabic: "وَكَتَبْنَا عَلَيْهِمْ فِيهَا أَنَّ النَّفْسَ بِالنَّفْسِ وَالْعَيْنَ بِالْعَيْنِ وَالْأَنْفَ بِالْأَنْفِ وَالْأُذُنَ بِالْأُذُنِ وَالسِّنَّ بِالسِّنِّ وَالْجُرُوحَ قِصَاصٌ فَمَنْ تَصَدَّقَ بِهِ فَهُوَ كَفَّارَةٌ لَهُ وَمَنْ لَمْ يَحْكُمْ بِمَا أَنْزَلَ اللَّهِ فَأُولَئِكَ هُمُ الظَّالِمُونَ",
          english: "And We wrote for them in it: a life for a life, an eye for an eye, a nose for a nose, an ear for an ear, a tooth for a tooth, and an equal wound for a wound; but whoever forgoes it in charity, it will serve as atonement for him. Those who do not rule according to what God revealed are the evildoers."
        },
        {
          number: 46,
          arabic: "وَقَفَّيْنَا عَلَى آثَارِهِمْ بِعِيسَى ابْنِ مَرْيَمَ مُصَدِّقًا لِمَا بَيْنَ يَدَيْهِ مِنَ التَّوْرَاةِ وَآتَيْنَاهُ الْإِنْجِيلَ فِيهِ هُدًى وَنُورٌ وَمُصَدِّقًا لِمَا بَيْنَ يَدَيْهِ مِنَ التَّوْرَاةِ وَهُدًى وَمَوْعِظَةً لِلْمُتَّقِينَ",
          english: "In their footsteps, We sent Jesus son of Mary, fulfilling the Torah that preceded him; and We gave him the Gospel, wherein is guidance and light, and confirming the Torah that preceded him, and guidance and counsel for the righteous."
        },
        {
          number: 47,
          arabic: "وَلْيَحْكُمْ أَهْلُ الْإِنْجِيلِ بِمَا أَنْزَلَ اللَّهُ فِيهِ وَمَنْ لَمْ يَحْكُمْ بِمَا أَنْزَلَ اللَّهُ فَأُولَئِكَ هُمُ الْفَاسِقُونَ",
          english: "So let the people of the Gospel rule according to what God revealed in it. Those who do not rule according to what God revealed are the sinners."
        },
        {
          number: 48,
          arabic: "وَأَنْزَلْنَا إِلَيْكَ الْكِتَابَ بِالْحَقِّ مُصَدِّقًا لِمَا بَيْنَ يَدَيْهِ مِنَ الْكِتَابِ وَمُهَيْمِنًا عَلَيْهِ فَاحْكُمْ بَيْنَهُمْ بِمَا أَنْزَلَ اللَّهُ وَلَا تَتَّبِعْ أَهْوَاءَهُمْ عَمَّا جَاءَكَ مِنَ الْحَقِّ لِكُلٍّ جَعَلْنَا مِنْكُمْ شِرْعَةً وَمِنْهَاجًا وَلَوْ شَاءَ اللَّهُ لَجَعَلَكُمْ أُمَّةً وَاحِدَةً وَلَكِنْ لِيَبْلُوَكُمْ فِي مَا آتَاكُمْ فَاسْتَبِقُوا الْخَيْرَاتِ إِلَى اللَّهِ مَرْجِعُكُمْ جَمِيعًا فَيُنَبِّئُكُمْ بِمَا كُنْتُمْ فِيهِ تَخْتَلِفُونَ",
          english: "And We revealed to you the Book, with truth, confirming the Scripture that preceded it, and superseding it. So judge between them according to what God revealed, and do not follow their desires if they differ from the truth that has come to you. For each of you We have assigned a law and a method. Had God willed, He could have made you a single nation, but He tests you through what He has given you. So compete in righteousness. To God is your return, all of you; then He will inform you of what you had disputed."
        },
        {
          number: 49,
          arabic: "وَأَنِ احْكُمْ بَيْنَهُمْ بِمَا أَنْزَلَ اللَّهُ وَلَا تَتَّبِعْ أَهْوَاءَهُمْ وَاحْذَرْهُمْ أَنْ يَفْتِنُوكَ عَنْ بَعْضِ مَا أَنْزَلَ اللَّهُ إِلَيْكَ فَإِنْ تَوَلَّوْا فَاعْلَمْ أَنَّمَا يُرِيدُ اللَّهُ أَنْ يُصِيبَهُمْ بِبَعْضِ ذُنُوبِهِمْ وَإِنَّ كَثِيرًا مِنَ النَّاسِ لَفَاسِقُونَ",
          english: "And judge between them according to what God revealed, and do not follow their desires. And beware of them, lest they lure you away from some of what God has revealed to you. But if they turn away, know that God intends to strike them with some of their sins. In fact, a great many people are corrupt."
        },
        {
          number: 50,
          arabic: "أَفَحُكْمَ الْجَاهِلِيَّةِ يَبْغُونَ وَمَنْ أَحْسَنُ مِنَ اللَّهِ حُكْمًا لِقَوْمٍ يُوقِنُونَ",
          english: "Is it the laws of the time of ignorance that they desire? Who is better than God in judgment for people who are certain?"
        },
        {
          number: 51,
          arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا لَا تَتَّخِذُوا الْيَهُودَ وَالنَّصَارَى أَوْلِيَاءَ بَعْضُهُمْ أَوْلِيَاءُ بَعْضٍ وَمَنْ يَتَوَلَّهُمْ مِنْكُمْ فَإِنَّهُ مِنْهُمْ إِنَّ اللَّهَ لَا يَهْدِي الْقَوْمَ الظَّالِمِينَ",
          english: "O you who believe! Do not take the Jews and the Christians as allies; some of them are allies of one another. Whoever of you allies himself with them is one of them. God does not guide the wrongdoing people."
        },
        {
          number: 52,
          arabic: "فَتَرَى الَّذِينَ فِي قُلُوبِهِمْ مَرَضٌ يُسَارِعُونَ فِيهِمْ يَقُولُونَ نَخْشَى أَنْ تُصِيبَنَا دَائِرَةٌ فَعَسَى اللَّهُ أَنْ يَأْتِيَ بِالْفَتْحِ أَوْ أَمْرٍ مِنْ عِنْدِهِ فَيُصْبِحُوا عَلَى مَا أَسَرُّوا فِي أَنْفُسِهِمْ نَادِمِينَ",
          english: "You will see those in whose hearts is sickness racing towards them. They say, 'We fear the wheel of fate may turn against us.' But perhaps God will bring about victory, or some event of His making; thereupon they will regret what they concealed within themselves."
        },
        {
          number: 53,
          arabic: "وَيَقُولُ الَّذِينَ آمَنُوا أَهَؤُلَاءِ الَّذِينَ أَقْسَمُوا بِاللَّهِ جَهْدَ أَيْمَانِهِمْ إِنَّهُمْ لَمَعَكُمْ حَبِطَتْ أَعْمَالُهُمْ فَأَصْبَحُوا خَاسِرِينَ",
          english: "Those who believe will say, 'Are these the ones who swore by God with their strongest oaths that they are with you?' Their works have failed, so they became losers."
        },
        {
          number: 54,
          arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا مَنْ يَرْتَدَّ مِنْكُمْ عَنْ دِينِهِ فَسَوْفَ يَأْتِي اللَّهُ بِقَوْمٍ يُحِبُّهُمْ وَيُحِبُّونَهُ أَذِلَّةٍ عَلَى الْمُؤْمِنِينَ أَعِزَّةٍ عَلَى الْكَافِرِينَ يُجَاهِدُونَ فِي سَبِيلِ اللَّهِ وَلَا يَخَافُونَ لَوْمَةَ لَائِمٍ ذَلِكَ فَضْلُ اللَّهِ يُؤْتِيهِ مَنْ يَشَاءُ وَاللَّهُ وَاسِعٌ عَلِيمٌ",
          english: "O you who believe! Whoever of you goes back on his religion—God will bring a people whom He loves and who love Him, kind towards the believers, stern with the disbelievers. They strive in the way of God, and do not fear the blame of the critic. That is the grace of God; He bestows it upon whomever He wills. God is Embracing and Knowing."
        },
        {
          number: 55,
          arabic: "إِنَّمَا وَلِيُّكُمُ اللَّهُ وَرَسُولُهُ وَالَّذِينَ آمَنُوا الَّذِينَ يُقِيمُونَ الصَّلَاةَ وَيُؤْتُونَ الزَّكَاةَ وَهُمْ رَاكِعُونَ",
          english: "Your allies are God, and His Messenger, and those who believe—those who pray regularly, and give charity, and bow down."
        },
        {
          number: 56,
          arabic: "وَمَنْ يَتَوَلَّ اللَّهَ وَرَسُولَهُ وَالَّذِينَ آمَنُوا فَإِنَّ حِزْبَ اللَّهِ هُمُ الْغَالِبُونَ",
          english: "Whoever allies himself with God, and His Messenger, and those who believe—surely the Party of God is the victorious."
        },
        {
          number: 57,
          arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا لَا تَتَّخِذُوا الَّذِينَ اتَّخَذُوا دِينَكُمْ هُزُوًا وَلَعِبًا مِنَ الَّذِينَ أُوتُوا الْكِتَابَ مِنْ قَبْلِكُمْ وَالْكُفَّارَ أَوْلِيَاءَ وَاتَّقُوا اللَّهَ إِنْ كُنْتُمْ مُؤْمِنِينَ",
          english: "O you who believe! Do not befriend those who take your religion in mockery and as a sport, be they from among those who were given the Scripture before you, or the disbelievers. And obey God, if you are believers."
        },
        {
          number: 58,
          arabic: "وَإِذَا نَادَيْتُمْ إِلَى الصَّلَاةِ اتَّخَذُوهَا هُزُوًا وَلَعِبًا ذَلِكَ بِأَنَّهُمْ قَوْمٌ لَا يَعْقِلُونَ",
          english: "When you call to the prayer, they take it as a joke and a trifle. That is because they are people who do not reason."
        },
        {
          number: 59,
          arabic: "قُلْ يَا أَهْلَ الْكِتَابِ هَلْ تَنْقِمُونَ مِنَّا إِلَّا أَنْ آمَنَّا بِاللَّهِ وَمَا أُنْزِلَ إِلَيْنَا وَمَا أُنْزِلَ مِنْ قَبْلُ وَأَنَّ أَكْثَرَكُمْ فَاسِقُونَ",
          english: "Say, 'O People of the Scripture! Do you resent us only because we believe in God, and in what was revealed to us, and in what was revealed previously; and most of you are sinners?'"
        },
        {
          number: 60,
          arabic: "قُلْ هَلْ أُنَبِّئُكُمْ بِشَرٍّ مِنْ ذَلِكَ مَثُوبَةً عِنْدَ اللَّهِ مَنْ لَعَنَهُ اللَّهُ وَغَضِبَ عَلَيْهِ وَجَعَلَ مِنْهُمُ الْقِرَدَةَ وَالْخَنَازِيرَ وَعَبَدَ الطَّاغُوتَ أُولَئِكَ شَرٌّ مَكَانًا وَأَضَلُّ عَنْ سَوَاءِ السَّبِيلِ",
          english: "Say, 'Shall I inform you of worse than that for retribution from God? He whom God has cursed, and with whom He became angry; and He turned some of them into apes, and swine, and idol worshipers. These are in a worse position, and further away from the right way.'"
        },
        {
          number: 61,
          arabic: "وَإِذَا جَاءُوكُمْ قَالُوا آمَنَّا وَقَدْ دَخَلُوا بِالْكُفْرِ وَهُمْ قَدْ خَرَجُوا بِهِ وَاللَّهُ أَعْلَمُ بِمَا كَانُوا يَكْتُمُونَ",
          english: "When they come to you, they say, 'We believe,' though they have entered with disbelief, and they have departed with it. But God is well aware of what they hide."
        },
        {
          number: 62,
          arabic: "وَتَرَى كَثِيرًا مِنْهُمْ يُسَارِعُونَ فِي الْإِثْمِ وَالْعُدْوَانِ وَأَكْلِهِمُ السُّحْتَ لَبِئْسَ مَا كَانُوا يَعْمَلُونَ",
          english: "You see many of them competing with one another in sin and hostility, and their consuming of what is illicit. What they have been doing is truly evil."
        },
        {
          number: 63,
          arabic: "لَوْلَا يَنْهَاهُمُ الرَّبَّانِيُّونَ وَالْأَحْبَارُ عَنْ قَوْلِهِمُ الْإِثْمَ وَأَكْلِهِمُ السُّحْتَ لَبِئْسَ مَا كَانُوا يَصْنَعُونَ",
          english: "Why do the rabbis and the priests not prevent them from speaking sinfully and from consuming forbidden wealth? Evil is what they have been doing."
        },
        {
          number: 64,
          arabic: "وَقَالَتِ الْيَهُودُ يَدُ اللَّهِ مَغْلُولَةٌ غُلَّتْ أَيْدِيهِمْ وَلُعِنُوا بِمَا قَالُوا بَلْ يَدَاهُ مَبْسُوطَتَانِ يُنْفِقُ كَيْفَ يَشَاءُ وَلَيَزِيدَنَّ كَثِيرًا مِنْهُمْ مَا أُنْزِلَ إِلَيْكَ مِنْ رَبِّكَ طُغْيَانًا وَكُفْرًا وَأَلْقَيْنَا بَيْنَهُمُ الْعَدَاوَةَ وَالْبَغْضَاءَ إِلَى يَوْمِ الْقِيَامَةِ كُلَّمَا أَوْقَدُوا نَارًا لِلْحَرْبِ أَطْفَأَهَا اللَّهُ وَيَسْعَوْنَ فِي الْأَرْضِ فَسَادًا وَاللَّهُ لَا يُحِبُّ الْمُفْسِدِينَ",
          english: "The Jews say, 'God's hand is tied.' It is their hands that are tied, and they are cursed for what they say. In fact, His hands are outstretched; He gives as He wills. Certainly, what was revealed to your from your Lord will increase many of them in defiance and blasphemy. And We placed between them enmity and hatred, until the Day of Resurrection. Whenever they kindle the fire of war, God extinguishes it. And they strive to spread corruption on earth. God does not love the corrupters."
        },
        {
          number: 65,
          arabic: "وَلَوْ أَنَّ أَهْلَ الْكِتَابِ آمَنُوا وَاتَّقَوْا لَكَفَّرْنَا عَنْهُمْ سَيِّئَاتِهِمْ وَلَأَدْخَلْنَاهُمْ جَنَّاتِ النَّعِيمِ",
          english: "Had the People of the Scriputure believed and been righteous, We would have remitted their sins, and admitted them into the Gardens of Bliss."
        },
        {
          number: 66,
          arabic: "وَلَوْ أَنَّهُمْ أَقَامُوا التَّوْرَاةَ وَالْإِنْجِيلَ وَمَا أُنْزِلَ إِلَيْهِمْ مِنْ رَبِّهِمْ لَأَكَلُوا مِنْ فَوْقِهِمْ وَمِنْ تَحْتِ أَرْجُلِهِمْ مِنْهُمْ أُمَّةٌ مُقْتَصِدَةٌ وَكَثِيرٌ مِنْهُمْ سَاءَ مَا يَعْمَلُونَ",
          english: "Had they observed the Torah, and the Gospel, and what was revealed to them from their Lord, they would have consumed amply from above them, and from beneath their feet. Among them is a moderate community, but evil is what many of them are doing."
        },
        {
          number: 67,
          arabic: "يَا أَيُّهَا الرَّسُولُ بَلِّغْ مَا أُنْزِلَ إِلَيْكَ مِنْ رَبِّكَ وَإِنْ لَمْ تَفْعَلْ فَمَا بَلَّغْتَ رِسَالَتَهُ وَاللَّهُ يَعْصِمُكَ مِنَ النَّاسِ إِنَّ اللَّهَ لَا يَهْدِي الْقَوْمَ الْكَافِرِينَ",
          english: "O Messenger, convey what was revealed to you from your Lord. But if you do not, then you would not have delivered His message. And God will protect you from the people. God does not guide the disbelieving people."
        },
        {
          number: 68,
          arabic: "قُلْ يَا أَهْلَ الْكِتَابِ لَسْتُمْ عَلَى شَيْءٍ حَتَّى تُقِيمُوا التَّوْرَاةَ وَالْإِنْجِيلَ وَمَا أُنْزِلَ إِلَيْكُمْ مِنْ رَبِّكُمْ وَلَيَزِيدَنَّ كَثِيرًا مِنْهُمْ مَا أُنْزِلَ إِلَيْكَ مِنْ رَبِّكَ طُغْيَانًا وَكُفْرًا فَلَا تَأْسَ عَلَى الْقَوْمِ الْكَافِرِينَ",
          english: "Say, 'O People of the Scripture! You have no basis until you uphold the Torah, and the Gospel, and what is revealed to you from your Lord.' But what is revealed to you from your Lord will increase many of them in rebellion and disbelief, so do not be sorry for the disbelieving people."
        },
        {
          number: 69,
          arabic: "إِنَّ الَّذِينَ آمَنُوا وَالَّذِينَ هَادُوا وَالصَّابِئُونَ وَالنَّصَارَى مَنْ آمَنَ بِاللَّهِ وَالْيَوْمِ الْآخِرِ وَعَمِلَ صَالِحًا فَلَا خَوْفٌ عَلَيْهِمْ وَلَا هُمْ يَحْزَنُونَ",
          english: "Those who believe, and the Jews, and the Sabians, and the Christians—whoever believes in God and the Last Day, and does what is right—they have nothing to fear, nor shall they grieve."
        },
        {
          number: 70,
          arabic: "لَقَدْ أَخَذْنَا مِيثَاقَ بَنِي إِسْرَائِيلَ وَأَرْسَلْنَا إِلَيْهِمْ رُسُلًا كُلَّمَا جَاءَهُمْ رَسُولٌ بِمَا لَا تَهْوَى أَنْفُسُهُمْ فَرِيقًا كَذَّبُوا وَفَرِيقًا يَقْتُلُونَ",
          english: "We made a covenant with the Children of Israel, and We sent to them messengers. Whenever a messenger came to them with what their souls did not desire, some of them they accused of lying, and others they put to death."
        },
        {
          number: 71,
          arabic: "وَحَسِبُوا أَلَّا تَكُونَ فِتْنَةٌ فَعَمُوا وَصَمُّوا ثُمَّ تَابَ اللَّهُ عَلَيْهِمْ ثُمَّ عَمُوا وَصَمُّوا كَثِيرٌ مِنْهُمْ وَاللَّهُ بَصِيرٌ بِمَا يَعْمَلُونَن",
          english: "They assumed there would be no punishment, so they turned blind and deaf. Then God redeemed them, but then again many of them turned blind and deaf. But God is Seeing of what they do."
        },
        {
          number: 72,
          arabic: "لَقَدْ كَفَرَ الَّذِينَ قَالُوا إِنَّ اللَّهَ هُوَ الْمَسِيحُ ابْنُ مَرْيَمَ وَقَالَ الْمَسِيحُ يَا بَنِي إِسْرَائِيلَ اعْبُدُوا اللَّهَ رَبِّي وَرَبَّكُمْ إِنَّهُ مَنْ يُشْرِكْ بِاللَّهِ فَقَدْ حَرَّمَ اللَّهُ عَلَيْهِ الْجَنَّةَ وَمَأْوَاهُ النَّارُ وَمَا لِلظَّالِمِينَ مِنْ أَنْصَارٍ",
          english: "They disbelieve those who say, 'God is the Messiah the son of Mary.' But the Messiah himself said, 'O Children of Israel, worship God, my Lord and your Lord. Whoever associates others with God, God has forbidden him Paradise, and his dwelling is the Fire. The wrongdoers have no saviors.'"
        },
        {
          number: 73,
          arabic: "لَقَدْ كَفَرَ الَّذِينَ قَالُوا إِنَّ اللَّهَ ثَالِثُ ثَلَاثَةٍ وَمَا مِنْ إِلَهٍ إِلَّا إِلَهٌ وَاحِدٌ وَإِنْ لَمْ يَنْتَهُوا عَمَّا يَقُولُونَ لَيَمَسَّنَّ الَّذِينَ كَفَرُوا مِنْهُمْ عَذَابٌ أَلِيمٌ",
          english: "They disbelieve those who say, 'God is the third of three.' But there is no deity except the One God. If they do not refrain from what they say, a painful torment will befall those among them who disbelieve."
        },
        {
          number: 74,
          arabic: "أَفَلَا يَتُوبُونَ إِلَى اللَّهِ وَيَسْتَغْفِرُونَهُ وَاللَّهُ غَفُورٌ رَحِيمٌ",
          english: "Will they not repent to God and ask His forgiveness? God is Forgiving and Merciful."
        },
        {
          number: 75,
          arabic: "مَا الْمَسِيحُ ابْنُ مَرْيَمَ إِلَّا رَسُولٌ قَدْ خَلَتْ مِنْ قَبْلِهِ الرُّسُلُ وَأُمُّهُ صِدِّيقَةٌ كَانَا يَأْكُلَانِ الطَّعَامَ انْظُرْ كَيْفَ نُبَيِّنُ لَهُمُ الْآيَاتِ ثُمَّ انْظُرْ أَنَّى يُؤْفَكُونَ",
          english: "The Messiah son of Mary was only a messenger, before whom other Messengers had passed away, and his mother was a woman of truth. They both used to eat food. Note how We make clear the revelations to them; then note how deluded they are."
        },
        {
          number: 76,
          arabic: "قُلْ أَتَعْبُدُونَ مِنْ دُونِ اللَّهِ مَا لَا يَمْلِكُ لَكُمْ ضَرًّا وَلَا نَفْعًا وَاللَّهُ هُوَ السَّمِيعُ الْعَلِيمُ",
          english: "Say, 'Do you worship, besides God, what has no power to harm or benefit you?' But God: He is the Hearer, the Knower."
        },
        {
          number: 77,
          arabic: "قُلْ يَا أَهْلَ الْكِتَابِ لَا تَغْلُوا فِي دِينِكُمْ غَيْرَ الْحَقِّ وَلَا تَتَّبِعُوا أَهْوَاءَ قَوْمٍ قَدْ ضَلُّوا مِنْ قَبْلُ وَأَضَلُّوا كَثِيرًا وَضَلُّوا عَنْ سَوَاءِ السَّبِيلِ",
          english: "Say, 'O People of the Scripture! Do not exaggerate in your religion beyond the truth; and do not follow the opinions of people who went astray before, and misled many, and themselves strayed off the balanced way.'"
        },
        {
          number: 78,
          arabic: "لُعِنَ الَّذِينَ كَفَرُوا مِنْ بَنِي إِسْرَائِيلَ عَلَى لِسَانِ دَاوُودَ وَعِيسَى ابْنِ مَرْيَمَ ذَلِكَ بِمَا عَصَوْا وَكَانُوا يَعْتَدُونَ",
          english: "Cursed were those who disbelieved from among the Children of Israel by the tongue of David and Jesus son of Mary. That is because they rebelled and used to transgress."
        },
        {
          number: 79,
          arabic: "كَانُوا لَا يَتَنَاهَوْنَ عَنْ مُنْكَرٍ فَعَلُوهُ لَبِئْسَ مَا كَانُوا يَفْعَلُونَ",
          english: "They used not to prevent one another from the wrongs they used to commit. Evil is what they used to do."
        },
        {
          number: 80,
          arabic: "تَرَى كَثِيرًا مِنْهُمْ يَتَوَلَّوْنَ الَّذِينَ كَفَرُوا لَبِئْسَ مَا قَدَّمَتْ لَهُمْ أَنْفُسُهُمْ أَنْ سَخِطَ اللَّهُ عَلَيْهِمْ وَفِي الْعَذَابِ هُمْ خَالِدُونَ",
          english: "You will see many of them befriending those who disbelieve. Terrible is what their souls prompts them to do. The wrath of God fell upon them, and in the torment they will remain."
        },
        {
          number: 81,
          arabic: "وَلَوْ كَانُوا يُؤْمِنُونَ بِاللَّهِ وَالنَّبِيِّ وَمَا أُنْزِلَ إِلَيْهِ مَا اتَّخَذُوهُمْ أَوْلِيَاءَ وَلَكِنَّ كَثِيرًا مِنْهُمْ فَاسِقُونَ",
          english: "Had they believed in God and the Prophet, and in what was revealed to him, they would not have befriended them. But many of them are immoral."
        },
        {
          number: 82,
          arabic: "لَتَجِدَنَّ أَشَدَّ النَّاسِ عَدَاوَةً لِلَّذِينَ آمَنُوا الْيَهُودَ وَالَّذِينَ أَشْرَكُوا وَلَتَجِدَنَّ أَقْرَبَهُمْ مَوَدَّةً لِلَّذِينَ آمَنُوا الَّذِينَ قَالُوا إِنَّا نَصَارَى ذَلِكَ بِأَنَّ مِنْهُمْ قِسِّيسِينَ وَرُهْبَانًا وَأَنَّهُمْ لَا يَسْتَكْبِرُونَ",
          english: "You will find that the people most hostile towards the believers are the Jews and the polytheists. And you will find that the nearest in affection towards the believers are those who say, 'We are Christians.' That is because among them are priests and monks, and they are not arrogant."
        },
        {
          number: 83,
          arabic: "وَإِذَا سَمِعُوا مَا أُنْزِلَ إِلَى الرَّسُولِ تَرَى أَعْيُنَهُمْ تَفِيضُ مِنَ الدَّمْعِ مِمَّا عَرَفُوا مِنَ الْحَقِّ يَقُولُونَ رَبَّنَا آمَنَّا فَاكْتُبْنَا مَعَ الشَّاهِدِينَ",
          english: "And when they hear what was revealed to the Messenger, you see their eyes overflowing with tears, as they recognize the truth in it. They say, 'Our Lord, we have believed, so count us among the witnesses.'"
        },
        {
          number: 84,
          arabic: "وَمَا لَنَا لَا نُؤْمِنُ بِاللَّهِ وَمَا جَاءَنَا مِنَ الْحَقِّ وَنَطْمَعُ أَنْ يُدْخِلَنَا رَبُّنَا مَعَ الْقَوْمِ الصَّالِحِينَ",
          english: "'And why should we not believe in God, and in the truth that has come to us, and hope that our Lord will include us among the righteous people?'"
        },
        {
          number: 85,
          arabic: "فَأَثَابَهُمُ اللَّهُ بِمَا قَالُوا جَنَّاتٍ تَجْرِي مِنْ تَحْتِهَا الْأَنْهَارُ خَالِدِينَ فِيهَا وَذَلِكَ جَزَاءُ الْمُحْسِنِينَ",
          english: "God will reward them for what they say—Gardens beneath which rivers flow, where they will stay forever. Such is the reward of the righteous."
        },
        {
          number: 86,
          arabic: "وَالَّذِينَ كَفَرُوا وَكَذَّبُوا بِآيَاتِنَا أُولَئِكَ أَصْحَابُ الْجَحِيمِ",
          english: "But as for those who disbelieve and deny Our signs—these are the inmates of the Fire."
        },
        {
          number: 87,
          arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا لَا تُحَرِّمُوا طَيِّبَاتِ مَا أَحَلَّ اللَّهُ لَكُمْ وَلَا تَعْتَدُوا إِنَّ اللَّهَ لَا يُحِبُّ الْمُعْتَدِينَ",
          english: "O you who believe! Do not prohibit the good things God has permitted for you, and do not commit aggression. God does not love the aggressors."
        },
        {
          number: 88,
          arabic: "وَكُلُوا مِمَّا رَزَقَكُمُ اللَّهُ حَلَالًا طَيِّبًا وَاتَّقُوا اللَّهَ الَّذِي أَنْتُمْ بِهِ مُؤْمِنُونَ",
          english: "And eat of the lawful and good things God has provided for you; and be conscious of God, in whom you are believers."
        },
        {
          number: 89,
          arabic: "لَا يُؤَاخِذُكُمُ اللَّهُ بِاللَّغْوِ فِي أَيْمَانِكُمْ وَلَكِنْ يُؤَاخِذُكُمْ بِمَا عَقَّدْتُمُ الْأَيْمَانَ فَكَفَّارَتُهُ إِطْعَامُ عَشَرَةِ مَسَاكِينَ مِنْ أَوْسَطِ مَا تُطْعِمُونَ أَهْلِيكُمْ أَوْ كِسْوَتُهُمْ أَوْ تَحْرِيرُ رَقَبَةٍ فَمَنْ لَمْ يَجِدْ فَصِيَامُ ثَلَاثَةِ أَيَّامٍ ذَلِكَ كَفَّارَةُ أَيْمَانِكُمْ إِذَا حَلَفْتُمْ وَاحْفَظُوا أَيْمَانَكُمْ كَذَلِكَ يُبَيِّنُ اللَّهُ لَكُمْ آيَاتِهِ لَعَلَّكُمْ تَشْكُرُونَ",
          english: "God does not hold you accountable for your unintended oaths, but He holds you accountable for your binding oaths. The atonement for it is by feeding ten needy people from the average of what you feed your families, or by clothing them, or by freeing a slave. Anyone who lacks the means shall fast for three days. That is the atonement for breaking your oaths when you have sworn them. So keep your oaths. Thus God makes clear His Revelations to you, that you may be grateful."
        },
        {
          number: 90,
          arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا إِنَّمَا الْخَمْرُ وَالْمَيْسِرُ وَالْأَنْصَابُ وَالْأَزْلَامُ رِجْسٌ مِنْ عَمَلِ الشَّيْطَانِ فَاجْتَنِبُوهُ لَعَلَّكُمْ تُفْلِحُونَ",
          english: "O you who believe! Intoxicants, gambling, idolatry, and divination are abominations of Satan's doing. Avoid them, so that you may prosper."
        },
        {
          number: 91,
          arabic: "إِنَّمَا يُرِيدُ الشَّيْطَانُ أَنْ يُوقِعَ بَيْنَكُمُ الْعَدَاوَةَ وَالْبَغْضَاءَ فِي الْخَمْرِ وَالْمَيْسِرِ وَيَصُدَّكُمْ عَنْ ذِكْرِ اللَّهِ وَعَنِ الصَّلَاةِ فَهَلْ أَنْتُمْ مُنْتَهُونَ",
          english: "Satan wants to provoke strife and hatred among you through intoxicants and gambling, and to prevent you from the remembrance of God, and from prayer. Will you not desist?"
        },
        {
          number: 92,
          arabic: "وَأَطِيعُوا اللَّهَ وَأَطِيعُوا الرَّسُولَ وَاحْذَرُوا فَإِنْ تَوَلَّيْتُمْ فَاعْلَمُوا أَنَّمَا عَلَى رَسُولِنَا الْبَلَاغُ الْمُبِينُ",
          english: "Obey God and obey the Messenger, and be cautious. If you turn away—know that the duty of Our Messenger is clear communication."
        },
        {
          number: 93,
          arabic: "لَيْسَ عَلَى الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ جُنَاحٌ فِيمَا طَعِمُوا إِذَا مَا اتَّقَوْا وَآمَنُوا وَعَمِلُوا الصَّالِحَاتِ ثُمَّ اتَّقَوْا وَآمَنُوا ثُمَّ اتَّقَوْا وَأَحْسَنُوا وَاللَّهُ يُحِبُّ الْمُحْسِنِينَ",
          english: "Those who believe and do righteous deeds will not be blamed for what they may have eaten, provided they obey, and believe, and do good deeds, then maintain piety and faith, then remain righteous and charitable. God loves the charitable."
        },
        {
          number: 94,
          arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا لَيَبْلُوَنَّكُمُ اللَّهُ بِشَيْءٍ مِنَ الصَّيْدِ تَنَالُهُ أَيْدِيكُمْ وَرِمَاحُكُمْ لِيَعْلَمَ اللَّهُ مَنْ يَخَافُهُ بِالْغَيْبِ فَمَنِ اعْتَدَى بَعْدَ ذَلِكَ فَلَهُ عَذَابٌ أَلِيمٌ",
          english: "O you who believe! God will test you with something of the game your hands and spears obtain, that God may know who fears Him at heart. Whoever commits aggression after that will have a painful punishment."
        },
        {
          number: 95,
          arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا لَا تَقْتُلُوا الصَّيْدَ وَأَنْتُمْ حُرُمٌ وَمَنْ قَتَلَهُ مِنْكُمْ مُتَعَمِّدًا فَجَزَاءٌ مِثْلُ مَا قَتَلَ مِنَ النَّعَمِ يَحْكُمُ بِهِ ذَوَا عَدْلٍ مِنْكُمْ هَدْيًا بَالِغَ الْكَعْبَةِ أَوْ كَفَّارَةٌ طَعَامُ مَسَاكِينَ أَوْ عَدْلُ ذَلِكَ صِيَامًا لِيَذُوقَ وَبَالَ أَمْرِهِ عَفَا اللَّهُ عَمَّا سَلَفَ وَمَنْ عَادَ فَيَنْتَقِمُ اللَّهُ مِنْهُ وَاللَّهُ عَزِيزٌ ذُو انْتِقَامٍ",
          english: "O you who believe! do not kill game while you are in pilgrim sanctity. Whoever of you kills any intentionally, its penalty shall be a domestic animal comparable to what he killed, as determined by two honest persons among you—an offering delivered to the Kaabah. Or he may atone by feeding the needy, or its equivalent in fasting, so that he may taste the consequences of his conduct. God forgives what is past. But whoever repeats, God will take revenge on him. God is Almighty, Avenger."
        },
        {
          number: 96,
          arabic: "أُحِلَّ لَكُمْ صَيْدُ الْبَحْرِ وَطَعَامُهُ مَتَاعًا لَكُمْ وَلِلسَّيَّارَةِ وَحُرِّمَ عَلَيْكُمْ صَيْدُ الْبَرِّ مَا دُمْتُمْ حُرُمًا وَاتَّقُوا اللَّهَ الَّذِي إِلَيْهِ تُحْشَرُونَ",
          english: "Permitted for you is the catch of sea, and its food—as sustenance for you and for travelers. But forbidden for you is the game of land while you are in pilgrim sanctity. And fear God, to whom you will be gathered."
        },
        {
          number: 97,
          arabic: "جَعَلَ اللَّهُ الْكَعْبَةَ الْبَيْتَ الْحَرَامَ قِيَامًا لِلنَّاسِ وَالشَّهْرَ الْحَرَامَ وَالْهَدْيَ وَالْقَلَائِدَ ذَلِكَ لِتَعْلَمُوا أَنَّ اللَّهَ يَعْلَمُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ وَأَنَّ اللَّهَ بِكُلِّ شَيْءٍ عَلِيمٌ",
          english: "God has appointed the Kaabah, the Sacred House, a sanctuary for the people, and the Sacred Month, and the offerings, and the garlanded. That you may know that God knows everything in the heavens and the earth, and that God is Cognizant of all things."
        },
        {
          number: 98,
          arabic: "اعْلَمُوا أَنَّ اللَّهَ شَدِيدُ الْعِقَابِ وَأَنَّ اللَّهَ غَفُورٌ رَحِيمٌ",
          english: "Know that God is severe in retribution, and that God is Forgiving and Merciful."
        },
        {
          number: 99,
          arabic: "مَا عَلَى الرَّسُولِ إِلَّا الْبَلَاغُ وَاللَّهُ يَعْلَمُ مَا تُبْدُونَ وَمَا تَكْتُمُونَ",
          english: "The Messenger's sole duty is to convey. God knows what you reveal and what you conceal."
        },
        {
          number: 100,
          arabic: "قُلْ لَا يَسْتَوِي الْخَبِيثُ وَالطَّيِّبُ وَلَوْ أَعْجَبَكَ كَثْرَةُ الْخَبِيثِ فَاتَّقُوا اللَّهَ يَا أُولِي الْأَلْبَابِ لَعَلَّكُمْ تُفْلِحُونَ",
          english: "Say: 'The bad and the good are not equal, even though the abundance of the bad may impress you. So be conscious of God, O you who possess intelligence, that you may succeed.'"
        },
        {
          number: 101,
          arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا لَا تَسْأَلُوا عَنْ أَشْيَاءَ إِنْ تُبْدَ لَكُمْ تَسُؤْكُمْ وَإِنْ تَسْأَلُوا عَنْهَا حِينَ يُنَزَّلُ الْقُرْآنُ تُبْدَ لَكُمْ عَفَا اللَّهُ عَنْهَا وَاللَّهُ غَفُورٌ حَلِيمٌ",
          english: "O you who believe! Do not ask about things that would trouble you if disclosed to you. But if you were to ask about them while the Quran is being revealed, they will become obvious to you. God forgives that. God is Forgiving and Clement."
        },
        {
          number: 102,
          arabic: "قَدْ سَأَلَهَا قَوْمٌ مِنْ قَبْلِكُمْ ثُمَّ أَصْبَحُوا بِهَا كَافِرِينَ",
          english: "A people before you asked about them, but then came to reject them."
        },
        {
          number: 103,
          arabic: "مَا جَعَلَ اللَّهُ مِنْ بَحِيرَةٍ وَلَا سَائِبَةٍ وَلَا وَصِيلَةٍ وَلَا حَامٍ وَلَكِنَّ الَّذِينَ كَفَرُوا يَفْتَرُونَ عَلَى اللَّهِ الْكَذِبَ وَأَكْثَرُهُمْ لَا يَعْقِلُونَ",
          english: "God did not institute the superstitions of Bahirah, Saibah, Wasilah, or of Hami; but those who disbelieve fabricate lies about God—most of them do not understand."
        },
        {
          number: 104,
          arabic: "وَإِذَا قِيلَ لَهُمْ تَعَالَوْا إِلَى مَا أَنْزَلَ اللَّهُ وَإِلَى الرَّسُولِ قَالُوا حَسْبُنَا مَا وَجَدْنَا عَلَيْهِ آبَاءَنَا أَوَلَوْ كَانَ آبَاؤُهُمْ لَا يَعْلَمُونَ شَيْئًا وَلَا يَهْتَدُونَ",
          english: "And when it is said to them, 'Come to what God has revealed, and to the Messenger,' they say, 'Sufficient for us is what we found our forefathers upon.' Even if their forefathers knew nothing, and were not guided?"
        },
        {
          number: 105,
          arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا عَلَيْكُمْ أَنْفُسَكُمْ لَا يَضُرُّكُمْ مَنْ ضَلَّ إِذَا اهْتَدَيْتُمْ إِلَى اللَّهِ مَرْجِعُكُمْ جَمِيعًا فَيُنَبِّئُكُمْ بِمَا كُنْتُمْ تَعْمَلُونَ",
          english: "O you who believe! You are responsible for your own souls. He who has strayed cannot harm you if you are guided. To God is you return, all of you, and He will inform you of what you used to do."
        },
        {
          number: 106,
          arabic: "يَا أَيُّهَا الَّذِينَ آمَنُوا شَهَادَةُ بَيْنِكُمْ إِذَا حَضَرَ أَحَدَكُمُ الْمَوْتُ حِينَ الْوَصِيَّةِ اثْنَانِ ذَوَا عَدْلٍ مِنْكُمْ أَوْ آخَرَانِ مِنْ غَيْرِكُمْ إِنْ أَنْتُمْ ضَرَبْتُمْ فِي الْأَرْضِ فَأَصَابَتْكُمْ مُصِيبَةُ الْمَوْتِ تَحْبِسُونَهُمَا مِنْ بَعْدِ الصَّلَاةِ فَيُقْسِمَانِ بِاللَّهِ إِنِ ارْتَبْتُمْ لَا نَشْتَرِي بِهِ ثَمَنًا وَلَوْ كَانَ ذَا قُرْبَى وَلَا نَكْتُمُ شَهَادَةَ اللَّهِ إِنَّا إِذًا لَمِنَ الْآثِمِينَ",
          english: "O you who believe! When death approaches one of you, let two reliable persons from among you act as witnesses to the making of a bequest, or two persons from another people if you are travelling in the land and the event of death approaches you. Engage them after the prayer. If you have doubts, let them swear by God: 'We will not sell our testimony for any price, even if he was a near relative, and we will not conceal God's testimony, for then we would be sinners.'"
        },
        {
          number: 107,
          arabic: "فَإِنْ عُثِرَ عَلَى أَنَّهُمَا اسْتَحَقَّا إِثْمًا فَآخَرَانِ يَقُومَانِ مَقَامَهُمَا مِنَ الَّذِينَ اسْتَحَقَّ عَلَيْهِمُ الْأَوْلَيَانِ فَيُقْسِمَانِ بِاللَّهِ لَشَهَادَتُنَا أَحَقُّ مِنْ شَهَادَتِهِمَا وَمَا اعْتَدَيْنَا إِنَّا إِذًا لَمِنَ الظَّالِمِينَ",
          english: "If it is discovered that they are guilty of perjury: let two others take their place, two from among those responsible for the claim, and have them swear by God, 'Our testimony is more truthful than their testimony, and we will not be biased, for then we would be wrongdoers.'"
        },
        {
          number: 108,
          arabic: "ذَلِكَ أَدْنَى أَنْ يَأْتُوا بِالشَّهَادَةِ عَلَى وَجْهِهَا أَوْ يَخَافُوا أَنْ تُرَدَّ أَيْمَانٌ بَعْدَ أَيْمَانِهِمْ وَاتَّقُوا اللَّهَ وَاسْمَعُوا وَاللَّهُ لَا يَهْدِي الْقَوْمَ الْفَاسِقِينَ",
          english: "That makes it more likely that they will give true testimony, fearing that their oaths might be contradicted by subsequent oaths. So fear God, and listen. God does not guide the disobedient people."
        },
        {
          number: 109,
          arabic: "يَوْمَ يَجْمَعُ اللَّهُ الرُّسُلَ فَيَقُولُ مَاذَا أُجِبْتُمْ قَالُوا لَا عِلْمَ لَنَا إِنَّكَ أَنْتَ عَلَّامُ الْغُيُوبِ",
          english: "On the Day when God will gather the messengers, then say, 'What response were you given?' They will say, 'We have no knowledge; it is you who are the Knower of the unseen.'"
        },
        {
          number: 110,
          arabic: "إِذْ قَالَ اللَّهُ يَا عِيسَى ابْنَ مَرْيَمَ اذْكُرْ نِعْمَتِي عَلَيْكَ وَعَلَى وَالِدَتِكَ إِذْ أَيَّدْتُكَ بِرُوحِ الْقُدُسِ تُكَلِّمُ النَّاسَ فِي الْمَهْدِ وَكَهْلًا وَإِذْ عَلَّمْتُكَ الْكِتَابَ وَالْحِكْمَةَ وَالتَّوْرَاةَ وَالْإِنْجِيلَ وَإِذْ تَخْلُقُ مِنَ الطِّينِ كَهَيْئَةِ الطَّيْرِ بِإِذْنِي فَتَنْفُخُ فِيهَا فَتَكُونُ طَيْرًا بِإِذْنِي وَتُبْرِئُ الْأَكْمَهَ وَالْأَبْرَصَ بِإِذْنِي وَإِذْ تُخْرِجُ الْمَوْتَى بِإِذْنِي وَإِذْ كَفَفْتُ بَنِي إِسْرَائِيلَ عَنْكَ إِذْ جِئْتَهُمْ بِالْبَيِّنَاتِ فَقَالَ الَّذِينَ كَفَرُوا مِنْهُمْ إِنْ هَذَا إِلَّا سِحْرٌ مُبِينٌ",
          english: "When God will say, 'O Jesus son of Mary, recall My favor upon you and upon your mother, how I supported you with the Holy Spirit. You spoke to the people from the crib, and in maturity. How I taught you the Scripture and wisdom, and the Torah and the Gospel. And recall that you molded from clay the shape of a bird, by My leave, and then you breathed into it, and it became a bird, by My leave. And you healed the blind and the leprous, by My leave; and you revived the dead, by My leave. And recall that I restrained the Children of Israel from you when you brought them the clear miracles. But those who disbelieved among them said, `This is nothing but obvious sorcery.''"
        },
        {
          number: 111,
          arabic: "وَإِذْ أَوْحَيْتُ إِلَى الْحَوَارِيِّينَ أَنْ آمِنُوا بِي وَبِرَسُولِي قَالُوا آمَنَّا وَاشْهَدْ بِأَنَّنَا مُسْلِمُونَ",
          english: "'And when I inspired the disciples: `Believe in Me and in My Messenger.' They said, `We have believed, so bear witness that We have submitted.''"
        },
        {
          number: 112,
          arabic: "إِذْ قَالَ الْحَوَارِيُّونَ يَا عِيسَى ابْنَ مَرْيَمَ هَلْ يَسْتَطِيعُ رَبُّكَ أَنْ يُنَزِّلَ عَلَيْنَا مَائِدَةً مِنَ السَّمَاءِ قَالَ اتَّقُوا اللَّهَ إِنْ كُنْتُمْ مُؤْمِنِينَ",
          english: "'And when the disciples said, 'O Jesus son of Mary, is your Lord able to bring down for us a feast from heaven?' He said, 'Fear God, if you are believers.''"
        },
        {
          number: 113,
          arabic: "قَالُوا نُرِيدُ أَنْ نَأْكُلَ مِنْهَا وَتَطْمَئِنَّ قُلُوبُنَا وَنَعْلَمَ أَنْ قَدْ صَدَقْتَنَا وَنَكُونَ عَلَيْهَا مِنَ الشَّاهِدِينَ",
          english: "They said, 'We wish to eat from it, so that our hearts may be reassured, and know that you have told us the truth, and be among those who witness it.'"
        },
        {
          number: 114,
          arabic: "قَالَ عِيسَى ابْنُ مَرْيَمَ اللَّهُمَّ رَبَّنَا أَنْزِلْ عَلَيْنَا مَائِدَةً مِنَ السَّمَاءِ تَكُونُ لَنَا عِيدًا لِأَوَّلِنَا وَآخِرِنَا وَآيَةً مِنْكَ وَارْزُقْنَا وَأَنْتَ خَيْرُ الرَّازِقِينَ",
          english: "Jesus son of Mary said, 'O God, our Lord, send down for us a table from heaven, to be a festival for us, for the first of us, and the last of us, and a sign from You; and provide for us; You are the Best of providers.'"
        },
        {
          number: 115,
          arabic: "قَالَ اللَّهُ إِنِّي مُنَزِّلُهَا عَلَيْكُمْ فَمَنْ يَكْفُرْ بَعْدُ مِنْكُمْ فَإِنِّي أُعَذِّبُهُ عَذَابًا لَا أُعَذِّبُهُ أَحَدًا مِنَ الْعَالَمِينَ",
          english: "God said, 'I will send it down to you. But whoever among you disbelieves thereafter, I will punish him with a punishment the like of which I never punish any other being.'"
        },
        {
          number: 116,
          arabic: "وَإِذْ قَالَ اللَّهُ يَا عِيسَى ابْنَ مَرْيَمَ أَأَنْتَ قُلْتَ لِلنَّاسِ اتَّخِذُونِي وَأُمِّيَ إِلَهَيْنِ مِنْ دُونِ اللَّهِ قَالَ سُبْحَانَكَ مَا يَكُونُ لِي أَنْ أَقُولَ مَا لَيْسَ لِي بِحَقٍّ إِنْ كُنْتُ قُلْتُهُ فَقَدْ عَلِمْتَهُ تَعْلَمُ مَا فِي نَفْسِي وَلَا أَعْلَمُ مَا فِي نَفْسِكَ إِنَّكَ أَنْتَ عَلَّامُ الْغُيُوبِ",
          english: "And God will say, 'O Jesus son of Mary, did you say to the people, `Take me and my mother as gods rather than God?'' He will say, 'Glory be to You! It is not for me to say what I have no right to. Had I said it, You would have known it. You know what is in my soul, and I do not know what is in your soul. You are the Knower of the hidden."
        },
        {
          number: 117,
          arabic: "مَا قُلْتُ لَهُمْ إِلَّا مَا أَمَرْتَنِي بِهِ أَنِ اعْبُدُوا اللَّهَ رَبِّي وَرَبَّكُمْ وَكُنْتُ عَلَيْهِمْ شَهِيدًا مَا دُمْتُ فِيهِمْ فَلَمَّا تَوَفَّيْتَنِي كُنْتَ أَنْتَ الرَّقِيبَ عَلَيْهِمْ وَأَنْتَ عَلَى كُلِّ شَيْءٍ شَهِيدٌ",
          english: "I only told them what You commanded me: that you shall worship God, my Lord and your Lord. And I was a witness over them while I was among them; but when You took me to Yourself, you became the Watcher over them—You are Witness over everything."
        },
        {
          number: 118,
          arabic: "إِنْ تُعَذِّبْهُمْ فَإِنَّهُمْ عِبَادُكَ وَإِنْ تَغْفِرْ لَهُمْ فَإِنَّكَ أَنْتَ الْعَزِيزُ الْحَكِيمُ",
          english: "If You punish them, they are Your servants; but if You forgive them, You are the Mighty and Wise.'"
        },
        {
          number: 119,
          arabic: "قَالَ اللَّهُ هَذَا يَوْمُ يَنْفَعُ الصَّادِقِينَ صِدْقُهُمْ لَهُمْ جَنَّاتٌ تَجْرِي مِنْ تَحْتِهَا الْأَنْهَارُ خَالِدِينَ فِيهَا أَبَدًا رَضِيَ اللَّهُ عَنْهُمْ وَرَضُوا عَنْهُ ذَلِكَ الْفَوْزُ الْعَظِيمُ",
          english: "God will say, 'This is a Day when the truthful will benefit from their truthfulness.' They will have Gardens beneath which rivers flow, wherein they will remain forever. God is pleased with them, and they are pleased with Him. That is the great attainment."
        },
        {
          number: 120,
          arabic: "لِلَّهِ مُلْكُ السَّمَاوَاتِ وَالْأَرْضِ وَمَا فِيهِنَّ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
          english: "To God belongs the sovereignty of the heavens and the earth and what lies in them, and He has power over everything."
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
        },
        {
          number: 4,
          arabic: "وَمَا تَأْتِيهِمْ مِنْ آيَةٍ مِنْ آيَاتِ رَبِّهِمْ إِلَّا كَانُوا عَنْهَا مُعْرِضِينَ",
          english: "Not one of their Lord's signs comes to them, but they turn away from it."
        },
        {
          number: 5,
          arabic: "فَقَدْ كَذَّبُوا بِالْحَقِّ لَمَّا جَاءَهُمْ فَسَوْفَ يَأْتِيهِمْ أَنْبَاءُ مَا كَانُوا بِهِ يَسْتَهْزِئُونَ",
          english: "They denied the truth when it has come to them; but soon will reach them the news of what they used to ridicule."
        },
        {
          number: 6,
          arabic: "أَلَمْ يَرَوْا كَمْ أَهْلَكْنَا مِنْ قَبْلِهِمْ مِنْ قَرْنٍ مَكَّنَّاهُمْ فِي الْأَرْضِ مَا لَمْ نُمَكِّنْ لَكُمْ وَأَرْسَلْنَا السَّمَاءَ عَلَيْهِمْ مِدْرَارًا وَجَعَلْنَا الْأَنْهَارَ تَجْرِي مِنْ تَحْتِهِمْ فَأَهْلَكْنَاهُمْ بِذُنُوبِهِمْ وَأَنْشَأْنَا مِنْ بَعْدِهِمْ قَرْنًا آخَرِينَ",
          english: "Have they not considered how many generations We destroyed before them? We had established them on earth more firmly than We established you, and We sent the clouds pouring down abundant rain on them, and We made rivers flow beneath them. But We destroyed them for their sins, and established other civilizations after them."
        },
        {
          number: 7,
          arabic: "وَلَوْ نَزَّلْنَا عَلَيْكَ كِتَابًا فِي قِرْطَاسٍ فَلَمَسُوهُ بِأَيْدِيهِمْ لَقَالَ الَّذِينَ كَفَرُوا إِنْ هَذَا إِلَّا سِحْرٌ مُبِينٌ",
          english: "Had We sent down upon you a book on paper, and they had touched it with their hands, those who disbelieve would have said, 'This is nothing but plain magic.'"
        },
        {
          number: 8,
          arabic: "وَقَالُوا لَوْلَا أُنْزِلَ عَلَيْهِ مَلَكٌ وَلَوْ أَنْزَلْنَا مَلَكًا لَقُضِيَ الْأَمْرُ ثُمَّ لَا يُنْظَرُونَ",
          english: "And they say, 'Why was an angel not sent down to him.' Had We sent down an angel, the matter would have been settled, and they would not have been reprieved."
        },
        {
          number: 9,
          arabic: "وَلَوْ جَعَلْنَاهُ مَلَكًا لَجَعَلْنَاهُ رَجُلًا وَلَلَبَسْنَا عَلَيْهِمْ مَا يَلْبِسُونَ",
          english: "Had We made him an angel, We would have made him a man, and confused them when they are already confused."
        },
        {
          number: 10,
          arabic: "وَلَقَدِ اسْتُهْزِئَ بِرُسُلٍ مِنْ قَبْلِكَ فَحَاقَ بِالَّذِينَ سَخِرُوا مِنْهُمْ مَا كَانُوا بِهِ يَسْتَهْزِئُونَ",
          english: "Messengers before you were ridiculed, but those who mocked them became besieged by what they ridiculed."
        },
        {
          number: 11,
          arabic: "قُلْ سِيرُوا فِي الْأَرْضِ ثُمَّ انْظُرُوا كَيْفَ كَانَ عَاقِبَةُ الْمُكَذِّبِينَ",
          english: "Say, 'Travel the earth and observe the final fate of the deniers.'"
        },
        {
          number: 12,
          arabic: "قُلْ لِمَنْ مَا فِي السَّمَاوَاتِ وَالْأَرْضِ قُلْ لِلَّهِ كَتَبَ عَلَى نَفْسِهِ الرَّحْمَةَ لَيَجْمَعَنَّكُمْ إِلَى يَوْمِ الْقِيَامَةِ لَا رَيْبَ فِيهِ الَّذِينَ خَسِرُوا أَنْفُسَهُمْ فَهُمْ لَا يُؤْمِنُونَ",
          english: "Say, 'To whom belongs what is in the heavens and the earth?' Say, 'To God.' He has inscribed for Himself mercy. He will gather you to the Day of Resurrection, in which there is no doubt. Those who lost their souls do not believe."
        },
        {
          number: 13,
          arabic: "وَلَهُ مَا سَكَنَ فِي اللَّيْلِ وَالنَّهَارِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
          english: "To Him belongs whatever rests in the night and the day. He is the Hearing, the Knowing."
        },
        {
          number: 14,
          arabic: "قُلْ أَغَيْرَ اللَّهِ أَتَّخِذُ وَلِيًّا فَاطِرِ السَّمَاوَاتِ وَالْأَرْضِ وَهُوَ يُطْعِمُ وَلَا يُطْعَمُ قُلْ إِنِّي أُمِرْتُ أَنْ أَكُونَ أَوَّلَ مَنْ أَسْلَمَ وَلَا تَكُونَنَّ مِنَ الْمُشْرِكِينَ",
          english: "Say, 'Shall I take for myself a protector other than God, Originator of the heavens and the earth, and He feeds and is not fed?' Say, 'I am instructed to be the first of those who submit.' And do not be among the idolaters."
        },
        {
          number: 15,
          arabic: "قُلْ إِنِّي أَخَافُ إِنْ عَصَيْتُ رَبِّي عَذَابَ يَوْمٍ عَظِيمٍ",
          english: "Say, 'I fear, should I defy my Lord, the punishment of a tremendous Day.'"
        },
        {
          number: 16,
          arabic: "مَنْ يُصْرَفْ عَنْهُ يَوْمَئِذٍ فَقَدْ رَحِمَهُ وَذَلِكَ الْفَوْزُ الْمُبِينُ",
          english: "Whoever is spared on that Day—He had mercy on him. That is the clear victory."
        },
        {
          number: 17,
          arabic: "وَإِنْ يَمْسَسْكَ اللَّهُ بِضُرٍّ فَلَا كَاشِفَ لَهُ إِلَّا هُوَ وَإِنْ يَمْسَسْكَ بِخَيْرٍ فَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
          english: "If God touches you with adversity, none can remove it except He. And if He touches you with good—He is Capable of everything."
        },
        {
          number: 18,
          arabic: "وَهُوَ الْقَاهِرُ فَوْقَ عِبَادِهِ وَهُوَ الْحَكِيمُ الْخَبِيرُ",
          english: "He is the Supreme over His servants. He is the Wise, the Expert."
        },
        {
          number: 19,
          arabic: "قُلْ أَيُّ شَيْءٍ أَكْبَرُ شَهَادَةً قُلِ اللَّهُ شَهِيدٌ بَيْنِي وَبَيْنَكُمْ وَأُوحِيَ إِلَيَّ هَذَا الْقُرْآنُ لِأُنْذِرَكُمْ بِهِ وَمَنْ بَلَغَ أَئِنَّكُمْ لَتَشْهَدُونَ أَنَّ مَعَ اللَّهِ آلِهَةً أُخْرَى قُلْ لَا أَشْهَدُ قُلْ إِنَّمَا هُوَ إِلَهٌ وَاحِدٌ وَإِنَّنِي بَرِيءٌ مِمَّا تُشْرِكُونَ",
          english: "Say, 'What thing is more solemn in testimony?' Say, 'God is Witness between you and me. This Quran was revealed to me, that I may warn you with it, and whomever it may reach. Do you indeed testify that there are other gods with God?' Say, 'I myself do not testify.' Say, 'He is but One God, and I am innocent of your idolatry.'"
        },
        {
          number: 20,
          arabic: "الَّذِينَ آتَيْنَاهُمُ الْكِتَابَ يَعْرِفُونَهُ كَمَا يَعْرِفُونَ أَبْنَاءَهُمُ الَّذِينَ خَسِرُوا أَنْفُسَهُمْ فَهُمْ لَا يُؤْمِنُونَ",
          english: "Those to whom We have given the Book recognize it as they recognize their own children; but those who have lost their souls do not believe."
        },
        {
          number: 21,
          arabic: "وَمَنْ أَظْلَمُ مِمَّنِ افْتَرَى عَلَى اللَّهِ كَذِبًا أَوْ كَذَّبَ بِآيَاتِهِ إِنَّهُ لَا يُفْلِحُ الظَّالِمُونَ",
          english: "Who does greater wrong than someone who fabricates lies against God, or denies His revelations? The wrongdoers will not succeed."
        },
        {
          number: 22,
          arabic: "وَيَوْمَ نَحْشُرُهُمْ جَمِيعًا ثُمَّ نَقُولُ لِلَّذِينَ أَشْرَكُوا أَيْنَ شُرَكَاؤُكُمُ الَّذِينَ كُنْتُمْ تَزْعُمُونَ",
          english: "On the Day when We gather them all together, then say to the idolaters, 'Where are your idols, those you used to claim?'"
        },
        {
          number: 23,
          arabic: "ثُمَّ لَمْ تَكُنْ فِتْنَتُهُمْ إِلَّا أَنْ قَالُوا وَاللَّهِ رَبِّنَا مَا كُنَّا مُشْرِكِينَ",
          english: "Then their only argument will be to say, 'By God, our Lord, we were not idolaters.'"
        },
        {
          number: 24,
          arabic: "انْظُرْ كَيْفَ كَذَبُوا عَلَى أَنْفُسِهِمْ وَضَلَّ عَنْهُمْ مَا كَانُوا يَفْتَرُونَ",
          english: "Look how they lied to themselves. And what they invented deserted them."
        },
        {
          number: 25,
          arabic: "وَمِنْهُمْ مَنْ يَسْتَمِعُ إِلَيْكَ وَجَعَلْنَا عَلَى قُلُوبِهِمْ أَكِنَّةً أَنْ يَفْقَهُوهُ وَفِي آذَانِهِمْ وَقْرًا وَإِنْ يَرَوْا كُلَّ آيَةٍ لَا يُؤْمِنُوا بِهَا حَتَّى إِذَا جَاءُوكَ يُجَادِلُونَكَ يَقُولُ الَّذِينَ كَفَرُوا إِنْ هَذَا إِلَّا أَسَاطِيرُ الْأَوَّلِينَ",
          english: "Among them are those who listen to you; but We place covers over their hearts, to prevent them from understanding it, and heaviness in their ears. Even if they see every sign, they will not believe in it. Until, when they come to you, to argue with you, those who disbelieve will say, 'These are nothing but myths of the ancients.'"
        },
        {
          number: 26,
          arabic: "وَهُمْ يَنْهَوْنَ عَنْهُ وَيَنْأَوْنَ عَنْهُ وَإِنْ يُهْلِكُونَ إِلَّا أَنْفُسَهُمْ وَمَا يَشْعُرُونَ",
          english: "They keep others from it, and avoid it themselves; but they ruin only their own souls, and they do not realize."
        },
        {
          number: 27,
          arabic: "وَلَوْ تَرَى إِذْ وُقِفُوا عَلَى النَّارِ فَقَالُوا يَا لَيْتَنَا نُرَدُّ وَلَا نُكَذِّبَ بِآيَاتِ رَبِّنَا وَنَكُونَ مِنَ الْمُؤْمِنِينَ",
          english: "If only you could see, when they are made to stand before the Fire; they will say, 'If only we could be sent back, and not reject the revelations of our Lord, and be among the faithful.'"
        },
        {
          number: 28,
          arabic: "بَلْ بَدَا لَهُمْ مَا كَانُوا يُخْفُونَ مِنْ قَبْلُ وَلَوْ رُدُّوا لَعَادُوا لِمَا نُهُوا عَنْهُ وَإِنَّهُمْ لَكَاذِبُونَ",
          english: "What they used to conceal before will become clear to them. And even if they were sent back, they would revert to what they were forbidden. They are liars."
        },
        {
          number: 29,
          arabic: "وَقَالُوا إِنْ هِيَ إِلَّا حَيَاتُنَا الدُّنْيَا وَمَا نَحْنُ بِمَبْعُوثِينَ",
          english: "And they say, 'There is nothing but our life in this world, and we will not be resurrected.'"
        },
        {
          number: 30,
          arabic: "وَلَوْ تَرَى إِذْ وُقِفُوا عَلَى رَبِّهِمْ قَالَ أَلَيْسَ هَذَا بِالْحَقِّ قَالُوا بَلَى وَرَبِّنَا قَالَ فَذُوقُوا الْعَذَابَ بِمَا كُنْتُمْ تَكْفُرُونَ",
          english: "If only you could see, when they are stationed before their Lord. He will say, 'Is this not real?' They will say, 'Yes indeed, by our Lord.' He will say, 'Then taste the torment for having disbelieved.'"
        },
        {
          number: 31,
          arabic: "قَدْ خَسِرَ الَّذِينَ كَذَّبُوا بِلِقَاءِ اللَّهِ حَتَّى إِذَا جَاءَتْهُمُ السَّاعَةُ بَغْتَةً قَالُوا يَا حَسْرَتَنَا عَلَى مَا فَرَّطْنَا فِيهَا وَهُمْ يَحْمِلُونَ أَوْزَارَهُمْ عَلَى ظُهُورِهِمْ أَلَا سَاءَ مَا يَزِرُونَ",
          english: "Losers are those who deny the encounter with God. Then, when the Hour comes upon them suddenly, they will say, 'Alas for us, how we have neglected it.' And they will carry their burdens on their backs—evil is what they carry."
        },
        {
          number: 32,
          arabic: "وَمَا الْحَيَاةُ الدُّنْيَا إِلَّا لَعِبٌ وَلَهْوٌ وَلَلدَّارُ الْآخِرَةُ خَيْرٌ لِلَّذِينَ يَتَّقُونَ أَفَلَا تَعْقِلُونَ",
          english: "The life of this world is nothing but game and distraction, but the Home of the Hereafter is better for those who are righteous. Do you not understand?"
        },
        {
          number: 33,
          arabic: "قَدْ نَعْلَمُ إِنَّهُ لَيَحْزُنُكَ الَّذِي يَقُولُونَ فَإِنَّهُمْ لَا يُكَذِّبُونَكَ وَلَكِنَّ الظَّالِمِينَ بِآيَاتِ اللَّهِ يَجْحَدُونَ",
          english: "We know that what they say grieves you. It is not you they reject, but it is God's revelations that the wicked deny."
        },
        {
          number: 34,
          arabic: "وَلَقَدْ كُذِّبَتْ رُسُلٌ مِنْ قَبْلِكَ فَصَبَرُوا عَلَى مَا كُذِّبُوا وَأُوذُوا حَتَّى أَتَاهُمْ نَصْرُنَا وَلَا مُبَدِّلَ لِكَلِمَاتِ اللَّهِ وَلَقَدْ جَاءَكَ مِنْ نَبَإِ الْمُرْسَلِينَ",
          english: "Other messengers before you were rejected, but they endured rejection and persecution until Our help came to them. There can be no change to God's words. News of the Messengers has already reached you."
        },
        {
          number: 35,
          arabic: "وَإِنْ كَانَ كَبُرَ عَلَيْكَ إِعْرَاضُهُمْ فَإِنِ اسْتَطَعْتَ أَنْ تَبْتَغِيَ نَفَقًا فِي الْأَرْضِ أَوْ سُلَّمًا فِي السَّمَاءِ فَتَأْتِيَهُمْ بِآيَةٍ وَلَوْ شَاءَ اللَّهُ لَجَمَعَهُمْ عَلَى الْهُدَى فَلَا تَكُونَنَّ مِنَ الْجَاهِلِينَ",
          english: "If you find their rejection hard to bear, then if you can, seek a tunnel into the earth, or a stairway into the heaven, and bring them a sign. Had God willed, He could have gathered them to guidance. So do not be of the ignorant."
        },
        {
          number: 36,
          arabic: "إِنَّمَا يَسْتَجِيبُ الَّذِينَ يَسْمَعُونَ وَالْمَوْتَى يَبْعَثُهُمُ اللَّهُ ثُمَّ إِلَيْهِ يُرْجَعُونَ",
          english: "Only those who listen will respond. As for the dead, God will resurrect them; then to Him they will be returned."
        },
        {
          number: 37,
          arabic: "وَقَالُوا لَوْلَا نُزِّلَ عَلَيْهِ آيَةٌ مِنْ رَبِّهِ قُلْ إِنَّ اللَّهَ قَادِرٌ عَلَى أَنْ يُنَزِّلَ آيَةً وَلَكِنَّ أَكْثَرَهُمْ لَا يَعْلَمُونَ",
          english: "And they say, 'If only a sign could come down to him from his Lord.' Say, 'God is Able to send down a sign, but most of them do not know.'"
        },
        {
          number: 38,
          arabic: "وَمَا مِنْ دَابَّةٍ فِي الْأَرْضِ وَلَا طَائِرٍ يَطِيرُ بِجَنَاحَيْهِ إِلَّا أُمَمٌ أَمْثَالُكُمْ مَا فَرَّطْنَا فِي الْكِتَابِ مِنْ شَيْءٍ ثُمَّ إِلَى رَبِّهِمْ يُحْشَرُونَ",
          english: "There is no animal on land, nor a bird flying with its wings, but are communities like you. We neglected nothing in the Scripture. Then to their Lord they will be gathered."
        },
        {
          number: 39,
          arabic: "وَالَّذِينَ كَذَّبُوا بِآيَاتِنَا صُمٌّ وَبُكْمٌ فِي الظُّلُمَاتِ مَنْ يَشَإِ اللَّهُ يُضْلِلْهُ وَمَنْ يَشَأْ يَجْعَلْهُ عَلَى صِرَاطٍ مُسْتَقِيمٍ",
          english: "Those who reject Our revelations are deaf and dumb, in total darkness. Whomever God wills, He leaves astray; and whomever He wills, He sets on a straight path."
        },
        {
          number: 40,
          arabic: "قُلْ أَرَأَيْتَكُمْ إِنْ أَتَاكُمْ عَذَابُ اللَّهِ أَوْ أَتَتْكُمُ السَّاعَةُ أَغَيْرَ اللَّهِ تَدْعُونَ إِنْ كُنْتُمْ صَادِقِينَ",
          english: "Say, 'Have you considered? if God's punishment came upon you, or the Hour overtook you, would you call upon any other than God, if you are sincere?'"
        },
        {
          number: 41,
          arabic: "بَلْ إِيَّاهُ تَدْعُونَ فَيَكْشِفُ مَا تَدْعُونَ إِلَيْهِ إِنْ شَاءَ وَتَنْسَوْنَ مَا تُشْرِكُونَ",
          english: "In fact, it is Him you will call upon; and if He wills, he will remove what you called Him for, and you will forget what you idolized."
        },
        {
          number: 42,
          arabic: "وَلَقَدْ أَرْسَلْنَا إِلَى أُمَمٍ مِنْ قَبْلِكَ فَأَخَذْنَاهُمْ بِالْبَأْسَاءِ وَالضَّرَّاءِ لَعَلَّهُمْ يَتَضَرَّعُونَ",
          english: "We sent messengers to communities before you, and We afflicted them with suffering and hardship, that they may humble themselves."
        },
        {
          number: 43,
          arabic: "فَلَوْلَا إِذْ جَاءَهُمْ بَأْسُنَا تَضَرَّعُوا وَلَكِنْ قَسَتْ قُلُوبُهُمْ وَزَيَّنَ لَهُمُ الشَّيْطَانُ مَا كَانُوا يَعْمَلُونَ",
          english: "If only, when Our calamity came upon them, they humbled themselves. But their hearts hardened, and Satan made their deeds appear good to them."
        },
        {
          number: 44,
          arabic: "فَلَمَّا نَسُوا مَا ذُكِّرُوا بِهِ فَتَحْنَا عَلَيْهِمْ أَبْوَابَ كُلِّ شَيْءٍ حَتَّى إِذَا فَرِحُوا بِمَا أُوتُوا أَخَذْنَاهُمْ بَغْتَةً فَإِذَا هُمْ مُبْلِسُونَ",
          english: "Then, when they disregarded what they were reminded of, We opened for them the gates of all things. Until, when they delighted in what they were given, We seized them suddenly; and at once, they were in despair."
        },
        {
          number: 45,
          arabic: "فَقُطِعَ دَابِرُ الْقَوْمِ الَّذِينَ ظَلَمُوا وَالْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
          english: "Thus the last remnant of the people who did wrong was cut off. And praise be to God, Lord of the Worlds."
        },
        {
          number: 46,
          arabic: "قُلْ أَرَأَيْتُمْ إِنْ أَخَذَ اللَّهُ سَمْعَكُمْ وَأَبْصَارَكُمْ وَخَتَمَ عَلَى قُلُوبِكُمْ مَنْ إِلَهٌ غَيْرُ اللَّهِ يَأْتِيكُمْ بِهِ انْظُرْ كَيْفَ نُصَرِّفُ الْآيَاتِ ثُمَّ هُمْ يَصْدِفُونَ",
          english: "Say, 'Have you considered? If God took away your hearing and your sight, and set a seal on your hearts, what god other than God would restore them to you?' Note how We explain the revelations in various ways, yet they still turn away."
        },
        {
          number: 47,
          arabic: "قُلْ أَرَأَيْتَكُمْ إِنْ أَتَاكُمْ عَذَابُ اللَّهِ بَغْتَةً أَوْ جَهْرَةً هَلْ يُهْلَكُ إِلَّا الْقَوْمُ الظَّالِمُونَ",
          english: "Say, 'Have you considered? if God's punishment descended on you suddenly or gradually, would any be destroyed except the wrongdoing people?'"
        },
        {
          number: 48,
          arabic: "وَمَا نُرْسِلُ الْمُرْسَلِينَ إِلَّا مُبَشِّرِينَ وَمُنْذِرِينَ فَمَنْ آمَنَ وَأَصْلَحَ فَلَا خَوْفٌ عَلَيْهِمْ وَلَا هُمْ يَحْزَنُونَ",
          english: "We sent the messengers only as bearers of good news and as warners. Those who believe and reform have nothing to fear, nor shall they grieve."
        },
        {
          number: 49,
          arabic: "وَالَّذِينَ كَذَّبُوا بِآيَاتِنَا يَمَسُّهُمُ الْعَذَابُ بِمَا كَانُوا يَفْسُقُونَ",
          english: "But as for those who reject Our revelations, torment will afflict them because of their defiance."
        },
        {
          number: 50,
          arabic: "قُلْ لَا أَقُولُ لَكُمْ عِنْدِي خَزَائِنُ اللَّهِ وَلَا أَعْلَمُ الْغَيْبَ وَلَا أَقُولُ لَكُمْ إِنِّي مَلَكٌ إِنْ أَتَّبِعُ إِلَّا مَا يُوحَى إِلَيَّ قُلْ هَلْ يَسْتَوِي الْأَعْمَى وَالْبَصِيرُ أَفَلَا تَتَفَكَّرُونَ",
          english: "Say, 'I do not say to you that I possess the treasuries of God, nor do I know the future, nor do I say to you that I am an angel. I only follow what is inspired to me.' Say, 'Are the blind and the seeing alike? Do you not think?'"
        },
        {
          number: 51,
          arabic: "وَأَنْذِرْ بِهِ الَّذِينَ يَخَافُونَ أَنْ يُحْشَرُوا إِلَى رَبِّهِمْ لَيْسَ لَهُمْ مِنْ دُونِهِ وَلِيٌّ وَلَا شَفِيعٌ لَعَلَّهُمْ يَتَّقُونَ",
          english: "And warn with it those who fear to be gathered before their Lord—they have no protector or intercessor apart from him—perhaps they will grow in piety."
        },
        {
          number: 52,
          arabic: "وَلَا تَطْرُدِ الَّذِينَ يَدْعُونَ رَبَّهُمْ بِالْغَدَاةِ وَالْعَشِيِّ يُرِيدُونَ وَجْهَهُ مَا عَلَيْكَ مِنْ حِسَابِهِمْ مِنْ شَيْءٍ وَمَا مِنْ حِسَابِكَ عَلَيْهِمْ مِنْ شَيْءٍ فَتَطْرُدَهُمْ فَتَكُونَ مِنَ الظَّالِمِينَ",
          english: "And do not drive away those who call upon their Lord, morning and evening, seeking His attention. You are not accountable for them in any way, nor are they accountable for you in any way. If you drive them away, you would be one of the unjust."
        },
        {
          number: 53,
          arabic: "وَكَذَلِكَ فَتَنَّا بَعْضَهُمْ بِبَعْضٍ لِيَقُولُوا أَهَؤُلَاءِ مَنَّ اللَّهُ عَلَيْهِمْ مِنْ بَيْنِنَا أَلَيْسَ اللَّهُ بِأَعْلَمَ بِالشَّاكِرِينَ",
          english: "Thus We try some of them by means of others, that they may say, 'Are these the ones whom God has favored from among us?' Is God not aware of the appreciative?"
        },
        {
          number: 54,
          arabic: "وَإِذَا جَاءَكَ الَّذِينَ يُؤْمِنُونَ بِآيَاتِنَا فَقُلْ سَلَامٌ عَلَيْكُمْ كَتَبَ رَبُّكُمْ عَلَى نَفْسِهِ الرَّحْمَةَ أَنَّهُ مَنْ عَمِلَ مِنْكُمْ سُوءًا بِجَهَالَةٍ ثُمَّ تَابَ مِنْ بَعْدِهِ وَأَصْلَحَ فَأَنَّهُ غَفُورٌ رَحِيمٌ",
          english: "When those who believe in Our revelations come to you, say, 'Peace be upon you, your Lord has prescribed mercy for Himself. Whoever among you does wrong out of ignorance, and then repents afterwards and reforms—He is Forgiving and Merciful.'"
        },
        {
          number: 55,
          arabic: "وَكَذَلِكَ نُفَصِّلُ الْآيَاتِ وَلِتَسْتَبِينَ سَبِيلُ الْمُجْرِمِينَ",
          english: "Thus We explain the revelations, and expose the path of the unrighteous."
        },
        {
          number: 56,
          arabic: "قُلْ إِنِّي نُهِيتُ أَنْ أَعْبُدَ الَّذِينَ تَدْعُونَ مِنْ دُونِ اللَّهِ قُلْ لَا أَتَّبِعُ أَهْوَاءَكُمْ قَدْ ضَلَلْتُ إِذًا وَمَا أَنَا مِنَ الْمُهْتَدِينَ",
          english: "Say, 'I am forbidden from worshiping those you pray to besides God.' Say, 'I will not follow your desires; else I would be lost and not be of those guided.'"
        },
        {
          number: 57,
          arabic: "قُلْ إِنِّي عَلَى بَيِّنَةٍ مِنْ رَبِّي وَكَذَّبْتُمْ بِهِ مَا عِنْدِي مَا تَسْتَعْجِلُونَ بِهِ إِنِ الْحُكْمُ إِلَّا لِلَّهِ يَقُصُّ الْحَقَّ وَهُوَ خَيْرُ الْفَاصِلِينَ",
          english: "Say, 'I stand on clear evidence from my Lord, and you have rejected Him. I do not possess what you seek me to hasten; the decision belongs solely to God. He states the truth, and He is the Best of Judges.'"
        },
        {
          number: 58,
          arabic: "قُلْ لَوْ أَنَّ عِنْدِي مَا تَسْتَعْجِلُونَ بِهِ لَقُضِيَ الْأَمْرُ بَيْنِي وَبَيْنَكُمْ وَاللَّهُ أَعْلَمُ بِالظَّالِمِينَ",
          english: "Say, 'If I possessed what you seek me to hasten, the matter between you and me would have been settled. God is well aware of the unjust.'"
        },
        {
          number: 59,
          arabic: "وَعِنْدَهُ مَفَاتِحُ الْغَيْبِ لَا يَعْلَمُهَا إِلَّا هُوَ وَيَعْلَمُ مَا فِي الْبَرِّ وَالْبَحْرِ وَمَا تَسْقُطُ مِنْ وَرَقَةٍ إِلَّا يَعْلَمُهَا وَلَا حَبَّةٍ فِي ظُلُمَاتِ الْأَرْضِ وَلَا رَطْبٍ وَلَا يَابِسٍ إِلَّا فِي كِتَابٍ مُبِينٍ",
          english: "With Him are the keys of the unseen; none knows them except He. And He knows everything on land and in the sea. Not a leaf falls but He knows it; and there is not a single grain in the darkness of earth, nor is there anything wet or dry, but is in a clear record."
        },
        {
          number: 60,
          arabic: "وَهُوَ الَّذِي يَتَوَفَّاكُمْ بِاللَّيْلِ وَيَعْلَمُ مَا جَرَحْتُمْ بِالنَّهَارِ ثُمَّ يَبْعَثُكُمْ فِيهِ لِيُقْضَى أَجَلٌ مُسَمًّى ثُمَّ إِلَيْهِ مَرْجِعُكُمْ ثُمَّ يُنَبِّئُكُمْ بِمَا كُنْتُمْ تَعْمَلُونَ",
          english: "It is He Who takes you by night, and He knows what you earn by day. Then He raises you up in it, until a fixed term is fulfilled. Then to Him is your return, then He will inform you of what you used to do."
        },
        {
          number: 61,
          arabic: "وَهُوَ الْقَاهِرُ فَوْقَ عِبَادِهِ وَيُرْسِلُ عَلَيْكُمْ حَفَظَةً حَتَّى إِذَا جَاءَ أَحَدَكُمُ الْمَوْتُ تَوَفَّتْهُ رُسُلُنَا وَهُمْ لَا يُفَرِّطُونَ",
          english: "He is the Conqueror over His servants, and He sends guardians over you, until, when death overtakes one of you, Our envoys take him away, and they never fail."
        },
        {
          number: 62,
          arabic: "ثُمَّ رُدُّوا إِلَى اللَّهِ مَوْلَاهُمُ الْحَقِّ أَلَا لَهُ الْحُكْمُ وَهُوَ أَسْرَعُ الْحَاسِبِينَ",
          english: "Then they are brought back to God, their True Master. Unquestionably, His is the judgment, and He is the Swiftest of reckoners."
        },
        {
          number: 63,
          arabic: "قُلْ مَنْ يُنَجِّيكُمْ مِنْ ظُلُمَاتِ الْبَرِّ وَالْبَحْرِ تَدْعُونَهُ تَضَرُّعًا وَخُفْيَةً لَئِنْ أَنْجَانَا مِنْ هَذِهِ لَنَكُونَنَّ مِنَ الشَّاكِرِينَ",
          english: "Say, 'Who delivers you from the darkness of land and sea?' You call upon Him humbly and inwardly: 'If He delivers us from this, We will surely be among the thankful.'"
        },
        {
          number: 64,
          arabic: "قُلِ اللَّهُ يُنَجِّيكُمْ مِنْهَا وَمِنْ كُلِّ كَرْبٍ ثُمَّ أَنْتُمْ تُشْرِكُونَ",
          english: "Say, 'It is God who delivers you from it, and from every disaster. Yet then you associate others with Him.'"
        },
        {
          number: 65,
          arabic: "قُلْ هُوَ الْقَادِرُ عَلَى أَنْ يَبْعَثَ عَلَيْكُمْ عَذَابًا مِنْ فَوْقِكُمْ أَوْ مِنْ تَحْتِ أَرْجُلِكُمْ أَوْ يَلْبِسَكُمْ شِيَعًا وَيُذِيقَ بَعْضَكُمْ بَأْسَ بَعْضٍ انْظُرْ كَيْفَ نُصَرِّفُ الْآيَاتِ لَعَلَّهُمْ يَفْقَهُونَ",
          english: "Say, 'He is Able to send upon you an affliction, from above you, or from under your feet. Or He can divide you into factions, and make you taste the violence of one another. Note how We explain the revelations, so that they may understand.'"
        },
        {
          number: 66,
          arabic: "وَكَذَّبَ بِهِ قَوْمُكَ وَهُوَ الْحَقُّ قُلْ لَسْتُ عَلَيْكُمْ بِوَكِيلٍ",
          english: "But your people rejected it, though it is the truth. Say, 'I am not responsible for you.'"
        },
        {
          number: 67,
          arabic: "لِكُلِّ نَبَإٍ مُسْتَقَرٌّ وَسَوْفَ تَعْلَمُونَ",
          english: "For every happening is a finality, and you will surely know."
        },
        {
          number: 68,
          arabic: "وَإِذَا رَأَيْتَ الَّذِينَ يَخُوضُونَ فِي آيَاتِنَا فَأَعْرِضْ عَنْهُمْ حَتَّى يَخُوضُوا فِي حَدِيثٍ غَيْرِهِ وَإِمَّا يُنْسِيَنَّكَ الشَّيْطَانُ فَلَا تَقْعُدْ بَعْدَ الذِّكْرَى مَعَ الْقَوْمِ الظَّالِمِينَ",
          english: "When you encounter those who gossip about Our revelations, turn away from them, until they engage in another topic. But should Satan make you forget, do not sit after the recollection with the wicked people."
        },
        {
          number: 69,
          arabic: "وَمَا عَلَى الَّذِينَ يَتَّقُونَ مِنْ حِسَابِهِمْ مِنْ شَيْءٍ وَلَكِنْ ذِكْرَى لَعَلَّهُمْ يَتَّقُونَ",
          english: "The righteous are in no way accountable for them; it is only a reminder, that they may be careful."
        },
        {
          number: 70,
          arabic: "وَذَرِ الَّذِينَ اتَّخَذُوا دِينَهُمْ لَعِبًا وَلَهْوًا وَغَرَّتْهُمُ الْحَيَاةُ الدُّنْيَا وَذَكِّرْ بِهِ أَنْ تُبْسَلَ نَفْسٌ بِمَا كَسَبَتْ لَيْسَ لَهَا مِنْ دُونِ اللَّهِ وَلِيٌّ وَلَا شَفِيعٌ وَإِنْ تَعْدِلْ كُلَّ عَدْلٍ لَا يُؤْخَذْ مِنْهَا أُولَئِكَ الَّذِينَ أُبْسِلُوا بِمَا كَسَبُوا لَهُمْ شَرَابٌ مِنْ حَمِيمٍ وَعَذَابٌ أَلِيمٌ بِمَا كَانُوا يَكْفُرُونَ",
          english: "So leave alone those who take their religion for play and pastime, and whom the worldly life has deceived. But remind with it, lest a soul becomes damned on account of what it has earned. It has no helper or intercessor besides God. Even if it offers every equivalent, none will be accepted from it. These are the ones who are delivered to perdition by their actions. They will have a drink of scalding water, and a painful punishment, because they used to disbelieve."
        },
        {
          number: 71,
          arabic: "قُلْ أَنَدْعُو مِنْ دُونِ اللَّهِ مَا لَا يَنْفَعُنَا وَلَا يَضُرُّنَا وَنُرَدُّ عَلَى أَعْقَابِنَا بَعْدَ إِذْ هَدَانَا اللَّهُ كَالَّذِي اسْتَهْوَتْهُ الشَّيَاطِينُ فِي الْأَرْضِ حَيْرَانَ لَهُ أَصْحَابٌ يَدْعُونَهُ إِلَى الْهُدَى ائْتِنَا قُلْ إِنَّ هُدَى اللَّهِ هُوَ الْهُدَى وَأُمِرْنَا لِنُسْلِمَ لِرَبِّ الْعَالَمِينَ",
          english: "Say, 'Shall we invoke besides God something that can neither benefit us nor harm us, and turn back on our heels after God has guided us; like someone seduced by the devils and confused on earth, who has friends calling him to guidance: \"Come to us\"?' Say, 'The guidance of God is the guidance, and we are commanded to surrender to the Lord of the Universe.'"
        },
        {
          number: 72,
          arabic: "وَأَنْ أَقِيمُوا الصَّلَاةَ وَاتَّقُوهُ وَهُوَ الَّذِي إِلَيْهِ تُحْشَرُونَ",
          english: "'And to perform the prayers, and to revere Him; it is to Him that you will be gathered.'"
        },
        {
          number: 73,
          arabic: "وَهُوَ الَّذِي خَلَقَ السَّمَاوَاتِ وَالْأَرْضَ بِالْحَقِّ وَيَوْمَ يَقُولُ كُنْ فَيَكُونُ قَوْلُهُ الْحَقُّ وَلَهُ الْمُلْكُ يَوْمَ يُنْفَخُ فِي الصُّورِ عَالِمُ الْغَيْبِ وَالشَّهَادَةِ وَهُوَ الْحَكِيمُ الْخَبِيرُ",
          english: "It is He who created the heavens and the earth in truth. On the Day when He says: 'Be,' it will be. His saying is the truth, and His is the sovereignty on the Day when the trumpet is blown. The Knower of secrets and declarations. He is the Wise, the Expert."
        },
        {
          number: 74,
          arabic: "وَإِذْ قَالَ إِبْرَاهِيمُ لِأَبِيهِ آزَرَ أَتَتَّخِذُ أَصْنَامًا آلِهَةً إِنِّي أَرَاكَ وَقَوْمَكَ فِي ضَلَالٍ مُبِينٍ",
          english: "Abraham said to his father Azar, 'Do you take idols for gods? I see that you and your people are in evident error.'"
        },
        {
          number: 75,
          arabic: "وَكَذَلِكَ نُرِي إِبْرَاهِيمَ مَلَكُوتَ السَّمَاوَاتِ وَالْأَرْضِ وَلِيَكُونَ مِنَ الْمُوقِنِينَ",
          english: "Thus We showed Abraham the empire of the heavens and the earth, that he might be one of those with certainty."
        },
        {
          number: 76,
          arabic: "فَلَمَّا جَنَّ عَلَيْهِ اللَّيْلُ رَأَى كَوْكَبًا قَالَ هَذَا رَبِّي فَلَمَّا أَفَلَ قَالَ لَا أُحِبُّ الْآفِلِينَ",
          english: "When the night fell over him, he saw a planet. He said, 'This is my lord.' But when it set, he said, 'I do not love those that set.'"
        },
        {
          number: 77,
          arabic: "فَلَمَّا رَأَى الْقَمَرَ بَازِغًا قَالَ هَذَا رَبِّي فَلَمَّا أَفَلَ قَالَ لَئِنْ لَمْ يَهْدِنِي رَبِّي لَأَكُونَنَّ مِنَ الْقَوْمِ الضَّالِّينَ",
          english: "Then, when he saw the moon rising, he said, 'This is my lord.' But when it set, he said, 'If my Lord does not guide me, I will be one of the erring people.'"
        },
        {
          number: 78,
          arabic: "فَلَمَّا رَأَى الشَّمْسَ بَازِغَةً قَالَ هَذَا رَبِّي هَذَا أَكْبَرُ فَلَمَّا أَفَلَتْ قَالَ يَا قَوْمِ إِنِّي بَرِيءٌ مِمَّا تُشْرِكُونَ",
          english: "Then, when he saw the sun rising, he said, 'This is my lord, this is bigger.' But when it set, he said, 'O my people, I am innocent of your idolatry."
        },
        {
          number: 79,
          arabic: "إِنِّي وَجَّهْتُ وَجْهِيَ لِلَّذِي فَطَرَ السَّمَاوَاتِ وَالْأَرْضَ حَنِيفًا وَمَا أَنَا مِنَ الْمُشْرِكِينَ",
          english: "I have directed my attention towards Him Who created the heavens and the earth—a monotheist—and I am not of the idolaters.'"
        },
        {
          number: 80,
          arabic: "وَحَاجَّهُ قَوْمُهُ قَالَ أَتُحَاجُّونِّي فِي اللَّهِ وَقَدْ هَدَانِ وَلَا أَخَافُ مَا تُشْرِكُونَ بِهِ إِلَّا أَنْ يَشَاءَ رَبِّي شَيْئًا وَسِعَ رَبِّي كُلَّ شَيْءٍ عِلْمًا أَفَلَا تَتَذَكَّرُونَ",
          english: "And his people argued with him. He said, 'Do you argue with me about God, when He has guided me? I do not fear what you associate with Him, unless my Lord wills it. My Lord comprehends all things in knowledge. Will you not reconsider?"
        },
        {
          number: 81,
          arabic: "وَكَيْفَ أَخَافُ مَا أَشْرَكْتُمْ وَلَا تَخَافُونَ أَنَّكُمْ أَشْرَكْتُمْ بِاللَّهِ مَا لَمْ يُنَزِّلْ بِهِ عَلَيْكُمْ سُلْطَانًا فَأَيُّ الْفَرِيقَيْنِ أَحَقُّ بِالْأَمْنِ إِنْ كُنْتُمْ تَعْلَمُونَ",
          english: "And why should I fear those you associate with Him, and you do not fear associating others with God for which He sent down to you no authority? Which side is more entitled to security, if you are aware?'"
        },
        {
          number: 82,
          arabic: "الَّذِينَ آمَنُوا وَلَمْ يَلْبِسُوا إِيمَانَهُمْ بِظُلْمٍ أُولَئِكَ لَهُمُ الْأَمْنُ وَهُمْ مُهْتَدُونَ",
          english: "Those who believe, and do not obscure their faith with wrongdoing—those will have security, and they are guided."
        },
        {
          number: 83,
          arabic: "وَتِلْكَ حُجَّتُنَا آتَيْنَاهَا إِبْرَاهِيمَ عَلَى قَوْمِهِ نَرْفَعُ دَرَجَاتٍ مَنْ نَشَاءُ إِنَّ رَبَّكَ حَكِيمٌ عَلِيمٌ",
          english: "That was Our argument which We gave to Abraham against his people. We elevate by degrees whomever We will. Your Lord is Wise and Informed."
        },
        {
          number: 84,
          arabic: "وَوَهَبْنَا لَهُ إِسْحَاقَ وَيَعْقُوبَ كُلًّا هَدَيْنَا وَنُوحًا هَدَيْنَا مِنْ قَبْلُ وَمِنْ ذُرِّيَّتِهِ دَاوُودَ وَسُلَيْمَانَ وَأَيُّوبَ وَيُوسُفَ وَمُوسَى وَهَارُونَ وَكَذَلِكَ نَجْزِي الْمُحْسِنِينَ",
          english: "And We gave him Isaac and Jacob—each of them We guided. And We guided Noah previously; and from his descendants David, and Solomon, and Job, and Joseph, and Moses, and Aaron. Thus We reward the righteous."
        },
        {
          number: 85,
          arabic: "وَزَكَرِيَّا وَيَحْيَى وَعِيسَى وَإِلْيَاسَ كُلٌّ مِنَ الصَّالِحِينَ",
          english: "And Zechariah, and John, and Jesus, and Elias—every one of them was of the upright."
        },
        {
          number: 86,
          arabic: "وَإِسْمَاعِيلَ وَالْيَسَعَ وَيُونُسَ وَلُوطًا وَكُلًّا فَضَّلْنَا عَلَى الْعَالَمِينَ",
          english: "And Ishmael, and Elijah, and Jonah, and Lot—We favored each one of them over all other people."
        },
        {
          number: 87,
          arabic: "وَمِنْ آبَائِهِمْ وَذُرِّيَّاتِهِمْ وَإِخْوَانِهِمْ وَاجْتَبَيْنَاهُمْ وَهَدَيْنَاهُمْ إِلَى صِرَاطٍ مُسْتَقِيمٍ",
          english: "And of their ancestors, and their descendants, and their siblings—We chose them, and guided them to a straight path."
        },
        {
          number: 88,
          arabic: "ذَلِكَ هُدَى اللَّهِ يَهْدِي بِهِ مَنْ يَشَاءُ مِنْ عِبَادِهِ وَلَوْ أَشْرَكُوا لَحَبِطَ عَنْهُمْ مَا كَانُوا يَعْمَلُونَ",
          english: "Such is God's guidance. He guides with it whomever He wills of His servants. Had they associated, their deeds would have gone in vain."
        },
        {
          number: 89,
          arabic: "أُولَئِكَ الَّذِينَ آتَيْنَاهُمُ الْكِتَابَ وَالْحُكْمَ وَالنُّبُوَّةَ فَإِنْ يَكْفُرْ بِهَا هَؤُلَاءِ فَقَدْ وَكَّلْنَا بِهَا قَوْمًا لَيْسُوا بِهَا بِكَافِرِينَ",
          english: "Those are they to whom We gave the Book, and wisdom, and prophethood. If these reject them, We have entrusted them to others who do not reject them."
        },
        {
          number: 90,
          arabic: "أُولَئِكَ الَّذِينَ هَدَى اللَّهُ فَبِهُدَاهُمُ اقْتَدِهْ قُلْ لَا أَسْأَلُكُمْ عَلَيْهِ أَجْرًا إِنْ هُوَ إِلَّا ذِكْرَى لِلْعَالَمِينَ",
          english: "Those are they whom God has guided, so follow their guidance. Say, 'I ask of you no compensation for it; it is just a reminder for all mankind.'"
        },
        {
          number: 91,
          arabic: "وَمَا قَدَرُوا اللَّهَ حَقَّ قَدْرِهِ إِذْ قَالُوا مَا أَنْزَلَ اللَّهُ عَلَى بَشَرٍ مِنْ شَيْءٍ قُلْ مَنْ أَنْزَلَ الْكِتَابَ الَّذِي جَاءَ بِهِ مُوسَى نُورًا وَهُدًى لِلنَّاسِ تَجْعَلُونَهُ قَرَاطِيسَ تُبْدُونَهَا وَتُخْفُونَ كَثِيرًا وَعُلِّمْتُمْ مَا لَمْ تَعْلَمُوا أَنْتُمْ وَلَا آبَاؤُكُمْ قُلِ اللَّهُ ثُمَّ ذَرْهُمْ فِي خَوْضِهِمْ يَلْعَبُونَ",
          english: "They do not value God as He should be valued, when they say, 'God did not reveal anything to any human being.' Say, 'Who revealed the Scripture which Moses brought—a light and guidance for humanity?' You put it on scrolls, displaying them, yet concealing much. And you were taught what you did not know—neither you, nor your ancestors. Say, 'God;' then leave them toying away in their speculation."
        },
        {
          number: 92,
          arabic: "وَهَذَا كِتَابٌ أَنْزَلْنَاهُ مُبَارَكٌ مُصَدِّقُ الَّذِي بَيْنَ يَدَيْهِ وَلِتُنْذِرَ أُمَّ الْقُرَى وَمَنْ حَوْلَهَا وَالَّذِينَ يُؤْمِنُونَ بِالْآخِرَةِ يُؤْمِنُونَ بِهِ وَهُمْ عَلَى صَلَاتِهِمْ يُحَافِظُونَ",
          english: "This too is a Scripture that We revealed—blessed—verifying what preceded it, that you may warn the Mother of Cities and all around it. Those who believe in the Hereafter believe in it, and are dedicated to their prayers."
        },
        {
          number: 93,
          arabic: "وَمَنْ أَظْلَمُ مِمَّنِ افْتَرَى عَلَى اللَّهِ كَذِبًا أَوْ قَالَ أُوحِيَ إِلَيَّ وَلَمْ يُوحَ إِلَيْهِ شَيْءٌ وَمَنْ قَالَ سَأُنْزِلُ مِثْلَ مَا أَنْزَلَ اللَّهُ وَلَوْ تَرَى إِذِ الظَّالِمُونَ فِي غَمَرَاتِ الْمَوْتِ وَالْمَلَائِكَةُ بَاسِطُو أَيْدِيهِمْ أَخْرِجُوا أَنْفُسَكُمُ الْيَوْمَ تُجْزَوْنَ عَذَابَ الْهُونِ بِمَا كُنْتُمْ تَقُولُونَ عَلَى اللَّهِ غَيْرَ الْحَقِّ وَكُنْتُمْ عَنْ آيَاتِهِ تَسْتَكْبِرُونَ",
          english: "Who does greater wrong than someone who invents falsehood against God, or says, 'It was revealed to me,' when nothing was revealed to him, or says, 'I will reveal the like of what God revealed'? If only you could see the wrongdoers in the floods of death, as the angels with arms outstretched: 'Give up your souls. Today you are being repaid with the torment of shame for having said about God other than the truth, and for being too proud to accept His revelations.'"
        },
        {
          number: 94,
          arabic: "وَلَقَدْ جِئْتُمُونَا فُرَادَى كَمَا خَلَقْنَاكُمْ أَوَّلَ مَرَّةٍ وَتَرَكْتُمْ مَا خَوَّلْنَاكُمْ وَرَاءَ ظُهُورِكُمْ وَمَا نَرَى مَعَكُمْ شُفَعَاءَكُمُ الَّذِينَ زَعَمْتُمْ أَنَّهُمْ فِيكُمْ شُرَكَاءُ لَقَدْ تَقَطَّعَ بَيْنَكُمْ وَضَلَّ عَنْكُمْ مَا كُنْتُمْ تَزْعُمُونَ",
          english: "'You have come to Us individually, just as We created you the first time, leaving behind you everything We gave you. We do not see with you your intercessors—those you claimed were your partners. The link between you is cut, and what you had asserted has failed you.'"
        },
        {
          number: 95,
          arabic: "إِنَّ اللَّهَ فَالِقُ الْحَبِّ وَالنَّوَى يُخْرِجُ الْحَيَّ مِنَ الْمَيِّتِ وَمُخْرِجُ الْمَيِّتِ مِنَ الْحَيِّ ذَلِكُمُ اللَّهُ فَأَنَّى تُؤْفَكُونَ",
          english: "It is God Who splits the grain and the seed. He brings the living from the dead, and He brings the dead from the living. Such is God. So how could you deviate?"
        },
        {
          number: 96,
          arabic: "فَالِقُ الْإِصْبَاحِ وَجَعَلَ اللَّيْلَ سَكَنًا وَالشَّمْسَ وَالْقَمَرَ حُسْبَانًا ذَلِكَ تَقْدِيرُ الْعَزِيزِ الْعَلِيمِ",
          english: "It is He Who breaks the dawn. And He made the night for rest, and the sun and the moon for calculation. Such is the disposition of the Almighty, the All-Knowing."
        },
        {
          number: 97,
          arabic: "وَهُوَ الَّذِي جَعَلَ لَكُمُ النُّجُومَ لِتَهْتَدُوا بِهَا فِي ظُلُمَاتِ الْبَرِّ وَالْبَحْرِ قَدْ فَصَّلْنَا الْآيَاتِ لِقَوْمٍ يَعْلَمُونَ",
          english: "And it is He Who created the stars for you, that you may be guided by them in the darkness of land and sea. We thus explain the revelations for people who know."
        },
        {
          number: 98,
          arabic: "وَهُوَ الَّذِي أَنْشَأَكُمْ مِنْ نَفْسٍ وَاحِدَةٍ فَمُسْتَقَرٌّ وَمُسْتَوْدَعٌ قَدْ فَصَّلْنَا الْآيَاتِ لِقَوْمٍ يَفْقَهُونَ",
          english: "And it is He who produced you from a single person, then a repository, then a depository. We have detailed the revelations for people who understand."
        },
        {
          number: 99,
          arabic: "وَهُوَ الَّذِي أَنْزَلَ مِنَ السَّمَاءِ مَاءً فَأَخْرَجْنَا بِهِ نَبَاتَ كُلِّ شَيْءٍ فَأَخْرَجْنَا مِنْهُ خَضِرًا نُخْرِجُ مِنْهُ حَبًّا مُتَرَاكِبًا وَمِنَ النَّخْلِ مِنْ طَلْعِهَا قِنْوَانٌ دَانِيَةٌ وَجَنَّاتٍ مِنْ أَعْنَابٍ وَالزَّيْتُونَ وَالرُّمَّانَ مُشْتَبِهًا وَغَيْرَ مُتَشَابِهٍ انْظُرُوا إِلَى ثَمَرِهِ إِذَا أَثْمَرَ وَيَنْعِهِ إِنَّ فِي ذَلِكُمْ لَآيَاتٍ لِقَوْمٍ يُؤْمِنُونَ",
          english: "And it is He who sends down water from the sky. With it We produce vegetation of all kinds, from which We bring greenery, from which We produce grains in clusters. And palm-trees with hanging clusters, and vineyards, and olives, and pomegranates—similar and dissimilar. Watch their fruits as they grow and ripen. Surely in this are signs for people who believe."
        },
        {
          number: 100,
          arabic: "وَجَعَلُوا لِلَّهِ شُرَكَاءَ الْجِنَّ وَخَلَقَهُمْ وَخَرَقُوا لَهُ بَنِينَ وَبَنَاتٍ بِغَيْرِ عِلْمٍ سُبْحَانَهُ وَتَعَالَى عَمَّا يَصِفُونَ",
          english: "Yet they attributed to God partners—the sprites—although He created them. And they invented for Him sons and daughters, without any knowledge. Glory be to Him. He is exalted, beyond what they describe."
        },
        {
          number: 101,
          arabic: "بَدِيعُ السَّمَاوَاتِ وَالْأَرْضِ أَنَّى يَكُونُ لَهُ وَلَدٌ وَلَمْ تَكُنْ لَهُ صَاحِبَةٌ وَخَلَقَ كُلَّ شَيْءٍ وَهُوَ بِكُلِّ شَيْءٍ عَلِيمٌ",
          english: "Originator of the heavens and the earth—how can He have a son when He never had a companion? He created all things, and He has knowledge of all things."
        },
        {
          number: 102,
          arabic: "ذَلِكُمُ اللَّهُ رَبُّكُمْ لَا إِلَهَ إِلَّا هُوَ خَالِقُ كُلِّ شَيْءٍ فَاعْبُدُوهُ وَهُوَ عَلَى كُلِّ شَيْءٍ وَكِيلٌ",
          english: "Such is God, your Lord. There is no god except He, the Creator of all things; so worship Him. He is responsible for everything."
        },
        {
          number: 103,
          arabic: "لَا تُدْرِكُهُ الْأَبْصَارُ وَهُوَ يُدْرِكُ الْأَبْصَارَ وَهُوَ اللَّطِيفُ الْخَبِيرُ",
          english: "No vision can grasp Him, but His grasp is over all vision. He is the Subtle, the Expert."
        },
        {
          number: 104,
          arabic: "قَدْ جَاءَكُمْ بَصَائِرُ مِنْ رَبِّكُمْ فَمَنْ أَبْصَرَ فَلِنَفْسِهِ وَمَنْ عَمِيَ فَعَلَيْهَا وَمَا أَنَا عَلَيْكُمْ بِحَفِيظٍ",
          english: "'Insights have come to you from your Lord. Whoever sees, it is to the benefit of his soul; and whoever remains blind, it is to its detriment. I am not a guardian over you.'"
        },
        {
          number: 105,
          arabic: "وَكَذَلِكَ نُصَرِّفُ الْآيَاتِ وَلِيَقُولُوا دَرَسْتَ وَلِنُبَيِّنَهُ لِقَوْمٍ يَعْلَمُونَ",
          english: "We thus diversify the revelations, lest they say, 'You have studied,' and to clarify them for people who know."
        },
        {
          number: 106,
          arabic: "اتَّبِعْ مَا أُوحِيَ إِلَيْكَ مِنْ رَبِّكَ لَا إِلَهَ إِلَّا هُوَ وَأَعْرِضْ عَنِ الْمُشْرِكِينَ",
          english: "Follow what was revealed to you from your Lord. There is no god but He. And turn away from the polytheists."
        },
        {
          number: 107,
          arabic: "وَلَوْ شَاءَ اللَّهُ مَا أَشْرَكُوا وَمَا جَعَلْنَاكَ عَلَيْهِمْ حَفِيظًا وَمَا أَنْتَ عَلَيْهِمْ بِوَكِيلٍ",
          english: "Had God willed, they would not have practiced idolatry. We did not appoint you as a guardian over them, and you are not a manager over them."
        },
        {
          number: 108,
          arabic: "وَلَا تَسُبُّوا الَّذِينَ يَدْعُونَ مِنْ دُونِ اللَّهِ فَيَسُبُّوا اللَّهَ عَدْوًا بِغَيْرِ عِلْمٍ كَذَلِكَ زَيَّنَّا لِكُلِّ أُمَّةٍ عَمَلَهُمْ ثُمَّ إِلَى رَبِّهِمْ مَرْجِعُهُمْ فَيُنَبِّئُهُمْ بِمَا كَانُوا يَعْمَلُونَ",
          english: "Do not insult those they call upon besides God, lest they insult God out of hostility and ignorance. We made attractive to every community their deeds. Then to their Lord is their return, and He will inform them of what they used to do."
        },
        {
          number: 109,
          arabic: "وَأَقْسَمُوا بِاللَّهِ جَهْدَ أَيْمَانِهِمْ لَئِنْ جَاءَتْهُمْ آيَةٌ لَيُؤْمِنُنَّ بِهَا قُلْ إِنَّمَا الْآيَاتُ عِنْدَ اللَّهِ وَمَا يُشْعِرُكُمْ أَنَّهَا إِذَا جَاءَتْ لَا يُؤْمِنُونَ",
          english: "They swear by God, with their most solemn oaths, that if a miracle were to come to them, they would believe in it. Say, 'The miracles are only with God.' But how do you know? Even if it did come, they still would not believe."
        },
        {
          number: 110,
          arabic: "وَنُقَلِّبُ أَفْئِدَتَهُمْ وَأَبْصَارَهُمْ كَمَا لَمْ يُؤْمِنُوا بِهِ أَوَّلَ مَرَّةٍ وَنَذَرُهُمْ فِي طُغْيَانِهِمْ يَعْمَهُونَ",
          english: "And We turn away their hearts and their visions, as they refused to believe in it the first time, and We leave them blundering in their rebellion."
        },
        {
          number: 111,
          arabic: "وَلَوْ أَنَّنَا نَزَّلْنَا إِلَيْهِمُ الْمَلَائِكَةَ وَكَلَّمَهُمُ الْمَوْتَى وَحَشَرْنَا عَلَيْهِمْ كُلَّ شَيْءٍ قُبُلًا مَا كَانُوا لِيُؤْمِنُوا إِلَّا أَنْ يَشَاءَ اللَّهُ وَلَكِنَّ أَكْثَرَهُمْ يَجْهَلُونَ",
          english: "Even if We sent down the angels to them, and the dead spoke to them, and We gathered all things before them, they still would not believe, unless God wills; but most of them are ignorant."
        },
        {
          number: 112,
          arabic: "وَكَذَلِكَ جَعَلْنَا لِكُلِّ نَبِيٍّ عَدُوًّا شَيَاطِينَ الْإِنْسِ وَالْجِنِّ يُوحِي بَعْضُهُمْ إِلَى بَعْضٍ زُخْرُفَ الْقَوْلِ غُرُورًا وَلَوْ شَاءَ رَبُّكَ مَا فَعَلُوهُ فَذَرْهُمْ وَمَا يَفْتَرُونَ",
          english: "Likewise, We have assigned for every prophet an enemy—human and jinn devils—inspiring one another with fancy words in order to deceive. But had your Lord willed, they would not have done it. So leave them to their fabrications."
        },
        {
          number: 113,
          arabic: "وَلِتَصْغَى إِلَيْهِ أَفْئِدَةُ الَّذِينَ لَا يُؤْمِنُونَ بِالْآخِرَةِ وَلِيَرْضَوْهُ وَلِيَقْتَرِفُوا مَا هُمْ مُقْتَرِفُونَ",
          english: "So that the hearts of those who do not believe in the Hereafter may incline to it, and be content with it, and that they may perpetrate whatever they perpetrate."
        },
        {
          number: 114,
          arabic: "أَفَغَيْرَ اللَّهِ أَبْتَغِي حَكَمًا وَهُوَ الَّذِي أَنْزَلَ إِلَيْكُمُ الْكِتَابَ مُفَصَّلًا وَالَّذِينَ آتَيْنَاهُمُ الْكِتَابَ يَعْلَمُونَ أَنَّهُ مُنَزَّلٌ مِنْ رَبِّكَ بِالْحَقِّ فَلَا تَكُونَنَّ مِنَ الْمُمْتَرِينَ",
          english: "'Shall I seek a judge other than God, when He is the One who revealed to you the Book, explained in detail?' Those to whom We gave the Book know that it is the truth revealed from your Lord. So do not be of those who doubt."
        },
        {
          number: 115,
          arabic: "وَتَمَّتْ كَلِمَتُ رَبِّكَ صِدْقًا وَعَدْلًا لَا مُبَدِّلَ لِكَلِمَاتِهِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
          english: "The Word of your Lord has been completed, in truth and justice. There is no changing to His words. He is the Hearer, the Knower."
        },
        {
          number: 116,
          arabic: "وَإِنْ تُطِعْ أَكْثَرَ مَنْ فِي الْأَرْضِ يُضِلُّوكَ عَنْ سَبِيلِ اللَّهِ إِنْ يَتَّبِعُونَ إِلَّا الظَّنَّ وَإِنْ هُمْ إِلَّا يَخْرُصُونَ",
          english: "If you were to obey most of those on earth, they would divert you from God's path. They follow nothing but assumptions, and they only conjecture."
        },
        {
          number: 117,
          arabic: "إِنَّ رَبَّكَ هُوَ أَعْلَمُ مَنْ يَضِلُّ عَنْ سَبِيلِهِ وَهُوَ أَعْلَمُ بِالْمُهْتَدِينَ",
          english: "Your Lord knows best who strays from His path, and He knows best the guided ones."
        },
        {
          number: 118,
          arabic: "فَكُلُوا مِمَّا ذُكِرَ اسْمُ اللَّهِ عَلَيْهِ إِنْ كُنْتُمْ بِآيَاتِهِ مُؤْمِنِينَ",
          english: "So eat of that over which the Name of God was pronounced, if you indeed believe in His revelations."
        },
        {
          number: 119,
          arabic: "وَمَا لَكُمْ أَلَّا تَأْكُلُوا مِمَّا ذُكِرَ اسْمُ اللَّهِ عَلَيْهِ وَقَدْ فَصَّلَ لَكُمْ مَا حَرَّمَ عَلَيْكُمْ إِلَّا مَا اضْطُرِرْتُمْ إِلَيْهِ وَإِنَّ كَثِيرًا لَيُضِلُّونَ بِأَهْوَائِهِمْ بِغَيْرِ عِلْمٍ إِنَّ رَبَّكَ هُوَ أَعْلَمُ بِالْمُعْتَدِينَ",
          english: "And why should you not eat of that over which the Name of God is pronounced, when He has detailed for you what is prohibited for you, unless you are compelled by necessity? Many lead astray with their opinions, through lack of knowledge. Your Lord knows best the transgressors."
        },
        {
          number: 120,
          arabic: "وَذَرُوا ظَاهِرَ الْإِثْمِ وَبَاطِنَهُ إِنَّ الَّذِينَ يَكْسِبُونَ الْإِثْمَ سَيُجْزَوْنَ بِمَا كَانُوا يَقْتَرِفُونَ",
          english: "So abandon sin, outward and inward. Those who commit sins will be repaid for what they used to perpetrate."
        },
        {
          number: 121,
          arabic: "وَلَا تَأْكُلُوا مِمَّا لَمْ يُذْكَرِ اسْمُ اللَّهِ عَلَيْهِ وَإِنَّهُ لَفِسْقٌ وَإِنَّ الشَّيَاطِينَ لَيُوحُونَ إِلَى أَوْلِيَائِهِمْ لِيُجَادِلُوكُمْ وَإِنْ أَطَعْتُمُوهُمْ إِنَّكُمْ لَمُشْرِكُونَ",
          english: "And do not eat from that over which the Name of God was not pronounced, for it is abomination. The devils inspire their followers to argue with you; but if you obey them, you would be polytheists."
        },
        {
          number: 122,
          arabic: "أَوَمَنْ كَانَ مَيْتًا فَأَحْيَيْنَاهُ وَجَعَلْنَا لَهُ نُورًا يَمْشِي بِهِ فِي النَّاسِ كَمَنْ مَثَلُهُ فِي الظُّلُمَاتِ لَيْسَ بِخَارِجٍ مِنْهَا كَذَلِكَ زُيِّنَ لِلْكَافِرِينَ مَا كَانُوا يَعْمَلُونَ",
          english: "Is he who was dead, then We gave him life, and made for him a light by which he walks among the people, like he who is in total darkness, and cannot get out of it? Thus the doings of disbelievers are made to appear good to them."
        },
        {
          number: 123,
          arabic: "وَكَذَلِكَ جَعَلْنَا فِي كُلِّ قَرْيَةٍ أَكَابِرَ مُجْرِمِيهَا لِيَمْكُرُوا فِيهَا وَمَا يَمْكُرُونَ إِلَّا بِأَنْفُسِهِمْ وَمَا يَشْعُرُونَ",
          english: "And thus We set up in every city its leading wicked sinners, to conspire in it, but they conspire only against themselves, and they do not realize it."
        },
        {
          number: 124,
          arabic: "وَإِذَا جَاءَتْهُمْ آيَةٌ قَالُوا لَنْ نُؤْمِنَ حَتَّى نُؤْتَى مِثْلَ مَا أُوتِيَ رُسُلُ اللَّهِ اللَّهُ أَعْلَمُ حَيْثُ يَجْعَلُ رِسَالَتَهُ سَيُصِيبُ الَّذِينَ أَجْرَمُوا صَغَارٌ عِنْدَ اللَّهِ وَعَذَابٌ شَدِيدٌ بِمَا كَانُوا يَمْكُرُونَ",
          english: "When a sign comes to them, they say, 'We will not believe unless we are given the like of what was given to God's messengers.' God knows best where to place His message. Humiliation from God and severe torment will afflict the criminals for their scheming."
        },
        {
          number: 125,
          arabic: "فَمَنْ يُرِدِ اللَّهُ أَنْ يَهْدِيَهُ يَشْرَحْ صَدْرَهُ لِلْإِسْلَامِ وَمَنْ يُرِدْ أَنْ يُضِلَّهُ يَجْعَلْ صَدْرَهُ ضَيِّقًا حَرَجًا كَأَنَّمَا يَصَّعَّدُ فِي السَّمَاءِ كَذَلِكَ يَجْعَلُ اللَّهُ الرِّجْسَ عَلَى الَّذِينَ لَا يُؤْمِنُونَن",
          english: "Whomever God desires to guide, He spreads open his heart to Islam; and whomever He desires to misguide, He makes his heart narrow, constricted, as though he were climbing up the sky. God thus lays defilement upon those who do not believe."
        },
        {
          number: 126,
          arabic: "وَهَذَا صِرَاطُ رَبِّكَ مُسْتَقِيمًا قَدْ فَصَّلْنَا الْآيَاتِ لِقَوْمٍ يَذَّكَّرُونَ",
          english: "This is the straight path of your Lord. We have explained the revelations in detail for people who recollect."
        },
        {
          number: 127,
          arabic: "لَهُمْ دَارُ السَّلَامِ عِنْدَ رَبِّهِمْ وَهُوَ وَلِيُّهُمْ بِمَا كَانُوا يَعْمَلُونَ",
          english: "For them is the Home of Peace with their Lord, and He is their Master—because of what they used to do."
        },
        {
          number: 128,
          arabic: "وَيَوْمَ يَحْشُرُهُمْ جَمِيعًا يَا مَعْشَرَ الْجِنِّ قَدِ اسْتَكْثَرْتُمْ مِنَ الْإِنْسِ وَقَالَ أَوْلِيَاؤُهُمْ مِنَ الْإِنْسِ رَبَّنَا اسْتَمْتَعَ بَعْضُنَا بِبَعْضٍ وَبَلَغْنَا أَجَلَنَا الَّذِي أَجَّلْتَ لَنَا قَالَ النَّارُ مَثْوَاكُمْ خَالِدِينَ فِيهَا إِلَّا مَا شَاءَ اللَّهُ إِنَّ رَبَّكَ حَكِيمٌ عَلِيمٌ",
          english: "On the Day when He gathers them all together: 'O assembly of jinn, you have exploited multitudes of humans.' Their adherents among mankind will say, 'Our Lord, we have profited from one another, but we have reached the term that you have assigned for us.' He will say, 'The Fire is your dwelling, wherein you will remain, except as God wills. Your Lord is Wise and Informed."
        },
        {
          number: 129,
          arabic: "وَكَذَلِكَ نُوَلِّي بَعْضَ الظَّالِمِينَ بَعْضًا بِمَا كَانُوا يَكْسِبُونَ",
          english: "Thus We make some of the wrongdoers befriend one another, because of what they used to do."
        },
        {
          number: 130,
          arabic: "يَا مَعْشَرَ الْجِنِّ وَالْإِنْسِ أَلَمْ يَأْتِكُمْ رُسُلٌ مِنْكُمْ يَقُصُّونَ عَلَيْكُمْ آيَاتِي وَيُنْذِرُونَكُمْ لِقَاءَ يَوْمِكُمْ هَذَا قَالُوا شَهِدْنَا عَلَى أَنْفُسِنَا وَغَرَّتْهُمُ الْحَيَاةُ الدُّنْيَا وَشَهِدُوا عَلَى أَنْفُسِهِمْ أَنَّهُمْ كَانُوا كَافِرِينَ",
          english: "'O assembly of jinn and humans, did there not come to you messengers from among you, relating to you My revelations, and warning you of the meeting of this Day of yours?' They will say, 'We testify against ourselves.' The life of the world seduced them. They will testify against themselves that they were disbelievers."
        },
        {
          number: 131,
          arabic: "ذَلِكَ أَنْ لَمْ يَكُنْ رَبُّكَ مُهْلِكَ الْقُرَى بِظُلْمٍ وَأَهْلُهَا غَافِلُونَ",
          english: "That is because your Lord would not destroy towns for injustice while their inhabitants are unaware."
        },
        {
          number: 132,
          arabic: "وَلِكُلٍّ دَرَجَاتٌ مِمَّا عَمِلُوا وَمَا رَبُّكَ بِغَافِلٍ عَمَّا يَعْمَلُونَ",
          english: "They all have ranks according to what they did; and your Lord is not unaware of what they do."
        },
        {
          number: 133,
          arabic: "وَرَبُّكَ الْغَنِيُّ ذُو الرَّحْمَةِ إِنْ يَشَأْ يُذْهِبْكُمْ وَيَسْتَخْلِفْ مِنْ بَعْدِكُمْ مَا يَشَاءُ كَمَا أَنْشَأَكُمْ مِنْ ذُرِّيَّةِ قَوْمٍ آخَرِينَ",
          english: "Your Lord is the Rich Beyond Need, the Possessor of Mercy. If He wills, he can do away with you, and substitute whomever He wills in your place, just as He produced you from the descendants of another people."
        },
        {
          number: 134,
          arabic: "إِنَّ مَا تُوعَدُونَ لَآتٍ وَمَا أَنْتُمْ بِمُعْجِزِينَ",
          english: "What you are promised is coming, and you cannot thwart it."
        },
        {
          number: 135,
          arabic: "قُلْ يَا قَوْمِ اعْمَلُوا عَلَى مَكَانَتِكُمْ إِنِّي عَامِلٌ فَسَوْفَ تَعْلَمُونَ مَنْ تَكُونُ لَهُ عَاقِبَةُ الدَّارِ إِنَّهُ لَا يُفْلِحُ الظَّالِمُونَ",
          english: "Say, 'O my people! Work according to your ability, and so will I.' You will come to know to whom will belong the sequel of the abode.' The wrongdoers will not prevail."
        },
        {
          number: 136,
          arabic: "وَجَعَلُوا لِلَّهِ مِمَّا ذَرَأَ مِنَ الْحَرْثِ وَالْأَنْعَامِ نَصِيبًا فَقَالُوا هَذَا لِلَّهِ بِزَعْمِهِمْ وَهَذَا لِشُرَكَائِنَا فَمَا كَانَ لِشُرَكَائِهِمْ فَلَا يَصِلُ إِلَى اللَّهِ وَمَا كَانَ لِلَّهِ فَهُوَ يَصِلُ إِلَى شُرَكَائِهِمْ سَاءَ مَا يَحْكُمُونَ",
          english: "And they set aside for God a share of the crops and the livestock He created, and they say, 'This is for God,' according to their claim, 'and this is for our idols.' But the share of their idols does not reach God, yet the share of God reaches their idols. Evil is their judgment."
        },
        {
          number: 137,
          arabic: "وَكَذَلِكَ زَيَّنَ لِكَثِيرٍ مِنَ الْمُشْرِكِينَ قَتْلَ أَوْلَادِهِمْ شُرَكَاؤُهُمْ لِيُرْدُوهُمْ وَلِيَلْبِسُوا عَلَيْهِمْ دِينَهُمْ وَلَوْ شَاءَ اللَّهُ مَا فَعَلُوهُ فَذَرْهُمْ وَمَا يَفْتَرُونَ",
          english: "Likewise, their idols entice many idolaters to kill their children, in order to lead them to their ruin, and confuse them in their religion. Had God willed, they would not have done it; so leave them to their fraud."
        },
        {
          number: 138,
          arabic: "وَقَالُوا هَذِهِ أَنْعَامٌ وَحَرْثٌ حِجْرٌ لَا يَطْعَمُهَا إِلَّا مَنْ نَشَاءُ بِزَعْمِهِمْ وَأَنْعَامٌ حُرِّمَتْ ظُهُورُهَا وَأَنْعَامٌ لَا يَذْكُرُونَ اسْمَ اللَّهِ عَلَيْهَا افْتِرَاءً عَلَيْهِ سَيَجْزِيهِمْ بِمَا كَانُوا يَفْتَرُونَ",
          english: "And they say, 'These animals and crops are restricted; none may eat them except those we permit,' by their claims, and animals whose backs are forbidden, and animals over which they do not pronounce the name of God—fabricating lies against Him. He will repay them for what they used to invent."
        },
        {
          number: 139,
          arabic: "وَقَالُوا مَا فِي بُطُونِ هَذِهِ الْأَنْعَامِ خَالِصَةٌ لِذُكُورِنَا وَمُحَرَّمٌ عَلَى أَزْوَاجِنَا وَإِنْ يَكُنْ مَيْتَةً فَهُمْ فِيهِ شُرَكَاءُ سَيَجْزِيهِمْ وَصْفَهُمْ إِنَّهُ حَكِيمٌ عَلِيمٌ",
          english: "And they say, 'What lies in the wombs of these animals is exclusively for our males, and prohibited to our wives.' But if it is stillborn, they can share in it. He will surely punish them for their allegations. He is Wise and Knowing."
        },
        {
          number: 140,
          arabic: "قَدْ خَسِرَ الَّذِينَ قَتَلُوا أَوْلَادَهُمْ سَفَهًا بِغَيْرِ عِلْمٍ وَحَرَّمُوا مَا رَزَقَهُمُ اللَّهُ افْتِرَاءً عَلَى اللَّهِ قَدْ ضَلُّوا وَمَا كَانُوا مُهْتَدِينَ",
          english: "Lost are those who kill their children foolishly, with no basis in knowledge, and forbid what God has provided for them—innovations about God. They have gone astray. They are not guided."
        },
        {
          number: 141,
          arabic: "وَهُوَ الَّذِي أَنْشَأَ جَنَّاتٍ مَعْرُوشَاتٍ وَغَيْرَ مَعْرُوشَاتٍ وَالنَّخْلَ وَالزَّرْعَ مُخْتَلِفًا أُكُلُهُ وَالزَّيْتُونَ وَالرُّمَّانَ مُتَشَابِهًا وَغَيْرَ مُتَشَابِهٍ كُلُوا مِنْ ثَمَرِهِ إِذَا أَثْمَرَ وَآتُوا حَقَّهُ يَوْمَ حَصَادِهِ وَلَا تُسْرِفُوا إِنَّهُ لَا يُحِبُّ الْمُسْرِفِينَ",
          english: "It is He who produces gardens, both cultivated and wild, and date-palms, and crops of diverse tastes, and olives and pomegranates, similar and dissimilar. Eat of its fruit when it yields, and give its due on the day of its harvest, and do not waste. He does not love the wasteful."
        },
        {
          number: 142,
          arabic: "وَمِنَ الْأَنْعَامِ حَمُولَةً وَفَرْشًا كُلُوا مِمَّا رَزَقَكُمُ اللَّهُ وَلَا تَتَّبِعُوا خُطُوَاتِ الشَّيْطَانِ إِنَّهُ لَكُمْ عَدُوٌّ مُبِينٌ",
          english: "Among the livestock are some for transportation, and some for clothing. Eat of what God has provided for you, and do not follow the footsteps of Satan. He is to you an outright enemy."
        },
        {
          number: 143,
          arabic: "ثَمَانِيَةَ أَزْوَاجٍ مِنَ الضَّأْنِ اثْنَيْنِ وَمِنَ الْمَعْزِ اثْنَيْنِ قُلْ آلذَّكَرَيْنِ حَرَّمَ أَمِ الْأُنْثَيَيْنِ أَمَّا اشْتَمَلَتْ عَلَيْهِ أَرْحَامُ الْأُنْثَيَيْنِ نَبِّئُونِي بِعِلْمٍ إِنْ كُنْتُمْ صَادِقِينَ",
          english: "Eight pairs: two of the sheep, and two of the goats. Say, 'Did He forbid the two males, or the two females, or what the wombs of the two females contain? Inform me with knowledge, if you are truthful.'"
        },
        {
          number: 144,
          arabic: "وَمِنَ الْإِبِلِ اثْنَيْنِ وَمِنَ الْبَقَرِ اثْنَيْنِ قُلْ آلذَّكَرَيْنِ حَرَّمَ أَمِ الْأُنْثَيَيْنِ أَمَّا اشْتَمَلَتْ عَلَيْهِ أَرْحَامُ الْأُنْثَيَيْنِ أَمْ كُنْتُمْ شُهَدَاءَ إِذْ وَصَّاكُمُ اللَّهُ بِهَذَا فَمَنْ أَظْلَمُ مِمَّنِ افْتَرَى عَلَى اللَّهِ كَذِبًا لِيُضِلَّ النَّاسَ بِغَيْرِ عِلْمٍ إِنَّ اللَّهَ لَا يَهْدِي الْقَوْمَ الظَّالِمِينَ",
          english: "And two of the camels, and two of the cattle. Say, 'Did He forbid the two males, or the two females, or what the wombs of the two females contain? Were you present when God enjoined this upon you?' Who does greater wrong than he who invents lies and attributes them to God, in order to mislead people without knowledge? God does not guide the wicked people."
        },
        {
          number: 145,
          arabic: "قُلْ لَا أَجِدُ فِي مَا أُوحِيَ إِلَيَّ مُحَرَّمًا عَلَى طَاعِمٍ يَطْعَمُهُ إِلَّا أَنْ يَكُونَ مَيْتَةً أَوْ دَمًا مَسْفُوحًا أَوْ لَحْمَ خِنْزِيرٍ فَإِنَّهُ رِجْسٌ أَوْ فِسْقًا أُهِلَّ لِغَيْرِ اللَّهِ بِهِ فَمَنِ اضْطُرَّ غَيْرَ بَاغٍ وَلَا عَادٍ فَإِنَّ رَبَّكَ غَفُورٌ رَحِيمٌ",
          english: "Say, 'In what was revealed to me, I find nothing forbidden to a consumer who eats it, except carrion, or spilled blood, or the flesh of swine—because it is impure—or a sinful offering dedicated to other than God. But if someone is compelled by necessity, without being deliberate or malicious—your Lord is Forgiving and Merciful."
        },
        {
          number: 146,
          arabic: "وَعَلَى الَّذِينَ هَادُوا حَرَّمْنَا كُلَّ ذِي ظُفُرٍ وَمِنَ الْبَقَرِ وَالْغَنَمِ حَرَّمْنَا عَلَيْهِمْ شُحُومَهُمَا إِلَّا مَا حَمَلَتْ ظُهُورُهُمَا أَوِ الْحَوَايَا أَوْ مَا اخْتَلَطَ بِعَظْمٍ ذَلِكَ جَزَيْنَاهُمْ بِبَغْيِهِمْ وَإِنَّا لَصَادِقُونَ",
          english: "For the Jews We forbade everything with claws. As of cattle and sheep: We forbade them their fat, except what adheres to their backs, or the entrails, or what is mixed with bone. This is how We penalized them for their inequity. We are indeed truthful."
        },
        {
          number: 147,
          arabic: "فَإِنْ كَذَّبُوكَ فَقُلْ رَبُّكُمْ ذُو رَحْمَةٍ وَاسِعَةٍ وَلَا يُرَدُّ بَأْسُهُ عَنِ الْقَوْمِ الْمُجْرِمِينَ",
          english: "If they accuse you of lying, say, 'Your Lord is Possessor of infinite mercy, but His wrath cannot be averted from the guilty people.'"
        },
        {
          number: 148,
          arabic: "سَيَقُولُ الَّذِينَ أَشْرَكُوا لَوْ شَاءَ اللَّهُ مَا أَشْرَكْنَا وَلَا آبَاؤُنَا وَلَا حَرَّمْنَا مِنْ شَيْءٍ كَذَلِكَ كَذَّبَ الَّذِينَ مِنْ قَبْلِهِمْ حَتَّى ذَاقُوا بَأْسَنَا قُلْ هَلْ عِنْدَكُمْ مِنْ عِلْمٍ فَتُخْرِجُوهُ لَنَا إِنْ تَتَّبِعُونَ إِلَّا الظَّنَّ وَإِنْ أَنْتُمْ إِلَّا تَخْرُصُونَ",
          english: "The polytheists will say, 'Had God willed, we would not have practiced idolatry, nor would have our forefathers, nor would we have prohibited anything.' Likewise those before them lied, until they tasted Our might. Say, 'Do you have any knowledge that you can produce for us? You follow nothing but conjecture, and you only guess.'"
        },
        {
          number: 149,
          arabic: "قُلْ فَلِلَّهِ الْحُجَّةُ الْبَالِغَةُ فَلَوْ شَاءَ لَهَدَاكُمْ أَجْمَعِينَ",
          english: "Say, 'To God belongs the conclusive argument. Had He willed, He would have guided you all.'"
        },
        {
          number: 150,
          arabic: "قُلْ هَلُمَّ شُهَدَاءَكُمُ الَّذِينَ يَشْهَدُونَ أَنَّ اللَّهَ حَرَّمَ هَذَا فَإِنْ شَهِدُوا فَلَا تَشْهَدْ مَعَهُمْ وَلَا تَتَّبِعْ أَهْوَاءَ الَّذِينَ كَذَّبُوا بِآيَاتِنَا وَالَّذِينَ لَا يُؤْمِنُونَ بِالْآخِرَةِ وَهُمْ بِرَبِّهِمْ يَعْدِلُونَ",
          english: "Say, 'Produce your witnesses who would testify that God has prohibited this.' If they testify, do not testify with them. And do not follow the whims of those who deny Our revelation, and those who do not believe in the Hereafter, and those who equate others with their Lord."
        },
        {
          number: 151,
          arabic: "قُلْ تَعَالَوْا أَتْلُ مَا حَرَّمَ رَبُّكُمْ عَلَيْكُمْ أَلَّا تُشْرِكُوا بِهِ شَيْئًا وَبِالْوَالِدَيْنِ إِحْسَانًا وَلَا تَقْتُلُوا أَوْلَادَكُمْ مِنْ إِمْلَاقٍ نَحْنُ نَرْزُقُكُمْ وَإِيَّاهُمْ وَلَا تَقْرَبُوا الْفَوَاحِشَ مَا ظَهَرَ مِنْهَا وَمَا بَطَنَ وَلَا تَقْتُلُوا النَّفْسَ الَّتِي حَرَّمَ اللَّهُ إِلَّا بِالْحَقِّ ذَلِكُمْ وَصَّاكُمْ بِهِ لَعَلَّكُمْ تَعْقِلُونَ",
          english: "Say, 'Come, let me tell you what your Lord has forbidden you: that you associate nothing with Him; that you honor your parents; that you do not kill your children because of poverty—We provide for you and for them; that you do not come near indecencies, whether outward or inward; and that you do not kill the soul which God has sanctified—except in the course of justice. All this He has enjoined upon you, so that you may understand.'"
        },
        {
          number: 152,
          arabic: "وَلَا تَقْرَبُوا مَالَ الْيَتِيمِ إِلَّا بِالَّتِي هِيَ أَحْسَنُ حَتَّى يَبْلُغَ أَشُدَّهُ وَأَوْفُوا الْكَيْلَ وَالْمِيزَانَ بِالْقِسْطِ لَا نُكَلِّفُ نَفْسًا إِلَّا وُسْعَهَا وَإِذَا قُلْتُمْ فَاعْدِلُوا وَلَوْ كَانَ ذَا قُرْبَى وَبِعَهْدِ اللَّهِ أَوْفُوا ذَلِكُمْ وَصَّاكُمْ بِهِ لَعَلَّكُمْ تَذَكَّرُونَ",
          english: "And do not come near the property of the orphan, except with the best intentions, until he reaches maturity. And give full weight and full measure, equitably. We do not burden any soul beyond its capacity. And when you speak, be fair, even if it concerns a close relative. And fulfill your covenant with God. All this He has enjoined upon you, so that you may take heed."
        },
        {
          number: 153,
          arabic: "وَأَنَّ هَذَا صِرَاطِي مُسْتَقِيمًا فَاتَّبِعُوهُ وَلَا تَتَّبِعُوا السُّبُلَ فَتَفَرَّقَ بِكُمْ عَنْ سَبِيلِهِ ذَلِكُمْ وَصَّاكُمْ بِهِ لَعَلَّكُمْ تَتَّقُونَ",
          english: "This is My path, straight, so follow it. And do not follow the other paths, lest they divert you from His path. All this He has enjoined upon you, that you may refrain from wrongdoing."
        },
        {
          number: 154,
          arabic: "ثُمَّ آتَيْنَا مُوسَى الْكِتَابَ تَمَامًا عَلَى الَّذِي أَحْسَنَ وَتَفْصِيلًا لِكُلِّ شَيْءٍ وَهُدًى وَرَحْمَةً لَعَلَّهُمْ بِلِقَاءِ رَبِّهِمْ يُؤْمِنُونَ",
          english: "Then We gave Moses the Scripture, perfect for the righteous, and explaining everything clearly, and a beacon, and mercy, that they may believe in the encounter with their Lord."
        },
        {
          number: 155,
          arabic: "وَهَذَا كِتَابٌ أَنْزَلْنَاهُ مُبَارَكٌ فَاتَّبِعُوهُ وَاتَّقُوا لَعَلَّكُمْ تُرْحَمُونَ",
          english: "This too is a blessed Scripture that We revealed; so follow it, and be righteous, that you may receive mercy."
        },
        {
          number: 156,
          arabic: "أَنْ تَقُولُوا إِنَّمَا أُنْزِلَ الْكِتَابُ عَلَى طَائِفَتَيْنِ مِنْ قَبْلِنَا وَإِنْ كُنَّا عَنْ دِرَاسَتِهِمْ لَغَافِلِينَ",
          english: "Lest you say, 'The Scripture was revealed to two parties before us, and we were unaware of their teachings.'"
        },
        {
          number: 157,
          arabic: "أَوْ تَقُولُوا لَوْ أَنَّا أُنْزِلَ عَلَيْنَا الْكِتَابُ لَكُنَّا أَهْدَى مِنْهُمْ فَقَدْ جَاءَكُمْ بَيِّنَةٌ مِنْ رَبِّكُمْ وَهُدًى وَرَحْمَةٌ فَمَنْ أَظْلَمُ مِمَّنْ كَذَّبَ بِآيَاتِ اللَّهِ وَصَدَفَ عَنْهَا سَنَجْزِي الَّذِينَ يَصْدِفُونَ عَنْ آيَاتِنَا سُوءَ الْعَذَابِ بِمَا كَانُوا يَصْدِفُونَ",
          english: "Or lest you say, 'Had the Scripture been revealed to us, we would have been better guided than they.' Clarification has come to you from your Lord, and guidance, and mercy. Who then does greater wrong than he who gives the lie to God's messages, and turns away from them? We will repay those who turn away from Our messages with the worst kind of punishment, because of their turning away."
        },
        {
          number: 158,
          arabic: "هَلْ يَنْظُرُونَ إِلَّا أَنْ تَأْتِيَهُمُ الْمَلَائِكَةُ أَوْ يَأْتِيَ رَبُّكَ أَوْ يَأْتِيَ بَعْضُ آيَاتِ رَبِّكَ يَوْمَ يَأْتِي بَعْضُ آيَاتِ رَبِّكَ لَا يَنْفَعُ نَفْسًا إِيمَانُهَا لَمْ تَكُنْ آمَنَتْ مِنْ قَبْلُ أَوْ كَسَبَتْ فِي إِيمَانِهَا خَيْرًا قُلِ انْتَظِرُوا إِنَّا مُنْتَظِرُونَ",
          english: "Are they waiting for anything but for the angels to come to them, or for your Lord to arrive, or for some of your Lord's signs to come? On the Day when some of your Lord's signs come, no soul will benefit from its faith unless it had believed previously, or had earned goodness through its faith. Say, 'Wait, we too are waiting.'"
        },
        {
          number: 159,
          arabic: "إِنَّ الَّذِينَ فَرَّقُوا دِينَهُمْ وَكَانُوا شِيَعًا لَسْتَ مِنْهُمْ فِي شَيْءٍ إِنَّمَا أَمْرُهُمْ إِلَى اللَّهِ ثُمَّ يُنَبِّئُهُمْ بِمَا كَانُوا يَفْعَلُونَ",
          english: "As for those who divided their religion and became sects—you have nothing to do with them. Their case rests with God; then He will inform them of what they used to do."
        },
        {
          number: 160,
          arabic: "مَنْ جَاءَ بِالْحَسَنَةِ فَلَهُ عَشْرُ أَمْثَالِهَا وَمَنْ جَاءَ بِالسَّيِّئَةِ فَلَا يُجْزَى إِلَّا مِثْلَهَا وَهُمْ لَا يُظْلَمُونَ",
          english: "Whoever comes up with a good deed will have ten times its like; and whoever comes up with an evil deed will be repaid only with its equivalent—they will not be wronged."
        },
        {
          number: 161,
          arabic: "قُلْ إِنَّنِي هَدَانِي رَبِّي إِلَى صِرَاطٍ مُسْتَقِيمٍ دِينًا قِيَمًا مِلَّةَ إِبْرَاهِيمَ حَنِيفًا وَمَا كَانَ مِنَ الْمُشْرِكِينَ",
          english: "Say, 'My Lord has guided me to a straight path, an upright religion, the creed of Abraham the Monotheist, who was not a polytheist.'"
        },
        {
          number: 162,
          arabic: "قُلْ إِنَّ صَلَاتِي وَنُسُكِي وَمَحْيَايَ وَمَمَاتِي لِلَّهِ رَبِّ الْعَالَمِينَ",
          english: "Say, 'My prayer and my worship, and my life and my death, are devoted to God, the Lord of the Worlds."
        },
        {
          number: 163,
          arabic: "لَا شَرِيكَ لَهُ وَبِذَلِكَ أُمِرْتُ وَأَنَا أَوَّلُ الْمُسْلِمِينَ",
          english: "No associate has He. Thus I am commanded, and I am the first of those who submit.'"
        },
        {
          number: 164,
          arabic: "قُلْ أَغَيْرَ اللَّهِ أَبْغِي رَبًّا وَهُوَ رَبُّ كُلِّ شَيْءٍ وَلَا تَكْسِبُ كُلُّ نَفْسٍ إِلَّا عَلَيْهَا وَلَا تَزِرُ وَازِرَةٌ وِزْرَ أُخْرَى ثُمَّ إِلَى رَبِّكُمْ مَرْجِعُكُمْ فَيُنَبِّئُكُمْ بِمَا كُنْتُمْ فِيهِ تَخْتَلِفُونَ",
          english: "Say, 'Am I to seek a Lord other than God, when He is the Lord of all things?' No soul gets except what it is due, and no soul bears the burdens of another. Then to your Lord is your return, then He will inform you regarding your disputes."
        },
        {
          number: 165,
          arabic: "وَهُوَ الَّذِي جَعَلَكُمْ خَلَائِفَ الْأَرْضِ وَرَفَعَ بَعْضَكُمْ فَوْقَ بَعْضٍ دَرَجَاتٍ لِيَبْلُوَكُمْ فِي مَا آتَاكُمْ إِنَّ رَبَّكَ سَرِيعُ الْعِقَابِ وَإِنَّهُ لَغَفُورٌ رَحِيمٌ",
          english: "It is He who made you successors on the earth, and raised some of you in ranks over others, in order to test you through what He has given you. Your Lord is Quick in retribution, and He is Forgiving and Merciful."
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