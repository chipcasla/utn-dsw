import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from 'app/services/cliente.service';
import { ReservaService } from 'app/services/reserva.service';
import { ErrorService } from 'app/services/error.service';

@Component({
  selector: 'app-reserva-detalle',
  templateUrl: './reserva-detalle.component.html',
  //styleUrls: ['./reserva-detalle.component.css'],
})
export class ReservaDetalleComponent implements OnInit {
  reservationId: string = '0';
  reservation: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reservaService: ReservaService,
    private clienteService: ClienteService,
    private errorService: ErrorService,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.reservationId = params['id'];
      this.loadReservationDetails();
    });
  }

  loadReservationDetails(): void {
    this.reservaService.getReservationDetails(this.reservationId).subscribe({
      next: (reservation) => {
        if (this.clienteService.getUserId() == reservation.data.idCliente) {
          this.reservation = reservation.data;
        } else {
          this.router.navigate(['../../'], { relativeTo: this.route });
        }
      },
      error: (error) => {
        this.errorService.messageError(error);
      },
    });
  }

  formatoTexto(texto: string): string {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
  }
}
