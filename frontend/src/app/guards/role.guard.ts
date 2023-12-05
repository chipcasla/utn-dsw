import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service.js';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const rol = authService.getUserRole();
  if (rol != 'admin') {
    router.navigate(['/']);
    return false;
  }
  return true;
};
