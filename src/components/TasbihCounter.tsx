import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import useSound from "use-sound";
import clickSfx from "../assets/click.mp3";
import resetSfx from "../assets/reset.mp3";

// Dhikr type and list - include short, medium, long including tashkeel Arabic
type Dhikr = {
  id: number;
  arabic: string;
  transliteration: string;
  english: string;
  hadith: string;
  target: number;
  category: "short" | "medium" | "long";
};

const DHIKR_LIST: Dhikr[] = [
  {
    id: 1,
    arabic: "بِسْمِ اللَّهِ",
    transliteration: "Bismillāh",
    english: "In the name of Allah",
    hadith:
      "There are many hadiths regarding the barakah for the person who recites Bismillah before any action.\n\nAbu al-Malih reported: I was riding behind the Prophet ﷺ when his mount stumbled. I said: 'May the devil perish!' He ﷺ said: Do not say this, for if you do he becomes proud. Rather, say 'Bismillah', for when you say that, he diminishes till he is like a fly.\n\nSource: Sunan Abi Dawud 4982 (Sahih).",
    target: 1,
    category: "short",
  },
  {
    id: 2,
    arabic: "سُبْحَانَ اللَّهِ",
    transliteration: "SubḥānAllāh",
    english: "Glory be to Allah",
    hadith:
      "Part of the post-prayer tasbih: Recite SubhanAllah 33 times, Alhamdulillah 33 times, and Allahu Akbar 34 times after each prayer; sins will be forgiven even if they are as abundant as the foam of the sea.\n\nSource: Sahih Bukhari 6405.",
    target: 33,
    category: "short",
  },
  {
    id: 3,
    arabic: "الْحَمْدُ لِلَّهِ",
    transliteration: "Alḥamdulillāh",
    english: "All praise is due to Allah",
    hadith:
      "Also said after every prayer 33 times. The Prophet ﷺ said: 'Alhamdulillahi fills the scale.' It is a dhikr beloved to Allah.\n\nSource: Sahih Muslim 223.",
    target: 33,
    category: "short",
  },
  {
    id: 4,
    arabic: "اللَّهُ أَكْبَرُ",
    transliteration: "Allāhu Akbar",
    english: "Allah is the Greatest",
    hadith:
      "Part of the post-prayer tasbih (34 times). The Prophet ﷺ said: 'Allahu Akbar fills what is between the heavens and the earth.'\n\nSource: Sahih Muslim 223.",
    target: 34,
    category: "short",
  },
  {
    id: 5,
    arabic: "لَا إِلَٰهَ إِلَّا اللَّهُ",
    transliteration: "Lā ilāha illā Allāh",
    english: "There is no deity but Allah",
    hadith:
      "The Prophet ﷺ said: 'The best dhikr is La ilaha illa Allah.' Whoever sincerely says it is guaranteed Paradise according to the hadith.\n\nSource: Tirmidhi 3585.",
    target: 100,
    category: "short",
  },
  {
    id: 6,
    arabic: "أَسْتَغْفِرُ اللَّهَ",
    transliteration: "Astaghfirullāh",
    english: "I seek forgiveness from Allah",
    hadith:
      "The Prophet ﷺ used to seek Allah’s forgiveness 70–100 times daily. He ﷺ said: 'Whoever persists in seeking forgiveness, Allah will grant relief from every distress.'\n\nSource: Sahih Muslim 2702.",
    target: 100,
    category: "short",
  },
  {
    id: 7,
    arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
    transliteration: "SubhanAllahi wa bihamdih",
    english: "Glory be to Allah and praise be to Him",
    hadith:
      "The Prophet ﷺ said: 'Whoever says SubhanAllahi wa bihamdih 100 times a day, his sins will be forgiven even if they are as much as the foam of the sea.'\n\nSource: Bukhari and Muslim.",
    target: 100,
    category: "short",
  },
  {
    id: 8,
    arabic: "اللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ",
    transliteration: "Allahumma salli 'ala Muhammad",
    english: "O Allah, send blessings on Muhammad",
    hadith:
      "Sending salutations (salawat) on the Prophet ﷺ is among the greatest means to gain Allah’s mercy. Each salawat gets rewarded ten-fold.\n\nSource: Sahih Muslim 384.",
    target: 100,
    category: "medium",
  },
  {
    id: 9,
    arabic: "رَبِّ اغْفِرْ لِي وَتُبْ عَلَيَّ",
    transliteration: "Rabbi ghfir li wa tub 'alayya",
    english: "My Lord, forgive me and accept my repentance",
    hadith:
      "This dua is from the Sunnah, the Prophet ﷺ would recite it frequently between the prostrations in prayer.\n\nSource: Abu Dawud 874.",
    target: 100,
    category: "medium",
  },
  {
    id: 10,
    arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، سُبْحَانَ اللَّهِ الْعَظِيمِ",
    transliteration: "Subhan-Allahi wa bihamdihi, subhan-Allahil-azim",
    english: "Glory be to Allah and praise be to Him, glory be to Allah the Great",
    hadith:
      "The Prophet ﷺ said: 'Two phrases are light on the tongue, heavy on the scales, and beloved to the Most Merciful: Subhan-Allahi wa bihamdihi, Subhan-Allahil-azim.' (Bukhari 6682)\n\nBenefit: These words are most beloved to Allah, easy to say, and carry immense reward.",
    target: 100,
    category: "medium",
  },
  {
    id: 11,
    arabic: "يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ",
    transliteration: "Ya hayyu ya qayyum bi rahmatika astagheet",
    english: "O Ever-Living, O Sustainer, I seek help with Your mercy",
    hadith:
      "This profound dua was taught by the Prophet ﷺ to recite in difficulty and distress. He said to his daughter Fatima: 'Recite Ya Hayyu Ya Qayyum bi rahmatika astagheeth in the morning and evening.' (Mustadrak Hakim, Shu’abul Imaan)\n\nBenefit: Seek Allah's mercy and help in all affairs, and protection from self-sufficiency for even the blink of an eye.",
    target: 100,
    category: "medium",
  },
  {
    id: 12,
    arabic: "سُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ وَلَا إِلَهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَرُ",
    transliteration: "Subhan-Allah, wal-hamdu-lillah, wa la ilaha illallah, wa Allahu akbar",
    english: "Glory be to Allah, all praise is for Allah, there is no deity but Allah, Allah is the Greatest",
    hadith:
      "The Prophet ﷺ said: 'Saying: Subhanallah, Alhamdulillah, La ilaha illallah, Allahu Akbar is dearer to me than all that the sun rises upon.' (Muslim 2695)\n\nBenefit: These are the four greatest words of remembrance, filling the scales of good deeds and beloved to Allah.",
    target: 100,
    category: "medium",
  },
  {
    id: 13,
    arabic: "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
    transliteration: "La hawla wa la quwwata illa billah",
    english: "There is no power and no strength except with Allah",
    hadith:
      "Abu Musa al-Ash’ari reported: The Prophet ﷺ said, 'Shall I not tell you a phrase which is one of the treasures of Paradise? It is: La hawla wa la quwwata illa billah.' (Bukhari 6384)\n\nBenefit: This dhikr brings comfort in hardship, removes anxiety, and is a treasure from Paradise.",
    target: 100,
    category: "medium",
  },
  {
    id: 14,
    arabic: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ",
    transliteration: "Subhan-Allahi wa bihamdih, astaghfirullah wa atubu ilaih",
    english: "Glory be to Allah and praise be to Him, I seek forgiveness from Allah and I turn to Him in repentance",
    hadith:
      "Aishah (ra) reported: Before he passed away, the Prophet ﷺ used to say frequently: Subhan-Allahi wa bihamdih, astaghfirullah wa atubu ilaih. (Muslim 484)[web:79][web:85][web:91]\n\nBenefit: Sincere repentance plus praise brings Allah’s forgiveness, mercy and acceptance.",
    target: 100,
    category: "medium",
  },
  {
    id: 15,
    arabic: "رَبِّ اغْفِرْ لِي وَتُبْ عَلَيَّ إِنَّكَ أَنتَ التَّوَّابُ الْغَفُورُ",
    transliteration: "Rabbighfir li wa tub alayya innaka antat-Tawwabul-ghafur",
    english: "My Lord, forgive me and accept my repentance, surely You are the Accepter of repentance, Most Forgiving",
    hadith:
      "One of the supplications most recited by the Prophet ﷺ between the two sajdahs in salah. It is a beautiful dua for repentance and forgiveness.\n\nSource: Abu Dawud 874.[web:80][web:86]\n\nBenefit: Allah loves those who constantly seek forgiveness.",
    target: 100,
    category: "medium",
  },
  {
    id: 16,
    arabic: "اللهم اغفر لي، وارحمني، واجبرني، واهدني، وارزقني",
    transliteration: "Allahumm-aghfir li, warhamni, wajburni, wahdini, warzuqni",
    english: "O Allah! Forgive me, have mercy on me, strengthen me, guide me, and provide for me",
    hadith:
      "The Prophet ﷺ taught this comprehensive dua to recite between the two prostrations during prayer (sajda). It asks Allah for five essential blessings.\n\nSource: Sunan Abi Dawud 850; Muslim 2697.[web:81][web:87]\n\nBenefit: Forgiveness, mercy, strength, guidance, and provision — all in one beautiful prayer.",
    target: 100,
    category: "medium",
  },
  {
    id: 17,
    arabic: "لَا إِلٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ",
    transliteration: "La ilaha illallah wahdahu la sharika lahu, lahul-mulku wa lahul-hamdu wa huwa ala kulli shay'in qadir",
    english: "There is no god but Allah, alone, with no partner. His is the dominion and all praise, and He is able to do all things.",
    hadith:
      "Whoever says this 100 times a day will have a reward like freeing 10 slaves, 100 good deeds will be written, 100 sins erased, and he will be protected from Shaytan that day till evening. (Sahih Bukhari 3293; Sahih Muslim 2691)",
    target: 100,
    category: "long"
  },
  {
    id: 18,
    arabic: "سُبْحَانَ اللَّهِ وَالْحَمْدُ لِلَّهِ وَلَا إِلٰهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَرُ وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ الْعَلِيِّ الْعَظِيمِ",
    transliteration: "Subhan-Allah walhamdulillah wa la ilaha illallah wa Allahu akbar wa la hawla wa la quwwata illa billahil-Aliyyil-Azim",
    english: "Glory be to Allah, all praise is for Allah, there is no god but Allah, Allah is the Greatest, and there is no power nor might except with Allah, the Most High, the Most Great.",
    hadith:
      "The Prophet ﷺ said: 'These are from the treasures of Paradise.' (Sahih Bukhari 6384, Sahih Muslim 2691)",
    target: 100,
    category: "long"
  },
  {
    id: 19,
    arabic: "رَبِّ اغْفِرْ لِي",
    transliteration: "Rabbighfir li",
    english: "My Lord, forgive me",
    hadith:
      "This dua is recited between the two sujood in Salah; one of the most concise, repeated prayers for forgiveness as taught and practiced by the Prophet ﷺ (Abu Dawud 850; Sahih Muslim 2697)",
    target: 100,
    category: "long"
  },
  {
    id: 20,
    arabic: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ وَالْعَجْزِ وَالْكَسَلِ وَالْبُخْلِ وَالْجُبْنِ وَضَلَعِ الدَّيْنِ وَغَلَبَةِ الرِّجَالِ",
    transliteration: "Allahumma inni a'udhu bika minal-hammi wal-hazan wal-'ajzi wal-kasal wal-bukhli wal-jubni wa dala'id-dayni wa ghalabatir-rijal",
    english: "O Allah, I seek refuge in You from anxiety and sorrow, weakness and laziness, miserliness and cowardice, the burden of debts and from being overpowered by men.",
    hadith: "The Prophet ﷺ recommended this dua for relief from distress and difficulties. (Abu Dawud, Sahih)",
    target: 100,
    category: "long"
  },
  {
    id: 21,
    arabic: "رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِن لَّدُنكَ رَحْمَةً إِنَّكَ أَنتَ الْوَهَّابُ",
    transliteration: "Rabbana la tuzigh quloobana ba'da idh hadaytana wahab lana min ladunka rahmatan innaka antal Wahhab",
    english: "Our Lord, let not our hearts deviate after You have guided us and grant us from Yourself mercy. Indeed, You are the Bestower.",
    hadith: "A du’a seeking steadfastness and mercy from Allah. Reciting it is highly recommended for protection against deviation.",
    target: 100,
    category: "long"
  }
];

