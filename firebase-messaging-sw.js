// Background Service Worker for Firebase Cloud Messaging
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker context
firebase.initializeApp({
  apiKey: "AIzaSyBMvJ-gu9X_6hSHl0kMyhQg3iJjmDIKJoI",
  authDomain: "connect-firebase2005.firebaseapp.com",
  projectId: "connect-firebase2005",
  storageBucket: "connect-firebase2005.firebasestorage.app",
  messagingSenderId: "427592900853",
  appId: "1:427592900853:web:6a3eebee6cf6f3450de5bc"
});

// Retrieve an instance of Firebase Cloud Messaging
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  const notificationTitle = payload.notification?.title || 'MicroConnect Notification';
  const notificationOptions = {
    body: payload.notification?.body || 'You have a new notification!',
    icon: payload.notification?.icon || 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 100" fill="none"><circle cx="48" cy="30" r="16" fill="%23ff5e36"/><path d="M 22 75 C 22 52, 34 46, 52 46 C 66 46, 78 52, 78 75 Z" fill="%23ff5e36"/></svg>'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
