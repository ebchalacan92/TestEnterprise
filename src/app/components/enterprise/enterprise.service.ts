import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnterpriseService {
  private url = 'api/Enterprises';
  
  constructor(private http: HttpClient) { }

  public getEnterprise() {
    return this.http.get(this.url).toPromise();
  }

  public createEnterprise(empresa: any) {
    return this.http.post(this.url, empresa).toPromise();
  }

  public deleteEnterprise(id: number):Observable<any> {
    return this.http.delete(this.url + '/' + id);
  }

  public editEnterprise(id: number, empresa: any) {
    return this.http.put(this.url + '/' + id , empresa).toPromise();
  }
}
