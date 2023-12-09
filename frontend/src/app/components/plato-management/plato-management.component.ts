import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PlatoService } from 'app/services/plato.service';

@Component({
  selector: 'app-plato-management',
  templateUrl: './plato-management.component.html',
  styleUrls: ['./plato-management.component.css']
})
export class PlatoManagementComponent {
  platoForm: FormGroup
  success: boolean=false;
  verPlatos: boolean=false;
  platos: any;

  constructor(private formBuilder: FormBuilder, private platoService: PlatoService, private route: ActivatedRoute, private router: Router){
    this.platoForm = this.formBuilder.group({
      descripcion: ['', Validators.required],
      ingredientes: ['', Validators.required],
      imagen: ['', Validators.required]
    }
    )
  }

  loadPlatos(){
    this.platoService.getPlatos().subscribe((platos: any)=>{
      this.platos=platos.data
    })
  }

  submitPlato(){
    if(this.platoForm.valid){
      const datosFormulario = this.platoForm.value;
      this.platoService.addPlato(datosFormulario).subscribe(()=>{
        this.success=true;
        this.platoForm.reset();
        setTimeout(()=>{
          this.success=false;
        }, 3000)
      })
    }
  }

  deletePlato(idPlato: number){
    this.platoService.deletePlato(idPlato).subscribe(()=>{
      this.loadPlatos();
    })
  }

  redirect(idPlato: number){
    this.router.navigate(['edit', idPlato], {relativeTo: this.route})
  }
}
