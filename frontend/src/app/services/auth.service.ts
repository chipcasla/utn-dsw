import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JsonWebTokenError} from 'jsonwebtoken';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated: boolean = false;
  private userRole: string = '';
  private URL = 'http://localhost:3000/api';
  private jwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) {}

  login(user: { dni: string; password: string }) {
    return this.http.post<any>(this.URL + '/clientes/login', user);
    // Lógica de autenticación aquí. Verifica el nombre de usuario y contraseña en tu backend.
    // Establece el estado de autenticación y el rol del usuario.
    /* if (user.dni === 'admin' && user.password === 'admin') {
      this.isAuthenticated = true;
      this.userRole = 'admin';
      return true;
    } else if (user.dni === 'user' && user.password === 'user') {
      this.isAuthenticated = true;
      this.userRole = 'user';
      return true;
    } else {
      return false;
    } */
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

  getUserRole(): string {
    return this.userRole;
  }

  getClienteId(){
    const token = localStorage.getItem('token');
    if (token){
      const decodedToken = this.jwtHelperService.decodeToken(token);
      return decodedToken?.id
    }
    return null;
  }
}
