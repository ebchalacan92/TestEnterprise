import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {
  private url = 'api/Employees';
  
  constructor(private http: HttpClient) { }

  public getEmploye() {
    return this.http.get(this.url).toPromise();
  }

  public createEmploye(employe: any) {
    return this.http.post(this.url, employe).toPromise();
  }

  public deleteEmploye(id: number):Observable<any> {
    return this.http.delete(this.url + '/' + id);
  }

  public editEmploye(id: number, employe: any) {
    return this.http.put(this.url + '/' + id , employe).toPromise();
  }
}
