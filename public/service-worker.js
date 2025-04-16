// MODULE: Authentification & PWA
// RAISON: Configuration du service worker pour le mode hors-ligne
// DÉPENDANCES: manifest.json, utils/pwa.js

const CACHE_NAME = 'innohub-africa-v1';

// Ressources à mettre en cache lors de l'installation du service worker
const STATIC_ASSETS = [
  '/',
  '/auth/login',
  '/auth/register',
  '/auth/profile',
  '/icons/icon-72x72.png',
  '/icons/icon-96x96.png',
  '/icons/icon-128x128.png',
  '/icons/icon-144x144.png',
  '/icons/icon-152x152.png',
  '/icons/icon-192x192.png',
  '/icons/icon-384x384.png',
  '/icons/icon-512x512.png',
  '/placeholders/profile-placeholder.jpg',
  '/manifest.json'
];

// Installation du service worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Mise en cache des ressources statiques');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activation du service worker (nettoyage des anciens caches)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Suppression de l\'ancien cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Stratégie de cache pour les requêtes réseau
// Network first, fallback to cache pour les API
// Cache first, fallback to network pour les actifs statiques
self.addEventListener('fetch', (event) => {
  // Ignorer les requêtes non GET
  if (event.request.method !== 'GET') return;
  
  // Ignorer les requêtes pour l'API analytique
  if (event.request.url.includes('/analytics/')) return;
  
  // URL de la requête
  const requestUrl = new URL(event.request.url);
  
  // Pour les ressources statiques, utiliser Cache First
  if (
    requestUrl.pathname.startsWith('/icons/') ||
    requestUrl.pathname.startsWith('/placeholders/') ||
    requestUrl.pathname === '/manifest.json'
  ) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request).then((response) => {
          // Mettre en cache la nouvelle ressource
          let responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
          return response;
        });
      })
    );
    return;
  }
  
  // Pour les routes de navigation ou les API, utiliser Network First
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Mettre en cache la nouvelle réponse
        let responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        return response;
      })
      .catch(() => {
        // Si réseau inaccessible, essayer le cache
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          
          // Pour les routes de navigation, renvoyer la page hors ligne
          if (event.request.mode === 'navigate') {
            return caches.match('/offline.html');
          }
          
          // Sinon retourner une erreur
          return new Response('Contenu non disponible hors ligne', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({
              'Content-Type': 'text/plain'
            })
          });
        });
      })
  );
});

// Gestion des événements de synchronisation en arrière-plan
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-pending-actions') {
    event.waitUntil(syncPendingActions());
  }
});

// Fonctionnalité de synchronisation en arrière-plan
async function syncPendingActions() {
  try {
    // Récupérer les données stockées en IndexedDB / localStorage
    // Ceci est une simulation - dans une implémentation réelle, cela utiliserait IndexedDB
    const syncQueue = JSON.parse(localStorage.getItem('syncQueue') || '[]');
    
    if (syncQueue.length === 0) {
      return;
    }
    
    // Traiter chaque action en file d'attente
    for (const item of syncQueue) {
      // Envoyer les données au serveur
      await fetch('/api/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });
    }
    
    // Effacer la file d'attente après traitement réussi
    localStorage.removeItem('syncQueue');
    
    // Notifier l'utilisateur que la synchronisation est terminée
    self.registration.showNotification('InnoHub Africa', {
      body: 'Vos modifications ont été synchronisées avec succès.',
      icon: '/icons/icon-192x192.png'
    });
  } catch (error) {
    console.error('[Service Worker] Erreur lors de la synchronisation:', error);
  }
}

// Gestion des notifications push
self.addEventListener('push', (event) => {
  const data = event.data.json();
  
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: '/icons/icon-192x192.png',
      badge: '/icons/icon-72x72.png',
      data: data.data
    })
  );
});

// Action lors du clic sur une notification
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  const urlToOpen = event.notification.data?.url || '/';
  
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((windowClients) => {
      // Si une fenêtre est déjà ouverte, l'utiliser
      for (const client of windowClients) {
        if (client.url === urlToOpen && 'focus' in client) {
          return client.focus();
        }
      }
      // Sinon ouvrir une nouvelle fenêtre
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
}); 