import { Component, OnInit } from '@angular/core';
import { ReservaService } from 'app/services/reserva.service';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css'],
})
export class ReservaComponent implements OnInit {
  reservations: any[] = [];

  constructor(private reservaService: ReservaService) {}

  ngOnInit() {
    this.loadUserReservations();
  }

  loadUserReservations(): void {
    this.reservaService.getReservas().subscribe(
      (reservations) => {
        this.reservations = reservations.data;
      },
      (error) => {
        console.error('Error loading reservations', error);
      }
    );
  }

  cancelReservation(idReserva: number): void {
    if (confirm('¿Estás seguro de que quieres cancelar esta reserva?')) {
      this.reservaService.cancelarReserva(idReserva).subscribe(
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
