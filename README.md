# Backend API LMS

API backend pour une plateforme d'apprentissage permettant de gérer les
utilisateurs, les cours, les modules, les ressources pédagogiques, les
inscriptions, la progression, les quiz et les feedbacks formateurs.

Ce projet est réalisé dans le cadre de la promotion MERNiavelli - MERN
2026/2027 à YouCode Nador, sous le cadre Simplon Maghreb / YouCode.

## Présentation

L'objectif du projet est de construire le backend d'une plateforme LMS
(Learning Management System) capable de centraliser les parcours de
formation et de fournir les données nécessaires à une future interface
web.

La plateforme doit permettre à plusieurs profils d'utiliser le même
système :

-   Les visiteurs consultent les cours publiés.
-   Les apprenants s'inscrivent aux cours, consultent les contenus
    autorisés, suivent leur progression et passent des quiz.
-   Les formateurs créent et organisent leurs cours, ajoutent des
    modules et des ressources, suivent leurs apprenants et ajoutent des
    feedbacks.
-   Les administrateurs supervisent les utilisateurs, les rôles et les
    contenus de la plateforme.

## Objectifs

Le backend doit permettre de :

-   Centraliser les cours et les parcours d'apprentissage.
-   Organiser chaque cours en modules ordonnés.
-   Associer des ressources pédagogiques aux modules.
-   Gérer différents rôles et permissions.
-   Permettre à un apprenant de suivre plusieurs cours en parallèle.
-   Enregistrer et calculer la progression des apprenants.
-   Proposer des quiz simples à la fin ou dans le cadre des modules.
-   Enregistrer les tentatives et calculer les scores.
-   Permettre aux formateurs de suivre l'avancement des apprenants.
-   Exposer les données nécessaires à une interface web.

## Utilisateurs et rôles

### Visiteur

Un visiteur peut :

-   Consulter les cours publiés.
-   Consulter les informations publiques d'un cours.
-   Comprendre l'offre de formation disponible.

Il ne peut pas accéder aux contenus réservés aux apprenants inscrits.

### Apprenant

Un apprenant possède un compte et peut :

-   Se connecter à la plateforme.
-   Consulter les cours disponibles.
-   S'inscrire à un ou plusieurs cours publiés.
-   Accéder aux modules et ressources autorisés.
-   Marquer sa progression.
-   Reprendre un cours là où il s'est arrêté.
-   Passer des quiz.
-   Consulter ses résultats selon les fonctionnalités prévues.

### Formateur

Un formateur peut :

-   Créer ses cours.
-   Organiser les modules.
-   Ajouter des ressources pédagogiques.
-   Ajouter un quiz à un module.
-   Publier ou dépublier ses cours.
-   Suivre les apprenants inscrits à ses cours.
-   Consulter leurs résultats.
-   Ajouter des feedbacks liés à la progression des apprenants.

### Administrateur

L'administrateur supervise l'ensemble de la plateforme et peut notamment
:

-   Gérer les utilisateurs.
-   Gérer les rôles.
-   Superviser les cours.
-   Intervenir sur les contenus lorsque cela est nécessaire.
-   Accéder aux données globales selon les permissions définies.

## Fonctionnalités principales

### Gestion des utilisateurs et authentification

Le système doit prendre en charge :

-   Création de compte.
-   Connexion avec email et mot de passe.
-   Session sécurisée.
-   Consultation du profil connecté.
-   Protection des espaces réservés.
-   Gestion des rôles : `learner`, `trainer`, `admin`.

Les mots de passe ne doivent jamais être stockés en clair.

### Catalogue des cours

Chaque cours peut contenir notamment :

-   Titre.
-   Description courte.
-   Description détaillée.
-   Objectifs d'apprentissage.
-   Prérequis éventuels.
-   Niveau.
-   Catégorie ou thématique.
-   Durée estimée.
-   Statut de publication.
-   Formateur responsable.
-   Modules associés.
-   Date de création ou de publication.

Seuls les cours publiés sont visibles publiquement.

### Modules

Un cours est composé de modules ordonnés.

Un module contient notamment :

-   Titre.
-   Description.
-   Ordre dans le cours.
-   Durée estimée.
-   Statut.
-   Ressources associées.
-   Quiz éventuel.

L'ordre des modules est important pour la progression de l'apprenant.

### Ressources pédagogiques

Une ressource représente un contenu pédagogique rattaché à un module.

Les types prévus comprennent :

-   Article.
-   Vidéo.
-   Lien externe.
-   Document PDF.
-   Image ou support visuel.
-   Exercice.
-   Lien vers un dépôt de code.
-   Support de cours.

