// Firebase Cloud Messaging Service Worker for Islamic Pearls
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmoHK-7eGIY8Ixurfk6Qp-vqKYXsKt470",
  authDomain: "qalam-verse.firebaseapp.com",
  projectId: "qalam-verse",
  storageBucket: "qalam-verse.firebasestorage.app",
  messagingSenderId: "680129300797",
  appId: "1:680129300797:web:b1b327ab064ccfd9f39d54",
  measurementId: "G-JJ8WCQ3FMB"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging and get a reference to the service
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('Received background message: ', payload);

  const notificationTitle = payload.notification.title || '🕌 Qalam Verse - Prayer Time';
  const notificationOptions = {
    body: payload.notification.body || 'Time for prayer',
    icon: '/vite.svg',
    badge: '/vite.svg',
    tag: 'prayer-notification',
    requireInteraction: true,
    actions: [
      {
        action: 'view',
        title: 'View Prayer Times'
      },
      {
        action: 'dismiss',
        title: 'Dismiss'
      }
    ],
    data: {
      url: '/',
      prayer: payload.data?.prayer || 'prayer'
    }
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked: ', event);
  
  event.notification.close();

  if (event.action === 'view') {
    // Open the app when notification is clicked
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Handle notification close
self.addEventListener('notificationclose', (event) => {
  console.log('Notification closed: ', event);
});