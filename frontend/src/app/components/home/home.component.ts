import { Component } from '@angular/core';
import { ClienteService } from 'app/services/cliente.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  cliente: any;

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void{
    this.loadCliente();
  }

  loadCliente(){
    const idCliente = this.clienteService.getUserId(); 
    this.clienteService.findOne(idCliente).subscribe(cliente =>{
      this.cliente = cliente
    })
  }
}
