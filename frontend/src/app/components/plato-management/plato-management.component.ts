import { HttpErrorResponse } from '@angular/common/http/index.js';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from 'app/services/categoria.service';
import { ErrorService } from 'app/services/error.service';
import { PlatoService } from 'app/services/plato.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-plato-management',
  templateUrl: './plato-management.component.html',
  //styleUrls: ['./plato-management.component.css'],
})
export class PlatoManagementComponent {
  platos: any;
  plato = {
    descripcion: '',
    ingredientes: '',
    categoria: '',
    imagen: '', // Aquí almacenaremos la imagen seleccionada por el usuario
  };
  crearPlato: boolean = false;
  categorias: any;
  selectedCategoria: any = null;

  constructor(
    private formBuilder: FormBuilder,
    private platoService: PlatoService,
    private route: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
    private errorService: ErrorService,
    private categoriaService: CategoriaService
  ) {}

  ngOnInit(): void {
    this.loadPlatos();
    this.loadCategorias();
  }

  loadPlatos() {
    this.platoService.getPlatos().subscribe((platos: any) => {
      this.platos = platos.data;
    });
  }

  loadCategorias() {
    this.categoriaService.findAll().subscribe((categorias: any) => {
      this.categorias = categorias.data;
    });
  }

  onChangeImagen(event: any) {
    if (event.target.files.length > 0) {
      this.plato.imagen = event.target.files[0];
    }
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

  submitPlato() {
    const formData = new FormData();
    formData.append('descripcion', this.plato.descripcion);
    formData.append('ingredientes', this.plato.ingredientes);
    formData.append('categoria', this.plato.categoria);
    if (this.plato.imagen) {
      formData.append('imagen', this.plato.imagen);
    }

    this.platoService.addPlato(formData).subscribe(() => {
      this.plato.descripcion = '';
      this.plato.ingredientes = '';
      this.plato.categoria = '';
      this.plato.imagen = '';
      this.toastrService.success('Nuevo plato agregado');
      this.loadPlatos();
    });
  }

  deletePlato(idPlato: number) {
    if (confirm(`¿Estás seguro que quieres eliminar el plato ID.${idPlato}?`)) {
      this.platoService.deletePlato(idPlato).subscribe({
        next: (data) => {
          this.toastrService.success(
            `Plato ${data.plato.descripcion} eliminado`
          );
          this.loadPlatos();
        },
        error: (e: HttpErrorResponse) => {
          this.errorService.messageError(e);
        },
      });
    }
  }

  redirect(idPlato: number) {
    this.router.navigate(['edit', idPlato], { relativeTo: this.route });
  }
}