// Tasbih Beads Component
const HorizontalTasbihBeads: React.FC<{ count: number }> = ({ count }) => {
  const totalBeads = 33;
  const activeBead = count % totalBeads;
  return (
    <div className="relative mx-auto mb-8 flex flex-col items-center">
      <h1 className="mb-4 text-xl md:text-2xl font-semibold text-white tracking-wider drop-shadow-[0_2px_16px_#fff9]">
        TASBIH COUNTER ONLINE
      </h1>
      <div className="relative flex items-center justify-center w-full max-w-4xl h-8 md:h-10">
        <div className="absolute h-1 bg-gradient-to-r from-transparent via-white/25 to-transparent w-full top-1/2 z-0" />
        <div className="flex items-center space-x-2 md:space-x-3 z-10">
          {Array.from({ length: totalBeads }).map((_, i) => (
            <motion.div
              key={i}
              className={
                "rounded-full border shadow-lg " +
                (i < activeBead
                  ? "bg-yellow-400 border-yellow-200 shadow-yellow-400/30"
                  : "bg-white/25 border-white/20")
              }
              style={{ width: 16, height: 16 }}
              animate={i === activeBead - 1 ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 0.35 }}
            />
          ))}
        </div>
      </div>
      <div className="mt-2 text-sm text-white/80 drop-shadow-[0_1px_16px_#fff7]">
        Bead {(count % totalBeads) || totalBeads} of {totalBeads}
      </div>
    </div>
  );
};

