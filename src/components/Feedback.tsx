import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Send, MessageCircle, User, Mail, FileText, ArrowLeft, CheckCircle, AlertCircle, Heart, Star, Sparkles } from 'lucide-react';
import emailjs from '@emailjs/browser';

interface FormData {
  name: string;
  email: string;
  message: string;
  feedbackType: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

function Feedback() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
    feedbackType: 'general'
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // EmailJS Configuration
  const EMAILJS_CONFIG = {
    service_id: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'your_service_id_here',
    template_id: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'your_template_id_here',
    public_key: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'your_public_key_here'
  };

  const feedbackTypes = [
    { id: 'general', label: 'General Feedback', icon: '💬', color: 'emerald' },
    { id: 'bug', label: 'Bug Report', icon: '🐛', color: 'red' },
    { id: 'feature', label: 'Feature Request', icon: '✨', color: 'purple' },
    { id: 'content', label: 'Content Issue', icon: '📝', color: 'blue' }
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Feedback message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        feedback_type: formData.feedbackType,
        to_email: 'qalamversehelp@gmail.com',
        reply_to: formData.email
      };

      await emailjs.send(
        EMAILJS_CONFIG.service_id,
        EMAILJS_CONFIG.template_id,
        templateParams,
        EMAILJS_CONFIG.public_key
      );

      setSubmitStatus('success');
      
      setFormData({
        name: '',
        email: '',
        message: '',
        feedbackType: 'general'
      });

      setTimeout(() => {
        navigate('/thankyou');
      }, 2000);

    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4 relative overflow-hidden">
      <Helmet>
        <title>Feedback - Share Your Thoughts | Qalam Verse</title>
        <meta name="description" content="Share your feedback, suggestions, or report issues with Qalam Verse. We value your input to improve our Islamic learning platform." />
        <meta name="keywords" content="Feedback, Contact, Qalam Verse, Suggestions, Report Issues, User Feedback" />
        <link rel="canonical" href="https://sheikhsohail007.github.io/Ummah/#/feedback" />
      </Helmet>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-emerald-200/30 dark:bg-emerald-500/10 rounded-full blur-xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-blue-200/30 dark:bg-blue-500/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-purple-200/30 dark:bg-purple-500/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-32 right-1/4 w-28 h-28 bg-pink-200/30 dark:bg-pink-500/10 rounded-full blur-xl"></div>
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-200 mb-8 p-2 rounded-lg hover:bg-white/80 dark:hover:bg-gray-800/80 backdrop-blur-sm"
        >
          <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
          <span className="font-medium">Back</span>
        </button>