Une ressource peut contenir :

-   Titre.
-   Type.
-   URL, chemin de fichier ou référence de stockage.
-   Description courte.
-   Nom original du fichier si elle provient d'un upload.
-   Taille du fichier.
-   Durée estimée.
-   Ordre d'affichage.

Le système doit également permettre l'upload réel de fichiers et leur
association avec le module concerné.

### Inscriptions

Un apprenant peut s'inscrire à plusieurs cours publiés en parallèle.

Une inscription contient :

-   Apprenant concerné.
-   Cours concerné.
-   Date d'inscription.
-   Statut : `active`, `terminée` ou `annulée`.
-   Progression globale calculée.

Pour un même cours, une seule inscription active doit être possible afin
d'éviter les doublons de progression, de quiz et de statistiques.

### Progression

La progression permet de suivre l'avancement d'un apprenant dans un
cours.

Le système doit permettre de :

-   Marquer une ressource comme consultée.
-   Marquer un module comme terminé selon les règles définies.
-   Calculer le pourcentage d'avancement d'un cours.
-   Reprendre un cours là où l'apprenant s'est arrêté.
-   Permettre au formateur de consulter l'avancement de ses apprenants.

Le calcul de la progression est réalisé côté backend.

### Quiz

Un module peut contenir un quiz simple.

Un quiz contient notamment :

-   Titre.
-   Description courte.
-   Questions.
-   Choix de réponses.
-   Réponses correctes enregistrées côté backend.
-   Score minimal éventuel.
-   Statut actif ou inactif.

Lorsqu'un apprenant soumet un quiz, le backend doit :

1.  Recevoir les réponses.
2.  Vérifier les réponses.
3.  Calculer le score.
4.  Déterminer la réussite ou l'échec selon le seuil défini.
5.  Enregistrer la tentative.

Les réponses correctes ne doivent jamais être exposées dans les routes
destinées aux apprenants.

### Tentatives de quiz

Chaque tentative est liée à un apprenant et à un quiz.

Elle enregistre :

-   Apprenant.
-   Quiz.
-   Réponses soumises.
-   Score obtenu.
-   Résultat.
-   Date de soumission.

Les formateurs doivent pouvoir consulter les résultats des apprenants de
leurs propres cours.

### Feedbacks

Un formateur peut laisser un feedback simple sur la progression d'un
apprenant.

Un feedback contient :

-   Formateur auteur.
-   Apprenant concerné.
-   Cours concerné.
-   Contenu du feedback.
-   Date de création.

Le feedback reste lié au cours et à l'apprenant concernés.

## Modèle métier

Les principales entités du système sont :

``` text
User
Course
Module
Resource
Enrollment
Progress
Quiz
QuizAttempt
Feedback
```

Les relations principales sont :

``` text
User
 ├── peut être Learner
 ├── peut être Trainer
 └── peut être Admin

Trainer ───< Course
Course ───< Module
Module ───< Resource
Module ───  Quiz
Learner ───< Enrollment >─── Course
Learner ───< Progress >──── Course
Learner ───< QuizAttempt >── Quiz
Trainer ───< Feedback >──── Learner
Feedback ────────────────── Course
```

Cette représentation décrit le métier global. Le schéma de base de
données exact reste un choix de conception technique.

## Règles métier principales

-   Un utilisateur possède un seul rôle principal.
-   Un email ne peut être associé qu'à un seul compte.
-   Un cours appartient à un formateur responsable.
-   Un cours peut être en brouillon ou publié.
-   Seuls les cours publiés sont visibles publiquement.
-   Un cours contient un ou plusieurs modules.
-   Les modules d'un cours sont ordonnés.
-   Une ressource appartient à un seul module.
-   Une ressource de type fichier reste associée au module pour lequel
    elle a été déposée.
-   Un apprenant peut suivre plusieurs cours en parallèle.
-   Un apprenant ne peut pas avoir deux inscriptions actives au même
    cours.
-   La progression dépend de l'avancement sur les modules et les
    ressources.
-   Un quiz appartient à un module.
-   Une tentative appartient à un apprenant et à un quiz.
-   Les réponses correctes d'un quiz ne doivent pas être renvoyées aux
    apprenants.
-   Un formateur ne peut consulter que les données liées à ses propres
    cours, sauf s'il est administrateur.
-   Les erreurs doivent être renvoyées dans un format JSON cohérent.

## Recherche, filtres et tri

Le catalogue des cours doit permettre la recherche et le filtrage selon
:

-   Catégorie.
-   Niveau.
-   Statut de publication.
-   Formateur.
-   Mot-clé dans le titre ou la description.