// Single Flip Card component
const MicroInteractiveFlipCard: React.FC<{ item: Dhikr; onIncrement?: () => void }> = ({
  item,
  onIncrement,
}) => {
  const [flipped, setFlipped] = useState(false);
  const [count, setCount] = useState<number>(() => {
    const saved = localStorage.getItem(`tasbih_${item.id}`);
    return saved ? parseInt(saved) : 0;
  });
  const [playClick] = useSound(clickSfx, { volume: 0.45 });
  const [playReset] = useSound(resetSfx, { volume: 0.4 });

  const increment = () => {
    playClick();
    const newCount = count + 1;
    setCount(newCount);
    localStorage.setItem(`tasbih_${item.id}`, String(newCount));
    if (onIncrement) onIncrement();
  };
  const decrement = () => {
    playClick();
    setCount((c) => Math.max(0, c - 1));
  };
  const reset = () => {
    playReset();
    setCount(0);
    localStorage.removeItem(`tasbih_${item.id}`);
  };

  return (
    <motion.div
      className="relative h-[430px] w-full max-w-md mx-auto perspective-1000 my-5"
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.25 }}
    >
      <div
        className="relative h-full w-full [transform-style:preserve-3d] transition-transform duration-700"
        style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        {/* Front Side */}
        <div className="absolute inset-0 bg-glass-overlay rounded-xl border border-white/20 shadow-2xl [backface-visibility:hidden] flex flex-col p-8 pb-6 pt-7 justify-between">
          {/* Details button - Top right */}
          <div className="flex justify-end mb-1 relative z-10">
            <button
              onClick={() => setFlipped(true)}
              className="px-3 py-1 rounded bg-yellow-300 text-slate-800 font-bold text-xs shadow"
              title="More details"
            >
              Details
            </button>
          </div>
          <div>
            <p className="text-3xl font-arabic text-white text-center mt-0 mb-2 drop-shadow-[0_2px_20px_#fff8]">{item.arabic}</p>
            <p className="text-base text-emerald-100 text-center">{item.transliteration}</p>
            <p className="text-xs text-emerald-200 text-center">{item.english}</p>
          </div>
          <div className="flex items-center justify-center gap-2 mt-6">
            <button
              onClick={decrement}
              className="px-4 py-2 rounded bg-white/40 text-gray-800 hover:bg-yellow-200 font-bold text-lg shadow"
            >−</button>
            <span className="mx-2 text-yellow-300 font-semibold text-base">
              {count}/{item.target}
            </span>
            <button
              onClick={increment}
              className="px-4 py-2 rounded bg-white/40 text-gray-800 hover:bg-yellow-200 font-bold text-lg shadow"
            >+</button>
            <button
              onClick={reset}
              className="px-4 py-2 rounded bg-red-400 text-white font-semibold text-sm ml-2 shadow"
            >Reset</button>
          </div>
        </div>
        {/* Back Side */}
        <div
          className="absolute inset-0 bg-glass-overlay rounded-xl border border-yellow-300/10 shadow-2xl p-6 overflow-y-auto [backface-visibility:hidden] flex flex-col"
          style={{ transform: "rotateY(180deg)" }}
        >
          <h3 className="text-lg font-bold text-yellow-300 mb-3 text-center">{item.transliteration}</h3>
          <div className="text-sm text-emerald-50 whitespace-pre-line flex-1 leading-relaxed max-h-[215px]">{item.hadith}</div>
          <button
            onClick={() => setFlipped(false)}
            className="mt-6 mx-auto px-4 py-2 rounded bg-yellow-300 text-gray-900 font-semibold text-sm"
          >
            Back
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const TasbihPage: React.FC = () => {
  const [global, setGlobal] = useState(0);
  const [playClick] = useSound(clickSfx, { volume: 0.45 });
  const [playReset] = useSound(resetSfx, { volume: 0.4 });

  const shortDhikr = DHIKR_LIST.filter((d) => d.category === "short");
  const mediumDhikr = DHIKR_LIST.filter((d) => d.category === "medium");
  const longDhikr = DHIKR_LIST.filter((d) => d.category === "long");

  const handleGlobalDecrement = () => {
    playClick();
    setGlobal((c) => Math.max(0, c - 1));
  };
  const handleGlobalIncrement = () => {
    playClick();
    setGlobal((c) => c + 1);
  };
  const handleGlobalReset = () => {
    playReset();
    setGlobal(0);
  };

  return (
    <>
      <Helmet>
        <title>Tasbih Counter – Qalam Verse | Islamic Digital Tasbih</title>
        <meta
          name="description"
          content="Modern Digital Tasbih Counter with authentic Islamic Dhikr including short, medium, and long dhikr cards with authentic Arabic, transliteration, and meaning. Track your tasbih count with sound effects and detailed hadith references."
        />
        <meta
          name="keywords"
          content="Tasbih counter, Islamic dhikr, digital tasbih, dua, hadith references, flip cards, prayer counter, Islamic supplications, tasbih beads, remembrance of Allah, tasbih digital, tasbih online, prayer counter, istighfar counter, digital tasbih counter, online zikir, dhikr counter online, tasbih beads online, tasbih counter on phone, dhikr tracker, counter zikir, online dhikr counter, long dhikr, tasbeeh counter app, free Islamic tasbih counter"
        />
        <meta name="author" content="Qalam Verse Islamic Education" />
        <link rel="canonical" href="https://www.qalamverse.site/#/tasbih" />
      </Helmet>

      <div className="bg-luxury-gradient min-h-screen overflow-x-hidden">
        <div className="min-h-screen w-full bg-black/10 backdrop-blur-[4.5px]">
          <HorizontalTasbihBeads count={global} />
          {/* Main Counter Controls */}
          <motion.div
            className="flex flex-col items-center mb-8"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <div className="flex gap-4 items-center mb-3">
              <button
                onClick={handleGlobalDecrement}
                className="px-5 py-3 rounded-full bg-orange-400/80 text-white font-bold text-xl shadow hover:bg-orange-500 transition"
              >
                −
              </button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.07 }}
                onClick={handleGlobalIncrement}
                className="main-counter-btn bg-white/30 px-16 py-10 text-white border-4 border-yellow-300/30 rounded-full shadow-2xl text-6xl font-bold glass backdrop-blur-[6px]"
              >
                {global}
              </motion.button>
              <button
                onClick={handleGlobalIncrement}
                className="px-5 py-3 rounded-full bg-emerald-400/80 text-white font-bold text-xl shadow hover:bg-emerald-500 transition"
              >
                +
              </button>
            </div>
            <button
              onClick={handleGlobalReset}
              className="mt-2 px-6 py-3 text-md bg-red-500/80 hover:bg-red-600 text-white rounded shadow"
            >
              Reset Global
            </button>
          </motion.div>

          {/* Short Dhikr */}
          <section className="mb-16">
            <h2 className="text-4xl font-bold text-center text-white mb-10 drop-shadow-[0_3px_28px_#fff8]">
              Short Dhikr
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {shortDhikr.map((d) => (
                <MicroInteractiveFlipCard
                  key={d.id}
                  item={d}
                  onIncrement={handleGlobalIncrement}
                />
              ))}
            </div>
          </section>

          {/* Medium Dhikr */}
          <section className="mb-16">
            <h2 className="text-4xl font-bold text-center text-white mb-10 drop-shadow-[0_3px_28px_#fff8]">
              Medium Dhikr
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {mediumDhikr.map((d) => (
                <MicroInteractiveFlipCard
                  key={d.id}
                  item={d}
                  onIncrement={handleGlobalIncrement}
                />
              ))}
            </div>
          </section>

          {/* Long Dhikr */}
          <section>
            <h2 className="text-4xl font-bold text-center text-white mb-10 drop-shadow-[0_3px_28px_#fff8]">
              Long Dhikr
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {longDhikr.map((d) => (
                <MicroInteractiveFlipCard
                  key={d.id}
                  item={d}
                  onIncrement={handleGlobalIncrement}
                />
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="text-center mt-16 pb-10">
            <Link
              to="/dua"
              className="inline-flex items-center gap-2 bg-yellow-400/90 hover:bg-yellow-500 text-gray-900 font-semibold px-8 py-4 rounded-full shadow-lg text-lg"
            >
              📖 Learn Dua & Dhikr
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default TasbihPage;
