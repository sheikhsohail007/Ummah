import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Clock, MapPin, Bell, Sun, Sunset, Settings, TestTube } from 'lucide-react';
import { PrayerNotificationService } from "../service/notificationService";


interface PrayerTime {
  name: string;
  nameArabic: string;
  time: string;
  icon: React.ReactNode;
  passed: boolean;
  type: 'fard' | 'sunnah' | 'nafl';
  description: string;
}

function PrayerTimes() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [location, setLocation] = useState({ city: 'Your Location', country: '' });
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  const [notificationService] = useState(() => PrayerNotificationService.getInstance());
  const [serviceWorkerAvailable, setServiceWorkerAvailable] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Check notification permission on component mount
    if ('Notification' in window) {
      setNotificationPermission(Notification.permission);
      
      // Initialize notification service if permission already granted
      if (Notification.permission === 'granted') {
        initializeNotificationService();
      }
    }

    // Check service worker availability
    setServiceWorkerAvailable(notificationService.isServiceWorkerAvailable());

    return () => clearInterval(timer);
  }, []);

  const initializeNotificationService = async () => {
    const token = notificationService.getFCMToken();
    setFcmToken(token);
    
    if (notificationsEnabled) {
      notificationService.schedulePrayerNotifications(prayerTimes.filter(p => p.type === 'fard'));
    }
  };

  // Prayer times - in a real app, these would be calculated based on location
  const prayerTimes: PrayerTime[] = [
    { 
      name: 'Fajr', 
      nameArabic: 'الفجر',
      time: '05:30', 
      icon: <Sun className="w-5 h-5" />, 
      passed: currentTime.getHours() > 5 || (currentTime.getHours() === 5 && currentTime.getMinutes() >= 30),
      type: 'fard',
      description: 'Dawn prayer - The light that breaks the darkness'
    },
    { 
      name: 'Ishraq', 
      nameArabic: 'الإشراق',
      time: '06:45', 
      icon: <Sun className="w-5 h-5" />, 
      passed: currentTime.getHours() > 6 || (currentTime.getHours() === 6 && currentTime.getMinutes() >= 45),
      type: 'nafl',
      description: 'Sunrise prayer - 15-20 minutes after sunrise'
    },
    { 
      name: 'Doha', 
      nameArabic: 'الضحى',
      time: '09:30', 
      icon: <Sun className="w-5 h-5" />, 
      passed: currentTime.getHours() > 9 || (currentTime.getHours() === 9 && currentTime.getMinutes() >= 30),
      type: 'sunnah',
      description: 'Forenoon prayer - When the sun rises high'
    },
    { 
      name: 'Dhuhr', 
      nameArabic: 'الظهر',
      time: '12:15', 
      icon: <Sun className="w-5 h-5" />, 
      passed: currentTime.getHours() > 12 || (currentTime.getHours() === 12 && currentTime.getMinutes() >= 15),
      type: 'fard',
      description: 'Midday prayer - When the sun reaches its zenith'
    },
    { 
      name: 'Asr', 
      nameArabic: 'العصر',
      time: '15:45', 
      icon: <Sun className="w-5 h-5" />, 
      passed: currentTime.getHours() > 15 || (currentTime.getHours() === 15 && currentTime.getMinutes() >= 45),
      type: 'fard',
      description: 'Afternoon prayer - The golden hour of reflection'
    },
    { 
      name: 'Maghrib', 
      nameArabic: 'المغرب',
      time: '18:20', 
      icon: <Sunset className="w-5 h-5" />, 
      passed: currentTime.getHours() > 18 || (currentTime.getHours() === 18 && currentTime.getMinutes() >= 20),
      type: 'fard',
      description: 'Sunset prayer - As the day surrenders to night'
    },
    { 
      name: 'Isha', 
      nameArabic: 'العشاء',
      time: '19:45', 
      icon: <Sun className="w-5 h-5" />, 
      passed: currentTime.getHours() > 19 || (currentTime.getHours() === 19 && currentTime.getMinutes() >= 45),
      type: 'fard',
      description: 'Night prayer - Finding peace in the darkness'
    },
    { 
      name: 'Tahajjud', 
      nameArabic: 'التهجد',
      time: '03:30', 
      icon: <Sun className="w-5 h-5" />, 
      passed: currentTime.getHours() > 3 || (currentTime.getHours() === 3 && currentTime.getMinutes() >= 30),
      type: 'sunnah',
      description: 'Night vigil prayer - The secret conversation with Allah'
    },
  ];

  const getNextPrayer = () => {
    const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
    
    for (const prayer of prayerTimes) {
      const [hours, minutes] = prayer.time.split(':').map(Number);
      const prayerMinutes = hours * 60 + minutes;
      
      if (prayerMinutes > currentMinutes) {
        return prayer;
      }
    }
    
    return prayerTimes[0]; // Next day's Fajr
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'fard': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'sunnah': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'nafl': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const nextPrayer = getNextPrayer();

  const enableNotifications = async () => {
    try {
      const granted = await notificationService.requestPermission();
      setNotificationPermission(notificationService.getPermissionStatus());
      
      if (granted) {
        setNotificationsEnabled(true);
        await initializeNotificationService();
        
        // Schedule prayer notifications
        const fardPrayers = prayerTimes.filter(prayer => prayer.type === 'fard');
        notificationService.schedulePrayerNotifications(fardPrayers);
        
        // Show test notification
        setTimeout(() => {
          notificationService.sendTestNotification();
        }, 1000);
      } else {
        alert('Please allow notifications to receive prayer reminders');
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      alert('Failed to enable notifications. Please check your browser settings.');
    }
  };

  const disableNotifications = () => {
    setNotificationsEnabled(false);
    notificationService.clearScheduledNotifications();
  };

  const sendTestNotification = () => {
    notificationService.sendTestNotification();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Helmet>
        <title>Prayer Times - Accurate Islamic Prayer Schedule | Qalam Verse</title>
        <meta name="description" content="Get accurate prayer times for Fajr, Dhuhr, Asr, Maghrib, and Isha. Set up prayer notifications and never miss your daily prayers with Islamic Pearls prayer time calculator." />
        <meta name="keywords" content="Prayer Times, Salah Times, Islamic Prayer Schedule, Fajr timing, Dhuhr timing, Asr timing, Maghrib timing, Isha timing, Prayer Notifications, Islamic Calendar, tahajjud timing, dhua namaz timing, awabeein namaz timing, how to pray eid namaz, chast namaz timing" />
        <link rel="canonical" href="https://www.qalamverse.site/prayer-times" />
      </Helmet>

      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
          Prayer Times
        </h2>
        <p className="text-xl text-emerald-600 dark:text-emerald-400 italic">
          "Pause the world — it's time to connect with the Creator through prayer."
        </p>
      </div>

      {/* Current Time and Location */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-6 rounded-xl mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <MapPin className="w-5 h-5 mr-2" />
            <span className="font-medium">{location.city}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            <span className="text-2xl font-bold">
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>
      </div>

      {/* Next Prayer Countdown */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mb-6 border border-emerald-200 dark:border-gray-600">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
            Next Prayer: {nextPrayer.name}
          </h3>
          <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
            {nextPrayer.time}
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            Time remaining until {nextPrayer.name}
          </p>
        </div>
      </div>

      {/* Prayer Times List */}
      <div className="grid gap-4 mb-6">
        {prayerTimes.map((prayer, index) => (
          <div
            key={prayer.name}
            className={`flex items-center justify-between p-4 rounded-xl transition-all ${
              prayer.passed
                ? 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                : 'bg-white dark:bg-gray-800 shadow-md hover:shadow-lg'
            }`}
          >
            <div className="flex items-center">
              <div className={`p-2 rounded-lg mr-4 ${
                prayer.passed 
                  ? 'bg-gray-200 dark:bg-gray-600' 
                  : 'bg-emerald-100 dark:bg-emerald-900'
              }`}>
                {React.cloneElement(prayer.icon, { 
                  className: `w-5 h-5 ${prayer.passed ? 'text-gray-400' : 'text-emerald-600 dark:text-emerald-400'}` 
                })}
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h4 className="font-semibold text-lg">{prayer.name}</h4>
                  <span className="text-sm font-arabic text-gray-600 dark:text-gray-400">
                    {prayer.nameArabic}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(prayer.type)}`}>
                    {prayer.type.charAt(0).toUpperCase() + prayer.type.slice(1)}
                  </span>
                  {prayer.type === 'fard' && notificationsEnabled && (
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-xs font-medium">
                      🔔 Reminder Set
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {prayer.description}
                </p>
                {prayer.passed && (
                  <span className="text-sm text-green-600 dark:text-green-400">✓ Completed</span>
                )}
              </div>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold">
                {prayer.time}
              </div>
              {prayer.name === 'Tahajjud' && (
                <div className="text-xs text-purple-600 dark:text-purple-400">
                  Last third of night
                </div>
              )}
              {prayer.name === 'Doha' && (
                <div className="text-xs text-amber-600 dark:text-amber-400">
                  2-8 Rakah
                </div>
              )}
              {prayer.name === 'Ishraq' && (
                <div className="text-xs text-orange-600 dark:text-orange-400">
                  2-4 Rakah
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Prayer Categories */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl border border-red-200 dark:border-red-800">
          <div className="flex items-center mb-2">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
            <h4 className="font-semibold text-red-800 dark:text-red-300">Fard (Obligatory)</h4>
          </div>
          <p className="text-red-700 dark:text-red-400 text-sm">
            The five daily prayers that are mandatory for every Muslim
          </p>
          {notificationsEnabled && (
            <p className="text-red-600 dark:text-red-300 text-xs mt-2 font-medium">
              🔔 10-minute reminders enabled
            </p>
          )}
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border border-green-200 dark:border-green-800">
          <div className="flex items-center mb-2">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <h4 className="font-semibold text-green-800 dark:text-green-300">Sunnah (Recommended)</h4>
          </div>
          <p className="text-green-700 dark:text-green-400 text-sm">
            Prayers performed by Prophet Muhammad (PBUH) - highly rewarded
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800">
          <div className="flex items-center mb-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
            <h4 className="font-semibold text-blue-800 dark:text-blue-300">Nafl (Voluntary)</h4>
          </div>
          <p className="text-blue-700 dark:text-blue-400 text-sm">
            Additional prayers for extra spiritual benefit and closeness to Allah
          </p>
        </div>
      </div>

      {/* Special Prayer Information */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 p-6 rounded-xl border border-purple-200 dark:border-purple-800 mb-6">
        <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-300 mb-4">
          Special Prayer Times
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <h4 className="font-medium text-purple-700 dark:text-purple-400 mb-2">Tahajjud</h4>
            <p className="text-purple-600 dark:text-purple-400 text-sm">
              The night prayer performed in the last third of the night. Prophet (PBUH) said: "The closest that a servant comes to his Lord is during the middle of the latter portion of the night."
            </p>
          </div>
          <div>
            <h4 className="font-medium text-purple-700 dark:text-purple-400 mb-2">Doha (Chasht)</h4>
            <p className="text-purple-600 dark:text-purple-400 text-sm">
              The forenoon prayer performed when the sun rises high. It brings sustenance and blessings. Best time is when 1/4 of the day has passed.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-purple-700 dark:text-purple-400 mb-2">Ishraq</h4>
            <p className="text-purple-600 dark:text-purple-400 text-sm">
              Performed 15-20 minutes after sunrise. Prophet (PBUH) said whoever prays Fajr in congregation then sits remembering Allah until sunrise, then prays 2 rakah, gets the reward of Hajj and Umrah.
            </p>
          </div>
        </div>
      </div>

      {/* Prayer Benefits */}
      <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-xl border border-amber-200 dark:border-amber-800 mb-6">
        <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-300 mb-4">
          Benefits of Additional Prayers
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-start">
              <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3"></div>
              <p className="text-amber-700 dark:text-amber-400 text-sm">
                <strong>Tahajjud:</strong> Brings you closer to Allah, increases sustenance, and purifies the soul
              </p>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3"></div>
              <p className="text-amber-700 dark:text-amber-400 text-sm">
                <strong>Doha:</strong> Ensures daily sustenance and brings barakah in your work
              </p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-start">
              <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3"></div>
              <p className="text-amber-700 dark:text-amber-400 text-sm">
                <strong>Ishraq:</strong> Equivalent to the reward of Hajj and Umrah when performed correctly
              </p>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3"></div>
              <p className="text-amber-700 dark:text-amber-400 text-sm">
                <strong>All Sunnah:</strong> Compensate for deficiencies in obligatory prayers
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-emerald-50 dark:bg-emerald-900/20 p-6 rounded-xl border border-emerald-200 dark:border-emerald-800 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Bell className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mr-2" />
            <span className="font-semibold text-emerald-800 dark:text-emerald-300">
              Prayer Notifications
            </span>
          </div>
          <div className="flex gap-2">
            {!notificationsEnabled ? (
              <button
                onClick={enableNotifications}
                className="px-4 py-2 bg-emerald-600 text-white rounded-md font-medium hover:bg-emerald-700 transition-colors"
              >
                Enable Notifications
              </button>
            ) : (
              <div className="flex gap-2">
                <span className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-md font-medium">
                  ✓ Enabled ({notificationService.getScheduledNotificationsCount()} scheduled)
                </span>
                <button
                  onClick={sendTestNotification}
                  className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-md font-medium hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors flex items-center"
                >
                  <TestTube className="w-4 h-4 mr-1" />
                  Test
                </button>
                <button
                  onClick={disableNotifications}
                  className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-md font-medium hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                >
                  Disable
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-emerald-700 dark:text-emerald-400 text-sm">
            Get notified 10 minutes before each Fard prayer using Firebase Cloud Messaging. Works even when the website is closed!
          </p>
          {notificationsEnabled && (
            <div className="bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-lg">
              <p className="text-emerald-800 dark:text-emerald-300 text-sm font-medium">
                🔔 FCM Notifications Active: Fajr, Dhuhr, Asr, Maghrib, Isha
              </p>
              <p className="text-emerald-700 dark:text-emerald-400 text-xs mt-1">
                Notifications will appear 10 minutes before each prayer time, even if the website is closed
              </p>
              {fcmToken && (
                <p className="text-emerald-600 dark:text-emerald-500 text-xs mt-1">
                  FCM Token: {fcmToken.substring(0, 20)}...
                </p>
              )}
            </div>
          )}
          {notificationPermission === 'denied' && (
            <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-lg">
              <p className="text-red-800 dark:text-red-300 text-sm font-medium">
                ⚠️ Notifications are blocked. Please enable them in your browser settings.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* FCM Information */}
      {notificationsEnabled && (
        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-200 dark:border-blue-800 mb-6">
          <div className="flex items-center mb-3">
            <Settings className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
            <h3 className="font-semibold text-blue-800 dark:text-blue-300">
              Firebase Cloud Messaging Status
            </h3>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-blue-700 dark:text-blue-400">Permission Status:</span>
              <span className={`font-medium ${
                notificationPermission === 'granted' 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {notificationPermission}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-700 dark:text-blue-400">FCM Token:</span>
              <span className="text-blue-600 dark:text-blue-300 font-mono">
                {fcmToken ? 'Connected ✓' : 'Not Available ✗'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-700 dark:text-blue-400">Scheduled Notifications:</span>
              <span className="text-blue-600 dark:text-blue-300 font-medium">
                {notificationService.getScheduledNotificationsCount()} active
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Service Worker Status Warning */}
      {!serviceWorkerAvailable && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-xl border border-yellow-200 dark:border-yellow-800 mb-6">
          <div className="flex items-center mb-3">
            <Settings className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-2" />
            <h3 className="font-semibold text-yellow-800 dark:text-yellow-300">
              Environment Limitation
            </h3>
          </div>
          <div className="space-y-2 text-sm">
            <p className="text-yellow-700 dark:text-yellow-400">
              ⚠️ <strong>Background notifications are not available</strong> in this development environment.
            </p>
            <p className="text-yellow-600 dark:text-yellow-500">
              Service Workers are not supported in StackBlitz. Background notifications will work when deployed to a live server.
            </p>
            <p className="text-yellow-600 dark:text-yellow-500">
              <strong>What works:</strong> Foreground notifications (when website is open) may still function.
            </p>
          </div>
        </div>
      )}

      {/* Notification Features */}
      <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-xl border border-purple-200 dark:border-purple-800">
        <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-300 mb-4">
          🔔 Advanced Notification Features
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-start">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3"></div>
              <p className="text-purple-700 dark:text-purple-400 text-sm">
                <strong>Background Notifications:</strong> Receive alerts even when the website is closed
              </p>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3"></div>
              <p className="text-purple-700 dark:text-purple-400 text-sm">
                <strong>10-Minute Warning:</strong> Get notified exactly 10 minutes before each prayer
              </p>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3"></div>
              <p className="text-purple-700 dark:text-purple-400 text-sm">
                <strong>Islamic Themed:</strong> Beautiful, respectful notification messages
              </p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-start">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3"></div>
              <p className="text-purple-700 dark:text-purple-400 text-sm">
                <strong>Cross-Platform:</strong> Works on desktop and mobile browsers
              </p>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3"></div>
              <p className="text-purple-700 dark:text-purple-400 text-sm">
                <strong>Secure & Private:</strong> Firebase Cloud Messaging with encrypted tokens
              </p>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3"></div>
              <p className="text-purple-700 dark:text-purple-400 text-sm">
                <strong>Auto-Scheduling:</strong> Automatically schedules all 5 daily prayers
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Islamic Quote */}
      <div className="mt-8 text-center">
        <blockquote className="text-lg italic text-gray-600 dark:text-gray-300 mb-2">
          "And establish prayer and give zakah and bow with those who bow."
        </blockquote>
        <cite className="text-gray-500 dark:text-gray-400">- Quran 2:43</cite>
      </div>

      <div className="mt-6 text-center">
        <blockquote className="text-base italic text-gray-600 dark:text-gray-300">
          "The two rak'ahs before the dawn (Fajr) prayer are better than this world and all it contains." - Prophet Muhammad (PBUH)
        </blockquote>
      </div>
    </div>
  );
}

export default PrayerTimes;