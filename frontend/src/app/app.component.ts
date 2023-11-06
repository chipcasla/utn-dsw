import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  esPaginaLogin: boolean = false;
  title = 'web-app';

  constructor(private router: Router) {}

  ngAfterViewInit() {
    initFlowbite();
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.esPaginaLogin = event.url === '/login';
      }
    });
    const flowbiteScript = document.createElement('script');
    flowbiteScript.src =
      'https://unpkg.com/@themesberg/flowbite@1.1.1/dist/flowbite.bundle.js';
    flowbiteScript.onload = () => {
      initFlowbite();
    };

    document.body.appendChild(flowbiteScript);
  }
}
