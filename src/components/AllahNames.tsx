import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Search, Book, Heart, Play, Volume2, VolumeX, ChevronLeft, ChevronRight, Filter, Star, Bookmark, Copy, Share2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Allah Names Data - Complete 99 Names
interface AsmaName {
    id: number;
    arabic: string;
    transliteration: string;
    english: string;
    meaning: string;
    description: string; // More detailed
    detailedBenefits: {
        spiritual: string[];
        physical: string[];
        worldly: string[];
        recitationGuidance: string[];
    };
    quranicReferences: string[];
    hadithReferences?: string[]; // NEW
    duas?: string[]; // NEW
    historicalContext?: string; // NEW
    contemporaryRelevance?: string; // NEW
}

const allahNamesData: AsmaName[] = [
    // REPLACE your current objects with detailed ones like this:
    {
        id: 1,
        arabic: "الرَّحْمَنُ",
        transliteration: "Ar-Rahman",
        english: "The Beneficent",
        meaning: "The Most Compassionate",
        description: "He who wills goodness and mercy for all His creatures. Ar-Rahman encompasses Allah's universal mercy that extends to all of creation - believers and non-believers alike. This mercy is evident in the sustenance He provides, the air we breathe, and countless blessings.",
        detailedBenefits: {
            spiritual: [
                "Recite 100 times after Fajr prayer for enhanced spiritual awareness",
                "Regular recitation softens the heart and increases compassion",
                "Opens doors of divine mercy and forgiveness",
                "Develops empathy for all of Allah's creation"
            ],
            physical: [
                "Helps in healing emotional wounds and trauma",
                "Brings peace to an anxious mind",
                "Aids in recovery from depression and mental distress"
            ],
            worldly: [
                "Increases mercy and kindness in relationships",
                "Brings harmony in family life",
                "Attracts compassionate treatment from others"
            ],
            recitationGuidance: [
                "Best times: After Fajr prayer, before sleep",
                "Recommended count: 100-1000 times daily",
                "Combine with seeking forgiveness for enhanced effect"
            ]
        },
        quranicReferences: ["Quran 1:3", "Quran 17:110", "Quran 19:18"],
        hadithReferences: [
            "Allah will not be merciful to those who are not merciful to people. - Bukhari",
            "He is not of us who does not show mercy to our young ones - Abu Dawud"
        ],
        duas: [
            "رَبِّ اغْفِرْ لِي وَارْحَمْنِي - My Lord, forgive me and have mercy on me",
            "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً - Our Lord, give us good in this world"
        ]
    },
    {
        id: 2,
        arabic: "الرَّحِيْمُ",
        transliteration: "Ar-Raheem",
        english: "The Merciful",
        meaning: "The Most Merciful",
        description: "He who acts with extreme kindness, especially towards the believers. While Ar-Rahman represents Allah's universal mercy, Ar-Raheem is His specific mercy reserved for the believers and the righteous. This mercy grants forgiveness, guides to righteousness, and provides comfort in distress.",
        detailedBenefits: {
            spiritual: [
                "Complete forgiveness of sins through regular recitation",
                "Purifies the heart from spiritual diseases and ailments",
                "Increases acceptance of tawbah (repentance)",
                "Strengthens connection with Allah's special mercy",
                "Protection from Allah's wrath and divine punishment"
            ],
            physical: [
                "Healing properties for chronic and serious illnesses",
                "Brings comfort and relief during physical pain",
                "Aids in recovery from mental health issues"
            ],
            worldly: [
                "Merciful treatment from authorities and people in power",
                "Forgiveness from those who have been wronged",
                "Success in seeking pardons and legal clemency",
                "Peaceful resolution of conflicts and disputes"
            ],
            recitationGuidance: [
                "Recite 100 times after each obligatory prayer",
                "Especially beneficial when seeking forgiveness",
                "Combine with Istighfar for maximum spiritual benefit",
                "Recite during times of difficulty or trials"
            ]
        },
        quranicReferences: ["Quran 1:3", "Quran 2:37", "Quran 2:54"],
        hadithReferences: [
            "The merciful will be shown mercy by the Merciful. Be merciful to those on earth, and the One in heaven will be merciful to you - Tirmidhi",
            "Whoever recites Ar-Raheem 100 times daily, Allah will make people love him - Traditional"
        ],
        duas: [
            "اللَّهُمَّ أَنْتَ الرَّحِيمُ فَارْحَمْنِي - O Allah, You are Ar-Raheem, so have mercy on me",
            "رَبِّ إِنِّي ظَلَمْتُ نَفْسِي فَاغْفِرْ لِي - My Lord, I have wronged myself, so forgive me"
        ]
    },

    {
        id: 3,
        arabic: "الْمَلِكُ",
        transliteration: "Al-Malik",
        english: "The King",
        meaning: "The Sovereign Lord",
        description: "The One with complete dominion whose sovereignty is absolute and perfect. Al-Malik owns everything in existence and His kingship is free from any deficiency. He grants authority to whom He wills and takes it away according to His wisdom.",
        detailedBenefits: {
            spiritual: [
                "Develops complete submission to Allah's authority",
                "Strengthens belief in divine sovereignty",
                "Removes spiritual pride and arrogance",
                "Increases humility before the ultimate King"
            ],
            physical: [
                "Grants dignity and noble bearing",
                "Increases self-confidence and leadership qualities",
                "Helps overcome fear and anxiety"
            ],
            worldly: [
                "Respect and honor among people",
                "Leadership opportunities and authority",
                "Protection from oppression and injustice",
                "Success in governance and management"
            ],
            recitationGuidance: [
                "Recite 100 times for leadership and authority",
                "Best time: Before important meetings or decisions",
                "Combine with seeking guidance for leadership roles",
                "Reflect on Allah's absolute kingship while reciting"
            ]
        },
        quranicReferences: ["Quran 59:23", "Quran 62:1", "Quran 20:114"],
        hadithReferences: [
            "The most beloved names to Allah are Abdullah and Abdul Rahman - Bukhari",
            "Leadership is a trust, and on the Day of Judgment it will be a source of humiliation - Muslim"
        ],
        duas: [
            "اللَّهُمَّ مَالِكَ الْمُلْكِ - O Allah, Owner of Sovereignty",
            "رَبِّ اشْرَحْ لِي صَدْرِي - My Lord, expand my chest for me"
        ]
    },

    {
        id: 4,
        arabic: "الْقُدُّوسُ",
        transliteration: "Al-Quddus",
        english: "The Holy",
        meaning: "The Most Sacred",
        description: "The One who is absolutely pure from any imperfection, deficiency, or need. Al-Quddus is free from all limitations of creation and is exalted above having partners, children, or any attributes of created beings. His holiness is absolute and perfect.",
        detailedBenefits: {
            spiritual: [
                "Purifies the heart from sins and spiritual impurities",
                "Removes evil thoughts and negative influences",
                "Increases piety, righteousness, and God-consciousness",
                "Strengthens spiritual connection and devotion"
            ],
            physical: [
                "Cleanses the body from toxins and impurities",
                "Promotes physical and mental cleanliness",
                "Aids in overcoming addictions and bad habits"
            ],
            worldly: [
                "Purifies intentions and motivations",
                "Attracts pure and righteous companions",
                "Success in maintaining halal lifestyle",
                "Protection from corrupt environments"
            ],
            recitationGuidance: [
                "Recite after ritual purification (wudu)",
                "Best for spiritual cleansing: 100 times daily",
                "Combine with seeking purification from sins",
                "Recite when seeking to quit bad habits"
            ]
        },
        quranicReferences: ["Quran 59:23", "Quran 62:1"],
        hadithReferences: [
            "Allah is pure and accepts only what is pure - Muslim",
            "Cleanliness is half of faith - Muslim"
        ],
        duas: [
            "اللَّهُمَّ طَهِّرْ قَلْبِي - O Allah, purify my heart",
            "سُبْحَانَ رَبِّيَ الْأَعْلَى - Glory be to my Lord, the Most High"
        ]
    },

    {
        id: 5,
        arabic: "السَّلاَمُ",
        transliteration: "As-Salam",
        english: "The Source of Peace",
        meaning: "The Flawless",
        description: "The One who is free from every imperfection and defect. As-Salam is the source of all peace and safety, granting security and tranquility to His creation. From Him comes all peace, and to Him belongs perfect peace.",
        detailedBenefits: {
            spiritual: [
                "Brings inner peace and spiritual tranquility",
                "Removes anxiety, worry, and mental disturbance",
                "Grants safety from spiritual dangers and temptations",
                "Increases contentment and satisfaction with Allah's decree"
            ],
            physical: [
                "Healing for mental and emotional ailments",
                "Relief from stress, depression, and anxiety disorders",
                "Promotes restful sleep and physical relaxation"
            ],
            worldly: [
                "Peace in family relationships and social interactions",
                "Safety from enemies, conflicts, and disputes",
                "Success in mediation and conflict resolution",
                "Protection during travel and in dangerous situations"
            ],
            recitationGuidance: [
                "Recite 100 times before sleep for peaceful rest",
                "Best for anxiety relief: after each prayer",
                "Combine with deep breathing for maximum effect",
                "Recite during times of conflict for resolution"
            ]
        },
        quranicReferences: ["Quran 59:23"],
        hadithReferences: [
            "The believer is one from whom people's lives and property are safe - Bukhari",
            "Spread peace among you - Bukhari"
        ],
        duas: [
            "اللَّهُمَّ أَنْتَ السَّلاَمُ وَمِنْكَ السَّلاَمُ - O Allah, You are As-Salam and from You comes peace",
            "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً - Our Lord, give us good in this world"
        ]
    },
    {
        id: 6,
        arabic: "الْمُؤْمِنُ",
        transliteration: "Al-Mu'min",
        english: "The Inspirer of Faith",
        meaning: "The Giver of Security",
        description: "The One who witnessed for Himself that no one is God but Him and testified to His believers that they are truthful in their belief. Al-Mu'min is the source of all faith, security, and peace. He grants safety to those who believe and protects them from spiritual and physical harm.",
        detailedBenefits: {
            spiritual: [
                "Strengthens faith and removes doubts from the heart",
                "Increases certainty in Islamic beliefs and practices",
                "Protects from spiritual temptations and evil influences",
                "Develops trust and reliance on Allah in all matters"
            ],
            physical: [
                "Provides security and protection from physical harm",
                "Grants courage and removes fear from dangerous situations",
                "Helps overcome anxiety and panic disorders"
            ],
            worldly: [
                "Ensures safety during travel and in unfamiliar places",
                "Protects from accidents, theft, and worldly dangers",
                "Builds trust and credibility among people",
                "Success in security-related professions"
            ],
            recitationGuidance: [
                "Recite 100 times daily for enhanced faith",
                "Best time: Before traveling or facing fears",
                "Combine with seeking protection from all harms",
                "Recite when feeling spiritually weak or doubtful"
            ]
        },
        quranicReferences: ["Quran 59:23"],
        hadithReferences: [
            "The believer is one from whom people's lives and property are safe - Bukhari",
            "Faith has over seventy branches, the highest of which is saying 'There is no god but Allah' - Muslim"
        ],
        duas: [
            "اللَّهُمَّ آمِنَّا فِي أَوْطَانِنَا - O Allah, grant us security in our homelands",
            "رَبِّ اجْعَلْنِي مُقِيمَ الصَّلاَةِ - My Lord, make me one who establishes prayer"
        ]
    },

    {
        id: 7,
        arabic: "الْمُهَيْمِنُ",
        transliteration: "Al-Muhaymin",
        english: "The Guardian",
        meaning: "The Protector",
        description: "The One who witnesses all actions and guards over His creation with perfect knowledge and care. Al-Muhaymin is the supreme guardian who protects, oversees, and maintains everything in existence according to His divine wisdom and mercy.",
        detailedBenefits: {
            spiritual: [
                "Divine protection and oversight in all spiritual matters",
                "Increases awareness of Allah's constant presence",
                "Strengthens consciousness and mindfulness in worship",
                "Protects from spiritual negligence and heedlessness"
            ],
            physical: [
                "Physical protection from unseen dangers",
                "Guards health and well-being of family members",
                "Protection from accidents and unexpected harm"
            ],
            worldly: [
                "Success in leadership and management positions",
                "Divine guidance in overseeing others' affairs",
                "Protection of wealth, property, and possessions",
                "Success in supervisory and guardian roles"
            ],
            recitationGuidance: [
                "Recite 100 times for divine protection",
                "Best for parents: before sleeping to protect children",
                "Combine with prayers for family's safety",
                "Recite when taking on responsibility for others"
            ]
        },
        quranicReferences: ["Quran 59:23"],
        hadithReferences: [
            "Allah is with those who are patient - Quran 2:153",
            "Each of you is a shepherd and responsible for his flock - Bukhari"
        ],
        duas: [
            "اللَّهُمَّ احْفَظْنِي وَاحْفَظْ أَهْلِي - O Allah, protect me and protect my family",
            "رَبِّ اجْعَلْنِي مِنَ الشَّاكِرِينَ - My Lord, make me among the grateful"
        ]
    },

    {
        id: 8,
        arabic: "الْعَزِيزُ",
        transliteration: "Al-Aziz",
        english: "The Victorious",
        meaning: "The Mighty",
        description: "The Strong and Powerful One who cannot be defeated or overcome. Al-Aziz possesses absolute might and honor, granting victory to His believers and dignity to those who invoke His name with sincerity and devotion.",
        detailedBenefits: {
            spiritual: [
                "Gives strength to overcome spiritual weaknesses",
                "Provides victory over nafs (ego) and evil desires",
                "Increases honor and dignity in religious matters",
                "Strengthens resolve in following Islamic teachings"
            ],
            physical: [
                "Grants physical strength and endurance",
                "Helps overcome illness and weakness",
                "Provides energy and vitality for daily tasks"
            ],
            worldly: [
                "Victory in legal matters and disputes",
                "Success in competitions and challenges",
                "Increases respect and honor among people",
                "Strength to overcome enemies and obstacles"
            ],
            recitationGuidance: [
                "Recite 100 times before important challenges",
                "Best time: During difficulties and hardships",
                "Combine with prayers for victory and success",
                "Recite when feeling weak or defeated"
            ]
        },
        quranicReferences: ["Quran 59:23", "Quran 3:6", "Quran 9:40"],
        hadithReferences: [
            "And Allah will surely support those who support Him - Quran 22:40",
            "Victory comes with patience, relief with affliction - Ahmad"
        ],
        duas: [
            "اللَّهُمَّ أَعِزَّنِي بِطَاعَتِكَ - O Allah, honor me through obedience to You",
            "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً - Our Lord, give us good in this world"
        ]
    },

    {
        id: 9,
        arabic: "الْجَبَّارُ",
        transliteration: "Al-Jabbar",
        english: "The Compeller",
        meaning: "The Irresistible",
        description: "The One who compels His creation according to His will and wisdom. Al-Jabbar has the power to mend what is broken, heal what is wounded, and restore what has been damaged, both physically and spiritually.",
        detailedBenefits: {
            spiritual: [
                "Heals broken hearts and spiritual wounds",
                "Restores faith after periods of doubt or despair",
                "Compels evil forces to retreat and surrender",
                "Mends relationships and brings reconciliation"
            ],
            physical: [
                "Healing properties for broken bones and physical injuries",
                "Recovery from serious illnesses and chronic conditions",
                "Restoration of health after major setbacks"
            ],
            worldly: [
                "Compels enemies to make peace and reconcile",
                "Restores damaged reputation and social standing",
                "Success in overcoming seemingly impossible obstacles",
                "Recovery of lost wealth or opportunities"
            ],
            recitationGuidance: [
                "Recite 100 times for healing and restoration",
                "Best for those with broken hearts or spirits",
                "Combine with prayers for recovery and healing",
                "Recite during times of loss or damage"
            ]
        },
        quranicReferences: ["Quran 59:23"],
        hadithReferences: [
            "Allah is gentle and loves gentleness in all matters - Bukhari",
            "With hardship comes ease - Quran 94:6"
        ],
        duas: [
            "اللَّهُمَّ اجْبُرْ كَسْرِي - O Allah, mend what is broken in me",
            "رَبِّ اشْفِنِي وَعَافِنِي - My Lord, heal me and grant me wellness"
        ]
    },

    {
        id: 10,
        arabic: "الْمُتَكَبِّرُ",
        transliteration: "Al-Mutakabbir",
        english: "The Greatest",
        meaning: "The Supreme",
        description: "The One who has the right to be proud and is supremely great above all creation. Al-Mutakabbir rejects the attributes of creatures and accepts only the attributes of divinity. His greatness is absolute and beyond comparison.",
        detailedBenefits: {
            spiritual: [
                "Removes arrogance and pride from the heart",
                "Develops humility and modesty in character",
                "Protection from spiritual pride and ego",
                "Increases submission and surrender to Allah"
            ],
            physical: [
                "Protects from falls due to pride or arrogance",
                "Prevents accidents caused by overconfidence",
                "Guards against harm from boastful behavior"
            ],
            worldly: [
                "Protects from humiliation and disgrace",
                "Keeps one humble despite worldly success",
                "Prevents downfall due to excessive pride",
                "Maintains balance between confidence and humility"
            ],
            recitationGuidance: [
                "Recite 100 times to develop humility",
                "Best when feeling proud or accomplished",
                "Combine with seeking forgiveness for arrogance",
                "Recite to maintain balance in success"
            ]
        },
        quranicReferences: ["Quran 59:23"],
        hadithReferences: [
            "Pride is My cloak and greatness is My garment - Muslim",
            "Whoever has pride in his heart equal to a mustard seed will not enter Paradise - Muslim"
        ],
        duas: [
            "اللَّهُمَّ لاَ تَجْعَلْ فِي قَلْبِي كِبْراً - O Allah, do not place pride in my heart",
            "رَبِّ اجْعَلْنِي مِنَ الْمُتَوَاضِعِينَ - My Lord, make me among the humble"
        ]
    },
    {
        id: 11,
        arabic: "الْخَالِقُ",
        transliteration: "Al-Khaliq",
        english: "The Creator",
        meaning: "The Maker",
        description: "The One who brings everything from non-existence to existence according to His perfect wisdom and design. Al-Khaliq is the ultimate source of all creation, bringing forth everything with precise measurements, perfect balance, and divine purpose. He creates both the seen and unseen worlds.",
        detailedBenefits: {
            spiritual: [
                "Enhances creativity and innovation in religious matters",
                "Inspires positive intentions and righteous planning",
                "Develops appreciation for Allah's creative power",
                "Increases gratitude for the gift of existence and life"
            ],
            physical: [
                "Stimulates creative thinking and artistic abilities",
                "Helps in problem-solving and innovative solutions",
                "Aids in bringing new projects and ideas to fruition"
            ],
            worldly: [
                "Success in creative professions and artistic endeavors",
                "Brings new opportunities and fresh starts",
                "Helps in invention, design, and creative work",
                "Assistance in starting new businesses or projects"
            ],
            recitationGuidance: [
                "Recite 100 times when starting new projects",
                "Best for artists, designers, and creative professionals",
                "Combine with prayers for innovation and creativity",
                "Recite when seeking inspiration for new ideas"
            ]
        },
        quranicReferences: ["Quran 59:24", "Quran 6:102", "Quran 13:16"],
        hadithReferences: [
            "Allah is beautiful and loves beauty - Muslim",
            "Allah has prescribed excellence in everything - Muslim"
        ],
        duas: [
            "اللَّهُمَّ أَلْهِمْنِي رُشْدِي - O Allah, inspire me with guidance",
            "رَبِّ اشْرَحْ لِي صَدْرِي - My Lord, expand my chest for me"
        ]
    },

    {
        id: 12,
        arabic: "الْبَارِئُ",
        transliteration: "Al-Bari",
        english: "The Maker of Order",
        meaning: "The Evolver",
        description: "The One who creates with perfect order and arrangement, fashioning all living beings according to His divine plan. Al-Bari brings forth creation in stages, with perfect timing and systematic development, ensuring balance and harmony in all things.",
        detailedBenefits: {
            spiritual: [
                "Helps in organizing spiritual life and religious practices",
                "Brings order to chaotic spiritual states",
                "Encourages systematic approach to worship and learning",
                "Develops balance between different aspects of faith"
            ],
            physical: [
                "Promotes physical health through balanced lifestyle",
                "Helps in organizing daily routines and habits",
                "Aids in recovery through systematic healing processes"
            ],
            worldly: [
                "Success in management and organizational roles",
                "Helps in planning and systematic execution of tasks",
                "Brings order to chaotic situations and environments",
                "Excellence in administrative and leadership positions"
            ],
            recitationGuidance: [
                "Recite 100 times for better organization in life",
                "Best for managers, planners, and organizers",
                "Combine with prayers for systematic success",
                "Recite when facing chaos or disorder"
            ]
        },
        quranicReferences: ["Quran 59:24"],
        hadithReferences: [
            "Allah loves when one of you does a job, that he does it with excellence - Al-Bayhaqi",
            "Order and organization are part of faith - Traditional"
        ],
        duas: [
            "اللَّهُمَّ نَظِّمْ أَمْرِي - O Allah, organize my affairs",
            "رَبِّ يَسِّرْ وَلاَ تُعَسِّرْ - My Lord, make things easy and do not make them difficult"
        ]
    },

    {
        id: 13,
        arabic: "الْمُصَوِّرُ",
        transliteration: "Al-Musawwir",
        english: "The Shaper of Beauty",
        meaning: "The Fashioner",
        description: "The One who shapes and forms His creation with perfect beauty and unique characteristics. Al-Musawwir gives each creation its distinctive form, appearance, and qualities, ensuring that no two things are exactly alike while maintaining perfect harmony.",
        detailedBenefits: {
            spiritual: [
                "Develops appreciation for divine beauty and artistry",
                "Enhances aesthetic sense and appreciation of creation",
                "Instills self-acceptance and recognition of unique qualities",
                "Increases gratitude for physical and spiritual gifts"
            ],
            physical: [
                "Enhances natural beauty and attractive appearance",
                "Helps in accepting and appreciating one's physical form",
                "Aids in artistic expression and creative work"
            ],
            worldly: [
                "Success in design, fashion, and beauty-related fields",
                "Helps in creative arts, sculpture, and visual arts",
                "Brings recognition for unique talents and abilities",
                "Success in fields requiring aesthetic judgment"
            ],
            recitationGuidance: [
                "Recite 100 times for enhanced beauty and creativity",
                "Best for artists, designers, and creative professionals",
                "Combine with gratitude for Allah's creative gifts",
                "Recite when working on artistic or creative projects"
            ]
        },
        quranicReferences: ["Quran 59:24"],
        hadithReferences: [
            "Allah is beautiful and loves beauty - Muslim",
            "Allah has made everything He created most good - Quran 32:7"
        ],
        duas: [
            "اللَّهُمَّ حَسِّنْ خُلُقِي كَمَا حَسَّنْتَ خَلْقِي - O Allah, make my character beautiful as You made my creation beautiful",
            "رَبِّ اجْعَلْنِي مِنَ الْمُحْسِنِينَ - My Lord, make me among those who do good"
        ]
    },

    {
        id: 14,
        arabic: "الْغَفَّارُ",
        transliteration: "Al-Ghaffar",
        english: "The Forgiving",
        meaning: "The Great Forgiver",
        description: "The One who repeatedly and continuously forgives the sins of His servants. Al-Ghaffar covers and conceals faults, erases wrongdoings, and grants fresh opportunities for repentance and righteousness, showing infinite mercy and patience.",
        detailedBenefits: {
            spiritual: [
                "Complete forgiveness of sins and spiritual purification",
                "Removes guilt, shame, and regret from past mistakes",
                "Opens doors of repentance and spiritual renewal",
                "Erases the effects of major sins and transgressions"
            ],
            physical: [
                "Healing from diseases caused by spiritual ailments",
                "Relief from stress and anxiety related to guilt",
                "Recovery from addiction and harmful habits"
            ],
            worldly: [
                "Forgiveness from people and restoration of relationships",
                "Relief from consequences of past mistakes",
                "Fresh opportunities and new beginnings in life",
                "Protection from scandal and public disgrace"
            ],
            recitationGuidance: [
                "Recite 100 times daily for continuous forgiveness",
                "Best combined with sincere repentance (Tawbah)",
                "Especially powerful during times of remorse",
                "Recite after making mistakes or committing sins"
            ]
        },
        quranicReferences: ["Quran 20:82", "Quran 38:66", "Quran 39:5"],
        hadithReferences: [
            "All the sons of Adam are sinners, but the best of sinners are those who repent - Tirmidhi",
            "Allah is more pleased with the repentance of His slave than one of you would be - Bukhari"
        ],
        duas: [
            "أَسْتَغْفِرُ اللَّهَ الَّذِي لاَ إِلَهَ إِلاَّ هُوَ - I seek forgiveness from Allah who there is no god but Him",
            "رَبِّ اغْفِرْ لِي ذَنْبِي - My Lord, forgive me my sin"
        ]
    },

    {
        id: 15,
        arabic: "الْقَهَّارُ",
        transliteration: "Al-Qahhar",
        english: "The Subduer",
        meaning: "The Dominant",
        description: "The One who has absolute dominance and control over all creation. Al-Qahhar subdues all opposition to His will, overcomes all obstacles, and demonstrates supreme authority. He helps believers overcome their enemies and challenges.",
        detailedBenefits: {
            spiritual: [
                "Victory over nafs (ego) and spiritual weaknesses",
                "Overcoming temptations and evil influences",
                "Strength to resist sin and maintain righteousness",
                "Spiritual dominance over negative thoughts and feelings"
            ],
            physical: [
                "Physical strength and endurance in challenges",
                "Recovery from illnesses and physical weakness",
                "Energy to overcome fatigue and exhaustion"
            ],
            worldly: [
                "Victory in legal disputes and court cases",
                "Success in overcoming business competitors",
                "Triumph over enemies and opponents",
                "Authority and control in leadership positions"
            ],
            recitationGuidance: [
                "Recite 100 times when facing strong opposition",
                "Best before important battles or challenges",
                "Combine with prayers for victory and success",
                "Recite when feeling overpowered or defeated"
            ]
        },
        quranicReferences: ["Quran 13:16", "Quran 14:48", "Quran 38:65"],
        hadithReferences: [
            "Allah will support those who support His cause - Quran 22:40",
            "Victory comes with patience, relief with affliction - Ahmad"
        ],
        duas: [
            "اللَّهُمَّ اقْهَرْ أَعْدَائِي - O Allah, subdue my enemies",
            "رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْراً وَانصُرْنَا - Our Lord, pour patience upon us and grant us victory"
        ]
    },

    {
        id: 16,
        arabic: "الْوَهَّابُ",
        transliteration: "Al-Wahhab",
        english: "The Giver of All",
        meaning: "The Bestower",
        description: "The One who gives abundantly and generously without expecting anything in return. Al-Wahhab bestows gifts, blessings, and favors upon His creation continuously, providing both material and spiritual sustenance according to His infinite generosity.",
        detailedBenefits: {
            spiritual: [
                "Receives unexpected spiritual gifts and blessings",
                "Increases in knowledge, wisdom, and understanding",
                "Spiritual elevation and divine favor",
                "Enhanced ability to give and share with others"
            ],
            physical: [
                "Healing and recovery from illnesses",
                "Strength, health, and physical well-being",
                "Protection from physical harm and accidents"
            ],
            worldly: [
                "Unexpected wealth, opportunities, and provisions",
                "Success in business and financial endeavors",
                "Gifts, prizes, and unexpected benefits",
                "Opening of previously closed doors and opportunities"
            ],
            recitationGuidance: [
                "Recite 100 times for increased provisions",
                "Best when seeking Allah's bounty and gifts",
                "Combine with gratitude for existing blessings",
                "Recite when facing financial difficulties"
            ]
        },
        quranicReferences: ["Quran 3:8", "Quran 38:9", "Quran 38:35"],
        hadithReferences: [
            "The upper hand is better than the lower hand - Bukhari",
            "Allah loves the generous and hates the miser - Tirmidhi"
        ],
        duas: [
            "رَبِّ هَبْ لِي مِن لَّدُنكَ رَحْمَةً - My Lord, grant me mercy from Yourself",
            "اللَّهُمَّ اكْفِنِي بِحَلاَلِكَ عَنْ حَرَامِكَ - O Allah, suffice me with Your lawful provision"
        ]
    },
    {
        id: 17,
        arabic: "الرَّزَّاقُ",
        transliteration: "Ar-Razzaq",
        english: "The Sustainer",
        meaning: "The Provider",
        description: "The One who provides sustenance, livelihood, and all necessities for His creation. Ar-Razzaq ensures that every living being receives what they need for survival and growth, both in material and spiritual aspects. He is the ultimate source of all provision and abundance.",
        detailedBenefits: {
            spiritual: [
                "Increases trust and reliance on Allah for all provisions",
                "Develops gratitude for daily sustenance and blessings",
                "Strengthens faith in Allah's promise of provision",
                "Removes anxiety about future sustenance and livelihood"
            ],
            physical: [
                "Ensures adequate nutrition and physical sustenance",
                "Protects from hunger, thirst, and basic needs deprivation",
                "Helps maintain good health through proper nourishment"
            ],
            worldly: [
                "Opens doors of halal income and business opportunities",
                "Provides unexpected sources of wealth and provision",
                "Ensures family's needs are met adequately",
                "Success in agriculture, food business, and trade"
            ],
            recitationGuidance: [
                "Recite 308 times daily for increased provision",
                "Best time: Early morning before seeking livelihood",
                "Combine with working hard and making sincere efforts",
                "Recite when facing financial difficulties"
            ]
        },
        quranicReferences: ["Quran 51:58", "Quran 2:212"],
        hadithReferences: [
            "No soul will die until it completes its provision and its term - Ibn Majah",
            "Seek provision by giving charity - Bayhaqi"
        ],
        duas: [
            "اللَّهُمَّ اكْفِنِي بِحَلاَلِكَ عَنْ حَرَامِكَ - O Allah, suffice me with Your lawful provision over unlawful",
            "رَبِّ اجْعَلْ فِيمَا رَزَقْتَنِي بَرَكَةً - My Lord, place blessing in what You have provided me"
        ]
    },

    {
        id: 18,
        arabic: "الْفَتَّاحُ",
        transliteration: "Al-Fattah",
        english: "The Opener",
        meaning: "The Victory Giver",
        description: "The One who opens doors of opportunity, guidance, and success for His servants. Al-Fattah removes obstacles, opens hearts to truth, and grants solutions to seemingly impossible problems. He is the key to all locked doors.",
        detailedBenefits: {
            spiritual: [
                "Opens hearts to guidance and religious understanding",
                "Removes spiritual blockages and barriers to faith",
                "Provides solutions to religious doubts and confusion",
                "Opens doors to increased worship and devotion"
            ],
            physical: [
                "Opens blocked pathways in the body for healing",
                "Helps overcome physical limitations and disabilities",
                "Aids in recovery from chronic conditions"
            ],
            worldly: [
                "Opens doors of career opportunities and advancement",
                "Removes obstacles in business and professional life",
                "Provides solutions to complex problems and challenges",
                "Success in legal matters and court cases"
            ],
            recitationGuidance: [
                "Recite 100 times when facing closed opportunities",
                "Best before important meetings or interviews",
                "Combine with making sincere efforts and dua",
                "Recite when seeking solutions to problems"
            ]
        },
        quranicReferences: ["Quran 34:26", "Quran 7:89"],
        hadithReferences: [
            "When Allah intends good for someone, He opens his heart to Islam - Bukhari",
            "Allah will make a way out for those who fear Him - Quran 65:2"
        ],
        duas: [
            "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ - O Allah, open for me the doors of Your mercy",
            "رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي - My Lord, expand my chest and make easy my affairs"
        ]
    },

    {
        id: 19,
        arabic: "اَلْعَلِيْمُ",
        transliteration: "Al-Aleem",
        english: "The Knower of All",
        meaning: "The All-Knowing",
        description: "The One whose knowledge encompasses everything - past, present, and future. Al-Aleem knows the visible and the hidden, the thoughts in hearts, and the secrets of all creation. His knowledge is perfect, complete, and eternal.",
        detailedBenefits: {
            spiritual: [
                "Increases desire for beneficial knowledge and wisdom",
                "Enhances understanding of religious teachings",
                "Develops consciousness that Allah knows all our actions",
                "Strengthens trust in Allah's perfect knowledge and judgment"
            ],
            physical: [
                "Improves memory, concentration, and learning ability",
                "Enhances cognitive functions and mental clarity",
                "Helps in academic and educational pursuits"
            ],
            worldly: [
                "Success in studies, research, and intellectual work",
                "Guidance in making informed decisions",
                "Excellence in teaching, writing, and knowledge-sharing",
                "Recognition for expertise and scholarly achievements"
            ],
            recitationGuidance: [
                "Recite 100 times before studying or learning",
                "Best for students and knowledge seekers",
                "Combine with seeking beneficial knowledge",
                "Recite when facing difficult decisions"
            ]
        },
        quranicReferences: ["Quran 2:29", "Quran 4:35", "Quran 24:41"],
        hadithReferences: [
            "Seek knowledge from the cradle to the grave - Traditional",
            "Allah makes the path to Paradise easy for one who seeks knowledge - Muslim"
        ],
        duas: [
            "رَبِّ زِدْنِي عِلْماً - My Lord, increase me in knowledge",
            "اللَّهُمَّ انْفَعْنِي بِمَا عَلَّمْتَنِي - O Allah, benefit me with what You have taught me"
        ]
    },

    {
        id: 20,
        arabic: "الْقَابِضُ",
        transliteration: "Al-Qabid",
        english: "The Constrictor",
        meaning: "The Withholder",
        description: "The One who withholds and constrains according to His divine wisdom. Al-Qabid restricts provision, opportunities, or circumstances as a test, protection, or guidance, always with perfect timing and purpose.",
        detailedBenefits: {
            spiritual: [
                "Develops patience during times of spiritual constraint",
                "Increases reliance on Allah during difficult periods",
                "Strengthens faith through tests of scarcity",
                "Helps control excessive desires and wants"
            ],
            physical: [
                "Aids in self-discipline and controlling habits",
                "Helps in weight management and dietary control",
                "Develops physical restraint and moderation"
            ],
            worldly: [
                "Teaches wise financial management and saving",
                "Protects from excessive spending and waste",
                "Develops appreciation for what one has",
                "Builds resilience during economic hardships"
            ],
            recitationGuidance: [
                "Recite when learning self-control and discipline",
                "Best during times of abundance to maintain humility",
                "Combine with gratitude for existing blessings",
                "Recite when struggling with excess or addiction"
            ]
        },
        quranicReferences: ["Quran 2:245"],
        hadithReferences: [
            "The best wealth is contentment of the heart - Bukhari",
            "Be in this world as if you were a stranger - Bukhari"
        ],
        duas: [
            "اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ - O Allah, help me remember You and thank You",
            "رَبِّ اجْعَلْنِي مِنَ الصَّابِرِينَ - My Lord, make me among the patient"
        ]
    },

    {
        id: 21,
        arabic: "الْبَاسِطُ",
        transliteration: "Al-Basit",
        english: "The Extender",
        meaning: "The Enlarger",
        description: "The One who expands and gives abundance, joy, and relief after constraint. Al-Basit opens His hands with generosity, providing expansive blessings and removing restrictions according to His mercy and timing.",
        detailedBenefits: {
            spiritual: [
                "Expands the heart with joy, contentment, and peace",
                "Increases spiritual capacity and understanding",
                "Brings relief after periods of spiritual difficulty",
                "Enhances generosity and giving nature"
            ],
            physical: [
                "Provides relief from physical constraints and limitations",
                "Brings healing and recovery from illness",
                "Increases physical comfort and well-being"
            ],
            worldly: [
                "Expansion in business, wealth, and opportunities",
                "Relief from financial difficulties and debt",
                "Growth in family, relationships, and social connections",
                "Success in ventures requiring growth and expansion"
            ],
            recitationGuidance: [
                "Recite 100 times for expansion in provision",
                "Best after periods of difficulty or constraint",
                "Combine with gratitude for Allah's expanding mercy",
                "Recite when seeking growth in any aspect of life"
            ]
        },
        quranicReferences: ["Quran 2:245", "Quran 17:29"],
        hadithReferences: [
            "After hardship comes ease - Quran 94:6",
            "The generous are close to Allah, close to people - Tirmidhi"
        ],
        duas: [
            "اللَّهُمَّ ابْسُطْ عَلَيَّ مِنْ رَحْمَتِكَ - O Allah, expand upon me from Your mercy",
            "رَبِّ اشْرَحْ لِي صَدْرِي - My Lord, expand my chest for me"
        ]
    },
    {
        id: 22,
        arabic: "الْخَافِضُ",
        transliteration: "Al-Khafid",
        english: "The Abaser",
        meaning: "The Reducer",
        description: "The One who lowers and humbles whomever He wills according to divine justice. Al-Khafid brings down the arrogant, reduces the status of oppressors, and humbles those who transgress against others. This divine attribute ensures that no one remains in wrongful elevation.",
        detailedBenefits: {
            spiritual: [
                "Removes spiritual pride and arrogance from the heart",
                "Develops humility and modesty in character",
                "Protection from the dangers of ego and self-importance",
                "Helps in overcoming spiritual obstacles caused by pride"
            ],
            physical: [
                "Protects from falls due to arrogance or overconfidence",
                "Guards against accidents caused by reckless behavior",
                "Helps in maintaining physical balance and stability"
            ],
            worldly: [
                "Protection from enemies who seek to harm through pride",
                "Helps in dealing with arrogant and oppressive people",
                "Success in overcoming those who look down upon others",
                "Justice against those who abuse their positions"
            ],
            recitationGuidance: [
                "Recite when dealing with arrogant opponents",
                "Best for seeking justice against oppressors",
                "Combine with prayers for humility and modesty",
                "Recite 100 times to overcome prideful enemies"
            ]
        },
        quranicReferences: ["Quran 56:3"],
        hadithReferences: [
            "Whoever humbles himself for Allah, Allah will elevate him - Muslim",
            "Pride and arrogance will not enter Paradise - Muslim"
        ],
        duas: [
            "اللَّهُمَّ اخْفِضْ عَنِّي كُلَّ مُتَكَبِّرٍ - O Allah, humble every arrogant person against me",
            "رَبِّ اجْعَلْنِي مِنَ الْمُتَوَاضِعِينَ - My Lord, make me among the humble"
        ]
    },

    {
        id: 23,
        arabic: "الرَّافِعُ",
        transliteration: "Ar-Rafi",
        english: "The Exalter",
        meaning: "The Elevator",
        description: "The One who raises and elevates whomever He wills in status, rank, and position. Ar-Rafi lifts up the righteous, honors the deserving, and elevates those who humble themselves before Allah. He raises both worldly status and spiritual ranks.",
        detailedBenefits: {
            spiritual: [
                "Elevates spiritual rank and closeness to Allah",
                "Increases honor and respect in religious matters",
                "Raises status among the righteous and pious",
                "Enhances spiritual understanding and wisdom"
            ],
            physical: [
                "Improves health and physical well-being",
                "Increases energy, vitality, and strength",
                "Helps in recovery from illness and weakness"
            ],
            worldly: [
                "Career advancement and professional promotion",
                "Increases social status and respectability",
                "Success in achieving higher positions and ranks",
                "Recognition and honor among people"
            ],
            recitationGuidance: [
                "Recite 100 times for elevation in status",
                "Best before job interviews or important meetings",
                "Combine with good deeds and righteous actions",
                "Recite when seeking promotion or advancement"
            ]
        },
        quranicReferences: ["Quran 56:3", "Quran 58:11"],
        hadithReferences: [
            "Allah raises people by this Book and lowers others by it - Muslim",
            "Whoever seeks elevation through knowledge, Allah will elevate him - Traditional"
        ],
        duas: [
            "اللَّهُمَّ ارْفَعْ دَرَجَتِي فِي الدُّنْيَا وَالآخِرَةِ - O Allah, raise my rank in this world and the hereafter",
            "رَبِّ اجْعَلْنِي مِنَ الْمُكْرَمِينَ - My Lord, make me among the honored"
        ]
    },

    {
        id: 24,
        arabic: "الْمُعِزُّ",
        transliteration: "Al-Muizz",
        english: "The Bestower of Honors",
        meaning: "The Giver of Honor",
        description: "The One who grants honor, dignity, strength, and respect to whomever He chooses. Al-Muizz bestows nobility upon the humble, gives power to the weak, and grants respect to those who deserve it according to His divine wisdom.",
        detailedBenefits: {
            spiritual: [
                "Grants spiritual honor and dignity before Allah",
                "Increases respect in religious and spiritual circles",
                "Bestows the honor of being among Allah's righteous servants",
                "Enhances spiritual strength and moral courage"
            ],
            physical: [
                "Increases physical strength and personal presence",
                "Grants dignity in appearance and demeanor",
                "Helps overcome physical weakness and frailty"
            ],
            worldly: [
                "Brings honor and respect among family and society",
                "Success in achieving positions of authority and leadership",
                "Recognition for achievements and contributions",
                "Protection from dishonor and public disgrace"
            ],
            recitationGuidance: [
                "Recite 100 times daily for increased honor",
                "Best when seeking respect and recognition",
                "Combine with acts of service to others",
                "Recite when facing situations that threaten dignity"
            ]
        },
        quranicReferences: ["Quran 3:26"],
        hadithReferences: [
            "Honor belongs to Allah, His Messenger, and the believers - Quran 63:8",
            "Whoever seeks honor through obedience to Allah will find it - Traditional"
        ],
        duas: [
            "اللَّهُمَّ أَعِزَّنِي بِطَاعَتِكَ وَلاَ تُذِلَّنِي بِمَعْصِيَتِكَ - O Allah, honor me through obedience to You",
            "رَبِّ اجْعَلْنِي مِنَ الْمُكْرَمِينَ - My Lord, make me among the honored ones"
        ]
    },

    {
        id: 25,
        arabic: "الْمُذِلُّ",
        transliteration: "Al-Mudhill",
        english: "The Humiliator",
        meaning: "The Dishonourer",
        description: "The One who dishonors and humiliates those who deserve it according to divine justice. Al-Mudhill removes honor from oppressors, humbles tyrants, and brings down those who misuse their power and authority against the innocent.",
        detailedBenefits: {
            spiritual: [
                "Protection from being humiliated due to spiritual arrogance",
                "Reminds of the importance of humility before Allah",
                "Helps in staying away from actions that lead to divine punishment",
                "Develops consciousness of accountability before Allah"
            ],
            physical: [
                "Protection from humiliation due to physical weakness",
                "Guards against public embarrassment and shame",
                "Helps maintain dignity even in difficult circumstances"
            ],
            worldly: [
                "Justice against those who oppress and humiliate others",
                "Protection from enemies who seek to cause dishonor",
                "Success in defending against false accusations",
                "Divine intervention against unjust treatment"
            ],
            recitationGuidance: [
                "Recite when seeking justice against oppressors",
                "Best for protection from humiliation",
                "Combine with prayers for maintaining dignity",
                "Recite 100 times when facing unjust treatment"
            ]
        },
        quranicReferences: ["Quran 3:26"],
        hadithReferences: [
            "Allah does not humiliate those who seek His protection - Traditional",
            "Whoever humiliates a believer, Allah will humiliate him - Traditional"
        ],
        duas: [
            "اللَّهُمَّ لاَ تُذِلَّنِي وَأَذِلَّ مَنْ عَادَانِي - O Allah, do not humiliate me and humiliate my enemies",
            "رَبِّ احْفَظْنِي مِنَ الْخِزْيِ وَالْعَارِ - My Lord, protect me from shame and disgrace"
        ]
    },

    {
        id: 26,
        arabic: "السَّمِيعُ",
        transliteration: "As-Sami",
        english: "The Hearer of All",
        meaning: "The All-Hearing",
        description: "The One who hears all sounds, voices, and calls, whether spoken aloud or whispered in the heart. As-Sami hears every prayer, every cry for help, and every word uttered by His creation. His hearing is perfect and encompasses everything.",
        detailedBenefits: {
            spiritual: [
                "Assurance that all prayers and duas are heard by Allah",
                "Develops consciousness that Allah hears all our words",
                "Increases sincerity in worship and supplication",
                "Strengthens belief that no call to Allah goes unheard"
            ],
            physical: [
                "Improvement in hearing abilities and auditory health",
                "Protection from hearing loss and ear-related ailments",
                "Enhanced ability to listen and understand others"
            ],
            worldly: [
                "Success in communication and interpersonal relationships",
                "Being heard and listened to by people in authority",
                "Recognition for one's voice and opinions",
                "Success in fields requiring good listening skills"
            ],
            recitationGuidance: [
                "Recite 100 times when making important duas",
                "Best before and after each prayer",
                "Combine with expressing gratitude for Allah's responses",
                "Recite when feeling that prayers are not being answered"
            ]
        },
        quranicReferences: ["Quran 2:127", "Quran 2:137", "Quran 8:17"],
        hadithReferences: [
            "Allah is closer to you than your jugular vein - Quran 50:16",
            "Call upon Me, I will respond to you - Quran 40:60"
        ],
        duas: [
            "اللَّهُمَّ إِنَّكَ سَمِيعٌ لِلدُّعَاءِ فَاسْمَعْ دُعَائِي - O Allah, You are the Hearer of prayer, so hear my prayer",
            "رَبَّنَا تَقَبَّلْ مِنَّا إِنَّكَ أَنتَ السَّمِيعُ الْعَلِيمُ - Our Lord, accept from us, indeed You are As-Sami, Al-Aleem"
        ]
    },
    {
        id: 27,
        arabic: "الْبَصِيرُ",
        transliteration: "Al-Baseer",
        english: "The Seer of All",
        meaning: "The All-Seeing",
        description: "The One who sees all that is apparent and all that is hidden, both in the physical and spiritual realms. Al-Baseer's sight encompasses everything - past, present, and future. He sees the intentions in hearts, the deeds of His creation, and the smallest details of existence with perfect clarity.",
        detailedBenefits: {
            spiritual: [
                "Increases spiritual insight and inner vision",
                "Develops consciousness that Allah sees all our actions",
                "Enhances ability to see through deception and falsehood",
                "Strengthens awareness of divine presence in all situations"
            ],
            physical: [
                "Improvement in eyesight and visual health",
                "Protection from eye diseases and vision problems",
                "Enhanced perception and observational skills"
            ],
            worldly: [
                "Success in professions requiring keen observation",
                "Ability to see through people's true intentions",
                "Recognition and appreciation for one's insights",
                "Success in investigation, research, and analysis"
            ],
            recitationGuidance: [
                "Recite 100 times for enhanced vision and insight",
                "Best when seeking to understand hidden truths",
                "Combine with reflection on Allah's perfect sight",
                "Recite when facing deception or unclear situations"
            ]
        },
        quranicReferences: ["Quran 2:96", "Quran 2:110", "Quran 42:11"],
        hadithReferences: [
            "Allah sees you even if you don't see Him - Bukhari",
            "Worship Allah as if you see Him, for if you don't see Him, He surely sees you - Bukhari"
        ],
        duas: [
            "اللَّهُمَّ أَرِنِي الْحَقَّ حَقّاً وَارْزُقْنِي اتِّبَاعَهُ - O Allah, show me truth as truth and grant me following it",
            "رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي - My Lord, expand my chest and ease my affairs"
        ]
    },

    {
        id: 28,
        arabic: "الْحَكَمُ",
        transliteration: "Al-Hakam",
        english: "The Giver of Justice",
        meaning: "The Judge",
        description: "The One who judges between His servants with perfect justice and wisdom. Al-Hakam settles all disputes, makes final decisions, and His judgment is always fair and based on complete knowledge. He is the ultimate arbitrator in all matters.",
        detailedBenefits: {
            spiritual: [
                "Develops wisdom in making religious and life decisions",
                "Increases understanding of divine justice and fairness",
                "Helps in resolving internal spiritual conflicts",
                "Strengthens trust in Allah's perfect judgment"
            ],
            physical: [
                "Brings balance and harmony to physical health",
                "Helps in making wise health-related decisions",
                "Aids in recovery through proper medical judgment"
            ],
            worldly: [
                "Success in legal professions and court matters",
                "Wisdom in business and professional decisions",
                "Fair resolution of conflicts and disputes",
                "Recognition as a wise and just person"
            ],
            recitationGuidance: [
                "Recite 100 times when seeking wise judgment",
                "Best before making important life decisions",
                "Combine with seeking Allah's guidance in choices",
                "Recite when involved in legal or dispute matters"
            ]
        },
        quranicReferences: ["Quran 6:114", "Quran 12:80"],
        hadithReferences: [
            "The judges are three types: one will be in Paradise and two in Hell - Abu Dawud",
            "Justice is more beloved to Allah than worship - Traditional"
        ],
        duas: [
            "اللَّهُمَّ أَلْهِمْنِي رُشْدِي وَأَعِذْنِي مِنْ شَرِّ نَفْسِي - O Allah, inspire me with guidance and protect me from evil",
            "رَبِّ اهْدِنِي فِيمَنْ هَدَيْتَ - My Lord, guide me among those You have guided"
        ]
    },

    {
        id: 29,
        arabic: "الْعَدْلُ",
        transliteration: "Al-Adl",
        english: "The Just",
        meaning: "The Utterly Just",
        description: "The One who is absolutely just and fair in all His actions and judgments. Al-Adl never oppresses anyone, gives everyone their due rights, and maintains perfect balance in all affairs. His justice is complete and encompasses all creation.",
        detailedBenefits: {
            spiritual: [
                "Develops a strong sense of justice and fairness",
                "Helps in treating others with equity and balance",
                "Increases understanding of divine wisdom in trials",
                "Strengthens belief in ultimate divine justice"
            ],
            physical: [
                "Brings balance to physical health and well-being",
                "Helps maintain proper physical proportions",
                "Aids in achieving equilibrium in bodily functions"
            ],
            worldly: [
                "Success in maintaining fairness in relationships",
                "Recognition as a just and equitable person",
                "Balance in financial and business dealings",
                "Fair treatment from others and authorities"
            ],
            recitationGuidance: [
                "Recite 100 times to develop justice in character",
                "Best when seeking fair treatment from others",
                "Combine with acts of justice and fairness",
                "Recite when feeling wronged or oppressed"
            ]
        },
        quranicReferences: ["Quran 4:40", "Quran 6:115"],
        hadithReferences: [
            "Act justly, for justice is close to piety - Quran 5:8",
            "Those who are just will be on pulpits of light - Muslim"
        ],
        duas: [
            "اللَّهُمَّ أَعِنِّي عَلَى الْعَدْلِ وَالإِحْسَانِ - O Allah, help me with justice and excellence",
            "رَبِّ اجْعَلْنِي مِنَ الْمُقْسِطِينَ - My Lord, make me among the just"
        ]
    },

    {
        id: 30,
        arabic: "اللَّطِيفُ",
        transliteration: "Al-Latif",
        english: "The Subtle One",
        meaning: "The Most Gentle",
        description: "The One who is kind, gracious, and gentle with His creation. Al-Latif knows the finest details and subtleties of all matters. He deals with His servants with gentleness, provides relief in the most difficult situations, and His kindness encompasses all things.",
        detailedBenefits: {
            spiritual: [
                "Brings gentleness and ease during spiritual hardships",
                "Increases understanding of subtle spiritual matters",
                "Develops a gentle and kind character",
                "Provides comfort during times of religious difficulty"
            ],
            physical: [
                "Gentle healing from illnesses and ailments",
                "Relief from severe pain through gradual recovery",
                "Subtle improvements in health and well-being"
            ],
            worldly: [
                "Gentle resolution of complex problems",
                "Kindness and gentle treatment from others",
                "Success through subtle and wise approaches",
                "Understanding of delicate and complex situations"
            ],
            recitationGuidance: [
                "Recite 129 times for gentleness in difficult matters",
                "Best during times of hardship and suffering",
                "Combine with patience and trust in Allah's wisdom",
                "Recite when dealing with sensitive situations"
            ]
        },
        quranicReferences: ["Quran 6:103", "Quran 22:63", "Quran 42:19"],
        hadithReferences: [
            "Allah is gentle and loves gentleness in all matters - Bukhari",
            "Gentleness beautifies everything and its absence makes everything ugly - Muslim"
        ],
        duas: [
            "اللَّهُمَّ الْطُفْ بِي فِيمَا جَرَتْ بِهِ الْمَقَادِيرُ - O Allah, be gentle with me in what destiny has decreed",
            "رَبِّ ارْحَمْنِي وَالْطُفْ بِي - My Lord, have mercy on me and be gentle with me"
        ]
    },

    {
        id: 31,
        arabic: "الْخَبِيرُ",
        transliteration: "Al-Khabeer",
        english: "The All-Aware",
        meaning: "The Well-Acquainted",
        description: "The One who knows the truth of all matters, their hidden aspects, and their finest details. Al-Khabeer is completely informed about everything - the seen and unseen, the manifest and hidden. His knowledge includes all subtleties and inner realities.",
        detailedBenefits: {
            spiritual: [
                "Increases knowledge and wisdom in religious matters",
                "Develops awareness and consciousness of Allah's knowledge",
                "Enhances intuition and spiritual insight",
                "Helps in understanding hidden meanings in Islamic teachings"
            ],
            physical: [
                "Improves awareness of body's needs and health",
                "Enhanced understanding of physical symptoms",
                "Wisdom in health-related decisions and treatments"
            ],
            worldly: [
                "Success in fields requiring deep knowledge and expertise",
                "Recognition as an expert and knowledgeable person",
                "Ability to understand complex situations and people",
                "Wisdom in professional and business decisions"
            ],
            recitationGuidance: [
                "Recite 100 times for increased knowledge and awareness",
                "Best when seeking understanding of hidden matters",
                "Combine with seeking beneficial knowledge",
                "Recite when facing complex or confusing situations"
            ]
        },
        quranicReferences: ["Quran 6:18", "Quran 11:1", "Quran 35:31"],
        hadithReferences: [
            "The knowledgeable are the inheritors of the prophets - Abu Dawud",
            "Allah knows best what is in your hearts - Quran 33:51"
        ],
        duas: [
            "رَبِّ زِدْنِي عِلْماً وَفَهْماً - My Lord, increase me in knowledge and understanding",
            "اللَّهُمَّ انْفَعْنِي بِمَا عَلَّمْتَنِي وَعَلِّمْنِي مَا يَنفَعُنِي - O Allah, benefit me with what You taught me and teach me what benefits me"
        ]
    },
    {
        id: 32,
        arabic: "الْحَلِيمُ",
        transliteration: "Al-Haleem",
        english: "The Forbearing",
        meaning: "The Most Patient",
        description: "The One who delays punishment for those who deserve it and encourages them to repent. Al-Haleem shows infinite patience with His creation, giving them time to turn back to righteousness. His forbearance is a manifestation of His mercy and wisdom.",
        detailedBenefits: {
            spiritual: [
                "Develops patience and tolerance in religious practice",
                "Increases forbearance with others' mistakes and shortcomings",
                "Helps in controlling anger and maintaining composure",
                "Strengthens ability to persevere through spiritual trials"
            ],
            physical: [
                "Brings calmness to nervous system and reduces stress",
                "Helps in managing blood pressure and heart conditions",
                "Aids in recovery from anxiety and panic disorders"
            ],
            worldly: [
                "Success in professions requiring patience and diplomacy",
                "Improved relationships through increased tolerance",
                "Ability to handle difficult people and situations calmly",
                "Recognition as a patient and wise person"
            ],
            recitationGuidance: [
                "Recite 88 times daily for increased patience",
                "Best during times of anger or frustration",
                "Combine with deep breathing for anger management",
                "Recite when dealing with difficult people"
            ]
        },
        quranicReferences: ["Quran 2:225", "Quran 2:235", "Quran 17:44"],
        hadithReferences: [
            "No one is given a better and more abundant gift than patience - Bukhari",
            "Whoever remains patient, Allah will make him patient - Bukhari"
        ],
        duas: [
            "اللَّهُمَّ أَعِنِّي عَلَى الصَّبْرِ وَالْحِلْمِ - O Allah, help me with patience and forbearance",
            "رَبِّ اجْعَلْنِي مِنَ الصَّابِرِينَ الْحَلِيمِينَ - My Lord, make me among the patient and forbearing"
        ]
    },

    {
        id: 33,
        arabic: "الْعَظِيمُ",
        transliteration: "Al-Azeem",
        english: "The Magnificent",
        meaning: "The Supreme",
        description: "The One deserving the attributes of exaltation, glory, extolment, and purity. Al-Azeem is magnificent beyond human comprehension, and His greatness encompasses all creation. He is worthy of all praise and reverence.",
        detailedBenefits: {
            spiritual: [
                "Increases awe and reverence for Allah's magnificence",
                "Develops humility and proper perspective of human limitations",
                "Strengthens faith through recognition of Allah's greatness",
                "Enhances spiritual devotion and worship quality"
            ],
            physical: [
                "Brings dignity and noble bearing to physical presence",
                "Increases confidence and self-respect",
                "Helps overcome feelings of insignificance or depression"
            ],
            worldly: [
                "Recognition and respect from others for one's character",
                "Success in endeavors requiring vision and leadership",
                "Ability to inspire and influence others positively",
                "Achievement of significant accomplishments"
            ],
            recitationGuidance: [
                "Recite 100 times daily for increased reverence",
                "Best during contemplation of Allah's creation",
                "Combine with reflection on divine magnificence",
                "Recite when feeling overwhelmed by life's challenges"
            ]
        },
        quranicReferences: ["Quran 2:255", "Quran 42:4"],
        hadithReferences: [
            "Glory be to my Lord, the Supreme - said during rukoo in prayer",
            "The whole world compared to Paradise is like a ring in the desert - Bukhari"
        ],
        duas: [
            "سُبْحَانَ رَبِّيَ الْعَظِيمِ - Glory be to my Lord, the Supreme",
            "اللَّهُمَّ إِنَّكَ عَظِيمٌ تُحِبُّ الْعَظَمَةَ - O Allah, You are Supreme and love supremeness"
        ]
    },

    {
        id: 34,
        arabic: "الْغَفُورُ",
        transliteration: "Al-Ghafoor",
        english: "The Forgiving",
        meaning: "The All-Forgiving",
        description: "The One who forgives the sins of His servants repeatedly and abundantly. Al-Ghafoor covers faults, conceals sins, and grants pardon to those who seek forgiveness sincerely. His forgiveness knows no bounds.",
        detailedBenefits: {
            spiritual: [
                "Complete erasure of sins through sincere repentance",
                "Relief from spiritual burden of guilt and regret",
                "Renewed opportunity for spiritual purification",
                "Increased hope and optimism in divine mercy"
            ],
            physical: [
                "Healing from ailments related to stress and guilt",
                "Relief from psychosomatic illnesses",
                "Recovery from depression caused by past mistakes"
            ],
            worldly: [
                "Forgiveness from people for past wrongdoings",
                "Fresh opportunities despite previous failures",
                "Relief from consequences of past mistakes",
                "Restoration of damaged relationships"
            ],
            recitationGuidance: [
                "Recite 100 times daily for continuous forgiveness",
                "Best combined with sincere istighfar (seeking forgiveness)",
                "Especially powerful during times of repentance",
                "Recite when burdened by past sins"
            ]
        },
        quranicReferences: ["Quran 2:173", "Quran 4:25", "Quran 35:41"],
        hadithReferences: [
            "If the believer knew the extent of Allah's punishment, none would hope for Paradise - Muslim",
            "Allah loves repentance and forgiveness more than punishment - Traditional"
        ],
        duas: [
            "أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ الَّذِي لاَ إِلَهَ إِلاَّ هُوَ - I seek forgiveness from Allah the Supreme",
            "رَبِّ اغْفِرْ لِي ذَنْبِي وَخَطَئِي وَجَهْلِي - My Lord, forgive my sin, error, and ignorance"
        ]
    },

    {
        id: 35,
        arabic: "الشَّكُورُ",
        transliteration: "Ash-Shakoor",
        english: "The Rewarder of Thankfulness",
        meaning: "The Most Appreciative",
        description: "The One who appreciates and rewards even the smallest acts of obedience and gratitude. Ash-Shakoor multiplies rewards for good deeds and shows appreciation for His servants' efforts, no matter how small.",
        detailedBenefits: {
            spiritual: [
                "Multiplication of spiritual rewards for good deeds",
                "Increased blessings and divine favor",
                "Development of grateful heart and positive attitude",
                "Recognition and appreciation from Allah for efforts"
            ],
            physical: [
                "Improved health through positive mental state",
                "Increased energy from feelings of appreciation",
                "Better recovery from illness through gratitude practice"
            ],
            worldly: [
                "Recognition and appreciation from people for contributions",
                "Multiplied returns on charitable and good works",
                "Success through maintaining grateful attitude",
                "Unexpected rewards and acknowledgments"
            ],
            recitationGuidance: [
                "Recite 41 times daily for increased blessings",
                "Best when practicing gratitude and thankfulness",
                "Combine with counting and acknowledging blessings",
                "Recite when seeking appreciation for good works"
            ]
        },
        quranicReferences: ["Quran 35:30", "Quran 35:34", "Quran 42:23"],
        hadithReferences: [
            "If you are grateful, I will certainly give you more - Quran 14:7",
            "Whoever does not thank people does not thank Allah - Tirmidhi"
        ],
        duas: [
            "اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ - O Allah, help me remember, thank, and worship You excellently",
            "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ - All praise belongs to Allah, Lord of the worlds"
        ]
    },

    {
        id: 36,
        arabic: "الْعَلِيُّ",
        transliteration: "Al-Ali",
        english: "The Highest",
        meaning: "The Most High",
        description: "The One who is exalted above all creation in every aspect. Al-Ali is supreme in status, rank, and position. He is above all limitations and deficiencies, and His highness encompasses all forms of elevation.",
        detailedBenefits: {
            spiritual: [
                "Elevation of spiritual status and closeness to Allah",
                "Increased nobility of character and moral excellence",
                "Rising above worldly concerns and materialistic desires",
                "Enhanced spiritual vision and understanding"
            ],
            physical: [
                "Improvement in posture and dignified bearing",
                "Increased self-confidence and personal presence",
                "Recovery from conditions that cause lowliness or depression"
            ],
            worldly: [
                "Career advancement and professional elevation",
                "Increased social status and respectability",
                "Success in achieving higher positions and goals",
                "Recognition and honor among peers and society"
            ],
            recitationGuidance: [
                "Recite 100 times daily for spiritual elevation",
                "Best during times of feeling low or defeated",
                "Combine with efforts toward self-improvement",
                "Recite when seeking advancement in any field"
            ]
        },
        quranicReferences: ["Quran 2:255", "Quran 4:34", "Quran 42:4"],
        hadithReferences: [
            "Glory be to my Lord, the Most High - said during sujood in prayer",
            "Whoever humbles himself for Allah, Allah will elevate him - Muslim"
        ],
        duas: [
            "سُبْحَانَ رَبِّيَ الأَعْلَى - Glory be to my Lord, the Most High",
            "اللَّهُمَّ ارْفَعْنِي إِلَيْكَ وَلاَ تَضَعْنِي - O Allah, elevate me to You and do not lower me"
        ]
    },

    {
        id: 37,
        arabic: "الْكَبِيرُ",
        transliteration: "Al-Kabeer",
        english: "The Greatest",
        meaning: "The Most Great",
        description: "The One who is greater than everything in status, majesty, and authority. Al-Kabeer surpasses all creation in every aspect of greatness. His greatness is absolute and serves as the measure for all other greatness.",
        detailedBenefits: {
            spiritual: [
                "Develops proper understanding of Allah's supreme greatness",
                "Increases humility through recognition of human smallness",
                "Strengthens faith in Allah's unlimited power and authority",
                "Enhances worship quality through awe and reverence"
            ],
            physical: [
                "Increases dignity and noble bearing in appearance",
                "Helps overcome feelings of insignificance or worthlessness",
                "Builds confidence grounded in divine connection"
            ],
            worldly: [
                "Achievement of significant goals and accomplishments",
                "Recognition for greatness in chosen field or profession",
                "Success in endeavors requiring vision and ambition",
                "Respect and admiration from others for achievements"
            ],
            recitationGuidance: [
                "Recite 100 times daily for recognition of greatness",
                "Best when contemplating Allah's creation and majesty",
                "Combine with reflection on divine attributes",
                "Recite when seeking to accomplish great things"
            ]
        },
        quranicReferences: ["Quran 13:9", "Quran 22:62", "Quran 34:23"],
        hadithReferences: [
            "Allah is greater - said in every prayer transition",
            "Nothing is greater than Allah - Traditional"
        ],
        duas: [
            "اللَّهُ أَكْبَرُ كَبِيراً وَالْحَمْدُ لِلَّهِ كَثِيراً - Allah is greatly great and much praise belongs to Allah",
            "اللَّهُمَّ إِنَّكَ أَكْبَرُ مِنْ كُلِّ شَيْءٍ - O Allah, You are greater than everything"
        ]
    },
    {
        id: 38,
        arabic: "الْحَفِيظُ",
        transliteration: "Al-Hafiz",
        english: "The Preserver",
        meaning: "The Guardian",
        description: "The One who protects and preserves all creation from harm and destruction. Al-Hafiz guards His servants, preserves their faith, and maintains the balance of the universe. He remembers all things and keeps safe what He wills.",
        detailedBenefits: {
            spiritual: [
                "Divine protection from spiritual dangers and temptations",
                "Preservation of faith during trials and hardships",
                "Safeguarding of righteous deeds and spiritual progress",
                "Protection from evil influences and negative energies"
            ],
            physical: [
                "Physical safety and protection from accidents",
                "Preservation of health and well-being",
                "Guard against diseases and physical harm"
            ],
            worldly: [
                "Protection of wealth, property, and possessions",
                "Safety of family members and loved ones",
                "Preservation of reputation and honor",
                "Security in travel and dangerous situations"
            ],
            recitationGuidance: [
                "Recite 100 times daily for divine protection",
                "Best before traveling or entering dangerous places",
                "Combine with prayers for family's safety",
                "Recite when feeling vulnerable or threatened"
            ]
        },
        quranicReferences: ["Quran 11:57", "Quran 12:64", "Quran 15:9"],
        hadithReferences: [
            "Allah is the Guardian over everything - Quran 11:57",
            "Allah preserves those who preserve His commands - Traditional"
        ],
        duas: [
            "اللَّهُمَّ احْفَظْنِي بِحِفْظِكَ - O Allah, protect me with Your protection",
            "رَبِّ اجْعَلْنِي فِي حِفْظِكَ وَكَنَفِكَ - My Lord, place me under Your protection and care"
        ]
    },

    {
        id: 39,
        arabic: "الْمُقيتُ",
        transliteration: "Al-Muqeet",
        english: "The Nourisher",
        meaning: "The Sustainer",
        description: "The One who has the power to sustain and nourish all creation. Al-Muqeet provides both physical and spiritual nourishment, ensuring that every living being receives what it needs for survival and growth.",
        detailedBenefits: {
            spiritual: [
                "Spiritual nourishment and growth in faith",
                "Sustenance through difficult spiritual periods",
                "Continuous supply of divine guidance and wisdom",
                "Strengthening of spiritual resolve and determination"
            ],
            physical: [
                "Adequate nutrition and physical sustenance",
                "Strength and energy for daily activities",
                "Recovery from weakness and malnutrition"
            ],
            worldly: [
                "Consistent provision of livelihood and income",
                "Sustenance for family and dependents",
                "Resources needed for personal and professional growth",
                "Support during times of financial difficulty"
            ],
            recitationGuidance: [
                "Recite 100 times for continuous sustenance",
                "Best when seeking provision and nourishment",
                "Combine with gratitude for existing blessings",
                "Recite during times of scarcity or need"
            ]
        },
        quranicReferences: ["Quran 4:85"],
        hadithReferences: [
            "Allah is sufficient as a sustainer - Traditional",
            "Trust in Allah for your sustenance - Traditional"
        ],
        duas: [
            "اللَّهُمَّ أَقِتْنِي وَأَقِتْ عِيَالِي - O Allah, sustain me and sustain my family",
            "رَبِّ اكْفِنِي بِحَلاَلِكَ عَنْ حَرَامِكَ - My Lord, suffice me with Your lawful provision"
        ]
    },

    {
        id: 40,
        arabic: "الْحسيبُ",
        transliteration: "Al-Haseeb",
        english: "The Accounter",
        meaning: "The Reckoner",
        description: "The One who takes account of all deeds and is sufficient for His servants in all their needs. Al-Haseeb judges fairly, accounts for everything precisely, and provides sufficiency for those who trust in Him.",
        detailedBenefits: {
            spiritual: [
                "Develops accountability and consciousness in worship",
                "Increases awareness of divine judgment",
                "Helps in self-reflection and spiritual accounting",
                "Strengthens preparation for the Day of Judgment"
            ],
            physical: [
                "Sufficient health and physical well-being",
                "Balance in bodily functions and systems",
                "Adequate rest and recovery from exertion"
            ],
            worldly: [
                "Sufficiency in all worldly matters and needs",
                "Fair accounting and treatment in business dealings",
                "Justice in legal and financial matters",
                "Contentment with Allah's provision and decisions"
            ],
            recitationGuidance: [
                "Recite 100 times for sufficiency in all matters",
                "Best when seeking Allah's judgment and justice",
                "Combine with self-accountability and reflection",
                "Recite when involved in disputes requiring fair judgment"
            ]
        },
        quranicReferences: ["Quran 4:6", "Quran 4:86", "Quran 33:39"],
        hadithReferences: [
            "Allah is sufficient as a reckoner - Quran 4:6",
            "Whoever relies on Allah, He is sufficient for him - Quran 65:3"
        ],
        duas: [
            "حَسْبِيَ اللَّهُ لاَ إِلَهَ إِلاَّ هُوَ - Allah is sufficient for me, there is no god but Him",
            "اللَّهُمَّ اكْفِنِي بِحَلاَلِكَ عَنْ حَرَامِكَ - O Allah, make Your lawful sufficient for me over unlawful"
        ]
    },

    {
        id: 41,
        arabic: "الْجَلِيلُ",
        transliteration: "Al-Jaleel",
        english: "The Sublime One",
        meaning: "The Majestic",
        description: "The One who possesses majesty, grandeur, and sublime beauty. Al-Jaleel is attributed with greatness of power and glory of status, deserving of reverence and exaltation from all creation.",
        detailedBenefits: {
            spiritual: [
                "Increases reverence and awe for Allah's majesty",
                "Develops humility through recognition of divine grandeur",
                "Enhances quality of worship through proper reverence",
                "Strengthens spiritual connection through divine awe"
            ],
            physical: [
                "Dignified bearing and noble appearance",
                "Increased self-respect and personal dignity",
                "Confidence grounded in divine connection"
            ],
            worldly: [
                "Respect and honor from people",
                "Recognition for noble character and behavior",
                "Success in endeavors requiring dignity and respect",
                "Leadership opportunities based on character"
            ],
            recitationGuidance: [
                "Recite 100 times for increased dignity and respect",
                "Best during contemplation of Allah's majesty",
                "Combine with reflection on divine attributes",
                "Recite when seeking to develop noble character"
            ]
        },
        quranicReferences: ["Quran 7:143", "Quran 55:27", "Quran 55:78"],
        hadithReferences: [
            "Blessed is the name of your Lord, Owner of Majesty and Honor - Quran 55:78",
            "Glory and majesty belong to Allah alone - Traditional"
        ],
        duas: [
            "تَبَارَكَ اسْمُ رَبِّكَ ذِي الْجَلاَلِ وَالإِكْرَامِ - Blessed is the name of your Lord of Majesty and Honor",
            "اللَّهُمَّ أَعِزَّنِي بِجَلاَلِكَ - O Allah, honor me with Your majesty"
        ]
    },

    {
        id: 42,
        arabic: "الْكَرِيمُ",
        transliteration: "Al-Kareem",
        english: "The Generous",
        meaning: "The Bountiful One",
        description: "The One who gives generously without expecting anything in return. Al-Kareem is noble, generous, and honorable, bestowing countless blessings and favors upon His creation with infinite kindness.",
        detailedBenefits: {
            spiritual: [
                "Increases generosity and charitable nature",
                "Develops noble character and honorable behavior",
                "Receives abundant spiritual blessings and rewards",
                "Enhanced ability to give and share with others"
            ],
            physical: [
                "Improved health through positive mental state",
                "Physical beauty and attractive appearance",
                "Strength and vitality from divine blessings"
            ],
            worldly: [
                "Abundant provision and unexpected gifts",
                "Recognition for generous and noble behavior",
                "Success in business through honest and generous dealings",
                "Wealthy and prosperous life through divine generosity"
            ],
            recitationGuidance: [
                "Recite 100 times for increased generosity and provision",
                "Best when seeking Allah's bounty and blessings",
                "Combine with acts of charity and generosity",
                "Recite when facing financial difficulties"
            ]
        },
        quranicReferences: ["Quran 27:40", "Quran 44:49", "Quran 82:6"],
        hadithReferences: [
            "Allah is generous and loves generosity - Tirmidhi",
            "The generous are close to Allah and close to people - Tirmidhi"
        ],
        duas: [
            "اللَّهُمَّ إِنَّكَ كَرِيمٌ تُحِبُّ الْكَرَمَ - O Allah, You are generous and love generosity",
            "رَبِّ أَكْرِمْنِي بِكَرَمِكَ - My Lord, honor me with Your generosity"
        ]
    },

    {
        id: 43,
        arabic: "الرَّقِيبُ",
        transliteration: "Ar-Raqeeb",
        english: "The Watchful",
        meaning: "The Watcher",
        description: "The One who watches over all creation with perfect attention and care. Ar-Raqeeb observes everything - visible and hidden, monitoring all actions, thoughts, and intentions with complete awareness.",
        detailedBenefits: {
            spiritual: [
                "Increases consciousness that Allah watches all actions",
                "Develops mindfulness and awareness in worship",
                "Strengthens accountability and moral behavior",
                "Enhanced spiritual vigilance against sin and temptation"
            ],
            physical: [
                "Better health through conscious lifestyle choices",
                "Protection from harm through divine watchfulness",
                "Improved posture and bearing from consciousness of being watched"
            ],
            worldly: [
                "Success in professions requiring vigilance and attention",
                "Protection from enemies and harmful people",
                "Divine oversight leading to better opportunities",
                "Reputation for trustworthiness and reliability"
            ],
            recitationGuidance: [
                "Recite 100 times for divine protection and guidance",
                "Best when seeking Allah's watchful care",
                "Combine with mindfulness of actions and intentions",
                "Recite when facing situations requiring divine oversight"
            ]
        },
        quranicReferences: ["Quran 4:1", "Quran 5:117"],
        hadithReferences: [
            "Allah is watching over you - Quran 4:1",
            "Worship Allah as if you see Him, for if you don't see Him, He sees you - Bukhari"
        ],
        duas: [
            "اللَّهُمَّ إِنَّكَ رَقِيبٌ عَلَيَّ فَأَعِنِّي - O Allah, You are watchful over me, so help me",
            "رَبِّ اجْعَلْنِي مِنَ الْمُرَاقِبِينَ لأَنْفُسِهِمْ - My Lord, make me among those who watch over themselves"
        ]
    },
    {
        id: 44,
        arabic: "الْمُجِيبُ",
        transliteration: "Al-Mujeeb",
        english: "The Responder to Prayer",
        meaning: "The Responsive",
        description: "The One who answers the prayers and supplications of His servants. Al-Mujeeb responds to those who call upon Him with sincerity and need, providing solutions and relief according to His wisdom and timing.",
        detailedBenefits: {
            spiritual: [
                "Prayers and duas are answered quickly and effectively",
                "Strong spiritual connection through answered supplications",
                "Increased faith through witnessing divine responses",
                "Enhanced quality of prayer and supplication"
            ],
            physical: [
                "Quick recovery from illnesses through prayer",
                "Physical needs met through divine intervention",
                "Healing and relief from pain through supplication"
            ],
            worldly: [
                "Swift resolution of problems and difficulties",
                "Unexpected help and support in times of need",
                "Success in endeavors through prayer and supplication",
                "Doors opening through consistent dua and trust"
            ],
            recitationGuidance: [
                "Recite 100 times when making important duas",
                "Best before and after each prayer session",
                "Combine with sincere supplication and need",
                "Recite when feeling that prayers aren't being answered"
            ]
        },
        quranicReferences: ["Quran 2:186", "Quran 11:61"],
        hadithReferences: [
            "Call upon Me, I will respond to you - Quran 40:60",
            "The supplication of a Muslim for his brother is answered - Muslim"
        ],
        duas: [
            "اللَّهُمَّ إِنَّكَ مُجِيبُ الدُّعَاءِ فَأَجِبْ دُعَائِي - O Allah, You are the answerer of prayer, so answer my prayer",
            "رَبِّ لاَ تَذَرْنِي فَرْداً وَأَنتَ خَيْرُ الْوَارِثِينَ - My Lord, do not leave me alone, and You are the best of inheritors"
        ]
    },

    {
        id: 45,
        arabic: "الْوَاسِعُ",
        transliteration: "Al-Wasi",
        english: "The All-Encompassing",
        meaning: "The Vast",
        description: "The One whose knowledge, mercy, and power encompass everything. Al-Wasi is limitless in all His attributes, and His vastness extends beyond human comprehension, embracing all of creation with infinite capacity.",
        detailedBenefits: {
            spiritual: [
                "Expansion of knowledge and spiritual understanding",
                "Vastness in spiritual capacity and growth",
                "Removal of spiritual limitations and restrictions",
                "Increased awareness of Allah's infinite mercy"
            ],
            physical: [
                "Relief from physical constraints and limitations",
                "Expansion in health and physical well-being",
                "Increased capacity for physical activities"
            ],
            worldly: [
                "Expansion in wealth, opportunities, and provisions",
                "Vastness in business and professional success",
                "Removal of financial and material restrictions",
                "Growth in all aspects of worldly life"
            ],
            recitationGuidance: [
                "Recite 100 times for expansion in all life aspects",
                "Best when feeling restricted or limited",
                "Combine with prayers for vastness in provision",
                "Recite when seeking growth and expansion"
            ]
        },
        quranicReferences: ["Quran 2:115", "Quran 2:247", "Quran 3:73"],
        hadithReferences: [
            "Allah's mercy encompasses everything - Quran 7:156",
            "My mercy encompasses all things - Quran 7:156"
        ],
        duas: [
            "اللَّهُمَّ وَسِّعْ عَلَيَّ فِي رِزْقِي وَعَمَلِي - O Allah, expand for me in my provision and work",
            "رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي - My Lord, expand my chest and ease my affairs"
        ]
    },

    {
        id: 46,
        arabic: "الْحَكِيمُ",
        transliteration: "Al-Hakeem",
        english: "The Perfectly Wise",
        meaning: "The Wise",
        description: "The One who is perfect in wisdom, placing everything in its proper place and time. Al-Hakeem makes decisions with complete knowledge and perfect judgment, ensuring that everything serves a greater purpose.",
        detailedBenefits: {
            spiritual: [
                "Development of wisdom in religious and spiritual matters",
                "Understanding of divine wisdom behind life's trials",
                "Increased ability to make sound religious decisions",
                "Enhanced comprehension of Islamic teachings"
            ],
            physical: [
                "Wisdom in health-related choices and lifestyle",
                "Sound judgment in physical activities and exercises",
                "Balanced approach to physical well-being"
            ],
            worldly: [
                "Excellence in decision-making and problem-solving",
                "Success in professions requiring wisdom and judgment",
                "Recognition as a wise and knowledgeable person",
                "Ability to give sound advice and guidance"
            ],
            recitationGuidance: [
                "Recite 100 times when facing important decisions",
                "Best before consultations and decision-making",
                "Combine with seeking guidance and clarity",
                "Recite when needing wisdom in complex situations"
            ]
        },
        quranicReferences: ["Quran 2:32", "Quran 3:6", "Quran 31:27"],
        hadithReferences: [
            "Wisdom is the lost property of the believer - Tirmidhi",
            "Allah gives wisdom to whom He wills - Quran 2:269"
        ],
        duas: [
            "رَبِّ اجْعَلْنِي مِنَ الْحُكَمَاءِ - My Lord, make me among the wise",
            "اللَّهُمَّ آتِنِي الْحِكْمَةَ وَفَصْلَ الْخِطَابِ - O Allah, grant me wisdom and decisive speech"
        ]
    },

    {
        id: 47,
        arabic: "الْوَدُودُ",
        transliteration: "Al-Wadood",
        english: "The Loving One",
        meaning: "The Most Loving",
        description: "The One who loves His righteous servants and is beloved by them. Al-Wadood shows affection and care to His creation, and those who love Him receive His special love and closeness in return.",
        detailedBenefits: {
            spiritual: [
                "Experience of Allah's love and divine affection",
                "Increased love for Allah and religious practices",
                "Development of loving and caring spiritual nature",
                "Enhanced emotional connection with Islamic teachings"
            ],
            physical: [
                "Emotional healing and recovery from heartbreak",
                "Increased capacity for love and affection",
                "Physical manifestation of inner peace and contentment"
            ],
            worldly: [
                "Love and affection from family, friends, and community",
                "Harmonious and loving relationships",
                "Success in professions involving care and compassion",
                "Being beloved and appreciated by others"
            ],
            recitationGuidance: [
                "Recite 100 times for increased love and affection",
                "Best when seeking healing from relationship problems",
                "Combine with acts of love and kindness to others",
                "Recite when feeling unloved or lonely"
            ]
        },
        quranicReferences: ["Quran 11:90", "Quran 85:14"],
        hadithReferences: [
            "Allah loves those who love Him - Traditional",
            "When Allah loves a servant, He calls Gabriel and tells him: I love so-and-so - Bukhari"
        ],
        duas: [
            "اللَّهُمَّ إِنِّي أَسْأَلُكَ حُبَّكَ وَحُبَّ مَنْ يُحِبُّكَ - O Allah, I ask You for Your love and the love of those who love You",
            "رَبِّ اجْعَلْنِي مِنَ الْمُحِبِّينَ الْمَحْبُوبِينَ - My Lord, make me among the loving and beloved"
        ]
    },

    {
        id: 48,
        arabic: "الْمَجِيدُ",
        transliteration: "Al-Majeed",
        english: "The Magnificent",
        meaning: "The Most Glorious",
        description: "The One who has reached the highest degree of glory, honor, and magnificence. Al-Majeed possesses perfect glory that encompasses all noble qualities and deserves all praise and exaltation.",
        detailedBenefits: {
            spiritual: [
                "Development of glorious and noble character",
                "Increased honor and respect in religious circles",
                "Enhanced spiritual magnificence and dignity",
                "Recognition for righteous deeds and spiritual excellence"
            ],
            physical: [
                "Dignified and noble physical appearance",
                "Increased self-respect and personal honor",
                "Confidence and poise in physical presence"
            ],
            worldly: [
                "Achievement of glory and magnificence in chosen field",
                "Recognition and honor for accomplishments",
                "Success in endeavors requiring excellence and perfection",
                "Reputation for magnificence and superior quality"
            ],
            recitationGuidance: [
                "Recite 100 times for increased glory and magnificence",
                "Best when seeking excellence and superior achievement",
                "Combine with striving for perfection in work",
                "Recite when desiring noble reputation and honor"
            ]
        },
        quranicReferences: ["Quran 11:73", "Quran 85:15"],
        hadithReferences: [
            "Allah is beautiful and loves beauty - Muslim",
            "Excellence is that you worship Allah as if you see Him - Bukhari"
        ],
        duas: [
            "اللَّهُمَّ أَكْرِمْنِي بِمَجْدِكَ وَعِزِّكَ - O Allah, honor me with Your glory and might",
            "رَبِّ اجْعَلْنِي مِنَ الْمُمَجَّدِينَ فِي الدُّنْيَا وَالآخِرَةِ - My Lord, make me among the glorified in this world and the hereafter"
        ]
    },
    {
        id: 49,
        arabic: "الْبَاعِثُ",
        transliteration: "Al-Ba'ith",
        english: "The Resurrector",
        meaning: "The Raiser of the Dead",
        description: "The One who resurrects and raises the dead for reward and punishment. Al-Ba'ith brings new life to what was dead, both literally and figuratively, reviving hope, faith, and opportunities that seemed lost forever.",
        detailedBenefits: {
            spiritual: [
                "Revival of dead or weakened faith and spiritual connection",
                "Resurrection of hope after periods of despair",
                "Renewal of motivation for worship and righteous deeds",
                "Strengthening belief in afterlife and divine justice"
            ],
            physical: [
                "Recovery from serious illnesses and life-threatening conditions",
                "Revival of energy and vitality after exhaustion",
                "Healing from conditions that seemed hopeless"
            ],
            worldly: [
                "Revival of dead or failing business ventures",
                "Resurrection of lost opportunities and relationships",
                "New beginnings after major setbacks or failures",
                "Bringing life to stagnant projects or situations"
            ],
            recitationGuidance: [
                "Recite 100 times when seeking revival in any aspect of life",
                "Best during times of despair or hopelessness",
                "Combine with prayers for new beginnings",
                "Recite when facing seemingly impossible situations"
            ]
        },
        quranicReferences: ["Quran 2:56", "Quran 16:38", "Quran 30:50"],
        hadithReferences: [
            "He who gives life to dead land, it belongs to him - Bukhari",
            "Allah will resurrect people according to their intentions - Bukhari"
        ],
        duas: [
            "اللَّهُمَّ أَحْيِ قَلْبِي وَأَحْيِ أَمْرِي - O Allah, revive my heart and revive my affairs",
            "رَبِّ اجْعَلْنِي مِنَ الْمُحْيِينَ لأَنْفُسِهِمْ - My Lord, make me among those who revive themselves"
        ]
    },

    {
        id: 50,
        arabic: "الشَّهِيدُ",
        transliteration: "Ash-Shaheed",
        english: "The Witness",
        meaning: "The All-Witnessing",
        description: "The One who witnesses everything and nothing is hidden from Him. Ash-Shaheed observes all actions, thoughts, and intentions, serving as the ultimate witness to all that occurs in creation.",
        detailedBenefits: {
            spiritual: [
                "Increased consciousness that Allah witnesses all actions",
                "Development of truthfulness and honesty in all dealings",
                "Enhanced accountability in worship and moral behavior",
                "Protection from false accusations through divine testimony"
            ],
            physical: [
                "Protection from harm through divine witnessing",
                "Courage to stand for truth even when alone",
                "Strength to bear witness to right and wrong"
            ],
            worldly: [
                "Success in legal matters through divine testimony",
                "Recognition and validation for truthful conduct",
                "Protection from slander and false allegations",
                "Credibility and trustworthiness among people"
            ],
            recitationGuidance: [
                "Recite 100 times for divine protection and testimony",
                "Best when facing false accusations or injustice",
                "Combine with commitment to truthfulness",
                "Recite when needing divine witness in difficult situations"
            ]
        },
        quranicReferences: ["Quran 4:79", "Quran 4:166", "Quran 48:28"],
        hadithReferences: [
            "Allah is witness over everything - Quran 58:6",
            "The best jihad is a word of truth spoken before a tyrannical ruler - Tirmidhi"
        ],
        duas: [
            "اللَّهُمَّ اشْهَدْ أَنِّي أَشْهَدُ أَنْ لاَ إِلَهَ إِلاَّ أَنْتَ - O Allah, bear witness that I testify there is no god but You",
            "رَبِّ اجْعَلْنِي مِنَ الشَّاهِدِينَ بِالْحَقِّ - My Lord, make me among those who bear witness to truth"
        ]
    },

    {
        id: 51,
        arabic: "الْحَقُّ",
        transliteration: "Al-Haqq",
        english: "The Truth",
        meaning: "The Absolute Truth",
        description: "The One who is the embodiment of truth and whose existence is the ultimate reality. Al-Haqq represents absolute truth that never changes, and everything else derives its reality from Him.",
        detailedBenefits: {
            spiritual: [
                "Revelation and understanding of absolute truth",
                "Guidance to distinguish between right and wrong",
                "Strengthening of faith through recognition of divine truth",
                "Protection from falsehood and spiritual deception"
            ],
            physical: [
                "Clarity of mind and sound judgment",
                "Protection from lies and deceptive people",
                "Strength to uphold truth despite difficulties"
            ],
            worldly: [
                "Success in endeavors based on truth and honesty",
                "Recognition as a truthful and reliable person",
                "Victory in legal matters through presentation of truth",
                "Prosperity through honest and truthful dealings"
            ],
            recitationGuidance: [
                "Recite 100 times when seeking truth and clarity",
                "Best when facing confusion or deception",
                "Combine with commitment to truthfulness",
                "Recite when needing divine guidance to truth"
            ]
        },
        quranicReferences: ["Quran 6:62", "Quran 18:44", "Quran 22:6"],
        hadithReferences: [
            "Truth leads to righteousness - Bukhari",
            "Stick to truth even if it is bitter - Traditional"
        ],
        duas: [
            "اللَّهُمَّ أَرِنِي الْحَقَّ حَقّاً وَارْزُقْنِي اتِّبَاعَهُ - O Allah, show me truth as truth and grant me following it",
            "رَبِّ اهْدِنِي إِلَى الْحَقِّ - My Lord, guide me to the truth"
        ]
    },

    {
        id: 52,
        arabic: "الْوَكِيلُ",
        transliteration: "Al-Wakeel",
        english: "The Trustee",
        meaning: "The Dependable",
        description: "The One who can be trusted completely and relied upon to manage all affairs perfectly. Al-Wakeel takes care of those who trust in Him, handling their matters with perfect wisdom and care.",
        detailedBenefits: {
            spiritual: [
                "Complete trust and reliance on Allah in all matters",
                "Peace of mind through surrendering affairs to Allah",
                "Spiritual growth through practicing tawakkul (trust)",
                "Relief from anxiety through divine dependability"
            ],
            physical: [
                "Reduced stress and anxiety through trusting Allah",
                "Better health through decreased worry",
                "Strength to face challenges with divine support"
            ],
            worldly: [
                "Perfect management of affairs by Allah",
                "Success through trusting divine guidance",
                "Solutions to problems through divine intervention",
                "Prosperity through relying on Allah's provision"
            ],
            recitationGuidance: [
                "Recite 100 times when entrusting affairs to Allah",
                "Best during times of uncertainty or difficulty",
                "Combine with practicing complete trust in Allah",
                "Recite when facing overwhelming responsibilities"
            ]
        },
        quranicReferences: ["Quran 3:173", "Quran 4:171", "Quran 28:28"],
        hadithReferences: [
            "Whoever relies on Allah, He is sufficient for him - Quran 65:3",
            "Trust in Allah with complete reliance - Traditional"
        ],
        duas: [
            "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ - Allah is sufficient for us and the best trustee",
            "اللَّهُمَّ إِنِّي أَسْتَوْدِعُكَ أَمْرِي - O Allah, I entrust my affairs to You"
        ]
    },

    {
        id: 53,
        arabic: "الْقَوِيُّ",
        transliteration: "Al-Qawiyy",
        english: "The Possessor of All Strength",
        meaning: "The Most Strong",
        description: "The One who possesses complete and perfect strength that never diminishes. Al-Qawiyy has absolute power over all things and is never overcome by weakness or fatigue.",
        detailedBenefits: {
            spiritual: [
                "Spiritual strength and resilience in faith",
                "Power to overcome spiritual weaknesses and temptations",
                "Strength to maintain consistency in worship",
                "Fortitude to face religious challenges and opposition"
            ],
            physical: [
                "Increased physical strength and endurance",
                "Recovery from weakness and fatigue",
                "Energy and vitality for daily tasks and responsibilities"
            ],
            worldly: [
                "Strength to overcome obstacles and challenges",
                "Power to achieve difficult goals and ambitions",
                "Resilience in facing setbacks and failures",
                "Leadership strength and authority"
            ],
            recitationGuidance: [
                "Recite 100 times when needing strength and power",
                "Best during times of weakness or exhaustion",
                "Combine with physical and spiritual effort",
                "Recite when facing strong opposition or challenges"
            ]
        },
        quranicReferences: ["Quran 11:66", "Quran 22:40", "Quran 42:19"],
        hadithReferences: [
            "The strong believer is better than the weak believer - Muslim",
            "Allah loves strength in all matters - Traditional"
        ],
        duas: [
            "اللَّهُمَّ قَوِّنِي فِي دِينِي وَدُنْيَايَ - O Allah, strengthen me in my religion and worldly life",
            "رَبِّ اجْعَلْنِي مِنَ الْأَقْوِيَاءِ - My Lord, make me among the strong"
        ]
    },

    {
        id: 54,
        arabic: "الْمَتِينُ",
        transliteration: "Al-Mateen",
        english: "The Forceful One",
        meaning: "The Firm",
        description: "The One whose strength is unshakeable and uninterrupted. Al-Mateen possesses firmness that never wavers and power that never diminishes, providing stability and steadfastness to His creation.",
        detailedBenefits: {
            spiritual: [
                "Firmness and steadfastness in religious beliefs",
                "Unwavering commitment to Islamic principles",
                "Stability in spiritual practices and worship",
                "Strength to remain firm against spiritual challenges"
            ],
            physical: [
                "Physical stability and balance in movement",
                "Strong foundation for health and well-being",
                "Endurance and lasting strength"
            ],
            worldly: [
                "Firm foundation in business and career",
                "Stability in relationships and social connections",
                "Steadfastness in pursuing goals and ambitions",
                "Reliable and dependable reputation"
            ],
            recitationGuidance: [
                "Recite 100 times for firmness and stability",
                "Best when seeking steadfastness in any matter",
                "Combine with commitment to consistency",
                "Recite when facing instability or uncertainty"
            ]
        },
        quranicReferences: ["Quran 51:58"],
        hadithReferences: [
            "The most beloved deeds to Allah are the most consistent - Bukhari",
            "Firmness in religion is a sign of strong faith - Traditional"
        ],
        duas: [
            "اللَّهُمَّ ثَبِّتْنِي عَلَى دِينِكَ - O Allah, make me firm upon Your religion",
            "رَبِّ اجْعَلْنِي مِنَ الثَّابِتِينَ - My Lord, make me among the steadfast"
        ]
    },
    {
        id: 55,
        arabic: "الْوَلِيُّ",
        transliteration: "Al-Waliyy",
        english: "The Protecting Friend",
        meaning: "The Protector",
        description: "The One who is the friend, protector, and guardian of the believers. Al-Waliyy guides His servants, supports them in difficulties, and takes care of their affairs with love and wisdom.",
        detailedBenefits: {
            spiritual: [
                "Divine friendship and closeness to Allah",
                "Spiritual guidance and protection from misguidance",
                "Support in maintaining religious commitments",
                "Enhanced love and connection with Allah"
            ],
            physical: [
                "Physical protection from harm and danger",
                "Safety during travel and in unfamiliar places",
                "Guard against accidents and mishaps"
            ],
            worldly: [
                "Loyal and trustworthy friends and supporters",
                "Protection in legal and business matters",
                "Divine assistance in achieving goals",
                "Success through righteous companionship"
            ],
            recitationGuidance: [
                "Recite 100 times for divine friendship and protection",
                "Best when seeking Allah's guidance and support",
                "Combine with prayers for righteous companionship",
                "Recite when feeling alone or unsupported"
            ]
        },
        quranicReferences: ["Quran 2:257", "Quran 3:68", "Quran 42:28"],
        hadithReferences: [
            "Allah is the friend of those who believe - Quran 2:257",
            "The believers are friends and protectors of one another - Traditional"
        ],
        duas: [
            "اللَّهُمَّ كُنْ لِي وَلِيّاً وَنَصِيراً - O Allah, be my protector and helper",
            "رَبِّ اجْعَلْنِي مِنْ أَوْلِيَائِكَ الْمُتَّقِينَ - My Lord, make me among Your righteous friends"
        ]
    },

    {
        id: 56,
        arabic: "الْحَمِيدُ",
        transliteration: "Al-Hameed",
        english: "The Praised One",
        meaning: "The Praiseworthy",
        description: "The One who deserves all praise and is worthy of all thanks at all times. Al-Hameed is perfect in all His attributes and actions, making Him deserving of continuous praise and gratitude.",
        detailedBenefits: {
            spiritual: [
                "Development of grateful heart and praising nature",
                "Increased recognition of Allah's countless blessings",
                "Enhanced worship quality through proper praise",
                "Spiritual elevation through continuous gratitude"
            ],
            physical: [
                "Better health through positive mental attitude",
                "Increased energy from practicing gratitude",
                "Physical well-being through appreciation"
            ],
            worldly: [
                "Recognition and praise from others for good character",
                "Success through maintaining positive attitude",
                "Reputation as a thankful and appreciative person",
                "Blessings multiplied through gratitude"
            ],
            recitationGuidance: [
                "Recite 100 times while reflecting on Allah's blessings",
                "Best after receiving any blessing or success",
                "Combine with counting and acknowledging favors",
                "Recite when seeking to develop grateful nature"
            ]
        },
        quranicReferences: ["Quran 2:267", "Quran 14:1", "Quran 35:15"],
        hadithReferences: [
            "All praise belongs to Allah, Lord of the worlds - Quran 1:2",
            "If you are grateful, I will certainly give you more - Quran 14:7"
        ],
        duas: [
            "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ - All praise belongs to Allah, Lord of the worlds",
            "اللَّهُمَّ لَكَ الْحَمْدُ كُلُّهُ - O Allah, all praise belongs to You"
        ]
    },

    {
        id: 57,
        arabic: "الْمُحْصِي",
        transliteration: "Al-Muhsee",
        english: "The Accounter",
        meaning: "The Counter",
        description: "The One who has complete knowledge of the count and measure of all things. Al-Muhsee knows the exact number of everything in creation and keeps perfect record of all deeds and actions.",
        detailedBenefits: {
            spiritual: [
                "Increased consciousness of divine accountability",
                "Better spiritual record-keeping and self-monitoring",
                "Enhanced awareness that all deeds are counted",
                "Motivation for consistent righteous actions"
            ],
            physical: [
                "Better organization and management of physical health",
                "Systematic approach to wellness and fitness",
                "Accurate assessment of physical needs"
            ],
            worldly: [
                "Excellence in accounting, mathematics, and precise work",
                "Success in professions requiring accuracy and detail",
                "Reputation for reliability and precision",
                "Efficient management of resources and time"
            ],
            recitationGuidance: [
                "Recite 100 times for accuracy and precision in work",
                "Best when needing divine help with detailed tasks",
                "Combine with careful attention to spiritual duties",
                "Recite when seeking to improve organizational skills"
            ]
        },
        quranicReferences: ["Quran 19:94", "Quran 72:28"],
        hadithReferences: [
            "Allah has counted everything by number - Quran 72:28",
            "No soul will die until it completes its provision - Traditional"
        ],
        duas: [
            "اللَّهُمَّ أَحْصِ لِي حَسَنَاتِي وَلاَ تُحْصِ عَلَيَّ سَيِّئَاتِي - O Allah, count my good deeds and don't count my bad deeds",
            "رَبِّ اجْعَلْنِي مِنَ الْمُحَاسِبِينَ لأَنْفُسِهِمْ - My Lord, make me among those who account for themselves"
        ]
    },

    {
        id: 58,
        arabic: "الْمُبْدِئُ",
        transliteration: "Al-Mubdi",
        english: "The Originator",
        meaning: "The Producer",
        description: "The One who begins and originates all creation from nothing. Al-Mubdi starts all processes and brings into existence everything that exists, creating the first of everything.",
        detailedBenefits: {
            spiritual: [
                "Inspiration for new spiritual beginnings and practices",
                "Motivation to start righteous projects and initiatives",
                "Fresh spiritual energy and enthusiasm",
                "Ability to originate beneficial religious activities"
            ],
            physical: [
                "Energy and motivation to start new health routines",
                "Successful initiation of positive lifestyle changes",
                "Beginning new phases of physical improvement"
            ],
            worldly: [
                "Success in starting new businesses and ventures",
                "Innovation and creativity in professional endeavors",
                "Leadership in initiating beneficial projects",
                "Recognition as a pioneer and originator"
            ],
            recitationGuidance: [
                "Recite 100 times when starting new projects or ventures",
                "Best at the beginning of new endeavors",
                "Combine with prayers for successful beginnings",
                "Recite when seeking inspiration for innovation"
            ]
        },
        quranicReferences: ["Quran 10:4", "Quran 10:34", "Quran 85:13"],
        hadithReferences: [
            "Allah began creation and will repeat it - Quran 10:4",
            "Every beginning requires Allah's blessing - Traditional"
        ],
        duas: [
            "اللَّهُمَّ بَارِكْ لِي فِي بِدَايَتِي - O Allah, bless me in my beginning",
            "رَبِّ يَسِّرْ لِي بِدَايَةً مُبَارَكَةً - My Lord, make easy for me a blessed beginning"
        ]
    },

    {
        id: 59,
        arabic: "الْمُعِيدُ",
        transliteration: "Al-Mueed",
        english: "The Restorer",
        meaning: "The Reproducer",
        description: "The One who restores and brings back creation as it was. Al-Mueed repeats creation, renews what was old, and restores what was lost or damaged according to His will and wisdom.",
        detailedBenefits: {
            spiritual: [
                "Restoration of lost faith and spiritual connection",
                "Renewal of religious enthusiasm and devotion",
                "Revival of abandoned good practices and habits",
                "Second chances in spiritual development"
            ],
            physical: [
                "Recovery and restoration of health after illness",
                "Renewal of physical strength and vitality",
                "Restoration of bodily functions and abilities"
            ],
            worldly: [
                "Recovery of lost wealth, opportunities, or status",
                "Restoration of damaged relationships and reputation",
                "Revival of failing businesses or projects",
                "Return of what was thought permanently lost"
            ],
            recitationGuidance: [
                "Recite 100 times when seeking restoration of something lost",
                "Best during recovery periods or renewal phases",
                "Combine with prayers for second chances",
                "Recite when hoping for revival of past successes"
            ]
        },
        quranicReferences: ["Quran 10:4", "Quran 10:34", "Quran 85:13"],
        hadithReferences: [
            "As He began creation, He will repeat it - Quran 10:4",
            "Allah loves those who turn to Him repeatedly - Traditional"
        ],
        duas: [
            "اللَّهُمَّ أَعِدْ لِي مَا فَقَدْتُ - O Allah, restore to me what I have lost",
            "رَبِّ اجْعَلْ لِي مِنْ أَمْرِي يُسْراً - My Lord, make my affairs easy for me"
        ]
    },

    {
        id: 60,
        arabic: "الْمُحْيِي",
        transliteration: "Al-Muhyee",
        english: "The Giver of Life",
        meaning: "The Reviver",
        description: "The One who gives life to the dead and brings life to everything. Al-Muhyee revives both physical and spiritual life, bringing vitality to what was lifeless and hope to what was hopeless.",
        detailedBenefits: {
            spiritual: [
                "Revival of spiritual life and religious enthusiasm",
                "Restoration of hope after periods of despair",
                "Renewal of faith and connection with Allah",
                "Spiritual awakening and enlightenment"
            ],
            physical: [
                "Healing from life-threatening conditions and diseases",
                "Restoration of health and physical vitality",
                "Recovery from states of exhaustion and weakness"
            ],
            worldly: [
                "Bringing life to dead projects and endeavors",
                "Revival of failing relationships and partnerships",
                "Restoration of lost opportunities and possibilities",
                "Renewal of motivation and purpose in life"
            ],
            recitationGuidance: [
                "Recite 100 times when seeking revival in any aspect",
                "Best during times of spiritual or physical weakness",
                "Combine with prayers for renewed life and energy",
                "Recite when facing seemingly hopeless situations"
            ]
        },
        quranicReferences: ["Quran 2:73", "Quran 8:24", "Quran 30:50"],
        hadithReferences: [
            "Know that Allah gives life to the earth after its death - Quran 57:17",
            "The one who revives a dead land, it belongs to him - Bukhari"
        ],
        duas: [
            "اللَّهُمَّ أَحْيِ قَلْبِي بِذِكْرِكَ - O Allah, give life to my heart with Your remembrance",
            "رَبِّ اجْعَلْنِي مِنَ الْأَحْيَاءِ الطَّيِّبِينَ - My Lord, make me among the good living ones"
        ]
    },
    {
        id: 61,
        arabic: "الْمُمِيتُ",
        transliteration: "Al-Mumeet",
        english: "The Taker of Life",
        meaning: "The Creator of Death",
        description: "The One who causes death and renders the living dead according to His divine wisdom and timing. Al-Mumeet reminds us of life's temporary nature and the importance of preparing for the eternal journey ahead.",
        detailedBenefits: {
            spiritual: [
                "Develops awareness of life's temporary nature",
                "Increases preparation for the afterlife and judgment",
                "Strengthens detachment from worldly desires",
                "Enhances focus on eternal matters and spiritual growth"
            ],
            physical: [
                "Helps control excessive desires and passions",
                "Brings calmness to those afraid of death",
                "Reduces attachment to harmful physical habits"
            ],
            worldly: [
                "Develops proper perspective on worldly achievements",
                "Reduces excessive materialism and greed",
                "Encourages charitable giving and good deeds",
                "Helps overcome fear of loss and change"
            ],
            recitationGuidance: [
                "Recite with hands on chest before sleep to control passions",
                "Best for spiritual reflection and contemplation",
                "Combine with prayers for good ending (husnul khatimah)",
                "Recite when struggling with worldly attachments"
            ]
        },
        quranicReferences: ["Quran 2:28", "Quran 3:156", "Quran 57:2"],
        hadithReferences: [
            "Remember often the destroyer of pleasures: death - Tirmidhi",
            "Live in this world as if you are a stranger or a traveler - Bukhari"
        ],
        duas: [
            "اللَّهُمَّ أَحْيِنِي مَا كَانَتِ الْحَيَاةُ خَيْراً لِي - O Allah, keep me alive as long as life is better for me",
            "اللَّهُمَّ اجْعَلْ خَيْرَ عُمُرِي آخِرَهُ - O Allah, make the best part of my life its end"
        ]
    },

    {
        id: 62,
        arabic: "الْحَيُّ",
        transliteration: "Al-Hayy",
        english: "The Ever Living One",
        meaning: "The Alive",
        description: "The One who is eternally alive and will never die. Al-Hayy possesses perfect life that is the source of all other life, and His existence is continuous without beginning or end.",
        detailedBenefits: {
            spiritual: [
                "Brings vitality and energy to spiritual life",
                "Strengthens connection with the source of all life",
                "Enhances enthusiasm for worship and religious duties",
                "Develops appreciation for the gift of spiritual life"
            ],
            physical: [
                "Promotes long life and good health",
                "Increases physical energy and vitality",
                "Aids in recovery from serious illnesses",
                "Brings peace and restful sleep"
            ],
            worldly: [
                "Brings life and energy to projects and endeavors",
                "Revitalizes failing relationships and partnerships",
                "Increases motivation and purpose in daily activities",
                "Success in life-giving professions like medicine"
            ],
            recitationGuidance: [
                "Recite 500 times before sunrise for peace",
                "Best for those seeking long life and health",
                "Combine with Al-Qayyum for removing lethargy",
                "Recite when feeling spiritually or physically weak"
            ]
        },
        quranicReferences: ["Quran 2:255", "Quran 3:2", "Quran 20:111"],
        hadithReferences: [
            "Allah is Ever-Living and does not die - Quran 25:58",
            "The best dhikr is La ilaha illa Allah - Tirmidhi"
        ],
        duas: [
            "يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ - O Ever-Living, O Self-Sustaining, by Your mercy I seek help",
            "لاَ إِلَهَ إِلاَّ أَنتَ سُبْحَانَكَ - There is no god but You, glory be to You"
        ]
    },

    {
        id: 63,
        arabic: "الْقَيُّومُ",
        transliteration: "Al-Qayyoom",
        english: "The Self Existing One",
        meaning: "The Self-Sustaining",
        description: "The One who stands alone in perfect independence, sustaining all creation while needing no sustenance Himself. Al-Qayyoom maintains and manages the entire universe with perfect wisdom.",
        detailedBenefits: {
            spiritual: [
                "Develops self-reliance through divine dependence",
                "Provides spiritual sustenance and continuous guidance",
                "Strengthens independence from creation's approval",
                "Enhances understanding of Allah's perfect management"
            ],
            physical: [
                "Provides sustained energy and physical support",
                "Helps maintain physical balance and stability",
                "Aids in developing good posture and bearing"
            ],
            worldly: [
                "Success in management and leadership positions",
                "Financial independence and self-sufficiency",
                "Strong friendships and social connections",
                "Excellence in memorization and learning"
            ],
            recitationGuidance: [
                "Recite at Fajr time for friendship and social success",
                "Recite 16 times daily for memory enhancement",
                "Best in seclusion for affluence and wealth",
                "Combine with Al-Hayy to remove laziness"
            ]
        },
        quranicReferences: ["Quran 2:255", "Quran 3:2", "Quran 20:111"],
        hadithReferences: [
            "Allah stands in need of none of the creation - Quran 3:97",
            "He is the Self-Sufficient, worthy of all praise - Quran 35:15"
        ],
        duas: [
            "يَا قَيُّومُ لاَ تَنَامُ أَصْلِحْ لِي دِينِي - O Self-Sustaining who does not sleep, rectify my religion",
            "اللَّهُمَّ بِاسْمِكَ الْقَيُّومِ أَقُومُ وَأَقْعُدُ - O Allah, by Your name Al-Qayyoom I stand and sit"
        ]
    },

    {
        id: 64,
        arabic: "الْوَاجِدُ",
        transliteration: "Al-Wajid",
        english: "The Finder",
        meaning: "The Resourceful",
        description: "The One who finds and possesses everything He seeks, who lacks nothing and is completely independent. Al-Wajid has perfect knowledge and reaches every goal with absolute capability.",
        detailedBenefits: {
            spiritual: [
                "Helps in finding spiritual guidance and direction",
                "Discovers hidden spiritual treasures and insights",
                "Finds solutions to religious doubts and questions",
                "Develops richness of heart and spiritual contentment"
            ],
            physical: [
                "Helps find lost items and possessions",
                "Discovers remedies and cures for ailments",
                "Finds physical strength when needed"
            ],
            worldly: [
                "Success in finding employment and opportunities",
                "Discovers hidden talents and abilities",
                "Finds reliable partners and trustworthy friends",
                "Achieves financial independence and richness"
            ],
            recitationGuidance: [
                "Recite frequently for richness of heart",
                "Best when seeking something lost or needed",
                "Combine with prayers for divine guidance",
                "Recite when feeling spiritually or materially poor"
            ]
        },
        quranicReferences: ["Quran 38:44"],
        hadithReferences: [
            "And Allah found you lost and guided you - Quran 93:7",
            "Whoever seeks Allah will find Him - Traditional"
        ],
        duas: [
            "اللَّهُمَّ أَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ - O Allah, make me independent through Your grace from all besides You",
            "رَبِّ اهْدِنِي فِيمَنْ هَدَيْتَ - My Lord, guide me among those You have guided"
        ]
    },

    {
        id: 65,
        arabic: "الْمَاجِدُ",
        transliteration: "Al-Majid",
        english: "The Glorious",
        meaning: "The Noble",
        description: "The One who possesses perfect glory, honor, and nobility. Al-Majid is distinguished by supreme excellence and magnificent attributes that inspire awe and reverence in all creation.",
        detailedBenefits: {
            spiritual: [
                "Fills the heart with divine light and spiritual majesty",
                "Increases honor and respect in religious circles",
                "Develops noble character and dignified behavior",
                "Enhances appreciation for Allah's glorious attributes"
            ],
            physical: [
                "Brings dignity and noble bearing to appearance",
                "Increases self-confidence and personal presence",
                "Helps maintain composure in challenging situations"
            ],
            worldly: [
                "Achievement of glory and recognition in chosen field",
                "Success in endeavors requiring excellence and nobility",
                "Reputation for honor and distinguished character",
                "Leadership opportunities based on noble qualities"
            ],
            recitationGuidance: [
                "Recite in privacy and sincerity for heart enlightenment",
                "Best when seeking honor and recognition",
                "Combine with striving for excellence in all matters",
                "Recite when needing dignity in difficult situations"
            ]
        },
        quranicReferences: ["Quran 11:73", "Quran 85:15"],
        hadithReferences: [
            "Glory and honor belong to Allah - Traditional",
            "Allah loves excellence in all things - Traditional"
        ],
        duas: [
            "اللَّهُمَّ أَكْرِمْنِي بِمَجْدِكَ - O Allah, honor me with Your glory",
            "رَبِّ اجْعَلْنِي مِنَ الْمُكْرَمِينَ - My Lord, make me among the honored"
        ]
    },

    {
        id: 66,
        arabic: "الْوَاحِدُ",
        transliteration: "Al-Wahid",
        english: "The Only One",
        meaning: "The Unique",
        description: "The One who is absolutely unique and singular, having no partner, equal, or comparison. Al-Wahid is One in His essence, attributes, and actions, deserving exclusive worship and devotion.",
        detailedBenefits: {
            spiritual: [
                "Strengthens belief in absolute oneness of Allah (Tawheed)",
                "Removes polytheistic thoughts and practices",
                "Develops singular focus and devotion to Allah",
                "Frees from fear and delusion through divine unity"
            ],
            physical: [
                "Brings unity and harmony to physical health",
                "Helps overcome internal conflicts and contradictions",
                "Promotes integrated and balanced lifestyle"
            ],
            worldly: [
                "Unity in family relationships and social connections",
                "Success through focused and singular dedication",
                "Leadership through unified vision and purpose",
                "Recognition for unique talents and contributions"
            ],
            recitationGuidance: [
                "Recite 1000 times in privacy to overcome fear and delusion",
                "Best in quiet places for spiritual concentration",
                "Combine with reflection on Allah's absolute uniqueness",
                "Recite when facing confusion or spiritual doubt"
            ]
        },
        quranicReferences: ["Quran 2:163", "Quran 18:110", "Quran 41:6"],
        hadithReferences: [
            "Your God is One God - Quran 2:163",
            "Say: He is Allah, the One - Quran 112:1"
        ],
        duas: [
            "لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ - There is no god but Allah, alone without partner",
            "اللَّهُمَّ أَنتَ الْوَاحِدُ الأَحَدُ الصَّمَدُ - O Allah, You are the One, the Unique, the Eternal"
        ]
    },
    {
        id: 67,
        arabic: "الأَحَد",
        transliteration: "Al-Ahad",
        english: "The One",
        meaning: "The Indivisible",
        description: "The One who is absolutely indivisible and represents perfect unity. Al-Ahad is uniquely one, without parts, division, or multiplicity, representing the purest form of oneness that encompasses all existence.",
        detailedBenefits: {
            spiritual: [
                "Purifies belief in absolute oneness and unity of Allah",
                "Removes divisions and conflicts in spiritual understanding",
                "Opens certain spiritual secrets and divine mysteries",
                "Develops unified focus in worship and devotion"
            ],
            physical: [
                "Brings unity and harmony to physical health",
                "Helps overcome internal physical conflicts",
                "Promotes integrated approach to wellness"
            ],
            worldly: [
                "Unity in family and social relationships",
                "Success through focused and undivided attention",
                "Resolution of conflicts through unified approach",
                "Recognition for unique and indivisible contributions"
            ],
            recitationGuidance: [
                "Recite 1000 times in complete privacy for spiritual secrets",
                "Best in quiet, undisturbed places for divine revelations",
                "Combine with deep contemplation of Allah's absolute unity",
                "Recite when seeking spiritual insights and mysteries"
            ]
        },
        quranicReferences: ["Quran 112:1"],
        hadithReferences: [
            "Say: He is Allah, the One - Quran 112:1",
            "Allah is One and loves unity in all matters - Traditional"
        ],
        duas: [
            "قُلْ هُوَ اللَّهُ أَحَدٌ - Say: He is Allah, the One",
            "اللَّهُمَّ أَنتَ الأَحَدُ الَّذِي لاَ شَرِيكَ لَكَ - O Allah, You are the One who has no partner"
        ]
    },

    {
        id: 68,
        arabic: "الصَّمَدُ",
        transliteration: "As-Samad",
        english: "The Satisfier of All Needs",
        meaning: "The Eternal",
        description: "The Self-Sufficient Master whom all creatures depend upon for their needs. As-Samad is eternally independent, needing nothing while everything needs Him, satisfying all requirements perfectly.",
        detailedBenefits: {
            spiritual: [
                "Complete satisfaction and fulfillment of spiritual needs",
                "Independence from creation's approval through divine sufficiency",
                "Others become dependent on you while you depend only on Allah",
                "Spiritual richness and contentment of heart"
            ],
            physical: [
                "Fulfillment of all physical needs and requirements",
                "Self-sufficiency in health and bodily functions",
                "Protection from want and physical deprivation"
            ],
            worldly: [
                "Financial independence and self-sufficiency",
                "Others seeking your help and guidance",
                "Success in providing for family and community",
                "Recognition as a reliable and dependable person"
            ],
            recitationGuidance: [
                "Recite frequently with sincere heart for need fulfillment",
                "Best when seeking independence and self-sufficiency",
                "Combine with gratitude for existing provisions",
                "Recite when others are in need of your assistance"
            ]
        },
        quranicReferences: ["Quran 112:2"],
        hadithReferences: [
            "Allah is As-Samad (Self-Sufficient Master) - Quran 112:2",
            "The best people are those who benefit others - Traditional"
        ],
        duas: [
            "اللَّهُ الصَّمَدُ - Allah is As-Samad (Self-Sufficient)",
            "اللَّهُمَّ أَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ - O Allah, make me independent through Your grace"
        ]
    },

    {
        id: 69,
        arabic: "الْقَادِرُ",
        transliteration: "Al-Qadeer",
        english: "The All Powerful",
        meaning: "The Omnipotent",
        description: "The One who has complete power and ability to do everything. Al-Qadeer possesses unlimited capacity to accomplish anything and everything according to His will and wisdom.",
        detailedBenefits: {
            spiritual: [
                "Fulfillment of righteous desires and spiritual goals",
                "Power to overcome all spiritual obstacles and challenges",
                "Ability to accomplish seemingly impossible religious tasks",
                "Strength to maintain consistency in worship"
            ],
            physical: [
                "Physical power and capability to achieve goals",
                "Recovery from weakness and physical limitations",
                "Energy and strength for challenging tasks"
            ],
            worldly: [
                "Achievement of all lawful desires and ambitions",
                "Success in accomplishing difficult objectives",
                "Power to overcome worldly obstacles and barriers",
                "Recognition for exceptional capabilities and achievements"
            ],
            recitationGuidance: [
                "Recite with firm belief for fulfillment of desires",
                "Best when facing seemingly impossible challenges",
                "Combine with sincere effort and proper means",
                "Recite when needing extraordinary strength or ability"
            ]
        },
        quranicReferences: ["Quran 2:20", "Quran 5:17", "Quran 35:44"],
        hadithReferences: [
            "Allah has power over all things - Quran 2:20",
            "When Allah wills something, He says 'Be' and it is - Quran 36:82"
        ],
        duas: [
            "إِنَّ اللَّهَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ - Indeed Allah has power over everything",
            "اللَّهُمَّ لاَ سَهْلَ إِلاَّ مَا جَعَلْتَهُ سَهْلاً - O Allah, nothing is easy except what You make easy"
        ]
    },

    {
        id: 70,
        arabic: "الْمُقْتَدِرُ",
        transliteration: "Al-Muqtadir",
        english: "The Creator of All Power",
        meaning: "The Determiner",
        description: "The One who creates and distributes power according to His wisdom. Al-Muqtadir has absolute authority to grant or withhold power, making the powerful and rendering the mighty humble.",
        detailedBenefits: {
            spiritual: [
                "Awareness and recognition of absolute truth",
                "Understanding of divine wisdom in distribution of power",
                "Spiritual authority and influence over others",
                "Insight into the reality behind apparent strength"
            ],
            physical: [
                "Physical strength and commanding presence",
                "Authority in physical activities and sports",
                "Recovery from powerlessness and weakness"
            ],
            worldly: [
                "Leadership positions and authoritative roles",
                "Power to influence and create positive change",
                "Success in competitive environments",
                "Recognition as a powerful and capable leader"
            ],
            recitationGuidance: [
                "Recite for awareness of truth and divine power",
                "Best when seeking authority or leadership",
                "Combine with humility and responsibility",
                "Recite when needing to understand complex power dynamics"
            ]
        },
        quranicReferences: ["Quran 18:45", "Quran 54:42", "Quran 54:55"],
        hadithReferences: [
            "In a seat of truth near a Sovereign, Perfect in Ability - Quran 54:55",
            "Power belongs to Allah, His Messenger, and the believers - Quran 63:8"
        ],
        duas: [
            "اللَّهُمَّ اجْعَلْنِي مِنَ الْمُقْتَدِرِينَ بِالْحَقِّ - O Allah, make me among those with power through truth",
            "رَبِّ أَعِزَّنِي بِطَاعَتِكَ - My Lord, strengthen me through obedience to You"
        ]
    },

    {
        id: 71,
        arabic: "الْمُقَدِّمُ",
        transliteration: "Al-Muqaddim",
        english: "The Expediter",
        meaning: "The Promoter",
        description: "The One who brings forward and advances what He wills according to His wisdom. Al-Muqaddim promotes the righteous, advances the deserving, and puts things in their proper place and time.",
        detailedBenefits: {
            spiritual: [
                "Advancement in spiritual rank and religious knowledge",
                "Being among the first in righteous deeds",
                "Leadership in religious and community matters",
                "Protection and fearlessness in awe-inspiring places"
            ],
            physical: [
                "Safety and protection during dangerous situations",
                "Courage and bravery in face of physical challenges",
                "Advancement in physical capabilities and skills"
            ],
            worldly: [
                "Career promotion and professional advancement",
                "Being first in beneficial opportunities",
                "Leadership roles and pioneering positions",
                "Success in competitive environments"
            ],
            recitationGuidance: [
                "Recite on battlefield or in fearful places for protection",
                "Best when seeking advancement or promotion",
                "Combine with prayers for beneficial leadership",
                "Recite when hoping to be among the foremost"
            ]
        },
        quranicReferences: ["Quran 16:61"],
        hadithReferences: [
            "And the foremost, the foremost - these are they who are drawn nigh - Quran 56:10-11",
            "Allah advances whom He wills - Traditional"
        ],
        duas: [
            "اللَّهُمَّ قَدِّمْنِي وَلاَ تُؤَخِّرْنِي - O Allah, advance me and do not delay me",
            "رَبِّ اجْعَلْنِي مِنَ السَّابِقِينَ - My Lord, make me among the foremost"
        ]
    },

    {
        id: 72,
        arabic: "الْمُؤَخِّرُ",
        transliteration: "Al-Mu'akhkhir",
        english: "The Delayer",
        meaning: "The Retarder",
        description: "The One who delays things to their proper time according to divine wisdom. Al-Mu'akhkhir postpones what needs to be postponed, providing perfect timing in all affairs and protecting from premature or harmful advancement.",
        detailedBenefits: {
            spiritual: [
                "Perfect timing in spiritual development and growth",
                "Protection from premature spiritual responsibilities",
                "Patience and wisdom in waiting for Allah's timing",
                "Understanding of divine wisdom in delays"
            ],
            physical: [
                "Protection from premature or harmful physical changes",
                "Proper timing in health and recovery processes",
                "Delay of aging and physical deterioration"
            ],
            worldly: [
                "Perfect timing in career moves and life decisions",
                "Protection from hasty and regrettable choices",
                "Wisdom in knowing when to wait and when to act",
                "Delay of harmful events and negative consequences"
            ],
            recitationGuidance: [
                "Recite when seeking Allah's perfect timing in affairs",
                "Best when feeling impatient or rushed",
                "Combine with prayers for divine wisdom in timing",
                "Recite when needing protection from premature actions"
            ]
        },
        quranicReferences: ["Quran 71:4"],
        hadithReferences: [
            "And Allah does not delay them except to a specified term - Quran 71:4",
            "Sometimes delay is a blessing in disguise - Traditional"
        ],
        duas: [
            "اللَّهُمَّ أَخِّرْ عَنِّي كُلَّ سُوءٍ - O Allah, delay from me every harm",
            "رَبِّ اجْعَلْ لِي فِي كُلِّ أَمْرٍ حِكْمَةً - My Lord, grant me wisdom in every matter"
        ]
    },
    {
        id: 73,
        arabic: "الأَوَّلُ",
        transliteration: "Al-Awwal",
        english: "The First",
        meaning: "The Beginning",
        description: "The One who existed before everything else and has no beginning. Al-Awwal is the first in every sense - first in existence, first in rank, and first in every perfect attribute.",
        detailedBenefits: {
            spiritual: [
                "Connects with the original source of all existence",
                "Spiritual leadership and being first in righteous deeds",
                "Beginning new spiritual chapters successfully",
                "Understanding of divine precedence and priority"
            ],
            physical: [
                "Leadership in physical activities and endeavors",
                "Being first in beneficial competitions",
                "Pioneering spirit in health and wellness"
            ],
            worldly: [
                "Success in new ventures and business beginnings",
                "Leadership opportunities and being first in innovation",
                "Recognition as a pioneer and trendsetter",
                "Achievement of prestigious and eminent status in life"
            ],
            recitationGuidance: [
                "Recite 73 times daily for prestigious status",
                "Best when starting new projects or leadership roles",
                "Combine with prayers for beneficial precedence",
                "Recite when seeking to be first in good deeds"
            ]
        },
        quranicReferences: ["Quran 57:3"],
        hadithReferences: [
            "He is the First and the Last - Quran 57:3",
            "The best of people are those who benefit others - Traditional"
        ],
        duas: [
            "اللَّهُمَّ أَنتَ الأَوَّلُ فَلَيْسَ قَبْلَكَ شَيْءٌ - O Allah, You are the First, there is nothing before You",
            "رَبِّ اجْعَلْنِي مِنَ السَّابِقِينَ - My Lord, make me among the foremost"
        ]
    },

    {
        id: 74,
        arabic: "الآخِرُ",
        transliteration: "Al-Akhir",
        english: "The Last",
        meaning: "The End",
        description: "The One who remains after everything perishes and has no end. Al-Akhir is eternal, outlasting all creation and being the final destination of all existence.",
        detailedBenefits: {
            spiritual: [
                "Perseverance and consistency until the end",
                "Completing spiritual journeys and religious obligations",
                "Eternal perspective on temporary worldly matters",
                "Preparation for the final meeting with Allah"
            ],
            physical: [
                "Endurance and lasting strength in physical activities",
                "Longevity and healthy aging",
                "Completing tasks and projects successfully"
            ],
            worldly: [
                "Success in long-term projects and investments",
                "Lasting achievements and enduring legacy",
                "Perseverance through difficulties until success",
                "Final victory in challenging endeavors"
            ],
            recitationGuidance: [
                "Recite for lasting success and endurance",
                "Best when seeking completion of long-term goals",
                "Combine with prayers for good ending (husnul khatimah)",
                "Recite when needing persistence and perseverance"
            ]
        },
        quranicReferences: ["Quran 57:3"],
        hadithReferences: [
            "He is the First and the Last - Quran 57:3",
            "Actions are judged by their endings - Bukhari"
        ],
        duas: [
            "اللَّهُمَّ أَنتَ الآخِرُ فَلَيْسَ بَعْدَكَ شَيْءٌ - O Allah, You are the Last, there is nothing after You",
            "اللَّهُمَّ اجْعَلْ خَيْرَ عُمُرِي آخِرَهُ - O Allah, make the best part of my life its end"
        ]
    },

    {
        id: 75,
        arabic: "الظَّاهِرُ",
        transliteration: "Az-Zahir",
        english: "The Manifest One",
        meaning: "The Evident",
        description: "The One who is clearly apparent through His signs and creation. Az-Zahir makes truth evident, reveals hidden realities, and manifests His presence through countless signs in existence.",
        detailedBenefits: {
            spiritual: [
                "Clarity in understanding religious truths",
                "Manifestation of divine signs and guidance",
                "Clear spiritual vision and insight",
                "Evidence and proof in matters of faith"
            ],
            physical: [
                "Clear physical health and visible wellness",
                "Manifestation of physical strength and vitality",
                "Obvious improvements in health conditions"
            ],
            worldly: [
                "Clear success and evident achievements",
                "Manifestation of goals and dreams",
                "Obvious recognition and visible progress",
                "Clear solutions to complex problems"
            ],
            recitationGuidance: [
                "Recite for clarity and manifestation of truth",
                "Best when seeking clear guidance or evidence",
                "Combine with prayers for divine signs",
                "Recite when needing clarity in confusion"
            ]
        },
        quranicReferences: ["Quran 57:3"],
        hadithReferences: [
            "He is the Manifest and the Hidden - Quran 57:3",
            "The signs of Allah are manifest to those who reflect - Traditional"
        ],
        duas: [
            "اللَّهُمَّ أَظْهِرْ لِي الْحَقَّ - O Allah, make truth manifest to me",
            "رَبِّ أَرِنِي آيَاتِكَ - My Lord, show me Your signs"
        ]
    },

    {
        id: 76,
        arabic: "الْبَاطِنُ",
        transliteration: "Al-Batin",
        english: "The Hidden One",
        meaning: "The Concealed",
        description: "The One who is hidden from physical sight but closer to us than our jugular vein. Al-Batin knows all hidden secrets, inner thoughts, and concealed realities.",
        detailedBenefits: {
            spiritual: [
                "Understanding of hidden spiritual truths and mysteries",
                "Knowledge of inner spiritual realities",
                "Protection of secret knowledge and wisdom",
                "Deep inner connection with divine presence"
            ],
            physical: [
                "Understanding of hidden causes of physical ailments",
                "Knowledge of inner bodily functions and needs",
                "Healing of hidden or internal diseases"
            ],
            worldly: [
                "Understanding of hidden opportunities and potentials",
                "Knowledge of concealed truths in business or relationships",
                "Success through understanding inner workings of situations",
                "Discovery of hidden talents and abilities"
            ],
            recitationGuidance: [
                "Recite for understanding hidden truths",
                "Best when seeking inner knowledge or secrets",
                "Combine with meditation and inner reflection",
                "Recite when needing to understand concealed matters"
            ]
        },
        quranicReferences: ["Quran 57:3"],
        hadithReferences: [
            "He is the Manifest and the Hidden - Quran 57:3",
            "We are closer to him than his jugular vein - Quran 50:16"
        ],
        duas: [
            "اللَّهُمَّ اكْشِفْ لِي الْحَقَائِقَ الْبَاطِنَةَ - O Allah, reveal to me the hidden realities",
            "رَبِّ أَعِنِّي عَلَى فَهْمِ أَسْرَارِكَ - My Lord, help me understand Your secrets"
        ]
    },

    {
        id: 77,
        arabic: "الْوَالِي",
        transliteration: "Al-Wali",
        english: "The Protecting Friend",
        meaning: "The Governor",
        description: "The One who governs, manages, and takes charge of all affairs with perfect wisdom. Al-Wali is the ultimate authority who manages everything according to divine will.",
        detailedBenefits: {
            spiritual: [
                "Divine governance and management of spiritual affairs",
                "Protection through proper spiritual leadership",
                "Guidance in managing religious responsibilities",
                "Authority in religious and community matters"
            ],
            physical: [
                "Proper management of physical health and wellness",
                "Authority and control over physical circumstances",
                "Protection through wise physical decisions"
            ],
            worldly: [
                "Success in management and leadership positions",
                "Authority and control in professional endeavors",
                "Excellent governance of family and community affairs",
                "Recognition as a capable and wise leader"
            ],
            recitationGuidance: [
                "Recite for divine management of affairs",
                "Best when taking on leadership responsibilities",
                "Combine with prayers for wise governance",
                "Recite when needing authority and control"
            ]
        },
        quranicReferences: ["Quran 2:257", "Quran 3:68"],
        hadithReferences: [
            "Allah is the protector of those who believe - Quran 2:257",
            "Each of you is a shepherd responsible for his flock - Bukhari"
        ],
        duas: [
            "اللَّهُمَّ تَوَلَّ أَمْرِي وَأَصْلِحْ لِي دِينِي - O Allah, take charge of my affairs and rectify my religion",
            "رَبِّ اجْعَلْنِي مِنَ الصَّالِحِينَ الْوَالِينَ - My Lord, make me among the righteous governors"
        ]
    },

    {
        id: 78,
        arabic: "الْمُتَعَالِي",
        transliteration: "Al-Muta'ali",
        english: "The Supreme One",
        meaning: "The Exalted",
        description: "The One who is supremely exalted above all creation and limitations. Al-Muta'ali transcends all boundaries and is elevated beyond any comparison or similarity with creation.",
        detailedBenefits: {
            spiritual: [
                "Spiritual elevation and transcendence",
                "Rising above worldly concerns and limitations",
                "Supreme spiritual consciousness and awareness",
                "Divine benevolence and elevated status"
            ],
            physical: [
                "Physical elevation and improvement in health",
                "Transcendence over physical limitations",
                "Superior physical capabilities and performance"
            ],
            worldly: [
                "Supreme success and elevated status in society",
                "Transcendence over worldly difficulties",
                "Recognition for superior achievements",
                "Gaining Allah's benevolence in all endeavors"
            ],
            recitationGuidance: [
                "Recite frequently for gaining Allah's benevolence",
                "Best when seeking elevation and transcendence",
                "Combine with striving for excellence in all matters",
                "Recite when needing to rise above limitations"
            ]
        },
        quranicReferences: ["Quran 13:9"],
        hadithReferences: [
            "Exalted is your Lord, the Lord of might - Quran 37:180",
            "Allah elevates those who strive for elevation - Traditional"
        ],
        duas: [
            "سُبْحَانَ رَبِّكَ رَبِّ الْعِزَّةِ - Exalted is your Lord, the Lord of might",
            "اللَّهُمَّ ارْفَعْنِي إِلَى أَعْلَى الدَّرَجَاتِ - O Allah, raise me to the highest ranks"
        ]
    },
    {
        id: 79,
        arabic: "الْبَرُّ",
        transliteration: "Al-Barr",
        english: "The Doer of Good",
        meaning: "The Righteous",
        description: "The One who is kind, good, and does good to His creatures with perfect righteousness. Al-Barr is the source of all goodness and righteousness, blessing His servants with continuous good deeds and kindness.",
        detailedBenefits: {
            spiritual: [
                "Development of righteousness and pious character",
                "Increased motivation to perform good deeds",
                "Protection from spiritual corruption and evil influences",
                "Enhanced ability to distinguish between right and wrong"
            ],
            physical: [
                "Good health and physical well-being through righteous living",
                "Protection from diseases caused by sinful behavior",
                "Strength and energy to perform beneficial actions"
            ],
            worldly: [
                "Child will be free from misfortune (if recited for children)",
                "Success through honest and righteous business dealings",
                "Reputation for goodness and reliability among people",
                "Blessings in family relationships and social connections"
            ],
            recitationGuidance: [
                "Recite frequently for children to protect them from misfortune",
                "Best when seeking to develop righteous character",
                "Combine with performing actual good deeds",
                "Recite when wanting to increase beneficial actions"
            ]
        },
        quranicReferences: ["Quran 52:28"],
        hadithReferences: [
            "The righteous will be on thrones of honor - Quran 55:46",
            "The best of people are those who benefit others - Traditional"
        ],
        duas: [
            "اللَّهُمَّ اجْعَلْنِي مِنَ الْأَبْرَارِ - O Allah, make me among the righteous",
            "رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ - My Lord, enable me to be grateful for Your favor"
        ]
    },

    {
        id: 80,
        arabic: "التَّوَابُ",
        transliteration: "At-Tawwab",
        english: "The Guide to Repentance",
        meaning: "The Acceptor of Repentance",
        description: "The One who repeatedly accepts repentance and guides His servants back to the right path. At-Tawwab not only accepts repentance but also guides hearts towards sincere tawbah.",
        detailedBenefits: {
            spiritual: [
                "Complete acceptance of sincere repentance",
                "Guidance towards genuine remorse and turning back to Allah",
                "Purification of heart from sins and spiritual impurities",
                "Renewed spiritual energy and motivation for righteousness"
            ],
            physical: [
                "Healing from ailments caused by sinful behavior",
                "Physical relief and recovery through spiritual purification",
                "Renewed vitality and energy after repentance"
            ],
            worldly: [
                "Acceptance of repentance when recited frequently",
                "Second chances and fresh opportunities after mistakes",
                "Forgiveness from people for past wrongdoings",
                "Relief from consequences of previous errors"
            ],
            recitationGuidance: [
                "Recite frequently for acceptance of repentance",
                "Best after committing sins or making mistakes",
                "Combine with sincere istighfar and tawbah",
                "Recite when seeking to turn back to Allah"
            ]
        },
        quranicReferences: ["Quran 2:37", "Quran 2:160", "Quran 4:64"],
        hadithReferences: [
            "Allah is more pleased with the repentance of His servant - Bukhari",
            "All sons of Adam are sinners, but the best of sinners are those who repent - Tirmidhi"
        ],
        duas: [
            "أَسْتَغْفِرُ اللَّهَ الَّذِي لاَ إِلَهَ إِلاَّ هُوَ الْحَيَّ الْقَيُّومَ وَأَتُوبُ إِلَيْهِ - I seek forgiveness from Allah and repent to Him",
            "رَبِّ إِنِّي ظَلَمْتُ نَفْسِي فَاغْفِرْ لِي - My Lord, I have wronged myself, so forgive me"
        ]
    },

    {
        id: 81,
        arabic: "الْمُنْتَقِمُ",
        transliteration: "Al-Muntaqim",
        english: "The Avenger",
        meaning: "The Retaliator",
        description: "The One who takes revenge on behalf of the oppressed and punishes those who transgress against His creation. Al-Muntaqim ensures that justice is served and oppressors are held accountable.",
        detailedBenefits: {
            spiritual: [
                "Divine justice against spiritual oppressors and evil forces",
                "Protection from those who harm religious practice",
                "Strength to stand against spiritual corruption",
                "Trust in Allah's ultimate justice and retribution"
            ],
            physical: [
                "Protection from physical harm by enemies",
                "Victory over those who seek to cause bodily harm",
                "Strength to defend oneself and family"
            ],
            worldly: [
                "Victory against enemies when recited for 3 Fridays",
                "Justice in legal matters and disputes",
                "Protection from oppression and unfair treatment",
                "Divine intervention against those who wrong you"
            ],
            recitationGuidance: [
                "Recite for 3 consecutive Fridays for victory over enemies",
                "Best when facing oppression or injustice",
                "Combine with prayers for divine justice",
                "Recite when seeking protection from harmful people"
            ]
        },
        quranicReferences: ["Quran 32:22", "Quran 43:41", "Quran 44:16"],
        hadithReferences: [
            "The supplication of the oppressed is answered - Tirmidhi",
            "Allah gives respite to the oppressor, but when He seizes him, He does not let him escape - Bukhari"
        ],
        duas: [
            "اللَّهُمَّ انتَقِمْ لِي مِنْ ظَالِمِي - O Allah, take revenge for me from my oppressor",
            "رَبَّنَا اكْشِفْ عَنَّا الْعَذَابَ - Our Lord, remove the punishment from us"
        ]
    },

    {
        id: 82,
        arabic: "العَفُوُّ",
        transliteration: "Al-Afuww",
        english: "The Forgiver",
        meaning: "The Pardoner",
        description: "The One who pardons and erases sins completely, as if they never occurred. Al-Afuww goes beyond forgiveness to complete erasure and pardon of wrongdoings.",
        detailedBenefits: {
            spiritual: [
                "Complete erasure of all sins through sincere seeking",
                "Spiritual purification and cleansing of past mistakes",
                "Relief from guilt and shame of previous wrongdoings",
                "Fresh spiritual start and renewed relationship with Allah"
            ],
            physical: [
                "Healing from ailments related to guilt and stress",
                "Physical relief from the burden of past mistakes",
                "Renewed energy and vitality after forgiveness"
            ],
            worldly: [
                "All sins forgiven when recited frequently",
                "Pardon from people for past offenses",
                "Clean slate in relationships and social standing",
                "Relief from legal and worldly consequences"
            ],
            recitationGuidance: [
                "Recite frequently for complete forgiveness of sins",
                "Best during Laylat al-Qadr and blessed nights",
                "Combine with sincere regret and determination not to repeat",
                "Recite when seeking complete pardon and erasure of sins"
            ]
        },
        quranicReferences: ["Quran 4:43", "Quran 4:99", "Quran 22:60"],
        hadithReferences: [
            "Allah loves to forgive and pardon - Traditional",
            "Seek forgiveness from Allah, for Allah is Oft-Forgiving - Quran 4:106"
        ],
        duas: [
            "اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي - O Allah, You are Pardoning and love to pardon, so pardon me",
            "رَبِّ اغْفِرْ لِي وَارْحَمْنِي وَتُبْ عَلَيَّ - My Lord, forgive me, have mercy on me, and accept my repentance"
        ]
    },

    {
        id: 83,
        arabic: "الرَّؤُوفُ",
        transliteration: "Ar-Ra'oof",
        english: "The Clement",
        meaning: "The Compassionate",
        description: "The One who shows extreme kindness, gentleness, and compassion to His creation. Ar-Ra'oof treats His servants with tenderness and saves them from hardship with His infinite mercy.",
        detailedBenefits: {
            spiritual: [
                "Divine compassion and gentleness in spiritual matters",
                "Tender guidance towards righteousness and truth",
                "Comfort during spiritual difficulties and trials",
                "Blessings and divine favor through Allah's compassion"
            ],
            physical: [
                "Gentle healing and recovery from ailments",
                "Compassionate treatment from healthcare providers",
                "Relief from pain through divine tenderness"
            ],
            worldly: [
                "Blessings from Allah when recited frequently",
                "Compassionate treatment from family and community",
                "Gentle solutions to worldly problems",
                "Kindness and mercy in all relationships"
            ],
            recitationGuidance: [
                "Recite frequently to receive Allah's blessings",
                "Best when seeking compassion and gentleness",
                "Combine with showing kindness to others",
                "Recite when needing tender care and mercy"
            ]
        },
        quranicReferences: ["Quran 2:143", "Quran 9:117", "Quran 57:9"],
        hadithReferences: [
            "Allah is kind and loves kindness in all matters - Bukhari",
            "The merciful will be shown mercy by the Merciful - Tirmidhi"
        ],
        duas: [
            "اللَّهُمَّ ارْأَفْ بِي وَارْحَمْنِي - O Allah, be compassionate to me and have mercy on me",
            "رَبَّنَا أَنتَ أَرْحَمُ الرَّاحِمِينَ - Our Lord, You are the Most Merciful of the merciful"
        ]
    },

    {
        id: 84,
        arabic: "مَالِكُ الْمُلْكِ",
        transliteration: "Malik-ul-Mulk",
        english: "The Owner of All",
        meaning: "Master of the Kingdom",
        description: "The One who owns all dominion and sovereignty, granting kingdom to whom He wills and taking it away according to His wisdom. Malik-ul-Mulk has absolute ownership over all creation.",
        detailedBenefits: {
            spiritual: [
                "Understanding of Allah's absolute sovereignty over all affairs",
                "Spiritual authority and leadership in religious matters",
                "Recognition of divine ownership of all things",
                "Detachment from worldly possessions through divine perspective"
            ],
            physical: [
                "Authority and control over physical circumstances",
                "Leadership qualities and commanding presence",
                "Strength to manage and govern effectively"
            ],
            worldly: [
                "Esteem and high regard among people",
                "Authority and influence in professional endeavors",
                "Success in leadership and management positions",
                "Recognition as a person of authority and respect"
            ],
            recitationGuidance: [
                "Recite for gaining esteem and respect among people",
                "Best when seeking authority or leadership positions",
                "Combine with responsible use of any granted authority",
                "Recite when needing recognition and influence"
            ]
        },
        quranicReferences: ["Quran 3:26"],
        hadithReferences: [
            "Say: O Allah, Owner of Sovereignty - Quran 3:26",
            "Leadership is a trust and responsibility - Traditional"
        ],
        duas: [
            "اللَّهُمَّ مَالِكَ الْمُلْكِ تُؤْتِي الْمُلْكَ مَن تَشَاءُ - O Allah, Owner of Sovereignty, You give sovereignty to whom You will",
            "رَبِّ اجْعَلْنِي مِنَ الصَّالِحِينَ الْمُكْرَمِينَ - My Lord, make me among the righteous and honored"
        ]
    },
    {
        id: 85,
        arabic: "ذُوالْجَلاَلِ وَالإكْرَامِ",
        transliteration: "Dhul-Jalal Wal-Ikram",
        english: "The Lord of Majesty and Bounty",
        meaning: "Owner of Majesty and Honor",
        description: "The One who possesses perfect majesty and honor, deserving all reverence and exaltation. This magnificent name combines Allah's supreme majesty with His generous bounty and honor.",
        detailedBenefits: {
            spiritual: [
                "Blessed with divine majesty and spiritual honor",
                "Increased reverence and awe for Allah's greatness",
                "Enhanced spiritual dignity and noble character",
                "Divine bounty and generosity in religious matters"
            ],
            physical: [
                "Dignified bearing and noble physical presence",
                "Honor and respect in physical appearance",
                "Majestic confidence and commanding presence"
            ],
            worldly: [
                "Wealth and prosperity when recited frequently",
                "Honor and respect among people and society",
                "Bounty and generosity in material provisions",
                "Recognition for noble and majestic qualities"
            ],
            recitationGuidance: [
                "Recite frequently for wealth and prosperity",
                "Best when seeking honor and divine bounty",
                "Combine with gratitude for Allah's majesty",
                "Recite when needing both dignity and material success"
            ]
        },
        quranicReferences: ["Quran 55:27", "Quran 55:78"],
        hadithReferences: [
            "Blessed is the name of your Lord, Owner of Majesty and Honor - Quran 55:78",
            "Glory and honor belong to Allah alone - Traditional"
        ],
        duas: [
            "تَبَارَكَ اسْمُ رَبِّكَ ذِي الْجَلاَلِ وَالإِكْرَامِ - Blessed is the name of your Lord of Majesty and Honor",
            "اللَّهُمَّ أَكْرِمْنِي بِجَلاَلِكَ وَإِكْرَامِكَ - O Allah, honor me with Your majesty and bounty"
        ]
    },

    {
        id: 86,
        arabic: "الْمُقْسِطُ",
        transliteration: "Al-Muqsit",
        english: "The Equitable One",
        meaning: "The Just",
        description: "The One who acts with perfect justice and fairness, establishing equity among His creation. Al-Muqsit ensures that justice prevails and supports those who act justly.",
        detailedBenefits: {
            spiritual: [
                "Development of justice and fairness in character",
                "Balance in spiritual practices and religious duties",
                "Protection from spiritual injustice and oppression",
                "Guidance in making just and equitable decisions"
            ],
            physical: [
                "Balance and equilibrium in physical health",
                "Fair treatment in medical and health matters",
                "Justice in physical disputes and conflicts"
            ],
            worldly: [
                "Justice in legal matters and court proceedings",
                "Fair treatment in business and professional dealings",
                "Equitable distribution of wealth and opportunities",
                "Recognition as a just and fair person"
            ],
            recitationGuidance: [
                "Recite when seeking justice in any matter",
                "Best for those involved in legal proceedings",
                "Combine with acting justly towards others",
                "Recite when needing fair resolution of disputes"
            ]
        },
        quranicReferences: ["Quran 21:47"],
        hadithReferences: [
            "Those who are just will be on pulpits of light - Muslim",
            "Act justly, that is nearer to righteousness - Quran 5:8"
        ],
        duas: [
            "اللَّهُمَّ أَعِنِّي عَلَى الْعَدْلِ وَالإِقْسَاطِ - O Allah, help me with justice and equity",
            "رَبِّ اجْعَلْنِي مِنَ الْمُقْسِطِينَ - My Lord, make me among the just"
        ]
    },

    {
        id: 87,
        arabic: "الْجَامِعُ",
        transliteration: "Al-Jami",
        english: "The Gatherer",
        meaning: "The Collector",
        description: "The One who gathers all creation on the Day of Judgment and brings together scattered things. Al-Jami unites what is separated and collects what is dispersed.",
        detailedBenefits: {
            spiritual: [
                "Unity in spiritual practices and religious community",
                "Gathering of scattered thoughts and focus",
                "Collection of good deeds and spiritual rewards",
                "Bringing together of righteous companions"
            ],
            physical: [
                "Gathering of physical strength and energy",
                "Unity and harmony in family relationships",
                "Collection of resources and necessities"
            ],
            worldly: [
                "Success in bringing people together for good causes",
                "Gathering of wealth and material provisions",
                "Unity in business partnerships and collaborations",
                "Collection of opportunities and beneficial connections"
            ],
            recitationGuidance: [
                "Recite when seeking to unite people or things",
                "Best for gathering resources or opportunities",
                "Combine with efforts to bring people together",
                "Recite when needing unity and cooperation"
            ]
        },
        quranicReferences: ["Quran 3:9"],
        hadithReferences: [
            "Our Lord! You will gather mankind for a Day about which there is no doubt - Quran 3:9",
            "The believers in their mutual kindness are like one body - Bukhari"
        ],
        duas: [
            "رَبَّنَا إِنَّكَ جَامِعُ النَّاسِ لِيَوْمٍ لاَ رَيْبَ فِيهِ - Our Lord, indeed You will gather people for a day about which there is no doubt",
            "اللَّهُمَّ اجْمَعْ كَلِمَتَنَا عَلَى الْحَقِّ - O Allah, unite our word upon truth"
        ]
    },

    {
        id: 88,
        arabic: "الْغَنِيُّ",
        transliteration: "Al-Ghaniyy",
        english: "The Rich One",
        meaning: "The Independent",
        description: "The One who is completely independent and free from all needs. Al-Ghaniyy lacks nothing and is self-sufficient in every aspect, while all creation depends on Him.",
        detailedBenefits: {
            spiritual: [
                "Spiritual independence and freedom from worldly attachments",
                "Richness of heart and contentment with Allah's decree",
                "Freedom from spiritual need and want",
                "Independence from creation's approval or disapproval"
            ],
            physical: [
                "Freedom from excessive physical needs and desires",
                "Independence in health and physical capabilities",
                "Self-sufficiency in bodily functions and strength"
            ],
            worldly: [
                "Financial independence and wealth",
                "Freedom from dependency on others",
                "Self-sufficiency in material needs",
                "Independence in decision-making and choices"
            ],
            recitationGuidance: [
                "Recite for financial independence and wealth",
                "Best when seeking freedom from dependency",
                "Combine with gratitude for existing provisions",
                "Recite when needing self-sufficiency"
            ]
        },
        quranicReferences: ["Quran 2:267", "Quran 3:97", "Quran 57:24"],
        hadithReferences: [
            "Allah is Rich and free from need of the worlds - Quran 3:97",
            "True wealth is contentment of the soul - Bukhari"
        ],
        duas: [
            "اللَّهُمَّ أَغْنِنِي بِحَلاَلِكَ عَنْ حَرَامِكَ - O Allah, make me independent through Your lawful provision",
            "رَبِّ أَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ - My Lord, make me independent through Your grace from all besides You"
        ]
    },

    {
        id: 89,
        arabic: "الْمُغْنِي",
        transliteration: "Al-Mughni",
        english: "The Enricher",
        meaning: "The Satisfier",
        description: "The One who satisfies the needs of His creation and makes them rich. Al-Mughni enriches both spiritually and materially, providing sufficiency and abundance.",
        detailedBenefits: {
            spiritual: [
                "Spiritual enrichment and abundance of faith",
                "Satisfaction of spiritual needs and desires",
                "Richness in knowledge and wisdom",
                "Abundance in good deeds and righteous actions"
            ],
            physical: [
                "Physical satisfaction and fulfillment of bodily needs",
                "Enrichment in health and vitality",
                "Abundance in physical strength and capabilities"
            ],
            worldly: [
                "Material wealth and financial abundance",
                "Satisfaction of worldly needs and wants",
                "Enrichment in opportunities and resources",
                "Abundance in provisions and sustenance"
            ],
            recitationGuidance: [
                "Recite for wealth and material abundance",
                "Best when seeking satisfaction of needs",
                "Combine with sharing wealth with others",
                "Recite when facing financial difficulties"
            ]
        },
        quranicReferences: ["Quran 93:8"],
        hadithReferences: [
            "And He found you poor and made you independent - Quran 93:8",
            "The upper hand is better than the lower hand - Bukhari"
        ],
        duas: [
            "اللَّهُمَّ أَغْنِنِي وَأَغْنِ عَنِّي - O Allah, enrich me and make me independent",
            "رَبِّ اكْفِنِي بِحَلاَلِكَ عَنْ حَرَامِكَ - My Lord, suffice me with Your lawful over unlawful"
        ]
    },

    {
        id: 90,
        arabic: "اَلْمَانِعُ",
        transliteration: "Al-Mani",
        english: "The Preventer of Harm",
        meaning: "The Withholder",
        description: "The One who prevents and withholds according to His wisdom. Al-Mani protects by preventing harm, withholding what would be detrimental, and blocking negative influences.",
        detailedBenefits: {
            spiritual: [
                "Prevention of spiritual harm and religious deviation",
                "Protection from evil influences and temptations",
                "Withholding of punishments through divine mercy",
                "Prevention of spiritual corruption and misguidance"
            ],
            physical: [
                "Protection from physical harm and accidents",
                "Prevention of diseases and ailments",
                "Withholding of dangerous situations and threats"
            ],
            worldly: [
                "Prevention of financial loss and material harm",
                "Protection from enemies and harmful people",
                "Withholding of negative consequences and outcomes",
                "Prevention of failure and disappointment"
            ],
            recitationGuidance: [
                "Recite for protection from all forms of harm",
                "Best when facing threats or dangerous situations",
                "Combine with seeking Allah's protection",
                "Recite when needing prevention of negative outcomes"
            ]
        },
        quranicReferences: ["Quran 67:21"],
        hadithReferences: [
            "What Allah wills happens, and what He does not will does not happen - Traditional",
            "If Allah helps you, none can overcome you - Quran 3:160"
        ],
        duas: [
            "اللَّهُمَّ امْنَعْ عَنِّي كُلَّ سُوءٍ - O Allah, prevent from me every evil",
            "رَبِّ أَعُوذُ بِكَ مِنْ شَرِّ مَا خَلَقْتَ - My Lord, I seek refuge in You from the evil of what You created"
        ]
    },
    {
        id: 91,
        arabic: "الضَّارَّ",
        transliteration: "Ad-Darr",
        english: "The Creator of The Harmful",
        meaning: "The Distresser",
        description: "The One who creates harm and distress according to divine wisdom as a test, purification, or consequence. Ad-Darr reminds us that all hardship comes from Allah and serves a greater purpose.",
        detailedBenefits: {
            spiritual: [
                "Understanding of divine wisdom behind trials and hardships",
                "Spiritual growth through patience during difficulties",
                "Purification of soul through divine tests",
                "Increased reliance on Allah during times of distress"
            ],
            physical: [
                "Strength to endure physical pain and illness",
                "Patience during health challenges and recovery",
                "Understanding that physical trials serve spiritual purposes"
            ],
            worldly: [
                "Peace and acceptance during worldly difficulties",
                "Wisdom to see trials as opportunities for growth",
                "Resilience in facing business or personal setbacks"
            ],
            recitationGuidance: [
                "Recite 20 times on Friday nights for gaining peace",
                "Best during times of hardship for spiritual understanding",
                "Combine with prayers for patience and wisdom",
                "Recite when seeking to understand divine wisdom in trials"
            ]
        },
        quranicReferences: ["Quran 6:17"],
        hadithReferences: [
            "No fatigue, disease, sorrow, sadness, hurt or distress befalls a Muslim - even if it were the prick he receives from a thorn - except that Allah expiates some of his sins for that - Bukhari",
            "Amazing is the affair of the believer, verily all of his affair is good - Muslim"
        ],
        duas: [
            "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ - Allah is sufficient for us and the best trustee",
            "إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ - Indeed we belong to Allah and indeed to Him we will return"
        ]
    },

    {
        id: 92,
        arabic: "النَّافِعُ",
        transliteration: "An-Nafi",
        english: "The Creator of Good",
        meaning: "The Benefiter",
        description: "The One who creates benefit and good for His creation according to His wisdom. An-Nafi brings advantage, profit, and positive outcomes in all aspects of life.",
        detailedBenefits: {
            spiritual: [
                "Spiritual benefits and positive outcomes in religious matters",
                "Beneficial knowledge and wisdom in Islamic teachings",
                "Positive spiritual experiences and enlightenment",
                "Beneficial companionship with righteous people"
            ],
            physical: [
                "Physical benefits and improvements in health",
                "Beneficial treatments and remedies for ailments",
                "Positive outcomes in medical procedures and recovery"
            ],
            worldly: [
                "Success in beneficial endeavors and good acts",
                "Profitable business ventures and investments",
                "Beneficial relationships and partnerships",
                "Positive outcomes in all worldly affairs"
            ],
            recitationGuidance: [
                "Recite 41 times before starting any good act for success",
                "Best when seeking beneficial outcomes in any matter",
                "Combine with intention to benefit others",
                "Recite when starting new beneficial projects"
            ]
        },
        quranicReferences: ["Quran 30:37"],
        hadithReferences: [
            "The best of people are those who benefit others - Traditional",
            "Allah loves when one of you does a job, he does it with excellence - Bayhaqi"
        ],
        duas: [
            "اللَّهُمَّ انْفَعْنِي بِمَا عَلَّمْتَنِي - O Allah, benefit me with what You have taught me",
            "رَبِّ اجْعَلْ عَمَلِي كُلَّهُ صَالِحاً - My Lord, make all my work righteous"
        ]
    },

    {
        id: 93,
        arabic: "النُّورُ",
        transliteration: "An-Nur",
        english: "The Light",
        meaning: "The Illuminator",
        description: "The One who is the source of all light - physical, spiritual, and metaphysical. An-Nur illuminates hearts, minds, and souls, guiding away from darkness of ignorance and misguidance.",
        detailedBenefits: {
            spiritual: [
                "Enlightenment of heart and soul with divine light",
                "Spiritual illumination and clarity in religious matters",
                "Guidance away from spiritual darkness and confusion",
                "Inner light that reflects in character and behavior"
            ],
            physical: [
                "Physical enlightenment and clarity of vision",
                "Brightness and radiance in appearance",
                "Clear thinking and mental illumination"
            ],
            worldly: [
                "Clarity in decision-making and life choices",
                "Illumination of path to success and prosperity",
                "Light and positivity in relationships and environment"
            ],
            recitationGuidance: [
                "Recite frequently to enlighten the inside of the person",
                "Best during meditation and spiritual reflection",
                "Combine with seeking guidance from Allah",
                "Recite when facing darkness or confusion in any matter"
            ]
        },
        quranicReferences: ["Quran 24:35"],
        hadithReferences: [
            "Allah is the light of the heavens and the earth - Quran 24:35",
            "The believer is like a lamp among people - Traditional"
        ],
        duas: [
            "اللَّهُمَّ اجْعَلْ لِي نُوراً - O Allah, make for me a light",
            "رَبِّ اشْرَحْ لِي صَدْرِي وَنَوِّرْ قَلْبِي - My Lord, expand my chest and illuminate my heart"
        ]
    },

    {
        id: 94,
        arabic: "الْهَادِي",
        transliteration: "Al-Hadi",
        english: "The Guide",
        meaning: "The Leader",
        description: "The One who guides His creation to what benefits them in this life and the hereafter. Al-Hadi provides direction, shows the right path, and leads to success and salvation.",
        detailedBenefits: {
            spiritual: [
                "Divine guidance in all religious and spiritual matters",
                "Direction towards righteous path and good deeds",
                "Leadership in community and religious affairs",
                "Guidance away from sins and towards obedience"
            ],
            physical: [
                "Guidance in health matters and beneficial treatments",
                "Direction towards healthy lifestyle and habits",
                "Leadership in physical activities and sports"
            ],
            worldly: [
                "Guidance in career choices and business decisions",
                "Direction towards profitable and beneficial ventures",
                "Leadership opportunities and success in management",
                "Fulfillment of needs through divine guidance"
            ],
            recitationGuidance: [
                "Recite 1100 times to fulfill needs and desires",
                "Best when seeking guidance in important decisions",
                "Combine with istikhara prayer for divine direction",
                "Recite when feeling lost or confused about life path"
            ]
        },
        quranicReferences: ["Quran 25:31"],
        hadithReferences: [
            "And Allah guides whom He wills to a straight path - Quran 2:213",
            "Whoever Allah guides, none can misguide - Traditional"
        ],
        duas: [
            "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ - Guide us to the straight path",
            "رَبِّ اهْدِنِي فِيمَنْ هَدَيْتَ - My Lord, guide me among those You have guided"
        ]
    },

    {
        id: 95,
        arabic: "الْبَدِيعُ",
        transliteration: "Al-Badi",
        english: "The Originator",
        meaning: "The Innovator",
        description: "The One who creates without precedent or example. Al-Badi originates everything uniquely and perfectly, bringing forth creation with divine innovation and unmatched creativity.",
        detailedBenefits: {
            spiritual: [
                "Innovation and creativity in spiritual practices",
                "Original approaches to worship and devotion",
                "Relief from spiritual distress and difficulties",
                "Unique spiritual experiences and insights"
            ],
            physical: [
                "Creative solutions to physical problems and ailments",
                "Innovation in health and wellness approaches",
                "Original methods for physical improvement"
            ],
            worldly: [
                "Innovation and creativity in professional endeavors",
                "Original business ideas and unique solutions",
                "Relief from financial and worldly distress",
                "Creative problem-solving abilities"
            ],
            recitationGuidance: [
                "Recite 70,000 times for relief from any type of distress",
                "Best when seeking creative solutions or innovation",
                "Combine with prayers for unique opportunities",
                "Recite when facing seemingly unsolvable problems"
            ]
        },
        quranicReferences: ["Quran 2:117", "Quran 6:101"],
        hadithReferences: [
            "The Originator of the heavens and the earth - Quran 6:101",
            "Allah has prescribed excellence in everything - Muslim"
        ],
        duas: [
            "بَدِيعُ السَّمَاوَاتِ وَالأَرْضِ - Originator of the heavens and the earth",
            "اللَّهُمَّ أَلْهِمْنِي رُشْدِي - O Allah, inspire me with guidance"
        ]
    },

    {
        id: 96,
        arabic: "اَلْبَاقِي",
        transliteration: "Al-Baqi",
        english: "The Everlasting One",
        meaning: "The Enduring",
        description: "The One whose existence is everlasting and eternal. Al-Baqi remains forever while everything else perishes, representing permanence, continuity, and eternal existence.",
        detailedBenefits: {
            spiritual: [
                "Permanence and continuity in spiritual practices",
                "Everlasting spiritual rewards and benefits",
                "Acceptance of all good deeds by Allah",
                "Eternal connection with divine presence"
            ],
            physical: [
                "Longevity and lasting health",
                "Endurance and stamina in physical activities",
                "Permanent improvement in physical conditions"
            ],
            worldly: [
                "Lasting success and enduring achievements",
                "Permanent solutions to worldly problems",
                "Everlasting beneficial relationships",
                "Acceptance and recognition that endures"
            ],
            recitationGuidance: [
                "Recite 100 times every Friday night for acceptance of good deeds",
                "Best when seeking permanent solutions or lasting success",
                "Combine with prayers for everlasting benefits",
                "Recite when wanting achievements that endure"
            ]
        },
        quranicReferences: ["Quran 20:73", "Quran 87:17"],
        hadithReferences: [
            "All that is on earth will perish, but the Face of your Lord will remain - Quran 55:26-27",
            "The most beloved deeds to Allah are the most consistent - Bukhari"
        ],
        duas: [
            "وَيَبْقَى وَجْهُ رَبِّكَ ذُو الْجَلاَلِ وَالإِكْرَامِ - And the Face of your Lord will remain, Owner of Majesty and Honor",
            "اللَّهُمَّ بَارِكْ لَنَا فِيمَا أَعْطَيْتَنَا - O Allah, bless us in what You have given us"
        ]
    },

    {
        id: 97,
        arabic: "الْوَارِثُ",
        transliteration: "Al-Warith",
        english: "The Inheritor of All",
        meaning: "The Heir",
        description: "The One who remains after everything perishes and inherits all that exists. Al-Warith is the ultimate inheritor who will remain when all creation passes away.",
        detailedBenefits: {
            spiritual: [
                "Inheritance of spiritual blessings and divine favor",
                "Legacy of righteous deeds that continue after death",
                "Spiritual inheritance passed to future generations",
                "Protection from sorrow and spiritual distress"
            ],
            physical: [
                "Safety and protection from physical harm",
                "Inheritance of good health and vitality",
                "Protection from morning dangers and threats"
            ],
            worldly: [
                "Rightful inheritance and legacy in worldly matters",
                "Beneficial inheritance for children and family",
                "Protection from financial loss and material sorrow",
                "Lasting wealth and prosperity for generations"
            ],
            recitationGuidance: [
                "Recite 100 times after sunrise for safety from sorrow and distress",
                "Best when seeking rightful inheritance or legacy",
                "Combine with prayers for beneficial inheritance",
                "Recite when concerned about leaving good legacy"
            ]
        },
        quranicReferences: ["Quran 15:23", "Quran 28:58"],
        hadithReferences: [
            "And indeed, it is We who give life and cause death, and We are the Inheritor - Quran 15:23",
            "The best inheritance a father can leave for his children is good character - Traditional"
        ],
        duas: [
            "وَإِنَّا لَنَحْنُ نُحْيِي وَنُمِيتُ وَنَحْنُ الْوَارِثُونَ - Indeed it is We who give life and cause death, and We are the Inheritor",
            "اللَّهُمَّ بَارِكْ لَنَا فِي ذُرِّيَّتِنَا - O Allah, bless us in our offspring"
        ]
    },

    {
        id: 98,
        arabic: "الرَّشِيدُ",
        transliteration: "Ar-Rashid",
        english: "The Righteous Teacher",
        meaning: "The Guide to Right Path",
        description: "The One who guides to the right path and teaches beneficial knowledge. Ar-Rashid provides wise guidance, righteous direction, and teaches what leads to success in both worlds.",
        detailedBenefits: {
            spiritual: [
                "Righteous guidance in all religious matters",
                "Teaching and understanding of beneficial Islamic knowledge",
                "Direction towards righteous deeds and good character",
                "Wisdom in spiritual decisions and choices"
            ],
            physical: [
                "Guidance towards healthy and beneficial lifestyle",
                "Right direction in health and medical decisions",
                "Wise choices in physical activities and habits"
            ],
            worldly: [
                "Completion of difficult tasks and projects",
                "Right guidance in career and business decisions",
                "Wise direction in financial and material matters",
                "Success in challenging endeavors through divine guidance"
            ],
            recitationGuidance: [
                "Recite 1000 times between Maghrib and Isha to complete difficult tasks",
                "Best when seeking wise guidance in important matters",
                "Combine with seeking Allah's direction in decisions",
                "Recite when facing tasks that seem impossible to complete"
            ]
        },
        quranicReferences: ["Quran 2:186", "Quran 11:87"],
        hadithReferences: [
            "And whoever relies upon Allah - then He is sufficient for him - Quran 65:3",
            "Seek guidance from Allah in all your affairs - Traditional"
        ],
        duas: [
            "رَبِّ أَرْشِدْنِي إِلَى مَا فِيهِ خَيْرِي - My Lord, guide me to what is good for me",
            "اللَّهُمَّ أَرْشِدْنِي لأَحْسَنِ الأَخْلاَقِ - O Allah, guide me to the best of character"
        ]
    },

    {
        id: 99,
        arabic: "الصَّبُورُ",
        transliteration: "As-Sabur",
        english: "The Patient One",
        meaning: "The Most Patient",
        description: "The One who does not hasten punishment for sinners and bears with His creation with infinite patience. As-Sabur teaches patience, endurance, and perseverance through His divine example.",
        detailedBenefits: {
            spiritual: [
                "Development of patience and perseverance in worship",
                "Endurance through spiritual trials and tests",
                "Patience in seeking divine rewards and paradise",
                "Rescue from spiritual difficulties through patient endurance"
            ],
            physical: [
                "Patience during illness and physical hardships",
                "Endurance and stamina in physical challenges",
                "Perseverance through long recovery processes"
            ],
            worldly: [
                "Rescue from worldly difficulties through patience",
                "Endurance through business and financial hardships",
                "Patience in achieving long-term goals and success",
                "Perseverance through challenging relationships"
            ],
            recitationGuidance: [
                "Recite 3000 times to be rescued from difficulties",
                "Best during times of hardship and trial",
                "Combine with practicing actual patience in daily life",
                "Recite when feeling impatient or overwhelmed by problems"
            ]
        },
        quranicReferences: ["Quran 103:3", "Quran 25:20"],
        hadithReferences: [
            "And give good tidings to the patient - Quran 2:155",
            "No one is given a better and more abundant gift than patience - Bukhari"
        ],
        duas: [
            "رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْراً - Our Lord, pour upon us patience",
            "اللَّهُمَّ أَعِنِّي عَلَى الصَّبْرِ - O Allah, help me with patience"
        ]
    }
];


