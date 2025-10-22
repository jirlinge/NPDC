import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FeedbackService } from '../../shared/services/feedback.service';
import { ArchiveService } from '../../shared/services/archive.service';
import { Feedback } from '../../shared/models/feedback.model';

@Component({
  selector: 'app-feedbacks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feedbacks.component.html',
  styleUrls: ['./feedbacks.component.css']
})
export class FeedbacksComponent implements OnInit {
  feedbacks: Feedback[] = [];
  selectedFeedback: Feedback | null = null;
  isLoading = false;
  errorMessage = '';

  constructor(
    private feedbackService: FeedbackService,
    private archiveService: ArchiveService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadFeedbacks();
  }

  loadFeedbacks(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.feedbackService.feedbacks$.subscribe({
      next: (feedbacks) => {
        this.feedbacks = feedbacks;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des feedbacks:', error);
        this.errorMessage = 'Erreur lors du chargement des réponses';
        this.isLoading = false;
      }
    });
  }

  selectFeedback(feedback: Feedback): void {
    this.selectedFeedback = feedback;
  }

  closeDetails(): void {
    this.selectedFeedback = null;
  }

  archiveAllFeedbacks(): void {
    if (this.feedbacks.length === 0) {
      return;
    }

    try {
      this.feedbackService.archiveAllFeedbacks();
    } catch (error) {
      console.error('Erreur lors de l\'archivage:', error);
      this.errorMessage = 'Erreur lors de l\'archivage des réponses';
    }
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/']);
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getRecentFeedbacks(): number {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    return this.feedbacks.filter(feedback => 
      new Date(feedback.date) >= oneWeekAgo
    ).length;
  }

  getAverageBudget(): number {
    if (this.feedbacks.length === 0) {
      return 0;
    }

    const total = this.feedbacks.reduce((sum, feedback) => 
      sum + (feedback.evgDetails.budget || 0), 0
    );
    
    return Math.round(total / this.feedbacks.length);
  }

  trackByFeedbackId(index: number, feedback: Feedback): number {
    return feedback.id;
  }
}