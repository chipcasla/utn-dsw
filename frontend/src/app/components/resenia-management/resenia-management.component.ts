import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ClienteService } from 'app/services/cliente.service';
import { ErrorService } from 'app/services/error.service';
import { ReseñaService } from 'app/services/reseña.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-resenias',
  templateUrl: './resenia-management.component.html',
  //styleUrls: ['./resenias.component.css']
})
export class ReseniaManagementComponent {
  resenias: any;

  constructor(private reseñaService: ReseñaService, private toastrService: ToastrService, private errorService: ErrorService){}

  ngOnInit(): void{
    this.loadResenias()
  }

    loadResenias(){
      this.reseñaService.getReseñas().subscribe(resenias=>{
        this.resenias=resenias.data;
      })
    }

    deleteResenia(idResenia: number){
      if(confirm('¿Esta seguro que desea borrar la reseña?')){
        this.reseñaService.deleteReseña(idResenia).subscribe({
          next: (data)=>{
            this.toastrService.success('Reseña borrada');
            this.loadResenias();
          },
          error: (e: HttpErrorResponse) =>{
            this.errorService.messageError(e);
          } 
        })
      }
    }
  }