// Prayer Time Notification Service for Islamic Pearls
import { getFCMToken, onMessageListener } from './firebase';

export interface PrayerTime {
  name: string;
  nameArabic: string;
  time: string;
  type: 'fard' | 'sunnah' | 'nafl';
}

export class PrayerNotificationService {
  private static instance: PrayerNotificationService;
  private notificationPermission: NotificationPermission = 'default';
  private fcmToken: string | null = null;
  private scheduledNotifications: Map<string, number> = new Map();
  private serviceWorkerAvailable: boolean = false;

  private constructor() {
    this.initializeService();
  }

  public static getInstance(): PrayerNotificationService {
    if (!PrayerNotificationService.instance) {
      PrayerNotificationService.instance = new PrayerNotificationService();
    }
    return PrayerNotificationService.instance;
  }

  private async initializeService() {
    // Check if service worker is supported
    if ('serviceWorker' in navigator) {
      try {
        await navigator.serviceWorker.register('/firebase-messaging-sw.js');
        this.serviceWorkerAvailable = true;
        console.log('Service Worker registered successfully');
      } catch (error) {
        this.serviceWorkerAvailable = false;
        console.error('Service Worker registration failed:', error);
      }
    } else {
      this.serviceWorkerAvailable = false;
      console.warn('Service Workers are not supported in this environment');
    }

    // Listen for foreground messages
    this.setupForegroundMessageListener();
  }

  private setupForegroundMessageListener() {
    onMessageListener()
      .then((payload: any) => {
        console.log('Received foreground message:', payload);
        this.showLocalNotification(
          payload.notification?.title || '🕌 Prayer Time',
          payload.notification?.body || 'Time for prayer',
          payload.data?.prayer || 'prayer'
        );
      })
      .catch((error) => console.error('Error listening for messages:', error));
  }

  public async requestPermission(): Promise<boolean> {
    if (!('Notification' in window)) {
      console.error('This browser does not support notifications');
      return false;
    }

    try {
      this.notificationPermission = await Notification.requestPermission();
      
      if (this.notificationPermission === 'granted') {
        // Get FCM token
        this.fcmToken = await getFCMToken();
        console.log('Notification permission granted');
        return true;
      } else {
        console.log('Notification permission denied');
        return false;
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return false;
    }
  }

  public getPermissionStatus(): NotificationPermission {
    return this.notificationPermission;
  }

  public getFCMToken(): string | null {
    return this.fcmToken;
  }

  public isServiceWorkerAvailable(): boolean {
    return this.serviceWorkerAvailable;
  }

  private showLocalNotification(title: string, body: string, prayer: string) {
    if (this.notificationPermission !== 'granted') return;

    const notification = new Notification(title, {
      body,
      icon: '/vite.svg',
      badge: '/vite.svg',
      tag: `prayer-${prayer}`,
      requireInteraction: true,
      silent: false
    });

    notification.onclick = () => {
      window.focus();
      notification.close();
    };

    // Auto close after 10 seconds
    setTimeout(() => {
      notification.close();
    }, 10000);
  }

  public schedulePrayerNotifications(prayerTimes: PrayerTime[]) {
    // Clear existing scheduled notifications
    this.clearScheduledNotifications();

    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    prayerTimes.forEach((prayer) => {
      if (prayer.type === 'fard') { // Only schedule for obligatory prayers
        const [hours, minutes] = prayer.time.split(':').map(Number);
        const prayerTimeInMinutes = hours * 60 + minutes;
        
        // Schedule notification 10 minutes before prayer
        const notificationTime = prayerTimeInMinutes - 10;
        
        let timeUntilNotification = (notificationTime - currentTime) * 60 * 1000; // Convert to milliseconds
        
        // If notification time has passed today, schedule for tomorrow
        if (timeUntilNotification <= 0) {
          timeUntilNotification += 24 * 60 * 60 * 1000; // Add 24 hours
        }

        const timeoutId = setTimeout(() => {
          this.sendPrayerNotification(prayer);
        }, timeUntilNotification);

        this.scheduledNotifications.set(prayer.name, timeoutId);
        
        console.log(`Scheduled ${prayer.name} notification in ${Math.round(timeUntilNotification / 1000 / 60)} minutes`);
      }
    });
  }

  private sendPrayerNotification(prayer: PrayerTime) {
    const title = `🕌 Islamic Pearls - ${prayer.name} Prayer`;
    const body = `It's time to prepare for ${prayer.name} prayer (${prayer.nameArabic}). Prayer time is at ${prayer.time}.`;
    
    this.showLocalNotification(title, body, prayer.name.toLowerCase());
    
    // Play notification sound (optional)
    this.playNotificationSound();
  }

  private playNotificationSound() {
    try {
      // Create a subtle notification sound
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    } catch (error) {
      console.log('Could not play notification sound:', error);
    }
  }

  public clearScheduledNotifications() {
    this.scheduledNotifications.forEach((timeoutId) => {
      clearTimeout(timeoutId);
    });
    this.scheduledNotifications.clear();
  }

  public getScheduledNotificationsCount(): number {
    return this.scheduledNotifications.size;
  }

  // Test notification function
  public sendTestNotification() {
    if (this.notificationPermission === 'granted') {
      this.showLocalNotification(
        '🕌 Qalam Verse - Test Notification',
        'This is a test notification. Your prayer notifications are working correctly!',
        'test'
      );
    }
  }
}