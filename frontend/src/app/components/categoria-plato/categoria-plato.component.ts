import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlatoService } from 'app/services/plato.service';

@Component({
  selector: 'app-categoria-plato',
  templateUrl: './categoria-plato.component.html',
  styleUrls: ['./categoria-plato.component.css']
})
export class CategoriaPlatoComponent {
  platos: any;
  idCat: any;

  constructor(
    private platoService: PlatoService,
    private Router: Router,
    private route: ActivatedRoute,
    ){}

  ngOnInit(){
    this.route.params.subscribe((params)=>{
      this.idCat=params['id'];
      this.loadPlatos();
    })
  }

  loadPlatos(){
    this.platoService.getByCategoria(this.idCat).subscribe((platos: any)=>{
      this.platos=platos.data;
    })
  }
}
