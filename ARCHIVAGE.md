# Système d'archivage des réponses EVG

## 📁 Fonctionnalités d'archivage

### 🔄 Archivage automatique
- **Chaque réponse** est automatiquement archivée dans un fichier .txt individuel
- **Nom du fichier** : `feedback_[username]_[date].txt`
- **Format** : Texte lisible avec toutes les informations structurées

### 📊 Archivage complet
- **Bouton "Archiver tout"** dans l'interface admin
- **Archive complète** de toutes les réponses dans un seul fichier
- **Nom du fichier** : `feedbacks_archive_[date].txt`
- **Statistiques** incluses (nombre total de réponses, date de création)

## 📋 Format des fichiers d'archive

### Structure d'une réponse individuelle
```
========================================
RÉPONSE FEEDBACK EVG - [USERNAME]
========================================
Date: [date complète]
ID: [identifiant unique]

INFORMATIONS GÉNÉRALES
----------------------
Nom de l'événement: [nom]
Type d'événement: [type]

BUDGET ET PRIX
--------------
Budget prévu: [montant]€
Fourchette de prix: [fourchette]

LIEU ET DATE
------------
Lieu préféré: [lieu]
Date souhaitée: [date]
Moment de la journée: [moment]

ACTIVITÉS SOUHAITÉES
--------------------
- [activité 1]
- [activité 2]
...

PARTICIPANTS
------------
Nombre de participants: [nombre]
Tranche d'âge: [tranche]

PRÉFÉRENCES
-----------
Ambiance souhaitée: [ambiance]
Préférence musicale: [musique]
Préférence culinaire: [nourriture]

EXIGENCES PARTICULIÈRES
-----------------------
[exigences ou "Aucune"]

COMMENTAIRES SUPPLÉMENTAIRES
----------------------------
[commentaires ou "Aucun"]

========================================
Fin de la réponse
========================================
```

## 🚀 Utilisation

### Pour les utilisateurs
1. **Remplir le formulaire** de feedback
2. **Soumettre** la réponse
3. **Téléchargement automatique** du fichier .txt

### Pour les administrateurs
1. **Accéder** à l'interface admin
2. **Cliquer** sur "Archiver tout"
3. **Téléchargement** de l'archive complète

## 💾 Persistance des données

### Stockage local
- **localStorage** : Sauvegarde temporaire dans le navigateur
- **Fichiers .txt** : Archivage permanent et portable
- **Indépendant du build** : Les archives persistent après reconstruction

### Avantages
- ✅ **Portabilité** : Fichiers lisibles sur tout système
- ✅ **Sauvegarde** : Copies de sécurité des données
- ✅ **Partage** : Facile à partager par email ou cloud
- ✅ **Analyse** : Format compatible avec Excel, Word, etc.

## 🔧 Configuration technique

### Services impliqués
- **ArchiveService** : Gestion de l'archivage
- **FeedbackService** : Intégration avec l'archivage automatique
- **Blob API** : Génération des fichiers côté client

### Format des dates
- **Nom de fichier** : `YYYY-MM-DD`
- **Contenu** : Format français localisé

## 📈 Statistiques incluses

### Archive complète
- Nombre total de réponses
- Date de création de l'archive
- Liste chronologique des réponses

### Réponse individuelle
- Identifiant unique
- Date et heure de soumission
- Nom d'utilisateur
- Toutes les données du formulaire

## 🛡️ Sécurité et confidentialité

### Données sensibles
- **Aucune donnée personnelle** stockée en dur
- **localStorage** : Données locales uniquement
- **Fichiers .txt** : Contrôle total de l'utilisateur

### Recommandations
- Sauvegarder régulièrement les archives
- Stocker les fichiers dans un endroit sécurisé
- Respecter la RGPD pour les données personnelles
