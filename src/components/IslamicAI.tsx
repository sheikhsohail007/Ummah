import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Send, Bot, User, Loader2, Sparkles, Heart, Image as ImageIcon, MessageCircle, Zap, ArrowUp } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  image?: string;
}

function IslamicAI() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Assalamu Alaikum! I am your Islamic AI companion. How may I assist you today? Feel free to ask me anything about Islam, Quran, Hadith, or spiritual guidance.',
      isUser: false,
      timestamp: new Date(),
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ✅ Scroll to Top Button State
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize Gemini
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // ✅ Scroll to Top Function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // ✅ Handle Scroll Event
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.pageYOffset;
      setShowScrollToTop(scrollY > 500); // Show after 500px scroll
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // ✅ Convert file to base64
  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  // ✅ Generate AI Response (with auto language + short reply + fallback)
  const generateResponse = async (userMessage: string, imageFile?: File): Promise<string> => {

    // 🌙 --- ISLAMIC CONTEXT ---
    const islamicContext = `
You are an Islamic AI assistant for "Qalam Verse".

🌙 ROLE:
- Provide authentic Islamic guidance based on the Qur'an, Hadith, and scholarly consensus.
- If the user's question is unrelated to Islam, respond with gentle Islamic wisdom or redirection.
- Keep responses spiritually uplifting, clear, and easy to understand.

🗣️ LANGUAGE HANDLING:
- Detect the user's input language (English, Hinglish, or Bengali).
- If the user speaks Hinglish, reply softly in Roman Urdu/Hindi.
- If the user speaks Bengali, reply politely in Bengali.
- Otherwise, use fluent English.
- Never mix multiple languages in one reply.

⚖️ STYLE:
- Be humble, kind, and spiritually enlightening.
- Start with “Assalamu Alaikum” when appropriate.
- If the user explicitly asks "short" / "brief" / "summarize", give a short reply (2–4 sentences).
- Otherwise provide a detailed, educational, but concise answer.
`;

    // 🌐 --- LANGUAGE DETECTION ---
    function detectLanguage(text: string): 'en' | 'hi' | 'bn' {
      const bnWords = ['আল্লাহ', 'ধন্যবাদ', 'শুকরিয়া', 'হাদিস', 'নামাজ', 'রোজা'];
      const hiWords = ['bhai', 'bhaiya', 'aap', 'kya', 'kaise', 'namaz', 'dua', 'shayad'];
      const lower = text.toLowerCase();

      if (/[ঀ-৾]/.test(text)) return 'bn';
      for (const w of bnWords) if (text.includes(w)) return 'bn';
      for (const w of hiWords) if (lower.includes(w)) return 'hi';
      return 'en';
    }

    // ✂️ --- SHORT-REQUEST DETECTOR ---
    function wantsShortReply(text: string): boolean {
      const shortKeywords = ['short', 'brief', 'in short', 'shortly', 'summarize', 'tl;dr', 'short answer', 'briefly'];
      const lower = text.toLowerCase();
      return shortKeywords.some(k => lower.includes(k));
    }

    // 🌍 Detect language + short reply intent
    const lang = detectLanguage(userMessage);
    const shortRequested = wantsShortReply(userMessage);

    const languageHint =
      lang === 'hi' ? 'Reply in soft Roman Urdu/Hinglish.' :
        lang === 'bn' ? 'Reply in Bengali.' :
          'Reply in English.';

    const promptIntro = `${islamicContext}
LANGUAGE_HINT: ${languageHint}
USER_MESSAGE: ${userMessage}
`;

    let parts: any[] = [{ text: promptIntro }];

    if (imageFile) {
      const base64 = await fileToBase64(imageFile);
      parts.push({
        inline_data: {
          mime_type: imageFile.type,
          data: base64.split(',')[1],
        },
      });
    }

    // ✍️ Extract + Trim Reply
    const extractText = (result: any): string => {
      try {
        const txt = typeof result.response.text === 'function'
          ? result.response.text()
          : result.response?.text ?? '';
        let reply = String(txt || '');
        if (shortRequested) {
          const words = reply.split(/\s+/);
          if (words.length > 80) reply = words.slice(0, 80).join(' ') + '...';
        }
        return reply;
      } catch {
        return '';
      }
    };

    // 🧠 Try main model
    try {
      const mainModel = genAI.getGenerativeModel({ model: "models/gemini-2.5-pro" });
      const res = await mainModel.generateContent({ contents: [{ role: "user", parts }] });
      const reply = extractText(res);
      if (reply) return reply;
    } catch (error) {
      console.warn("⚠️ Main model failed, switching to fallback...", error);
    }

    // 🔁 Fallback model
    try {
      const fallbackModel = genAI.getGenerativeModel({ model: "models/gemini-pro" });
      const res2 = await fallbackModel.generateContent({ contents: [{ role: "user", parts }] });
      const reply2 = extractText(res2);
      if (reply2) return reply2;
    } catch (fallbackError) {
      console.error("❌ Both models failed:", fallbackError);
    }

    return "Apologies, the AI service is temporarily busy. Please try again in a moment, Insha’Allah.";
  };



  // ✅ Handle Send Message
  const handleSendMessage = async () => {
    if (!inputText.trim() && !selectedImage) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim() || '(Image uploaded)',
      isUser: true,
      timestamp: new Date(),
      image: imagePreview || undefined,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setSelectedImage(null);
    setImagePreview(null);
    setIsLoading(true);
    setError(null);

    try {
      const aiResponse = await generateResponse(userMessage.text, selectedImage || undefined);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm having trouble responding right now. Please check your connection and try again.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) =>
    date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // ✅ Handle Image Selection
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (event) => setImagePreview(event.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4">
      <Helmet>
        <title>Islamic AI - AI-Powered Islamic Guidance | Qalam Verse</title>
        <meta
          name="description"
          content="AI-powered Islamic assistant for Quranic wisdom, Hadith guidance, spiritual growth, and more. Ask about Islam, prayers, and Islamic knowledge anytime."
        />
        <meta
          name="keywords"
          content="Islamic AI assistant, Quran guidance, Hadith explanation, Islamic spiritual growth, Dua help, AI Quran teacher, Islamic chatbot, Muslim prayer guidance, personal guidance, Islamic ai tools online, Ai quran teacher, ai muslim scholar, digital, islamic assistant, personal mufti ai, namaz main maan kaise lagaye, quran ko ramdam main kaise padhe"
        />
        <link rel="canonical" href="https://www.qalamverse.site/#/islamic-ai" />
      </Helmet>


      {/* Modern Header Section */}
      <div className="text-center mb-12 relative">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-4 left-1/4 w-2 h-2 bg-emerald-400/20 rounded-full animate-pulse"></div>
          <div className="absolute top-8 right-1/3 w-3 h-3 bg-teal-400/30 rounded-full animate-bounce"></div>
          <div className="absolute bottom-4 left-1/3 w-1.5 h-1.5 bg-emerald-500/40 rounded-full animate-ping"></div>
        </div>

        {/* Hero Content */}
        <div className="relative">
          <div className="flex items-center justify-center mb-6">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-600 rounded-full blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
              <div className="relative p-4 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl shadow-xl">
                <Bot className="w-10 h-10 text-white drop-shadow-sm" />
              </div>
            </div>
          </div>

          <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 bg-clip-text text-transparent mb-4 tracking-tight">
            Islamic AI Assistant
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Your intelligent companion for <span className="text-emerald-600 font-semibold">Quranic wisdom</span>,
            <span className="text-teal-600 font-semibold"> authentic guidance</span>, and
            <span className="text-emerald-600 font-semibold"> spiritual growth</span>
          </p>
        </div>

        {/* Stats or Features */}
        <div className="flex items-center justify-center gap-8 mt-8 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-emerald-500" />
            <span>AI-Powered</span>
          </div>
          <div className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-teal-500" />
            <span>24/7 Available</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-500" />
            <span>Islamic Knowledge</span>
          </div>
        </div>
      </div>

      {/* Modern Chat Container */}
      <div className="relative">
        {/* Decorative blur background */}
        <div className="absolute -inset-4 bg-gradient-to-r from-emerald-400/5 via-teal-400/5 to-emerald-400/5 blur-3xl rounded-3xl"></div>

        <div className="relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/30 overflow-hidden">
          {/* Chat Header */}
          <div className="relative bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Islamic AI</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-emerald-100 text-sm">Online & Ready</span>
                  </div>
                </div>
              </div>
              <div className="text-emerald-100 text-sm opacity-80">
                Powered by QalamVerse
              </div>
            </div>
          </div>

          {/* Chat Messages Area */}
          <div className="h-[500px] overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-gray-50/50 to-white/30 dark:from-gray-900/30 dark:to-gray-800/50 scrollbar-thin scrollbar-thumb-emerald-200 scrollbar-track-transparent">
            {messages.map((msg, index) => (
              <div
                key={msg.id}
                className={`flex items-start gap-4 animate-in slide-in-from-bottom-2 duration-500 ${msg.isUser ? 'flex-row-reverse' : ''
                  }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Avatar */}
                <div className={`relative group flex-shrink-0 ${msg.isUser ? 'order-last' : ''}`}>
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg ${msg.isUser
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600'
                    : 'bg-gradient-to-r from-emerald-500 to-teal-600'
                    }`}>
                    {msg.isUser ? (
                      <User className="w-5 h-5 text-white" />
                    ) : (
                      <Bot className="w-5 h-5 text-white" />
                    )}
                  </div>
                  {/* Online indicator for AI */}
                  {!msg.isUser && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></div>
                  )}
                </div>

                {/* Message Content */}
                <div className={`max-w-xs lg:max-w-lg ${msg.isUser ? 'order-first' : ''}`}>
                  <div
                    className={`px-6 py-4 rounded-2xl shadow-lg backdrop-blur-sm border transition-all duration-200 hover:shadow-xl ${msg.isUser
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white border-blue-400/20 ml-auto'
                      : 'bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-white border-white/30 dark:border-gray-700/30'
                      }`}
                  >
                    {msg.image && (
                      <div className="relative mb-3 group">
                        <img
                          src={msg.image}
                          alt="uploaded"
                          className="rounded-xl max-h-48 object-contain w-full shadow-md"
                        />
                        <div className="absolute inset-0 bg-black/5 rounded-xl group-hover:bg-black/10 transition-colors"></div>
                      </div>
                    )}
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {msg.text}
                    </p>
                  </div>

                  <div className={`flex items-center gap-2 mt-2 text-xs text-gray-400 ${msg.isUser ? 'justify-end' : 'justify-start'
                    }`}>
                    <span>{formatTime(msg.timestamp)}</span>
                    {msg.isUser && <span className="text-blue-400">✓</span>}
                  </div>
                </div>
              </div>
            ))}

            {/* Loading Animation */}
            {isLoading && (
              <div className="flex items-start gap-4 animate-in slide-in-from-bottom-2">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 rounded-2xl px-6 py-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Thinking deeply...</span>
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mx-auto max-w-md">
                <div className="bg-red-50/80 dark:bg-red-900/20 backdrop-blur-sm border border-red-200/50 dark:border-red-800/50 rounded-2xl p-4 shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Modern Input Area */}
          <div className="p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl border-t border-white/20 dark:border-gray-700/30">
            {/* Image Preview */}
            {imagePreview && (
              <div className="mb-4 flex items-center gap-3 p-3 bg-emerald-50/50 dark:bg-emerald-900/20 rounded-xl backdrop-blur-sm border border-emerald-200/50 dark:border-emerald-800/50">
                <img src={imagePreview} alt="preview" className="w-12 h-12 rounded-lg object-cover shadow-md" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Image ready to send</p>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400">Click send to share with AI</p>
                </div>
                <button
                  onClick={() => {
                    setSelectedImage(null);
                    setImagePreview(null);
                  }}
                  className="px-3 py-1 bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 rounded-lg text-xs transition-colors"
                >
                  Remove
                </button>
              </div>
            )}

            {/* Input Row */}
            <div className="flex items-end gap-3">
              {/* Image Upload */}
              <label className="cursor-pointer group relative">
                <div className="p-3 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-xl hover:from-emerald-100 hover:to-teal-100 dark:hover:from-emerald-900/30 dark:hover:to-teal-900/30 transition-all duration-200 shadow-md hover:shadow-lg group-hover:scale-105">
                  <ImageIcon className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors" />
                </div>
                <input type="file" accept="image/*" hidden onChange={handleImageSelect} />
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Upload Image
                </div>
              </label>

              {/* Text Input */}
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about Islam, Quran, or seek guidance..."
                  className="w-full px-6 py-4 pr-4 border-0 rounded-xl bg-gradient-to-r from-gray-50 to-white dark:from-gray-700 dark:to-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-emerald-500/50 focus:shadow-lg transition-all duration-200 shadow-md backdrop-blur-sm"
                  disabled={isLoading}
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/5 to-teal-500/5 opacity-0 focus-within:opacity-100 transition-opacity pointer-events-none"></div>
              </div>

              {/* Send Button */}
              <button
                onClick={handleSendMessage}
                disabled={(!inputText.trim() && !selectedImage) || isLoading}
                className="relative group p-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 disabled:hover:scale-100"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Send Message
                </div>
              </button>
            </div>

            {/* Footer Info */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <Sparkles className="w-3 h-3 text-emerald-500" />
                <span>Powered by QalamVerse</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <Heart className="w-3 h-3 text-red-500 animate-pulse" />
                <span>Made with Islamic Values</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Disclaimer */}
      <div className="mt-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-400/5 to-orange-400/5 blur-2xl rounded-2xl"></div>
        <div className="relative bg-amber-50/80 dark:bg-amber-900/20 backdrop-blur-xl border border-amber-200/50 dark:border-amber-800/50 rounded-2xl p-6 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-amber-600 dark:text-amber-400">⚠️</span>
            </div>
            <div>
              <h4 className="font-semibold text-amber-800 dark:text-amber-300 mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Important Islamic Guidelines
              </h4>
              <p className="text-amber-700 dark:text-amber-400 text-sm leading-relaxed">
                This AI provides general Islamic guidance based on available knowledge. For serious religious matters,
                <span className="font-semibold"> please consult qualified Islamic scholars</span> and verify information
                with authentic sources like the Quran and authentic Hadith collections.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ SCROLL TO TOP BUTTON */}
      <div
        className={`fixed bottom-8 right-8 z-50 transition-all duration-500 transform ${showScrollToTop
          ? 'translate-y-0 opacity-100 scale-100'
          : 'translate-y-16 opacity-0 scale-75 pointer-events-none'
          }`}
      >
        <button
          onClick={scrollToTop}
          className="group relative p-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-2xl shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-110 active:scale-95"
          aria-label="Scroll to top"
        >
          {/* Animated Background Ring */}
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-2xl blur-sm opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>

          {/* Arrow Icon with Animation */}
          <ArrowUp className="w-6 h-6 relative z-10 transform group-hover:-translate-y-1 transition-transform duration-300" />

          {/* Pulse Effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 opacity-0 group-hover:opacity-20 animate-ping"></div>

          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 px-3 py-1.5 bg-gray-900 dark:bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
            <span className="flex items-center gap-2">
              <Sparkles className="w-3 h-3" />
              Back to Top
            </span>
            {/* Tooltip Arrow */}
            <div className="absolute top-full right-3 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-800"></div>
          </div>
        </button>
      </div>
    </div>
  );
}

export default IslamicAI;
