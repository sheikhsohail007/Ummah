import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Book, Heart, Star, User, Clock, RefreshCw, Globe } from 'lucide-react';
import { Mood } from '../App';

interface IslamicStoriesProps {
  selectedMood: Mood | null;
}

interface Language {
  code: string;
  name: string;
  flag: string;
}

interface Verse {
  arabic: string;
  translation: string;
  reference: string;
}

interface StoryContent {
  title: string;
  content: string;
  moral: string;
  character: string;
  category: string;
}

interface Story {
  id: string;
  content: {
    en: StoryContent;
    hi: StoryContent;
    bn: StoryContent;
  };
  readTime: string;
  moods: string[];
  tags: string[];
  verses?: Verse[];
}

function IslamicStories({ selectedMood }: IslamicStoriesProps) {
  const [currentStory, setCurrentStory] = useState<Story | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedStory, setExpandedStory] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');

  const languages: Language[] = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'bn', name: 'বাংলা', flag: '🇧🇩' },
  ];

  const stories: Story[] = [
    {
      id: '1',
      content: {
        en: {
          title: 'The Patient Merchant',
          content: `A wealthy merchant in Baghdad lost everything in a single day - his ships sank, his warehouses burned, and his debtors fled. As he sat in despair, he remembered the words of Prophet Muhammad (PBUH): "No fatigue, nor disease, nor sorrow, nor sadness, nor hurt, nor distress befalls a Muslim, not even if it were the prick he receives from a thorn, but that Allah expiates some of his sins for that."

The merchant realized that his losses were a test from Allah. Instead of despairing, he made dua and asked Allah for guidance. He started small, selling simple goods in the marketplace with honesty and kindness. 

Within a few years, his reputation for integrity attracted customers from far and wide. He became more prosperous than before, but this time he was grateful for every blessing and helped the poor regularly. He often said, "My greatest wealth was lost so I could find my greatest treasure - complete trust in Allah."`,
          moral: 'Tests and trials are opportunities for spiritual growth. When we face difficulties with patience and trust in Allah, we often emerge stronger and more blessed than before.',
          character: 'Abu Yusuf Al-Baghdadi',
          category: 'Patience in Trials'
        },
        hi: {
          title: 'धैर्यवान व्यापारी',
          content: `बगदाद में एक धनी व्यापारी था जिसने एक ही दिन में सब कुछ खो दिया - उसके जहाज डूब गए, गोदाम जल गए, और कर्जदार भाग गए। जब वह निराशा में बैठा था, तो उसे पैगंबर मुहम्मद (सल्ल.) के शब्द याद आए: "कोई भी थकान, बीमारी, दुख, उदासी, चोट या परेशानी मुसलमान पर नहीं आती, यहां तक कि कांटे की चुभन भी नहीं, जिसके बदले अल्लाह उसके कुछ गुनाह माफ न कर दे।"

व्यापारी ने समझा कि उसके नुकसान अल्लाह की तरफ से एक परीक्षा थे। निराश होने के बजाय, उसने दुआ की और अल्लाह से मार्गदर्शन मांगा। उसने छोटी शुरुआत की, बाजार में सच्चाई और दया के साथ सामान बेचना शुरू किया।

कुछ वर्षों के भीतर, उसकी ईमानदारी की प्रतिष्ठा ने दूर-दूर से ग्राहकों को आकर्षित किया। वह पहले से भी अधिक समृद्ध बन गया, लेकिन इस बार वह हर आशीर्वाद के लिए कृतज्ञ था और नियमित रूप से गरीबों की मदद करता था। वह अक्सर कहता था, "मेरी सबसे बड़ी संपत्ति खो गई ताकि मैं अपना सबसे बड़ा खजाना पा सकूं - अल्लाह पर पूरा भरोसा।"`,
          moral: 'परीक्षा और कष्ट आध्यात्मिक विकास के अवसर हैं। जब हम कठिनाइयों का सामना धैर्य और अल्लाह पर भरोसे के साथ करते हैं, तो हम अक्सर पहले से अधिक मजबूत और धन्य बनकर निकलते हैं।',
          character: 'अबू यूसुफ अल-बगदादी',
          category: 'परीक्षा में धैर्य'
        },
        bn: {
          title: 'ধৈর্যশীল ব্যবসায়ী',
          content: `বাগদাদে একজন ধনী ব্যবসায়ী ছিল যে একদিনেই সব কিছু হারিয়েছিল - তার জাহাজ ডুবে গেছে, গুদামঘর পুড়ে গেছে, আর ঋণদাতারা পালিয়ে গেছে। যখন সে হতাশায় বসে ছিল, তখন তার নবী মুহাম্মদ (সা.)-এর কথা মনে পড়ল: "কোনো ক্লান্তি, রোগ, দুঃখ, বিষাদ, কষ্ট বা যন্ত্রণা মুসলমানের উপর আসে না, এমনকি কাঁটার একটি খোঁচাও না, যার বিনিময়ে আল্লাহ তার কিছু গুনাহ মাফ করে দেন না।"

ব্যবসায়ী বুঝতে পারল যে তার ক্ষতি আল্লাহর পক্ষ থেকে একটি পরীক্ষা। হতাশ না হয়ে, সে দোয়া করল এবং আল্লাহর কাছে পথনির্দেশনা চাইল। সে ছোট করে শুরু করল, বাজারে সততা ও দয়ার সাথে সাধারণ পণ্য বিক্রি করতে লাগল।

কয়েক বছরের মধ্যে, তার সততার খ্যাতি দূর-দূরান্ত থেকে গ্রাহকদের আকর্ষণ করল। সে আগের চেয়েও বেশি সমৃদ্ধ হয়ে উঠল, কিন্তু এবার সে প্রতিটি নেয়ামতের জন্য কৃতজ্ঞ ছিল এবং নিয়মিত গরিবদের সাহায্য করত। সে প্রায়ই বলত, "আমার সবচেয়ে বড় সম্পদ হারিয়ে গেছে যাতে আমি আমার সবচেয়ে বড় ধনভান্ডার পেতে পারি - আল্লাহর উপর পূর্ণ নির্ভরতা।"`,
          moral: 'পরীক্ষা ও কষ্ট আধ্যাত্মিক উন্নতির সুযোগ। যখন আমরা কঠিনতার মুখোমুখি হই ধৈর্য ও আল্লাহর প্রতি আস্থার সাথে, আমরা প্রায়ই আগের চেয়ে শক্তিশালী ও বেশি নেয়ামতপ্রাপ্ত হয়ে উঠি।',
          character: 'আবু ইউসুফ আল-বাগদাদি',
          category: 'পরীক্ষায় ধৈর্য'
        }
      },
      readTime: '3 min',
      moods: ['sad', 'disappointed', 'worried', 'anxious', 'overwhelmed'],
      tags: ['patience', 'trust', 'prosperity', 'trials']
    },
    {
      id: '2',
      content: {
        en: {
          title: 'The Grateful Shepherd',
          content: `A poor shepherd boy tended his small flock outside Medina. Every morning, he would wake up before Fajr and thank Allah for the beautiful sunrise. Every evening, he would praise Allah for the peaceful sunset. His few sheep were healthy, and he had simple food to eat.

One day, a wealthy man passed by and pitied the shepherd's poverty. "Why do you seem so happy when you have so little?" he asked. The shepherd smiled and replied, "I have everything I need. Allah gives me fresh air to breathe, water to drink, food to eat, and the most beautiful views in creation. I have health, faith, and peace. What more could I want?"

The wealthy man was amazed. He realized that despite all his riches, he was always complaining and never felt satisfied. From that day, he began each morning by counting his blessings instead of his problems. Soon, his anxiety disappeared, and he found the contentment he had been seeking in his wealth.`,
          moral: 'True happiness comes not from having more, but from being grateful for what we already have. Gratitude transforms any situation into a blessing.',
          character: 'Salim the Shepherd',
          category: 'Gratitude'
        },
        hi: {
          title: 'कृतज्ञ चरवाहा',
          content: `मदीना के बाहर एक गरीब चरवाहा लड़का अपने छोटे झुंड की देखभाल करता था। हर सुबह, वह फज्र से पहले उठकर सुंदर सूर्योदय के लिए अल्लाह का शुक्र अदा करता था। हर शाम, वह शांतिपूर्ण सूर्यास्त के लिए अल्लाह की प्रशंसा करता था। उसकी कुछ भेड़ें स्वस्थ थीं, और उसके पास खाने के लिए सादा खाना था।

एक दिन, एक धनी आदमी वहां से गुजरा और चरवाहे की गरीबी पर तरस खाया। "तुम्हारे पास इतना कम है फिर भी तुम इतने खुश क्यों लगते हो?" उसने पूछा। चरवाहे ने मुस्कराते हुए जवाब दिया, "मेरे पास सब कुछ है जिसकी मुझे जरूरत है। अल्लाह मुझे सांस लेने के लिए ताजी हवा देता है, पीने के लिए पानी, खाने के लिए खुराक, और सृष्टि के सबसे सुंदर नजारे। मेरे पास सेहत, ईमान और शांति है। मैं और क्या चाहूंगा?"

धनी आदमी हैरान रह गया। उसे एहसास हुआ कि अपनी तमाम दौलत के बावजूद, वह हमेशा शिकायत करता रहता था और कभी संतुष्ट महसूस नहीं करता था। उस दिन से, वह हर सुबह अपनी समस्याओं के बजाय अपनी नेमतों को गिनना शुरू कर दिया। जल्द ही, उसकी चिंता गायब हो गई, और उसे वह संतुष्टि मिल गई जिसे वह अपनी दौलत में ढूंढ रहा था।`,
          moral: 'सच्ची खुशी अधिक पाने से नहीं, बल्कि जो हमारे पास है उसके लिए कृतज्ञ होने से मिलती है। कृतज्ञता किसी भी स्थिति को आशीर्वाद में बदल देती है।',
          character: 'सलीम चरवाहा',
          category: 'कृतज्ञता'
        },
        bn: {
          title: 'কৃতজ্ঞ রাখাল',
          content: `মদিনার বাইরে একজন গরিব রাখাল ছেলে তার ছোট পালের যত্ন নিত। প্রতিদিন সকালে, সে ফজরের আগে উঠে সুন্দর সূর্যোদয়ের জন্য আল্লাহর শুকরিয়া আদায় করত। প্রতি সন্ধ্যায়, সে শান্তিপূর্ণ সূর্যাস্তের জন্য আল্লাহর প্রশংসা করত। তার কয়েকটি ভেড়া সুস্থ ছিল, আর তার কাছে খাওয়ার জন্য সাধারণ খাবার ছিল।

একদিন, একজন ধনী ব্যক্তি সেখান দিয়ে যাচ্ছিল এবং রাখালের দারিদ্র্য দেখে দয়া করল। "তোমার কাছে এত কম থাকতে তুমি এত খুশি মনে হচ্ছ কেন?" সে জিজ্ঞেস করল। রাখাল হেসে উত্তর দিল, "আমার যা প্রয়োজন সব কিছুই আছে। আল্লাহ আমাকে শ্বাস নেওয়ার জন্য তাজা বাতাস দেন, পান করার জন্য পানি, খাওয়ার জন্য খাবার, আর সৃষ্টির সবচেয়ে সুন্দর দৃশ্য। আমার স্বাস্থ্য, ঈমান ও শান্তি আছে। আর কী চাইব?"

ধনী ব্যক্তিটি অবাক হয়ে গেল। সে বুঝতে পারল যে তার সমস্ত সম্পদ থাকা সত্ত্বেও, সে সব সময় অভিযোগ করত এবং কখনো সন্তুষ্ট বোধ করত না। সেদিন থেকে, সে প্রতিদিন সকালে তার সমস্যার বদলে তার নেয়ামত গুনতে শুরু করল। শীঘ্রই, তার উদ্বেগ অদৃশ্য হয়ে গেল, আর সে তার সম্পদে যে তৃপ্তি খুঁজছিল তা পেয়ে গেল।`,
          moral: 'সত্যিকারের সুখ বেশি পাওয়া থেকে নয়, বরং আমাদের যা আছে তার জন্য কৃতজ্ঞ হওয়া থেকে আসে। কৃতজ্ঞতা যেকোনো পরিস্থিতিকে নেয়ামতে রূপান্তরিত করে।',
          character: 'সালিম রাখাল',
          category: 'কৃতজ্ঞতা'
        }
      },
      readTime: '2 min',
      moods: ['grateful', 'content', 'peaceful', 'happy', 'thankful'],
      tags: ['gratitude', 'contentment', 'simplicity', 'happiness']
    },
    {
      id: '3',
      content: {
        en: {
          title: 'The Lost Traveler',
          content: `A young man was traveling to perform Hajj when he became lost in the desert. His water ran out, his camel died, and he was completely alone. As the sun beat down mercilessly, fear and panic began to overwhelm him. He had heard stories of people dying in the desert, and despair crept into his heart.

Then he remembered his grandmother's words: "Whenever you feel lost, make dua and remember that Allah is always with you." He performed wudu with the last drops of his water, found the direction of Mecca, and prayed two rakahs. He poured his heart out to Allah, asking for guidance and expressing complete trust in His mercy.

As he finished his prayer, he noticed footprints in the sand that he hadn't seen before. Following them, he found a caravan that had stopped at a nearby oasis. The travelers welcomed him warmly, shared their food and water, and helped him reach Mecca safely. Years later, he would tell his own children: "I was never truly lost, because Allah was always guiding me."`,
          moral: 'When we feel lost or confused, sincere prayer and trust in Allah\'s guidance will always lead us to the right path. Allah never abandons those who seek Him sincerely.',
          character: 'Ahmad ibn Rashid',
          category: 'Divine Guidance'
        },
        hi: {
          title: 'खो गया मुसाफिर',
          content: `एक युवक हज करने जा रहा था जब वह रेगिस्तान में खो गया। उसका पानी खत्म हो गया, उसका ऊंट मर गया, और वह बिल्कुल अकेला था। जब सूर्य बेरहमी से तप रहा था, तो डर और घबराहट ने उसे घेर लिया। उसने रेगिस्तान में लोगों के मरने की कहानियां सुनी थीं, और निराशा उसके दिल में घर कर गई।

तब उसे अपनी दादी के शब्द याद आए: "जब भी तुम खोया हुआ महसूस करो, दुआ करो और याद रखो कि अल्लाह हमेशा तुम्हारे साथ है।" उसने अपने पानी की अंतिम बूंदों से वुजू किया, मक्का की दिशा पाई, और दो रकअत नमाज़ पढ़ी। उसने अल्लाह के सामने अपना दिल खोल दिया, मार्गदर्शन मांगा और उसकी रहमत पर पूरा भरोसा जताया।

जैसे ही उसने अपनी नमाज़ समाप्त की, उसने रेत में पैरों के निशान देखे जो उसने पहले नहीं देखे थे। उनका पीछा करते हुए, उसे एक काफिला मिला जो पास के एक नखलिस्तान में रुका था। यात्रियों ने उसका गर्मजोशी से स्वागत किया, अपना खाना और पानी साझा किया, और उसे सुरक्षित रूप से मक्का पहुंचने में मदद की। वर्षों बाद, वह अपने बच्चों से कहता था: "मैं कभी वास्तव में खोया नहीं था, क्योंकि अल्लाह हमेशा मेरा मार्गदर्शन कर रहा था।"`,
          moral: 'जब हम खोया हुआ या भ्रमित महसूस करते हैं, तो सच्ची दुआ और अल्लाह के मार्गदर्शन पर भरोसा हमेशा हमें सही रास्ते पर ले जाएगा। अल्लाह उन्हें कभी नहीं छोड़ता जो उसे सच्चे दिल से तलाशते हैं।',
          character: 'अहमद इब्न रशीद',
          category: 'दिव्य मार्गदर्शन'
        },
        bn: {
          title: 'হারিয়ে যাওয়া পথিক',
          content: `একজন যুবক হজ পালন করতে যাচ্ছিল যখন সে মরুভূমিতে হারিয়ে গেল। তার পানি শেষ হয়ে গেল, তার উট মারা গেল, আর সে সম্পূর্ণ একা হয়ে পড়ল। যখন সূর্য নির্মমভাবে তাপ দিচ্ছিল, ভয় আর আতঙ্ক তাকে গ্রাস করতে শুরু করল। সে মরুভূমিতে মানুষের মরার গল্প শুনেছিল, আর হতাশা তার হৃদয়ে বাসা বাঁধল।

তখন তার দাদিমার কথা মনে পড়ল: "যখনই তুমি হারিয়ে যাওয়া বোধ কর, দোয়া কর এবং মনে রেখো যে আল্লাহ সর্বদা তোমার সাথে আছেন।" সে তার পানির শেষ ফোঁটা দিয়ে অজু করল, মক্কার দিক খুঁজে পেল, এবং দুই রাকআত নামাজ পড়ল। সে আল্লাহর কাছে তার হৃদয় উজাড় করে দিল, পথনির্দেশনা চাইল এবং তাঁর রহমতের উপর পূর্ণ আস্থা প্রকাশ করল।

তার নামাজ শেষ করার সাথে সাথে, সে বালিতে পায়ের ছাপ লক্ষ্য করল যা সে আগে দেখেনি। সেগুলো অনুসরণ করে, সে একটি কাফেলা খুঁজে পেল যা কাছের একটি মরুদ্যানে থেমেছিল। ভ্রমণকারীরা তাকে উষ্ণভাবে স্বাগত জানাল, তাদের খাবার ও পানি ভাগ করে দিল, এবং তাকে নিরাপদে মক্কা পৌঁছতে সাহায্য করল। বছরের পর বছর, সে তার নিজের সন্তানদের বলত: "আমি কখনো সত্যিই হারিয়ে যাইনি, কারণ আল্লাহ সর্বদা আমাকে পথ দেখিয়েছেন।"`,
          moral: 'যখন আমরা হারিয়ে যাওয়া বা বিভ্রান্ত বোধ করি, তখন আন্তরিক দোয়া এবং আল্লাহর পথনির্দেশনায় আস্থা সর্বদা আমাদের সঠিক পথে নিয়ে যাবে। যারা আন্তরিকতার সাথে তাঁকে খোঁজে, আল্লাহ তাদের কখনো পরিত্যাগ করেন না।',
          character: 'আহমাদ ইবনে রাশিদ',
          category: 'ঐশী পথনির্দেশনা'
        }
      },
      readTime: '3 min',
      moods: ['confused', 'scared', 'lost', 'uncertain', 'anxious'],
      tags: ['guidance', 'prayer', 'trust', 'mercy', 'pilgrimage']
    },
    {
      id: '4',
      content: {
        en: {
          title: 'The Inspired Scholar',
          content: `A young woman in Cordoba had a burning desire to become a scholar of Islamic jurisprudence, but she faced many obstacles. Her family thought it was inappropriate, society didn't support women scholars, and she had no formal education. Many people told her to give up her dreams.

But she remembered the hadith: "Seek knowledge from the cradle to the grave." She was determined to follow Allah's command to seek knowledge. She started by learning to read and write from her grandmother. Then she attended public lectures by standing outside the mosque and listening through the windows.

Her dedication impressed a renowned female scholar who agreed to teach her privately. For ten years, she studied day and night, memorizing the Quran and learning hadith. Eventually, she became one of the most respected scholars in Al-Andalus, teaching hundreds of students and writing influential works on Islamic law.

Her story inspired countless other women to pursue knowledge. She would always tell her students: "When you have a righteous goal and work hard with sincere intention, Allah will open paths you never imagined."`,
          moral: 'When we are motivated to do something good and beneficial, we should trust in Allah and work hard towards our goals. He will provide ways we never expected.',
          character: 'Fatimah bint Ahmad al-Qurtubi',
          category: 'Pursuing Knowledge'
        },
        hi: {
          title: 'प्रेरित विद्वान',
          content: `कॉर्डोबा की एक युवती को इस्लामी न्यायशास्त्र की विद्वान बनने की प्रबल इच्छा थी, लेकिन उसे कई बाधाओं का सामना करना पड़ा। उसका परिवार सोचता था कि यह अनुचित है, समाज महिला विद्वानों का समर्थन नहीं करता था, और उसकी कोई औपचारिक शिक्षा नहीं थी। कई लोगों ने उससे कहा कि वह अपने सपनों को छोड़ दे।

लेकिन उसे हदीस याद थी: "पालने से कब्र तक इल्म हासिल करो।" वह अल्लाह के आदेश का पालन करने के लिए ज्ञान की तलाश करने के लिए दृढ़ संकल्पित थी। उसने अपनी दादी से पढ़ना और लिखना सीखकर शुरुआत की। फिर वह मस्जिद के बाहर खड़ी होकर खिड़कियों से सुनकर सार्वजनिक व्याख्यानों में भाग लेती थी।

उसकी समर्पणा ने एक प्रसिद्ध महिला विद्वान को प्रभावित किया जिसने उसे निजी तौर पर पढ़ाने के लिए सहमति दी। दस साल तक, उसने दिन-रात अध्ययन किया, कुरान को याद किया और हदीस सीखी। अंततः, वह अल-अंदलस की सबसे सम्मानित विद्वानों में से एक बन गई, सैकड़ों छात्रों को पढ़ाया और इस्लामी कानून पर प्रभावशाली कार्य लिखे।

उसकी कहानी ने अनगिनत अन्य महिलाओं को ज्ञान की खोज करने के लिए प्रेरित किया। वह हमेशा अपने छात्रों से कहती थी: "जब आपका कोई नेक मकसद हो और आप सच्ची नीयत से मेहनत करें, तो अल्लाह ऐसे रास्ते खोल देता है जिसकी आपने कभी कल्पना भी नहीं की थी।"`,
          moral: 'जब हम कुछ अच्छा और फायदेमंद करने के लिए प्रेरित होते हैं, तो हमें अल्लाह पर भरोसा करना चाहिए और अपने लक्ष्यों की दिशा में कड़ी मेहनत करनी चाहिए। वह ऐसे रास्ते प्रदान करेगा जिसकी हमने कभी उम्मीद नहीं की थी।',
          character: 'फातिमा बिंत अहमद अल-कुर्तुबी',
          category: 'ज्ञान की खोज'
        },
        bn: {
          title: 'অনুপ্রাণিত পণ্ডিত',
          content: `কর্ডোবার একজন তরুণী ইসলামী আইনশास্ত্রের পণ্ডিত হওয়ার প্রবল আকাঙ্ক্ষা পোষণ করত, কিন্তু সে অনেক বাধার মুখোমুখি হয়েছিল। তার পরিবার মনে করত এটা অনুচিত, সমাজ নারী পণ্ডিতদের সমর্থন করত না, এবং তার কোনো আনুষ্ঠানিক শিক্ষা ছিল না। অনেকে তাকে তার স্বপ্ন ত্যাগ করতে বলেছিল।

কিন্তু সে হাদিসের কথা মনে রেখেছিল: "দোলনা থেকে কবর পর্যন্ত জ্ঞান অর্জন কর।" সে আল্লাহর আদেশ অনুসরণ করে জ্ঞান অর্জনের জন্য দৃঢ়প্রতিজ্ঞ ছিল। সে তার দাদিমার কাছ থেকে পড়া ও লেখা শিখে শুরু করেছিল। তারপর সে মসজিদের বাইরে দাঁড়িয়ে জানালা দিয়ে শুনে পাবলিক লেকচারে অংশ নিত।

তার নিষ্ঠা একজন প্রখ্যাত নারী পণ্ডিতকে প্রভাবিত করেছিল যিনি তাকে ব্যক্তিগতভাবে শেখাতে সম্মত হয়েছিলেন। দশ বছর ধরে, সে দিনরাত অধ্যয়ন করেছিল, কুরআন মুখস্থ করেছিল এবং হাদিস শিখেছিল। অবশেষে, সে আল-আন্দালুসের সবচেয়ে সম্মানিত পণ্ডিতদের একজন হয়ে উঠেছিল, শত শত ছাত্রছাত্রীকে শিক্ষা দিয়েছিল এবং ইসলামী আইনের উপর প্রভাবশালী কাজ লিখেছিল।

তার গল্প অগণিত অন্যান্য নারীকে জ্ঞান অর্জনের জন্য অনুপ্রাণিত করেছিল। সে সর্বদা তার ছাত্রদের বলত: "যখন তোমার একটি ন্যায্য লক্ষ্য থাকে এবং তুমি আন্তরিক উদ্দেশ্য নিয়ে কঠিন পরিশ্রম কর, আল্লাহ এমন পথ খুলে দেবেন যার কথা তুমি কখনো কল্পনাও করতে পারনি।"`,
          moral: 'যখন আমরা কিছু ভালো এবং উপকারী করতে অনুপ্রাণিত হই, তখন আমাদের আল্লাহর উপর আস্থা রাখা উচিত এবং আমাদের লক্ষ্যের দিকে কঠিন পরিশ্রম করা উচিত। তিনি এমন পথ প্রদান করবেন যার আমরা কখনো আশা করিনি।',
          character: 'ফাতিমা বিনতে আহমাদ আল-কুরতুবি',
          category: 'জ্ঞান অর্জন'
        }
      },
      readTime: '3 min',
      moods: ['motivated', 'inspired', 'determined', 'ambitious', 'energetic'],
      tags: ['knowledge', 'determination', 'inspiration', 'education', 'success']
    },
    {
      id: '5',
      content: {
        en: {
          title: 'The Wise Judge',
          content: `In the court of Harun al-Rashid, there was a judge known for his wisdom and justice. One day, two men came to him with a dispute over a valuable horse. Each claimed to be the rightful owner, and both had witnesses supporting their claims.

The judge was confused and couldn't determine who was telling the truth. He felt overwhelmed by the responsibility of making the right decision. That night, he prayed Tahajjud and asked Allah for wisdom and guidance in making the correct judgment.

The next morning, he had a brilliant idea. He announced that he would give the horse to whoever could prove their love for the animal. The first man immediately offered to pay extra money to claim the horse. The second man said, "Your Honor, if there's any doubt about ownership, I'd rather the horse go to whoever will treat it better. I just want the animal to be happy and cared for."

The judge immediately knew the true owner. The man who showed genuine concern for the horse's welfare, rather than just claiming ownership, was clearly the rightful owner. The decision was just, and both men accepted it peacefully.`,
          moral: 'When we feel overwhelmed by difficult decisions, sincere prayer and seeking Allah\'s guidance will provide the wisdom we need. True ownership comes with responsibility and care.',
          character: 'Judge Abu Hanifa al-Baghdadi',
          category: 'Seeking Wisdom'
        },
        hi: {
          title: 'बुद्धिमान न्यायाधीश',
          content: `हारून अल-रशीद के दरबार में एक न्यायाधीश था जो अपनी बुद्धिमत्ता और न्याय के लिए प्रसिद्ध था। एक दिन, दो आदमी एक मूल्यवान घोड़े के विवाद के साथ उसके पास आए। दोनों ही दावा कर रहे थे कि वे इसके सही मालिक हैं, और दोनों के पास अपने दावे का समर्थन करने वाले गवाह थे।

न्यायाधीश भ्रमित था और यह निर्धारित नहीं कर सकता था कि कौन सच कह रहा है। वह सही फैसला लेने की जिम्मेदारी से अभिभूत महसूस कर रहा था। उस रात, उसने तहज्जुद की नमाज़ पढ़ी और अल्लाह से सही फैसला करने में बुद्धिमत्ता और मार्गदर्शन मांगा।

अगली सुबह, उसे एक शानदार विचार आया। उसने घोषणा की कि वह घोड़ा उसे देगा जो जानवर के लिए अपना प्रेम साबित कर सके। पहले आदमी ने तुरंत घोड़े का दावा करने के लिए अतिरिक्त पैसे देने की पेशकश की। दूसरे आदमी ने कहा, "महाराज, अगर मालिकाना हक को लेकर कोई संदेह है, तो मैं चाहूंगा कि घोड़ा उसे मिले जो इसके साथ बेहतर व्यवहार करेगा। मैं बस चाहता हूं कि जानवर खुश और सुरक्षित रहे।"

न्यायाधीश को तुरंत असली मालिक का पता चल गया। जिस आदमी ने केवल मालिकाना हक का दावा करने के बजाय घोड़े की भलाई के लिए वास्तविक चिंता दिखाई, वह स्पष्ट रूप से सही मालिक था। फैसला न्यायसंगत था, और दोनों आदमियों ने इसे शांति से स्वीकार किया।`,
          moral: 'जब हम कठिन निर्णयों से अभिभूत महसूस करते हैं, तो सच्ची दुआ और अल्लाह के मार्गदर्शन की तलाश हमें आवश्यक बुद्धिमत्ता प्रदान करेगी। सच्चा मालिकाना हक जिम्मेदारी और देखभाल के साथ आता है।',
          character: 'न्यायाधीश अबू हनीफा अल-बगदादी',
          category: 'बुद्धिमत्ता की खोज'
        },
        bn: {
          title: 'প্রজ্ঞাবান বিচারক',
          content: `হারুন আল-রশিদের দরবারে একজন বিচারক ছিলেন যিনি তার প্রজ্ঞা এবং ন্যায়বিচারের জন্য পরিচিত ছিলেন। একদিন, দুজন লোক একটি মূল্যবান ঘোড়া নিয়ে বিরোধ নিয়ে তার কাছে এসেছিল। প্রত্যেকেই দাবি করেছিল যে তারা সঠিক মালিক, এবং উভয়েরই তাদের দাবি সমর্থনকারী সাক্ষী ছিল।

বিচারক বিভ্রান্ত ছিলেন এবং নির্ধারণ করতে পারছিলেন না কে সত্য বলছে। তিনি সঠিক সিদ্ধান্ত নেওয়ার দায়বদ্ধতায় অভিভূত বোধ করছিলেন। সেই রাতে, তিনি তাহাজ্জুদ নামাজ পড়লেন এবং সঠিক বিচার করতে আল্লাহর কাছে প্রজ্ঞা ও পথনির্দেশনা চাইলেন।

পরের দিন সকালে, তার একটি দুর্দান্ত ধারণা এল। তিনি ঘোষণা করলেন যে তিনি ঘোড়াটি তাকে দেবেন যে পশুটির প্রতি তার ভালোবাসা প্রমাণ করতে পারবে। প্রথম লোকটি অবিলম্বে ঘোড়াটি দাবি করার জন্য অতিরিক্ত অর্থ প্রদানের প্রস্তাব দিল। দ্বিতীয় লোকটি বলল, "হুজুর, যদি মালিকানা নিয়ে কোনো সন্দেহ থাকে, তাহলে আমি চাইব ঘোড়াটি তার কাছে যাক যে এর সাথে ভাল ব্যবহার করবে। আমি শুধু চাই পশুটি খুশি থাকুক এবং যত্ন পাক।"

বিচারক অবিলম্বে সত্যিকারের মালিক চিনতে পারলেন। যে ব্যক্তি শুধু মালিকানা দাবি করার পরিবর্তে ঘোড়ার কল্যাণের জন্য সত্যিকারের উদ্বেগ দেখিয়েছিল, সে স্পষ্টভাবে সঠিক মালিক ছিল। সিদ্ধান্তটি ন্যায়সঙ্গত ছিল, এবং উভয় লোক শান্তিপূর্ণভাবে এটি মেনে নিল।`,
          moral: 'যখন আমরা কঠিন সিদ্ধান্তে অভিভূত বোধ করি, তখন আন্তরিক দোয়া এবং আল্লাহর পথনির্দেশনা অন্বেষণ আমাদের প্রয়োজনীয় প্রজ্ঞা প্রদান করবে। সত্যিকারের মালিকানা দায়বদ্ধতা ও যত্নের সাথে আসে।',
          character: 'বিচারক আবু হানিফা আল-বাগদাদি',
          category: 'প্রজ্ঞা অন্বেষণ'
        }
      },
      readTime: '3 min',
      moods: ['confused', 'overwhelmed', 'uncertain', 'indecisive'],
      tags: ['wisdom', 'justice', 'prayer', 'guidance', 'responsibility']
    },
    {
      id: '6',
      content: {
        en: {
          title: "She's My Sister - A True Story about Death",
          content: `In a house where two sisters lived, one was devoted to worship while the other was lost in worldly distractions. The devout sister, Noorah, spent her days in prayer despite battling a serious illness. Her twin sister Hanan was more interested in fashion magazines, novels, and movies than in her religious duties.

One night, after watching videos for three hours, Hanan was about to sleep when she heard the first call to prayer. Her sick sister called out to her from her prayer room, "Don't sleep before you pray Fajr!"

Noorah called Hanan to sit beside her and began reciting verses from the Quran about death and the Day of Judgment. She asked profound questions about death, accountability, and the afterlife that made Hanan uncomfortable.

"Do you believe in death?" Noorah asked. "Do you believe that you shall be responsible for whatever you do?"

Hanan replied that Allah is Forgiving and Merciful, and she had a long life ahead. But Noorah reminded her of young people who had died suddenly, saying, "Death is age-blind and your age could never be a measure of when you shall die."

That night, Noorah spoke as if she knew her time was near. "I might be going on a long trip this year, Hanan, but somewhere else." Her words proved prophetic.

The next morning, Noorah's condition became critical. She was rushed to the hospital and placed in intensive care. When Hanan visited her, Noorah was still thinking of the afterlife, even quoting Quranic verses about death while lying in her hospital bed.

Hours later, Noorah passed away, leaving behind a transformed sister. That night, as Hanan sat in Noorah's prayer room looking at her Quran and prayer mat, she made a life-changing decision.

When the call to Fajr prayer came, Hanan wrapped her shawl around her shoulders and stood to pray. She prayed as if it was her last prayer, just like Noorah had done. From that day forward, she lived each moment knowing that death could come at any time.

The story ends with a powerful reflection: "We are all going on Noorah's journey – what have we prepared for it?"`,
          moral: 'Death is a reality that can come at any time, regardless of age. We should live each day as if it might be our last, focusing on worship and preparing for the afterlife rather than being distracted by worldly pleasures.',
          character: 'Noorah and Hanan (Twin Sisters)',
          category: 'Death and Afterlife'
        },
        hi: {
          title: "वह मेरी बहन है - मौत के बारे में एक सच्ची कहानी",
          content: `एक घर में दो बहनें रहती थीं, एक इबादत में डूबी रहती थी जबकि दूसरी दुनियावी चीजों में खो गई थी। भक्त बहन, नूराह, गंभीर बीमारी से लड़ते हुए भी अपने दिन नमाज़ में बिताती थी। उसकी जुड़वां बहन हनान को फैशन मैगज़ीन, उपन्यास और फिल्में देखने में अपने धार्मिक कर्तव्यों से ज़्यादा रुचि थी।

एक रात, तीन घंटे वीडियो देखने के बाद, हनान सोने जा रही थी कि उसने नमाज़ की पहली अज़ान सुनी। उसकी बीमार बहन ने अपने नमाज़ के कमरे से पुकारा, "फज्र की नमाज़ पढ़े बिना मत सोना!"

नूराह ने हनान को अपने पास बैठने को कहा और मौत और क़यामत के दिन के बारे में क़ुरान की आयतें पढ़ना शुरू किया। उसने मौत, जवाबदेही और आख़िरत के बारे में गहरे सवाल पूछे जिससे हनान परेशान हो गई।

"क्या तुम मौत में यक़ीन रखती हो?" नूराह ने पूछा। "क्या तुम यक़ीन रखती हो कि तुम्हें जो भी करोगी उसके लिए जिम्मेदार होना पड़ेगा?"

हनान ने जवाब दिया कि अल्लाह माफ करने वाला और दयालु है, और उसके पास लंबी ज़िंदगी है। लेकिन नूराह ने उसे उन युवाओं की याद दिलाई जो अचानक मर गए थे, यह कहते हुए कि "मौत उम्र नहीं देखती और तुम्हारी उम्र कभी यह पैमाना नहीं हो सकती कि तुम कब मरोगी।"

उस रात, नूराह ने ऐसे बात की जैसे वह जानती हो कि उसका समय नज़दीक है। "हो सकता है मैं इस साल एक लंबे सफर पर जाऊं, हनान, लेकिन कहीं और।" उसके शब्द भविष्यवाणी साबित हुए।

अगली सुबह, नूराह की हालत गंभीर हो गई। उसे तुरंत अस्पताल ले जाया गया और गहन चिकित्सा में रखा गया। जब हनान उससे मिलने गई, तो नूराह अभी भी आख़िरत के बारे में सोच रही थी, अस्पताल के बिस्तर पर लेटे हुए भी मौत के बारे में क़ुरानी आयतें पढ़ रही थी।

कुछ घंटों बाद, नूराह का निधन हो गया, एक बदली हुई बहन को छोड़कर। उस रात, जब हनान नूराह के नमाज़ के कमरे में उसके क़ुरान और जानमाज़ को देखते हुए बैठी, तो उसने एक जीवन बदलने वाला फैसला किया।

जब फज्र की अज़ान आई, हनान ने अपने कंधों पर चादर डाली और नमाज़ के लिए खड़ी हो गई। उसने ऐसे नमाज़ पढ़ी जैसे यह उसकी आखिरी नमाज़ हो, बिल्कुल वैसे ही जैसे नूराह करती थी। उस दिन से, वह हर पल यह जानते हुए जीने लगी कि मौत कभी भी आ सकती है।

कहानी एक शक्तिशाली चिंतन के साथ समाप्त होती है: "हम सब नूराह के सफर पर जाने वाले हैं - हमने इसके लिए क्या तैयारी की है?"`,
          moral: 'मौत एक हक़ीक़त है जो किसी भी समय आ सकती है, उम्र की परवाह किए बिना। हमें हर दिन ऐसे जीना चाहिए जैसे यह हमारा आखिरी दिन हो, इबादत पर ध्यान देना चाहिए और आख़िरत की तैयारी करनी चाहिए बजाय दुनियावी मोह-माया में फंसने के।',
          character: 'नूराह और हनान (जुड़वां बहनें)',
          category: 'मौत और आख़िरत'
        },
        bn: {
          title: "সে আমার বোন - মৃত্যু সম্পর্কে একটি সত্য কাহিনী",
          content: `একটি বাড়িতে দুই বোন থাকত, একজন ইবাদতে মগ্ন থাকত আর অন্যজন পার্থিব বিষয়ে হারিয়ে থাকত। ধর্মপ্রাণ বোন নুরাহ গুরুতর অসুস্থতার সাথে লড়াই করা সত্ত্বেও তার দিনগুলো নামাজে কাটাত। তার যমজ বোন হানান ফ্যাশন ম্যাগাজিন, উপন্যাস আর সিনেমা দেখতে তার ধর্মীয় দায়িত্বের চেয়ে বেশি আগ্রহী ছিল।

এক রাতে, তিন ঘন্টা ভিডিও দেখার পর, হানান ঘুমাতে যাচ্ছিল যখন সে প্রথম আজানের আওয়াজ শুনল। তার অসুস্থ বোন তার নামাজের ঘর থেকে ডাকল, "ফজরের নামাজ না পড়ে ঘুমিয়ো না!"

নুরাহ হানানকে তার পাশে বসতে বলল এবং মৃত্যু ও কিয়ামত দিবস সম্পর্কে কুরআনের আয়াত তেলাওয়াত করতে শুরু করল। সে মৃত্যু, জবাবদিহিতা এবং পরকাল সম্পর্কে গভীর প্রশ্ন জিজ্ঞেস করল যা হানানকে অস্বস্তিতে ফেলল।

"তুমি কি মৃত্যুতে বিশ্বাস কর?" নুরাহ জিজ্ঞেস করল। "তুমি কি বিশ্বাস কর যে তুমি যা কিছু করবে তার জন্য দায়বদ্ধ হতে হবে?"

হানান উত্তর দিল যে আল্লাহ ক্ষমাশীল ও দয়ালু, আর তার সামনে দীর্ঘ জীবন আছে। কিন্তু নুরাহ তাকে সেই সব তরুণদের কথা মনে করিয়ে দিল যারা হঠাৎ মারা গেছে, বলল, "মৃত্যু বয়স দেখে না এবং তোমার বয়স কখনো এই পরিমাপ হতে পারে না যে তুমি কখন মরবে।"

সেই রাতে, নুরাহ এমনভাবে কথা বলল যেন সে জানত তার সময় কাছে। "হতে পারে আমি এই বছর একটি দীর্ঘ সফরে যাব, হানান, কিন্তু অন্য কোথাও।" তার কথা ভবিষ্যদ্বাণী প্রমাণিত হল।

পরের দিন সকালে, নুরাহর অবস্থা গুরুতর হয়ে গেল। তাকে তাৎক্ষণিক হাসপাতালে নিয়ে গিয়ে নিবিড় পরিচর্যায় রাখা হল। হানান যখন তাকে দেখতে গেল, নুরাহ তখনও পরকালের কথা ভাবছিল, হাসপাতালের বিছানায় শুয়েও মৃত্যু সম্পর্কে কুরআনের আয়াত উচ্চারণ করছিল।

কয়েক ঘন্টা পরে, নুরাহ মারা গেল, একটি রূপান্তরিত বোনকে রেখে। সেই রাতে, হানান যখন নুরাহর নামাজের ঘরে তার কুরআন ও জায়নামাজ দেখতে বসল, তখন সে একটি জীবন পরিবর্তনকারী সিদ্ধান্ত নিল।

যখন ফজরের আজান এল, হানান তার কাঁধে চাদর জড়িয়ে নামাজের জন্য দাঁড়াল। সে এমনভাবে নামাজ পড়ল যেন এটি তার শেষ নামাজ, ঠিক যেমনটি নুরাহ করত। সেদিন থেকে, সে প্রতিটি মুহূর্ত এই জেনে বেঁচে থাকল যে মৃত্যু যেকোনো সময় আসতে পারে।

কাহিনীটি একটি শক্তিশালী চিন্তার সাথে শেষ হয়: "আমরা সবাই নুরাহর যাত্রায় যাচ্ছি - আমরা এর জন্য কী প্রস্তুতি নিয়েছি?"`,
          moral: 'মৃত্যু একটি বাস্তবতা যা যেকোনো সময় আসতে পারে, বয়স নির্বিশেষে। আমাদের প্রতিদিন এমনভাবে বাঁচা উচিত যেন এটি আমাদের শেষ দিন, ইবাদতে মনোযোগ দেওয়া এবং পরকালের জন্য প্রস্তুতি নেওয়া উচিত পার্থিব আনন্দে বিভ্রান্ত হওয়ার পরিবর্তে।',
          character: 'নুরাহ ও হানান (যমজ বোন)',
          category: 'মৃত্যু ও পরকাল'
        }
      },
      readTime: '8 min',
      moods: ['contemplative', 'solemn', 'reflective', 'transformative'],
      tags: ['death', 'sisters', 'prayer', 'afterlife', 'transformation', 'illness', 'guidance'],
      verses: [
        {
          arabic: 'كُلُّ نَفْسٍ ذَائِقَةُ الْمَوْتِ ۗ وَإِنَّمَا تُوَفَّوْنَ أُجُورَكُمْ يَوْمَ الْقِيَامَةِ',
          translation: 'Everyone shall taste death. And only on the Day of Resurrection shall you be paid your wages in full.',
          reference: 'Al-Imran 3:185'
        },
        {
          arabic: 'فَمَن زُحْزِحَ عَنِ النَّارِ وَأُدْخِلَ الْجَنَّةَ فَقَدْ فَازَ',
          translation: 'And whoever is removed away from the Fire and admitted to Paradise, he indeed is successful.',
          reference: 'Al-Imran 3:185'
        },
        {
          arabic: 'وَالْتَفَّتِ السَّاقُ بِالسَّاقِ',
          translation: 'And leg will be joined with another leg (shrouded)',
          reference: 'Al-Qiyama 75:29'
        },
        {
          arabic: 'إِلَىٰ رَبِّكَ يَوْمَئِذٍ الْمَسَاقُ',
          translation: 'The drive will be, on that Day, to your Lord (Allah)!',
          reference: 'Al-Qiyama 75:30'
        }
      ]
    },
    {
      id: '7',
      content: {
        en: {
          title: 'Three Men Trapped in a Cave',
          content: `Abdullah ibn Umar reported that the Messenger (may the peace and blessings of Allah be upon him) said:

Three men of a people before you were on a journey when they were overtaken by a storm and took shelter in a cave. A rock slipped down from the mountain and blocked the exit from the cave.
One of them said: "The only way for deliverance left is to beseech Allah in the name of some virtuous deed."
The first man supplicated: "O Lord, my parents were very old, and I used to offer them their nightly drink of milk before my children and other family members. One day I went far away searching for green trees and could return only after my parents had gone to sleep. When I milked the animals and brought their drink, they were fast asleep. I did not like to disturb them, nor would I give any milk to my children until my parents had their drink. With the vessel in hand, I awaited their awakening until dawn, while my children cried from hunger at my feet. When they woke up, they had their drink. O Lord, if I did this seeking only Your pleasure, then relieve us from this rock." The rock moved a little but not enough to let them pass.
The second man said: "O Lord, I had a cousin whom I loved passionately. I tried to seduce her but she refused, until during a famine she came to me for help. I gave her one hundred and twenty Dinars on condition of intercourse. When we were alone and I was about to commit the act, she pleaded, 'Fear Allah, and do not break the seal unlawfully.' I moved away from her despite my desire and let her keep the money. O Lord, if I did this seeking only Your pleasure, then move this rock." Again the rock moved slightly.
The third man supplicated: "O Lord, I hired laborers and paid them their dues, but one left without taking his wages. I invested his money in business and it prospered greatly. Years later, he returned asking for his wages. I said: 'All that you see is yours - camels, cattle, goats and slaves.' He thought I was joking, but I assured him I was not. He took everything. O Lord, if I did this seeking only Your pleasure, relieve us from our distress." The rock moved away completely, and all three emerged safely.`,
          moral: 'This hadith teaches us the permissible form of tawassul - asking Allah by our good deeds performed sincerely. Every deed must be done purely for Allah\'s pleasure. The story highlights three noble acts: caring for parents, avoiding sin even at the last moment, and being trustworthy with others\' rights.',
          character: 'Three Righteous Men',
          category: 'Divine Intervention'
        },
        hi: {
          title: 'गुफा में फंसे तीन आदमी',
          content: `अब्दुल्लाह इब्न उमर ने रिपोर्ट किया कि रसूलुल्लाह (सल्लल्लाहु अलैहि व सल्लम) ने फरमाया:

आप से पहले के लोगों में से तीन आदमी सफर पर थे जब उन पर तूफान आया और उन्होंने एक गुफा में पनाह ली। पहाड़ से एक चट्टान गिरी और गुफा का मुंह बंद हो गया।
उनमें से एक ने कहा: "छुटकारे का एकमात्र रास्ता यह है कि हम अपने नेक कामों के वसीले से अल्लाह से दुआ करें।"
पहले आदमी ने दुआ की: "ऐ अल्लाह! मेरे माता-पिता बहुत बूढ़े थे, और मैं अपने बच्चों और परिवार के अन्य सदस्यों से पहले उन्हें रात का दूध पिलाता था। एक दिन मैं हरे पेड़ों की तलाश में बहुत दूर चला गया और तभी वापस आ सका जब मेरे माता-पिता सो चुके थे। जब मैंने जानवरों का दूध दुहा और उनके लिए लाया, तो वे गहरी नींद में थे। मैंने उन्हें जगाना पसंद नहीं किया, और न ही अपने बच्चों को दूध दिया जब तक मेरे माता-पिता न पी लें। बर्तन हाथ में लेकर, मैं उनके जागने का इंतजार करता रहा फजर तक, जबकि मेरे बच्चे मेरे पैरों के पास भूख से रो रहे थे। जब वे जागे, तो उन्होंने दूध पिया। ऐ अल्लाह! अगर मैंने यह काम सिर्फ तेरी खुशी के लिए किया था, तो हमें इस चट्टान से निजात दिला।" चट्टान थोड़ी हिली लेकिन निकलने के लिए काफी नहीं।
दूसरे आदमी ने कहा: "ऐ अल्लाह! मेरी एक चचेरी बहन थी जिससे मैं बहुत प्रेम करता था। मैंने उसे बहकाने की कोशिश की लेकिन वह मना करती रही, जब तक कि अकाल के दौरान वह मेरे पास मदद के लिए आई। मैंने उसे एक सौ बीस दीनार दिए इस शर्त पर कि वह मेरे साथ संभोग करे। जब हम अकेले थे और मैं कार्य करने ही वाला था, उसने विनती की, 'अल्लाह से डरो, और अवैध तरीके से मुहर न तोड़ो।' मैंने अपनी इच्छा के बावजूद उससे दूरी बना ली और उसे पैसे रखने दिए। ऐ अल्लाह! अगर मैंने यह सिर्फ तेरी खुशी के लिए किया, तो इस चट्टान को हटा।" फिर से चट्टान थोड़ी हिली।
तीसरे आदमी ने दुआ की: "ऐ अल्लाह! मैंने मजदूरों को काम पर रखा और उनकी मजदूरी दी, लेकिन एक अपनी मजदूरी लिए बिना चला गया। मैंने उसके पैसे को व्यापार में लगाया और वह बहुत फला-फूला। सालों बाद, वह वापस आया और अपनी मजदूरी मांगी। मैंने कहा: 'जो कुछ तू देखता है वह तेरा है - ऊंट, मवेशी, बकरियां और गुलाम।' उसने सोचा मैं मजाक कर रहा हूं, लेकिन मैंने आश्वासन दिया कि मैं नहीं कर रहा। उसने सब कुछ ले लिया। ऐ अल्लाह! अगर मैंने यह सिर्फ तेरी खुशी के लिए किया, तो हमें इस मुसीबत से निजात दिला।" चट्टान पूरी तरह हट गई, और तीनों सुरक्षित बाहर निकले।`,
          moral: 'यह हदीस हमें तवस्सुल का जायज तरीका सिखाती है - अपने नेक कामों के वसीले से अल्लाह से दुआ करना जो सिर्फ उसकी खुशी के लिए किए गए हों। हर काम खालिस अल्लाह के लिए होना चाहिए। कहानी तीन नेक कामों को उजागर करती है: माता-पिता की सेवा, आखिरी वक्त में भी गुनाह से बचना, और दूसरों के हकों में अमानतदारी।',
          character: 'तीन नेकिकार आदमी',
          category: 'दिव्य हस्तक्षेप'
        },
        bn: {
          title: 'গুহায় আটকে পড়া তিনজন',
          content: `আবদুল্লাহ ইবনে উমার বর্ণনা করেছেন যে রাসূলুল্লাহ (সাল্লাল্লাহু আলাইহি ওয়া সাল্লাম) বলেছেন:

তোমাদের পূর্বের উম্মতের তিনজন লোক সফরে ছিল যখন তাদের উপর ঝড় এসে পড়ল এবং তারা একটি গুহায় আশ্রয় নিল। পাহাড় থেকে একটি পাথর পড়ে গুহার মুখ বন্ধ করে দিল।
তাদের একজন বলল: "মুক্তির একমাত্র উপায় হল আমাদের সৎ কর্মের উসিলায় আল্লাহর কাছে দোয়া করা।"
প্রথম ব্যক্তি দোয়া করল: "হে আল্লাহ! আমার বাবা-মা খুবই বৃদ্ধ ছিলেন, এবং আমি আমার সন্তান ও পরিবারের অন্যদের আগে তাঁদের রাতের দুধ পান করাতাম। একদিন আমি সবুজ গাছের সন্ধানে অনেক দূরে গিয়েছিলাম এবং তখনই ফিরতে পারলাম যখন আমার বাবা-মা ঘুমিয়ে পড়েছিলেন। যখন আমি পশুদের দুধ দুহে তাঁদের জন্য নিয়ে এলাম, তাঁরা গভীর ঘুমে ছিলেন। আমি তাঁদের জাগাতে পছন্দ করলাম না, এবং আমার সন্তানদেরও দুধ দিলাম না যতক্ষণ না আমার বাবা-মা পান করেন। পাত্র হাতে নিয়ে, আমি তাঁদের জাগার অপেক্ষায় থাকলাম ফজর পর্যন্ত, যখন আমার সন্তানরা ক্ষুধায় আমার পায়ের কাছে কাঁদছিল। যখন তাঁরা জাগলেন, তাঁরা দুধ পান করলেন। হে আল্লাহ! যদি আমি এটা শুধু তোমার সন্তুষ্টির জন্য করে থাকি, তাহলে এই পাথর থেকে আমাদের মুক্তি দাও।" পাথরটি সামান্য সরল কিন্তু বের হওয়ার জন্য যথেষ্ট নয়।
দ্বিতীয় ব্যক্তি বলল: "হে আল্লাহ! আমার এক চাচাতো বোন ছিল যাকে আমি অত্যন্ত ভালোবাসতাম। আমি তাকে প্রলোভিত করার চেষ্টা করেছি কিন্তু সে প্রত্যাখ্যান করেছে, যতক্ষণ না দুর্ভিক্ষের সময় সে আমার কাছে সাহায্যের জন্য এসেছিল। আমি তাকে একশত বিশ দিনার দিয়েছি এই শর্তে যে সে আমার সাথে মিলিত হবে। যখন আমরা একা ছিলাম এবং আমি কাজটি করতে যাচ্ছিলাম, সে অনুনয় করল, 'আল্লাহকে ভয় কর, এবং অবৈধভাবে মোহর ভেঙো না।' আমি আমার আকাঙ্ক্ষা সত্ত্বেও তার থেকে দূরে সরে গেলাম এবং তাকে অর্থ রাখতে দিলাম। হে আল্লাহ! যদি আমি এটা শুধু তোমার সন্তুষ্টির জন্য করি, তাহলে এই পাথরটি সরিয়ে দাও।" আবার পাথরটি সামান্য সরল।
তৃতীয় ব্যক্তি দোয়া করল: "হে আল্লাহ! আমি শ্রমিকদের কাজে রেখেছিলাম এবং তাদের মজুরি দিয়েছিলাম, কিন্তু একজন তার মজুরি না নিয়েই চলে গেল। আমি তার অর্থ ব্যবসায় বিনিয়োগ করলাম এবং তা অনেক লাভজনক হল। বছরের পর বছর পরে, সে ফিরে এসে তার মজুরি চাইল। আমি বললাম: 'তুমি যা দেখছ সবই তোমার - উট, গবাদি পশু, ছাগল এবং দাস।' সে ভাবল আমি মজাক করছি, কিন্তু আমি নিশ্চিত করলাম যে আমি নই। সে সবকিছু নিয়ে গেল। হে আল্লাহ! যদি আমি এটা শুধু তোমার সন্তুষ্টির জন্য করি, তাহলে আমাদের এই বিপদ থেকে মুক্তি দাও।" পাথরটি সম্পূর্ণভাবে সরে গেল, এবং তিনজনই নিরাপদে বের হল।`,
          moral: 'এই হাদিস আমাদের তাওয়াস্সুলের বৈধ পদ্ধতি শেখায় - আমাদের সৎকর্মের উসিলায় আল্লাহর কাছে দোয়া করা যা শুধুমাত্র তাঁর সন্তুষ্টির জন্য করা হয়েছে। প্রতিটি কাজ খালেসভাবে আল্লাহর জন্য হতে হবে। গল্পটি তিনটি মহৎ কাজকে তুলে ধরে: বাবা-মায়ের সেবা, শেষ মুহূর্তেও পাপ থেকে বিরত থাকা, এবং অন্যদের অধিকারে আমানতদারী।',
          character: 'তিন সৎকর্মশীল ব্যক্তি',
          category: 'ঐশী হস্তক্ষেপ'
        }
      },
      readTime: '6 min',
      moods: ['trapped', 'desperate', 'hopeful', 'reflective', 'faithful'],
      tags: ['hadith', 'parents', 'righteousness', 'divine help', 'sincere deeds', 'tawassul'],
      verses: [
        {
          arabic: 'وَقَضَىٰ رَبُّكَ أَلَّا تَعْبُدُوا إِلَّا إِيَّاهُ وَبِالْوَالِدَيْنِ إِحْسَانًا',
          translation: 'And your Lord has decreed that you worship none but Him, and be kind to parents.',
          reference: 'Al-Isra 17:23'
        },
        {
          arabic: 'وَاتَّقُوا اللَّهَ الَّذِي تَسَاءَلُونَ بِهِ وَالْأَرْحَامَ',
          translation: 'And fear Allah, through whom you ask one another, and the wombs.',
          reference: 'An-Nisa 4:1'
        },
        {
          arabic: 'إِنَّ اللَّهَ لَا يُضِيعُ أَجْرَ الْمُحْسِنِينَ',
          translation: 'Indeed, Allah does not waste the reward of the doers of good.',
          reference: 'At-Tawbah 9:120'
        }
      ]
    },
    {
      id: '8',
      content: {
        en: {
          title: 'The Man Who Killed 100 People',
          content: `There was once a man among the Children of Israel who had killed 99 people. Despite his terrible crimes, he felt deep remorse and wanted to seek forgiveness from Allah.
He approached a pious monk and asked him, "I have killed 99 people. Is there any chance for me to repent and be forgiven?" The monk, shocked by the magnitude of his crimes, replied, "No, there is no forgiveness for you." Upon hearing this, the man became angry and, in a fit of rage, killed the monk as well, making it 100 people he had murdered.
Still yearning for forgiveness, the man did not give up. He sought out a knowledgeable scholar and asked him the same question: "I have killed 100 people. Is there any hope for me to repent?" The scholar replied, "Yes, of course! Who can stand between you and the mercy of Allah? But if you truly want to repent, you must leave your current environment. Go to such-and-such land where the people are righteous, and worship Allah with them. Do not return to your previous place, as it is an evil land."
The man's heart filled with hope, and he immediately set out on the journey to the land of righteousness. As he was traveling, death overtook him before he reached his destination. The angels of mercy and the angels of punishment descended and began to dispute over his soul.
The angels of punishment argued: "This man committed 100 murders. He does not deserve mercy." The angels of mercy countered: "But he repented and was on his way to change his life for Allah's sake."
To resolve the dispute, Allah sent another angel to arbitrate. This angel instructed them to measure the distance between the man and the two lands. By Allah's divine decree, the man was found to be closer to the land of righteousness by just a handspan. Therefore, the angels of mercy took his soul, and he was forgiven.`,
          moral: 'Allah\'s mercy is infinite and no sin is too great for sincere repentance. However, true repentance requires not just words but genuine effort to change one\'s environment and circumstances. Knowledge and wisdom are essential - we must seek proper guidance, not just any advice.',
          character: 'The Repentant Murderer',
          category: 'Divine Mercy'
        },
        hi: {
          title: 'जिसने 100 लोगों को मारा था',
          content: `बनी इसराईल में एक आदमी था जिसने 99 लोगों को मार डाला था। अपने भयानक अपराधों के बावजूद, उसे गहरा पछतावा हुआ और वह अल्लाह से माफी चाहता था।
उसने एक धर्मनिष्ठ साधु के पास जाकर पूछा, "मैंने 99 लोगों को मार डाला है। क्या मेरे लिए तौबा करने और माफ होने का कोई मौका है?" साधु उसके अपराधों की गंभीरता से हैरान होकर बोला, "नहीं, तुम्हारे लिए कोई माफी नहीं है।" यह सुनकर वह आदमी गुस्से से भर गया और उसने साधु को भी मार डाला, इस तरह उसने कुल 100 लोगों को मार डाला।
फिर भी माफी की चाह रखते हुए, उस आदमी ने हार नहीं मानी। उसने एक ज्ञानी विद्वान की तलाश की और उससे वही सवाल पूछा: "मैंने 100 लोगों को मार डाला है। क्या मेरे लिए तौबा की कोई उम्मीद है?" विद्वान ने जवाब दिया, "हां, बिल्कुल! तुम्हारे और अल्लाह की रहमत के बीच कौन खड़ा हो सकता है? लेकिन अगर तुम सच में तौबा करना चाहते हो, तो अपना मौजूदा माहौल छोड़ना होगा। फलां जगह जाओ जहां नेक लोग रहते हैं, और उनके साथ अल्लाह की इबादत करो। अपनी पुरानी जगह वापस मत आना, क्योंकि वह एक बुरी जगह है।"
उस आदमी का दिल उम्मीद से भर गया, और वह तुरंत नेकी की भूमि की यात्रा पर निकल पड़ा। सफर के दौरान, अपनी मंजिल तक पहुंचने से पहले ही उसकी मौत हो गई। रहमत के फरिश्ते और अजाब के फरिश्ते उतरे और उसकी आत्मा को लेकर बहस करने लगे।
अजाब के फरिश्तों ने दलील दी: "इस आदमी ने 100 हत्याएं की हैं। यह रहमत का हकदार नहीं है।" रहमत के फरिश्तों ने जवाब दिया: "लेकिन इसने तौबा की है और अल्लाह के लिए अपनी जिंदगी बदलने जा रहा था।"
विवाद सुलझाने के लिए, अल्लाह ने एक और फरिश्ता भेजा। इस फरिश्ते ने उनसे कहा कि आदमी और दोनों जमीनों के बीच की दूरी नापें। अल्लाह के फैसले से, वह आदमी नेकी की जमीन के ज्यादा करीब पाया गया, सिर्फ एक बालिश्त से। इसलिए रहमत के फरिश्तों ने उसकी आत्मा ली, और उसे माफ कर दिया गया।`,
          moral: 'अल्लाह की रहमत असीमित है और कोई गुनाह सच्ची तौबा के लिए बहुत बड़ा नहीं है। हालांकि, सच्ची तौबा सिर्फ शब्दों से नहीं बल्कि अपने माहौल और हालात को बदलने की सच्ची कोशिश चाहिए। इल्म और हिकमत जरूरी है - हमें सही मार्गदर्शन चाहिए, कोई भी सलाह नहीं।',
          character: 'तौबा करने वाला हत्यारा',
          category: 'दिव्य कृपा'
        },
        bn: {
          title: 'যে ১০০ জন মানুষ হত্যা করেছিল',
          content: `বনী ইসরাইলের মধ্যে একজন লোক ছিল যে ৯৯ জন মানুষকে হত্যা করেছিল। তার ভয়ানক অপরাধ সত্ত্বেও, সে গভীর অনুশোচনা অনুভব করেছিল এবং আল্লাহর কাছে ক্ষমা চাইতে চেয়েছিল।
সে একজন ধার্মিক সন্ন্যাসীর কাছে গিয়ে জিজ্ঞেস করল, "আমি ৯৯ জন মানুষকে হত্যা করেছি। আমার তওবা করার এবং ক্ষমা পাওয়ার কোনো সুযোগ আছে কি?" সন্ন্যাসী তার অপরাধের ভয়াবহতায় হতবাক হয়ে উত্তর দিল, "না, তোমার জন্য কোনো ক্ষমা নেই।" এটা শুনে লোকটি রেগে গেল এবং ক্রোধে সন্ন্যাসীকেও হত্যা করল, এভাবে তার হত্যার সংখ্যা দাঁড়াল ১০০।
তবুও ক্ষমার আশায়, লোকটি হাল ছাড়েনি। সে একজন জ্ঞানী আলেমের সন্ধান করল এবং তাকে একই প্রশ্ন জিজ্ঞেস করল: "আমি ১০০ জন মানুষকে হত্যা করেছি। আমার তওবার কোনো আশা আছে কি?" আলেম উত্তর দিলেন, "হ্যাঁ, অবশ্যই! তোমার এবং আল্লাহর রহমতের মধ্যে কে দাঁড়াতে পারে? কিন্তু যদি তুমি সত্যিই তওবা করতে চাও, তাহলে তোমার বর্তমান পরিবেশ ছেড়ে দিতে হবে। অমুক স্থানে যাও যেখানে সৎ লোকেরা বাস করে, এবং তাদের সাথে আল্লাহর ইবাদত কর। তোমার পুরানো জায়গায় ফিরে যেয়ো না, কারণ সেটি একটি খারাপ জায়গা।"
লোকটির হৃদয় আশায় ভরে গেল, এবং সে অবিলম্বে সৎকর্মের ভূমির দিকে যাত্রা শুরু করল। সফরের সময়, গন্তব্যে পৌঁছানোর আগেই তার মৃত্যু হয়ে গেল। রহমতের ফেরেশতা এবং আজাবের ফেরেশতারা নেমে এসে তার আত্মা নিয়ে বিতর্ক শুরু করল।
আজাবের ফেরেশতারা যুক্তি দিল: "এই লোক ১০০টি হত্যা করেছে। সে রহমতের যোগ্য নয়।" রহমতের ফেরেশতারা উত্তর দিল: "কিন্তু সে তওবা করেছে এবং আল্লাহর জন্য তার জীবন পরিবর্তন করতে যাচ্ছিল।"
বিতর্ক মীমাংসার জন্য, আল্লাহ আরেকটি ফেরেশতা পাঠালেন। এই ফেরেশতা তাদের বলল লোকটি এবং দুটি ভূমির মধ্যে দূরত্ব মাপতে। আল্লাহর ফায়সালায়, লোকটি সৎকর্মের ভূমির কাছাকাছি পাওয়া গেল, মাত্র একহাত দূরত্বে। তাই রহমতের ফেরেশতারা তার আত্মা নিয়ে গেল, এবং তাকে ক্ষমা করা হল।`,
          moral: 'আল্লাহর রহমত অসীম এবং আন্তরিক তওবার জন্য কোনো পাপই অতিরিক্ত বড় নয়। তবে, সত্যিকারের তওবা শুধু কথায় নয় বরং নিজের পরিবেশ ও পরিস্থিতি পরিবর্তনের প্রকৃত প্রচেষ্টা চায়। জ্ঞান ও প্রজ্ঞা অপরিহার্য - আমাদের সঠিক পথনির্দেশনা চাই, যেকোনো পরামর্শ নয়।',
          character: 'তওবাকারী হত্যাকারী',
          category: 'ঐশী দয়া'
        }
      },
      readTime: '5 min',
      moods: ['regretful', 'desperate', 'hopeful', 'determined', 'repentant'],
      tags: ['repentance', 'mercy', 'forgiveness', 'divine intervention', 'transformation', 'guidance', 'hadith'],
      verses: [
        {
          arabic: 'قُل يَا عِبَادِيَ الَّذِينَ أَسْرَفُوا عَلَىٰ أَنفُسِهِمْ لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ ۚ إِنَّ اللَّهَ يَغْفِرُ الذُّنُوبَ جَمِيعًا',
          translation: 'Say: "O My servants who have transgressed against themselves! Despair not of the Mercy of Allah, indeed Allah forgives all sins."',
          reference: 'Az-Zumar 39:53'
        },
        {
          arabic: 'وَتُوبُوا إِلَى اللَّهِ جَمِيعًا أَيُّهَ الْمُؤْمِنُونَ لَعَلَّكُمْ تُفْلِحُونَ',
          translation: 'And turn to Allah in repentance, all of you, O believers, that you might succeed.',
          reference: 'An-Nur 24:31'
        },
        {
          arabic: 'وَمَن تَابَ وَعَمِلَ صَالِحًا فَإِنَّهُ يَتُوبُ إِلَى اللَّهِ مَتَابًا',
          translation: 'But whoever repents and does righteousness, he indeed turns to Allah with [accepted] repentance.',
          reference: 'Al-Furqan 25:71'
        }
      ]
    },
    {
      id: '9',
      content: {
        en: {
          title: 'The Prophet\'s Dream of the Afterlife',
          content: `Samurah bin Jundub narrated that Allah's Messenger (ﷺ) often asked his Companions, "Did any of you see a dream?" One morning, the Prophet said, "Last night two people came to me in a dream and woke me up, saying 'Proceed!' I set out with them and witnessed extraordinary scenes.

First, we came across a man lying down with another standing over him, holding a big rock. He repeatedly threw the rock at the man's head, crushing it. Each time, the rock rolled away, and when the thrower retrieved it, the victim's head had returned to normal, only to be crushed again.
Next, we saw a man lying flat with another holding an iron hook. The one with the hook would tear the lying man's face, nose, and eye from front to back on one side, then move to the other side. As soon as he finished one side, the other returned to its original state, and the torture continued endlessly.
Then we reached something like a clay oven, wide at the bottom and narrow at the top. Inside were naked men and women with flames reaching them from below. When the fire touched them, they shrieked loudly.
We proceeded to a red river like blood, where a man was swimming. On the bank stood another man with many stones, throwing them into the swimmer's mouth each time he approached the shore.
We saw a man with the most repulsive appearance beside a fire, constantly kindling it and moving around it.
Then the scenes changed to beautiful ones. We entered a garden with deep green vegetation and spring colors. In its center stood an extremely tall man surrounded by countless children.
Finally, we reached a magnificent city built of gold and silver bricks. Inside were people who were half-handsome and half-ugly. They threw themselves into a river white as milk and emerged in perfect beauty.
The guides then explained: The man with the crushed head represents those who learn the Quran but neither recite it nor follow its guidance, and who neglect their prayers. The man with the torn face represents liars whose falsehoods spread worldwide. The people in the oven are adulterers. The swimmer is a usurer. The repulsive man is Malik, the gatekeeper of Hell. The tall man is Abraham, surrounded by children who died in a state of natural faith. The half-ugly people represent those who mixed good and bad deeds but were forgiven by Allah."`,
          moral: 'This authentic dream of the Prophet (ﷺ) shows us the consequences of our actions in the afterlife. It teaches us to take the Quran seriously, avoid lying and adultery, stay away from usury, and strive to do good deeds consistently. Allah\'s mercy encompasses those who seek forgiveness.',
          character: 'Prophet Muhammad (ﷺ) and the Two Angel Guides',
          category: 'Divine Vision'
        },
        hi: {
          title: 'नबी का आख़िरत का सपना',
          content: `समुराह बिन जुंदुब ने बयान किया कि अल्लाह के रसूल (ﷺ) अक्सर अपने साथियों से पूछते थे, "क्या तुममें से किसी ने कोई सपना देखा?" एक सुबह, नबी (ﷺ) ने कहा, "कल रात मेरे पास दो लोग आए और मुझे जगाकर कहा 'चलो!' मैं उनके साथ गया और अद्भुत दृश्य देखे।

पहले, हमने एक आदमी को लेटे हुए देखा जिसके सिर के ऊपर दूसरा खड़ा था, एक बड़ा पत्थर लिए। वह बार-बार उस आदमी के सिर पर पत्थर मार रहा था, उसे कुचल रहा था। हर बार पत्थर लुढ़क जाता, और जब फेंकने वाला उसे वापस लाता, तो पीड़ित का सिर सामान्य हो जाता, फिर से कुचला जाने के लिए।
फिर हमने एक आदमी को सपाट लेटे देखा जिसके ऊपर दूसरा लोहे का हुक लिए खड़ा था। हुक वाला लेटे आदमी का चेहरा, नाक और आंख को एक तरफ से आगे से पीछे तक फाड़ रहा था, फिर दूसरी तरफ जाता। जैसे ही एक तरफ समाप्त होती, दूसरी तरफ अपनी मूल अवस्था में लौट आती, और यातना निरंतर जारी रहती।
फिर हम एक मिट्टी के तंदूर जैसी चीज़ के पास पहुंचे, जो नीचे से चौड़ा और ऊपर से संकरा था। अंदर नग्न स्त्री-पुरुष थे जिन्हें नीचे से आग की लपटें छू रही थीं। जब आग उनसे छूती, तो वे ज़ोर से चिल्लाते।
हमने खून जैसी लाल नदी देखी जिसमें एक आदमी तैर रहा था। किनारे पर दूसरा आदमी कई पत्थर लिए खड़ा था, हर बार जब तैराक किनारे आता तो वह उसके मुंह में पत्थर फेंक देता।
हमने सबसे भयानक चेहरे वाले आदमी को आग के पास देखा, जो लगातार उसे जला रहा था और उसके चारों ओर घूम रहा था।
फिर दृश्य खूबसूरत हो गए। हम एक बगीचे में गए जिसमें गहरी हरियाली और बसंती रंग थे। इसके केंद्र में एक बहुत लंबा आदमी खड़ा था जो अनगिनत बच्चों से घिरा था।
अंत में, हम सोने-चांदी की ईंटों से बने एक शानदार शहर में पहुंचे। अंदर ऐसे लोग थे जो आधे खूबसूरत और आधे बदसूरत थे। उन्होंने खुद को दूध जैसी सफेद नदी में फेंका और पूर्ण सुंदरता में निकले।
गाइडों ने फिर समझाया: कुचले गए सिर वाला आदमी उन लोगों का प्रतिनिधित्व करता है जो कुरान सीखते हैं लेकिन न इसे पढ़ते हैं न इसके मार्गदर्शन का पालन करते हैं, और अपनी नमाज़ों की उपेक्षा करते हैं। फटे चेहरे वाला आदमी झूठों का प्रतिनिधित्व करता है जिनका झूठ दुनिया भर में फैलता है। तंदूर में लोग व्यभिचारी हैं। तैराक सूदखोर है। भयानक आदमी मालिक है, नरक का द्वारपाल। लंबा आदमी इब्राहीम है, उन बच्चों से घिरा जो प्राकृतिक ईमान की अवस्था में मरे। आधे बदसूरत लोग उनका प्रतिनिधित्व करते हैं जिन्होंने अच्छे और बुरे कामों को मिलाया लेकिन अल्लाह ने उन्हें माफ कर दिया।"`,
          moral: 'नबी (ﷺ) का यह प्रामाणिक सपना हमें आख़िरत में हमारे कर्मों के परिणाम दिखाता है। यह हमें सिखाता है कि कुरान को गंभीरता से लें, झूठ और व्यभिचार से बचें, सूद से दूर रहें, और निरंतर अच्छे कर्म करने का प्रयास करें। अल्लाह की रहमत उन लोगों को घेरे रहती है जो माफी मांगते हैं।',
          character: 'नबी मुहम्मद (ﷺ) और दो फरिश्ता गाइड',
          category: 'दिव्य दर्शन'
        },
        bn: {
          title: 'নবীর পরকালের স্বপ্ন',
          content: `সামুরাহ বিন জুনদুব বর্ণনা করেছেন যে আল্লাহর রাসূল (ﷺ) প্রায়ই তাঁর সাহাবীদের জিজ্ঞেস করতেন, "তোমাদের কেউ কি স্বপ্ন দেখেছ?" একদিন সকালে, নবী (ﷺ) বললেন, "গতরাতে দুজন লোক আমার কাছে এসে আমাকে জাগিয়ে বলল 'চলুন!' আমি তাদের সাথে গেলাম এবং অসাধারণ দৃশ্য দেখলাম।

প্রথমে, আমরা একজন লোককে শুয়ে থাকতে দেখলাম যার মাথার ওপর আরেকজন দাঁড়িয়ে ছিল, একটি বড় পাথর নিয়ে। সে বারবার সেই লোকের মাথায় পাথর মেরে তা চূর্ণ করছিল। প্রতিবার পাথরটি গড়িয়ে চলে যেত, এবং নিক্ষেপকারী যখন তা ফিরিয়ে আনত, তখন ভিকটিমের মাথা স্বাভাবিক হয়ে যেত, শুধু আবার চূর্ণ হওয়ার জন্য।
এরপর আমরা একজন লোককে সমতলে শুয়ে থাকতে দেখলাম যার ওপর আরেকজন লোহার হুক নিয়ে দাঁড়িয়ে ছিল। হুক ধারী শুয়ে থাকা লোকের মুখ, নাক এবং চোখ একপাশ থেকে সামনে থেকে পেছনে পর্যন্ত ছিঁড়ে ফেলছিল, তারপর অন্যপাশে যেত। যখনই একপাশ শেষ হত, অন্যপাশ তার মূল অবস্থায় ফিরে আসত, এবং নির্যাতন নিরবচ্ছিন্নভাবে চলতে থাকত।
তারপর আমরা মাটির তন্দুরের মতো কিছুর কাছে পৌঁছলাম, যা নিচে চওড়া এবং উপরে সরু ছিল। ভিতরে নগ্ন নারী-পুরুষ ছিল যাদের নিচ থেকে আগুনের শিখা স্পর্শ করছিল। যখন আগুন তাদের স্পর্শ করত, তারা জোরে চিৎকার করত।
আমরা রক্তের মতো লাল নদী দেখলাম যেখানে একজন লোক সাঁতার কাটছিল। পাড়ে আরেকজন লোক অনেক পাথর নিয়ে দাঁড়িয়ে ছিল, প্রতিবার যখন সাঁতারু পাড়ের কাছে আসত তখন সে তার মুখে পাথর ছুঁড়ে মারত।
আমরা সবচেয়ে ভয়ানক চেহারার একজন লোককে আগুনের পাশে দেখলাম, যে ক্রমাগত তা জ্বালাচ্ছিল এবং তার চারপাশে ঘুরছিল।
তারপর দৃশ্য সুন্দর হয়ে গেল। আমরা একটি বাগানে প্রবেশ করলাম যেখানে গভীর সবুজ গাছপালা এবং বসন্তের রং ছিল। এর কেন্দ্রে একজন অত্যন্ত লম্বা লোক দাঁড়িয়ে ছিল যে অগণিত শিশুদের দিয়ে ঘেরা ছিল।
অবশেষে, আমরা সোনা-রুপার ইট দিয়ে তৈরি একটি দুর্দান্ত শহরে পৌঁছলাম। ভিতরে এমন লোক ছিল যারা অর্ধেক সুন্দর এবং অর্ধেক কুৎসিত ছিল। তারা নিজেদের দুধের মতো সাদা নদীতে নিক্ষেপ করল এবং নিখুঁত সৌন্দর্যে বেরিয়ে এল।
গাইডরা তারপর ব্যাখ্যা করলেন: চূর্ণ মাথার লোক তাদের প্রতিনিধিত্ব করে যারা কুরআন শিখে কিন্তু তা তেলাওয়াত করে না বা এর নির্দেশনা অনুসরণ করে না, এবং যারা তাদের নামাজ অবহেলা করে। ছেঁড়া মুখের লোক মিথ্যাবাদীদের প্রতিনিধিত্ব করে যাদের মিথ্যা বিশ্বব্যাপী ছড়িয়ে পড়ে। চুল্লির লোকেরা ব্যভিচারী। সাঁতারু একজন সুদখোর। ভয়ানক লোকটি মালিক, জাহান্নামের দারোয়ান। লম্বা লোকটি ইব্রাহিম, যারা প্রাকৃতিক ঈমানের অবস্থায় মারা গেছে এমন শিশুদের দিয়ে ঘেরা। অর্ধেক কুৎসিত লোকেরা তাদের প্রতিনিধিত্ব করে যারা ভাল ও খারাপ কাজ মিশিয়েছিল কিন্তু আল্লাহ তাদের ক্ষমা করেছেন।"`,
          moral: 'নবী (ﷺ)-এর এই প্রামাণিক স্বপ্ন আমাদের পরকালে আমাদের কর্মের পরিণাম দেখায়। এটি আমাদের শেখায় যে কুরআনকে গুরুত্ব সহকারে নিতে হবে, মিথ্যা ও ব্যভিচার এড়াতে হবে, সুদ থেকে দূরে থাকতে হবে, এবং ধারাবাহিকভাবে ভাল কাজ করার চেষ্টা করতে হবে। আল্লাহর রহমত তাদের ঘিরে রাখে যারা ক্ষমা প্রার্থনা করে।',
          character: 'নবী মুহাম্মাদ (ﷺ) এবং দুই ফেরেশতা গাইড',
          category: 'ঐশী দর্শন'
        }
      },
      readTime: '8 min',
      moods: ['contemplative', 'fearful', 'reflective', 'warning', 'enlightening'],
      tags: ['prophetic dream', 'afterlife', 'punishment', 'paradise', 'quran', 'prayer', 'lies', 'adultery', 'usury', 'forgiveness', 'hadith']
    },
    {
      id: '10',
      content: {
        en: {
          title: 'The Conversion of Umar ibn Al-Khattab',
          content: `In the early days of Islam in Mecca, the small community of Muslims faced relentless persecution from the powerful Quraysh tribe. They practiced their faith in secret, gathering in the house of Al-Arqam. The Prophet Muhammad (ﷺ) prayed, "O Allah, strengthen Islam with either Umar ibn Al-Khattab or Amr ibn Hisham (Abu Jahl)." At that time, Umar was one of Islam's fiercest enemies.

Umar was known for his strength, courage, and fiery temper. Enraged by this new religion that challenged his ancestors' traditions, he decided to take matters into his own hands. Sword in hand, he stormed out of his house with murderous intent - to kill the Prophet Muhammad (ﷺ) and end Islam once and for all.
On his way, a friend saw his deadly purpose and tried to dissuade him, saying, "O Umar, why don't you first set your own house in order? Your sister and brother-in-law have converted and followed Muhammad!" This news enraged Umar even more. He immediately changed direction toward his sister Fatimah's house.
As he approached, he heard the rhythmic sound of Quranic recitation. Inside, his brother-in-law Saeed and sister were being taught by Khabbab ibn Al-Aratt. Bursting in, Umar demanded, "What is this nonsense I heard?" When they admitted embracing Islam, his rage exploded. He attacked his brother-in-law, and when his sister tried to intervene, he struck her, drawing blood.
Seeing blood on his sister's face, something shifted in Umar. His anger subsided into strange curiosity and regret. In a calmer voice, he said, "Let me see what you were reading." His sister Fatimah, with immense faith, boldly declared, "You are unclean in your polytheism, and only the pure may touch it." This statement struck him to his core. He agreed to purify himself.
The scroll contained verses from Surah Taha. As Umar began reading: "Indeed, I am Allah. There is no deity except Me, so worship Me and establish prayer for My remembrance," the words overwhelmed him with their beauty, majesty, and undeniable truth. His arrogance shattered. He whispered, "How excellent these words are!"
Khabbab emerged from hiding and said, "O Umar, by Allah, I hope Allah brought you here in answer to the Prophet's prayer, for yesterday I heard him praying, 'O Allah, strengthen Islam with Umar.'" With his heart completely transformed, Umar asked, "Where is Muhammad?"
Guided to the house of Al-Arqam where the Prophet and Muslims gathered, Umar knocked. The Muslims inside were terrified, but Hamza reassured them. The Prophet opened the door, grabbed Umar by his cloak, and asked, "Why have you come, O son of Khattab?" With tears in his eyes, Umar replied, "O Messenger of Allah, I have come to believe in Allah and His Messenger." The Prophet raised the takbeer, "Allahu Akbar!" so loudly that everyone knew Umar had embraced Islam.`,
          moral: 'No one is beyond Allah\'s guidance - even the most unlikely person can be transformed by sincere exposure to truth. The Quran has unique power to change hearts, and Allah\'s plan is perfect. Umar\'s conversion shows that courage, whether in opposition or support, when guided by truth, can change the course of history.',
          character: 'Umar ibn Al-Khattab (رضي الله عنه)',
          category: 'Divine Transformation'
        },
        hi: {
          title: 'उमर इब्न अल-ख़त्ताब का इस्लाम स्वीकार करना',
          content: `मक्का में इस्लाम के प्रारंभिक दिनों में, मुसलमानों का छोटा समुदाय शक्तिशाली कुरैश जनजाति से निरंतर उत्पीड़न का सामना कर रहा था। वे गुप्त रूप से अपने विश्वास का अभ्यास करते थे, अल-अरकम के घर में एकत्रित होते थे। नबी मुहम्मद (ﷺ) ने दुआ की, "ऐ अल्लाह! उमर इब्न अल-ख़त्ताब या अम्र इब्न हिशाम (अबू जहल) में से किसी एक के द्वारा इस्लाम को मजबूत बना।" उस समय उमर इस्लाम के सबसे कट्टर शत्रुओं में से एक था।

उमर अपनी शक्ति, साहस और तेज़ स्वभाव के लिए प्रसिद्ध था। इस नए धर्म से क्रोधित होकर जो उसके पूर्वजों की परंपराओं को चुनौती देता था, उसने मामले को अपने हाथों में लेने का निश्चय किया। तलवार हाथ में लेकर, वह हत्या के इरादे से अपने घर से निकला - नबी मुहम्मद (ﷺ) को मारने और इस्लाम को हमेशा के लिए समाप्त करने के लिए।
रास्ते में, एक मित्र ने उसका घातक उद्देश्य देखा और उसे समझाने की कोशिश करते हुए कहा, "ऐ उमर! तुम पहले अपना घर क्यों नहीं संभालते? तुम्हारी बहन और जीजा ने धर्म परिवर्तन कर लिया है और मुहम्मद का अनुसरण कर रहे हैं!" इस समाचार ने उमर को और भी क्रोधित कर दिया। उसने तुरंत दिशा बदली और अपनी बहन फातिमा के घर की ओर गया।
जैसे ही वह पास पहुंचा, उसने कुरानी तिलावत की लयबद्ध आवाज़ सुनी। अंदर, उसके जीजा सईद और बहन को खब्बाब इब्न अल-अरत्त सिखा रहे थे। अंदर घुसते हुए, उमर ने मांग की, "यह क्या बकवास है जो मैंने सुनी?" जब उन्होंने इस्लाम स्वीकार करने की बात स्वीकार की, तो उसका गुस्सा फूट पड़ा। उसने अपने जीजा पर हमला किया, और जब उसकी बहन ने हस्तक्षेप करने की कोशिश की, तो उसने उसे मारा, जिससे खून निकला।
अपनी बहन के चेहरे पर खून देखकर, उमर में कुछ बदलाव आया। उसका क्रोध अजीब जिज्ञासा और पछतावे में बदल गया। शांत आवाज़ में, उसने कहा, "मुझे दिखाओ कि तुम क्या पढ़ रहे थे।" उसकी बहन फातिमा ने, अपार विश्वास के साथ, साहसपूर्वक घोषणा की, "तुम अपने बहुदेववाद में अपवित्र हो, और केवल पवित्र लोग इसे छू सकते हैं।" इस कथन ने उसे दिल से हिला दिया। उसने खुद को पवित्र करने पर सहमति दी।
पांडुलिपि में सूरह ताहा की आयतें थीं। जैसे ही उमर ने पढ़ना शुरू किया: "निश्चय ही, मैं अल्लाह हूं। मेरे सिवा कोई देवता नहीं है, इसलिए मेरी पूजा करो और मेरी याद के लिए नमाज़ स्थापित करो," शब्दों ने उसे उनकी सुंदरता, महिमा और निर्विवाद सत्य से अभिभूत कर दिया। उसका अहंकार चूर-चूर हो गया। उसने फुसफुसाया, "ये शब्द कितने बेहतरीन हैं!"
खब्बाब छुपने से बाहर आया और कहा, "ऐ उमर! अल्लाह की कसम, मुझे उम्मीद है कि अल्लाह ने तुम्हें नबी की दुआ के जवाब में यहां भेजा है, क्योंकि कल मैंने उन्हें दुआ करते सुना, 'ऐ अल्लाह! उमर के साथ इस्लाम को मजबूत बना।'" अपने दिल के पूरी तरह से बदल जाने के साथ, उमर ने पूछा, "मुहम्मद कहां हैं?"
अल-अरकम के घर का मार्गदर्शन मिला जहां नबी और मुसलमान एकत्रित थे, उमर ने दस्तक दी। अंदर के मुसलमान डरे हुए थे, लेकिन हम्ज़ा ने उन्हें आश्वासन दिया। नबी ने दरवाज़ा खोला, उमर को उसके चोगे से पकड़ा, और पूछा, "तुम क्यों आए हो, ऐ खत्ताब के बेटे?" आंखों में आंसुओं के साथ, उमर ने जवाब दिया, "ऐ अल्लाह के रसूल! मैं अल्लाह और उसके रसूल पर विश्वास करने आया हूं।" नबी ने तकबीर कहा, "अल्लाहु अकबर!" इतनी ज़ोर से कि सभी को पता चल गया कि उमर ने इस्लाम स्वीकार कर लिया है।`,
          moral: 'कोई भी अल्लाह के मार्गदर्शन से परे नहीं है - सबसे असंभावित व्यक्ति भी सत्य के सच्चे संपर्क से बदल सकता है। कुरान में दिलों को बदलने की अनोखी शक्ति है, और अल्लाह की योजना परफेक्ट है। उमर का धर्मांतरण दिखाता है कि साहस, चाहे विरोध में हो या समर्थन में, जब सत्य से निर्देशित होता है, तो इतिहास की दिशा बदल सकता है।',
          character: 'उमर इब्न अल-ख़त्ताब (رضي الله عنه)',
          category: 'दिव्य रूपांतरण'
        },
        bn: {
          title: 'উমার ইবনে আল-খাত্তাবের ইসলাম গ্রহণ',
          content: `মক্কায় ইসলামের প্রাথমিক দিনগুলিতে, মুসলমানদের ছোট সম্প্রদায় শক্তিশালী কুরাইশ গোত্রের নিরলস নির্যাতনের মুখোমুখি হয়েছিল। তারা গোপনে তাদের বিশ্বাস চর্চা করত, আল-আরকামের বাড়িতে একত্রিত হত। নবী মুহাম্মদ (ﷺ) দোয়া করেছিলেন, "হে আল্লাহ! উমার ইবনে আল-খাত্তাব অথবা আমর ইবনে হিশাম (আবু জাহল) - এদের যেকোনো একজনের দ্বারা ইসলামকে শক্তিশালী করুন।" সে সময় উমার ইসলামের অন্যতম কট্টর শত্রু ছিল।

উমার তার শক্তি, সাহস এবং উগ্র মেজাজের জন্য পরিচিত ছিল। এই নতুন ধর্মে ক্রুদ্ধ হয়ে যা তার পূর্বপুরুষদের ঐতিহ্যকে চ্যালেঞ্জ করেছিল, সে বিষয়টি নিজের হাতে নেওয়ার সিদ্ধান্ত নিল। তলোয়ার হাতে নিয়ে, সে হত্যার অভিপ্রায়ে তার বাড়ি থেকে বেরিয়েছিল - নবী মুহাম্মদ (ﷺ) কে হত্যা করতে এবং ইসলামকে চিরতরে শেষ করতে।
পথে, একজন বন্ধু তার মারাত্মক উদ্দেশ্য দেখে তাকে নিরুৎসাহিত করার চেষ্টা করে বলল, "হে উমার! তুমি প্রথমে তোমার নিজের বাড়ি সামলাও না কেন? তোমার বোন এবং ভগ্নিপতি ধর্মান্তরিত হয়েছে এবং মুহাম্মদের অনুসরণ করছে!" এই সংবাদ উমারকে আরও ক্রুদ্ধ করে তুলল। সে অবিলম্বে দিক পরিবর্তন করে তার বোন ফাতিমার বাড়ির দিকে গেল।
যখন সে কাছে পৌঁছল, সে কুরআনিক তিলাওয়াতের ছন্দোবদ্ধ আওয়াজ শুনল। ভিতরে, তার ভগ্নিপতি সাইদ এবং বোনকে খাব্বাব ইবনে আল-আরাত্ত শিক্ষা দিচ্ছিল। ভিতরে ঢুকে, উমার দাবি করল, "আমি যে বাজে কথা শুনলাম এটা কী?" যখন তারা ইসলাম গ্রহণের কথা স্বীকার করল, তার ক্রোধ বিস্ফোরিত হল। সে তার ভগ্নিপতিকে আক্রমণ করল, এবং যখন তার বোন হস্তক্ষেপ করার চেষ্টা করল, সে তাকে আঘাত করল, যার ফলে রক্তপাত হল।
তার বোনের মুখে রক্ত দেখে, উমারের মধ্যে কিছু পরিবর্তন হল। তার ক্রোধ অদ্ভুত কৌতূহল এবং অনুশোচনায় রূপান্তরিত হল। শান্ত কণ্ঠে, সে বলল, "তোমরা কী পড়ছিলে আমাকে দেখাও।" তার বোন ফাতিমা অপরিসীম বিশ্বাসের সাথে সাহসিকতার সাথে ঘোষণা করল, "তুমি তোমার বহুদেববাদে অপবিত্র, এবং কেবল পবিত্ররাই এটি স্পর্শ করতে পারে।" এই কথা তাকে অন্তর থেকে নাড়িয়ে দিল। সে নিজেকে পবিত্র করতে সম্মত হল।
পাণ্ডুলিপিতে সূরা তাহার আয়াত ছিল। যখন উমার পড়তে শুরু করল: "নিশ্চয়ই, আমি আল্লাহ। আমি ব্যতীত কোনো ইলাহ নেই, সুতরাং আমার ইবাদাত কর এবং আমার স্মরণার্থে নামাজ প্রতিষ্ঠা কর," শব্দগুলি তাদের সৌন্দর্য, মহিমা এবং অনস্বীকার্য সত্য দিয়ে তাকে অভিভূত করল। তার অহংকার চূর্ণবিচূর্ণ হয়ে গেল। সে ফিসফিস করে বলল, "এই শব্দগুলো কত চমৎকার!"
খাব্বাব লুকানো থেকে বেরিয়ে এসে বলল, "হে উমার! আল্লাহর শপথ, আমি আশা করি আল্লাহ তোমাকে নবীর দোয়ার উত্তরে এখানে পাঠিয়েছেন, কারণ গতকাল আমি তাঁকে দোয়া করতে শুনেছি, 'হে আল্লাহ! উমারের সাথে ইসলামকে শক্তিশালী করুন।'" তার হৃদয় সম্পূর্ণভাবে রূপান্তরিত হওয়ার সাথে, উমার জিজ্ঞেস করল, "মুহাম্মাদ কোথায়?"
আল-আরকামের বাড়িতে পথপ্রদর্শন পেয়ে যেখানে নবী এবং মুসলমানরা একত্রিত ছিল, উমার কড়া নাড়ল। ভিতরের মুসলমানরা ভীত ছিল, কিন্তু হামযা তাদের আশ্বস্ত করল। নবী দরজা খুলে দিলেন, উমারকে তার পোশাক ধরে জিজ্ঞেস করলেন, "তুমি কেন এসেছ, হে খাত্তাবের পুত্র?" চোখে অশ্রু নিয়ে, উমার উত্তর দিল, "হে আল্লাহর রাসূল! আমি আল্লাহ ও তাঁর রাসূলের প্রতি বিশ্বাস করতে এসেছি।" নবী তাকবীর উচ্চারণ করলেন, "আল্লাহু আকবার!" এত জোরে যে সবাই বুঝতে পারল যে উমার ইসলাম গ্রহণ করেছে।`,
          moral: 'কেউই আল্লাহর পথনির্দেশনার বাইরে নয় - এমনকি সবচেয়ে অসম্ভাব্য ব্যক্তিও সত্যের আন্তরিক সংস্পর্শে রূপান্তরিত হতে পারে। কুরআনে হৃদয় পরিবর্তনের অনন্য শক্তি রয়েছে, এবং আল্লাহর পরিকল্পনা নিখুঁত। উমারের ধর্মান্তরণ দেখায় যে সাহস, তা বিরোধিতায় হোক বা সমর্থনে হোক, যখন সত্য দ্বারা পরিচালিত হয়, তখন ইতিহাসের গতিপথ বদলে দিতে পারে।',
          character: 'উমার ইবনে আল-খাত্তাব (رضي الله عنه)',
          category: 'ঐশী রূপান্তর'
        }
      },
      readTime: '7 min',
      moods: ['angry', 'transformed', 'repentant', 'determined', 'enlightened'],
      tags: ['conversion', 'transformation', 'quran power', 'family influence', 'divine guidance', 'courage', 'historical', 'companion story']
    }
  ];

  const getCurrentStoryContent = () => {
    if (!currentStory) return null;
    return currentStory.content[selectedLanguage as keyof typeof currentStory.content];
  };

  const getStoryForMood = (mood: Mood | null): Story => {
    if (!mood) {
      return stories[Math.floor(Math.random() * stories.length)];
    }

    const moodSpecificStories = stories.filter(story =>
      story.moods.includes(mood.id)
    );

    if (moodSpecificStories.length > 0) {
      return moodSpecificStories[Math.floor(Math.random() * moodSpecificStories.length)];
    }

    return stories[Math.floor(Math.random() * stories.length)];
  };

  const loadNewStory = () => {
    setIsLoading(true);
    setExpandedStory(false);
    setTimeout(() => {
      const newStory = getStoryForMood(selectedMood);
      setCurrentStory(newStory);
      setIsLoading(false);
    }, 800);
  };

  // Fixed useEffect - remove circular dependency
  useEffect(() => {
    setIsLoading(true);
    const timeout = setTimeout(() => {
      const newStory = getStoryForMood(selectedMood);
      setCurrentStory(newStory);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timeout);
  }, [selectedMood]);

  if (!currentStory) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center py-16">
          <RefreshCw className="w-8 h-8 animate-spin text-emerald-500" />
          <span className="ml-3 text-gray-600 dark:text-gray-300">Loading stories...</span>
        </div>
      </div>
    );
  }

  const storyContent = getCurrentStoryContent();
  if (!storyContent) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center py-16">
          <span className="text-gray-600 dark:text-gray-300">Story content not available</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Helmet>
        <title>Islamic Stories - Inspiring Tales from Islamic Heritage | Qalam Verse</title>
        <meta name="description" content="Read inspiring Islamic stories from our rich heritage. Discover tales of faith, patience, gratitude, and wisdom that strengthen your Islamic beliefs and provide spiritual guidance." />
        <meta name="keywords" content="Islamic Stories, Islamic Tales, Islamic Heritage, Faith Stories, Islamic Wisdom Stories, Moral Stories Islam, Islamic Inspiration, true islamic story, true inspirational story, inspiring short stories, real incident islamic story" />
        <link rel="canonical" href="https://www.qalamverse.site/#/islamic-stories" />
      </Helmet>

      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
          Islamic Stories
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Inspiring tales from our Islamic heritage to strengthen faith and provide guidance
        </p>

        {/* Language Selector */}
        <div className="flex justify-center mb-6 mt-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-1 border border-gray-200 dark:border-gray-600">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setSelectedLanguage(lang.code)}
                className={`flex items-center px-4 py-2 rounded-md transition-all ${selectedLanguage === lang.code
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

        {selectedMood && (
          <div className="mt-4 inline-flex items-center px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 rounded-full text-emerald-800 dark:text-emerald-300">
            <span className="mr-2">{selectedMood.emoji}</span>
            <span className="text-sm font-medium">Stories for when you're feeling {selectedMood.label.toLowerCase()}</span>
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-600">
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <RefreshCw className="w-8 h-8 animate-spin text-emerald-500" />
            <span className="ml-3 text-gray-600 dark:text-gray-300">Loading new story...</span>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Book className="w-6 h-6 mr-3" />
                  <div>
                    <h3 className="text-2xl font-bold">{storyContent.title}</h3>
                    <div className="flex items-center mt-2 space-x-4 text-emerald-100">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        <span className="text-sm">{storyContent.character}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <span className="text-sm">{currentStory.readTime} read</span>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={loadNewStory}
                  className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                  title="New story"
                  disabled={isLoading}
                >
                  <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>

            {/* Category Badge */}
            <div className="px-6 py-4 bg-emerald-50 dark:bg-emerald-900/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mr-2" />
                  <span className="text-emerald-800 dark:text-emerald-300 font-medium">
                    {storyContent.category}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {currentStory.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-xs rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Story Content */}
            <div className="p-6">
              <div className={`prose prose-lg max-w-none transition-all duration-300 ${expandedStory ? 'max-h-none' : 'max-h-48 overflow-hidden'
                }`}>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                  {storyContent.content}
                </p>
              </div>

              {!expandedStory && (
                <button
                  onClick={() => setExpandedStory(true)}
                  className="mt-4 text-emerald-600 dark:text-emerald-400 font-medium hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors"
                >
                  Read more...
                </button>
              )}

              {expandedStory && (
                <>
                  <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-lg border-l-4 border-amber-400">
                    <div className="flex items-start">
                      <Heart className="w-5 h-5 text-amber-500 mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-amber-800 dark:text-amber-300 mb-2">
                          Moral of the Story:
                        </h4>
                        <p className="text-amber-700 dark:text-amber-400 leading-relaxed">
                          {storyContent.moral}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Quranic Verses Section */}
                  {currentStory.verses && currentStory.verses.length > 0 && (
                    <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border-l-4 border-blue-400">
                      <div className="flex items-start">
                        <Book className="w-5 h-5 text-blue-500 mt-1 mr-3 flex-shrink-0" />
                        <div className="w-full">
                          <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-4">
                            Related Quranic Verses:
                          </h4>
                          <div className="space-y-4">
                            {currentStory.verses.map((verse, index) => (
                              <div key={index} className="bg-white/50 dark:bg-gray-800/50 p-4 rounded-lg">
                                <div className="text-xl font-arabic text-blue-800 dark:text-blue-300 mb-2 text-right leading-loose" dir="rtl">
                                  {verse.arabic}
                                </div>
                                <p className="text-blue-700 dark:text-blue-400 italic mb-1">
                                  "{verse.translation}"
                                </p>
                                <div className="text-sm text-blue-600 dark:text-blue-500 font-medium">
                                  - {verse.reference}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </>
        )}
      </div>

      {/* Story Collection */}
      <div className="mt-12">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 text-center">
          More Inspiring Stories
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {stories.slice(0, 4).map((story) => {
            const storyLangContent = story.content[selectedLanguage as keyof typeof story.content];
            return (
              <button
                key={story.id}
                onClick={() => {
                  setCurrentStory(story);
                  setExpandedStory(false);
                }}
                className={`p-4 rounded-lg border-2 transition-all text-left hover:scale-[1.02] ${currentStory?.id === story.id
                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                  : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-emerald-300'
                  }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-800 dark:text-white">
                    {storyLangContent.title}
                  </h4>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="w-3 h-3 mr-1" />
                    {story.readTime}
                  </div>
                </div>
                <p className="text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-2">
                  {storyLangContent.category}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                  {storyLangContent.content.substring(0, 100)}...
                </p>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-600 dark:text-gray-300 italic">
          {selectedLanguage === 'en' && '"And We made from them leaders guiding by Our command when they were patient and were certain of Our signs." - Quran 32:24'}
          {selectedLanguage === 'hi' && '"और हमने उनमें से नेता बनाए जो हमारे आदेश से मार्गदर्शन करते थे जब वे धैर्यवान थे और हमारी निशानियों पर यकीन रखते थे।" - कुरआन 32:24'}
          {selectedLanguage === 'bn' && '"এবং আমি তাদের মধ্যে থেকে নেতা বানিয়েছি যারা আমার আদেশে পথপ্রদর্শন করত যখন তারা ধৈর্যশীল ছিল এবং আমার নিদর্শনসমূহে নিশ্চিত বিশ্বাস রাখত।" - কুরআন 32:24'}
        </p>
      </div>
    </div>
  );
}

export default IslamicStories;
