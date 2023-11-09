import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddReservaService } from 'app/services/add-reserva.service';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit {
  idMesa: number;
  fechaHora: Date;

  constructor(private route: ActivatedRoute, addReservaService: AddReservaService){}

  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
      this.idMesa = params['idMesa'],
      this.fechaHora = new Date(params['fechaHora'])

      this.AddReservaService.addReserva(this.getDniCliente(), this.idMesa, this.fechaHora).subscribe(); //Agregar feedback
    })
  }


}
