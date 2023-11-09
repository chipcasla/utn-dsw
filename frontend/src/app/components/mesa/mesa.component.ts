import { Component, OnInit } from '@angular/core';
import { MesaService } from 'app/services/mesa.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';

//Habria que cambiar el nombre del component a otra cosa, no solo mesa
@Component({
  selector: 'app-mesa',
  templateUrl: './mesa.component.html',
  styleUrls: ['./mesa.component.css']
})
export class MesaComponent{
  formulario: FormGroup;
  mesasDisponibles: any;

  constructor(private formBuilder: FormBuilder, private mesaService: MesaService, private router: Router, private AuthService: AuthService){
    this.formulario= this.formBuilder.group({
      cantPersonas:['', Validators.required],
      fechaHora:['', Validators.required],
      ubicacion:['', Validators.required]
    });

  }

  buscarMesasLibres(){
    const datosFormularios = this.formulario.value;

    const params={
      cantPersonas: datosFormularios.cantPersonas,
      fechaHora: datosFormularios.fechaHora,
      ubicacion: datosFormularios.ubicacion
    };

    this.mesaService.findMesasLibres(params).subscribe((mesasLibres) =>{
      this.mesasDisponibles=mesasLibres;
    })
  }

  reservarMesa(idMesa: number, fechaHora: Date){
    const dniCliente = this.AuthService.getDni();
    this.router.navigate(['/reserva', dniCliente, idMesa, fechaHora.toISOString()]);
  }
}



