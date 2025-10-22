import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FeedbacksComponent } from './admin/feedbacks/feedbacks.component';
import { AuthGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'admin/feedbacks', component: FeedbacksComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];
