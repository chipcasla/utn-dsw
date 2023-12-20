import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PlatoService } from 'app/services/plato.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-plato-management',
  templateUrl: './plato-management.component.html',
  styleUrls: ['./plato-management.component.css'],
})
export class PlatoManagementComponent {
  platos: any;
  plato = {
    descripcion: '',
    ingredientes: '',
    imagen: null, // Aquí almacenaremos la imagen seleccionada por el usuario
  };
  crearPlato: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private platoService: PlatoService,
    private route: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadPlatos();
  }

  loadPlatos() {
    this.platoService.getPlatos().subscribe((platos: any) => {
      this.platos = platos.data;
    });
  }

  onChangeImagen(event: any) {
    if (event.target.files.length > 0) {
      this.plato.imagen = event.target.files[0];
    }
  }

  submitPlato() {
    const formData = new FormData();
    formData.append('descripcion', this.plato.descripcion);
    formData.append('ingredientes', this.plato.ingredientes);
    if (this.plato.imagen) {
      formData.append('imagen', this.plato.imagen);
    }

    this.platoService.addPlato(formData).subscribe(() => {
      this.toastrService.success('Nuevo plato agregado');
      this.loadPlatos();
    });
  }

  deletePlato(idPlato: number) {
    this.platoService.deletePlato(idPlato).subscribe(() => {
      this.loadPlatos();
      this.toastrService.success('Plato borrado');
    });
  }

  redirect(idPlato: number) {
    this.router.navigate(['edit', idPlato], { relativeTo: this.route });
  }
}
