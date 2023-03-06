import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentEmployeeService {
  private url = 'api/DepartmentsEmployees';
  
  constructor(private http: HttpClient) { }

  public getDepartmentEmployee() {
    return this.http.get(this.url).toPromise();
  }

  public createDepartmentEmployee(empresa: any) {
    return this.http.post(this.url, empresa).toPromise();
  }

  public deleteDepartmentEmployee(id: number):Observable<any> {
    return this.http.delete(this.url + '/' + id);
  }

  public editDepartmentEmployee(id: number, empresa: any) {
    return this.http.put(this.url + '/' + id , empresa).toPromise();
  }
}
