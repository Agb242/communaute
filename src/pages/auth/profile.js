import Head from 'next/head';
import { useState } from 'react';

// MODULE: Authentification & PWA
// RAISON: Implémentation de la page de profil utilisateur
// DÉPENDANCES: components/Header.js, components/Footer.js (via _app.js)
// ÉTAT PRÉCÉDENT: Pages de connexion et d'inscription opérationnelles

export default function Profile() {
  // Données utilisateur simulées - dans une version réelle, ces données
  // seraient chargées depuis une API ou un contexte d'authentification
  const [user, setUser] = useState({
    firstName: 'Kofi',
    lastName: 'Anan',
    email: 'kofi.anan@example.com',
    userType: 'student',
    bio: 'Étudiant en informatique passionné par le développement web et l\'intelligence artificielle.',
    skills: ['JavaScript', 'React', 'Node.js', 'Python'],
    university: 'Université de Accra',
    location: 'Accra, Ghana',
    githubUrl: 'https://github.com/kofian',
    linkedinUrl: 'https://linkedin.com/in/kofian',
    profilePictureUrl: '/placeholders/profile-placeholder.jpg',
  });

  const [formData, setFormData] = useState({
    ...user
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [skillInput, setSkillInput] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleAddSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, skillInput.trim()]
      });
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(skill => skill !== skillToRemove)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Dans une version future, appel à l'API pour mettre à jour le profil
      console.log('Mise à jour du profil avec les données:', formData);
      
      // Simuler un délai pour la démo
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mise à jour locale du profil
      setUser(formData);
      setIsEditing(false);
      setMessage({ 
        type: 'success', 
        text: 'Profil mis à jour avec succès!' 
      });
      
      // Effacer le message après 3 secondes
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (err) {
      setMessage({ 
        type: 'error', 
        text: 'Une erreur est survenue lors de la mise à jour du profil.' 
      });
      console.error('Erreur de mise à jour du profil:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Mon Profil | InnoHub Africa</title>
        <meta name="description" content="Gérez votre profil sur InnoHub Africa" />
      </Head>
      <div className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            {/* En-tête du profil */}
            <div className="bg-gradient-to-r from-primary to-primary-dark p-6 sm:p-8 text-white">
              <div className="flex flex-col sm:flex-row items-center">
                <div className="h-24 w-24 rounded-full overflow-hidden border-4 border-white bg-white shadow-md mb-4 sm:mb-0 sm:mr-6">
                  <img 
                    src={formData.profilePictureUrl || '/placeholders/profile-placeholder.jpg'} 
                    alt={`${formData.firstName} ${formData.lastName}`}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.target.src = '/placeholders/profile-placeholder.jpg';
                    }}
                  />
                </div>
                <div className="text-center sm:text-left">
                  <h1 className="text-2xl font-bold">{formData.firstName} {formData.lastName}</h1>
                  <p className="text-blue-100">{formData.userType === 'student' ? 'Étudiant' : 
                                       formData.userType === 'mentor' ? 'Mentor' : 
                                       formData.userType === 'university' ? 'Représentant universitaire' : 
                                       'Représentant d\'entreprise'}</p>
                  <p className="text-blue-100 mt-1">{formData.university || formData.location}</p>
                </div>
                <div className="ml-auto mt-4 sm:mt-0">
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="px-4 py-2 bg-white text-primary font-medium rounded-md hover:bg-blue-50 transition-colors"
                  >
                    {isEditing ? 'Annuler' : 'Modifier le profil'}
                  </button>
                </div>
              </div>
            </div>

            {/* Affichage du message de succès ou d'erreur */}
            {message.text && (
              <div className={`p-4 ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                {message.text}
              </div>
            )}

            {/* Contenu du profil */}
            <div className="p-6">
              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                        Prénom
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                        Nom
                      </label>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                      disabled
                    />
                    <p className="mt-1 text-sm text-gray-500">L'email ne peut pas être modifié</p>
                  </div>

                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                      Biographie
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      rows={4}
                      value={formData.bio}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="university" className="block text-sm font-medium text-gray-700 mb-1">
                        Université / Organisation
                      </label>
                      <input
                        id="university"
                        name="university"
                        type="text"
                        value={formData.university}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                      />
                    </div>
                    <div>
                      <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                        Localisation
                      </label>
                      <input
                        id="location"
                        name="location"
                        type="text"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Compétences
                    </label>
                    <div className="flex space-x-2 mb-2">
                      <input
                        type="text"
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                        placeholder="Ajouter une compétence"
                      />
                      <button
                        type="button"
                        onClick={handleAddSkill}
                        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
                      >
                        Ajouter
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-blue-100 text-primary rounded-full flex items-center"
                        >
                          {skill}
                          <button
                            type="button"
                            className="ml-2 text-primary-dark hover:text-primary"
                            onClick={() => handleRemoveSkill(skill)}
                          >
                            &times;
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="githubUrl" className="block text-sm font-medium text-gray-700 mb-1">
                        URL GitHub
                      </label>
                      <input
                        id="githubUrl"
                        name="githubUrl"
                        type="url"
                        value={formData.githubUrl}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                      />
                    </div>
                    <div>
                      <label htmlFor="linkedinUrl" className="block text-sm font-medium text-gray-700 mb-1">
                        URL LinkedIn
                      </label>
                      <input
                        id="linkedinUrl"
                        name="linkedinUrl"
                        type="url"
                        value={formData.linkedinUrl}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
                        loading ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      {loading ? 'Enregistrement...' : 'Enregistrer les modifications'}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">À propos</h2>
                    <p className="text-gray-600">{user.bio}</p>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">Informations</h2>
                    <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Email</dt>
                        <dd className="mt-1 text-gray-900">{user.email}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500">Localisation</dt>
                        <dd className="mt-1 text-gray-900">{user.location}</dd>
                      </div>
                      {user.university && (
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Université / Organisation</dt>
                          <dd className="mt-1 text-gray-900">{user.university}</dd>
                        </div>
                      )}
                    </dl>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">Compétences</h2>
                    <div className="flex flex-wrap gap-2">
                      {user.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-blue-100 text-primary rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">Liens</h2>
                    <div className="flex space-x-4">
                      {user.githubUrl && (
                        <a
                          href={user.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-500 hover:text-gray-900"
                        >
                          <span className="flex items-center">
                            <svg className="h-6 w-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                            </svg>
                            GitHub
                          </span>
                        </a>
                      )}
                      {user.linkedinUrl && (
                        <a
                          href={user.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-500 hover:text-gray-900"
                        >
                          <span className="flex items-center">
                            <svg className="h-6 w-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                            LinkedIn
                          </span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 