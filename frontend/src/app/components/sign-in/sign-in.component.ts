import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      repeatPassword:['', Validators.required],
      nombre:['', Validators.required],
      apellido:['', Validators.required],
      telefono:['', Validators.required],
      mail:['', Validators.required]
    }, 
    {
      validators: this.verifyPassword('password', 'repeatPassword')
    })
    }

  verifyPassword(password: string, repeatPassword: string){
    return(group: FormGroup) =>{
      const firstPassword = group.get(password)?.value;
      const secondPassword = group.get(repeatPassword)?.value;

      if (firstPassword!=secondPassword){
        group.get(repeatPassword)?.setErrors({noCoinciden: true});
        alert('Las contraseñas no coinciden');
      }else{
        group.get(repeatPassword)?.setErrors(null);
      }
    return null;
    }
  }

  addCliente(){
    if (this.formularioRegistro.valid){
      const datosFormulario = this.formularioRegistro.value;
      this.signInService.addCliente(datosFormulario).subscribe() //habria que agregar algun tipo de feedback, que redirija a home o diga cliente creado
    }
  }
};


  

