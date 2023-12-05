import { Component, OnInit } from '@angular/core';
import { AbstractControl, AbstractControlOptions, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from 'app/services/cliente.service';
import { Observable, catchError, first, from, map, of, repeat } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  formularioRegistro: FormGroup;
  
  constructor(private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder, private clienteService: ClienteService){
    this.formularioRegistro = this.formBuilder.group({
      dni:['', Validators.required],
      password:['', Validators.required],
      repeatPassword:['', [Validators.required, this.verifyPassword.bind(this)]],
      nombre:['', Validators.required],
      apellido:['', Validators.required],
      telefono:['', Validators.required],
      mail:['', Validators.required]
    })
    }

  verifyPassword(){
    const firstPassword = this.formularioRegistro?.get('password')?.value;
    const secondPassword = this.formularioRegistro?.get('repeatPassword')?.value;

    if (firstPassword != secondPassword){
      return {noCoinciden: true};
    }
    return null
  }

  addCliente() {
    if (this.formularioRegistro.valid) {
      const dni = this.formularioRegistro?.get('dni')?.value;
      console.log('t1')
      this.itExists(dni).subscribe((exists) => {
        console.log('t2')
        if (exists) {
          console.log('t3')
          const datosFormulario = this.formularioRegistro.value;
          this.clienteService.addCliente(datosFormulario).subscribe(() => {
            this.router.navigate(['../login'], { relativeTo: this.route });
          });
        }
        // Insertar mensaje de error
      });
    }
  }

  itExists(dni: string): Observable<boolean> {
    return this.clienteService.findByDni(dni).pipe(
      map((cliente) => !!cliente), 
      catchError(() => of(false))
    );
  }
}
