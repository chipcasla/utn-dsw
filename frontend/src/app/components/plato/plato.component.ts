import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PlatoService } from 'app/services/plato.service';

@Component({
  selector: 'app-plato',
  templateUrl: './plato.component.html',
  styleUrls: ['./plato.component.css']
})
export class PlatoComponent {
  platos: any;
  
  constructor(private platoService: PlatoService){}

  ngOnInit(): void{
    this.cargarPlatos();
  }


  cargarPlatos(){
    this.platoService.getPlatos().subscribe((platos: any)=>{
      this.platos=platos.data;
    })
  }
}
