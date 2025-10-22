# Authentification NPDC

## Profils de test disponibles

L'application dispose de 3 profils en dur pour les tests :

### 1. Administrateur
- **Nom d'utilisateur :** `admin`
- **Mot de passe :** `admin123`
- **Rôle :** Administrateur
- **Accès :** Toutes les fonctionnalités + section admin + visualisation des réponses

### 2. Utilisateur standard
- **Nom d'utilisateur :** `user`
- **Mot de passe :** `user123`
- **Rôle :** Utilisateur
- **Accès :** Formulaire de collecte d'avis EVG

### 3. Utilisateur démo
- **Nom d'utilisateur :** `demo`
- **Mot de passe :** `demo123`
- **Rôle :** Utilisateur
- **Accès :** Formulaire de collecte d'avis EVG

## Fonctionnalités

### Authentification
- ✅ Connexion avec validation des identifiants
- ✅ Gestion des sessions (localStorage)
- ✅ Protection des routes avec AuthGuard
- ✅ Interface différenciée selon le rôle (admin/user)
- ✅ Déconnexion sécurisée
- ✅ Messages d'erreur en français
- ✅ Validation des formulaires

### Collecte d'avis EVG
- ✅ Formulaire complet pour recueillir les préférences EVG
- ✅ Questions sur : budget, lieu, date, activités, participants, préférences
- ✅ Interface utilisateur intuitive avec le même style que l'auth
- ✅ Sauvegarde des réponses en localStorage
- ✅ Messages de confirmation et d'erreur

### Interface administrateur
- ✅ Visualisation de toutes les réponses utilisateurs
- ✅ Affichage des statistiques (total, cette semaine)
- ✅ Modal détaillée pour chaque réponse
- ✅ Informations organisées par sections
- ✅ Interface ergonomique avec username et date

## Architecture

### Services
- **AuthService :** Gestion de l'authentification et des profils
- **FeedbackService :** Gestion des avis utilisateurs et stockage

### Composants
- **AuthFormComponent :** Formulaire de connexion
- **DashboardComponent :** Interface post-connexion (même style que auth)
- **FeedbackFormComponent :** Formulaire de collecte d'avis EVG
- **FeedbacksComponent :** Interface admin pour visualiser les réponses

### Guards
- **AuthGuard :** Protection des routes

### Modèles
- **User :** Modèle utilisateur
- **Feedback :** Modèle pour les avis EVG
- **EVGDetails :** Détails spécifiques à l'EVG

## Utilisation

### Pour les utilisateurs
1. Se connecter avec un profil utilisateur
2. Remplir le formulaire de collecte d'avis EVG
3. Soumettre les réponses

### Pour les administrateurs
1. Se connecter avec le profil admin
2. Cliquer sur "Voir les réponses" pour accéder à l'interface admin
3. Consulter toutes les réponses avec les détails complets

## Sécurité

⚠️ **Note :** Cette implémentation utilise des profils en dur pour le développement. En production, il faudrait :
- Utiliser un système de hachage des mots de passe
- Implémenter une API backend sécurisée
- Ajouter des tokens JWT
- Implémenter une gestion des sessions plus robuste
- Chiffrer les données sensibles
