// MODULE: Authentification & PWA
// RAISON: Utilitaire de gestion des fonctions d'authentification
// DÉPENDANCES: Pages d'authentification (login.js, register.js, profile.js)

/**
 * Simule une fonction de connexion utilisateur
 * Dans une version réelle, ferait un appel à une API d'authentification (Supabase, Firebase, etc.)
 */
export const login = async (email, password) => {
  // Simulation d'un délai réseau
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Vérification simple pour la démo
  if (email === 'demo@example.com' && password === 'password123') {
    const user = {
      id: 'user-123',
      email: 'demo@example.com',
      firstName: 'Kofi',
      lastName: 'Anan',
      userType: 'student',
    };
    
    // Stocker l'utilisateur en session
    sessionStorage.setItem('user', JSON.stringify(user));
    return user;
  }
  
  throw new Error('Email ou mot de passe incorrect');
};

/**
 * Simule une fonction d'inscription
 */
export const register = async (userData) => {
  // Simulation d'un délai réseau
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Vérification simple d'email unique pour la démo
  if (userData.email === 'demo@example.com') {
    throw new Error('Cet email est déjà utilisé');
  }
  
  // Créer un utilisateur simulé
  const user = {
    id: `user-${Date.now()}`,
    ...userData,
    createdAt: new Date().toISOString(),
  };
  
  // Stocker l'utilisateur en session
  sessionStorage.setItem('user', JSON.stringify(user));
  return user;
};

/**
 * Simule une fonction de déconnexion
 */
export const logout = () => {
  sessionStorage.removeItem('user');
};

/**
 * Récupère l'utilisateur actuellement connecté
 */
export const getCurrentUser = () => {
  if (typeof window !== 'undefined') {
    const user = sessionStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
  return null;
};

/**
 * Vérifie si un utilisateur est connecté
 */
export const isAuthenticated = () => {
  return getCurrentUser() !== null;
};

/**
 * Met à jour le profil utilisateur
 */
export const updateProfile = async (userData) => {
  // Simulation d'un délai réseau
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const currentUser = getCurrentUser();
  
  if (!currentUser) {
    throw new Error('Utilisateur non connecté');
  }
  
  // Fusionner les données actuelles avec les nouvelles
  const updatedUser = {
    ...currentUser,
    ...userData,
    updatedAt: new Date().toISOString(),
  };
  
  // Mettre à jour la session
  sessionStorage.setItem('user', JSON.stringify(updatedUser));
  return updatedUser;
};

/**
 * Simule une vérification des autorisations basée sur le rôle utilisateur
 */
export const checkPermission = (userType, requiredTypes = []) => {
  const currentUser = getCurrentUser();
  
  if (!currentUser) {
    return false;
  }
  
  if (requiredTypes.length === 0) {
    return true;
  }
  
  return requiredTypes.includes(currentUser.userType);
}; 