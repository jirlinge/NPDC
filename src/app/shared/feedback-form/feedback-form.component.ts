import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface FeedbackFormData {
  firstName: string;
  budget: number;
  period: string;
  duration: string;
  destination: string;
  preferredActivities: string;
  activitiesToAvoid: string;
  style: string;
  consent: boolean;
}

@Component({
  selector: 'app-feedback-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.css']
})
export class FeedbackFormComponent implements OnInit {
  @Input() userId: number = 0;
  @Input() username: string = '';
  @Output() feedbackSubmitted = new EventEmitter<any>();

  form: FormGroup;
  isSubmitting = false;
  errorMessage = '';
  successMessage = '';

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      budget: [200, [Validators.required, Validators.min(50), Validators.max(500)]],
      period: ['', [Validators.required]],
      duration: ['', [Validators.required]],
      destination: ['', [Validators.required]],
      preferredActivities: [''],
      activitiesToAvoid: [''],
      style: ['', [Validators.required]],
      consent: [false, [Validators.requiredTrue]]
    });
  }

  ngOnInit(): void {
    // Charger les données sauvegardées depuis localStorage
    this.loadFromLocalStorage();
    
    // Sauvegarder automatiquement à chaque changement
    this.form.valueChanges.subscribe(() => {
      this.saveToLocalStorage();
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    const formData: FeedbackFormData = this.form.value;

    // Simuler un délai d'envoi
    setTimeout(() => {
      // Créer l'objet feedback
      const feedback = {
        id: Date.now(),
        userId: this.userId,
        username: this.username || formData.firstName,
        date: new Date(),
        evgDetails: {
          firstName: formData.firstName,
          budget: formData.budget,
          period: formData.period,
          duration: formData.duration,
          destination: formData.destination,
          preferredActivities: formData.preferredActivities,
          activitiesToAvoid: formData.activitiesToAvoid,
          style: formData.style,
          consent: formData.consent
        }
      };

      // Afficher le succès
      this.successMessage = 'Merci ! Vos préférences ont été enregistrées.';
      
      // Émettre l'événement
      this.feedbackSubmitted.emit(feedback);
      
      // Log dans la console
      console.log('Feedback soumis:', feedback);
      
      // Créer et télécharger le fichier .txt
      this.createAndDownloadTxt(feedback);
      
      // Réinitialiser le formulaire
      this.form.reset();
      this.form.patchValue({ budget: 200 }); // Remettre la valeur par défaut
      this.clearLocalStorage();
      
      this.isSubmitting = false;
    }, 1000);
  }

  private createAndDownloadTxt(feedback: any): void {
    const content = `PRÉFÉRENCES EVG - ${feedback.username}
Date: ${new Date().toLocaleString('fr-FR')}

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

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `preferences_evg_${feedback.username}_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }

  private saveToLocalStorage(): void {
    try {
      localStorage.setItem('evg-form-data', JSON.stringify(this.form.value));
    } catch (error) {
      console.warn('Impossible de sauvegarder dans localStorage:', error);
    }
  }

  private loadFromLocalStorage(): void {
    try {
      const saved = localStorage.getItem('evg-form-data');
      if (saved) {
        const data = JSON.parse(saved);
        this.form.patchValue(data);
      }
    } catch (error) {
      console.warn('Impossible de charger depuis localStorage:', error);
    }
  }

  private clearLocalStorage(): void {
    try {
      localStorage.removeItem('evg-form-data');
    } catch (error) {
      console.warn('Impossible de vider localStorage:', error);
    }
  }
}