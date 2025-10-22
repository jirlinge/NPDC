import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FeedbackFormComponent } from '../shared/feedback-form/feedback-form.component';
import { FeedbackService } from '../shared/services/feedback.service';
import { Feedback } from '../shared/models/feedback.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FeedbackFormComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser: any = null;
  totalFeedbacks = 0;
  averageBudget = 0;
  recentFeedbacks = 0;

  constructor(
    private router: Router,
    private feedbackService: FeedbackService
  ) {}

  ngOnInit(): void {
    this.loadCurrentUser();
    this.loadStats();
  }

  private loadCurrentUser(): void {
    const userStr = localStorage.getItem('currentUser');
    if (userStr) {
      this.currentUser = JSON.parse(userStr);
    } else {
      this.router.navigate(['/']);
    }
  }

  private loadStats(): void {
    this.feedbackService.feedbacks$.subscribe(feedbacks => {
      this.totalFeedbacks = feedbacks.length;
      
      if (feedbacks.length > 0) {
        // Calculer le budget moyen
        const totalBudget = feedbacks.reduce((sum, feedback) => 
          sum + (feedback.evgDetails.budget || 0), 0
        );
        this.averageBudget = Math.round(totalBudget / feedbacks.length);
        
        // Calculer les réponses récentes (cette semaine)
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        this.recentFeedbacks = feedbacks.filter(feedback => 
          new Date(feedback.date) >= oneWeekAgo
        ).length;
      } else {
        this.averageBudget = 0;
        this.recentFeedbacks = 0;
      }
    });
  }

  onFeedbackSubmitted(feedback: Feedback): void {
    this.feedbackService.submitFeedback(feedback);
    this.loadStats(); // Recharger les stats
  }

  viewFeedbacks(): void {
    this.router.navigate(['/admin/feedbacks']);
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/']);
  }
}