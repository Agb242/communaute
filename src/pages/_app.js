import '@/styles/globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

// MODULE: Structure → Authentification & PWA
// RAISON: Mise en place du layout global avec en-tête et pied de page
// DÉPENDANCES: components/Header.js, components/Footer.js

export default function App({ Component, pageProps }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
} 