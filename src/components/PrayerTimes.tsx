import React, { useState, useEffect } from 'react';
import { Clock, MapPin, Bell, Sun, Sunset } from 'lucide-react';

interface PrayerTime {
  name: string;
  time: string;
  icon: JSX.Element;      // ✔ correct type
  passed: boolean;
}

function PrayerTimes() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [location, setLocation] = useState({ city: 'Your Location', country: '' });
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  /* -------- update clock every second -------- */
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  /* -------- mock prayer data -------- */
  const prayerTimes: PrayerTime[] = [
    { name: 'Fajr',    time: '05:30', icon: <Sun className="w-5 h-5" />,    passed: currentTime.getHours() > 5  || (currentTime.getHours() === 5  && currentTime.getMinutes() >= 30) },
    { name: 'Dhuhr',   time: '12:15', icon: <Sun className="w-5 h-5" />,    passed: currentTime.getHours() > 12 || (currentTime.getHours() === 12 && currentTime.getMinutes() >= 15) },
    { name: 'Asr',     time: '15:45', icon: <Sun className="w-5 h-5" />,    passed: currentTime.getHours() > 15 || (currentTime.getHours() === 15 && currentTime.getMinutes() >= 45) },
    { name: 'Maghrib', time: '18:20', icon: <Sunset className="w-5 h-5" />, passed: currentTime.getHours() > 18 || (currentTime.getHours() === 18 && currentTime.getMinutes() >= 20) },
    { name: 'Isha',    time: '19:45', icon: <Sun className="w-5 h-5" />,    passed: currentTime.getHours() > 19 || (currentTime.getHours() === 19 && currentTime.getMinutes() >= 45) },
  ];

  const getNextPrayer = () => {
    const currentMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();
    for (const prayer of prayerTimes) {
      const [h, m] = prayer.time.split(':').map(Number);
      if (h * 60 + m > currentMinutes) return prayer;
    }
    return prayerTimes[0]; // next day’s Fajr
  };

  const nextPrayer = getNextPrayer();

  const enableNotifications = async (): Promise<void> => {   // ✔ explicit return type
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      setNotificationsEnabled(permission === 'granted');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* ---------- header ---------- */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Prayer Times</h2>
        <p className="text-xl text-emerald-600 dark:text-emerald-400 italic">
          "Pause the world — it's time to connect with the Creator through prayer."
        </p>
      </div>

      {/* ---------- current time & location ---------- */}
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

      {/* ---------- next prayer ---------- */}
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

      {/* ---------- prayer list ---------- */}
      <div className="grid gap-4 mb-6">
        {prayerTimes.map(prayer => (
          <div
            key={prayer.name}
            className={`flex items-center justify-between p-4 rounded-xl transition-all ${
              prayer.passed
                ? 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                : 'bg-white dark:bg-gray-800 shadow-md hover:shadow-lg'
            }`}
          >
            <div className="flex items-center">
              <div
                className={`p-2 rounded-lg mr-4 ${
                  prayer.passed ? 'bg-gray-200 dark:bg-gray-600' : 'bg-emerald-100 dark:bg-emerald-900'
                }`}
              >
                {prayer.icon}         {/* ✔ icon rendered directly */}
              </div>
              <div>
                <h4 className="font-semibold text-lg">{prayer.name}</h4>
                {prayer.passed && <span className="text-sm">✓ Completed</span>}
              </div>
            </div>
            <div className="text-xl font-bold">{prayer.time}</div>
          </div>
        ))}
      </div>

      {/* ---------- notifications ---------- */}
      <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-xl border border-amber-200 dark:border-amber-800">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Bell className="w-5 h-5 text-amber-600 dark:text-amber-400 mr-2" />
            <span className="font-semibold text-amber-800 dark:text-amber-300">
              Prayer Notifications
            </span>
          </div>
          <button
            onClick={enableNotifications}
            disabled={notificationsEnabled}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              notificationsEnabled
                ? 'bg-green-100 text-green-800 cursor-not-allowed'
                : 'bg-amber-600 text-white hover:bg-amber-700'
            }`}
          >
            {notificationsEnabled ? 'Enabled ✓' : 'Enable'}
          </button>
        </div>
        <p className="text-amber-700 dark:text-amber-400 text-sm">
          Get notified 10 minutes before each prayer time so you never miss your connection with Allah.
        </p>
      </div>

      {/* ---------- quote ---------- */}
      <div className="mt-8 text-center">
        <blockquote className="text-lg italic text-gray-600 dark:text-gray-300">
          "Verily, in the remembrance of Allah do hearts find rest." — Quran 13:28
        </blockquote>
      </div>
    </div>
  );
}

export default PrayerTimes;
