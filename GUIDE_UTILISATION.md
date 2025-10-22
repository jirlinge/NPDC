# Guide d'utilisation - Application EVG

## 🚀 Comment utiliser l'application

### 1. Connexion
- **URL** : `http://localhost:4200`
- **Comptes disponibles** :
  - **Admin** : `admin` / `admin123`
  - **Utilisateur** : `user` / `user123`
  - **Demo** : `demo` / `demo123`

### 2. Pour les utilisateurs

#### Étape 1 : Se connecter
1. Ouvrir l'application
2. Saisir nom d'utilisateur et mot de passe
3. Cliquer sur "Se connecter"

#### Étape 2 : Remplir le formulaire
1. **Page d'accueil** : Vous arrivez sur le dashboard
2. **Formulaire** : Remplir toutes les sections :
   - Informations générales (nom de l'événement, type)
   - Budget et prix
   - Lieu et date
   - Activités souhaitées (cocher au moins une case)
   - Participants
   - Préférences
   - Commentaires supplémentaires

#### Étape 3 : Valider le formulaire
1. **Bouton de validation** : En bas du formulaire
2. **Texte du bouton** : "Envoyer mon avis"
3. **État** : Le bouton est grisé si le formulaire n'est pas valide
4. **Validation** : Cliquer sur "Envoyer mon avis"

#### Étape 4 : Téléchargement automatique
1. **Fichier .txt** : Se télécharge automatiquement
2. **Nom** : `reponse_[username]_[date].txt`
3. **Contenu** : Toutes vos réponses formatées

### 3. Pour les administrateurs

#### Étape 1 : Se connecter en admin
1. Utiliser le compte `admin` / `admin123`
2. Accéder au dashboard admin

#### Étape 2 : Voir les réponses
1. **Bouton** : "Voir les réponses" (vert)
2. **Page** : Liste de toutes les réponses
3. **Détails** : Cliquer sur une réponse pour voir le détail

#### Étape 3 : Archiver toutes les réponses
1. **Bouton** : "Archiver tout" (vert)
2. **Fichier** : `feedbacks_archive_[date].txt`
3. **Contenu** : Toutes les réponses dans un seul fichier

## 🔍 Où trouver le bouton de validation

### Localisation du bouton
- **Page** : Dashboard (après connexion)
- **Section** : "Formulaire de collecte"
- **Position** : Tout en bas du formulaire
- **Apparence** : Bouton bleu avec texte "Envoyer mon avis"

### États du bouton
- **Actif** : Bleu, cliquable
- **Désactivé** : Grisé, non cliquable (formulaire invalide)
- **Chargement** : "Envoi en cours..." avec spinner

## ⚠️ Problèmes courants

### Le bouton est grisé
**Cause** : Formulaire invalide
**Solution** :
1. Vérifier que tous les champs obligatoires sont remplis
2. S'assurer qu'au moins une activité est cochée
3. Vérifier que le budget est supérieur à 0

### Le fichier .txt ne se télécharge pas
**Cause** : Blocage du navigateur
**Solution** :
1. Autoriser les téléchargements automatiques
2. Vérifier le dossier de téléchargements
3. Regarder dans la console du navigateur (F12)

### Erreur de validation
**Cause** : Champs manquants ou invalides
**Solution** :
1. Ouvrir la console (F12)
2. Voir les messages d'erreur
3. Corriger les champs mentionnés

## 📁 Format du fichier .txt

### Exemple de contenu
```
RÉPONSE EVG - username
Date: 22/10/2025 à 22:05:43

Nom de l'événement: Mon EVG
Type d'événement: soiree
Budget prévu: 500€
Fourchette de prix: 100-500
Lieu préféré: Paris
Date souhaitée: 2025-12-15
Moment de la journée: soir
Activités souhaitées: Restaurant, Bar, Soirée dansante
Nombre de participants: 8
Tranche d'âge: 25-35
Ambiance souhaitée: detendu
Préférence musicale: Pop
Préférence culinaire: Française
Exigences particulières: Aucune
Commentaires supplémentaires: Aucun
```

## 🛠️ Développement

### Démarrer l'application
```bash
cd NPDCFront
npm start
```

### Compiler l'application
```bash
ng build
```

### URL de développement
- **Frontend** : `http://localhost:4200`
- **Backend** : `http://localhost:5000` (si démarré)
