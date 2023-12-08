import { Component } from '@angular/core';
import { ClienteService } from 'app/services/cliente.service';
import { ReseñaService } from 'app/services/reseña.service';

@Component({
  selector: 'app-resenias',
  templateUrl: './resenias.component.html',
  styleUrls: ['./resenias.component.css']
})
export class ReseniasComponent {
  resenias: any;

  constructor(private reseñaService: ReseñaService){}

  ngOnInit(): void{
    this.resenias=this.reseñaService.getReseñas().subscribe(resenias=>{
      this.resenias=resenias.data;
    }
    )}
  }