import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

export const roleGuard: CanMatchFn = (route, segments) => {
  const authService = inject(AuthService);
  const toastr = inject(ToastrService);
  const router = inject(Router);

  const allowedRoles = route.data?.['allowedRoles'];

  const userRole = authService.getUserRole();
  const hasRole: boolean = Boolean(userRole && allowedRoles.includes(userRole));
  if (!hasRole) {
    toastr.error('Acceso denegado', 'Error');
    if (userRole === 'admin') {
      return router.navigate(['/admin']);
    }
    if (userRole === 'cliente') {
      return router.navigate(['/home']);
    }
    return router.navigate(['/login']);
  }
  return hasRole;
};
