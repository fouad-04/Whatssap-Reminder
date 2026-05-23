// sw.js
self.addEventListener('push', function(event) {
  const data = event.data ? event.data.json() : {};
  const title = data.title || '📱 WhatsApp Reminder';
  const options = {
    body: data.body || 'Check WhatsApp maintenant !',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg', // Icône par défaut
    vibrate: [300, 100, 300, 100, 300],
    requireInteraction: true
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(windowClients => {
      if (windowClients.length > 0) {
        return windowClients[0].focus();
      } else {
        return clients.openWindow('/');
      }
    })
  );
});
