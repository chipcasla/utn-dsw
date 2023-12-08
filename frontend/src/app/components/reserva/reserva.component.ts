import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http/index.js';
import { Component, OnInit } from '@angular/core';
import { ReservaService } from 'app/services/reserva.service';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css'],
})
export class ReservaComponent implements OnInit {
  reservations: any[] = [];
  reserva = {
    estado: 'Cancelada',
  };

  constructor(
    private reservaService: ReservaService,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.loadUserReservations();
  }

  loadUserReservations(): void {
    this.reservaService.getReservas().subscribe(
      (reservations) => {
        this.reservations = reservations.data;
      },
      (error: HttpErrorResponse) => {
        console.error('Error loading reservations', error);
      }
    );
  }

  cancelReservation(idReserva: number): void {
    if (confirm('¿Estás seguro de que quieres cancelar esta reserva?')) {
      this.reservaService.cancelarReserva(idReserva, this.reserva).subscribe(
        () => {
          // Actualizar la lista de reservas después de la cancelación
          this.loadUserReservations();
        },
        (error) => {
          console.error('Error canceling reservation', error);
        }
      );
    }
  }
}
