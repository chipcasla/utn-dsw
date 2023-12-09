import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from 'app/services/cliente.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cliente-edit',
  templateUrl: './cliente-edit.component.html',
  styleUrls: ['./cliente-edit.component.css']
})
export class ClienteEditComponent {
  cliente: any;
  editForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private clienteService: ClienteService, private toastrService: ToastrService){
    this.editForm= this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: ['', Validators.required],
      mail: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const idCliente = this.clienteService.getUserId();
    this.clienteService.findOne(idCliente).subscribe((cliente=>{
      this.cliente=cliente;
      this.editForm=new FormGroup({
        nombre: new FormControl(this.cliente.data['nombre']),
        apellido: new FormControl(this.cliente.data['apellido']),
        telefono: new FormControl(this.cliente.data['telefono']),
        mail: new FormControl(this.cliente.data['mail'])
      })
    }))
  }

  updateCliente(){
    if (this.editForm.valid){
      const datosFormulario=this.editForm.value;
      this.clienteService.updateCliente(this.cliente.data.id, datosFormulario).subscribe(()=>{
        this.toastrService.success('Cambios guardados')
      })
    }
  }
}
