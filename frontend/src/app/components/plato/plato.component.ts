import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriaService } from 'app/services/categoria.service';
import { PlatoService } from 'app/services/plato.service';

@Component({
  selector: 'app-plato',
  templateUrl: './plato.component.html',
  //styleUrls: ['./plato.component.css']
})
export class PlatoComponent {
  platos: any;
  categorias: any;
  selectedCategoria: any=null;
  
  constructor(private platoService: PlatoService, 
    private categoriaService: CategoriaService){}

  ngOnInit(): void{
    this.loadPlatos();
    this.loadCategorias();
  }


  loadPlatos(){
    this.platoService.getPlatos().subscribe((platos: any)=>{
      this.platos=platos.data;
    })
  }

  loadCategorias() {
    this.categoriaService.findAll().subscribe((categorias: any) => {
      this.categorias = categorias.data;
    });
  }

  onCategoriaChange() {
    if (this.selectedCategoria !== null) {
      this.platoService
        .getByCategoria(this.selectedCategoria)
        .subscribe((platos: any) => {
          this.platos = platos.data;
        });
    } else {
      this.loadPlatos();
    }
  }
}
