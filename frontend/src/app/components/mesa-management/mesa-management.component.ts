import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MesaService } from 'app/services/mesa.service';

@Component({
  selector: 'app-mesa-management',
  templateUrl: './mesa-management.component.html',
  styleUrls: ['./mesa-management.component.css']
})
export class MesaManagementComponent {
  action: string = '';
  mesas: any;
  createForm: FormGroup;

  constructor(
    private route: ActivatedRoute, 
    private mesaService: MesaService,
    private formBuilder: FormBuilder,
    ){
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

  ngOnInit(){
    this.route.paramMap.subscribe(params => {
      this.action = params.get('action') || '';
    });

    if (this.action==='verTodos'){
      this.cargarMesas();
    }
  }

  cargarMesas(){
    this.mesaService.findAll().subscribe((response:any)=>{
      this.mesas=response.data;
    })
  }

  addMesa(){
    if (this.createForm.valid){
      const datosFormulario = this.createForm.value;
      this.mesaService.addMesa(datosFormulario).subscribe();
    }
  }

  borrarMesa(idMesa: number) {
    this.mesaService.deleteMesa(idMesa).subscribe(()=>{
      this.cargarMesas();
    })
  }
}
