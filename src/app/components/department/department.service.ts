import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private url = 'api/Departments';
  
  constructor(private http: HttpClient) { }

  public getDepartment() {
    return this.http.get(this.url).toPromise();
  }

  public createDepartment(department: any) {
    return this.http.post(this.url, department).toPromise();
  }

  public deleteDepartment(id: number):Observable<any> {
    return this.http.delete(this.url + '/' + id);
  }

  public editDepartment(id: number, department: any) {
    return this.http.put(this.url + '/' + id , department).toPromise();
  }
}
