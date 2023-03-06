import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerMejoradoService {

  isLoading = new Subject<boolean>();

  show():void {
    this.isLoading.next(true);
  }
  
  hide():void {
    this.isLoading.next(false);
  }

}
