/*
export const AuthGuard : CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService =  new AuthService();
  const router = new Router();
  if (authService.isAuthenticatedUser()) {
      return true;
    } else {
      router.navigate(['/login']);
      return false;
    }
  }
  */
