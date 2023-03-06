import { Component, OnInit } from '@angular/core';
import { SpinnerMejoradoService } from './spinner-mejorado.service';

@Component({
  selector: 'app-spinner',
  template: `
  <div class= "overlay" *ngIf="isLoading | async">
  <div class="lds-dual-ring"></div>
  </div>
 `,
  styleUrls: ['./spinner-mejorado.component.scss']
})
export class SpinnerMejoradoComponent {

  isLoading = this.spinnerService.isLoading;

  constructor(private spinnerService: SpinnerMejoradoService) { }
}
