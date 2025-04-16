// MODULE: Authentification & PWA
// RAISON: Tests des fonctionnalités PWA et du service worker
// DÉPENDANCES: utils/pwa.js, components/ui/ConnectionStatus.js

import { render, screen, act, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ConnectionStatus from '../components/ui/ConnectionStatus';
import * as pwaUtils from '../utils/pwa';

// Mock des fonctions de pwa.js
jest.mock('../utils/pwa', () => ({
  isOnline: jest.fn(),
  listenToConnectionChanges: jest.fn(),
  registerServiceWorker: jest.fn(),
  isServiceWorkerActive: jest.fn(),
  queueForSync: jest.fn(),
  isContentCached: jest.fn(),
  precacheContent: jest.fn()
}));

describe('Fonctionnalités PWA', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('ConnectionStatus Component', () => {
    test('ne devrait rien afficher quand le statut est en ligne et non visible', () => {
      // Simuler en ligne
      pwaUtils.isOnline.mockReturnValue(true);
      pwaUtils.listenToConnectionChanges.mockImplementation((onlineCallback, offlineCallback) => {
        return () => {}; // fonction de nettoyage
      });

      render(<ConnectionStatus />);
      
      // Le composant ne devrait rien afficher initialement
      expect(screen.queryByText('Connexion rétablie')).not.toBeInTheDocument();
      expect(screen.queryByText('Vous êtes hors ligne')).not.toBeInTheDocument();
    });

    test('devrait afficher "Vous êtes hors ligne" quand hors ligne', () => {
      // Simuler hors ligne
      pwaUtils.isOnline.mockReturnValue(false);
      pwaUtils.listenToConnectionChanges.mockImplementation((onlineCallback, offlineCallback) => {
        // Déclencher le callback hors ligne immédiatement
        setTimeout(() => offlineCallback(), 0);
        return () => {}; // fonction de nettoyage
      });

      render(<ConnectionStatus />);
      
      // Utiliser act pour les mises à jour d'état après le rendu initial
      act(() => {
        jest.runAllTimers();
      });
      
      // Après le changement d'état, le message hors ligne devrait s'afficher
      expect(screen.getByText('Vous êtes hors ligne')).toBeInTheDocument();
    });

    test('devrait disparaître après avoir cliqué sur le bouton de fermeture', () => {
      // Simuler hors ligne
      pwaUtils.isOnline.mockReturnValue(false);
      let offlineCallback;
      pwaUtils.listenToConnectionChanges.mockImplementation((online, offline) => {
        offlineCallback = offline;
        setTimeout(() => offline(), 0);
        return () => {}; // fonction de nettoyage
      });

      render(<ConnectionStatus />);
      
      // Permettre au callback de s'exécuter
      act(() => {
        jest.runAllTimers();
      });
      
      // Vérifier que le message est affiché
      expect(screen.getByText('Vous êtes hors ligne')).toBeInTheDocument();
      
      // Cliquer sur le bouton de fermeture
      fireEvent.click(screen.getByLabelText('Fermer'));
      
      // Le message devrait disparaître
      expect(screen.queryByText('Vous êtes hors ligne')).not.toBeInTheDocument();
    });
  });

  describe('Utils PWA', () => {
    test('registerServiceWorker devrait être appelé correctement', async () => {
      const mockRegistration = { scope: 'https://example.com/' };
      global.navigator.serviceWorker = {
        register: jest.fn().mockResolvedValue(mockRegistration)
      };

      // Rétablir l'implémentation originale pour ce test
      const originalRegisterSW = jest.requireActual('../utils/pwa').registerServiceWorker;
      pwaUtils.registerServiceWorker.mockImplementation(originalRegisterSW);

      const registration = await pwaUtils.registerServiceWorker();
      
      expect(registration).toEqual(mockRegistration);
      expect(global.navigator.serviceWorker.register).toHaveBeenCalledWith('/service-worker.js');
    });

    test('queueForSync devrait stocker les données dans localStorage', () => {
      // Mock de localStorage
      const localStorageMock = {
        getItem: jest.fn().mockReturnValue(JSON.stringify([])),
        setItem: jest.fn()
      };
      
      Object.defineProperty(window, 'localStorage', {
        value: localStorageMock
      });
      
      // Rétablir l'implémentation originale
      const originalQueueForSync = jest.requireActual('../utils/pwa').queueForSync;
      pwaUtils.queueForSync.mockImplementation(originalQueueForSync);

      const action = 'UPDATE_PROFILE';
      const data = { name: 'Nouveau Nom' };
      
      pwaUtils.queueForSync(action, data);
      
      expect(localStorageMock.getItem).toHaveBeenCalledWith('syncQueue');
      expect(localStorageMock.setItem).toHaveBeenCalledWith('syncQueue', expect.any(String));
      
      // Vérifier que les données sont correctement formatées dans le JSON
      const savedData = JSON.parse(localStorageMock.setItem.mock.calls[0][1]);
      expect(savedData[0].action).toBe(action);
      expect(savedData[0].data).toEqual(data);
      expect(savedData[0].timestamp).toBeDefined();
    });

    test('isContentCached devrait vérifier si une URL est en cache', async () => {
      // Simuler la fonction caches.open du navigateur
      const cacheMock = {
        match: jest.fn().mockResolvedValue(new Response('cached content'))
      };
      
      global.caches = {
        open: jest.fn().mockResolvedValue(cacheMock)
      };
      
      // Rétablir l'implémentation originale
      const originalIsContentCached = jest.requireActual('../utils/pwa').isContentCached;
      pwaUtils.isContentCached.mockImplementation(originalIsContentCached);

      const result = await pwaUtils.isContentCached('/test-url');
      
      expect(result).toBe(true);
      expect(global.caches.open).toHaveBeenCalledWith('innohub-africa-v1');
      expect(cacheMock.match).toHaveBeenCalledWith('/test-url');
    });
  });
});

// Configurer jest pour simuler les timers
beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
}); 