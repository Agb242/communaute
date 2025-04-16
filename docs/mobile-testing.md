# Guide de Test Mobile - InnoHub Africa

## 1. Objectifs des Tests

Ce document définit la procédure à suivre pour tester l'application InnoHub Africa sur appareils mobiles, avec un focus particulier sur les fonctionnalités PWA et le comportement hors-ligne.

### 1.1 Objectifs Principaux
- Valider le fonctionnement adaptatif responsive sur divers appareils (tailles et résolutions d'écran)
- Tester l'installabilité PWA et la conformité aux standards
- Vérifier le comportement en mode hors-ligne et en connectivité limitée
- Évaluer les performances sur des appareils d'entrée/milieu de gamme (priorité Afrique)
- Valider l'authentification et les fonctionnalités associées

## 2. Appareils et Environnements de Test

### 2.1 Appareils Physiques Prioritaires
| Catégorie | Appareils | OS | Marché cible |
|-----------|-----------|-------|-------------|
| **Entrée de gamme** | Tecno Spark 8C / 9<br>Infinix Hot 12<br>Xiaomi Redmi 10A | Android 11/12 | Afrique sub-saharienne |
| **Milieu de gamme** | Samsung Galaxy A33/A53<br>Oppo A77<br>Xiaomi Redmi Note 11 | Android 12/13 | Urbain / Étudiants |
| **Haut de gamme** | iPhone 11/12/13<br>Samsung Galaxy S21/S22<br>Google Pixel 6 | iOS 15/16, Android 12/13 | Professionnels / Mentors |

### 2.2 Navigateurs à Tester
- Chrome Android (priorité maximale)
- Safari iOS (priorité maximale)
- Firefox Android
- Samsung Internet
- Opera Mini (mode économie de données)

### 2.3 Conditions Réseau Simulées
- Wi-Fi stable (référence)
- 4G avec signal moyen (latence ~150ms)
- 3G lent (latence ~300ms, débit limité)
- Mode hors-ligne (pas de connexion)
- Connexion intermittente (alternance en ligne/hors-ligne)

## 3. Points de Test Spécifiques

### 3.1 Installation PWA
- [ ] Le banner d'installation s'affiche sur les navigateurs compatibles
- [ ] L'installation fonctionne correctement sur Android (Chrome)
- [ ] L'installation fonctionne correctement sur iOS (Safari)
- [ ] Les icônes d'application s'affichent correctement sur l'écran d'accueil
- [ ] L'écran de démarrage (splash screen) s'affiche correctement

### 3.2 Responsive Design
- [ ] Affichage correct sur petit écran mobile (320px-375px)
- [ ] Affichage correct sur grand écran mobile (390px-428px)
- [ ] Affichage correct sur écran tablette (768px-1024px)
- [ ] Navigation adaptée au mobile (menus, boutons tactiles)
- [ ] Formulaires utilisables sur petit écran
- [ ] Lisibilité des textes sur tous les appareils

### 3.3 Authentification
- [ ] Inscription fonctionne sur mobile
- [ ] Connexion fonctionne sur mobile
- [ ] Profil utilisateur s'affiche et peut être modifié
- [ ] Session persiste après fermeture/réouverture de l'application

### 3.4 Mode Hors-ligne
- [ ] La page offline.html s'affiche correctement en cas de déconnexion
- [ ] Les pages mises en cache sont accessibles hors-ligne
- [ ] L'indicateur de statut de connexion apparaît quand hors-ligne
- [ ] Les actions mises en file d'attente en mode hors-ligne sont synchronisées à la reconnexion
- [ ] L'application reste utilisable pour les fonctionnalités basiques sans réseau

### 3.5 Performance
- [ ] Temps de chargement initial < 3s sur 4G
- [ ] Temps de chargement initial < 5s sur 3G lent
- [ ] Interactions fluides sans lag sur appareils entrée de gamme
- [ ] Utilisation mémoire raisonnable (< 300MB)
- [ ] Consommation batterie modérée

## 4. Procédure de Test

### 4.1 Préparation
1. Installer l'application sur l'appareil (via URL ou build local)
2. Configurer les outils de développement pour le monitoring
3. Préparer l'environnement réseau (simulateurs de connexion)
4. Préparer les comptes de test pour l'authentification

### 4.2 Exécution des Tests
1. Réaliser les tests d'installation PWA
2. Parcourir l'ensemble de l'application en mode connecté
3. Passer en mode avion et continuer l'utilisation
4. Vérifier les comportements en reconnexion
5. Tester les cas d'utilisateurs spécifiques (étudiant, mentors, etc.)

### 4.3 Documentation des Résultats
- Capture d'écran pour chaque problème identifié
- Enregistrer les métriques de performance (DevTools)
- Remplir la grille d'évaluation pour chaque appareil
- Noter les conditions exactes des problèmes rencontrés

## 5. Outils de Test

- **Chrome DevTools** - Mode appareil mobile, throttling réseau
- **Lighthouse** - Audit PWA et performance
- **WebPageTest** - Tests de performance réseau
- **Appium** - Tests automatisés multi-appareils (optionnel)
- **BrowserStack** - Tests sur appareils réels à distance (si budget disponible)

## 6. Matrice de Compatibilité Minimale

| Fonctionnalité | Chrome Android | Safari iOS | Firefox Android | Opera Mini |
|----------------|----------------|------------|----------------|------------|
| Installation PWA | Obligatoire | Obligatoire | Souhaitable | N/A |
| Responsive Design | Obligatoire | Obligatoire | Obligatoire | Obligatoire |
| Authentification | Obligatoire | Obligatoire | Obligatoire | Obligatoire |
| Mode Hors-ligne | Obligatoire | Souhaitable* | Souhaitable | Limité |
| Notifications Push | Souhaitable | N/A | Souhaitable | N/A |

*Safari iOS a un support limité du mode hors-ligne

## 7. Résolution des Problèmes Courants

### 7.1 Safari iOS
- Vérifier les limites de stockage (max 50MB par défaut)
- S'assurer que le manifest est correctement configuré
- Contourner les limitations de service worker avec des fallbacks

### 7.2 Opera Mini
- Prévoir un mode dégradé fonctionnel
- Privilégier le HTML/CSS simple au JavaScript complexe
- Tester en mode "Extreme" qui modifie considérablement le rendu

### 7.3 Android Bas de Gamme
- Optimiser les images et ressources
- Limiter les animations JavaScript
- Mettre en œuvre le lazy loading des composants

## 8. Critères de Validation Finale

- Score Lighthouse PWA > 90
- Fonctionnalités critiques accessibles sur tous les appareils cibles
- Temps de chargement initial < 5s sur 3G
- Taille de l'application < 5MB en installation
- Mode hors-ligne fonctionnel pour les fonctionnalités clés

---

Document préparé par: Équipe InnoHub Africa  
Dernière mise à jour: 17/04/2023 