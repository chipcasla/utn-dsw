import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.css']
})
export class MenuAdminComponent {
  selectedOption: string | null = null;

  constructor(private router: Router){};
  
  selectOption(option: string) {
    this.selectedOption=option;
  }

  redirect(action: string){
    if (this.selectedOption){
      this.router.navigate(['/admin', this.selectedOption, action]);
    }
  }
}
