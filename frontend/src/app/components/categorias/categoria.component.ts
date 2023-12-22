import { Component } from '@angular/core';
import { CategoriaService } from 'app/services/categoria.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent {
  categorias: any;

  constructor(private categoriaService: CategoriaService){}

  ngOnInit():void{
    this.cargarCategorias();
  }

  cargarCategorias(){
    this.categoriaService.findAll().subscribe((response: any)=>{
      this.categorias=response.data;
      console.log(this.categorias)
    });
  }
}
