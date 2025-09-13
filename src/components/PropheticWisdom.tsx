import React, { useState } from 'react';
import { Heart, Star, ArrowLeft, BookOpen, Lightbulb, Target, TrendingUp } from 'lucide-react';

interface PropheticWisdom {
  id: string;
  name: string;
  arabicName: string;
  title: string;
  introduction: string;
  keyTeachings: string[];
  hadithReferences: string[];
  practicalTips: string[];
  visualGuide: {
    type: 'journey' | 'lessons' | 'teachings' | 'legacy';
    title: string;
    description: string;
    elements: string[];
  };
  color: string;
}

function PropheticWisdom() {
  const [selectedProphet, setSelectedProphet] = useState<PropheticWisdom | null>(null);
  const [activeTab, setActiveTab] = useState('introduction');

  const propheticWisdom: PropheticWisdom[] = [
    {
      id: 'muhammad',
      name: 'Muhammad',
      arabicName: 'محمد صلى الله عليه وسلم',
      title: 'The Perfect Example for Humanity',
      introduction: `Prophet Muhammad (PBUH) is the final messenger of Allah and the perfect example for all humanity. His life demonstrates the highest standards of character, conduct, and spiritual excellence. Every aspect of his life - from his honesty in business to his compassion with family, from his justice as a leader to his humility in worship - provides guidance for Muslims in all situations.

The Prophet (PBUH) said: "I have been sent to perfect good character." His teachings encompass all aspects of human life: spiritual, social, economic, and political. He showed us how to balance our relationship with Allah, our families, our communities, and ourselves.

His wisdom is not just theoretical but practical, demonstrated through his actions and decisions throughout his 23-year prophetic mission. Following his example (Sunnah) is a source of blessing and guidance for believers until the Day of Judgment.`,
      keyTeachings: [
        'Perfect your character and treat all people with kindness and justice',
        'Balance your spiritual and worldly responsibilities',
        'Seek knowledge from the cradle to the grave',
        'Be honest and trustworthy in all your dealings',
        'Show mercy and compassion to all of Allah\'s creation',
        'Stand for justice even if it goes against your own interests',
        'Practice moderation in all aspects of life',
        'Maintain strong family bonds and fulfill your duties to relatives'
      ],
      hadithReferences: [
        'Sahih Bukhari: "The best of people are those who benefit others"',
        'Sahih Muslim: "None of you believes until he loves for his brother what he loves for himself"',
        'Tirmidhi: "The believer is not one who eats his fill while his neighbor goes hungry"',
        'Abu Dawud: "Whoever does not show mercy to people, Allah will not show mercy to him"',
        'Ibn Majah: "Seek knowledge, even if you have to go to China"'
      ],
      practicalTips: [
        'Start each day by remembering Allah and setting positive intentions',
        'Practice gratitude by counting your blessings regularly',
        'Be the first to greet others with "Assalamu Alaikum"',
        'Help those in need, even if it\'s just with a smile',
        'Keep your promises and be reliable in your commitments',
        'Forgive others quickly and don\'t hold grudges',
        'Spend time in reflection and self-improvement daily',
        'Maintain good relationships with family and neighbors'
      ],
      visualGuide: {
        type: 'legacy',
        title: 'The Eternal Legacy of Prophet Muhammad (PBUH)',
        description: 'The lasting impact of the Prophet\'s teachings on humanity',
        elements: [
          'Perfect Character Model',
          'Complete Life Guidance',
          'Social Justice System',
          'Spiritual Excellence',
          'Universal Brotherhood',
          'Knowledge & Wisdom',
          'Mercy to All Creation',
          'Final Divine Message'
        ]
      },
      color: 'from-emerald-500 to-teal-600'
    },
    {
      id: 'ibrahim',
      name: 'Ibrahim (Abraham)',
      arabicName: 'إبراهيم عليه السلام',
      title: 'The Friend of Allah and Father of Prophets',
      introduction: `Prophet Ibrahim (AS) is known as Khalilullah (Friend of Allah) and is revered as the father of prophets. His life is a testament to unwavering faith, complete submission to Allah, and the courage to stand for truth against all odds.

Ibrahim (AS) demonstrated perfect Tawheed (monotheism) by rejecting all forms of idol worship and dedicating his life entirely to Allah. His willingness to sacrifice his beloved son Ismail (AS) when commanded by Allah shows the highest level of submission and trust.

His teachings emphasize the importance of using reason to find Allah, standing firm for truth even when alone, and showing complete obedience to divine commands. The rituals of Hajj commemorate his legacy, and his prayers for his descendants continue to be answered through the prophets who came from his lineage.`,
      keyTeachings: [
        'Use your intellect and reasoning to recognize Allah\'s existence and oneness',
        'Stand for truth even if you have to stand alone',
        'Complete submission to Allah\'s will is the essence of faith',
        'Reject all forms of false worship and idolatry',
        'Trust in Allah\'s wisdom even when His commands seem difficult',
        'Hospitality and generosity are noble characteristics',
        'Make sincere dua for your family and future generations',
        'Build and maintain places of worship for Allah\'s remembrance'
      ],
      hadithReferences: [
        'Sahih Bukhari: "Ibrahim was neither a Jew nor a Christian, but he was a true Muslim"',
        'Sahih Muslim: "Every child is born upon fitrah (natural state of believing in Allah)"',
        'Tirmidhi: "The most beloved of people to Allah are those who are most beneficial to people"',
        'Abu Dawud: "Allah has made the world green and beautiful and appointed you as His stewards"'
      ],
      practicalTips: [
        'Question and reflect on the purpose of life and your relationship with Allah',
        'Stand up for what is right, even when it\'s unpopular',
        'Practice complete trust in Allah during difficult decisions',
        'Be generous and hospitable to guests and strangers',
        'Make regular dua for your family\'s guidance and well-being',
        'Avoid all forms of shirk (associating partners with Allah)',
        'Build your life around worship and remembrance of Allah',
        'Use your resources to establish good works that benefit others'
      ],
      visualGuide: {
        type: 'journey',
        title: 'Ibrahim\'s Spiritual Journey',
        description: 'The path from questioning to complete submission',
        elements: [
          'Questioning Idol Worship',
          'Discovering Allah through Reason',
          'Confronting His People',
          'Miraculous Salvation from Fire',
          'Migration for Allah\'s Sake',
          'Building the Kaaba',
          'The Ultimate Test of Sacrifice',
          'Legacy of Pure Monotheism'
        ]
      },
      color: 'from-amber-500 to-orange-600'
    },
    {
      id: 'musa',
      name: 'Musa (Moses)',
      arabicName: 'موسى عليه السلام',
      title: 'The Speaker with Allah and Liberator',
      introduction: `Prophet Musa (AS) is known as Kalimullah (the one who spoke with Allah) and is one of the most mentioned prophets in the Quran. His life exemplifies courage in the face of oppression, leadership in times of crisis, and unwavering commitment to justice.

Musa (AS) was chosen by Allah to liberate the Children of Israel from Pharaoh's tyranny and guide them to the Promised Land. Despite his initial hesitation due to his speech impediment, he became one of the most powerful speakers and leaders in history.

His teachings emphasize the importance of standing against oppression, trusting in Allah's power over all earthly authorities, and leading people with patience and wisdom. The Torah (Tawrat) was revealed to him, containing divine guidance for his people.`,
      keyTeachings: [
        'Stand courageously against oppression and injustice',
        'Trust in Allah\'s power over all earthly authorities',
        'Leadership requires patience, wisdom, and reliance on Allah',
        'Never underestimate your abilities when Allah chooses you for a task',
        'Seek Allah\'s help when facing seemingly impossible challenges',
        'Justice and freedom are divine rights that must be protected',
        'Miracles are signs from Allah to guide people to truth',
        'Gratitude to Allah should follow every blessing and victory'
      ],
      hadithReferences: [
        'Sahih Bukhari: "Whoever relieves a believer\'s distress, Allah will relieve his distress"',
        'Sahih Muslim: "Help your brother, whether he is an oppressor or oppressed"',
        'Tirmidhi: "The best jihad is a word of truth spoken before a tyrannical ruler"',
        'Abu Dawud: "Whoever among you sees a wrong action, let him change it with his hand"'
      ],
      practicalTips: [
        'Speak up against injustice even when it\'s difficult or dangerous',
        'Develop your communication skills to effectively convey truth',
        'Seek Allah\'s help and guidance before taking on leadership roles',
        'Be patient with people when guiding them to the right path',
        'Remember Allah\'s favors and express gratitude regularly',
        'Don\'t let personal limitations stop you from doing good',
        'Stand with the oppressed and work for their liberation',
        'Use whatever influence you have to promote justice and truth'
      ],
      visualGuide: {
        type: 'lessons',
        title: 'Key Lessons from Musa\'s Leadership',
        description: 'Essential principles for standing against oppression',
        elements: [
          'Courage Against Tyranny',
          'Divine Support for Justice',
          'Effective Communication',
          'Patient Leadership',
          'Miraculous Interventions',
          'Liberation of the Oppressed',
          'Gratitude in Victory',
          'Continuous Guidance'
        ]
      },
      color: 'from-purple-500 to-indigo-600'
    },
    {
      id: 'hizqeel',
      name: 'Hizqeel (Ezekiel)',
      arabicName: 'حزقيال عليه السلام',
      title: 'The Visionary Prophet',
      period: 'Around 6th century BCE',
      location: 'Babylon',
      introduction: 'Prophet Hizqeel (AS) was known for his powerful visions and ability to provide hope during the darkest times of exile. His wisdom centered on spiritual resurrection, individual responsibility, and maintaining faith during trials.',
      keyTeachings: [
        'Individual Accountability: Each person is responsible for their own actions before Allah',
        'Spiritual Resurrection: Just as dry bones can live again, hearts can be revived through faith',
        'Hope in Exile: Maintain faith and hope even when separated from home and comfort',
        'Divine Justice: Allah\'s justice is perfect and will ultimately prevail',
        'Prophetic Vision: Sometimes Allah shows us the future to strengthen our present faith'
      ],
      hadithReferences: [
        'The Prophet (PBUH) said: "Every soul will be held responsible for what it has earned." - Related to individual accountability',
        'The Prophet (PBUH) said: "Allah does not look at your bodies or your wealth, but He looks at your hearts and your deeds." - Sahih Muslim',
        'The Prophet (PBUH) said: "The believer is not one who eats his fill while his neighbor goes hungry." - Social responsibility'
      ],
      practicalTips: [
        'Take personal responsibility for your spiritual growth and actions',
        'During difficult times, remember that Allah can revive what seems dead',
        'Maintain regular prayer and dhikr even when away from familiar surroundings',
        'Help fellow believers who are going through trials and exile',
        'Study the Quran to understand Allah\'s promises of restoration'
      ],
      visualGuide: 'Prophet\'s Journey',
      color: 'from-violet-500 to-purple-600'
    },
    {
      id: 'elyas',
      name: 'Elyas (Elijah)',
      arabicName: 'إلياس عليه السلام',
      title: 'The Zealous Defender',
      period: 'Around 9th century BCE',
      location: 'Northern Israel',
      introduction: 'Prophet Elyas (AS) was known for his unwavering commitment to monotheism and his powerful confrontation of idol worship. His wisdom teaches us about courage, faith, and the power of sincere prayer.',
      keyTeachings: [
        'Monotheistic Zeal: Defend the oneness of Allah with unwavering commitment',
        'Courage Against Falsehood: Stand firm against idol worship and false beliefs',
        'Power of Prayer: Sincere supplication can bring miraculous results',
        'Divine Miracles: Allah demonstrates His power through His chosen servants',
        'Fearless Preaching: Deliver Allah\'s message regardless of opposition'
      ],
      hadithReferences: [
        'The Prophet (PBUH) said: "Whoever among you sees a wrong action, let him change it with his hand." - Sahih Muslim',
        'The Prophet (PBUH) said: "The supplication of a Muslim for his brother in his absence is readily accepted." - Sahih Muslim',
        'The Prophet (PBUH) said: "Nothing can change the Divine decree except dua." - Tirmidhi'
      ],
      practicalTips: [
        'Stand up against shirk and false beliefs in your community',
        'Make sincere dua during times of drought (spiritual or physical)',
        'Don\'t compromise your Islamic principles for social acceptance',
        'Use your influence to guide others toward monotheism',
        'Trust in Allah\'s power to demonstrate truth over falsehood'
      ],
      visualGuide: 'Key Lessons',
      color: 'from-red-500 to-pink-600'
    },
    {
      id: 'shammil',
      name: 'Shammil (Samuel)',
      arabicName: 'شمويل عليه السلام',
      title: 'The Prophet-Judge',
      period: 'Around 11th century BCE',
      location: 'Ancient Israel',
      introduction: 'Prophet Shammil (AS) served as both prophet and judge, bridging the gap between theocracy and monarchy. His wisdom focuses on divine authority, righteous leadership, and the dangers of worldly power.',
      keyTeachings: [
        'Divine Authority: True leadership comes from Allah, not human desires',
        'Righteous Judgment: Make decisions based on Allah\'s guidance, not personal preference',
        'Warning Against Worldliness: Beware of prioritizing worldly power over spiritual duty',
        'Early Dedication: Dedicate yourself to Allah\'s service from a young age',
        'Obedience to Allah: Divine commands take precedence over human wishes'
      ],
      hadithReferences: [
        'The Prophet (PBUH) said: "Each of you is a shepherd and each of you is responsible for his flock." - Sahih Bukhari',
        'The Prophet (PBUH) said: "Whoever Allah appoints as a leader and he does not advise them sincerely, he will not smell the fragrance of Paradise." - Sahih Muslim',
        'The Prophet (PBUH) said: "The just ruler will be brought on the Day of Judgment and placed on a pulpit of light." - Tirmidhi'
      ],
      practicalTips: [
        'Seek Allah\'s guidance before making important decisions',
        'Prioritize spiritual responsibilities over worldly ambitions',
        'Advise leaders with wisdom and sincerity',
        'Dedicate time daily for worship and spiritual reflection',
        'Remember that all authority ultimately belongs to Allah'
      ],
      visualGuide: 'Core Teachings',
      color: 'from-indigo-500 to-blue-600'
    },
    {
      id: 'dawood',
      name: 'Dawood (David)',
      arabicName: 'داود عليه السلام',
      title: 'The Psalmist King',
      period: 'Around 1000 BCE',
      location: 'Kingdom of Israel',
      introduction: 'Prophet Dawood (AS) combined worldly kingship with spiritual devotion. His wisdom teaches us about praising Allah, just leadership, and using our talents for divine service.',
      keyTeachings: [
        'Melodious Worship: Use your voice and talents to praise Allah beautifully',
        'Just Leadership: Combine worldly authority with spiritual responsibility',
        'Faith Over Strength: Victory comes from Allah, not physical power',
        'Artistic Devotion: Express your love for Allah through creative arts',
        'Humble Service: Use your skills and position to serve Allah and humanity'
      ],
      hadithReferences: [
        'The Prophet (PBUH) said: "Allah loves, when one of you does a job, that he does it with excellence." - Al-Bayhaqi',
        'The Prophet (PBUH) said: "Verily, Allah has written excellence upon all things." - Sahih Muslim',
        'The Prophet (PBUH) said: "The best of people are those who benefit others." - Ahmad'
      ],
      practicalTips: [
        'Develop your natural talents and use them to serve Allah',
        'Combine your worldly responsibilities with spiritual devotion',
        'Practice regular dhikr and praise of Allah',
        'Lead with justice and fairness in all your dealings',
        'Remember that true strength comes from faith, not physical ability'
      ],
      visualGuide: 'Legacy and Impact',
      color: 'from-yellow-500 to-orange-600'
    },
    {
      id: 'sulaiman',
      name: 'Sulaiman (Solomon)',
      arabicName: 'سليمان عليه السلام',
      title: 'The Wise King',
      period: 'Around 970-931 BCE',
      location: 'Kingdom of Israel',
      introduction: 'Prophet Sulaiman (AS) was granted unprecedented wisdom and dominion over all creation. His teachings focus on gratitude, justice, and using power responsibly.',
      keyTeachings: [
        'Divine Wisdom: True wisdom comes from Allah and should be used for justice',
        'Grateful Leadership: Use your blessings to serve Allah and benefit others',
        'Universal Communication: Respect and understand all of Allah\'s creation',
        'Magnificent Worship: Build and maintain beautiful places of worship',
        'Humble Power: Great authority requires even greater humility'
      ],
      hadithReferences: [
        'The Prophet (PBUH) said: "He who does not thank people, does not thank Allah." - Abu Dawud',
        'The Prophet (PBUH) said: "Whoever is given authority over the Muslims\' affairs and does not strive for their betterment, Allah will not let him smell the fragrance of Paradise." - Sahih Muslim',
        'The Prophet (PBUH) said: "The world is green and beautiful, and Allah has appointed you as His stewards over it." - Sahih Muslim'
      ],
      practicalTips: [
        'Express gratitude for every blessing, no matter how small',
        'Use your position and influence to help others',
        'Treat all of Allah\'s creation with respect and kindness',
        'Invest in building and maintaining places of worship',
        'Remain humble despite worldly success and recognition'
      ],
      visualGuide: 'Prophet\'s Journey',
      color: 'from-purple-500 to-indigo-600'
    },
    {
      id: 'shia',
      name: 'Shia (Isaiah)',
      arabicName: 'أشعياء عليه السلام',
      title: 'The Prophet of Comfort',
      period: 'Around 8th-7th century BCE',
      location: 'Kingdom of Judah',
      introduction: 'Prophet Shia (AS) balanced warnings of divine justice with messages of hope and comfort. His wisdom teaches us about social justice, pure worship, and Allah\'s mercy.',
      keyTeachings: [
        'Social Justice: Care for the poor, oppressed, and marginalized in society',
        'Pure Worship: Worship Allah alone without associating any partners',
        'Balanced Message: Combine warnings of consequences with hope and mercy',
        'Divine Mercy: Allah\'s forgiveness is always available to those who repent',
        'Prophetic Hope: Trust in Allah\'s promises of restoration and peace'
      ],
      hadithReferences: [
        'The Prophet (PBUH) said: "Whoever relieves a Muslim of a burden from the burdens of the world, Allah will relieve him of a burden from the burdens of the Hereafter." - Sahih Muslim',
        'The Prophet (PBUH) said: "The believer is not one who eats his fill while his neighbor goes hungry." - Al-Adab Al-Mufrad',
        'The Prophet (PBUH) said: "All the sons of Adam are sinners, but the best of sinners are those who repent." - Tirmidhi'
      ],
      practicalTips: [
        'Actively work to help the poor and oppressed in your community',
        'Maintain pure monotheistic worship without any shirk',
        'Balance your advice to others with both warning and encouragement',
        'Always offer hope and the possibility of Allah\'s forgiveness',
        'Trust in Allah\'s promises even during difficult times'
      ],
      visualGuide: 'Key Lessons',
      color: 'from-teal-500 to-cyan-600'
    },
    {
      id: 'aramaya',
      name: 'Aramaya (Jeremiah)',
      arabicName: 'إرميا عليه السلام',
      title: 'The Weeping Prophet',
      period: 'Around 7th-6th century BCE',
      location: 'Kingdom of Judah',
      introduction: 'Prophet Aramaya (AS) demonstrated unwavering faithfulness despite decades of rejection. His wisdom teaches us about perseverance, compassion, and sincere repentance.',
      keyTeachings: [
        'Faithful Perseverance: Continue delivering Allah\'s message despite rejection',
        'Compassionate Warning: Feel genuine sorrow for those who reject guidance',
        'Sincere Repentance: Turn to Allah with complete sincerity of heart',
        'Long-term Commitment: Serve Allah\'s cause for decades, not just moments',
        'Hope in Restoration: Trust in Allah\'s promises of mercy and renewal'
      ],
      hadithReferences: [
        'The Prophet (PBUH) said: "The example of the believers in their affection, mercy, and compassion for each other is that of a body. When a limb suffers, the whole body responds to it with wakefulness and fever." - Sahih Bukhari',
        'The Prophet (PBUH) said: "Whoever guides someone to virtue will be rewarded equivalent to him who practices that virtue." - Sahih Muslim',
        'The Prophet (PBUH) said: "The believer who mixes with people and bears their annoyance with patience will have a greater reward than the believer who does not mix with people." - Tirmidhi'
      ],
      practicalTips: [
        'Continue doing good even when others don\'t appreciate your efforts',
        'Feel genuine concern and compassion for those who are misguided',
        'Make sincere tawbah (repentance) regularly, not just during crises',
        'Commit to long-term service to Allah, not just temporary enthusiasm',
        'Maintain hope in Allah\'s mercy even during dark times'
      ],
      visualGuide: 'Core Teachings',
      color: 'from-gray-500 to-slate-600'
    },
    {
      id: 'daniel',
      name: 'Daniel',
      arabicName: 'دانيال عليه السلام',
      title: 'The Faithful in Exile',
      period: 'Around 6th century BCE',
      location: 'Babylon',
      introduction: 'Prophet Daniel (AS) maintained his faith and principles in a hostile environment. His wisdom teaches us about integrity, divine protection, and unwavering commitment to Allah.',
      keyTeachings: [
        'Principled Living: Maintain your Islamic values regardless of environment',
        'Divine Protection: Allah protects those who remain faithful to Him',
        'Regular Worship: Continue your prayers and worship despite opposition',
        'Interpreting Signs: Use Allah-given talents to serve His cause',
        'Courage in Faith: Stand firm in your beliefs even when threatened'
      ],
      hadithReferences: [
        'The Prophet (PBUH) said: "Whoever fears Allah, Allah will make a way out for him from every difficulty." - Related to Quran 65:2-3',
        'The Prophet (PBUH) said: "Be mindful of Allah and you will find Him before you." - Tirmidhi',
        'The Prophet (PBUH) said: "The strong believer is better and more beloved to Allah than the weak believer." - Sahih Muslim'
      ],
      practicalTips: [
        'Maintain your Islamic practices even in non-Muslim environments',
        'Trust that Allah will protect you when you stand for what\'s right',
        'Never compromise your prayer schedule for worldly convenience',
        'Use your skills and talents to demonstrate Islam\'s truth and beauty',
        'Be courageous in expressing your faith when challenged'
      ],
      visualGuide: 'Legacy and Impact',
      color: 'from-amber-500 to-yellow-600'
    },
    {
      id: 'uzair',
      name: 'Uzair (Ezra)',
      arabicName: 'عزير عليه السلام',
      title: 'The Scholar-Restorer',
      period: 'Around 5th century BCE',
      location: 'Jerusalem and Babylon',
      introduction: 'Prophet Uzair (AS) dedicated his life to preserving and teaching Allah\'s revelations. His wisdom focuses on scholarship, community building, and the importance of religious education.',
      keyTeachings: [
        'Preserving Knowledge: Dedicate yourself to learning and teaching Allah\'s revelations',
        'Community Restoration: Work to rebuild both physical and spiritual communities',
        'Avoiding Excess: Maintain proper respect without falling into extremism',
        'Educational Leadership: Lead by teaching and demonstrating Islamic principles',
        'Scholarly Devotion: Use your knowledge to serve Allah and benefit humanity'
      ],
      hadithReferences: [
        'The Prophet (PBUH) said: "Seek knowledge from the cradle to the grave." - Al-Bayhaqi',
        'The Prophet (PBUH) said: "The best of people are those who benefit others." - Ahmad',
        'The Prophet (PBUH) said: "Whoever teaches some knowledge will have the reward of the one who acts upon it, without that detracting from his reward in the slightest." - Ibn Majah'
      ],
      practicalTips: [
        'Dedicate time daily to studying and memorizing the Quran',
        'Teach Islamic knowledge to others in your community',
        'Work to strengthen Islamic institutions and communities',
        'Maintain balanced respect for scholars without excessive reverence',
        'Use your education and skills to serve the Muslim ummah'
      ],
      visualGuide: 'Prophet\'s Journey',
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: 'zakariyah',
      name: 'Zakariyah (Zacharias)',
      arabicName: 'زكريا عليه السلام',
      title: 'The Devoted Worshipper',
      period: 'Around 1st century BCE',
      location: 'Palestine',
      introduction: 'Prophet Zakariyah (AS) exemplified constant worship and sincere supplication. His wisdom teaches us about the power of prayer, patience, and trust in Allah\'s timing.',
      keyTeachings: [
        'Persistent Prayer: Continue making dua even when the answer seems impossible',
        'Constant Worship: Maintain regular worship and devotion throughout life',
        'Trusting Allah\'s Timing: Have faith that Allah answers prayers in perfect timing',
        'Righteous Parenting: Raise children to be servants of Allah',
        'Humble Service: Serve Allah and His creation with humility and dedication'
      ],
      hadithReferences: [
        'The Prophet (PBUH) said: "Nothing can change the Divine decree except dua." - Tirmidhi',
        'The Prophet (PBUH) said: "The supplication of a Muslim for his brother in his absence is readily accepted." - Sahih Muslim',
        'The Prophet (PBUH) said: "When a man dies, his deeds come to an end except for three things: ongoing charity, beneficial knowledge, or a righteous child who prays for him." - Sahih Muslim'
      ],
      practicalTips: [
        'Make sincere dua regularly, especially during times of need',
        'Maintain consistent worship habits regardless of your age',
        'Trust Allah\'s wisdom when prayers aren\'t answered immediately',
        'Focus on raising righteous children who will serve Allah',
        'Serve in your community with humility and dedication'
      ],
      visualGuide: 'Key Lessons',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'yahya',
      name: 'Yahya (John the Baptist)',
      arabicName: 'يحيى عليه السلام',
      title: 'The Young Prophet',
      period: 'Around 1st century CE',
      location: 'Palestine',
      introduction: 'Prophet Yahya (AS) demonstrated that age is no barrier to wisdom and righteousness. His teachings focus on courage, truth, and preparing others for Allah\'s message.',
      keyTeachings: [
        'Youthful Wisdom: Age is no barrier to receiving Allah\'s guidance and wisdom',
        'Courageous Truth: Speak truth against injustice regardless of consequences',
        'Simple Living: Live simply and focus on spiritual rather than material wealth',
        'Preparing Others: Help prepare people to receive Allah\'s guidance',
        'Martyrdom for Truth: Be willing to sacrifice everything for Allah\'s truth'
      ],
      hadithReferences: [
        'The Prophet (PBUH) said: "Whoever among you sees a wrong action, let him change it with his hand; if he cannot, then with his tongue; if he cannot, then with his heart - and that is the weakest of faith." - Sahih Muslim',
        'The Prophet (PBUH) said: "The best jihad is a word of truth spoken before a tyrannical ruler." - Abu Dawud',
        'The Prophet (PBUH) said: "The world is green and beautiful, and Allah has appointed you as His stewards over it." - Sahih Muslim'
      ],
      practicalTips: [
        'Don\'t let your young age prevent you from speaking truth and doing good',
        'Stand up against injustice even when it\'s difficult or dangerous',
        'Live simply and avoid excessive attachment to material possessions',
        'Help prepare others to receive and understand Islamic teachings',
        'Be willing to make sacrifices for the sake of Allah\'s truth'
      ],
      visualGuide: 'Core Teachings',
      color: 'from-cyan-500 to-blue-600'
    },
    {
      id: 'isa',
      name: 'Isa (Jesus)',
      arabicName: 'عيسى عليه السلام',
      title: 'The Messiah and Spirit of Allah',
      introduction: `Prophet Isa (AS) was born miraculously to Maryam (Mary) and is known as the Messiah (Al-Masih) and Ruh Allah (Spirit of Allah). His life demonstrates the power of Allah's will and the importance of spiritual purification and compassion.

Isa (AS) performed many miracles by Allah's permission, including healing the sick, giving sight to the blind, and bringing the dead back to life. However, he always emphasized that these were signs from Allah, not proof of his own divinity.

His teachings focus on love, compassion, forgiveness, and devotion to Allah. He called people to worship Allah alone and follow the path of righteousness. His message emphasized spiritual purification and caring for the poor and needy.`,
      keyTeachings: [
        'Worship Allah alone without associating any partners with Him',
        'Show compassion and mercy to all of Allah\'s creation',
        'Forgive others as you would want Allah to forgive you',
        'Care for the poor, sick, and needy in society',
        'Focus on spiritual purification and inner cleanliness',
        'Be humble despite any special abilities or blessings Allah gives you',
        'Miracles are signs from Allah, not reasons for pride or arrogance',
        'Prepare for the afterlife while fulfilling your duties in this world'
      ],
      hadithReferences: [
        'Sahih Bukhari: "Be merciful to others and you will receive mercy"',
        'Sahih Muslim: "Whoever is not merciful to people, Allah will not be merciful to him"',
        'Tirmidhi: "The most beloved of people to Allah are those most beneficial to people"',
        'Abu Dawud: "Whoever relieves a Muslim of distress, Allah will relieve him of distress"'
      ],
      practicalTips: [
        'Practice forgiveness even when others wrong you',
        'Regularly visit and help the sick and elderly',
        'Give charity to those in need without expecting recognition',
        'Focus on purifying your heart from negative emotions',
        'Be humble about your achievements and abilities',
        'Use any talents or skills you have to help others',
        'Spend time in prayer and spiritual reflection',
        'Treat everyone with kindness regardless of their status'
      ],
      visualGuide: {
        type: 'teachings',
        title: 'Core Teachings of Prophet Isa (AS)',
        description: 'Principles of compassion and spiritual excellence',
        elements: [
          'Pure Monotheism',
          'Universal Compassion',
          'Healing & Mercy',
          'Forgiveness',
          'Spiritual Purification',
          'Humility in Blessings',
          'Service to Humanity',
          'Preparation for Afterlife'
        ]
      },
      color: 'from-rose-500 to-pink-600'
    },
    {
      id: 'yusuf',
      name: 'Yusuf (Joseph)',
      arabicName: 'يوسف عليه السلام',
      title: 'The Truthful and Beautiful',
      introduction: `Prophet Yusuf (AS) is known for his exceptional beauty, both physical and spiritual, and his remarkable journey from slavery to leadership. His story, called "the most beautiful of stories" in the Quran, demonstrates patience in trials, forgiveness of those who wrong us, and trust in Allah's perfect timing.

Despite facing betrayal by his brothers, false accusations, and imprisonment, Yusuf (AS) never lost faith in Allah. His ability to interpret dreams and his wisdom in managing Egypt's resources during famine made him a beloved leader.

His teachings emphasize the importance of maintaining moral integrity in all circumstances, forgiving those who harm us, and recognizing that Allah can turn any difficulty into a blessing.`,
      keyTeachings: [
        'Maintain your moral integrity even in the most tempting situations',
        'Forgive those who wrong you and treat them with kindness',
        'Trust that Allah has a perfect plan even when you can\'t see it',
        'Use your talents and abilities to serve others and society',
        'Patience during trials leads to eventual success and honor',
        'Dreams and visions can be sources of divine guidance',
        'Leadership is a responsibility to serve and protect people',
        'Family bonds should be maintained despite past conflicts'
      ],
      hadithReferences: [
        'Sahih Bukhari: "Whoever conceals the faults of others, Allah will conceal his faults"',
        'Sahih Muslim: "The believer is not one who eats his fill while his neighbor is hungry"',
        'Tirmidhi: "The best of people are those who are most beneficial to others"',
        'Abu Dawud: "Whoever forgives and makes reconciliation, his reward is with Allah"'
      ],
      practicalTips: [
        'Stay away from situations that could lead to sin or temptation',
        'Practice forgiveness even when you have the power to take revenge',
        'Use your skills and knowledge to help your community',
        'Be patient during difficult times and trust Allah\'s wisdom',
        'Pay attention to your dreams and seek their proper interpretation',
        'Take leadership responsibilities seriously and serve with justice',
        'Maintain family relationships even after conflicts or disagreements',
        'Plan ahead and prepare for both good times and difficulties'
      ],
      visualGuide: {
        type: 'journey',
        title: 'Yusuf\'s Journey from Trial to Triumph',
        description: 'How patience and integrity lead to success',
        elements: [
          'Childhood Dreams',
          'Betrayal by Brothers',
          'Slavery in Egypt',
          'Temptation & Integrity',
          'False Imprisonment',
          'Dream Interpretation',
          'Rise to Leadership',
          'Family Reconciliation'
        ]
      },
      color: 'from-blue-500 to-cyan-600'
    },
    {
      id: 'idris',
      name: 'Idris (Enoch)',
      arabicName: 'إدريس عليه السلام',
      title: 'The First Scholar and Writer',
      introduction: `Prophet Idris (AS) was among the earliest prophets and is known as the first person to write with a pen. He was blessed with extensive knowledge of astronomy, mathematics, and divine wisdom. Allah raised him to a high station, and he is mentioned in the Quran as being among the patient and righteous servants.

Idris (AS) represents the perfect balance between spiritual devotion and intellectual pursuit. He spent his time in worship while also advancing human knowledge and civilization. His teachings emphasize the importance of seeking beneficial knowledge, using it to serve humanity, and maintaining constant remembrance of Allah.

His legacy shows us that true scholarship in Islam combines both religious knowledge and worldly sciences, all directed toward understanding Allah's creation and serving His purpose.`,
      keyTeachings: [
        'Seek beneficial knowledge that serves both this world and the hereafter',
        'Balance spiritual worship with intellectual pursuits',
        'Use your knowledge and skills to benefit humanity',
        'Maintain constant remembrance of Allah in all activities',
        'Be patient and persevere in learning and teaching',
        'Establish good practices that benefit future generations',
        'Combine theoretical knowledge with practical application',
        'Remember that all knowledge ultimately comes from Allah'
      ],
      hadithReferences: [
        'Sahih Muslim: "Seek knowledge, for seeking knowledge is worship"',
        'Tirmidhi: "The superiority of the learned over the devout worshipper is like my superiority over the least of you"',
        'Abu Dawud: "When a man dies, his deeds come to an end except for three: ongoing charity, beneficial knowledge, or a righteous child"',
        'Ibn Majah: "Seek knowledge from the cradle to the grave"'
      ],
      practicalTips: [
        'Dedicate time daily for both religious and beneficial worldly learning',
        'Teach others what you have learned, as teaching reinforces knowledge',
        'Use modern technology and tools to spread beneficial knowledge',
        'Always begin learning with Bismillah and seek Allah\'s guidance',
        'Apply what you learn in practical ways to help your community',
        'Maintain humility despite gaining knowledge and recognition',
        'Document and preserve beneficial knowledge for future generations',
        'Balance your time between worship, learning, and serving others'
      ],
      visualGuide: {
        type: 'teachings',
        title: 'Core Teachings of Prophet Idris (AS)',
        description: 'The foundation of Islamic scholarship and learning',
        elements: [
          'Divine Knowledge',
          'Written Wisdom',
          'Astronomical Sciences',
          'Mathematical Understanding',
          'Spiritual Devotion',
          'Teaching Others',
          'Practical Application',
          'Legacy Building'
        ]
      },
      color: 'from-indigo-500 to-purple-600'
    },
    {
      id: 'hud',
      name: 'Hud',
      arabicName: 'هود عليه السلام',
      title: 'The Warner Against Arrogance',
      introduction: `Prophet Hud (AS) was sent to the people of Aad, who were blessed with great physical strength and architectural skills but had become arrogant and oppressive. His mission teaches us about the dangers of pride and the importance of using our blessings responsibly.

Hud (AS) demonstrated remarkable patience and persistence in calling his people to the truth despite facing constant rejection and mockery. His approach was balanced - he reminded them of Allah's blessings while warning them of the consequences of their arrogance and idol worship.

His story provides timeless lessons about leadership, humility, and the proper use of power and resources. It shows us that no matter how advanced or powerful a civilization becomes, it cannot survive without moral foundations and submission to Allah.`,
      keyTeachings: [
        'Use your strength and abilities to serve Allah and help others',
        'Remain humble despite your achievements and blessings',
        'Persist in doing good even when facing rejection',
        'Remember that all power and strength come from Allah',
        'Build your civilization on moral and spiritual foundations',
        'Be grateful for Allah\'s blessings and use them wisely',
        'Stand against oppression and injustice in society',
        'Warn people with wisdom and patience, not harshness'
      ],
      hadithReferences: [
        'Sahih Bukhari: "Whoever humbles himself for Allah, Allah will elevate him"',
        'Sahih Muslim: "Pride is to reject the truth and look down upon people"',
        'Tirmidhi: "The most beloved of people to Allah are those most beneficial to people"',
        'Abu Dawud: "Allah does not look at your bodies or appearances, but He looks at your hearts and deeds"'
      ],
      practicalTips: [
        'Use your talents and skills to help those less fortunate',
        'Regularly remind yourself that all abilities come from Allah',
        'Stand up against injustice even when it\'s difficult',
        'Practice gratitude daily for your physical and mental abilities',
        'Be patient when advising others and don\'t give up easily',
        'Build your success on ethical and moral foundations',
        'Help create a just and compassionate society',
        'Remember that worldly power is temporary and will be questioned'
      ],
      visualGuide: {
        type: 'lessons',
        title: 'Key Lessons from Prophet Hud (AS)',
        description: 'Learning humility and responsibility in leadership',
        elements: [
          'Humble Leadership',
          'Grateful Heart',
          'Patient Persistence',
          'Moral Foundation',
          'Social Justice',
          'Wise Warning',
          'Divine Accountability',
          'Righteous Legacy'
        ]
      },
      color: 'from-yellow-500 to-red-600'
    },
    {
      id: 'salih',
      name: 'Salih',
      arabicName: 'صالح عليه السلام',
      title: 'The Prophet of Divine Signs',
      introduction: `Prophet Salih (AS) was sent to the people of Thamud, who were skilled in carving homes from mountains but had become arrogant and rebellious. His story centers around the miraculous she-camel, which served as a clear sign from Allah that his people ultimately rejected.

Salih (AS) teaches us about the importance of respecting Allah's signs and creation. His approach was to provide clear evidence of Allah's power while giving his people ample opportunity to repent and reform. The miraculous camel was not just a sign but also a test of their obedience and respect for Allah's creation.

His story emphasizes that when Allah provides clear signs and guidance, rejecting them leads to severe consequences. It also shows us the importance of environmental stewardship and treating Allah's creation with respect and care.`,
      keyTeachings: [
        'Respect and protect Allah\'s creation and the environment',
        'Recognize and appreciate the signs Allah shows you',
        'Use your skills and talents for righteous purposes',
        'Don\'t let worldly achievements make you arrogant',
        'Take divine warnings seriously and act upon them',
        'Treat animals and nature with kindness and care',
        'Stand firm for truth even when facing opposition',
        'Provide clear guidance and evidence when teaching others'
      ],
      hadithReferences: [
        'Sahih Bukhari: "Whoever is kind to the creatures of Allah, Allah is kind to him"',
        'Sahih Muslim: "There is a reward for serving any animate being"',
        'Abu Dawud: "The world is green and beautiful, and Allah has appointed you as His stewards"',
        'Tirmidhi: "Allah has prescribed excellence in everything"'
      ],
      practicalTips: [
        'Practice environmental conservation and avoid waste',
        'Be kind to animals and protect them from harm',
        'Look for Allah\'s signs in nature and reflect upon them',
        'Use your professional skills to benefit society and environment',
        'Take warnings about climate change and environmental damage seriously',
        'Teach others about the importance of environmental stewardship',
        'Support conservation efforts and sustainable practices',
        'Remember that you are a trustee of Allah\'s creation'
      ],
      visualGuide: {
        type: 'teachings',
        title: 'Core Teachings of Prophet Salih (AS)',
        description: 'Environmental stewardship and respect for Allah\'s signs',
        elements: [
          'Environmental Care',
          'Divine Signs Recognition',
          'Animal Welfare',
          'Sustainable Living',
          'Natural Resources',
          'Creation Respect',
          'Warning Heeded',
          'Stewardship Responsibility'
        ]
      },
      color: 'from-orange-500 to-red-600'
    },
    {
      id: 'ismail',
      name: 'Ismail (Ishmael)',
      arabicName: 'إسماعيل عليه السلام',
      title: 'The Obedient Son and Builder',
      introduction: `Prophet Ismail (AS) exemplifies complete obedience to Allah and respect for parents. His willingness to be sacrificed when his father Ibrahim received the divine command shows the highest level of submission and trust in Allah's wisdom.

Ismail (AS) also played a crucial role in building the Kaaba with his father, establishing the foundation for Islamic pilgrimage that continues today. His life demonstrates the importance of family cooperation in serving Allah and building lasting institutions for worship.

His teachings emphasize obedience, sacrifice, hard work, and the importance of building something that benefits future generations. Through his lineage came Prophet Muhammad (PBUH), making him a key figure in Islamic history.`,
      keyTeachings: [
        'Show complete obedience to Allah\'s commands',
        'Respect and obey your parents in righteous matters',
        'Be willing to sacrifice for Allah\'s sake',
        'Work hard to build lasting beneficial institutions',
        'Cooperate with family members in righteous projects',
        'Trust in Allah\'s wisdom even in difficult situations',
        'Build foundations that will benefit future generations',
        'Maintain strong family bonds and traditions'
      ],
      hadithReferences: [
        'Sahih Bukhari: "Paradise lies at the feet of your mother"',
        'Sahih Muslim: "The best of deeds is to bring happiness to your parents"',
        'Tirmidhi: "Whoever obeys his parents, Allah will be pleased with him"',
        'Abu Dawud: "When you build, build to last; when you plant, plant for the future"'
      ],
      practicalTips: [
        'Always prioritize obedience to Allah over personal desires',
        'Show respect and kindness to your parents daily',
        'Be willing to make sacrifices for your family and community',
        'Participate in building projects that benefit your community',
        'Work together with family members on meaningful projects',
        'Think long-term when making decisions and investments',
        'Maintain family traditions that bring you closer to Allah',
        'Teach your children the importance of obedience and sacrifice'
      ],
      visualGuide: {
        type: 'journey',
        title: 'Ismail\'s Journey of Obedience and Building',
        description: 'From sacrifice to construction of the sacred Kaaba',
        elements: [
          'Divine Test',
          'Complete Submission',
          'Parental Obedience',
          'Family Cooperation',
          'Sacred Construction',
          'Foundation Building',
          'Legacy Creation',
          'Prophetic Lineage'
        ]
      },
      color: 'from-green-500 to-teal-600'
    },
    {
      id: 'ishaq',
      name: 'Ishaq (Isaac)',
      arabicName: 'إسحاق عليه السلام',
      title: 'The Blessed Continuation',
      introduction: `Prophet Ishaq (AS) represents the fulfillment of Allah's promise and the continuation of prophetic lineage. Born to Ibrahim and Sarah in their old age, his birth was a miracle that demonstrated Allah's power over natural limitations.

Ishaq (AS) continued his father's mission of spreading monotheism and established a righteous lineage through which many prophets would come. His life shows us the importance of maintaining family traditions of faith and passing them on to future generations.

His teachings emphasize gratitude for Allah's blessings, the importance of raising righteous children, and maintaining the covenant with Allah across generations. He represents stability, continuity, and the faithful preservation of divine guidance.`,
      keyTeachings: [
        'Be grateful for Allah\'s miraculous blessings in your life',
        'Continue the righteous traditions of your predecessors',
        'Raise your children with strong Islamic values',
        'Maintain your covenant and relationship with Allah',
        'Pass on beneficial knowledge to future generations',
        'Show patience in fulfilling long-term responsibilities',
        'Build upon the foundation laid by previous generations',
        'Trust in Allah\'s promises and perfect timing'
      ],
      hadithReferences: [
        'Sahih Bukhari: "Every child is born upon fitrah (natural state of faith)"',
        'Sahih Muslim: "When a person dies, his deeds come to an end except for three: ongoing charity, beneficial knowledge, or a righteous child who prays for him"',
        'Tirmidhi: "The best gift a parent can give their child is good education and moral training"',
        'Abu Dawud: "Command your children to pray when they are seven years old"'
      ],
      practicalTips: [
        'Teach your children Islamic values from an early age',
        'Continue the good traditions established by your parents',
        'Be patient in long-term projects that benefit future generations',
        'Express daily gratitude for the blessings in your family',
        'Maintain regular family prayers and Islamic practices',
        'Document and preserve your family\'s Islamic heritage',
        'Support Islamic education and institutions in your community',
        'Make dua regularly for your parents and children'
      ],
      visualGuide: {
        type: 'legacy',
        title: 'The Blessed Legacy of Prophet Ishaq (AS)',
        description: 'Continuing prophetic traditions across generations',
        elements: [
          'Miraculous Birth',
          'Prophetic Lineage',
          'Family Traditions',
          'Covenant Maintenance',
          'Righteous Children',
          'Knowledge Transfer',
          'Faith Continuity',
          'Divine Promise'
        ]
      },
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'shuaib',
      name: 'Shuaib',
      arabicName: 'شعيب عليه السلام',
      title: 'The Eloquent Speaker and Business Ethics Teacher',
      introduction: `Prophet Shuaib (AS) was known as "Khatib al-Anbiya" (the Speaker of the Prophets) due to his exceptional eloquence. He was sent to the people of Madyan who were dishonest in their business dealings, cheating in weights and measures.

Shuaib (AS) established the fundamental principles of business ethics in Islam. His teachings emphasize honesty, fairness, and justice in all commercial transactions. He showed that economic prosperity must be built on moral foundations to be sustainable and blessed by Allah.

His approach combined powerful speech with practical guidance, showing us how to effectively communicate important messages while providing concrete solutions to social problems. His legacy teaches us that true success in business comes through ethical practices and divine blessing.`,
      keyTeachings: [
        'Maintain complete honesty in all business dealings',
        'Give people their full rights and don\'t cheat in measurements',
        'Use eloquent and persuasive speech to promote good',
        'Build economic success on ethical foundations',
        'Speak against corruption and dishonest practices',
        'Combine spiritual guidance with practical solutions',
        'Stand for justice even when it affects your business',
        'Remember that Allah is watching all your transactions'
      ],
      hadithReferences: [
        'Sahih Bukhari: "The truthful and trustworthy merchant will be with the prophets, the truthful, and the martyrs"',
        'Sahih Muslim: "Allah has mercy on the person who is easy-going when he sells, buys, and asks for payment"',
        'Tirmidhi: "The two parties in a business transaction have the right to cancel it as long as they have not separated"',
        'Ibn Majah: "Whoever cheats us is not one of us"'
      ],
      practicalTips: [
        'Always be honest about the quality and quantity of your products',
        'Use accurate weights and measures in all transactions',
        'Develop your communication skills to effectively convey important messages',
        'Speak out against corruption and unethical practices in your workplace',
        'Build your business reputation on trust and reliability',
        'Treat customers fairly regardless of their social status',
        'Seek Allah\'s blessing in your business through honest practices',
        'Educate others about Islamic business ethics'
      ],
      visualGuide: {
        type: 'teachings',
        title: 'Core Teachings of Prophet Shuaib (AS)',
        description: 'Islamic business ethics and eloquent communication',
        elements: [
          'Honest Trading',
          'Fair Measurements',
          'Eloquent Speech',
          'Business Ethics',
          'Social Justice',
          'Economic Morality',
          'Trust Building',
          'Divine Blessing'
        ]
      },
      color: 'from-teal-500 to-green-600'
    },
    {
      id: 'ayyub',
      name: 'Ayyub (Job)',
      arabicName: 'أيوب عليه السلام',
      title: 'The Master of Patience and Gratitude',
      introduction: `Prophet Ayyub (AS) is the ultimate example of patience (sabr) in Islamic tradition. Despite losing his wealth, health, and family, he never complained against Allah or lost his faith. His story teaches us how to maintain our relationship with Allah during the most difficult trials.

Ayyub (AS) shows us that true faith is not dependent on external circumstances but on our inner connection with Allah. His patience was not passive resignation but active trust in Allah's wisdom and continued worship despite suffering.

His teachings emphasize that trials are tests of faith, opportunities for spiritual growth, and means of purification. His example shows us how to turn suffering into spiritual strength and how to emerge from difficulties with even stronger faith.`,
      keyTeachings: [
        'Maintain patience and faith during severe trials',
        'Accept both good times and hardships as tests from Allah',
        'Never lose hope in Allah\'s mercy during difficulties',
        'Continue worshipping Allah regardless of your circumstances',
        'Be grateful for what remains when you lose something',
        'Trust that Allah\'s wisdom is perfect even when you don\'t understand',
        'Use trials as opportunities for spiritual growth',
        'Remember that this life\'s difficulties are temporary'
      ],
      hadithReferences: [
        'Sahih Bukhari: "No fatigue, disease, sorrow, sadness, hurt, or distress befalls a Muslim, not even if it were the prick he receives from a thorn, but that Allah expiates some of his sins for that"',
        'Sahih Muslim: "How wonderful is the affair of the believer, for his affairs are all good"',
        'Tirmidhi: "The greatest reward comes with the greatest trial"',
        'Abu Dawud: "Whoever Allah wants good for, He tests him"'
      ],
      practicalTips: [
        'Practice gratitude daily, especially during difficult times',
        'Maintain your prayers and dhikr even when you\'re suffering',
        'Seek support from righteous friends and family during trials',
        'Remember that every difficulty is followed by ease',
        'Use your experiences to help others going through similar trials',
        'Make sincere dua but also accept Allah\'s decree',
        'Focus on what you can control and leave the rest to Allah',
        'See trials as opportunities to draw closer to Allah'
      ],
      visualGuide: {
        type: 'journey',
        title: 'Ayyub\'s Journey Through Trial to Triumph',
        description: 'The path of patience leading to divine reward',
        elements: [
          'Blessed Beginning',
          'Severe Testing',
          'Unwavering Faith',
          'Continued Worship',
          'Patient Endurance',
          'Divine Mercy',
          'Complete Restoration',
          'Eternal Example'
        ]
      },
      color: 'from-gray-500 to-blue-600'
    },
    {
      id: 'dhulkifl',
      name: 'Dhul-kifl',
      arabicName: 'ذو الكفل عليه السلام',
      title: 'The Guarantor of Justice',
      introduction: `Prophet Dhul-kifl (AS) is mentioned in the Quran among the patient and righteous servants of Allah. His name means "the one who guarantees" or "the one with a portion," indicating his role as someone who took responsibility for ensuring justice and fulfilling commitments.

Dhul-kifl (AS) represents the importance of reliability, trustworthiness, and taking responsibility for the welfare of others. His inclusion among the patient prophets suggests that he faced significant challenges while maintaining his commitment to justice and righteousness.

His teachings emphasize the importance of being dependable, fulfilling your promises, and taking responsibility for the welfare of your community. He shows us that leadership is about service and guarantee of justice for all.`,
      keyTeachings: [
        'Be reliable and trustworthy in all your commitments',
        'Take responsibility for the welfare of others',
        'Ensure justice and fairness in all your dealings',
        'Be patient when fulfilling difficult responsibilities',
        'Keep your promises no matter how challenging',
        'Stand as a guarantor for truth and righteousness',
        'Serve your community with dedication and integrity',
        'Maintain righteousness even under pressure'
      ],
      hadithReferences: [
        'Sahih Bukhari: "The signs of a hypocrite are three: when he speaks, he lies; when he promises, he breaks his promise; and when he is entrusted with something, he betrays that trust"',
        'Sahih Muslim: "Whoever guarantees what is between his jaws and what is between his legs, I guarantee Paradise for him"',
        'Tirmidhi: "The believer is not one who eats his fill while his neighbor goes hungry"',
        'Abu Dawud: "Each of you is a shepherd and each of you is responsible for his flock"'
      ],
      practicalTips: [
        'Always keep your promises and commitments',
        'Take responsibility for those under your care',
        'Be a reliable person that others can depend on',
        'Stand up for justice even when it\'s difficult',
        'Help resolve disputes fairly in your community',
        'Be patient when fulfilling long-term responsibilities',
        'Guarantee the rights of those who cannot protect themselves',
        'Build a reputation for trustworthiness and integrity'
      ],
      visualGuide: {
        type: 'teachings',
        title: 'Core Teachings of Prophet Dhul-kifl (AS)',
        description: 'Responsibility, reliability, and guaranteed justice',
        elements: [
          'Reliable Character',
          'Promise Keeping',
          'Justice Guarantee',
          'Community Service',
          'Patient Leadership',
          'Trustworthy Dealings',
          'Righteous Responsibility',
          'Welfare Assurance'
        ]
      },
      color: 'from-purple-500 to-pink-600'
    },
    {
      id: 'yunus',
      name: 'Yunus (Jonah)',
      arabicName: 'يونس عليه السلام',
      title: 'The Repentant and Forgiven',
      introduction: `Prophet Yunus (AS), known as Dhun-Nun (Companion of the Whale), teaches us about the power of sincere repentance and Allah's infinite mercy. His experience in the whale's belly became a symbol of hope for all who seek Allah's forgiveness.

Yunus (AS) initially left his mission in frustration, but his experience taught him patience and complete reliance on Allah. His famous dua from the depths of the whale has become one of the most powerful supplications for those in distress.

His story shows us that even prophets can make mistakes, but sincere repentance leads to Allah's forgiveness and mercy. It also demonstrates that Allah's mercy can reach us in the darkest and most hopeless situations.`,
      keyTeachings: [
        'Never despair of Allah\'s mercy no matter how grave your situation',
        'Sincere repentance can transform any situation',
        'Be patient with your mission and don\'t abandon it hastily',
        'Turn to Allah in times of distress with complete humility',
        'Remember that Allah\'s mercy is greater than any sin',
        'Use your experiences of forgiveness to help others',
        'Maintain hope even in the darkest circumstances',
        'Acknowledge your mistakes and seek Allah\'s forgiveness'
      ],
      hadithReferences: [
        'Sahih Bukhari: "All the sons of Adam are sinners, but the best of sinners are those who repent"',
        'Sahih Muslim: "Allah is more pleased with the repentance of His servant than one of you would be with finding his camel"',
        'Tirmidhi: "The supplication of Dhun-Nun when he was in the belly of the whale was: \'There is no god but You, glory be to You, indeed I was among the wrongdoers\'"',
        'Ibn Majah: "Whoever says this dua, Allah will answer him"'
      ],
      practicalTips: [
        'Make sincere tawbah (repentance) regularly, especially after mistakes',
        'Use Yunus\'s dua when you\'re in distress or difficulty',
        'Never give up on people or situations too quickly',
        'Help others who are seeking forgiveness and redemption',
        'Remember Allah\'s mercy when you feel overwhelmed by guilt',
        'Be patient with long-term projects and commitments',
        'Turn every difficulty into an opportunity for spiritual growth',
        'Share your experiences of Allah\'s mercy to inspire others'
      ],
      visualGuide: {
        type: 'journey',
        title: 'Yunus\'s Journey from Despair to Hope',
        description: 'The transformative power of repentance and divine mercy',
        elements: [
          'Initial Mission',
          'Hasty Departure',
          'Divine Test',
          'Depths of Despair',
          'Sincere Repentance',
          'Divine Mercy',
          'Second Chance',
          'Successful Mission'
        ]
      },
      color: 'from-cyan-500 to-blue-600'
    },
    {
      id: 'sulaiman',
      name: 'Sulaiman (Solomon)',
      arabicName: 'سليمان عليه السلام',
      title: 'The Wise King',
      introduction: `Prophet Sulaiman (AS) was blessed with extraordinary wisdom, wealth, and power. He could communicate with animals and jinn, and his kingdom was the most magnificent in history. Despite these incredible blessings, he remained humble and grateful to Allah.

Sulaiman (AS) is famous for his wise judgments, his magnificent temple, and his just rule over a vast kingdom. He used his power and resources to serve Allah and benefit his people, never letting worldly success corrupt his faith.

His teachings emphasize the importance of wisdom in leadership, gratitude for Allah's blessings, and using power and wealth responsibly. He showed that true success comes from combining worldly achievements with spiritual excellence.`,
      keyTeachings: [
        'True wisdom comes from Allah and should be sought through prayer',
        'Use your blessings and abilities to serve Allah and help others',
        'Power and wealth are tests that require constant gratitude and humility',
        'Justice and fairness should guide all your decisions and judgments',
        'Seek knowledge and understanding in all aspects of life',
        'Build and maintain what benefits society and future generations',
        'Recognize Allah\'s hand in all your successes and achievements',
        'Balance worldly responsibilities with spiritual obligations'
      ],
      hadithReferences: [
        'Sahih Bukhari: "Whoever Allah wants good for, He gives him understanding of religion"',
        'Sahih Muslim: "The world is green and beautiful, and Allah has appointed you as His stewards"',
        'Tirmidhi: "The best of people are those who are most beneficial to others"',
        'Abu Dawud: "Allah loves, when one of you does a job, that he does it with excellence"'
      ],
      practicalTips: [
        'Pray for wisdom and understanding in your decisions',
        'Use your talents and resources to benefit your community',
        'Practice gratitude daily for all the blessings in your life',
        'Make fair and just decisions in your personal and professional life',
        'Continuously seek knowledge and self-improvement',
        'Invest in projects that will benefit future generations',
        'Remember Allah in times of success and prosperity',
        'Balance your worldly pursuits with spiritual growth'
      ],
      visualGuide: {
        type: 'legacy',
        title: 'The Wise Legacy of Prophet Sulaiman (AS)',
        description: 'How to use blessings responsibly and wisely',
        elements: [
          'Divine Wisdom',
          'Just Leadership',
          'Magnificent Buildings',
          'Communication with Creation',
          'Grateful Heart',
          'Balanced Life',
          'Service to People',
          'Spiritual Excellence'
        ]
      },
      color: 'from-yellow-500 to-amber-600'
    }
  ];

  const handleProphetClick = (prophet: PropheticWisdom) => {
    setSelectedProphet(prophet);
    setActiveTab('introduction');
  };

  const closeProphetDetails = () => {
    setSelectedProphet(null);
  };

  const renderVisualGuide = (guide: PropheticWisdom['visualGuide']) => {
    const getIcon = (type: string) => {
      switch (type) {
        case 'journey': return TrendingUp;
        case 'lessons': return Lightbulb;
        case 'teachings': return BookOpen;
        case 'legacy': return Star;
        default: return BookOpen;
      }
    };

    const Icon = getIcon(guide.type);

    return (
      <div>
        <div className="flex items-center mb-6">
          <Icon className="w-8 h-8 text-emerald-600 dark:text-emerald-400 mr-3" />
          <div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
              {guide.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {guide.description}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {guide.elements.map((element, index) => (
            <div key={index} className="flex items-center p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
              <div className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 flex-shrink-0">
                {index + 1}
              </div>
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                {element}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
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
              { id: 'introduction', label: 'Introduction', icon: BookOpen },
              { id: 'teachings', label: 'Key Teachings', icon: Star },
              { id: 'references', label: 'Hadith References', icon: BookOpen },
              { id: 'tips', label: 'Practical Tips', icon: Target },
              { id: 'visual', label: 'Visual Guide', icon: Lightbulb }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
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
            {activeTab === 'introduction' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                  Introduction to Prophet {selectedProphet.name}
                </h3>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                    {selectedProphet.introduction}
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'teachings' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                  Key Teachings from Prophet {selectedProphet.name}
                </h3>
                <div className="space-y-4">
                  {selectedProphet.keyTeachings.map((teaching, index) => (
                    <div key={index} className="flex items-start p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                      <div className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-0.5 flex-shrink-0">
                        {index + 1}
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {teaching}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'references' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                  Hadith References
                </h3>
                <div className="space-y-4">
                  {selectedProphet.hadithReferences.map((reference, index) => (
                    <div key={index} className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border-l-4 border-amber-400">
                      <p className="text-gray-700 dark:text-gray-300">
                        {reference}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'tips' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                  Practical Tips
                </h3>
                <div className="space-y-4">
                  {selectedProphet.practicalTips.map((tip, index) => (
                    <div key={index} className="flex items-start p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-0.5 flex-shrink-0">
                        {index + 1}
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {tip}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'visual' && renderVisualGuide(selectedProphet.visualGuide)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
          Prophetic Wisdom
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-lg max-w-3xl mx-auto">
          Learn from the teachings and wisdom of Allah's messengers. Discover practical guidance for modern life based on prophetic examples.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {propheticWisdom.map((prophet) => (
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
              <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                {prophet.title}
              </h4>
              
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-2" />
                  <span>{prophet.keyTeachings.length} Key Teachings</span>
                </div>
                <div className="flex items-center">
                  <Target className="w-4 h-4 mr-2" />
                  <span>{prophet.practicalTips.length} Practical Tips</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                  <Heart className="w-4 h-4 mr-1" />
                  <span className="text-sm font-medium">Learn Wisdom</span>
                </div>
                <div className="text-xs text-gray-500 capitalize">
                  {prophet.visualGuide.type} Guide
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-12 text-center">
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-gray-800 dark:to-gray-700 p-8 rounded-xl">
          <h3 className="text-2xl font-semibold text-emerald-800 dark:text-emerald-300 mb-4">
            Timeless Wisdom for Modern Life
          </h3>
          <p className="text-emerald-700 dark:text-emerald-400 max-w-3xl mx-auto leading-relaxed">
            The teachings of the prophets provide practical guidance for every aspect of life. 
            Their wisdom transcends time and culture, offering solutions to modern challenges through divine guidance.
          </p>
          <blockquote className="mt-6 text-lg italic text-emerald-600 dark:text-emerald-400">
            "Indeed, in the Messenger of Allah you have a good example to follow." - Quran 33:21
          </blockquote>
        </div>
      </div>
    </div>
  );
}

export default PropheticWisdom;