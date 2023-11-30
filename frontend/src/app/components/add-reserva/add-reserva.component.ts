import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddReservaService } from 'app/services/add-reserva.service';

@Component({
  selector: 'app-add-reserva',
  templateUrl: './add-reserva.component.html',
  styleUrls: ['./add-reserva.component.css']
})

export class AddReservaComponent implements OnInit {

  constructor(private route: ActivatedRoute, private addReservaService: AddReservaService){}

  ngOnInit() {
    this.route.params.subscribe(params =>{
      const idCliente = +params['idCliente']
      const idMesa = +params['idMesa'];
      const fechaHora = new Date(params['fechaHora']);
    
    

      this.addReservaService.addReserva(idCliente, idMesa, fechaHora).subscribe(); //agregar feedback
    })
  }
}
