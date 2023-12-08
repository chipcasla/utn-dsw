import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor(private toastr: ToastrService) {}

  messageError(err: HttpErrorResponse) {
    if (err.error.message) {
      this.toastr.error(err.error.message, 'Error');
    } else {
      this.toastr.error('Upps! Ocurrió un error', 'Error');
    }
  }
}
