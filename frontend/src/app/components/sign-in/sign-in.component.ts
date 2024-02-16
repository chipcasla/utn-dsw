import { HttpErrorResponse } from '@angular/common/http/index.js';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from 'app/services/cliente.service';
import { ErrorService } from 'app/services/error.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  //styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  formularioRegistro: FormGroup;
  loading: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private toastr: ToastrService,
    private errorService: ErrorService
  ) {
    this.formularioRegistro = this.formBuilder.group({
      dni: [
        '',
        [
          Validators.required,
          Validators.maxLength(8),
          Validators.minLength(8),
          Validators.pattern('[0-9]{7,8}'),
        ],
      ],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required],
      nombre: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      apellido: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      telefono: [
        '',
        [Validators.required, Validators.pattern('[-+()0-9 ]{10,12}')],
      ],
      mail: [
        '',
        [Validators.required, Validators.email, this.verifyEmail.bind(this)],
      ],
    });

    this.formularioRegistro.get('password')?.valueChanges.subscribe(() => {
      this.formularioRegistro.get('repeatPassword')?.updateValueAndValidity();
    });

    // Validator personalizado para 'repeatPassword'
    this.formularioRegistro
      .get('repeatPassword')
      ?.setValidators(this.verifyPassword.bind(this));
  }

  verifyPassword() {
    const firstPassword = this.formularioRegistro.get('password')?.value;
    const secondPassword = this.formularioRegistro.get('repeatPassword')?.value;

    if (firstPassword != secondPassword) {
      return { noCoinciden: true };
    }
    return null;
  }

  verifyEmail() {
    const mailValid =
      /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;

    if (mailValid.test(this.formularioRegistro?.get('mail')?.value)) {
      return null;
    }

    return { mailInvalid: true };
  }

  convertirACamelCase(str: string | undefined): string {
    if (!str) return '';
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  }

  addCliente() {
    if (this.formularioRegistro.valid) {
      const dni = this.formularioRegistro?.get('dni')?.value;
      this.itExists(dni).subscribe({
        next: (exists) => {
          if (exists) {
            if (this.verifyPassword() == null) {
              const datosFormulario = this.formularioRegistro.value;
              this.loading = true;
              this.clienteService.addCliente(datosFormulario).subscribe({
                next: (data) => {
                  const nombreUsuario = this.convertirACamelCase(
                    this.formularioRegistro.get('nombre')?.value
                  );
                  const apellidoUsuario = this.convertirACamelCase(
                    this.formularioRegistro.get('apellido')?.value
                  );
                  this.loading = false;
                  this.toastr.success(
                    `${nombreUsuario}  ${apellidoUsuario} fue registrado con éxito!`,
                    'Usuario regisrado'
                  );
                  this.router.navigate(['../login'], {
                    relativeTo: this.route,
                  });
                },
                error: (e: HttpErrorResponse) => {
                  this.loading = false;
                  this.errorService.messageError(e);
                },
              });
            } else {
              this.toastr.error(
                'Las contraseñas ingresadas no coinciden',
                'Error'
              );
            }
          } else {
            this.toastr.error('El DNI ya se encuentra registrado', 'Error');
          }
        },
        error: (e: HttpErrorResponse) => {
          this.errorService.messageError(e);
        },
      });
    } else {
      if (
        this.formularioRegistro?.get('dni')?.errors?.['required'] ||
        this.formularioRegistro?.get('password')?.errors?.['required'] ||
        this.formularioRegistro?.get('repeatPassword')?.errors?.['required'] ||
        this.formularioRegistro?.get('nombre')?.errors?.['required'] ||
        this.formularioRegistro?.get('apellido')?.errors?.['required'] ||
        this.formularioRegistro?.get('telefono')?.errors?.['required'] ||
        this.formularioRegistro?.get('mail')?.errors?.['required']
      ) {
        this.toastr.error('Complete todos los campos', 'Error');
      } else {
        if (this.formularioRegistro?.get('dni')?.errors) {
          this.toastr.error('El DNI ingresado es incorrecto', 'Error');
        }
        if (this.formularioRegistro?.get('mail')?.errors) {
          this.toastr.error('El correo ingresado es incorrecto', 'Error');
        }
        if (this.formularioRegistro?.get('telefono')?.errors) {
          this.toastr.error('El teléfono ingresado es incorrecto', 'Error');
        }
        if (
          this.formularioRegistro?.get('password')?.errors ||
          this.formularioRegistro?.get('repeatPassword')?.errors
        ) {
          this.toastr.error('Las contraseñas no coiniden', 'Error');
        }
      }
    }
  }

  itExists(dni: string): Observable<any> {
    return this.clienteService.findByDni(dni);
  }

  redirect() {
    this.router.navigate(['/login']);
  }
}
