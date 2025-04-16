// MODULE: Authentification & PWA
// RAISON: Tests des fonctionnalités d'authentification
// DÉPENDANCES: utils/auth.js

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { login, register, logout, getCurrentUser, isAuthenticated } from '../utils/auth';

// Mock de localStorage
const localStorageMock = (function() {
  let store = {};
  return {
    getItem: jest.fn(key => store[key] || null),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    removeItem: jest.fn(key => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    })
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

describe('Fonctionnalités d\'authentification', () => {
  beforeEach(() => {
    // Réinitialiser localStorage avant chaque test
    localStorageMock.clear();
    jest.clearAllMocks();
  });

  test('login() devrait stocker les informations dans localStorage et retourner l\'utilisateur', async () => {
    const credentials = {
      email: 'test@example.com',
      password: 'password123'
    };

    const user = await login(credentials);

    expect(user).toEqual(expect.objectContaining({
      id: expect.any(String),
      email: credentials.email,
      role: expect.any(String)
    }));
    expect(localStorageMock.setItem).toHaveBeenCalledTimes(2);
    expect(localStorageMock.setItem).toHaveBeenCalledWith('auth_token', expect.any(String));
    expect(localStorageMock.setItem).toHaveBeenCalledWith('user', expect.any(String));
  });

  test('register() devrait créer un compte et retourner le nouvel utilisateur', async () => {
    const userData = {
      email: 'nouveau@example.com',
      password: 'nouveauPassword123',
      name: 'Nouvel Utilisateur',
      role: 'student'
    };

    const newUser = await register(userData);

    expect(newUser).toEqual(expect.objectContaining({
      id: expect.any(String),
      email: userData.email,
      name: userData.name,
      role: userData.role
    }));
    expect(localStorageMock.setItem).toHaveBeenCalledTimes(2);
  });

  test('logout() devrait supprimer les informations d\'authentification', async () => {
    // D'abord connecter un utilisateur
    await login({
      email: 'test@example.com',
      password: 'password123'
    });

    // Vérifier que l'utilisateur est connecté
    expect(isAuthenticated()).toBeTruthy();

    // Déconnecter
    await logout();

    // Vérifier que localStorage a été nettoyé
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('auth_token');
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('user');
    expect(isAuthenticated()).toBeFalsy();
  });

  test('getCurrentUser() devrait retourner l\'utilisateur actuel depuis localStorage', async () => {
    const mockUser = {
      id: '123',
      email: 'test@example.com',
      name: 'Test User',
      role: 'student'
    };

    // Simuler un utilisateur connecté
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(mockUser));

    const user = getCurrentUser();

    expect(user).toEqual(mockUser);
    expect(localStorageMock.getItem).toHaveBeenCalledWith('user');
  });

  test('isAuthenticated() devrait retourner vrai si un token est présent', () => {
    // Sans token
    expect(isAuthenticated()).toBeFalsy();

    // Avec token
    localStorageMock.getItem.mockReturnValueOnce('mock-token');
    expect(isAuthenticated()).toBeTruthy();
  });

  test('login() devrait rejeter avec une erreur pour des identifiants invalides', async () => {
    const invalidCredentials = {
      email: 'invalid@example.com',
      password: 'wrongpassword'
    };

    await expect(login(invalidCredentials)).rejects.toThrow('Identifiants invalides');
  });
  
  test('register() devrait rejeter si l\'email existe déjà', async () => {
    // Premier enregistrement réussit
    const userData = {
      email: 'existant@example.com',
      password: 'password123',
      name: 'Utilisateur Existant',
      role: 'student'
    };
    
    await register(userData);
    
    // Deuxième enregistrement avec le même email échoue
    await expect(register(userData)).rejects.toThrow('Un compte avec cet email existe déjà');
  });
}); 