import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from 'app/services/cliente.service';
import { ErrorService } from 'app/services/error.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cliente-management',
  templateUrl: './cliente-management.component.html',
  styleUrls: ['./cliente-management.component.css'],
})
export class ClienteManagementComponent {
  crear: boolean = false;
  clientes: any;
  createForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private clienteService: ClienteService,
    private formBuilder: FormBuilder,
    private errorService: ErrorService,
    private toastrService: ToastrService
  ) {
    this.createForm = this.formBuilder.group({
      dni: ['', Validators.required],
      password: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: ['', Validators.required],
      mail: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.cargarClientes();
  }

  cargarClientes() {
    this.clienteService.findAll().subscribe((response: any) => {
      this.clientes = response.data;
    });
  }

  addCliente() {
    if (this.createForm.valid) {
      const datosFormulario = this.createForm.value;
      this.clienteService.addCliente(datosFormulario).subscribe({
        next: (client) => {
          this.toastrService.success(
            `${client.data.nombre} ${client.data.apellido} fue agregado con éxito`,
            'Nuevo cliente'
          );
          this.cargarClientes();
          this.crear = false;
        },
        error: (err) => {
          this.errorService.messageError(err);
        },
      });
    }
  }

  abrirDetalle(id: number) {
    this.router.navigate([`/admin/clientes/${id}`]);
  }

  deleteCliente(idCliente: number) {
    this.clienteService.deleteCliente(idCliente).subscribe(() => {
      this.cargarClientes();
    });
  }

  redirect() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
