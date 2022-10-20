importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
 importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

 // Initialize the Firebase app in the service worker by passing the generated config
 const firebaseConfig = {
    apiKey: "AIzaSyBkg5rrqmC7kV4DK-Og_wk2tCR5uLrCwGk",
    authDomain: "parking-4292e.firebaseapp.com",
    projectId: "parking-4292e",
    storageBucket: "parking-4292e.appspot.com",
    messagingSenderId: "460591389535",
    appId: "1:460591389535:web:90a4e9d6bf112f644f74ea",
    measurementId: "G-1W0Z34FJW2"
  };

 firebase.initializeApp(firebaseConfig);

 // Retrieve firebase messaging
 const messaging = firebase.messaging();

 messaging.onBackgroundMessage(function(payload) {
   console.log("Received background message ", payload);

   const notificationTitle = payload.notification.title;
   const notificationOptions = {
     body: payload.notification.body,
   };

   self.registration.showNotification(notificationTitle, notificationOptions);
 });