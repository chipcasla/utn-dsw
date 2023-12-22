import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriaService } from 'app/services/categoria.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categoria-management',
  templateUrl: './categoria-management.component.html',
  styleUrls: ['./categoria-management.component.css']
})
export class CategoriaManagementComponent {
  crear: boolean=false;
  categorias: any;
  createForm: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private categoriaService: CategoriaService,
    private toastr: ToastrService
  )
  {
    this.createForm=this.formBuilder.group({
      descripcion: ['', Validators.required]
    })
  }

  ngOnInit(){
    this.cargarCategorias();
  }

  cargarCategorias(){
    this.categoriaService.findAll().subscribe((categorias:any)=>{
      this.categorias=categorias.data;
    })
  }

  borrarCategoria(id: number){
    this.categoriaService.removeCategoria(id).subscribe(()=>{
      this.cargarCategorias();
      this.toastr.success('Categoria borrada');
    });
  }

  addCategoria(){
    if (this.createForm.valid){
      const datosCategoria = this.createForm.value;
      this.categoriaService.addCategoria(datosCategoria).subscribe(()=>{
        this.cargarCategorias();
        this.toastr.success('Categoria agregada');
      });
    }
  }
}
