import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'user';
  firstName: string;
  lastName: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  // Profils en dur
  private readonly users: User[] = [
    { id: 1, username: 'admin', email: 'admin@npdc.com', role: 'admin', firstName: 'Admin', lastName: 'User' },
    { id: 2, username: 'alexandra', email: 'alexandra@npdc.com', role: 'user', firstName: 'Alexandra', lastName: '' },
    { id: 3, username: 'felix', email: 'felix@npdc.com', role: 'user', firstName: 'Félix', lastName: '' },
    { id: 4, username: 'guillaume', email: 'guillaume@npdc.com', role: 'user', firstName: 'Guillaume', lastName: '' },
    { id: 5, username: 'sydney', email: 'sydney@npdc.com', role: 'user', firstName: 'Sydney', lastName: '' },
    { id: 6, username: 'paul', email: 'paul@npdc.com', role: 'user', firstName: 'Paul', lastName: '' },
    { id: 7, username: 'kevin', email: 'kevin@npdc.com', role: 'user', firstName: 'Kevin', lastName: '' },
    { id: 8, username: 'marc', email: 'marc@npdc.com', role: 'user', firstName: 'Marc', lastName: '' },
    { id: 9, username: 'maité', email: 'maite@npdc.com', role: 'user', firstName: 'Maïté', lastName: '' },
    { id: 10, username: 'cyril', email: 'cyril@npdc.com', role: 'user', firstName: 'Cyril', lastName: '' },
    { id: 11, username: 'florian', email: 'florian@npdc.com', role: 'user', firstName: 'Florian', lastName: '' },
    { id: 12, username: 'alexis', email: 'alexis@npdc.com', role: 'user', firstName: 'Alexis', lastName: '' },
    { id: 13, username: 'therence', email: 'therence@npdc.com', role: 'user', firstName: 'Thérence', lastName: '' },
    { id: 14, username: 'eric', email: 'eric@npdc.com', role: 'user', firstName: 'Eric', lastName: '' },
    { id: 15, username: 'pauline', email: 'pauline@npdc.com', role: 'user', firstName: 'Pauline', lastName: '' },
    { id: 16, username: 'elisabeth', email: 'elisabeth@npdc.com', role: 'user', firstName: 'Elisabeth', lastName: '' },
    { id: 17, username: 'olga', email: 'olga@npdc.com', role: 'user', firstName: 'Olga', lastName: '' },
    { id: 18, username: 'thu', email: 'thu@npdc.com', role: 'user', firstName: 'Thu', lastName: '' },
    { id: 19, username: 'agathe', email: 'agathe@npdc.com', role: 'user', firstName: 'Agathe', lastName: '' }
  ];

  // Mots de passe en dur (en production, utiliser un système de hachage)
  private readonly passwords: { [key: string]: string } = {
    'admin': 'admin123',
    'alexandra': 'ScT46Omnhgv_',
    'felix': 'aTBjSO_Q-ezL',
    'guillaume': '7GZAF343CVV6',
    'sydney': 'Gc90YXlVQly7',
    'paul': 'gZoOtfMOcf9v',
    'kevin': 'LGw5_FCo7AsN',
    'marc': 'wlC3bG_Vg2gS',
    'maité': 'JN_D_vZwWhbx',
    'cyril': 'h_RvK1aND0DS',
    'florian': 'gFpkXsn_J0-4',
    'alexis': '-zkJlyA5zuXr',
    'therence': 'ZKNEepHufd6u',
    'eric': 'Kmc4D3Gtf74g',
    'pauline': 'uO3uSWVxcG8v',
    'elisabeth': 'gV7TToWsLOLd',
    'olga': '2w5s6ejsjxy4',
    'thu': 'REe1pbHY692Y',
    'agathe': 'FlbQ8jZhgjSB',
    vivien:    525Rqf0YXbtK
camille:   Nh4plOua-paj
  };

  constructor() {
    // Vérifier si l'utilisateur est déjà connecté (localStorage)
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
    }
  }

  login(credentials: LoginCredentials): Observable<{ success: boolean; user?: User; error?: string }> {
    return new Observable(observer => {
      // Simuler un délai de réseau
      setTimeout(() => {
        const user = this.users.find(u => u.username === credentials.username);
        
        if (!user) {
          observer.next({ success: false, error: 'Utilisateur non trouvé' });
          observer.complete();
          return;
        }

        if (this.passwords[credentials.username] !== credentials.password) {
          observer.next({ success: false, error: 'Mot de passe incorrect' });
          observer.complete();
          return;
        }

        // Connexion réussie
        this.currentUserSubject.next(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        observer.next({ success: true, user });
        observer.complete();
      }, 1000); // Délai de 1 seconde pour simuler une requête réseau
    });
  }

  logout(): void {
    this.currentUserSubject.next(null);
    localStorage.removeItem('currentUser');
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user ? user.role === role : false;
  }

  isAdmin(): boolean {
    return this.hasRole('admin');
  }
}
