import { Component, OnInit } from '@angular/core';
import { AbstractControl, AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from 'app/services/cliente.service';
import { first, repeat } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  formularioRegistro: FormGroup;
  oldCliente: any;
  
  constructor(private formBuilder: FormBuilder, private clienteService: ClienteService){
    this.formularioRegistro = this.formBuilder.group({
      dni:['', Validators.required],
      password:['', Validators.required],
      repeatPassword:['', [Validators.required, this.verifyPassword]],
      nombre:['', Validators.required],
      apellido:['', Validators.required],
      telefono:['', Validators.required],
      mail:['', Validators.required]
    })
    }

  verifyPassword(control: AbstractControl): {[key: string]: any} | null {
    const firstPassword = this.formularioRegistro.get('password')?.value;
    const secondPassword = control.value;

    if (firstPassword != secondPassword){
      return {noCoinciden: true};
    }
    return null
  }

  addCliente(){
    if (this.formularioRegistro.valid){
      const datosFormulario = this.formularioRegistro.value;
      this.clienteService.addCliente(datosFormulario).subscribe() //habria que agregar algun tipo de feedback, que redirija a home o diga cliente creado
    }
  }

  itExists(clienteId: number){
    this.oldCliente= this.clienteService.findOne(clienteId)
    return (this.formularioRegistro.get('dni')?.value == this.oldCliente.dni)
  }
};


  

