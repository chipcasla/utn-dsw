import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from 'app/services/cliente.service';
import { ReseñaService } from 'app/services/reseña.service';

@Component({
  selector: 'app-resenia',
  templateUrl: './menu-resenia.component.html',
  styleUrls: ['./menu-resenia.component.css']
})
export class ReseniaComponent {
  reseñaForm: FormGroup;
  crear: boolean=false;
  miReseña: boolean=false;
  reseñaAgregada: boolean=false;

  constructor(private formBuilder: FormBuilder, private reseñaService: ReseñaService, private clienteService: ClienteService ){
    this.reseñaForm= this.formBuilder.group({
      puntaje: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      comentario: ['', Validators.required]
    })
  }

  submitReseña(){
    if(this.reseñaForm.valid){
      if(!this.reseñaService.findByCliente(this.clienteService.getUserId())){
        const reseñaData = this.reseñaForm.value
        this.reseñaService.addReseña(reseñaData).subscribe(()=>{
          this.reseñaAgregada=true;
          this.reseñaForm.reset();
          setTimeout(()=>{
            this.reseñaAgregada=false;
          }, 3000);
        })
      }
    }
  }
}
