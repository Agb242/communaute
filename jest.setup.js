// MODULE: Authentification & PWA
// RAISON: Setup pour les tests avec Jest
// DÉPENDANCES: jest.config.js

// Import des polyfills et des extensions de test
import '@testing-library/jest-dom';

// Polyfill pour fetch qui n'est pas disponible dans l'environnement de test
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
    text: () => Promise.resolve(''),
    blob: () => Promise.resolve(new Blob()),
    ok: true,
    status: 200,
    headers: new Headers()
  })
);

// Polyfill pour IntersectionObserver qui n'est pas disponible dans l'environnement de test
class MockIntersectionObserver {
  constructor(callback) {
    this.callback = callback;
  }
  observe() {
    return null;
  }
  unobserve() {
    return null;
  }
  disconnect() {
    return null;
  }
}

global.IntersectionObserver = MockIntersectionObserver;

// Polyfill pour matchMedia qui n'est pas disponible dans l'environnement de test
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock pour localStorage
class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = String(value);
  }

  removeItem(key) {
    delete this.store[key];
  }
}

global.localStorage = new LocalStorageMock();
global.sessionStorage = new LocalStorageMock();

// Supprimer les avertissements de console pendant les tests
global.console = {
  ...console,
  error: jest.fn(),
  warn: jest.fn(),
  info: jest.fn(),
  debug: jest.fn(),
};

// Reset les mocks après chaque test
afterEach(() => {
  jest.clearAllMocks();
}); 