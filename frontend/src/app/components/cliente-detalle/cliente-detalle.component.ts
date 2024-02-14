import { Component } from '@angular/core';
import { ClienteService } from 'app/services/cliente.service';

@Component({
  selector: 'app-cliente-detalle',
  templateUrl: './cliente-detalle.component.html',
  styleUrls: ['./cliente-detalle.component.css']
})
export class ClienteDetalleComponent {
  cliente: any;

  constructor(
    private clienteService: ClienteService
  ) {}

  ngOnInit(): void {
   
    const clienteId = this.clienteService.getUserId()

    this.clienteService.findOne(clienteId).subscribe(
      {
      next: cliente=> {
        this.cliente=cliente
      },
      error: error=>{
        //this.error.messageError(error)
      }
     });
  }
  
}

