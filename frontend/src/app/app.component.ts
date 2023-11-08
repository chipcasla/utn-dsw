import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  esPaginaLogin: boolean = false;
  title = 'web-app';

  constructor(private router: Router, private authService: AuthService) {}

  ngAfterViewInit() {
    initFlowbite();
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.esPaginaLogin = event.url === '/login';
      }
    });

    initFlowbite();
  }

  logout() {
    this.authService.logout();
  }
}
