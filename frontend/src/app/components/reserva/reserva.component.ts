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
  reservations: any[] = [];
  reserva = {
    estado: 'Cancelada',
  };

  constructor(
    private reservaService: ReservaService,
    private datePipe: DatePipe,
    private clienteService: ClienteService,
    private errorService: ErrorService,
  ) {}

  ngOnInit() {
    this.loadUserReservations();
  }

  loadUserReservations(): void {
    const idCliente = this.clienteService.getUserId();
    this.reservaService.getByUser(idCliente).subscribe({
      next: (reservations) => {
        this.reservations = reservations.data;
      },

      error: (error: HttpErrorResponse) => {
        this.errorService.messageError(error);
      },
    });
  }

  cancelReservation(idReserva: number): void {
    if (confirm('¿Estás seguro de que quieres cancelar esta reserva?')) {
      this.reservaService.cancelarReserva(idReserva, this.reserva).subscribe({
        next: () => {
          // Actualizar la lista de reservas después de la cancelación
          this.loadUserReservations();
        },
        error: (error) => {
          this.errorService.messageError(error);
        },
      });
    }
  }
}
