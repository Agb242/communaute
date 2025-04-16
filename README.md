# InnoHub Africa - Plateforme Communautaire Tech & Universitaire

## 🌍 À propos du projet

InnoHub Africa est une plateforme web conçue pour connecter les communautés technologiques et universitaires en Afrique, favorisant ainsi l'innovation locale. La plateforme est développée comme une Progressive Web App (PWA) responsive, optimisée pour les appareils mobiles et les contraintes de connectivité.

## 🚀 Vision

- Créer un pont entre universités, étudiants, mentors et entreprises tech
- Faciliter l'organisation et la participation à des événements et hackathons
- Proposer des cours pratiques et des défis techniques interactifs
- Offrir une expérience fluide même sur des appareils modestes ou en connectivité limitée

## 📚 Structure du projet

Ce dépôt contient les backlogs détaillés pour chaque module du projet, suivant la méthodologie MoSCoW (Must, Should, Could, Won't) pour la priorisation.

### Modules et backlogs

| Module | Fichier | Description |
|--------|---------|-------------|
| **Vue d'ensemble** | [backlog-summary.md](backlog-summary.md) | Résumé des modules et cohérence globale |
| **Authentification & Profils** | [backlog-authentication.md](backlog-authentication.md) | Gestion des utilisateurs, rôles et permissions |
| **PWA & Design Responsive** | [backlog-pwa.md](backlog-pwa.md) | Interface adaptative et fonctionnalités hors-ligne |
| **Événements & Hackathons** | [backlog-events.md](backlog-events.md) | Organisation et participation aux événements |
| **Défis Techniques** | [backlog-challenges.md](backlog-challenges.md) | Catalogue de défis, soumissions et évaluation |
| **Cours Pratiques** | [backlog-courses.md](backlog-courses.md) | Contenu éducatif et suivi de progression |
| **Administration** | [backlog-admin.md](backlog-admin.md) | Gestion de la plateforme et des contenus |
| **Infrastructure & DevOps** | [backlog-infrastructure.md](backlog-infrastructure.md) | Environnements, CI/CD et monitoring |
| **Analyse de Faisabilité** | [backlog-feasibility.md](backlog-feasibility.md) | Évaluation technique, opérationnelle et financière |

## 📆 Planning de développement

Le développement est planifié sur **8 semaines** selon les phases suivantes:

1. **Semaines 1-2**: Fondations (Auth, Infrastructure, PWA de base)
2. **Semaines 2-4**: Fonctionnalités clés (Événements, Défis, Cours)
3. **Semaines 4-6**: Fonctionnalités avancées (Création de contenu, Évaluations)
4. **Semaines 6-8**: Finalisation (Intégration, Optimisations, Tests)

## 🛠️ Technologies

### Frontend
- Next.js 14+ (App Router)
- Tailwind CSS 
- Progressive Web App (next-pwa)
- React Query / SWR

### Backend
- Node.js avec Express/NestJS
- PostgreSQL avec Prisma/TypeORM
- Authentification JWT via Supabase/Clerk

### Infrastructure
- Docker & Docker Compose
- GitHub Actions (CI/CD)
- Vercel (Frontend) / Containers (Backend)
- Monitoring (Prometheus/Grafana)

## 📊 Métriques de réussite

- 500+ utilisateurs actifs mensuels après 2 mois
- 10+ partenariats universitaires
- Score Lighthouse PWA > 90
- Temps de chargement < 3s sur 3G

## 💰 Analyse de Faisabilité

Une analyse complète de la faisabilité technique, opérationnelle et financière est disponible dans le fichier [backlog-feasibility.md](backlog-feasibility.md). Cette analyse confirme que:

- ✅ Le projet est techniquement réalisable avec la stack choisie
- ✅ L'équipe dispose des compétences nécessaires (avec quelques besoins en formation DevOps)
- ✅ Le projet est financièrement viable, sous réserve d'obtention du financement initial

Le ROI estimé après 3 ans est de 1.2x à 1.8x, avec un seuil de rentabilité prévu entre 18 et 24 mois.

## 🧭 Navigation & Progression du Projet

Pour suivre la progression du développement et maintenir la cohérence entre les modules:

- Le fichier [CURRENT_STATE.md](CURRENT_STATE.md) à la racine fournit un aperçu de l'état actuel du développement
- Une règle de navigation entre modules est définie dans [.cursor/rules/module-navigation.mdc](.cursor/rules/module-navigation.mdc)
- Chaque fichier de code contient des commentaires indiquant son module et ses dépendances

Ces pratiques garantissent que le développement reste cohérent même lors des transitions entre modules.

## 🔄 Publication sur GitHub

Toutes les modifications et mises à jour de ce projet doivent être publiées sur le compte GitHub **Agb242**. Des règles détaillées sur le processus de publication sont disponibles dans le fichier [.cursor/rules/github-push.mdc](.cursor/rules/github-push.mdc).

## 👥 Contribuer

Ce projet est actuellement en phase de planification. Les contributions seront ouvertes prochainement. Pour toute question ou proposition, merci de créer une issue.

## 📄 Licence

Ce projet est sous licence [MIT](LICENSE).

---

Développé avec ❤️ pour la communauté tech africaine. 