import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { LoginService } from "../components/login/login.service";
import { SpinnerMejoradoService } from "../spinner/spinner-mejorado/spinner-mejorado.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor{

    constructor(private loginService: LoginService) {}
        
        intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
            const usuario = this.loginService.usuarioData;

            if(usuario) {
                request = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${usuario.token}`
                    }
                })
            }
            return next.handle(request);
        }

}
