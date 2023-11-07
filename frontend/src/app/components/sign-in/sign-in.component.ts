import { Component, OnInit } from '@angular/core';
import { AbstractControl, AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignInService } from 'app/services/sign-in.service';
import { first, repeat } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  formularioRegistro: FormGroup;
  
  constructor(private formBuilder: FormBuilder, private signInService: SignInService){
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
      this.signInService.addCliente(datosFormulario).subscribe() //habria que agregar algun tipo de feedback, que redirija a home o diga cliente creado
    }
  }
};


  

