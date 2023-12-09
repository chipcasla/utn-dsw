import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservaService } from 'app/services/reserva.service';

@Component({
  selector: 'app-reserva-management',
  templateUrl: './reserva-management.component.html',
  styleUrls: ['./reserva-management.component.css']
})
export class ReservaManagementComponent {
  reservas: any;
  pendientes: boolean=false;

  constructor(
  private router: Router,
  private route: ActivatedRoute,
  private reservaService: ReservaService,
  ) {}

  ngOnInit(){
    this.cargarReservas();
  }

 cargarReservas(){
  this.reservaService.getReservas().subscribe((response: any)=>{
    this.reservas = response.data;
  })
  }
  
  verPendientes(){
    this.reservaService.getPendientes().subscribe((reservas: any)=>{
      this.reservas = reservas.data
    })
  }

  cancelarReserva(idReserva: number){
    const reserva = {estado: 'Cancelada'}
    this.reservaService.setStatusReserva(idReserva, reserva).subscribe(()=>{
      this.cargarReservas();
    });
  }

  completarReserva(idReserva: number){
    const reserva = {estado: 'Completa'}
    this.reservaService.setStatusReserva(idReserva, reserva).subscribe(()=>{
      this.cargarReservas();
    });
  }

  redirect(){
    this.router.navigate(['../'], {relativeTo: this.route})
  }
}
