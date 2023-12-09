import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from 'app/services/cliente.service';
import { ReseñaService } from 'app/services/reseña.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-resenia',
  templateUrl: './menu-resenia.component.html',
  styleUrls: ['./menu-resenia.component.css']
})
export class MenuReseniaComponent {
  reseniaForm: FormGroup
  crear: boolean=false;
  miResenia: boolean=false;
  reseniaAgregada: boolean=false;
  hasResenia: boolean=false;
  resenia: any;

  constructor(private formBuilder: FormBuilder, private reseñaService: ReseñaService, private clienteService: ClienteService, private toastrService: ToastrService ){
    this.reseniaForm= this.formBuilder.group({
      puntaje: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      comentario: ['', Validators.required]
    })
  }

  ngOnInit(){
   this.cargarReseña();
  }

  cargarReseña(){
     this.reseñaService.findByCliente(this.clienteService.getUserId()).subscribe(
      {
        next: response=>{
          this.resenia=response;
          console.log(this.resenia)
          this.hasResenia=true;
        },
        error: error=>{
          if (error.status==404){
            this.hasResenia=false;
          }
        }
      }
    )
  }
  submitResenia(){
    if(this.reseniaForm.valid){
      if(!this.hasResenia){
        const idCliente = this.clienteService.getUserId();
        const reseñaData = { ...this.reseniaForm.value, idCliente };
        this.reseñaService.addReseña(reseñaData).subscribe(()=>{
          this.reseniaAgregada=true;
          this.reseniaForm.reset();
          setTimeout(()=>{
            this.reseniaAgregada=false;
          }, 3000);
        })
      } else {
        this.toastrService.error('Ya ha realizado una reseña', 'Error')
      }
    }
  }

  deleteResenia(idReseña: number){
    console.log(idReseña)
    this.reseñaService.deleteReseña(idReseña).subscribe(()=>{
      this.cargarReseña();
    })
  }
}