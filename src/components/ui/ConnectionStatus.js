// MODULE: Authentification & PWA
// RAISON: Composant UI affichant l'état de la connexion
// DÉPENDANCES: utils/pwa.js

import { useState, useEffect } from 'react';
import { isOnline, listenToConnectionChanges } from '../../utils/pwa';

const ConnectionStatus = ({ className = '' }) => {
  const [online, setOnline] = useState(true);
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // État initial
    setOnline(isOnline());
    
    // Écouter les changements d'état de connexion
    const cleanup = listenToConnectionChanges(
      // Callback en ligne
      () => {
        setOnline(true);
        setVisible(true);
        // Masquer automatiquement après 3 secondes
        setTimeout(() => setVisible(false), 3000);
      },
      // Callback hors ligne
      () => {
        setOnline(false);
        setVisible(true);
        setDismissed(false);
      }
    );
    
    return cleanup;
  }, []);
  
  // Ne rien afficher si l'indicateur n'est pas visible ou a été fermé
  if (!visible || dismissed) {
    return null;
  }
  
  return (
    <div 
      className={`fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 p-4 rounded-lg shadow-lg transition-all duration-300 ${
        online 
          ? 'bg-green-50 text-green-800 border border-green-200' 
          : 'bg-red-50 text-red-800 border border-red-200'
      } ${className}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span 
            className={`inline-block w-3 h-3 rounded-full mr-2 ${
              online ? 'bg-green-500' : 'bg-red-500'
            }`}
          />
          <span className="font-medium">
            {online ? 'Connexion rétablie' : 'Vous êtes hors ligne'}
          </span>
        </div>
        <button 
          onClick={() => setDismissed(true)}
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
          aria-label="Fermer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      {!online && (
        <p className="mt-2 text-sm">
          Certaines fonctionnalités peuvent être limitées. Le contenu mis en cache reste accessible.
        </p>
      )}
    </div>
  );
};

export default ConnectionStatus; 