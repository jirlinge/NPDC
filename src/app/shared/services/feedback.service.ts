import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Feedback, EVGDetails } from '../models/feedback.model';
import { ArchiveService } from './archive.service';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private feedbacksSubject = new BehaviorSubject<Feedback[]>([]);
  public feedbacks$ = this.feedbacksSubject.asObservable();
  private nextId = 1;

  constructor(private archiveService: ArchiveService) {
    this.loadFeedbacksFromStorage();
  }

  submitFeedback(feedback: Feedback): void {
    try {
      const currentFeedbacks = this.feedbacksSubject.value;
      const newFeedbacks = [...currentFeedbacks, feedback];
      
      this.feedbacksSubject.next(newFeedbacks);
      this.saveFeedbacksToStorage(newFeedbacks);
      
      // Archiver automatiquement
      this.archiveService.archiveFeedback(feedback);
      
      console.log('Feedback sauvegardé:', feedback);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du feedback:', error);
    }
  }

  getAllFeedbacks(): Observable<Feedback[]> {
    return this.feedbacks$;
  }

  archiveAllFeedbacks(): void {
    const feedbacks = this.feedbacksSubject.value;
    if (feedbacks.length > 0) {
      this.archiveService.archiveAllFeedbacks(feedbacks);
    }
  }

  private loadFeedbacksFromStorage(): void {
    try {
      const stored = localStorage.getItem('evg-feedbacks');
      if (stored) {
        const feedbacks = JSON.parse(stored);
        this.feedbacksSubject.next(feedbacks);
        
        // Initialiser nextId basé sur les IDs existants
        if (feedbacks.length > 0) {
          this.nextId = Math.max(...feedbacks.map((f: Feedback) => f.id)) + 1;
        }
      }
    } catch (error) {
      console.error('Erreur lors du chargement des feedbacks:', error);
    }
  }

  private saveFeedbacksToStorage(feedbacks: Feedback[]): void {
    try {
      localStorage.setItem('evg-feedbacks', JSON.stringify(feedbacks));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des feedbacks:', error);
    }
  }

  getNextId(): number {
    return this.nextId++;
  }
}