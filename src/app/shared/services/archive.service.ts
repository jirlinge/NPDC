import { Injectable } from '@angular/core';
import { Feedback } from '../models/feedback.model';

@Injectable({
  providedIn: 'root'
})
export class ArchiveService {
  
  constructor() { }

  /**
   * Archive une réponse dans un fichier .txt
   * @param feedback La réponse à archiver
   */
  async archiveFeedback(feedback: Feedback): Promise<void> {
    try {
      const archiveContent = this.formatFeedbackForArchive(feedback);
      const fileName = `preferences_evg_${feedback.username}_${this.formatDateForFileName(feedback.date)}.txt`;
      
      // Créer un blob avec le contenu
      const blob = new Blob([archiveContent], { type: 'text/plain;charset=utf-8' });
      
      // Créer un lien de téléchargement
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      
      // Déclencher le téléchargement
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Nettoyer l'URL
      window.URL.revokeObjectURL(url);
      
      console.log(`Fichier .txt créé: ${fileName}`);
    } catch (error) {
      console.error('Erreur lors de la création du fichier:', error);
    }
  }

  /**
   * Archive toutes les réponses dans un fichier .txt
   * @param feedbacks Liste des réponses à archiver
   */
  async archiveAllFeedbacks(feedbacks: Feedback[]): Promise<void> {
    try {
      const archiveContent = this.formatAllFeedbacksForArchive(feedbacks);
      const fileName = `feedbacks_archive_${this.formatDateForFileName(new Date())}.txt`;
      
      // Créer un blob avec le contenu
      const blob = new Blob([archiveContent], { type: 'text/plain;charset=utf-8' });
      
      // Créer un lien de téléchargement
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      
      // Déclencher le téléchargement
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Nettoyer l'URL
      window.URL.revokeObjectURL(url);
      
      console.log(`Archive complète créée: ${fileName}`);
    } catch (error) {
      console.error('Erreur lors de l\'archivage complet:', error);
    }
  }

  /**
   * Formate une réponse pour l'archivage
   * @param feedback La réponse à formater
   * @returns Le contenu formaté
   */
  private formatFeedbackForArchive(feedback: Feedback): string {
    const date = new Date(feedback.date).toLocaleString('fr-FR');
    
    return `PRÉFÉRENCES EVG - ${feedback.username}
Date: ${date}

Prénom: ${feedback.evgDetails.firstName}
Budget par personne: ${feedback.evgDetails.budget}€
Période souhaitée: ${feedback.evgDetails.period}
Durée du séjour: ${feedback.evgDetails.duration} nuit(s)
Destination: ${feedback.evgDetails.destination}
Style de séjour: ${feedback.evgDetails.style}

Activités préférées:
${feedback.evgDetails.preferredActivities || 'Aucune'}

Activités à éviter:
${feedback.evgDetails.activitiesToAvoid || 'Aucune'}

Consentement: ${feedback.evgDetails.consent ? 'Oui' : 'Non'}`;
  }

  /**
   * Formate toutes les réponses pour l'archivage
   * @param feedbacks Liste des réponses
   * @returns Le contenu formaté
   */
  private formatAllFeedbacksForArchive(feedbacks: Feedback[]): string {
    const header = `
========================================
ARCHIVE COMPLÈTE DES RÉPONSES EVG
========================================
Date de création: ${new Date().toLocaleString('fr-FR')}
Nombre total de réponses: ${feedbacks.length}

`;

    const content = feedbacks.map(feedback => this.formatFeedbackForArchive(feedback)).join('\n\n');
    
    return header + content;
  }

  /**
   * Formate une date pour le nom de fichier
   * @param date La date à formater
   * @returns La date formatée
   */
  private formatDateForFileName(date: Date): string {
    return date.toISOString().replace(/[:.]/g, '-').split('T')[0];
  }
}