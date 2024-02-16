import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from 'app/services/cliente.service';
import { ErrorService } from 'app/services/error.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css'],
})
export class ClienteComponent implements OnInit {
  clienteId: string = '0';
  cliente: any;
  editForm: FormGroup;
  editar: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private toastrService: ToastrService,
    private errorService: ErrorService
  ) {
    this.editForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: ['', Validators.required],
      mail: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.clienteId = params['id'];
      this.loadClientDetails();
    });
  }

  loadClientDetails(): void {
    this.clienteService.findOne(parseInt(this.clienteId)).subscribe({
      next: (cliente: any) => {
        this.cliente = cliente.data;
      },
      error: (error) => {
       
        this.errorService.messageError(error);
      },
    });
  }

  updateCliente() {
    const datosFormulario = this.editForm.value;
    this.clienteService
      .updateCliente(this.cliente.id, datosFormulario)
      .subscribe({
        next: (cliente) => {
          this.loadClientDetails();
          this.toastrService.success('Cambios guardados');
          this.editar = false;
        },
        error: (err) => {
          this.errorService.messageError(err);
        },
      });
  }

  editClient() {
    this.editar = !this.editar;
    this.editForm = new FormGroup({
      nombre: new FormControl(this.cliente['nombre']),
      apellido: new FormControl(this.cliente['apellido']),
      telefono: new FormControl(this.cliente['telefono']),
      mail: new FormControl(this.cliente['mail']),
    });
  }

  redirect() {
    this.router.navigate(['/admin/clientes']);
  }
}
