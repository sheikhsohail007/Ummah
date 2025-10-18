import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Send, Bot, User, Loader2, Sparkles, Heart, Image as ImageIcon } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  image?: string; // Optional image preview
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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize Gemini
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

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

  // ✅ Generate AI Response (text + image)
  const generateResponse = async (userMessage: string, imageFile?: File): Promise<string> => {
    try {
      const model = genAI.getGenerativeModel({ model: 'models/gemini-2.5-pro' });

      const islamicContext = `
You are an Islamic AI assistant for "Qalam Verse".
Respond with Quranic and Hadith-based guidance, be humble and accurate.
Always begin with Islamic greetings when suitable.
If asked about non-Islamic topics, gently redirect to Islamic teachings.
      `;

      let parts: any[] = [{ text: `${islamicContext}\nUser question: ${userMessage}` }];

      if (imageFile) {
        const base64 = await fileToBase64(imageFile);
        parts.push({
          inline_data: {
            mime_type: imageFile.type,
            data: base64.split(',')[1],
          },
        });
      }

      const result = await model.generateContent({
        contents: [{ role: 'user', parts }],
      });

      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error generating AI response:', error);
      throw new Error('Failed to get response from Islamic AI. Please try again.');
    }
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
    <div className="max-w-4xl mx-auto">
      <Helmet>
        <title>Islamic AI - AI-Powered Islamic Guidance | Qalam Verse</title>
      </Helmet>

      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mr-4">
            <Bot className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Islamic AI</h2>
        </div>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Your AI-powered Islamic companion for spiritual guidance, Quranic wisdom, and authentic
          Islamic knowledge
        </p>
      </div>

      {/* Chat Box */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-600 overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-4 text-white">
          <h3 className="font-semibold">Islamic AI Assistant</h3>
          <p className="text-emerald-100 text-sm">Always here for Islamic guidance</p>
        </div>

        <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900/50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start space-x-3 animate-fade-in ${msg.isUser ? 'flex-row-reverse space-x-reverse' : ''
                }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.isUser
                    ? 'bg-blue-500'
                    : 'bg-gradient-to-r from-emerald-500 to-teal-500'
                  }`}
              >
                {msg.isUser ? (
                  <User className="w-4 h-4 text-white" />
                ) : (
                  <Bot className="w-4 h-4 text-white" />
                )}
              </div>

              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${msg.isUser
                    ? 'bg-blue-500 text-white ml-auto'
                    : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-600'
                  }`}
              >
                {msg.image && (
                  <img
                    src={msg.image}
                    alt="uploaded"
                    className="rounded-lg mb-2 max-h-40 object-contain"
                  />
                )}
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                <p
                  className={`text-xs mt-1 ${msg.isUser ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                    }`}
                >
                  {formatTime(msg.timestamp)}
                </p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start space-x-3 animate-fade-in">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-2xl px-4 py-2">
                <div className="flex items-center space-x-2">
                  <Loader2 className="w-4 h-4 animate-spin text-emerald-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Thinking...</span>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
              <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800">
          <div className="flex items-center space-x-3">
            <label className="cursor-pointer p-3 bg-gray-100 dark:bg-gray-700 rounded-xl hover:bg-gray-200 transition">
              <ImageIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              <input type="file" accept="image/*" hidden onChange={handleImageSelect} />
            </label>

            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about Islam, Quran, or Hadith..."
                className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                disabled={isLoading}
              />
            </div>

            <button
              onClick={handleSendMessage}
              disabled={(!inputText.trim() && !selectedImage) || isLoading}
              className="p-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:from-emerald-600 hover:to-teal-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </button>
          </div>

          {imagePreview && (
            <div className="mt-3 flex items-center space-x-2">
              <img src={imagePreview} alt="preview" className="w-16 h-16 rounded-lg object-cover" />
              <button
                onClick={() => {
                  setSelectedImage(null);
                  setImagePreview(null);
                }}
                className="text-red-500 text-sm"
              >
                Remove
              </button>
            </div>
          )}

          <div className="flex items-center justify-between mt-3 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center">
              <Sparkles className="w-3 h-3 mr-1" />
              <span>Powered by QalamVerse</span>
            </div>
            <div className="flex items-center">
              <Heart className="w-3 h-3 mr-1 text-red-400" />
              <span>Inspired by Faith & Knowledge</span>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
        <div className="flex items-start">
          <div className="w-5 h-5 text-amber-500 mt-0.5 mr-3 flex-shrink-0">⚠️</div>
          <div>
            <h4 className="font-medium text-amber-800 dark:text-amber-300 mb-1">Important Note</h4>
            <p className="text-amber-700 dark:text-amber-400 text-sm leading-relaxed">
              This AI assistant provides general Islamic guidance based on available knowledge. For
              serious religious matters, please consult qualified Islamic scholars and verify
              information with authentic sources.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IslamicAI;
