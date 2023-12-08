import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated: boolean = false;
  private userRole: string = '';
  private URL = 'http://localhost:3000/api';

  constructor(private http: HttpClient, private router: Router) {}

  login(user: { dni: string; password: string }) {
    return this.http.post<any>(this.URL + '/clientes/login', user);
  }

  goToHome() {
    this.router.navigate(['']);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isAuthenticated = false;
    this.userRole = '';
    this.router.navigate(['/login']);
  }

  isAuthenticatedUser(): boolean {
    return !!localStorage.getItem('token');
  }

  getUserRole(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = jwtDecode(token);
      const userRol = decoded.rol;
      return userRol;
    }
    return null;
  }
}