Les résultats doivent pouvoir être triés au minimum par :

-   Date de création.
-   Date de publication.

Une pagination simple est recommandée lorsque la liste des cours devient
importante.

## Sécurité et confidentialité

Le backend doit protéger les comptes, les contenus et les données de
progression.

Les principales exigences sont :

-   Les mots de passe ne sont jamais stockés en clair.
-   Les espaces réservés sont accessibles uniquement aux utilisateurs
    autorisés.
-   Les rôles limitent les actions disponibles.
-   Un formateur ne peut pas accéder aux données d'un cours qui ne lui
    appartient pas, sauf s'il est administrateur.
-   Les fichiers déposés doivent être contrôlés avant leur stockage.
-   Les fichiers privés ne doivent pas être accessibles publiquement
    sans autorisation.
-   Les erreurs retournées doivent rester compréhensibles sans exposer
    d'informations sensibles.

## Gestion des fichiers

Les ressources pédagogiques peuvent être de vrais fichiers déposés par
les utilisateurs autorisés.

Le stockage peut être réalisé :

-   Dans un espace de stockage interne à l'application.
-   Dans un service externe spécialisé.
-   Dans un service de stockage objet compatible cloud.

Le cahier des charges ne fixe pas de fournisseur particulier. Le choix
du stockage relève donc de la conception technique.

## Données de démonstration

Le projet doit contenir un jeu de données fictif mais réaliste
comprenant :

-   Plusieurs utilisateurs avec différents rôles.
-   Plusieurs cours publiés.
-   Au moins un cours en brouillon.
-   Plusieurs modules par cours.
-   Plusieurs types de ressources.
-   Des ressources déposées sous forme de fichiers.
-   Des inscriptions d'apprenants.
-   Des progressions variées.
-   Des quiz avec des tentatives.
-   Des feedbacks de formateurs.

Les données doivent rester professionnelles et cohérentes avec une
plateforme d'apprentissage orientée développement web.

## Périmètre du projet

### Inclus

-   Backend API LMS.
-   Authentification.
-   Gestion des utilisateurs et des rôles.
-   Gestion des cours.
-   Gestion des modules.
-   Gestion des ressources.
-   Upload et stockage des fichiers.
-   Inscriptions aux cours.
-   Suivi de progression.
-   Quiz et tentatives.
-   Feedbacks formateurs.
-   Recherche, filtres et tri des cours.
-   Gestion des permissions.
-   Gestion cohérente des erreurs.

### Hors périmètre

Les éléments suivants ne sont pas attendus dans ce projet :

-   Interface React complète.
-   Interface graphique avancée.
-   Streaming vidéo.
-   Paiement.
-   Certificats officiels.
-   Messagerie temps réel.
-   Notifications email.
-   Visioconférence.
-   Moteur de recommandation.
-   Analytics avancés.
-   Intégration avec une plateforme externe.
-   Choix détaillé de l'infrastructure.
-   Choix détaillé de l'architecture technique.

## Critères d'acceptation

Le produit doit notamment permettre :

-   À un visiteur de consulter les cours publiés.
-   À un utilisateur de créer un compte et de se connecter.
-   De protéger correctement les mots de passe.
-   De sécuriser les espaces réservés.
-   De faire respecter les rôles et permissions.
-   À un formateur de créer et organiser ses cours.
-   À un cours de contenir des modules ordonnés.
-   À un module de contenir des ressources et éventuellement un quiz.
-   À un apprenant de s'inscrire à plusieurs cours publiés.
-   D'empêcher deux inscriptions actives au même cours pour un même
    apprenant.
-   D'enregistrer et calculer la progression côté backend.
-   De soumettre et corriger un quiz côté backend.
-   De ne pas exposer les bonnes réponses aux apprenants.
-   À un formateur de suivre les apprenants de ses cours.
-   De retourner des erreurs claires et cohérentes.
-   De stocker les fichiers et de les associer aux bons modules.
-   De protéger les fichiers privés contre les accès non autorisés.

## Documentation et évolution

Le cahier des charges définit le besoin global du produit. Les documents
de réalisation doivent préciser progressivement :

-   Les fonctionnalités livrées à chaque étape.
-   Les contraintes techniques détaillées.
-   Les livrables attendus.
-   Les critères de validation.

Le projet peut donc évoluer progressivement à partir de ce périmètre
fonctionnel.

## Référence

Projet basé sur le cahier des charges :

**Cahier des charges - API de plateforme d'apprentissage**

Produit : **Backend API LMS**

Promotion : **MERNIavelli - MERN 2026/2027**

Campus : **YouCode Nador**

Formateur Simplon : **Mehdi LARAIBI**