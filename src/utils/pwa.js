// MODULE: Authentification & PWA
// RAISON: Utilitaire de gestion des fonctionnalités PWA
// DÉPENDANCES: Service worker, manifest.json

/**
 * Vérifie si l'application est installée comme PWA
 */
export const isPWA = () => {
  if (typeof window !== 'undefined') {
    return window.matchMedia('(display-mode: standalone)').matches ||
           window.navigator.standalone || // Pour iOS
           document.referrer.includes('android-app://');
  }
  return false;
};

/**
 * Vérifie si le navigateur supporte l'installation de PWA
 */
export const isPWASupported = () => {
  if (typeof window !== 'undefined') {
    return 'serviceWorker' in navigator && 
           'PushManager' in window &&
           window.BeforeInstallPromptEvent !== undefined;
  }
  return false;
};

/**
 * Vérifie si l'utilisateur est en ligne
 */
export const isOnline = () => {
  if (typeof window !== 'undefined') {
    return navigator.onLine;
  }
  return true; // Supposer en ligne par défaut côté serveur
};

/**
 * Vérifie si le contenu est mis en cache et disponible hors ligne
 */
export const isContentCached = async (url) => {
  if (typeof window === 'undefined' || !('caches' in window)) {
    return false;
  }
  
  try {
    const cache = await caches.open('innohub-africa-v1');
    const cachedResponse = await cache.match(url);
    return cachedResponse !== undefined;
  } catch (error) {
    console.error('Erreur lors de la vérification du cache:', error);
    return false;
  }
};

/**
 * Écoute les changements d'état de connexion
 */
export const listenToConnectionChanges = (onlineCallback, offlineCallback) => {
  if (typeof window !== 'undefined') {
    window.addEventListener('online', onlineCallback);
    window.addEventListener('offline', offlineCallback);
    
    return () => {
      window.removeEventListener('online', onlineCallback);
      window.removeEventListener('offline', offlineCallback);
    };
  }
  return () => {}; // Fonction noop pour le SSR
};

/**
 * Enregistre le service worker
 */
export const registerServiceWorker = async () => {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/service-worker.js');
      console.log('Service Worker enregistré avec succès:', registration.scope);
      return registration;
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement du Service Worker:', error);
      return null;
    }
  }
  return null;
};

/**
 * Demande l'autorisation pour les notifications push
 */
export const requestPushPermission = async () => {
  if (typeof window !== 'undefined' && 'Notification' in window) {
    try {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    } catch (error) {
      console.error('Erreur lors de la demande d\'autorisation de notification:', error);
      return false;
    }
  }
  return false;
};

/**
 * Met en file d'attente une action pour synchronisation différée
 * Pour les actions effectuées hors ligne
 */
export const queueForSync = (action, data) => {
  if (typeof window !== 'undefined') {
    // Dans une application réelle, cela utiliserait IndexedDB ou localStorage
    const syncQueue = JSON.parse(localStorage.getItem('syncQueue') || '[]');
    syncQueue.push({
      action,
      data,
      timestamp: Date.now()
    });
    localStorage.setItem('syncQueue', JSON.stringify(syncQueue));
    
    // Déclencher la synchronisation en arrière-plan si possible
    if ('serviceWorker' in navigator && 'SyncManager' in window) {
      navigator.serviceWorker.ready.then(registration => {
        registration.sync.register('sync-pending-actions').catch(err => {
          console.error('Erreur lors de l\'enregistrement de la synchronisation:', err);
        });
      });
    }
    
    return true;
  }
  return false;
};

/**
 * Récupère la file d'attente de synchronisation
 */
export const getSyncQueue = () => {
  if (typeof window !== 'undefined') {
    return JSON.parse(localStorage.getItem('syncQueue') || '[]');
  }
  return [];
};

/**
 * Simule la synchronisation des données mises en file d'attente
 */
export const processSyncQueue = async () => {
  if (!isOnline()) {
    return false;
  }
  
  const queue = getSyncQueue();
  if (queue.length === 0) {
    return true;
  }
  
  // Traitement des actions en file d'attente
  // Dans une application réelle, cela enverrait les données au serveur
  console.log('Traitement de la file de synchronisation:', queue);
  
  // Supprimer la file d'attente après traitement
  localStorage.removeItem('syncQueue');
  return true;
};

/**
 * Précharge le contenu pour l'accès hors ligne
 */
export const precacheContent = async (urls) => {
  if (typeof window === 'undefined' || !('caches' in window)) {
    return false;
  }
  
  try {
    const cache = await caches.open('innohub-africa-v1');
    await cache.addAll(urls);
    return true;
  } catch (error) {
    console.error('Erreur lors de la mise en cache du contenu:', error);
    return false;
  }
};

/**
 * Vérifie si le service worker est actif
 */
export const isServiceWorkerActive = async () => {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return false;
  }
  
  try {
    const registration = await navigator.serviceWorker.getRegistration();
    return registration !== undefined && (registration.active !== null);
  } catch (error) {
    console.error('Erreur lors de la vérification du service worker:', error);
    return false;
  }
}; 