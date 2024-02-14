import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  //styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  isAdmin: boolean = false;
  isUser: boolean = false;

  constructor(private router: Router, private authService: AuthService) {

    this.router.events.pipe(
      filter(event => event instanceof NavigationStart)
        ).subscribe(()=> {
          const mobileMenu = document.getElementById('mobile-menu-3');
          if (mobileMenu) {
            mobileMenu.classList.add('hidden');
          }
        });
      };
    /*this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        const mobileMenu = document.getElementById('mobile-menu-3');
        if (mobileMenu) {
          mobileMenu.classList.add('hidden');
        }
      }
    });*/

  checkUserRole(role: string): boolean {
    if (role === '') {
      return this.authService.getUserRole() != null;
    }
    return this.authService.getUserRole() === role;
  }

  toggleMenu() {
    const mobileMenu = document.getElementById('mobile-menu-3');
    if (mobileMenu) {
      mobileMenu.classList.toggle('hidden');
    }
  }

  goToHome() {
    this.authService.goToHome();
  }

  logout() {
    this.authService.logout();
  }
}
