import '@/styles/globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ConnectionStatus from '../components/ui/ConnectionStatus';
import { useEffect } from 'react';
import { registerServiceWorker, isServiceWorkerActive } from '../utils/pwa';

// MODULE: Structure → Authentification & PWA
// RAISON: Mise en place du layout global avec en-tête et pied de page
// DÉPENDANCES: components/Header.js, components/Footer.js, components/ui/ConnectionStatus.js, utils/pwa.js

export default function App({ Component, pageProps }) {
  // Enregistrement du service worker
  useEffect(() => {
    const initServiceWorker = async () => {
      // Vérifier si le service worker est déjà actif
      const isActive = await isServiceWorkerActive();
      
      if (!isActive) {
        // Enregistrer le service worker
        const registration = await registerServiceWorker();
        if (registration) {
          console.log('Service Worker enregistré avec succès');
        }
      }
    };
    
    // Enregistrer le service worker uniquement côté client
    if (typeof window !== 'undefined') {
      initServiceWorker();
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Component {...pageProps} />
      </main>
      <Footer />
      
      {/* Indicateur de statut de connexion */}
      <ConnectionStatus />
    </div>
  );
} 