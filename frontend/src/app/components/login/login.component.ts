import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorService } from 'app/services/error.service';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user = {
    dni: '',
    password: '',
  };
  error: string | null = null;
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private errorService: ErrorService
  ) {}


  login() {
    if (this.user.dni == '' || this.user.password == '') {
      this.toastr.error('Complete todos los campos', 'Error');
      return;
    }
    this.loading = true;
    this.authService
      .login(this.user)
      .pipe(
        tap((res) => {
          this.loading = false;
          localStorage.setItem('token', res.token);
          if (res.data.tipo === 'admin') {
            return this.router.navigate(['/admin']);
          } else {
            return this.router.navigate(['/home']);
          }
        }),
        catchError((err) => {
          this.loading = false;
          this.errorService.messageError(err);
          return of(null);
        })
      )
      .subscribe();
  }

  redirect() {
    this.router.navigate(['../registro'], { relativeTo: this.route });
  }
}
