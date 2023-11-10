import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReservaService } from 'app/services/reserva.service';

@Component({
  selector: 'app-reserva-detalle',
  templateUrl: './reserva-detalle.component.html',
  styleUrls: ['./reserva-detalle.component.css'],
})
export class ReservaDetalleComponent implements OnInit {
  reservationId: number = 0;
  reservation: any;

  constructor(
    private route: ActivatedRoute,
    private reservaService: ReservaService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.reservationId = params['id'];
      this.loadReservationDetails();
    });
  }

  loadReservationDetails(): void {
    this.reservaService.getReservationDetails(this.reservationId).subscribe(
      (reservation) => {
        this.reservation = reservation;
      },
      (error) => {
        console.error('Error loading reservation details', error);
      }
    );
  }
}
