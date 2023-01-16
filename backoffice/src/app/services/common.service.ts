import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private readonly spinner: NgxSpinnerService,
  ) { }

  public showSpinner(name = 'root') {
    return this.spinner.show(name);
  }

  public hideSpinner(name = 'root') {
    return this.spinner.hide(name);
  }
}
