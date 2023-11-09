import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddReservaService } from 'app/services/add-reserva.service';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit {

  constructor(private route: ActivatedRoute, private addReservaService: AddReservaService){}

  ngOnInit() {
    this.route.params.subscribe(params =>{
      const dniCliente = params['dniCliente']
      const idMesa = +params['idMesa'];
      const fechaHora = new Date(params['fechaHora']);
    
    

      this.addReservaService.addReserva(dniCliente, idMesa, fechaHora).subscribe(); //agregar feedback
    })
  }


}
