import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { BookOpen, Play, Star, ArrowLeft, Clock, User, Globe } from 'lucide-react';

interface ProphetStory {
  id: string;
  name: string;
  arabicName: string;
  title: string;
  period: string;
  location: string;
  story: string;
  keyLessons: string[];
  quranicReferences: string[];
  importantEvents: string[];
  videoId: string;
  videoTitle: string;
  color: string;
}

function ProphetStories() {
  const [selectedProphet, setSelectedProphet] = useState<ProphetStory | null>(null);
  const [activeTab, setActiveTab] = useState('story');

  const prophetStories: ProphetStory[] = [
    {
      id: 'adam',
      name: 'Adam',
      arabicName: 'آدم عليه السلام',
      title: 'The First Human and Prophet',
      period: 'Beginning of Humanity',
      location: 'Paradise, then Earth',
      story: `Prophet Adam (AS) was the first human being created by Allah from clay. He was given knowledge of all things and was honored by Allah when He commanded the angels to prostrate to him. Adam (AS) lived in Paradise with his wife Hawwa (Eve), but after eating from the forbidden tree due to Satan's deception, they were sent to Earth. This marked the beginning of human life on Earth and the start of the test of this worldly life.

Adam (AS) was not only the first human but also the first Prophet. After realizing his mistake, he repented sincerely to Allah, and Allah accepted his repentance. This teaches us that no matter how grave our sins, sincere repentance (Tawbah) can lead to Allah's forgiveness.

Adam (AS) and Hawwa were then tasked with populating the Earth and worshipping Allah. They were given guidance on how to live righteously and were warned about Satan's enmity. Adam (AS) lived for 930 years according to Islamic tradition, during which he taught his children about Allah and the right way of living.`,
      keyLessons: [
        'The importance of sincere repentance (Tawbah) when we make mistakes',
        'Satan is our clear enemy and will try to mislead us',
        'Knowledge is a great blessing from Allah that distinguishes humans',
        'Every human being has the potential for both good and evil',
        'Allah is Most Forgiving and accepts sincere repentance'
      ],
      quranicReferences: [
        'Quran 2:30-39 - The creation of Adam and the incident in Paradise',
        'Quran 7:19-25 - The story of Adam and Hawwa in Paradise',
        'Quran 20:115-123 - Adam\'s covenant with Allah and his mistake',
        'Quran 2:37 - Adam\'s repentance and Allah\'s acceptance'
      ],
      importantEvents: [
        'Creation from clay and receiving the soul from Allah',
        'Angels prostrating to Adam except Iblis (Satan)',
        'Living in Paradise with Hawwa',
        'The test of the forbidden tree',
        'Sincere repentance and Allah\'s forgiveness',
        'Descent to Earth and beginning of human civilization'
      ],
      videoId: '4mE3N-HURC8',
      videoTitle: 'The Story of Prophet Adam (AS) - First Human and Prophet',
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 'idris',
      name: 'Idris (Enoch)',
      arabicName: 'إدريس عليه السلام',
      title: 'The First to Write with a Pen',
      period: 'Before Prophet Nuh (AS)',
      location: 'Ancient Babylon/Egypt',
      story: `Prophet Idris (AS) was one of the earliest prophets sent by Allah to guide humanity. He was the first person to write with a pen and was blessed with extensive knowledge of astronomy, mathematics, and divine wisdom. The Quran mentions that Allah raised him to a high station.

Idris (AS) was known for his righteousness, wisdom, and dedication to worship. He spent most of his time in prayer, fasting, and teaching people about Allah. According to Islamic tradition, he was the first to establish the practice of wearing sewn clothes and was granted knowledge of various sciences.

Allah honored Idris (AS) by raising him to the heavens while he was still alive, similar to Prophet Isa (AS). His life serves as an example of complete devotion to Allah and the pursuit of beneficial knowledge. He is mentioned in the Quran as being among the patient and righteous servants of Allah.`,
      keyLessons: [
        'The importance of seeking and spreading beneficial knowledge',
        'Dedication to worship and remembrance of Allah',
        'Using knowledge and skills to serve humanity',
        'Patience and perseverance in following Allah\'s guidance',
        'The value of righteous deeds and moral conduct'
      ],
      quranicReferences: [
        'Quran 19:56-57 - Mention of Idris and his high station',
        'Quran 21:85-86 - Listed among the patient and righteous'
      ],
      importantEvents: [
        'Being granted extensive knowledge by Allah',
        'First to write with a pen and teach writing',
        'Establishing practices of civilization and learning',
        'Dedication to worship and teaching people',
        'Being raised to a high station by Allah',
        'Recognition as one of the patient servants'
      ],
      videoId: '2TkfoSofcbw',
      videoTitle: 'Prophet Idris (AS) - The Scholar and Righteous Servant',
      color: 'from-indigo-500 to-purple-600'
    },
    {
      id: 'nuh',
      name: 'Nuh (Noah)',
      arabicName: 'نوح عليه السلام',
      title: 'The Patient Caller to Allah',
      period: '950 years of preaching',
      location: 'Ancient Mesopotamia',
      story: `Prophet Nuh (AS) was sent to a people who had fallen into idol worship and corruption. For 950 years, he patiently called his people to worship Allah alone and abandon their false gods. Despite facing mockery, rejection, and persecution, Nuh (AS) never gave up on his mission.

He used various approaches - calling them privately and publicly, during day and night, with gentleness and firmness. He reminded them of Allah's blessings, warned them of punishment, and promised them forgiveness if they repented. However, only a few believed in his message.

When Allah informed Nuh (AS) that no more people would believe, He commanded him to build an ark. The people mocked him for building a ship on dry land, but Nuh (AS) continued with faith in Allah's command. When the great flood came, it destroyed all the disbelievers, while Nuh (AS) and the believers were saved in the ark along with pairs of every animal species.`,
      keyLessons: [
        'Patience and persistence in calling people to the truth',
        'Never give up on doing good, even when facing rejection',
        'Allah\'s help comes to those who remain steadfast',
        'The importance of following Allah\'s commands even when they seem strange',
        'Divine justice will eventually prevail'
      ],
      quranicReferences: [
        'Quran 71:1-28 - Nuh\'s call to his people',
        'Quran 11:25-49 - The story of the flood',
        'Quran 23:23-30 - Nuh\'s preaching and the ark',
        'Quran 54:9-17 - The flood as a sign for mankind'
      ],
      importantEvents: [
        '950 years of patient preaching to his people',
        'Various methods of calling people to Allah',
        'Building the ark by Allah\'s command',
        'The great flood that destroyed the disbelievers',
        'Salvation of believers and animal species',
        'New beginning for humanity after the flood'
      ],
      videoId: '75Tb6zDJAqA',
      videoTitle: 'Prophet Nuh (AS) - The Great Flood and Divine Justice',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      id: 'hud',
      name: 'Hud',
      arabicName: 'هود عليه السلام',
      title: 'The Warner to the People of Aad',
      period: 'After Prophet Nuh (AS)',
      location: 'Arabian Peninsula (Al-Ahqaf)',
      story: `Prophet Hud (AS) was sent to the people of Aad, who lived in the region of Al-Ahqaf in the Arabian Peninsula. The people of Aad were known for their physical strength, architectural skills, and prosperity, but they had become arrogant and turned away from Allah.

Hud (AS) called his people to worship Allah alone and abandon their idol worship. He reminded them of Allah's blessings upon them - their strength, their beautiful land, and their prosperity. However, the majority of his people rejected his message and mocked him, claiming that their gods would protect them.

When they persisted in their disbelief and arrogance, Allah sent a severe windstorm that lasted for seven nights and eight days, destroying the entire civilization except for Hud (AS) and the few believers who followed him. This serves as a powerful reminder that no matter how strong or advanced a civilization becomes, it cannot escape Allah's punishment if it turns away from His guidance.`,
      keyLessons: [
        'Arrogance and pride lead to destruction',
        'Physical strength and prosperity are tests from Allah',
        'The importance of gratitude for Allah\'s blessings',
        'Persistence in calling people to truth despite rejection',
        'Divine justice will eventually prevail over oppression'
      ],
      quranicReferences: [
        'Quran 7:65-72 - The story of Hud and the people of Aad',
        'Quran 11:50-60 - Detailed account of Hud\'s mission',
        'Quran 26:123-140 - Hud\'s call to his people',
        'Quran 46:21-26 - The destruction of Aad'
      ],
      importantEvents: [
        'Being sent to the prosperous people of Aad',
        'Calling his people to abandon idol worship',
        'Warning them about Allah\'s punishment',
        'Facing mockery and rejection from his people',
        'The great windstorm that destroyed Aad',
        'Salvation of Hud and the believers'
      ],
      videoId: 'HktWxYR5HRg',
      videoTitle: 'Prophet Hud (AS) - The Destruction of the Arrogant Aad',
      color: 'from-yellow-500 to-red-600'
    },
    {
      id: 'salih',
      name: 'Salih',
      arabicName: 'صالح عليه السلام',
      title: 'The Prophet with the Miraculous She-Camel',
      period: 'After Prophet Hud (AS)',
      location: 'Al-Hijr (Northern Arabia)',
      story: `Prophet Salih (AS) was sent to the people of Thamud, who lived in the rocky region of Al-Hijr in northern Arabia. The Thamud were skilled in carving homes and structures out of mountains and rocks, and they were prosperous and advanced in their civilization.

Like their predecessors, the people of Aad, the Thamud had turned to idol worship and became arrogant due to their skills and prosperity. Salih (AS) called them to worship Allah alone, but they demanded a miracle as proof of his prophethood.

Allah granted Salih (AS) a miraculous she-camel that emerged from a rock. This camel was a sign from Allah, and the people were warned not to harm it. The camel would drink from their well on alternate days, and on those days, the people could milk it for their needs. However, some of the arrogant leaders conspired and killed the camel. As a result, Allah's punishment came upon them in the form of a mighty earthquake and thunderbolt that destroyed their entire civilization, except for Salih (AS) and the believers.`,
      keyLessons: [
        'Miracles are signs from Allah that should increase faith',
        'Arrogance and defiance of Allah\'s signs lead to destruction',
        'The importance of respecting Allah\'s creation and signs',
        'Prosperity and skills are tests from Allah',
        'Divine warnings should be taken seriously'
      ],
      quranicReferences: [
        'Quran 7:73-79 - The story of Salih and Thamud',
        'Quran 11:61-68 - Salih\'s mission and the she-camel',
        'Quran 26:141-159 - The miraculous camel and its killing',
        'Quran 27:45-53 - The destruction of Thamud'
      ],
      importantEvents: [
        'Being sent to the skilled people of Thamud',
        'Calling them to abandon idol worship',
        'The miracle of the she-camel emerging from rock',
        'Warning the people not to harm the camel',
        'The conspiracy and killing of the miraculous camel',
        'Divine punishment through earthquake and thunderbolt'
      ],
      videoId: '2dYqwL6T2wc',
      videoTitle: 'Prophet Salih (AS) - The Miracle of the She-Camel',
      color: 'from-orange-500 to-red-600'
    },
    {
      id: 'ibrahim',
      name: 'Ibrahim (Abraham)',
      arabicName: 'إبراهيم عليه السلام',
      title: 'The Friend of Allah (Khalilullah)',
      period: 'Around 2000 BCE',
      location: 'Mesopotamia, Palestine, Mecca',
      story: `Prophet Ibrahim (AS) is known as Khalilullah (Friend of Allah) and is the father of prophets. Born in a society that worshipped idols, Ibrahim (AS) questioned these practices from a young age. Through reflection and divine guidance, he realized that Allah alone deserved worship.

When he destroyed the idols in his father's shop, the people became furious and decided to burn him alive. However, Allah commanded the fire to be cool and safe for Ibrahim (AS), demonstrating His power and protection of His faithful servant.

Ibrahim (AS) was tested in many ways - leaving his homeland, the command to sacrifice his son Ismail (AS), and establishing the foundations of the Kaaba in Mecca. In every test, he showed complete submission to Allah's will. His legacy continues through his sons Ismail and Ishaq (Isaac), from whom came many prophets including Muhammad (PBUH) and Isa (Jesus).`,
      keyLessons: [
        'Use reason and reflection to find the truth about Allah',
        'Stand firm for truth even when facing opposition',
        'Complete trust and submission to Allah\'s commands',
        'The importance of sincere worship and rejecting false gods',
        'Allah protects those who are sincere to Him'
      ],
      quranicReferences: [
        'Quran 21:51-70 - Ibrahim\'s opposition to idol worship',
        'Quran 37:99-113 - The sacrifice of Ismail',
        'Quran 2:124-129 - Ibrahim and the building of Kaaba',
        'Quran 6:74-83 - Ibrahim\'s search for the true God'
      ],
      importantEvents: [
        'Questioning and rejecting idol worship in his youth',
        'Destroying the idols and facing persecution',
        'Miraculous salvation from the fire',
        'Migration to different lands by Allah\'s command',
        'The test of sacrificing his son Ismail',
        'Building the Kaaba with Ismail in Mecca'
      ],
      videoId: 'EumXW3fCvWE',
      videoTitle: 'Prophet Ibrahim (AS) - The Friend of Allah and Father of Prophets',
      color: 'from-amber-500 to-orange-600'
    },
    {
      id: 'ismail',
      name: 'Ismail (Ishmael)',
      arabicName: 'إسماعيل عليه السلام',
      title: 'The Sacrificed Son and Father of Arabs',
      period: 'Son of Prophet Ibrahim (AS)',
      location: 'Mecca, Arabian Peninsula',
      story: `Prophet Ismail (AS) was the eldest son of Prophet Ibrahim (AS) and Hajar (Hagar). His story is one of complete submission to Allah's will and is commemorated annually during Hajj. When Ismail was still a child, Allah commanded Ibrahim to leave him and his mother in the barren valley of Mecca.

As Ismail grew up, Allah tested both father and son through a dream in which Ibrahim was commanded to sacrifice his beloved son. Both Ibrahim and Ismail showed complete submission to Allah's command. When Ibrahim was about to sacrifice his son, Allah replaced Ismail with a ram, as this was a test of their faith and obedience.

Ismail (AS) helped his father Ibrahim build the Kaaba, the first house of worship dedicated to Allah. He became a prophet himself and is considered the forefather of the Arab people. His descendants include Prophet Muhammad (PBUH). Ismail's life exemplifies patience, obedience, and complete trust in Allah's wisdom.`,
      keyLessons: [
        'Complete submission to Allah\'s will, even in difficult tests',
        'The importance of obedience to parents in righteous matters',
        'Trust in Allah\'s wisdom and perfect timing',
        'Building and maintaining places of worship',
        'Patience during trials and hardships'
      ],
      quranicReferences: [
        'Quran 37:99-113 - The sacrifice of Ismail',
        'Quran 2:125-129 - Building the Kaaba with Ibrahim',
        'Quran 14:35-41 - Ibrahim\'s prayer for his descendants',
        'Quran 19:54-55 - Ismail\'s truthfulness and devotion'
      ],
      importantEvents: [
        'Birth to Ibrahim and Hajar',
        'Being left in Mecca as a child with his mother',
        'The miracle of Zamzam water',
        'The test of sacrifice and Allah\'s intervention',
        'Helping Ibrahim build the Kaaba',
        'Becoming a prophet and father of Arab nations'
      ],
      videoId: 'jHg2FaAmDYY',
      videoTitle: 'Prophet Ismail (AS) - The Ultimate Test of Submission',
      color: 'from-green-500 to-teal-600'
    },
    {
      id: 'ishaq',
      name: 'Ishaq (Isaac)',
      arabicName: 'إسحاق عليه السلام',
      title: 'The Blessed Son and Father of Prophets',
      period: 'Son of Prophet Ibrahim (AS)',
      location: 'Palestine/Canaan',
      story: `Prophet Ishaq (AS) was the second son of Prophet Ibrahim (AS), born to his wife Sarah in their old age as a miraculous blessing from Allah. His birth was foretold by angels who visited Ibrahim, and Sarah laughed with joy when she received the glad tidings.

Ishaq (AS) grew up to be a righteous prophet, continuing his father's mission of calling people to worship Allah alone. He was blessed with two sons, Yaqub (Jacob) and Esau. Yaqub later became known as Israel and was also chosen as a prophet by Allah.

Ishaq (AS) lived a life of devotion to Allah, following in the footsteps of his father Ibrahim. He maintained the covenant with Allah and passed on the teachings of monotheism to his descendants. Through his lineage came many prophets, including Yaqub (AS), Yusuf (AS), Musa (AS), Dawud (AS), Sulaiman (AS), and Isa (AS). His life represents the fulfillment of Allah's promise to Ibrahim about making his descendants into great nations.`,
      keyLessons: [
        'Allah\'s promises are always fulfilled in His perfect timing',
        'The importance of continuing the mission of previous prophets',
        'Raising righteous children who follow Allah\'s guidance',
        'Maintaining the covenant and teachings of monotheism',
        'The blessing of being part of Allah\'s chosen lineage'
      ],
      quranicReferences: [
        'Quran 11:69-73 - The glad tidings of Ishaq\'s birth',
        'Quran 21:72-73 - Ishaq as a righteous leader',
        'Quran 37:112-113 - Allah\'s blessing upon Ishaq',
        'Quran 2:133 - Ishaq in the lineage of prophets'
      ],
      importantEvents: [
        'Miraculous birth to Ibrahim and Sarah in old age',
        'Angels giving glad tidings of his birth',
        'Growing up in a prophetic household',
        'Receiving prophethood and divine guidance',
        'Marriage and having righteous children',
        'Continuing Ibrahim\'s mission of monotheism'
      ],
      videoId: 'rh8vJY-axXk',
      videoTitle: 'Prophet Ishaq (AS) - The Blessed Son and Prophetic Legacy',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'shuaib',
      name: 'Shuaib',
      arabicName: 'شعيب عليه السلام',
      title: 'The Eloquent Speaker (Khatib al-Anbiya)',
      period: 'Contemporary of Prophet Musa (AS)',
      location: 'Madyan (Northwestern Arabia)',
      story: `Prophet Shuaib (AS) was sent to the people of Madyan, who were known for their dishonesty in trade and business dealings. They would cheat in weights and measures, give less than what was due, and take more than what they deserved. Despite their economic prosperity, they had become morally corrupt.

Shuaib (AS) was known as "Khatib al-Anbiya" (the Speaker of the Prophets) due to his eloquence and powerful speech. He called his people to worship Allah alone and to be honest and fair in their business dealings. He emphasized the importance of justice, honesty, and giving people their due rights.

However, the majority of his people rejected his message and threatened to expel him from their city. They were so attached to their dishonest practices that they couldn't accept the call to righteousness. Eventually, Allah's punishment came upon them in the form of a mighty earthquake and a day of overshadowing gloom that destroyed the entire community, except for Shuaib (AS) and those who believed in his message.`,
      keyLessons: [
        'Honesty and fairness in business dealings are essential',
        'Economic prosperity without moral values leads to destruction',
        'The importance of giving people their due rights',
        'Eloquent speech should be used to call people to truth',
        'Justice in society is a fundamental requirement'
      ],
      quranicReferences: [
        'Quran 7:85-93 - Shuaib\'s mission to Madyan',
        'Quran 11:84-95 - The call to honesty in trade',
        'Quran 26:176-191 - The people of the thicket',
        'Quran 29:36-37 - The destruction of Madyan'
      ],
      importantEvents: [
        'Being sent to the dishonest people of Madyan',
        'Calling them to worship Allah and be honest in trade',
        'Warning against cheating in weights and measures',
        'Facing rejection and threats of expulsion',
        'Divine punishment through earthquake and gloom',
        'Salvation of Shuaib and the believers'
      ],
      videoId: 'xqLwCD8Dvec',
      videoTitle: 'Prophet Shuaib (AS) - The Call to Honesty and Justice',
      color: 'from-teal-500 to-green-600'
    },
    {
      id: 'yusuf',
      name: 'Yusuf (Joseph)',
      arabicName: 'يوسف عليه السلام',
      title: 'The Truthful and Beautiful',
      period: 'Son of Prophet Yaqub (AS)',
      location: 'Canaan, then Egypt',
      story: `Prophet Yusuf (AS) was the beloved son of Prophet Yaqub (Jacob). His story, called "the best of stories" in the Quran, is filled with trials, patience, and ultimate triumph. As a young boy, Yusuf saw a dream of eleven stars, the sun, and moon prostrating to him, which his father interpreted as a sign of his future greatness.

His brothers, jealous of their father's love for Yusuf, plotted against him and threw him into a well. He was then sold into slavery in Egypt, where he served in the house of a nobleman. When the nobleman's wife tried to seduce him, Yusuf refused and was falsely accused and imprisoned.

In prison, Yusuf interpreted dreams for fellow prisoners, including the king's cupbearer. When the king had troubling dreams, Yusuf was called to interpret them, predicting seven years of abundance followed by seven years of famine. Impressed by his wisdom, the king appointed Yusuf as treasurer of Egypt. Eventually, his family came to Egypt during the famine, and Yusuf forgave his brothers, reuniting with his beloved father.`,
      keyLessons: [
        'Patience and trust in Allah during trials and hardships',
        'Maintaining moral integrity even when facing temptation',
        'Forgiveness and mercy toward those who wrong us',
        'Using our abilities and knowledge to serve others',
        'Allah\'s plans are always perfect, even when we don\'t understand them'
      ],
      quranicReferences: [
        'Quran 12:1-111 - The complete story of Yusuf',
        'Quran 12:3 - Called "the best of stories"',
        'Quran 12:21 - Yusuf\'s wisdom and knowledge',
        'Quran 12:90 - The reward for patience and righteousness'
      ],
      importantEvents: [
        'The prophetic dream of eleven stars, sun, and moon',
        'Being thrown into the well by his jealous brothers',
        'Sold into slavery and serving in Egypt',
        'Resisting temptation and being falsely imprisoned',
        'Interpreting the king\'s dreams and becoming treasurer',
        'Reunion with family and forgiveness of his brothers'
      ],
      videoId: 'OdqRnfVHob8',
      videoTitle: 'Prophet Yusuf (AS) - The Best of Stories',
      color: 'from-purple-500 to-indigo-600'
    },
    {
      id: 'ayyub',
      name: 'Ayyub (Job)',
      arabicName: 'أيوب عليه السلام',
      title: 'The Patient and Steadfast Servant',
      period: 'Ancient times',
      location: 'Land of Uz (possibly Jordan/Syria)',
      story: `Prophet Ayyub (AS) is renowned for his extraordinary patience and unwavering faith during severe trials. He was a wealthy man blessed with large flocks, vast lands, and a loving family. However, Allah tested him by taking away his wealth, health, and children, leaving him with a painful illness that lasted for years.

Despite losing everything he held dear and suffering from a debilitating disease, Ayyub (AS) never complained against Allah or lost his faith. His wife and friends sometimes urged him to curse Allah, but he remained steadfast, saying that if he could accept good times from Allah, he should also accept the difficult times.

His patience and continued worship during extreme hardship became legendary. Eventually, Allah restored his health, wealth, and family, giving him even more than he had before. Ayyub's story teaches us that trials are tests of faith, and those who remain patient and grateful will be rewarded by Allah both in this life and the hereafter.`,
      keyLessons: [
        'Patience during trials is a sign of strong faith',
        'Accept both good times and hardships as tests from Allah',
        'Never lose hope in Allah\'s mercy during difficulties',
        'Gratitude should be maintained even in suffering',
        'Allah rewards those who remain steadfast in faith'
      ],
      quranicReferences: [
        'Quran 21:83-84 - Ayyub\'s patience and Allah\'s mercy',
        'Quran 38:41-44 - Ayyub\'s prayer and restoration',
        'Quran 4:163 - Listed among the prophets',
        'Quran 6:84 - Among the righteous guided by Allah'
      ],
      importantEvents: [
        'Living as a prosperous and righteous man',
        'Losing wealth, health, and family as a test',
        'Maintaining faith despite severe illness',
        'Rejecting suggestions to curse Allah',
        'Making sincere dua for relief from suffering',
        'Allah\'s restoration of health, wealth, and family'
      ],
      videoId: 'wbx74Cfzy80',
      videoTitle: 'Prophet Ayyub (AS) - The Ultimate Example of Patience',
      color: 'from-gray-500 to-blue-600'
    },
    {
      id: 'dhulkifl',
      name: 'Dhul-kifl',
      arabicName: 'ذو الكفل عليه السلام',
      title: 'The Truthful and Patient',
      period: 'Ancient times',
      location: 'Mesopotamia/Babylon',
      story: `Prophet Dhul-kifl (AS) is mentioned in the Quran as one of the righteous and patient servants of Allah. While detailed stories about him are limited in Islamic sources, he is recognized as a prophet who was blessed with patience and righteousness.

According to Islamic tradition, Dhul-kifl (AS) was known for his commitment to justice and his ability to resolve disputes fairly among people. He was called "Dhul-kifl" which means "the one with a portion" or "the one who guarantees," possibly referring to his role in ensuring justice and taking responsibility for the welfare of his people.

He is mentioned alongside other patient prophets in the Quran, indicating that he faced trials and difficulties with remarkable steadfastness. His inclusion among the prophets in the Quran emphasizes the importance of patience, justice, and fulfilling one's responsibilities toward both Allah and humanity.`,
      keyLessons: [
        'Patience and steadfastness in fulfilling responsibilities',
        'The importance of justice and fair dealing',
        'Taking responsibility for the welfare of others',
        'Maintaining righteousness in all circumstances',
        'Being trustworthy and reliable in commitments'
      ],
      quranicReferences: [
        'Quran 21:85-86 - Listed among the patient ones',
        'Quran 38:48 - Mentioned with other righteous prophets'
      ],
      importantEvents: [
        'Being chosen as a prophet by Allah',
        'Demonstrating exceptional patience in trials',
        'Serving as a just leader among his people',
        'Fulfilling his responsibilities with dedication',
        'Being recognized for his righteousness',
        'Inclusion among the patient servants of Allah'
      ],
      videoId: '_KPFH13KxAc',
      videoTitle: 'Prophet Dhul-kifl (AS) - The Patient and Just Leader',
      color: 'from-purple-500 to-pink-600'
    },
    {
      id: 'yunus',
      name: 'Yunus (Jonah)',
      arabicName: 'يونس عليه السلام',
      title: 'The Companion of the Whale (Dhun-Nun)',
      period: 'Ancient times',
      location: 'Nineveh (Modern-day Iraq)',
      story: `Prophet Yunus (AS), also known as Dhun-Nun (Companion of the Whale), was sent to the people of Nineveh, a large city known for its wickedness and corruption. He called his people to worship Allah and abandon their evil ways, but they initially rejected his message.

Feeling frustrated with his people's rejection, Yunus (AS) left the city without Allah's permission, thinking that Allah's punishment would surely come upon them. He boarded a ship, but during the journey, a storm arose. The sailors cast lots to determine who was causing their misfortune, and the lot fell upon Yunus (AS).

He was thrown into the sea and was swallowed by a large whale. In the darkness of the whale's belly, Yunus (AS) realized his mistake and made sincere repentance to Allah, reciting the famous dua: "La ilaha illa anta, subhanaka, inni kuntu mina adh-dhalimin" (There is no god but You, glory be to You, indeed I was among the wrongdoers). Allah accepted his repentance and commanded the whale to release him. Meanwhile, his people had repented and believed, so Allah saved them from punishment.`,
      keyLessons: [
        'The importance of patience and not leaving one\'s mission',
        'Sincere repentance can lead to Allah\'s forgiveness',
        'Allah\'s mercy extends to all who turn to Him',
        'Sometimes apparent failure can lead to greater success',
        'The power of dua in times of distress'
      ],
      quranicReferences: [
        'Quran 37:139-148 - The story of Yunus and the whale',
        'Quran 21:87-88 - Yunus\'s dua and Allah\'s response',
        'Quran 10:98 - The belief of Yunus\'s people',
        'Quran 68:48-50 - Patience and Allah\'s choice'
      ],
      importantEvents: [
        'Being sent to the corrupt people of Nineveh',
        'Initial rejection of his message by the people',
        'Leaving the city without Allah\'s permission',
        'Being thrown into the sea and swallowed by whale',
        'Making sincere repentance in the whale\'s belly',
        'Being released and finding his people had believed'
      ],
      videoId: 'SVdMtINYIJY',
      videoTitle: 'Prophet Yunus (AS) - The Story of Repentance and Mercy',
      color: 'from-cyan-500 to-blue-600'
    },
    {
      id: 'musa',
      name: 'Musa (Moses)',
      arabicName: 'موسى عليه السلام',
      title: 'The Speaker with Allah (Kalimullah)',
      period: 'Around 1300 BCE',
      location: 'Egypt, Sinai Peninsula',
      story: `Prophet Musa (AS) was born during a time when Pharaoh was oppressing the Children of Israel. By Allah's plan, he was raised in Pharaoh's own palace. After accidentally killing an Egyptian who was oppressing an Israelite, Musa (AS) fled to Madyan where he married and lived as a shepherd.

Allah called Musa (AS) to prophethood at Mount Sinai, giving him miraculous signs including the staff that turned into a serpent and the hand that glowed white. He was commanded to go to Pharaoh and demand the release of the Children of Israel.

Despite witnessing clear miracles, Pharaoh refused to believe and continued his oppression. Allah sent various plagues upon Egypt, but Pharaoh's heart remained hardened. Finally, Musa (AS) led the Israelites out of Egypt. When Pharaoh pursued them, Allah parted the Red Sea for the believers and drowned Pharaoh and his army.`,
      keyLessons: [
        'Allah can use anyone for His purpose, regardless of their background',
        'Courage is needed to stand against oppression and injustice',
        'Miracles are signs from Allah to guide people to truth',
        'Arrogance and pride can blind people to the truth',
        'Allah always provides a way out for the oppressed'
      ],
      quranicReferences: [
        'Quran 28:1-43 - Musa\'s early life and call to prophethood',
        'Quran 7:103-162 - Confrontation with Pharaoh and the miracles',
        'Quran 20:9-98 - The story of Musa and the burning bush',
        'Quran 26:10-68 - Musa\'s mission to Pharaoh'
      ],
      importantEvents: [
        'Birth during Pharaoh\'s oppression of Israelites',
        'Being raised in Pharaoh\'s palace',
        'The incident that led to his flight to Madyan',
        'The call to prophethood at Mount Sinai',
        'Confronting Pharaoh with miraculous signs',
        'Leading the Exodus and the parting of the Red Sea'
      ],
      videoId: '-ZUsijg_vEQ',
      videoTitle: 'Prophet Musa (AS) - The Exodus and Liberation from Oppression',
      color: 'from-purple-500 to-indigo-600'
    },
    {
      id: 'hizqeel',
      name: 'Hizqeel (Ezekiel)',
      arabicName: 'حزقيال عليه السلام',
      title: 'The Prophet of Vision and Restoration',
      period: 'Around 6th century BCE',
      location: 'Babylon (Modern-day Iraq)',
      story: `Prophet Hizqeel (AS), known as Ezekiel in other traditions, was sent to the Children of Israel during their exile in Babylon. He was known for his powerful visions and prophecies about the restoration of Jerusalem and the Temple. His mission was to guide the exiled Israelites and give them hope during their darkest period.

Hizqeel (AS) received remarkable visions from Allah, including the famous vision of the valley of dry bones, which symbolized the spiritual resurrection of the nation of Israel. He taught his people about Allah's justice, mercy, and the importance of following His commandments even in exile.

His prophecies included detailed descriptions of the future Temple and the return of the Israelites to their homeland. He emphasized individual responsibility before Allah and the importance of sincere repentance. His teachings provided comfort and guidance to a displaced people, reminding them that Allah's promises are always fulfilled.`,
      keyLessons: [
        'Hope and faith must be maintained even in the darkest times',
        'Individual responsibility and accountability before Allah',
        'The importance of sincere repentance and turning back to Allah',
        'Allah\'s promises of restoration and mercy are always true',
        'Spiritual guidance is essential during times of trial and exile'
      ],
      quranicReferences: [
        'Quran 6:84 - Listed among the righteous prophets',
        'Quran 4:163 - Mentioned among the messengers',
        'Quran 21:85 - Among those who were patient'
      ],
      importantEvents: [
        'Receiving the call to prophethood during Babylonian exile',
        'The vision of the valley of dry bones',
        'Prophecies about the restoration of Jerusalem',
        'Teaching the exiled Israelites about Allah\'s justice',
        'Providing hope and guidance during national crisis',
        'Detailed visions of the future Temple'
      ],
      videoId: 'drahS-JcORc',
      videoTitle: 'Prophet Hizqeel (AS) - Visions of Hope and Restoration',
      color: 'from-violet-500 to-purple-600'
    },
    {
      id: 'elyas',
      name: 'Elyas (Elijah)',
      arabicName: 'إلياس عليه السلام',
      title: 'The Zealous Defender of Monotheism',
      period: 'Around 9th century BCE',
      location: 'Northern Kingdom of Israel',
      story: `Prophet Elyas (AS), known as Elijah in other traditions, was sent to the Children of Israel during a time when they had fallen into idol worship, particularly the worship of Baal. He was known for his unwavering commitment to monotheism and his powerful miracles that demonstrated Allah's supremacy over false gods.

Elyas (AS) challenged the prophets of Baal in a famous contest on Mount Carmel, where he called upon Allah to send fire from heaven to consume his sacrifice, while the prophets of Baal failed to get any response from their false deity. This miracle convinced many people to return to the worship of Allah alone.

He performed many miracles, including bringing rain after years of drought, multiplying food for a widow, and even raising her son from the dead. His life was marked by complete dedication to Allah's cause and fearless confrontation of those who promoted idol worship. According to Islamic tradition, he was taken up to heaven while still alive, similar to Prophet Isa (AS).`,
      keyLessons: [
        'Unwavering commitment to monotheism despite opposition',
        'The power of sincere prayer and trust in Allah',
        'Courage to stand against falsehood and idol worship',
        'Allah\'s miracles demonstrate His power over all creation',
        'Dedication to Allah\'s cause requires sacrifice and perseverance'
      ],
      quranicReferences: [
        'Quran 37:123-132 - The story of Elyas and his people',
        'Quran 6:85 - Listed among the righteous',
        'Quran 37:130 - Peace upon Elyas among all the worlds'
      ],
      importantEvents: [
        'Confronting the worship of Baal among Israelites',
        'The contest with Baal\'s prophets on Mount Carmel',
        'Calling down fire from heaven to prove Allah\'s power',
        'Bringing rain after years of drought through prayer',
        'Performing miracles of healing and resurrection',
        'Being taken up to heaven while still alive'
      ],
      videoId: 'CzLbTjT0dhY',
      videoTitle: 'Prophet Elyas (AS) - The Zealous Defender of Faith',
      color: 'from-red-500 to-pink-600'
    },
    {
      id: 'shammil',
      name: 'Shammil (Samuel)',
      arabicName: 'شمويل عليه السلام',
      title: 'The Prophet-Judge and Kingmaker',
      period: 'Around 11th century BCE',
      location: 'Ancient Israel',
      story: `Prophet Shammil (AS), known as Samuel in other traditions, was the last of the judges of Israel and the first of the prophets in the monarchical period. He was dedicated to Allah's service from childhood and grew up in the temple under the guidance of the priest Eli.

Shammil (AS) served as both prophet and judge, providing spiritual and legal guidance to the Children of Israel. When the people demanded a king to rule over them like other nations, Allah instructed Shammil to anoint Saul (Talut) as their first king, despite his own reservations about monarchy.

Later, when Saul disobeyed Allah's commands, Shammil was instructed to anoint David (Dawud) as the future king. Throughout his life, he emphasized the importance of obedience to Allah over human authority and warned against the dangers of following worldly desires over divine guidance.`,
      keyLessons: [
        'Dedication to Allah\'s service from an early age brings great blessings',
        'True leadership comes from Allah, not from human desires',
        'Obedience to Allah is more important than pleasing people',
        'Warning against the dangers of prioritizing worldly power',
        'The importance of seeking Allah\'s guidance in all decisions'
      ],
      quranicReferences: [
        'Quran 2:246-248 - The story of the Israelites asking for a king',
        'Quran 2:249-251 - The appointment of Talut as king',
        'Quran 4:163 - Listed among the messengers'
      ],
      importantEvents: [
        'Dedication to temple service from childhood',
        'Receiving the call to prophethood',
        'Serving as judge and spiritual leader of Israel',
        'Anointing Saul (Talut) as the first king',
        'Warning about the consequences of monarchy',
        'Later anointing David (Dawud) as future king'
      ],
      videoId: 'Under_construction',
      videoTitle: 'Prophet Shammil (AS) - The Last Judge and First Prophet-King Maker',
      color: 'from-indigo-500 to-blue-600'
    },
    {
      id: 'dawood',
      name: 'Dawood (David)',
      arabicName: 'داود عليه السلام',
      title: 'The Psalmist King',
      period: 'Around 1000 BCE',
      location: 'Kingdom of Israel',
      story: `Prophet Dawood (AS), known as David, was both a prophet and a king, blessed with a beautiful voice for praising Allah. He was given the Zabur (Psalms) and was known for his devotion to worship and his just rule over the Children of Israel.

As a young shepherd, Dawood defeated the giant Goliath (Jalut) with a single stone, demonstrating that victory comes from Allah, not from physical strength. He later became king and established Jerusalem as his capital, making it a center of worship and justice.

Dawood (AS) was blessed with a melodious voice that could move mountains and make birds join in his praise of Allah. He was also skilled in making armor and was known for his fair judgment in legal matters. His psalms continue to be recited as beautiful expressions of devotion to Allah.`,
      keyLessons: [
        'True strength comes from faith in Allah, not physical power',
        'Combining worldly leadership with spiritual devotion',
        'The importance of praising Allah with sincerity and beauty',
        'Justice and fairness are essential qualities of leadership',
        'Using one\'s talents and abilities to serve Allah and humanity'
      ],
      quranicReferences: [
        'Quran 21:78-80 - Dawood\'s wisdom and judgment',
        'Quran 34:10-11 - The mountains and birds praising with him',
        'Quran 38:17-26 - His patience and excellent service',
        'Quran 2:251 - Victory over Jalut (Goliath)'
      ],
      importantEvents: [
        'Defeating Goliath (Jalut) as a young shepherd',
        'Being chosen as king of Israel',
        'Receiving the Zabur (Psalms) from Allah',
        'Establishing Jerusalem as capital and center of worship',
        'Mountains and birds joining in his praise of Allah',
        'Demonstrating excellent judgment in legal matters'
      ],
      videoId: 'DA4-HNc8h_Y',
      videoTitle: 'Prophet Dawood (AS) - The Psalmist King and Warrior of Faith',
      color: 'from-yellow-500 to-orange-600'
    },
    {
      id: 'sulaiman',
      name: 'Sulaiman (Solomon)',
      arabicName: 'سليمان عليه السلام',
      title: 'The Wise King with Dominion over All Creation',
      period: 'Around 970-931 BCE',
      location: 'Kingdom of Israel',
      story: `Prophet Sulaiman (AS), son of Dawood (AS), was granted by Allah a kingdom unlike any other. He had dominion over humans, jinn, animals, and even the wind. His wisdom was legendary, and his court was a center of justice, learning, and magnificent architecture.

Sulaiman (AS) could understand the language of all creatures. The famous story of the hoopoe bird bringing news of the Queen of Sheba (Bilqis) demonstrates his unique relationship with the animal kingdom. He invited the Queen to Islam, and she eventually accepted the faith and married him.

He built the magnificent Temple in Jerusalem and was known for his fair judgment, including the famous case of two women claiming the same baby. His kingdom was prosperous and peaceful, and he used his wealth and power to worship Allah and spread His message. Despite his worldly success, he remained humble and devoted to Allah.`,
      keyLessons: [
        'True wisdom comes from Allah and should be used for justice',
        'Great power and wealth are tests that require humility',
        'Understanding and respecting all of Allah\'s creation',
        'Using worldly success to serve Allah and spread His message',
        'The importance of gratitude for Allah\'s countless blessings'
      ],
      quranicReferences: [
        'Quran 27:15-44 - The story of Sulaiman and Queen of Sheba',
        'Quran 21:78-82 - His wisdom and control over creation',
        'Quran 34:12-14 - The jinn working under his command',
        'Quran 38:30-40 - His devotion and Allah\'s blessings'
      ],
      importantEvents: [
        'Inheriting prophethood and kingdom from Dawood (AS)',
        'Being granted dominion over jinn, animals, and wind',
        'The famous judgment between two women and a baby',
        'Communication with the hoopoe and Queen of Sheba',
        'Building the magnificent Temple in Jerusalem',
        'Demonstrating gratitude and humility despite great power'
      ],
      videoId: 'TecXMOlJY7o',
      videoTitle: 'Prophet Sulaiman (AS) - The Wise King with Dominion over Creation',
      color: 'from-purple-500 to-indigo-600'
    },
    {
      id: 'shia',
      name: 'Shia (Isaiah)',
      arabicName: 'أشعياء عليه السلام',
      title: 'The Prophet of Comfort and Messianic Prophecies',
      period: 'Around 8th-7th century BCE',
      location: 'Kingdom of Judah',
      story: `Prophet Shia (AS), known as Isaiah in other traditions, was one of the major prophets sent to the Children of Israel. He prophesied during the reigns of several kings of Judah and was known for his powerful messages of both warning and comfort.

Shia (AS) warned the people about the consequences of their disobedience to Allah and their worship of idols. He prophesied about the coming destruction of Jerusalem due to the people's sins, but also gave them hope by promising Allah's mercy and eventual restoration.

His prophecies included detailed descriptions of the coming of a righteous servant of Allah who would bring justice and peace to the world. He emphasized the importance of social justice, caring for the poor and oppressed, and maintaining pure worship of Allah alone. His messages provided both warning and hope to his people.`,
      keyLessons: [
        'Balance between warning of consequences and offering hope',
        'The importance of social justice and caring for the oppressed',
        'Pure worship of Allah without associating partners',
        'Allah\'s mercy and forgiveness are always available to those who repent',
        'Prophecies of Allah always come to pass in His perfect timing'
      ],
      quranicReferences: [
        'Quran 4:163 - Listed among the messengers',
        'Quran 6:84 - Among the righteous guided by Allah',
        'Quran 21:85 - Listed among the patient ones'
      ],
      importantEvents: [
        'Receiving the call to prophethood in the Temple',
        'Warning the people of Judah about their disobedience',
        'Prophecies about the destruction and restoration of Jerusalem',
        'Messages about social justice and care for the poor',
        'Prophecies about the coming righteous servant',
        'Providing comfort and hope during difficult times'
      ],
      videoId: 'under_construction',
      videoTitle: 'Prophet Shia (AS) - The Prophet of Warning and Comfort',
      color: 'from-teal-500 to-cyan-600'
    },
    {
      id: 'aramaya',
      name: 'Aramaya (Jeremiah)',
      arabicName: 'إرميا عليه السلام',
      title: 'The Weeping Prophet',
      period: 'Around 7th-6th century BCE',
      location: 'Kingdom of Judah',
      story: `Prophet Aramaya (AS), known as Jeremiah in other traditions, was called the "Weeping Prophet" because of his deep sorrow over the sins of his people and the coming destruction of Jerusalem. He prophesied for over 40 years, warning the Children of Israel about the consequences of their disobedience.

Aramaya (AS) witnessed the destruction of Jerusalem and the Temple by the Babylonians, exactly as he had prophesied. Despite facing persecution, imprisonment, and rejection by his own people, he continued to deliver Allah's message with unwavering faithfulness.

His prophecies included not only warnings of destruction but also promises of restoration and a new covenant with Allah. He emphasized the importance of sincere repentance and turning back to Allah with the whole heart. His life exemplified complete dedication to Allah's mission despite personal suffering and rejection.`,
      keyLessons: [
        'Faithfulness to Allah\'s message despite persecution and rejection',
        'The importance of sincere repentance and turning to Allah',
        'Compassion and sorrow for those who reject Allah\'s guidance',
        'Perseverance in delivering Allah\'s message for decades',
        'Hope in Allah\'s promises of restoration and mercy'
      ],
      quranicReferences: [
        'Quran 4:163 - Listed among the messengers',
        'Quran 6:84 - Among the righteous guided by Allah',
        'Quran 21:85 - Listed among the patient ones'
      ],
      importantEvents: [
        'Receiving the call to prophethood at a young age',
        'Prophesying the destruction of Jerusalem for 40+ years',
        'Facing persecution and imprisonment for his message',
        'Witnessing the fulfillment of his prophecies',
        'Providing comfort and hope during the Babylonian exile',
        'Prophecies about the new covenant and restoration'
      ],
      videoId: 'Under_construction',
      videoTitle: 'Prophet Aramaya (AS) - The Faithful Warner and Weeping Prophet',
      color: 'from-gray-500 to-slate-600'
    },
    {
      id: 'daniel',
      name: 'Daniel',
      arabicName: 'دانيال عليه السلام',
      title: 'The Prophet of Dreams and Visions',
      period: 'Around 6th century BCE',
      location: 'Babylon (Modern-day Iraq)',
      story: `Prophet Daniel (AS) was among the noble youth of Israel taken into Babylonian captivity. Despite being in a foreign land with different customs and beliefs, he maintained his faith in Allah and refused to compromise his religious principles.

Daniel (AS) was blessed with the ability to interpret dreams and visions. He interpreted King Nebuchadnezzar's dreams, including the famous dream of the great statue representing different kingdoms. His interpretations always came true, demonstrating Allah's power and knowledge.

He and his companions (Shadrach, Meshach, and Abednego) refused to worship the golden idol and were thrown into a fiery furnace, but Allah protected them from harm. Later, Daniel was thrown into a den of lions for continuing to pray to Allah, but again Allah protected him. His life exemplified unwavering faith and trust in Allah despite extreme trials.`,
      keyLessons: [
        'Maintaining faith and principles even in hostile environments',
        'Allah protects those who remain faithful to Him',
        'The importance of regular prayer and worship regardless of circumstances',
        'Using Allah-given talents to serve His cause',
        'Trust in Allah\'s protection during times of persecution'
      ],
      quranicReferences: [
        'Quran 4:163 - Listed among the messengers',
        'Quran 6:84 - Among the righteous guided by Allah',
        'Quran 21:85 - Listed among the patient ones'
      ],
      importantEvents: [
        'Being taken into Babylonian captivity as a youth',
        'Refusing to eat forbidden food and maintaining dietary laws',
        'Interpreting King Nebuchadnezzar\'s dreams',
        'Surviving the fiery furnace with his companions',
        'Continuing to pray despite the king\'s prohibition',
        'Being protected in the lions\' den'
      ],
      videoId: 'Under_construction',
      videoTitle: 'Prophet Daniel (AS) - Faith and Protection in Babylon',
      color: 'from-amber-500 to-yellow-600'
    },
    {
      id: 'uzair',
      name: 'Uzair (Ezra)',
      arabicName: 'عزير عليه السلام',
      title: 'The Restorer of the Torah',
      period: 'Around 5th century BCE',
      location: 'Jerusalem and Babylon',
      story: `Prophet Uzair (AS), known as Ezra in other traditions, was a priest and scribe who played a crucial role in the restoration of Jewish religious life after the Babylonian exile. He was known for his deep knowledge of the Torah and his dedication to teaching Allah's law to the people.

According to Islamic tradition, Uzair (AS) was blessed with an extraordinary memory and was able to rewrite the Torah from memory after the original scrolls were lost or destroyed during the exile. This miraculous ability led some people to revere him excessively, which the Quran warns against.

He led a group of exiles back to Jerusalem and worked to rebuild not just the physical structures but also the spiritual and religious life of the community. He emphasized the importance of following Allah's law and maintaining the purity of worship. His efforts helped preserve the religious traditions and teachings for future generations.`,
      keyLessons: [
        'The importance of preserving and teaching Allah\'s revelations',
        'Dedication to rebuilding both physical and spiritual communities',
        'Warning against excessive reverence of religious leaders',
        'The value of knowledge and scholarship in serving Allah',
        'Leading by example in following Allah\'s commandments'
      ],
      quranicReferences: [
        'Quran 9:30 - Warning against excessive reverence',
        'Quran 4:163 - Listed among the messengers',
        'Quran 6:84 - Among the righteous guided by Allah'
      ],
      importantEvents: [
        'Studying and mastering the Torah during exile',
        'Leading exiles back to Jerusalem',
        'Rewriting the Torah from memory',
        'Rebuilding the Temple and religious institutions',
        'Teaching and interpreting Allah\'s law to the people',
        'Establishing religious reforms and practices'
      ],
      videoId: 'Under_construction',
      videoTitle: 'Prophet Uzair (AS) - The Scholar and Restorer of Divine Law',
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 'zakariyah',
      name: 'Zakariyah (Zacharias)',
      arabicName: 'زكريا عليه السلام',
      title: 'The Devoted Worshipper and Father of Yahya',
      period: 'Around 1st century BCE',
      location: 'Palestine',
      story: `Prophet Zakariyah (AS) was a righteous priest who served in the Temple and was the guardian of Maryam (Mary), the mother of Isa (AS). Despite his advanced age and his wife's barrenness, he prayed to Allah for a righteous heir who would continue his mission.

Allah answered his prayer and blessed him with a son, Yahya (John the Baptist), in his old age. When the angel gave him the good news, Zakariyah asked for a sign, and Allah made him unable to speak to people for three days except through gestures, while he could still praise Allah.

Zakariyah (AS) was known for his constant worship, humility, and dedication to serving Allah. He raised Yahya to be a righteous prophet and continued his own mission of calling people to Allah until his death. His life exemplifies the power of sincere prayer and trust in Allah's ability to grant what seems impossible.`,
      keyLessons: [
        'The power of sincere prayer and supplication to Allah',
        'Allah can grant what seems impossible to human understanding',
        'The importance of raising righteous children who serve Allah',
        'Constant worship and humility are signs of true faith',
        'Trust in Allah\'s wisdom and timing in answering prayers'
      ],
      quranicReferences: [
        'Quran 3:37-41 - Zakariyah\'s prayer and the birth of Yahya',
        'Quran 19:2-15 - Detailed account of his story',
        'Quran 21:89-90 - His prayer and Allah\'s response',
        'Quran 6:85 - Listed among the righteous'
      ],
      importantEvents: [
        'Serving as priest in the Temple',
        'Being appointed guardian of Maryam (Mary)',
        'Praying for a righteous heir despite old age',
        'Receiving the good news of Yahya\'s birth',
        'The miraculous sign of being unable to speak',
        'Raising Yahya as a righteous prophet'
      ],
      videoId: '77lCvOdq1dI',
      videoTitle: 'Prophet Zakariyah (AS) - The Power of Prayer and Divine Miracles',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'yahya',
      name: 'Yahya (John the Baptist)',
      arabicName: 'يحيى عليه السلام',
      title: 'The Forerunner and Witness to Truth',
      period: 'Around 1st century CE',
      location: 'Palestine',
      story: `Prophet Yahya (AS), son of Zakariyah (AS), was born as a miracle to elderly parents. From childhood, he was blessed with wisdom, knowledge of the scriptures, and a deep connection with Allah. He was known for his ascetic lifestyle and powerful preaching.

Yahya (AS) served as a forerunner to Isa (AS), preparing the people for his message. He called people to repentance, baptized them in the Jordan River, and fearlessly spoke against corruption and injustice, even when it involved powerful rulers.

His unwavering commitment to truth led to his martyrdom when he spoke against the unlawful marriage of King Herod. Despite his young age, Yahya (AS) demonstrated extraordinary courage, piety, and dedication to Allah's message. The Quran praises him as being dutiful to his parents and free from arrogance.`,
      keyLessons: [
        'Wisdom and righteousness can manifest from a young age',
        'Speaking truth against injustice requires great courage',
        'Simple living and asceticism can bring one closer to Allah',
        'Preparing others for Allah\'s message is a noble mission',
        'Martyrdom in the path of truth is the highest honor'
      ],
      quranicReferences: [
        'Quran 19:12-15 - His wisdom, piety, and righteousness',
        'Quran 3:39 - Confirming the word of Allah',
        'Quran 6:85 - Listed among the righteous',
        'Quran 21:90 - Among those who competed in good deeds'
      ],
      importantEvents: [
        'Miraculous birth to elderly parents',
        'Receiving wisdom and prophethood at a young age',
        'Preaching repentance and righteousness',
        'Baptizing people in the Jordan River',
        'Preparing the way for Prophet Isa (AS)',
        'Martyrdom for speaking truth against injustice'
      ],
      videoId: 'dSWu36q2mn8',
      videoTitle: 'Prophet Yahya (AS) - The Young Prophet and Martyr for Truth',
      color: 'from-cyan-500 to-blue-600'
    },
    {
      id: 'isa',
      name: 'Isa (Jesus)',
      arabicName: 'عيسى عليه السلام',
      title: 'The Messiah and Word of Allah',
      period: 'Around 0-33 CE',
      location: 'Palestine',
      story: `Prophet Isa (AS) was born miraculously to Maryam (Mary) without a father, by Allah's command. From his cradle, he spoke defending his mother's honor and declaring his prophethood. He was given the Gospel (Injeel) and performed many miracles by Allah's permission - healing the blind and lepers, bringing the dead back to life, and creating birds from clay.

Isa (AS) called the Children of Israel to worship Allah alone and follow the true teachings. However, many rejected his message, and some even plotted to kill him. When they attempted to crucify him, Allah saved Isa (AS) by raising him to the heavens, and made it appear to them that they had succeeded.

According to Islamic belief, Isa (AS) will return before the Day of Judgment to establish justice on Earth, defeat the false messiah (Dajjal), and unite humanity under the worship of Allah alone.`,
      keyLessons: [
        'Allah\'s power is absolute - He can create without normal means',
        'Miracles are signs from Allah, not proof of divinity',
        'True followers should worship Allah alone, not His messengers',
        'Patience is needed when facing rejection and persecution',
        'Allah protects His sincere servants from harm'
      ],
      quranicReferences: [
        'Quran 3:45-51 - The birth and mission of Isa',
        'Quran 5:110-120 - Isa\'s miracles and his people\'s response',
        'Quran 4:157-158 - The truth about the crucifixion',
        'Quran 19:16-34 - The story of Maryam and Isa\'s birth'
      ],
      importantEvents: [
        'Miraculous birth to Maryam without a father',
        'Speaking from the cradle to defend his mother',
        'Receiving the Gospel and beginning his mission',
        'Performing miracles by Allah\'s permission',
        'Facing rejection and persecution from his people',
        'Being raised to heaven by Allah before crucifixion'
      ],
      videoId: '5HNenkAD5hA',
      videoTitle: 'Prophet Isa (AS) - The Messiah and His Miraculous Life',
      color: 'from-rose-500 to-pink-600'
    },
    {
      id: 'muhammad',
      name: 'Muhammad',
      arabicName: 'محمد صلى الله عليه وسلم',
      title: 'The Final Messenger (Khatam an-Nabiyyin)',
      period: '570-632 CE',
      location: 'Arabian Peninsula',
      story: `Prophet Muhammad (PBUH) was born in Mecca in 570 CE. Known for his honesty and trustworthiness even before his prophethood, he was called "Al-Amin" (The Trustworthy). At age 40, while meditating in the cave of Hira, he received the first revelation from Allah through Angel Jibril (Gabriel).

His mission was to call humanity back to the worship of Allah alone and to perfect moral character. Despite facing severe persecution in Mecca, he and his followers remained steadfast. The migration (Hijra) to Medina marked a turning point, where the first Islamic state was established.

In just 23 years, the message of Islam spread throughout the Arabian Peninsula. The Prophet (PBUH) not only delivered Allah's final message but also demonstrated it through his perfect character and conduct. He is the final messenger, and his message is for all of humanity until the Day of Judgment.`,
      keyLessons: [
        'Perfect character and conduct are essential for a believer',
        'Patience and perseverance in the face of opposition',
        'The importance of community building and social justice',
        'Islam is a complete way of life, not just personal worship',
        'The message of Islam is universal and for all humanity'
      ],
      quranicReferences: [
        'Quran 96:1-5 - The first revelation',
        'Quran 33:40 - Muhammad as the final messenger',
        'Quran 68:4 - His excellent character',
        'Quran 21:107 - A mercy to all worlds'
      ],
      importantEvents: [
        'Birth in Mecca and early life as Al-Amin',
        'First revelation in the cave of Hira',
        'Beginning of the prophetic mission',
        'Persecution in Mecca and steadfastness of early Muslims',
        'The Hijra (migration) to Medina',
        'Establishment of the Islamic state and spread of Islam'
      ],
      videoId: 'CSd1oh3Wvik',
      videoTitle: 'Prophet Muhammad (PBUH) - The Final Messenger and Perfect Example',
      color: 'from-emerald-500 to-teal-600'
    }
  ];

  const handleProphetClick = (prophet: ProphetStory) => {
    setSelectedProphet(prophet);
    setActiveTab('story');
  };

  const closeProphetDetails = () => {
    setSelectedProphet(null);
  };

  if (selectedProphet) {
    return (
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className={`bg-gradient-to-r ${selectedProphet.color} text-white p-6 rounded-t-2xl`}>
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={closeProphetDetails}
              className="flex items-center px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Prophets
            </button>
            <div className="text-right">
              <div className="text-sm opacity-90">{selectedProphet.period}</div>
              <div className="text-sm opacity-90 flex items-center">
                <Globe className="w-4 h-4 mr-1" />
                {selectedProphet.location}
              </div>
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2">
              Prophet {selectedProphet.name}
            </h1>
            <div className="text-3xl font-arabic mb-3" dir="rtl">
              {selectedProphet.arabicName}
            </div>
            <p className="text-xl opacity-90">
              {selectedProphet.title}
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white dark:bg-gray-800 border-x border-gray-200 dark:border-gray-600">
          <div className="flex overflow-x-auto">
            {[
              { id: 'story', label: 'Prophet\'s Story', icon: BookOpen },
              { id: 'lessons', label: 'Key Lessons', icon: Star },
              { id: 'references', label: 'Quranic References', icon: BookOpen },
              { id: 'events', label: 'Important Events', icon: Clock },
              { id: 'video', label: 'Watch & Learn', icon: Play }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${activeTab === tab.id
                    ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400'
                  }`}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-gray-800 border-x border-b border-gray-200 dark:border-gray-600 rounded-b-2xl">
          <div className="p-8">
            {activeTab === 'story' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                  The Story of Prophet {selectedProphet.name}
                </h3>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                    {selectedProphet.story}
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'lessons' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                  Key Lessons from Prophet {selectedProphet.name}
                </h3>
                <div className="space-y-4">
                  {selectedProphet.keyLessons.map((lesson, index) => (
                    <div key={index} className="flex items-start p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                      <div className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-0.5 flex-shrink-0">
                        {index + 1}
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {lesson}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'references' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                  Quranic References
                </h3>
                <div className="space-y-4">
                  {selectedProphet.quranicReferences.map((reference, index) => (
                    <div key={index} className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border-l-4 border-amber-400">
                      <p className="text-gray-700 dark:text-gray-300">
                        {reference}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'events' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                  Important Events
                </h3>
                <div className="space-y-4">
                  {selectedProphet.importantEvents.map((event, index) => (
                    <div key={index} className="flex items-start">
                      <div className="w-4 h-4 bg-blue-500 rounded-full mr-4 mt-2 flex-shrink-0"></div>
                      <div className="flex-1">
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          {event}
                        </p>
                        {index < selectedProphet.importantEvents.length - 1 && (
                          <div className="w-px h-6 bg-blue-200 dark:bg-blue-800 ml-2 mt-2"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab === 'video' && (
              <div className="aspect-video rounded-lg mb-4 overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${selectedProphet.videoId}`}
                  title={selectedProphet.videoTitle || "Prophet Video"}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full rounded-lg shadow-md"
                ></iframe>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

return (
    <div className="max-w-7xl mx-auto">
      <Helmet>
        <title>Stories of Prophets - Complete Prophet Biographies | Qalam Verse</title>
        <meta name="description" content="Discover the complete stories of 31 Prophets in Islam. Learn about their lives, miracles, teachings, and lessons from Adam to Muhammad (PBUH) with Quranic references and historical context." />
        <meta name="keywords" content="Prophet Stories, Islamic Prophets, Prophet Biographies, Stories of Messengers, Islamic History, Prophet Muhammad, Prophet Moses, Prophet Jesus, Quranic Stories, muhammad sallallahu alaihi wasallam mother name, son of muhammad, children of muhammad, prophet muhammad father, story of prophet muhammad, muhammad saw ki jiban kahini, life story of prophet muhammad saw, 25 prophets of islam and their stories, saleh alaihissalam, musa alaihissalam, life story of popular 25 prophets, adam alahisslam ki lifestory" />
        <link rel="canonical" href="https://www.qalamverse.site/#/prophet-stories" />
      </Helmet>

      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
          Stories of the Prophets
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-lg max-w-3xl mx-auto">
          Discover the inspiring stories of Allah's messengers, their struggles, victories, and the timeless lessons they teach us
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {prophetStories.map((prophet) => (
          <button
            key={prophet.id}
            onClick={() => handleProphetClick(prophet)}
            className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-600 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 overflow-hidden"
          >
            <div className={`h-32 bg-gradient-to-r ${prophet.color} flex items-center justify-center`}>
              <div className="text-center text-white">
                <h3 className="text-xl font-bold mb-1">
                  Prophet {prophet.name}
                </h3>
                <div className="text-lg font-arabic" dir="rtl">
                  {prophet.arabicName}
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                {prophet.title}
              </h4>
              
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>{prophet.period}</span>
                </div>
                <div className="flex items-center">
                  <Globe className="w-4 h-4 mr-2" />
                  <span>{prophet.location}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                  <BookOpen className="w-4 h-4 mr-1" />
                  <span className="text-sm font-medium">Read Story</span>
                </div>
                <div className="text-xs text-gray-500">
                  {prophet.keyLessons.length} lessons
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-12 text-center">
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-gray-800 dark:to-gray-700 p-8 rounded-xl">
          <h3 className="text-2xl font-semibold text-emerald-800 dark:text-emerald-300 mb-4">
            Learn from the Best Examples
          </h3>
          <p className="text-emerald-700 dark:text-emerald-400 max-w-3xl mx-auto leading-relaxed">
            The stories of the prophets are not just historical accounts, but timeless lessons for humanity. 
            Each prophet faced unique challenges and demonstrated unwavering faith, patience, and dedication to Allah's message.
          </p>
          <blockquote className="mt-6 text-lg italic text-emerald-600 dark:text-emerald-400">
            "Indeed, in their stories there is a lesson for those of understanding." - Quran 12:111
          </blockquote>
        </div>
      </div>
    </div>
  );
}

export default ProphetStories;