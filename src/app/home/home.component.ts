import { Component, AfterViewInit } from '@angular/core';
import { AuthFormComponent } from '../shared/auth-form/auth-form.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AuthFormComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  
  ngAfterViewInit() {
    // Forcer la lecture de la vidéo après le chargement
    const video = document.querySelector('video') as HTMLVideoElement;
    if (video) {
      video.muted = true;
      video.loop = true;
      
      // Forcer la lecture
      video.play().catch(error => {
        console.log('Autoplay bloqué:', error);
      });
      
      // Relancer la vidéo si elle s'arrête
      video.addEventListener('pause', () => {
        video.play().catch(() => {});
      });
      
      // Relancer la vidéo si elle se termine (au cas où loop ne fonctionne pas)
      video.addEventListener('ended', () => {
        video.currentTime = 0;
        video.play().catch(() => {});
      });
    }
  }
}
