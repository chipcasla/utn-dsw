import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http/index.js';
import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'app/services/cliente.service';
import { ErrorService } from 'app/services/error.service';
import { ReservaService } from 'app/services/reserva.service';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  //styleUrls: ['./reserva.component.css'],
})
export class ReservaComponent implements OnInit {
  reservas: any[] = [];
  reserva = {
    estado: 'Cancelada',
  };

  constructor(
    private reservaService: ReservaService,
    private datePipe: DatePipe,
    private clienteService: ClienteService,
    private errorService: ErrorService
  ) {}

  ngOnInit() {
    this.cargarReservasCliente();
  }

  cargarReservasCliente(): void {
    const idCliente = this.clienteService.getUserId();
    this.reservaService.getByUser(idCliente).subscribe({
      next: (reservas) => {
        this.reservas = reservas.data;
      },

      error: (error: HttpErrorResponse) => {
        this.errorService.messageError(error);
      },
    });
  }

  cancelarReserva(idReserva: number): void {
    if (confirm('¿Estás seguro de que quieres cancelar esta reserva?')) {
      this.reservaService.cancelarReserva(idReserva, this.reserva).subscribe({
        next: () => {
          // Actualizar la lista de reservas después de la cancelación
          this.cargarReservasCliente();
        },
        error: (error) => {
          this.errorService.messageError(error);
        },
      });
    }
  }
}
