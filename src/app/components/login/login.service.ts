import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { UsuarioModel } from "src/app/models/usuario_models";
import {map} from 'rxjs/operators';
import { Response } from "src/app/models/response";

const httpOption = {
    headers: new HttpHeaders({
        'Contend-type': 'application/json'
    })
};

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    url: string = 'api/login/';

    private usuarioSubject: BehaviorSubject<UsuarioModel>;
    public userOb: Observable<UsuarioModel>;
    public get usuarioData(): UsuarioModel {
        return this.usuarioSubject.value;
    }

    constructor(private http: HttpClient) {
        this.usuarioSubject = new BehaviorSubject<UsuarioModel>(JSON.parse(localStorage.getItem('usuario')));
        this.userOb = this.usuarioSubject.asObservable();
    }

    login(name: string, password: string): Observable<Response> {
        return this.http.post<Response>(this.url, {name , password}, httpOption).pipe(
            map(res => {
                if(res.succesfull === 1) {
                    const user: UsuarioModel= res.data;
                    localStorage.setItem('user', JSON.stringify(user))
                    this.usuarioSubject.next(user);
                }
            return res;
            })
        );
    }

    logout() {
        localStorage.removeItem('user');
        this.usuarioSubject.next(null);
    }
}