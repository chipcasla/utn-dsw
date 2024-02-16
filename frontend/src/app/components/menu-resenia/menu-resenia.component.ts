import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from 'app/services/cliente.service';
import { ErrorService } from 'app/services/error.service';
import { ReseñaService } from 'app/services/reseña.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-resenia',
  templateUrl: './menu-resenia.component.html',
  //styleUrls: ['./menu-resenia.component.css'],
})
export class MenuReseniaComponent {
  reseniaForm: FormGroup;
  crear: boolean = false;
  editar: boolean = false;
  miResenia: boolean = false;
  hasResenia: boolean = false;
  resenia: any;

  constructor(
    private formBuilder: FormBuilder,
    private reseñaService: ReseñaService,
    private clienteService: ClienteService,
    private toastrService: ToastrService,
    private errorService: ErrorService
  ) {
    this.reseniaForm = this.formBuilder.group({
      puntaje: [
        '',
        [Validators.required, Validators.min(1), Validators.max(5)],
      ],
      comentario: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.cargarReseña();
  }

  cargarReseña() {
    this.reseñaService
      .findByCliente(this.clienteService.getUserId())
      .subscribe({
        next: (response) => {
          this.resenia = response;
          this.hasResenia = true;
        },
        error: (error) => {
          if (error.status == 404) {
            this.hasResenia = false;
          }
        },
      });
  }

  createResenia() {
    if (this.hasResenia) {
      this.toastrService.error('Ya ha realizado una reseña', 'Error');
    } else {
      this.crear = !this.crear;
    }
  }
  submitResenia() {
    if (this.reseniaForm.valid) {
      if (!this.hasResenia) {
        const idCliente = this.clienteService.getUserId();
        const reseñaData = { ...this.reseniaForm.value, idCliente };
        this.reseñaService.addReseña(reseñaData).subscribe(() => {
          this.reseniaForm.reset();
          this.toastrService.success('Reseña añadida correctamente!');
          this.cargarReseña();
          this.crear = false;
        });
      } else {
        this.toastrService.error('Ya ha realizado una reseña', 'Error');
      }
    }
  }

  deleteResenia(idReseña: number) {
    this.reseñaService.deleteReseña(idReseña).subscribe(() => {
      this.cargarReseña();
    });
  }
}
