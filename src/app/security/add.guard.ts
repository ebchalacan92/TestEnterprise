import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { LoginService } from "../components/login/login.service";


@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate{

    constructor(private router: Router, private loginService: LoginService) {}

    canActivate(route: ActivatedRouteSnapshot) {
        const usuario = this.loginService.usuarioData;
        if(usuario) {
            return true;    
        }
        this.router.navigate(['/login']);
        return false;
    }
}