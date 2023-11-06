import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user = {
    dni: '',
    password: '',
  };
  error: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  login() {
    this.authService
      .login(this.user)
      .pipe(
        tap((res) => {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/']).then(() => {
            window.location.reload();
          });
        }),
        catchError((err) => {
          if (err.error.msg) {
            this.error = err.error.msg;
          } else {
            this.error = 'Error al iniciar sesión. Intente nuevamente';
          }
          return of(null);
        })
      )
      .subscribe();
  }
}
