import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PlatoService } from 'app/services/plato.service';

@Component({
  selector: 'app-plato-edit',
  templateUrl: './plato-edit.component.html',
  styleUrls: ['./plato-edit.component.css']
})
export class PlatoEditComponent {
  plato: any;
  editForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private platoService: PlatoService, private route: ActivatedRoute){
    this.editForm= this.formBuilder.group({
      detalle: ['', Validators.required],
      ingredientes: ['', Validators.required],
      url: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      const idPlato = +params['id']
    })
  }

  updateplato(){
    if (this.editForm.valid){
      const datosFormulario=this.editForm.value;
      this.platoService.updatePlato(this.plato.data.id, datosFormulario).subscribe()
    }
  }
}