        {/* Main Card */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50 overflow-hidden animate-fade-in">
          
          {/* Header */}
          <div className="relative bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-8 text-white text-center overflow-hidden">
            {/* Background Pattern - Fixed */}
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpolygon points='60 0 60 60 0 60'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }}
            ></div>
            
            <div className="relative z-10">
              <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/20">
                <MessageCircle className="w-10 h-10" />
              </div>
              <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-white to-emerald-100 bg-clip-text">
                We'd love your feedback
              </h1>
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Heart className="w-5 h-5 text-pink-300 animate-pulse" />
                <p className="text-emerald-50 text-lg font-medium">
                  Help us make Qalam Verse even better
                </p>
                <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
              </div>
              <div className="flex items-center justify-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 text-yellow-300 fill-current" />
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="p-8 space-y-8">
            {/* Feedback Type Selection */}
            <div className="space-y-4">
              <label className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300">
                <Sparkles className="w-4 h-4 mr-2 text-purple-500" />
                What kind of feedback do you have?
              </label>
              <div className="grid grid-cols-2 gap-3">
                {feedbackTypes.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, feedbackType: type.id }))}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 text-left group hover:scale-[1.02] ${
                      formData.feedbackType === type.id
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 bg-gray-50/50 dark:bg-gray-700/50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{type.icon}</span>
                      <span className="font-medium text-sm">{type.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <label htmlFor="name" className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300">
                  <User className="w-4 h-4 mr-2 text-emerald-500" />
                  Your Name *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Enter your full name"
                    className={`w-full px-5 py-4 border-2 rounded-xl bg-gray-50/50 dark:bg-gray-700/50 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-0 transition-all duration-200 ${
                      errors.name 
                        ? 'border-red-400 focus:border-red-500' 
                        : focusedField === 'name'
                        ? 'border-emerald-400 bg-emerald-50/50 dark:bg-emerald-900/20'
                        : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                    }`}
                    disabled={isSubmitting}
                  />
                  {focusedField === 'name' && !errors.name && (
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-400/10 to-teal-400/10 pointer-events-none"></div>
                  )}
                </div>
                {errors.name && (
                  <div className="flex items-center space-x-2 text-red-600 dark:text-red-400 text-sm animate-shake">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.name}</span>
                  </div>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300">
                  <Mail className="w-4 h-4 mr-2 text-emerald-500" />
                  Your Email *
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Enter your email address"
                    className={`w-full px-5 py-4 border-2 rounded-xl bg-gray-50/50 dark:bg-gray-700/50 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-0 transition-all duration-200 ${
                      errors.email 
                        ? 'border-red-400 focus:border-red-500' 
                        : focusedField === 'email'
                        ? 'border-emerald-400 bg-emerald-50/50 dark:bg-emerald-900/20'
                        : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                    }`}
                    disabled={isSubmitting}
                  />
                  {focusedField === 'email' && !errors.email && (
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-400/10 to-teal-400/10 pointer-events-none"></div>
                  )}
                </div>
                {errors.email && (
                  <div className="flex items-center space-x-2 text-red-600 dark:text-red-400 text-sm animate-shake">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.email}</span>
                  </div>
                )}
              </div>

              {/* Message Field */}
              <div className="space-y-2">
                <label htmlFor="message" className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300">
                  <FileText className="w-4 h-4 mr-2 text-emerald-500" />
                  Your Feedback *
                </label>
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    rows={6}
                    placeholder="Share your thoughts, suggestions, or report any issues you've encountered..."
                    className={`w-full px-5 py-4 border-2 rounded-xl bg-gray-50/50 dark:bg-gray-700/50 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-0 transition-all duration-200 resize-vertical ${
                      errors.message 
                        ? 'border-red-400 focus:border-red-500' 
                        : focusedField === 'message'
                        ? 'border-emerald-400 bg-emerald-50/50 dark:bg-emerald-900/20'
                        : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                    }`}
                    disabled={isSubmitting}
                  />
                  {focusedField === 'message' && !errors.message && (
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-400/10 to-teal-400/10 pointer-events-none"></div>
                  )}
                </div>
                {errors.message && (
                  <div className="flex items-center space-x-2 text-red-600 dark:text-red-400 text-sm animate-shake">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.message}</span>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="group w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-emerald-600 hover:to-teal-600 focus:ring-4 focus:ring-emerald-200 dark:focus:ring-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] hover:shadow-xl relative overflow-hidden"
              >
                {/* Button Background Animation */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                
                <div className="relative flex items-center justify-center">
                  {isSubmitting ? (
                    <>
                      <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                      <span>Sending your feedback...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-3 group-hover:translate-x-1 transition-transform duration-200" />
                      <span>Send Feedback</span>
                    </>
                  )}
                </div>
              </button>
            </form>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-800 rounded-2xl animate-fade-in backdrop-blur-sm">
                <div className="flex items-center text-green-800 dark:text-green-300 mb-2">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-semibold text-lg">Thank you for your feedback!</span>
                </div>
                <p className="text-green-700 dark:text-green-400 ml-11">
                  Your message has been sent successfully. Redirecting you now...
                </p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="p-6 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 border-2 border-red-200 dark:border-red-800 rounded-2xl animate-fade-in backdrop-blur-sm">
                <div className="flex items-center text-red-800 dark:text-red-300 mb-2">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3">
                    <AlertCircle className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-semibold text-lg">Oops! Something went wrong</span>
                </div>
                <p className="text-red-700 dark:text-red-400 ml-11">
                  Please try again or contact us directly at{' '}
                  <a href="mailto:qalamversehelp@gmail.com" className="underline font-medium hover:text-red-600 dark:hover:text-red-300">
                    qalamversehelp@gmail.com
                  </a>
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-8 py-6 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-700/50 dark:to-gray-800/50 border-t border-gray-200 dark:border-gray-600 backdrop-blur-sm">
            <div className="flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-400">
              <Heart className="w-4 h-4 text-red-400" />
              <p className="text-center font-medium">
                Your feedback helps us improve Qalam Verse for the entire Ummah
              </p>
              <Sparkles className="w-4 h-4 text-yellow-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feedback;
