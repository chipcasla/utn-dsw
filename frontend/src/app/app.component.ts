import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  esPaginaLogin: boolean = false;
  title = 'web-app';

  ngOnInit(): void {
    initFlowbite();
  }

  constructor(private router: Router, private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
