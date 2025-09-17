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