import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PlatoService } from 'app/services/plato.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-plato-management',
  templateUrl: './plato-management.component.html',
  styleUrls: ['./plato-management.component.css']
})
export class PlatoManagementComponent {
  platoForm: FormGroup
  platos: any;
  crearPlato: boolean=false;

  constructor(
    private formBuilder: FormBuilder, 
    private platoService: PlatoService, 
    private route: ActivatedRoute, 
    private router: Router, 
    private toastrService: ToastrService)
    {
    this.platoForm = this.formBuilder.group({
      descripcion: ['', Validators.required],
      ingredientes: ['', Validators.required],
      imagen: ['', Validators.required]
    }
    )
  }

  ngOnInit(): void{
    this.loadPlatos()
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
        this.platoForm.reset();
        this.toastrService.success('Nuevo plato agregado')
        this.loadPlatos();
      })
    }
  }

  deletePlato(idPlato: number){
    this.platoService.deletePlato(idPlato).subscribe(()=>{
      this.loadPlatos();
      this.toastrService.success('Plato borrado')
    })
  }

  redirect(idPlato: number){
    this.router.navigate(['edit', idPlato], {relativeTo: this.route})
  }
}
