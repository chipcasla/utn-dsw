import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ErrorService } from 'app/services/error.service';
import { PlatoService } from 'app/services/plato.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-plato-edit',
  templateUrl: './plato-edit.component.html',
  //styleUrls: ['./plato-edit.component.css'],
})
export class PlatoEditComponent {
  plato = {
    descripcion: '',
    ingredientes: '',
    categoria: '',
    imagen: null, // Aquí almacenaremos la imagen seleccionada por el usuario
  };
  idPlato: any;
  imagen: any;

  constructor(
    private platoService: PlatoService,
    private route: ActivatedRoute,
    private toastrService: ToastrService,
    private errorService: ErrorService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const idPlato = +params['id'];
      this.platoService.getOne(idPlato).subscribe({
        next: (plato) => {
          this.idPlato = plato.data.id;
          this.plato.descripcion = plato.data['descripcion'];
          this.plato.ingredientes = plato.data['ingredientes'];
          this.plato.categoria = plato.data['idcategoria'];
          this.plato.imagen = null;
        },
        error: (err) => {
          this.errorService.messageError(err);
        },
      });
    });
  }

  onChangeImagen(event: any) {
    if (event.target.files.length > 0) {
      this.plato.imagen = event.target.files[0];
    }
  }

  updatePlato() {
    const formData = new FormData();
    formData.append('descripcion', this.plato.descripcion);
    formData.append('ingredientes', this.plato.ingredientes);
    formData.append('categoria', this.plato.categoria);
    if (this.plato.imagen) {
      formData.append('imagen', this.plato.imagen);
    }
    console.log(formData);
    this.platoService.updatePlato(this.idPlato, formData).subscribe({
      next: () => {
        this.toastrService.success('Cambios guardados');
      },
      error: (err) => {
        this.errorService.messageError(err);
      },
    });
  }
}
