import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MesaService } from 'app/services/mesa.service';
import { catchError, of, tap } from 'rxjs';

//Habria que cambiar el nombre del component a otra cosa, no solo mesa
@Component({
  selector: 'app-mesa',
  templateUrl: './mesa.component.html',
  //styleUrls: ['./mesa.component.css'],
})
export class MesaComponent {
  formulario: FormGroup;
  mesasDisponibles: any;
  reserva: any = {};
  confirmaReserva: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private mesaService: MesaService,
    private router: Router
  ) {
    this.formulario = this.formBuilder.group({
      cantPersonas: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]+$'),
          Validators.min(1),
          Validators.max(11),
        ],
      ],
      fechaHora: ['', Validators.required],
      ubicacion: ['', Validators.required],
    });
  }

  ocultarPanelMesas() {
    this.mesasDisponibles = null;
  }

  buscarMesasLibres() {
    const datosFormularios = this.formulario.value;
    this.errorMessage = null;

    const params = {
      cantPersonas: datosFormularios.cantPersonas,
      fechaHora: datosFormularios.fechaHora,
      ubicacion: datosFormularios.ubicacion,
    };

    this.mesaService
      .findMesasLibres(params)
      .pipe(
        tap((res) => {
          this.mesasDisponibles = res.data;
        }),
        catchError((err) => {
          if (err && err.error && err.error.message) {
            this.errorMessage = err.error.message; // Asignar el mensaje de error
          } else {
            this.errorMessage = 'Error desconocido al buscar mesas libres.'; // Mensaje de error genérico
          }
          return of(null);
        })
      )
      .subscribe();
  }

  reservarMesa(idMesa: number) {
    this.reserva.Mesas = [];
    this.reserva.Mesas.push({ id: idMesa });
    this.reserva.estado = 'Pendiente';
    this.mesaService
      .addReservation(this.reserva)
      .pipe(
        tap((res) => {
          console.log(res);
          this.confirmaReserva = true;

          setTimeout(() => {
            this.confirmaReserva = false;
            this.router.navigate(['/reservas', res.data.id]);
          }, 3000);
        }),
        catchError((err) => {
          if (err.error.msg) {
            console.log(err.error.msg);
          } else {
            console.log(err);
          }
          return of(null);
        })
      )
      .subscribe();
  }
}
