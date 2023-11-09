import { Component, OnInit } from '@angular/core';
import { MesaService } from 'app/services/mesa.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

//Habria que cambiar el nombre del component a otra cosa, no solo mesa
@Component({
  selector: 'app-mesa',
  templateUrl: './mesa.component.html',
  styleUrls: ['./mesa.component.css']
})
export class MesaComponent{
  formulario: FormGroup;
  mesasDisponibles: any;

  constructor(private formBuilder: FormBuilder, private mesaService: MesaService, private router: Router){
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
    this.router.navigate(['/reserva', {idMesa, fechaHora}]);
  }
}



