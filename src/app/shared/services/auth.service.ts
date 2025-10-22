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
    {
      id: 1,
      username: 'admin',
      email: 'admin@npdc.com',
      role: 'admin',
      firstName: 'Admin',
      lastName: 'User'
    },
    {
      id: 2,
      username: 'user',
      email: 'user@npdc.com',
      role: 'user',
      firstName: 'Regular',
      lastName: 'User'
    },
    {
      id: 3,
      username: 'demo',
      email: 'demo@npdc.com',
      role: 'user',
      firstName: 'Demo',
      lastName: 'User'
    }
  ];

  // Mots de passe en dur (en production, utiliser un système de hachage)
  private readonly passwords: { [key: string]: string } = {
    'admin': 'admin123',
    'user': 'user123',
    'demo': 'demo123'
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
