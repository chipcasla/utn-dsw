import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isAdmin: boolean = false;
  ngOnInit(): void {
    initFlowbite();
  }

  constructor(private router: Router, private authService: AuthService) {
    if (this.userRole()) {
      this.isAdmin = true;
    }
  }

  userRole() {
    return this.authService.getUserRole() === 'admin';
  }
  logout() {
    this.authService.logout();
  }
}
