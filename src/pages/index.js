import Head from 'next/head';
import Link from 'next/link';

// MODULE: Authentification & PWA
// RAISON: Page d'accueil servant de point d'entrée principal
// DÉPENDANCES: components/Header.js, components/Footer.js (via _app.js)

export default function Home() {
  return (
    <>
      <Head>
        <title>InnoHub Africa</title>
        <meta name="description" content="Plateforme d'innovation et de collaboration pour l'Afrique" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="bg-gradient-to-b from-gray-50 to-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center text-gray-800">Bienvenue sur InnoHub Africa</h1>
          <p className="text-xl text-center text-gray-600 mb-10 max-w-3xl mx-auto">
            Connectez-vous avec des innovateurs à travers l'Afrique et collaborez sur des projets transformateurs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/auth/login">
              <span className="block text-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-blue-700 transition">
                Se connecter
              </span>
            </Link>
            <Link href="/auth/register">
              <span className="block text-center px-6 py-3 border border-primary text-primary rounded-lg hover:bg-blue-50 transition">
                S'inscrire
              </span>
            </Link>
          </div>
        </div>
      </section>
      
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Découvrez nos fonctionnalités</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Événements & Hackathons</h3>
              <p className="text-gray-600 mb-4">Participez à des événements et hackathons organisés par les universités et entreprises partenaires.</p>
              <Link href="/events">
                <span className="text-primary font-medium hover:underline">En savoir plus</span>
              </Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Défis Techniques</h3>
              <p className="text-gray-600 mb-4">Relevez des défis techniques, démontrez vos compétences et connectez-vous avec des recruteurs.</p>
              <Link href="/challenges">
                <span className="text-primary font-medium hover:underline">En savoir plus</span>
              </Link>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Cours Pratiques</h3>
              <p className="text-gray-600 mb-4">Accédez à des cours pratiques créés par des experts de l'industrie tech africaine.</p>
              <Link href="/courses">
                <span className="text-primary font-medium hover:underline">En savoir plus</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 