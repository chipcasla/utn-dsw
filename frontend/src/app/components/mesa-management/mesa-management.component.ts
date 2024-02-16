import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorService } from 'app/services/error.service';
import { MesaService } from 'app/services/mesa.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-mesa-management',
  templateUrl: './mesa-management.component.html',
  styleUrls: ['./mesa-management.component.css'],
})
export class MesaManagementComponent {
  crear: boolean = false;
  mesas: any;
  createForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mesaService: MesaService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private errorService: ErrorService
  ) {
    this.createForm = this.formBuilder.group({
      capacidad: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]+$'),
          Validators.min(1),
          Validators.max(11),
        ],
      ],
      ubicacion: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.cargarMesas();
  }

  cargarMesas() {
    this.mesaService.findAll().subscribe((response: any) => {
      this.mesas = response.data;
    });
  }

  addMesa() {
    if (this.createForm.valid) {
      const datosFormulario = this.createForm.value;
      this.mesaService.addMesa(datosFormulario).subscribe({
        next: () => {
          this.cargarMesas();
        },
        error: (err) => {
          this.errorService.messageError(err);
        },
      });
    }
  }

  borrarMesa(idMesa: number) {
    this.mesaService.deleteMesa(idMesa).subscribe({
      next: (res: any) => {
        this.toastrService.success(res.message || 'Mesa eliminada');
        this.cargarMesas();
      },
      error: (err) => {
        this.errorService.messageError(err);
      },
    });
  }

  redirect() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
