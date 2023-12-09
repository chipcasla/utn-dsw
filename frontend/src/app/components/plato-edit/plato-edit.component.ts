import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PlatoService } from 'app/services/plato.service';

@Component({
  selector: 'app-plato-edit',
  templateUrl: './plato-edit.component.html',
  styleUrls: ['./plato-edit.component.css']
})
export class PlatoEditComponent {
  plato: any;
  editForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private platoService: PlatoService, private route: ActivatedRoute, private router: Router){
    this.editForm= this.formBuilder.group({
      descripcion: ['', Validators.required],
      ingredientes: ['', Validators.required],
      imagen: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      const idPlato = +params['id']

      this.platoService.getOne(idPlato).subscribe((plato=>{
        this.plato=plato;
        this.editForm=new FormGroup({
          descripcion: new FormControl(this.plato.data['descripcion']),
          ingredientes: new FormControl(this.plato.data['ingredientes']),
          imagen: new FormControl(this.plato.data['imagen']),
        })
     }))
    })
  }

  updatePlato(){
    if (this.editForm.valid){
      const datosFormulario=this.editForm.value;
      this.platoService.updatePlato(this.plato.data.id, datosFormulario).subscribe()
    }
  }
}