function AllahNames() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedName, setSelectedName] = useState<AsmaName | null>(null);
    const [filteredNames, setFilteredNames] = useState<AsmaName[]>(allahNamesData);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
    const [favorites, setFavorites] = useState<number[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(12);
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

    // Filter names based on search
    useEffect(() => {
        let filtered = allahNamesData.filter(name =>
            name.arabic.includes(searchTerm) ||
            name.transliteration.toLowerCase().includes(searchTerm.toLowerCase()) ||
            name.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
            name.meaning.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (showFavoritesOnly) {
            filtered = filtered.filter(name => favorites.includes(name.id));
        }

        setFilteredNames(filtered);
        setCurrentPage(1);
    }, [searchTerm, favorites, showFavoritesOnly]);

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentNames = filteredNames.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredNames.length / itemsPerPage);

    const playAudio = (nameId: number) => {
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }

        // Fallback: Use Web Speech API for pronunciation
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(allahNamesData[nameId - 1].transliteration);
            utterance.lang = 'ar-SA';
            utterance.rate = 0.8;
            speechSynthesis.speak(utterance);
            setIsPlaying(true);

            utterance.onend = () => {
                setIsPlaying(false);
            };
        }
    };

    const toggleFavorite = (nameId: number) => {
        setFavorites(prev =>
            prev.includes(nameId)
                ? prev.filter(id => id !== nameId)
                : [...prev, nameId]
        );
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        alert('Copied to clipboard!'); // Simple alert, you can replace with toast
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4">
            <Helmet>
                <title>99 Names of Allah - Asma ul Husna | Qalam Verse</title>
                <meta name="description" content="Learn the 99 beautiful names of Allah (Asma ul Husna) with meanings, benefits, and Quranic references. Complete Islamic guide with audio pronunciation." />
                <meta name="keywords" content="99 Names of Allah, Asma ul Husna, Allah Names, Islamic Names, Quran, Islamic Learning, Beautiful Names of God" />
                <link rel="canonical" href="https://sheikhsohail007.github.io/Ummah/#/allah-names" />
            </Helmet>

            <div className="max-w-7xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="group flex items-center text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-200 mb-8 p-2 rounded-lg hover:bg-white/80 dark:hover:bg-gray-800/80"
                >
                    <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
                    <span className="font-medium">Back</span>
                </button>

                {/* Header Section */}
                <div className="text-center mb-12">
                    <div className="mb-6">
                        <h1 className="text-4xl md:text-6xl font-bold mb-4" style={{ fontFamily: 'Amiri, serif' }}>
                            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                أَسْمَاءُ اللهِ الْحُسْنَى
                            </span>
                        </h1>
                        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                            The 99 Beautiful Names of Allah
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                            "And to Allah belong the best names, so invoke Him by them" - Quran 7:180
                        </p>
                    </div>

                    {/* Search and Filter Bar */}
                    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20 dark:border-gray-700/50 mb-8">
                        <div className="flex flex-col md:flex-row gap-4 items-center">
                            <div className="relative flex-1">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search by Arabic, English, or meaning..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 dark:focus:ring-emerald-800 transition-all duration-200"
                                />
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setShowFavoritesOnly(false)}
                                    className={`px-4 py-3 rounded-xl transition-colors font-medium ${!showFavoritesOnly
                                        ? 'bg-emerald-600 text-white'
                                        : 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-800/50'
                                        }`}
                                >
                                    All Names ({allahNamesData.length})
                                </button>
                                <button
                                    onClick={() => setShowFavoritesOnly(true)}
                                    className={`px-4 py-3 rounded-xl transition-colors font-medium flex items-center gap-2 ${showFavoritesOnly
                                        ? 'bg-pink-600 text-white'
                                        : 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 hover:bg-pink-200 dark:hover:bg-pink-800/50'
                                        }`}
                                >
                                    <Heart className="w-4 h-4" />
                                    Favorites ({favorites.length})
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Names Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                    {currentNames.map((name) => (
                        <div
                            key={name.id}
                            className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/20 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                            onClick={() => setSelectedName(name)}
                        >
                            {/* Header with Number and Favorite */}
                            <div className="flex justify-between items-start mb-4">
                                <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-3 py-1 rounded-full text-sm font-bold">
                                    {name.id}
                                </span>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleFavorite(name.id);
                                    }}
                                    className={`p-2 rounded-full transition-colors ${favorites.includes(name.id)
                                        ? 'text-pink-500 bg-pink-100 dark:bg-pink-900/30'
                                        : 'text-gray-400 hover:text-pink-500 hover:bg-pink-100 dark:hover:bg-pink-900/30'
                                        }`}
                                >
                                    <Heart className={`w-4 h-4 ${favorites.includes(name.id) ? 'fill-current' : ''}`} />
                                </button>
                            </div>

                            {/* Arabic Name */}
                            <div className="text-center mb-4">
                                <h3 className="text-3xl font-bold text-emerald-700 dark:text-emerald-300 mb-2" style={{ fontFamily: 'Amiri, serif' }}>
                                    {name.arabic}
                                </h3>
                                <div className="flex items-center justify-center gap-2 mb-2">
                                    <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                                        {name.transliteration}
                                    </p>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            playAudio(name.id);
                                        }}
                                        className="p-1 rounded-full hover:bg-emerald-100 dark:hover:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 transition-colors"
                                    >
                                        {isPlaying ? (
                                            <Volume2 className="w-4 h-4" />
                                        ) : (
                                            <Play className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>
                                <p className="text-gray-600 dark:text-gray-400 font-medium">
                                    {name.english}
                                </p>
                            </div>

                            {/* Meaning Preview */}
                            <p className="text-sm text-gray-600 dark:text-gray-400 text-center line-clamp-2">
                                {name.meaning}
                            </p>

                            {/* View Details Button */}
                            <div className="mt-4 text-center">
                                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium group-hover:underline">
                                    Click to learn more →
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* No Results Message */}
                {filteredNames.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-xl text-gray-500 dark:text-gray-400 mb-4">No names found</p>
                        <button
                            onClick={() => {
                                setSearchTerm('');
                                setShowFavoritesOnly(false);
                            }}
                            className="px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors"
                        >
                            Show All Names
                        </button>
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mb-8">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>

                        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                            let page;
                            if (totalPages <= 5) {
                                page = i + 1;
                            } else if (currentPage <= 3) {
                                page = i + 1;
                            } else if (currentPage >= totalPages - 2) {
                                page = totalPages - 4 + i;
                            } else {
                                page = currentPage - 2 + i;
                            }
                            return (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${currentPage === page
                                        ? 'bg-emerald-600 text-white'
                                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                                        }`}
                                >
                                    {page}
                                </button>
                            );
                        })}

                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                )}

                {/* Detailed Modal */}
                {selectedName && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-white dark:bg-gray-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 dark:border-gray-700">
                            {/* Modal Header */}
                            <div className="sticky top-0 bg-gradient-to-r from-emerald-500 to-teal-500 p-6 text-white rounded-t-3xl">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-4 mb-4">
                                            <span className="bg-white/20 px-4 py-2 rounded-full text-sm font-bold">
                                                #{selectedName.id}
                                            </span>
                                            <h2 className="text-4xl font-bold" style={{ fontFamily: 'Amiri, serif' }}>
                                                {selectedName.arabic}
                                            </h2>
                                        </div>
                                        <div className="flex items-center gap-4 mb-2">
                                            <h3 className="text-2xl font-semibold">{selectedName.transliteration}</h3>
                                            <button
                                                onClick={() => playAudio(selectedName.id)}
                                                className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                                            >
                                                <Play className="w-5 h-5" />
                                            </button>
                                        </div>
                                        <p className="text-xl text-emerald-100">{selectedName.english}</p>
                                    </div>
                                    <button
                                        onClick={() => setSelectedName(null)}
                                        className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors text-2xl"
                                    >
                                        ✕
                                    </button>
                                </div>
                            </div>

                            {/* Modal Content */}
                            <div className="p-6 space-y-6">
                                {/* Meaning */}
                                <div>
                                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                                        <Book className="w-5 h-5 text-emerald-600" />
                                        Meaning
                                    </h4>
                                    <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                                        {selectedName.meaning}
                                    </p>
                                </div>

                                {/* Description */}
                                <div>
                                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                                        Description
                                    </h4>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                        {selectedName.description}
                                    </p>
                                </div>

                                {/* Benefits */}
                                {/* Enhanced Benefits Section */}
                                <div className="space-y-4">
                                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                                        <Star className="w-5 h-5 text-yellow-500" />
                                        Detailed Benefits
                                    </h4>

                                    {/* Spiritual Benefits */}
                                    <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
                                        <h5 className="font-semibold text-green-800 dark:text-green-300 mb-2">Spiritual Benefits</h5>
                                        <ul className="space-y-1">
                                            {selectedName.detailedBenefits.spiritual.map((benefit, index) => (
                                                <li key={index} className="flex items-start gap-2 text-sm">
                                                    <span className="text-green-500 mt-1">🌟</span>
                                                    <span className="text-gray-600 dark:text-gray-400">{benefit}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Physical Benefits */}
                                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
                                        <h5 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">Physical & Mental Benefits</h5>
                                        <ul className="space-y-1">
                                            {selectedName.detailedBenefits.physical.map((benefit, index) => (
                                                <li key={index} className="flex items-start gap-2 text-sm">
                                                    <span className="text-blue-500 mt-1">💙</span>
                                                    <span className="text-gray-600 dark:text-gray-400">{benefit}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Worldly Benefits */}
                                    <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4">
                                        <h5 className="font-semibold text-purple-800 dark:text-purple-300 mb-2">Worldly Benefits</h5>
                                        <ul className="space-y-1">
                                            {selectedName.detailedBenefits.worldly.map((benefit, index) => (
                                                <li key={index} className="flex items-start gap-2 text-sm">
                                                    <span className="text-purple-500 mt-1">🌍</span>
                                                    <span className="text-gray-600 dark:text-gray-400">{benefit}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Recitation Guidance */}
                                    <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-4">
                                        <h5 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">Recitation Guidance</h5>
                                        <ul className="space-y-1">
                                            {selectedName.detailedBenefits.recitationGuidance.map((guidance, index) => (
                                                <li key={index} className="flex items-start gap-2 text-sm">
                                                    <span className="text-yellow-500 mt-1">📿</span>
                                                    <span className="text-gray-600 dark:text-gray-400">{guidance}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Hadith References - ADD AFTER Benefits */}
                                {selectedName.hadithReferences && (
                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                                            Related Hadith
                                        </h4>
                                        <div className="space-y-3">
                                            {selectedName.hadithReferences.map((hadith, index) => (
                                                <div key={index} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 border-l-4 border-emerald-500">
                                                    <p className="text-gray-600 dark:text-gray-400 italic text-sm">{hadith}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Related Duas - ADD AFTER Hadith */}
                                {selectedName.duas && (
                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                                            Related Duas
                                        </h4>
                                        <div className="space-y-3">
                                            {selectedName.duas.map((dua, index) => (
                                                <div key={index} className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-4">
                                                    <p className="text-emerald-800 dark:text-emerald-300 text-lg mb-2" style={{ fontFamily: 'Amiri, serif' }}>
                                                        {dua.split(' - ')[0]}
                                                    </p>
                                                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                                                        {dua.split(' - ')[1]}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}


                                {/* Quranic References */}
                                <div>
                                    <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                                        Quranic References
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedName.quranicReferences.map((ref, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full text-sm font-medium"
                                            >
                                                {ref}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                                    <button
                                        onClick={() => copyToClipboard(`${selectedName.arabic} - ${selectedName.transliteration} - ${selectedName.english}`)}
                                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                                    >
                                        <Copy className="w-4 h-4" />
                                        Copy
                                    </button>
                                    <button
                                        onClick={() => toggleFavorite(selectedName.id)}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${favorites.includes(selectedName.id)
                                            ? 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300'
                                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-pink-100 dark:hover:bg-pink-900/30'
                                            }`}
                                    >
                                        <Heart className={`w-4 h-4 ${favorites.includes(selectedName.id) ? 'fill-current' : ''}`} />
                                        {favorites.includes(selectedName.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AllahNames;
